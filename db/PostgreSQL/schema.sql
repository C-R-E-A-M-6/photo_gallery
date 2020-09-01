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
  -- FOREIGN KEY (roomID) REFERENCES rooms(roomID)
);

COPY rooms FROM '/Users/harryho/Desktop/JSProject/HRSF129/SDC/gallery/db/PostgreSQL/rooms.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/Users/harryho/Desktop/JSProject/HRSF129/SDC/gallery/db/PostgreSQL/photos.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX photos_roomID_index ON photos (roomID);