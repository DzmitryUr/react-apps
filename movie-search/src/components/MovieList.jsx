import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import './CharacterList.css'; // Import the CSS file

// Fetch data function
const fetchData = async (name) => {
  const response = await axios.get('https://api.disneyapi.dev/character', {
    params: { name },
  });
  return response.data;
};

function CharacterList() {
  const [searchTerm, setSearchTerm] = useState(''); // Controlled input value
  const [queryTerm, setQueryTerm] = useState('cat'); // State for actual search term

  // UseQuery to fetch data based on query term
  const { isLoading, error, data } = useQuery({
    queryKey: ['characterData', queryTerm],
    queryFn: () => fetchData(queryTerm),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
    refetchOnWindowFocus: 'always', // Disable refetching on window focus
  });

  // Handle input changes
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    setQueryTerm(searchTerm);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className='container'>
      <h2>Search Disney Characters</h2>

      {/* Search Input and Button */}
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search characters...'
          value={searchTerm}
          onChange={handleInputChange}
          className='search-input'
        />
        <button onClick={handleSearch} className='search-button'>
          Search
        </button>
      </div>

      {/* Character Results */}
      <div className='character-list'>
        {data?.data?.length ? (
          data.data.map((character) => (
            <div className='character-card' key={character.id}>
              <h2>{character.name}</h2>
              <img
                src={character.imageUrl}
                alt={character.name}
                className='character-image'
              />
            </div>
          ))
        ) : (
          <p>No characters found for "{queryTerm}"</p>
        )}
      </div>
    </div>
  );
}

export default CharacterList;
