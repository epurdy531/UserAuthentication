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