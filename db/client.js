// const { Client } = require('pg');

// const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/gamestore';

// const client = new Client({
//   connectionString,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
// });

// module.exports = client;

const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:2552@localhost:5432/gamestore';

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;
