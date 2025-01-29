import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS, ALL_GENRES } from '../queries';

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const allGenresResult = useQuery(ALL_GENRES);

  const allBooksResult = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });

  if (!props.show) {
    return null;
  }

  if (allBooksResult.loading || allGenresResult.loading) {
    return <p>loading...</p>;
  }

  const books = allBooksResult.data.allBooks;

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
        allGenres={allGenresResult.data.allGenres}
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
