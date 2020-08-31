const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const generateRooms = (i, callback) => {
  // The 'error' event is emitted if an error occurred while writing or piping data
  writer.on('error', function(error) {
    console.log('Failed');
  });
  // The 'finish' event is emitted after the stream.end() method has been called
  writer.on('finish', function(data) {
    console.log('Succeeded');
  })
  // All the data from readable goes into 'file.txt'.
  writer.pipe(fs.createWriteStream(`rooms.csv`));

  let adjectives = ['Big', 'Beautiful', 'Comfortable', 'Cosy', 'Huge', 'Small', 'Homely'];
  let rate = [3, 4, 5];
  let cities = ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine'];
  let id = 1;

  function write() {
    let ok = true;
    while (i > 0 && ok) {
      i--;
      const data = {
        roomID: id++,
        description: `${adjectives[i % adjectives.length]} ${cities[i % cities.length]} Home`,
        starRating: rate[i % rate.length] + (i / 100),
        reviewTotal: i * i % 300,
        superhost: i % 11 === 0 ? true : false,
        location: `${cities[i % cities.length]}, CA United States`
      };
      // Last time
      if (i === 0) {
        writer.write(data, callback);
      } else {
        // See if continue, or wait.
        ok = writer.write(data);
      }
    }
    if (i > 0) {
      // If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
      // Had to stop early. Write some more once it drains.
      writer.once('drain', write);
    }
  }
  write();
}

generateRooms(10000000, () => {
  writer.end();
})
