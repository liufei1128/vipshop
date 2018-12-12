
/**
 * 购物车
 * */
var shopCar =(function(){
	return{
		init(){			
			this.$allshop = $('.g-shop-list');
			this.$gyy = $('.g-yy');
			this.$gtm = $('.g-tm');
			this.$gbd1 = $('.g-bd1');
			this.$gbd2 = $('.g-bd2');
			this.commit =$('.g-car-count a');
			this.getData().then(_=> {
				this.$plusall = $('.quantity-plus');
				this.$reduceall = $('.quantity-reduce');
				this.$count = $('.quantity-count');
				this.$perprice = $('.price-item');
				this.$pricecount = $('.subtotal_count');
				this.$priceall = $('.price-right-nub span i');
				this.$countGoods = $('.count-goods');
				this.$delGood = $('.actions-item span');
				this.$alltr = $(this.$allshop).children()				
				this.event();
			})
			// debugger
		},
		event(){
			var _this = this;
			var c=0,
				s=0;
			$(this.$gyy).click(function(){
				$(_this.$gbd1).css({'display':'none'});
				$(_this.$gbd2).css({'display':'block'});
				// $(this).addClass('active').siblings().removeClass('active');
				$(_this.$gtm).removeClass('active');
				$(_this.$gyy).addClass("active");				
			});
			$(this.$gtm).click(function(){
				$(_this.$gbd1).css({'display':'block'});
				$(_this.$gbd2).css({'display':'none'});
				$(_this.$gtm).addClass('active');
				$(_this.$gyy).removeClass("active");
			});
			for(let i =0;i<$(this.$plusall).length;i++){
				c+=parseInt($(_this.$count[i]).text());
				s+=parseInt($(_this.$pricecount[i]).text());
			}
			
			$(_this.$countGoods).text(c);
			$(_this.$priceall[0]).text(s);
			$(_this.$priceall[1]).text(s);

			for(let i =0;i<$(this.$plusall).length;i++){
				$(this.$alltr[i]).click(function(e){
					e = e || window.event;
					var target = e.target || e.srcElement;
					var t =_this.$count[i].innerHTML;
					if(target.className == 'quantity-plus'){
						t++;
						if(t>=10){
							t=10;
						}
					}
					if(target.className == 'quantity-reduce'){
						t--;
						if(t<=1){
							t=1;
						}
					}
					var _t =$( _this.$count[i]).text();
					c+=t - _t;
					$( _this.$count[i]).text(t);
					$(_this.$countGoods).text(c);
					var p = $( _this.$pricecount[i]).text();
					$(_this.$pricecount[i]).text($(_this.$perprice[i]).text()*t);
					s += parseInt($( _this.$pricecount[i]).text()) - p;
					$(_this.$priceall[0]).text(s);
					$(_this.$priceall[1]).text(s);
				});
				
				$(this.$delGood[i]).click(function(){
					var parent =_this.$delGood[i].parentNode.parentNode;
					parent.parentNode.removeChild(parent);
					c -= $(_this.$count[i]).text();
					$(_this.$countGoods).text(c);
					s-= $( _this.$pricecount[i]).text();
					$(_this.$priceall[0]).text(s);
					$(_this.$priceall[1]).text(s);
				});
			}
			$(this.commit).click(function(){
				alert("提交订单成功！");
			});
		},
		getData() {
			// var shopList = localStorage.shopList || '[]';
			// shopList = JSON.parse(shopList);
			// console.log(shopList);
			// this.insertData(shopList)
			return sendAjax('static/json/shoplist.json').then(res => {
				res = JSON.parse(res);
				if(res.code == 0) {
					// 把商品数据存到shop对象里
					this.data = res.data;
					console.log(this.data);
					this.insertData(res.data);
				} else {
					alert("获取信息失败, 请查询网络状况");
				}
			});
		},
		insertData(data){
			for(let i= 0; i < data.length; i++ ) {
				var $tr = document.createElement('tr');
				$tr.index = i;
				$tr.innerHTML = `
				<td class="product-item">
					<a href="#"></a>
					<h3>
						<span>自营</span>&nbsp;|
						<a href="#" title="${data[i].title}">${data[i].title}</a>
						<p>尺码: <i class="shop-size">${data[i].size}</i></p>
					</h3>										
				</td>
				<td class="price-item">${data[i].price}</td>
				<td class="quantity-item">
					<span class="quantity-reduce">-</span>
					<span class="quantity-count">${data[i].count}</span>
					<span class="quantity-plus">+</span>
				</td>
				<td class="subtotal-item">
					<span>￥</span>
					<span class="subtotal_count">${data[i].price*data[i].count}</span>
				</td>
				<td class="actions-item">
					<span>删除</span>
				</td>
				`
				$(this.$allshop).append($tr);
			}
		}
	}
}())
shopCar.init();
