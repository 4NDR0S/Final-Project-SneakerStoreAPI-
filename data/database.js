const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;

let database;

// Import models
const User = require('../models/user');
const Sneaker = require('../models/sneaker');
const Order = require('../models/order');
const Category = require('../models/category');

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase,
    User,
    Sneaker,
    Order,
    Category
};
