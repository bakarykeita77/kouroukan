<?php
session_start();

include("connexionToDB.php");
global $connexion;

if($_SESSION['connected']){
    
    $sql = "SELECT * FROM lessons WHERE id_client = ".$_SESSION['id']." ORDER BY date DESC";
    $requete = $connexion->prepare($sql);
    $requete->execute();
    $client_lessons = $requete->fetchAll();
    $client_lessons = json_encode($client_lessons);
    
    echo($client_lessons);
}