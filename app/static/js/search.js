var search = (function() {
	var $ul = document.querySelector(".main_list");
	var $moreSelect = document.querySelector(".search_more_btn");
	var $comprehensive = document.querySelector(".comprehensive p");
	var $price = document.querySelector(".price p");
	return {
		init() {
			this.event();
		},
		event() {
			var _this = this;
			$comprehensive.onclick = function() {
				this.className="search_active";
				$price.className = "";
				$ul.innerHTML = "";
				sendAjax("static/json/search.json", {
					data: {
						title: "棉衣"
					}
				}).then(data => {
					data = JSON.parse(data);
					data = data.data;
					_this.insertData(data);
				});
			}
			$comprehensive.onclick();
			$price.onclick = function() {
				$comprehensive.className = "";
				this.className="search_active";
				$ul.innerHTML = "";
				sendAjax("static/json/search.json", {
					data: {
						title: "棉衣"
					}
				}).then(data => {
					data = JSON.parse(data);
					data = data.data;
					data.sort(function(a, b) {
						a = a.price.slice(1);
						b = b.price.slice(1);
						return parseInt(b) - parseInt(a)
					});
					_this.insertData(data);
				});
			}
			$moreSelect.onclick = function(){
				var liAll = $(".search_body_bottom>li");
				var ul_none = $(".ul_none");
				ul_none.toggle();
				$(liAll[3]).toggle();
//				$moreSelect.innerHTML = "点击收起";
//				li_none[li_none.length-1].className += " search_child";
//				var li = document.querySelector(".search_child");
//				li.className = "";
			}
		},
		insertData(data) {
			for(var j = 0; j < 5; j++) {
				for(var i = 0; i < data.length; i++) {
					var li = document.createElement("li");
					var a = document.createElement("a");
					a.href = "#";
					li.appendChild(a);
					var img = document.createElement("img");
					img.src = data[i].src;
					a.appendChild(img);
					var price = document.createElement("span");
					price.innerHTML = "唯品价  " + data[i].price;
					li.appendChild(price);
					var oldPrice = document.createElement("i");
					oldPrice.innerHTML = data[i].oldPrice;
					li.appendChild(oldPrice);
					var content = document.createElement("a");
					content.href = "#";
					content.innerHTML = data[i].content;
					li.appendChild(content);
					$ul.appendChild(li);
				}
			}
		}
	}
}());
search.init();