var keychain = require('com.obscure.keychain');
var keychainItem = keychain.createKeychainItem('server account', 'supersecretpassphrase');


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
	        	//NOTE passphrase is ignored on iOS

	        	keychainItem.account = username;//storing username
	        	keychainItem.valueData = password;//storing password

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

if(keychainItem.account != '' && keychainItem.valueData != ''){
	httpLogin(keychainItem.account, keychainItem.valueData);
}else{
$.index.open();
};