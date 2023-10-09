const crypto = require('crypto');
const mongoose = require('mongoose');
import validator from "validator";
const bcrypt = require('bcryptjs');
const { INTEGER } = require('sequelize');
const User = require('./user');

const movieSchema = new mongoose.Schema({
  directorName: {
    type: String,
    required: [true, 'Please tell us director name!']
  },
  singerName: {
    type: String,
    required: [true, 'Please tell us singer name!']
  },
  editorName: {
    type: String,
    required: [true, 'Please tell us editor name!']
  },
  musicDirectorName: {
    type: String,
    required: [true, 'Please tell us editor name!']
  },
  movieDescription:{
    type: String,
    required: [true, 'Please tell us movie description']
  },
  Lanaguage:{
    type: String,
    required: [true, 'Please tell us language of the movie']
  },
  commission:{
    type: String,
    required: [true, 'Please tell us commission of the movie']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'movie belongs to a distributor.']
  },
  key: {
    type: String,
  },
  isAccepted:{
    type: Boolean,
    default: false
  },
  isRejected :{
    type: Boolean,
    default: false
  }
});



const Movie = mongoose.model('Movie', movieSchema);
export default Movie;