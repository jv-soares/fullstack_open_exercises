import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useNotificationDispatch } from './NotificationContext';
import { getAnecdotes, updateAnecdote } from './requests';

const App = () => {
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const anecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes');
      notificationDispatch({ type: 'VOTED', payload: anecdote.content });
      setTimeout(() => notificationDispatch({ type: 'CLEARED' }), 5000);
    },
  });

  const handleVote = (anecdote) => {
    anecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    retry: false,
    queryFn: getAnecdotes,
  });

  if (result.isLoading) {
    return <div>loading...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
