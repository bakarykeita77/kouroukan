<?php

/* Une fois la connexion à la base de données établie, on selectionne toute les données  qui s'y trouve, à l'aide de la demande SQL placée dans une variable que j'ai nommé $sql */
	$sql="SELECT * FROM users";

/* Ces données sont ensuite récupérées dans un variable tableau, que j'ai nommé $donnees, pour etre afficher au besoin */
	$tous_les_donnees=$bd->query($sql);
	$donnees=$tous_les_donnees->fetchALL(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
	<title>users</title>
	<link rel="stylesheet" type="text/css" href="http://localhost:8080/kouroukan/cs/users.css">
	<meta charset="utf-8">

	<style type="text/css">
		<?php include 'http://localhost:8080/kouroukan/css/users.css'; ?>
	</style>
</head>

<body>

	<div id="cadre" class="bc_a center">

		<table cellpadding="5px" class="center bc_a" id="table">

			<tr><td colspan='7' class="bc_a"><h1 class="bc_e decor">Liste des Utilisateurs inscrits</h1></td>		
			</tr>

			<tr class="text_left c_white bc_lightblue"> 
				<th>Id</th> 
				<th>Prénom</th> 
				<th>Nom</th> 
				<th>E-mail</th> 
				<th>Mot de passe</th> 
				<th>Téléphone</th> 
				<th>Image</th> 
			</tr>

			<?php foreach($donnees as $donnee):?>

			<tr class="c_white bc_black">
				<td style="text-align:right"><?= $donnee['id_users'] ?></td> 
				<td><?= $donnee['prenom'    ] ?></td> 
				<td><?= $donnee['nom'          ] ?></td> 
				<td><?= $donnee['mail'          ] ?></td> 
				<td><?= $donnee['pass'         ] ?></td> 
				<td><?= $donnee['telephone'] ?></td> 
				<td><img src="<?= $donnee['image'] ?>" height="40px"/></td> 

			</tr>

			<?php endforeach ?>

		</table>
	</div>

</body>
</html>