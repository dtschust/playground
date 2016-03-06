import mongoose from 'mongoose'

const bugSchema = new mongoose.Schema({
  projectName: String,
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

bugSchema.index({ projectName: 'hashed' })

var Bug = mongoose.model('Bug', bugSchema)

export default Bug
