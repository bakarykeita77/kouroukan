<!DOCTYPE html>
<html>
<head>
	<title>smartboard</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="css/smartboard.css"/>
</head>
<body>

<!-- Dictionnaire -->	

<!--		<?php 
			try{
				$serveur = 'localhost';
				$db = 'mon_site';
				$login = 'root';
				$pass = "";

				$db = new PDO("mysql:host=$serveur;dbname=$db;charset=utf8",$login,$pass);
				$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

					$requete = $db->prepare("SELECT * FROM dictionnaire");
					$requete->execute();
					$resultat = $requete->fetchall(PDO::FETCH_ASSOC);

			}
			catch(PDOException $e){echo 'Echec:' .$e->getMessage();}
		 ?>

	</div>
-->	
    <?php include "dictionnaire.php"; ?>
    
	<div id="smartboard">
	    <form method="POST" id="recherche_form">
	        <input type="search" id="recherche_input"/>
	    </form>

		<div id="suggestions">
			<table id="suggestions_noms"></table>
			<table id="suggestions_pronoms"></table>
			<table id="suggestions_verbes"></table>
			<table id="suggestions_prepos"></table>
			<table id="suggestions_preps"></table>
		</div>

	</div>

	<script src="js/smartboard.js" type="text/javascript"></script>
</body>
</html>