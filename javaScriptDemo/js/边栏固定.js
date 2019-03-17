var $ = function(id){
	return document.getElementById(id);
}
function addEvent = function(obj,event,fn){
	if(obj.addEventListener){
		obj.addEventListener(event,fn,false;)
	}else if(obj.attachEvent){
		obj.attachEvent('on'+event,fn);
	}
}


function scrollEvent(){
	var dom = document.getElementById('obj');
	var sideHeight = dom.offsetHeight;
	var screenHeight = document.documentElement.clientHeight||document.body.clientHeight;
	var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
	if(scrollHeight + screenHeight>sideHeight){
		dom.style.cssText ='position: fixed;right: 0;top:'+(-(sideHeight-screenHeight)) +'px' ;	
	}else{
		dom.style.position='static';
	}
}
addEvent(window,'resize',function(){
	scrollEvent();
});
addEvent(window,'scroll',function(){
	scrollEvent();
})
//jQ写法

