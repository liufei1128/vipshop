var register = (function() {
	const checkReg = {
		tel(str) {
			var reg = /^1[35789]\d{9}$/
			return reg.test(str);
		},
		vcode(str) {
			var reg = /^\d{6}$/
			return reg.test(str);
		},
		password(str) {
			var reg = /^\w{6,13}$/
			return reg.test(str);
		}
	}
	var $form = $(".register_form");
	var form = $form[0];
	return {
		init() {
			var _this = this;
			this.event();
		},
		event() {
			$form.time = 61;
			$form.on("blur", "input", function() {
				var $p = this.parentNode.querySelector("p");
				var $b = this.parentNode.querySelector("b");
				if(this.value == "") {
					$p.innerHTML = "请输入内容";
					$b.className = "iconfont icon-error";
					$p.style.color = "#f64a4a";
				} else {
					if(this.name != "repassword" && this.name != "check") {
						var bool = checkReg[this.name](this.value);
						$form.$strong = form["vcode"].parentNode.querySelector("strong");
						if(bool) {
							$p.innerHTML = "";
							$b.className = "iconfont icon-success";
							if(this.name == "tel") {
								$form.$strong.className = "vodeA";
							}
						} else {
							$p.innerHTML = this.getAttribute("data-error");
							$b.className = "iconfont icon-error";
							$p.style.color = "#f64a4a";
							if(this.name == "tel") {
								$form.time = 60;
								$form.$strong.className = "vodeDisplay";
								clearInterval($form.timer);
								$form.$strong.innerHTML = "获取验证码";
							}
						}
						if($form.$strong) {
							$form.$strong.onclick = function() {
								if($form.$strong.className == "vodeA") {
									var $p = this.nextElementSibling;
									$p.style.color = "#000";
									$p.innerHTML = "验证码已发送，请查收短信";
									$form.$strong.className = "vodeDisplay";
									$form.timer = setInterval(() => {
										$form.time--;
										$form.$strong.innerHTML = `${$form.time}秒后重新获取`;
										if($form.time == 0) {
											clearInterval($form.timer);
											$form.$strong.className = "vodeA";
											$form.$strong.innerHTML = "获取验证码"
											$form.time = 60;
										}
									}, 100);
								}
							}
						}
					}
				}
			})
			form["tel"].addEventListener("blur", function() {
				var _this = this;
				var $b = this.nextElementSibling;
				var $p = $b.nextElementSibling;
				if($b.className.indexOf("icon-success") != -1) {
					sendAjax("http://10.36.141.162:8888/vipshop/vipshop/server/php/check.php", {
						data: {
							tel: _this.value
						}
					}).then(data => {
						data = JSON.parse(data);
						if(data.code == 10000) {
							$p.innerHTML = "手机号已被注册";
							$b.className = "iconfont icon-error";
							$form.time = 60;
							$form.$strong.className = "vodeDisplay";
							clearInterval($form.timer);
							$form.$strong.innerHTML = "获取验证码";
						}
					})
				}
			});

			form["password"].addEventListener("blur", function() {
				form["repassword"].onblur();
			});
			form["repassword"].onblur = function() {
				var $p = this.parentNode.querySelector("p");
				var $b = this.parentNode.querySelector("b");
				if(this.value == form["password"].value) {
					$p.innerHTML = "";
					$b.className = "iconfont icon-success";
				} else {
					$b.className = "iconfont icon-error";
					$p.innerHTML = this.getAttribute("data-error");
				}
			}
			form["check"].onblur = function() {
				var $p = this.parentNode.querySelector("p");
				var $b = this.parentNode.querySelector("b");
				if(!this.checked) {
					$p.innerHTML = this.getAttribute("data-error");
					$b.className = "iconfont icon-error";
				} else {
					$p.innerHTML = "";
					$b.className = "iconfont icon-success";
				}
			}
			form["btn"].onclick = function() {
				var $bAll = form.querySelectorAll("b");
				for(var i = 0; i < $bAll.length; i++) {
					if($bAll[i].className.indexOf("icon-success") == -1) {
						var $b = $bAll[i].parentNode.querySelector("b");
						var $p = $bAll[i].parentNode.querySelector("p");
						$bAll[i].parentNode.querySelector("input").focus();
						$b.className = "iconfont icon-error";
						$p.innerHTML = "请输入内容";
						if($bAll[i].parentNode.querySelector("input").name == "check"){
							$p.innerHTML = "接受服务条款才能注册";
						}
						return;
					}
				}
				sendAjax("http://10.36.141.162:8888/vipshop/vipshop/server/php/register.php", {
						method: "get",
						data: {
							tel: form["tel"].value,
							password: form["password"].value
						}
					})
					.then(data => {
						if(data == 1) {
							alert("注册成功");
							window.location.href = "login.html";
						}
					}).catch(data =>{
						alert("注册失败");
					});
			}
		}
	}
}())
register.init();