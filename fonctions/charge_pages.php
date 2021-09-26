<?php
/*Scanner toutes les pages du dossier 'pages' et 'js' sur cette page dans un tableau $_GET[...]*/
	$pages=scandir('pages');

/*Verifier si le nom de la page réçue via URL (méthode GET) existe  puis s'il n'est pas vide ensuite s'il existe dans le tableau scanné ($-GET[...]) et de le mettre dans une variable pour son utilisation ultérieure*/
	if(isset($_GET['page']) && !empty($_GET['page'])){
		if(in_array($_GET['page'].'.php', $pages)) { $page=$_GET['page']; }else{ $page='connexion'; }
	}else{
		$page='connexion';
	}



	$js = scandir('js');

//	if(in_array($page.'.js',$js)) { include 'js/'.$page.'.js'; }
?>