# notifypm-nodejs-api
Send push notifications without mobile app in two lines of code!
API to use with https://notify.pm/
Works with a sender account, you can open an account on https://notify.pm/business

## Set up

```js
const Notifypm = require('./notifypm.js');

n = new Notifypm("email@xxx.xx", "password", () => {
	n.push("Content", "Link (optinal)");
}, '.pmNumber');
```

## Additional functions

Change the number you use to send:
```js
n.set('anotherNumber');
```

Get PNG QR Code for your number:
```js
n.getQRCode('number');
// Or a link version:
let img = '<img src="'+$n.getQRCodeURL('number')+'" />';
```

## Use the API directly

```js
$n.api(module, data {}, callback(data));
```

### Some API modules :
_newNumber: number, name


		_getCampaignList {'number': xxx} : returns a list of notifications sent with the specified number

		_getList : (list of numbers associated with this account)
    
    
## Fees
Fees are similar than when using the business interface. Pricing on https://notify.pm/business

## Terms of use and privacy policy
The use of the API is subject to the same terms of use than the rest of notify.pm services and subject to a valid business account. https://notify.pm/
