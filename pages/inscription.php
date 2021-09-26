<?php
    if(isset($_POST['submit'])){
        if(!empty($_POST['prenom']) AND !empty($_POST['nom']) AND !empty($_POST['naissance']) AND !empty($_POST['sexe']) AND !empty($_POST['adresse']) AND !empty($_POST['email']) AND !empty($_POST['password'])){
          /*Voyons si le mail envoye par l'utilisateur n'est pas deja utilise*/
            require("connexionToDB.php");
            global $connexion;
            $requette = $connexion->prepare("SELECT email FROM users");
            $requette->execute();
            $emails = $requette->fetchAll();
            
            for($i=0;$i<count($emails);$i++){ $emails_table[$i] = $emails[$i]['email']; }
            if(in_array($_POST['email'],$emails_table)!=-1){
              /*Fonction pour securiser les donnees*/
                require('phpFonctions.php');
                
              /*Securisation des donnees*/
                $prenom = securiser($_POST['prenom']);
                $nom = securiser($_POST['nom']);
                $naissance = securiser($_POST['naissance']);
                $sexe = securiser($_POST['sexe']);
                $adresse = securiser($_POST['adresse']);
                $email = securiser($_POST['email']);
                $password = sha1(securiser($_POST['password']));
                
              /*Insertion des donnees dans la base de donnees*/
                $requette = $connexion->prepare("INSERT INTO users(prenom,nom,naissance,sexe,adresse,email,password) VALUES(?,?,?,?,?,?,?)");
                $requette->execute(array($prenom,$nom,$naissance,$sexe,$adresse,$email,$password));
                
            }else{ $error = "L'email envoye est deja utilise. Essayer un autre"; }
        }else { $error = "Veuiler remplir tous les champs"; }
    }
?>
<html>
<head>
	<title>inscriptions</title>
 	<meta charset="utf-8" name="viewport" content="width=device-width, initial- scale=1"/>
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/inscription.css"/>
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/class.css"/>
</head>
<body>
    
    <div class="container">
        <?php include "http://localhost:8080/kouroukan/pages/tete-de-page.php"; ?>
    	<div id="inscription_form" align="center">
    		
    		<h3>ߕߐ߯ߛߓߍߥߟߊ<h3>
    		<form method="POST" action="">
    		    <table>
        			<tr>
        				<td><label>ߕߐ߮</label></td>
        				<td><input type="text" name="prenom" id="prenom"></td>
        			</tr>
        			<tr>
        				<td><label>ߖߊ߬ߡߎ߲</label></td>
        				<td><input type="text" name="nom" id="nom" value=''/></td>
        			</tr>
        			<tr>
        				<td><label>ߡߐߦߌ߫ ߕߎߡߊ</label></td>
        				<td><input type="text" name="naissance" id="naissance"/></td>
        			</tr>
        			<tr>
        				<td><label>ߖߊ߲߭</label></td>
        				<td><input type="text" name="sexe" id="sexe"/></td>
        			</tr>
        			<tr>
        				<td><label>ߛߊ߲߬ߓߊ߬ߕߐ߮</label></td>
        				<td><input type="text" name="adresse" id="adresse"/></td>
        			</tr>
        			<tr>
        				<td><label>E-mail</label></td>
        				<td><input type="email" name="email" id="email"/></td>
        			</tr>
        			<tr>
        				<td><label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label></td>
        				<td><input type="password"  name="password" id="password"/></td>
        			</tr>
        			<tr>
        			    <td></td>
        		        <td><input type='submit' name='submit' value='ߏ߬ ߛߓߍ߫' id='submit_btn'/></td>
        			</tr>
    			</table>
    		 </form>
    		 <br>
    		 <p class="error_message" align="center"><?php if(isset($error)){ echo $error; } ?></p>
    	</div>
	</div>

</body>
</html>