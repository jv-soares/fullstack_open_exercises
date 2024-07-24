import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filterText = filter.toLowerCase();
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filterText)
    );
    const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);
    return sortedAnecdotes;
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteFor(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
