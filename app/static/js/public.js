//获取非行内样式
function getStyle(ele, arrt) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(ele, false)[arrt];
	}
	return ele.currentStyle[arrt];
}
//获取数据类型
function checkType(data) {
	var str = Object.prototype.toString.call(data);
	return str.match(/\w+/g)[1];
}
//获取随机十六进制颜色
function getColoe() {
	var str = "#";
	var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
	for(var i = 0; i < 6; i++) {
		var random = Math.round(Math.random() * 14);
		str += arr[random];
	}
	return str;
}
//获取min-max区间的随机数
function getRandom(max, min) {
	min = min || 0;
	return Math.round(Math.random() * (max - min)) + min;
}
//数组去重
function noRepate(arr) {
	var newArr = [];
	for(var i = 0; i < arr.length; i++) {
		if(newArr.indexOf(arr[i]) == -1) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

//数组随机排序
function sortArr(arr) {
	var newArr = [];
	for(var i = 0, length = arr.length; i < length; i++) {
		var _random = getRandom(arr.length - 1);
		newArr.push(arr[_random]);
		// 把加入的元素,从原数组中删除
		arr.splice(_random, 1);
	}
	return newArr;
}

//字符串倒序
function reverseString(str) {
	str = str.split("");
	str.reverse();
	str = str.join("");
	return str;
}