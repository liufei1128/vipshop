<?php
	header("Access-Control-Allow-Origin:*");
	$tel = $_GET["tel"];
	$password = $_GET["password"];
	$coon = new mysqli("localhost","root","","vip",3306);
	$sql = "insert into user(tel,password) values('$tel','$password')";
	$result = $coon ->query($sql);
	echo $result;	
?>