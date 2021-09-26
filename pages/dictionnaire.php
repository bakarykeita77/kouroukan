<!DOCTYPE html>
<html>
<head>
	<title>dictionnaire</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="css/dictionnaire.css"/>
</head>
<body>

	<?php 
		try{
			$serveur = 'localhost';
			$db = 'mon_site';
			$login = 'root';
			$pass = "";

			$connexion = new PDO("mysql:host=$serveur;dbname=$db;charset=utf8",$login,$pass);
			$connexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

				$requete = $connexion->prepare("SELECT * FROM dictionnaire");
				$requete->execute();
				$resultat = $requete->fetchall(PDO::FETCH_ASSOC);
		}
		
		catch(PDOException $e){echo 'Echec:' .$e->getMessage();}
	 ?>
	
	<ul id="mot">
		<?php foreach($resultat as $mot): ?>
			<li><?= $mot['mots'] ?></li>
		<?php endforeach ?>
	</ul>

</body>
</html>