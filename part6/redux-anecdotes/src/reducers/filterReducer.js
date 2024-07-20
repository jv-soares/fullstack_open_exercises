const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.text;
  }
  return state;
};

export const setFilter = (text) => {
  return { type: 'SET_FILTER', payload: { text } };
};

export default filterReducer;
