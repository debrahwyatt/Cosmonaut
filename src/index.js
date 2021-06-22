import React, { 
	useState, 
	useEffect,
	useReducer 
} from "react";
import ReactDOM from 'react-dom';
import "./index.css";


var obstacles = [];
var person = {x:30, y:4};

var max_level = 10
var min_level = 0

var x_max = 100
var x_min = 0


var multiplier = 35
var game_over = true

var d1 = document.getElementById('dialog1')
var d2 = document.getElementById('dialog2')
var start = document.getElementById("start");
var score_text = document.getElementById("score_text");
var song = document.getElementById("song");
var explosion = document.getElementById("explosion");
var victory = document.getElementById("victory");

const intro1 = "USE THE ARROW KEYS TO CONTROL YOUR CAUSMONAUT, PRESS "
const intro2 = " TO BEGIN!"

const lose = "YOU DIED. PRESS "
const win = "YOU WIN! PRESS "

const outro = " TO PLAY AGAIN!"

d1.innerHTML = intro1
d2.innerHTML = intro2

function createObstacle(){
	const y = Math.floor( Math.random() * 11 );
	const x = x_max + 1;
	return {x: x, y: y};
}

function Board() {
	return drawContent();
}

setInterval(function(){ 
	if(game_over == true) return
	score_text.innerHTML = "Distance Remaining: " + Math.floor((multiplier-1)*100)
	multiplier = multiplier - 0.01
	if(multiplier<1 && game_over != true){
		Win()
	}
	if(Math.floor( Math.random() * multiplier + 1) == 1){
		obstacles.push(createObstacle());
	}
	ReactDOM.render(
		<Board />,
		document.getElementById('content')
	);
}, 20);

function drawContent(){
	var line = "";

	for(var level=max_level; level>=min_level; level--){

		for(var i=0; i<=x_max + 1; i++){
			var bar = obstacles.filter(obstacle => (obstacle.x === i && obstacle.y === level));
			if(i == person.x && level == person.y){
				line = line + '>';
			}
			else if(bar.length != 0){
				line = line + '+';
				bar[0].x--;

				if((bar[0].x === person.x) && (bar[0].y === person.y)){
					End();
				}

				if(bar[0].x === 1){
					obstacles.shift();
					bar.shift();
				}
			}			
			else line = line + ' ';
		}
		line = line + '\n';
	}
	return line;
}

document.onkeydown = checkKey;
const up = '38'
const down = '40'
const left = '37'
const right = '39'

start.addEventListener("click", function (e) {
	Start()
});

function Start(){
	obstacles = [];
	person = {x:25, y:4};
	multiplier = 25
	d1.innerHTML = ""
	d2.innerHTML = ""
	start.style.visibility = "hidden"
	song.currentTime = 0
	victory.currentTime = 0
	victory.pause()
	song.play()
	game_over = false;
}

function End(){
	d1.innerHTML = lose
	d2.innerHTML = outro
	start.style.visibility = "visible"
	explosion.play()
	song.pause()
	game_over = true
}

function Win(){
	d1.innerHTML = win
	start.style.visibility = "visible"
	d2.innerHTML = outro
	song.pause()
	victory.play()
	game_over = true

}
function checkKey(e) {

    e = e || window.event;
    
    // up arrow
    if (e.keyCode == up) {
    	if(person.y == max_level) return;
    	person.y++
    }
    // down arrow
    else if (e.keyCode == down) {
    	if(person.y == min_level) return;
    	person.y--
    }
    // left arrow
    else if (e.keyCode == left) {
	   	if(person.x == x_min) return;
    	person.x--
    }
    // right arrow
    else if (e.keyCode == right) {
    	if(person.x == x_max) return;
    	person.x++
    }
}