import { setLoading, setTracks, setSearchResults, setArtistDetails, setArtistTracks, setError, clearSongsError, clearArtistData } from '../reducers/songsReducer';

const API = 'https://discoveryprovider2.audius.co/v1'; // API base
const APP_NAME = 'MusicBox';

// Obtener canciones populares (trending) O buscar canciones
export const fetchSongs = (query = '') => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearSongsError()); // Limpiar errores previos
  let url = '';
  const params = `app_name=${APP_NAME}`;

  try {
    if (query.trim()) {
      // Buscar canciones si hay una consulta
      console.log(`Buscando canciones para: ${query}`);
      url = `${API}/tracks/search?${params}&query=${encodeURIComponent(query)}&only_downloadable=false`;
      const res = await fetch(url);
      if (!res.ok) {
          const errData = await res.json().catch(()=>({}));
          throw new Error(errData.error || `Búsqueda de canciones fallida: ${res.statusText}`);
      }
      const data = await res.json();
      dispatch(setSearchResults(data.data || []));
    } else {
      // Obtener canciones populares si no hay consulta
      console.log("Obteniendo canciones populares...");
      url = `${API}/tracks/trending?${params}`;
      const res = await fetch(url);
      if (!res.ok) {
          const errData = await res.json().catch(()=>({}));
          throw new Error(errData.error || `Obtención de populares fallida: ${res.statusText}`);
        }
      const data = await res.json();
      dispatch(setTracks(data.data || []));
    }
  } catch (error) {
    console.error('Error en fetchSongs/Search:', error);
    dispatch(setError(error.message || 'Fallo al obtener canciones'));
  }
  // setLoading(false) se maneja en los reducers al establecer datos o error
};

// Obtener detalles del artista Y sus canciones más populares
export const fetchArtistData = (userHandle) => async (dispatch) => {
  if (!userHandle) {
      dispatch(setError('Handle de artista no proporcionado.'));
      return;
  }
  dispatch(setLoading(true));
  dispatch(clearArtistData()); // Limpiar datos de artista anterior
  dispatch(clearSongsError());

  try {
    // 1. Buscar al usuario por su 'handle' para obtener su ID
    const userSearchUrl = `${API}/users/search?${params}&query=${encodeURIComponent(userHandle)}`;
    const userRes = await fetch(userSearchUrl);
    if (!userRes.ok) {
        const errData = await userRes.json().catch(()=>({}));
        throw new Error(errData.error ||`Búsqueda de artista fallida: ${userRes.statusText}`);
    }
    const userData = await userRes.json();
    const artist = userData?.data?.[0]; // Asumir que el primer resultado es el correcto

    if (!artist || !artist.id) {
      throw new Error(`Artista con handle "${userHandle}" no encontrado.`);
    }
    dispatch(setArtistDetails(artist)); // Guardar detalles del artista

    // 2. Obtener las canciones del artista usando su ID
    const tracksUrl = `${API}/users/${artist.id}/tracks?${params}&sort=popular`; // Ordenar por popularidad
    const tracksRes = await fetch(tracksUrl);
    if (!tracksRes.ok) {
        const errData = await tracksRes.json().catch(()=>({}));
        throw new Error(errData.error || `Obtención de canciones del artista fallida: ${tracksRes.statusText}`);
    }
    const tracksData = await tracksRes.json();
    dispatch(setArtistTracks(tracksData.data || []));

  } catch (error) {
    console.error(`Error en fetchArtistData (handle: ${userHandle}):`, error);
    dispatch(setError(error.message || 'Fallo al obtener datos del artista'));
    // setLoading(false) es manejado por setArtistTracks o setError
  }
};