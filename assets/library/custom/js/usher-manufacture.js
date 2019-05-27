$(document).ready(function(){
    
	// Display Stripe Button on Overview Page
    var path = window.location.pathname;
	var urlFileName = path.substr(path.lastIndexOf("/") + 1);
    if (urlFileName == 'manufacture-overview') {
	    $(".stripe-button-el").find("span").remove();
		$(".stripe-button-el").attr('id', 'stripe-button');
		$("#stripe-button").removeClass("stripe-button-el").addClass("btn btn-primary Pbtn");
		$("#stripe-button").html("PAY NOW");
	}

});

var fileDataArray = [];
var displayFile = '';
var resourceFileArray = [];
var displayResource = '';

// ********************
// Upload Page
function displayUploadFile(){
	var uploadFile = document.getElementById('upload');
	if (uploadFile.files.length > 0) {
        for (var i = 0; i <= uploadFile.files.length - 1; i++) {
    		var fileValue = uploadFile.value;
    		var reg = /(.*?)\.(stl|STL|stp|iges|igs|step)$/;
	       	if(!fileValue.match(reg)){
	    	   	var alert = `
	    	   		<div class="alert alert-danger alert-dismissible">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong> Wrong file! </strong> Uploads available only for igs, iges, step, stp or stl files.
					</div>
	    	   	`;
	    	   	$('#validation-message').html(alert);
	    	   	return false;
	       	}
	       	var fileName = uploadFile.files[i].name;
        	for(var i in fileDataArray){
			    if(fileDataArray[i]['name'] == fileName){
			    	var alert = `
		    	   		<div class="alert alert-danger alert-dismissible">
							<button type="button" class="close" data-dismiss="alert">&times;</button>
							<strong> Warning! </strong> File Already Uploaded.
						</div>
		    	   	`;
		    	   	$('#validation-message').html(alert);
		    	   	return false;    
			    }
			}
        	var fileSize = uploadFile.files[i].size / 1024 / 1024;
        	if (fileSize > 100) {
	       		var alert = `
	    	   		<div class="alert alert-danger alert-dismissible">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong> Warning! </strong> File Size More Than 100 MB.
					</div>
	    	   	`;
	    	   	$('#validation-message').html(alert);
	    	   	return false;	
	       	}
	    }
        for (var i = 0; i <= uploadFile.files.length - 1; i++) {
        	fileDataArray.push(uploadFile.files.item(i));
        }
        var displayFile = displayFileFunc(fileDataArray);
        var formGroup = `<div class="form-group">	
	    	<input type="button" name="submit" class="form-control btn btn-primary Abtn" value="Upload" onclick="saveFile()">
	    </div>`;
        $('.display-file').html(displayFile);
        $('.form-group-content').html(formGroup);
    }
};

function additionalUploadFile(){
	var uploadFile = document.getElementById('upload');
	if (uploadFile.files.length > 0) {
        for (var i = 0; i <= uploadFile.files.length - 1; i++) {
    		var fileValue = uploadFile.value;
    		var reg = /(.*?)\.(stl|STL|stp|iges|igs|step)$/;
	       	if(!fileValue.match(reg)){
	    	   	var alert = `
	    	   		<div class="alert alert-danger alert-dismissible">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong> Wrong file! </strong> Uploads available only for igs, iges, step, stp or stl files.
					</div>
	    	   	`;
	    	   	$('#validation-message').html(alert);
	    	   	return false;
	       	}
	       	var fileName = uploadFile.files[i].name;
        	for(var i in fileDataArray){
			    if(fileDataArray[i]['name'] == fileName){
			    	var alert = `
		    	   		<div class="alert alert-danger alert-dismissible">
							<button type="button" class="close" data-dismiss="alert">&times;</button>
							<strong> Warning! </strong> File Already Uploaded.
						</div>
		    	   	`;
		    	   	$('#validation-message').html(alert);
		    	   	return false;    
			    }
			}
        	var fileSize = uploadFile.files[i].size / 1024 / 1024;
        	if (fileSize > 100) {
	       		var alert = `
	    	   		<div class="alert alert-danger alert-dismissible">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong> Warning! </strong> File Size More Than 100 MB.
					</div>
	    	   	`;
	    	   	$('#validation-message').html(alert);
	    	   	return false;	
	       	}
	    }
        for (var i = 0; i <= uploadFile.files.length - 1; i++) {
        	fileDataArray.push(uploadFile.files.item(i));
        }
        saveFile();
    }
};

function removeFile(name){
	for(var i in fileDataArray){
	    if(fileDataArray[i]['lastModified'] == name){
	        fileDataArray.splice(fileDataArray[i],1);
	        break;
	    }
	}
	if(fileDataArray.length >= 1){
		var displayFile = displayFileFunc(fileDataArray);
    	$('.display-file').html(displayFile);
    }else{
    	window.location.reload();
    }	
};

function displayFileFunc(fileDataArray){
    displayFile = '';
    for (var i = 0; i < fileDataArray.length; i++) {
    	var fname = fileDataArray[i]['name'];
        var fsize = fileDataArray[i]['size'];
        var flastModified = fileDataArray[i]['lastModified'];
    	var fsizeMB = (fsize / (1024*1024)).toFixed(2);
		if (fileDataArray.length > 0) {
    		displayFile += `
	    		<div class="display-file-content">
	    			<div class="media border p-2">
						<a class="align-self-center" href="#" onclick="removeFile(`+ flastModified +`)">
	    					<i class="fa fa-window-close"></i>
	    				</a>
						<div class="media-body">
					   		<p>` + fname + `</p> 
			    			<p>` + fsizeMB + ` MB </p>
			    		</div>
					</div> 
	    		</div>		
	    	`;			
    	}
    }
    return displayFile;
};

