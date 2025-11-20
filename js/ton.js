function ton() {
    
    let datas = JSON.parse(sessionStorage.getItem('datas'));
    let caracteres_selectionnees = [];
    let voyelles_selectionnees = [];
    let consonnes_selectionnees = [];
    let nasalisations_selectionnees = [];
    let tons_selectionnes = [];
  
    apprentissageTon();
    exerciceTon();
    revisionTon();
    evaluationTon();


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

                    let dialogue_btns_html = "<div class='tons_symboles_container'>\
                        <span class='ton_symbole'>߫</span>\
                        <span class='ton_symbole'>߬</span>\
                        <span class='ton_symbole'>߭</span>\
                        <span class='ton_symbole'>߮</span>\
                        <span class='ton_symbole'>߯</span>\
                        <span class='ton_symbole'>߰</span>\
                        <span class='ton_symbole'>߱</span>\
                    </div>";

                    $('#apprentissage_dialogue_btns').html(dialogue_btns_html);
                }
                function chargerApprentissageRedirectionBtns() {
                    $('#continu_sur_exercice_btn').html("<p>ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
                }
            }
            function chargerCorpsDApprentissageTon() {
                chargementParDefautDuTableauNoir();
                rappelDesBoutons();
                stylesDesCaracteres();
            }
            function rappelDesBoutons() {
                $('#apprentissage_body, .a_apprendre').click(function () {

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
                $('#panneaux').click(function(e) {
                    if(e.target.id == "panneaux") {
                        secouer($("#afficheur_de_panneau"));
                        return;
                    }
                });
            }
        }
        function afficherApprentissageDeTon() {
            
            afficherApprentissage();
            masquerLesCaracteresNonNecessairesSurLePanneau();

            function masquerLesCaracteresNonNecessairesSurLePanneau() {
                $("#consonnes_container").hide(); 
                $("#nasalisations_container").hide(); 
                $("#tons_container").hide(); 
            }
        }
        function apprendreTon() {
            $(".tons_symboles_container .actif").one("click", (e) => { 
                let ton_actif = e.target.textContent;
                cocherLesTonsCorrespondantsDeParametre(ton_actif); 
            });
            $(".tons_symboles_container .actif").click((e) => {

                let ton_actif = e.target.textContent;

                afficherLePanneauDesCaracteres();
                selectionnerLesTons(ton_actif);
                enregistrerLeTon(ton_actif);
                enregistrerLeCaractere(caracteres_selectionnees,ton_actif);                
                chargerLessonDApprentissage(caracteres_selectionnees);
                initialiserProgressBar();
            
                function afficherLePanneauDesCaracteres() {
                    let panneau_height = $("#panneaux").height();
                    if (panneau_height == 0) { montrerPanneauDesCaracteres(); panneau_height = 352; } 
                    else { cacherPanneauDesCaracteres(); panneau_height = 0; }
                }
                function enregistrerLeTon(ton) {
                    let ton_index = tons_selectionnes.indexOf(ton);
                    if(ton_index === -1) { tons_selectionnes.push(ton); }else{tons_selectionnes.splice(ton_index,1); }
                    sessionStorage.setItem("tons_selectionnes", JSON.stringify(tons_selectionnes));
                }
            });
        }
    }
    function exerciceTon() {}
    function revisionTon() {}
    function evaluationTon() {}
}