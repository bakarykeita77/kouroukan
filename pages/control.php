<?php 
	
	require_once ("fonctions/fonctions_php.php");

	global $db;

	$action = isset($_GET['action'])?$_GET['action']:"";

	switch($action){
		case 'ajouter_client':

			$prenom    = $_GET['prenom'];
			$nom       = $_GET['nom'];
			$naissance = $_GET['naissance'];
			$sexe      = $_GET['sexe'];
			$adresse   = $_GET['adresse'];
			$email     = $_GET['email'];
			$password  = $_GET['password'];
			
			ajouterClient($prenom, $nom, $naissance, $sexe, $adresse, $email, $password);

			header("location:/kouroukan/pages/gestion_clients.php");
		 break;
		case 'supprimer_client':
			$id = isset($_GET['id']) ?$_GET['id']:"";
			supprimerClient($id);
			header("location:/kouroukan/pages/gestion_clients.php");
		 break;
		case 'modifier_client':

			$id        = $_GET['id'];
			$prenom    = $_GET['prenom'];
			$nom       = $_GET['nom'];
			$naissance = $_GET['naissance'];
			$sexe      = $_GET['sexe'];
			$adresse   = $_GET['adresse'];
			$email     = $_GET['email'];
			$password  = $_GET['password'];

			modifierClient($id, $prenom, $nom, $naissance, $sexe, $adresse, $email, $password);

			header("location:/kouroukan/pages/gestion_clients.php");
		 break;
		case 'connexion':

			$client_email = $_GET['client_email'];
			$client_password = $_GET['client_password'];

			$ne = nbrEmails();
			$emailsAndPass = getEmailsAndPasswords();
			$db_emails=[];
			for($x=0;$x<$ne;$x++){ $db_emails[$x] = $emailsAndPass[$x]['email']; }
			
			$db_password = passCorrespondant($client_email);

			if(in_array($client_email, $db_emails)  && $client_password===$db_password){
				header("location:/kouroukan/pages/formations.php");
			}else{
				die("Email ou Mot de pass incorrect");
			};
		 break;
		 case 'archiver':
		 	$notes   = $_GET["notes"];
		 	echo $notes;
		 	$n = 'numero, question, reponse, points';

		 	$sql = "INSERT INTO notes($n) VALUES($notes)";
		 	$requette = $db->exec($sql);

		 	// archiverNotes($numero, $question, $reponse, $points);
			 // header("location:/kouroukan/index.php?page=formations");
		 break;
	 }
 ?>