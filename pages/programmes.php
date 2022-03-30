<?php
session_start();
if(isset($_SESSION['connected'])){
?>
<!DOCTYPE html>
<html>
<head>
    <title>programmes</title>
 	<meta charset="utf-8" name="viewport" content="width=device-width, initial- scale=1"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/programmes.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
</head>
<body>
  
    <div class="container">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div id="reception" align="center">
                
                <p>ߖߐ ߦߴߌ ߡߊ߬ ߞߟߊߓߎߡߊ</p>
                
                <p id="id_user" style="display:none"><?= $_SESSION['id']; ?></p>
                <p id="situations_container" style="display:none"></p>
                <h2><?= $_SESSION['prenom']." ".$_SESSION['nom'];  ?></h2>
                        
              <!----------------------------------------------------------------------------------------------------->  
                <div id="user_identity" style="display: none">
                    
                    <p id="user_id"       ><?= $_SESSION['id'       ]; ?></p>
                    <p id="user_prenom"   ><?= $_SESSION['prenom'   ]; ?></p>
                    <p id="user_nom"      ><?= $_SESSION['nom'      ]; ?></p>
                    <p id="user_naissance"><?= $_SESSION['naissance']; ?></p>
                    <p id="user_sexe"     ><?= $_SESSION['sexe'     ]; ?></p>
                    <p id="user_adresse"  ><?= $_SESSION['adresse'  ]; ?></p>
                    <p id="user_email"    ><?= $_SESSION['email'    ]; ?></p>
                    
                </div>  
              <!----------------------------------------------------------------------------------------------------->  
                <div id="user_info" style="display: none">
                    <div id="identification"></div>
                    <div id="lessons">
                        <div id="lesson1"></div>
                        <div id="lesson2"></div>
                        <div id="lesson3"></div>
                        <div id="lesson4"></div>
                    </div>
                </div>
              <!----------------------------------------------------------------------------------------------------->  
                <p>ߌ ߣߌ߫ ߛߣߍ߫ ߞߙߎ߬ߞߊ߲߫ ߘߋ߰ߘߊ ߟߊ߫߸ ߒߞߏ ߟߐ߲ߠߌ ߛߌߟߊ߫ ߛߎߘߎ߲߸ ߓߟߐߟߐ ߛߌߟߊ ߝߍ߬.</p>
                <p>ߞߏ߫ ߛߎ ߦߋ߫ ߞߏ߬ ߟߊ߫ ߛߐ߭ ߟߋ߬ ߡߊ߬߸ ߒ߬ߓߊ߬߹ ߌ ߖߌߖߊ߬ ߸ ߌ ߦߋ߫ ߥߟߊ߬ߘߊ ߕߊ߬ ߌߞߘߐ߫߹ ߦߊ߲߬.</p>
                <p id="affiche_programme">ߥߟߊ߬ߘߊ ߟߎ߬</p>
               
            </div>   
            <div id="programmes_container" class="centerH" align="right"></div>
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>
    
    <script src="http://localhost:8080/kouroukan/js/class.js"></script>
    <script src="http://localhost:8080/kouroukan/js/caracteres.js"></script>
    <script src="http://localhost:8080/kouroukan/js/programmes.js"></script>
    
</body>
</html>
<?php
}else{
    header("location:index.php");
}
?>