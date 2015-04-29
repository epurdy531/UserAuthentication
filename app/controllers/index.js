function loginUser(){
	//variable Cloud gets the module ti.Cloud
	var Cloud = require('ti.Cloud');
	
	//function in the module called User.login
	//checks if it is a valid user with the cloud service
	Cloud.Users.login({
		login: $.txtUserName.value,
		password: $.txtPwd.value
	}, function (result){
		if(result.success){
			var user = result.users[0]; 
			alert('Login worked for ' + user.first_name + ' ' + user.last_name + '!');
		}else{
			alert('Login failed');
		}
	});
}

function openNewUser(){
	var newWindow = Alloy.createController('newuser').getView();
	newWindow.open();
}

function resetUser(){
	var newWindow = Alloy.createController('resetuser').getView();
	newWindow.open();
}


$.index.open();