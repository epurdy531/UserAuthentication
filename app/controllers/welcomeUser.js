function greetUser(){	
	alert("Welcome, " + Ti.App.myUser + "!");
}

function goBack(){
	var newWindow = Alloy.createController('index').getView();
	newWindow.open();
}

$.welcomeUser.open();