const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  custom_country: {
    type: String,
  },
  password_confirm: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
