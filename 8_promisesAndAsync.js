//a basic async call
let callback = () => {
	console.log("Times UP!");
};

let timerID = setTimeout(callback,2000);
console.log("ID of timer is "+ timerID);


//more compact
console.log("ID of timer is " + setTimeout(()=>console.log("Times UP!"),2000))



//obj to keep track of alarm
let alarm = {
	time: 2000,
	startAlarm: function(callback){
		this.alarmId = setTimeout(callback,this.time)
	}
}

alarm.startAlarm(()=>console.log('its done'));



let alarm = {
	time: 2000,
	startAlarm: function(callback){
		this.alarmId = setTimeout(callback,this.time)
	}
}

//obj using alarm
let recipe = {
	chop: function(){
		console.log('chopping stuff');
	},
	bake: function(){
		console.log('starting bake');
		alarm.startAlarm(()=>console.log('done baking'));
	},

	steps: [
		'chop',
		'bake'
	],

	cook: function(){
		console.log(this.steps);
		this.steps.forEach(function(el){
			console.log(el);
			this[el]();
		}.bind(this));
	}
}
recipe.cook();
//wiring up a callback for when cook is REALLY done is painful



//alarm using a promise
let alarm = {
	time: 2000,
	startAlarm: function(){
		let time = this.time;
		return new Promise(function(resolve, reject){
			this.alarmId = setTimeout(resolve,time)
		});
	}
}

let alarmPromise = alarm.startAlarm();
alarmPromise.then(()=>console.log('its done'));

//more compact
alarm.startAlarm().then(()=>console.log('its done'));



//now we can return promises instead of taking callbacks
let alarm = {
	time: 2000,
	startAlarm: function(){
		let time = this.time;
		return new Promise(function(resolve, reject){
			this.alarmId = setTimeout(resolve,time)
		});
	}
}
let recipe = {
	chop: function(){
		console.log('chopping stuff');
		return Promise.resolve();
	},
	bake: function(){
		console.log('starting bake');
		return alarm.startAlarm().then(()=>console.log('done baking'));
	},

	steps: [
		'chop',
		'bake'
	],

	cook: function(){
		console.log(this.steps);
		let promises = [];
		this.steps.forEach(function(el){
			console.log(el);
			promises.push(this[el]());
		}.bind(this));

		return Promise.all(promises);
	}
}
recipe.cook().then(()=>console.log('done cooking'));