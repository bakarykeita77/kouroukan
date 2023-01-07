
<!DOCTYPE html>
<html>
<head>
	<title>connexion</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

	<link rel = "stylesheet" href = "/kouroukan/css/class.css"/>
	<link rel = "stylesheet" href = "/kouroukan/css/connexion.css"/>
</head>
<body>
	<div><?php include("tete-de-page.php"); ?></div>    
    <div class="cover">
      <!----------------------------------------------------------------------------------------------------->  
        <div id = "connexion_form">
    		<h2>ߜߊ߲߬ߞߎ߲߬ ߥߟߊ</h2>
    		
    		<form action="accueil.php" method="POST" id="formulaire_de_connexion">
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
			<h1 class="note_titre">ߞߙߎ߬ߞߊ߲߬ ߞߣߍ</h1>
			<div class="note">
				<p> ߌ ߜߊ߲߬ߞߎ߲߬ ߞߙߎ߬ߞߊ߲߬ ߠߊ߫߸ ߟߐ߲ߠߌ ߛߌߟߊ߫ ߛߎߘߎ߲߸ ߕߎ߬ߡߊ ߓߍ߯ ߟߊ߫߸ ߊ߬ ߣߌ߫ ߦߙߐ ߓߍ߯ ߘߐ߫ </p>
				<p> ߣߌ߫ ߜߊ߲߬ߞߎ߲߬ߠߌ ߡߊ߫ ߢߊ߬߸ ߝߴߊ߬ ߦߋ߫ ߛߐ߬ߘߐ߲߬ ߘߏ߯ ߛߓߍߟߌ ߟߎ߬ ߡߊ߫ ߓߍ߲߬߸ ߏ߬ߘߐ߬ ߦߋ߫ ߛߴߊ߬ ߡߊ߬߸ ߝߴߊ߬ ߦߋ߫ ߛߐ߬ߘߐ߲߬ ߌ ߕߐ߯ ߕߍ߫ ߘߋ߰ߘߋ߲ ߠߎ߬ ߛߙߍߘߍ ߘߐ߫߸ ߏ߬ߘߐ߬ ߦߋ߫ <a href="inscription.php"> ߕߐ߯ߛߓߍߟߌ ߞߍ߫ </a></p>
			</div>
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