<?php

	$server="localhost";
	$db="mon_site";
	$login="root";
	$pass="";

	try
	{
		$bd= new PDO("mysql:host=$server;dbname=$db; charset=utf8",$login,$pass);
		$bd->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

		// Place des codes d'instructions pour manipuler les données de la base 

// Requette sql

		// $nom='';
		// $prenom='';
		// $mail='';
		// $pass='';
		// $telephone='';
		// $image='';

		// $sql="INSERT INTO users(nom, prenom, mail, pass, telephone, image) VALUES(:nom, :prenom, :mail, :pass, :telephone, :image)";

		// $requete=$bd->prepare($sql);

		// $requete->bindParam(':nom', $nom);
		// $requete->bindParam(':prenom', $prenom);
		// $requete->bindParam(':mail', $mail);
		// $requete->bindParam(':pass', $pass);
		// $requete->bindParam(':telephone', $telephone);
		// $requete->bindParam(':image', $image);

		// $nom='Mandjou';
		// $prenom='Keita';
		// $mail='mk2006@gmail.com';
		// $pass='mk29292';
		// $telephone='621594839';
		// $image='';

		// $requete->execute();

	
	}
	catch(PDOException $e){echo'Erreur :'.$e->getMessage();}


?>
