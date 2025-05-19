const fs = require("fs");
const path = require("path");

const musicDir = path.join(__dirname, "../public/music");
const outputFile = path.join(__dirname, "../src/utils/catalog.json");

const isAudioFile = (file) => /\.(mp3|wav|ogg)$/i.test(file);
const isImageFile = (file) => /\.(jpg|jpeg|png|webp)$/i.test(file);

const catalog = [];

function scanMusicDir(dir, genre) {
  const albums = fs.readdirSync(dir, { withFileTypes: true });

  albums.forEach((album) => {
    if (album.isDirectory()) {
      const albumPath = path.join(dir, album.name);
      const files = fs.readdirSync(albumPath);
      const songs = files.filter(isAudioFile);
      const cover = files.find(isImageFile) || null;

      const albumData = {
        id: `${genre}-${album.name}`,
        title: album.name,
        genre,
        cover: cover ? `/music/${genre}/${album.name}/${cover}` : null,
        songs: songs.map((song) => ({
          id: `${album.name}-${song}`,
          title: path.parse(song).name,
          file: `/music/${genre}/${album.name}/${song}`,
        })),
      };

      catalog.push(albumData);
    }
  });
}

function generateCatalog() {
  const genres = fs.readdirSync(musicDir, { withFileTypes: true });

  genres.forEach((genre) => {
    if (genre.isDirectory()) {
      const genrePath = path.join(musicDir, genre.name);
      scanMusicDir(genrePath, genre.name);
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(catalog, null, 2), "utf-8");
  console.log("✅ Catálogo generado en catalog.json");
}

generateCatalog();
