const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Order = require('../../models/order');

describe('Order Controller Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Order.deleteMany({});
  });

  describe('GET /api/orders', () => {
    it('should return all orders', async () => {
      // Create test data
      await Order.create([
        { user_id: 123, sneaker_id: 456, quantity: 1, total_price: 120.00 },
        { user_id: 124, sneaker_id: 457, quantity: 2, total_price: 240.00 }
      ]);

      const res = await request(app).get('/api/orders');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty('user_id', 123);
      expect(res.body[1]).toHaveProperty('user_id', 124);
    });

    it('should return empty array when no orders exist', async () => {
      const res = await request(app).get('/api/orders');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should return a single order', async () => {
      const order = await Order.create({
        user_id: 123,
        sneaker_id: 456,
        quantity: 1,
        total_price: 120.00
      });

      const res = await request(app).get(`/api/orders/${order._id}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user_id', 123);
      expect(res.body).toHaveProperty('sneaker_id', 456);
    });

    it('should return 404 when order not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/orders/${nonExistentId}`);
      
      expect(res.statusCode).toEqual(404);
    });
  });
});
