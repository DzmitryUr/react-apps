import Axios from 'axios';
import { useState } from 'react';
import './MockData.css';

const cache = {};
const cacheAge = 5000;

const isCacheActive = (time) => {
  const diff = Date.now() - time;
  console.log('diff=', diff);
  return diff <= cacheAge;
};

function MockData({ url }) {
  const [books, setBooks] = useState([]);
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState('');

  const getBooks = async () => {
    clearData();
    try {
      if (cache.books && isCacheActive(cache.booksRequestTime)) {
        setBooks(cache.books);
      } else {
        const response = await Axios.get(`${url}/books`);
        console.log('books response=', response.data.data);
        setBooks(response.data.data);
        cache.booksRequestTime = Date.now();
        cache.books = response.data.data;
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const getPersons = async () => {
    clearData();
    try {
      if (cache.persons && isCacheActive(cache.personsRequestTime)) {
        setPersons(cache.persons);
      } else {
        const response = await Axios.get(`${url}/persons`);
        console.log('parsons response=', response.data.data);
        setPersons(response.data.data);
        cache.personsRequestTime = Date.now();
        cache.persons = response.data.data;
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const clearData = () => {
    setBooks([]);
    setPersons([]);
    setError('');
  };

  return (
    <div>
      <h2>Mock Data</h2>
      {error && <h2>{error}</h2>}
      <button onClick={getBooks}>Books</button>
      <button onClick={getPersons}>Persons</button>
      <table>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.author}</td>
              <td>{book.title}</td>
            </tr>
          ))}

          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.firstname}</td>
              <td>{person.lastname}</td>
              <td>{person.birthday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MockData;
