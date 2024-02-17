const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

async function getUser(request) {
  const authHeader = request.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    return user;
  }
}

blogsRouter.post('/', async (req, res, next) => {
  try {
    const user = await getUser(req);
    if (!user) return res.status(401).end();
    const blog = { ...req.body, user: user.id };
    const savedBlog = await Blog(blog).save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
