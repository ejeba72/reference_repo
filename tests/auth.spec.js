const request = require('supertest');
const { mongoDB } = require('./database');
const UserModel = require('../Models/userModel');
const app = require('../server');

describe('Auth: Signup', () => {
  let conn;

  beforeAll(async () => {
    conn = await mongoDB();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it('should signup a user', async () => {
    const response = await request(app)
      .post('/signup')
      .set('content-type', 'application/json')
      .send({
        firstName: 'Bernard',
        lastName: 'Okafor',
        email: 'bernard@gmail.com',
        password: 'bernard123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('firstName', 'Bernard');
    expect(response.body.user).toHaveProperty('lastname', 'Okafor');
    expect(response.body.user).toHaveProperty('email', 'bernard@gmail.com');
    expect(response.body.user).toHaveProperty('password', 'bernard123');
  });

  it('should login a user', async () => {
    // create user in out db
    const user = await UserModel.create({
      email: 'bernard@gmail.com',
      password: 'bernard123',
    });

    // login user
    const response = await request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'bernard@gmail.com',
        password: 'bernard123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
