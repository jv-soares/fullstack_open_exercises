import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const text = event.target.anecdote.value;
    if (text === '') return;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(text));
    dispatch(setNotification(`you created '${text}'`, 10));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
