var WINDOW_WIDTH =1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_LEFT = 60;
var MARGIN_TOP = 30;

const endTime = new Date(2018,10,27,18,47,52);//设定的时间 0开始计时 因为下面代码的原因导致时间不能超过99小时
var curShowTimeSeconds = 0; //准确的时间差

//4-3
var balls = [];
const colors = ["#33B5E5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","FFBB33","FF8800","FF4444","#CC0000"];

window.onload = function (){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	canvas.width =WINDOW_WIDTH;
	canvas.height =WINDOW_HEIGHT;
	
	curShowTimeSeconds = getCurrentShowTimeSeconds();
	console.log(curShowTimeSeconds);
	//开启定时器
	setInterval(function(){
		render(context);
		update();
	},50);//匿名函数内 执行的速率不同 不一定能1s24帧做好动画
	
	
}
//更新事件
function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds(); //下一次需要的时间毫秒数
	var nexthours = parseInt(nextShowTimeSeconds/3600);
	var nextminutes =parseInt((nextShowTimeSeconds-nexthours*3600)/60);
	var nextseconds = nextShowTimeSeconds%60;
	
	//此时的时间
	var curhours = parseInt(curShowTimeSeconds/3600);
	var curminutes =parseInt((curShowTimeSeconds-curhours*3600)/60);
	var curseconds = curShowTimeSeconds%60;
	
	if(curseconds!=nextseconds){
		//事件改变的时候才生成小球 6个时间进行判断
		//1.判定小时个位数
		if(parseInt(curhours/10) !=parseInt(nexthours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curhours/10));
		}
		if(parseInt(curhours%10) !=parseInt(nexthours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curhours%10));
		}
		//2.判定分钟
		if(parseInt(curminutes/10) !=parseInt(nextminutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curminutes/10));
		}
		if(parseInt(curminutes%10) !=parseInt(nextminutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curminutes%10));
		}
		//判定秒数
		if(parseInt(curseconds/10) !=parseInt(nextseconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curseconds/10));
		}
		if(parseInt(curseconds%10) !=parseInt(nextseconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curseconds%10));
			console.log(balls);
		}
		curShowTimeSeconds= nextShowTimeSeconds;
	}
	updateBalls();
	
}


//4.3 小球出现

//4.3 小球出现
function addBalls(x,y,num){
	for (var i=0; i<digit[num].length;i++){
		for (var j=0; j<digit[num][j].length; j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					colors:colors[Math.floor(Math.random()*10)]
				}
				balls.push(aBall);
			}
			
			
			
		}
	}
}

//4.4小球动起来
function updateBalls(){
	for (var i =0; i<balls.length;i++){
		console.log(balls[i]);
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		
		if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}
	//对ball里的数据更新
	var cnt = null;
	for (var j=0; j<balls.length;j++){
		if(balls[j].x<=WINDOW_WIDTH&& balls[j].x-RADIUS<WINDOW_WIDTH){
			balls[cnt++] = balls[j]; //检查机制
		}
	}
	while (balls.length > cnt){
		balls.pop();
	}
}

//4.1获取倒计时所需要的时间
function getCurrentShowTimeSeconds() {
	var curTime = new Date();//现在的时间
	
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret/1000);

	return ret >=0?ret:0;
}

//绘制函数 这里的时间常量可以换成传入变量
function render (cxt) {

	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//对一个矩形空间进行一个刷新操作
	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes =parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = curShowTimeSeconds%60;
	
	
	
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT + 30*(RADIUS+1),MARGIN_TOP,10,cxt);
	
	renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT + 69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
	//输出小球
	for( var i=0; i<balls.length; i++){
		cxt.fillStyle = balls[i].colors;
		
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
}
//i代表行数 左边轴Y值 j代表列数左边轴X值 num是给予的数据来渲染生成的数据 cxt是渲染环境 
//这里的数据设计的有点巧妙
function renderDigit (x,y,num,cxt) {

	cxt.fillStyle = 'rgb(0,102,153)';
	
	for (var i =0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}
