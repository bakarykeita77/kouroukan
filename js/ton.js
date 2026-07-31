function ton() {

    let id_client = JSON.parse(sessionStorage.getItem("id_client"));

    /* Recuperation de toutes les matières étdiées par l'apprenant par envoi de son id à api de kouroukan. */
    fetch("../api/index.php?id_user="+id_client)
    .then(response => response.json())
    .then(matiere_collection => {

        let datas = matiere_collection;
        let id_lessons = idDesLessons(datas);
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
                    let tons_selectionnes = [[],[],[]];

                    let lesson_d_apprentissage_tons_du_serveur = (lessonDApprentissageDuServeur(datas).length === 0) ? [[],[],[],[],[],[],[]] : lessonDApprentissageDuServeur(datas);
                    let lesson_d_exercice_tons_du_serveur = lessonDExerciceDuServeur(datas);
                    let lesson_d_evaluation_tons = lessonDEvaluationDuServeur(datas);
                    
                    let lesson_d_apprentissage_tons_du_jour = [];
                    let lesson_d_exercice_tons_du_jour = [];
                    let lesson_de_revision_tons_du_jour = [];
                    let lesson_d_evaluation_tons_du_jour = [];
                    
                    let statut_d_apprentissage = "non_effectue";
                    let statut_d_exercice = "non_effectue";
                    let statut_d_evaluaton = "non_effectue";

                    let tons_appris = tonsAppris(datas);

                    let avant_derniere_partie_de_lesson = avantDernierePartieDeLesson(lesson_d_apprentissage_tons_du_serveur);
                    let derniere_partie_de_lesson = lessonDApprentissageDuServeurDeTonsPartiel(lesson_d_apprentissage_tons_du_serveur);
                    derniere_partie_de_lesson = (derniere_partie_de_lesson.length === 7) ? [] : derniere_partie_de_lesson;
                    
                    let lesson_d_apprentissage_tons_partiel = lesson_d_apprentissage_tons_du_serveur;
                    let lesson_d_exercice_tons_partiel = [];
                    let lesson_de_revision_tons_partiel = [];
                    let lesson_d_evaluation_tons_partiel = [];


                    apprentissageTon();
                    exerciceTon();
                    revisionTon();
                    evaluationTon();


                    function tonsAppris(datas) {
           
                        let tons_pre_selectionnes = [[],[],[]];
                        let tons_appris = [];

                     /*Si un ton a son apprentissage effectué, son exercice effectué et sa revision effectuée alors ce ton est appris */ 
                     
                        if(datas[2] != undefined)
                        datas[2].forEach(element => {
                            let lesson_index = datas[2].indexOf(element);
                            let lesson = JSON.parse(element.lesson);
                        
                            lesson.forEach(element => {
                                let chapitre = element;
                                chapitre.forEach(element => {
                                    let ton = element[0].split("")[2];
                                    caracteres[5].forEach(element => {
                                        let ton_de_reference = element;
                                        if(ton == ton_de_reference) tons_pre_selectionnes[lesson_index].push(ton);
                                    });
                                });
                            });
                        });

                        if(tons_pre_selectionnes[0].length === 7) statut_d_apprentissage = "effectue";
                        if(tons_pre_selectionnes[1].length === 7) statut_d_exercice = "effectue";
                        if(tons_pre_selectionnes[2].length === 7) statut_d_evaluaton = "effectue";

                        tons_pre_selectionnes.forEach(element => {
                            let lesson_index = tons_pre_selectionnes.indexOf(element);
                            if(element.length === 7) 
                            if(element[6] != undefined) 
                            if(tons_selectionnes[lesson_index].indexOf(element[6]) === -1) 
                            tons_selectionnes[lesson_index].push(element[6]);
                        });
                         
                        caracteres[5].forEach(element => {
                            let ton_de_reference = element;
                            let tons_temoins = [];
                            
                            tons_selectionnes.forEach(element => {
                                if(element.length > 0) {
                                    // element.forEach(element => {
                                        let ton = element;
                                        if(ton == ton_de_reference) tons_temoins.push(ton);
                                    // });
                                }
                            });  
                            if(tons_temoins.length === 3) if(tons_appris.indexOf(ton_de_reference) === -1) tons_appris.push(ton_de_reference);
                        });  
           
                        return tons_appris;
                    }
                    function lessonDApprentissageDuServeurDeTonsPartiel(lesson) {
                        let lesson_partiel = [];
                        let compteur_d_element_vide = 0;

                        for (let i = lesson.length-1; i >= 0; i--) if(lesson[i].length === 0) compteur_d_element_vide++; 
                        let n = lesson.length - compteur_d_element_vide;
                        lesson_partiel = lesson[n-1];       

                        return lesson_partiel;          
                    }
                    function avantDernierePartieDeLesson(lesson) {
                        let derniere_partie = [];
                        let avant_derniere_partie = [];
                        let compteur_d_element_vide = 0;

                        for (let i = lesson.length-1; i >= 0; i--) if(lesson[i].length === 0) compteur_d_element_vide++; 
                        let n = lesson.length - compteur_d_element_vide;

                        derniere_partie = lesson[n-1];                       
                        if(derniere_partie.length < 7) avant_derniere_partie = lesson[n-2];       
                        if(derniere_partie.length === 7) avant_derniere_partie = lesson[n-1];       

                        return avant_derniere_partie; 
                    }
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
                                    masquer($('#continu_sur_exercice_btn'));
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
                                tons_appris = tonsAppris(datas);

                                let n = tons_appris.length + 1;
                                let caractere_actif = $(".ton_symbole:nth-child("+n+")");
                    
                                indexer($(".actif")); 
                                caractere_actif.prevAll().addClass("apprises");
                                caractere_actif.addClass('actif shadow'); 
                                caractere_actif.nextAll().addClass("a_apprendre");

                                if(tons_appris.length === 7) $(".tons_symboles_container span").css("background-color","#fff");
                            }
                            function styleDesCaracteresDuPanneau() {
                                $.each($("#panneaux span"), function() {
                                    let caractere_container = $(this);
                                    caractere_container.click(function() { marquerLeCaractereChoisi(caractere_container); });
                                });
                            }
                        }
                        function apprendreTon() {

                            alerteDesTonsEtudies();
                            cocherLesTonsAEtudier();

                            $(".tons_symboles_container .actif").click((e) => {
                                e.stopImmediatePropagation();
                                
                                initialiserLaLessonDApprentissageDeTons();
                                enregistrerLesCaracteres(caracteres_selectionnees_du_panneau, tons_selectionnes);
                                rappelDApprendre();
                               
                                let ton_courant = caracteres[5][tonsAppris(datas).length];
                                let voyelles_etudiees = voyellesEtudiees(lesson_d_apprentissage_tons_du_serveur);
                                let ton_actif = e.target.textContent;
                                let ton_index = tons.indexOf(ton_actif);
                                
                                
                                if($("#panneaux").height() == 0) {

                                    notificationDuChoixDeVoyelle();
                                    etudierLessonDeTonApprentissage(caracteres_selectionnees_du_panneau);

                                    
                                    function notificationDuChoixDeVoyelle() {
                                        masquerNotification();
                                        setTimeout(() => {
                                            ecris("apprentissage_notification_corps", "ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰.");
                                        }, 600);
                                    }
                                    function etudierLessonDeTonApprentissage(caracteres_selectionnees_du_panneau = []) {
                                        $("#voyelles_container span").click((e) => {
                                            e.stopImmediatePropagation();

                                            let span = e.target;
                                            let voyelle_active = span.textContent;
                                            let nbr_normal_de_click = 2;
                                            let total_des_clicks = 0;
                                            let nbr_de_click = 0;
                                            let compteur_pour_td = 0;  
                                            let good_response_width = 0;
                                                  
                                            notificationDesVoyellesDejaEtudiees();
                                            if($(span).css("background-color") == "rgb(170, 170, 170)") {

                                                masquerNotification();
                                                chargerLessonDeTonsApprentissage();
                                                afficherLessonDeTonsApprentissage();
                                                notificationDuDebutDeLecture();
                                                lectureDuTon();
                                                lectureDesTons();

                                                $.each($(".syllabe_container"), function() {

                                                    let syllabe_container = $(this);
                                                    let syllabe = $(this).text();
                                                    let nbr_de_syllabe = nombreDeSyllabeCourant();
                                                    let progress_unity = 100 / [nbr_de_syllabe * nbr_normal_de_click];
                                                    let compteur_td_click = 0;                         
                                                    let compteur_par_td = 0;
                                            

                                                    enregistrerLessonDeTonsApprentissage();
                                                    progressBarDeTonsApprentissage();
                                                    finDeLessonDeTonApprentissage();

                                                    
                                                    function enregistrerLessonDeTonsApprentissage() {
                                                        if(syllabe[2] != undefined)
                                                        if(syllabe[2] == ton_courant) 
                                                        syllabe_container.click(() => {
                                                            let point = 0;
                                                            nbr_de_click++;
                                                            if(nbr_de_click >= nbr_normal_de_click) {
                                                                point = 1;
                                                                lesson_d_apprentissage_tons_du_jour = [syllabe,nbr_de_click,point];
                                                            }
                                                        });                                          
                                                    }
                                                    function progressBarDeTonsApprentissage() {
                                                        if(syllabe[2] != undefined)
                                                        if(syllabe[2] == ton_courant)
                                                        syllabe_container.click(() => {
                                                            if (compteur_td_click < nbr_normal_de_click) {
                                                                compteur_td_click++;
                                                                total_des_clicks++;
                                                                good_response_width += progress_unity;
                                                                $('.progress_bonne_reponse_bar').css('width', good_response_width + '%');
                                                            }
                                            
                                                            if (total_des_clicks / nbr_normal_de_click == nbr_de_syllabe) return false;
                                                        });
                                                    }
                                                    function nombreDeSyllabeCourant() {
                                                        let nbr_de_syllabe = [];
                    
                                                        $.each($(".syllabe_container"), function() {
                                                            let syllabe = $(this).text();
                                                            if(syllabe[2] != undefined)
                                                            if(syllabe[2] == ton_courant) 
                                                            nbr_de_syllabe++;
                                                        });
                    
                                                        return nbr_de_syllabe;
                                                    }
                                                    function finDeLessonDeTonApprentissage() {
                                                
                                                        if(syllabe[2] != undefined)
                                                        if(syllabe[2] == ton_courant) 
                                                        syllabe_container.click(() => {

                                                            if(compteur_par_td < nbr_normal_de_click) { compteur_par_td++; compteur_pour_td++; } 
                                                            if(compteur_pour_td === nbr_normal_de_click*nbr_de_syllabe) {
  
                                                                derniere_partie_de_lesson.push(lesson_d_apprentissage_tons_du_jour);
                                                                lesson_d_apprentissage_tons_partiel[ton_index].push(lesson_d_apprentissage_tons_du_jour);
                                                                lesson_d_apprentissage_tons_du_serveur[ton_index].push(lesson_d_apprentissage_tons_du_jour);

                                                                gestionDesDialogueBoutons();
                                                                stockerApprentissageDeTons();
                                                                changementDePhasePourExerciceDeTons();
                                                                notificationDeFinDeTonApprentissage();
                                                                
                                                                function gestionDesDialogueBoutons() {

                                                                    if($("#apprentissage_redirection_btns > div").length < 2) {
                                                                        masquer($("#apprentissage_dialogue_btns"));
                                                                        afficher($("#apprentissage_redirection_btns"));
                                                                        $("#apprentissage_redirection_btns").append("<div id='continu_ton_btn'><div><p>ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.</p></div></div>");
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
                                                                            if(lesson_d_apprentissage_tons_du_serveur[ton_index].length < 7) {

                                                                                if($("#continu_ton_btn p").text() != "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.") togglePanneauDesCaracteres();
                                                                                if($("#continu_ton_btn p").text() == "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.") clignoter($(".tables_de_tons"));
                                                                                if($("#continu_ton_btn p").text() == "ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.") { 
                                                                                    $("#continu_ton_btn p").text("ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰."); 
                                                                                    masquerNotification();
                                                                                    setTimeout(() => {
                                                                                        ecris("apprentissage_notification_corps", "ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰.");
                                                                                    }, 600); 
                                                                                }else if($("#continu_ton_btn p").text() == "ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.") { 
                                                                                    $("#continu_ton_btn p").text("ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߦߌ߬ߘߊ߬."); 
                                                                                    masquerNotification();
                                                                                    setTimeout(() => {
                                                                                        ecris("apprentissage_notification_corps", "ߣߴߌ ߡߊ߫ ߓߊ߲߫ ߊ߬ ߊ߬ߟߎ߬ ߟߐ߲߫ ߠߊ߫߸ ߥߊ߫ ߘߋ߰ߟߌ ߡߊ߬ ߤߊ߯ ߌ ߦߵߊ߬ߟߎ߬ ߟߐ߲߫. ߣߴߌ ߞߵߊ߬ߟߎ߬ ߟߐ߲߫߸ ߦߋ߫ ߟߐ߲ߠߌ߫ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߥߊ߫ ߘߋ߰ߟߌ ߡߊ߬.");
                                                                                    }, 600); 
                                                                                }else if($("#continu_ton_btn p").text() == "ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߦߌ߬ߘߊ߬.") { 
                                                                                    $("#continu_ton_btn p").text("ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.");  
                                                                                }
                                                                            }
                                                                            if(lesson_d_apprentissage_tons_du_serveur[ton_index].length === 7) { 
                                                                                if($("#continu_ton_btn p").text() == "ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.") raffraichirLaPage(); 
                                                                            }
                                                                        });
                                                                    }, 250);
                                                                }
                                                                function stockerApprentissageDeTons() { 

                                                                    let note_d_apprentissage_de_tons = calculDeNote(lesson_d_apprentissage_tons_du_serveur);

                                                                    if (note_d_apprentissage_de_tons === 100) {

                                                                        if(lesson_d_apprentissage_tons_du_serveur[0].length === 1) {
                                                                            sendLessonDataToDB("tons_apprentissage", lesson_d_apprentissage_tons_du_serveur);
                                                                            console.log("Lesson d'apprentissagee tons est envoyée à la base de donnée.");
                                                                         /*0n raffraiichie la page pour récuperer l'id des lessons àfin des modifications ultérieures */
                                                                            raffraichirLaPage();
                                                                            $(".ton_symbole actif shadow").click();
                                                                        }
                                                                        
                                                                        if(lesson_d_apprentissage_tons_du_serveur[0].length > 1) {
                                                                            updateLessonData(id_lessons[0],lesson_d_apprentissage_tons_du_serveur);
                                                                            console.log("Lesson d'apprentissage tons est modifiée à la base de donnée.");
                                                                        }
                                                                    }

                                                                    /*Pour éviter la repetition du stockage d'une même lesson après que la dernière condition est vérifiée, on incremente compteur_par_td */  
                                                                    compteur_par_td++;
                                                                }
                                                                function changementDePhasePourExerciceDeTons() {
                                                                    if(derniere_partie_de_lesson.length === 7) {
                                                                        afficherBoutonDExercice();
                                                                    }
                                                                }
                                                                function notificationDeFinDeTonApprentissage() {
                                                                    setTimeout(() => {
                                                                        ecris("apprentissage_notification_corps", "ߣߴߌ ߡߊ߫ ߓߊ߲߫ ߊ߬ ߊ߬ߟߎ߬ ߟߐ߲߫ ߠߊ߫߸ ߥߊ߫ ߘߋ߰ߟߌ ߡߊ߬ ߤߊ߯ ߌ ߦߵߊ߬ߟߎ߬ ߟߐ߲߫. ߣߴߌ ߞߵߊ߬ߟߎ߬ ߟߐ߲߫߸ ߦߋ߫ ߟߐ߲ߠߌ߫ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߥߊ߫ ߘߋ߰ߟߌ ߡߊ߬.");
                                                                    }, 600);
                                                                }
                                                            }
                                                        });
                                                    }
                                                });
                                            }


                                            function notificationDesVoyellesDejaEtudiees() {
                                                if($(span).hasClass("voyelle_etudiee")) { 
                                                    $(span).css("background-color","rgb(170,170,170)");
                                                    alert("ߛߌ߬ߙߊ߬ߟߊ߲ ߣߌ߲߬ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰ߣߍ߲߬ ߞߘߐ ߟߋ߬ ߹"); 
                                                    return false;
                                                }
                        
                                                if($(span).css("background-color") == "rgb(255, 255, 255)") {
                                                    let note = calculerNote(lesson_d_apprentissage_tons_du_jour);
                                                    if(note === 100) {
                                                        $(span).css("background-color","rgb(170, 170, 170)");
                                                        alert("ߛߌ߬ߙߊ߬ߟߊ߲ ߣߌ߲߬ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰ߣߍ߲߬ ߞߘߐ ߟߋ߬ ߹");
                                                        return false;
                                                    }  
                                                }
                                            }
                                            function chargerLessonDeTonsApprentissage() {

                                             /*
                                                Le chargement de la page se fait en fonction des caractères cochés, au niveau de parametres.js(qui est caché).
                                                Les caractères du parametres.js sont cochés par l'ntermediaire de ceux du panneau des caractères(visible).
                                                Si un caractère du panneau est clické, le caractère correspondant de parametres est coché.
                                                Et après lorsque submit_btn de parametre est clické, le tableau est chargé automatiquement.
                                             */
                                            
                                                decocherLesCaracteres($("#voyelles_checker input"));
                                                decocherLesCaracteres($("#consonnes_checker input"));
                                                
                                                selectionnerLesVoyellesDuPanneau();
                                                cocherLesVoyellesCorrespondantesDeParametre(voyelle_active);
                                                selectionnerLesConsonnesDuPanneau(caracteres_selectionnees_du_panneau);
                                                cocherLesConsonnesCorrespondantsDeParametre(caracteres_selectionnees_du_panneau);
                                                initialiserProgressBar();
                                                cacherPanneauDesCaracteres();

                                                if($("#continu_ton_btn p").text() != "") $("#continu_ton_btn p").text("ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬."); 
                                                $(".parametres_popup #submit_btn").click();

                                                if(tons_appris.length === 1) $("#ligne_3, #ligne_4").css("display","none");

                                                function selectionnerLesVoyellesDuPanneau() {
                                                    let voyelle_index = caracteres_selectionnees_du_panneau.indexOf(voyelle_active);

                                                    if (voyelle_index == -1) enregistrerLeCaractere(caracteres_selectionnees_du_panneau, voyelle_active);
                                                    if (voyelle_index != -1) caracteres_selectionnees_du_panneau.splice(voyelle_index, 1);
                                                }
                                                function selectionnerLesConsonnesDuPanneau(caracteres_selectionnees_du_panneau) {

                                                    let consonnes_a_selectionner = consonnesACocher(voyelle_active);
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
                                    
                                                    let consonnes_a_selectionner = consonnesACocher(voyelle_active);
                                                    decocherLesCaracteres($("#consonnes_checker input"));
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
                                                function consonnesACocher(voyelle) {
                                                    
                                                    let syllabes = [
                                                        [
                                                            ["ߓߊ", "ߛߊ", "ߕߊ", "ߜߊ"], 
                                                            ["ߞߋ","ߝߋ"], 
                                                            ["ߓߌ", "ߛߌ","ߞߌ", "ߟߌ", "ߣߌ"], 
                                                            ["ߝߍ", "ߣߍ"], 
                                                            ["ߝߎ", "ߟߎ"], 
                                                            ["ߓߏ", "ߔߏ", "ߛߏ", "ߝߏ"], 
                                                            ["ߣߐ", "ߔߐ"]
                                                        ]
                                                        // [
                                                        //     ["ߓߊ", "ߛߊ", "ߕߊ", "ߜߊ"], 
                                                        //     ["ߞߋ"], 
                                                        //     ["ߓߌ", "ߛߌ","ߞߌ", "ߟߌ", "ߣߌ"], 
                                                        //     ["ߝߍ", "ߣߍ"], 
                                                        //     ["ߝߎ", "ߟߎ"], 
                                                        //     ["ߓߏ", "ߔߏ", "ߛߏ", "ߝߏ"], 
                                                        //     ["ߣߐ", "ߔߐ"]
                                                        // ]
                                                    ];

                                                    let consonnes_a_cocher = [];

                                                    syllabes[ton_index].forEach(element => {
                                                        let syllabe = element;
                                                        syllabe.forEach(element => {
                                                            if(voyelle == element.split("")[1])
                                                            consonnes_a_cocher.push(element.split("")[0]);
                                                        });
                                                    });

                                                    return consonnes_a_cocher;
                                                }
                                            }
                                            function afficherLessonDeTonsApprentissage() { afficherElement($(".table_container")); }
                                            function notificationDuDebutDeLecture() {
                                                setTimeout(() => {
                                                    ecris("apprentissage_notification_corps", "ߜߋ߲߭ ߢߌ߲߬ ߠߎ߫ ߘߌ߲߯ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߌ ߖߊ߲߬ߕߏ߫ ߊ߬ߟߎ߫ ߝߐߢߊ ߘߐ߬.");
                                                }, 600);
                                            }
                                            function lectureDuTon() {
                                                let p = $(".tables_de_tons p");

                                                $.each(p, function () {
                                                    $(this).click(() => {
                                
                                                        let p_actif = $(this);
                                                        let syllabe_tonifiee = p_actif.text();
                                                        let terminaison = terminaisonDeSyllabe(syllabe_tonifiee);

                                                        $('#audio').attr({ src: "../son/mp3/tons/" + terminaison + "/" + syllabe_tonifiee + ".mp3", autoplay: "on" });
                                                        setTimeout(() => { masquerNotification(); }, 250);
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
                                        });
                                    }
                                }
                                if($("#panneaux").height() != 0) {
                                    afficherNotificationDApprentissageTon();
                                }
                                togglePanneauDesCaracteres(); 
                                panneauDesCaracteresStyle();
                                    

                                function rappelDApprendre() {
                                    if($("#texte").text() != "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                                        clignoter($(".tables_de_tons"));
                                        return false;
                                    }
                                }
                                function initialiserLaLessonDApprentissageDeTons() {
                                    if (derniere_partie_de_lesson.length === 7) {
                                        caracteres_selectionnees_du_panneau.splice(0,caracteres_selectionnees_du_panneau.length);
                                        derniere_partie_de_lesson.splice(0,derniere_partie_de_lesson.length);
                                        voyelles_etudiees.splice(0,voyelles_etudiees.length);
                                    }
                                }
                                function voyellesEtudiees(lesson) {
                                    let voyelles = [];
                                    for (let i = lesson.length-1; i >= 0; i--) {
                                    for (let j = 0; j < lesson[i].length; j++) {
                                        let voyelle = lesson[i][j][0].split("")[1];
                                        if(voyelle == "ߐ") return voyelles;
                                        if(voyelles.indexOf(voyelle) === -1) voyelles.push(voyelle);
                                    }}
                                    return voyelles;
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
                                        if(voyelles_etudiees != undefined) {
                                            if(voyelles_etudiees.indexOf($(this).text()) != -1) {
                                                $(this).css("background-color","rgb(170,170,170)");
                                                $(this).addClass("voyelle_etudiee");
                                            }
                                        }
                                    });
                                }
                            });

                            function alerteDesTonsEtudies() {
                                $.each($(".ton_symbole"), function() {
                                    $(this).click(function() {
                                        if($(this).css("background-color") === "rgb(255, 255, 255)") alert("ߞߊ߲ߡߊߛߙߋ ߣߌ߲߬ ߘߋ߰ߣߍ߲߬ ߞߘߐ ߟߋ߬߹"); 
                                    });
                                });
                            }
                            function cocherLesTonsAEtudier() {
                                $(".tons_symboles_container .actif").one("click", (e) => {
                                    let ton_actif = e.target.textContent;
                                    tons_selectionnes = tons_appris;
                                    tons_selectionnes.push(ton_actif);
                                    cocherLesTonsCorrespondantsDeParametre(tons_selectionnes);
                                });
                            }
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

                            let phase_id = "tons_exercice";
                            sessionStorage.setItem("phase_id", JSON.stringify(phase_id));

                            lesson_d_exercice_tons_du_serveur = lessonDExerciceDuServeur(datas);
                            lesson_active = "exercice";
                            sessionStorage.setItem("lesson_active", JSON.stringify(lesson_active));

                            let exercice_tons_questions = malaxer(malaxer(syllabesDeLesson(derniere_partie_de_lesson)));
                            let ordre_de_question = "";
                            let total_exercice_tons_questions = 0;
                            let exercice_tons_questions_posees = [];
                            let exercice_tons_question = "", exercice_tons_reponse = "";
                            let point = 0;
                            let i = 0;
                            let rang = "߭";
                            let action = "ߟߊߡߍ߲߫";

                            total_exercice_tons_questions = exercice_tons_questions.length;

                            console.log("Début d'exercce");
                            chargerExerciceDeTons();
                            afficherExerciceDeTons();
                            tableauNoirStyle();
                            exercice();

                            function chargerExerciceDeTons() {

                                chargerEnteteDExerciceDeTons();
                                chargerCorpsDExerciceDeTons();
                                chargerPiedDExerciceDeTons();
        
                                function chargerEnteteDExerciceDeTons() {
                                    $(".notification_titre").html("ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ");
                                }
                                function chargerCorpsDExerciceDeTons() {

                                    chargementParDefautDuCorpsDExercice();
                                    chargementDuCorpsDExercice();

                                    function chargementParDefautDuCorpsDExercice() {

                                        let exercice_body_html = exerciceBodyHTML();
                                        $("#exercice_body").html(exercice_body_html);
                                            
                                        function exerciceBodyHTML() {
                                            let html = chargementParDefautHTML(avant_derniere_partie_de_lesson);
                                            return html;
                                            
                                            function chargementParDefautHTML(table) {

                                                let table_1 = syllabesDeTableau1D(table);
                                                let html = "<div class='tables_de_tons_container'>" + tableParlante1HTML(table_1) + tableParlante2HTMLParDefaut() + tableParlante3HTMLParDefaut() + "</div>";
                                                return html;
                                                
                                                function tableParlante2HTMLParDefaut() {
                                                    let html = "<div class = 'table_parlante' id='table_parlante_2'>";
                                                    html += "<div class='texte_par_defaut'>ߜߋ߲߭ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬</div>\n";
                                                    html += "</div>";

                                                    return html;
                                                }
                                                function tableParlante3HTMLParDefaut() {
                                                    let html = "<div class = 'table_parlante' id='table_parlante_3'>";
                                                    html += "<div class='texte_par_defaut'>ߞߎߡߊߘߋ߲߫ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬</div>\n";
                                                    html += "</div>";

                                                    return html;
                                                }
                                            }
                                        }
                                    }
                                    function chargementDuCorpsDExercice() {
                                        $("#table_parlante_1 div").click(function() {
                                         
                                            let syllabe_de_reference = $(this).text();
                                            let table_2 = syllabesCorrespondantsA(syllabe_de_reference);
                                            let table_3 = motsCorrespondantsA(syllabe_de_reference);
                           
                                            $("#table_parlante_2").html(tableParlante2HTML(table_2));

                                            $("#table_parlante_2 div").click(function() {
                                                $("#table_parlante_3").html(tableParlante3HTML(table_3));
                                            });
                                        });
                                    }
                                }
                                function chargerPiedDExerciceDeTons() {
                                    let exercice_de_tons_questions = malaxer(syllabesDeLesson(lesson_d_apprentissage_tons_partiel));
                                    total_exercice_de_tons_questions = exercice_de_tons_questions.length;
        
                                    chargerExerciceDeTonsDialogueBtns();
                                    chargerExerciceDeTonsRedirectionBtns();
        
                                    function chargerExerciceDeTonsDialogueBtns() {
                                        $("#exercice_question_btn").html("<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + parseIntNko(total_exercice_de_tons_questions) + " \\ ߁߭ ߟߊߡߍ߲߫</p>");
                                        $("#exercice_repetition_btn").html("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + parseIntNko(1)+"߭ ߟߊߡߍ߲߫ ߕߎ߲߯");
                                        $("#exercice_correction_btn").html("ߏ߬ ߛߊߞߍ߫");
                                    }
                                    function chargerExerciceDeTonsRedirectionBtns() {
                                        $("#reprendre_exercice_btn").html("<p>ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯</p>");
                                        $("#continu_sur_revision_btn").html("<p>ߞߊ߲ߡߊߛߙߋ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫</p>");
                                    }
                                }
                            }
                            function afficherExerciceDeTons() {
                                afficherExercice();
                                masquerNotification();
                                setTimeout(() => {
                                    let delay = 650+80*$("#exercice_body .table_parlante td").length;   // 650 est la somme des delay de setTimeout des fonctions afficherApprentissageContainer() et affichageAnimeDeTableTd()                            
                                    setTimeout(() => {
                                        ecris("exercice_notification_corps", "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߟߎ߫ ߟߋ߬ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߵߊ߬ߟߎ߫ ߦߌ߬ߘߊ߬߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫.");
                                    }, delay);
                                }, 100);
                            }
                            function tableauNoirStyle() {
                                let portrait = window.matchMedia("(orientation:portrait)");
                                let landscape = window.matchMedia("(orientation:landscape)");

                             /*Style au chargement de la page */
                                if(portrait.matches) $("#exercice_body").css("background-color","rgba(0, 0, 0, 0.8)");
                                if(landscape.matches) $("#exercice_body").css("background-color","rgba(0, 0, 0, 0.5)");

                             /*Style au changement de l'orientation de l'écran, sans qu'on est besoin de recharger la page' */
                                portrait.addEventListener("change", function(e) {
                                    if(e.matches) {
                                        $("#exercice_body").css("background-color","rgba(0, 0, 0, 0.8)");
                                    }else{
                                       $("#exercice_body").css("background-color","rgba(0, 0, 0, 0.5)");
                                    }
                                });
                            }
                            function exercice() {
                                
                                let question_status = "repondue";

                                initialiserExerciceSyllabe();
                                initialiserProgressBar();
                                gestionDeZoneActive();
                                ecouterLaQuestionDExerciceSyllabe();
                                repeterLaQuestionDExerciceSyllabe();
                                repondreLaQuestionDExerciceSyllabe();
                                corrigerLaQuestionDExerciceSyllabe();


                                function initialiserExerciceSyllabe() {
                                    lesson_d_exercice_tons_du_jour = initialiserData(exercice_tons_questions);
                                }
                                function gestionDeZoneActive() {

                                    let width_1 = $("#table_parlante_1").width();

                                    $("#zone_active").css({"width":"5rem"});
                                    $("#table_parlante_1 > div").click(function() { 

                                        $("#zone_active").css({"width":"214px", "right":"94px"});
    
                                        $("#table_parlante_2").click(function() { 
                                            $("#zone_active").css({"width":"320px", "right":"320px"});
                                        });

                                        $("#table_parlante_3").click(function() {
                                            $("#zone_active").css({"width":"5rem", "right":0});
                                        });
                                    });
                                }
                                function ecouterLaQuestionDExerciceSyllabe() {

                                    rendreActif($("#exercice_question_btn"));
                                    indexer($("#exercice_question_btn p"));
                            
                                    $("#exercice_question_btn").click(function (e) {
                                        e.stopImmediatePropagation();

                                        let exercice_question_btn = $(this);
                                        exercice_tons_question = exercice_tons_questions[i];
                                        montrerReponse(exercice_tons_question,$("#exercice_body td"));
                                        masquerNotification();

                                        masquerExerciceQuestionBtn();
                                        lireExerciceSyllabeQuestion();
                                        enregistrerExerciceSyllabeQuestion();
                                        rechargerExerciceQuestionBtn();
                                        rechargerExerciceRepetitionBtn();
                                        afficherExerciceRepetitionBtn();
                        

                                        function masquerExerciceQuestionBtn() { masquer(exercice_question_btn); }
                                        function lireExerciceSyllabeQuestion() {
                                            if (i < exercice_tons_questions.length) {
                                                lectureSyllabe(exercice_tons_question);
                                            }
                                        }
                                        function enregistrerExerciceSyllabeQuestion() { 
                                            if (i < exercice_tons_questions.length) {
                                                exercice_tons_questions_posees.push(exercice_tons_question); 
                                            }
                                        }
                                        function rechargerExerciceQuestionBtn() {
                                                    
                                            rang = "߲";
                                            action = "ߠߊߡߍ߲߫";
                                            question_status = "posee";
                                            i++;
                                            ordre_de_question = (total_exercice_tons_questions == i + 1) ? "ߟߊߓߊ߲" : parseIntNko(i + 1)+rang;
                                            
                                            $("#exercice_question_btn").html("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + parseIntNko(total_exercice_tons_questions) + " \\ " + ordre_de_question + " "+action);
                                            if (i == exercice_tons_questions.length) { masquer($("#exercice_question_btn")); }
                                        }
                                        function rechargerExerciceRepetitionBtn() {
                                            if(i > 1) {
                                                ordre_de_question = (exercice_tons_questions.length == i) ? "ߟߊߓߊ߲" : parseIntNko(i)+rang;
                                                $("#exercice_repetition_btn").html("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " +ordre_de_question+" ߠߊߡߍ߲߫ ߕߎ߲߯");
                                            }
                                        }
                                    });
                                }
                                function repeterLaQuestionDExerciceSyllabe() {
                                    $("#exercice_repetition_btn").click(function (e) {
                                        e.stopImmediatePropagation();

                                        montrerReponse(exercice_tons_question,$("#exercice_body td"));
                                        relireExerciceQuestion();
                                        afficherExerciceRepetitionBtn();

                                        function relireExerciceQuestion() {
                                            if (i < exercice_tons_questions.length) lectureSyllabe(exercice_tons_question);
                                        }
                                    });
                                }
                                function afficherExerciceRepetitionBtn() {
                                    masquer($("#exercice_question_btn"));
                                    masquer($("#exercice_repetition_btn"));
                                    masquer($("#exercice_correction_btn"));

                                    setTimeout(() => { 
                                        display($("#exercice_repetition_btn")); 
                                        rendreActif($("#exercice_repetition_btn"));
                                    }, 100);
                                }
                                function repondreLaQuestionDExerciceSyllabe() {
                                    $.each($("#exercice_body td"), function () {
                                        $(this).click(function () {
                                            element_actif = $(this);

                                            /* Au cas où on tente de repondre sans qu"une question soit posée, exercice_btn clignote pour rappel */
                                            if(question_status == "repondue") secouer($("#exercice_question_btn"));
                                            if(exercice_tons_question != "") {

                                                demarquer($(element_actif));
                                                enregistrerExerciceTonsReponse();
                                                marquageDeLaSyllabeChoisie();
                                                afficherExerciceCorrectionBtn();

                                                function enregistrerExerciceTonsReponse() {
                                                    exercice_tons_reponse = element_actif.html();
                                                }
                                                function marquageDeLaSyllabeChoisie() {
                                                    $("#exercice_body table td").css({ "background-color": "rgba(85,85,85,0.25)", "color": "white" });
                                                    marquerLeCaractereChoisi(element_actif);
                                                }
                                                function afficherExerciceCorrectionBtn() {
                                                    masquer($("#exercice_question_btn"));
                                                    masquer($("#exercice_repetition_btn"));
                                                    
                                                    setTimeout(() => { 
                                                        display($("#exercice_correction_btn")); 
                                                        rendreActif($("#exercice_correction_btn"));
                                                    }, 100);
                                                }
                                            }

                                        });
                                    });
                                }
                                function corrigerLaQuestionDExerciceSyllabe() {

                                    let question_counter = 0;
                                    let bonne_reponse_counter = 0;

                                    let nbr_bonne_reponse = 0;
                                    let nbr_mauvaise_reponse = 0;
                                    let point_total = 0;

                                    $("#exercice_correction_btn").click(function () {
                                        if(exercice_tons_questions_posees.length <= total_exercice_tons_questions) {
                                                                
                                            question_status = "repondue";

                                            marquerReponse(element_actif, exercice_tons_question);
                                            enregistrerExerciceSyllabe();
                                            progressBarExerciceSyllabe();
                                            afficherExerciceQuestionBtn();
                                            finDeExerciceSyllabe();


                                            function enregistrerExerciceSyllabe() {

                                                let question_reponse = [];

                                                /*S'il n'y a pas de question, ne rien faire.*/
                                                if (exercice_tons_question == "") return false;

                                                point = (exercice_tons_question == exercice_tons_reponse) ? 1 : 0;
                                                question_reponse = [exercice_tons_question, exercice_tons_reponse, point];
                                                lesson_d_exercice_tons_du_jour.splice(question_counter, 1, question_reponse);

                                                if (exercice_tons_question == exercice_tons_reponse) { nbr_bonne_reponse++; point_total++; }
                                                if (exercice_tons_question != exercice_tons_reponse) { nbr_mauvaise_reponse++; }

                                                exercice_tons_question = "";
                                                exercice_tons_reponse = "";
                                            }
                                            function progressBarExerciceSyllabe() {

                                                let exercice_width = total_exercice_tons_questions;
                                                let diagramm_unity = 100 / exercice_width;

                                                setTimeout(() => { display($(".progress_bar")); }, 400);

                                                question_counter++;

                                                if (point === 1) {
                                                    bonne_reponse_counter++;

                                                    $(".progress_bonne_reponse_bar").css("width", bonne_reponse_counter * diagramm_unity + "%");
                                                    $(".progress_mauvaise_reponse_bar").css("width", question_counter * diagramm_unity + "%");
                                                }
                                                if (point === 0) {
                                                    $(".progress_mauvaise_reponse_bar").css("width", question_counter * diagramm_unity + "%");
                                                }
                                            }
                                            function afficherExerciceQuestionBtn() {
                                                masquer($("#exercice_repetition_btn"));
                                                masquer($("#exercice_correction_btn"));

                                                setTimeout(() => { 
                                                    display($("#exercice_question_btn")); 
                                                    rendreActif($("#exercice_question_btn"));
                                                }, 100);
                                            }
                                            function finDeExerciceSyllabe() {
                                                if (exercice_tons_questions_posees.length === total_exercice_tons_questions) {

                                                    $("#exercice_question_btn").html("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫");

                                                    $.each($("#exercice_body td"), function () { $(this).click(function () { secouer($("#continu_sur_revision_btn")); }); });

                                                    let note_d_exercice_syllabes = calculerNote(lesson_d_exercice_tons_du_jour);

                                                    if (note_d_exercice_syllabes < 100) {

                                                        notificationDeRepriseDExercice();
                                                        affichageDeRepriseDExerciceBtn();
                                                        viderLeTableau(lesson_d_exercice_tons_du_jour);

                                                        function notificationDeRepriseDExercice() {
                                                            setTimeout(() => {
                                                                let notification = liste_de_matieres[0][2] + " ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                                ecris("exercice_notification_corps", notification);
                                                            }, 300); 
                                                        }
                                                        function affichageDeRepriseDExerciceBtn() {
                                                            setTimeout(() => { masquer($("#exercice_dialogue_btns")); }, 1800);
                                                            setTimeout(() => {
                                                                afficher($("#exercice_redirection_btns"));

                                                                afficher($("#reprendre_exercice_btn"));
                                                                masquer($("#continu_sur_revision_btn"));
                                                                rendreActif($("#reprendre_exercice_btn"));
                                                                indexer($("#reprendre_exercice_btn p"));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exerciceSyllabe().
                                                                
                                                                console.log("Echec d'exercice");
                                                            }, 2000);
                                                        }
                                                    }
                                                    if (note_d_exercice_syllabes == 100) {

                                                        notificationDeReussiteDExercice();
                                                        affichageDeRevisionBtn();

                                                        function notificationDeReussiteDExercice() {
                                                            setTimeout(() => {
                                                                let notification = felicitation() + liste_de_matieres[1][2] + " ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. \n .<span class='exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .";
                                                                ecris("exercice_notification_corps", notification);
                                                            }, 300); 
                                                        }
                                                        function affichageDeRevisionBtn() {
                                                            setTimeout(() => { masquer($("#exercice_dialogue_btns")); }, 1700);
                                                            setTimeout(() => {
                                                                display($("#exercice_redirection_btns"));

                                                                masquer($("#reprendre_exercice_btn"));
                                                                afficher($("#continu_sur_revision_btn"));
                                                                rendreActif($("#continu_sur_revision_btn"));
                                                                indexer($("#continu_sur_revision_btn p"));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exerciceSyllabe().
                                                                
                                                                console.log("Fin d'exercice");
                                                            }, 2000);
                                                        }
                                                    }

                                                    $("#deliberation").click(function () { goUp($(".resultat_container")); });


                                                    function preExerciceResultat() {

                                                        initialiserExerciceResultat();
                                                        formatParDefautDuResultat();
                                                        resultat(lesson_d_exercice_tons_du_jour);
                                                        afficherExerciceResultat();
                                                        masquerExerciceSyllabeResultat();


                                                        function afficherExerciceResultat() {
                                                            goDown($(".resultat_container"));
                                                        }
                                                        function masquerExerciceSyllabeResultat() {
                                                            $("#apprentissage #fermer_resultat").click(function () {
                                                                goUp($(".resultat_container"));
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        if (i == exercice_tons_questions.length) { 
                                            i = 0; 
                                            viderLeTableau(exercice_tons_questions);

                                            /* Suppression d"effet des clicks précédents sur les dialogue_btns */
                                            $("#exercice_question_btn").unbind("click");
                                            $("#exercice_repetition_btn").unbind("click");
                                            $("#exercice_correction_btn").unbind("click");
                                        }
                                    });
                                }
                            }
                        });

                     /* Si tons apprentissage est terminé, l'étudiant est dirigé directement sur Exercce de tons */
                        if(statut_d_apprentissage == "effectue") 
                        if(statut_d_exercice =="non_effectue") 
                        if(statut_d_evaluaton == "non_effectue") 
                        $("#continu_sur_exercice_btn").click();

                        function syllabesDeLesson(lesson) {
                            let syllabes = [];
                            if(lesson != undefined) {
                                for (let i = 0; i < lesson.length; i++) {
                                for (let j = 0; j < lesson[i].length; j++) {
                                    syllabes.push(lesson[i][j][0]);
                                }}
                            }
                            return syllabes;
                        }
                    }
                    function revisionTon() {
                        $("#continu_sur_revision_btn").click(() => {
                            console.log("Début de revision");

                        });

                     /* Si tons apprentissage est terminé, l'étudiant est dirigé directement sur Exercce de tons */
                        if(statut_d_apprentissage == "effectue") 
                        if(statut_d_exercice == "effectue") 
                        if(statut_d_evaluaton == "non_effectue") 
                        $("#continu_sur_revision_btn").click();

                    }
                    function evaluationTon() {}
                }
            } else {
                console.log("La matiere syllabes n'est pas faite ou terminée !");
            }
        } else {
            console.log("La matiere alphabet n'est pas faite ou terminée !");
        }
        
        function idDesLessons(datas) {
            let id = [];
            if (datas[1].length != 0) {
                for (let i = 0; i < 2; i++) {
                    if (datas[2][i] != undefined) {
                        if (datas[2][i].phase == "tons_apprentissage") { id[0] = JSON.parse(datas[2][i].id); }
                        if (datas[2][i].phase == "tons_exercice")      { id[1] = JSON.parse(datas[2][i].id); }
                        if (datas[2][i].phase == "tons_revision")      { id[2] = JSON.parse(datas[2][i].id); }
                    }
                }
            }
            return id;
        }
    });
}