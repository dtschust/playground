import mongoose from 'mongoose'

const bugSchema = new mongoose.Schema({
  name: String,
  description: String,
  complete: { type: Boolean, default: false },
  screenshotURL: String,
  consoleErrors: [{
    errorMsg: String,
    stack: String
  }]
})

var Bug = mongoose.model('Bug', bugSchema)

export default Bug
