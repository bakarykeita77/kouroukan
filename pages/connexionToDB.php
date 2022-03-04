<?php

    $server = "127.0.0.1";
    $dbname = "kouroukan";
    $user = "root";
    $pass = "";
    
    try{
        $connexion = new PDO("mysql:host=$server;dbname=$dbname;charset=utf8",$user,$pass);
        $connexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $connexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }
    catch(PDOException $e){
        echo("Echec: ".$e->getMessage());
    }