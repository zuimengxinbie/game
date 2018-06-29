function Game(){
	this.screen = "";  //屏幕
 	this.keys = ""; //按键
	this.status = "";  //游戏状态  开始||暂停
	this.music = ""; //游戏背景音乐
	this.gameOver = ""; //弹框
	this.btn = "";  //按键
	this.life = "";  //生命值
	this.source = ""; //积分
	this.letterObjs = {} //字母对象
	this.letter = "";
	this.sudu = 10;
	this.zezhao = "";
	this.span = "";
	this.audio1 = "";
	this.audio2 = "";
	this.defaultLife = 1;
	this.num = ""
	// {
	// 	A:{top:10,left:10;node:<div></div>,},
	//     B:{top:10,left:10;node:<div></div>,},
	//	C:{top:10,left:10;node:<div></div>,},
	// 	D:{top:10,left:10;node:<div></div>,},
	// }
}
Game.prototype={
	createLetter:function(num=1){
		this.num = num;
		for(let i=0;i<num;i++){
			let div = document.createElement("div");
			div.className = "letter";
			//背景图片随机
			let imgName;
			do{
				let charCode = Math.floor(Math.random()*26+65);
				imgName= String.fromCharCode(charCode);
			}while(this.letterObjs[imgName])
			
			div.style.backgroundImage = `url(img/A_Z/${imgName}.png)`;
	 		//位置随机  top left
	 		let LeftValue;
	 		do{
	 			LeftValue = Math.floor(Math.random()*(this.screen.offsetWidth-this.letter.offsetWidth));
	 		}while(this.isOK(LeftValue))
	 		
	 		div.style.left = LeftValue+"px";

	 		let TopValue =  Math.floor(Math.random()*(100));
	 		div.style.top = TopValue+"px";
			this.screen.appendChild(div);
			this.letterObjs[imgName] = {top:TopValue,left:LeftValue,node:div};
		}
	},
	run:function(){
		//run方法主要作用是让字母下落
		this.t = setInterval(()=>{
			for(let i in this.letterObjs){
				let obj = this.letterObjs[i];
				obj.top+=this.sudu;
				if(obj.top>this.screen.offsetHeight){

					this.life.innerText --;
					if(this.life.innerText<=0){
						this.pause();
						return;
					}
					//删除并创建元素
					this.screen.removeChild(this.letterObjs[i].node);
					delete this.letterObjs[i];
					this.createLetter();

					
					return;
				}
				obj.node.style.top = obj.top + "px";

			}
		},100)
	},
	isOK:function(left){
		// true   重复
		// false  不重复
		for(let i in this.letterObjs){
			let oldLeft = this.letterObjs[i].left;
			if(Math.abs(oldLeft-left)<this.letter.offsetWidth){
				return true;
			}
		}
		return false;
	},
	pause:function(){
		clearInterval(this.t);

		//初始化各种参数
		for(let i in this.letterObjs){
			this.screen.removeChild(this.letterObjs[i].node);
		}
		this.letterObjs = {};
		this.btn.innerText = "重新开始";
		this.span.innerText = this.source.innerText;
		this.source.innerText = 0;
		this.life.innerText = this.defaultLife;
		this.gameOver.classList.add("gameOverActive");
		this.status.classList.add("pause");
		this.zezhao.style.display = 'block';
	},
	keyTouchstart:function(){
		//添加按键按下事件
		this.keys.forEach((item)=>{
			item.addEventListener("touchstart",()=>{
				this.audio2.play();
				let letter = item.innerText;//获取按下字母
				if(this.letterObjs[letter]){
					this.screen.removeChild(this.letterObjs[letter].node);
					this.source.innerText++;
					delete this.letterObjs[letter];
				}

			})
		})
		this.status.addEventListener("touchstart",()=>{
			if(this.status.className=="status"){
				this.stop();
				this.status.classList.add("pause");
			}else{
				this.run();
				this.status.className="status"
			}
		}),
		this.btn.addEventListener("touchstart",()=>{
			this.status.classList.remove("pause");
			this.gameOver.classList.remove("gameOverActive");
			this.zezhao.style.display = 'none';
			if(this.btn.innerText=="重新开始"){
				this.createLetter(this.num);
				this.run();
			}else{
				this.run();
			}
		})
		this.music.addEventListener("touchstart",()=>{
			if(this.music.className=="music"){
				this.music.classList.add("musicActive");
				this.audio1.pause();
			}else{
				this.music.classList.remove("musicActive");
				this.audio1.play();
			}
		})
	},
	stop:function(){
		clearInterval(this.t);
		this.status.classList.add("pause");
		this.gameOver.classList.add("gameOverActive");
		this.zezhao.style.display = 'block';
		this.btn.innerText="继续";
	}
}