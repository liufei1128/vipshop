
class Swiper{
	constructor(targetobj){
		this.index =0;
		this.timer =null;
		this.$showBox = document.querySelector(targetobj.$ele);
		this.$banner = this.$showBox.querySelector('.banner-inner');
		this.$tipBox = this.$showBox.querySelector('.banner-tip');
		this.$tipboxALL = this.$tipBox.querySelectorAll('li');		
		this.$prevBtn = this.$showBox.querySelector('.banner-left');
        this.$nextBtn = this.$showBox.querySelector('.banner-right');
		this.width = this.$showBox.clientWidth;
		this.init();
	}
	init(){		
		var $firstImage = this.$banner.firstElementChild;
		var $lastImage = this.$banner.lastElementChild;
		this.$banner.appendChild($firstImage.cloneNode(true));
		this.$banner.insertBefore($lastImage.cloneNode(true),$firstImage);
		this.$banner.style.left = -this.width + 'px';
		this.event();
		this.autoPlay();
	}
	event(){
		var _this =this;
		this.$prevBtn.onclick =function(){
			 _this.showImage(--_this.index)
			 _this.autoPlay();
		}
		this.$nextBtn.onclick =function(){
			 _this.showImage(++_this.index)
			  _this.autoPlay();
		}
		for(let i=0;i<this.$tipboxALL.length;i++){
			this.$tipboxALL[i].onclick = function(){
				_this.showImage(i);
				_this.autoPlay();
			}
		}
	}
	showImage(index){
		if(index>=this.$tipboxALL.length){
			index = 0;
			this.$banner.style.left = 0 + 'px';
		}else if(index<0){
			index = this.$tipboxALL.length -1;
			this.$banner.style.left = -(index+2)*this.width + 'px';
		}
		this.index =index;
		for(let i = 0;i<this.$tipboxALL.length;i++){
			this.$tipboxALL[i].className =  this.$tipboxALL[i].className.replace('active', '');
		}
		this.$tipboxALL[index].className+= ' active';
		var t = this.width * (index + 1);		
		$('.banner-inner').stop().animate({left: -t},"slow");
	}
	autoPlay(index =0){
		clearInterval(this.timer);
		this.timer = setInterval(_ => {
                    this.index++;
                    this.showImage(this.index);
                }, 3000)
		}
}

//banner
var banner_swiper =new Swiper({
				$ele: '.banner-box'
			});

$(window).scroll(function(){
	console.log(1);
	if($('html').scrollTop() > 3040){
		$('.venue_navigation').css("display","block");
	} else {
		$('.venue_navigation').css("display","none");
	}
})