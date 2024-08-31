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

const update = async (blog) => {
  const headers = { Authorization: authToken };
  const data = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  };
  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.put(url, data, { headers });
  return response.data;
};

const remove = async (blogId) => {
  const headers = { Authorization: authToken };
  const url = `${baseUrl}/${blogId}`;
  const response = await axios.delete(url, { headers });
  return response.status === 204;
};

const getComments = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`);
  return response.data;
};

const postComment = async (blogId, comment) => {
  const headers = { Authorization: authToken };
  const data = { content: comment };
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, data, {
    headers,
  });
  return response.data;
};

export default {
  setToken,
  getAll,
  create,
  update,
  remove,
  getComments,
  postComment,
};
