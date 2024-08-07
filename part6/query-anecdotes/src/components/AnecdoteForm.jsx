import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const anecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries('anecdotes'),
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
