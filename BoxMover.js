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
	
	boxes.positions.unshift({x: 10, y: 10});
	boxes.positions.unshift({x: 15, y: 10});
	boxes.positions.unshift({x: 20, y: 10});
	boxes.positions.unshift({x: 25, y: 10});
	
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
		playerMovement();
		insertBoxes();
		redrawMatrix();
	}
	
	function playerMovement(){
		matrix[player.lastX][player.lastY] = 0;
		matrix[player.x][player.y] = 1;
		updateCoordinatesDisplay();
	}
	
	function checkValidMovement(vDirection){
		switch(vDirection){
			case 1:
				if(matrix[player.x][player.y - 1] == 0){
					storePosition(player.x,player.y);
					player.y = player.y - 1;
				}
				break;
			case 2:
				if(matrix[player.x +1][player.y] == 0){					
					storePosition(player.x,player.y);
					player.x = player.x + 1;
				}
				break;
			case 3:
				if(matrix[player.x][player.y + 1] == 0){
					storePosition(player.x,player.y);
					player.y = player.y + 1;
				}
				break;
			case 4:
				if(matrix[player.x -1][player.y] == 0){
					storePosition(player.x,player.y);
					player.x = player.x - 1;
				}
				break;
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
	
	function insertBoxes(){
		boxes.positions.forEach(insertBoxesIntoMatrix)
	}
	
	function insertBoxesIntoMatrix(box){
		matrix[box.x][box.y] = 2;
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
				checkValidMovement(3);
				break;
			case 39://right
				checkValidMovement(2);
				break;
			case 38://up
				checkValidMovement(1);
				break;
			case 37://left
				checkValidMovement(4);
				break;
			case 32://spacebar
				//DEBUG MATRIX VISUALIZATION
				console.table(matrix);
				break;
		}
	}
});