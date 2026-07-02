function ton() {

    let id_client = JSON.parse(sessionStorage.getItem("id_client"));

    /* Recuperation de toutes les matières étdiées par l'apprenant par envoi de son id à api de kouroukan. */
    fetch("../api/index.php?id_user="+id_client)
    .then(response => response.json())
    .then(matiere_collection => {

        let datas = matiere_collection;
        datas = (datas == undefined) ? [[], [], [], []] : datas;

        /* Les matères alphabet et syllabes doivent etre achevées avant de commencer les tons. */
        if (datas[0].length === 3) {
            if (datas[1].length === 3) {

                var matiere = matiereNom(datas[2]);
                sessionStorage.setItem("matiere", JSON.stringify(matiere));
                let matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));
                var niveau = JSON.parse(sessionStorage.getItem("niveau"));

                resultatGeneral(datas);

                if (niveau === 3) {

                    let caracteres_selectionnees_du_panneau = [];
                    let tons_selectionnes = [];

                    let lesson_d_apprentissage_tons_du_serveur = lessonDApprentissageDuServeur(datas);
                    let lesson_d_exercice_tons_du_serveur = lessonDExerciceDuServeur(datas);
                    let lesson_d_evaluation_tons = lessonDEvaluationDuServeur(datas);
                    let lesson_d_apprentissage_tons_du_jour = [];
                    let lesson_d_exercice_tons_du_jour = [];
                    let lesson_de_revision_tons_du_jour = [];
                    let lesson_d_evaluation_tons_du_jour = [];

                    let lesson_d_apprentissage_tons_partiel = lessonDApprentissageDuServeurDeTonsPartiel(lesson_d_apprentissage_tons_du_serveur);
                    let lesson_d_exercice_tons_partiel = [];
                    let lesson_de_revision_tons_partiel = [];
                    let lesson_d_evaluation_tons_partiel = [];


                    apprentissageTon();
                    exerciceTon();
                    revisionTon();
                    evaluationTon();


                    function lessonDApprentissageDuServeurDeTonsPartiel(lesson) {
                        let lesson_partiel = [];
                        for (let i = lesson.length-1; i > 0; i--) {
                        for (let j = 0; j < lesson[i].length; j++) {
                            let element = lesson[i];
                            let voyelle = lesson[i][j][0].split("")[1];
                            if(voyelle == "ߐ") return lesson_partiel;
                            if(lesson_partiel.indexOf(element) === -1) lesson_partiel.push(element);
                        }}
                    }
                    function apprentissageTon() {

                        parametrageDeLesson(datas);
                        chargerApprentissageTon();
                        afficherApprentissageDeTon();
                        apprendreTon();


                        function tonsAppris(lesson_d_apprentissage) {
           
                            let tons = [];
                            let tons_appris = [];
    
                            lesson_d_apprentissage.forEach(element => {
                                let donnee = element;
                                donnee.forEach(element => {
                                    if(element[0].split("")[2] != undefined) tons.push(element[0].split("")[2]);
                                });
                            });  
                            $.each($(".ton_symbole"), function() {
                                let ton = $(this).text();
                                let compteur_de_ton = 0;
         
                                for (let i = 0; i < tons.length; i++) { 
                                    if(ton == tons[i]) compteur_de_ton++; 
                                    if(compteur_de_ton === 7) if(tons_appris.indexOf(ton) === -1) tons_appris.push(ton);
                                }
                            });  
               
                            return tons_appris;
                        }
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
                            }
                            function rappelDesBoutons() {
                                $('#apprentissage_body, .a_apprendre').click(function () {

                                    if ($("#apprentissage_body").text() == "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") secouer($(".tons_symboles_container .actif"));
                                    if ($("#apprentissage_body").text() != "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                                        if ($(".progress_bonne_reponse_bar").width() === 0) secouer($('#table_syllabes_apprentissage td'));
                                    }
                                });
                                $('#panneaux').click(function (e) {
                                    if (e.target.id == "panneaux") secouer($("#afficheur_de_panneau"));
                                });
                            }
                        }
                        function afficherApprentissageDeTon() {
                            afficherApprentissage(datas);
                            afficherNotificationDApprentissageTon();
                            styleDeTonsSymboles();
                            styleDesCaracteresDuPanneau();
                    
                            function styleDeTonsSymboles() {
                    
                                let datas = JSON.parse(sessionStorage.getItem("datas"));
                                let lesson_de_tons_apprise = (datas[2][0] != undefined) ? JSON.parse(datas[2][0].lesson) : [];
                                let tons_appris = tonsAppris(lesson_de_tons_apprise);
                    console.log(tons_appris);
                                let n = tons_appris.length + 1;
                                let caractere_actif = $(".ton_symbole:nth-child("+n+")");
                    
                                indexer($(".actif")); 
                                caractere_actif.prevAll().addClass("apprises");
                                caractere_actif.addClass('actif shadow'); 
                                caractere_actif.nextAll().addClass("a_apprendre");
                            }
                            function styleDesCaracteresDuPanneau() {
                                $.each($("#panneaux span"), function() {
                                    let caractere_container = $(this);
                                    caractere_container.click(function() { marquerLeCaractereChoisi(caractere_container); });
                                });
                            }
                        }
                        function apprendreTon() {
                            $(".tons_symboles_container .actif").one("click", (e) => {
                                let ton_actif = e.target.textContent;
                                cocherLesTonsCorrespondantsDeParametre(ton_actif);
                            });
                            $(".tons_symboles_container .actif").click((e) => {
                                e.stopImmediatePropagation();
                                
                                initialiserLaLessonDApprentissageDeTons();
                                
                                let voyelles_etudiees = voyellesEtudiees(lesson_d_apprentissage_tons_du_serveur);
                                let ton_actif = e.target.textContent;
            
                                if($("#texte").text() != "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                                    clignoter($(".tables_de_tons"));
                                    return false;
                                }
                                caracteres_selectionnees_du_panneau.splice(0,caracteres_selectionnees_du_panneau.length);
                                
                                if($("#panneaux").height() == 0) {
                                    masquerNotification();
                                    setTimeout(() => {
                                        ecris("apprentissage_notification_corps", "ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰.");
                                    }, 600);
                                    selectionnerLesTons(ton_actif);
                                    enregistrerLeCaractere(caracteres_selectionnees_du_panneau, ton_actif);
                                    etudierLessonDeTonApprentissage(caracteres_selectionnees_du_panneau);
                                }
                                if($("#panneaux").height() != 0) {
                                    afficherNotificationDApprentissageTon();
                                }
                                togglePanneauDesCaracteres(); 
                                panneauDesCaracteresStyle();
                                    

                                function initialiserLaLessonDApprentissageDeTons() {
                                    if (lesson_d_apprentissage_tons_partiel.length === 7) {
                                        lesson_d_apprentissage_tons_partiel.splice(0,lesson_d_apprentissage_tons_partiel.length);
                                        voyelles_etudiees.splice(0,voyelles_etudiees.length);
                                    }
                                }
                                function voyellesEtudiees(lesson) {
                                    let voyelles = [];
                                    for (let i = lesson.length-1; i > 0; i--) {
                                    for (let j = 0; j < lesson[i].length; j++) {
                                        let voyelle = lesson[i][j][0].split("")[1];
                                        if(voyelle == "ߐ") return voyelles;
                                        if(voyelles.indexOf(voyelle) === -1) voyelles.push(voyelle);
                                    }
                                }
                                    
                                }
                                function etudierLessonDeTonApprentissage(caracteres_selectionnees_du_panneau = []) {
                                    $("#voyelles_container span").click((e) => {
                                        e.stopImmediatePropagation();

                                        let span = e.target;
                                        let voyelle_active = span.textContent;
                                        let nbr_normal_de_click = 2;
                                                
                                        if($(span).hasClass("voyelle_etudiee")) { 
                                            $(span).css("background-color","rgb(170,170,170)");
                                            alert("ߛߌ߬ߙߊ߬ߟߊ߲ ߣߌ߲߬ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰ߣߍ߲߬ ߞߘߐ ߟߋ߬ ߹"); 
                                            return false;
                                        }
                                        if($(span).css("background-color") == "rgb(170, 170, 170)") {

                                            decocherToutesLesConsonnes($("#voyelles_checker input"));
                                            decocherToutesLesConsonnes($("#consonnes_checker input"));
                                            if($("#continu_ton_btn p").text() != "") $("#continu_ton_btn p").text("ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬."); 
        
                                            chargerLesson();
                                            afficherElement($(".table_container"));
                                            lectureDuTon();
                                            lectureDesTons();
                                            enregistrerLessonDeTonApprentissage();
                                            progressBarDApprentissage($(".syllabe_container"),nbr_normal_de_click);
                                            finDeLessonDeTonApprentissage();
                                        }                      
                                        if($(span).css("background-color") == "rgb(255, 255, 255)") {
                                            let note = calculerNote(lesson_d_apprentissage_tons_du_jour);
                                            if(note === 100) {
                                                $(span).css("background-color","rgb(170, 170, 170)");
                                                alert("ߛߌ߬ߙߊ߬ߟߊ߲ ߣߌ߲߬ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰ߣߍ߲߬ ߞߘߐ ߟߋ߬ ߹");
                                                return false;
                                            }  
                                        }


                                        function chargerLesson() {

                                        /*
                                        Le chargement de la page se fait en fonction des caractères cochés, au niveau de parametres.js(qui est caché).
                                        Les caractères du parametres.js sont cochés par l'ntermediaire de ceux du panneau des caractères(visible).
                                        Si un caractère du panneau est clické, le caractère correspondant de parametres est coché.
                                        Et après lorsque submit_btn de parametre est clické, le tableau est chargé automatiquement.
                                        */
                                            selectionnerLesVoyellesDuPanneau();
                                            cocherLesVoyellesCorrespondantesDeParametre(voyelle_active);
                                            selectionnerLesConsonnesDuPanneau(caracteres_selectionnees_du_panneau);
                                            cocherLesConsonnesCorrespondantsDeParametre(caracteres_selectionnees_du_panneau);
                                            initialiserProgressBar();
                                            cacherPanneauDesCaracteres();
                                            $(".parametres_popup #submit_btn").click();


                                            function selectionnerLesVoyellesDuPanneau() {
                                                let voyelle_index = caracteres_selectionnees_du_panneau.indexOf(voyelle_active);

                                                if (voyelle_index == -1) enregistrerLeCaractere(caracteres_selectionnees_du_panneau, voyelle_active);
                                                if (voyelle_index != -1) caracteres_selectionnees_du_panneau.splice(voyelle_index, 1);
                                            }
                                            function selectionnerLesConsonnesDuPanneau(caracteres_selectionnees_du_panneau) {

                                                let consonnes_a_selectionner = consonnesACocher(caracteres_selectionnees_du_panneau);
                                                deSelectionnerTous($("#consonnes_container span"));

                                                consonnes_a_selectionner.forEach(element => {
                                                    $.each($("#consonnes_container span"), function () {
                                                        let consonne = $(this).text();
                                                        if (consonne == element) {
                                                            $(this).click();
                                                            enregistrerLeCaractere(caracteres_selectionnees_du_panneau, consonne);
                                                        }
                                                    });
                                                });
                                            }
                                            function cocherLesConsonnesCorrespondantsDeParametre(caracteres_selectionnees_du_panneau) {
                                
                                                let consonnes_a_selectionner = consonnesACocher(caracteres_selectionnees_du_panneau);
                                                decocherToutesLesConsonnes($("#consonnes_checker input"));
                                                consonnes_a_selectionner.forEach(element => { cocherLaConsonne(element); });

                                                function cocherLaConsonne(consonne) {
                                                    for (let i = 0; i < $("#consonnes_checker input").length; i++) {
                                                        let consonne_de_parametre = $("#consonnes_checker input")[i].value;

                                                        if (consonne == consonne_de_parametre) {
                                                            $("#consonnes_checker input")[i].click();
                                                            if (matiere_nom == "ߜߋ߲߭") {
                                                                if ($.inArray(consonne, caracteres_selectionnees_du_panneau) == -1) {
                                                                    setTimeout(() => { $(".parametres_container #submit_btn").click(); }, 800);
                                                                } else {
                                                                    $(".parametres_container #submit_btn").click();
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            function consonnesACocher(caracteres_selectionnees) {

                                                let syllabes_1 = ["ߓߊ", "ߛߊ", "ߕߊ", "ߜߊ"];
                                                let syllabes_2 = ["ߞߋ"];
                                                let syllabes_3 = ["ߓߌ", "ߛߌ", "ߟߌ", "ߣߌ"];
                                                let syllabes_4 = ["ߝߍ", "ߣߍ"];
                                                let syllabes_5 = ["ߝߎ", "ߟߎ"];
                                                let syllabes_6 = ["ߓߏ", "ߔߏ", "ߛߏ", "ߝߏ"];
                                                let syllabes_7 = ["ߣߐ", "ߔߐ"];

                                                let consonnes_a_cocher = [];
                                                let nombre_maximal_de_ligne = 4;

                                                caracteres_selectionnees.forEach(element => {
                                                    if (element == "ߊ") { for (let i = 0; i < syllabes_1.length; i++) consonnes_a_cocher.push(syllabes_1[i].split("")[0]); }
                                                    if (element == "ߋ") { for (let i = 0; i < syllabes_2.length; i++) consonnes_a_cocher.push(syllabes_2[i].split("")[0]); }
                                                    if (element == "ߌ") { for (let i = 0; i < syllabes_3.length; i++) consonnes_a_cocher.push(syllabes_3[i].split("")[0]); }
                                                    if (element == "ߍ") { for (let i = 0; i < syllabes_4.length; i++) consonnes_a_cocher.push(syllabes_4[i].split("")[0]); }
                                                    if (element == "ߎ") { for (let i = 0; i < syllabes_5.length; i++) consonnes_a_cocher.push(syllabes_5[i].split("")[0]); }
                                                    if (element == "ߏ") { for (let i = 0; i < syllabes_6.length; i++) consonnes_a_cocher.push(syllabes_6[i].split("")[0]); }
                                                    if (element == "ߐ") { for (let i = 0; i < syllabes_7.length; i++) consonnes_a_cocher.push(syllabes_7[i].split("")[0]); }
                                                });

                                                return consonnes_a_cocher;
                                            }
                                        }
                                        function lectureDuTon() {
                                            let p = $(".tables_de_tons p");

                                            $.each(p, function () {
                                                $(this).click(() => {
                            
                                                    let p_actif = $(this);
                                                    let syllabe_tonifiee = p_actif.text();
                                                    let terminaison = terminaisonDeSyllabe(syllabe_tonifiee);

                                                    $('#audio').attr({ src: "../son/mp3/tons/" + terminaison + "/" + syllabe_tonifiee + ".mp3", autoplay: "on" });
                                                });
                                            });
                                        }
                                        function lectureDesTons() {
                                            let p = $(".tables_de_tons p");

                                            $.each(p, function () {
                                                $(this).click(() => {

                                                    let p_actif = $(this);
                                                    let syllabes_brutes = p_actif.text();
                                                    let syllabe_active = "";
                                                    let syllabes_pour_lecture = syllabesPourLecture(syllabes_brutes);
                                                    let terminaison_0 = terminaisonDeSyllabe(syllabes_pour_lecture[0]);
                                                    let terminaison_1 = terminaisonDeSyllabe(syllabes_pour_lecture[1]);

                                                    lecture();
                                                    // lire2Syllabes();
                                    
                                                    // setTimeout(() => { $('#audio_0').attr({ src: "../son/mp3/tons/" + terminaison_0 + "/" + syllabes_pour_lecture[0] + ".mp3", autoplay: "on" }); }, 100);
                                                    // setTimeout(() => { $('#audio_1').attr({ src: "../son/mp3/tons/" + terminaison_1 + "/" + syllabes_pour_lecture[1] + ".mp3", autoplay: "on" }); }, 400);

                                                    function lecture() {

                                                        const promise = new Promise(resolve => {

                                                        });
                                                    }
                                                    function syllabesPourLecture(syllabes_brutes) {

                                                        let syllabes_pour_lecture = [];
                                                        let syllabes_pour_lecture_tonifiees = [];
                                                        let syllabes_length = nombreDeSyllabe(syllabes_brutes);

                                                        /*Former les syllabes */
                                                        for (let i = 0; i < syllabes_brutes.length; i++) {
                                                            let caractere = syllabes_brutes[i];

                                                            if (consonnes.indexOf(caractere) != -1) {
                                                                if (syllabe_active != "") syllabes_pour_lecture.push(syllabe_active);
                                                                syllabe_active = "";
                                                            }
                                                            syllabe_active += caractere;
                                                            if (i == syllabes_length - 1) syllabes_pour_lecture.push(syllabe_active);
                                                        }

                                                        /*Tonifier les syllabes */
                                                        for (let j = 0; j < syllabes_pour_lecture.length; j++) {
                                                            let caracter = syllabes_pour_lecture[j];

                                                            if (j < syllabes_pour_lecture.length - 1) if (voyelles.indexOf(caracter[caracter.length - 1]) != -1) caracter += "߫";
                                                            syllabes_pour_lecture_tonifiees.push(caracter);
                                                        }
                                                        
                                                        return syllabes_pour_lecture_tonifiees;
                                                    }
                                                    async function lire2Syllabes() {
                                                        const son1 = new Audio("../son/mp3/tons/" + terminaison_0 + "/" + syllabes_pour_lecture[0] + ".mp3" );
                                                        const son2 = new Audio("../son/mp3/tons/" + terminaison_1 + "/" + syllabes_pour_lecture[1] + ".mp3" );

                                                        son1.play();
                                                        son1.onended = () => { son2.play(); }

                                                        // await jouerSon(son1)
                                                        // await jouerSon(son2);
                                                        console.log("Les syllabes sont jouées !");
                                                        
                                                        function jouerSon(audio) {
                                                            return new Promise((resolve) => {
                                                                // audio.currentTime = 4;
                                                                audio.playbackRate = 1.5;
                                                                audio.play();

                                                                audio.onended = () => { resolve(); };
                                                            });
                                                        }
                                                    }
                                                    function lireSyllabe2() {
                                                        return new Promise(resolve => {
                                                            setTimeout(() => {
                                                                resolve($('#audio_1').attr({ src: "../son/mp3/tons/" + terminaison_1 + "/" + syllabes_pour_lecture[1] + ".mp3", autoplay: "on" }));
                                                            }, 150);
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                        function enregistrerLessonDeTonApprentissage() {

                                            let lesson_initiale = lessonInitiale();
                                            
                                            $.each($(".syllabe_container"), function() {

                                                let syllabe_container = $(this);
                                                let nbr_de_click = 0;
                                                
                                                syllabe_container.click(() => {

                                                    let syllabe_clickee = $(this).text();
                                                    let syllabe_index = $(this).index();
                                                    let point = 0;
                                                    
                                                    if(nbr_de_click < nbr_normal_de_click) nbr_de_click++;
                                                    if(nbr_de_click === nbr_normal_de_click) {
                                                        point = 1;
                                                        lesson_initiale.splice(syllabe_index,1,[syllabe_clickee,nbr_de_click,point]);
                                                        lesson_d_apprentissage_tons_du_jour = lesson_initiale;
                                                    }
                                                });
                                            });
                                            
                                            function lessonInitiale() {
                                                let lesson = [];
                                                $.each($(".syllabe_container"), function() { lesson.push([$(this).text(),0,0]); });
                                                return lesson;
                                            }
                                        }
                                        function finDeLessonDeTonApprentissage() {
                                            
                                            let compteur_1 = 0;

                                            $.each($(".syllabe_container"), function() {
                                                let compteur_2 = 0;
                                                $(this).click(() => {

                                                    if(compteur_2 < nbr_normal_de_click) { compteur_1++; compteur_2++; } 
                                                    if(compteur_1 === nbr_normal_de_click*lesson_d_apprentissage_tons_du_jour.length) {

                                                        gestionDesDialogueBoutons();
                                                        stockerApprentissageDeTons();

                                                        function gestionDesDialogueBoutons() {
                                                            if($("#apprentissage_foot > div").length < 5) {
                                                                masquer($("#apprentissage_dialogue_btns"));
                                                                $("#apprentissage_foot").append("<div id='continu_ton_btn'><div><p>ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.</p></div></div>");
                                                                $("#continu_ton_btn").css({"transform":"scale(0)","opacity":"0","transition":"0.25s"});
                                                            } 
                                                            
                                                            if($("#continu_ton_btn p").text() == "ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.")        $("#continu_ton_btn p").text("ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.");
                                                            if($("#continu_ton_btn p").text() == "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.") $("#continu_ton_btn p").text("ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.");
    
                                                            setTimeout(() => { 
                                                                afficher($("#continu_ton_btn")); 
                                                                $("#continu_ton_btn").addClass("actif");
                                                                indexer($("#continu_ton_btn p"));
    
                                                                $("#continu_ton_btn").click((e) => { 
                                                                    e.stopImmediatePropagation();
      
                                                                    if(lesson_d_apprentissage_tons_partiel.length < 7) {
                                                                        if($("#continu_ton_btn p").text() != "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.") togglePanneauDesCaracteres();
                                                                        if($("#continu_ton_btn p").text() == "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.") clignoter($(".tables_de_tons"));
                                                                        if($("#continu_ton_btn p").text() == "ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.") { $("#continu_ton_btn p").text("ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.");  }else 
                                                                        if($("#continu_ton_btn p").text() == "ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.") { $("#continu_ton_btn p").text("ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߦߌ߬ߘߊ߬."); }else 
                                                                        if($("#continu_ton_btn p").text() == "ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߦߌ߬ߘߊ߬.") { $("#continu_ton_btn p").text("ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.");  }
                                                                    }
                                                                    if(lesson_d_apprentissage_tons_partiel.length === 7) { 
                                                                        if($("#continu_ton_btn p").text() == "ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.") raffraichirLaPage(); 
                                                                    }
                                                                });
                                                            }, 250);
                                                        }
                                                        function stockerApprentissageDeTons() {
                                                            
                                                            let note_d_apprentissage_de_tons = calculerNote(lesson_d_apprentissage_tons_du_jour);

                                                            if (note_d_apprentissage_de_tons === 100) {
                                                                    
                                                                lesson_d_apprentissage_tons_partiel.push(lesson_d_apprentissage_tons_du_jour);
                                                                lesson_d_apprentissage_tons_du_serveur.push(lesson_d_apprentissage_tons_du_jour);       
                                                
                                                                /* Recuperation des id des leçons précédentes de tons, pour leurs modifications ulterieures */
                                                                let id_ton_lesson_1 = null;
                                                                let id_ton_lesson_2 = null;
                                                                let id_ton_lesson_3 = null; 

                                                                if (datas[1].length != 0) {
                                                                    for (let i = 0; i < 2; i++) {
                                                                        if (datas[2][i] != undefined) {
                                                                            if (datas[2][i].phase == "tons_apprentissage") { id_ton_lesson_1 = JSON.parse(datas[2][i].id); }
                                                                            if (datas[2][i].phase == "tons_exercice") { id_ton_lesson_2 = JSON.parse(datas[2][i].id); }
                                                                            if (datas[2][i].phase == "tons_revision") { id_ton_lesson_3 = JSON.parse(datas[2][i].id); }
                                                                        }
                                                                    }
                                                                }
                                                                /* Fin de recuperation des id */

                                                                if(lesson_d_apprentissage_tons_du_serveur.length === 1) {
                                                                    sendLessonDataToDB("tons_apprentissage", lesson_d_apprentissage_tons_du_serveur);
                                                                    console.log("Lesson d'apprentissagee tons est envoyée à la base de donnée.");
                                                                    raffraichirLaPage();
                                                                }
                                                                if(lesson_d_apprentissage_tons_du_serveur.length > 1) {
                                                                    updateLessonData(id_ton_lesson_1,lesson_d_apprentissage_tons_du_serveur);
                                                                    console.log("Lesson d'apprentissage tons est modifiée à la base de donnée.");
                                                                }
                                                        }

                                                         /*Pour éviter la repetition du stockage d'une même lesson après que la dernière condition est vérifiée, on incremente compteur_1 */  
                                                            compteur_1++;
                                                        }
                                                    }
                                                });
                                            });
                                        }
                                    });

                                }
                                function togglePanneauDesCaracteres() {
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
                                function panneauDesCaracteresStyle() {
                                    $.each($("#voyelles_container span"), function() {
                                        if(voyelles_etudiees.indexOf($(this).text()) != -1) {
                                            $(this).css("background-color","rgb(170,170,170)");
                                            $(this).addClass("voyelle_etudiee");
                                        }
                                    });
                                }
                            });
                        }
                        function afficherNotificationDApprentissageTon() {
                            masquerNotification();
                            setTimeout(() => {
                                ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬.");
                            }, 600);
                        }
                    }
                    function exerciceTon() {
                        $("#continu_sur_exercice_btn").click(() => {

                            console.log("Début d'exercce");
                        });
                    }
                    function revisionTon() {}
                    function evaluationTon() {}
                }
            } else {
                console.log("La matiere syllabes n'est pas faite ou terminée !");
            }
        } else {
            console.log("La matiere alphabet n'est pas faite ou terminée !");
        }
    });
}