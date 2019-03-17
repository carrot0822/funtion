
window.onload = function(){
	//获取dom对象 windows 大小写
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	
	var next =document.getElementById('next');
	var index = 1;
	var animated = false;//动画效果过快的影响 先ban掉
	var timer=null //定时器
	//先给两侧的按钮给予交互功能 注意无限滚动
	//在点击之后改变列表相应的原点颜色 break这里没看懂  其实 这里就是
	//驱动事件产生的视觉效果
	function showButton(){
		for (var i=0; i<buttons.length;i++){
			if(buttons[i].className == 'on'){
			 	buttons[i].className = '';//把所有的On取消掉
			 	break;//跳出循环??? 毫无影响
			}
		}
		buttons[index-1].className = 'on';
	}
	
	function animate(offset){
		//动画效果 其实就是位移动画掩盖事件
		animated = true;
		var newLeft = parseInt(list.style.left) + offset ;
		var time = 300;//位移时间
		var interval = 10;//位移间隔时间
		var speed = offset/(time/interval);//不就是路程除以速度吗
		
		function go(){
			//这里的speed正负对应着向前还是向后
			if((speed < 0 && parseInt(list.style.left)>newLeft) ||(speed>0 && parseInt(list.style.left)<newLeft)){
				list.style.left =parseInt(list.style.left) + speed +'px';
				setTimeout(go,interval);//递归啊
			}else{
				animated = false;
				list.style.left = newLeft + 'px';
		
				if(newLeft>-600){
					list.style.left = -3000 + 'px';
				}
				if(newLeft<-3000){
					list.style.left = -600 +'px'
				}
			}
		}
		
		go();	
	}
	
	function play(){
		timer = setInterval(function(){
			next.onclick();
		},2000);
	}
	function stop(){
		clearInterval(timer);
	}
	container.onmouseover = stop;
	container.onmouseout = play;
	next.onclick = function (){
		if(index==5){
			index = 1;
		}else{
			index +=1;
		}
		console.log(index);
		showButton();
		if(!animated){
			animate(-600);
		}
		//!animated等效于 animated ==false
		
	}
    prev.onclick = function(){
		if(index == 1){
			index = 5;
		}else{
			index -= 1;
		}
		console.log(index);
    	showButton();
    	if(!animated){
			animate(+600);
		}
    }
    //给每个小圆点绑定点击事件 点击移动的距离是根据index来计算的 这里若是选择双向数据绑定的话
    //驱动事件的发起者 驱动事件 驱动事件的结果
    for (var i =0; i < buttons.length;i++){
    	buttons[i].onclick = function(){
    		if (this.className == 'on'){
    			return;
    		}
    		
    		var myIndex = parseInt(this.getAttribute('index'));//这里无法使用this. 因为不是私有属性
    		var offset = -600 * (myIndex - index) ; //这里的参数可以切换掉 换成已知的参数
    		
    		if(!animated){
			animate(offset);
			}
    		
    		index = myIndex;
    		showButton();
     	}
    }
}
