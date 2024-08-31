const blogsRouter = require('express').Router();
const middleware = require('../utils/middleware');

const Blog = require('../models/blog');
const Comment = require('../models/comment');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user;
      if (!user) return response.status(401).end();
      const blog = { ...request.body, user: user.id };
      const savedBlog = await Blog(blog).save();
      user.blogs = user.blogs.concat(savedBlog.id);
      await user.save();
      await savedBlog.populate('user', { name: 1, username: 1 });
      response.status(201).json(savedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const blogId = request.params.id;
      const blog = await Blog.findById(blogId);
      if (!blog) return response.status(404).json({ error: 'blog not found' });
      if (blog.user.toString() === request.user.id) {
        await blog.deleteOne();
        response.status(204).end();
      } else {
        response.status(401).end();
      }
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const result = await Blog.findByIdAndUpdate(id, request.body, {
      new: true,
      runValidators: true,
    }).populate('user', { name: 1, username: 1 });
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id/comments', async (request, response) => {
  const blogId = request.params.id;
  const comments = await Comment.find({ blog: blogId }).populate('blog', {
    id: 1,
  });
  response.json(comments);
});

blogsRouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const blogId = request.params.id;
      const user = request.user;
      if (!user) return response.status(401).end();
      const comment = { ...request.body, blog: blogId };
      const savedComment = await Comment(comment).save();
      await savedComment.populate('blog', { id: 1 });
      response.status(201).json(savedComment);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = blogsRouter;
