const mongoose = require('mongoose');
const data = require('./data');
const { Property } = require('./models/Property');

mongoose.connect('mongodb://localhost/airbnb-gallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongodb://localhost/airbnb-gallery');
});

// create 100 homes
for (let i = 1; i <= 100; i++) {
  let uniqueDescription = data.createDescription();
  let newPropertyObj = {
    _id: i,
    description: uniqueDescription,
    starRating: data.createStarRating(),
    reviewTotal: data.createTotalReviews(),
    superhost: data.isSuperhost(),
    location: data.createLocation(uniqueDescription),
    images: data.createImageCollection()
  };
  //create new property
  let newProperty = new Property(newPropertyObj);

  newProperty.save((err) => {
    err ? console.log('error', err) : console.log('inserted data')
  })
}