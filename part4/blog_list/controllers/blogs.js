const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const { id } = jwt.verify(request.token, process.env.JWT_SECRET);
    if (!id) return response.status(401).end({ error: 'invalid token' });
    const user = await User.findById(id);
    if (!user) return response.status(401).end();
    const blog = { ...request.body, user: user.id };
    const savedBlog = await Blog(blog).save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const { id: userId } = jwt.verify(request.token, process.env.JWT_SECRET);
    if (!userId) return response.status(401).json({ error: 'invalid token' });
    const blogId = request.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) return response.status(404).json({ error: 'blog not found' });
    if (blog.user.toString() === userId) {
      await blog.deleteOne();
      response.status(204).end();
    } else {
      response.status(401).end();
    }
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
