function loginUser(){
	var httpClient = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        Ti.API.info("Received text on load: " + this.responseText);

	    },
	    onerror: function(e) {
	        Ti.API.error("Error is: " + e.error);
	    },
	    timeout : 5000,
	    // Set this property before calling the `open` method. 
	    //securityManager: securityManager
	});
	var username = $.txtUserName.value;
	var password = $.txtPwd.value;
	//var url = "https://coelm2/TNdevelopment/mobile/EricaTest.nsf/HelloWorld.xsp";
	authstr = 'Basic ' + Titanium.Utils.base64encode(username + ':' + password);
	Ti.API.info(authstr);

	var result = httpClient.setRequestHeader("Authorization", authstr);
	if(result.Status != 0){
		//good response
		Ti.API.info("Good response from login credentials.");	        
		welcomeUser();
	}
	else
	{
		//bad response
		alert("Incorrect credentials, please try again.");
	}
	
	
	httpClient.setRequestHeader("Content-Type", "text/html; charset=utf-8");
	
	httpClient.open("GET","http://www.leg.state.co.us/mobile/EricaTestDB.nsf/Test.xsp");
	httpClient.send();
	Ti.App.myUser = username;

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


$.index.open();