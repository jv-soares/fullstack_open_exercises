import { useSelector, useDispatch } from 'react-redux';
import { voteFor, createAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const sortedAnecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteFor(id));
  };

  const create = (event) => {
    event.preventDefault();
    const text = event.target.anecdote.value;
    if (text === '') return;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(text));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App;
