const mongoose = require('mongoose');
const db = require('../config/db');

const userSchema = new mongoose.Schema({
    phoneNumber: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    }
  });
  
  const userModel = db.model('user', userSchema);
  
module.exports = userModel;