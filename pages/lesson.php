<?php header('Content-Type: text/html; charset=utf-8');
session_start();

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
    
    <link rel="stylesheet" href="/kouroukan/css/tete-de-page.css"/>
	  <link rel="stylesheet" href="/kouroukan/css/lesson.css"/>
	  <link rel="stylesheet" href="/kouroukan/css/syllabes.css"/>

</head>
<body style="direction:rtl">

    <div class="container">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
          <!----------------------------------------------------------------------------------------------------->  
            <div id="donnees_recues_de_prorammes" style="display:none">
                <p id='matiere_id_container'    ><?= $matiere_id; ?></p>
                <p id='matiere_index_container' ><?= $matiere_index; ?></p>
                <p id='matiere_nom_container'   ><?= $matiere_nom; ?></p>
                <p id='niveau_container'        ><?= $niveau; ?></p>
                <p id='niveau_max_container'    ><?= $niveau_max; ?></p>
            </div>
          <!----------------------------------------------------------------------------------------------------->  
            <h4>ߘߋ߰ߟߌ ߞߛߊߞߊ : <span class="niveau_courant"><?= $chiffres[$niveau]; ?></span><span class='rang'></span></h4>
          <!----------------------------------------------------------------------------------------------------->  
            <h1 class="lesson_title" id="<?= $matiere_id ?>"> <?= $matiere_nom; ?> ߥߟߊ߬ߘߊ  </h1>
          <!----------------------------------------------------------------------------------------------------->  
            
            <div class="phases_container"><div class="phases liste_affichage_cascade" id="pratique_phases"></div></div>
            <div id="travaux_container"><?php include("travaux.php"); ?></div>

        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>

    <div class="parametres_container" id="parametre_lesson_container"> <?php include("parametre.php"); ?> </div>
    <div class="course_container">
        
      <!--------------------------------------------------------------------------------------------------------------->
        <span class="fermeture" id="">&times;</span>
      <!--------------------------------------------------------------------------------------------------------------->
	    
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="apprentissage"><?php include("apprentissage.php"); ?></div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="exercice"><?php include("exercice.php"); ?></div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="pratique"><?php include("pratiques.php"); ?></div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="evaluation"><?php include("evaluation.php"); ?></div>
      <!--------------------------------------------------------------------------------------------------------------->
        <form method="POST" action="actions.php" id="lesson_form" style="display:none">
                    
            <input type="number" name="id"       id="id_input" value="<?= $_SESSION['id']; ?>">
            <input type="text"   name="matiere"  id="matiere_nom_input">
            <input type="number" name="niveau"   id="niveau_input">
            <input type="text"   name="phase"    id="phase_input">
            <input type="text"   name="lesson"   id="lesson_input">
            <input type="number" name="note"     id="note_input">
            <input type="submit" id="submit_btn" value="Envoyer">
         </form>
      <!--------------------------------------------------------------------------------------------------------------->
        <p class='hand'> &#128070;&#127999; </p>
      <!--------------------------------------------------------------------------------------------------------------->
    </div>

    <audio id="audio"></audio>



	<script src="/kouroukan/js/syllabes.js"></script>
	<script src="/kouroukan/js/tons.js"></script>
	
    <script src="/kouroukan/js/parametres.js"></script>
    <script src="/kouroukan/class-fonctions.js"></script>

    <script src="/kouroukan/js/lessons.js"></script>
    <script src="/kouroukan/js/alphabet.js"></script>
    
</body>
</html>
<?php
   }else { header("location:programmes.php"); }
?>