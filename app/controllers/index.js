//var securely = require('bencoding.securely');
//Ti.API.info("Storing properties in keyChain (only on iOS) - Med Security Level");
//	var	properties = securely.createProperties({
//		identifier:username,
//		secret : password,
//		storageType:securely.PROPERTY_TYPE_KEYCHAIN,
//		securityLevel:securely.PROPERTY_SECURE_LEVEL_MED
//	});
//Titanium.API.info('Identifier' + properties.getString('identifier'));
function loginUser(){
	var username = $.txtUserName.value;
	var password = $.txtPwd.value;	
	httpLogin(username,password);
}

function httpLogin(username, password){
		var httpClient = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        Ti.API.info("Received text on load: " + this.responseText);
	        //didn't work
	        if (this.responseText.indexOf("Server Login") > -1){
	        	$.txtUserName.value = "";
	        	$.txtPwd.value = "";
	        	//alert("Please enter valid credentials");
	        // worked
	        }else{
		        Ti.App.myUser = username;
		        Ti.App.Properties.setString('username',username);
		        Ti.App.Properties.setString('password',password);
		         welcomeUser();
		         //alert("login worked!");
				
		       }
	    },
	    onerror: function(e) {
	        Ti.API.error("Error is: " + e.error);
	    },
	    timeout : 5000,
	});
	authstr = 'Basic ' + Titanium.Utils.base64encode(username + ':' + password);
	Ti.API.info(authstr);
	httpClient.open("GET","http://www.leg.state.co.us/mobile/EricaTestDB.nsf/Test.xsp");
	httpClient.setRequestHeader("Authorization", authstr);
	httpClient.setRequestHeader("Content-Type", "text/html; charset=utf-8");
	httpClient.send();	
}

function openNewUser(){
	var newWindow = Alloy.createController('newuser').getView();
	newWindow.open();
}

function welcomeUser(){
	var newWindow = Alloy.createController('welcomeUser').getView();
	newWindow.open();
}

function resetUser(){
	var newWindow = Alloy.createController('resetuser').getView();
	newWindow.open();
}

if(Ti.App.Properties.getString('username')  && Ti.App.Properties.getString('password')){
	httpLogin(Ti.App.Properties.getString('username'), Ti.App.Properties.getString('password') != "");
}else{
$.index.open();
};