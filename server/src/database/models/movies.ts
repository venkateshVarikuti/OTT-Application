const crypto = require('crypto');
const mongoose = require('mongoose');
import validator from "validator";
const bcrypt = require('bcryptjs');
const { INTEGER } = require('sequelize');

const movieSchema = new mongoose.Schema({

  distributorId:{


  },
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
  Lnaguage:{
    type: String,
    required: [true, 'Please tell us language of the movie']
  },
  commission:{
    type: String,
    required: [true, 'Please tell us commission of the movie']
  }
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;