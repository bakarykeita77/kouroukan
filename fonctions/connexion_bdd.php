<?php

	$server="localhost";
	$db="mon_site";
	$login="root";
	$pass="";

	try
	{
		$bd= new PDO("mysql:host=$server;dbname=$db; charset=utf8",$login,$pass);
		$bd->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
	}
	catch(PDOException $e){echo'Erreur :'.$e->getMessage();}


?>
