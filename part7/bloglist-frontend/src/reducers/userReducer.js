import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userSet: (_state, action) => {
      return action.payload;
    },
    userCleared: () => {
      return null;
    },
  },
});

export const initializeUser = () => {
  return (dispatch) => {
    const userData = window.localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      blogService.setToken(user.token);
      dispatch(userSet(user));
    }
  };
};

export const signIn = (username, password) => {
  return async (dispatch) => {
    const user = await authService.login({ username, password });
    blogService.setToken(user.token);
    window.localStorage.setItem('user', JSON.stringify(user));
    dispatch(userSet(user));
  };
};

export const signOut = () => {
  return (dispatch) => {
    window.localStorage.clear();
    dispatch(userCleared());
  };
};

export const { userSet, userCleared } = userSlice.actions;

export default userSlice.reducer;
