
<link rel="stylesheet" href="../css/alphabet.css"/>
<link rel="stylesheet" href="../css/apprentissage.css"/>
<link rel="stylesheet" href="../css/exercice.css"/>
<link rel="stylesheet" href="../css/evaluation.css"/>


<!------------------------------------------------------------------------------------------------------------------------------>
<div id="apprentissage_container">
    <div>
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

            <div class="dialogue_btn" id="apprentissages_dialogue_btn">
                <div id="pre_apprentissage_dialogue_btn">
                    <div id="pre_apprentissage_btns"></div>
                    <div id="pre_exercice_btns"></div>
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

    <div id="pre_exercice_cover">
        <div id="pre_exercice">
            <span class="fermeture_pre">&times;</span>
            <div id="pre_exercice_container">
                    
                <div id="pre_exercice_body"></div>
                <div id="pre_exercice_foot"></div>
                <div id="pre_exercice_resultat">
                    <h2 id="pre_resultat_titre"></h2>
                   
                    <div id="pre_exercice_resultat_container">
                        <div id="resultat_entete">
                            <table>
                                <tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>
                                <tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>
                                <tr><td>ߓߍ߬ߙߍ</td></tr>
                            </table>
                        </div>
                        <div id="resultat_corps">
                            <table>
                                <tr id="question_row"></tr>
                                <tr id="response_row"></tr>
                                <tr id="mark_row"></tr>
                            </table>
                        </div>
                        <div id="resultat_pied">
                            <table>
                                <tr><td id="total_question"></td></tr>
                                <tr><td id="total_response"></td></tr>
                                <tr><td id="total_mark"></td></tr>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
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
    <div class="course_body" id="exercice_body"></div>   <!--Cette division est chargé par la fonction chargerExercice() dans exeercice.js-->
    <!--Course foot ------------------------------------------------------------------ -->
    <div class="course_foot" id="exercice_foot">
        <div class="dialogue_btn" id="exercice_dialogue_btn">
            
            <div class = 'progress_bar_integre'>
                <div class='progress_bonne_reponse_bar_integre'></div>
                <div class='progress_mauvaise_reponse_bar_integre'></div>
            </div>


            <div class='play_icon_container' id='exercices_player'>
                <span class='play_label' id='exercice_play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>
                <span class='qtite_question'></span>
                <span>\</span>
                <span class='ordre_question'></span>
                <span class='ecouter_question'> ߟߊߡߍ߲߫</span>
            </div>

            <div class='oreille_icon_container'>
                <span class='reecoute_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ <span id="question_rang"></span> ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> 
                <span class='oreille_icon'>&#128066;</span>
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
        </div>

    </div>
</div>
<!------------------------------------------------------------------------------------------------------------------------------>


<script src="../js/apprentissage.js"></script>
<script src="/kouroukan/js/exercice.js"></script>
<script src="/kouroukan/js/evaluations.js"></script>