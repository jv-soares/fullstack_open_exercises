const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const mongoose = require('mongoose');
const helper = require('./test_helper.test');

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});
    for (const blog of helper.initialBlogs) {
        await Blog(blog).save();
    }
});

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

test('post new blog', async () => {
    const newBlog = {
        title: 'Minimal Collective',
        author: 'joao soares',
        url: 'https://www.minimalcollective.digital/',
    };

    await api
        .post('/api/blogs')
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
});

test('blog likes default to 0', async () => {
    const newBlog = {
        title: 'test',
        author: 'joao soares',
        url: 'https://test.com',
    };

    const response = await api.post('/api/blogs').send(newBlog);

    expect(response.body.likes).toBe(0);
});

describe('bad request', () => {
    test('if blog has no title', async () => {
        const newBlog = {
            author: 'joao soares',
            url: 'https://test.com',
        };

        await api.post('/api/blogs').send(newBlog).expect(400);
    });

    test('if blog has no url', async () => {
        const newBlog = {
            author: 'joao soares',
            title: 'test',
        };

        await api.post('/api/blogs').send(newBlog).expect(400);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
