function loginUser(){
	//variable https gets the module appcelerator.https
	var https = require("appcelerator.https");
	
	//function in the module called User.login
	//checks if it is a valid user with the cloud service
	
	
	var securityManager = https.createX509CertificatePinningSecurityManager([
    {
        url: "http://coelm2/TNdevelopment/mobile/EricaTest.nsf/HelloWorld.xsp", //URL of the server to contact
        serverCertificate: "CGA.der" // X.509 certificate in DER format to verify the server's identity'
    }
	]);
	
	// Create an HTTP client the same way you always have
	// but pass in the optional Security Manager that was created previously.
	httpClient = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        Ti.API.info("Received text: " + this.responseText);
	    },
	    onerror: function(e) {
	        Ti.API.error(e.error);
	    },
	    timeout : 5000,
	    // Set this property before calling the `open` method. 
	    securityManager: securityManager
	});
	httpClient.open("GET","http://coelm2/TNdevelopment/mobile/EricaTest.nsf/HelloWorld.xsp");
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