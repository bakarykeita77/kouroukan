<?php
session_start();
include("connexionToDB.php");
global $connexion;

if($_SESSION['connected']){
    $sql = "SELECT * FROM teste WHERE id_client = ".$_SESSION['id']." ORDER BY Date DESC";
    $rqt = $connexion->prepare($sql);
    $rqt->execute();
    $testes = $rqt->fetchAll();
    
    if($testes==Array()){
        echo("Cet utilisateur n'a pas pcompose");
    }else{
        $testes_json = json_encode($testes);
        echo($testes_json);
    }
}else{
    echo("Veuillez vous connecte.");
}

//echo'<pre>';
//    print_r($testes);
//echo'</pre>';