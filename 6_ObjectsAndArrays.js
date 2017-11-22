//define empty object
let obj1 = {}
obj1.key1 = 'value1';

//define object with properties
let obj2 = {key2: "value2"}
obj2.key3 = 'value3';

//nesting objects, don't have to specify obj2:obj2 
let nestedObjs = {obj1: obj1, obj2};

let spreadObjs = {...obj1,...obj2};

let arrayOfObjs = [obj1,obj2];


let spreadArray = [...obj1,...obj2];


//normally order doesn't matter
//for most purposes these are the same objects, though keys is reordered
let obj1 = {key1: 'value1', key2: 'value2'}
console.log(Object.keys(obj1));
let obj2 = {key2: 'value2',key1: 'value1'} 
console.log(Object.keys(obj2));



//but with spread operator, order matters.
let obj1 = {key1: 'value1', key2: 'value2'}
let obj2 = {...obj1, key1:'apple'}
let obj3 = {key1:'apple', ...obj1}
console.log(obj2,obj3)




//even though its an array, we can skip to index 3
let arr = [];
arr[3] = 'threeeee';
//indexes before 3 are empty / undefined
console.log(arr,arr[0],arr[3]);
//push and pop edit end of array, shift and unshift edit begining
arr.push('four');
arr.pop();

//nested objects are references so editing obj1 edits nestedObj as well
obj1.apple = 'red';
console.log(nestedObjs);
//but not spreadObj, because spread does a copy of properties
console.log(spreadObjs);

//only arrays have length, but can get keys and do length on that
spreadObjs.length;
arr.length;
Object.keys(spreadObjs);



//for in vs for i=0...
for(let key in spreadObjs){
	console.log(key + ': ' + spreadObjs[key]);
}

for(let key in arr){
	console.log(key + ': ' + arr[key]);
}

for(let i = 0;i<arr.length;i++){
	console.log(i + ': ' + arr[i]);
}

let keys = Object.keys(spreadObjs);
for(let i = 0;i<keys.length;i++){
	console.log(i + ': ' + keys[i]);
}



//pull out obj properties during variable assignment
let props = {
	name: 'craig',
	userid: 'craigb',
	age: 32
};

let {name,userid,age} = props;
console.log(userid);



//pull out indeicies during variable assignment
let email = 'craigb@clemson.edu';
let parts = email.split('@');
let [username,domain] = parts;
console.log(username);