<!DOCTYPE html>
<html>
    <head>
    	<title>memoire</title>
    	<meta charset = "utf-8">
    	<link rel="stylesheet" href = "css/memoire.css" >
    </head>
    
    <body>
			
		<div class="outil" id="memoire_tableau">
		
			<input type="text" id="syllabe_input" placeholder="syllabe">
			<input type="text" id="mot1_input" placeholder="mot1">
			<input type="text" id="mot2_input" placeholder="mot2">
			<textarea id="texte1_input" placeholder="texte1"></textarea>
			<textarea id="texte2_input" placeholder="texte2"></textarea>
		
		</div>

		
		<script src = "js/memoire.js"></script>
		<?php include "http://localhost:8080/kouroukan/fonctions/fonctions_memoire.php" ?>
		
	</body>
</html>