<?php
session_start();
    if($_POST['submit']){
    /* Reception des donnees envoyes de form de connexion */
        $client_email = isset($_POST['client_email'])? $_POST['client_email']:'';
        $client_pass = isset($_POST['client_pass'])? $_POST['client_pass']:'';
         
        if($client_email !== '' OR $client_pass !== ''){
        
            require("connexionToDB.php");
            global $db;
            
            $requette = $db->prepare("SELECT * FROM users WHERE email = ?");
            $requette->execute(array($client_email));
            $client = $requette->fetchAll();
            

            if(empty($client)) { echo("Cet utilisateur n'est pas inscrit"); return; }
            $data_pass = $client[0]['pass'];
            if($client_pass != $data_pass) { echo("Les mots de passe ne correspondent pas"); return; }
                
            $_SESSION["id"]        = $client[0]["id"];
            $_SESSION["prenom"]    = $client[0]["prenom"];
            $_SESSION["nom"]       = $client[0]["nom"];
            $_SESSION["naissance"] = $client[0]["naissance"];
            $_SESSION["sexe"]      = $client[0]["sexe"];
            $_SESSION["adresse"]   = $client[0]["adresse"];
            $_SESSION["email"]     = $client_email;
                        
            //   header("location:accueil.php");   
           
        }else{ $warning = "Veuillez remplir tous les champs !"; }  
        
    /* Creation de la base de donnees*/
    
    }
?>
<!DOCTYPE html>
<html>
<head>
	<title>accueil</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/accueil.css"/>
</head>
<body>

    <div class="container" id="accueil">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div id="reception">
                
              <!----------------------------------------------------------------------------------------------------->  
                <div id="user_info" style="display: none">
                    <?php if(isset($_SESSION["id"])): ?>
                    <div id="identification">
                        <p id="id"       ><?= $_SESSION["id"];        ?></p>
                        <p id="prenom"   ><?= $_SESSION["prenom"];    ?></p>
                        <p id="nom"      ><?= $_SESSION["nom"];       ?></p>
                        <p id="naissance"><?= $_SESSION["naissance"]; ?></p>
                        <p id="sexe"     ><?= $_SESSION["sexe"];      ?></p>
                        <p id="adresse"  ><?= $_SESSION["adresse"];   ?></p>
                        <p id="email"    ><?= $_SESSION["email"];     ?></p>
                    </div>
                    <?php endif ?>
                    <div id="matieres">
                        <div id="matieres_etudiees"></div>
                        <div id="matiere_active"></div>
                        <div id="matieres_a_etudiees"></div>
                    </div>
                </div>
              <!----------------------------------------------------------------------------------------------------->  
                
                <p>???? ?????? ?????? ?????????????? <span id="nom_d_utilisateur"><?= $_SESSION["prenom"].' '.$_SESSION["nom"]  ?><span/> </p>
                <div id="message_de_bienvenu">
                    <p>?? ?????? ???????? ???????????????? ?????????? ???????? ?????? ?????????? ?????????? ???????????? ?????????? ???????? ??????.</p>
                    <p>?????? ???? ?????? ?????? ?????? ?????? ?????? ???????? ???????????? ?? ?????????? ?? ?? ?????? ???????????? ?????? ???????????? ????????.</p>
                </div>
                <p id="affiche_programme"><a href="http://localhost:8080/kouroukan/pages/programmes.php">???????????? ??????</a></p>
               
            </div>   
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>

    <script src="http://localhost:8080/kouroukan/js/accueil.js"></script>

</body>
</html>