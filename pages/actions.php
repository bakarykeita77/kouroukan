<?php
    session_start();
    
  /*----------------------------------------------------------------------------------------------*/
    
    require_once("connexionToDB.php");
    global $db;
    
  /*----------------------------------------------------------------------------------------------*/
    
    $id_client = isset($_POST['id'])        ? $_POST['id']:null;
    
    $prenom    = isset($_POST['prenom'])    ? $_POST['prenom']:null;
    $nom       = isset($_POST['nom'])       ? $_POST['nom']:null;
    $naissance = isset($_POST['naissance']) ? $_POST['naissance']:null;
    $sexe      = isset($_POST['sexe'])      ? $_POST['sexe']:null;
    $adresse   = isset($_POST['adresse'])   ? $_POST['adresse']:null;
    $email     = isset($_POST['email'])     ? $_POST['email']:null;
    $pass      = isset($_POST['pass'])      ? $_POST['pass']:null;
    
    $matiere   = isset($_POST['matiere'])   ? $_POST['matiere']:null;
    $niveau    = isset($_POST['niveau'])    ? $_POST['niveau']:null;
    $phase     = isset($_POST['phase'])     ? $_POST['phase']:null;
    $lesson    = isset($_POST['lesson'])    ? $_POST['lesson']:null;
    $note      = isset($_POST['note'])      ? $_POST['note']:null;
    $referer   = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '/pages/index.php';
    
    $id_client = securiser($id_client);
    $id_client = (int) $id_client;
    
    $prenom    = securiser($prenom);
    $nom       = securiser($nom);
    $naissance = securiser($naissance);
    $sexe      = securiser($sexe);
    $adresse   = securiser($adresse);
    $email     = securiser($email);
    $pass      = securiser($pass);
           
    $matiere   = securiser($matiere);
    $niveau    = securiser($niveau);
    $niveau    = (int) $niveau;
    $phase     = securiser($phase);
    $lesson    = securiser($lesson);
    $note      = securiser($note);
    $note      = (int) $note;

  /*----------------------------------------------------------------------------------------------*/

    if($id_client != '' && $matiere != '' && $niveau == '' && $phase == '' && $lesson == '' && $note == '')                 getAllInfo($lesson,$id_client);
    if($id_client != '' && $matiere != '' && $niveau != '' && $phase != '' && $lesson != '' && $note != '')                 archiverLesson($id_client,$matiere,$niveau,$phase,$lesson,$note);              
    if($prenom != '' && $nom != '' && $naissance != '' && $sexe != '' && $adresse != '' && $email != '' && $pass != '')     { addClient($prenom,$nom,$naissance,$sexe,$adresse,$email,$pass); }         
    if($id != '' && $prenom != '' && $nom != '' && $naissance != '' && $sexe != '' && $adresse != '' && $email != '' && $pass != '') modifierClient($id,$prenom,$nom,$naissance,$sexe,$adresse,$email,$pass);           
    if($id_user != '' && $pratique != '')                                                                                   archiverPratique($id_user,$pratique);         
    if($id_client != '' && $matiere != '' && $niveau != '' && $phase != '' && $lesson != '' && $note != '')                 archiverLesson($id_client,$matiere,$niveau,$phase,$lesson,$note);        
    if($numero != '' && $question != '' && $reponse != '' && $points != '')                                                 archiverNotes($numero,$question,$reponse,$points);       
    if($id != '')                                                                                                           getClient($id);       
    if($matiere != '' && $id_client != '')                                                                                  getAllInfo($matiere,$id_client);       
 
  /*----------------------------------------------------------------------------------------------*/
  
        function addClient($prenom,$nom,$naissance,$sexe,$adresse,$email,$pass) {
			global $db;
			
		 /*
		  Voyons si le mail envoye par l'utilisateur n'est pas deja utilis??.
		  Pour cela, on extrait et place tous les emails d??ja enregistr??s de la base de donn??es dans une variable $emails_table.
		 */
            $requette = $db->prepare("SELECT email FROM users");
            $requette->execute();
            $emails = $requette->fetchAll();
            
			$emails_table = [];
            for($i=0;$i<count($emails);$i++) $emails_table[$i] = $emails[$i]['email'];

		 /*On teste la pr??sence de l'email saisi dans la variable $emails_table.
		  *Si oui un message s'affiche pour signaler l'utilisateur que cet email est d??ja utilis??.
		  *Si non le processus d'inscription est engag??.
		 */
            if(in_array($_POST['email'],$emails_table) == false) {
            
    			$sql = "INSERT INTO users(prenom, nom, naissance, sexe, adresse, email, pass)
    					VALUES(:prenom, :nom, :naissance, :sexe, :adresse, :email, :pass)
    			";
    
    			$requette = $db->prepare($sql);
    
    			$requette->bindValue(':prenom',   $prenom,   PDO::PARAM_STR);
    			$requette->bindValue(':nom',      $nom,      PDO::PARAM_STR);
    			$requette->bindValue(':naissance',$naissance,PDO::PARAM_STR);
    			$requette->bindValue(':sexe',     $sexe,     PDO::PARAM_STR);
    			$requette->bindValue(':adresse',  $adresse,  PDO::PARAM_STR);
    			$requette->bindValue(':email',    $email,    PDO::PARAM_STR);
    			$requette->bindValue(':pass',     $pass,     PDO::PARAM_STR);
    
    			$utilisateurs =  $requette->execute();
    			echo("?? ?????? ???????? ????????.");

            }else{ echo("L'email envoye est deja utilise. Essayer un autre"); }
		 }
		function archiverPratique($id_user,$pratique) {
		    global $db;

			$sql = "INSERT INTO pratiques(id_user, pratique) 
					VALUES(:id_user, :pratique)";
			$requette = $db -> prepare($sql);

			$requette->bindValue(':id_user',  $id_user,   PDO::PARAM_INT);
			$requette->bindValue(':pratique', $pratique,  PDO::PARAM_STR);

			$pratiques = $requette->execute();

			return $pratiques;
		 }
		function archiverLesson($id_client,$matiere,$niveau,$phase,$lesson,$note) {
		    global $db;
		    
		    $sql = "INSERT INTO ".$matiere." (id_client,niveau,phase,lesson,note)
		            VALUES (:id_client,:niveau,:phase,:lesson,:note)";
		           
		    $requete = $db -> prepare($sql);
		    
		    $requete -> bindValue(':id_client', $id_client, PDO::PARAM_INT);
		    $requete -> bindValue(':niveau',    $niveau,    PDO::PARAM_INT);
		    $requete -> bindValue(':phase',     $phase,     PDO::PARAM_STR);
		    $requete -> bindValue(':lesson',    $lesson,    PDO::PARAM_STR);
		    $requete -> bindValue(':note',      $note,      PDO::PARAM_INT);
		    
		    $requete -> execute();
		    $data = $requete -> fetchAll(PDO::FETCH_ASSOC);
		    
		    return $data;
		 }
		function archiverNotes($numero, $question, $reponse, $points) {
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
		function getAllClients() {
			global $db;

			$sql = "SELECT * FROM users ORDER BY id DESC LIMIT 12";

			$requette = $db->prepare($sql);
			$requette->execute();
			return $utilisateurs = $requette->fetchAll(PDO::FETCH_ASSOC);
		 }
		function getClient($id) {
			global $db;

			$sql = "SELECT * FROM users WHERE id=:id_client";

			$requette = $db->prepare($sql);
			$requette->bindValue(':id_client',$id_client,PDO::PARAM_INT);
			$requette->execute();
			return $utilisateurs = $requette->fetch(PDO::FETCH_ASSOC);
		 }
		function getAllInfo($matiere,$id_client) {
		    global $db;
		    
		    $sql = "SELECT * FROM ".$matiere." WHERE id_client = :id_client";
		    
		    $requete = $db -> prepare($sql);
		    $requete -> bindValue(':id_client', $id_client, PDO::PARAM_INT);
		    $requete -> execute();
		    $data = $requete-> fetch(PDO::FETCH_ASSOC);
		    
		    return $data;
		 }
		function getEmailsAndPasswords() {
			global $db;

			$sql = "SELECT email, password FROM users";
			$requette = $db->prepare($sql);
			$requette->execute();

			$emailsAndPass = $requette->fetchAll(PDO::FETCH_ASSOC);

			return $emailsAndPass;
		 }
		function modifierClient($id, $prenom, $nom, $naissance, $sexe, $adresse, $email, $pass) {
			global $db;

			$sql = "UPDATE users SET prenom=:prenom, nom=:nom, naissance=:naissance, sexe=:sexe, adresse=:adresse, email=:email, pass=:pass WHERE id=:id";

			$requette = $db->prepare($sql);

			$requette->bindValue(':id',       $id,       PDO::PARAM_INT);
			$requette->bindValue(':prenom',   $prenom,   PDO::PARAM_STR);
			$requette->bindValue(':nom',      $nom,      PDO::PARAM_STR);
			$requette->bindValue(':naissance',$naissance,PDO::PARAM_STR);
			$requette->bindValue(':sexe',     $sexe,     PDO::PARAM_STR);
			$requette->bindValue(':adresse',  $adresse,  PDO::PARAM_STR);
			$requette->bindValue(':email',    $email,    PDO::PARAM_STR);
			$requette->bindValue(':pass',     $pass,     PDO::PARAM_STR);

			$utilisateurs =  $requette->execute();
			return $utilisateurs;
		 }
		function nbrEmails() {
			global $db;

			$sql = "SELECT COUNT(email) FROM users";
			$requette = $db->prepare($sql);
			$requette->execute();
			$mails = $requette->fetchAll(PDO::FETCH_ASSOC);
			$nbr_emails = $mails[0]['COUNT(email)'];

			return $nbr_emails;
		 }
		function passCorrespondant($client_email) {
			global $db;

			$sql = "SELECT password FROM users WHERE email=:email";
			$requette = $db->prepare($sql);
			$requette->bindValue(':email',$client_email,PDO::PARAM_STR);
			$requette->execute();
			$pass_table= $requette->fetchAll(PDO::FETCH_ASSOC);
			$pass_correspondant = $pass_table[0]['password'];

			return $pass_correspondant;
		 }
        function securiser($donnee) {
            $donnee = trim($donnee);
            $donnee = stripslashes($donnee);
            $donnee = strip_tags($donnee);
            
            return $donnee;
         }
		function supprimerClient($id) {
			global $db;

			$sql = "DELETE FROM users WHERE id=:id";

			$requette = $db->prepare($sql);
			$requette->bindValue(':id',   $id,   PDO::PARAM_INT);
			$utilisateurs =  $requette->execute();
			return $utilisateurs;
		 }
        
?>