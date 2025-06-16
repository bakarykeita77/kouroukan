<?php
session_start();

    $user_id = isset($_GET['user_id'])? $_GET['user_id']:'';
    $user_prenom = isset($_GET['user_prenom'])? $_GET['user_prenom']:'';
    $user_nom = isset($_GET['user_nom'])? $_GET['user_nom']:'';
    $user_email = isset($_GET['user_email'])? $_GET['user_email']:'';
    $connected = isset($_GET['connected'])? $_GET['connected']:false;
    
    if($connected == false){ header('location:connexion.php?error=3'); }

    $_SESSION["id_client"] = $user_id;
    $_SESSION['prenom'] = $user_prenom;
    $_SESSION['nom'] = $user_nom;
    $_SESSION['email'] = $user_email;
    $_SESSION['connected'] = $connected;
  
    header("location:formations.php");