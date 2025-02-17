const mongoose = require('mongoose');
const User = require('../../models/user');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('User Model Tests', () => {
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

  test('should create and save a user successfully', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };
    
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
  });

  test('should fail when required fields are missing', async () => {
    const userData = { 
      email: 'test@example.com',
      password: 'password123'
    };
    const invalidUser = new User(userData);
    
    let err;
    try {
      await invalidUser.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.username).toBeDefined();
  });
});
