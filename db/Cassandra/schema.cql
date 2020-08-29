DROP KEYSPACE photogallery;

CREATE KEYSPACE photogallery WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE photogallery;

CREATE TABLE room (
  roomID INT,
  description TEXT,
  starRating INT,
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
  createdAt TIMESTAMP,
  PRIMARY KEY (roomID, createdAt)
) WITH CLUSTERING ORDER BY (createdAt DESC);