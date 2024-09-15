import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (_state, action) => action.payload,
    clearNotification: () => null,
  },
});

export const showNotification = (notification) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => dispatch(clearNotification()), 3000);
  };
};

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
