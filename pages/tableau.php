<!DOCTYPE html>
<html>
<head>
	<title>tableau</title>
	<meta charset="utf-8">
<style>
    <?php
        include "css/tableau.css";
        include "css/assistant.css";
    ?>
</style>

</head>
<body>

	<div id = "parametres_tableau">  
		<div id="options_tableau">
			<table>
				<tr><td id="couleur"> ߞߐ߬ߟߐ </td></tr>
				<tr><td id="zoum"> ߦߊߟߊ߲ </td></tr>
			</table>
		</div>
		<div id="details_parametres">
		    <div id="couleurs">
			    <table>
				    <tr>
					    <td> ߥߟߊ߬ߓߊ </td>
					    <td> ߛߓߍߟߌ </td>
				    </tr>
				    <tr>
					    <td><p id="noir"></p></td>
					    <td><p id="blanc"></p></td>
				    </tr>
				    <tr>
					    <td><p id="teal"></p></td>
					    <td><p id="jaune"></p></td>
				    </tr>
				    <tr>
					    <td><p id="bleue"></p></td>
					    <td><p id="orange"></p></td>
				    </tr>
			    </table>
		    </div>
		    <div id="zoomer">
			    <table>
				    <tr>
					    <td><p> ߟߊ߬ߓߏ߲߬ߧߊ߬ߟߌ </p></td>
					    <td><p> ߟߊ߬ߘߐ߰ߦߊ߬ߟߌ </p></td>
				    </tr>
				    <tr>
					    <td><p id="plus"> &plus; </p></td>
					    <td><p id="moin"> &minus; </p></td>
				    </tr>
			    </table>
		    </div>
		</div>
	</div>
	
	
	<form method="POST" id="tableau_form">	
		<textarea readonly="true" id="tableau_noir"></textarea>
	</form>

	<div class = "outils" id = "cadre_assistant"> <?php include "body/assistant.php"; ?> </div>
	<div class = "outils" id = "cadre_memoire"  > <?php include "body/memoire.php";   ?> </div>
	<div class = "outils" id = "clavier_tableau"> 
		<span id="fermer_clavier">&times;</span>		     
		<?php include "body/clavier.php";   ?>
	</div>
	<div class = "outils" id = "cadre_smartboard"> <?php include "body/smartboard.php";?> </div>

	<?php include "fonctions/fonctions_tableau.php"; ?>
	<script src="jquery-3.3.1.js" type="text/javascript"></script>
	<script src="js/tableau.js" type="text/javascript"></script>
	<script src="js/assistant.js" type="text/javascript"></script>
 	<script type="text/javascript" src="js/clavier.js"></script>

</body>
</html>