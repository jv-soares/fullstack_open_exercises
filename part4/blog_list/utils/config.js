require('dotenv').config();

const port = 3003;
const mongoUrl =
    process.env.NODE_ENV === 'test'
        ? process.env.MONGODB_TEST_URI
        : process.env.MONGODB_URI;

module.exports = { port, mongoUrl };
