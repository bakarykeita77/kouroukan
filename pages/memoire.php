<!DOCTYPE html>
<html>
    <head>
    	<title>memoire</title>
    	<meta charset = "utf-8">
    	<link rel="stylesheet" href = "css/memoire.css" >
    </head>
    
    <body>
			
		<div class="outil" id="memoire_tableau">
		
			<div id="char">
				<input id="syllabe_input"></input>
			</div>
		
			<div id="textes">
				<div id="texte_visible">
					<input id="mot1_input"></input>
					<textarea id="textarea1"></textarea>
				</div>
				
				<div id="texte_audible">
					<input id="mot2_input"></input>
					<textarea id="textarea2"></textarea>
				</div>
			</div>
		

			<table id="table_mots_visibles">
				<tr id="mots_visibles"> <td class="mot_visible">ߓߊߞߊ߬ߙߌ߬</td> </tr>
			</table>
			
			<table id="table_mots_audibles">
				<tr id="mots_audibles"> <td class="mot_audible">ߓߊ߫ߞߊ߬ߙߌ߬</td> </tr>
			</table>
		</div>

		
		<script src = "js/memoire.js"></script>
		<?php include "http://localhost:8080/kouroukan/fonctions/fonctions_memoire.php" ?>
		
	</body>
</html>