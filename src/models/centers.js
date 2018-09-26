const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CenterSchema = new Schema({
	center_name:{
		type:String,
		required: [true, 'Name Field is Required']
	},
	center_image:{
		type:String,
		required: [true, 'Center Image is Required']
	},
	date:{
		type:Date,
		default:Date.now
	},
	status:{
		type:String,
		default:'inactive'
	}
});

const Center = mongoose.model('center', CenterSchema);

module.exports = Center;