DROP KEYSPACE photogallery;

CREATE KEYSPACE photogallery WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE photogallery;

CREATE TABLE rooms (
  roomID INT,
  description TEXT,
  starRating DOUBLE,
  reviewTotal INT,
  superhost BOOLEAN,
  location TEXT,
  PRIMARY KEY (roomID)
);

CREATE TABLE photos_by_room (
  imageID INT,
  imageURL TEXT,
  image_description TEXT,
  roomID INT,
  PRIMARY KEY (roomID, imageID)
);

COPY rooms (roomID, description, starRating, reviewTotal, superhost, location) FROM '/Users/harryho/Desktop/JSProject/HRSF129/SDC/gallery/db/CSV/rooms.csv' WITH DELIMITER = ',' AND HEADER = TRUE;

COPY photos_by_room (imageID, imageURL, image_description, roomID) FROM '/Users/harryho/Desktop/JSProject/HRSF129/SDC/gallery/db/CSV/photos.csv' WITH DELIMITER = ',' AND HEADER = TRUE;