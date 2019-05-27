// ********************
// Design Project Page

var resourceFileArray = [];

function finishingCustom(){
	var design_finishing = $('#design_finishing').val();
	if (design_finishing == '1') {
		$('#finishing-custom').html(
			`<input type="text" class="form-control" name="design_finishing_custom" id="design_finishing_custom" placeholder="Please specify finishing requirement*">`
		);
	}else{
		$('#finishing-custom').html('');
	}
};
function materialCustom(){
	var design_material = $('#design_material').val();
	if (design_material == '1') {
		$('#material-custom').html(
			`<input type="text" class="form-control" name="design_material_custom" id="design_material_custom" placeholder="Please specify material needed*">`
		);
	}else{
		$('#material-custom').html('');
	}
};
function temperatureCustom(){
	var design_temperature = $('#design_temperature').val();
	if (design_temperature == '1') {
		$('#temperature-custom').html(
			`<input type="text" class="form-control" name="design_temperature_custom" id="design_temperature_custom" placeholder="Please specify the temperature*">`
		);
	}else{
		$('#temperature-custom').html('');
	}
};
function designProjectSubmit(){
	var design_name = $('#design_name').val();
	var design_description = $('#design_description').val();
	var design_usage = $('#design_usage').val();
	var design_assembly = $("input[name='design_assembly']:checked").val();
	var design_precision = $("input[name='design_precision']:checked").val();
	var design_finishing = $('#design_finishing').val();
	var design_finishing_custom = $('#design_finishing_custom').val();
	var design_material = $('#design_material').val();
	var design_material_custom = $('#design_material_custom').val();
	var design_temperature = $('#design_temperature').val();
	var design_temperature_custom = $('#design_temperature_custom').val();
	var industry_id = $('#industry_id').val();

	if (design_finishing_custom != undefined) {
		if (design_finishing_custom == '') {
			$('#validation-message').html(
				`<div class="alert alert-warning alert-dismissible fade show">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong></strong> Please specify finishing needed.
				</div>`
			);
			return false;	
		}
	}else{
		var design_finishing_custom = '';
	}

	if (design_material_custom != undefined) {
		if (design_material_custom == '') {
			$('#validation-message').html(
				`<div class="alert alert-warning alert-dismissible fade show">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong></strong> Please specify material needed.
				</div>`
			);
			return false;	
		}
	}else{
		var design_material_custom = '';
	}

	if (design_temperature_custom != undefined) {
		if (design_temperature_custom == '') {
			$('#validation-message').html(
				`<div class="alert alert-warning alert-dismissible fade show">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong></strong> Please specify the temperature.
				</div>`
			);
			return false;	
		}
	}else{
		var design_temperature_custom = '';
	}
	
	if (design_name == '' || design_name == undefined || design_name == null) {	
		$('#validation-message').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong></strong> Project Name is required!
			</div>`
		);
		return false;
	}else if (design_description == '' || design_description == undefined || design_description == null) {	
		$('#validation-message').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong></strong> Please specify project description!
			</div>`
		);
		return false;
	}else if (design_usage == '' || design_usage == undefined || design_usage == null) {	
		$('#validation-message').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong></strong> Please specify end usage of the part!
			</div>`
		);
		return false;
	}else if (design_assembly == '' || design_assembly == undefined || design_assembly == null
		|| design_assembly == '0') {	
		$('#validation-message').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong></strong> Please select assembly preference for your project!
			</div>`
		);
		return false;
	}else if (design_precision == '' || design_precision == undefined || design_precision == null
		|| design_precision == '0') {	
		$('#validation-message').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong></strong> Please select precision preference for your project!
			</div>`
		);
		return false;
	}else if (design_finishing == '' || design_finishing == undefined || design_finishing == null
		|| design_finishing == '0') {	
		$('#validation-message').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong></strong> Please select finishing preference for your project!
			</div>`
		);
		return false;
	}else if (design_material == '' || design_material == undefined || design_material == null
		|| design_material == '0') {	
		$('#validation-message').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong></strong> Please select material preference for your project!
			</div>`
		);
		return false;
	}else if (design_temperature == '' || design_temperature == undefined || design_temperature == null
		|| design_temperature == '0') {	
		$('#validation-message').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong></strong> Please select environment temperature for your project!
			</div>`
		);
		return false;
	}else{
		var formdata = new FormData();
		formdata.append('design_name', design_name);
		formdata.append('design_description', design_description);
		formdata.append('design_usage', design_usage);
		formdata.append('design_assembly', design_assembly);
		formdata.append('design_precision', design_precision);
		formdata.append('design_finishing', design_finishing);
		formdata.append('design_finishing_custom', design_finishing_custom);
		formdata.append('design_material', design_material);
		formdata.append('design_material_custom', design_material_custom);
		formdata.append('design_temperature', design_temperature);
		formdata.append('design_temperature_custom', design_temperature_custom);
		formdata.append('industry_id', industry_id);
		formdata.append('type', 'design-detail');
		if (resourceFileArray.length > 0 ) {
			for (var i = 0; i < resourceFileArray.length; i++) {
			    formdata.append('design_resource[]', resourceFileArray[i]);
			}
		}else{
			formdata.append('design_resource[]', '');
		}
		$.ajax({
			url: baseUrl+'design-store-session',
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
	        	data = $.trim(data);
	        	console.log(data);
	        	if (data == 'success') {
	        		window.location.href = baseUrl+"design-order-overview";	
	        	}else{
	        		$('#validation-message').html(
						`<div class="alert alert-warning alert-dismissible fade show">
							<button type="button" class="close" data-dismiss="alert">&times;</button>
							<strong></strong> Error occured, Please try again!
						</div>`
					);
					return false;
	        	}
	       	}
		});
	}
};

