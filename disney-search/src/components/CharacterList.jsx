import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './CharacterList.css';
import { useState } from 'react';

const fetchData = async (name) => {
  const response = await axios.get('https://api.disneyapi.dev/character', {
    params: { name },
  });
  console.log('response', response);
  return response.data;
};
function CharacterList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryTerm, setQueryTerm] = useState('cat');
  const { isPending, error, data } = useQuery({
    queryKey: ['character', queryTerm],
    queryFn: () => fetchData(queryTerm),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: 'always',
  });

  const handleSearch = () => {
    setQueryTerm(searchTerm);
  };

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className='container'>
      <h2>Search Disney Character</h2>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search characters...'
          className='search-input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className='character-list'>
        {data?.data?.length ? (
          data.data.map((character) => (
            <div className='character-card' key={character._id}>
              <h2>{character.name}</h2>
              <img
                src={character.imageUrl}
                alt={character.name}
                className='character-image'
              />
            </div>
          ))
        ) : (
          <p>No characters found</p>
        )}
      </div>
    </div>
  );
}

export default CharacterList;
