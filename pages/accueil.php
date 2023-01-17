<?php
session_start();
    if($_POST['submit']){
    /* Reception des donnees envoyes de form de connexion */
        $client_email = isset($_POST['client_email'])? $_POST['client_email']:'';
        $client_pass = isset($_POST['client_pass'])? $_POST['client_pass']:'';
         
        if($client_email !== '' && $client_pass !== ''){
        
            require("connexionToDB.php");
            global $db;
 
          /*---------------------------------------------------------------------------------------------------*/
          //Control de la presence des données reçues dans la table users
            $requette = $db->prepare( "SELECT * FROM users WHERE email = ?" );
            $requette->execute(array($client_email));
            $client = $requette->fetchAll();
            
          //Si lesdonnées  sont absentes, le client est redirigé sur la page de provenance (connexion.php).
            if(empty($client)) header("location:".$_SERVER['HTTP_REFERER']);

          //Si les données sont presentes, mais les mots de passesne correspondent pas, le client est redirigé sur la page de provenance.
            $data_pass = $client[0]['pass'];
            if($client_pass != $data_pass) { echo("Les mots de passe ne correspondent pas"); return; }
            
          //Si lesdonnées sont présentent et que les e-mails et les mots de passes correspondent, la connexion est établie.
            $_SESSION["id"]        = $client[0]["id"];
            $_SESSION["prenom"]    = $client[0]["prenom"];
            $_SESSION["nom"]       = $client[0]["nom"];
            $_SESSION["naissance"] = $client[0]["naissance"];
            $_SESSION["sexe"]      = $client[0]["sexe"];
            $_SESSION["adresse"]   = $client[0]["adresse"];
            $_SESSION["email"]     = $client_email;

          /*---------------------------------------------------------------------------------------------------*/
            
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
    
    <link rel="stylesheet" href="/kouroukan/css/class.css"/>
    <link rel="stylesheet" href="/kouroukan/css/tete-de-page.css"/>
	<link rel="stylesheet" href="/kouroukan/css/class.css"/>
	<link rel="stylesheet" href="/kouroukan/css/accueil.css"/>
</head>
<body>

    <div class="container" id="accueil">
        
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

        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div id="reception">
                                
                <p>ߖߐ ߦߴߌ ߡߊ߬ ߞߟߊߓߎߡߊ <span id="nom_d_utilisateur"><?= $_SESSION["prenom"].' '.$_SESSION["nom"]  ?></span> </p>
                <div id="message_de_bienvenu">
                    <p>ߌ ߣߌ߫ ߛߣߍ߫ ߞߙߎ߬ߞߊ߲߫ ߘߋ߰ߘߊ ߟߊ߫߸ ߒߞߏ ߟߐ߲ߠߌ ߛߌߟߊ߫ ߛߎߘߎ߲߸ ߓߟߐߟߐ ߛߌߟߊ ߝߍ߬.</p>
                    <p>ߞߏ߫ ߛߎ ߦߋ߫ ߞߏ߬ ߟߊ߫ ߛߐ߭ ߟߋ߬ ߡߊ߬߸ ߒ߬ߓߊ߬߹ ߌ ߖߌߖߊ߬ ߸ ߌ ߦߋ߫ ߥߟߊ߬ߘߊ ߕߊ߬ ߌߞߘߐ߫߹ ߦߊ߲߬.</p>
                </div>
                <p id="affiche_programme"><a href="/kouroukan/pages/programmes.php">ߥߟߊ߬ߘߊ ߟߎ߬</a></p>
               
            </div>   
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>

    <script src="/kouroukan/js/accueil.js"></script>

</body>
</html>