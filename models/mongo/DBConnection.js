const mongoose = require('mongoose')
const { connect } = mongoose

class DBConnection {
  static client = null
  static connectOk = false

  static connect = async () => {
    try {
      this.client = await connect(`mongodb://127.0.0.1:27017/digi`)

      console.log('connected to digi')
      this.connectOk = true
    } catch (error) {
      console.log('error connecting to database', error)
    }
  }
  static disconnect = async () => {
    if (!this.connectOk) return
    await mongoose.connection.close()
    this.connectOk = false
  }
}
module.exports = DBConnection
