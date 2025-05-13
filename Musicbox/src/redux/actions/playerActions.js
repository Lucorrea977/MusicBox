import { setSongInternal, setStreamUrl, setStreamError, pauseAudio, updatePlaybackProgress, playAudio, clearPlayerError } from '../reducers/playerReducer';

const API = 'https://discoveryprovider2.audius.co/v1'; // API base
const APP_NAME = 'MusicBox';

// Acción para seleccionar una canción e iniciar la obtención de URL de stream
export const selectSong = (song, autoPlay = true) => async (dispatch, getState) => {
  const { player } = getState();
  dispatch(clearPlayerError()); // Limpiar errores previos del reproductor

  // Si es la misma canción, solo alterna play/pause (manejado en el reducer)
  if (player.currentSong?.id === song.id) {
    dispatch(setSongInternal({ song, autoPlay: !player.isPlaying })); // Invierte isPlaying
    return; // No necesita buscar URL si ya la tiene (o la buscará si es necesario)
  }

  // Es una nueva canción o la URL no se pudo obtener antes
  dispatch(setSongInternal({ song, autoPlay })); // Establece canción, resetea streamUrl

  if (!song.id) {
    console.error('selectSong: ID de canción no válido.');
    dispatch(setStreamError('ID de canción no válido.'));
    return;
  }

  try {
    console.log(`Obteniendo URL de stream para la canción ID: ${song.id}`);
    const res = await fetch(`${API}/tracks/${song.id}/stream?app_name=${APP_NAME}`);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: `Error HTTP ${res.status}` }));
      throw new Error(errorData.error || `Error HTTP ${res.status} al obtener stream`);
    }

    // La respuesta directa de /stream es la URL del audio (puede ser un redirect que fetch sigue)
    const streamUrl = res.url;
    if (!streamUrl) {
        throw new Error('No se recibió URL de stream válida.');
    }
    console.log(`URL de stream obtenida: ${streamUrl}`);
    dispatch(setStreamUrl(streamUrl));

  } catch (error) {
    console.error('Fallo al obtener URL de stream:', error);
    dispatch(setStreamError(error.message || 'Fallo al cargar stream de la canción'));
  }
};

// Acción para detener la reproducción
export const stopSong = () => (dispatch) => {
  dispatch(pauseAudio());
};

// Acción para actualizar el progreso de reproducción
export const updateProgress = (progress) => (dispatch) => {
  dispatch(updatePlaybackProgress(progress));
};

// Acciones para Siguiente/Anterior
export const playNextSongInList = (trackList, currentTrackId) => (dispatch, getState) => {
    if (!trackList || trackList.length === 0) return;
    const currentIndex = trackList.findIndex(track => track.id === currentTrackId);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= trackList.length) {
        nextIndex = 0; // Volver al inicio de la lista (o detener, según preferencia)
    }
    const nextSong = trackList[nextIndex];
    if (nextSong) {
        dispatch(selectSong(nextSong));
    }
};

export const playPreviousSongInList = (trackList, currentTrackId) => (dispatch) => {
    if (!trackList || trackList.length === 0) return;
    const currentIndex = trackList.findIndex(track => track.id === currentTrackId);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = trackList.length - 1; // Ir al final de la lista (o detener)
    }
    const prevSong = trackList[prevIndex];
    if (prevSong) {
        dispatch(selectSong(prevSong));
    }
};