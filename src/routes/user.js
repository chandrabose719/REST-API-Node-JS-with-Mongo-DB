const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');

router.get('/', function(req,res,next){
	User
	.find({})
	.then(function(user){
		res.status(201).json({
			msg: ' Data get Successfully',
			length: user.length,
			result: user
		});
	})
	.catch(next);
});

router.post('/', function(req, res, next){
	var email = { 
		user_email:req.body.user_email
	};
	User.find(email)
	.then(function(email){
		if ( email.length >= 1 ) {
			res.status(409).json({
				msg:'Email Exists, Try Another One!',
				result: email
			});
		}else{
			var insertData = {
				user_name: req.body.user_name,
				user_email: req.body.user_email,
				user_password: req.body.user_password
			};
			User.create(insertData)
			.then(function(user){
				res.status(201).json({
					msg:'User Data inserted Successfully!',
					length: user.length,
					result:user
				});
			})
			.catch(next);
		}
	});
});

router.put('/', function(req, res, next){
	User.find(req.body)
	.then(function(data){
		if (data.lengt >= 1) {
			User.update(req.body)
			.then(function(){
				res.status(201).json({
					msg: "Data Updated Successfully!"
				});
			})
			.catch(next);
		}else{
			res.status(409).json({
				msg: "Data does not Exist!"
			});
		}
	});
});

router.delete('/', function(req, res, next){
	var delete_id = {
		_id: req.body._id
	};
	User.find(delete_id)
	.then(function(id){
		if (id.length >= 1) {
			User.deleteOne(delete_id)
			.then(function(deleted_data){
				res.status(201).json({
					msg: "ID Deleted Succesfully!"
				});
			})
			.catch(next);
		}else{
			res.status(409).json({
				msg:"ID does not Exist!"
			});
		}
	});
});

router.post('/login', function(req, res, next){
	var login_data = {
		user_email:req.body.user_email
	};
	User.find(login_data)
	.then(function(email_data){
		if (email_data.length < 1) {
			res.status(401).json({
				message: 'Email Does not Exist!'
			});
		}else{
			if (email_data[0].user_password === req.body.user_password ) {
				const token = jwt.sign(
					{
						userID: email_data[0]._id,
						email: email_data[0].user_email
					},
					process.env.JWT_KEY,
					{
						expiresIn: "1h"
					}
				);
				res.status(201).json({
					message: "Login Successfully",
					token: token
				});
			}else{ 
				res.status(409).json({
					message: 'Password is Incorrect!'
				});
			}	
		}
	})
	.then(next);
});

module.exports = router;
