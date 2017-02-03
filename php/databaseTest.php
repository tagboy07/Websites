<?php
try{
    // Create a new connection.
    // You'll probably want to replace hostname with localhost in the first parameter.
    // The PDO options we pass do the following:
    // \PDO::ATTR_ERRMODE enables exceptions for errors.  This is optional but can be handy.
    // \PDO::ATTR_PERSISTENT disables persistent connections, which can cause concurrency issues in certain cases.  See "Gotchas".
    // \PDO::MYSQL_ATTR_INIT_COMMAND alerts the connection that we'll be passing UTF-8 data.  This may not be required depending on your configuration, but it'll save you headaches down the road if you're trying to store Unicode strings in your database.  See "Gotchas".
    $link = new \PDO(   'mysql:host=mysql.kentoncityschools.org;dbname=15goodtroy', 
                        '15goodtroy', 
                        'data7263', 
                        array(
                            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION, 
                            \PDO::ATTR_PERSISTENT => false, 
                            \PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8mb4'
                        )
                    );
    $lastname = 'Goodin';
    $handle = $link->prepare('select lastname, firstname from addresses2014 where lastname = :lastname');
 
    // PHP bug: if you don't specify PDO::PARAM_INT, PDO may enclose the argument in quotes.  This can mess up some MySQL queries that don't expect integers to be quoted.
    // See: https://bugs.php.net/bug.php?id=44639
    // If you're not sure whether the value you're passing is an integer, use the is_int() function.
    // $handle->bindValue(1, 100, PDO::PARAM_INT);
    //$handle->bindValue(2, 'Bilbo Baggins');
    //  $handle->bindValue(3, 5, PDO::PARAM_INT);

    $handle->bindValue(':lastname', $lastname, PDO::PARAM_STR);
 
    $handle->execute();
 
    // Using the fetchAll() method might be too resource-heavy if you're selecting a truly massive amount of rows.
    // If that's the case, you can use the fetch() method and loop through each result row one by one.
    // You can also return arrays and other things instead of objects.  See the PDO documentation for details.
    $result = $handle->fetchAll(\PDO::FETCH_OBJ);
 
    foreach($result as $row){
        print("<p>".$row->firstname." ".$row->lastname."\n"."</p>");
        //print($row->lastname . " ");
    }
}
catch(\PDOException $ex){
    print($ex->getMessage());
}
?>