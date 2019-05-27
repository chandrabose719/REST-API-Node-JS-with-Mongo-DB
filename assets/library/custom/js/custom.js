$(document).ready(function(){
    
    // Page Loading Animation
    showLoading();
    
    // Tooltip
	$('[data-toggle="tooltip"]').tooltip();

    // Content WOW 
    wow = new WOW({}).init();

    // Dropdown
    $('.dropdown-tog').dropdown();

    // Easy Scroll
	$(function(){
          $('.page-scroll a').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
          });
    });

    // Div Redirection
    $(function() {
        var url = document.location.toString();
        if (url.match('#')) {
            $('a[href="#' + url.split('#')[1] + '"]').tab('show');
        }
        $('a[href="#' + url.split('#')[1] + '"]').on('shown', function (e) {
            window.location.hash = e.target.hash;
        });
    });

    // End Page Loading Animation
    hideLoading();

});

// Base URL
var baseUrl = 'http://localhost/tdu/ci/usher/';

function showLoading(){
	$('#loading-part').css('display', 'block');
}
function hideLoading(){
	$('#loading-part').css('display', 'none');
}

// ********************
// Register Page
// Register Validation
function registerValidation(){
	var user_name = $('#user_name').val();
	var user_email = $('#user_email').val();
	var user_password = $('#user_password').val();
	var conf_password = $('#conf_password').val();
	var redirect_register = $('#redirect_register').val();
	var current_register = $('#current_register').val();
	var message = 'validation-register-modal';
	if(redirect_register == 'account'){
		message = 'validation-message';
	}
	if (user_name == '' || user_name == 'undefined' || user_name == null 
		|| user_name.length < '2' || user_name.length > '15') {	
		$('#'+message).html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong></strong> Name field should contain minimum 2 characters but not more than 15 characters.
			</div>`
		);
		return false;
	}
	else if (user_email == '' || user_email == 'undefined' || user_email == null
		|| check_email(user_email) == false) {
		$('#'+message).html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> E-mail ID is Invalid! 
			</div>`
		);
		return false;
	}
	else if (user_password == '' || user_password == 'undefined' || user_password == null 
		|| user_password.length < '6' || user_password.length > '15') {	
		$('#'+message).html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Password should contain minimum 6 characters! 
			</div>`
		);
		return false;
	}else if (conf_password == '' || conf_password == 'undefined' || conf_password == null 
		|| conf_password.length < '6' || conf_password.length > '15') {	
		$('#'+message).html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Confirm Password should contain minimum 6 characters! 
			</div>`
		);
		return false;
	}else if ((user_password != conf_password) || (user_password.length != conf_password.length)) {	
		$('#'+message).html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Passwords do not match! 
			</div>`
		);
		return false;
	}
};

// Login Validation
function loginValidation(){
	var login_user_email = $('#login_user_email').val();
	var login_user_password = $('#login_user_password').val();
	var redirect_login = $('#redirect_login').val();
	var current_login = $('#current_login').val();
	var message = 'validation-login-modal';
	if(redirect_login == 'account'){
		message = 'validation-message';
	}
	if (login_user_email == '' || login_user_email == 'undefined' || login_user_email == null
		|| check_email(login_user_email) == false) {
		$('#'+message).html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> E-mail ID is Invalid!
			</div>`
		);
		return false;
	}
	else if (login_user_password == '' || login_user_password == 'undefined' || login_user_password == null 
		|| login_user_password.length < '6' || login_user_password.length > '15') {	
		$('#'+message).html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Password is Incorrect! 
			</div>`
		);
		return false;
	}
};

// Check Email
function check_email(email){
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(email.match(mailformat)){
		return true;
	}
	else{
		return false;
	}
}
// End Register Page
// ********************

// ********************
// Overview Address Validation
function checkoutValidation(){
	var user_mobile = $('#user_mobile').val();
	var billing_address = $('#billing_address').val();
	var billing_address1 = $('#billing_address1').val();
	var billing_city = $('#billing_city').val();
	var billing_state = $('#billing_state').val();
	var billing_country = $('#billing_country').val();
	var billing_zipcode = $('#billing_zipcode').val();
	// Shipping
	var shipping_address = $('#shipping_address').val();
	var shipping_address1 = $('#shipping_address1').val();
	var city = $('#city').val();
	var state = $('#state').val();
	var country = $('#country').val();
	var pin_code = $('#pin_code').val();
	if (user_mobile == '' || user_mobile == 'undefined' || user_mobile == null || user_mobile.length != '10') {	
		$('#billing-msg').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Phone Number is Invalid!
			</div>`
		);
		return false;
	}else if (billing_address == '' || billing_address == 'undefined' || billing_address == null) {	
		$('#billing-msg').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Address field cannot be empty!
			</div>`
		);
		return false;
	}else if (billing_city == '' || billing_city == 'undefined' || billing_city == null) {
		$('#billing-msg').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Please fill city name. 
			</div>`
		);
		return false;
	}else if (billing_state == '' || billing_state == 'undefined' || billing_state == null) {
		$('#billing-msg').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Please fill state name. 
			</div>`
		);
		return false;
	}else if (billing_country == '' || billing_country == 'undefined' || billing_country == null) {
		$('#billing-msg').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Billing Country is Invalid! 
			</div>`
		);
		return false;
	}else if (billing_zipcode == '' || billing_zipcode == 'undefined' || billing_zipcode == null) {
		$('#billing-msg').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Postal zipcode is Invalid! 
			</div>`
		);
		return false;
	}else if (billing_zipcode.length < '5' || billing_zipcode.length > '6') {
		$('#billing-msg').html(
			`<div class="alert alert-warning alert-dismissible fade show">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong> Error! </strong> Postal zipcode is Invalid! 
			</div>`
		);
		return false;
	} 
	var same_address = false;
	if($("#same_address").is(':checked')){
		same_address = true;
	}
	if (same_address == false) {
		if (shipping_address == '' || shipping_address == 'undefined' || shipping_address == null) {	
			$('#shipping-msg').html(
				`<div class="alert alert-warning alert-dismissible fade show">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong> Error! </strong> Address field cannot be empty!
				</div>`
			);
			return false;
		}else if (city == '' || city == 'undefined' || city == null) {
			$('#shipping-msg').html(
				`<div class="alert alert-warning alert-dismissible fade show">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong> Error! </strong> Please fill city name. 
				</div>`
			);
			return false;
		}else if (state == '' || state == 'undefined' || state == null) {
			$('#shipping-msg').html(
				`<div class="alert alert-warning alert-dismissible fade show">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong> Error! </strong> Please fill state name. 
				</div>`
			);
			return false;
		}else if (country == '' || country == 'undefined' || country == null) {
			$('#shipping-msg').html(
				`<div class="alert alert-warning alert-dismissible fade show">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong> Error! </strong> Billing Country is Invalid! 
				</div>`
			);
			return false;
		}else if (pin_code == '' || pin_code == 'undefined' || pin_code == null) {
			$('#shipping-msg').html(
				`<div class="alert alert-warning alert-dismissible fade show">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong> Error! </strong> Postal zipcode is Invalid! 
				</div>`
			);
			return false;
		}else if (pin_code.length < '5' || pin_code.length > '6') {
			$('#shipping-msg').html(
				`<div class="alert alert-warning alert-dismissible fade show">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					<strong> Error! </strong> Postal zipcode is Invalid! 
				</div>`
			);
			return false;
		}
	}	
};
// End Overview Address Validation
// ********************

// ********************
// Dashboard Part
function disableProceed(){
	if ($('#file_id').not(':checked').length == 0) {
        $('.proceed-btn-content').html(
        	'<a href="" class="btn btn-primary Pbtn" id="proceed-btn">PROCEED</a>'
        );
    } else {
        $('.proceed-btn-content').html('');
    }
}

// End Dashboard Part
// ********************