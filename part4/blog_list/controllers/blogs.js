const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const anyUser = await User.findOne();
    if (!anyUser) {
      return res.status(500).end();
    }
    const blog = { ...request.body, user: anyUser.id };
    const savedBlog = await Blog(blog).save();
    anyUser.blogs = anyUser.blogs.concat(savedBlog.id);
    await anyUser.save();
    response.status(201).json(savedBlog);
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

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const result = await Blog.findByIdAndUpdate(id, request.body, {
      new: true,
      runValidators: true,
    });
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
