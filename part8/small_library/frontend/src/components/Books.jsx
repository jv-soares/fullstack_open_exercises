import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const result = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      const genres = new Set();
      for (const book of data.allBooks) {
        for (const genre of book.genres) {
          genres.add(genre);
        }
      }
      setAllGenres([...genres]);
    },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <p>loading...</p>;
  }

  const books = result.data.allBooks;

  const byGenre = (book) => {
    if (selectedGenre) {
      return book.genres.some((genre) => genre === selectedGenre);
    } else {
      return book;
    }
  };

  return (
    <div>
      <h2>books</h2>
      <GenreFilter
        allGenres={allGenres}
        selectedGenre={selectedGenre}
        onChange={setSelectedGenre}
      />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(byGenre).map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GenreFilter = ({ allGenres, selectedGenre, onChange }) => {
  return (
    <div>
      {allGenres.map((genre) => (
        <span key={genre} style={{ marginRight: 10 }}>
          <input
            type="radio"
            value={genre}
            checked={selectedGenre === genre}
            onChange={(event) => onChange(event.target.value)}
            radioGroup="genre"
          />
          <label>{genre}</label>
        </span>
      ))}
      <div>
        <input
          type="radio"
          checked={!selectedGenre}
          onChange={() => onChange(null)}
        />
        <label>all genres</label>
      </div>
    </div>
  );
};

export default Books;
