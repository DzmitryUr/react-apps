import { useState } from 'react';

export function SearchBar({ setSearchQuery }) {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      console.log('city=', city);
      setSearchQuery(city.trim());
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <input
        type='text'
        placeholder='Enter city name'
        className='p-2 border border-gray-300 rounded'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type='submit' className='ml-2 p-2 bg-blue-500 text-white rounded'>
        Search
      </button>
    </form>
  );
}
