const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Sneaker = require('../../models/sneaker');

describe('Sneaker Controller Tests', () => {
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
    await Sneaker.deleteMany({});
  });

  describe('GET /api/sneakers', () => {
    it('should return all sneakers', async () => {
      // Create test data
      await Sneaker.create([
        { name: 'Air Max 90', brand: 'Nike', price: 150.00, size: 10, color: 'Black/White' },
        { name: 'Classic', brand: 'Reebok', price: 80.00, size: 9, color: 'White' }
      ]);

      const res = await request(app).get('/api/sneakers');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty('name', 'Air Max 90');
      expect(res.body[1]).toHaveProperty('name', 'Classic');
    });

    it('should return empty array when no sneakers exist', async () => {
      const res = await request(app).get('/api/sneakers');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('GET /api/sneakers/:id', () => {
    it('should return a single sneaker', async () => {
      const sneaker = await Sneaker.create({
        name: 'Air Max 90',
        brand: 'Nike',
        price: 150.00,
        size: 10,
        color: 'Black/White'
      });

      const res = await request(app).get(`/api/sneakers/${sneaker._id}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Air Max 90');
      expect(res.body).toHaveProperty('brand', 'Nike');
    });

    it('should return 404 when sneaker not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/sneakers/${nonExistentId}`);
      
      expect(res.statusCode).toEqual(404);
    });
  });
});
