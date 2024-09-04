<?php header('Content-Type: text/html; charset=utf-8');
session_start();

if(isset($_SESSION["id"])) {
    $matiere_id      = $_GET['matiere_id'];
    $matiere_index   = $_GET['matiere_index'];
    $matiere_nom     = $_GET['matiere_nom'];
    $niveau          = $_GET['niveau'];
    $niveau_max      = $_GET['niveau_max'];
    $phases_etudiees = ((integer)$matiere_index > 0) ? $_GET['phases_etudiees'] : "";
    $lesson_option   = ((integer)$niveau <= 2) ? $_GET['lesson_option'] : 0;

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
                      
        <link rel="stylesheet" href="../css/alphabet.css"/>
        <link rel="stylesheet" href="../css/apprentissage.css"/>
        <link rel="stylesheet" href="../css/exercice.css"/>
        <link rel="stylesheet" href="../css/evaluation.css"/>

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
                    <p id='lesson_option'           ><?= $lesson_option; ?></p>
                </div>

               <!---------------------------------------------------------------------------------------------------------

               Le titre de la page de lessons -->  
                <h4>ߘߋ߰ߟߌ ߞߛߊߞߊ <span class="niveau_courant"><?= $chiffres[(integer)$niveau]; ?></span><span class='rang'></span> :</h4>  
                <h1 class="lesson_title" id="<?= $matiere_id; ?>"> <?= $matiere_nom; ?> ߥߟߊ߬ߘߊ  </h1> 

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
            

            <div class="course">  
              
              <!------------------------------------------------------------------------------------------------------------------------------>
                <div id="apprentissage_container">
                    <div id="pre_apprentissage_cover">
                     <!--Course head ---------------------------------------------- -->
                        <div class="course_head" id="apprentissage_head">
                            <div class="notification">
                                <h2 class="notification_titre"></h2>
                                <div class="notification_corps"></div>
                            </div>
                        </div>
                     <!--Course body ---------------------------------------------- -->
                        <div class="course_body" id="apprentissage_body"></div>
                     <!--Course foot ---------------------------------------------- -->
                        <div class="course_foot" id="apprentissage_foot">
                            <div class="dialogue_btn" id="pre_apprentissage_dialogue_btn">
                                
                                <div class = 'progress_bar_integre'>
                                    <div class='progress_bonne_reponse_bar_integre'></div>
                                    <div class='progress_mauvaise_reponse_bar_integre'></div>
                                </div>

                                <div id="pre_apprentissage_btns">
                                    <div>
                                        <p class='titre_de_parti'>
                                            <span>ߞߎߘߎ߲</span>
                                            <span class='cercle' id='afficheur_de_panneau'>+</span>
                                        </p>
                                    </div>
                                </div>
                                    
                                <div id='panneaux'></div>
                                
                                <div id="redirection_btns">
                                    <span class='redirection_btn' id='pre_exercice_bouton'>ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</span>
                                    <span class='redirection_btn' id='pre_evaluation_bouton'>ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫</span> 
                                </div>

                                <div id="apprentissage_dialogue_btn">

                                    <!-- <div class="btns media" id="media_apprentissage">
                                        <div class="media_btns">
                                            <div class='btn'>
                                                <span class='play_icon enrober'>&#9664;</span>
                                                <span class='play_label'>ߝߐߟߊ߲</span>
                                            </div>

                                            <div class='btn'>
                                                <span class='stop_icon enrober'>&#9632;</span>
                                                <span class='stop_label'>ߘߊ߬ߘߋ߬ߟߊ߲ </span> 
                                            </div>
                                        </div>
                                        <div class="btns_label media_label">ߝߊߟߊ߲ߞߏ</div>
                                    </div> -->

                                    <div class="btns parametre" id="parametre_lesson">
                                        <div class="parametres_container" id="parametre_lesson_container"> <?php include("parametre.php"); ?> </div>
                                        <!-- <div class='parametres_btns' id='parametre_lesson_btn'>
                                            <span class='parametre_icon'>&#9881;</span>
                                            <span class='parametre_label'>ߛߏ߯ߙߏߟߊ߲</span>  
                                        </div> -->
                                    </div>

                                    <div class="lesson_suivante" id="redirige_sur_exercice">ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</div>
                                </div>
                            </div>
                        </div>
                     <!--Fin course ----------------------------------------------- -->
                    </div>
                </div>
              <!------------------------------------------------------------------------------------------------------------------------------>
                <div id="exercice_container">
                 <!--Course head ------------------------------------------------------------------ -->
                    <div class="course_head" id="exercice_head">
                        <div class="notification">
                            <h2 class="notification_titre"></h2>
                            <div class="notification_corps"></div>
                        </div>
                    </div>
                 <!--Course body ------------------------------------------------------------------ -->
                    <div id="exercice_body_cadre">
                        <div class="course_body" id="exercice_body"></div>   <!--Cette division est chargé par la fonction chargerExercice() dans exeercice.js-->
                    
                        <!--Course foot ------------------------------------------------------------------ -->
                        <div class="course_foot" id="exercice_foot">
                            <div class="dialogue_btn" id="exercice_dialogue_btn">
                            
                                <div id="exercice_btns">
                                    <div id="exercice_question_btn"></div>
                                    <div id="exercice_repeter_question_btn"></div>
                                    <div id="exercice_correction_btn">ߏ߬ ߛߊߞߍ߫</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              <!------------------------------------------------------------------------------------------------------------------------------>
                <div id="revision_container">
                 <!--Course head ------------------------------------------------------------------ -->
                    <div class="course_head" id="revision_head">
                        <div class="notification">
                            <h2 class="notification_titre"></h2>
                            <div class="notification_corps"></div>
                        </div>
                    </div>
                 <!--Course body ------------------------------------------------------------------ -->
                    <div id="revision_body_cadre">
                        <div class="course_body" id="revision_body"></div>   <!--Cette division est chargé par la fonction chargerExercice() dans exercice.js-->
                    
                        <!--Course foot ------------------------------------------------------------------ -->
                        <div class="course_foot" id="revision_foot">
                            <div class="dialogue_btn" id="revision_dialogue_btn">
                            
                                <div id="revision_btns">
                                    <div id="revision_question_btn"></div>
                                    <div id="revision_repeter_question_btn"></div>
                                    <div id="revision_correction_btn">ߏ߬ ߛߊߞߍ߫</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              <!------------------------------------------------------------------------------------------------------------------------------>
                <div id="evaluation_container">
                 <!--Course head ---------------------------------------------- -->
                    <div class="course_head" id="evaluation_head">
                        <div class="notification">
                            <h2 class="notification_titre"></h2>
                            <div class="notification_corps"></div>
                        </div>
                    </div>
                 <!--Course body ---------------------------------------------- -->
                    <div class="course_body" id="evaluation_body">

                        <div id="evaluation_fiche">
                            <div id="evaluation_fiche_head">
                                <span class="th">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</span>
                                <span class="th">ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</span>
                                <span class="th">ߓߙߍ߬ߦߊ</span>
                            </div>
                            <div id="evaluation_fiche_body"></div>
                            <div id="evaluation_travail_foot">
                                <div>
                                    <span id="label_total_point_d_evaluation">ߓߍ߬ߙߍ ߡߎ߬ߡߍ</span>
                                    <span id="total_point_d_evaluation"></span>
                                </div>
                                <div>
                                    <span id="label_pourcentage_point_d_evaluation" colspan="2">ߓߍ߬ߙߍ ߗߡߍ߬ߘߐ߬ߦߊ</span>
                                    <span id="pourcentage_point_d_evaluation"></span>
                                </div>
                            </div>
                        </div>

                        <div id="evaluation_message_de_fin_container">
                            <p id="evaluation_message_de_fin"></p>
                            <div id="evaluation_message_btn_container"> <button id="message_btn_1"></button><button id="message_btn_2"></button> </div>
                        </div>

                        <div id="message_de_fin_container">
                            <p id="message_de_fin"></p>
                            <div id="message_btn_container"> <button id="message_btn_1"></button><button id="message_btn_2"></button> </div>
                        </div>
                        
                    </div>
                 <!--Course foot ---------------------------------------------- -->
                    <div class="course_foot" id="evaluation_foot">

                        <div id='teste_container'>  
                            <div id="evaluation_reponse_container">
                                <div id='evaluation_reponse'></div>
                                <div class='correcteur' id='correcteur_d_evaluation'>ߖߐ߬ߛߌ߬ߙߊ߲</div>
                            </div>
                        </div>

                        <div class="clavier_container" id="clavier_evaluation"><?php include "clavier.php"; ?></div>

                        <div class="dialogue_btn centrer_parfait" id="evaluation_dialogue_btn">
                            
                            <div class = 'progress_bar_integre'>
                                <div class='progress_bonne_reponse_bar_integre'></div>
                                <div class='progress_mauvaise_reponse_bar_integre'></div>
                            </div>

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

                            <div class="redirection_btns" id="revision_redirection_btns">
                                <div class="redirection_btn_1">ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯</div>
                                <div class="redirection_btn_2">ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߥߴߊ߬ ߡߊ߬</div>
                            </div>
                        </div>

                    </div>
                </div>
              <!------------------------------------------------------------------------------------------------------------------------------>

            </div>

            <script src="../js/apprentissage.js"></script>
            <script src="/kouroukan/js/exercice.js"></script>
            <script src="/kouroukan/js/evaluations.js"></script>

            
            <div class="resultat_container"><?php include("resultat.php"); ?></div>
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
        
        <script src="../js/alphabet.js"></script>
        <script src="../js/syllabe.js"></script>
        <script src="../js/ton.js"></script>
        <script src="../js/chiffre.js"></script>

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

