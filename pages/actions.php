<?php
    session_start();
    
    require_once("connexionToDB.php");
    global $db;
    
    $post_action = isset($_POST['post_action']) ? $_POST['post_action']:'';
    $get_action  = isset($_GET['get_action']) ? $_GET['get_action']:'';
    $referer     = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '/pages/index.php';
 
  /*----------------------------------------------------------------------------------------------*/
  
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
		function archiverPratique($id_user,$pratique){
		    global $db;

			$sql = "INSERT INTO pratiques(id_user, pratique) 
					VALUES(:id_user, :pratique)";
			$requette = $db -> prepare($sql);

			$requette->bindValue(':id_user',  $id_user,   PDO::PARAM_INT);
			$requette->bindValue(':pratique', $pratique,  PDO::PARAM_STR);

			$pratiques = $requette->execute();

			return $pratiques;
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
        function securiser($donnee){
            $donnee = trim($donnee);
            $donnee = stripslashes($donnee);
            $donnee = strip_tags($donnee);
            
            return $donnee;
        }
		function supprimerClient($id){
			global $db;

			$sql = "DELETE FROM users WHERE id=:id";

			$requette = $db->prepare($sql);
			$requette->bindValue(':id',   $id,   PDO::PARAM_INT);
			$utilisateurs =  $requette->execute();
			return $utilisateurs;
		 }
    
  /*----------------------------------------------------------------------------------------------*/
    
    switch($post_action){
        case 'add_client':
           
            $prenom    = securiser($_POST['prenom']);
            $nom       = securiser($_POST['nom']);
            $naissance = securiser($_POST['naissance']);
            $sexe      = securiser($_POST['sexe']);
            $adresse   = securiser($_POST['adresse']);
            $email     = securiser($_POST['email']);
            $password  = securiser($_POST['password']);
           
            addClient($prenom,$nom,$naissance,$sexe,$adresse,$email,$password);
            header('location:http://localhost:8080/kouroukan/index.php?message=1');
        break;
        case 'archiver_pratique':
            
            $id_user  = securiser($_POST['id_user']);
            $pratique = securiser($_POST['pratique']);
           
            archiverPratique($id_user,$pratique);  
            header('location:'.$referer);
        break;
        case 'get_client':
            $client_email = securiser($_POST['client_email']);
            getClientByEmail($client_email);      
        break;
        case 'update_client':
            
            $id        = securiser($_POST['post_id']);
            $prenom    = securiser($_POST['prenom_updated']);
            $nom       = securiser($_POST['nom_updated']);
            $naissance = securiser($_POST['naissance_updated']);
            $sexe      = securiser($_POST['sexe_updated']);
            $adresse   = securiser($_POST['adresse_updated']);
            $email     = securiser($_POST['email_updated']);
            $password  = securiser($_POST['password_updated']);
            
            updateClient($id,$prenom,$nom,$naissance,$sexe,$adresse,$email,$password);
        break;
    }
    switch($get_action){
        
        case 'archiver_exercice':
            $id_client = securiser($_SESSION['id']);
            $niveau    = securiser($_POST['niveau']);
            $exercice  = securiser($_POST['course_input']);
          
            archiverExercice($id_client,$niveau,$exercice);
            header('location:lesson.php');
        break;
        case 'archiver_lesson':
            $id_client = securiser($_SESSION['id']);
            $niveau    = securiser($_POST['niveau']);
            $course    = securiser($_POST['course_input']);
   
            archiverLesson($id_client,$niveau,$course);
            header('location:lesson.php');
        break;
        case 'archiver_teste':
            
            $id_client = $_SESSION['id'];
            $niveau    = securiser($_GET['niveau']);
            $teste     = securiser($_POST['teste']);
            $point     = securiser($_POST['point']);
          
            archiverTeste($id_client,$niveau,$teste,$point);
            header("location:lesson.php");
        break;
        case 'delete_client':
            $id = securiser($_GET['id']);
            deleteClient($id);
            
            header('location:clients.php');
        break;
        case 'get_clients':
            getAllClients();      
        break;
    }
?>