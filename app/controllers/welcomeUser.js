



function greetUser(){	
	alert("Welcome, " + Ti.App.Username + "!");
	//alert("Keychain User:" + userKeychainItem.valueData);
}

function goBack(){
	 $.win3.close();
}

$.win3.open();