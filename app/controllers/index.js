function loginUser(){
		Ti.API.info("1");
	//variable https gets the module appcelerator.https
	var https = require("appcelerator.https");
	
	//function in the module called User.login
	//checks if it is a valid user with the cloud service
	
	Ti.API.info("2");
	var securityManager = https.createX509CertificatePinningSecurityManager([
	    {
	        url: "https://coelm2/TNdevelopment/mobile/EricaTest.nsf/HelloWorld.xsp", //URL of the server to contact
	        serverCertificate: "coelm2.der" // X.509 certificate in DER format to verify the server's identity'
	    }
	]);
	
	// Create an HTTP client the same way you always have
	//but pass in the optional Security Manager that was created previously.
	
	
	var httpClient = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        Ti.API.info("Received text: " + this.responseText);
	    },
	    onerror: function(e) {
	        Ti.API.error("Error is: " + e.error);
	    },
	    timeout : 5000,
	    // Set this property before calling the `open` method. 
	    securityManager: securityManager
	});
	var username = $.txtUserName.value;
	var password = $.txtPwd.value;
	var url = "http://www.leg.state.co.us/mobile/iLegislate.nsf/UnpMain.xsp";
	authstr = 'Basic ' + Titanium.Utils.base64encode(username + ':' + password);
	Ti.API.info(authstr);

	httpClient.setRequestHeader("Authorization", authstr);
	httpClient.setRequestHeader("Content-Type", "text/html; charset=utf-8");
	
	httpClient.open("GET","http://www.leg.state.co.us/mobile/EricaTestDB.nsf/Test.xsp");
	httpClient.send();


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