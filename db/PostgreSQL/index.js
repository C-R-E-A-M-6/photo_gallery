const { Client } = require('pg');

const client = new Client({
  user: 'sdc',
  host: 'localhost',
  database: 'photogallery'
})

client.connect();

module.exports = client;