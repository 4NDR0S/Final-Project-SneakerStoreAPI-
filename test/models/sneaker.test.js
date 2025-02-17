const mongoose = require('mongoose');
const Sneaker = require('../../models/sneaker');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Sneaker Model Tests', () => {
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

  test('should create and save a sneaker successfully', async () => {
    const sneakerData = {
      name: 'Air Max 90',
      brand: 'Nike',
      price: 150.00,
      size: 10,
      color: 'Black/White'
    };
    
    const validSneaker = new Sneaker(sneakerData);
    const savedSneaker = await validSneaker.save();
    
    expect(savedSneaker._id).toBeDefined();
    expect(savedSneaker.name).toBe(sneakerData.name);
    expect(savedSneaker.brand).toBe(sneakerData.brand);
    expect(savedSneaker.price).toBe(sneakerData.price);
    expect(savedSneaker.size).toBe(sneakerData.size);
    expect(savedSneaker.color).toBe(sneakerData.color);
  });

  test('should fail when required fields are missing', async () => {
    const sneakerData = { 
      brand: 'Nike',
      price: 150.00,
      size: 10,
      color: 'Black/White'
    };
    const invalidSneaker = new Sneaker(sneakerData);
    
    let err;
    try {
      await invalidSneaker.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });
});
