
<link rel="stylesheet" href="/kouroukan/css/pre-apprentissage.css"/>

<div class="course_head" id="pre_apprentissage_head">
    <div class="pre_lesson_head_1"></div>
    <div class="pre_lesson_head_2"></div>

    <div class = 'progress_bar' id = "apprentissage_progress_bar">
        <div class='progress_bonne_reponse_bar'></div>
    </div>
</div>
<div class="course_body" id="pre_apprentissage_body">
    <div id="pre_exercice">
        <span class="fermeture" id="fremeture_pre_exercice">&times;</span>
        <div id="pre_exercice_head"></div>
        <div id="pre_exercice_body"></div>
        <div id="pre_exercice_foot"></div>
    </div>
</div>

<div class="course_foot" id="pre_apprentissage_foot">
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

<script src="/kouroukan/js/pre-apprentissage.js"></script>