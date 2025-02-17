const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Category = require('../../models/category');

describe('Categories Controller Tests', () => {
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
    await Category.deleteMany({});
  });

  describe('GET /api/categories', () => {
    it('should return all categories', async () => {
      // Create test data
      await Category.create([
        { name: 'Running', description: 'Running shoes' },
        { name: 'Basketball', description: 'Basketball shoes' }
      ]);

      const res = await request(app).get('/api/categories');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty('name', 'Running');
      expect(res.body[1]).toHaveProperty('name', 'Basketball');
    });

    it('should return empty array when no categories exist', async () => {
      const res = await request(app).get('/api/categories');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('GET /api/categories/:id', () => {
    it('should return a single category', async () => {
      const category = await Category.create({
        name: 'Running',
        description: 'Running shoes'
      });

      const res = await request(app).get(`/api/categories/${category._id}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name', 'Running');
      expect(res.body).toHaveProperty('description', 'Running shoes');
    });

    it('should return 404 when category not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/categories/${nonExistentId}`);
      
      expect(res.statusCode).toEqual(404);
    });
  });
});
