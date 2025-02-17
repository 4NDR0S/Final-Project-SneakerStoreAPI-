const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/user');

describe('User Controller Tests', () => {
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
    await User.deleteMany({});
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      // Create test data
      await User.create([
        { username: 'user1', email: 'user1@example.com', password: 'pass1' },
        { username: 'user2', email: 'user2@example.com', password: 'pass2' }
      ]);

      const res = await request(app).get('/api/users');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty('username', 'user1');
      expect(res.body[1]).toHaveProperty('username', 'user2');
    });

    it('should return empty array when no users exist', async () => {
      const res = await request(app).get('/api/users');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a single user', async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      const res = await request(app).get(`/api/users/${user._id}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('should return 404 when user not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/users/${nonExistentId}`);
      
      expect(res.statusCode).toEqual(404);
    });
  });
});
