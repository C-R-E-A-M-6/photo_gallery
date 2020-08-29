const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

// description
let adjectives = ['Big', 'Beautiful', 'Comfortable', 'Cosy', 'Huge', 'Small', 'Homely'];
// starRating
let integer = [3, 4, 5];
// superhost
let boolean = [true, false];
// location
let cities = ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine'];


const seedRoomsData = (entries) => {
  return new Promise((resolve, reject) => {
    // The 'error' event is emitted if an error occurred while writing or piping data
    writer.on('error', function(error) {
      reject(error);
    });
    // The 'finish' event is emitted after the writer.end() method has been called
    writer.on('finish', function(data) {
      resolve(data);
    })
    writer.pipe(fs.createWriteStream('rooms.csv'));
    for (let i = 1; i <= entries; i++) {
      writer.write({
        roomID: i,
        description: `${adjectives[i % adjectives.length]} ${cities[i % cities.length]} Home`,
        starRating: integer[i % integer.length] + (i / 100),
        reviewTotal: i * i % 300,
        superhost: boolean[i % boolean.length],
        location: `${cities[i % cities.length]}, CA United States`
      });
      console.log('i: ', i);
    }
    writer.end();
  });
}

seedRoomsData(1000000)
  .then(() => {console.log('Succeeded')})
  .catch(() => {console.log('Failed')});