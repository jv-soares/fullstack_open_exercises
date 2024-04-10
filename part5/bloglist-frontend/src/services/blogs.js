import axios from 'axios';
const baseUrl = '/api/blogs';

let authToken = null;

const setToken = (token) => {
  authToken = `Bearer ${token}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog) => {
  const headers = { Authorization: authToken };
  const data = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
  };
  const response = await axios.post(baseUrl, data, { headers });
  return response.data;
};

export default { getAll, create, setToken };
