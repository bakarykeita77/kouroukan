<?php
    require 'connexionToDB.php';
    global $db;
    
    $sql = "SELECT * FROM users";
    $requete = $db->prepare($sql);
    $requete->execute();
    $clients = $requete->fetchAll(PDO::FETCH_ASSOC);
    
    echo(json_encode($clients));