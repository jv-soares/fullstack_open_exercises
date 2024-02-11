const Blog = require('../models/blog');
const blogsRouter = require('express').Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
