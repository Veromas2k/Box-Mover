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

//#####################################
//init values
//#####################################
	
	canvas.width = 800;
	canvas.height = 800;
	px = 20;
	matrix = createMatrix(40,40,0);
	
	player = {
		x: 19,
		y: 19,
		color: "blue",
	};
	
	boxes = {
		positions: [],
		color: "orange",
	};
	
	empty = {
		color: "white",
	};

//#####################################
//init map
//#####################################	
	
	matrix[10][10] = 2;
	matrix[10][15] = 2;
	matrix[15][10] = 2;
	matrix[15][15] = 2;
	
//#####################################
//UI interactions
//#####################################	



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
					matrix[posX + modX + modX][posY + modY + modY] = 2;
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
				draw(i,j);
			}
		}
	}
	
	function draw(x,y){
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
		}
		ctx.fillRect(x * px, y * px, px, px);
	}
	
	
//#####################################
//game
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