<?php

$doc = new DomDocument;

// We need to validate our document before refering to the id
$doc->validateOnParse = true;
$doc->Load('http://15goodtroy.kcs.me/Character/game.php');

echo "45" . $doc->getElementById('score')->tagName . "\n";

/*if(value > HIGHSCORE)
{
include "session.php";
	try{
	    $link = new \PDO(   'mysql:host='.DB_HOST.';dbname='.DB_NAME, 
	                        DB_USER, 
	                        DB_PASSWORD, 
	                        array(
	                            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION, 
	                            \PDO::ATTR_PERSISTENT => false, 
	                            \PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8mb4'
	                        )
	                    );

        
	       $handle = $link->prepare('UPDATE players SET highscore=:highscore WHERE id="4"');
        
           $handle->bindParam(':highscore', $highscore, PDO::PARAM_STR);
        
		$success = 2;

		// insert one row
		$highscore = trim(filter_input(INPUT_POST,'highscore',FILTER_UNSAFE_RAW));


		$handle->execute();
	}
	catch(\PDOException $ex){
	    print($ex->getMessage());
	}
}
*/

?>
<?php 
include('highscore.php');
?>

<!DOCTYPE html>
<html>
<head>
<title>Troy's Character</title>
<style>
    body{
        margin-left: 100px;
    }
    p{
        font-family: helvetica;
        font-size: 48px;
        font-weight: 700;
        display: inline;
        margin: 15px;
    }
</style>
</head>
<body id="body">
    <div id="text">
        <p id="level"></p>
        <p id="lives"></p>
        <p>Highscore:<p id="highscore" value="2">2</p></p>
        <p id="worldRecord">World Record: <?php echo $world_record ?></p>
        
    </div>
    <div id="canvasDiv"></div>
    
    <script type="text/javascript" src="character.js"></script>
    <script type="text/javascript">
        prepareCanvas(document.getElementById("canvasDiv"), 1000, 600);

        var jumpAgain = true;
        
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            if(evt.keyCode == 38 && jumpAgain == true){
                jump();
                jumpAgain = false;
            }
            
        };
        document.onkeyup = function(evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            if(evt.keyCode == 38){
                jumpAgain = true;
            }
            
        };
    </script>
     <form action="game.php" method="post">
        <label for="highscore">Highscore: </label><br>
			<input type="text" name="highscore" id="score" value="" /><br />
    </form>
</body>
</html>