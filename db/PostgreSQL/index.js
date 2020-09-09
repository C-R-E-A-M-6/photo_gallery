const { Pool } = require('pg');

const pool = new Pool({
  user: 'sdc',
  host: 'localhost',
  database: 'photogallery'
})

pool.connect();

module.exports = pool;