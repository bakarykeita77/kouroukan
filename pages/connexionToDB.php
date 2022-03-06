<?php

    $server = "localhost";
    $dbname = "kouroukan";
    $user = "root";
    $pass = "";
    
    try{
        $db = new PDO("mysql:host=$server;dbname=$dbname;charset=utf8",$user,$pass);
        $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo("Echec: ".$e->getMessage());
    }