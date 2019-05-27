const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Register Page
router.get('/register', function(req, res, next){
	res.render(
		'main_layout',
		{
			header: 'Register',
			body: 'authentication/register'
		}
	);
});

router.post('/register-message', function(req, res, next){
	if(req.body.user_name && req.body.user_email){
		const check_email = req.body.user_email;
		const user = new User({
			user_name:req.body.user_name,
			user_email:req.body.user_email
		});
		User.findOne({user_email:check_email}).then(function(result){
			if (result == null) {
				user.save()
				.then(function(){
					res.render(
						'main_layout',
						{
							body: 'authentication/register-message',
							type: 'success',
							message: 'registered successfully',
							data: user
						}
					);
				})
				.catch(next);
			}else{
				res.render(
					'main_layout',
					{
						body: 'authentication/register-message',
						type: 'error',
						message: 'Email alraedy exists try different!'
					}
				);
			}
		});
	}else{
		res.render(
			'main_layout',
			{
				body: 'authentication/register-message',
				type: 'error',
				message: 'please fill all details'
			}
		);
	}
});

// Login Page
router.get('/login', function(req, res, next){
	res.render(
		'main_layout',
		{
			body: 'authentication/login',
			header: 'LOG IN'
		}
	);
});

router.post('/login-message', function(req, res, next){
	if (req.body.user_name && req.body.user_email) {
		var check_name = req.body.user_name;
		var check_email = req.body.user_email;
		User.findOne({user_name: check_name, user_email:check_email}).then(function(result){
			if (result != null) {
				res.render(
					'main_layout',
					{
						body: 'authentication/login-message',
						type: 'success',
						message: 'User loggedin successfully',
						data: result
					}
				);
			}else{
				res.render(
					'main_layout',
					{
						type: 'error',
						message: 'Error occured, Try again!',
						body: 'authentication/login-message'
						
					}
				);
			}
		});
	}else{
		res.render(
			'main_layout',
			{
				type: 'error',
				error: 'Please fill all details!',
				body: 'authentication/login'
			}
		);
	}
});

// Edit Page
router.get('/user-edit', function(req, res, next){
	res.render(
		'main_layout',
		{
			body: 'user/edit',
			header: 'User Edit'
		}
	);
});

router.post('/edit-message', function(req, res, next){
	if (req.body.user_name && req.body.user_email) {
		User.findOne({user_email:req.body.user_email}).then(function(result){
			if (result != null) {
				User.updateOne({user_email:req.body.user_email}, {user_name:req.body.user_name})
				.then(function(){
					User.findOne({user_email:req.body.user_email})
					.then(function(updated_result){
						res.render(
							'main_layout',
							{
								body: 'user/edit-message',
								type: 'success',
								message: 'User details updated successfully',
								data: updated_result
							}
						);
					})
					.catch(next);
				})
				.catch(next);
			}else{
				res.render(
					'main_layout',
					{
						body: 'user/edit-message',
						type: 'error',
						message: 'there is no email id!'
					}
				);
			}
		});
	}else{
		res.render(
			'main_layout',
			{
				type: 'error',
				message: 'Please fill all details!',
				body: 'user/edit-message'
			}
		);
	}
});

module.exports = router;