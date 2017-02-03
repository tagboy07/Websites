<?php
// Establishing Connection with Server by passing server_name, user_id and password as a parameter
$connection = mysql_connect("localhost", "root", "cheaY1jo");
// Selecting Database
$db = mysql_select_db("game", $connection);
session_start();// Starting Session
// Storing Session
$user_check=$_SESSION['login_user'];

// SQL Query To Fetch Complete Information Of User
$ses_sql=mysql_query("select highscore from players where email='$user_check'", $connection);
$ses_world=mysql_query("select highscore from players where first_name='World'", $connection);

$rowHighscore = mysql_fetch_assoc($ses_sql);
$worldHighscore = mysql_fetch_assoc($ses_world);

$session_highscore =$rowHighscore['highscore'];
$world_record =$worldHighscore['highscore'];

/*if(!isset($session_highscore)){
mysql_close($connection); // Closing Connection
header('Location: index.php'); // Redirecting To Home Page
}
?>*/