import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return initialState;
    },
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(addNotification(content));
    setTimeout(() => dispatch(clearNotification()), seconds * 1000);
  };
};

export default notificationSlice.reducer;
