const { connect, connection, set } = require('mongoose');
const { config } = require('dotenv');

// DOTENV CONFIG
config();

const DB_URI = process.env.DB_URI;

// DEPRECATION ISSUE
set('strictQuery', false);

mongoDB().catch(err => console.log(err.message));

async function mongoDB() {
  await connect(DB_URI);
}

connection.on('connected', () => {
  console.log('MongoDB is connected, successfully');
});

module.exports = { mongoDB };
