function greetUser(){	
	alert("username: " + Ti.App.Properties.getString('username'));
}

function goBack(){
	var newWindow = Alloy.createController('index').getView();
	newWindow.open();
}

//Ti.API.info("username: " + Ti.App.Properties.getString('username'));
//Ti.API.info("password: " + Ti.App.Properties.getString('password'));
$.welcomeUser.open();