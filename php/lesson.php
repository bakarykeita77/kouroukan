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
             <!--Direction-------------------------------------------------------------------------------------------------------------------------->
                <div class="direction">
                 <!--donnees_recues_de_programmes------------------------------------------------------------------------------------------------
                    Pour rendre les données de l'url  disponibles dans lesson.js, placons les dans des elements html avec id déterminé-->  
                    <div id="donnees_recues_de_programmes" style="display:none">
                        <p id='matiere_id_container'    ><?= $matiere_id; ?></p>
                        <p id='matiere_index_container' ><?= $matiere_index; ?></p>
                        <p id='matiere_nom_container'   ><?= $matiere_nom; ?></p>
                        <p id='niveau_container'        ><?= $niveau; ?></p>
                        <p id='niveau_max_container'    ><?= $niveau_max; ?></p>
                        <p id='lesson_option'           ><?= $lesson_option; ?></p>
                    </div>

                 <!--titre de la page de lessons------------------------------------------------------------------------------------------------->
                    <h4 id="niveau_d_etude">ߘߋ߰ߟߌ ߞߛߊߞߊ <span class="niveau_courant"><?= $chiffres[(integer)$niveau]; ?></span><span class='rang'></span> :</h4>  
                    <h1 class="lesson_title" id="<?= $matiere_id; ?>"> <?= $matiere_nom; ?> ߥߟߊ߬ߘߊ  </h1> 

                 <!--phases_container-------------------------------------------------------------------------------------------------------------
                    Le container des lessons à etudier, qui sera chargé dans lesson.js par la fonction chargerPhases() -->  
                    <div class="phases_container"></div>

                 <!--travaux_container------------------------------------------------------------------------------------------------------------
                    Le container des travaux qui trace tous les travaux effectués par l'étudiant -->  
                    <div id="travaux_container"><?php include("travaux.php"); ?></div>
                </div>
             <!--salle_de_classe-------------------------------------------------------------------------------------------------------------------- 
                Cette div se superpose sur la div direction et contient tous les cours à suivre par l'étudiant---------------------------------------->
                <div class="salle_de_classe">
                    
                 <!--Fermetre du cours--------------------------------------------------------------------------------------------------------------->
                    <span class="fermeture" id="">&times;</span>
                    
                 <!--cours--------------------------------------------------------------------------------------------------------------------------->
                    <div class="course">  
                     <!--apprentissage_container----------------------------------------------------------------------------------------------------->
                        <div id="apprentissage_container">
                         <!--Course head ------------------------------------------------------------------ -->
                            <div class="course_head" id="apprentissage_head">
                                <div class="notification" id="apprentissage_notification">
                                    <h2 class="notification_titre" id="apprentissage_notification_titre"></h2> 
                                    <div class="modificateur_de_choix">
                                        <p class="modificateur_de_choix_btn">&#8942;</p>
                                        <div class="modificateur_de_choix_message">
                                            <p>ߘߋ߲߰ߠߌ ߞߍߢߊ ߡߊߝߊ߬ߟߋ߲߬</p>
                                            <div><button id="changer_option_btn">ߊ߬ߥߊ߬</button> <button id="pas_changer_option_btn">ߍ߬ߍ߲߫</button></div>
                                        </div>
                                    </div>
                                    <div class="notification_corps" id="apprentissage_notification_corps"></div>
                                </div>
                            </div>
                         <!--Course body ------------------------------------------------------------------ -->
                            <div class="course_body" id="apprentissage_body"></div>
                         <!--Course foot ------------------------------------------------------------------ -->
                            <div class="course_foot" id="apprentissage_foot">
                                
                                <div class="parametres_container" id="parametre_lesson_container"> <?php include("parametre.php"); ?> </div>
                                <div id='panneaux'></div>
                                <div class="dialogue_btns" id="apprentissage_dialogue_btns"></div>
                                <div class = 'progress_bar' id="apprentissage_progress_bar">
                                    <div class='progress_bonne_reponse_bar'></div>
                                    <div class='progress_mauvaise_reponse_bar'></div>
                                </div>
                                <div class="redirection_btns" id="apprentissage_redirection_btns">
                                    <span class='redirection_btn' id='pre_apprentissage_bouton'></span> 
                                    <span class='redirection_btn' id='continu_sur_exercice_bouton'></span>
                                </div>
                            </div>
                        </div>
                     <!--exercice_container---------------------------------------------------------------------------------------------------------->
                        <div id="exercice_container">
                         <!--Course head ------------------------------------------------------------------ -->
                            <div class="course_head" id="exercice_head">
                                <div class="notification" id="exercice_notification">
                                    <h2 class="notification_titre" id="exercice_notification_titre"></h2>
                                    <div class="notification_corps" id="exercice_notification_corps"></div>
                                </div>
                            </div>
                         <!--Course body ------------------------------------------------------------------ -->
                            <div class="body_cadre" id="exercice_body_cadre">
                                <div class="course_body" id="exercice_body"></div>   <!--Cette division est chargé par la fonction chargerExercice() dans exeercice.js-->
                            
                                <!--Course foot ------------------------------------------------------------------ -->
                                <div class="course_foot" id="exercice_foot">

                                    <div class="dialogue_btns" id="exercice_dialogue_btns">
                                        <div class="question_btn" id="exercice_question_btn"></div>
                                        <div class="repetition_btn" id="exercice_repetition_btn"></div>
                                        <div class="correction_btn" id="exercice_correction_btn">ߏ߬ ߛߊߞߍ߫</div>
                                    </div>
                                </div>
                            </div>

                         <!--Progress boutons ------------------------------------------------------------- -->
                            <div class='progress_bar' id="exercice_progress_bar">
                                <div class='progress_bonne_reponse_bar'></div>
                                <div class='progress_mauvaise_reponse_bar'></div>
                            </div>

                         <!--Redirection boutons ---------------------------------------------------------- -->
                            <div class="redirection_btns" id="exercice_redirection_btns">
                                <span class='redirection_btn' id='reprendre_exercice_bouton'></span>
                                <span class='redirection_btn' id='continu_sur_revision_bouton'></span> 
                            </div>
                        </div>
                     <!--revision_container---------------------------------------------------------------------------------------------------------->
                        <div id="revision_container">
                         <!--Course head ------------------------------------------------------------------ -->
                            <div class="course_head" id="revision_head">
                                <div class="notification" id="revision_notification">
                                    <h2 class="notification_titre" id="revision_notification_titre"></h2>
                                    <div class="notification_corps" id="revision_notification_corps"></div>
                                </div>
                            </div>
                         <!--Course body ------------------------------------------------------------------ -->
                            <div class="body_cadre" id="revision_body_cadre">
                                <div class="course_body" id="revision_body"></div>   <!--Cette division est chargé par la fonction chargerExercice() dans exercice.js-->
                            
                                <!--Course foot ------------------------------------------------------------------ -->
                                <div class="course_foot" id="revision_foot">
                                    <div class="dialogue_btns" id="revision_dialogue_btns">
                                        <div class="question_btn" id="revision_question_btn"></div>
                                        <div class="repetition_btn" id="revision_repetition_btn"></div>
                                        <div class="correction_btn" id="revision_correction_btn">ߏ߬ ߛߊߞߍ߫</div>
                                    </div>
                                </div>
                            </div>

                         <!--Progress boutons ------------------------------------------------------------- -->
                            <div class='progress_bar' id="revision_progress_bar">
                                <div class='progress_bonne_reponse_bar'></div>
                                <div class='progress_mauvaise_reponse_bar'></div>
                            </div>

                         <!--Redirection boutons ---------------------------------------------------------- -->
                            <div class="redirection_btns" id="revision_redirection_btns">
                                <span class='redirection_btn' id='continu_sur_apprentissage_bouton'></span> 
                                <span class='redirection_btn' id='reprendre_revision_bouton'></span>
                                <span class='redirection_btn' id='evaluation_bouton'></span> 
                                <span class='redirection_btn' id='syllabe_bouton'><a href="http://localhost/kouroukan/php/programmes.php">ߜߋ߲߭ ߘߋ߲߰ߠߌ ߘߊߡߌ߬ߘߊ߬</a></span> 
                            </div>
                        </div>
                     <!--evaluation_container-------------------------------------------------------------------------------------------------------->
                        <div id="evaluation_container">
                         <!--Course head ------------------------------------------------------------------ -->
                            <div class="course_head" id="evaluation_head">
                                <div class="notification" id="evaluation_notification">
                                    <h2 class="notification_titre" id="evaluation_notification_titre"></h2>
                                    <div class="notification_corps" id="evaluation_notification_corps"></div>
                                </div>
                            </div>
                         <!--Course body ------------------------------------------------------------------ -->
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
                         <!--Course foot ------------------------------------------------------------------ -->
                            <div class="course_foot" id="evaluation_foot">

                                <div id='teste_container'>  
                                    <div id="evaluation_reponse_container">
                                        <div id='evaluation_reponse'></div>
                                        <div class='correcteur' id='correcteur_d_evaluation'>ߖߐ߬ߛߌ߬ߙߊ߲</div>
                                    </div>
                                </div>

                                <div class="clavier_container" id="clavier_evaluation"><?php include "clavier.php"; ?></div>

                                <div class="dialogue_btns" id="evaluation_dialogue_btns">
                                    <div class="question_btn" id="evaluation_question_btn">
                                        <span class="question_label"></span>
                                        <span class="question_total"></span>
                                        <span class="question_ordre"></span>
                                        <span class="question_action"></span>
                                    </div>
                                    <div class="repetition_btn" id="evaluation_repetition_btn">
                                        <span class="question_label"></span>
                                        <span class="question_ordre"></span>
                                        <span class="question_action"></span>
                                    </div>
                                    <div class="correction_btn" id="evaluation_correction_btn">ߏ߬ ߛߊߞߍ߫</div>
                                    <div class="progress_bar_integre">
                                        <div class="progress_bonne_reponse_bar_integre"></div>
                                        <div class="progress_mauvaise_reponse_bar_integre"></div>
                                    </div>
                                </div>

                                <div class="redirection_btns" id="evaluation_redirection_btns">
                                    <div class="redirection_btn_1">ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯</div>
                                    <div class="redirection_btn_2">ߥߊ߫ ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬</div>
                                    <div class="redirection_btn_3"> ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ </div>
                                </div>

                                <div class='progress_bar' id="evaluation_progress_bar">
                                    <div class='progress_bonne_reponse_bar'></div>
                                    <div class='progress_mauvaise_reponse_bar'></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    

                    <script src="../js/apprentissage.js"></script>
                    <script src="/kouroukan/js/exercice.js"></script>
                    <script src="/kouroukan/js/evaluations.js"></script>

                 <!--Resultat------------------------------------------------------------------------------------------------------------------------>
                    <div class="resultat_container"><?php include("resultat.php"); ?></div>

                 <!--Form pour envoi des données-----------------------------------------------------------------------------------------------------
                    Cette div envoi les resultats des études à actions.php qui à son tour les envoi à la base de données----------------------------->
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


            </div>
            <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
        </div>

       <!--Audio pour la lecture audible------------------------------------------------------------------------------------------------------>
        <audio id="audio"></audio>

       <!--Link------------------------------------------------------------------------------------------------------------------------------->
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

