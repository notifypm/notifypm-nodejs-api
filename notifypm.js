
/*
--------------------------
NOTIFY.PM API Class v1.1.0
(c) 2017 NOTIFY.PM LIMITED
--------------------------
--------------------------
You need to create a business account to use this API (http://notify.pm/business/).

The use of this script and the API is subject to our terms of use and privacy policy (http://notify.pm/terms-and-privacy.html).

Send Push notifications in two lines of code:

const Notifypm = require('./notifypm.js');

n = new Notifypm("email@xxx.xx", "passwordxxxx", () => {
	n.push("Testing the notifypm API.", "http://api.notify.pm");
}, myNumber);


n.connect(email, password);
n.set(anotherNumber);
...

n.getQRCode(number);
n.getQRCodeURL(number);

n.api(module, data, callback, logged=true/false);

		login: email, password, deviceId, lang

		init: get account information

		logout

		addNumber: number

		removeNumber: number

		getList: (list of numbers subscribed)

		updateEmail: email, password, deviceId

		updatePassword: oldPassword, newPassword, deviceId

		_newCampaign: number, message, url

		_newNumber: number, name

		_getBusiness

		_getCampaignList

		_getList : (list of numbers)

		_getPayments

*/

var fs = require('fs');
var request = require("request")


class Notifypm{


	 constructor(email=false, password=false, callback, number=false) {
	 	this.token='';
	 	this.apiDomain="https://api.notify.pm/";
	 	this.deviceId="APIV1.1";
	 	this.lang="en";
	 	this.currentNumber=0;
	 	this.error=0;
		if(number) { this.currentNumber=number; }
		if(email && password){
			this.connect(email, password, callback);
		}
	}

	 connect(email, password,callback) {
		this.api("login", {"email":email, "password":password}, (rq)=> {
			if(rq.hasOwnProperty('type') && rq.hasOwnProperty('message') && rq.type=="token") {
			this.token = rq.message;
			callback();
			}
			else
			{
				this.token = false;
			}
		}, false);
	}

	isOnline(){
		if(this.token){
			return true;
		}
		else
		{
			return false;
		}
	}

	isError(){
		if(this.error){
			return true;
		}
		else
		{
			return false;
		}
	}

	getRequest(url){
		return new (require('httpclient').HttpClient)({
	    method: 'GET',
	      url: url
	    }).finish().body.read().decodeToString();
	}

	 disconnect() {
		this.api("logout");
		return true;
	}

	 set(n) {
		this.currentNumber=n;
	}

	 push(content, url=" ", number=false) {
		if(number) { n = number;} else { n = this.currentNumber; }
		this.api("_newCampaign", {"message":content, "url":url, "number":n}, (r)=>{
			if(r.hasOwnProperty('type') && r.type=="success") {
				this.error=0;
			}
			else
			{
				this.error=1;
			}
		});
	}

	checkJSON(json) {
		try {
        	JSON.parse(json);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

	 api(module, data={}, callback, logged=true) {
		if(logged){
			data['token'] = this.token;
		}
		data['deviceId'] = this.deviceId;
		data['lang'] = this.lang;
		request({url:this.apiDomain+"?module="+module+"&payload="+encodeURIComponent(JSON.stringify(data)), json:true}, (error, response,body) => {
			if(this.checkJSON(body)) {
				callback(JSON.parse(body));
			}
			else
			{
				callback(body);
			}
		});
		
	}

	 getQRCode(number=false) {
		if(number) { n = number;} else { n = this.currentNumber; }
		return this.getRequest("https://notify.pm/business/qr.php?number="+n);
	}

	 getQRCodeURL(number=false) {
		if(number) { n = number;} else { n = this.currentNumber; }
		return "https://notify.pm/business/qr.php?number="+n;
	}

	
}

module.exports = Notifypm;
