console.log('starting123');

var grid = [[false,false,false],[false,false,false],[false,false,false]];
var started = false;
var winner;

var setWinner = (won) => {
	winner = won; 
	console.log('winner: '+won);
};

var setInstructions = (text) => {
	document.getElementById("instructions").innerText = text;
};

var checkState = () => {
	//is there a winner?
	var x,y;
	for(x = 0;x<3;x++){
		if(grid[x][0].value === false){
			continue;
		}
		if(grid[x][0].value == grid[x][1].value && grid[x][0].value == grid[x][2].value){
			setWinner(grid[x][0].value);
			return true;
		}
	}

	for(y=0;y<3;y++){
		if(grid[0][y].value === false){
			continue;
		}
		if(grid[0][y].value == grid[1][y].value && grid[0][y].value == grid[2][y].value){
			setWinner(grid[0][y].value);
			return true;
		}
	}

	if(grid[1][1].value !== false){
		if(grid[0][0].value == grid[1][1].value && grid[0][0].value == grid[2][2].value){
			setWinner(grid[1][1].value);
			return true;
		}
		if(grid[2][0].value == grid[1][1].value && grid[2][0].value == grid[0][2].value){
			setWinner(grid[1][1].value);
			return true;
		}
	}

	//is there a move left?
	x=0;
	while(grid[x] !== undefined){
		y=0;
		while(grid[x][y] !== undefined && grid[x][y].value !== false){
			y++;
		}

		if(grid[x][y] && grid[x][y].value === false){
			break;
		}
		x++;
	}
	if(grid[x][y].value !== false){
		setWinner(false);
		return true;
	}

	return false;
};

var AI = () => {
	var choices = [];
	var x,y;
	x=0;
	while(grid[x] !== undefined){
		y=0;
		while(grid[x][y] !== undefined){
			if(grid[x][y].value === false){
				choices.push(grid[x][y]);
			}
			y++;
		}
		x++;
	}

	var choice;
	if(choices.length == 1){
		choice = choices[0];
	}

	choice =choices[Math.floor(Math.random() * 1000) % choices.length];

	choice.value = "O";
	choice.domNode.innerHTML = "0";
};

var endGame = () => {
	var x,y;
	x=0;
	while(grid[x] !== undefined){
		y=0;
		while(grid[x][y] !== undefined){
			grid[x][y].domNode.disabled = true;
			y++;
		}
		x++;
	}


	if(winner === false){
		setInstructions("CAT, no winner....");
	}else if(winner == "X"){
		setInstructions("Winner Winner Chicken Dinner! You won!");
	}else{
		setInstructions("Lost to a computer, SAD!");
	}
	var refreshButton = document.createElement("button");
	refreshButton.onclick = function(){
		location.reload();
	};
	refreshButton.innerHTML = "Reload Game";
	document.getElementById('grid').appendChild(refreshButton);
}

var gridclick = (x,y) => {
	if(started === false){
		var comp = document.getElementById("comp");
		comp.parentNode.removeChild(comp);
	}
	started = true;
	if(grid[x] === undefined || grid[x][y] === undefined){
		return;
	}
	if(grid[x][y].value != false){
		setInstructions("That's already been taken, try somewhere else.");
		return;
	}

	grid[x][y].value = 'X';
	grid[x][y].domNode.innerHTML = "X";
	
	var gameover = checkState();

	if(!gameover){
		AI();
		gameover = checkState();
	}else{
		endGame();
	}

};

var start = () => {
	var gridDomNode = document.getElementById("grid");
	var x,y;

	x = 0;
	while(grid[x] !== undefined){
		y = 0;
		while(grid[x][y] !== undefined){
			grid[x][y] = {
				value: false,
				x: x,
				y: y
			};
			grid[x][y].domNode = document.createElement("button");
			grid[x][y].domNode.id = ""+x+y;
			grid[x][y].domNode.innerHTML = "-";
			grid[x][y].domNode.onclick = gridclick.bind(this, x,y);
			gridDomNode.appendChild(grid[x][y].domNode);

			y++;
		}
		gridDomNode.appendChild(document.createElement("br"));

		x++;
	}

	var compNode = document.getElementById("comp");
	compNode.onclick = function(){
		started = true;
		AI();
		compNode.parentNode.removeChild(compNode);
	};
};


window.addEventListener("load",function(){start();},false);
console.log("done");
