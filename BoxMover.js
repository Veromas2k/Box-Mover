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
		lastX: 19,
		lastY: 19,
		color: "blue",
	};
	
	boxes = {
		positions: [],
		color: "orange",
	}
	
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
	
	function move(){
		processPlayerMovement();
		redrawMatrix();
	}
	
	function processPlayerMovement(){
		matrix[player.lastX][player.lastY] = 0;
		matrix[player.x][player.y] = 1;
		updateCoordinatesDisplay();
	}
	
	function movementHandler(vDirection){
		switch(vDirection){
			case 1:
				storePosition(player.x,player.y);
				switch(matrix[player.x][player.y - 1]){
					case 0:
						player.y = player.y - 1;
						break;
					case 2:
						if(matrix[player.x][player.y - 2] == 0){
							player.y = player.y - 1;
							matrix[player.x][player.y - 1] = 2;
						}
						break;
				}
				break;
			case 2:
				storePosition(player.x,player.y);
				switch(matrix[player.x + 1][player.y]){
					case 0:
						player.x = player.x + 1;
						break;
					case 2:
						if(matrix[player.x + 2][player.y] == 0){
							player.x = player.x + 1;
							matrix[player.x + 1][player.y] = 2;									
						}
						break;
				}
				break;
			case 3:
				storePosition(player.x,player.y);
				switch(matrix[player.x][player.y + 1]){
					case 0:
						player.y = player.y + 1;
						break;
					case 2:
						if(matrix[player.x][player.y + 2] == 0){
							player.y = player.y + 1;
							matrix[player.x][player.y + 1] = 2;
						}
						break;
				}
				break;
			case 4:
				storePosition(player.x,player.y);
				switch(matrix[player.x - 1][player.y]){
					case 0:
						player.x = player.x - 1;
						break;
					case 2:
						if(matrix[player.x - 2][player.y] == 0){
							player.x = player.x - 1;
							matrix[player.x - 1][player.y] = 2;									
						}
						break;
				}
		}
		move();
	}
	
	function storePosition(x,y){
		player.lastX = x;
		player.lastY = y;
	}
	
	function updateCoordinatesDisplay(){
		positionx.innerHTML = "X: " + (player.x + 1);
		positiony.innerHTML = "Y: " + (player.y + 1);
	}
	
	function pushBox(x,y,direction){
	
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
				ctx.fillStyle = "white"
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
	
	move();

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