function ton() {
    
    let datas = JSON.parse(sessionStorage.getItem('datas'));
  
    apprentissageTon();
    exerciceTon();
    revisionTon();
    evaluationTon();


    function apprentissageTon() {

        parametrageDeLesson();
        chargerApprentissageTon();
        afficherApprentissage();
        apprendreTon();


        function chargerApprentissageTon() {

            chargerEnteteDApprentissageTon();
            chargerFootDApprentissageTon();
            chargerLessonDApprentissage();

            function chargerEnteteDApprentissageTon() {
                $('.notification_titre').html('ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                viderNotification();
                setTimeout(() => { ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬."); }, 3000);
            }
            function chargerFootDApprentissageTon() {

                chargerPanneauDesCaracteres();
                chargerApprentissageDialoguesBtns();
                chargerApprentissageRedirectionBtns();

                function chargerApprentissageDialoguesBtns() {
                    $('#apprentissage_dialogue_btns').html("<div class='titre_de_parti' id='afficheur_de_panneau'><p>ߛߓߍߘߋ߲߫ ߥߟߊ ߦߌ߬ߘߊ߬</p></div>");
                }
                function chargerApprentissageRedirectionBtns() {
                    $('#continu_sur_exercice_btn').html("<p>ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
                }
            }
        }
        function apprendreTon() {

            rappelDesBoutons();
            initialiserProgressBar();
            apprenezTon();


            function rappelDesBoutons() {
                $('#apprentissage_body').click(function (e) {

                    if(e.target.id == "apprentissage_body" && $('#consonnes_cadre').css('top') == '192px') {
                        if($('#table_syllabe_apprentissage').text() == "ߜߋ߲߭ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                            secouer($("#afficheur_de_panneau"));
                            return;
                        }
                        if($('#table_syllabe_apprentissage').text() != "ߜߋ߲߭ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                            if($(".progress_bonne_reponse_bar").width() === 0) {
                                secouer($('#table_syllabe_apprentissage td'));
                                return;
                            }
                        }
                    }

                    if(e.target.id == "texte") {
                        secouer($("#afficheur_de_panneau"));
                        return;
                    }
                });
                $('#panneaux').click(function (e) {
                    if(e.target.id == "panneaux") {
                        secouer($("#afficheur_de_panneau"));
                        return;
                    }
                });
            }
            function apprenezTon() {
                // 
            }
        }
    }
    function exerciceTon() {}
    function revisionTon() {}
    function evaluationTon() {}
}