const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3001;

//import database
const db = require('../db/PostgreSQL/index');

//send static files inside the public folder
app.use('/rooms/:id', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Get room info
app.get('/rooms/:id/photogallery', (req, res) => {
  // declare query params
  let queryParams = [req.params.id];
  // declare query string
  let queryString = 'select * from rooms, photos where rooms.roomID = $1 and rooms.roomID = photos.roomID;'
  db.query(queryString, queryParams, (err, data) => {
    if (err) {
      console.log("Failed to get room info from databases: ", err);
      res.status(400).send(err);
    } else {
      console.log("Succeeded to get room info from databases");
      // construct images array
      let imagesArr = [];
      for (let i = 0; i < data.rows.length; i++) {
        let image = {
          imageID: data.rows[i].imageid,
          imageURL: data.rows[i].imageurl,
          image_description: data.rows[i].image_description
        }
        imagesArr.push(image);
      }
      // construct the output
      let output = {
        roomID: data.rows[0].roomid,
        description: data.rows[0].description,
        starRating: data.rows[0].starrating,
        reviewTotal: data.rows[0].reviewtotal,
        superhost: data.rows[0].superhost,
        location: data.rows[0].location,
        images: imagesArr
      }
      console.log(output)
      res.status(200).send(output);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});