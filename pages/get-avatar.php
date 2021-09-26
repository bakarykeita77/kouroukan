<?php
    include('connexionToDB.php');
    global $connexion;
    
    $client_id = $_GET['client_id'];
  
    $requette = $connexion->prepare("select * from avatar where client_id=:client_id limit 1");
    $requette->bindValue(':client_id',$client_id,PDO::PARAM_INT);
    $requette->execute();
    $avatar = $requette->fetchAll();
    
    echo $avatar[0]['image'];