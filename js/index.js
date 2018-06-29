window.onload = function(){
	let screen = document.querySelector(".screen");
	let letter1 = document.querySelector(".letter1");
	let keys = document.querySelectorAll(".key");
	let life = document.querySelector(".life");
	let source = document.querySelector(".source");
	let status = document.querySelector(".status");
	let music = document.querySelector(".music");
	let gameOver = document.querySelector(".gameOver");
	let span = document.querySelector(".gameOver>span");
	let btn = document.querySelector(".btn");
	let zezhao = document.querySelector(".zezhao");
	let audio1 = document.querySelector(".audio1");
	let audio2 = document.querySelector(".audio2");

	let game = new Game();
	game.screen = screen;  //屏幕
 	game.keys =keys; //按键
	game.status = status;  //游戏状态  开始||暂停
	game.music = music; //游戏背景音乐
	game.gameOver = gameOver; //弹框
	game.btn = btn;  //按键
	game.life = life;  //生命值
	game.source = source; //积分
	game.letter = letter1; //积分
	game.zezhao = zezhao; 
	game.span = span; 
	game.audio1 = audio1; 
	game.audio2 = audio2; 
	game.num = 5;
	game.createLetter(5)
	game.run();
	game.keyTouchstart();
	game.stop();
}