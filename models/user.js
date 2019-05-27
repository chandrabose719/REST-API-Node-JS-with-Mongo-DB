const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	user_name : String,
	user_email: String,
	status:{
		type:String,
		default: 'active'
	},	
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);