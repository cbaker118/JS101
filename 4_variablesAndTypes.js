
//check types of various literals
typeof "123";
typeof 123;
typeof true;

//functions are stored as variables too
var f = function(){
	return 123;
}
typeof f;
typeof f();

//casting can be done many ways
var one = 1;
typeof one;

one = ("" + 1);
typeof one;

//array and object initializations
var arr = [];
var obj = {};

//but theyre both type 'object'
typeof arr;
typeof obj;

//don't need to explicitly say 'var'
//literals are passed by value
//modifications don't leave the function
f = function(arg){
	arg = arg + 1;
	console.log(arg);
}
var one = 1;
f(one);
console.log(one);


//objects are passed by reference
//modifications change the obj passed in
f = function(arg){
	arg.one = arg.one + 1;
	console.log(arg.one);
}

var obj = {one: 1};
f(obj);
console.log(obj);