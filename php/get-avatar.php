<?php
    include('connexionToDB.php');
    global $db;
    
    $id_client = $_GET['id_client'];
  
    $requette = $db->prepare("select * from avatar where id_client=:id_client");
    $requette->bindValue(':id_client',$id_client,PDO::PARAM_INT);
    $requette->execute();
    $avatar = $requette->fetchAll();
    
    echo $avatar[0]['image'];