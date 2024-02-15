const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const isPasswordValid = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;
  if (user && isPasswordValid) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    res.send({ token, username: user.username, name: user.name });
  } else {
    res.status(401).send({ error: 'invalid username or password' });
  }
});

module.exports = loginRouter;
