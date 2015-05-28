



function greetUser(){	
	alert("Welcome!");
}

function goBack(){
	var newWindow = Alloy.createController('index').getView();
	newWindow.open();
}

$.welcomeUser.open();