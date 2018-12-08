<?php
	header("Access-Control-Allow-Origin:*");
	$name = $_GET["name"];
	$pass = $_GET["password"];
	$coon = new mysqli("localhost","root","","vip",3306);
	$sql = "select * from user where (tel = '$name' or name='$name' or email = '$name') and password = '$pass'";
	$result = $coon -> query($sql);
	$result = $result -> fetch_assoc();
	if($result){
		$arr = array("code"=>"10000","data"=>"$name");
	}else{
		$arr = array("code"=>"0","data"=>"$name");
	}
	$arr = json_encode($arr);
	echo $arr;
?>