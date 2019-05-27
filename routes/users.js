const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', function(req, res, next){
	res.status(200).json({
		message: 'Welcome User Page!'
	});
});

router.post('/', function(req, res, next){
	const check_email = req.body.user_email;
	const user = new User({
		user_name:req.body.user_name,
		user_email:req.body.user_email
	});
	User.findOne({user_email:check_email}).then(function(result){
		if (result == null) {
			user.save()
			.then(function(){
				res.status(200).json({
					message: 'User data stored successfully',
					data: user
				});
			})
			.catch(next);		
		}else{
			res.status(200).json({
				message: 'Email alraedy exists try different!',
				data: check_email
			});
		}
	});
	
});

module.exports = router;