var fs = require('fs');
var ldap = require('ldapjs');
var assert = require('assert');

var shibCreds = require('./shibboleth_credentials.json');

var client = ldap.createClient({
	url: 'ldaps://cuid.clemson.edu:636'
});

client.bind(shibCreds.username, shibCreds.password, function(err) {
	assert.ifError(err);
});

var opts = {
  //filter: '(cn=)',
  scope: 'sub',
  attributes: ['cn', 'eduPersonPrimaryAffiliation']
};
var logFile = "/home/craigb/Downloads/okta.7.17.csv";


/* If you could generate one report from January 1 – May 31st paired down to 1 entry per ID and separated by primary affiliation that would be great. A second report from June 1 – current with the same info will help us see the effects of the orientation push. After that I would like to get on a schedule works well for you. Once per month, every other month etc to get a report of the same data. I don’t want to take up too much of your time, whatever works best for you is okay with me.*/

var users = {};

var getUsername = function(line){
	console.log('getting username');
	var parts = line.split("|");
	for(var i = 0;i<parts.length;i++){
		if(parts[i].indexOf("@clemson.edu") !== -1){
			return parts[i].split("@")[0];
		}
	}
	return false;
};

var incrementUser = function(username, arr){
	if(arr[username] === undefined){
		arr[username] = {count:1, username:username, aff: "null"};
	}else{
		arr[username].count++;
	}
};

var done = function(){
	console.log("DONE!");
	client.unbind(function(err) {
		assert.ifError(err);
	});
	var key,obj;
	for(key in users){
		obj = users[key];
		console.log(obj.username+","+obj.aff+","+obj.count);
	}
};

var requested, resolved = 0;

var populateAffiliations = function(filter, users, isLast){
	console.log('getting affiliations');
	opts.filter = filter;
	client.search('ou=users,ou=people,o=cuid', opts, function(err, res) {
		assert.ifError(err);

		res.on('searchEntry', function(users, entry){
			var username = entry.object.cn;
			var obj = users[username];
			if(obj === undefined){
				console.log("ERROR: no user object for "+username);
			}else{
				if(!entry.object.eduPersonPrimaryAffiliation){
					console.log("ERROR: no primary affiliation for "+username);
					obj.aff = "unknown";
				}else{
					obj.aff = entry.object.eduPersonPrimaryAffiliation;
				}
			}
		}.bind(this,users));

		res.on('end', function(result) {
			console.log('status: ' + result.status);
			if(isLast === true){
				setTimeout(done.bind(this), 5000);
			}
		}.bind(this));
	});
};


fs.readFile(logFile, 'utf8', function(err,data){
	var lines = data.split("\n");
	var index,i,size;
	console.log('length: '+lines.length);

	for(i = 0;i<lines.length;i++){
		console.log("line "+i);
		var line = lines[i];
		var username = getUsername(line);
		if (username === false){
			console.log("ERROR: couldn't find a username in line "+i+":\t",line);
			continue;
		}
		console.log("got username "+username);

		incrementUser(username, users);
	}
	var usersKeys = Object.keys(users);
	requested = usersKeys.length;
	console.log('starting lookup: '+requested);
	var filter = "(|";
	for(i = 0, size = 0;i<usersKeys.length;i++,size++){
		var key = usersKeys[i];
		filter += "(cn="+key+")";
		if(size == 500){
			size = 0;
			filter += ")";
			populateAffiliations(filter,users,false);
			filter = "(|";
		}

		
	}
	filter += ")";

	//console.log('filter is: '+ filter);
	populateAffiliations(filter,users,true);
	
});