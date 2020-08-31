const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const generatePhotos = (i, callback) => {
  // The 'error' event is emitted if an error occurred while writing or piping data
  writer.on('error', function(error) {
    console.log('Failed to generate photos');
  });
  // The 'finish' event is emitted after the stream.end() method has been called
  writer.on('finish', function(data) {
    console.log('Succeeded to generate photos');
  })
  // All the data from readable goes into 'photos.csv'.
  writer.pipe(fs.createWriteStream(`photos.csv`));

  const type = ['bedroom', '2nd_bedroom', 'house', 'backyard', 'kitchen', 'bathroom'];
  const num = [0, 1, 2, 3, 4];
  let image_id = 1;
  let room_id = 1;

  function write() {
    let ok = true;
    while (i > 0 && ok) {
      i--;
      const data = {
        imageId: image_id++,
        imageURL: `https://airbnb-photos-backup.s3.us-east-2.amazonaws.com/${type[image_id % type.length]}${num[image_id % num.length]}.jpeg`,
        image_description: `${type[image_id % type.length]}`,
        roomID: room_id
      };
      // Last time
      if (i === 0) {
        writer.write(data, callback);
      } else {
        // See if continue, or wait.
        ok = writer.write(data);
      }
      // room id plus 1 every 6 images
      if ((image_id - 1) % 6 === 0) {
        room_id++;
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

generatePhotos(60000000, () => {
  writer.end();
})
