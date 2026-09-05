const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Database is already initialized.');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            console.log('Connected to MongoDB');
            callback(null, _db);
        })
        .catch((error) => {
            callback(error);
        });
};

const getDb = () => {
    if (!_db) {
        throw new Error('Database has not been initialized.');
    }

    return _db;
};

module.exports = {
    initDb,
    getDb
};