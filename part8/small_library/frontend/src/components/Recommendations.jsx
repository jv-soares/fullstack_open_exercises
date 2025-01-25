import { useQuery } from '@apollo/client';
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries';

const Recommendations = (props) => {
  const allBooksResult = useQuery(ALL_BOOKS);
  const favoriteGenreResult = useQuery(FAVORITE_GENRE);

  if (!props.show) {
    return null;
  }

  if (allBooksResult.loading || favoriteGenreResult.loading) {
    return <p>loading...</p>;
  }

  const books = allBooksResult.data.allBooks;
  const favoriteGenre = favoriteGenreResult.data.me.favoriteGenre;

  const byGenre = (book) =>
    book.genres.some((genre) => genre === favoriteGenre);

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        based on your favorite genre <strong>{favoriteGenre}</strong>
      </p>
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

export default Recommendations;
