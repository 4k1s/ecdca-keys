const nconf = require('nconf');
const fs = require('fs');
const Accounts = require('web3-eth-accounts');
const { Entropy } = require('entropy-string')

const entropy = new Entropy({ total: 1e6, risk: 1e9 })
var entr = entropy.string()
/* get parameters from command line or file */
nconf.argv().env();
nconf.file({ file: 'config.json' });

var accounts = new Accounts();
var entr = entropy.string();
var ethAccount = accounts.create(entr);
console.log("Private key created.");
var ethaddress = ethAccount.address;
var privateKey = ethAccount.privateKey;

fs.writeFile("myKeys/private.key", privateKey, function(err) {
    if(err) {
	return console.log(err);
    }
    else {
    fs.chmod("myKeys/private.key", 0400, (err) => {
    if(err) {
	return console.log(err);
    }
	else {
	console.log('Set permissions to read only for the user.');
	}
    });
    }
    console.log("Private key was saved in myKeys/private.key file");
});
