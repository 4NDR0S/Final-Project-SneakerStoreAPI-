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
    const sneakerId = '67a2d0b9cbf3281171e49ac7';
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

  //CATEGORIES TEST

  describe('API GET Categories Endpoints', () => {
  it('should fetch all categories', async () => {
    const res = await request(app).get('/api/categories');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // Expect at least one category in the response

    const category = res.body[0];
    expect(category).toHaveProperty('_id');
    expect(category).toHaveProperty('name');
    expect(category).toHaveProperty('description');
  });

  it('should fetch a single category by ID', async () => {
    const categoryId = '67a2cf2ecbf3281171e49aae'; // Example ID
    const res = await request(app).get(`/api/categories/${categoryId}`);

    expect(res.statusCode).toEqual(200);
    const category = res.body;
    expect(category).toHaveProperty('_id');
    expect(category).toHaveProperty('name');
    expect(category).toHaveProperty('description');
  });

  it('should return 404 for non-existing category', async () => {
    const res = await request(app).get('/api/categories/9999'); // ID that does not exist
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('Category not found');
  });
});

//ORDERS TESTS

describe('API GET Orders Endpoints', () => {
  it('should fetch all orders', async () => {
    const res = await request(app).get('/api/orders');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // Expect at least one order in the response

    const order = res.body[0];
    expect(order).toHaveProperty('_id');
    expect(order).toHaveProperty('user_id');
    expect(order).toHaveProperty('sneaker_id');
    expect(order).toHaveProperty('quantity');
    expect(order).toHaveProperty('total_price');
    expect(order).toHaveProperty('status');
  });

  it('should fetch a single order by ID', async () => {
    const orderId = '67a2d08acbf3281171e49abc'; // Example ID
    const res = await request(app).get(`/api/orders/${orderId}`);

    expect(res.statusCode).toEqual(200);
    const order = res.body;
    expect(order).toHaveProperty('_id');
    expect(order).toHaveProperty('user_id');
    expect(order).toHaveProperty('sneaker_id');
    expect(order).toHaveProperty('quantity');
    expect(order).toHaveProperty('total_price');
    expect(order).toHaveProperty('status');
  });

  it('should return 404 for non-existing order', async () => {
    const res = await request(app).get('/api/orders/9999'); // ID that does not exist
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('Order not found');
  });
});

//USERS TESTS

describe('API GET Users Endpoints', () => {
  it('should fetch all users', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); // Expect at least one user in the response

    const user = res.body[0];
    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    expect(user).toHaveProperty('phone');
  });

  it('should fetch a single user by ID', async () => {
    const userId = '67a2d0dacbf3281171e49ad6'; // Example ID
    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.statusCode).toEqual(200);
    const user = res.body;
    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    expect(user).toHaveProperty('phone');
  });

  it('should return 404 for non-existing user', async () => {
    const res = await request(app).get('/api/users/9999'); // ID that does not exist
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('User not found');
  });
});