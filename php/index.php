<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="author" content="Troy Goodin"/>
<meta name="keywords" content="example, html"/>
<meta name="description" content="example"/>
	<title>example</title>
	<style type="text/css" media="screen">
		body{
			background-color: white;
			font-family: Arial, Verdana, sans-serif;
			font-size: 100%;

		}
	</style>
</head>
<body>
<h1>PHP Samples</h1>
<?php 
//This is a line comment
/* This is a block comment that
	covers multiple lines */
$num1 = 10;
$num2 = 20;
$answer = $num1 + $num2;
$myName = "Mr. Funkhouser";

echo "Hello $myName. $num1 + $num2 = $answer.";

//sample function
function subtractNum ($x,$y) {
	$difference = $x - $y;
	return $difference;
}

echo "<p class='blue'>This is the subractNum function in use.</p>";
echo "<p>5 - 2 = ". subtractNum(5,2) . "</p>";

//sample if and compare
function divideNum($x,$y){
	if($y != 0){
		$answer = $x/$y;
		return $answer;
	}
	else{
		$answer = "You can't divide by zero!";
		return $answer;
	}
}

echo "<p>5 / 2 = ". divideNum(5,2) . "</p>"

?>

</body>
</html>