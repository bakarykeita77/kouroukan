<?php
session_start();
    if(isset($_SESSION['connected'])){
?>
<!DOCTYPE html>
<html>
    <head>
        <title>chiffres</title>
        <meta charset = "UTF-8">
        <link rel="stylesheet" href="css/chiffres.css">
		<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
    </head>
    <body>
        
        <h4 class="lesson_title"><?= $matiere_nom ?> ߥߟߊ߬ߘߊ <?= $default_chapter ?></h4>
        <div class="lesson_entete"></div> 
        <div class="lesson_corps"><table class="table_parlante"></table></div>
        <div class="lesson_pied"></div> 
        
        <audio id="audio"></audio>

        <script src="http://localhost:8080/kouroukan/js/icones.js"></script>
        <script src="http://localhost:8080/kouroukan/js/chiffres.js"></script>
        <script src="http://localhost:8080/kouroukan/js/class.js"></script> 
   
    </body>
</html>
<?php
    }else {
        header("location:formations.php");
    }
?>