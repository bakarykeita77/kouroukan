<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>topbar</title>
	<meta charset="utf-8">
    <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/tete-de-page.css"/>
    <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
	<script src="http://localhost:8080/kouroukan/js/jquery-3.3.1.js"></script>
<!--	<script src="http://kit.fontawesome.com/45b3b93014.js" crossorigin="anonymous"></script>    -->
</head>

<body>
    
    <div id="donnees_ajax" style="display:none">
        <div id="profile_clients_bruts"></div>
 	    <div id="profile_testes_bruts"></div>
 	    <div id="profile_testes"></div>
 	    <div id="nbr_teste"></div>
    </div>
    
    <div id="header"><h3 id="nom_ecole">ߞߙߎ߬ߞߊ߲߬</h3></div>
    
	<div id="topbar" class="nav_bar"> 
	    <?php if($_SESSION['id']): ?>
     	<div id="logo"> <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=<?= $_SESSION['id'] ?>" alt="logo"/></div>
        <?php endif ?>
        
     	<div id='profile_menu_container'>

         	    <div id="client_name" style="display: none"><h2><?=$_SESSION['prenom'].' '.$_SESSION['nom'] ?> ߹</h2></div>
         	    <div id="profile_client_id" style="display: none"><?=$_SESSION['id']; ?></div>
         	    
         	    <div class="profile_menu">
             	    
             	    <div class="profile_menu_head" id="profile_utilisateur_btn">Profile</div>
 	                <div class="profile_menu_body" id='profile_utilisateur_container'>
 	                    <div id="profile_utilisateur_renseignements"></div>
 	                    <div id="profile_utilisateur_image_container" align='center'>
 	                        <img height="100%" src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=<?= $_SESSION['id'] ?>" alt="logo"/>
 	                        <div id='modifier_avatar' style="background-color:#fff; border:1px solid #ccc; overflow:hidden; position:absolute; right:50%; transform:translateX(50%); bottom:0; border-radius:6px; font-size:10px; padding:4px">ߖߌ߬ߦߊ߬ߓߍ ߡߊߝߊ߬ߟߋ߲߬</div>
 	                    </div>
 	                </div>
             	    
             	    <div class="profile_menu_head" id="profile_teste_btn">ߘߋ߰ߟߌ ߗߏߦߊ</div>
             	    <div class="profile_menu_body" id="profile_teste_menu">
             	        <div align="center" id= "profile_menu_body_content">
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
 	                
             	    <div class="profile_menu_head"><a href="deconnexion.php">Deconnexion</a></div>
         	    </div>
     	</div>
 	    <div id="profile_teste"></div>
 	    <div id="profile_teste_point"></div>

		<div id = "nav">
			<ul id="menu_deroulant">
			    <li class="hover_anim" id="home"     ><i class="fas fa-home"></i></i><a href = "http://localhost:8080/kouroukan/index.php">    ߝߊ߲ߓߊ </a></li>
			    <li class="hover_anim" id="alphabet" ><a href = "http://localhost:8080/kouroukan/pages/programmes.php"> ߥߟߊ߬ߘߊ ߟߎ߬ </a></li>
			    <li class="hover_anim" id="syllabe"  ><a href = "">ߛߊ߲߬ߓߊ߬ߕߐ߮ </a></li>
 	     	</ul>

			<ul class = "nav_menu">
				<li id="menu"  > &#9776;   </li>
				<li id="livres"> &#xf02d; </li>
			</ul>
		</div>
	</div>

    <script src="http://localhost:8080/kouroukan/fonctions.js"></script>
    <script src="http://localhost:8080/kouroukan/js/caracteres.js"></script>
    <script src="http://localhost:8080/kouroukan/js/class.js"></script>
    <script src="http://localhost:8080/kouroukan/js/profile.js"></script>
    <script src="http://localhost:8080/kouroukan/js/tete-de-page.js"></script>

</body>
</html>