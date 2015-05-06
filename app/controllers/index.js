function loginUser(){
	var username = $.txtUserName.value;
	var password = $.txtPwd.value;
	var httpClient = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        Ti.API.info("Received text on load: " + this.responseText);
	        if (this.responseText.indexOf("Server Login") > -1){
	        	$.txtUserName.value = "";
	        	$.txtPwd.value = "";
	        	//Ti.Gesture.fireEvent('shake');
	        	alert("Please enter valid credentials");
	        }else{
	        Ti.App.myUser = username;
	         //welcomeUser();
	         alert("login worked!");
	        }
	    },
	    onerror: function(e) {
	        Ti.API.error("Error is: " + e.error);
	    },
	    timeout : 5000,
	});

	//var url = "https://coelm2/TNdevelopment/mobile/EricaTest.nsf/HelloWorld.xsp";
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


$.index.open();