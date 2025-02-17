const mongoose = require('mongoose');
const Category = require('../../models/category');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Category Model Tests', () => {
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

  test('should create and save a category successfully', async () => {
    const categoryData = {
      name: 'Running',
      description: 'Shoes designed for running'
    };
    
    const validCategory = new Category(categoryData);
    const savedCategory = await validCategory.save();
    
    expect(savedCategory._id).toBeDefined();
    expect(savedCategory.name).toBe(categoryData.name);
    expect(savedCategory.description).toBe(categoryData.description);
  });

  test('should fail when required fields are missing', async () => {
    const categoryData = { description: 'Missing name field' };
    const invalidCategory = new Category(categoryData);
    
    let err;
    try {
      await invalidCategory.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });
});
