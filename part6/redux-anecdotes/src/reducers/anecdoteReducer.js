import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

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
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteFor, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
