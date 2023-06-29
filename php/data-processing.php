<?php
    require_once('actions.php');

/* Reception des donnees envoyes de form de connexion */
    $client_email = isset($_GET['client_email'])? $_GET['client_email']:'';
    $client_password = isset($_GET['client_password'])? $_GET['client_password']:'';
    
    if($client_email == ''){ header('connexion.php?error=1'); }

/* Recuperation de tous les emails de DB, dans un tableau $emails */
    $clients = getAllClients();
    $emails = [];
    foreach($clients as $client){
        $emails[count($emails)] = $client['email'];
    }

/* Verification de la presence de l'email envoye par le client, dans le tableau $emails */    
    if(in_array($client_email,$emails)){
        $data = getClientByEmail($client_email);
        
        $data_id = $data[0]['id'];
        $data_prenom = $data[0]['prenom'];
        $data_nom = $data[0]['nom'];
        $data_email = $data[0]['email'];
        $data_password = $data[0]['password'];
    }else{
        header("connexion.php?error=3");
    }
/* Comparaison des donnees provenant de form, et celles de DB */
    if($client_email==$data_email && $client_password==$data_password){
        header("location:session.php?user_id=$data_id&user_prenom=$data_prenom&user_nom=$data_nom&user_email=$data_email&connected=true");
    }
?>