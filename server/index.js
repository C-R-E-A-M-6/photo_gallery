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
  let queryString = 'select * from rooms, photos where rooms.roomID = $1 and rooms.roomID = photos.roomID';
  db.query(queryString, queryParams, (err, data) => {
    if (err) {
      console.log("Failed to get room info from database: ", err);
      res.status(400).send(err);
    } else {
      console.log("Succeeded to get room info from database");
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
      res.status(200).send(output);
    }
  });
});

// Add a room
app.post('/rooms', (req, res) => {
  // declare query params
  let queryParams = [req.body.description, req.body.starRating, req.body.reviewTotal, req.body.superhost, req.body.location];
  // declare query string
  let queryString = 'insert into rooms (description, starRating, reviewTotal, superhost, location) values ($1, $2, $3, $4, $5)'
  db.query(queryString, queryParams, (err, data) => {
    if (err) {
      console.log("Failed to add a room to database: ", err);
      res.status(400).send(err);
    } else {
      console.log("Succeeded to add a room to database");
      res.status(201).send();
    }
  });
});

// Add a photo to a room
app.post('/rooms/:id/photos', (req, res) => {
  // declare query params
  let queryParams = [req.body.imageURL, req.body.description, req.params.id];
  // declare query string
  let queryString = 'insert into photos (imageURL, image_description, roomID) values ($1, $2, $3)';
  db.query(queryString, queryParams, (err, data) => {
    if (err) {
      console.log("Failed to add a photo to a room in database: ", err);
      res.status(400).send(err);
    } else {
      console.log("Succeeded to add a photo to a room in database");
      res.status(201).send();
    }
  });
});

// Update room info
app.patch('/rooms/:id', (req, res) => {
  // declare query params
  let queryParams = [req.body.description, req.params.id];
  // declare query string
  let queryString = 'update rooms set description = $1 where roomID = $2'
  db.query(queryString, queryParams, (err, data) => {
    if (err) {
      console.log("Failed to update room info in database: ", err);
      res.status(400).send(err);
    } else {
      console.log("Succeeded to update room info in database");
      res.status(204).send();
    }
  });
});

// Update photo info
app.patch('/photos/:photo_id', (req, res) => {
  // declare query params
  let queryParams = [req.body.imageURL, req.body.image_description, req.params.photo_id];
  // declare query string
  let queryString = 'update photos set imageURL = $1, image_description = $2 where imageID = $3'
  db.query(queryString, queryParams, (err, data) => {
    if (err) {
      console.log("Failed to update photo info in database: ", err);
      res.status(400).send(err);
    } else {
      console.log("Succeeded to update photo info in database");
      res.status(204).send();
    }
  });
});

// Delete a room and all photos of that room
app.delete('/rooms/:id', (req, res) => {
  // declare query params
  let queryParams = [req.params.id];
  // declare query string
  let queryString = 'delete from rooms where roomID = $1';
  db.query(queryString, queryParams, (err, data) => {
    if (err) {
      console.log("Failed to delete a room and all photos of that room in database: ", err);
      res.status(400).send(err);
    } else {
      console.log("Succeeded to delete a room and all photos of that room in database");
      res.status(204).send();
    }
  });
});

// Delete a photo
app.delete('/photos/:photo_id', (req, res) => {
  // declare query params
  let queryParams = [req.params.photo_id];
  // declare query string
  let queryString = 'delete from photos where imageID = $1';
  db.query(queryString, queryParams, (err, data) => {
    if (err) {
      console.log("Failed to delete a photo in database: ", err);
      res.status(400).send(err);
    } else {
      console.log("Succeeded to delete a photo in database");
      res.status(204).send();
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});