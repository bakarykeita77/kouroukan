
	<link rel="stylesheet" href="/kouroukan/css/apprentissage.css"/>

    <div id="apprentissage_container">
        
        <div class="course_head" id="apprentissage_note">
            <div id="pre_apprentissage_note">
                
            </div>
        </div>
        <div class="course_body" id="apprentissage_body"></div>
        <div class="course_foot" id="apprentissage_foot">

            <div>
                <div id="pre_apprentissage_foot">
                    <div class="pre_lesson_foot_1"></div>
                    <div class="pre_lesson_foot_2"></div>
                </div>

                <div class = 'progress_bar' id = "apprentissage_progress_bar">
                    <div class='progress_bonne_reponse_bar'></div>
                </div>
            </div>

            <div class="dialogue_btn" id="apprentissage_dialogue_btn">

                <div class="btns media" id="media_apprentissage">
                    <div class="media_btns">
                        <div class='btn'>
                            <span class='play_icon'>&#9664;</span>
                            <span class='play_label'>ߝߐߟߊ߲</span>
                        </div>

                        <div class='btn'>
                            <span class='stop_icon'>&#9632;</span>
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

            </div>

        </div>
    </div>

    <div id="pre_exercice_cover">
        <div id="pre_exercice">
            <span id="fermeture_pre_exercice">&times;</span>
            <div id="pre_exercice_container">
                    
                <div id="pre_exercice_body"></div>
                <div id="pre_exercice_foot">&#10140;</div>

                <div id="pre_exercice_resultat">
                    <div id="pre_exercice_resultat_head"><h3></h3></div>
                    <div id="pre_exercice_resultat_body">
                        <div id="resultat_diagram">
                            <div id="libelles"></div>
                            <div id="diagram"></div>
                        </div>
                        <div id="resultat_container">
                            <div id="resultat"></div>
                            <div id="legende"></div>
                        </div>
                    </div>
                    <div id="pre_exercice_resultat_foot"></div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="/kouroukan/js/apprentissage.js"></script>