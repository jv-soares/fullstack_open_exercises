require('dotenv').config();

const port = 3003;
const mongoUrl = process.env.MONGODB_URI;

module.exports = { port, mongoUrl };
