const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'password is required' });
    }
    if (password.length < 3) {
      return res
        .status(400)
        .json({ error: 'password must be at least 3 characters long' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User({ username, name, passwordHash }).save();
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
