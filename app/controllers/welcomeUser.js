function greetUser(){	
	alert("Welcome, " + username + "!");
}

function goBack(){
	var newWindow = Alloy.createController('index').getView();
	newWindow.open();
}

$.welcomeUser.open();