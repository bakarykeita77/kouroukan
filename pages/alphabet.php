<?php
session_start();
    if(isset($_SESSION['connected'])){
?>
<!DOCTYPE html>
<html>
    <head>
        <title>alphabet</title>
 	    <meta charset="utf-8" name="viewport" content="width=device-width, initial- scale=1"/>
        <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/alphabet.css">
  	    <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css">
    </head>
    <body>
        
        <p id='niveau' style='display:none'><?= $niveau ?></p>
        <h1>ߞߊ߬ߙߊ߲ ߞߛߊߞߊ : <span><?= $chiffres[$niveau] ?></span></h1>
        
        <h2 class="lesson_title" id="<?= $matiere_id ?>"> <?= $matiere_nom ?> </h2>
        <div class="phases"></div>
        
        <div class="course_container" id="alphabet_lesson">
            <span class="fermeture">&times;</span>
            
            <div class="course" id="apprentissage">
                <div class="course_head" id="alphabet_entete"></div> 
                <div class="course_body" id='alphabet_corps'></div>
            </div>
            
            <div class="course" id="exercices">
                <div class="course_head" id="exercices_entete"></div> 
                <div class="course_body" id="exercices_corps"></div>
            </div>
            
            <div class="course" id="evaluation">
                <div class="course_head" id="evaluation_entete"></div> 
                <div class="course_body" id="evaluation_corps"></div>
                <div class="clavier"><?php include "clavier.php"; ?></div>
            </div>
        </div>
        <div class="lesson_pied"></div> 
        <audio id="audio"></audio>

        <script src="http://localhost:8080/kouroukan/js/icones.js"></script>
        <script src="http://localhost:8080/kouroukan/js/caracteres.js"></script>
        <script src="http://localhost:8080/kouroukan/js/alphabet.js"></script>
        <script src="http://localhost:8080/kouroukan/js/class.js"></script>
        <script src="http://localhost:8080/kouroukan/fonctions.js"></script>

    </body>
</html>

<?php
    }else {
        header("location:formations.php");
    }
?>