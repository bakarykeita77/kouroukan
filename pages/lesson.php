<?php
session_start();
if(isset($_SESSION["id"])){
    
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
	
	<link rel="stylesheet" href="/kouroukan/css/lesson.css"/>
	<link rel="stylesheet" href="/kouroukan/css/syllabes.css"/>
	<link rel="stylesheet" href="/kouroukan/css/parametres.css"/>
	<link rel="stylesheet" href="/kouroukan/css/apprentissage.css"/>
	<link rel="stylesheet" href="/kouroukan/css/exercice.css"/>
	<link rel="stylesheet" href="/kouroukan/css/pratiques.css"/>
	<link rel="stylesheet" href="/kouroukan/css/evaluation.css"/>

</head>
<body style="direction:rtl">

    <div class="container">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div class="phases_container">
              <!----------------------------------------------------------------------------------------------------->  
                <div id="donnees_recues_de_prorammes" style="display:none">
                    <p id='matiere_id_container'    ><?= $matiere_id; ?></p>
                    <p id='matiere_index_container' ><?= $matiere_index; ?></p>
                    <p id='matiere_nom_container'   ><?= $matiere_id; ?></p>
                    <p id='niveau_container'        ><?= $niveau; ?></p>
                    <p id='niveau_max_container'    ><?= $niveau_max; ?></p>
                </div>
              <!----------------------------------------------------------------------------------------------------->  
                <div id="images_pratique" style="display:none">
                    <?php 
                        include "http://localhost:8080/kouroukan/pages/image-4-syllabe.php";
                        include "http://localhost:8080/kouroukan/pages/image-3-syllabe.php";
                        include "http://localhost:8080/kouroukan/pages/image-2-syllabe.php";
                        include "http://localhost:8080/kouroukan/pages/image-1-syllabe.php"; 
                    ?>
                </div>
              <!----------------------------------------------------------------------------------------------------->  
                <h4>ߘߋ߰ߟߌ ߞߛߊߞߊ : <span class="niveau_courant"><?= $chiffres[$niveau]; ?></span><span class='rang'></span></h4>
                <h2 class="lesson_title" id="<?= $matiere_id ?>"> <?= $matiere_nom; ?> ߥߟߊ߬ߘߊ  </h2>
                <div class="phases liste_affichage_cascade" align="center"></div>
            </div>
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>

    <div class="course_container">
        
      <!--------------------------------------------------------------------------------------------------------------->
        <span class="fermeture" id="">&times;</span>
      <!--------------------------------------------------------------------------------------------------------------->
	    
      <!--Les éléments de paramètres sont chargés depuis js/parametres.js-->
        <div id="parametres">   
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
                <table id='table2'>
                    <tr>
                        <td><input type='submit' name='submit_btn' value='ߏ߬ ߛߓߍߦߊ߫. ' id='submit_btn'></td>
                    </tr>
                </table>
            </div>

            <div style='display:none'>
                <div id='voyelles_cochees'></div>
                <div id='consonnes_cochees'></div>
                <div id='tedos_coches'></div>
                <div id='tons_coches'></div>
                <div id='nasalisations_cochees'></div>
            </div>
         </div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="apprentissage">
            
            <div class="course_head" id="apprentisssage_head">
                <div class = 'progress_bar' id = "apprentissage_progress_bar">
                    <div class='progress_bonne_reponse_bar'></div>
                </div>
            </div>
            <div class="course_body" id="apprentissage_body"></div>
            <div class="course_foot" id="apprentissage_foot">
                <div class="dialogue_btn" id="apprentissage_dialogue_btn">

                    <div class='play_btn_container'>
                        <span class='play_label'>ߝߐߟߊ߲</span>
                        <span class='play_icon'>&#9664;</span>
                    </div>

                    <div class='stop_btn_container'>
                        <span class='stop_label'>ߘߊ߬ߘߋ߬ߟߊ߲ </span> 
                        <span class='stop_icon'>&#9632;</span>
                    </div>

                    <div class='parametre_btn_container'>
                        <span class='parametre_label'>ߛߏ߯ߙߏߟߊ߲</span>  
                        <span class='parametre_icon'>&#9881;</span>
                    </div>

                </div>
            </div>
            
         </div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="exercice"     >
            
            <div class="course_head" id="exercice_entete">
                <div class='progress_bar' id="exercice_progress_bar">
                    <p class='progress_question_bar'></p>
                    <p class='progress_bonne_reponse_bar'></p>
                </div>
            </div>
            <div class="course_body" id="exercice_corps"></div>   <!--Cette division est chargé par la fonction chargerExercice() dans lesson.js-->
            <div class="course_foot" id="exercice_pied">

            </div>
            
         </div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="pratique"     >
         <!--------------------------------------------------------------------
            La partie pratique de lesson est composée de 3 divisions dont:
            
            1)- pratique_head
            2)- pratique_body
            2)- pratique_foot
         ---------------------------------------------------------------------->
            
            <div id="options_popup">
                <center><h2 id="options_titre">ߓߟߏߦߊߟߌ ߓߏߟߏ߲ ߠߎ߬</h2></center>
                <div id="pratique_head">
                    <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߁ ߡߊ</span>
                    <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߂ ߡߊ</span>
                    <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߃ ߡߊ</span>
                    <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߄ ߡߊ</span>
                </div> 
            </div>
           
         <!--pratique_head---------------------------------------------------->
            <div class="course_head" id="pratique_head">
                <div class='progress_bar' id="pratique_progress_bar">
                    <span class='progress_question_bar'></span>
                    <span class='progress_bonne_reponse_bar'></span>
                </div>
            </div>
          
         <!--pratique_body---------------------------------------------------->
            <div class="course_body" id="pratique_body">
                <div id="pratique_guide">
                    <div id="bulles_container"></div>
                    <p id="signe_egal">&#9183;</p>
                    <p id="cumule_des_caracteres"></p>
                </div>
                <div id="pratiques_images_container">
                    <img src="http://localhost:8080/htdocs/kouroukan/image/ߖߌ߬ߦߊ.jpg" id="pratiques_image" alt="?">
                </div>
                <div id="croix">&#10060;</div>
            </div>
          
         <!--pratique_foot---------------------------------------------------->
            <div class="course_foot" id="pratique_foot">
                <div id="pratique_fiche">
                    <div id="pratique_fiche_head">
                        <span class="th">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</span>
                        <span class="th">ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</span>
                        <span class="th">ߓߙߍ߬ߦߊ</span>
                    </div>
                    <div id="pratique_fiche_body"></div>
                    <div id="pratique_fiche_foot">
                        <div>
                            <span id="label_total_point">ߓߍ߬ߙߍ ߡߎ߬ߡߍ</span>
                            <span id="total_point"></span>
                        </div>
                        <div>
                            <span id="label_pourcentage_point" colspan="2">ߓߍ߬ߙߍ ߗߡߍ߬ߘߐ߬ߦߊ</span>
                            <span id="pourcentage_point"></span>
                        </div>
                    </div>
                </div>
                <div id="message_de_fin_container">
                    <p id="message_de_fin"></p>
                    <div id="message_btn_container"> <button id="message_btn_1"></button><button id="message_btn_2"></button> </div>
                </div>
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
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="evaluation"   >

            <div class="course_head" id="evaluation_entete">
                <div class='progress_bar' id="evaluation_progress_bar">
                    <p class='progress_question_bar'></p>
                    <p class='progress_bonne_reponse_bar'></p>
            </div>
            </div>
            <div class="course_body" id="evaluation_corps">

                <div id='teste_container'>
                
                    <p id='reponse'></p>
                    
                    <div id='check_mark_container'>
                        <p id='check_mark'></p>
                        <p id='check_mark_cover'></p>
                    </div>
                    
                    <div id='teste_annexes_container'>
                        <div id='alerte'></div>
                        <div id='autre'></div>
                    </div>

                </div>
            </div>
            <div class="course_foot" id="evaluation_pied">

                <div class="dialogue_btn" id="evaluation_dialogue_btn">
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
                <div class="clavier_container"><?php include "clavier.php"; ?></div>
            </div>

         </div>
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
    
    <script src="http://localhost:8080/kouroukan/js/parametres.js"></script>
    
    <script src="http://localhost:8080/kouroukan/js/alphabet.js"></script>
    <script src="http://localhost:8080/kouroukan/js/syllabes.js"></script>
    <script src="http://localhost:8080/kouroukan/js/tons.js"></script>
    <script src="http://localhost:8080/kouroukan/js/chiffres.js"></script>
    
    <script src="http://localhost:8080/kouroukan/js/apprentissage.js"></script>
    <script src="http://localhost:8080/kouroukan/js/pratiques.js"></script>
    <script src="http://localhost:8080/kouroukan/js/evaluations.js"></script>
    
    <script src="http://localhost:8080/kouroukan/js/lessons.js"></script>
    
</body>
</html>
<?php
   }else { header("location:programmes.php"); }
?>