import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const text = event.target.anecdote.value;
    if (text === '') return;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.createNew(text);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`you created "${newAnecdote.content}"`));
    setTimeout(() => dispatch(clearNotification()), 5000);
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
