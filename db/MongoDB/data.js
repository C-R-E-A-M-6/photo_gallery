const { Images, Room } = require('./models/Property');
/*------------- START OF HELPER FUNCTIONS------------- */
//create a randomizer function (min, max)
function randomizer(min, max, isRounded = true) {
  let randomNumber;
  if (isRounded) {
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    randomNumber = (Math.random() * (max - min) + min).toFixed(2);
  }
  return randomNumber
};

function createArrayOfImgs(quantity, imageType) {
  let url, max;
  //bedrooms have 14 images and bathrooms have 8
  (imageType === 'bedrooms') ? max = 14 : max = 8;
  let result = [];
  //random numbers storage = []
  let numbers = [];
  while (quantity > 0) {
    let num = randomizer(0, max);

    if (imageType === 'bedroom') {
      url = `https://airbnb-hr-replica.s3-us-west-1.amazonaws.com/fec-data-rooms/room${num}.jpeg`
    } else {
      url = `https://airbnb-hr-replica.s3-us-west-1.amazonaws.com/fec-data-bathrooms/bathroom${num}.jpeg`
    }

    if (!numbers.includes(num)) {
      let newImage = new Room({
        imageURL: url,
        description: imageType
      })
      result.push(newImage);
      numbers.push(num);
      quantity--;
    }
  }
  return result
};
/*------------- END OF HELPER FUNCTIONS------------- */

let adjectives = ['Big', 'Beautiful', 'Comfortable', 'Cosy', 'Huge', 'Small', 'Homely'];

let cities = ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine'];

//adjective + city name + home
function createDescription() {
  let adj = adjectives[randomizer(0, adjectives.length - 1)];
  let city = cities[randomizer(0, cities.length - 1)];
  return `${adj} ${city} Home`
};
//star rating
function createStarRating() {
  return randomizer(3, 5, false)
};
//review total random number between 50-100
function createTotalReviews() {
  return randomizer(50, 100)
};
//superhost random between 0 and 1
function isSuperhost() {
  return (randomizer(0, 2) ? true : false)
};
//city, state, united states
//description + CA, United States
function createLocation(desc) {
  //middle value is the city
  let splitCity = desc.split(' ');
  let city = (splitCity.length === 3) ? splitCity[1] : `${splitCity[1]} ${splitCity[2]}`;
  return `${city}, CA United States`
}

function createImageCollection() {
  let images = new Images();

  images.house = new Room({
    imageURL: `https://airbnb-hr-replica.s3-us-west-1.amazonaws.com/fec-data-houses/house${randomizer(0, 8)}.jpeg`,
    description: 'house'
  })
  //1 backyard
  images.backyard = new Room({
    imageURL: `https://airbnb-hr-replica.s3-us-west-1.amazonaws.com/fec-data-backyard/backyard${randomizer(0, 5)}.jpeg`,
    description: 'backyard'
  });
  //1 kitchen
  images.kitchen = new Room({
    imageURL: `https://airbnb-hr-replica.s3-us-west-1.amazonaws.com/fec-data-kitchens/kitchen${randomizer(0, 4)}.jpeg`,
    description: 'kitchen'
  });
  //bedrooms between 2- 5
  let numberOfBedrooms = randomizer(2, 5);
  images.bedrooms = createArrayOfImgs(numberOfBedrooms, 'bedroom');
  // images.bedrooms 2-5
  let numberOfBathrooms = randomizer(2, 5);
  images.bathrooms = createArrayOfImgs(numberOfBathrooms, 'bathroom');
  return images
};

exports.createDescription = createDescription;
exports.createStarRating = createStarRating;
exports.createTotalReviews = createTotalReviews;
exports.isSuperhost = isSuperhost;
exports.createLocation = createLocation;
exports.createImageCollection = createImageCollection;