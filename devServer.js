import webpack from 'webpack'
import config from './webpack.config.js'
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
// import mongoose from 'mongoose'
import Bug from './bug'
import SocketIO from 'socket.io'
// import { url } from './mongo-config'
var router = express.Router()

// mongoose.connect(url)
// mongoose.connection.on('error', function () {
//   console.info('Error: Could not connect to MongoDB.')
// })

var app = express()
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// let us get the ip of the request
app.enable('trust proxy')

var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(bodyParser.json())

app.get('/:projectName/:id?', function (req, res) {
  console.log('oh hello', req.ip)
  res.render('index', {
    ProjectName: req.params.projectName.toLowerCase(),
    bugId: req.params.id,
    ip: req.ip // not sure if this works yet
  })
})

// router.route('/bugs').get(function (req, res) {
//   Bug.find(function (err, bugs) {
//     if (err) {
//       res.status(500)
//       return res.send(err)
//     }
//
//     res.json(bugs)
//   })
// }).post(function (req, res) {
//   var bug = new Bug(req.body)
//   bug.save(function (err, newBug) {
//     if (err) {
//       res.status(500)
//       return res.send(err)
//     }
//     io.emit('bugUpdate', [newBug])
//
//     res.json([newBug])
//   })
// })
//
// router.route('/bugs/:id').put(function (req, res) {
//   Bug.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, updatedBug) {
//     if (err) {
//       res.status(500)
//       return res.send(err)
//     }
//     io.emit('bugUpdate', [updatedBug])
//     return res.json(updatedBug)
//   })
// })

app.use('/api', router)
app.set('port', 3005)
var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ', app.get('port'))
})

var io = SocketIO.listen(server)
// io.on('connection', function (socket) {
//   console.log('User connected!')
// })
