const request = require('supertest');
const { mongoDB } = require('./database');
const app = require('../server');
const OrderModel = require('../Models/BlogModel');
const UserModel = require('../Models/UserModel');

describe('Post Route', () => {
  let conn;
  let token;

  beforeAll(async () => {
    conn = await mongoDB();

    await UserModel.create({
      email: 'bernard@gmail.com',
      password: 'bernard123',
    });

    const loginResponse = await request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'bernard@gmail.com',
        password: 'bernard123',
      });

    token = loginResponse.body.token;
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it('should return created post', async () => {
    // create post and save it to db
    const savedBlog = await Blog.create({
      title: 'The opportunities in tech',
      description: 'A post about the opportunities in the tech industry',
      author: 'Bernard Okafor',
      body: 'hello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dks hello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dks hello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dks hello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dkshello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dks hello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dkshello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dkshello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dkshello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dkshello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dks hello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dkshello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dkshello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dkshello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dkshello, world! Great to meet you. flhsdhfhfsdl fksad lfsldkfsadfok  lsdklsdklsdksdfksdlksd ksdlkfsdklsdlkfsd klsdlkf dks',
      state: 'draft',
    });

    const response = await request(app)
      .get('/api/v1/posts')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('Blog', 'savedBlog');
    expect(response.body).toHaveProperty(
      'status',
      'Your blog post has been created successfully'
    );
  });

  it('It should get all posts for authenticated author', async () => {
    // Get all posts from db
    const allBlogs = await Blog.find();

    const response = await request(app)
      .get('/api/v1/posts?state=draft')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('allBlogs');
    expect(
      response.body.orders.every(allBlogs => allBlogs.state === 'draft')
    ).toBe(true);
  });
});
