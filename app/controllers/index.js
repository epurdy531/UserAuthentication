var securely = require('bencoding.securely');
var properties = securely.createProperties({
    secret:"sshh_dont_tell",
});


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

	        	properties.setString('username', username);//storing username
	        	properties.setString('password', password);//storing password

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

if(properties.getString('username') != '' && properties.getString('password') != ''){
	httpLogin(properties.getString('username'), properties.getString('password'));
}else{
$.index.open();
};