import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 });
  return response.data;
};

const update = async (anecdote) => {
  const url = `${baseUrl}/${anecdote.id}`;
  const data = { content: anecdote.content, votes: anecdote.votes };
  const response = await axios.put(url, data);
  return response.data;
};

export default { getAll, create, update };
