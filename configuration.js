var morgan = require('morgan')
var express = require('express')
var bodyParser = require('body-parser')

module.exports = function(app) {
    app.use(morgan('dev'))

    app.use(bodyParser.urlencoded())
    app.use(bodyParser.json())
    
}