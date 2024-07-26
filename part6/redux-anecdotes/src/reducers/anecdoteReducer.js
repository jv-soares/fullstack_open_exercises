import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteFor: (state, action) => {
      const id = action.payload;
      const anecdote = state.find((e) => e.id === id);
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((e) => (e.id !== id ? e : changedAnecdote));
    },
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteFor, createAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
