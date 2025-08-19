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
    </head>
    <body>
        
        <h4 class="lesson_title"><?= $matiere_nom ?> ߥߟߊ߬ߘߊ <?= $default_chapter ?></h4>
        <div class="lesson_entete"></div> 
        <div class="lesson_corps"><table class="table_parlante"></table></div>
        <div class="lesson_pied"></div> 
        
        <audio id="audio"></audio>

        <script src="/kouroukan/js/icones.js"></script>
        <script src="/kouroukan/js/chiffres.js"></script>
   
    </body>
</html>
<?php
    }else {
        header("location:formations.php");
    }
?>