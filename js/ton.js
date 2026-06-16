function ton() {

    let id_client = JSON.parse(sessionStorage.getItem("id_client"));
    fetch("/kouroukan/api/index.php?id_user="+id_client)
    .then(response => response.json())
    .then(matiere_collection => { 

        datas = matiere_collection;
        datas = (datas == undefined) ? [[],[],[],[]] : datas;

        /* Recupreation des id des leçons précédentes de tons, pour leurs modifications ulterieures */
        let id_ton_lesson_1 = null;
        let id_ton_lesson_2 = null;
        
        if(datas[1].length != 0) {
            for(let i=0; i<2; i++) {
                if(datas[2][i] != undefined) {
                    if(datas[2][i].phase == "syllabes_apprentissage") { id_ton_lesson_1 = datas[2][i].id; }
                    if(datas[2][i].phase == "syllabes_exercice") { id_ton_lesson_2 = datas[2][i].id; }
                }
            }
        }
        /* Fin de recuperation des id */
        
        /* Les matères alphabet et syllabes doivent etre achevées avant de commencer les tons. */
        if(datas[0].length === 3) { 
            if(datas[1].length === 3) {

                var matiere = matiereNom(datas[2]);
                sessionStorage.setItem("matiere",JSON.stringify(matiere));
                let phases_etudiees = phasesEtudieesDuServeur(datas);
                var niveau = JSON.parse(sessionStorage.getItem("niveau"));   // Voir programmes.js fonction storagesDuProgramme().
    
                resultatGeneral(datas);
        
                if (niveau === 3) {
                
                    let caracteres_selectionnees = [];
                    let tons_selectionnes = [];
                
                    let lesson_d_apprentissage_tons_du_serveur = lessonDApprentissageDuServeur(datas);
                    let lesson_d_exercice_tons_du_serveur = lessonDExerciceDuServeur(datas);
                    let lesson_d_evaluation_tons = lessonDEvaluationDuServeur(datas);

                    let lesson_d_apprentissage_tons_du_jour = [];
                    let lesson_d_exercice_tons_du_jour = [];
                    let lesson_de_revision_tons_du_jour = [];
                    let lesson_d_evaluation_tons_du_jour = [];

                    
                    apprentissageTon();
                    exerciceTon();
                    revisionTon();
                    evaluationTon();


                    function apprentissageTon() {

                        parametrageDeLesson(datas);
                        chargerApprentissageTon();
                        afficherApprentissageDeTon();
                        apprendreTon();


                        function chargerApprentissageTon() {

                            chargerEnteteDApprentissageTon();
                            chargerFootDApprentissageTon();
                            chargerCorpsDApprentissageTon();

                            function chargerEnteteDApprentissageTon() {
                                $('.notification_titre').html('ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
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

                                    if($("#apprentissage_body").text() == "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") secouer($(".tons_symboles_container .actif"));
                                    if($("#apprentissage_body").text() != "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                                        if($(".progress_bonne_reponse_bar").width() === 0) secouer($('#table_syllabes_apprentissage td'));
                                    }
                                });
                                $('#panneaux').click(function(e) {
                                    if(e.target.id == "panneaux") secouer($("#afficheur_de_panneau"));
                                });
                            }
                        }
                        function afficherApprentissageDeTon() {
                            afficherApprentissage(datas);
                            afficherNotificationDApprentissageTon();

                            function afficherNotificationDApprentissageTon() {
                                masquerNotification();
                                setTimeout(() => {
                                    ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬.");
                                }, 600);
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

                                etudierLessonDeTonApprentissage(caracteres_selectionnees);

                            
                                function etudierLessonDeTonApprentissage(caracteres_selectionnees=[]) {
                                            
                                    chargerPanneauSubmitBtn();

                                    $("#voyelles_container span").click((e) => {
                                        e.stopImmediatePropagation();

                                        let span = e.target;
                                        let voyelle_active = span.textContent;
                                        
                                        selectionnerLesVoyellesDuPanneau();
                                        selectionnerLesConsonnesDuPanneau();
                                        cocherLesVoyellesCorrespondantesDeParametre(voyelle_active);
                                        cocherLesConsonnesCorrespondantsDeParametre();
                                        rechargerPanneauSubmitBtn();
                                        initialiserProgressBar();

                                        chargerLesson();
                                        lectureDuTon();
                                        lectureDesTons();
                                        //enregistrerLessonDeTonApprentissage();
                                        //progressBarrDeLessonDeTonApprentissage();
                                        //finDeLessonDeTonApprentissage();
                                        
                                        function selectionnerLesVoyellesDuPanneau() {
                                            let voyelle_index = caracteres_selectionnees.indexOf(voyelle_active);
                                            if(voyelle_index == -1) enregistrerLeCaractere(caracteres_selectionnees,voyelle_active);
                                            if(voyelle_index != -1) caracteres_selectionnees.splice(voyelle_index,1);
                                        }
                                        function selectionnerLesConsonnesDuPanneau() {
                                            deSelectionnerTous($("#consonnes_container span"));
                                            selectionDesConsonnesDuPanneau($("#consonnes_container span"),caracteres_selectionnees);
                                        }
                                        function cocherLesConsonnesCorrespondantsDeParametre() {

                                            let consonnes_a_selectionner = consonnesASelectionner(caracteres_selectionnees);

                                            decocherToutesLesConsonnes($("#consonnes_checker input"));
                                            consonnes_a_selectionner.forEach(element => { cocherLaConsonne(element); });
                                            
                                            function cocherLaConsonne(consonne) {
                                                for (let i = 0; i < $("#consonnes_checker input").length; i++) {
                                                    let consonne_de_parametre = $("#consonnes_checker input")[i].value;
                                        
                                                    if(consonne == consonne_de_parametre) {
                                                        $("#consonnes_checker input")[i].click();
                                                        if(matiere_nom == "ߜߋ߲߭") {
                                                            if($.inArray(consonne, caracteres_selectionnees) == -1) {
                                                                setTimeout(() => { $(".parametres_container #submit_btn").click(); }, 800); }else{
                                                                $(".parametres_container #submit_btn").click();
                                                            }
                                                        }
                                                    }
                                                }
                                                affichageAnimeDesSyllabes();
                                        
                                                function affichageAnimeDesSyllabes() {
                                                    $.each($(".table_parlante td"), function(e) {
                                        
                                                        if(matiere_nom == "ߜߋ߲߭") {
                                                            let td = $(this);
                                                            let caractere_du_tableau = td.text().split("")[0];
                                        
                                                            if(caracteres_selectionnees.indexOf(caractere) != -1) {
                                                                if(caractere == caractere_du_tableau) {
                                                                    td.css("opacity",0);
                                                                    setTimeout(() => { td.css("opacity",1); }, 100*td.index());
                                                                }
                                                            }
                                                            if(caracteres_selectionnees.indexOf(caractere) == -1) {
                                                                if(caractere == caractere_du_tableau) {
                                                                    td.css("opacity",1);
                                                                    setTimeout(() => { td.css("opacity",0); }, 100*(7 - td.index()));
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                        function rechargerPanneauSubmitBtn() {
                                            let voyelles_deja_selectionnees = voyellesDejaSelectionnees();
                                        
                                            if(voyelles_deja_selectionnees.length == 0) {
                                                chargementParDefautDuTableauNoir();
                                                $("#panneau_submit").html("ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߬").removeClass("actif");
                                            }
                                            if(voyelles_deja_selectionnees.length != 0) {
                                                masquer($("#panneau_submit_btn_container > button"));
                                                $("#panneau_submit").html("ߣߴߌ ߓߊ߲߫ ߘߊ߫߸ ߦߋ߫ ߢߣߊߕߊ߬ߣߍ߲ ߠߎ߬ ߛߓߍ߫ ߥߟߊ߬ߓߊ ߞߊ߲߬");
                                                rendreActif($("#panneau_submit"));
                                                setTimeout(() => { afficher($("#panneau_submit")); }, 100);
                                            }
                                        }
                                        function chargerLesson() {
                                            $("#panneau_submit").click(() => {
                                                cacherPanneauDesCaracteres(); 
                                                $(".parametres_popup #submit_btn").click(); 

                                                let tables_litterales = "<div class='tables_litterales'> <div class='table_titre'>ߛߓߍߢߊ</div> </div>";
                                                let tables_litterales_html = tablesLitteralesHTML();

                                                $(".table_parlante").wrapAll("<div class='tables_vocales'></div>");
                                                $(".tables_vocales").prepend("<div class='table_titre'>ߝߐߢߊ</div>");
                                                $(".tables_vocales").wrap("<div class='tables_container'></div>");
                                                $(tables_litterales).appendTo($(".tables_container"));
                                                $(tables_litterales_html).appendTo($(".tables_litterales"));

                                                function tablesLitteralesHTML() {
                                                    let table_html = "";
                                                    $.each($(".table_parlante"), function() {
                                                        let tr = $("tr", this);
                                                        table_html += "\
                                                            <table class='table_parlante'>"
                                                            $.each(tr, function() {
                                                                table_html += "\
                                                                    <tr>"
                                                                        let td = $("td", this);
                                                                        let td_contents = "";
                                                                        $.each(td, function() {
                                                                            let td_content = $(this).text();
                                                                            td_content = (td_content[2] == "߫") ? td_content[0]+td_content[1] : td_content;
                                                                            td_contents += td_content;
                                                                        });
                                                                        table_html += "<td>"+td_contents+"</td>";
                                                                    "</tr>\
                                                                ";
                                                            });
                                                            "</table>\
                                                        ";
                                                    });
                                                    return table_html;
                                                }
                                            });
                                        }
                                        function lectureDuTon() {
                                            $("#panneau_submit").click(() => {

                                                let td = $(".tables_vocales td");
                                                $.each(td, function() {
                                                    $(this).click(() => {

                                                        let td_actif = $(this);
                                                        let syllabe_tonifiee = td_actif.text();
                                                        let terminaison = terminaisonDeSyllabe(syllabe_tonifiee);

                                                        $('#audio').attr({ src: "../son/mp3/tons/"+terminaison+"/"+syllabe_tonifiee+".mp3", autoplay:"on" });
                                                    });
                                                });
                                            });
                                        }
                                        function lectureDesTons() {
                                            $("#panneau_submit").click(() => {
                                                let td = $(".tables_litterales td");

                                                $.each(td, function() {
                                                    $(this).click(() => {

                                                        let td_actif = $(this);
                                                        let syllabes = td_actif.text();
                                                        let syllabe_active = "";
                                                        let syllabes_pour_lecture = syllabesPourLecture();
                                                        let terminaison_0 = terminaisonDeSyllabe(syllabes_pour_lecture[0]);
                                                        let terminaison_1 = terminaisonDeSyllabe(syllabes_pour_lecture[1]);

                                                        setTimeout(() => { $('#audio_0').attr({ src: "../son/mp3/tons/"+terminaison_0+"/"+syllabes_pour_lecture[0]+".mp3", autoplay:"on" }); }, 100);
                                                        setTimeout(() => { $('#audio_1').attr({ src: "../son/mp3/tons/"+terminaison_1+"/"+syllabes_pour_lecture[1]+".mp3", autoplay:"on" }); }, 300);
                                                                    
                                                        function syllabesPourLecture() {

                                                            let syllabes_pour_lecture = [];
                                                            let syllabes_pour_lecture_tonifiees = [];
                                                            let syllabes_length = nombreDeSyllabe(syllabes);
                                                            
                                                            for (let i = 0; i < syllabes.length; i++) {
                                                                let caractere = syllabes[i];
                                                                
                                                                if(consonnes.indexOf(caractere) != -1) {
                                                                    if(syllabe_active != "") syllabes_pour_lecture.push(syllabe_active);
                                                                    syllabe_active = "";
                                                                }
                                                                syllabe_active += caractere;
                                                                if(i == syllabes_length-1) syllabes_pour_lecture.push(syllabe_active);
                                                            }
                                                            for (let j = 0; j < syllabes_pour_lecture.length; j++) {
                                                                let caracter = syllabes_pour_lecture[j];

                                                                if(j<syllabes_pour_lecture.length-1) if(voyelles.indexOf(caracter[caracter.length-1]) != -1) caracter += "߫";
                                                                syllabes_pour_lecture_tonifiees.push(caracter);
                                                            }
                                                            
                                                            return syllabes_pour_lecture_tonifiees;
                                                        }
                                                    });
                                                });
                                            });
                                        }
                                        function enregistrerLessonDeTonApprentissage() {}
                                        function progressBarrDeLessonDeTonApprentissage() {}
                                        function finDeLessonDeTonApprentissage() {}
                                    });
                                    
                                    function voyellesDejaSelectionnees() {
                                        let selection = [];
                                        $.each($("#voyelles_container span"), function() {
                                            if($(this).css("background-color") == "rgb(170, 170, 170)") selection.push($(this).text());
                                        });
                                        return selection;
                                    }
                                    function chargerPanneauSubmitBtn() {
                                        let voyelles_deja_selectionnees = voyellesDejaSelectionnees();
                                        if(voyelles_deja_selectionnees.length == 0) $("#panneau_submit").html("ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߬").removeClass("actif");
                                        if(voyelles_deja_selectionnees.length != 0) $("#panneau_submit").html("ߣߴߌ ߓߊ߲߫ ߘߊ߫߸ ߦߋ߫ ߢߣߊߕߊ߬ߣߍ߲ ߠߎ߬ ߛߓߍ߫ ߥߟߊ߬ߓߊ ߞߊ߲߬");
                                    }
                                }
                                function afficherLePanneauDesCaracteres() {
                                    let panneau_height = $("#panneaux").height();

                                    masquerLesCaracteresNonNecessairesSurLePanneau();
                                    if (panneau_height == 0) { montrerPanneauDesCaracteres(); panneau_height = 352; } 
                                    else { cacherPanneauDesCaracteres(); panneau_height = 0; }
                                    
                                    function masquerLesCaracteresNonNecessairesSurLePanneau() {
                                        $("#consonnes_container").hide(); 
                                        $("#nasalisations_container").hide(); 
                                        $("#tons_container").hide(); 
                                    }
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
            }else{
                console.log("La matiere syllabes n'est pas faite ou terminée !");
            }
        }else{
            console.log("La matiere alphabet n'est pas faite ou terminée !");
        }
    });
}