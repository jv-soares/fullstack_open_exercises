const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Viage na Viagem',
    author: 'joao soares',
    url: 'https://www.viajenaviagem.com/',
  },
  {
    title: 'Mit Vergnügen Köln',
    author: 'joao soares',
    url: 'https://koeln.mitvergnuegen.com/',
  },
];

const initialUsers = [
  {
    username: 'test',
    name: 'test test',
    passwordHash: 'test123hash',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((e) => e.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((e) => e.toJSON());
};

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb };
