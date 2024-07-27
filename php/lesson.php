<?php header('Content-Type: text/html; charset=utf-8');
session_start();

// Recuperation des données envoyées dans l'url
if(isset($_SESSION["id"])) {
    $matiere_id      = $_GET['matiere_id'];
    $matiere_index   = $_GET['matiere_index'];
    $matiere_nom     = $_GET['matiere_nom'];
    $niveau          = $_GET['niveau'];
    $niveau_max      = $_GET['niveau_max'];
    $phases_etudiees = ($matiere_index > 0) ? $_GET['phases_etudiees'] : "";

    $chiffres = ['߀','߁','߂','߃','߄','߅','߆','߇','߈','߉'];
?>

<!DOCTYPE html>
<html>
    <head>
        <title>lesson</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        
        <link rel="stylesheet" href="../css/tete-de-page.css"/>
        <link rel="stylesheet" href="../css/clavier.css"/>
        <link rel="stylesheet" href="../css/lesson.css"/>
    </head>

    <body style="direction:rtl">
        <div class="container">
            <div class="page_head"><?php require('tete-de-page.php'); ?></div>
            <div class="page_body">
              <!---------------------------------------------------------------------------------------------------------
              
              Pour rendre les données de l'url  disponibles dans lesson.js, placons les dans des elements html avec id déterminé-->  
                <div id="donnees_recues_de_prorammes" style="display:none">
                    <p id='matiere_id_container'    ><?= $matiere_id; ?></p>
                    <p id='matiere_index_container' ><?= $matiere_index; ?></p>
                    <p id='matiere_nom_container'   ><?= $matiere_nom; ?></p>
                    <p id='niveau_container'        ><?= $niveau; ?></p>
                    <p id='niveau_max_container'    ><?= $niveau_max; ?></p>
                </div>

               <!---------------------------------------------------------------------------------------------------------

               Le titre de la page de lessons -->  
                <h4>ߘߋ߰ߟߌ ߞߛߊߞߊ <span class="niveau_courant"><?= $chiffres[(integer)$niveau]; ?></span><span class='rang'></span> :</h4>  
                <h1 class="lesson_title" id="<?= $matiere_id ?>"> <?= $matiere_nom; ?> ߥߟߊ߬ߘߊ  </h1> 

               <!---------------------------------------------------------------------------------------------------------

               Le container des lessons à etudier, qui sera chargé dans lesson.js par la fonction chargerPhases() -->  
                <div class="phases_container"></div>

               <!---------------------------------------------------------------------------------------------------------
               
               Le container des travaux qui trace tous les travaux effectués par l'étudiant -->  
                <div id="travaux_container"><?php include("travaux.php"); ?></div>

            </div>
            <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
        </div>

       <!-- Cette div se superpose sur la div container et contient tous les cours à suivre par l'étudiant -->
        <div class="course_container">
          <!-------------------------------------------------------------------------------------------------------------
            
            Fermetre du cours -->
            <span class="fermeture" id="">&times;</span>
            

          <!-------------------------------------------------------------------------------------------------------------
          
            Ces div contiennent les cours. Chacune d'elle s'affiche au click du nom correspondant au cours dans la div coursse_container -->
            <div class="course" id="apprentissage"> <?php include("apprentissage.php"); ?></div>
            <div class="course" id="exercice">      <?php include("exercice.php");      ?></div>
            <div class="course" id="pratique">      <?php include("pratiques.php");     ?></div>
            <div class="course" id="evaluation">    <?php include("evaluation.php");    ?></div>
            
            <div class="resultat_container">        <?php include("resultat.php"); ?>   </div>
            <div class = 'progress_bar'>
              <div class='progress_bonne_reponse_bar'></div>
              <div class='progress_mauvaise_reponse_bar'></div>
            </div>

          <!-------------------------------------------------------------------------------------------------------------
        
            Cette div envoi les resultats des études à actions.php qui à son tour envoi à la base de données -->
            <form method="POST" action="actions.php" id="lesson_form" style="display:none">
                <input type="number" name="id"       id="id_input" value="<?= $_SESSION['id']; ?>">
                <input type="text"   name="matiere"  id="matiere_nom_input">
                <input type="number" name="niveau"   id="niveau_input">
                <input type="text"   name="phase"    id="phase_input">
                <input type="text"   name="lesson"   id="lesson_input">
                <input type="number" name="note"     id="note_input">
                <input type="submit" id="submit_btn" value="Envoyer">
            </form>
        </div>

        <audio id="audio"></audio>

        
        <script src="../fonctions.js"></script>
        <script src="../js/caracteres.js"></script>
        <script src="../js/clavier.js"></script>

        <script src="../js/travaux.js"></script>
        <script src="../js/lessons.js"></script>

        <script>
          document.write(
            '<script src="http://' +
              (location.host || '${1:localhost}').split(':')[0] +
              ':${2:8080}/livereload.js?snipver=1"></' +
              'script>'
          );
        </script>
    </body>
</html>

<?php
   }else { header("location:programmes.php"); }
?>

