//basic nodejs expressjs server
const express = require('express');
const app = express();

const customers = require('./customer.json');

for(let i = 0;i<customers.length;i++){
	customers[i].id = customers[i]["Customer Code"];
}
const filterer = function(attr,value,element){
	return element[attr].startsWith(vale);
}
app.get('/customers', function (req,res) {
	let results = customers;

	if(req.query.id){
		let ourFilterer = filterer.bind(0,"id",req.params.id);
		results = results.filter(ourFilterer)
	}
	res.status(200).json(results);
});

app.get('/customers/:customerID', function(req,res){
	let customerID = req.params.customerID;
	let index;
	for(let i = 0;i<customers.length;i++){
		if(customers[i].id === customerID){
			index = i;
			break;
		}
	}
	if(index !== undefined){
		res.status(200).json(customers[index]);
	}else{
		res.status(404).end();
	}
});

let port = 3000;
app.listen(port, function () {
	console.log('Example app listening on port '+port);
});