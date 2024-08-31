const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

const createBlogsWithUserId = (userId) => {
  return [
    {
      title: 'Viage na Viagem',
      author: 'joao soares',
      url: 'https://www.viajenaviagem.com/',
      user: userId,
    },
    {
      title: 'Mit Vergnügen Köln',
      author: 'joao soares',
      url: 'https://koeln.mitvergnuegen.com/',
      user: userId,
    },
  ];
};

const testUser = {
  username: 'test',
  name: 'test test',
  passwordHash: 'test123hash',
};

const initialUsers = [testUser];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((e) => e.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((e) => e.toJSON());
};

const getAuthToken = async () => {
  const user = await User.findOne({ username: testUser.username });
  if (user) {
    return jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
  }
};

module.exports = {
  createBlogsWithUserId,
  testUser,
  initialUsers,
  blogsInDb,
  usersInDb,
  getAuthToken,
};
