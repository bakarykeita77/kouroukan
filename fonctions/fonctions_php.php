<?php 
	
	$server = "localhost";
	$login = "root";
	$pass = "";

	try{
		$db = new PDO("mysql:host=$server;dbname=kouroukan;charset=utf8",$login,$pass);
		$db -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

		function ajouterClient($prenom, $nom, $naissance, $sexe, $adresse, $email, $password){
			global $db;

			$sql = "INSERT INTO users(prenom, nom, naissance, sexe, adresse, email, password)
					VALUES(:prenom, :nom, :naissance, :sexe, :adresse, :email, :password)
			";

			$requette = $db->prepare($sql);

			$requette->bindValue(':prenom',   $prenom,   PDO::PARAM_STR);
			$requette->bindValue(':nom',      $nom,      PDO::PARAM_STR);
			$requette->bindValue(':naissance',$naissance,PDO::PARAM_STR);
			$requette->bindValue(':sexe',     $sexe,     PDO::PARAM_STR);
			$requette->bindValue(':adresse',  $adresse,  PDO::PARAM_STR);
			$requette->bindValue(':email',    $email,    PDO::PARAM_STR);
			$requette->bindValue(':password', $password, PDO::PARAM_STR);

			$utilisateurs =  $requette->execute();
			return $utilisateurs;
		 }
		function supprimerClient($id){
			global $db;

			$sql = "DELETE FROM users WHERE id=:id";

			$requette = $db->prepare($sql);
			$requette->bindValue(':id',   $id,   PDO::PARAM_INT);
			$utilisateurs =  $requette->execute();
			return $utilisateurs;
		 }
		function modifierClient($id, $prenom, $nom, $naissance, $sexe, $adresse, $email, $password){
			global $db;

			$sql = "UPDATE users SET prenom=:prenom, nom=:nom, naissance=:naissance, sexe=:sexe, adresse=:adresse, email=:email, password=:password WHERE id=:id";

			$requette = $db->prepare($sql);

			$requette->bindValue(':id',       $id,       PDO::PARAM_INT);
			$requette->bindValue(':prenom',   $prenom,   PDO::PARAM_STR);
			$requette->bindValue(':nom',      $nom,      PDO::PARAM_STR);
			$requette->bindValue(':naissance',$naissance,PDO::PARAM_STR);
			$requette->bindValue(':sexe',     $sexe,     PDO::PARAM_STR);
			$requette->bindValue(':adresse',  $adresse,  PDO::PARAM_STR);
			$requette->bindValue(':email',    $email,    PDO::PARAM_STR);
			$requette->bindValue(':password', $password, PDO::PARAM_STR);

			$utilisateurs =  $requette->execute();
			return $utilisateurs;
		 }
		function getClient($id){
			global $db;

			$sql = "SELECT * FROM users WHERE id=:id";

			$requette = $db->prepare($sql);
			$requette->bindValue(':id',$id,PDO::PARAM_INT);
			$requette->execute();
			return $utilisateurs = $requette->fetch(PDO::FETCH_ASSOC);
		 }
		function getAllClients(){
			global $db;

			$sql = "SELECT * FROM users ORDER BY id DESC LIMIT 12";

			$requette = $db->prepare($sql);
			$requette->execute();
			return $utilisateurs = $requette->fetchAll(PDO::FETCH_ASSOC);
		 }
		function getEmailsAndPasswords(){
			global $db;

			$sql = "SELECT email, password FROM users";
			$requette = $db->prepare($sql);
			$requette->execute();

			$emailsAndPass = $requette->fetchAll(PDO::FETCH_ASSOC);

			return $emailsAndPass;
		 }
		function nbrEmails(){
			global $db;

			$sql = "SELECT COUNT(email) FROM users";
			$requette = $db->prepare($sql);
			$requette->execute();
			$mails = $requette->fetchAll(PDO::FETCH_ASSOC);
			$nbr_emails = $mails[0]['COUNT(email)'];

			return $nbr_emails;
		 }
		function passCorrespondant($client_email){
			global $db;

			$sql = "SELECT password FROM users WHERE email=:email";
			$requette = $db->prepare($sql);
			$requette->bindValue(':email',$client_email,PDO::PARAM_STR);
			$requette->execute();
			$pass_table= $requette->fetchAll(PDO::FETCH_ASSOC);
			$pass_correspondant = $pass_table[0]['password'];

			return $pass_correspondant;
		 }
		function archiverNotes($numero, $question, $reponse, $points){
			global $db;

			$sql = "INSERT INTO notes(numero, question, reponse, points) 
					VALUES(:numero, :question, :reponse, :points)";
			$requette = $db -> prepare($sql);

			$requette->bindValue(':numero',  $numero,   PDO::PARAM_STR);
			$requette->bindValue(':question',$question, PDO::PARAM_STR);
			$requette->bindValue(':reponse', $reponse,  PDO::PARAM_STR);
			$requette->bindValue(':points',  $points,   PDO::PARAM_STR);

			$notes = $requette->execute();

			return $notes;
		}
	 }
	catch(PDOException $e){
		echo "Echec :".$e -> getMessage();
	 }
 ?>