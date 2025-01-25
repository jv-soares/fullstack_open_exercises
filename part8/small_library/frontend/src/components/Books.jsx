import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

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
    if (selectedGenres.length === 0) {
      return book;
    } else {
      return book.genres.some((genre) => selectedGenres.includes(genre));
    }
  };

  return (
    <div>
      <h2>books</h2>
      <GenreFilter
        allGenres={allGenres}
        selectedGenres={selectedGenres}
        onChange={(genres) => setSelectedGenres(genres)}
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

const GenreFilter = ({ allGenres, selectedGenres, onChange }) => {
  const changeFilter = (event) => {
    let newGenres = [];
    const genre = event.target.value;
    if (event.target.checked) {
      newGenres = [...selectedGenres, genre];
    } else {
      newGenres = selectedGenres.filter(
        (selectedGenre) => selectedGenre !== genre
      );
    }
    onChange(newGenres);
  };

  const selectOrDeselectAll = () => {
    if (selectedGenres.length === allGenres.length) {
      onChange([]);
    } else {
      onChange(allGenres);
    }
  };

  return (
    <div>
      {allGenres.map((genre) => (
        <span key={genre} style={{ marginRight: 10 }}>
          <input
            type="checkbox"
            value={genre}
            checked={selectedGenres.includes(genre)}
            onChange={changeFilter}
          />
          <label>{genre}</label>
        </span>
      ))}
      <div>
        <input
          type="checkbox"
          checked={selectedGenres.length === allGenres.length}
          onChange={selectOrDeselectAll}
        />
        <label>select/deselect all</label>
      </div>
    </div>
  );
};

export default Books;
