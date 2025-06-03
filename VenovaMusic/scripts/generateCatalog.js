// scripts/generateCatalog.js
const fs = require('fs');
const path = require('path');
const musicDir = path.join(__dirname, '..', 'public', 'music');
const catalog = [];

function isAudioOrVideoFile(filename) {
  return /\.(mp3|mp4|wav|ogg)$/i.test(filename);
}

function isVideoFile(filename) {
  return /\.mp4$/i.test(filename);
}

function isImageFile(filename) {
  return /\.(jpg|jpeg|png|webp)$/i.test(filename);
}

function scanGenreFolder(genreFolder, genre) {
  const entries = fs.readdirSync(genreFolder, { withFileTypes: true });

  const songs = entries.filter(entry => entry.isFile() && isAudioOrVideoFile(entry.name));
  const cover = entries.find(entry => entry.isFile() && isImageFile(entry.name));

  if (songs.length > 0) {
    const album = {
      albumId: genre,
      title: `Álbum de ${genre}`,
      genre,
      cover: cover ? `/music/${genre}/${cover.name}` : null,
      songs: songs.map((song, index) => ({
        id: `${genre}-${index}`,
        title: path.parse(song.name).name,
        file: `/music/${genre}/${song.name}`,
        isVideo: isVideoFile(song.name),
      })),
    };

    catalog.push(album);
  }
}

fs.readdirSync(musicDir, { withFileTypes: true }).forEach(entry => {
  if (entry.isDirectory()) {
    scanGenreFolder(path.join(musicDir, entry.name), entry.name);
  }
});

fs.writeFileSync(path.join(__dirname, '..', 'public', 'catalog.json'), JSON.stringify(catalog, null, 2), 'utf-8');

console.log('✅ Catálogo generado con éxito.');
