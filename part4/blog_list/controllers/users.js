const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    if (!password) {
      return response.status(400).json({ error: 'password is required' });
    }
    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: 'password must be at least 3 characters long' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User({ username, name, passwordHash }).save();
    response.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
    });
    response.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
