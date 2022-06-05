<?php
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
            
            if(!empty($client)) {
                
                $data_id        = $client[0]['id'];
                $data_prenom    = $client[0]['prenom'];
                $data_nom       = $client[0]['nom'];
                $data_naissance = $client[0]['naissance'];
                $data_sexe      = $client[0]['sexe'];
                $data_adresse   = $client[0]['adresse'];
                $data_pass  = $client[0]['pass'];
                
                if($client_pass == $data_pass) {
                    session_start();
                    
                    $_SESSION['id'       ] = $data_id;
                    $_SESSION['prenom'   ] = $data_prenom;
                    $_SESSION['nom'      ] = $data_nom;
                    $_SESSION['naissance'] = $data_naissance;
                    $_SESSION['sexe'     ] = $data_sexe;
                    $_SESSION['adresse'  ] = $data_adresse;
                    $_SESSION['email'    ] = $data_email;
                    $_SESSION['pass' ] = $data_pass;
                    $_SESSION['connected'] = true;
                    
                 //   header("location:accueil.php"); 
        
                }else{ $warning = "Les mots de passe ne correspondent pas";  }
            }else{ $warning = "Cet utilisateur n'est pas inscrit"; }
        }else{ $warning = "Veuillez remplir tous les champs !"; }
    }
?>
<!DOCTYPE html>
<html>
<head>
	<title>accueil</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/accueil.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
</head>
<body>

    <div class="container" id="accueil">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div id="reception" align="center">
                
                <p>ߖߐ ߦߴߌ ߡߊ߬ ߞߟߊߓߎߡߊ</p>
                
                <h2><?= $_SESSION['prenom']." ".$_SESSION['nom'];  ?></h2>
                        
              <!----------------------------------------------------------------------------------------------------->  
                <div id="user_info" style="display: none">
                    <div id="identification">
                                                
                        <p id="id"       ><?= $_SESSION['id'       ]; ?></p>
                        <p id="prenom"   ><?= $_SESSION['prenom'   ]; ?></p>
                        <p id="nom"      ><?= $_SESSION['nom'      ]; ?></p>
                        <p id="naissance"><?= $_SESSION['naissance']; ?></p>
                        <p id="sexe"     ><?= $_SESSION['sexe'     ]; ?></p>
                        <p id="adresse"  ><?= $_SESSION['adresse'  ]; ?></p>
                        <p id="email"    ><?= $_SESSION['email'    ]; ?></p>
                    
                    </div>
                    <div id="matieres">
                        <div id="matieres_etudiees"></div>
                        <div id="matiere_active"></div>
                        <div id="matieres_a_etudiees"></div>
                    </div>
                </div>
              <!----------------------------------------------------------------------------------------------------->  
                
                <div id="message_de_bienvenu">
                    <p>ߌ ߣߌ߫ ߛߣߍ߫ ߞߙߎ߬ߞߊ߲߫ ߘߋ߰ߘߊ ߟߊ߫߸ ߒߞߏ ߟߐ߲ߠߌ ߛߌߟߊ߫ ߛߎߘߎ߲߸ ߓߟߐߟߐ ߛߌߟߊ ߝߍ߬.</p>
                    <p>ߞߏ߫ ߛߎ ߦߋ߫ ߞߏ߬ ߟߊ߫ ߛߐ߭ ߟߋ߬ ߡߊ߬߸ ߒ߬ߓߊ߬߹ ߌ ߖߌߖߊ߬ ߸ ߌ ߦߋ߫ ߥߟߊ߬ߘߊ ߕߊ߬ ߌߞߘߐ߫߹ ߦߊ߲߬.</p>
                </div>
                <p id="affiche_programme"><a href="http://localhost:8080/kouroukan/pages/programmes.php">ߥߟߊ߬ߘߊ ߟߎ߬</a></p>
               
            </div>   
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>

<script src="http://localhost:8080/kouroukan/js/class.js"></script>
<script src="http://localhost:8080/kouroukan/js/caracteres.js"></script>
<script src = "http://localhost:8080/kouroukan/js/accueil.js"></script>

</body>
</html>