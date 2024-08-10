import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const anecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes');
      notificationDispatch({ type: 'CREATED', payload: anecdote.content });
      setTimeout(() => notificationDispatch({ type: 'CLEARED' }), 5000);
    },
    onError: (error) => {
      notificationDispatch({
        type: 'ERROR',
        payload: error.response.data.error,
      });
      setTimeout(() => notificationDispatch({ type: 'CLEARED' }), 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    anecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
