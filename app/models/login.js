var moment = require('alloy/moment');
var AUTHKEY = 'somelongauthkeyforvalidation';
exports.definition = {
	config: {
		"columns": {
			"username":"text primary key",
            "realname":"text",
            "email":"text",
			"loggedIn":"integer",
            "loggedInSince":"text",
            "authKey":"text",

		},
		"adapter": {
			"type": "sql",
			"collection_name": "user",
            "idAttribute": "username"
		}
	},
	extendModel : function(Model) {
        _.extend(Model.prototype, {
            login: function(username, password) {

					var httpClient = Ti.Network.createHTTPClient({
					    onload: function(e) {
					        Ti.API.info("Received text on load: " + this.responseText);
					        if (this.responseText.indexOf("Server Login") > -1){
					        	Ti.App.user = "";
					        	$.txtPwd.value = "";
					        	return false;
					        }else{
					        //Ti.App.myUser = username;
		                    this.set({
		                        loggedIn: 1,
		                        loggedInSince: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
		                        authKey: AUTHKEY
		                    });
		                    this.save();
		                    return true;
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
				// Fake login used for demonstration. Don't do this.
                if (username === USERNAME && password === PASSWORD) {
                    this.set({
                        loggedIn: 1,
                        loggedInSince: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
                        authKey: AUTHKEY
                    });
                    this.save();
                    return true;
                } else {
                    return false;
                }
            },
            logout: function() {
                this.set({
                    loggedIn: 0,
                    loggedInSince: '',
                    authKey: ''
                });
                this.save();
            },
            validateAuth: function() {
                if (this.get('loggedIn') === 1 && this.get('authKey') === AUTHKEY) {
                    return true;
                } else {
                    return false;
                }
            },
            transform: function() {
                var t = this.toJSON();
                t.themeBGColor = t.theme === 2 ? '#00f' : t.theme === 1 ? '#ff0' : '#963';
                t.themeImage = t.theme === 2 ? '/jeans.png' : t.theme === 1 ? '/banana.jpg' : '/family.jpg';
                return t;
            }
        });
        return Model;
    }
};
