
	<link rel="stylesheet" href="/kouroukan/css/evaluation.css"/>

    <div class="course_head" id="evaluation_head">
        <div class='progress_bar' id="evaluation_progress_bar">
            <p class='progress_question_bar'></p>
            <p class='progress_bonne_reponse_bar'></p>
        </div>
    </div>

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
                    <span id="label_total_point">ߓߍ߬ߙߍ ߡߎ߬ߡߍ</span>
                    <span id="total_point"></span>
                </div>
                <div>
                    <span id="label_pourcentage_point" colspan="2">ߓߍ߬ߙߍ ߗߡߍ߬ߘߐ߬ߦߊ</span>
                    <span id="pourcentage_point"></span>
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

    <div class="course_foot" id="evaluation_foot">

        <div id='teste_container'>
        
            <p id='evaluation_reponse'></p>
            
            <div id='check_mark_container'>
                <p id='check_mark'></p>
                <p id='check_mark_cover'></p>
            </div>
            
            <div id='teste_annexes_container'>
                <div id='alerte'></div>
                <div id='autre'></div>
            </div>
        </div>

        <div class="clavier_container" id="clavier_evaluation"><?php include "clavier.php"; ?></div>

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

    </div>
    
    <script src="/kouroukan/js/evaluations.js"></script>