function saveFile(){
	if (fileDataArray.length > 0 ) {
		var formdata = new FormData();
		for (var i = 0; i < fileDataArray.length; i++) {
			formdata.append('fileDataArray[]', fileDataArray[i]);
		}
			$.ajax({
		       	url : baseUrl+'manufacture-store-session',
		       	type : 'POST',
		       	data : formdata,
		       	processData: false,  
		       	contentType: false,
		       	beforeSend: function(){
			        showLoading();
			    },
			    complete: function(){
			        hideLoading();
			    },
		       	success : function(data) {
		        	console.log(data);
		        	if (data == 'success') {
		        		window.location.href = baseUrl+"manufacture-details";	
		        	}
		       	}
			});
	}else{
		var alert = `
	   		<div class="alert alert-danger alert-dismissible">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong>Warning!</strong> Please Upload Atleast One File
			</div>
	   	`;
	   	$('#validation-message').html(alert);
	   	return false;	
	}	
}
// End Upload Page
// ********************

// ********************
// Cart Page
function displayMaterial(file_id){
	var technology_id = $('#'+file_id+'_technology_id').val();
	if (technology_id != 0) {
		$.ajax({
	       	url : 'manufactureDetailsAjax.php',
	       	type : 'POST',
	       	data : {'technology_id' : technology_id, 'file_id' : file_id, 'type': 'material' },
	       	success : function(data) {
	        	$('#'+file_id+'-product-material').html(data);
	        	$('#'+file_id+'-color-layer-process-content').html('');			
			}
		});
	}else{
		$('#'+file_id+'-product-material').html('');
	    $('#'+file_id+'-color-layer-process-content').html('');
	}	
};

function displayColorProcess(file_id){
	var material_id = $('#'+file_id+'_material_id').val();
	if (material_id != 0) {
		$.ajax({
	       	url : baseUrl+'manufacture/color_process',
	       	type : 'POST',
	       	data : {'file_id' : file_id, 'material_id' : material_id},
	       	success : function(data) {
	        	// console.log(data);
	        	data = $.trim(data);
	            data = $.parseJSON(data);
	            $('#'+file_id+'-color-layer-process-content').html(data['color_process_result']);
	        	$('#'+file_id+'-price-content').html(data['price_content']);
			}
		});
	}else{
		$('#'+file_id+'-color-layer-process-content').html('');
		$('#'+file_id+'-price-content').html('');
	}	
};

function costCalculation(file_id){
	var material_id = $('#'+file_id+'_material_id').val();
	var layer_height_id = $('#'+file_id+'_layer_height_id').val();
	if (material_id != 0) {
		$.ajax({
	       	url : baseUrl+'manufacture/cost_calc',
	       	type : 'POST',
	       	data : {'file_id' : file_id, 'material_id' : material_id, 'layer_height_id':layer_height_id},
	       	success : function(data) {
	        	// console.log(data);
	        	$('#'+file_id+'-price-content').html(data);
			}
		});
	}else{
		$('#'+file_id+'-color-layer-process-content').html('');
	}	
};

function deleteManufacture(){
	var msg = confirm("Are you sure you want to delete this file and information permanently?");
    if(msg != true){
        return false;
    }
};
// End Cart Page
// ********************

// ********************
// Checkout Page
function sameAddress(){
	if($("#same_address").is(':checked')){
		$("#shipping-content input[type='text']").attr('readonly','readonly');
		$("#shipping-content input[type='number']").attr('readonly','readonly');
		$("#shipping-content select").attr('disabled','disabled');
	}else{
		$("#shipping-content input[type='text']").removeAttr('readonly','readonly');
		$("#shipping-content input[type='number']").removeAttr('readonly','readonly');
		$("#shipping-content select").removeAttr('disabled','disabled');
	}
};

function billingState(){
	var country_code = $('#billing_country').val();
	$.ajax({
       	url : 'checkoutAjax.php',
       	type : 'POST',
       	data : {'country_code' : country_code, 'country_type' : 'billing'},
       	processData: false, 
       	contentType: false,
       	success : function(data) {
        	console.log(data);
        	$('#billing-display-state').html(data);
		}
	});
};

function shippingState(){
	var country_code = $('#country').val();
	$.ajax({
       	url : 'checkoutAjax.php',
       	type : 'POST',
       	data : {'country_code' : country_code, 'country_type' : 'shipping'},
       	processData: false,  
       	contentType: false,
       	success : function(data) {
        	console.log(data);
        	$('#shipping-display-state').html(data);
		}
	});
};

// changeUnit();
// function changeUnit(){
// 	$.ajax({
//        	url : baseUrl+'manufacture/get_file_data',
//        	type : 'GET',
//        	processData: false,  
//        	contentType: false,
//        	success : function(data) {
//         	data = JSON.parse(data);
//         	console.log(data);
//         	for (var key in data) {
// 			    console.log("User " + data[key] + " is #" + key); // "User john is #234"
// 			}
// 		}
// 	});
// };

// End Checkout Page
// ********************

// ********************
// Overview Page
function displayDeliveryAmount(){
	var delivery_type = $('input[name=delivery_type]:checked').val();
	if (delivery_type == 'Express') {
		var delivery_amount = 30;	
	}else{
		var delivery_amount = 10;
	}
	window.location.href = baseUrl+"manufacture/delivery_type/"+delivery_type+"/"+delivery_amount;
};
// End Checkout Page
// ********************
