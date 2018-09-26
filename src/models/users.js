const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	user_name : {
		type:String,
		required: [true, 'User Name Field is Required!']
	},
	user_email:{
		type:String,
		required:[true, 'User Email Field is Required']
	},
	user_password:{
		type:String,
		required:[true, 'User Password Field is Required']
	},
	status:{
		type:String,
		default:'active'
	},
	date:{
		type:Date,
		default:Date.now
	}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
