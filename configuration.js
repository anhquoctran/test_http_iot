var morgan = require('morgan')
var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')

module.exports = function(app) {
    app.use(morgan('dev'))

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    app.use(session({ secret: 'keyboard', resave: false, saveUninitialized: false }))
    
    var router = express.Router()
    
    require('./app/routes')(app)
}