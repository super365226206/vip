<?php
require "conn.php";

if(isset($_POST['phone'])){//前端ajax传输过来的额
	$phone=$_POST['phone'];
	$password=md5($_POST['pass']);
}else{
	exit('非法操作');
}

$query="select * from login where phone='$phone' and password='$password'";
$result=mysql_query($query);

if(mysql_fetch_array($result)){
	echo true;
}else{
	echo false;
}






	
	
