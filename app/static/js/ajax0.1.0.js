function sendAjax(url, obj) {
	var xhr;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHttp");
	}

	var realObject = {
		method: "get",
		data: null
	}
	if(typeof obj == "object") {
		for(var x in obj) {
			if(x in realObject) {
				realObject[x] = obj[x];
			}
		}
	}

	realObject.method = realObject.method.toUpperCase();
	if(realObject.method == "GET") {
		var flag = url.indexOf("?") == -1 ? "?" : "&";
		url += flag;
		for(var i in realObject.data) {
			var keyValue = `${i}=${realObject.data[i]}`;
			url += keyValue + "&";
		}
		url += `_=${Date.now()}`;
		realObject.data = null;
	} else if(realObject.method == "POST") {
		realObject.data = JSON.stringify(realObject.data);
	} else {
		console.log("家业繁忙，告辞！");
		return;
	}

	xhr.open(realObject.method, url, true);
	xhr.send(realObject.data);
	return new Promise((resolve, reject) => {
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					resolve(xhr.responseText);
				} else {
					reject(xhr.responseText);
				}
			}
		}
	});
}