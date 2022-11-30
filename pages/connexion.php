
<!DOCTYPE html>
<html>
<head>
	<title>connexion</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/class.css"/>
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/connexion.css"/>
</head>
<body>
    
    <div class="cover">
      <!----------------------------------------------------------------------------------------------------->  
        <div id = "connexion_form">
    		<h2>ߜߊ߲߬ߞߎ߲߬ ߥߟߊ</h2>
    		
    		<form action="http://localhost:8080/kouroukan/pages/accueil.php" method="POST" id="formulaire_de_connexion">
    			<div class="input_box">
    				<input type="email" autocomplete="off" name="client_email" class="connexion_input" id="client_email" required />
    				<label>Email</label>
    			</div>
    			<div class="input_box">
    				<input type="password" autocomplete="off" name="client_pass" class="connexion_input" id="client_pass" required />
    				<label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label>
    			</div>
    			<div id="button_box">
    				<input type="submit" name="submit" id="connexion_btn" value=" ߜߊ߲߬ߞߎ߲߬ߠߌ ߞߍ߫"/>
    			</div>
    		</form>
    	</div>
    	
		<div class="note_container">
		    <span class="fermeture_note_btn" id="fermeture_note_connexion">&times;</span>
		    <p class="note" id="note_connexion"></p>
		</div>
	</div>
	
	<script src="/kouroukan/js/jquery-3.3.1.js"></script>
	<script src="/kouroukan/note-fonctions.js"></script>
	
	<?php
	    
	    if($_SERVER['HTTP_REFERER'] == "http://localhost:8080/kouroukan/pages/connexion.php") {
	        echo("<script> notifier(); </script>");
	    }
	
	
	?>
	
</body>
</html> 