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
	var grid;
	var box;
	var direction;

//#####################################
//init values
//#####################################
	
	canvas.width = 800;
	canvas.height = 800;
	
	px = 20;
	
	player = {
		x: 19,
		y: 19,
		color: "blue"
	};
	
	box = {
		x: 29,
		y: 9,
		color: "orange"
	};
		
//#####################################
//UI interactions
//#####################################	


	
//#####################################
//functions
//#####################################	
	
	function move(){
		//checkNextField();
		redrawAll();
		updateCoordinatesDisplay();
	}
	
	function redrawAll(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		redrawPlayer();
		pushBox();
		redrawBox();
	}
	
	function redrawPlayer(){
		ctx.fillStyle = player.color;
		ctx.fillRect(player.x * px, player.y * px, px, px);
	}
	
	function redrawBox(){
		ctx.fillStyle = box.color;
		ctx.fillRect(box.x * px, box.y * px, px, px);
	}
	
	function updateCoordinatesDisplay(){
		positionx.innerHTML = "X: " + (player.x + 1);
		positiony.innerHTML = "Y: " + (player.y + 1);
	}

	function pushBox(){
		switch(direction){
			case 1:
				if ((player.y == box.y) && (player.x == box.x)){
					box.y = box.y -1;
				}
				break;
			case 2:
				if ((player.x == box.x) && (player.y == box.y)){
					box.x = box.x +1;
				}
				break;
			case 3:
				if ((player.y == box.y) && (player.x == box.x)){
					box.y = box.y +1;
				}
				break;
			case 4:
				if ((player.x == box.x) && (player.y == box.y)){
					box.x = box.x -1;
				}
				break;
		}
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
				direction = 3;
				player.y = player.y + 1;
				move();
				break;
			case 39://right
				direction = 2;
				player.x = player.x + 1;
				move();
				break;
			case 38://up
				direction = 1;
				player.y = player.y - 1;
				move();
				break;
			case 37://left
				direction = 4;
				player.x = player.x - 1;
				move();
				break;
		}
	}
		var arrow_keys_handler = function(e) {
		switch(e.keyCode){
			case 37: case 39: case 38:  case 40: // Arrow keys
			case 32: e.preventDefault(); break; // Space
			default: break; // do not block other keys
		}
	};
	window.addEventListener("keydown", arrow_keys_handler, false);

});