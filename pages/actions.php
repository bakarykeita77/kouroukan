<?php
    session_start();
    
    require_once("connexionToDB.php");
    global $db;
    
    
    $id_client = $_SESSION['id'];
    
    $prenom    = isset($_POST['prenom'])    ? $_POST['prenom']:'';
    $nom       = isset($_POST['nom'])       ? $_POST['nom']:'';
    $naissance = isset($_POST['naissance']) ? $_POST['naissance']:'';
    $sexe      = isset($_POST['sexe'])      ? $_POST['sexe']:'';
    $adresse   = isset($_POST['adresse'])   ? $_POST['adresse']:'';
    $email     = isset($_POST['email'])     ? $_POST['email']:'';
    $password  = isset($_POST['password'])  ? $_POST['password']:'';
    
    $matiere   = isset($_POST['matiere'])   ? $_POST['matiere']:'';
    $niveau    = isset($_POST['niveau'])    ? $_POST['niveau']:'';
    $phase     = isset($_POST['phase'])     ? $_POST['phase']:'';
    $lesson    = isset($_POST['lesson'])    ? $_POST['lesson']:'';
    $note      = isset($_POST['note'])      ? $_POST['note']:'';
    $referer   = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '/pages/index.php';

    
    
    $id        = securiser($id);
    
    $prenom    = securiser($_POST['prenom']);
    $nom       = securiser($_POST['nom']);
    $naissance = securiser($_POST['naissance']);
    $sexe      = securiser($_POST['sexe']);
    $adresse   = securiser($_POST['adresse']);
    $email     = securiser($_POST['email']);
    $password  = securiser($_POST['password']);
           
    $matiere   = securiser($matiere);
    $niveau    = securiser($niveau);
    $phase     = securiser($phase);
    $lesson    = securiser($lesson);
    $note      = securiser($note);
    
  /*----------------------------------------------------------------------------------------------*/
    
            
    archiverLesson($id,$matiere,$niveau,$phase,$lesson,$note);
    getAllInfo($lesson);
                
 
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
		function archiverLesson($id,$matiere,$phase,$lesson,$note) {
		    global $db;
		    
		    $sql = "INSERT INTO ".$matiere." (id_client,niveau,phase,lesson,note)
		            VALUES (:id_client,:niveau,:phase,:lesson,:note)";
		           
		    $requete = $db -> prepare($sql);
		    
		    $requete -> bindValue(':id_client', $id,     PDO::PARAM_INT);
		    $requete -> bindValue(':niveau',    $niveau, PDO::PARAM_INT);
		    $requete -> bindValue(':phase',     $phase,  PDO::PARAM_STR);
		    $requete -> bindValue(':lesson',    $lesson, PDO::PARAM_STR);
		    $requete -> bindValue(':note',      $note,   PDO::PARAM_STR);
		    
		    $requete -> execute();
		    $data = $requete -> fetch(PDO::FETCH_ASSOC);
		    
		    return $data;
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
		function getAllInfo($lesson) {
		    global $db;
		    
		    $sql = "SELECT * FROM ".$lesson." WHERE id = :id";
		    
		    $requete = $db -> prepare($sql);
		    $requete -> bindValue(':id', $id, PDO::PARAM_INT);
		    $requete -> execute();
		    $data = $requete-> fetch(PDO::FETCH_ASSOC);
		    
		    return $data;
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
        
?>