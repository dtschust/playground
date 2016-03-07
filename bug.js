import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import { status as statusOptions, priority as priorityOptions } from './bug-enums'

const BugSchema = new mongoose.Schema({
  projectName: String,
  status: { type: String, ...statusOptions },
  description: String,
  priority: { type: String, ...priorityOptions },
  owner: { type: String, default: 'Unassigned' },
  reporter: String,
  screenshotURL: String,
  consoleErrors: [{
    errorMsg: String,
    stack: String
  }],
  state: Object,
  actions: [Object],
  notes: String,
  analyticsURLs: [String],
  pullRequestURL: String,
  jiraURL: String
})

BugSchema.index({ projectName: 'hashed' })
BugSchema.plugin(timestamps)

var Bug = mongoose.model('Bug', BugSchema)

export default Bug
