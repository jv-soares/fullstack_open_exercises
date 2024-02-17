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

module.exports = { errorHandler };
