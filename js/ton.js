function ton() {

    let id_client = JSON.parse(sessionStorage.getItem("id_client"));

    /* Recuperation de toutes les matières étdiées par l'apprenant par envoi de son id à api de kouroukan. */
    fetch("../api/index.php?id_user=" + id_client)
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

                        let caracteres_selectionnees = [];
                        let tons_selectionnes = [];

                        let lesson_d_apprentissage_tons_du_serveur = (lessonDApprentissageDuServeur(datas).length === 0) ? [[], [], [], [], [], [], []] : lessonDApprentissageDuServeur(datas);
                        let lesson_d_exercice_tons_du_serveur = lessonDExerciceDuServeur(datas);
                        let lesson_d_evaluation_tons = lessonDEvaluationDuServeur(datas);

                        let lesson_d_apprentissage_tons_du_jour = [];
                        let lesson_d_exercice_tons_du_jour = [[], [], []];
                        let lesson_de_revision_tons_du_jour = [];
                        let lesson_d_evaluation_tons_du_jour = [];

                        let statut_d_apprentissage = "non_effectue";
                        let statut_d_exercice = "non_effectue";
                        let statut_d_evaluaton = "non_effectue";

                        let avant_derniere_partie_de_lesson = avantDernierePartieDeLesson(lesson_d_apprentissage_tons_du_serveur);
                        let derniere_partie_de_lesson = lessonDApprentissageDuServeurDeTonsPartiel(lesson_d_apprentissage_tons_du_serveur);
                        derniere_partie_de_lesson = (derniere_partie_de_lesson.length === 7) ? [] : derniere_partie_de_lesson;

                        let lesson_d_apprentissage_tons_partiel = lesson_d_apprentissage_tons_du_serveur;
                        let lesson_d_exercice_tons_partiel = [];
                        let lesson_de_revision_tons_partiel = [];
                        let lesson_d_evaluation_tons_partiel = [];

                        let lessons_de_tons_apprentissage = [];
                        let lessons_de_tons_exercice = [];
                        let lessons_de_tons_revision = [];
                        let lessons_de_tons_evaluation = [];

                        let tons_appris = tonsApprisDuServeur(datas);
                        let tons_exerces = tonsExerces(datas);
                        let tons_revises = [];
                        let tons_evalues = [];

                        let caracteres_coches = [[],[],[],[],[],[]];

                        apprentissageDeTon();
                        exerciceDeTon();
                        revisionDeTon();
                        evaluationDeTon();


                        function tonsApprisDuServeur(datas) {

                            let tons = [];
                            let tons_appris = [];

                            if (datas[2] != undefined)
                                if (datas[2][0] != undefined)
                                    lessons_de_tons_apprentissage = JSON.parse(datas[2][0].lesson);

                            for (let i = 0; i < lessons_de_tons_apprentissage.length; i++) {
                                for (let j = 0; j < lessons_de_tons_apprentissage[i].length; j++) {
                                    tons.push(lessons_de_tons_apprentissage[i][j][0].split("")[2]);
                                }
                            }

                            for (let i = 0; i < caracteres[5].length; i++) {
                                let ton_1 = caracteres[5][i];
                                let index = 0;
                                for (let j = 0; j < tons.length; j++) {
                                    let ton_2 = tons[j];
                                    if (ton_1 === ton_2) index++;
                                }
                                if (index === 7) tons_appris.push(ton_1);
                            }

                            return tons_appris;
                        }
                        function tonsExerces(datas) {

                            let tons = [];
                            let tons_exerces = [];

                            if (datas[2] != undefined)
                                if (datas[2][0] != undefined)
                                    lessons_de_tons_exercce = JSON.parse(datas[2][1].lesson);

                            for (let i = 0; i < lessons_de_tons_exercce.length; i++) {
                                if (lessons_de_tons_exercce[i][0] != undefined)
                                    tons.push(lessons_de_tons_exercce[i][0]);
                            }

                            for (let i = 0; i < caracteres[5].length; i++) {
                                let ton_1 = caracteres[5][i];
                                for (let j = 0; j < tons.length; j++) {
                                    let ton_2 = tons[j];
                                    if (ton_1 === ton_2) tons_exerces.push(ton_1);
                                }
                            }

                            return tons_exerces;
                        }
                        function lessonDApprentissageDuServeurDeTonsPartiel(lesson) {
                            let lesson_partiel = [];
                            let compteur_d_element_vide = 0;

                            for (let i = lesson.length - 1; i >= 0; i--) if (lesson[i].length === 0) compteur_d_element_vide++;
                            let n = lesson.length - compteur_d_element_vide;
                            lesson_partiel = lesson[n - 1];

                            return lesson_partiel;
                        }
                        function avantDernierePartieDeLesson(lesson) {
                            let derniere_partie = [];
                            let avant_derniere_partie = [];
                            let compteur_d_element_vide = 0;

                            for (let i = lesson.length - 1; i >= 0; i--) if (lesson[i].length === 0) compteur_d_element_vide++;
                            let n = lesson.length - compteur_d_element_vide;

                            derniere_partie = lesson[n - 1];
                            if (derniere_partie.length < 7) avant_derniere_partie = lesson[n - 2];
                            if (derniere_partie.length === 7) avant_derniere_partie = lesson[n - 1];

                            return avant_derniere_partie;
                        }
                        function apprentissageDeTon() {

                            let phase_id = "tons_apprentissage";
                            sessionStorage.setItem("phase_id", JSON.stringify(phase_id));

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
                                styleDesVoyellesDuPanneau();

                                function styleDeTonsSymboles() {

                                    let datas = JSON.parse(sessionStorage.getItem("datas"));
                                    tons_appris = tonsApprisDuServeur(datas);

                                    let n = tons_appris.length + 1;
                                    let caractere_actif = $(".ton_symbole:nth-child(" + n + ")");

                                    indexer($(".actif"));
                                    caractere_actif.prevAll().addClass("apprises");
                                    caractere_actif.addClass('actif shadow');
                                    caractere_actif.nextAll().addClass("a_apprendre");

                                    if (tons_appris.length === 7) $(".tons_symboles_container span").css("background-color", "#fff");
                                }
                                function styleDesVoyellesDuPanneau() {
                                    $.each($("#panneaux span"), function () {
                                        let caractere_container = $(this);
                                    });
                                }
                            }
                            function apprendreTon() {

                                alerteDesTonsEtudies();

                                $(".tons_symboles_container .actif").click((e) => {
                                    e.stopImmediatePropagation();

                                    let ton_courant = caracteres[5][tonsApprisDuServeur(datas).length];
                                    let voyelles_etudiees = voyellesEtudiees(lesson_d_apprentissage_tons_du_serveur);
                                    let ton_actif = e.target.textContent;
                                    let ton_index = caracteres[5].indexOf(ton_courant);
                                    let syllabes_d_apprentissage_lies_a_ton_actif = syllabesLiesATonActif();

                                    tons_selectionnes = tons_appris;
                                    if (tons_selectionnes.indexOf(ton_actif) === -1) tons_selectionnes.push(ton_actif);
                                    if (voyelles_etudiees.length === 7) voyelles_etudiees.splice(0, voyelles_etudiees.length);

                                    initialiserLaLessonDApprentissageDeTons(derniere_partie_de_lesson);
                                    enregistrerLesCaracteres(caracteres_selectionnees, tons_selectionnes);
                                    rappelDApprendre();
                                    cocherLesTonsCorrespondantsDeParametre(tons_selectionnes);
                
                                    if ($("#panneaux").height() == 0) {

                                        notificationDuChoixDeVoyelle();
                                        etudierLessonDeTonApprentissage(caracteres_selectionnees);

                                        function notificationDuChoixDeVoyelle() {
                                            masquerNotification();
                                            attendre(600, () => {
                                                ecris("apprentissage_notification_corps", "ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰.");
                                            });
                                        }
                                        function etudierLessonDeTonApprentissage(caracteres_selectionnees = []) {
                                            $("#voyelles_container span").click((e) => {
                                                e.stopImmediatePropagation();
                        
                                                let span = e.target;
                                                let voyelle_active = span.textContent;
                                                let nbr_normal_de_click = 2;
                                                let total_des_clicks = 0;
                                                let nbr_de_click = 0;
                                                let compteur_pour_td = 0;
                                                let good_response_width = 0;
                                                let syllabes_lies_a_voyelle_active = syllabesLiesAVoyelleActive(syllabes_d_apprentissage_lies_a_ton_actif, voyelle_active);

                                                caracteres_selectionnees.push(voyelle_active);

                                                notificationDesVoyellesDejaEtudiees();
                                                if ($(span).css("background-color") == "rgb(255, 255, 255)") {

                                                    masquerNotification();
                                                    actualiserLessonDeTonsApprentissage();
                                                    notificationDuDebutDeLecture();
                                                    tableligneStyle();
                                                    lectureDuTon();
                                                    lectureDesTons();

                                                    $.each($(".syllabe_container"), function () {

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
                                                            if (syllabe[2] != undefined)
                                                                if (syllabe[2] == ton_courant)
                                                                    syllabe_container.click(() => {
                                                                        let point = 0;
                                                                        nbr_de_click++;
                                                                        if (nbr_de_click >= nbr_normal_de_click) {
                                                                            point = 1;
                                                                            lesson_d_apprentissage_tons_du_jour = [syllabe, nbr_de_click, point];
                                                                        }
                                                                    });
                                                        }
                                                        function progressBarDeTonsApprentissage() {
                                                            if (syllabe[2] != undefined)
                                                                if (syllabe[2] == ton_courant)
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

                                                            $.each($(".syllabe_container"), function () {
                                                                let syllabe = $(this).text();
                                                                if (syllabe[2] != undefined)
                                                                    if (syllabe[2] == ton_courant)
                                                                        nbr_de_syllabe++;
                                                            });

                                                            return nbr_de_syllabe;
                                                        }
                                                        function finDeLessonDeTonApprentissage() {

                                                            if (syllabe[2] != undefined)
                                                                if (syllabe[2] == ton_courant)
                                                                    syllabe_container.click(() => {

                                                                        if (compteur_par_td < nbr_normal_de_click) { compteur_par_td++; compteur_pour_td++; }
                                                                        if (compteur_pour_td === nbr_normal_de_click * nbr_de_syllabe) {

                                                                            derniere_partie_de_lesson.push(lesson_d_apprentissage_tons_du_jour);
                                                                            lesson_d_apprentissage_tons_partiel[ton_index].push(lesson_d_apprentissage_tons_du_jour);
                                                                            lesson_d_apprentissage_tons_du_serveur[ton_index].push(lesson_d_apprentissage_tons_du_jour);

                                                                            gestionDesDialogueBoutons();
                                                                            stockerApprentissageDeTons();
                                                                            changementDePhasePourExerciceDeTons();
                                                                            notificationDeFinDeTonApprentissage();

                                                                            function gestionDesDialogueBoutons() {

                                                                                if ($("#apprentissage_redirection_btns > div").length < 2) {
                                                                                    masquer($("#apprentissage_dialogue_btns"));
                                                                                    afficher($("#apprentissage_redirection_btns"));
                                                                                    $("#apprentissage_redirection_btns").append("<div id='continu_ton_btn'><div><p>ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.</p></div></div>");
                                                                                    $("#continu_ton_btn").css({ "transform": "scale(0)", "opacity": "0", "transition": "0.25s" });
                                                                                }

                                                                                if ($("#continu_ton_btn p").text() == "ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.") $("#continu_ton_btn p").text("ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.");
                                                                                if ($("#continu_ton_btn p").text() == "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.") $("#continu_ton_btn p").text("ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.");

                                                                                attendre(250, () => {
                                                                                    afficher($("#continu_ton_btn"));
                                                                                    $("#continu_ton_btn").addClass("actif");
                                                                                    indexer($("#continu_ton_btn p"));

                                                                                    $("#continu_ton_btn").click((e) => {
                                                                                        e.stopImmediatePropagation();
                                                                                        if (lesson_d_apprentissage_tons_du_serveur[ton_index].length < 7) {

                                                                                            if ($("#continu_ton_btn p").text() != "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.") togglePanneauDesCaracteres();
                                                                                            if ($("#continu_ton_btn p").text() == "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.") clignoter($(".tables_de_tons"));
                                                                                            if ($("#continu_ton_btn p").text() == "ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.") {
                                                                                                $("#continu_ton_btn p").text("ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.");
                                                                                                masquerNotification();
                                                                                                attendre(600, () => {
                                                                                                    ecris("apprentissage_notification_corps", "ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰.");
                                                                                                });
                                                                                            } else if ($("#continu_ton_btn p").text() == "ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.") {
                                                                                                $("#continu_ton_btn p").text("ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߦߌ߬ߘߊ߬.");
                                                                                                masquerNotification();
                                                                                                attendre(600, () => {
                                                                                                    ecris("apprentissage_notification_corps", "ߣߴߌ ߡߊ߫ ߓߊ߲߫ ߊ߬ ߊ߬ߟߎ߬ ߟߐ߲߫ ߠߊ߫߸ ߥߊ߫ ߘߋ߰ߟߌ ߡߊ߬ ߤߊ߯ ߌ ߦߵߊ߬ߟߎ߬ ߟߐ߲߫. ߣߴߌ ߞߵߊ߬ߟߎ߬ ߟߐ߲߫߸ ߦߋ߫ ߟߐ߲ߠߌ߫ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߥߊ߫ ߘߋ߰ߟߌ ߡߊ߬.");
                                                                                                });
                                                                                            } else if ($("#continu_ton_btn p").text() == "ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߦߌ߬ߘߊ߬.") {
                                                                                                $("#continu_ton_btn p").text("ߛߌ߬ߙߊ߬ߟߊ߲߬ ߥߟߊ ߘߏ߲߰.");
                                                                                            }
                                                                                        }
                                                                                        if (lesson_d_apprentissage_tons_du_serveur[ton_index].length === 7) {
                                                                                            if ($("#continu_ton_btn p").text() == "ߒ ߓߘߊ߫ ߏ߬ ߟߐ߲߫.") raffraichirLaPage();
                                                                                        }
                                                                                    });
                                                                                });
                                                                            }
                                                                            function stockerApprentissageDeTons() {

                                                                                let note_d_apprentissage_de_tons = calculDeNote(lesson_d_apprentissage_tons_du_serveur);

                                                                                if (note_d_apprentissage_de_tons === 100) {

                                                                                    if (lesson_d_apprentissage_tons_du_serveur[0].length === 1) {
                                                                                        sendLessonDataToDB("tons_apprentissage", lesson_d_apprentissage_tons_du_serveur);
                                                                                        console.log("Lesson d'apprentissagee tons est envoyée à la base de donnée.");
                                                                                        /*0n raffraiichie la page pour récuperer l'id des lessons àfin des modifications ultérieures */
                                                                                        raffraichirLaPage();
                                                                                        $(".ton_symbole actif shadow").click();
                                                                                    }

                                                                                    if (lesson_d_apprentissage_tons_du_serveur[0].length > 1) {
                                                                                        updateLessonData(id_lessons[0], lesson_d_apprentissage_tons_du_serveur);
                                                                                        console.log("Lesson d'apprentissage tons est modifiée à la base de donnée.");
                                                                                    }
                                                                                }

                                                                                /*Pour éviter la repetition du stockage d'une même lesson après que la dernière condition est vérifiée, on incremente compteur_par_td */
                                                                                compteur_par_td++;
                                                                            }
                                                                            function changementDePhasePourExerciceDeTons() {
                                                                                if (derniere_partie_de_lesson.length === 7) {
                                                                                    afficherBoutonDExercice();
                                                                                }
                                                                            }
                                                                            function notificationDeFinDeTonApprentissage() {
                                                                                attendre(600, () => {
                                                                                    ecris("apprentissage_notification_corps", "ߣߴߌ ߡߊ߫ ߓߊ߲߫ ߊ߬ ߊ߬ߟߎ߬ ߟߐ߲߫ ߠߊ߫߸ ߥߊ߫ ߘߋ߰ߟߌ ߡߊ߬ ߤߊ߯ ߌ ߦߵߊ߬ߟߎ߬ ߟߐ߲߫. ߣߴߌ ߞߵߊ߬ߟߎ߬ ߟߐ߲߫߸ ߦߋ߫ ߟߐ߲ߠߌ߫ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߥߊ߫ ߘߋ߰ߟߌ ߡߊ߬.");
                                                                                });
                                                                            }
                                                                        }
                                                                    });
                                                        }
                                                    });
                                                }


                                                function syllabesLiesAVoyelleActive(syllabes_d_apprentissage_lies_a_ton_actif, voyelle_active) {
                                                    let syllabes = [];
                                                    for (let i = 0; i < syllabes_d_apprentissage_lies_a_ton_actif.length; i++) {
                                                        if (syllabes_d_apprentissage_lies_a_ton_actif[i].split("")[1] == voyelle_active) syllabes.push(syllabes_d_apprentissage_lies_a_ton_actif[i]);
                                                    }
                                                    return syllabes;
                                                }
                                                function notificationDesVoyellesDejaEtudiees() {
                                                    if ($(span).hasClass("voyelle_etudiee")) {
                                                        $(span).css("background-color", "rgb(170,170,170)");
                                                        alert("ߛߌ߬ߙߊ߬ߟߊ߲ ߣߌ߲߬ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰ߣߍ߲߬ ߞߘߐ ߟߋ߬ ߹");
                                                        return false;
                                                    }

                                                    if ($(span).css("background-color") == "rgb(255, 255, 255)") {
                                                        let note = calculerNote(lesson_d_apprentissage_tons_du_jour);
                                                        if (note === 100) {
                                                            $(span).css("background-color", "rgb(170, 170, 170)");
                                                            alert("ߛߌ߬ߙߊ߬ߟߊ߲ ߣߌ߲߬ ߞߊ߲ߡߊߛߙߋ ߟߎ߫ ߘߋ߰ߣߍ߲߬ ߞߘߐ ߟߋ߬ ߹");
                                                            return false;
                                                        }
                                                    }
                                                }
                                                function actualiserLessonDeTonsApprentissage() {

                                                    /*
                                                       Le chargement de la page se fait en fonction des caractères cochés, au niveau de parametres.js(qui est caché).
                                                       Les caractères du parametres.js sont cochés par l'ntermediaire de ceux du panneau des caractères(visible).
                                                       Si un caractère du panneau est clické, le caractère correspondant de parametres est coché.
                                                       Et après lorsque submit_btn de parametre est clické, le tableau est chargé automatiquement.
                                                    */
                                                    let consonnes_lies_a_voyelle_active = consonnesLieesAVoyelleActive(syllabes_lies_a_voyelle_active);

                                                    decocherLesCaracteres($("#voyelles_checker input"));
                                                    decocherLesCaracteres($("#consonnes_checker input"));

                                                    cocherLesVoyellesCorrespondantesDeParametre(voyelle_active);
                                                    cocherLesConsonnesCorrespondantsDeParametre(consonnes_lies_a_voyelle_active);
                                                    initialiserProgressBar();
                                                    cacherPanneauDesCaracteres();
                                            
                                                    if ($("#continu_ton_btn p").text() != "") $("#continu_ton_btn p").text("ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬.");
                                                    if (tons_appris.length === 1) $("#ligne_3, #ligne_4").css("display", "none");


                                                    function cocherLesVoyellesCorrespondantesDeParametre(voyelle) {
                                                        for (let i = 0; i < $("#voyelles_checker input").length; i++) {
                                                            let voyelle_de_parametre = $("#voyelles_checker input")[i].value;
                                                            if (voyelle == voyelle_de_parametre) $("#voyelles_checker input")[i].click();
                                                        }

                                                        affichageAnimeDesSyllabes(caracteres_selectionnees, voyelle);
                                                    }
                                                    function cocherLesConsonnesCorrespondantsDeParametre(consonnes_lies_a_voyelle_active) {

                                                        decocherLesCaracteres($("#consonnes_checker input"));
                                                        consonnes_lies_a_voyelle_active.forEach(element => { cocherLaConsonne(element); });
                                                        $("#parametres_submit_btn").click();

                                                        function cocherLaConsonne(consonne) {
                                                            for (let i = 0; i < $("#consonnes_checker input").length; i++) {
                                                                let consonne_de_parametre = $("#consonnes_checker input")[i].value;
                                                                if (consonne == consonne_de_parametre) $("#consonnes_checker input")[i].click()
                                                            }
                                                        }
                                                    }
                                                    function consonnesLieesAVoyelleActive(syllabes_lies_a_voyelle_active) {
                                                        let consonnes_a_cocher = [];
                                                        syllabes_lies_a_voyelle_active.forEach(element => {
                                                            consonnes_a_cocher.push(element.split("")[0]);
                                                        });
                                                        return consonnes_a_cocher;
                                                    }
                                                }
                                                function tableligneStyle() {

                                                    let ligne_active = $("#ligne_1");

                                                    styliserParDefautDesLignes(ligne_active);
                                                    actualiserLesStylesDesLignes();

                                                    function styliserParDefautDesLignes() {
                                                        ligne_active.addClass("table_ligne_active");
                                                        ligne_active.nextAll().removeClass("table_ligne_active").addClass("opacity0075");
                                                    }
                                                    function actualiserLesStylesDesLignes() {

                                                        $.each($(".table_ligne_active .syllabe_container"), function() {
                                                            let compteur_1 = 0;
                                                            let syllabe_active = $(this);
                                                            syllabe_active.click(function() {
                                                                compteur_1++;
                                                                if(compteur_1 === 2) compteur_1 = 0;
                                                            });
                                                        });
                                                        $.each($(".mot_container"), function() {
                                                            let compteur_2 = 0;
                                                            let mot_actif = $(this);

                                                            mot_actif.click(function() {
                                                                compteur_2++; 
                                                                if(compteur_2 === 2) {           
                                                                    let ligne_active = mot_actif.parent().parent().next();
                                                                    
                                                                    if(ligne_active.html() != undefined) {
                                                                        ligne_active.removeClass("opacity0075").addClass("table_ligne_active");
                                                                        ligne_active.prev().removeClass("table_ligne_active").addClass("opacity0075");
                                                                    } 
                                                                }
                                                            });
                                                        });
                                                    }
                                                }   
                                                function notificationDuDebutDeLecture() {
                                                    attendre(600, () => {
                                                        ecris("apprentissage_notification_corps", "ߜߋ߲߭ ߢߌ߲߬ ߠߎ߫ ߘߌ߲߯ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߌ ߖߊ߲߬ߕߏ߫ ߊ߬ߟߎ߫ ߝߐߢߊ ߘߐ߬.");
                                                    });
                                                }
                                                function lectureDuTon() {
                                                    let p = $(".tables_de_tons .table_ligne_active p");

                                                    $.each(p, function () {
                                                        $(this).click(() => {

                                                            let p_actif = $(this);
                                                            let syllabe_tonifiee = p_actif.text();
                                                            let terminaison = terminaisonDeSyllabe(syllabe_tonifiee);

                                                            $('#audio').attr({ src: "../son/mp3/tons/" + terminaison + "/" + syllabe_tonifiee + ".mp3", autoplay: "on" });
                                                            attendre(250, () => { masquerNotification(); });
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

                                                            // attendre(100,() => { $('#audio_0').attr({ src: "../son/mp3/tons/" + terminaison_0 + "/" + syllabes_pour_lecture[0] + ".mp3", autoplay: "on" }); });
                                                            // attendre(400,() => { $('#audio_1').attr({ src: "../son/mp3/tons/" + terminaison_1 + "/" + syllabes_pour_lecture[1] + ".mp3", autoplay: "on" }); });

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
                                                                const son1 = new Audio("../son/mp3/tons/" + terminaison_0 + "/" + syllabes_pour_lecture[0] + ".mp3");
                                                                const son2 = new Audio("../son/mp3/tons/" + terminaison_1 + "/" + syllabes_pour_lecture[1] + ".mp3");

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
                                                                    attendre(150, () => {
                                                                        resolve($('#audio_1').attr({ src: "../son/mp3/tons/" + terminaison_1 + "/" + syllabes_pour_lecture[1] + ".mp3", autoplay: "on" }));
                                                                    });
                                                                });
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    }
                                    if ($("#panneaux").height() != 0) {
                                        afficherNotificationDApprentissageTon();
                                    }
                                    togglePanneauDesVoyelles();
                                    panneauDesVoyellesStyle();


                                    function rappelDApprendre() {
                                        if ($("#texte").text() != "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                                            clignoter($(".tables_de_tons"));
                                            return false;
                                        }
                                    }
                                    function cocherLesTonsCorrespondantsDeParametre(tons) {
                                        for (let i = 0; i < $("#tons_checker input").length; i++) {
                                            let ton_de_parametre = $("#tons_checker input")[i].value;
                                            if (tons.indexOf(ton_de_parametre) != -1) {
                                                $("#tons_checker input")[i].click();
                                            }
                                        }
                                    }
                                    function initialiserLaLessonDApprentissageDeTons(derniere_partie_de_lesson) {
                                        if (derniere_partie_de_lesson.length === 7) {
                                            caracteres_selectionnees.splice(0, caracteres_selectionnees.length);
                                            derniere_partie_de_lesson.splice(0, derniere_partie_de_lesson.length);
                                            voyelles_etudiees.splice(0, voyelles_etudiees.length);
                                        }
                                    }
                                    function voyellesEtudiees(lesson) {
                                        let voyelles = [];
                                        for (let i = lesson.length - 1; i >= 0; i--) {
                                            for (let j = 0; j < lesson[i].length; j++) {
                                                let voyelle = lesson[i][j][0].split("")[1];
                                                if (voyelle == "ߐ") {
                                                    voyelles.push(voyelle);
                                                    return voyelles;
                                                }
                                                if (voyelles.indexOf(voyelle) === -1) voyelles.push(voyelle);
                                            }
                                        }
                                        return voyelles;
                                    }
                                    function syllabesLiesATonActif() {
                                        let syllabes = [];

                                        for (let i = 0; i < tons_syllabe[ton_index].length; i++) {
                                            let tableau = tons_syllabe[ton_index][i][0][0];
                                            if(tableau.length != 0) 
                                            for (let j = 0; j < tableau.length; j++) syllabes.push(tableau[j]);
                                        }

                                        return syllabes;
                                    }
                                    function togglePanneauDesVoyelles() {
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
                                    function panneauDesVoyellesStyle() {
                                        $.each($("#voyelles_container span"), function () {
                                            if (voyelles_etudiees != undefined) {
                                                if (voyelles_etudiees.length === 7) $(this).removeClass("voyelle_etudiee");
                                                if (voyelles_etudiees.length < 7) {
                                                    if (voyelles_etudiees.indexOf($(this).text()) != -1) $(this).addClass("voyelle_etudiee");
                                                }
                                            }
                                        });
                                    }
                                });

                                function alerteDesTonsEtudies() {
                                    $.each($(".ton_symbole"), function () {
                                        $(this).click(function () {
                                            if ($(this).css("background-color") === "rgb(255, 255, 255)") alert("ߞߊ߲ߡߊߛߙߋ ߣߌ߲߬ ߘߋ߰ߣߍ߲߬ ߞߘߐ ߟߋ߬߹");
                                        });
                                    });
                                }
                            }
                            function afficherNotificationDApprentissageTon() {
                                masquerNotification();
                                attendre(600, () => {
                                    ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬.");
                                });
                            }
                        }
                        function exerciceDeTon() {
                            $("#continu_sur_exercice_btn").click(() => {

                                let phase_id = "tons_exercice";
                                sessionStorage.setItem("phase_id", JSON.stringify(phase_id));

                                lesson_d_exercice_tons_du_serveur = lessonDExerciceDuServeur(datas);
                                lesson_active = "exercice";
                                sessionStorage.setItem("lesson_active", JSON.stringify(lesson_active));

                                let voyelles_de_reference = [];
                                let syllabes_de_reference = [];
                                let total_syllabes_de_reference = 0;
                                let tons = [];

                                let voyelle_de_reference = "";
                                let syllabe_de_reference = "";
                                let ton = "";
                                let ton_index = 0;
                                let voyelles_tonifiees = [];
                                let syllabes_tonifies = [];
                                let mots_tonifies = [];
                                let tonifies_partiel = [];
                                let tonifies = [];

                                let voyelles_de_reference_exerces = [];
                                let syllabes_de_reference_exerces = [];
                                let tons_exercices = [[], [], [], [], [], [], []];
                                let ton_exercice = ["", [], [], []];
                                let voyelles_tonifies_questions_posees = [];
                                let syllabes_tonifies_questions_posees = [];
                                let mots_tonifies_questions_posees = [];
                                let exercice_tons_question = "", exercice_tons_reponse = "";

                                let ordre_de_question = "";
                                let point = 0;
                                let question_counter = 0;
                                let rang = "߭";
                                let action = "ߟߊߡߍ߲߫";

                                let syllabe_de_reference_container = "";
                                let table_parlante = "";
                                let element_actif = "";
                                let question_syllabe_counter = 0;
                                let question_mot_counter = 0;


                                console.log("Début d'exercice");
                                chargerExerciceDeTons();
                                afficherExerciceDeTons();
                                tableauNoirStyle();
                                exercice();

                                function chargerExerciceDeTons() {

                                    chargerEnteteDExerciceDeTons();
                                    chargerCorpsDExerciceDeTonsParDefaut();
                                    chargerPiedDExerciceDeTonsParDefaut();

                                    function chargerEnteteDExerciceDeTons() {
                                        $(".notification_titre").html("ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ");
                                    }
                                    function chargerCorpsDExerciceDeTonsParDefaut() {
                                        let exercice_body_html = chargementParDefautHTML(avant_derniere_partie_de_lesson);
                                        $("#exercice_body").html(exercice_body_html);
                                        syllabes_de_reference = elementsDuTableau1D(avant_derniere_partie_de_lesson);
                                        total_syllabes_de_reference = syllabes_de_reference.length;

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
                                    function chargerPiedDExerciceDeTonsParDefaut() {
                                        /*Ajout aux boutons de dialogues, un bouton qui permet d'afficher les syllabes d'exercices */
                                        $("#exercice_dialogue_btns").prepend("<div id='chargeur_de_tables_parlantes'><p>ߜߋ߲߭ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߦߌ߬ߘߊ߬</p></div>");
                                    }
                                }
                                function afficherExerciceDeTons() {
                                    afficherExercice();
                                    masquerNotification();
                                    styleDeTableau1(syllabes_de_reference_exerces);
                                    posititionnementInitialeDeZoneActive();
                                    attendre(100, () => {
                                        let delay = 650 + 80 * $("#exercice_body .table_parlante td").length;
                                        attendre(delay, () => {
                                            ecris("exercice_notification_corps", "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߟߎ߫ ߟߋ߬ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߵߊ߬ߟߎ߫ ߦߌ߬ߘߊ߬߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫.");
                                        });
                                    });
                                }
                                function tableauNoirStyle() {
                                    let portrait = window.matchMedia("(orientation:portrait)");
                                    let landscape = window.matchMedia("(orientation:landscape)");

                                    /*Style au chargement de la page */
                                    if (portrait.matches) $("#exercice_body").css("background-color", "rgba(0, 0, 0, 0.8)");
                                    if (landscape.matches) $("#exercice_body").css("background-color", "rgba(0, 0, 0, 0.5)");

                                    /*Style au changement de l'orientation de l'écran, sans qu'on est besoin de recharger la page' */
                                    portrait.addEventListener("change", function (e) {
                                        if (e.matches) {
                                            $("#exercice_body").css("background-color", "rgba(0, 0, 0, 0.8)");
                                        } else {
                                            $("#exercice_body").css("background-color", "rgba(0, 0, 0, 0.5)");
                                        }
                                    });
                                }
                                function exercice() {
                                    $("#chargeur_de_tables_parlantes").click(function () {

                                        let chargeur_de_tables = $(this);
                                        let question_status = "repondue";

                                        masquer(chargeur_de_tables);

                                        initialiserProgressBar();
                                        preparerExerciceDeTons();
                                        chargementDeTableParlante2();
                                        chargementDeTableParlante3();
                                        ecouterLaQuestionDExerciceDeTons();
                                        repeterLaQuestionDExerciceDeTons();
                                        repondreLaQuestionDExerciceDeTons();
                                        corrigerLaQuestionDExerciceDeTons();
                                        mouvemementDeZoneActive();


                                        function preparerExerciceDeTons() {
                                            masquer($("#chargeur_de_tables_parlantes"));
                                            afficherRapidement($('#exercice_question_btn'));
                                            rendreActif($('#exercice_question_btn'));

                                            if (chargeur_de_tables.text() == "ߜߋ߲߭ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߦߌ߬ߘߊ߬") {

                                                let n = JSON.stringify(syllabes_de_reference_exerces.length + 1);

                                                syllabe_de_reference_container = $("#table_parlante_1 > div:nth-child(" + n + ")");
                                                syllabe_de_reference = syllabe_de_reference_container.text();

                                                ton = syllabe_de_reference[2];
                                                ton_index = caracteres[5].indexOf(ton);
                                                ton_exercice[0] = ton;
                                                syllabes_tonifies = malaxer(syllabesCorrespondantsA(syllabe_de_reference));
                                                mots_tonifies = malaxer(motsCorrespondantsA(syllabe_de_reference));
                                                tonifies = syllabes_tonifies.concat(mots_tonifies);

                                                alertesDuChoixDeSyllabeDeReference();
                                                chargerExerciceDeTonsDialogueBtns();
                                                initialiserExerciceDeTons();

                                                function alertesDuChoixDeSyllabeDeReference() {

                                                    if (syllabe_de_reference_container.hasClass("a_apprendre")) {
                                                        alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߬ ߝߟߐ߫");
                                                    }
                                                }
                                                function chargerExerciceDeTonsDialogueBtns() {
                                                    $("#exercice_question_btn").html("<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + parseIntNko(syllabes_tonifies.length) + " \\ ߁߭ ߟߊߡߍ߲߫</p>");
                                                    $("#exercice_repetition_btn").html("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߁߭ ߟߊߡߍ߲߫ ߕߎ߲߯");
                                                    $("#exercice_correction_btn").html("ߏ߬ ߛߊߞߍ߫");

                                                    $("#reprendre_exercice_btn").html("<p>ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯</p>");
                                                    $("#continu_sur_revision_btn").html("<p>ߞߊ߲ߡߊߛߙߋ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫</p>");
                                                }
                                                function initialiserExerciceDeTons() {
                                                    lesson_d_exercice_tons_du_jour[1] = initialiserData(syllabes_tonifies);
                                                    lesson_d_exercice_tons_du_jour[2] = initialiserData(mots_tonifies);
                                                }
                                            }
                                        }
                                        function chargementDeTableParlante2() {
                                            // if(syllabes_tonifies_questions_posees.length === 0)
                                            if (question_counter === 0)
                                                if (chargeur_de_tables.text() == "ߜߋ߲߭ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߦߌ߬ߘߊ߬") {
                                                    $("#table_parlante_2").html(tableParlante2HTML(syllabes_tonifies));
                                                    chargementParDefautDeTaleParlante3();
                                                }
                                        }
                                        function chargementDeTableParlante3() {
                                            if (question_counter === syllabes_tonifies.length)
                                                if (chargeur_de_tables.text() == "ߞߎߡߊߘߋ߲߫ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߦߌ߬ߘߊ߬")
                                                    $("#table_parlante_3").html(tableParlante3HTML(mots_tonifies));
                                        }
                                        function ecouterLaQuestionDExerciceDeTons() {

                                            rendreActif($("#exercice_question_btn"));
                                            indexer($("#exercice_question_btn p"));

                                            $("#exercice_question_btn").click(function (e) {
                                                e.stopImmediatePropagation();

                                                let exercice_question_btn = $(this);

                                                if (question_counter === tonifies.length) question_counter = 0;
                                                if (question_counter < syllabes_tonifies.length) exercice_tons_question = syllabes_tonifies[question_syllabe_counter];
                                                if (question_counter >= syllabes_tonifies.length) exercice_tons_question = mots_tonifies[question_mot_counter];

                                                montrerReponse(exercice_tons_question, $(".table_parlante span"));
                                                masquerNotification();

                                                masquerExerciceQuestionBtn();
                                                lireExerciceSyllabeQuestion();
                                                enregistrerExerciceSyllabeQuestion();
                                                afficherExerciceRepetitionBtn();

                                                function masquerExerciceQuestionBtn() { masquer(exercice_question_btn); }
                                                function lireExerciceSyllabeQuestion() {
                                                    // if (question_counter < syllabes_tonifies.length) lectureSyllabe(exercice_tons_question);
                                                    // if (question_counter >= syllabes_tonifies.length) lireMot(exercice_tons_question);
                                                    if (question_counter < syllabes_tonifies.length) lectureSyllabe(exercice_tons_question);
                                                    if (question_counter >= syllabes_tonifies.length) console.log(exercice_tons_question); /*lireMot(exercice_tons_question);*/
                                                }
                                                function enregistrerExerciceSyllabeQuestion() {
                                                    // if (question_counter < syllabes_tonifies.length) syllabes_tonifies_questions_posees.push(exercice_tons_question);
                                                    // if (question_counter >= syllabes_tonifies.length) mots_tonifies_questions_posees.push(exercice_tons_question);
                                                    if (question_counter < syllabes_tonifies.length) syllabes_tonifies_questions_posees.push(exercice_tons_question);
                                                    if (question_counter >= syllabes_tonifies.length) mots_tonifies_questions_posees.push(exercice_tons_question);
                                                }
                                            });
                                        }
                                        function repeterLaQuestionDExerciceDeTons() {
                                            $("#exercice_repetition_btn").click(function () {

                                                montrerReponse(exercice_tons_question, $(".table_parlante span"));
                                                relireExerciceQuestion();
                                                afficherExerciceRepetitionBtn();

                                                function relireExerciceQuestion() {
                                                    if (question_counter < syllabes_tonifies.length) lectureSyllabe(exercice_tons_question);
                                                }
                                            });
                                        }
                                        function afficherExerciceRepetitionBtn() {
                                            masquer($("#exercice_question_btn"));
                                            masquer($("#exercice_repetition_btn"));
                                            masquer($("#exercice_correction_btn"));

                                            attendre(100, () => {
                                                display($("#exercice_repetition_btn"));
                                                rendreActif($("#exercice_repetition_btn"));
                                            });
                                        }
                                        function repondreLaQuestionDExerciceDeTons() {
                                            $.each($(".table_parlante div span"), function () {
                                                $(this).click(function (e) {
                                                    e.stopImmediatePropagation();

                                                    element_actif = $(this);

                                                    table_parlante = element_actif.closest(".table_parlante").attr("id");
                                                    if (table_parlante == "table_parlante_2") tonifies_partiel = syllabes_tonifies;
                                                    if (table_parlante == "table_parlante_3") tonifies_partiel = mots_tonifies;

                                                    /* Au cas où on tente de repondre sans qu"une question soit posée, exercice_btn clignote pour rappel */
                                                    if (question_status == "repondue") secouer($("#exercice_question_btn"));
                                                    if (exercice_tons_question != "") {

                                                        mettreEnSurbrillance($(element_actif));
                                                        enregistrerExerciceTonsReponse();
                                                        afficherExerciceCorrectionBtn();


                                                        function enregistrerExerciceTonsReponse() {
                                                            exercice_tons_reponse = element_actif.text();
                                                        }
                                                        function afficherExerciceCorrectionBtn() {
                                                            masquer($("#exercice_question_btn"));
                                                            masquer($("#exercice_repetition_btn"));

                                                            attendre(100, () => {
                                                                display($("#exercice_correction_btn"));
                                                                rendreActif($("#exercice_correction_btn"));
                                                            });
                                                        }
                                                    }
                                                });
                                            });
                                        }
                                        function corrigerLaQuestionDExerciceDeTons() {

                                            let bonne_reponse_counter = 0;
                                            let nbr_bonne_reponse = 0;
                                            let nbr_mauvaise_reponse = 0;
                                            let point_total = 0;

                                            $("#exercice_correction_btn").click(function (e) {
                                                e.stopImmediatePropagation();

                                                question_status = "repondue";

                                                marquerReponse(element_actif, exercice_tons_question);
                                                enregistrerExerciceDeTons();
                                                incrementerLesCompteurs();
                                                stockerExercceDeTons();
                                                progressBarExerciceDeTons();
                                                rechargerExerciceDeTonsDialogueBtns();
                                                reAfficherExerciceQuestionBtn();
                                                reAfficherChargeurDeTablesParlantes();
                                                finDeExerciceSyllabe();
                                                suppressinonDeLEffetDeClickSurLesDialoguesBtns();


                                                function enregistrerExerciceDeTons() {

                                                    let question_reponse = [];

                                                    /*S'il n'y a pas de question, ne rien faire. */
                                                    if (exercice_tons_question == "") return false;

                                                    point = (exercice_tons_question == exercice_tons_reponse) ? 1 : 0;
                                                    question_reponse = [exercice_tons_question, exercice_tons_reponse, point];

                                                    if (table_parlante == "table_parlante_2") lesson_d_exercice_tons_du_jour[1].splice(question_syllabe_counter, 1, question_reponse);
                                                    if (table_parlante == "table_parlante_3") lesson_d_exercice_tons_du_jour[2].splice(question_mot_counter, 1, question_reponse);

                                                    if (exercice_tons_question == exercice_tons_reponse) { nbr_bonne_reponse++; point_total++; }
                                                    if (exercice_tons_question != exercice_tons_reponse) { nbr_mauvaise_reponse++; }

                                                    exercice_tons_question = "";
                                                    exercice_tons_reponse = "";
                                                }
                                                function incrementerLesCompteurs() {
                                                    if (question_counter <= tonifies.length) {
                                                        question_counter++;
                                                        if (question_counter < syllabes_tonifies.length) question_syllabe_counter++;
                                                        if (question_counter > syllabes_tonifies.length) question_mot_counter++;
                                                    }
                                                }
                                                function stockerExercceDeTons() {
                                                    if (question_counter === syllabes_tonifies.length) {
                                                        ton_exercice[2] = ton_exercice[2].concat(lesson_d_exercice_tons_du_jour[1]);
                                                    }
                                                    if (question_counter === tonifies.length) {
                                                        ton_exercice[3] = ton_exercice[3].concat(lesson_d_exercice_tons_du_jour[2]);
                                                        tons_exercices[0] = ton_exercice;

                                                        if (tons_exercices[0].length == 0) sendLessonDataToDB("tons_exercice", tons_exercices);
                                                        if (tons_exercices[0].length != 0) updateLessonData("tons_exercice", tons_exercices);

                                                        syllabes_de_reference_exerces.push(syllabe_de_reference);

                                                        console.log(ton_exercice);
                                                        console.log(tons_exercices);
                                                    }
                                                }
                                                function progressBarExerciceDeTons() {

                                                    let exercice_width = tonifies.length;
                                                    let diagramm_unity = 100 / exercice_width;

                                                    attendre(400, () => { display($(".progress_bar")); });

                                                    if (point === 1) {
                                                        bonne_reponse_counter++;

                                                        $(".progress_bonne_reponse_bar").css("width", bonne_reponse_counter * diagramm_unity + "%");
                                                        $(".progress_mauvaise_reponse_bar").css("width", question_counter * diagramm_unity + "%");
                                                    }
                                                    if (point === 0) {
                                                        $(".progress_mauvaise_reponse_bar").css("width", question_counter * diagramm_unity + "%");
                                                    }
                                                }
                                                function rechargerExerciceDeTonsDialogueBtns() {

                                                    rang = "߲";
                                                    action = "ߠߊߡߍ߲߫";
                                                    question_status = "posee";

                                                    if (question_counter > 0) {
                                                        if (question_counter < syllabes_tonifies.length) {
                                                            ordre_de_question = (question_syllabe_counter + 1 == syllabes_tonifies.length) ? "ߟߊߓߊ߲" : parseIntNko(question_syllabe_counter + 1) + rang;
                                                            $("#exercice_question_btn").text("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + parseIntNko(syllabes_tonifies.length) + " \\ " + ordre_de_question + " " + action);
                                                            $("#exercice_repetition_btn").text("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + ordre_de_question + " ߠߊߡߍ߲߫ ߕߎ߲߯");
                                                        }
                                                        if (question_counter === syllabes_tonifies.length) {
                                                            $("#chargeur_de_tables_parlantes").text("ߞߎߡߊߘߋ߲߫ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߦߌ߬ߘߊ߬");
                                                            $("#exercice_question_btn").text("<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + parseIntNko(mots_tonifies.length) + " \\ ߁߭ ߟߊߡߍ߲߫</p>");
                                                            $("#exercice_repetition_btn").text("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + parseIntNko(1) + "߭ ߟߊߡߍ߲߫ ߕߎ߲߯");
                                                        }
                                                        if (question_counter > syllabes_tonifies.length) {
                                                            ordre_de_question = (question_mot_counter + 1 == mots_tonifies.length) ? "ߟߊߓߊ߲" : parseIntNko(mots_tonifies_questions_posees + 1) + rang;
                                                            $("#exercice_question_btn").text("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + parseIntNko(syllabes_tonifies.length) + " \\ " + ordre_de_question + " " + action);
                                                            $("#exercice_repetition_btn").text("ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ " + ordre_de_question + " ߠߊߡߍ߲߫ ߕߎ߲߯");
                                                        }
                                                        if (question_counter === tonifies.length) $("#chargeur_de_tables_parlantes").text("ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߬");
                                                    }
                                                }
                                                function reAfficherExerciceQuestionBtn() {
                                                    affiche($("#exercice_dialogue_btns"));
                                                    masquer($("#exercice_dialogue_btns > div"));

                                                    display($("#exercice_question_btn"));
                                                    rendreActif($("#exercice_question_btn"));
                                                }
                                                function reAfficherChargeurDeTablesParlantes() {
                                                    if (question_counter === syllabes_tonifies.length) affiche($("#chargeur_de_tables_parlantes"));
                                                    if (question_counter === tonifies.length) affiche($("#chargeur_de_tables_parlantes"));
                                                }
                                                function finDeExerciceSyllabe() {
                                                    if (question_counter === tonifies.length) {

                                                        $.each($("#exercice_body td"), function () { $(this).click(function () { secouer($("#continu_sur_revision_btn")); }); });

                                                        let note_d_exercice_syllabes = calculerNote(lesson_d_exercice_tons_du_jour);

                                                        if (note_d_exercice_syllabes == 20) {

                                                            notificationDeRepriseDExercice();
                                                            affichageDeRepriseDExerciceBtn();
                                                            viderLeTableau(lesson_d_exercice_tons_du_jour);

                                                            function notificationDeRepriseDExercice() {
                                                                attendre(300, () => {
                                                                    let notification = liste_de_matieres[0][2] + " ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                                    ecris("exercice_notification_corps", notification);
                                                                });
                                                            }
                                                            function affichageDeRepriseDExerciceBtn() {
                                                                attendre(1800, () => { masquer($("#exercice_dialogue_btns")); });
                                                                attendre(2000, () => {
                                                                    afficher($("#exercice_redirection_btns"));

                                                                    afficher($("#reprendre_exercice_btn"));
                                                                    masquer($("#continu_sur_revision_btn"));
                                                                    rendreActif($("#reprendre_exercice_btn"));
                                                                    indexer($("#reprendre_exercice_btn p"));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exerciceSyllabe().

                                                                    console.log("Echec d'exercice");
                                                                });
                                                            }
                                                        }
                                                        if (note_d_exercice_syllabes == 0) {

                                                            notificationDeReussiteDExercice();
                                                            // affichageDeRevisionBtn();
                                                            afficherContinuExerciceDeTonsBtn();
                                                            continueSurLaPartieSuivanteDeLExercice();
                                                            finDExercice();

                                                            function notificationDeReussiteDExercice() {
                                                                attendre(300, () => {
                                                                    let notification = felicitation() + liste_de_matieres[1][2] + " ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. \n .<span class='exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .";
                                                                    ecris("exercice_notification_corps", notification);
                                                                });
                                                            }
                                                            function affichageDeRevisionBtn() {
                                                                attendre(1700, () => { masquer($("#exercice_dialogue_btns")); });
                                                                attendre(2000, () => {
                                                                    display($("#exercice_redirection_btns"));

                                                                    masquer($("#reprendre_exercice_btn"));
                                                                    afficher($("#continu_sur_revision_btn"));
                                                                    rendreActif($("#continu_sur_revision_btn"));
                                                                    indexer($("#continu_sur_revision_btn p"));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exerciceSyllabe().

                                                                    console.log("Fin d'exercice");
                                                                });
                                                            }
                                                            function afficherContinuExerciceDeTonsBtn() {
                                                                $("#chargeur_de_tables_parlantes").text("ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߬");
                                                                affiche($("#exercice_dialogue_btns"));
                                                                affiche($("#chargeur_de_tables_parlantes"));
                                                            }
                                                            function continueSurLaPartieSuivanteDeLExercice() {
                                                                $("#chargeur_de_tables_parlantes").click(function () {
                                                                    if (chargeur_de_tables.text() == "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߬") {

                                                                        effacerLesTablesParlantes();
                                                                        intialiserLesCompeurs();
                                                                        posititionnementInitialeDeZoneActive();
                                                                        actualiserSyllabesDeReferenceExerces();
                                                                        $("#chargeur_de_tables_parlantes").text("ߜߋ߲߭ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߦߌ߬ߘߊ߬");
                                                                        affiche($("#chargeur_de_tables_parlantes"));

                                                                        function actualiserSyllabesDeReferenceExerces() {
                                                                            syllabe_de_reference_container = $("#table_parlante_1 > div:nth-child(" + JSON.stringify(syllabes_de_reference_exerces.length + 1) + ")");
                                                                            syllabe_de_reference = syllabe_de_reference_container.text();
                                                                            styleDeTableau1(syllabes_de_reference_exerces);
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                            function finDExercice() {
                                                                if (syllabes_de_reference_exerces.length === total_syllabes_de_reference) {
                                                                    statut_d_exercice == "effectue";
                                                                    raffraichirLaPage();
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                function suppressinonDeLEffetDeClickSurLesDialoguesBtns() {
                                                    if (question_counter === syllabes_tonifies.length) {
                                                        $("#exercice_question_btn").unbind("click");
                                                        $("#exercice_repetition_btn").unbind("click");
                                                        $("#exercice_correction_btn").unbind("click");
                                                    }
                                                    if (question_counter === tonifies.length) {
                                                        $("#exercice_question_btn").unbind("click");
                                                        $("#exercice_repetition_btn").unbind("click");
                                                        $("#exercice_correction_btn").unbind("click");
                                                    }
                                                }

                                            });
                                        }
                                        function effacerLesTablesParlantes() {
                                            chargementParDefautDeTaleParlante2();
                                            chargementParDefautDeTaleParlante3();
                                        }
                                        function mouvemementDeZoneActive() {
                                            if (chargeur_de_tables.text() == "ߜߋ߲߭ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߦߌ߬ߘߊ߬") $("#zone_active").animate({ "width": "214px", "right": "94px" }, 250);
                                            if (chargeur_de_tables.text() == "ߞߎߡߊߘߋ߲߫ ߛߌ߬ߙߊ߬ߡߊ ߟߎ߬ ߢߊ߯ߡߌߣߍ߲ ߦߌ߬ߘߊ߬") $("#zone_active").animate({ "width": "320px", "right": "320px" }, 250);
                                            if (chargeur_de_tables.text() == "ߥߊ߫ ߞߊ߲ߡߊߛߙߋ ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߬") $("#zone_active").animate({ "width": "5rem", "right": 0 }, 250);
                                        }
                                        function intialiserLesCompeurs() {
                                            if (question_syllabe_counter === syllabes_tonifies.length) {
                                                question_syllabe_counter = 0;
                                                viderLeTableau(syllabes_tonifies);
                                            }
                                            if (question_mot_counter === syllabes_tonifies.length) {
                                                question_mot_counter = 0;
                                                viderLeTableau(mots_tonifies);
                                            }
                                            if (question_counter == tonifies.length) {
                                                question_counter = 0;
                                                question_syllabe_counter = 0;
                                                question_mot_counter = 0;
                                            }
                                        }
                                    });
                                }
                                function posititionnementInitialeDeZoneActive() {
                                    $("#zone_active").animate({ "width": "5rem", "right": 0 }, 250);
                                }
                                function styleDeTableau1(syllabes_de_reference) {
                                    let ln = syllabes_de_reference.length;
                                    $.each($("#table_parlante_1 div"), function () {
                                        let div_actif = $(this);
                                        let index = div_actif.index();

                                        if (index < ln) div_actif.removeClass().addClass("apprise");
                                        if (index == ln) div_actif.removeClass().addClass("actif indicateur");
                                        if (index > ln) div_actif.removeClass().addClass("a_apprendre");
                                    });
                                }
                            });

                            /* Si tons apprentissage est terminé, l'étudiant est dirigé directement sur Exercce de tons */
                            if (statut_d_apprentissage == "effectue")
                                if (statut_d_exercice == "non_effectue")
                                    if (statut_d_evaluaton == "non_effectue")
                                        $("#continu_sur_exercice_btn").click();
                        }
                        function revisionDeTon() {
                            $("#continu_sur_revision_btn").click(() => {
                                console.log("Début de revision");
                            });

                            /* Si tons apprentissage est terminé, l'étudiant est dirigé directement sur Exercce de tons */
                            if (statut_d_apprentissage == "effectue")
                                if (statut_d_exercice == "effectue")
                                    if (statut_d_evaluaton == "non_effectue")
                                        $("#continu_sur_revision_btn").click();

                        }
                        function evaluationDeTon() { }
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
                    for (let i = 0; i < 3; i++) {
                        if (datas[2][i] != undefined) {
                            if (datas[2][i].phase == "tons_apprentissage") { id[0] = JSON.parse(datas[2][i].id); }
                            if (datas[2][i].phase == "tons_exercice") { id[1] = JSON.parse(datas[2][i].id); }
                            if (datas[2][i].phase == "tons_revision") { id[2] = JSON.parse(datas[2][i].id); }
                        }
                    }
                }
                return id;
            }
        });
}