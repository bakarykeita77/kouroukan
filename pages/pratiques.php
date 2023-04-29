    <link rel="stylesheet" href="/kouroukan/css/pratiques.css"/>

<!--------------------------------------------------------------------
    La partie pratique de lesson est composée de 3 divisions dont:
    
    1)- pratique_head
    2)- pratique_body
    2)- pratique_foot
    ---------------------------------------------------------------------->
    
    <div id="pratique_options">
        <center><h2 id="options_titre">ߓߟߏߦߊߟߌ ߓߏߟߏ߲ ߠߎ߬</h2></center>
        <br>
        <center>
        <div>
            <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߁ ߡߊ</span>
            <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߂ ߡߊ</span>
            <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߃ ߡߊ</span>
            <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߄ ߡߊ</span>
        </div>
        </center>
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
        
    </div>
    
    <!--pratique_foot---------------------------------------------------->
    <div class="course_foot" id="pratique_foot">

        <div id="foot_cadre">
            <div id="pratiques_images_container">
                <h1 id="image_name"></h1>
                <img src="" alt="?">
                <div id="image_croix">&#10060;</div>
            </div>

            <div id="guide_et_clavier_container">
                <div id="guide_container">
                    <div id="pratique_guide">
                        <div class="flex_row_center" id="bulles_container"></div>
                        <p id="reponse_container"><span id="cumule_des_caracteres"></span><span class='correcteur' id='correcteur_de_pratique'>ߖߐ߬ߛߌ߬ߙߊ߲</span></p>
                    </div>
                </div>

                <div class="clavier_container" id="pratique_clavier_container"><?php include "clavier.php"; ?></div>
            </div>
        </div>

        <div class="dialogue_btn" id="pratique_dialogue_btn">

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

            <div class="fin_btn"></div>
        </div>
    </div>
    
    <script src="/kouroukan/js/pratiques.js"></script>