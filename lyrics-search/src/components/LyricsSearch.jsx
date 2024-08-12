import './LyricsSearch.css';
import Axios from 'axios';
import { useState } from 'react';

function LyricsSearch({ url }) {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');

  const searchLyrics = async (event) => {
    event.preventDefault();
    if (artist === '' || song === '') {
      return;
    }
    setLyrics('');
    setError('');
    try {
      const res = await Axios.get(`${url}/${artist}/${song}`);
      console.log(res.data.lyrics);
      setLyrics(res.data.lyrics);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className='search-container'>
      <h2>Lyrics Search</h2>
      <form onSubmit={searchLyrics}>
        <input
          type='text'
          placeholder='Artist name'
          onChange={(e) => {
            setArtist(e.target.value);
          }}
          required
        />
        <input
          type='text'
          placeholder='Song name'
          onChange={(e) => {
            setSong(e.target.value);
          }}
          required
        />
        <button type='submit'>Search</button>
      </form>
      <hr />
      {error && <h2 className='error'>{error}</h2>}
      <pre>{lyrics}</pre>
    </div>
  );
}

export default LyricsSearch;
