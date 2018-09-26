var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
	destination: function(req,file, cb){
		cb(null, './assets/images/center');
    },
	filename: function(req, file, cb){
		cb(null, Date.now()+'-'+file.originalname);
	}
});
var fileFilter = function(req, file, cb){
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
		cb(null, true);
	}else{
		cb(null, false);
	}
};
var upload = multer({
	storage: storage,
	limits:{
		fileSize:1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

// Center Model
var Center = require('../models/centers');

// Get Center
router.get('/', function(req,res, next){
	Center.find()
	.then(function(data){
		if(data.length >= 1){
			res.status(201).json({
				message: 'Data get Successfully!',
				center_count: data.length,
				center: data
			});
		}else{
			res.status(404).json({
				message:"There is NO Center Data!",
				center: data
			});
		}	
	}).catch(next);
});

// Post Center
router.post('/', upload.single('center_image'), function(req, res, next){
	var insertData = {
		center_name: req.body.center_name
	}
	Center.find(insertData)
	.then(function(data){
		if (data.length == 0) {
			var insertData = {
				center_name: req.body.center_name,
				center_image: req.file.path
			};
			Center.create(insertData)
			.then(function(data){
				res.status(201).json({
					message : 'Center Data Inserted Succesfully!',
					center : data
				});
			}).catch(next);
		}else{
			res.status(409).json({
				message: "Center Name Already Exist, Use Different Name!"
			});
		}
	});
});

// Update Center
router.patch('/', function(req, res){
	res.status(200).json({
		message: 'Center Update Method!'
	});
});

// Delete Center
router.delete('/', function(req, res, next){
	var id = {
		_id: req.body._id
	};
	Center.find(id)
	.then(function(data){
		if (data.length == 1){
			Center.deleteOne(id)
			.then(function(data){
				res.status(201).json({
					message: "Center ID Deleted Successfully!",
					center_id: req.body._id
				});
			})
			.catch(next);
		}else{
			res.status(409).json({
				message: "Center ID Does not Exist!"
			});
		}
	});
});

module.exports = router;