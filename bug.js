import mongoose from 'mongoose'

const bugSchema = new mongoose.Schema({
  status: { type: String, enum: ['Not Done', 'Done', 'Code Review', 'Deployed'], default: 'Not Done' },
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Highest'], default: 'Low' },
  owner: { type: String, default: 'Unassigned' },
  reporter: String,
  screenshotURL: String,
  consoleErrors: [{
    errorMsg: String,
    stack: String
  }],
  state: Object,
  actions: [Object],
  notes: String
})

var Bug = mongoose.model('Bug', bugSchema)

export default Bug
