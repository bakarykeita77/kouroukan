<?php
session_start();

if($_SESSION['connected']) {
    include("connexionToDB.php");
    global $db;

    $sql = "SELECT * FROM exercices WHERE id_client = ".$_SESSION["id_client"]." ORDER BY date DESC";
    $requete = $db->prepare($sql);
    $requete->execute();
    $exercices = $requete->fetchAll();
    $exercices = json_encode($exercices);

    echo($exercices); 
}