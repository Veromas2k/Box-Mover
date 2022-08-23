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
	var tempPos;
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
		color: "blue",
	};
	
	tempPos = {
		x: player.x,
		y: player.y
	}
	
	boxes = {
		color: "orange",
	}
	
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
		matrix[tempPos.x][tempPos.y] = 0;
		matrix[player.x][player.y] = 1;
		updateCoordinatesDisplay();
		redrawMatrix();
	}
	
	function checkValidMovement(vDirection){
		switch(vDirection){
			case 1:
				if(player.y - 1 >= 0){
					storePosition(player.x,player.y);
					player.y = player.y - 1;
				}
				break;
			case 2:
				if(player.x + 1 <= 39){
					storePosition(player.x,player.y);
					player.x = player.x + 1;
				}
				break;
			case 3:
				if(player.y + 1 <= 39){
					storePosition(player.x,player.y);
					player.y = player.y + 1;
				}
				break;
			case 4:
				if(player.x - 1 >= 0){
					storePosition(player.x,player.y);
					player.x = player.x - 1;
				}
				break;
		}
		move();
	}
	
	function storePosition(x,y){
		tempPos = {
			x: x,
			y: y
		}
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
				//DEBUG VISUALIZATION
				console.table(matrix);
				//console.table(boxPos);
				break;
		}
	}
});