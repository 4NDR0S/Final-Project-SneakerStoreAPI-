const request = require('supertest');
const app = require('../index');

describe('API POST Sneaker Endpoints', () => {
  it('should create new sneaker', async () => {
    const res = await request(app)
      .post('/api/sneakers')
      .send({ title: 'New sneaker', author: 'Paulo Coelho' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('The Alchemist');
  });

  
});