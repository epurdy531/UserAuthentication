function createUser(){
	//variable Cloud gets the module ti.Cloud
	var Cloud = require('ti.Cloud');
	
	//function in the module called User.login
	//checks if it is a valid user with the cloud service
	
	
	Cloud.Users.create({
		email: $.txtEmail.value,
		first_name: $.txtFname.value,
		last_name: $.txtLname.value,
		username: $.txtNewUserName.value,
		password: $.txtNewPwd.value,
		password_confirmation: $.txtNewPwdVerify.value
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        alert('User Created:\n' +
	            'Username: ' + user.username + '\n' +
	            'Email: ' + user.email + '\n' +
	            'first name: ' + user.first_name + '\n' +
	            'last name: ' + user.last_name);
	    } else {
	        alert('Error:  s' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}


function goBack(){
	var newWindow = Alloy.createController('index').getView();
	newWindow.open();
}

$.newuser.open();