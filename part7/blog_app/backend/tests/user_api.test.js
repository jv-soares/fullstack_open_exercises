const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe('POST /api/users', () => {
  test('should succeed when request contains all info needed', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: 'docputs',
      name: 'joao soares',
      password: 'joao123',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((e) => e.username);
    expect(usernames).toContain(user.username);
  });

  test('should fail when request doesnt contain username', async () => {
    const user = {
      name: 'joao soares',
      password: 'joao123',
    };

    const response = await api.post('/api/users').send(user).expect(400);

    expect(response.body.error).toContain('`username` is required');
  });

  test('should fail when request doesnt contain password', async () => {
    const user = {
      username: 'docputs',
      name: 'joao soares',
    };

    const response = await api.post('/api/users').send(user).expect(400);

    expect(response.body.error).toContain('password is required');
  });

  test('should fail when username already exists', async () => {
    const user = {
      username: 'test',
      name: 'joao soares',
      password: 'joao123',
    };

    const response = await api.post('/api/users').send(user).expect(400);

    expect(response.body.error).toContain('expected `username` to be unique');
  });

  test('should fail when username is less than 3 char long', async () => {
    const user = { username: 'do', name: 'joao soares', password: 'joao123' };

    const response = await api.post('/api/users').send(user).expect(400);

    expect(response.body.error).toContain('username');
    expect(response.body.error).toContain('length');
  });

  test('should fail when password is less than 3 char long', async () => {
    const user = { username: 'docputs', name: 'joao soares', password: 'jo' };

    const response = await api.post('/api/users').send(user).expect(400);

    expect(response.body.error).toContain('password');
    expect(response.body.error).toContain('at least 3 characters');
  });
});

describe('GET /api/users', () => {
  test('should get all users', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialUsers.length);
  });
});
