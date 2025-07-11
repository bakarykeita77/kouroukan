function syllabe() {

    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    var matiere_nom = matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));

    if (niveau_actif === 2) {

        var option_retenue = JSON.parse(localStorage.getItem('option_retenue'));
        var syllabe_apprentissage_clicks_memo = [];

        let lesson_d_apprentissage_syllabe_du_serveur = lessonDApprentissageSyllabeDuServeur();
        let lesson_d_exercice_syllabe_du_serveur = lessonDExerciceSyllabeDuServeur();
        let lesson_de_revision_syllabe_du_serveur = lessonDeRevisionSyllabeDuServeur();
        let lesson_d_evaluation_syllabe_du_serveur = lessonDEvaluationSyllabeDuServeur();

        lesson_d_apprentissage_syllabe_du_serveur = (lesson_d_apprentissage_syllabe_du_serveur == undefined) ? [] : lesson_d_apprentissage_syllabe_du_serveur;
        lesson_d_exercice_syllabe_du_serveur = (lesson_d_exercice_syllabe_du_serveur == undefined) ? [] : lesson_d_exercice_syllabe_du_serveur;
        lesson_de_revision_syllabe_du_serveur = (lesson_de_revision_syllabe_du_serveur == undefined) ? [] : lesson_de_revision_syllabe_du_serveur;
        lesson_d_evaluation_syllabe_du_serveur = (lesson_d_evaluation_syllabe_du_serveur == undefined) ? [] : lesson_d_evaluation_syllabe_du_serveur;

        if (lesson_d_apprentissage_syllabe_du_serveur.length === 126) {
            console.log("La leçon d'apprentissage syllabe est déjà faite.");
            return
        }
        if (lesson_d_exercice_syllabe_du_serveur.length === 126) {
            console.log("La leçon d'exercice syllabe est déjà faite.");
            return
        }
        if (lesson_de_revision_syllabe_du_serveur.length === 126) {
            console.log("La leçon de revision syllabe est déjà faite.");
            return
        }
        if (lesson_d_evaluation_syllabe_du_serveur.length === 126) {
            console.log("La leçon d'evaluation syllabe est déjà faite.");
            return
        }

        if (option_retenue != null) {
            switch (option_retenue) {
                case 1: preSyllabeNko(); break;
                case 2: syllabeNko(); break;
            }
        }


        function lessonDApprentissageSyllabeDuServeur() {

            let datas = JSON.parse(sessionStorage.getItem('datas'));

            if (datas.length === 0) return;
            let lass = [];

            if (datas[1] != undefined) {
                for (let i = 0; i < datas[1].length; i++) {
                    if (JSON.parse(datas[1][i].lesson).length === 126) {
                        let phase = datas[1][i].phase;
                        if (phase == "syllabe_apprentissage") { lass = JSON.parse(datas[1][i].lesson); }
                    }
                }
            }

            return lass;
        }
        function lessonDExerciceSyllabeDuServeur() {

            let datas = JSON.parse(sessionStorage.getItem('datas'));

            if (datas.length === 0) return;
            let less = [];

            if (datas[1] != undefined) {
                for (let j = 0; j < datas[1].length; j++) {
                    if (JSON.parse(datas[1][j].lesson).length === 126) {
                        let phase = datas[1][j].phase;
                        if (phase == "syllabe_exercice") { less = JSON.parse(datas[1][j].lesson); }
                    }
                }
            }

            return less;
        }
        function lessonDeRevisionSyllabeDuServeur() {

            let datas = JSON.parse(sessionStorage.getItem('datas'));

            if (datas.length === 0) return;
            let lers = [];

            if (datas[1] != undefined) {
                for (let k = 0; k < datas[1].length; k++) {
                    if (JSON.parse(datas[1][k].lesson).length === 126) {
                        let phase = datas[1][k].phase;
                        if (phase == "syllabe_evaluation") { lers = JSON.parse(datas[1][k].lesson); }
                    }
                }
            }

            return lers;
        }
        function lessonDEvaluationSyllabeDuServeur() {

            let datas = JSON.parse(sessionStorage.getItem('datas'));

            if (datas.length === 0) return;
            let levs = [];

            if (datas[1] != undefined) {
                for (let l = 0; l < datas[1].length; l++) {
                    if (JSON.parse(datas[1][l].lesson).length === 126) {
                        let phase = datas[1][l].phase;
                        if (phase == "syllabe_evaluation") { levs = JSON.parse(datas[1][l].lesson); }
                    }
                }
            }

            return levs;
        }
        function preSyllabeNko() {

            let lesson_active = '';
            let element_actif = '';

            let cercle_actif = '';
            let cercle_id = '';

            let quantite_normale_de_click = 1;

            let panneau_status = "masque";
            let consonnes_choisies = [];
            let consonnes_choisies_du_serveur = [];
            let memoire_consonnes_choisies = JSON.parse(localStorage.getItem('memoire_consonnes_choisies'));

            let lesson_d_apprentissage_pre_syllabe = lessonDApprentissagePreSyllabe();
            let lesson_d_exercice_pre_syllabe = lessonDExercicePreSyllabe();
            let lesson_de_revision_pre_syllabe = lessonDeRevisionPreSyllabe();
            let lesson_d_evaluation_pre_syllabe = lessonDEvaluationPreSyllabe();

            let lesson_d_apprentissage_pre_syllabe_du_jour = [];
            let lesson_d_exercice_pre_syllabe_du_jour = [];
            let lesson_de_revision_pre_syllabe_du_jour = [];
            let lesson_d_evaluation_pre_syllabe_du_jour = [];

            let syllabes_etudiees = JSON.parse(localStorage.getItem('syllabes_etudiees'));

            let texte_5 = "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߘߏ߫ ߟߎ߫ ߟߋ߬ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫";


            apprentissagePreSyllabe();
            exercicePreSyllabe();
            revisionPreSyllabe();
            evaluationPreSyllabe();

            $('#fermer_resultat').click(function () { $('#envelope').css('display', 'none'); });

            function apprentissagePreSyllabe() {

                chargerApprentissagePreSyllabe();
                afficherApprentissagePreSyllabe();
                apprendrePreSyllabe();

                function chargerApprentissagePreSyllabe() {

                    chargerEnteteDApprentissagePreSyllabe();
                    chargerFootDApprentissagePreSyllabe();
                    chargerCorpsDApprentissagePreSyllabe();


                    function chargerEnteteDApprentissagePreSyllabe() {
                        $('.notification_titre').html('ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                        viderNotification();
                        setTimeout(() => { ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬."); }, 3000);
                    }
                    function chargerFootDApprentissagePreSyllabe() {

                        var pre_exercice_panneaux_html = panneauxDesLettresHTML();
                        var apprentissage_dialogue_btns_html = "\
                            <div> \
                                <p class='titre_de_parti'> \
                                    <span>ߞߎߘߎ߲</span> \
                                    <span class='cercle' id='afficheur_de_panneau'>+</span> \
                                </p> \
                            </div> \
                        ";

                        $('#panneaux').html(pre_exercice_panneaux_html);
                        $('#apprentissage_dialogue_btns').html(apprentissage_dialogue_btns_html);
                        $('#pre_apprentissage_bouton').html("ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߞߍ߫");
                        $('#continu_sur_exercice_bouton').html("ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫");
                        $('#pre_evauation_bouton').html("ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߍ߫");

                        initialiserProgressBar();
                        panneauxStyle();


                        function panneauxDesLettresHTML() {

                            var consonnes = caracteres[1];

                            var html_2 = '<div id="consonnes_cadre">\n';
                            for (var i = 0; i < 18; i += 6) {
                                html_2 += "<div>\n";
                                for (var j = 0; j < 6; j++) {
                                    html_2 += "<span>" + consonnes[i + j] + "</span>";
                                }
                                html_2 += "</div>\n";
                            }
                            html_2 += '<div id="submit_panneau">ߏ߬ ߞߊߢߌ߲߬</div>\n';
                            html_2 += '</div>\n';

                            return html_2;
                        }
                        function panneauxStyle() {

                            consonnesChoisies();

                            $.each($('#panneaux span'), function () {

                                let panneaux_span = $(this);
                                let panneaux_consonne = ($(this).text());

                                if (memoire_consonnes_choisies != null) {
                                    memoire_consonnes_choisies.forEach(element => {
                                        if (element == panneaux_consonne) { panneaux_span.css({ 'color': 'orange', 'font-weight': 'bold', 'box-shadow': 'none' }); }
                                    });
                                }
                            });

                            function consonnesChoisies() {
                                consonnes_choisies_du_serveur = consonnesChoisiesDuServeur();

                                memoire_consonnes_choisies = JSON.parse(localStorage.getItem("memoire_consonnes_choisies"));
                                memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? consonnes_choisies_du_serveur : memoire_consonnes_choisies;

                                console.log("Les consonnes choisies sont :");
                                console.log(consonnes_choisies);
                                console.log(memoire_consonnes_choisies);

                                localStorage.setItem('memoire_consonnes_choisies', JSON.stringify(memoire_consonnes_choisies));

                                function consonnesChoisiesDuServeur() {

                                    let datas = JSON.parse(sessionStorage.getItem('datas'));
                                    let cs = [];

                                    let lesson = (datas[1][0] == undefined) ? [] : JSON.parse(datas[1][0].lesson);

                                    lesson.forEach(element => {
                                        let consonne = element[0].split('')[0];
                                        if ($.inArray(consonne, cs) === -1) { cs.push(consonne); }
                                    });
                                    return cs;
                                }
                            }
                        }
                    }
                    function chargerCorpsDApprentissagePreSyllabe() {

                        parametrageDeLesson();
                        preChargementDuTableauNoir();
                        chargementDuTableauNoir();

                        function preChargementDuTableauNoir() {
                            $('#table_syllabe_apprentissage').html("<div id='pre_texte'>ߜߋ߲߭ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬</div>");
                        }
                        function chargementDuTableauNoir() {
                            $('#panneaux span').click(function () {

                                var clicked_consonne_container = $(this);
                                var clicked_consonne = clicked_consonne_container.text();
                                var clicked_consonne_color = clicked_consonne_container.css('color');
                                let panneau_consonne_index = '';

                                choixDeLaConsonneAEtudier();
                                chargerTableauNoir();
                                afficherTableauNoir();
                                effacerTableauNoir();
                                stylesDesSyllabes();
                                progressBarrApprendrePreSyllabe();

                                function choixDeLaConsonneAEtudier() {

                                    if (clicked_consonne_color == 'rgb(255, 165, 0)') {
                                        alert('ߛߌ߬ߙߊ߬ߕߊ ߏ߬ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰ߣߍ߲߬ ߞߘߐ ߟߋ߬߹');
                                        return;
                                    }

                                    marquerLaConsonneChoisie(clicked_consonne_container);
                                    panneau_consonne_index = consonnes_choisies.indexOf(clicked_consonne);

                                    if (panneau_consonne_index == '-1') { consonnes_choisies.push(clicked_consonne); }
                                    if (panneau_consonne_index != '-1') { consonnes_choisies.splice(panneau_consonne_index, 1); }
                                }
                                function chargerTableauNoir() {

                                    decocherLesCaracteresNonConcernes();
                                    cocherLeCaractereAUtiliser();

                                    function decocherLesCaracteresNonConcernes() {

                                        decocherLesConsonnesNonUtilises();
                                        decocherLaNasalisationNonUtilisee();
                                        decocherLeTedo();

                                        function decocherLesConsonnesNonUtilises() {
                                            if ($('#consonnes_checker').find('.checkbox_parent').prop("checked") == true) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }
                                        }
                                        function decocherLaNasalisationNonUtilisee() {
                                            if ($('#nasalisation_checker').find('.check_btn:last-child input').prop("checked") == true) { $('#nasalisation_checker').find('.check_btn:last-child label').click(); }
                                        }
                                        function decocherLeTedo() {
                                            if ($('#tedo_checker').find('.check_btn:last-child input').prop("checked") == true) { $('#tedo_checker').find('.check_btn:last-child label').click(); }
                                        }
                                    }
                                    function cocherLeCaractereAUtiliser() {
                                        /*
                                         Cette fonction est liée à la fonction checkbox_childrenClick() dans la fonction chargerLesson() dans parametres.js.
                                         Lorsqu'on clique sur une consonne du panneaux, la valeur correspondante est recherchée et cliquée dans les check_btn
                                         au niveau de parametres.js. Ici la consonne cliquée est dans la variable clicked_consonne.
                                        */
                                        $.each($('.check_btn'), function () {
                                            var consonne_corespondante = $('label', this);
                                            if (clicked_consonne == consonne_corespondante.text()) { 
                                                if(panneau_consonne_index == "-1") 
                                                { consonne_corespondante.click(); }else
                                                { setTimeout(() => { consonne_corespondante.click(); stylesDesSyllabes(); }, 1000); } 
                                            }
                                        });
                                    }
                                }
                                function afficherTableauNoir() {
                                    if (panneau_consonne_index == '-1') {
                                        $.each($('#apprentissage_body tr'), function () {
                                            let consonne_du_tableau = $('td', this).text().split('')[0];
                                            $('#table_syllabe_apprentissage td').css('opacity', 1);

                                            if (clicked_consonne == consonne_du_tableau) {
                                                let td = $($('td', this));
                                                td.css({ 'transform': 'scale(0)' });
                                                $.each(td, function () {
                                                    let index_td = $(this).index();
                                                    setTimeout(() => { $(this).css('transform', 'scale(1)'); }, index_td * 100);
                                                });
                                            }
                                        });
                                    }
                                }
                                function effacerTableauNoir() {
                                    if (panneau_consonne_index != '-1') {
                                        $.each($('#apprentissage_body tr'), function () {
                                            let consonne_de_la_ligne = $(this).text().split("")[1];

                                            $('#table_syllabe_apprentissage td').css('opacity', 1);
                                            console.log(clicked_consonne + "==" + consonne_de_la_ligne);
                                            if (clicked_consonne == consonne_de_la_ligne) {
                                                let tr_actif = $(this);
                                                tr_actif.css({ 'transform': 'scale(1)' });

                                                $.each($('td', this), function () {

                                                    let td = $(this);
                                                    let td_index = td.index();

                                                    setTimeout(() => { td.css({ 'transform': 'scale(0)' }); }, (7 - td_index) * 100);
                                                    setTimeout(() => { tr_actif.css('display', 'none'); }, 800);
                                                });
                                            }
                                        });
                                    }
                                }
                                function stylesDesSyllabes() {
                                    let td = $('#table_syllabe_apprentissage td');

                                    $.each(td, function () {
                                        let compteur = 0;
                                        $(this).css({ 'background-color': 'rgb(85, 85, 85)', 'color': 'yellow', 'opacity':1 });
                                        $(this).click(function () {
                                            let td_actif = $(this);
                                            compteur++;

                                            if (compteur == quantite_normale_de_click) {
                                                td_actif.css({
                                                    'background-color': 'transparent',
                                                    'color': 'yellow',
                                                    'border': '1px solid rgb(85, 85, 85)'
                                                });
                                            }
                                        });
                                    });
                                }
                                function progressBarrApprendrePreSyllabe() {

                                    let td = $('#table_syllabe_apprentissage td');
                                    let progress_unity = 100 / [(td.length) * quantite_normale_de_click];
                                    let good_response_width = 0;
                                    let total_clicks_normal = 0;

                                    // masquerDialogueBtn();

                                    $.each(td, function () {
                                        let compteur_td_click = 0;

                                        $(this).click(function () {
                                            if (compteur_td_click < quantite_normale_de_click) {
                                                compteur_td_click++;
                                                total_clicks_normal++;

                                                actualiserPreSyllabeProgressBar()
                                                reInitialiserProgressBar();

                                                function reInitialiserProgressBar() {
                                                    if (total_clicks_normal === (td.length) * quantite_normale_de_click) {
                                                        setTimeout(() => { initialiserProgressBar(); }, 1000);
                                                    }
                                                }
                                            }

                                            function actualiserPreSyllabeProgressBar() {
                                                good_response_width += progress_unity;
                                                $('.progress_bonne_reponse_bar_integre').css('width', good_response_width + '%');
                                            }
                                        });
                                    });

                                    function masquerDialogueBtn() {
                                        $('#panneaux').css('height', 0);
                                        $('.progress_bar_integre').css('display', 'block');
                                        $('#pre_apprentissage_btns').css('display', 'none');
                                        $('#apprentissage_dialogue_btn').css('display', 'none');
                                    }
                                }
                            });
                            $("#submit_panneau, #afficheur_de_panneau").click(() => {
                                localStorage.setItem("consonnes_choisies", JSON.stringify(consonnes_choisies));
                            });
                        }
                    }
                }
                function afficherApprentissagePreSyllabe() {

                    masquer($('.direction'));
                    afficher($('.salle_de_classe'));
                    afficher($('.course'));

                    $('#apprentissage_container').css('display', 'block');
                    $('#exercice_container').css('display', 'none');
                    $('#revision_container').css('display', 'none');
                    $('#evaluation_container').css('display', 'none');

                    setTimeout(() => { displayv($('#apprentissage_head')); }, 400);
                    setTimeout(() => { displayv($('#apprentissage_body')); }, 800);
                    setTimeout(() => {
                        displayv($('#apprentissage_foot'));
                        setTimeout(() => { afficherPreApprentissageBtns(); }, 100);
                    }, 1200);

                    affichageDeModificateurDeChoix();
                    affichageDePanneauDesConsonnes();

                    function affichageDeModificateurDeChoix() {
                        $('.modificateur_de_choix_btn').on('click', function () {
                            if ($('.modificateur_de_choix_message').css('display') == 'none') {
                                $('.modificateur_de_choix_message').css({ 'display': 'block', 'height': '4rem' });
                            } else {
                                $('.modificateur_de_choix_message').css('height', 0);
                                setTimeout(() => { $('.modificateur_de_choix_message').css('display', 'none'); }, 100);
                            }
                        });

                        $('.modificateur_de_choix_message button').click(function () {
                            $('.modificateur_de_choix_message').css('height', 0);
                            setTimeout(() => { $('.modificateur_de_choix_message').css('display', 'none'); }, 100);
                        });
                    }
                    function affichageDePanneauDesConsonnes() {
                        $('#afficheur_de_panneau').click(function (e) {
                            e.stopImmediatePropagation();
                            $(this).removeClass('indicateur');
                            if (panneau_status == "masque") { afficherPanneau() } else { masquerPanneau(); };
                        });
                        masquerLePanneauDesConsonnes();

                        function masquerLePanneauDesConsonnes() {
                            $('#submit_panneau, #afficheur_de_panneau').on('click', masquerPanneau);
                        }
                        function afficherPanneau() {
                            $('#panneaux').css({ 'position': 'absolute', 'height': '20rem' });
                            $('#consonnes_cadre').animate({ 'top': '5.5rem' }, 250);
                            panneau_status = "affiche";

                            viderNotification();
                            setTimeout(() => { ecris("apprentissage_notification_corps", "ߛߌ߬ߙߕߊ߬ ߞߋߟߋ߲߫ ߥߟߊ ߛߌߦߊߡߊ߲߫ ߛߎߥߊ߲ߘߌ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰."); }, 800);
                        }
                        function masquerPanneau() {
                            $('#consonnes_cadre').animate({ 'top': '12rem' }, 250);
                            setTimeout(function () { $('#panneaux').css('height', 0); }, 250);
                            panneau_status = "masque";

                            viderNotification();
                            if ($('.table_parlante tr').length == 0) setTimeout(() => { ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬."); }, 800);
                            if ($('.table_parlante tr').length != 0) {
                                setTimeout(() => { $('#apprentissage_dialogue_btns').css('display', 'none'); }, 400);
                                setTimeout(() => { $('#apprentissage_progress_bar').css('display', 'block'); }, 500);
                                setTimeout(() => { ecris("apprentissage_notification_corps", "ߜߋ߲߭ ߢߌ߲߬ ߠߎ߫ ߞߋ߬ߟߋ߲߬ ߞߋ߬ߟߋ߲߬ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߴߌ ߞߣߐ߫."); }, 800);
                            }
                        }
                    }
                }
                function apprendrePreSyllabe() {
                    $('#panneaux span').click(function () {

                        let td = $('.table_parlante td');
                        let compteur_de_syllabe = 0;
                        let apprentissage_width = 0;
                        let global_clicks_counter = 1;

                        initialiserApprentissagePreSyllabe();
                        $.each(td, function () {
                            let compteur_td_click = 0;
                            $(this).click(function () {

                                let td_actif = $(this);
                                let tr_index = td_actif.parent().index();
                                let td_index = td_actif.index() + tr_index * 7;
                                let syllabe_clique = td_actif.text();

                                compteur_td_click++;

                                lire('ߊ', syllabe_clique);
                                enregistrerApprentissagePreSyllabe();
                                progressBarApprentissagePreSyllabe();
                                finDApprentissagePreSyllabe();


                                function enregistrerApprentissagePreSyllabe() {

                                    let mark = (compteur_td_click >= quantite_normale_de_click) ? 1 : 0;

                                    lesson_d_apprentissage_pre_syllabe_du_jour.splice(td_index, 1, [syllabe_clique, compteur_td_click, mark]);
                                    if (compteur_td_click === quantite_normale_de_click) { compteur_de_syllabe++; }
                                }
                                function progressBarApprentissagePreSyllabe() {
                                    if (compteur_td_click <= quantite_normale_de_click) {

                                        let clicked_td_length = quantite_normale_de_click * lesson_d_apprentissage_pre_syllabe_du_jour.length;
                                        let diagramm_unity = 100 / clicked_td_length;
                                        let global_clicks_count = global_clicks_counter++;

                                        apprentissage_width = global_clicks_count * diagramm_unity;
                                        $('#apprentissage_progress_bar .progress_bonne_reponse_bar').css('width', apprentissage_width + '%');

                                        //Initialiser la barre de progression
                                        if (global_clicks_count / quantite_normale_de_click == lesson_d_apprentissage_pre_syllabe_du_jour.length) {
                                            setTimeout(() => {
                                                $('#apprentissage_progress_bar').css('display', 'none');
                                                $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);
                                                td_click_counter = 0;
                                                compteur_td_click = 0;
                                                apprentissage_width = 0;
                                                global_clicks_counter = 1;
                                            }, 400);
                                        }
                                    }
                                }
                                function finDApprentissagePreSyllabe() {
                                    if (compteur_de_syllabe === lesson_d_apprentissage_pre_syllabe_du_jour.length) {

                                        let note_d_apprentissage_pre_syllabe = calculerNote(lesson_d_apprentissage_pre_syllabe_du_jour);
                                        if (note_d_apprentissage_pre_syllabe === 100) {

                                            // resultatApprentissagePreSyllabe();
                                            viderNotification();
                                            setTimeout(() => {

                                                setTimeout(() => {
                                                    ecris('apprentissage_notification_corps', "ߌ ߞߎߟߎ߲ߖߋ߫ ߘߐ߬ߖߊ ߟߊ߫ ߞߊ߬ ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߞߍ߫߸ ߛߌߛߊ߲߬ ߡߊ߬ߞߟߏ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߜߋ߲߭ ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߟߎ߬ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫");
                                                }, 400);

                                                $('#apprentissage_dialogue_btns').css('display', 'none');
                                                initialiserProgressBarIntegre();
                                                exercicePreSyllabe();
                                                setTimeout(() => { afficherPreExerciceBtn(); }, 200);
                                            }, 600);

                                            function resultatApprentissagePreSyllabe() {

                                                resultat(lesson_d_apprentissage_pre_syllabe_du_jour);
                                                adapterLeResultatAuFormatDApprentissage(lesson_d_apprentissage_pre_syllabe_du_jour);
                                                afficherApprentissagePreSyllabeResultat();
                                                masquerApprentissagePreSyllabeResultat();

                                                function afficherApprentissagePreSyllabeResultat() { goDown($('.resultat_container')); }
                                                function masquerApprentissagePreSyllabeResultat() {
                                                    $('#fermer_resultat, #avance').click(function () {
                                                        $('.resultat_container').css('display', 'none');
                                                        formatParDefautDuResultat();
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        });

                        function initialiserApprentissagePreSyllabe() {
                            let td_to_click = $('#table_syllabe_apprentissage td');

                            lesson_d_apprentissage_pre_syllabe_du_jour.splice(0, consonnes.length);
                            lesson_d_apprentissage_pre_syllabe_du_jour = initialiserData(td_to_click);
                        }
                    });
                }
            }
            function exercicePreSyllabe() {
                $('#exercice_bouton, #reprendre_exercice_bouton, #continu_sur_exercice_bouton').click(function (e) {
                    e.stopImmediatePropagation();

                    lesson_d_exercice_pre_syllabe = lessonDExercicePreSyllabe();
                    lesson_active = 'pre_exercice';
                    sessionStorage.setItem('lesson_active', JSON.stringify(lesson_active));
                    syllabes_actives = syllabesActives();

                    let exercice_pre_syllabe_questions = malaxer(malaxer(syllabes_actives));
                    let ordre_de_question = '';
                    let total_exercice_pre_syllabe_questions = 0;
                    let exercice_pre_syllabe_questions_posees = [];
                    let exercice_pre_syllabe_question = '', exercice_pre_syllabe_reponse = '';
                    let point = 0;

                    total_exercice_pre_syllabe_questions = exercice_pre_syllabe_questions.length;

                    $('.fermeture_pre').attr('id', 'fermeture_pre_exercice');

                    chargerExercicePreSyllabe();
                    afficherExercice();
                    exercice();


                    function chargerExercicePreSyllabe() {

                        chargerEnteteDExercicePreSyllabe();
                        chargerPiedDExercicePreSyllabe();
                        chargerCorpsDExercicePreSyllabe();

                        function chargerEnteteDExercicePreSyllabe() {
                            $('.notification_titre').html('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ');
                            viderNotification();
                            setTimeout(() => {
                                ecris('exercice_notification_corps', "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߟߎ߫ ߟߋ߬ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߵߊ߬ߟߎ߫ ߦߌ߬ߘߊ߬߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫.");
                            }, 800);
                        }
                        function chargerPiedDExercicePreSyllabe() {
                            total_exercice_pre_syllabe_questions = exercice_pre_syllabe_questions.length;

                            $('#exercice_dialogue_btns').html('\
                            <div class="question_btn" id="exercice_question_btn"></div> \
                            <div class="repetition_btn" id="exercice_repetition_btn"></div> \
                            <div class="correction_btn" id="exercice_correction_btn">ߏ߬ ߛߊߞߍ߫</div> \
                            ');

                            $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(total_exercice_pre_syllabe_questions) + ' \\ ߁߭ ߟߊߡߍ߲߫');
                            $('#reprendre_exercice_bouton').html('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯');
                            $('#continu_sur_revision_bouton').html('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫');
                        }
                        function chargerCorpsDExercicePreSyllabe() {
                            let exercice_body_html = lessonHTML(malaxer(syllabes_actives), '');
                            $('#exercice_body').html(exercice_body_html);
                        }
                    }
                    function exercice() {

                        initialiserExercicePreSyllabe();
                        gestionDeExerciceBtns();
                        ecouterLaQuestionDExercicePreSyllabe();
                        repondreLaQuestionDExercicePreSyllabe();
                        corrigerLaQuestionDExercicePreSyllabe();


                        function initialiserExercicePreSyllabe() {
                            lesson_d_exercice_pre_syllabe_du_jour = initialiserData(exercice_pre_syllabe_questions);
                        }
                        function ecouterLaQuestionDExercicePreSyllabe() {

                            let i = 0;

                            $('#exercice_question_btn').click(function (e) {
                                e.stopImmediatePropagation();

                                ordre_de_question = (total_exercice_pre_syllabe_questions == i + 2) ? 'ߟߊߓߊ߲' : parseIntNko(i + 2);
                                $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(total_exercice_pre_syllabe_questions) + ' \\ ' + ordre_de_question + '߲ ߠߊߡߍ߲߫');
                                $('#exercice_repetition_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(i + 1) + '߲ ߠߊߡߍ߲߫ ߕߎ߲߯');
                                exercice_pre_syllabe_question = exercice_pre_syllabe_questions[i];

                                //alert(exercice_pre_syllabe_question);
                                console.log(exercice_pre_syllabe_question);

                                if (i < exercice_pre_syllabe_questions.length) {
                                    lire('ߊ', exercice_pre_syllabe_question);
                                    relire(exercice_pre_syllabe_question);
                                    exercice_pre_syllabe_questions_posees.push(exercice_pre_syllabe_question);
                                }
                                i++;
                                if (i == exercice_pre_syllabe_questions.length) {
                                    $('#exercice_question_btn').css('display', 'none');
                                    i = 0;
                                }

                                function relire(exercice_pre_syllabe_question) { $('#exercice_repetition_btn').click(function () { lire('ߊ', exercice_pre_syllabe_question); }); }
                            });
                        }
                        function repondreLaQuestionDExercicePreSyllabe() {
                            $.each($('#exercice_body td'), function () {
                                $(this).click(function () {
                                    if (exercice_pre_syllabe_question != '') {
                                        exercice_pre_syllabe_reponse = this.innerHTML;

                                        element_actif = $(this);
                                        $('#exercice_body table td').css({ 'background-color': 'rgba(85,85,85,0.25)', 'color': 'white' });
                                        marquerLaConsonneChoisie(element_actif);
                                        rendreActif($('#exercice_correction_btn'));
                                    }
                                });
                            });
                        }
                        function corrigerLaQuestionDExercicePreSyllabe() {

                            let pre_question_counter = 0;
                            let bonne_reponse_counter = 0;

                            let nbr_bonne_reponse = 0;
                            let nbr_mauvaise_reponse = 0;
                            let point_total = 0;

                            $('#exercice_correction_btn').click(function () {
                                if (exercice_pre_syllabe_questions_posees.length <= total_exercice_pre_syllabe_questions) {

                                    marquerReponse(element_actif, exercice_pre_syllabe_question);
                                    enregistrerPreExerciceSyllabe();
                                    progressBarPreExerciceSyllabe();
                                    finDePreExerciceSyllabe();


                                    function enregistrerPreExerciceSyllabe() {

                                        let question_reponse = [];

                                        //S'il n'y a pas de question, ne rien faire.
                                        if (exercice_pre_syllabe_question == '') return false;

                                        point = (exercice_pre_syllabe_question == exercice_pre_syllabe_reponse) ? 1 : 0;
                                        question_reponse = [exercice_pre_syllabe_question, exercice_pre_syllabe_reponse, point];
                                        lesson_d_exercice_pre_syllabe_du_jour.splice(pre_question_counter, 1, question_reponse);

                                        if (exercice_pre_syllabe_question == exercice_pre_syllabe_reponse) { nbr_bonne_reponse++; point_total++; }
                                        if (exercice_pre_syllabe_question != exercice_pre_syllabe_reponse) { nbr_mauvaise_reponse++; }

                                        exercice_pre_syllabe_question = '';
                                        exercice_pre_syllabe_reponse = '';
                                    }
                                    function progressBarPreExerciceSyllabe() {

                                        let pre_exercice_width = total_exercice_pre_syllabe_questions;
                                        let diagramm_unity = 100 / pre_exercice_width;

                                        setTimeout(() => { $('.progress_bar').css('display', 'block'); }, 400);

                                        pre_question_counter++;

                                        if (point === 1) {
                                            bonne_reponse_counter++;

                                            $('.progress_bonne_reponse_bar').css('width', bonne_reponse_counter * diagramm_unity + '%');
                                            $('.progress_mauvaise_reponse_bar').css('width', pre_question_counter * diagramm_unity + '%');
                                        }
                                        if (point === 0) {
                                            $('.progress_mauvaise_reponse_bar').css('width', pre_question_counter * diagramm_unity + '%');
                                        }
                                    }
                                    function finDePreExerciceSyllabe() {
                                        if (exercice_pre_syllabe_questions_posees.length === total_exercice_pre_syllabe_questions) {

                                            let note_d_exercice_pre_syllabe = calculerNote(lesson_d_exercice_pre_syllabe_du_jour);

                                            if (note_d_exercice_pre_syllabe === 100) {

                                                // preExerciceResultat();
                                                fermerPreExercice();

                                                setTimeout(() => {

                                                    $('#exercice_dialogue_btns').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫');
                                                    $('#exercice_progress_bar').css('display', 'none');
                                                    displayv($('#exercice_redirection_btns'));

                                                    // setTimeout(() => { preExerciceResultat(); }, 300);

                                                    if (note_d_exercice_pre_syllabe < 100) {

                                                        viderNotification();
                                                        setTimeout(() => {
                                                            let notification = liste_de_matieres[0][1] + " ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                            ecris('exercice_notification_corps', notification);
                                                        }, 800);

                                                        $('#reprendre_exercice_bouton').css('display', 'block');
                                                        $('#continu_sur_revision_bouton').css('display', 'none');
                                                        indexer($('#reprendre_exercice_bouton'));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exercicePreSyllabe().

                                                        lesson_d_exercice_pre_syllabe_du_jour.splice(0, lesson_d_exercice_pre_syllabe_du_jour.length);
                                                    }
                                                    if (note_d_exercice_pre_syllabe == 100) {

                                                        viderNotification();
                                                        setTimeout(() => {
                                                            let notification = liste_de_matieres[1][1] + " ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                            ecris('exercice_notification_corps', notification);
                                                        }, 800);

                                                        $('#reprendre_exercice_bouton').css('display', 'none');
                                                        $('#continu_sur_revision_bouton').css('display', 'block');
                                                        indexer($('#continu_sur_revision_bouton'));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exercicePreSyllabe().
                                                    }

                                                    $('#deliberation').click(function () { goUp($('.resultat_container')); });

                                                    // Initialiser exercice
                                                    setTimeout(() => {
                                                        initialiserProgressBar();
                                                        // initialiserExercice();
                                                    }, 600);
                                                }, 800);


                                                function fermerPreExercice() {
                                                    $('.fermeture_pre').one('click', function () {

                                                        cercle_id = $('.apprentissage_en_cours').attr('id');
                                                        exercice_btn_id = $('.exercice_en_cours').attr('id');

                                                        zoomDown($('#exercice_body'));
                                                        setTimeout(() => {
                                                            $('#exercice_body').css('display', 'none');
                                                            $('#pre_exercice_resultat').css('top', '-100%');
                                                        }, 250);

                                                        viderNotification();
                                                        setTimeout(() => {

                                                            if (lesson_active == 'pre_exercice') {
                                                                if (note_d_exercice_pre_syllabe < 100) {
                                                                    $('#exercice_bouton').text('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯');
                                                                    afficherPreExerciceBtn();
                                                                }
                                                                if (note_d_exercice_pre_syllabe == 100) {
                                                                    afficherPreRevisionBtn();
                                                                    $('#exercice_bouton').removeClass('exercice_en_cours').addClass('carre_depasse').css('z-index', 0);
                                                                }
                                                            }

                                                            if (lesson_active == 'pre_revision') {

                                                                if (note_d_exercice_pre_syllabe < 100) {
                                                                    afficherPreRevisionBtn();
                                                                    $('#evaluation_bouton').text('ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                                                                }
                                                                if (note_d_exercice_pre_syllabe == 100) {
                                                                    setTimeout(() => { afficherPreApprentissageBtns(); }, 400);
                                                                    $('#' + cercle_id).removeClass('apprentissage_en_cours').addClass('cercle_depasse');
                                                                    rendreActif($('#' + cercle_id).next());

                                                                    setTimeout(() => { ecris('exercice_notification_corps', 'ߞߎߘߎ߲߫ ' + cercle_actif.next().html() + ' ߘߌ߲߯ ߘߎ߭ߡߊ߬'); }, 800);
                                                                }
                                                            }
                                                        }, 250);
                                                    });
                                                }
                                                function preExerciceResultat() {

                                                    initialiserExerciceResultat();
                                                    formatParDefautDuResultat();
                                                    resultat(lesson_d_exercice_pre_syllabe_du_jour);
                                                    afficherExerciceResultat();
                                                    masquerExerciceSyllabeResultat();


                                                    function afficherExerciceResultat() {
                                                        goDown($('.resultat_container'));
                                                    }
                                                    function masquerExerciceSyllabeResultat() {
                                                        $('#apprentissage #fermer_resultat').click(function () {
                                                            goUp($('.resultat_container'));
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (exercice_pre_syllabe_questions_posees.length == total_exercice_pre_syllabe_questions) { $('#exercice_btns').css('display', 'none'); }
                            });
                        }
                    }
                    function syllabesActives() {
                        let sa = [];
                        lesson_d_apprentissage_pre_syllabe_du_jour.forEach(element => { sa.push(element[0]); });
                        return sa;
                    }
                });
            }
            function revisionPreSyllabe() {
                $('#revision_bouton, #reprendre_revision_bouton, #continu_sur_revision_bouton').click(function (e) {
                    e.stopImmediatePropagation();

                    lesson_de_revision_pre_syllabe = lessonDeRevisionPreSyllabe();

                    let syllabes_nouvellement_apprises = [];
                    let syllabes_anciennement_apprises = [];
                    var syllabes_a_reviser = [];

                    var question_de_revision_pre_syllabe = '', reponse_de_revision_pre_syllabe = [];
                    var compteur = incrementer();
                    var revision_counter = 0;
                    let good_response_counter = 0;

                    var q_revision_total = parseIntNko(lesson_d_apprentissage_pre_syllabe.length);
                    var q_revision_index = 0, q_revision_rang = '߭';
                    var q_revision_ordre = parseIntNko(q_revision_index + 1);
                    var q_revision_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                    var q_revision_rang = '߭';
                    var q_revision_action = 'ߟߊߡߍ߲߫';

                    lesson_active = 'pre_revision';

                    chargerRevisionPreSyllabe();
                    afficherRevision();
                    revisionPreSyllabe();


                    function chargerRevisionPreSyllabe() {

                        chargerRevisionPreSyllabeHead();
                        chargerRevisionPreSyllabeBody();
                        chargerRevisionPreSyllabeFoot();


                        function chargerRevisionPreSyllabeHead() {
                            $('.notification_titre').text('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ');
                            viderNotification();
                            setTimeout(() => { ecris("revision_notification_corps", "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߘߏ߫ ߟߎ߫ ߟߋ߬ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ . ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߊߟߎ߬ ߛߓߍ߫߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫."); }, 800);
                        }
                        function chargerRevisionPreSyllabeBody() {

                            var evaluation_body_html = revisionBodyHTML();

                            $('#revision_body').html(evaluation_body_html);

                            function revisionBodyHTML() {

                                syllabes_a_reviser = syllabesAReviser();

                                let rbh = lessonHTML(syllabes_a_reviser, '');
                                return rbh;

                                function syllabesAReviser() {

                                    let sar = [];

                                    syllabes_nouvellement_apprises = syllabesNouvellementapprises();
                                    syllabes_anciennement_apprises = syllabesAnciennementapprises();

                                    if (syllabes_anciennement_apprises.length == 0) {
                                        sar = malaxer(syllabes_nouvellement_apprises);
                                    } else {
                                        let nouveaux_syllabes_melanges = malaxer(syllabes_nouvellement_apprises);
                                        let anciens_syllabes_melanges = malaxer(syllabes_anciennement_apprises);

                                        for (let i = 0; sar.length < (7 + syllabes_nouvellement_apprises.length); i++) {  // 7 est le nombre d'anciens syllabe à mélanger aux nouvelles apprises
                                            if (paire(i) == true) { sar.push(nouveaux_syllabes_melanges.pop()); }
                                            if (paire(i) == false) { sar.push(anciens_syllabes_melanges.pop()); }
                                        }
                                    }

                                    return sar;

                                    function syllabesAnciennementapprises() {

                                        // Soustraction des nouvelles syllabes de toute les syllabes apprises
                                        let syllabes_apprises = syllabesApprises();
                                        let anciennes_syllabes = [];

                                        for (let i = 0; i < syllabes_apprises.length; i++) {
                                            let syllabe_apprise = syllabes_apprises[i];
                                            if (syllabes_nouvellement_apprises.indexOf(syllabe_apprise) === -1) anciennes_syllabes.push(syllabe_apprise);
                                        }

                                        return anciennes_syllabes;
                                    }
                                    function syllabesNouvellementapprises() {
                                        let nouvelles_syllabes = [];
                                        for (let i = 0; i < lesson_d_apprentissage_pre_syllabe_du_jour.length; i++) {
                                            nouvelles_syllabes.push(lesson_d_apprentissage_pre_syllabe_du_jour[i][0]);
                                        }
                                        return nouvelles_syllabes;
                                    }
                                    function syllabesApprises() {
                                        let sa = [];
                                        for (let i = 0; i < lesson_d_apprentissage_pre_syllabe.length; i++) {
                                            sa.push(lesson_d_apprentissage_pre_syllabe[i][0]);
                                        }
                                        return sa;
                                    }
                                }
                            }
                        }
                        function chargerRevisionPreSyllabeFoot() {

                            $('#revision_dialogue_btns').html('\
                                <div class="question_btn" id="revision_question_btn"></div> \
                                <div class="repetition_btn" id="revision_repetition_btn"></div> \
                                <div class="correction_btn" id="revision_correction_btn">ߏ߬ ߛߊߞߍ߫</div> \
                            ');

                            initialisationDeRevisionFoot();

                            $('#continu_sur_apprentissage_bouton').html('ߥߊ߫ ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߊߌ ߡߊ߬');
                            $('#reprendre_revision_bouton').html('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߌߦߌ ߞߍ߫ ߕߎ߲߯');
                            $('#evaluation_bouton').html('ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߍ߫');
                            $('#syllabe_bouton').html('ߞߊ߲ߡߊߛߙߋ ߘߊߡߌ߬ߘߊ߬');

                            function initialisationDeRevisionFoot() {

                                q_revision_total = parseIntNko(syllabes_a_reviser.length);
                                q_revision_index = 0;
                                q_revision_ordre = parseIntNko(q_revision_index + 1);
                                q_revision_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                                q_revision_rang = '߭';
                                q_revision_action = 'ߟߊߡߍ߲߫';

                                $('#revision_question_btn').html(q_revision_label + ' ' + q_revision_total + ' \\ ' + q_revision_ordre + q_revision_rang + ' ' + q_revision_action);
                                $('#revision_repetition_btn').html(q_revision_label + ' ' + q_revision_ordre + q_revision_rang + ' ߠߊߡߎ߲߫ ߕߎ߲߯');
                                $('#revision_correction_btn').html('ߏ߬ ߛߊߞߍ߫');
                            }
                        }
                    }
                    function revisionPreSyllabe() {

                        let clicked_response_element = '';

                        let revision_pre_syllabe_questions = malaxer(syllabes_a_reviser);

                        initialiserRevisionPreSyllabe();
                        gestionDeDialogueBtns();
                        poserQuestionRevision();
                        repeterQuestionRevision();
                        repondreQuestionRevision();
                        correctionRevision();


                        function initialiserRevisionPreSyllabe() {
                            lesson_de_revision_pre_syllabe_du_jour = initialiserData(revision_pre_syllabe_questions);
                        }
                        function poserQuestionRevision() {
                            $('#revision_question_btn').on('click', function (e) {
                                e.stopImmediatePropagation();

                                question_de_revision_pre_syllabe = revision_pre_syllabe_questions[q_revision_index];
                                //alert(question_de_revision_pre_syllabe);
                                console.log(question_de_revision_pre_syllabe);
                                dicterLaQuestion();
                                actualiserLesLibellesDeDialogueBtn();


                                function actualiserLesLibellesDeDialogueBtn() {
                                    q_revision_index = compteur();
                                    q_revision_ordre = parseIntNko(q_revision_index + 1);
                                    q_revision_rang = (q_revision_index == 0) ? '߭' : '߲';

                                    // $('.repetition_btn').html(q_revision_label+' '+parseIntNko(q_revision_index)+q_revision_rang+' ߠߊߡߎ߲߫ ߕߎ߲߯');

                                    $('.question_label').html(q_revision_label);
                                    $('.question_total').html(q_revision_total);
                                    $('.question_ordre').html(q_revision_ordre + q_revision_rang);
                                    $('.question_action').html(q_revision_action);

                                }
                                function dicterLaQuestion() { lireLettre('ߊ', question_de_revision_pre_syllabe); }
                            });
                        }
                        function repeterQuestionRevision() {
                            $('#revision_repetition_btn').on('click', function () {
                                lireLettre('ߊ', question_de_revision_pre_syllabe);
                            });
                        }
                        function repondreQuestionRevision() {
                            $('#revision_body table td').on('click', function (e) {
                                e.stopImmediatePropagation();

                                clicked_response_element = $(this);
                                if (question_de_revision_pre_syllabe == '') rappel($('#evaluation_dialogue_btn'));
                                if (question_de_revision_pre_syllabe != '') {
                                    reponse_de_revision_pre_syllabe = $(this).text();
                                    $('#revision_body table td').css({ 'background-color': 'rgba(85,85,85,0.25)', 'color': 'white' });
                                    marquerLaConsonneChoisie(clicked_response_element);
                                }
                            });
                        }
                        function correctionRevision() {
                            $('#revision_correction_btn').click(function (e) {
                                e.stopImmediatePropagation();

                                if (q_revision_index <= revision_pre_syllabe_questions.length) {

                                    marquerReponse(clicked_response_element, question_de_revision_pre_syllabe);
                                    enregistrerRevisionPreSyllabe();
                                    progressBarPreRevisionPreSyllabe();
                                    finDeRevisionPreSyllabe();


                                    function enregistrerRevisionPreSyllabe() {

                                        let q = question_de_revision_pre_syllabe;
                                        let r = reponse_de_revision_pre_syllabe;
                                        let p = (q == r) ? 1 : 0;
                                        let question_reponse = [q, r, p];

                                        lesson_de_revision_pre_syllabe_du_jour.splice(revision_counter - 1, 1, question_reponse);
                                        revision_counter++;
                                    }
                                    function progressBarPreRevisionPreSyllabe() {

                                        let progress_unity = 100 / revision_pre_syllabe_questions.length;

                                        if (question_de_revision_pre_syllabe == '') return;
                                        if (question_de_revision_pre_syllabe != '') {
                                            actualiserLessonProgressBar();

                                            function actualiserLessonProgressBar() {

                                                let bar_width = revision_counter * progress_unity;

                                                $('.progress_mauvaise_reponse_bar').css('width', bar_width + '%');
                                                if (question_de_revision_pre_syllabe == reponse_de_revision_pre_syllabe) {
                                                    good_response_counter++;
                                                    let good_response_width = good_response_counter * progress_unity;
                                                    $('.progress_bonne_reponse_bar').css('width', good_response_width + '%');
                                                }

                                                question_de_revision_pre_syllabe = ''; //Vider la variable question_de_revision_pre_syllabe après son utilisation.
                                            }
                                        }
                                    }
                                    function finDeRevisionPreSyllabe() {
                                        if (q_revision_index === revision_pre_syllabe_questions.length) {

                                            let note_de_revision_pre_syllabe = calculerNote(lesson_de_revision_pre_syllabe_du_jour);

                                            $('#revision_dialogue_btns').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫');

                                            if (note_de_revision_pre_syllabe < 100) {

                                                setTimeout(() => {
                                                    afficherRevisionPreSyllabeRepriseBtn();
                                                }, 800);

                                                function afficherRevisionPreSyllabeRepriseBtn() {
                                                    masquer($('#continu_sur_apprentissage_bouton'));
                                                    afficher($('#reprendre_revision_bouton'));
                                                    masquer($('#evaluation_bouton'));
                                                    masquer($('#syllabe_bouton'));

                                                    indexer($('#reprendre_revision_bouton'));
                                                }
                                            }
                                            if (note_de_revision_pre_syllabe === 100) {

                                                stockerConsonnesChoisies();
                                                stockerApprentissagePreSyllabe();
                                                stockerPreExerciceSyllabe();
                                                stockerPreRevisionPreSyllabe();
                                                actualiserConsonnesChoisies();
                                                // initialiserExercice();
                                                setTimeout(() => {
                                                    afficherRedirectionSurApprentissagePreSyllabeBtn();
                                                    afficherRedirectionSurEvaluationPreSyllabeBtn();

                                                    continuSurApprentissagePreSyllabe();
                                                }, 800);

                                                function stockerConsonnesChoisies() {
                                                    memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? consonnes_choisies : memoire_consonnes_choisies.concat(consonnes_choisies);
                                                    localStorage.setItem('memoire_consonnes_choisies', JSON.stringify(memoire_consonnes_choisies));
                                                }
                                                function stockerApprentissagePreSyllabe() {

                                                    let id_syllabe_apprentissage = JSON.parse(sessionStorage.getItem("id_syllabe_apprentissage"));  // Voir accueil.js
                                                    let note_d_apprentissage_pre_syllabe = calculerNote(lesson_d_apprentissage_pre_syllabe_du_jour);

                                                    if (note_d_apprentissage_pre_syllabe === 100) {

                                                        actualiserLessonPreSyllabe(lesson_d_apprentissage_pre_syllabe, lesson_d_apprentissage_pre_syllabe_du_jour);
                                                        localStorage.setItem('lesson_d_apprentissage_pre_syllabe', JSON.stringify(lesson_d_apprentissage_pre_syllabe));

                                                        console.log("La lesson d'apprentissage pre_syllabe fait :");
                                                        console.log(lesson_d_apprentissage_pre_syllabe);


                                                        if (lesson_d_apprentissage_pre_syllabe.length === 7) {
                                                            sendLessonDataToDB('syllabe_apprentissage', lesson_d_apprentissage_pre_syllabe);
                                                            console.log("Lesson d'apprentissage pre_syllabe est envoyée à la base de donnée.");
                                                        }
                                                        if (lesson_d_apprentissage_pre_syllabe.length > 7) {
                                                            updateLessonData(id_syllabe_apprentissage, lesson_d_apprentissage_pre_syllabe);
                                                            console.log("Lesson d'apprentissage pre_syllabe est modifiée à la base de donnée.");
                                                        }
                                                    }
                                                }
                                                function stockerPreExerciceSyllabe() {

                                                    let id_syllabe_exercice = JSON.parse(sessionStorage.getItem("id_syllabe_exercice"));  // Voir accueil.js
                                                    let note_d_exercice_pre_syllabe = calculerNote(lesson_d_exercice_pre_syllabe_du_jour);

                                                    if (note_d_exercice_pre_syllabe === 100) {

                                                        actualiserLessonPreSyllabe(lesson_d_exercice_pre_syllabe, lesson_d_exercice_pre_syllabe_du_jour);
                                                        localStorage.setItem('lesson_d_exercice_pre_syllabe', JSON.stringify(lesson_d_exercice_pre_syllabe));

                                                        console.log("La lesson_d'exercice pre_syllabe fait :");
                                                        console.log(lesson_d_exercice_pre_syllabe);

                                                        if (lesson_d_exercice_pre_syllabe.length === 7) {
                                                            sendLessonDataToDB('syllabe_exercice', lesson_d_exercice_pre_syllabe);
                                                            console.log("Lesson d'exercice pre_syllabe est envoyée à la base de donnée.");
                                                        }
                                                        if (lesson_d_exercice_pre_syllabe.length > 7) {
                                                            updateLessonData(id_syllabe_exercice, lesson_d_exercice_pre_syllabe);
                                                            console.log("Lesson d'exercice pre_syllabe est modifiée à la base de donnée.");
                                                        }
                                                    }
                                                }
                                                function stockerPreRevisionPreSyllabe() {

                                                    actualiserLessonPreSyllabe(lesson_de_revision_pre_syllabe, lesson_de_revision_pre_syllabe_du_jour);

                                                    localStorage.setItem('lesson_de_revision_pre_syllabe', JSON.stringify(lesson_de_revision_pre_syllabe));
                                                    sessionStorage.setItem('lesson_de_revision_pre_syllabe_du_jour', JSON.stringify(lesson_de_revision_pre_syllabe));
                                                    localStorage.setItem('syllabes_etudiees', JSON.stringify(syllabes_etudiees));

                                                    console.log("La lesson de revision pre_syllabe fait :");
                                                    console.log(lesson_de_revision_pre_syllabe);
                                                }
                                                function actualiserConsonnesChoisies() {

                                                    consonnes_choisies = JSON.parse(localStorage.getItem("consonnes_choisies"));
                                                    consonnes_choisies = (consonnes_choisies == null) ? [] : consonnes_choisies;

                                                    memoire_consonnes_choisies = JSON.parse(localStorage.getItem("memoire_consonnes_choisies"));
                                                    memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? [] : memoire_consonnes_choisies;
                                                    memoire_consonnes_choisies = (consonnes_choisies.length == 0) ? memoire_consonnes_choisies : memoire_consonnes_choisies.concat(consonnes_choisies);

                                                    console.log("Les consonnes choisies sont :");
                                                    console.log(consonnes_choisies);
                                                    console.log(memoire_consonnes_choisies);

                                                    localStorage.setItem('memoire_consonnes_choisies', JSON.stringify(memoire_consonnes_choisies));
                                                }
                                                function afficherRedirectionSurApprentissagePreSyllabeBtn() {
                                                    if (lesson_d_apprentissage_pre_syllabe.length === 126) return;
                                                    setTimeout(() => {

                                                        masquer($('#revision_progress_bar'));
                                                        masquer($('#evaluation_dialogue_btns'));
                                                        displayv($('#revision_redirection_btns'));


                                                        afficher($('#continu_sur_apprentissage_bouton'));
                                                        masquer($('#reprendre_revision_bouton'));
                                                        masquer($('#evaluation_bouton'));
                                                        masquer($('#syllabe_bouton'));

                                                        indexer($('#continu_sur_apprentissage_bouton'));
                                                    }, 800);
                                                }
                                                function afficherRedirectionSurEvaluationPreSyllabeBtn() {
                                                    if (lesson_d_apprentissage_pre_syllabe.length < 126) return;
                                                    setTimeout(() => {

                                                        masquer($('#revision_progress_bar'));
                                                        afficher($('#evaluation_dialogue_btns'));
                                                        masquer($('#revision_redirection_btns'));

                                                        masquer($('#continu_sur_apprentissage_bouton'));
                                                        masquer($('#reprendre_revision_bouton'));
                                                        afficher($('#evaluation_bouton'));
                                                        masquer($('#syllabe_bouton'));

                                                        indexer($('#evaluation_bouton'));
                                                    }, 800);
                                                }
                                                function continuSurApprentissagePreSyllabe() {
                                                    $('#continu_sur_apprentissage_bouton').click(() => { raffraichirLaPage(); });
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
            function evaluationPreSyllabe() {
                $('#evaluation_bouton').click(function () {

                    lesson_d_evaluation_pre_syllabe = lessonDEvaluationPreSyllabe();

                    var evaluation_pre_syllabe_questions = [];

                    var question_d_evaluation_pre_syllabe = '', reponse_d_evaluation_pre_syllabe = [];
                    var note_d_evaluation_pre_syllabe = 0;
                    var compteur = incrementer();
                    var evaluation_counter = 0;
                    let good_response_counter = 0;

                    var q_evaluation_total = parseIntNko(lesson_d_apprentissage_pre_syllabe.length);
                    var q_evaluation_index = 0, q_evaluation_rang = '߭';
                    var q_evaluation_ordre = parseIntNko(q_evaluation_index + 1);
                    var q_evaluation_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                    var q_evaluation_rang = '߭';
                    var q_evaluation_action = 'ߟߊߡߍ߲߫';


                    lesson_active = 'pre_revision';

                    chargerEvaluationPreSyllabe();
                    afficherEvaluationPreSyllabe();
                    evaluationPreSyllabe();


                    function chargerEvaluationPreSyllabe() {

                        chargerEvaluationPreSyllabeHead();
                        chargerEvaluationPreSyllabeFoot();
                        chargerEvaluationPreSyllabeBody();

                        function chargerEvaluationPreSyllabeHead() {
                            $('.notification_titre').text('ߜߋ߲߭ ߞߘߐߓߐߟߌ');
                            viderNotification();
                            setTimeout(() => { ecris("evaluation_notification_corps", "ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߊߟߎ߬ ߛߓߍ߫߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫."); }, 800);
                        }
                        function chargerEvaluationPreSyllabeFoot() {
                            initialisationDEvaluationFoot();

                            function initialisationDEvaluationFoot() {

                                q_evaluation_total = parseIntNko(lesson_d_apprentissage_pre_syllabe.length);
                                q_evaluation_index = 0;
                                q_evaluation_ordre = parseIntNko(q_evaluation_index + 1);
                                q_evaluation_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬';
                                q_evaluation_rang = '߭';
                                q_evaluation_action = 'ߟߊߡߍ߲߫';

                                $('.question_label').html(q_evaluation_label);
                                $('.question_total').html(q_evaluation_total);
                                $('.question_ordre').html(q_evaluation_ordre + q_evaluation_rang);
                                $('.question_action').html(q_evaluation_action);

                                $('.question_btn').css('display', 'block');
                                $('.repetition_btn').css('display', 'none');
                                $('.correction_btn').css('display', 'none');
                            }
                        }
                        function chargerEvaluationPreSyllabeBody() {
                            var evaluation_tbody_default_message = 'ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߐߝߟߌ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬.';
                            $('#evaluation_fiche_body').html("<p id='evaluation_tbody_default_content'>" + evaluation_tbody_default_message + "</p>");
                        }
                    }
                    function afficherEvaluationPreSyllabe() {

                        masquer($('.course'));

                        $('#pratique_options').css('display', 'block');
                        $('.fermeture').attr('id', 'fermer_revision');

                        masquer($('#exercice_body'));
                        masquer($('#apprentissage_container'));
                        masquer($('#exercice_container'));
                        masquer($('#revision_container'));
                        afficher($('#evaluation_container'));

                        setTimeout(() => { displayv($('#evaluation_head')); }, 60);
                        setTimeout(() => {
                            setTimeout(() => {
                                afficher($('#evaluation_body'));
                                // affichageAnimeDeTableTd($('#evaluation_body table')); 
                            }, 60);
                            setTimeout(() => {
                                afficher($('#evaluation_foot'));
                                displayv($('#evaluation_dialogue_btns'));
                                afficher($('.progress_bar_integre'));
                                setTimeout(() => {
                                    afficher($('#evaluation_question_btn'));
                                    masquer($('#evaluation_repetition_btn'));
                                    masquer($('#evaluation_correction_btn'));
                                }, 200);
                            }, 400);
                        }, 600);

                        masquer($('.redirection_btns'));
                        masquer($('#evaluation_progress_bar'));

                        setTimeout(() => { afficher($('.course')); }, 100);
                    }
                    function evaluationPreSyllabe() {

                        evaluation_pre_syllabe_questions = questionsDEvaluation();
                        initialiserEvaluationPreSyllabeAStocker();

                        poserQuestionDEvaluationPreSyllabe();
                        repeterQuestionDEvaluationPreSyllabe();
                        repondreQuestionDEvaluationPreSyllabe();
                        rectificationDeReponseDEvaluationPreSyllabe();
                        correctionDEvaluationPreSyllabe();


                        function poserQuestionDEvaluationPreSyllabe() {
                            $('.question_btn').on('click', function (e) {
                                e.stopImmediatePropagation();

                                effacerPrecedenteReponse();
                                question_d_evaluation_pre_syllabe = evaluation_pre_syllabe_questions[q_evaluation_index];
                                console.log(question_d_evaluation_pre_syllabe);
                                dicterLaQuestion();
                                afficher($('#evaluation_repetition_btn'));
                                masquer($('#evaluation_cross'));
                                $('#evaluation_cross').css('transform', 'scale(0.4)');
                                $('#evaluation_reponse_container').css({ 'top': 0 });
                                afficherTesteContainer();

                                q_evaluation_index = compteur();
                                q_evaluation_ordre = parseIntNko(q_evaluation_index + 1);
                                q_evaluation_rang = '߲';

                                actualiserLesLibellesDeDialogueBtn();


                                function effacerPrecedenteReponse() {
                                    reponse_d_evaluation_pre_syllabe.splice(0, reponse_d_evaluation_pre_syllabe.length);
                                    $('#evaluation_reponse').html(reponse_d_evaluation_pre_syllabe);
                                }
                                function actualiserLesLibellesDeDialogueBtn() {

                                    $('.question_ordre').html(q_evaluation_ordre + q_evaluation_rang);
                                    $('.question_action').html('ߠߊߡߍ߲߫');

                                    $('.question_btn').css('display', 'none');
                                    $('.repetition_btn').css('display', 'block');
                                    $('.correction_btn').css('display', 'none');
                                }
                                function dicterLaQuestion() { lireLettre('ߊ', question_d_evaluation_pre_syllabe); }
                                function afficherTesteContainer() { $('#teste_container').css({ 'top': '-6rem' }); }
                            });
                        }
                        function repeterQuestionDEvaluationPreSyllabe() {
                            $('.repetition_btn').on('click', function () {
                                lireLettre('syllabe', question_d_evaluation_pre_syllabe);
                            });
                        }
                        function repondreQuestionDEvaluationPreSyllabe() {
                            $('#clavier_nko td').on('click', function (e) {
                                e.stopImmediatePropagation();

                                if (question_d_evaluation_pre_syllabe == '') rappel($('#evaluation_dialogue_btn'));
                                if (question_d_evaluation_pre_syllabe != '') {

                                    var caractere = $(this).text();

                                    reponse_d_evaluation_pre_syllabe.push(caractere);
                                    $('#evaluation_reponse').html(reponse_d_evaluation_pre_syllabe);
                                    afficherCorrectionButton();

                                    function afficherCorrectionButton() {
                                        masquer($('.question_btn'));
                                        masquer($('.repetition_btn'));
                                        afficher($('.correction_btn'));
                                    }
                                }
                            });
                        }
                        function rectificationDeReponseDEvaluationPreSyllabe() {
                            $('#correcteur_d_evaluation').on('click', function () {
                                reponse_d_evaluation_pre_syllabe.pop();
                                $('#evaluation_reponse').html(reponse_d_evaluation_pre_syllabe);
                            });
                        }
                        function correctionDEvaluationPreSyllabe() {

                            var evaluation_html = '';

                            $('.correction_btn').click(function (e) {
                                e.stopImmediatePropagation();

                                if (q_evaluation_index <= evaluation_pre_syllabe_questions.length) {

                                    let q = question_d_evaluation_pre_syllabe;
                                    let r = reponse_d_evaluation_pre_syllabe.join('');
                                    let p = (q == r) ? 1 : 0;
                                    let question_reponse = [q, r, p];

                                    note_d_evaluation_pre_syllabe += p;

                                    marquerReponseDEvaluationPreSyllabe();
                                    effacerCheckMark();
                                    masquerTesteContainer();
                                    enregistrerEvaluationPreSyllabe();
                                    progressBarDEvaluationPreSyllabe();
                                    finDEvaluationPreSyllabe();
                                    afficherQuestionButton();
                                    setTimeout(() => {
                                        chargerInstantannementEvaluationTbody();
                                        defilementDuContenuVersLeHaut($('#evaluation_fiche_body'));
                                    }, 1400);


                                    function chargerInstantannementEvaluationTbody() {

                                        var n = parseIntNko(evaluation_counter);
                                        n = (n == '߁') ? n + '߭' : n + '߲';
                                        r = (q == r) ? r : "<del>" + r + "</del>";

                                        evaluation_html += '<div><span>' + n + '</span><span>' + q + '</span><span>' + r + '</span><span>' + parseIntNko(p) + '</span></div>\n';
                                        let total_point_d_evaluation = parseIntNko(note_d_evaluation_pre_syllabe);
                                        let pourcentage_point_d_evaluation = '%' + parseIntNko(Math.floor(note_d_evaluation_pre_syllabe * 100 / evaluation_pre_syllabe_questions.length));

                                        $('#evaluation_fiche_body').html(evaluation_html);
                                        $('#total_point_d_evaluation').html(total_point_d_evaluation);
                                        $('#pourcentage_point_d_evaluation').html(pourcentage_point_d_evaluation);
                                    }
                                    function marquerReponseDEvaluationPreSyllabe() {
                                        if (reponse_d_evaluation_pre_syllabe.join('') == question_d_evaluation_pre_syllabe) {

                                            $("#evaluation_reponse").html("<p id='bonne_reponse'>" + reponse_d_evaluation_pre_syllabe.join('') + "</p><div id='check_mark_container'> <p id='check_mark'></p> <p id='check_mark_cover'></p> </div>");
                                            $('#check_mark_container').css({ 'display': 'inline-block', 'margin-right': '4px' });
                                            $('#check_mark_cover').css({ 'right': '0.25rem' });
                                            $('#check_mark').html("&#10003;");
                                            setTimeout(function () { $('#check_mark_cover').css({ 'right': '2rem' }); }, 100);
                                            setTimeout(function () { $('#check_mark_container').css({ 'display': 'none' }); }, 1000);
                                        } else {
                                            $("#evaluation_reponse").html("<p id='mauvaise_reponse'>" + reponse_d_evaluation_pre_syllabe.join('') + "</p><p id='evaluation_cross'>&#10060;</p>");
                                            $('#evaluation_cross').css({ 'display': 'block', 'right': reponse_d_evaluation_pre_syllabe.join('').length / 2 + 'rem', 'transform': 'scale(0.5)', 'opacity': 0 });
                                            setTimeout(function () { $('#evaluation_cross').css({ 'transform': 'scale(1)', 'opacity': 0.75 }); }, 100);
                                        }

                                        setTimeout(() => {
                                            $('#evaluation_reponse p').html('');
                                        }, 2000);
                                    }
                                    function effacerCheckMark() {
                                        setTimeout(function () {
                                            $('#check_mark').empty();
                                        }, 1000);
                                    }
                                    function masquerTesteContainer() {
                                        setTimeout(() => { $('#teste_container').css({ 'top': 0 }); }, 1000);
                                    }
                                    function enregistrerEvaluationPreSyllabe() {
                                        lesson_d_evaluation_pre_syllabe_du_jour.splice(evaluation_counter, 1, question_reponse);
                                        evaluation_counter++;
                                    }
                                    function progressBarDEvaluationPreSyllabe() {

                                        let progress_unity = 100 / evaluation_pre_syllabe_questions.length;

                                        if (question_d_evaluation_pre_syllabe == '') return;
                                        if (question_d_evaluation_pre_syllabe != '') {
                                            actualiserLessonProgressBar();

                                            function actualiserLessonProgressBar() {

                                                let bar_width = evaluation_counter * progress_unity + 1;

                                                $('.progress_mauvaise_reponse_bar_integre').css('width', bar_width + '%');
                                                if (question_d_evaluation_pre_syllabe == reponse_d_evaluation_pre_syllabe.join('')) {
                                                    good_response_counter++;
                                                    let good_response_width = good_response_counter * progress_unity;
                                                    $('.progress_bonne_reponse_bar_integre').css('width', good_response_width + '%');
                                                }

                                                question_d_evaluation_pre_syllabe = ''; //Vider la variable question_d_evaluation_pre_syllabe après son utilisation.
                                            }
                                        }
                                    }
                                    function finDEvaluationPreSyllabe() {

                                        if (q_evaluation_index === evaluation_pre_syllabe_questions.length) {

                                            let note_d_evaluation_pre_syllabe_syllabe = calculerNote(lesson_d_evaluation_pre_syllabe_du_jour);

                                            if (note_d_evaluation_pre_syllabe_syllabe < 100) {

                                                setTimeout(() => { afficherRedirection1(); }, 600);

                                                $('.redirection_btn_1').click(function () {
                                                    $('#evaluation_bouton').click();
                                                    initialiserProgressBarIntegre();
                                                    setTimeout(() => { afficherEvaluationPreSyllabe(); }, 300);
                                                });

                                                function afficherRedirection1() {

                                                    masquer($('#evaluation_dialogue_btns'));
                                                    afficher($('#evaluation_redirection_btns'));
                                                    masquer($('#evaluation_progress_bar'));

                                                    afficher($('.redirection_btn_1'));
                                                    masquer($('.redirection_btn_2'));
                                                    masquer($('.redirection_btn_3'));

                                                    indexer($('.redirection_btn_1'));
                                                }
                                            }
                                            if (note_d_evaluation_pre_syllabe_syllabe === 100) {

                                                stockerEvaluationPreSyllabe();

                                                function stockerEvaluationPreSyllabe() {

                                                    let id_syllabe_apprentissage = JSON.parse(sessionStorage.getItem("id_syllabe_apprentissage"));  // Voir accueil.js
                                                    let id_syllabe_exercice = JSON.parse(sessionStorage.getItem("id_syllabe_exercice"));  // Voir accueil.js

                                                    actualiserLessonPreSyllabe(lesson_d_evaluation_pre_syllabe, lesson_d_evaluation_pre_syllabe_du_jour);
                                                    localStorage.setItem('lesson_d_evaluation_pre_syllabe', JSON.stringify(lesson_d_evaluation_pre_syllabe));

                                                    if (lesson_d_apprentissage_pre_syllabe.length === 14) {
                                                        if (lesson_d_exercice_pre_syllabe.length === 14) {
                                                            if (lesson_de_revision_pre_syllabe.length === 14) {
                                                                if (lesson_d_evaluation_pre_syllabe.length === 14) {

                                                                    updateLessonData(id_syllabe_apprentissage, lesson_d_apprentissage_pre_syllabe);
                                                                    updateLessonData(id_syllabe_exercice, lesson_d_exercice_pre_syllabe);
                                                                    sendLessonDataToDB('syllabe_revision', lesson_de_revision_pre_syllabe);
                                                                    sendLessonDataToDB('syllabe_evaluation', lesson_d_evaluation_pre_syllabe);

                                                                    console.log("Lesson d'apprentissage pre_syllabe est modifiée à la base de donnée.");
                                                                    console.log("Lesson d'exercice pre_syllabe est modifiée à la base de donnée.");
                                                                    console.log("Lesson de revision pre_syllabe est envoyée à la base de donnée.");
                                                                    console.log("Lesson d'evaluation pre_syllabe est envoyée à la base de donnée.");
                                                                }
                                                            }
                                                        }
                                                    }

                                                    sessionStorage.setItem('lesson_d_evaluation_pre_syllabe_du_jour', JSON.stringify(lesson_d_evaluation_pre_syllabe_du_jour));
                                                    localStorage.setItem('syllabes_etudiees', JSON.stringify(syllabes_etudiees));
                                                }
                                            }
                                        }
                                    }
                                    function afficherQuestionButton() {
                                        if (q_evaluation_index < evaluation_pre_syllabe_questions.length) {
                                            masquer($('.correction_btn'));
                                            afficher($('.question_btn'));
                                            masquer($('.repetition_btn'));
                                        }
                                    }
                                }
                            });
                        }
                        function questionsDEvaluation() {
                            let qe = [];
                            for (let i = 0; i < lesson_d_apprentissage_pre_syllabe.length; i++) {
                                qe.push(lesson_d_apprentissage_pre_syllabe[i][0]);
                            }
                            qe = malaxer(qe);
                            return qe;
                        }
                        function initialiserEvaluationPreSyllabeAStocker() {
                            lesson_d_evaluation_pre_syllabe_du_jour = initialiserData(evaluation_pre_syllabe_questions);
                        }
                    }
                });
            }

            function lessonDApprentissagePreSyllabe() {

                let lesson_d_apprentissage_pre_syllabe_du_serveur = lessonDApprentissagePreSyllabeDuServeur();
                lesson_d_apprentissage_pre_syllabe_du_serveur = (lesson_d_apprentissage_pre_syllabe_du_serveur == null) ? [] : lesson_d_apprentissage_pre_syllabe_du_serveur;

                let lesson_d_apprentissage_pre_syllabe = JSON.parse(localStorage.getItem('lesson_d_apprentissage_pre_syllabe'));
                lesson_d_apprentissage_pre_syllabe = (lesson_d_apprentissage_pre_syllabe == null) ? lesson_d_apprentissage_pre_syllabe_du_serveur : lesson_d_apprentissage_pre_syllabe;
                console.log(lesson_d_apprentissage_pre_syllabe);
                return lesson_d_apprentissage_pre_syllabe;

                function lessonDApprentissagePreSyllabeDuServeur() {
                    let datas = JSON.parse(sessionStorage.getItem('datas'));
                    let lapss = [];

                    if (datas[1].length != 0) lapss = JSON.parse(datas[1][0].lesson);
                    return lapss;
                }
            }
            function lessonDExercicePreSyllabe() {

                let lesson_d_exercice_pre_syllabe_du_serveur = lessonDExercicePreSyllabeDuServeur();
                lesson_d_exercice_pre_syllabe_du_serveur = (lesson_d_exercice_pre_syllabe_du_serveur == null) ? [] : lesson_d_exercice_pre_syllabe_du_serveur;

                let lesson_d_exercice_pre_syllabe = JSON.parse(localStorage.getItem('lesson_d_exercice_pre_syllabe'));
                lesson_d_exercice_pre_syllabe = (lesson_d_exercice_pre_syllabe == null) ? lesson_d_exercice_pre_syllabe_du_serveur : lesson_d_exercice_pre_syllabe.concat(lesson_d_exercice_pre_syllabe_du_serveur);

                return lesson_d_exercice_pre_syllabe;

                function lessonDExercicePreSyllabeDuServeur() {
                    let datas = JSON.parse(sessionStorage.getItem('datas'));
                    let lepss = [];
                    if (datas[1].length != 0) lepss = JSON.parse(datas[1][1].lesson);
                    return lepss;
                }
            }
            function lessonDeRevisionPreSyllabe() {

                let lesson_de_revision_pre_syllabe_du_serveur = lessonDeRevisionPreSyllabeDuServeur();
                lesson_de_revision_pre_syllabe_du_serveur = (lesson_de_revision_pre_syllabe_du_serveur == null) ? [] : lesson_de_revision_pre_syllabe_du_serveur;

                let lesson_de_revision_pre_syllabe = JSON.parse(localStorage.getItem('lesson_de_revision_pre_syllabe'));
                lesson_de_revision_pre_syllabe = (lesson_de_revision_pre_syllabe == null) ? lesson_de_revision_pre_syllabe_du_serveur : lesson_de_revision_pre_syllabe.concat(lesson_de_revision_pre_syllabe_du_serveur);

                return lesson_de_revision_pre_syllabe;

                function lessonDeRevisionPreSyllabeDuServeur() {
                    let datas = JSON.parse(sessionStorage.getItem('datas'));
                    let lrpss = [];
                    if (datas[1].length != 0) lrpss = (datas[1][2] == undefined) ? [] : JSON.parse(datas[1][2].lesson);
                    return lrpss;
                }
            }
            function lessonDEvaluationPreSyllabe() {

                let lesson_d_evaluation_pre_syllabe_du_serveur = lessonDEvaluationPreSyllabeDuServeur();
                lesson_d_evaluation_pre_syllabe_du_serveur = (lesson_d_evaluation_pre_syllabe_du_serveur == null) ? [] : lesson_d_evaluation_pre_syllabe_du_serveur;

                let lesson_d_evaluation_pre_syllabe = JSON.parse(localStorage.getItem('lesson_d_evaluation_pre_syllabe'));
                lesson_d_evaluation_pre_syllabe = (lesson_d_evaluation_pre_syllabe == null) ? lesson_d_evaluation_pre_syllabe_du_serveur : lesson_d_evaluation_pre_syllabe.concat(lesson_d_evaluation_pre_syllabe_du_serveur);

                return lesson_d_evaluation_pre_syllabe;

                function lessonDEvaluationPreSyllabeDuServeur() {
                    let datas = JSON.parse(sessionStorage.getItem('datas'));
                    let levpss = [];
                    if (datas[1].length != 0) levpss = (datas[1][3] == undefined) ? [] : JSON.parse(datas[1][3].lesson);
                    return levpss;
                }
            }
            function actualiserLessonPreSyllabe(lesson, lesson_du_jour) {

                let anciennes_syllabes = anciennesSyllabes();
                let nouvelles_syllabes = nouvellesSyllabes();

                nouvelles_syllabes.forEach(element => {
                    let index = nouvelles_syllabes.indexOf(element);
                    if ($.inArray(element, anciennes_syllabes) === -1) { lesson.push(lesson_du_jour[index]); }
                });

                function nouvellesSyllabes() {
                    let ns = [];
                    lesson_du_jour.forEach(element => { ns.push(element[0]); });
                    return ns;
                }
                function anciennesSyllabes() {
                    let as = [];
                    lesson.forEach(element => { if (element != null) as.push(element[0]); });
                    return as;
                }
            }
        }
        function syllabeNko() {
            $('#phases_list li').on('click', function () {

                var phase_li_id = JSON.parse(sessionStorage.getItem('phase_li_id'));
                var table_id = $('.table_parlante').attr('id');

                var table = $('#' + table_id);
                var tr = $('#' + table_id + ' tr');
                var td = $('#' + table_id + ' td');
                var nbr_table = table.length;
                var nbr_tr = tr.length;
                var nbr_td = td.length;

                var nbr_tr = tr.length;
                var nbr_td = td.length;
                let nbr_raisonnable_de_click = 1;
                let clicked_elements_quantity = 0;


                phase_li_id = $(this).attr('id');
                phase_nom = $(this).html();

                var phase_class = $(this).attr('class');
                var course_id = phase_li_id.split('_')[1];


                //Récupération des données, storées depuis lesson.js, sur l'apprenant  
                sessionStorage.setItem('phase_class', JSON.stringify(phase_class));
                sessionStorage.setItem('phase_li_id', JSON.stringify(phase_li_id));
                sessionStorage.setItem('phase_nom', JSON.stringify(phase_nom));
                sessionStorage.setItem("course_id", JSON.stringify(course_id));

                /*--------------------------------------------------------------------*/

                if (phase_class == "apprises") {
                    console.log(matiere_nom + " " + phase_nom + " ߢߌ߲߬ ߞߍߣߍ߲߫ ߞߘߐ ߟߋ߬");
                    return false;
                }
                if (phase_class == "a_apprendre") {
                    console.log('ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ' + matiere_nom + " " + phase_nom + " ߢߌ߲߬ ߡߊ߫ ߝߟߐ߫");
                    return false;
                }


                masquer($('.direction'));
                afficher($('.salle_de_classe'));
                afficher($('.course'));

                switch (phase_li_id) {
                    case 'syllabes_apprentissage': apprentissageSyllabe(); break;
                    case 'syllabes_exercice': exerciceSyllabe(); break;
                    case 'syllabes_evaluation': evaluationSyllabe(); break;
                }


                function apprentissageSyllabe() {

                    chargerApprentissageSyllabeNko();
                    afficherApprentissageSyllabeNko();
                    apprendreSyllabeNko();
                    raffraichissementDeLaPage();


                    function chargerApprentissageSyllabeNko() {

                        chargerEnteteDApprentissageSyllabeNko();
                        chargerPiedDApprentissageSyllabeNko();
                        chargerCorpsDApprentissageSyllabeNko();

                        function chargerEnteteDApprentissageSyllabeNko() {

                            $('#apprentissage_notification_titre').text(liste_de_matieres[1][1] + ' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');

                            viderNotification();
                            setTimeout(() => {
                                if (lesson_d_apprentissage_syllabe_du_serveur.length != 0) {
                                    ecris('apprentissage_notification_corps', '\
                                        ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߘߋ߲߰ߣߍ߲߬ ߞߘߐ ߟߴߌ ߓߟߏ߫߸ ߏ߬ߘߐ߬ ߌ ߘߌ߫ ߛߴߊ߬ ߡߊߛߍ߬ߦߌ߬ ߟߊ߫߸ ߞߐ߬ߣߌ߲߬ ߊ߬ ߕߍ߫ ߖߊ߰ߕߋ߬ ߟߊ߫.<br>\
                                    ');
                                }
                                if (lesson_d_apprentissage_syllabe_du_serveur.length == 0) {
                                    ecris('apprentissage_notification_corps', '\
                                        ߜߋ߲߭ ߠߎ߬ ߓߍ߯ ߘߌ߲߯ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߊ߬ ߣߴߌ ߦߴߌ ߖߊ߲߬ߕߏ߬ ߊ߬ߟߎ߬ ߝߐߢߊ ߘߐ߫ ߞߏߛߓߍ߫߹<br>\
                                        ߌ ߣߊ߬ߕߐ߫ ߟߋ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ ߟߴߊ߬ߟߎ߬ ߓߍ߯ ߡߊ߬.\
                                    ');
                                }
                            }, 800);
                        }
                        function chargerPiedDApprentissageSyllabeNko() { }
                        function chargerCorpsDApprentissageSyllabeNko() {

                            /*
                                --------------------------------------------------------------------------------------------------------
                                Si l'apprentissage de syllabe est déjà fait, le tableau noir est chargé pour être lu uniquement.
                                Sinon le tableau noir est chargé par la fonction parametrageDeLesson() appelée au début.
                                --------------------------------------------------------------------------------------------------------
                            */
                            if (lesson_d_apprentissage_syllabe_du_serveur.length != 0) {
                                lessonHTML(lesson_d_apprentissage_syllabe_du_serveur);
                            }
                            if (lesson_d_apprentissage_syllabe_du_serveur.length == 0) { parametrageDeLesson(); }
                        }
                    }
                    function afficherApprentissageSyllabeNko() {

                        $('#apprentissage_container').css('display', 'block');
                        $('#exercice_container').css('display', 'none');
                        $('#revision_container').css('display', 'none');
                        $('#evaluation_container').css('display', 'none');

                        $('#apprentissage_redirection_btns').css('display', 'none');
                        afficher($('.course'));

                        setTimeout(() => {
                            setTimeout(() => { displayv($('#apprentissage_head')); }, 300);
                            setTimeout(() => {
                                displayv($('#apprentissage_body'));
                                setTimeout(() => { affichageAnimeDeTableTd($('#apprentissage_body table')); }, 100);
                            }, 600);
                            setTimeout(() => {
                                displayv($('#apprentissage_foot'));
                                zoomDown($('.dialogue_btns'));

                                if (lesson_d_apprentissage_syllabe_du_serveur.length != 0) {
                                    masquer($('#apprentissage_progress_bar'));
                                } else {
                                    afficher($('#apprentissage_progress_bar'));
                                }

                                $('.media').css({ 'display': 'none', 'opacity': 0 });
                                $('.parametre').css({ 'display': 'none', 'opacity': 0 });
                                $('.lesson_suivante').css({ 'display': 'block', 'opacity': 1 });
                            }, 1500);
                        }, 200);
                    }
                    function apprendreSyllabeNko() {

                        let nbr_td_par_table = Math.ceil(nbr_td / nbr_table);
                        let nbr_td_par_tr = Math.ceil(nbr_td / nbr_tr);

                        let clicked_td_length = nbr_raisonnable_de_click * nbr_td;
                        let barr_unity = 100 / clicked_td_length;
                        let elements_clickes = [];
                        let click_counter = 0;

                        lecturePersonnalisee('ߊ');  // Voir fonctions.js

                        if (lesson_d_apprentissage_syllabe_du_serveur != null || lesson_d_apprentissage_syllabe_du_serveur.length != 0) {
                            $.each(td, function () { $(this).css({ 'background-color': 'rgba(85,85,85,1)', 'color': 'white' }); });
                        }
                        if (lesson_d_apprentissage_syllabe_du_serveur == null || lesson_d_apprentissage_syllabe_du_serveur.length == 0) {

                            initialisationDeApprentissageClicksMemo();

                            $.each(td, function () {

                                let td_actif = $(this);
                                let td_counter = 0;
                                /* 
                                --------------------------------------------------------------------------------------------------------
                                Pour chaque click sur un bouton:
                                    1)- Un compteur de click individuel est activé qui calcule combien de fois chaque bouton est clické.
                                    2)- Une identification est faite pour savoir, quel bouton est clické.
                                    3)- Un enregistrement capte le nombre de click pour chaque bouton.
                                    4)- Et le memo de l'enregistrement est envoyé au serveur quand on ferme la leçon.
                                --------------------------------------------------------------------------------------------------------
                                */
                                var element = td_actif.html();
                                var table_courante = td_actif.parent().parent().parent();
                                var tr_index = td_actif.parent().index();
                                var table_index = table.index(table_courante);
                                var element_index = table_index * nbr_td_par_table + tr_index * nbr_td_par_tr + td_actif.index();
                                var element_click_counter = 0;
                                var point = 0;

                                td_actif.css({ 'background-color': 'rgba(85,85,85,1)', 'color': 'yellow' });

                                td_actif.on('click', function () {

                                    let clicked_td = $(this);
                                    td_counter++;

                                    styleDeAppretissageTd();
                                    enregistrerApprentissageSyllabe();
                                    progressBarrApprentissageSyllabe();
                                    finDApprentissageSyllabe();

                                    function styleDeAppretissageTd() {
                                        if (td_counter === nbr_raisonnable_de_click) {
                                            clicked_td.css({ 'background-color': 'rgba(85,85,85,0.25)', 'color': 'white' });
                                        }
                                    }
                                    function enregistrerApprentissageSyllabe() {

                                        /*--------------------------------------------------------------------
                                        3)- Enregistrement des clicks 
                                        
                                        L'enregistrement par bouton ou élémentaire est un tableau de trois éléments dont
                                        - L'élément clické;
                                        - Le nombre de fois que cet élément est  clické. 
                                        - Le point.

                                        --------------------------------------------------------------------*/

                                        var clicked_element = clicked_td.html(); // Élément clické.
                                        element_click_counter++; // Compteur de click specifique pour chaque élément.

                                        /*Quand un élément est cliqué au moins 5 fois, il est considéré comme étant suffisemment appris.
                                        *Il est noté par 1 et cette note est enregitrée dans  la varible new_mark. */
                                        var new_mark = (element_click_counter >= nbr_raisonnable_de_click) ? 1 : 0;

                                        /*A chaque élément correspond un tableau (new_click_value) de 3 composants dont l'élément cliqué, le nombre de click de
                                        *cet élément et le point new_mark. Ce tableau est régulièrement actualisé à chaque click */
                                        var new_click_value = [clicked_element, element_click_counter, new_mark];  // Enregistrement elementaire.

                                        /*Actualisation de mémoire d'enregistrement
                                            C'est à dire qu'après chaque click,les anciennes valeurs de chaque enregistrement elementaire sont remplacés par les nouvelles valeurs.                 */

                                        syllabe_apprentissage_clicks_memo.splice(element_index, 1, new_click_value);
                                        clicked_elements_quantity = clickedElementsQuantity();

                                        function clickedElementsQuantity() {
                                            var qtity = [];
                                            $.each(syllabe_apprentissage_clicks_memo, function () { if ($(this)[2] == 1) { qtity++; } });
                                            return qtity;
                                        }
                                    }
                                    function progressBarrApprentissageSyllabe() {

                                        if (td_counter <= nbr_raisonnable_de_click) {

                                            click_counter++;
                                            $('.progress_bonne_reponse_bar').css('width', click_counter * barr_unity + '%');

                                            if (click_counter === clicked_td_length) {
                                                setTimeout(() => { $('#apprentissage_progress_bar').css('display', 'none'); }, 400);
                                            }
                                        }

                                        initialiserApprentissageSyllabeProgressBarr();


                                        function initialiserApprentissageSyllabeProgressBarr() {
                                            $('.parametres_popup td').on('click', function () {

                                                var nbr_td = JSON.parse(sessionStorage.getItem("nbr_td"));    // Voir parametres.js fonction lettresCochees()
                                                var nbr_click = nbr_td;
                                                elements_clickes = [];
                                                progress_unity = 0;

                                                $('.progress_bonne_reponse_bar').css('width', progress_unity + 'px');
                                                progression(nbr_click);

                                                function progression(nbr_click) {
                                                    var progress_unity = $('.progress_bar').width() / nbr_click;

                                                    $('.table_parlante td').on('click', function () {
                                                        if (elements_clickes.indexOf($(this).html()) == -1) $('.progress_bonne_reponse_bar').css('width', '+=' + progress_unity + 'px');
                                                        elements_clickes.push($(this).html());
                                                    });
                                                }
                                            });
                                        }
                                    }
                                    function finDApprentissageSyllabe() {
                                        // if(clicked_elements_quantity === syllabe_apprentissage_clicks_memo.length) {
                                        if (clicked_elements_quantity === 3) {

                                            let note = calculerNote(syllabe_apprentissage_clicks_memo);

                                            viderNotification();
                                            initialiserProgressBar
                                            stockerApprentissageSyllabe();
                                            resultatApprentissageSyllabe();
                                            afficherSyllabeExerciceBouton();
                                            transitionVersExerciceSyllabe();


                                            function stockerApprentissageSyllabe() {

                                                let moyenne_d_apprentissage = 1;

                                                if (note < moyenne_d_apprentissage) alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
                                                if (note >= moyenne_d_apprentissage) {
                                                    lesson_d_apprentissage_syllabe_du_serveur = syllabe_apprentissage_clicks_memo;
                                                    sendLessonDataToDB('syllabe_apprentissage', lesson_d_apprentissage_syllabe_du_serveur);
                                                    sessionStorage.setItem('lesson_d_apprentissage_syllabe_du_serveur', JSON.stringify(lesson_d_apprentissage_syllabe_du_serveur));

                                                    console.log('Les données d\'apprentissage sont envoyées à la base de données');
                                                }
                                            }
                                            function resultatApprentissageSyllabe() {

                                                resultatGeneral(syllabe_apprentissage_clicks_memo);
                                                notificationDeFinDSyllabeApprentissage();
                                                reprendreApprentissageSyllabe();
                                                continuSurExerciceSyllabe();

                                                function notificationDeFinDSyllabeApprentissage() {
                                                    viderNotification();
                                                    setTimeout(() => {
                                                        ecris('apprentissage_notification_corps', '\
                                                            ߌ ߞߎߟߎ߲ߖߋ߫ ߘߐ߬ߖߊ ߟߊ߫ ߛߓߍߘߋ߲ ߠߎ߫ ߘߋ߲߱ ߠߊ߫<br>\
                                                            ߣߴߌ ߓߘߴߊ߬ߟߎ߬ ߟߐ߲߫߸ ߓߐߟߌ߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫ ߛߊ߲ߝߍ߬ ߣߎߡߊ߲߫ ߓߟߏ ߟߊ߫)<br>\
                                                            ߣߴߌ ߘߏ߲߬ ߡߊ߫ ߓߊ߲߫ ߊ߬ߟߎ߬ ߟߐ߲߫ ߠߊ߫߸ ߒ߬ߓߊ߬ ߥߊ߫ ߘߋ߲߰ߠߌ ߡߊ߫ ߤߊ߲߯ ߌ ߦߴߊ߬ߟߎ߬ ߟߐ߲߫ ߞߊ߬ ߣߊ߬ߕߏ߫ ߓߐ߫ ߟߊ߫.\
                                                        ');
                                                    }, 1000);

                                                    setTimeout(() => { indexer($('#fermer_apprentissage')); }, 1000);
                                                }
                                                function reprendreApprentissageSyllabe() {
                                                    $('#reprendre').click(function () {
                                                        goUp($('.resultat_container'));
                                                        $('#syllabe_apprentissage').click();
                                                        afficher($('#apprentissage_progress_bar'));
                                                        viderLeTableau(syllabe_apprentissage_clicks_memo);
                                                    });
                                                }
                                                function continuSurExerciceSyllabe() {
                                                    $('#avance').click(function () {
                                                        goUp($('.resultat_container'));
                                                        $('#syllabe_exercice').click();
                                                    });
                                                }
                                            }
                                            function transitionVersExerciceSyllabe() {
                                                let index_phase_active = $('.phases_container ul .active').index();

                                                if (note == 100) {
                                                    $('#continu_sur_exercice_bouton').click(() => {
                                                        masquer($('.salle_de_classe'));
                                                        setTimeout(() => {
                                                            $('.container').css('display', 'block');
                                                            displayv($('.direction'));
                                                        }, 400);
                                                    });

                                                    changerPhaseActive(index_phase_active);
                                                }
                                            }
                                        }
                                    }
                                });

                            });

                            function initialisationDeApprentissageClicksMemo() {
                                /*
                                --------------------------------------------------------------------------------------------------------
                                    Initialisation de mémoire d'enregistrement qui est un tableau bidimentionnel.
                                    Il contient des petits tableaux de trois éléments chacun:
                                    - Le premier est le nom de l'élément clické;
                                    - Le deuxième est le nombre de fois que cet élément est clické.
                                    - Le troisieme est le point pour cet element.
                                    
                                    L'initialisation consiste à donner la valeur 0 click à tous les éléments.
                                    On considère qu'aucun élément n'est clické pour le moment. 
                                    --------------------------------------------------------------------------------------------------------
                                    */

                                let td = $('.table_parlante tr');

                                $.each(tr, function () {
                                    let tr_index = $(this).index();
                                    $.each($('td', this), function () {
                                        let td_actif = $(this);
                                        let td_index = 7 * tr_index + td_actif.index();
                                        let syllabe = td_actif.html();
                                        syllabe_apprentissage_clicks_memo[td_index] = [syllabe, 0, 0];
                                    });
                                });
                            }
                        }
                    }
                }
                function exerciceSyllabe() { }
                function evaluationSyllabe() { }
            });

            function afficherExerciceRedirectionBtns(data) {
                let note = calculerNote(data);

                masquer($('#exercice_progress_bar'));
                afficher($('#exercice_redirection_btns'));

                if (note < 95) {
                    afficher($('#reprendre_exercice_bouton'));
                    masquer($('#continu_sur_revision_bouton'));
                    $('#reprendre_exercice_bouton').text(liste_de_matieres[0][1] + ' ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯');
                    indexer($('#reprendre_exercice_bouton'));
                }
                if (note >= 95) {
                    masquer($('#reprendre_exercice_bouton'));
                    afficher($('#continu_sur_revision_bouton'));
                    $('#continu_sur_revision_bouton').text(liste_de_matieres[0][1] + ' ߞߘߐߓߐߟߌ ߞߍ߫')
                    indexer($('#continu_sur_revision_bouton'));
                }
            }
            function redirectionSurApprentissage(data) {
                let note = calculerNote(data);

                masquer($('#revision_progress_bar'));
                afficher($('#revision_redirection_btns'));

                $('#revision_question_btn').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').off('click');
                $('#revision_question_btn').removeClass("actif");

                if (note < 95) {
                    masquer($('#continu_sur_apprentissage_bouton'));
                    afficher($('#reprendre_revision_bouton'));
                    masquer($('#evaluation_bouton'));
                    masquer($('#syllabe_bouton'));

                    $('#reprendre_revision_bouton').text(liste_de_matieres[0][1] + ' ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                    indexer($('#reprendre_revision_bouton'));
                }

                if (note >= 95) {
                    if (data.length < 27) {
                        afficher($('#continu_sur_apprentissage_bouton'));
                        masquer($('#reprendre_revision_bouton'));
                        masquer($('#evaluation_bouton'));
                        masquer($('#syllabe_bouton'));

                        $('#continu_sur_apprentissage_bouton').text('ߥߊ߫ ' + liste_de_matieres[0][1] + ' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬')
                        indexer($('#continu_sur_apprentissage_bouton'));

                        $('#continu_sur_revision_bouton').click(() => { raffraichirLaPage(); });
                    }
                    if (data.length === 27) {
                        masquer($('#continu_sur_apprentissage_bouton'));
                        masquer($('#reprendre_revision_bouton'));
                        masquer($('#evaluation_bouton'));
                        afficher($('#syllabe_bouton'));

                        indexer($('#syllabe_bouton'));
                    }
                }
            }
            function afficherSyllabeExerciceBouton() {

                masquer($('#parametre_lesson_container'));
                masquer($('#panneaux'));
                masquer($('#apprentissage_dialogue_btns'));
                setTimeout(() => {
                    masquer($('#apprentissage_progress_bar'));
                    afficher($('#apprentissage_redirection_btns'));

                    masquer($('#pre_apprentissage_bouton'));
                    afficher($('#continu_sur_exercice_bouton'));
                    $('#continu_sur_exercice_bouton').text(matiere_nom + " ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫");
                    indexer($('#continu_sur_exercice_bouton'));
                }, 400);
            }
            function afficherPreRevisionBtn() {
                $('#apprentissage_dialogue_btn').css('display', 'none');

                $('#pre_apprentissage_btns').css('display', 'none');
                $('.redirection_btns').css('display', 'block');

                $('#exercice_bouton').css('display', 'none');
                $('#evaluation_bouton').css('display', 'block');

                zoomUp($('.dialogue_btns'));
            }
            function raffraichissementDeLaPage() {
                $('#fermer_pre_apprentissage, #fermer_apprentissage').on('click', function () { raffraichirLaPage(); });
            }
            function initialiserApprentissageResultat() {

                questions_posees.splice(0, questions_posees.length);
                pre_apprentissage_data.splice(0, pre_apprentissage_data.length);
                nbr_bonne_reponse = 0;
                nbr_mauvaise_reponse = 0;
                taux_de_fausse_reponse = 0;
                taux_de_vraie_reponse = 0;
                point_total = 0;

                $('#pre_exercice_resultat h3').html('ߞߎߘߎ߲߫ ߞߐߝߟߌ');
                $('#pre_exercice_resultat #resultat').html('');
                $('#pre_exercice_resultat #libelles').html('');
                $('#pre_exercice_resultat #diagram').html('');
                $('#pre_exercice_resultat #legende').html('');
            }
        }
        function formatParDefautDuResultat() {

            $('#table_head tr:nth-child(2) td').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ');
            $('#table_head tr:nth-child(3) td').text('ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ');

            $.each($('#table_body tr:nth-child(3) td, #table_body tr:nth-child(4) td'), function () {
                $(this).html('');
            });

            $('#total_reponse').text('');
            $('#total_point_1').text('');

            $('#resultat_pied > div > div:nth-child(1) span:first-child').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߡߎ߬ߡߍ');
            $('#resultat_pied > div > div:nth-child(2) span:first-child').text('ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ߫ ߢߊ߬ߣߍ߲');
            $('#resultat_pied > div > div:nth-child(3)').css('display', 'block');

            $('#total_bonne_reponse').text('');
            $('#total_point_2').text('');
        }
        function adapterLeResultatAuFormatDApprentissage(table) {

            $('#table_head tr:nth-child(2) td').text('ߛߓߍߘߋ߲');
            $('#table_head tr:nth-child(3) td').text('ߘߌ߯ߟߌ');

            $.each($('#table_body tr:nth-child(3) td'), function () {
                $(this).html(parseIntNko($(this).html()));
            });

            $('#total_reponse').text(parseIntNko(totalDAppui()));
            $('#total_point_1').text(parseIntNko(totalApprentissagePoint()));

            $('#resultat_pied > div > div:nth-child(1) span:first-child').text('ߛߓߍߘߋ ߡߎ߬ߡߍ');
            $('#resultat_pied > div > div:nth-child(2) span:first-child').text('ߘߌ߯ߟߌ ߡߎ߬ߡߍ');
            $('#resultat_pied > div > div:nth-child(3)').css('display', 'none');

            $('#total_bonne_reponse').text(parseIntNko(totalDAppui()));
            $('#total_point_2').text(parseIntNko(totalApprentissagePoint()));


            function totalDAppui() {
                let ta = 0;
                for (let i = 0; i < table.length; i++) {
                    ta += table[i][1];
                }
                return ta;
            }
            function totalApprentissagePoint() {
                let tap = 0;
                for (let i = 0; i < table.length; i++) {
                    tap += table[i][2];
                }
                return tap;
            }
        }
        function afficherPreApprentissageBtns() {
            $('#apprentissage_dialogue_btns').css('display', 'block');
            $('#apprentissage_progress_bar').css('display', 'none');
            $('#apprentissage_redirection_btns').css('display', 'none');

            afficher($('.dialogue_btns > div:not(.progress_bar_integre)'));
            $('#afficheur_de_panneau').css({ 'opacity': 1, 'transform': 'scale(1)' });
            rendreActif($('#afficheur_de_panneau'));
            indexer($('#afficheur_de_panneau'));
        }
        function afficherPreExerciceBtn() {
            $('#apprentissage_dialogue_btns').css('display', 'none');
            $('#apprentissage_progress_bar').css('display', 'none');
            $('#apprentissage_redirection_btns').css('display', 'block');

            $('#pre_apprentissage_bouton').css('display', 'none');
            $('#continu_sur_exercice_bouton').css('display', 'block');
            $('#evaluation_bouton').css('display', 'none');
            indexer($('#continu_sur_exercice_bouton'));
        }
        function afficherPreRevisionBtn() {
            $('#pre_apprentissage_dialogue_btn').css('display', 'block');
            $('#apprentissage_dialogue_btn').css('display', 'none');
            $('.progress_bar').css('display', 'none');

            $('.progress_bar_integre').css('display', 'block');
            $('#pre_apprentissage_btns').css('display', 'none');
            // $('#redirection_btns').css('display','block');

            $('#exercice_bouton').css('display', 'none');
            $('#evaluation_bouton').css('display', 'block');
        }
        function afficherRepriseBtn() {
            $('#pre_apprentissage_dialogue_btn').css('display', 'block');
            $('#apprentissage_dialogue_btn').css('display', 'none');

            $('.progress_bar_integre').css('display', 'block');
            $('#pre_apprentissage_btns').css('display', 'none');
            $('#redirection_btns').css('display', 'block');

            $('#exercice_bouton').css('display', 'block');
            $('#evaluation_bouton').css('display', 'none');
        }
        function afficherAvanceBtn() {
            $('#pre_apprentissage_dialogue_btn').css('display', 'block');
            $('#apprentissage_dialogue_btn').css('display', 'none');

            $('.progress_bar_integre').css('display', 'block');
            $('#pre_apprentissage_btns').css('display', 'none');
            $('#redirection_btns').css('display', 'block');

            $('#exercice_bouton').css('display', 'none');
            $('#evaluation_bouton').css('display', 'block');
        }
        function afficherPreExerciceBtns() {
            $('#pre_apprentissage_dialogue_btn').css('display', 'block');
            $('#apprentissage_dialogue_btn').css('display', 'none');

            $('.progress_bar_integre').css('display', 'none');
            $('#exercice_btns').css('display', 'block');
            $('#pre_apprentissage_btns').css('display', 'none');
            $('#redirection_btns').css('display', 'none');
        }
        function afficherProgressBarIntegre() {
            $('#pre_apprentissage_dialogue_btn').css('display', 'block');
            $('#apprentissage_dialogue_btn').css('display', 'none');

            $('.progress_bar_integre').css('display', 'block');
            $('#pre_apprentissage_btns').css('display', 'none');
            $('#redirection_btns').css('display', 'none');
        }
        function afficherDialogueBtn() {
            $('.dialogue_btn').css('display', 'block');
        }
        function afficherProgressBar() {
            $('.progress_bar').css('display', 'block');
        }
        function initialiserExercice() {

            questions_posees.splice(0, questions_posees.length);
            nbr_bonne_reponse = 0;
            nbr_mauvaise_reponse = 0;
            taux_de_fausse_reponse = 0;
            taux_de_vraie_reponse = 0;
            point_total = 0;
        }
        function initialiserExerciceResultat() {

            questions_posees.splice(0, questions_posees.length);
            exercice_pre_syllabe_memoire.splice(0, exercice_pre_syllabe_memoire.length);
            nbr_bonne_reponse = 0;
            nbr_mauvaise_reponse = 0;
            taux_de_fausse_reponse = 0;
            taux_de_vraie_reponse = 0;
            point_total = 0;

            $('#pre_exercice_resultat h3').html('ߞߎߘߎ߲߫ ߞߐߝߟߌ');
            $('#pre_exercice_resultat #resultat').html('');
            $('#pre_exercice_resultat #libelles').html('');
            $('#pre_exercice_resultat #diagram').html('');
            $('#pre_exercice_resultat #legende').html('');
        }
    }
}