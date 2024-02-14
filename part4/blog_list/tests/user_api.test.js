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

    await api.post('/api/users').send(user).expect(400);
  });

  test('should fail when request doesnt contain password', async () => {
    const user = {
      username: 'docputs',
      name: 'joao soares',
    };

    await api.post('/api/users').send(user).expect(400);
  });

  test('should fail when username already exists', async () => {
    const user = {
      username: 'test',
      name: 'joao soares',
      password: 'joao123',
    };

    await api.post('/api/users').send(user).expect(400);
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
