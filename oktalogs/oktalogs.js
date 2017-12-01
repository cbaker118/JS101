const fs = require('fs');
const ldap = require('ldapjs');
const assert = require('assert');

const shibCreds = require('./shibboleth_credentials.json');

const client = ldap.createClient({
	url: 'ldaps://cuid.clemson.edu:636'
});

client.bind(shibCreds.username, shibCreds.password, function(err) {
	assert.ifError(err);
});
const logFile = "logs.csv";

const opts = {
	//filter: '(cn=)',
	scope: 'sub',
	attributes: ['cn', 'eduPersonPrimaryAffiliation']
};

const users = {};

const getUsername = function(line){
	let atSplit = line.split('@');
	if(atSplit.length < 2){
		return false;
	}
	let part = atSplit[atSplit.length-2];
	let quoteSplit = part.split('"');
	let username = quoteSplit[quoteSplit.length-1];
	return username;
};

const incrementUser = (username) =>{
	if(!users[username]){
		users[username] = {
			count: 0
		}
	}

	users[username].count++;
};

const search = (filter, last) =>{
	opts.filter = filter;
	//console.log('searching with '+filter);
	client.search('ou=users,ou=people,o=cuid', opts, function(err, res) {
		assert.ifError(err);
		console.log('processing results');
		res.on('searchEntry', function(entry){
			var username = entry.object.cn;
			var obj = users[username];
			if(obj && entry.object.eduPersonPrimaryAffiliation){
				obj.affiliation = entry.object.eduPersonPrimaryAffiliation;
			}
			//console.log('searchEntry: '+entry.object.cn, "affiliation: "+entry.object.eduPersonPrimaryAffiliation);
		});

		res.on('end', function(result) {
			console.log('status: ' + result.status);
			if(last){
				setTimeout(done,3000);
			}
		});
	});
};

const done = ()=>{
	let usernames = Object.keys(users);
	for(i=0;i<usernames.length;i++){
		let username = usernames[i];
		console.log(username+","+users[username].count+","+users[username].affiliation);
	}
	console.log('processed '+usernames.length+' users');
	process.exit();
}

const fileHandler =  function(err,data){
	var lines = data.split("\n");
	var index,i,size;
	console.log('length: '+lines.length);

	for(i = 0;i<lines.length;i++){
		let logLine = lines[i];
		let username = getUsername(logLine);
		if(username === false){
			continue;
		}

		incrementUser(username);
		console.log("line "+i+": "+username, users[username].count);
	}

	let usernames = Object.keys(users);
	let filter = "(|";
	for(i=0,numFilterItems=0;i<usernames.length;i++,numFilterItems++){
		let username = usernames[i];
		//filter+= `(cn=${username})`;
		filter+= "(cn="+username+")";
		if(numFilterItems >= 500){
			filter += ")";
			search(filter, (i == usernames.length-1));
			numFilterItems = 0;
			filter = "(|";
		}
	}
	console.log('done with searching');
	if(numFilterItems !== 0){
		filter += ")";
		search(filter,true);
	}
};

fs.readFile(logFile, 'utf8',fileHandler);
console.log('executing code past readFile call');