<?php
session_start();
if(isset($_SESSION['connected'])){
    
    $matiere_id             = $_GET['matiere_id'];
    $matiere_index          = $_GET['matiere_index'];
    $matiere_nom            = $_GET['matiere_nom'];
    $niveau                 = $_GET['niveau'];
    $niveau_max             = $_GET['niveau_max'];
    $phases_etudiees        = $_GET['phases_etudiees'];
    $resume_brut_des_etudes = $_GET['resume_brut_des_etudes'];

    $chiffres = ['߀','߁','߂','߃','߄','߅','߆','߇','߈','߉'];

?>

<!DOCTYPE html>
<html>
<head>
    <title>lesson</title>
 	<meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/lesson.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/syllabes.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/parametres.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/pratiques.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/evaluation.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>

    <script src="http://localhost:8080/kouroukan/js/jquery-3.3.1.js"></script>
    <script src="http://localhost:8080/kouroukan/js/html2canvas.js"></script>
    <script src="http://localhost:8080/kouroukan/js/icones.js"></script>
    <script src="http://localhost:8080/kouroukan/js/caracteres.js"></script>
    <script src="http://localhost:8080/kouroukan/js/class.js"></script>
</head>
<body style="direction:rtl">

    <div class="container">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div class="phases_container centerH" align="right">
              <!----------------------------------------------------------------------------------------------------->  
                <div id="donnees_recues_de_prorammes" style="display:none">
                    
                    <p id='matiere_id_container'    ><?= $matiere_id; ?></p>
                    <p id='matiere_index_container' ><?= $matiere_index; ?></p>
                    <p id='matiere_nom_container'   ><?= $matiere_id; ?></p>
                    <p id='niveau_container'        ><?= $niveau; ?></p>
                    <p id='niveau_max_container'    ><?= $niveau_max; ?></p>
                    <p id='resume_brut_des_etudes_container' ><?= $resume_brut_des_etudes; ?></p>
                    
                </div>
              <!----------------------------------------------------------------------------------------------------->  
                <h4>ߘߋ߰ߟߌ ߞߛߊߞߊ : <span class="niveau_courant"><?= $chiffres[$niveau+1]; ?><span class='rang'></span></h4>
                <h2 class="lesson_title" id="<?= $matiere_id ?>"> <?= $matiere_nom; ?> ߥߟߊ߬ߘߊ  </h2>
                <div class="phases liste_affichage_cascade" align="center"></div>
            </div>
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>

    <div class="course_container">
        
      <!-------------------------------------------------------------------->
        <span class="fermeture" id="course_fermeture">&times;</span>
      <!-------------------------------------------------------------------->
	    <div id="parametres">   <!--Les éléments de paramètres sont chargés depuis js/parametres.js-->
            <div id='lesson_parametres_glissiere'>
                <table id='table1'>
                    <tr id='tr11'>
                        <td id='consonnes_checker'></td>
                        <td id='tedo_checker'></td>
                        <td id='voyelles_checker'></td>
                        <td id='tons_checker'></td>
                        <td id='nasalisation_checker'></td>
                    </tr>
                </table>
                <table id='table2'><tr><td><input type='submit' name='submit_btn' value='ߏ߬ ߛߓߍߦߊ߫. ' id='submit_btn'></td></tr></table>
            </div>

            <div style='display:none'>
                <div id='voyelles_cochees'></div>
                <div id='consonnes_cochees'></div>
                <div id='tedos_coches'></div>
                <div id='tons_coches'></div>
                <div id='nasalisations_cochees'></div>
            </div>
        </div>
      <!-------------------------------------------------------------------->
        <div class="course" id="apprentissage" align="center">
            
            <div class="course_head" id="apprentissage_entete"></div>
            <div class="course_body" id="apprentissage_corps"></div>
            <div class='lesson_progress_bar'>
                <span class='lesson_progress_question_bar'></span>
                <span class='lesson_progress_bonne_reponse_bar'></span>
            </div>
            
        </div>
      <!-------------------------------------------------------------------->
        <div class="course" id="exercice" align="center">
            
            <div class="course_head" id="exercice_entete"></div>
            <div class="course_body" id="exercice_corps"></div>
            <div class='lesson_progress_bar'>
                <span class='lesson_progress_question_bar'></span>
                <span class='lesson_progress_bonne_reponse_bar'></span>
            </div>
            
        </div>
      <!-------------------------------------------------------------------->
        <div class="course" id="pratique" align="center">
         <!--------------------------------------------------------------------
            La partie pratique de lesson est composée de 3 divisions dont:
            
            1)- pratique_head
            2)- pratique_body
            2)- pratique_foot
         ---------------------------------------------------------------------->
            
          <!--pratique_head---------------------------------------------------->
            <div id="pratique_head">
                <span>ߜߋ߲߬ ߁ ߡߊ</span>
                <span>ߜߋ߲߬ ߂ ߡߊ</span>
                <span>ߜߋ߲߬ ߃ ߡߊ</span>
                <span>ߜߋ߲߬ ߄ ߡߊ</span>
            </div> 
            
          <!--pratique_body---------------------------------------------------->
            <div class="course_body" id="pratique_body">
            
                <div id="pratiques_demo_container" align="center">
                    <div id="pratique_guide">
                        <div id="bulles_container"></div>
                        <p id="signe_egal">&#9183;</p>
                        <p id="cumule_des_caracteres"></p>
                    </div>
                    <div id="pratiques_images_container" align="center">
                        <img src="" id="pratiques_image" alt="?">
                        <div id="croix">&#10060;</div>
                    </div>
                </div>
                <div id="pratiques_reponse_container">
                    <div id="table_1_cadre">
                        <table id="table_1" border=1></table>
                    </div>
                </div>
                <div id="message_de_fin_container">
                    <p id="message_de_fin"></p>
                    <div id="message_btn_container"> <button id="message_btn_1"></button><button id="message_btn_2"></button> </div>
                </div>
                
            </div>
            
          <!--pratique_foot---------------------------------------------------->
            <div id="pratique_foot">
                <div class='progress_bar'><span class='progress_question_bar'></span><span class='progress_bonne_reponse_bar'></span></div>
                <div id="dialogue_btn">
    
                    <div class="btn question_btn">
                        <span class="question_label">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</span>
                        <span class="question_total"></span> :
                        <span class="question_ordre"></span>
                        <span class="question_action"></span>
                        <span class="question_icon"></span>
                    </div>
    
                    <div class="btn repetition_btn">
                        <span class="repetition_label">ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫</span>
                        <span class="repetition_icon"></span>
                    </div>
    
                    <div class="btn correction_btn">
                        <span class="correction_label">ߏ߬ ߛߊߞߍ߫</span>
                        <span class="correction_icon"></span>
                    </div>
                </div>
            
                <div class="clavier_container" id="clavier_pratique"><?php include "clavier.php"; ?></div>
            </div>
        </div>
      <!-------------------------------------------------------------------->
        <div class="course" id="evaluation" align="center">
            <div class="course_head" id="evaluation_entete">

                <div class="question_btn">
                    <span class="question_label"></span>
                    <span class="question_total"></span> :
                    <span class="question_ordre"></span>
                    <span class="question_action"></span>
                    <span class="question_icon"></span>
                </div>

                <div class="repetition_btn">
                    <span class="repetition_label">ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫</span>
                    <span class="repetition_icon"></span>
                </div>

                <div class="correction_btn">
                    <span class="correction_label">ߏ߬ ߛߊߞߍ߫</span>
                    <span class="correction_icon"></span>
                </div>
            </div>
            <div class="course_body" id="evaluation_corps">

                <div id='teste_container' align='center'>
                    <div id='teste_content'>
                        <div id='reponse_container'><p id='reponse'></p></div>
                        <div id='check_mark_container'>
                            <p id='check_mark'></p>
                            <p id='check_mark_cover'></p>
                        </div>
                        <div id='cross_container'><p id=cross></p></div>
                    </div>

                    <div id='teste_annexes_container'>
                        <div id='alerte'></div>
                        <div id='autre'></div>
                    </div>

                </div>
            </div>
            <div class='progress_bar'><span class='progress_question_bar'></span><span class='progress_bonne_reponse_bar'></span></div>

            <div class="clavier_container"><?php include "clavier.php"; ?></div>
        </div>
      <!-------------------------------------------------------------------->
        <form method="POST" action="actions.php" id="lesson_form" style="display:none">
                    
            <input type="number" name="id"       id="id_input"           value="<?= $_SESSION['id']; ?>">
            <input type="text"   name="matiere"  id="matiere_nom_input">
            <input type="number" name="niveau"   id="niveau_input">
            <input type="text"   name="phase"    id="phase_input">
            <input type="text"   name="lesson"   id="lesson_input">
            <input type="number" name="note"     id="note_input">
            <input type="submit" id="submit_btn" value="Envoyer">
        </form>
      <!-------------------------------------------------------------------->
        <p class='hand'> &#128070;&#127999; </p>
      <!-------------------------------------------------------------------->
    </div>

    <audio id="audio"></audio>
    
    <script src="http://localhost:8080/kouroukan/fonctions.js"></script>
    <script src="http://localhost:8080/kouroukan/js/lessons.js"></script>
    <script src="http://localhost:8080/kouroukan/js/parametres.js"></script>
    <script src="http://localhost:8080/kouroukan/js/alphabet.js"></script>
    <script src="http://localhost:8080/kouroukan/js/syllabes.js"></script>
    <script src="http://localhost:8080/kouroukan/js/tons.js"></script>
    <script src="http://localhost:8080/kouroukan/js/chiffres.js"></script>
    <script src="http://localhost:8080/kouroukan/js/apprentissage.js"></script>
    <script src="http://localhost:8080/kouroukan/js/exercises.js"></script>
    <script src="http://localhost:8080/kouroukan/js/pratiques.js"></script>
    <script src="http://localhost:8080/kouroukan/js/evaluations.js"></script>
    
</body>
</html>
<?php
   }else { header("location:programmes.php"); }
?>
?>