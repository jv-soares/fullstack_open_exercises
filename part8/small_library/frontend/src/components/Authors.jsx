import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { EDIT_AUTHOR } from '../mutations';
import { ALL_AUTHORS } from '../queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const [authorToEdit, setAuthorToEdit] = useState(null);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <p>loading...</p>;
  }

  const submitEditedAuthor = (editedAuthor) => {
    editAuthor({ variables: editedAuthor });
    setAuthorToEdit(null);
  };

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((author) => (
            <AuthorDetails
              key={author.id}
              author={author}
              isEditing={authorToEdit?.id === author.id}
              canEdit={props.canEdit}
              onEditClick={() => setAuthorToEdit(author)}
              onSubmit={submitEditedAuthor}
              onCancel={setAuthorToEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AuthorDetails = ({
  author,
  isEditing,
  canEdit,
  onEditClick,
  onSubmit,
  onCancel,
}) => {
  const [birthYear, setBirthYear] = useState('');

  const submitEditedAuthor = () => {
    const editedAuthor = { name: author.name, setBornTo: parseInt(birthYear) };
    onSubmit(editedAuthor);
    setBirthYear('');
    onCancel();
  };

  return (
    <tr>
      <td>{author.name}</td>
      <td>
        {isEditing ? (
          <input
            type="number"
            onChange={(event) => setBirthYear(event.target.value)}
            style={{ width: 50 }}
            required
          ></input>
        ) : (
          author.born
        )}{' '}
      </td>
      <td>{author.bookCount}</td>
      <td>
        {isEditing ? (
          <div>
            <button
              onClick={submitEditedAuthor}
              disabled={birthYear.length !== 4}
            >
              save
            </button>
            <button onClick={onCancel}>cancel</button>
          </div>
        ) : (
          canEdit && <button onClick={onEditClick}>edit</button>
        )}
      </td>
    </tr>
  );
};

export default Authors;
