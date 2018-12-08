<?php
	header("Access-Control-Allow-Origin:*");
	$tel = $_GET["tel"];
	$coon = new mysqli("localhost","root","","vip","3306");
	$sql = "select * from user where tel = '$tel'";
	$result = $coon -> query($sql);
	$result = $result -> fetch_assoc();
	if($result){
		$arr = array("code"=>"10000","data"=>"");
	}else{
		$arr = array("code"=>"0","data"=>"");
	}
	$arr = json_encode($arr);
	echo $arr;
?>