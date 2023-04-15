
<html>
<head>
	<title>inscriptions</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel = "stylesheet" href = "/kouroukan/css/inscription.css"/>
</head>
<body>
	<div><?php include("tete-de-page.php"); ?></div>    
    <div class="cover">
		<div id="inscription_container">

			<div id="inscription_form">
				
				<h2>ߕߐ߯ߛߓߍ߫ ߥߟߊ</h2>
				
				<form action="/kouroukan/pages/actions.php" method="POST" id="formulaire_de_connexion">
					
					<div class="input_box">
						<input type="text" autocomplete="off" name="prenom" class="inscription_input" id="prenom" required />
						<label>ߕߐ߮</label>
					</div>
					<div class="input_box">
						<input type="text" autocomplete="off" name="nom" class="inscription_input" id="nom" required />
						<label>ߖߊ߬ߡߎ߲</label>
					</div>
					<div class="input_box">
						<input type="text" autocomplete="off" name="naissance" class="inscription_input" id="naissance" required />
						<label>ߡߐߦߌߕߎߡߊ</label>
					</div>
					<div class="input_box">
						<input type="text" autocomplete="off" name="sexe" class="inscription_input" id="sexe" required />
						<label>ߖߊ߲߭</label>
					</div>
					<div class="input_box">
						<input type="text" autocomplete="off" name="adresse" class="inscription_input" id="adresse" required />
						<label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label>
					</div>
					<div class="input_box">
						<input type="email" autocomplete="off" name="email" class="inscription_input" id="email" required />
						<label>E-mail</label>
					</div>
					<div class="input_box">
						<input type="password" autocomplete="off" name="pass" class="inscription_input" id="client_pass" required />
						<label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label>
					</div>
					<div id="button_box">
						<input type="submit" name="submit" id="inscription_btn" value="ߕߐ߯ߛߓߍߟߌ ߞߍ߫"/>
					</div>
				</form>

				<p class="error_message" align="center"><?php if(isset($error)) { echo $error; } ?></p>
			</div>

			<div id="inscription_note">
				<h1 class="note_titre">ߞߙߎ߬ߞߊ߲߬ ߞߣߍ ߕߐ߯ߛߓߍߟߌ</h1>
				<div class="note">
					<p>ߞߙߎ߬ߞߊ߲߬ ߞߣߍ ߞߊ߬ߙߊ߲ ߦߋ߫ ߘߊߡߌ߬ߘߊ߬ ߟߊ߫ ߕߐ߯ߛߓߍߟߌ ߟߋ߬ ߝߟߐ߫ ߡߊ߬</p>
					<p>ߏ߬ߘߐ߬߸ ߕߐ߯ߛߓߍߟߌ߫ ߥߟߊ ߢߌ߲߬ ߠߝߊ߫߸ ߦߋ߫ ߘߎ߰ߡߊ߬ ߞߘߎ ߘߌ߲߯߸ ߕߐ߯ߛߓߍߟߌ ߓߊ߲ߣߍ߲ ߠߴߏ߬ ߘߌ߫. ߏ߬ߟߋ ߞߐ߫߸ ߌ ߘߌ߫ ߛߋ߫ ߞߵߌ ߜߊ߲߬ߞߎ߲߬. ߞߙߎ߬ߞߊ߲߬ ߞߣߍ ߓߌ߬ߟߌ߬ߣߍ߲ ߠߴߌ ߛߊ߬ߥߏ ߘߴߏ߬ ߘߌ߫ ߕߎ߬ߡߊ߫-ߊ߫-ߕߎ߬ߡߊ߫ ߞߵߌ ߘߌߦߊ߫߸ ߦߙߐ߫-ߊ߫-ߦߙߐ߫ ߞߵߌ ߘߌߦߊ߫.</p>
				</div>
			</div>

    	</div>
	    <script src="/kouroukan/js/jquery-3.3.1.js"></script>
    	<script src="/kouroukan/note-fonctions.js"></script>
    	<script src="/kouroukan/js/inscription.js"></script>
    	
    	<?php
            if($_SERVER['HTTP_REFERER'] == "http://localhost:8080/kouroukan/pages/inscription.php") {
                echo('<script> notifier(); </script>'); 
            }
        ?>
	</div>
</body>
</html>