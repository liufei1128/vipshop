var loginWrap = (function() {

	var $login_sm = $(".login .login_sm_body");
	var $login_form = $(".login .login_form");
	var $aAll = $(".login_header a");
	var $btn = $("#login_btn");
	var $username = $(".username input")[0];
	var $password = $(".password input")[0];
	var $strong = $(".username strong");
	return {

		init() {
			var _this = this;
			this.event();
		},
		event() {
			$aAll.click(function() {
				$login_sm.toggle();
				$login_form.toggle();
				if($login_sm.css("display") == "block") {
					$($aAll[0]).css({
						"color": "#f10180"
					}).siblings().css({
						"color": "#666"
					});
				} else {
					$($aAll[1]).css({
						"color": "#f10180"
					}).siblings().css({
						"color": "#666"
					});
				}
			});
			
			$btn.click(function(){
				sendAjax("http://10.36.141.162:8888/vipshop/vipshop/server/php/login.php",{
					data:{
						name: $username.value,
						password:$password.value
					}
				})
				.then( data =>{
					$strong.css({"display":"none"});
					data = JSON.parse(data);
					setTimeout(_=>{
						if(data.code == "10000"){
							document.cookie = `username =${data.data}`;
							console.log(document.cookie);
							alert("登录成功");
							window.location = "index.html";					
						}else{
							$strong.css({"display":"block"});
						}
					},50)
				})
			});
		}
	}
})();

	loginWrap.init();