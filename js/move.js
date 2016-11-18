/*function move(obj,attr,dir,target,fun){
	dir=parseInt(getStyle(obj,attr))>target?-dir:dir;//用户传过来的往前还是往后的值
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var speed=parseInt(getStyle(obj,attr))+dir;
		if (speed>target && dir>0 || (speed<target && dir<0)) {
			speed=target;
		}
		obj.style[attr]=speed+'px';
		if (speed===target) {
			clearInterval(obj.timer);
			fun && fun();
		}
	},30);
}*/
function move(obj,json,dir,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		for (var attr in json) {
			var myStyle;
			if (attr == 'opacity') {
				myStyle = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				myStyle = parseFloat(getStyle(obj, attr));
			}
			var speed=myStyle+dir;
			if (speed>json[attr] && dir>0 || (speed<json[attr] && dir<0)) {
				speed=json[attr];
			}
			if (attr == 'opacity') {
				obj.style.filter = "alpha(opacity:" +  speed + ")";
				obj.style.opacity =  speed / 100;
			} else {
				obj.style[attr] = speed + 'px';
			}
			if (speed===json[attr]) {
				fn && fn();
				clearInterval(obj.timer);
			}
		}
	},30);
}
function shake(obj,attr,speed,fun){
	var arr=[];
	var num=0;
	for (var i=speed;i>0;i-=2) {
		arr.push(i,-i);
	}
	arr.push(0);
					
	clearInterval(obj.shake);
	obj.shake=setInterval(function(){
		var pos=parseInt(getStyle(obj,attr));//
		obj.style[attr]=pos+arr[num]+'px';
		num++;
		if (num==arr.length) {
			clearInterval(obj.shake);
			fun && fun();
		}
	},50);
}


function random(arr){
	var max=Math.max(arr[0],arr[1]);
	var min=Math.min(arr[0],arr[1]);
	return Math.round(Math.random()*(max-min)+min);//求得min~max中的任意值
}

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}