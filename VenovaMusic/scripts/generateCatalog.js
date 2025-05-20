const fs = require('fs');
const path = require('path');
const musicDir = path.join(__dirname, '..', 'public', 'music');
const catalog = [];

function isAudioFile(filename) {
  return /\.(mp3|mp4|wav|ogg)$/i.test(filename);
}

function isImageFile(filename) {
  return /\.(jpg|jpeg|png|webp)$/i.test(filename);
}

function scanGenreFolder(genreFolder, genre) {
  const entries = fs.readdirSync(genreFolder, { withFileTypes: true });

  const songs = entries.filter(entry => entry.isFile() && isAudioFile(entry.name));
  const cover = entries.find(entry => entry.isFile() && isImageFile(entry.name));

  if (songs.length > 0) {
    const album = {
      id: genre,
      title: `Álbum de ${genre}`,
      genre: genre,
      cover: cover ? `/music/${genre}/${cover.name}` : null,
      songs: songs.map((song, index) => ({
        id: `${genre}-${index}`,
        title: path.parse(song.name).name,
        file: `/music/${genre}/${song.name}`,
      })),
    };

    catalog.push(album);
  }
}

fs.readdirSync(musicDir, { withFileTypes: true }).forEach((entry) => {
  if (entry.isDirectory()) {
    const genrePath = path.join(musicDir, entry.name);
    scanGenreFolder(genrePath, entry.name);
  }
});

fs.writeFileSync(path.join(__dirname, 'catalog.json'), JSON.stringify(catalog, null, 2), 'utf-8');

console.log('✅ Catálogo generado con éxito.');
