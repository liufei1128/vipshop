
/**
 * 购物车
 * */
var shopCar =(function(){
	return{
		init(){			
			this.$allshop = document.querySelector('.g-shop-list');
			this.$gyy = document.querySelector('.g-yy');
			this.$gtm = document.querySelector('.g-tm');
			this.$gbd1 = document.querySelector('.g-bd1');
			this.$gbd2 = document.querySelector('.g-bd2');
			this.getData().then(_=> {
				this.$plusall = document.querySelectorAll('.quantity-plus');
				this.$reduceall = document.querySelectorAll('.quantity-reduce');
				this.$count = document.querySelectorAll('.quantity-count');
				this.$perprice = document.querySelectorAll('.price-item');
				this.$pricecount = document.querySelectorAll('.subtotal_count');
				this.$priceall = document.querySelectorAll('.price-right-nub span i');
				this.$countGoods = document.querySelector('.count-goods');
				this.$delGood = document.querySelectorAll('.actions-item span');
				this.$alltr = this.$allshop.querySelectorAll('tr');					
				this.event();

			})
			// debugger
		},
		event(){
			var _this = this;
			var c=0,
				s=0;
			this.$gyy.onclick = function(){
				_this.$gbd1.style.display = 'none';
				_this.$gbd2.style.display = 'block';
				_this.$gtm.className =_this.$gtm.className.replace('active', '');
				_this.$gyy.className+= ' active';				
			}
			this.$gtm.onclick = function(){
				_this.$gbd1.style.display = 'block';
				_this.$gbd2.style.display = 'none';
				_this.$gyy.className =_this.$gyy.className.replace('active', '');
				_this.$gtm.className+= ' active';
			}
			for(let i =0;i<this.$plusall.length;i++){
				c+=parseInt(_this.$count[i].innerHTML);
				s+=parseInt(_this.$pricecount[i].innerHTML);
			}
			this.$alltr = this.$allshop.querySelectorAll('tr');
			_this.$priceall[0].innerHTML =  _this.$priceall[1].innerHTML=s;
			for(let i =0;i<this.$plusall.length;i++){
				this.$alltr[i].onclick = function(e){
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
					var _t = _this.$count[i].innerHTML
					c+=t - _t;
					_this.$count[i].innerHTML = t;
					_this.$countGoods.innerHTML = c;
					var p = _this.$pricecount[i].innerHTML;
					_this.$pricecount[i].innerHTML =_this.$perprice[i].innerHTML*t;
					s += parseInt(_this.$pricecount[i].innerHTML) - p;
					_this.$priceall[0].innerHTML =  _this.$priceall[1].innerHTML =s;
				}
				
				this.$delGood[i].onclick = function(){
					var parent =_this.$delGood[i].parentNode.parentNode;
					parent.parentNode.removeChild(parent);
					c -= _this.$count[i].innerHTML;
					_this.$countGoods.innerHTML = c;
					s-= _this.$pricecount[i].innerHTML;
					_this.$priceall[0].innerHTML =  _this.$priceall[1].innerHTML =s;
				}
			}
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
				this.$allshop.appendChild($tr);
			}
		}
	}
}())
shopCar.init();
