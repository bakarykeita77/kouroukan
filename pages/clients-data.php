<?php
    require 'connexionToDB.php';
    global $connexion;
    
    $sql = "SELECT * FROM users";
    $requete = $connexion->prepare($sql);
    $requete->execute();
    $clients = $requete->fetchAll(PDO::FETCH_ASSOC);
    
    echo(json_encode($clients));

//echo'<pre>';
//    print_r($testes);
//echo'</pre>';