
	<link rel="stylesheet" href="/kouroukan/css/apprentissage.css"/>

    <div class="course_head" id="apprentissage_head">
        <div id="pre_apprentissage" style="display:block">
            <div id="niveaux_de_pre_apprentissage">
                <div class="parti_de_lesson"><span> ߞߎߘߎ߲</span><span class="cercles_des_partis"></span></div>
                <div class="parti_de_lesson"> ߞߎߘߎ߲ ߢߊ߯ߡߌߣߍ߲</div>
            </div>
        </div>

        <div class = 'progress_bar' id = "apprentissage_progress_bar">
            <div class='progress_bonne_reponse_bar'></div>
        </div>
    </div>
    <div class="course_body" id="apprentissage_body"></div>
    <div class="course_foot" id="apprentissage_foot">
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
    
    <script src="/kouroukan/js/apprentissage.js"></script>