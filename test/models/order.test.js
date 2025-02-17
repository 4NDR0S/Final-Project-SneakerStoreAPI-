const mongoose = require('mongoose');
const Order = require('../../models/order');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Order Model Tests', () => {
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

  test('should create and save an order successfully', async () => {
    const orderData = {
      user_id: 123,
      sneaker_id: 456,
      quantity: 1,
      total_price: 120.00
    };
    
    const validOrder = new Order(orderData);
    const savedOrder = await validOrder.save();
    
    expect(savedOrder._id).toBeDefined();
    expect(savedOrder.user_id).toBe(orderData.user_id);
    expect(savedOrder.sneaker_id).toBe(orderData.sneaker_id);
    expect(savedOrder.quantity).toBe(orderData.quantity);
    expect(savedOrder.total_price).toBe(orderData.total_price);
  });

  test('should fail when required fields are missing', async () => {
    const orderData = { 
      sneaker_id: 456,
      quantity: 1,
      total_price: 120.00
    };
    const invalidOrder = new Order(orderData);
    
    let err;
    try {
      await invalidOrder.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.user_id).toBeDefined();
  });
});
