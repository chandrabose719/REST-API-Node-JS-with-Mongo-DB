const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Mongoose
mongoose.connect(
	'mongodb://mongoapp:mongoapp123@ds117919.mlab.com:17919/mongoapp', 
	{useNewUrlParser: true }, 
	function(err){
        if(err) {
            console.log('Some problem with the connection ' +err);
        }else{
            console.log('The Mongoose connection is ready');
        }
    }
);

// Routes
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/users');

app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/user', userRoutes);

// Views
app.set('view engine', 'ejs');
app.use('/images', express.static('assets/images'));
app.use('/library', express.static('assets/library'));

// Error
app.use(function(req, res, next){
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use(function(error, req, res, next){
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;