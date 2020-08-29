let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roomSchema = new Schema({
  imageURL: String,
  description: String
});

let allImagesSchema = new Schema({
  house: roomSchema,
  backyard: roomSchema,
  kitchen: roomSchema,
  bedrooms: Array,
  bathrooms: Array
});

let propertySchema = new Schema({
  _id: Number,
  description: String,
  starRating: Number,
  reviewTotal: Number,
  superhost: Boolean,
  location: String,
  images: allImagesSchema
});

var Property = mongoose.model('property', propertySchema);
var Images = mongoose.model('image', allImagesSchema);
var Room = mongoose.model('room', roomSchema);
//comment
module.exports.Property = Property;
module.exports.Room = Room;
module.exports.Images = Images;
