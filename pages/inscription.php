<?php
    if(isset($_POST['submit'])){
        if(!empty($_POST['prenom']) AND !empty($_POST['nom']) AND !empty($_POST['naissance']) AND !empty($_POST['sexe']) AND !empty($_POST['adresse']) AND !empty($_POST['email']) AND !empty($_POST['pass'])){
          
		 /*Voyons si le mail envoye par l'utilisateur n'est pas deja utilise.
		  *Pour cela, on extrait et place tous les emails déja enregistrés de la base de données dans une variable.
		 */
            require("connexionToDB.php");
            global $db;
            $requette = $db->prepare("SELECT email FROM users");
            $requette->execute();
            $emails = $requette->fetchAll();
            
			$emails_table = [];
            for($i=0;$i<count($emails);$i++){ $emails_table[$i] = $emails[$i]['email']; }

		 /*On teste la présence de l'email saisi dans la variable $emails.
		  *Si oui un message s'affiche pour signaler l'utilisateur que cet emailest déja utilisé.
		  *Si non le processus d'inscription est engagé.
		 */
            if(in_array($_POST['email'],$emails_table) == false) {
              /*Fonction pour securiser les donnees*/
                require('phpFonctions.php');
                
              /*Securisation des donnees*/
                $prenom = securiser($_POST['prenom']);
                $nom = securiser($_POST['nom']);
                $naissance = securiser($_POST['naissance']);
                $sexe = securiser($_POST['sexe']);
                $adresse = securiser($_POST['adresse']);
                $email = securiser($_POST['email']);
                $pass = sha1(securiser($_POST['pass']));
                
              /*Insertion des donnees dans la base de donnees*/
                $requette = $db->prepare("INSERT INTO users(prenom,nom,naissance,sexe,adresse,email,pass) VALUES(?,?,?,?,?,?,?)");
                $requette->execute(array($prenom,$nom,$naissance,$sexe,$adresse,$email,$pass));
                
            }else{ $error = "L'email envoye est deja utilise. Essayer un autre"; }
        }else { $error = "Veuiler remplir tous les champs"; }
    }
?>
<html>
<head>
	<title>inscriptions</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/class.css"/>
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/inscription.css"/>
</head>
<body>
    
    <div class="cover">
    	<div id="inscription_form">
    		
    		<h3>ߕߐ߯ߛߓߍ߫ ߥߟߊ</h3>
    		
    		<form action="http://localhost:8080/kouroukan/pages/accueil.php" method="POST" id="formulaire_de_connexion">
    			
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="prenom" class="inscription_input" id="prenom" required/>
    				<label>ߕߐ߮</label>
    			</div>
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="nom" class="inscription_input" id="nom" required/>
    				<label>ߖߊ߬ߡߎ߲</label>
    			</div>
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="naissance" class="inscription_input" id="naissance">
    				<label>ߡߐߦߌߕߎߡߊ</label>
    			</div>
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="sexe" class="inscription_input" id="sexe">
    				<label>ߖߊ߲߭</label>
    			</div>
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="adresse" class="inscription_input" id="adresse">
    				<label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label>
    			</div>
    			<div class="input_box">
    				<input type="email" autocomplete="off" name="email" class="inscription_input" id="email">
    				<label>E-mail</label>
    			</div>
    			<div class="input_box">
    				<input type="password" autocomplete="off" name="client_pass" class="inscription_input" id="client_pass">
    				<label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label>
    			</div>
    			<div id="button_box">
    				<input type="submit" name="submit" id="inscription_btn" value="ߊ߬ߟߎ߬ ߟߥߊ߫"/>
    			</div>
    		</form>

    		 <p class="error_message" align="center"><?php if(isset($error)){ echo $error; } ?></p>
    	</div>
	</div>

	<script>
	
	    var input = document.querySelectorAll(".inscription_input");
	    input.innerHRML = "";
	    
	    input.forEach(function(item){
			const list = item.parentElement.classList;
	        
	        item.addEventListener("focus", function(){
	            list.add("box_anime");
	        });
	        item.addEventListener("blur", function(){
	            if(item.innerHTML=='') { list.remove("box_anime"); }
	        });

	    });
	
	</script>
</body>
</html>