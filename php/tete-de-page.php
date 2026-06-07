<!-- Début de l'entete de la page -->
<?php
	if(file_exists("../css/tete-de-page.css")) {
?>
	<link rel="stylesheet" href="../css_fa/all.css"/>
	<link rel="stylesheet" href="../css/class.css"/>
	<link rel="stylesheet" href="../css/tete-de-page.css"/>
	<link rel="stylesheet" href="../css/resultat.css"/>
	
	<script src="../jquery-3.3.1.js"></script>
	<script src="../fonctions.js"></script>
	<script src="../js/icones.js"></script>
	<script src="../js/caracteres.js"></script>
	
	<?php if(isset($_SESSION["id_client"])) { ?>
		<div id="tete_de_page_container">
			<div id="topbar">
				<div id="logo"> <img src="get-avatar.php?client_id=<?= $_SESSION["id_client"]; ?>" alt=<?= $_SESSION["prenom"]; ?>/></div>
				
				<div id='profile_menu_container'>

					<div id="client_name" style="display: none"><h2><?= $_SESSION['prenom'].' '.$_SESSION['nom']; ?> ߹</h2></div>
					<div id="profile_client_id" style="display: none"><?= $_SESSION["id_client"]; ?></div>
				
					<div class="profile_menu">
						
						<div class="profile_menu_head" id="profile_utilisateur_btn">Profile</div>
						<div class="profile_menu_body" id='profile_utilisateur_container'>
							<div id="profile_utilisateur_image_container">
								<img src="get-avatar.php?client_id=<?= $_SESSION["id_client"] ?>" alt="logo"/>
								<div id='modifier_avatar'>ߖߌ߬ߦߊ߬ߓߍ ߡߊߝߊ߬ߟߋ߲߬</div>  <!--Voir la fonction profileUtilisateurModificationAvatar() dans js/profile.js-->
							</div>
							<div id="profile_utilisateur_renseignements">
								<div> <span>ߕߐ߮ </span>    <span id="profile_prenom"   ><?=$_SESSION['prenom'];?></span></div>
								<div> <span>ߖߊ߬ߡߎ߲ </span>   <span id="profile_nom"      ><?=$_SESSION['nom'];?></span></div>
								<div> <span>ߡߐߦߌߛߊ߲ </span> <span id="profile_naissance"><?=$_SESSION['naissance'];?></span></div>
								<div> <span>ߖߊ߲߭ </span>     <span id="profile_sexe"     ><?=$_SESSION['sexe'];?></span></div>
								<div> <span>ߛߊ߲߬ߓߊ߬ߕߐ߮ </span> <span id="profile_adresse"  ><?=$_SESSION['adresse'];?></span></div>
								<div> <table><tr><td><span>Mail</span></td><td><span id="profile_mail"><?=$_SESSION['email'];?></span></td></tr></table></div>
							</div>
						</div>
						
						<div class="profile_menu_head" id="profile_teste_btn">ߘߋ߰ߟߌ ߗߏߦߊ</div>
						<div class="profile_menu_body" id="profile_teste_menu">
							<div id= "profile_menu_body_content">
								<div>
									<h4  id="titre_des_matieres_apprises" style="margin:4px 0">ߥߟߊ߬ߘߊ߫ ߘߋ߰ߣߍ߲ ߠߎ߬</h4>
									<div id="liste_des_matieres_apprises"></div>
								</div>
								<div>
									<h4  id="titre_des_matieres_a_apprendre" style="margin:4px 0">ߥߟߊ߬ߘߊ߫ ߘߋ߰ߕߊ ߟߎ߬</h4>
									<div id="liste_des_matieres_a_apprendre"></div>
								</div>
							</div>

							<div id="afficheur_du_resultat">ߦߊ߲߬ ߘߌ߲߯ ߞߵߊ߬ ߥߟߊߥߟߊ߫</div>
						</div>
						
						<div class="profile_menu_head"><a href="../php/deconnexion.php">ߌ ߜߊ߲߬ߞߎ߲߬ߣߍ߲߬ ߓߐ߫</a></div>
					</div>
				</div>

				<div id="profile_resultat">
					<div id="profile_resultat_container">
						<?php include "resultat.php"; ?>
					</div>
				</div>

				<div id = "nav">
					<div id="menu_menu"><i class="fa-solid fa-bars"></i><span>ߝߊ߲ߓߊ</span></div>
					
					<div id="menu_deroulant">
						<ul>
							<li id="home"   ><a href = "../index.php"         ><i class="fa-regular fa-house"       ></i><span>ߝߊ߲ߓߊ  </span></a></li>
							<li id="home"   ><a href = "../php/programmes.php"><i class="fa-solid fa-book-open"     ></i><span>ߥߟߊ߬ߘߊ </span></a></li>
							<li id="blog"   ><a href = "../php/blog.php"      ><i class="fa-regular fa-file-lines"  ></i><span>ߞߊ߬ߙߊ߲߬ߜߍ</span></a></li>
							<li id="contact"><a href = "../php/contact.php"   ><i class="fa-regular fa-address-card"></i><span>ߛߊ߲߬ߓߊ߬ߕߐ߮</span></a></li>
						</ul>
					</div>
					
					<div id="menu_non_deroulant">
						<ul>
							<li id="menu_board"><a href="/kouroukan/php/board.php"><i class="fa-sharp fa-regular fa-keyboard"></i><span>ߥߟߊ߬ߓߊ</span></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	<?php }else{ ?>	
		<div id="tete_de_page_container">
			<div id="topbar">
				<div id = "nav">
					<div id="menu_deroulant">
						<ul>
							<li id="contact"  ><a href = "../php/contact.php"><i class="fa-regular fa-address-card"></i><span>ߛߊ߲߬ߓߊ߬ߕߐ߮</span></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	<?php }; ?>
	
	<script src="../js/tete-de-page.js"></script>
	<script src="../js/profile.js"></script>
<?php
	}else{
?>	
	<link rel="stylesheet" href="css_fa/all.css"/>
	<link rel="stylesheet" href="css/class.css"/>
	<link rel="stylesheet" href="css/tete-de-page.css"/>
	<link rel="stylesheet" href="css/resultat.css"/>

	<script src="jquery-3.3.1.js"></script>
	<script src="fonctions.js"></script>
	<script src="js/icones.js"></script>
	<script src="js/caracteres.js"></script>

	<?php if(isset($_SESSION["id_client"])) { ?>
		<div id="tete_de_page_container">
			<div id="topbar">
				<div id="logo"> <img src="php/get-avatar.php?client_id=<?= $_SESSION["id_client"]; ?>" alt=<?= $_SESSION["prenom"]; ?>/></div>
				
				<div id='profile_menu_container'>

					<div id="client_name"><h2><? =$_SESSION['prenom'].' '.$_SESSION['nom']; ?> ߹</h2></div>
					<div id="profile_client_id" style="display: none"><? =$_SESSION["id_client"]; ?></div>
				
					<div class="profile_menu">
						
						<div class="profile_menu_head" id="profile_utilisateur_btn">Profile</div>
						<div class="profile_menu_body" id='profile_utilisateur_container'>
							<div id="profile_utilisateur_image_container">
								<img src="php/get-avatar.php?client_id=<?= $_SESSION["id_client"] ?>" alt="logo"/>
								<div id='modifier_avatar'>ߖߌ߬ߦߊ߬ߓߍ ߡߊߝߊ߬ߟߋ߲߬</div>  <!--Voir la fonction profileUtilisateurModificationAvatar() dans js/profile.js-->
							</div>
							<div id="profile_utilisateur_renseignements">
								<div> <span>ߕߐ߮ </span>    <span id="profile_prenom"   ><?=$_SESSION['prenom'];?></span></div>
								<div> <span>ߖߊ߬ߡߎ߲ </span>   <span id="profile_nom"      ><?=$_SESSION['nom'];?></span></div>
								<div> <span>ߡߐߦߌߛߊ߲ </span> <span id="profile_naissance"><?=$_SESSION['naissance'];?></span></div>
								<div> <span>ߖߊ߲߭ </span>     <span id="profile_sexe"     ><?=$_SESSION['sexe'];?></span></div>
								<div> <span>ߛߊ߲߬ߓߊ߬ߕߐ߮ </span> <span id="profile_adresse"  ><?=$_SESSION['adresse'];?></span></div>
								<div> <table><tr><td><span>Mail</span></td><td><span id="profile_mail"><?=$_SESSION['email'];?></span></td></tr></table></div>
							</div>
						</div>
						
						<div class="profile_menu_head" id="profile_teste_btn">ߘߋ߰ߟߌ ߗߏߦߊ</div>
						<div class="profile_menu_body" id="profile_teste_menu">
							<div id= "profile_menu_body_content">
								<div>
									<h4  id="titre_des_matieres_apprises" style="margin:4px 0">ߥߟߊ߬ߘߊ߫ ߘߋ߰ߣߍ߲ ߠߎ߬</h4>
									<div id="liste_des_matieres_apprises"></div>
								</div>
								<div>
									<h4  id="titre_des_matieres_a_apprendre" style="margin:4px 0">ߥߟߊ߬ߘߊ߫ ߘߋ߰ߕߊ ߟߎ߬</h4>
									<div id="liste_des_matieres_a_apprendre"></div>
								</div>
							</div>

							<div id="afficheur_du_resultat">ߦߊ߲߬ ߘߌ߲߯ ߞߵߊ߬ ߥߟߊߥߟߊ߫</div>
						</div>
						
						<div class="profile_menu_head"><a href="php/deconnexion.php">ߌ ߜߊ߲߬ߞߎ߲߬ߣߍ߲߬ ߓߐ߫</a></div>
					</div>
				</div>

				<div id="profile_resultat">
					<div id="profile_resultat_container">
						<?php include "resultat.php"; ?>
					</div>
				</div>

				<div id = "nav">
					<div id="menu_menu"><i class="fa-solid fa-bars"></i><span>ߝߊ߲ߓߊ</span></div>
					
					<div id="menu_deroulant">
						<ul>
							<li id="home"   ><a href = "/kouroukan/index.php"         ><i class="fa-regular fa-house"       ></i><span>ߝߊ߲ߓߊ  </span></a></li>
							<li id="home"   ><a href = "/kouroukan/php/programmes.php"><i class="fa-solid fa-book-open"     ></i><span>ߥߟߊ߬ߘߊ </span></a></li>
							<li id="blog"   ><a href = "/kouroukan/php/blog.php"      ><i class="fa-regular fa-file-lines"  ></i><span>ߞߊ߬ߙߊ߲߬ߜߍ</span></a></li>
							<li id="contact"><a href = "/kouroukan/php/contact.php"   ><i class="fa-regular fa-address-card"></i><span>ߛߊ߲߬ߓߊ߬ߕߐ߮</span></a></li>
						</ul>
					</div>
					
					<div id="menu_non_deroulant">
						<ul>
							<li id="menu_board"><a href="/kouroukan/php/board.php"><i class="fa-sharp fa-regular fa-keyboard"></i><span>ߥߟߊ߬ߓߊ</span></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	<?php }else{ ?>	
		<div id="tete_de_page_container">
			<div id="topbar">
				<div id = "nav">
					<div id="menu_deroulant">
						<ul>
							<li id="contact"><a href = "/kouroukan/php/contact.php"><i class="fa-regular fa-address-card"></i><span>ߛߊ߲߬ߓߊ߬ߕߐ߮</span></a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	<?php }; ?>

	<script src="js/tete-de-page.js"></script>
	<script src="js/profile.js"></script>
<?php
	}
?>

<!-- Fin de l'entete de la page -->