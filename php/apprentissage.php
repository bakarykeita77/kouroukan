
	<link rel="stylesheet" href="../css/apprentissage.css"/>

    <div id="apprentissage_container">

        <div>
         <!--Course head ------------------------------------------------------------------ -->
            <div class="course_head" id="apprentissage_head">
                <div class="notification">
                    <h2 class="notification_titre"></h2>
                    <div class="notification_corps"></div>
                </div>
            </div>
         <!--Course body ------------------------------------------------------------------ -->
            <div class="course_body" id="apprentissage_body"></div>
         <!--Course foot ------------------------------------------------------------------ -->
            <div class="course_foot" id="apprentissage_foot">

                <div class="dialogue_btn" id="pre_apprentissage_btns">
                    <div id="panneaux_de_consonnes_btn">
                        <div id="pre_apprentissage_btns"></div>
                        <div id="redirection_btns"></div>
                    </div>

                    <div id="apprentissage_dialogue_btn">

                        <div class="btns media" id="media_apprentissage">
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
                        </div>

                        <div class="btns parametre" id="parametre_lesson">
                            <div class="parametres_container" id="parametre_lesson_container"> <?php include("parametre.php"); ?> </div>
                            <div class='parametres_btns' id='parametre_lesson_btn'>
                                <span class='parametre_icon'>&#9881;</span>
                                <span class='parametre_label'>ߛߏ߯ߙߏߟߊ߲</span>  
                            </div>
                        </div>

                        <div class="lesson_suivante" id="redirige_sur_exercice">ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</div>
                    </div>
                </div>
            </div>
         <!--Fin course ------------------------------------------------------------------- -->
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

    
    <script src="../js/apprentissage.js"></script>