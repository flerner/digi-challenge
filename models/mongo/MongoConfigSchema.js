const mongoose = require('mongoose')

// Define a schema with a field of type mongoose.Schema.Types.Mixed
const configSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
})

const Schema = mongoose.model('Config', configSchema, 'config')

module.exports = Schema
