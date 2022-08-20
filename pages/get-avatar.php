<?php
    include('connexionToDB.php');
    global $db;
    
    $client_id = $_GET['client_id'];
  
    $requette = $db->prepare("select * from avatar where client_id=:client_id");
    $requette->bindValue(':client_id',$client_id,PDO::PARAM_INT);
    $requette->execute();
    $avatar = $requette->fetchAll();
    
    echo $avatar[0]['image'];