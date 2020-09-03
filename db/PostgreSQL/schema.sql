DROP DATABASE IF EXISTS photogallery;

CREATE DATABASE photogallery;

\connect photogallery;

CREATE TABLE rooms (
  roomID SERIAL PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  starRating NUMERIC(3, 2) NOT NULL,
  reviewTotal SMALLINT NOT NULL,
  superhost BOOLEAN NOT NULL,
  location VARCHAR(100) NOT NULL
);

CREATE TABLE photos (
  imageID SERIAL PRIMARY KEY,
  imageURL VARCHAR NOT NULL,
  image_description VARCHAR(100) NOT NULL,
  roomID INT NOT NULL
);

COPY rooms (description, starRating, reviewTotal, superhost, location) FROM '/Users/harryho/Desktop/JSProject/HRSF129/SDC/gallery/db/CSV/rooms.csv' DELIMITER ',' CSV HEADER;

COPY photos (imageURL, image_description, roomID) FROM '/Users/harryho/Desktop/JSProject/HRSF129/SDC/gallery/db/CSV/photos.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX photos_roomID_index ON photos (roomID);

ALTER TABLE photos ADD CONSTRAINT photos_roomID_foreignkey FOREIGN KEY (roomID) REFERENCES rooms (roomID);