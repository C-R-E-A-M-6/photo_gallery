const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/airbnb-gallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//create connection and export to use in other files
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb://localhost/airbnb-gallery');
});


module.exports = db;
