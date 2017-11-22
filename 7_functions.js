7_functions.txt

//defining functions this way still creates a variable
function addTwoNumbers(a,b){
	console.log("arguments to add: ",a,b);
	return a+b;
}

//function ptr can be assigned to other variables
let add2Numbers = addTwoNumbers;

//wrapping a function to supply one of it's parameters
let addToThree = function(a){
	return addTwoNumbers(a,3);
}

//same as above, returns a new function pointer
let addToThree = addTwoNumbers.bind(null,3);

//wrappers can also be wrapped, they're just functions
let addTwelveToThree = addToThree.bind(null,12);



//arguments is a special keyword
let addNumbers = function(){
	let sum=0;
	for(let i = 0;i<arguments.length;i++){
		sum+=arguments[i];
	}
	return sum;
}
addNumbers(1,2,3,4,5,6);




//scoping using bind instead of putting function inside obj
let obj = {
	value:1
}

let accessor = function(){
	console.log(this, this.value);
}

accessor();

obj.accessor = accessor;
obj.accessor();

accessor = accessor.bind(obj);



//arrow functions are shorthand but behave differently sometimes
let addTwoNumbers = (a,b) => {
	return a+b;
}

//shorterhand arrow functions to just return something
let addTwoNumbers = (a,b) => (a+b);

//but can still be bound / wrapped
addToThree = addTwoNumbers.bind(null,3);
addToThree(2);


//arrow functions do not get scope
let obj = {
	value:1,
	accessor:() => (this.value)
};
obj.accessor();


//can do obj property extraction during parameter assignment
let numberContainer = {
	a: 11,
	b: 12
};

let addTwoNumbers = ({a,b}) => (a+b);
addTwoNumbers(numberContainer);