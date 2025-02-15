const request = require('supertest');
const app = require('../server_test');

describe('API GET Sneaker Endpoints', () => {
  it('should fetch all sneakers', async () => {
    const res = await request(app).get('/api/sneakers');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // Expect at least one sneaker in the response

    const sneaker = res.body[0];
    expect(sneaker).toHaveProperty('_id');
    expect(sneaker).toHaveProperty('name');
    expect(sneaker).toHaveProperty('brand');
    expect(sneaker).toHaveProperty('category_id');
    expect(sneaker).toHaveProperty('price');
    expect(sneaker).toHaveProperty('stock');
  });

  it('should fetch a single sneaker by ID', async () => {
    const sneakerId = '67a2d0b9cbf3281171e49ac7'; // Replace this with the real ID from your database
    const res = await request(app).get(`/api/sneakers/${sneakerId}`);

    expect(res.statusCode).toEqual(200);
    const sneaker = res.body;
    expect(sneaker).toHaveProperty('_id');
    expect(sneaker).toHaveProperty('name');
    expect(sneaker).toHaveProperty('brand');
    expect(sneaker).toHaveProperty('category_id');
    expect(sneaker).toHaveProperty('price');
    expect(sneaker).toHaveProperty('stock');
  });

  it('should return 404 for non-existing sneaker', async () => {
    const res = await request(app).get('/api/sneakers/9999'); // ID that does not exist, just for test
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('Sneaker not found');
  });
});