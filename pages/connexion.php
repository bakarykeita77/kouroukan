
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
		 
        <div id="connexion_container">

			<div id="connexion_note">
				<h1 class="note_titre">ߞߙߎ߬ߞߊ߲߬ ߞߣߍ ߜߊ߲߬ߞߎ߲߬ߠߌ</h1>
				<div class="note">
					<p> ߌ ߜߊ߲߬ߞߎ߲߬ ߞߙߎ߬ߞߊ߲߬ ߠߊ߫߸  ߕߊ߲߬ߘߐ߸ ߞߊ߬ ߛߊ߲߬ߓߊ߬ߕߐ߮ ߣߌ߫ ߜߎ߲߬ߘߎ߬ߕߐ߮ ߟߎ߬ ߟߝߊ߫߸ ߞߵߊ߬ ߟߊߓߊ߲߫ ߘߎ߰ߡߊ߬ ߞߘߎ ߘߌ߲߯ ߡߊ߬. ߌ ߜߊ߲߬ߞߎ߬ߣߍ߲ ߠߴߏ߬ ߘߌ߫.</p>
					<p> ߣߌ߫ ߜߊ߲߬ߞߎ߲߬ߠߌ ߡߊ߫ ߢߊ߬߸ ߒ߬ߓߵߊ߬ ߘߌ߫ ߛߐ߬ߘߐ߲߬ ߝߌ߬ߟߌ ߦߋ߫ ߛߊ߲߬ߓߊ߬ߕߐ߮ ߘߐ߫ ߥߟߊ ߜߎ߲߬ߘߎ߬ߕߐ߮ ߘߐ߫߸ ߏ߬ߘߐ߬߸ ߦߋ߫ ߛߴߊ߬ ߡߊ߬ </p>
					<p>ߣߌ߫ ߝߟߌ߬ ߡߊ߫ ߞߍ߫ ߛߊ߲߬ߓߊ߬ߕߐ߮ ߣߌ߫ ߜߎ߲߬ߘߎ߬ߕߐ߮ ߛߌ߫ ߘߐ߫߸ ߒ߬ߓߴߊ߬ ߘߌ߫ ߛߐ߬ߘߐ߲߬ ߌ ߕߐ߯ ߕߍ߫ ߘߋ߰ߘߋ߲ ߠߎ߬ ߛߙߍߘߍ ߘߐ߫߸ ߏ߬ߘߐ߬ ߦߋ߫ <a href="inscription.php"> ߕߐ߯ߛߓߍߟߌ ߞߍ߫ </a></p>
				</div>
			</div>

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