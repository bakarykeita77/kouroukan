<!DOCTYPE html>
<html>
    <head>
    	<title>memoire</title>
    	<meta charset = "utf-8">
    	<link rel="stylesheet" href = "css/memoire.css" >
    </head>
    
    <body>
			
		<div class="outil" id="memoire_tableau">
		
			<input type="text" id="syllabe_visible_input" placeholder="syllabe_visible">
			<input type="text" id="syllabe_audible_input" placeholder="syllabe_audible">
			<input type="text" id="mot_audible_input" placeholder="mot_audible">
			<textarea id="texte_audible_input" placeholder="texte_audible"></textarea>

		</div>

		
		<script src = "js/memoire.js"></script>
		<?php include "http://localhost:8080/kouroukan/fonctions/fonctions_memoire.php" ?>
		
	</body>
</html>