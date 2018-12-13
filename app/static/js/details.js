

var details = (function(){
	var $minibox = $(".imglist_minibox");
	var $imgAll = $(".imglist_minibox img");
	var $bigbox = $(".imglist_bigbox");
	var $img = $(".imglist_bigbox li img");
	var $showbox = $(".show_box");
	var $li = $(".show_box li");
	var $mouse_box = $(".mouse_box");
	var title = $(".title");
	var brand = $(".brand");
	var brand_title = $(".brand_title");
	var price = $(".i_price");
	var oldPrice = $(".o_price");
	var discount = $(".s_discount");
	return {
		init(){
			this.event();
			this.magnifier();
		},
		event(){
			var _this = this;
			var url = location.href;
			var index = url.indexOf("?")+1;
			url = url.substring(index);
			url = url.split("=");
			index = url[1];
			sendAjax("static/json/search.json")
			.then( data =>{
				data = JSON.parse(data);
				if(data.code == 0){
					data = data.data;
					console.log(data);
					$img.attr("src",data[index].src);
					title[0].innerHTML = data[index].introduce;
					brand[0].innerHTML = data[index].title;
					brand_title[0].innerHTML = data[index].introduce;
					price[0].innerHTML = data[index].price;
					oldPrice[0].innerHTML = data[index].oldPrice; 
					discount[0].innerHTML = data[index].discount;
					data = data[index].data;
					for(var i=0;i<$imgAll.length;i++){
							$imgAll[i].src = data[i];
					}
				}
			});
		},
		magnifier(){
			$minibox.on("mouseenter","img",function(){
				$img.attr("src",this.src);
			})
			$bigbox.mouseenter(function(){
				$li.addClass("active");
				$li.children().attr("src",$img.attr("src"));
				$mouse_box.css("display","block");
				$showbox.css("display","block");
				
			});
			$bigbox.mouseleave(function(){
				$li.removeClass("active");
				$mouse_box.css("display","none");
				$showbox.css("display","none");
			});
			$bigbox.mousemove(function(e){
				e = e || window.event;
				var x = e.pageX - $(this).offset().left - $mouse_box.width() / 2;
                var y = e.pageY - $(this).offset().top - $mouse_box.height() / 2;
                var _x = $mouse_box.position().left;
                var _y = $mouse_box.position().top;
                var maxleft = $(this).width() - $mouse_box.width();
                var maxtop = $(this).height() - $mouse_box.height();
                if(x >= maxleft){
                	x = maxleft;
                }
                else if(x<=0){
                	x=0;
                }
                if(y>=maxtop){
                	y=maxtop;
                }else if(y<=0){
                	y=0;
                }
                console.log(x,y);
                $mouse_box.css({"left":x+"px","top":y+"px"});
                $(".show_box li img").css({
                	left:-2 * x + "px",
                	top: -2 * y + "px"
                });
			});
		}
	}
	
	
})();
details.init();

