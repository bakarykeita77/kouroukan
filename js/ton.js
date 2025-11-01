function ton() {
    
    let datas = JSON.parse(sessionStorage.getItem('datas'));
    let tons_appris = tonsAppris();
  
    apprentissageTon();
    exerciceTon();
    revisionTon();
    evaluationTon();


    function tonsAppris() {
        let tons_appris_du_serveur = tonsApprisDuServeur();
        let tons_appris = JSON.parse(sessionStorage.getItem("tons_appris"));
        tons_appris = (tons_appris == null) ? [] : tons_appris;
        tons_appris = (tons_appris.length == 0) ? tons_appris_du_serveur : tons_appris;
        return tons_appris;

        function tonsApprisDuServeur() {
            let tons_du_serveur = [];


            return tons_du_serveur;
        }
    }
    function apprentissageTon() {

        parametrageDeLesson();
        chargerApprentissageTon();
        afficherApprentissageDeTon();
        apprendreTon();


        function chargerApprentissageTon() {

            chargerEnteteDApprentissageTon();
            chargerFootDApprentissageTon();
            chargerCorpsDApprentissageTon();

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
                    $('#apprentissage_dialogue_btns').html(chargerApprentissageDialoguesBtnsHTML());
                }
                function chargerApprentissageRedirectionBtns() {
                    $('#continu_sur_exercice_btn').html("<p>ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
                }
                function chargerApprentissageDialoguesBtnsHTML() {
                    let html = "<div class='tons_symboles_container'>\
                        <span class='ton_symbole'>߫</span>\
                        <span class='ton_symbole'>߬</span>\
                        <span class='ton_symbole'>߭</span>\
                        <span class='ton_symbole'>߮</span>\
                        <span class='ton_symbole'>߯</span>\
                        <span class='ton_symbole'>߰</span>\
                        <span class='ton_symbole'>߱</span>\
                    </div>";
                    return html;
                }
            }
            function chargerCorpsDApprentissageTon() {
                chargementParDefautDuTableauNoir();
                chargerLessonDApprentissage();
            }
        }
        function afficherApprentissageDeTon() {
            
            afficherApprentissage();
            styleDApprentissageDeDialogueBtns();

            function styleDApprentissageDeDialogueBtns() {

                let ton_actif = $(".ton_symbole:nth-child("+tons_appris.length+1+")");

                indexer($(".actif")); 
                ton_actif.prevAll().css("background-color","#fff");
                ton_actif.addClass('actif shadow'); 
                ton_actif.nextAll().css("background-color","#bbb");
            }
        }
        function apprendreTon() {

            rappelDesBoutons();
            initialiserProgressBar();
            apprenezTon();


            function rappelDesBoutons() {
                $('#apprentissage_body, .ton_symbole:not(.actif)').click(function () {

                    if($("#apprentissage_body").text() == "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                        secouer($(".tons_symboles_container .actif"));
                        return;
                    }
                    if($("#apprentissage_body").text() != "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                        if($(".progress_bonne_reponse_bar").width() === 0) {
                            secouer($('#table_syllabe_apprentissage td'));
                            return;
                        }
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
                $(".ton_symbole").click((e) => {

                    let ton_actif = e.target.textContent;
    
                    afficherLePanneauDesCaracteres();
                    enregistrerLeTonActif();
                    cocher(ton_actif);
    
                    function enregistrerLeTonActif() {
                        if(tons_appris.indexOf(ton_actif) === -1) tons_appris.push(ton_actif);
                    }
                    function afficherLePanneauDesCaracteres() {
                        let panneau_height = $("#panneaux").height();
                        if (panneau_height == 0) { montrerPanneauDesCaracteres(); panneau_height = 352; } 
                        else { cacherPanneauDesCaracteres(); panneau_height = 0; }
                    }
                });
            }
        }
    }
    function exerciceTon() {}
    function revisionTon() {}
    function evaluationTon() {}
}