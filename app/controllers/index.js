var keychain = require('com.obscure.keychain');
var userKeychainItem;
var passKeychainItem;

if(!userKeychainItem && !passKeychainItem){
	userKeychainItem = keychain.createKeychainItem('username');
	passKeychainItem = keychain.createKeychainItem('password');
};

Ti.API.info("username:  " + userKeychainItem.valueData);
Ti.API.info("pw:  " + passKeychainItem.valueData);
var username;
var password;			    
			    
function loginUser(){
	username = $.txtUserName.value;
	password = $.txtPwd.value;	
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
	        	alert("Please enter valid credentials");
	        // worked
	        }else{
				userKeychainItem.valueData = username; // username
				passKeychainItem.valueData = password; // password
				alert('credentials stored');
				
				Ti.App.Username = "";
				Ti.API.info("***************");
				Ti.API.info("username:  " + userKeychainItem.valueData);
				Ti.API.info("***************");
			    Ti.API.info("pw:  " + passKeychainItem.valueData);
		        welcomeUser();
		        alert("login worked!");
				
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

if(userKeychainItem){
	welcomeUser();
}else{
	alert("In ELSE statement!");
    $.index.open();
};