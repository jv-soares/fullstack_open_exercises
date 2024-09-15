const jwt = require('jsonwebtoken');

const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
  console.error(error);
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    request.token = token;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const { id } = jwt.verify(request.token, process.env.JWT_SECRET);
    if (id) {
      const user = await User.findById(id);
      request.user = user;
    }
  } else {
    response.status(401).json({ error: 'unauthorized' });
  }
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
