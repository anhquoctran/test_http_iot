var express = require('express')
var app = express()

const PORT = process.env.PORT || 8089

app.listen(PORT, function() {
	console.log('Server is listening at %s', PORT)
})

require('./configuration')(app)
