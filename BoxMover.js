document.addEventListener("DOMContentLoaded", function(event) {
	
//#####################################
//variables
//#####################################	

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var positionx = document.getElementById("playerx");
	var positiony = document.getElementById("playery");
	var player;
	var px;
	var matrix;
	var boxes;
	var empty;
	var wall;

//#####################################
//init values
//#####################################
	
	canvas.width = 800;
	canvas.height = 800;
	px = 20;
	matrix = createMatrix(40,40,0);
	
	player = {
		x: 19,//outsource and randomize
		y: 19,
		color: "blue",
	};
	
	boxes = {
		color: "orange",
	};
	
	empty = {
		color: "white",
	};
	
	wall = {
		color: "black",
	};

//#####################################
//init map
//#####################################	

	for(var i = 0; i < 40; i++){
		fillRandomEmptyField(2,38,1);
	};

	for(var i = 0; i < 4; i++){
		fillRandomEmptyField(3,39,0);
	};

//#####################################
//functions
//#####################################	
	
	function createMatrix(x,y,defaultValue){
		var arr = [];
		for(var i = 0; i < x; i++){
			arr.push([]);
			arr[i].push(new Array(y));
			for(var j = 0; j < y; j++){
				arr[i][j] = defaultValue;
			}
		}
	return arr;
	}
	
	function fillRandomEmptyField(value,max,min){
		var x = Math.floor(Math.random() * max) + min;
		var y = Math.floor(Math.random() * max) + min;
		if (matrix[x][y] == 0){
			matrix[x][y] = value
		}else{
			fillRandomEmptyField(value,max,min);
		}
	}

	function movementHandler(direction){
		matrix[player.x][player.y] = 0;
		switch(direction){
			case 1:
				if(checkValidMovement(player.x, player.y, 0, -1) == true){
					player.y = player.y - 1;
				}
				break;
			case 2:
				if(checkValidMovement(player.x, player.y, +1, 0) == true){
					player.x = player.x + 1;
				}
				break;
			case 3:
				if(checkValidMovement(player.x, player.y, 0, +1) == true){
					player.y = player.y + 1;
				}
				break;
			case 4:
				if(checkValidMovement(player.x, player.y, -1, 0) == true){
					player.x = player.x - 1;
				}
		}
		onAfterMovement();
	}
	
	function checkValidMovement(posX, posY, modX, modY){
		switch(matrix[posX + modX][posY + modY]){
			case 0:
				return(true);
				break;
			case 2:
				if(checkValidMovement(posX + modX, posY + modY, modX, modY) == true){
					matrix[posX + 2 * modX][posY + 2 * modY] = 2;
					return(true);
				};
				break;
			default:
				return(false);
				break;
		}
	}

	function onAfterMovement(){
		processPlayerMovement();
		redrawMatrix();
	}
	
	function processPlayerMovement(){
		matrix[player.x][player.y] = 1;
		updateCoordinatesDisplay();
	}	
	
	function updateCoordinatesDisplay(){
		positionx.innerHTML = "X: " + (player.x + 1);
		positiony.innerHTML = "Y: " + (player.y + 1);
	}
	
	function redrawMatrix(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < 40; i++){
			for(var j = 0; j < 40; j++){
				drawField(i,j);
			}
		}
	}
	
	function drawField(x,y){
		switch(matrix[x][y]){
			case 0:
				ctx.fillStyle = empty.color;
				break;
			case 1:
				ctx.fillStyle = player.color;
				break;
			case 2:
				ctx.fillStyle = boxes.color;
				break;
			case 3:
				ctx.fillStyle = wall.color;
				break;
		}
		ctx.fillRect(x * px, y * px, px, px);
	}
	
	
//#####################################
//gameInit
//#####################################	
	
	onAfterMovement();

//#####################################
//controls
//#####################################

	window.onkeydown = function(event){
		switch(event.keyCode){
			case 40://down
				movementHandler(3);
				break;
			case 39://right
				movementHandler(2);
				break;
			case 38://up
				movementHandler(1);
				break;
			case 37://left
				movementHandler(4);
				break;
			case 32://spacebar
				//DEBUG MATRIX VISUALIZATION
				console.table(matrix);
				break;
		}
	}
});