<?php 
	
	$server = "localhost";
	$login = "root";
	$pass = "";

	try{
		$db = new PDO("mysql:host=$server;dbname=kouroukan;charset=utf8",$login,$pass);
		$db -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $db -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        

    
        function createTables() {
            //$sql_database = "CREATE DATABASE IF NOT EXISTS `education`";
            $sql_table_users    = "CREATE TABLE IF NOT EXISTS `kouroukan`.`users`(
                `id` INT(255) NOT NULL AUTO_INCREMENT,
                `date` TIMESTAMP NOT NULL CURRENT_TMESTAMP,
                `prenom` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                `nom` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                `naissance` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                `sexe` VARCHAR(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                `adresse` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                `email` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                `pass` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                PRIMARY KEY (`id`)
             ) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci";
            $sql_table_avatar   = "CREATE TABLE IF NOT EXISTS `kouroukan`.`avatar`(
                `id` int(255) not null auto_increment,
                `client_id` int(255) not null,
                `nom` varchar(100) character set utf8 collate utf8_general_ci,
                `taille` varchar(100) character set utf8 collate utf8_general_ci,
                `type` varchar(100) character set utf8 collate utf8_general_ci,
                `image` longblob cahacter set utf8 collate utf8_general_ci,
                primary key (`id`)
             ) engine = myisam charset utf8 collate utf8_general_ci";
            $sql_table_alphabet = "CREATE TABLE IF NOT EXISTS `kouroukan`.`alphabet`( 
                `id` INT(255) NOT NULL AUTO_INCREMENT , 
                `id_client` INT(255) NOT NULL , 
                `niveau` INT(2) NOT NULL , 
                `date` TIMESTAMP NOT NULL , 
                `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                `note` INT(3) NOT NULL , 
                PRIMARY KEY (`id`)
             ) ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_general_ci";
            $sql_table_syllabes = "CREATE TABLE IF NOT EXISTS `kouroukan`.`syllabes`( 
                `id` INT(255) NOT NULL AUTO_INCREMENT , 
                `id_client` INT(255) NOT NULL , 
                `niveau` INT(2) NOT NULL , 
                `date` TIMESTAMP NOT NULL , 
                `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                `note` INT(3) NOT NULL , 
                PRIMARY KEY (`id`)
             ) ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_general_ci";
            $sql_table_tons     = "CREATE TABLE IF NOT EXISTS `kouroukan`.`tons`( 
                `id` INT(255) NOT NULL AUTO_INCREMENT , 
                `id_client` INT(255) NOT NULL , 
                `niveau` INT(2) NOT NULL , 
                `date` TIMESTAMP NOT NULL , 
                `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                `note` INT(3) NOT NULL , 
                PRIMARY KEY (`id`)
             ) ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_general_ci";
            $sql_table_chiffres = "CREATE TABLE IF NOT EXISTS `kouroukan`.`chiffres`( 
                `id` INT(255) NOT NULL AUTO_INCREMENT , 
                `id_client` INT(255) NOT NULL , 
                `niveau` INT(2) NOT NULL , 
                `date` TIMESTAMP NOT NULL , 
                `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                `note` INT(3) NOT NULL , 
                PRIMARY KEY (`id`)
             ) ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_general_ci";
        
         /*------------------------------------------------------------------------------------------------------ */   
        
            $db->exec($sql_table_users);
            $db->exec($sql_table_avatar);
            $db->exec($sql_table_alphabet);
            $db->exec($sql_table_syllabes);
            $db->exec($sql_table_tons);
            $db->exec($sql_table_chiffres);	
        }   
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