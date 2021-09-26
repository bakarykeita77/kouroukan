<?php require_once "control.php"; ?>
 
 <html>
 <head>
 	<title>gestion_clients</title>
 	<meta charset="utf-8">
 	<link rel="stylesheet" type="text/css" href="css/gestion_clients.css"/>
 	<style type="text/css">
 		body{
 			display: flex;
 			flex-direction: column;
 			justify-content: center;
 			align-items: center;
 		}
 		#liste_clients tr:nth-child(odd){ background-color: #ddd; }
 		#liste_clients tr:hover{ background-color: #aaa; }

 		.pop{
 			position: absolute;
 			width: 50%;
 			min-height: 100px;
 			border: 1px solid #aaa;
 			background-color: #fff;
 		}
 		#modification_pop{
 			display: none;
 		}
 	</style>
 </head>
 <body>
 	<h1>Gestion des Clients</h1>
 	<table width="80%" cellpadding=6 id="liste_clients">
 		<tr>
 			<th>ID</th>
 			<th>PRENON</th>
 			<th>NON</th>
 			<th>NAISSANCE</th>
 			<th>SEXE</th>
 			<th>ADRESSE</th>
 			<th>EMAIL</th>
 			<th>PASSWORD</th>
 		</tr>
 		 
 			<?php 
 			$utilisateurs = getAllClients();
 			foreach($utilisateurs as $utilisateur): ?>
 				<tr>
 					<td> <?= $utilisateur["id"]        ?> </td>
 					<td> <?= $utilisateur["prenom"]    ?> </td>
 					<td> <?= $utilisateur["nom"]       ?> </td>
 					<td> <?= $utilisateur["naissance"] ?> </td>
 					<td> <?= $utilisateur["sexe"]      ?> </td>
 					<td> <?= $utilisateur["adresse"]   ?> </td>
 					<td> <?= $utilisateur["email"]     ?> </td>
 					<td> <?= $utilisateur["password"]  ?> </td>

 					<td> <a href="edition.php?action=editer_client&id=<?= $utilisateur['id'] ?>" class="modification_btn">Modifier</a> </td>
 					<td> <a href="control.php?action=supprimer_client&id=<?= $utilisateur['id'] ?>" class="suppression_btn">Supprimer</a> </td>
 				</tr>
 			<?php endforeach ?>
 	 </table>

 </body>
 </html>