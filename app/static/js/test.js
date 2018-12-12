const _this = this;

//小盒子图片切换
$('.img_box').on('mouseenter', 'img', function() {
	//小图片切换。改变展示图片的src
	$(this).parent().addClass('small_glass').siblings().removeClass('small_glass');
	var img_src = $(this).attr('src');
	$('.slideshow_tel img').attr('src', img_src);
	$('.big_glass_img img').attr('src', img_src);
})
//滑入大盒子就显示放大镜和放大后的图片
$('.slideshow_tel').mouseenter(function() {
	$('.glass').css('display', 'block');
	$('.big_glass_img').css('display', 'block');
})
//滑出大盒子就隐藏放大镜和放大后的图片
$('.slideshow_tel').mouseleave(function() {
	$('.glass').css('display', 'none');
	$('.big_glass_img').css('display', 'none');
})
//移动放大镜计算偏移量

$('.slideshow_tel').mousemove(function(ev) {
	ev = ev || window.event;
	var x = ev.pageX - $(this).offset().left - $('.glass').width() / 2;
	var y = ev.pageY - $(this).offset().top - $('.glass').height() / 2;
	// console.log(x,y)
	//判断边界

	var _x = $('.glass').position().left;
	var _y = $('.glass').position().top;

	var maxleft = $(this).width() - $(".glass").width();
	var maxtop = $(this).height() - $(".glass").height();

	if(x >= maxleft) {
		x = maxleft;
	} else if(x <= 0) {
		x = 0;
	}
	if(y >= maxtop) {
		y = maxtop;
	} else if(y <= 0) {
		y = 0;
	}
	$(".glass").css({
		left: x + "px",
		top: y + "px"
	});
	$('.big_glass_img img').css({
		left: 2 * -x + "px",
		top: 2 * -y + "px"
	})
})