function designResource(){
	var resourceFile = document.getElementById('design_resource');
	if (resourceFile.files.length > 0) {
        for (var i = 0; i <= resourceFile.files.length - 1; i++) {
    		var fileValue = resourceFile.value;
    		var reg = /(.*?)\.(pdf|docx|zip|jpeg|jpg|JPEG|JPG|png|stl|STL|stp|step|igs|iges)$/;
	       	if(!fileValue.match(reg)){
	    	   	var alert = `
	    	   		<div class="alert alert-danger alert-dismissible">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong> Wrong file! </strong> Please upload the file in PDF, docx, JPG, JPEG, PNG or ZIP format.
					</div>
	    	   	`;
	    	   	$('#validation-message').html(alert);
	    	   	return false;
	       	}
	       	var fileName = resourceFile.files[i].name;
	        if(resourceFileArray != ''){
	        	for(var iName in resourceFileArray){
				    if(resourceFileArray[iName]['name'] == fileName){
				    	var alert = `
			    	   		<div class="alert alert-danger alert-dismissible">
								<button type="button" class="close" data-dismiss="alert">&times;</button>
								<strong> Warning! </strong> You cannot upload two files with same name.
							</div>
			    	   	`;
			    	   	$('#validation-message').html(alert);
			    	   	return false;    
				    }
				}
			}	
        	var fileSize = resourceFile.files[i].size / 1024 / 1024;
        	if (fileSize > 10) {
	       		var alert = `
	    	   		<div class="alert alert-danger alert-dismissible">
						<button type="button" class="close" data-dismiss="alert">&times;</button>
						<strong> Warning! </strong> File(s) you are trying to upload is more than upload limit 10MB.
					</div>
	    	   	`;
	    	   	$('#validation-message').html(alert);
	    	   	return false;	
	       	}
	    }
        for (var i = 0; i <= resourceFile.files.length - 1; i++) {
        	resourceFileArray.push(resourceFile.files.item(i));
        }
        var displayResource = displayResourceFunc(resourceFileArray);
        $('#display-resource').html(displayResource);
    }
};

function removeResource(name){
	for(var i in resourceFileArray){
	    if(resourceFileArray[i]['lastModified'] == name){
	        resourceFileArray.splice(resourceFileArray[i],1);
	        break;
	    }
	}
	if(resourceFileArray.length >= 1){
		var displayResource = displayResourceFunc(resourceFileArray);
    	$('#display-resource').html(displayResource);
    }else{
    	window.location.reload();
    }	
};

function displayResourceFunc(resourceFileArray){
    displayResource = '';
    for (var i = 0; i < resourceFileArray.length; i++) {
    	var fname = resourceFileArray[i]['name'];
        var fsize = resourceFileArray[i]['size'];
        var flastModified = resourceFileArray[i]['lastModified'];
    	var fsizeMB = (fsize / (1024*1024)).toFixed(2);
		if (resourceFileArray.length > 0) {
    		displayResource += `
			    	<div class="col-6 col-xs-12">
			    		<div class="display-file-content">
			    			<div class="media border p-2">
								<a class="align-self-center" href="#" onclick="removeResource(`+ flastModified +`)">
			    					<i class="fa fa-window-close"></i>
			    				</a>
								<div class="media-body">
							   		<p>` + fname + `</p> 
					    			<p>` + fsizeMB + ` MB </p>
					    		</div>
							</div> 
			    		</div>
			    	</div>	
	    	`;			
    	}
    }
    return displayResource;
};
// End Design Project Page
// ********************
