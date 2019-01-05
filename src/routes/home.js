var express = require('express');
var router = express.Router();

// Get Center
router.get('/', function(req, res, next){
	res.send('Welcome to Home Page');
});

module.exports = router;