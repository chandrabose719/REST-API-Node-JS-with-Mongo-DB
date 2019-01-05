var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// POST Method
app.use(bodyParser.urlencoded({
	extended: true 
}));
app.use(bodyParser.json());

app.use('/assets/images/center', express.static('assets/images/center'));

// Mongo DB Connection
mongoose.connect(
	'mongodb://curriculum:curriculum123@ds117839.mlab.com:17839/react_curriculum',
	// 'mongodb://localhost:<port>/<databaseName>', 
	{ 
		useNewUrlParser: true 
	}
);
mongoose.Promise = global.Promise;

// Routers
var centerRoutes = require('./src/routes/center');
var userRoutes = require('./src/routes/user');

app.use('/center', centerRoutes);
app.use('/user', userRoutes);

// Error Message
app.use(function(error, req, res, next){
	res.status(422).json({
		err: error.message
	});
});


module.exports = app;
