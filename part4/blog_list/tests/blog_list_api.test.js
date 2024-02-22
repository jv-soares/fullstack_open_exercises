const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const mongoose = require('mongoose');
const helper = require('./test_helper');

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('GET /api/blogs', () => {
  test('blog list has correct length', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('blog has id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('POST /api/blogs', () => {
  test('blog likes default to 0', async () => {
    const newBlog = {
      title: 'test',
      author: 'joao soares',
      url: 'https://test.com',
    };

    const response = await api.post('/api/blogs').send(newBlog);

    expect(response.body.likes).toBe(0);
  });

  test('succeeds when request is correct', async () => {
    const newBlog = {
      title: 'Minimal Collective',
      author: 'joao soares',
      url: 'https://www.minimalcollective.digital/',
    };

    const response = await api
      .post('/api/blogs')
      .auth('token', { type: 'bearer' })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const savedBlogs = await helper.blogsInDb();
    expect(savedBlogs).toHaveLength(helper.initialBlogs.length + 1);

    const savedBlogsWithoutId = savedBlogs.map(({ title, author, url }) => ({
      title,
      author,
      url,
    }));
    expect(savedBlogsWithoutId).toContainEqual(newBlog);
    expect(response.body.user).toBeDefined();
  });

  test('fails if blog has no title', async () => {
    const newBlog = {
      author: 'joao soares',
      url: 'https://test.com',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('fails if blog has no url', async () => {
    const newBlog = {
      author: 'joao soares',
      title: 'test',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('DELETE /api/blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    expect(blogsAtEnd).not.toContainEqual(blogToDelete);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '123';
    await api.delete(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe('PUT /api/blogs', () => {
  test('succeeds with status code 201 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toEqual(updatedBlog);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toContainEqual(updatedBlog);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '123';
    await api.put(`/api/blogs/${invalidId}`).expect(400);
  });
});
