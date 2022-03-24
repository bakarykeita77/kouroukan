<?php 
	
	$server = "localhost";
	$login = "root";
	$pass = "";

	try{
		$db = new PDO("mysql:host=$server;dbname=kouroukan;charset=utf8",$login,$pass);
		$db -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $db -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		
		function addClient($prenom, $nom, $naissance, $sexe, $adresse, $email, $password){
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
		function archiverLesson($client_id,$niveau,$course){}
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
		function archiverPratique($id_user,$pratique){
		    global $db;

			$sql = "INSERT INTO pratiques(id_user, pratique) 
					VALUES(:id_user, :pratique)";
			$requette = $db -> prepare($sql);

			$requette->bindValue(':id_user',  $id_user,   PDO::PARAM_STR);
			$requette->bindValue(':pratique', $pratique,  PDO::PARAM_STR);

			$pratiques = $requette->execute();

			return $pratiques;
		}
		function archiverPratiques($id_user,$course,$phase,$pratiques,$point) {
		    global $db;
		    
		    $sql = "INSERT INTO alphabet (id_client,matiere,phase,cour,note)
		            VALUES ($id_user,$course,$phase,$course,$point)";
		}
		function getAllClients(){
			global $db;

			$sql = "SELECT * FROM users ORDER BY id DESC LIMIT 12";

			$requette = $db->prepare($sql);
			$requette->execute();
			return $utilisateurs = $requette->fetchAll(PDO::FETCH_ASSOC);
		 }
		function getClient($id){
			global $db;

			$sql = "SELECT * FROM users WHERE id=:id";

			$requette = $db->prepare($sql);
			$requette->bindValue(':id',$id,PDO::PARAM_INT);
			$requette->execute();
			return $utilisateurs = $requette->fetch(PDO::FETCH_ASSOC);
		 }
		function getEmailsAndPasswords(){
			global $db;

			$sql = "SELECT email, password FROM users";
			$requette = $db->prepare($sql);
			$requette->execute();

			$emailsAndPass = $requette->fetchAll(PDO::FETCH_ASSOC);

			return $emailsAndPass;
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
		function supprimerClient($id){
			global $db;

			$sql = "DELETE FROM users WHERE id=:id";

			$requette = $db->prepare($sql);
			$requette->bindValue(':id',   $id,   PDO::PARAM_INT);
			$utilisateurs =  $requette->execute();
			return $utilisateurs;
		 }
	 }
	catch(PDOException $e){
		echo "Echec :".$e -> getMessage();
	 }
 ?>