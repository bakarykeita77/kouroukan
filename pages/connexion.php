<?php
    if($_GET['submit']){
    /* Reception des donnees envoyes de form de connexion */
        $client_email = isset($_GET['client_email'])? $_GET['client_email']:'';
        $client_password = isset($_GET['client_password'])? $_GET['client_password']:'';
        
        if($client_email !== '' OR $client_password !== ''){
        
        /* Recuperation de tous les emails de DB, dans un tableau $emails */
            require("connexionToDB.php");
            global $db;
            
            $requette = $db->prepare("SELECT * FROM users WHERE email = ?");
            $requette->execute(array($client_email));
            $client = $requette->fetchAll();
            
            if(!empty($client)){
                
                $data_id = $client[0]['id'];
                $data_prenom = $client[0]['prenom'];
                $data_nom = $client[0]['nom'];
                $data_naissance = $client[0]['naissance'];
                $data_sexe = $client[0]['sexe'];
                $data_adresse = $client[0]['adresse'];
                $data_password = $client[0]['password'];
                
                if($client_password==$data_password){
                    session_start();
                    
                    $_SESSION['id'] = $data_id;
                    $_SESSION['prenom'] = $data_prenom;
                    $_SESSION['nom'] = $data_nom;
                    $_SESSION['naissance'] = $data_naissance;
                    $_SESSION['sexe'] = $data_sexe;
                    $_SESSION['adresse'] = $data_adresse;
                    $_SESSION['email'] = $data_email;
                    $_SESSION['password'] = $data_password;
                    $_SESSION['connected'] = true;
                    
                    header("location:programmes.php");
        
                }else{ $warning = "Les mots de passe ne correspondent pas";  }
            }else{ $warning = "Cet utilisateur n'est pas inscrit"; }
        }else{ $warning = "Veuillez remplir tous les champs !"; }
    }
?>
<!DOCTYPE html>
<html>
<head>
	<title>connexion</title>
 	<meta charset="utf-8" name="viewport" content="width=device-width, initial- scale=1"/>
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/connexion.css"/>
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/class.css"/>
</head>
<body>
    
    <div class="container">
        <?php include "http://localhost:8080/kouroukan/pages/tete-de-page.php"; ?>
        <div id = "connexion_form">
    		<h2>ߜߊ߲߬ߞߎ߲߬ߥߟߊ</h2>
    		
    		<form methode="GET" action="" id='formulaire_de_connexion'>
    			<div class="input_box">
    				<input type="email" autocomplete="off" name="client_email" id="client_email">
    				<label>Email</label>
    			</div>
    			<div class="input_box">
    				<input type="password" autocomplete="off" name="client_password" id="client_password">
    				<label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label>
    			</div>
    			<div id="button_box">
    				<input type="submit" name="submit" id="connexion_btn" value="ߊ߬ߟߎ߬ ߟߥߊ߫"/>
    			</div>
    		</form>
    	</div>
        
        <p class="error_message" align="center">	
            <?php 
                if($warning){ echo($warning); }
                $error = $_GET['error'];
                switch($error){
                    case 3:
                        echo "Utilisateur non trouve. Vueillez vous inscrire";
                    break;
                    case "no_connected_to_change_avatar":
                        echo "Connectez vous pour charger ou changer l'avatar";
                    break;
                }
            ?>
        </p>

	</div>
	
	<script>
	
	    var input = $('#formulaire_de_connexion div input:not("#button_box input")');
	    input.val('');
	    
	    $.each(input, function(){
	        
	        $(this).on('focus', function(){
	            $(this).parent().addClass('box_anime');
	        });
	        $(this).on('blur', function(){
	            if($(this).val()=='')
	            { $(this).parent().removeClass('box_anime'); }
	        });

	    });
	
	</script>
	
</body>
</html> 