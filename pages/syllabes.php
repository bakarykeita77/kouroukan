<?php
session_start();
    if(isset($_SESSION['connected'])){
?>
<!DOCTYPE html>
<html>
    <head>
        <title>syllabes</title>
 	    <meta charset="utf-8" name="viewport"/>
        <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/syllabes.css">
    </head>
    <body>
        
        <p id='niveau' style='display:none'><?= $niveau ?></p>
        <h1>ߞߊ߬ߙߊ߲ ߞߛߊߞߊ : <span><?= $chiffres[$niveau] ?></span></h1>
        
        <h2 class="lesson_title" id="<?= $matiere_id ?>"> <?= $matiere_nom ?> </h2>
        <div class="phases"></div>
        
        <div class="course_container" id="syllabes_lesson">
            <span class="fermeture">&times;</span>
            
            <div class="course" id="apprentissage">
                <div class="course_head" id="syllabes_entete"></div> 
                <div class="course_body" id='syllabes_corps'></div>
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

    </body>
</html>

<?php
    }else {
        header("location:formations.php");
    }
?>