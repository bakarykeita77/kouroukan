<!-- Début de l'entete de la page ------------------------------------------------------------------------------------>
	<?php $avatar_id = isset($_SESSION['id']) ? $_SESSION['id']:1; ?>
	
	<script src="/kouroukan/js/jquery-3.3.1.js"></script>
	<script src="/kouroukan/fonctions.js"></script>
	<script src="/kouroukan/js/icones.js"></script>
	<script src="/kouroukan/js/class.js"></script>	
	<script src="/kouroukan/js/caracteres.js"></script>
	
	<?php include("fonctions.php"); ?>  
	<div id="tete_de_page_container">
		<h3 id="header">ߞߙߎ߬ߞߊ߲߬</h3>
		<div id="topbar">
			
			<div id="logo"> <img src="/kouroukan/pages/get-avatar.php?client_id=<?= $avatar_id ?>" alt="avatar"/></div>
			
			<div id='profile_menu_container'>

					<div id="client_name" style="display: none"><h2><?=$_SESSION['prenom'].' '.$_SESSION['nom'] ?> ߹</h2></div>
					<div id="profile_client_id" style="display: none"><?=$_SESSION['id']; ?></div>
				
					<div class="profile_menu">
						
						<div class="profile_menu_head" id="profile_utilisateur_btn">Profile</div>
						<div class="profile_menu_body" id='profile_utilisateur_container'>
							<div id="profile_utilisateur_renseignements">
							<!-- 						
								<div> <span>ߕߐ߮ </span>    <span id="profile_prenom"   ><?=$_SESSION['prenom'];?></span></div>
								<div> <span>ߖߊ߬ߡߎ߲ </span>   <span id="profile_nom"      ><?=$_SESSION['nom'];?></span></div>
								<div> <span>ߡߐߦߌߛߊ߲ </span> <span id="profile_naissance"><?=$_SESSION['naissance'];?></span></div>
								<div> <span>ߖߊ߲߭ </span>     <span id="profile_sexe"     ><?=$_SESSION['sexe'];?></span></div>
								<div> <span>ߛߊ߲߬ߓߊ߬ߕߐ߮ </span> <span id="profile_adresse"  ><?=$_SESSION['adresse'];?></span></div>
								<div> <table><tr><td><span>Mail</span></td><td><span id="profile_mail"><?=$_SESSION['email'];?></span></td></tr></table></div>
								-->
							</div>
							<div id="profile_utilisateur_image_container" align='center'>
								<img height="100%" src="/kouroukan/pages/get-avatar.php?client_id=<?= $_SESSION['id'] ?>" alt="logo"/>
								<div id='modifier_avatar'>ߖߌ߬ߦߊ߬ߓߍ ߡߊߝߊ߬ߟߋ߲߬</div>
							</div>
						</div>
						
						<div class="profile_menu_head" id="profile_teste_btn">ߘߋ߰ߟߌ ߗߏߦߊ</div>
						<div class="profile_menu_body" id="profile_teste_menu">
							<div id= "profile_menu_body_content">
								<div style="width:48%; float:right">
									<h4  id="titre_des_matieres_apprises" style="margin:4px 0">ߥߟߊ߬ߘߊ߫ ߘߋ߰ߣߍ߲ ߠߎ߬</h4>
									<div id="liste_des_matieres_apprises"></div>
								</div>
								<div style="width:48%; float:left">
									<h4  id="titre_des_matieres_a_apprendre" style="margin:4px 0">ߥߟߊ߬ߘߊ߫ ߘߋ߰ߕߊ ߟߎ߬</h4>
									<div id="liste_des_matieres_a_apprendre"></div>
								</div>
							</div>
						</div>
						
						<div class="profile_menu_head"><a href="deconnexion.php">ߌ ߜߊ߲߬ߞߎ߲߬ߣߍ߲߬ ߓߐ߫</a></div>
					</div>
			</div>
			<div id="profile_teste"></div>
			<div id="profile_teste_point"></div>

			<div id = "nav">
				<div id="menu_deroulant">
					<ul>
						<li class="hover_anim" id="home"     ><a href = "/kouroukan/index.php">ߝߊ߲ߓߊ </a></li>
						<li class="hover_anim" id="programme"><a href = "/kouroukan/pages/programmes.php"> ߢߍߥߟߊ </a></li>
						<li class="hover_anim" id="blog"     ><a href = "/kouroukan/pages/blog.php"> ߞߊ߬ߙߊ߲߬ߜߍ </a></li>
						<li class="hover_anim" id="contact"  ><a href = "/kouroukan/pages/contact.php">ߛߊ߲߬ߓߊ߬ߕߐ߮ </a></li>
					</ul>
				</div>
				
				<div id="menu_non_deroulant">
					<ul>
						<li id="menu_menu">Menu</li>
						<li id="menu_board"><a href="/kouroukan/board.php">ߥߟߊ߬ߓߊ</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<script src="/kouroukan/js/tete-de-page.js"></script>
	<script src="/kouroukan/js/profile.js"></script>
<!-- Fin de l'entete de la page ------------------------------------------------------------------------------------->