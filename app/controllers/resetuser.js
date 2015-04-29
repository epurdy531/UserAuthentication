function submitEmail(){
	//variable Cloud gets the module ti.Cloud
	var Cloud = require('ti.Cloud');
	
	//function in the module called User.login
	//checks if it is a valid user with the cloud service
	
	
	Cloud.Users.requestResetPassword({
    	email: $.txtEmail.value,
	}, function (e) {
	    if (e.success) {
	        alert('Success: Reset Request Sent');
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function goBack(){
	var newWindow = Alloy.createController('index').getView();
	newWindow.open();
}

$.resetuser.open();