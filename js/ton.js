function ton() {
    
    let datas = JSON.parse(sessionStorage.getItem('datas'));
    let caracteres_selectionnees = caracteresSelectionnees();
    let voyelles_selectionnees = [];
    let consonnes_selectionnees = [];
    let nasalisations_selectionnees = [];
    let tons_selectionnes = [];
  
    apprentissageTon();
    exerciceTon();
    revisionTon();
    evaluationTon();


    function caracteresSelectionnees() {
        let caracteres_selectionnees_du_serveur = caracteresSelectionneesDuServeur();
        let caracteres_selectionnees = JSON.parse(sessionStorage.getItem("caracteres_selectionnees"));
        caracteres_selectionnees = (caracteres_selectionnees == null) ? [] : caracteres_selectionnees;
        caracteres_selectionnees = (caracteres_selectionnees.length == 0) ? caracteres_selectionnees_du_serveur : caracteres_selectionnees;
        return caracteres_selectionnees;

        function caracteresSelectionneesDuServeur() {
            let caracteres_du_serveur = [];


            return caracteres_du_serveur;
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
                    $('#continu_sur_exercice_btn').html("<p>ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
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
            masquerLesCaracteresNonNecessairesSurLePanneau();
            styleDApprentissageDeDialogueBtns();

            function masquerLesCaracteresNonNecessairesSurLePanneau() {
                $("#consonnes_container").hide(); 
                $("#nasalisations_container").hide(); 
                $("#tons_container").hide(); 
            }
            function styleDApprentissageDeDialogueBtns() {

                let caractere_actif = $(".ton_symbole:nth-child("+caracteres_selectionnees.length+1+")");

                indexer($(".actif")); 
                caractere_actif.prevAll().addClass("apprises");
                caractere_actif.addClass('actif shadow'); 
                caractere_actif.nextAll().addClass("a_apprendre");
            }
        }
        function apprendreTon() {

            rappelDesBoutons();
            initialiserProgressBar();
            apprenezTon();


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
                $('#panneaux').click(function (e) {
                    if(e.target.id == "panneaux") {
                        secouer($("#afficheur_de_panneau"));
                        return;
                    }
                });
            }
            function apprenezTon() {
                $(".tons_symboles_container .actif").click((e) => {

                    let caractere_actif = e.target.textContent;
                    afficherLePanneauDesCaracteres();
                    selectionnerLeCaractere(caractere_actif);
                    enregistrerLeTon(caractere_actif);
                    enregistrerLeCaractere(caractere_actif);
                    selectionnerLesVoyelles();
        

                    function afficherLePanneauDesCaracteres() {
                        let panneau_height = $("#panneaux").height();
                        if (panneau_height == 0) { montrerPanneauDesCaracteres(); panneau_height = 352; } 
                        else { cacherPanneauDesCaracteres(); panneau_height = 0; }
                    }
                    function selectionnerLesVoyelles() {
                        $("#voyelles_container span").click(function(e) {
                            e.stopImmediatePropagation();
                            let voyelle_active = $(this).text();
                            let caractere_actif = voyelle_active;
        
                            voyelles_selectionnees = enregistrerLaVoyelle(caractere_actif);

                            enregistrerLeCaractere(caractere_actif);
                            chargerLeTableauNoirPourTons();

                            function enregistrerLaVoyelle(voyelle) {
                                let voyelle_index = voyelles_selectionnees.indexOf(voyelle);
                                if(voyelle_index === -1) { voyelles_selectionnees.push(voyelle); }else{ voyelles_selectionnees.splice(voyelle_index,1); }
                                return voyelles_selectionnees;
                            }
                            function chargerLeTableauNoirPourTons() {
  
                                let consonnes_a_cocher = consonnesACocher();

                                function consonnesACocher() {

                                    let syllabe_1 = ["ߓߊ","ߛߊ","ߕߊ","ߜߊ"];
                                    let syllabe_2 = ["ߓߌ","ߛߌ","ߟߌ","ߣߌ"];
                                    let syllabe_3 = ["ߞߋ"];
                                    let syllabe_4 = ["ߝߍ","ߣߍ"];
                                    let syllabe_5 = ["ߝߎ"];
                                    let syllabe_6 = ["ߓߏ","ߔߏ","ߛߏ","ߝߏ"];
                                    let syllabe_7 = ["ߣߐ"];

                                    let consonnes_a_cocher = [];
                                    caracteres_selectionnees.forEach(element => {
                                        if(element == "ߊ") { for (let i = 0; i < syllabe_1.length; i++) pusher(consonnes_a_cocher,syllabe_1[i].split("")[0]); }
                                        if(element == "ߋ") { for (let i = 0; i < syllabe_2.length; i++) pusher(consonnes_a_cocher,syllabe_2[i].split("")[0]); }
                                        if(element == "ߌ") { for (let i = 0; i < syllabe_3.length; i++) pusher(consonnes_a_cocher,syllabe_3[i].split("")[0]); }
                                        if(element == "ߍ") { for (let i = 0; i < syllabe_4.length; i++) pusher(consonnes_a_cocher,syllabe_4[i].split("")[0]); }
                                        if(element == "ߎ") { for (let i = 0; i < syllabe_5.length; i++) pusher(consonnes_a_cocher,syllabe_5[i].split("")[0]); }
                                        if(element == "ߏ") { for (let i = 0; i < syllabe_6.length; i++) pusher(consonnes_a_cocher,syllabe_6[i].split("")[0]); }
                                        if(element == "ߐ") { for (let i = 0; i < syllabe_7.length; i++) pusher(consonnes_a_cocher,syllabe_7[i].split("")[0]); }
                                    });

                                    return consonnes_a_cocher;
                                }
                            }
                        });
                    }
                    function enregistrerLeCaractere(caractere) {
                        let caractere_index = caracteres_selectionnees.indexOf(caractere);
                        if(caractere_index === -1) { caracteres_selectionnees.push(caractere); }else{ caracteres_selectionnees.splice(caractere_index,1); }
                    }
                    function enregistrerLeTon(ton) {
                        let ton_index = tons_selectionnes.indexOf(ton);
                        if(ton_index === -1) { tons_selectionnes.push(ton); }else{tons_selectionnes.splice(ton_index,1); }
                    }
                });
            }
        }
    }
    function exerciceTon() {}
    function revisionTon() {}
    function evaluationTon() {}
}