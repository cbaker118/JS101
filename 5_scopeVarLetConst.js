//global scope is accessible anywhere, same as window.variable
var apple = "red";
console.log(window.apple);

//functions make new scopes
//but if variable doesn't exist in taht scope,
//JS looks up the scope chain til it finds it
var f1 = function(){
	console.log(apple);
	console.log(window.apple);
}
f1();

//apple here is found before looking at global scope's apple
var f2 = function(){
	var apple = "sweet";
	console.log(apple);
	console.log(window.apple);
}
f2();


//var can be reassigned
var apple = 'red';
var apple = 'blue';

//let cannot be reassigned
let apple = 'red';
let apple = 'blue';



//let is more strict about it's scope
let banana = "yellow";
//never explictly writes to global scope
console.log(window.banana);

//still accessible, because of scope chaining
var f1 = function(){
	console.log(banana);
}
f1();

//scope chaining works same way here as well
var f2 = function(){
	let banana = "sweet";
	console.log(banana);
}
f2();
console.log(banana);




//not all {} create scope with var
for(var i = 0;i<3;i++){
	console.log(i);
}
console.log('done',i);

//all {} create scope with let
for(let ii = 0;ii<3;ii++){
	console.log(ii);
}
console.log('done',ii);




//var gets hoisted to the top of scope
var apple = "red";
var hoister = function(){
	console.log("should be red: ",apple);
	var apple = "sweet";
	console.log("should be sweet: ",apple);
}
hoister();

//let does not get hoisted
let apple = "red";
let hoister = function(){
	console.log("should be red: ",apple);
	let apple = "sweet";
	console.log("should be sweet: ",apple);
}
hoister();




scope assigned based on how function is called, not how it's made
var obj = {
	value: 1,
	f: function(){
		console.log(this,this.value);
	}
}
obj.f();


var f = function(){
	console.log(this,this.value);
}

var obj = {
	value: 1,
	f: f
};
obj.f()


f2 = obj.f;
f2();



//using function scope to wrap variables in their own scope
var outside = function(){
	let apple = 'red';
	let inside = function(){
		console.log(this);
		console.log(apple);
	}
	return inside;
}

outside()();
console.log(apple);