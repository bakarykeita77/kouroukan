function syllabe() {
    
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));

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

            let quantite_normale_de_click = 1;

            let panneau_status = "masque";
            let consonnes_choisies = [];
            let consonnes_choisies_du_serveur = consonnesChoisiesDuServeur();
            let memoire_consonnes_choisies = JSON.parse(localStorage.getItem('memoire_consonnes_choisies'));
            memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? [] : memoire_consonnes_choisies;

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

                        chargerPanneauDesSyllabes();
                        chargerApprentissageDialoguesBtns();
                        chargerApprentissageRedirectionBtns();

                        function chargerPanneauDesSyllabes() {
                            var pre_apprentissage_panneaux_html = panneauxDesLettresHTML();
                            $('#panneaux').html(pre_apprentissage_panneaux_html);

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
                                html_2 += '</div>\n';

                                return html_2;
                            }
                        }
                        function chargerApprentissageDialoguesBtns() {
                            $('#apprentissage_dialogue_btns').html("<div class='titre_de_parti' id='afficheur_de_panneau'><p>ߛߌ߬ߙߕߊ߬ ߥߟߊ ߦߌ߬ߘߊ߬</p></div>");
                        }
                        function chargerApprentissageRedirectionBtns() {
                            $('#continu_sur_exercice_bouton').html("<p>ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
                        }

                        // initialiserProgressBar();

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
                                    
                                    let s1 = (consonnes_choisies.length < 2) ? "" : "s";

                                    console.log(consonnes_choisies.length+" nouvelle"+s1+" consonne"+s1+" choisie"+s1+" dont:");
                                    console.log(consonnes_choisies);
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

                                                actualiserApprentissagePreSyllabeProgressBar();
                                            }

                                            function actualiserApprentissagePreSyllabeProgressBar() {
                                                good_response_width += progress_unity;
                                                $('.progress_bonne_reponse_bar').css('width', good_response_width + '%');
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
                            $("#afficheur_de_panneau").click(() => {
                                localStorage.setItem("consonnes_choisies", JSON.stringify(consonnes_choisies));
                            });
                        }
                    }
                }
                function afficherApprentissagePreSyllabe() {

                    masquer($('.direction'));
                    afficher($('.salle_de_classe'));
                    afficher($('.course'));
                    afficherApprentissageContainer();

                    afficherEnteteDApprentissagePreSyllabe();
                    afficherCorpsDApprentissagePreSyllabe();
                    afficherFootDApprentissagePreSyllabe();
                    

                    function afficherApprentissageContainer() {
                        $('#apprentissage_container').css('display', 'block');
                        $('#exercice_container').css('display', 'none');
                        $('#revision_container').css('display', 'none');
                        $('#evaluation_container').css('display', 'none');
                    }
                    function afficherEnteteDApprentissagePreSyllabe() {
                        displayv($('#apprentissage_head')); 
                        affichageDeModificateurDeChoix();
                        
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
                    }
                    function afficherCorpsDApprentissagePreSyllabe() {
                            displayv($('#apprentissage_body_cadre'));
                            setTimeout(() => {
                                displayv($('#apprentissage_progress_bar')); 
                                displayv($('#apprentissage_body')); 
                            }, 100);
                    }
                    function afficherFootDApprentissagePreSyllabe() {
                        setTimeout(() => {
                            displayv($('#apprentissage_foot'));
                            setTimeout(() => { 
                                afficherPreApprentissageBtns(); 
                                affichageDePanneauDesConsonnes();
                            }, 100);
                        }, 100);

                        function affichageDePanneauDesConsonnes() {
                                
                            $('#consonnes_cadre').css({ 'top':'12rem' });

                            togglePanneauDesConsonnes();
                            panneauxStyle();

                            function togglePanneauDesConsonnes() {

                                $('#afficheur_de_panneau').click(function (e) {
                                    e.stopImmediatePropagation();
                                    $(this).removeClass('indicateur');
                                    if (panneau_status == "masque") { afficherPanneau() } else { masquerPanneau(); };
                                }); 
                                
                                function afficherPanneau() {
                                    
                                    $('#panneaux').css({ 'position':'absolute', 'height':'20rem' });
                                    $('#consonnes_cadre').animate({ 'top':'7rem' }, 150);
                                    panneau_status = "affiche";

                                    setTimeout(() => {
                                        $('#afficheur_de_panneau').html("<p>ߛߌ߬ߙߕߊ߬ ߥߟߊ ߘߏ߲߰</p>");
                                        clignoterUneFois($('#afficheur_de_panneau'));
                                    }, 400);

                                    viderNotification();
                                    setTimeout(() => { ecris("apprentissage_notification_corps", "ߛߌ߬ߙߕߊ߬ ߞߋߟߋ߲߫ ߥߟߊ ߛߌߦߊߡߊ߲߫ ߛߎߥߊ߲ߘߌ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰."); }, 800);
                                }
                                function masquerPanneau() {

                                    $('#consonnes_cadre').animate({ 'top': '12rem' }, 150);
                                    setTimeout(function () { $('#panneaux').css('height', 0); }, 100);
                                    panneau_status = "masque";

                                    setTimeout(() => {
                                        $('#afficheur_de_panneau').text("ߛߌ߬ߙߕߊ߬ ߥߟߊ ߦߌ߬ߘߊ߬");
                                        clignoterUneFois($('#afficheur_de_panneau'));
                                    }, 400);

                                    viderNotification();
                                    if ($('.table_parlante tr').length == 0) setTimeout(() => { ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬."); }, 800);
                                    if ($('.table_parlante tr').length != 0) {
                                        setTimeout(() => { ecris("apprentissage_notification_corps", "ߜߋ߲߭ ߢߌ߲߬ ߠߎ߫ ߞߋ߬ߟߋ߲߬ ߞߋ߬ߟߋ߲߬ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߴߌ ߞߣߐ߫."); }, 800);
                                    }
                                }
                            }
                            function panneauxStyle() {

                                consonnesChoisies();

                                $.each($('#panneaux span'), function () {

                                    let panneaux_span = $(this);
                                    let panneaux_consonne = ($(this).text());

                                    if (memoire_consonnes_choisies.length > 0) {
                                        memoire_consonnes_choisies.forEach(element => {
                                            if (element == panneaux_consonne) { panneaux_span.css({ 'color':'orange', 'font-weight':'bold', 'box-shadow':'none' }); }
                                        });
                                    }
                                });

                                function consonnesChoisies() {
                                    memoire_consonnes_choisies = (memoire_consonnes_choisies.length == 0) ? consonnes_choisies_du_serveur : consonnes_choisies_du_serveur.concat(memoire_consonnes_choisies);
                                    localStorage.setItem('memoire_consonnes_choisies', JSON.stringify(memoire_consonnes_choisies));
                                }
                            }
                        }
                    }
                }
                function apprendrePreSyllabe() {

                    rappelDesBoutons();
                    initialiserProgressBar();
                    apprenezPreSyllabe();

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
    
                            if(e.target.id == "pre_texte") {
                                secouer($("#afficheur_de_panneau"));
                                return;
                            }
                        });
                        $('#panneaux').click(function (e) {
                            if($('#consonnes_cadre').css('top') == '112px' && consonnes_choisies.length === 0) {
                                secouer($('#consonnes_cadre span'));
                                return;
                            }
                            if(e.target.id == "panneaux") {
                                secouer($("#afficheur_de_panneau"));
                                return;
                            }
                        });
                    }
                    function apprenezPreSyllabe() {
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
                                    rappelDesBoutonsTdEtRedirectionBtns();
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

                                            if (global_clicks_count / quantite_normale_de_click == lesson_d_apprentissage_pre_syllabe_du_jour.length) {
                                                setTimeout(() => {
                                                    td_click_counter = 0;
                                                    compteur_td_click = 0;
                                                    apprentissage_width = 0;
                                                    global_clicks_counter = 1;
                                                }, 400);
                                            }
                                        }
                                    }
                                    function rappelDesBoutonsTdEtRedirectionBtns() {
                                        $('#apprentissage_body').click(function (e) {
                                            if(compteur_de_syllabe < lesson_d_apprentissage_pre_syllabe_du_jour.length) {
                                                if(e.target.tagName == "DIV") {
                                                    secouer($('#table_syllabe_apprentissage td'));
                                                    return;
                                                }
                                            }
                                            if(compteur_de_syllabe === lesson_d_apprentissage_pre_syllabe_du_jour.length) {
                                                if(e.target.tagName == "DIV") {
                                                    secouer($("#apprentissage_redirection_btns"));
                                                    return;
                                                }
                                            }
                                        });
                                    }
                                    function finDApprentissagePreSyllabe() {
                                        if (compteur_de_syllabe === lesson_d_apprentissage_pre_syllabe_du_jour.length) {

                                            let note_d_apprentissage_pre_syllabe = calculerNote(lesson_d_apprentissage_pre_syllabe_du_jour);
                                            if (note_d_apprentissage_pre_syllabe === 100) {
                                                setTimeout(() => {
                                                    
                                                    // resultatApprentissagePreSyllabe();iserProgressBar();
                                                    notificationDeFinDApprentissagePreSyllabe();
                                                    affichageDePreExerciceBtn();
                                                    exercicePreSyllabe();
                                                    
                                                    function notificationDeFinDApprentissagePreSyllabe() {
                                                        viderNotification();
                                                        setTimeout(() => {
                                                            ecris('apprentissage_notification_corps', "ߌ ߞߎߟߎ߲ߖߋ߫ ߘߐ߬ߖߊ ߟߊ߫ ߞߊ߬ ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߞߍ߫߸ ߛߌߛߊ߲߬ ߡߊ߬ߞߟߏ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߜߋ߲߭ ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߟߎ߬ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫");
                                                        }, 400); 
                                                    }
                                                    function affichageDePreExerciceBtn() {
                                                        masquer($('#apprentissage_dialogue_btns'));
                                                        setTimeout(() => { afficherPreExerciceBtn(); }, 100);
                                                    }
                                                }, 600);

                                                function resultatApprentissagePreSyllabe() {

                                                    resultat(lesson_d_apprentissage_pre_syllabe_du_jour);
                                                    adapterLeResultatAuFormatDApprentissage(lesson_d_apprentissage_pre_syllabe_du_jour);
                                                    afficherApprentissagePreSyllabeResultat();
                                                    masquerApprentissagePreSyllabeResultat();

                                                    function afficherApprentissagePreSyllabeResultat() { goDown($('.resultat_container')); }
                                                    function masquerApprentissagePreSyllabeResultat() {
                                                        $('#fermer_resultat, #avance').click(function () {
                                                            masquer($('.resultat_container'));
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
                    let i = 0;
                    let rang = '߭';
                    let action = "ߟߊߡߍ߲߫";

                    total_exercice_pre_syllabe_questions = exercice_pre_syllabe_questions.length;

                    $('.fermeture_pre').attr('id', 'fermeture_pre_exercice');

                    chargerExercicePreSyllabe();
                    afficherExercice();
                    exercice();


                    function chargerExercicePreSyllabe() {

                        chargerEnteteDExercicePreSyllabe();
                        chargerCorpsDExercicePreSyllabe();
                        chargerPiedDExercicePreSyllabe();

                        function chargerEnteteDExercicePreSyllabe() {
                            $('.notification_titre').html('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ');
                            viderNotification();
                            setTimeout(() => {
                                ecris('exercice_notification_corps', "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߟߎ߫ ߟߋ߬ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߵߊ߬ߟߎ߫ ߦߌ߬ߘߊ߬߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫.");
                            }, 800);
                        }
                        function chargerCorpsDExercicePreSyllabe() {
                            let exercice_body_html = lessonHTML(malaxer(syllabes_actives), '');
                            $('#exercice_body').html(exercice_body_html);
                        }
                        function chargerPiedDExercicePreSyllabe() {
                            total_exercice_pre_syllabe_questions = exercice_pre_syllabe_questions.length;

                            chargerExercicePreSyllabeDialogueBtns();
                            chargerExercicePreSyllabeRedirectionBtns();

                            function chargerExercicePreSyllabeDialogueBtns() {
                                $('#exercice_question_btn').html('<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(total_exercice_pre_syllabe_questions) + ' \\ ߁߭ ߟߊߡߍ߲߫</p>');
                                $('#exercice_repetition_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(1)+'߭ ߟߊߡߍ߲߫ ߕߎ߲߯');
                                $('#exercice_correction_btn').html('ߏ߬ ߛߊߞߍ߫');
                            }
                            function chargerExercicePreSyllabeRedirectionBtns() {
                                $('#reprendre_exercice_bouton').html('<p>ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯</p>');
                                $('#continu_sur_revision_bouton').html('<p>ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫</p>');
                            }
                        }
                    }
                    function exercice() {

                        let question_status = 'repondue';

                        initialiserExercicePreSyllabe();
                        initialiserProgressBar();
                        ecouterLaQuestionDExercicePreSyllabe();
                        repeterLaQuestionDExercicePreSyllabe();
                        repondreLaQuestionDExercicePreSyllabe();
                        corrigerLaQuestionDExercicePreSyllabe();


                        function initialiserExercicePreSyllabe() {
                            lesson_d_exercice_pre_syllabe_du_jour = initialiserData(exercice_pre_syllabe_questions);
                        }
                        function ecouterLaQuestionDExercicePreSyllabe() {

                            rendreActif($('#exercice_question_btn'));
                            indexer($('#exercice_question_btn p'));
                    
                            $('#exercice_question_btn').click(function (e) {
                                e.stopImmediatePropagation();
                                let exercice_question_btn = $(this);
                                exercice_pre_syllabe_question = exercice_pre_syllabe_questions[i];

                                console.log(exercice_pre_syllabe_question);

                                masquerExerciceQuestionBtn();
                                lireExercicePreSyllabeQuestion();
                                enregistrerExercicePreSyllabeQuestion();
                                rechargerExerciceQuestionBtn();
                                rechargerExerciceRepetitionBtn();
                                afficherExerciceRepetitionBtn();

                                function masquerExerciceQuestionBtn() { masquer(exercice_question_btn); }
                                function lireExercicePreSyllabeQuestion() {
                                    if (i < exercice_pre_syllabe_questions.length) {
                                        lire('ߊ', exercice_pre_syllabe_question);
                                    }
                                }
                                function enregistrerExercicePreSyllabeQuestion() { 
                                    if (i < exercice_pre_syllabe_questions.length) {
                                        exercice_pre_syllabe_questions_posees.push(exercice_pre_syllabe_question); 
                                    }
                                }
                                function rechargerExerciceQuestionBtn() {
                                                            
                                    i++;
                                    rang = '߲';
                                    action = "ߠߊߡߍ߲߫";
                                    question_status = 'posee';
                                    ordre_de_question = (total_exercice_pre_syllabe_questions == i + 1) ? 'ߟߊߓߊ߲' : parseIntNko(i + 1)+rang;
                                    
                                    $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(total_exercice_pre_syllabe_questions) + ' \\ ' + ordre_de_question + ' '+action);
                                    if (i == exercice_pre_syllabe_questions.length) { masquer($('#exercice_question_btn')); }
                                }
                                function rechargerExerciceRepetitionBtn() {
                                    if(i > 1) {
                                        ordre_de_question = (exercice_pre_syllabe_questions.length == i) ? 'ߟߊߓߊ߲' : parseIntNko(i)+rang;
                                        $('#exercice_repetition_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' +ordre_de_question+' ߠߊߡߍ߲߫ ߕߎ߲߯');
                                    }
                                }
                            });
                        }
                        function repeterLaQuestionDExercicePreSyllabe() {
                            $('#exercice_repetition_btn').click(function (e) {
                                e.stopImmediatePropagation();

                                relireExerciceQuestion();
                                afficherExerciceRepetitionBtn();

                                function relireExerciceQuestion() {
                                    if (i < exercice_pre_syllabe_questions.length) lire('ߊ', exercice_pre_syllabe_question);
                                }
                            });
                        }
                        function afficherExerciceRepetitionBtn() {
                            masquer($('#exercice_question_btn'));
                            masquer($('#exercice_repetition_btn'));
                            masquer($('#exercice_correction_btn'));

                            setTimeout(() => { 
                                display($('#exercice_repetition_btn')); 
                                rendreActif($('#exercice_repetition_btn'));
                            }, 100);
                        }
                        function repondreLaQuestionDExercicePreSyllabe() {
                            $.each($('#exercice_body td'), function () {
                                $(this).click(function () {
                                    element_actif = $(this);

                                 /* Au cas où on tente de repondre sans qu'une question soit posée, exercice_btn clignote pour rappel */
                                    if(question_status == 'repondue') {
                                        secouer($('#exercice_question_btn'));
                                        return;
                                    }
                        
                                    if(exercice_pre_syllabe_question != '') {

                                        enregistrerExercicePreSyllabeReponse();
                                        marquageDeLaConsonneChoisie();
                                        afficherExerciceCorrectionBtn();

                                        function enregistrerExercicePreSyllabeReponse() {
                                            exercice_pre_syllabe_reponse = element_actif.html();
                                        }
                                        function marquageDeLaConsonneChoisie() {
                                            $('#exercice_body table td').css({ 'background-color': 'rgba(85,85,85,0.25)', 'color': 'white' });
                                            marquerLaConsonneChoisie(element_actif);
                                        }
                                        function afficherExerciceCorrectionBtn() {
                                            masquer($('#exercice_question_btn'));
                                            masquer($('#exercice_repetition_btn'));
                                            
                                            setTimeout(() => { 
                                                display($('#exercice_correction_btn')); 
                                                rendreActif($('#exercice_correction_btn'));
                                            }, 100);
                                        }
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
                                if(exercice_pre_syllabe_questions_posees.length <= total_exercice_pre_syllabe_questions) {
                                                        
                                    question_status = 'repondue';

                                    marquerReponse(element_actif, exercice_pre_syllabe_question);
                                    enregistrerPreExerciceSyllabe();
                                    progressBarPreExerciceSyllabe();
                                    afficherExerciceQuestionBtn();
                                    finDePreExerciceSyllabe();


                                    function enregistrerPreExerciceSyllabe() {

                                        let question_reponse = [];

                                     /*S'il n'y a pas de question, ne rien faire.*/
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

                                        setTimeout(() => { display($('.progress_bar')); }, 400);

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
                                    function afficherExerciceQuestionBtn() {
                                        masquer($('#exercice_repetition_btn'));
                                        masquer($('#exercice_correction_btn'));

                                        setTimeout(() => { 
                                            display($('#exercice_question_btn')); 
                                            rendreActif($('#exercice_question_btn'));
                                        }, 100);
                                    }
                                    function finDePreExerciceSyllabe() {
                                        if (exercice_pre_syllabe_questions_posees.length === total_exercice_pre_syllabe_questions) {

                                            $('#exercice_dialogue_btns').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫');

                                            setTimeout(() => {

                                                let note_d_exercice_pre_syllabe = calculerNote(lesson_d_exercice_pre_syllabe_du_jour);

                                                // setTimeout(() => { preExerciceResultat(); }, 300);

                                                if (note_d_exercice_pre_syllabe < 100) {

                                                    notificationDeRepriseDExercice();
                                                    affichageDeRepriseDExerciceBtn();

                                                    function notificationDeRepriseDExercice() {
                                                        viderNotification();
                                                        setTimeout(() => {
                                                            let notification = liste_de_matieres[0][1] + " ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                            ecris('exercice_notification_corps', notification);
                                                        }, 800); 
                                                    }
                                                    function affichageDeRepriseDExerciceBtn() {
                                                        setTimeout(() => { masquer($('#exercice_dialogue_btns')); }, 1800);
                                                        setTimeout(() => {
                                                            displayv($('#exercice_redirection_btns'));

                                                            display($('#reprendre_exercice_bouton'));
                                                            masquer($('#continu_sur_revision_bouton'));
                                                            indexerP($('#reprendre_exercice_bouton p'));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exercicePreSyllabe().

                                                            lesson_d_exercice_pre_syllabe_du_jour.splice(0, lesson_d_exercice_pre_syllabe_du_jour.length);
                                                        }, 2000);
                                                    }
                                                }
                                                if (note_d_exercice_pre_syllabe == 100) {

                                                    notificationDeReussiteDExercice();
                                                    affichageDeRevisionRedirectionBtn();

                                                    function notificationDeReussiteDExercice() {
                                                        viderNotification();
                                                        setTimeout(() => {
                                                            let notification = liste_de_matieres[1][1] + " ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                            ecris('exercice_notification_corps', notification);
                                                        }, 800);
                                                    }
                                                    function affichageDeRevisionRedirectionBtn() {
                                                        setTimeout(() => { masquer($('#exercice_dialogue_btns')); }, 1700);
                                                        setTimeout(() => {
                                                            display($('#exercice_redirection_btns'));

                                                            masquer($('#reprendre_exercice_bouton'));
                                                            rendreActif($('#continu_sur_revision_bouton'));
                                                            indexerP($('#continu_sur_revision_bouton p'));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exercicePreSyllabe().
                                                        }, 1800);
                                                    }
                                                }

                                                $('#deliberation').click(function () { goUp($('.resultat_container')); });

                                                /* Initialiser exercice */
                                                setTimeout(() => {
                                                    // initialiserExercice();
                                                }, 600);
                                            }, 800);


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
                                if (i == exercice_pre_syllabe_questions.length) { i = 0; }
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
                    var revision_counter = 0;
                    let good_response_counter = 0;

                    var q_revision_total = parseIntNko(lesson_d_apprentissage_pre_syllabe.length);

                    lesson_active = 'pre_revision';

                    chargerRevisionPreSyllabe();
                    afficherRevision();
                    reviserPreSyllabe();


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

                            initialisationDeRevisionFoot();

                            $('#continu_sur_apprentissage_bouton').html('<p>ߥߊ߫ ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߊߌ ߡߊ߬</p>');
                            $('#reprendre_revision_bouton').html('<p>ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߌߦߌ ߞߍ߫ ߕߎ߲߯</p>');
                            $('#continu_sur_evaluation_bouton').html('<p>ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߍ߫</p>');

                            function initialisationDeRevisionFoot() {

                                q_revision_total = parseIntNko(syllabes_a_reviser.length);

                                $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+ q_revision_total +'\\'+parseIntNko(1)+'߭ ߟߊߡߍ߲߫');
                                $('#revision_repetition_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(1)+'߭ ߟߊߡߍ߲߫ ߕߎ߲߯');
                                $('#revision_correction_btn').html('ߏ߬ ߛߊߞߍ߫');
                            }
                        }
                    }
                    function reviserPreSyllabe() {

                        let clicked_response_element = '';
                        let revision_pre_syllabe_questions = malaxer(syllabes_a_reviser);
                        let i = 0;
                        let rang = '߭';
                        let action = "ߟߊߡߍ߲߫";

                        let question_status = 'repondue';

                        initialiserRevisionPreSyllabe();
                        initialiserProgressBar();
                        poserQuestionRevisionPreSyllabe();
                        repeterQuestionRevisionPreSyllabe();
                        repondreQuestionRevisionPreSyllabe();
                        correctionRevisionPreSyllabe();


                        function initialiserRevisionPreSyllabe() {
                            lesson_de_revision_pre_syllabe_du_jour = initialiserData(revision_pre_syllabe_questions);
                        }
                        function poserQuestionRevisionPreSyllabe() {

                            rendreActif($('#revision_question_btn'));
                            indexer($('#revision_question_btn p'));
                    
                            $('#revision_question_btn').on('click', function (e) {
                                e.stopImmediatePropagation();

                                let revision_question_btn = $(this);
                                
                                question_status = 'posee';

                                masquerRevisionQuestionBtn();
                                enregistrerRevisionPreSyllabeQuestion();
                                lireRevisionPreSyllabeQuestion();
                                rechargerRevisionQuestionBtn();
                                rechargerRevisionRepetitionBtn();
                                afficherRevisionRepetitionBtn();

                                function masquerRevisionQuestionBtn() { revision_question_btn.css('display','none'); }
                                function enregistrerRevisionPreSyllabeQuestion() { question_de_revision_pre_syllabe = revision_pre_syllabe_questions[i]; }
                                function lireRevisionPreSyllabeQuestion() { lire('ߊ', question_de_revision_pre_syllabe); }
                                function rechargerRevisionQuestionBtn() {  

                                    i++;
                                    rang = '߲';
                                    action = "ߠߊߡߍ߲߫";
                                    ordre_de_question = (revision_pre_syllabe_questions.length == i + 1) ? 'ߟߊߓߊ߲' : parseIntNko(i + 1)+rang;
                                    
                                    $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(revision_pre_syllabe_questions.length) + ' \\ ' + ordre_de_question + ' '+action);
                                    if (i-1 == revision_pre_syllabe_questions.length) { masquer($('#revision_question_btn')); }
                                }
                                function rechargerRevisionRepetitionBtn() {
                                    if(i > 1) {
                                        ordre_de_question = (revision_pre_syllabe_questions.length == i) ? 'ߟߊߓߊ߲' : parseIntNko(i)+rang;
                                        $('#revision_repetition_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' +ordre_de_question+' ߠߊߡߍ߲߫ ߕߎ߲߯');
                                    }
                                }
                                
                                console.log(question_de_revision_pre_syllabe);
                            });
                        }
                        function repeterQuestionRevisionPreSyllabe() {
                            $('#revision_repetition_btn').on('click', function () {
                                lire('ߊ', question_de_revision_pre_syllabe);
                                afficherRevisionRepetitionBtn();
                            });
                        }
                        function repondreQuestionRevisionPreSyllabe() {
                            $('#revision_body table td').on('click', function (e) {
                                e.stopImmediatePropagation();

                                clicked_response_element = $(this);
                                if (question_de_revision_pre_syllabe == '') rappel($('#evaluation_dialogue_btn'));
                                if (question_de_revision_pre_syllabe != '') {
                                    reponse_de_revision_pre_syllabe = $(this).text();
                                    $('#revision_body table td').css({ 'background-color': 'rgba(85,85,85,0.25)', 'color': 'white' });
                                    afficherRevisionCorrectionBtn();
                                    marquerLaConsonneChoisie(clicked_response_element);
                                }
                                
                                function afficherRevisionCorrectionBtn() {
                                    masquer($('#revision_question_btn'));
                                    masquer($('#revision_repetition_btn'));
                                    
                                    setTimeout(() => { 
                                        display($('#revision_correction_btn')); 
                                        rendreActif($('#revision_correction_btn'));
                                    }, 100);
                                }
                            });
                        }
                        function correctionRevisionPreSyllabe() {
                            $('#revision_correction_btn').click(function (e) {
                                e.stopImmediatePropagation();

                                question_status = 'repondue';

                                if (i <= revision_pre_syllabe_questions.length) {

                                    marquerReponse(clicked_response_element, question_de_revision_pre_syllabe);
                                    enregistrerRevisionPreSyllabe();
                                    progressBarRevisionPreSyllabe();
                                    afficherRevisionQuestionBtn();
                                    finDeRevisionPreSyllabe();
                                    

                                    function enregistrerRevisionPreSyllabe() {

                                        let q = question_de_revision_pre_syllabe;
                                        let r = reponse_de_revision_pre_syllabe;
                                        let p = (q == r) ? 1 : 0;
                                        let question_reponse = [q, r, p];

                                        lesson_de_revision_pre_syllabe_du_jour.splice(revision_counter - 1, 1, question_reponse);
                                        revision_counter++;
                                    }
                                    function progressBarRevisionPreSyllabe() {

                                        let progress_unity = 100 / revision_pre_syllabe_questions.length;

                                        if (question_de_revision_pre_syllabe == '') return;
                                        if (question_de_revision_pre_syllabe != '') {

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
                                    function afficherRevisionQuestionBtn() {
                                        masquer($('#revision_repetition_btn'));
                                        masquer($('#revision_correction_btn'));

                                        setTimeout(() => { 
                                            display($('#revision_question_btn')); 
                                            rendreActif($('#revision_question_btn'));
                                        }, 100);
                                    }
                                    function finDeRevisionPreSyllabe() {
                                        if (i === revision_pre_syllabe_questions.length) {

                                            let note_de_revision_pre_syllabe = calculerNote(lesson_de_revision_pre_syllabe_du_jour);

                                            rechargerRevisionDialogueBtns();
                                            masquerRevisionDialogueBtns();
            
                                            if (note_de_revision_pre_syllabe < 100) {
                                                afficherRevisionPreSyllabeRepriseBtn();
                                                
                                                function afficherRevisionPreSyllabeRepriseBtn() {
                                                    setTimeout(() => {
                                                        display($('#revision_redirection_btns'));

                                                        masquer($('#continu_sur_apprentissage_bouton'));
                                                        display($('#reprendre_revision_bouton'));
                                                        masquer($('#continu_sur_evaluation_bouton'));

                                                        indexerP($('#reprendre_revision_bouton p'));
                                                    }, 1800);
                                                }
                                            }
                                            if (note_de_revision_pre_syllabe === 100) {

                                                stockerApprentissagePreSyllabe();
                                                stockerExercicePreSyllabe();
                                                stockerRevisionPreSyllabe();
                                                actualiserConsonnesChoisies();
                                                afficherRedirectionBtns();
                                                // initialiserExercice();
                                                         

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
                                                function stockerExercicePreSyllabe() {

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
                                                function stockerRevisionPreSyllabe() {

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
                                             
                                                    consonnes_choisies.forEach(element => {
                                                        if($.inArray(element, memoire_consonnes_choisies) === -1) {
                                                            memoire_consonnes_choisies.push(element);
                                                        }
                                                    });

                                                    console.log("Les consonnes choisies sont :");
                                                    console.log(consonnes_choisies);                            
                                                    console.log('memoire_consonnes_choisies');
                                                    console.log(memoire_consonnes_choisies);

                                                    localStorage.setItem('memoire_consonnes_choisies', JSON.stringify(memoire_consonnes_choisies));
                                                }
                                                function afficherRedirectionBtns() {
                                                    setTimeout(() => {
                                                        display($('#revision_redirection_btns'));
                                                                                    
                                                        afficherRedirectionSurApprentissagePreSyllabeBtn();
                                                        afficherRedirectionSurEvaluationPreSyllabeBtn();
                                                        continuSurApprentissagePreSyllabe();

                                                        function afficherRedirectionSurApprentissagePreSyllabeBtn() {
                                                            if (lesson_d_apprentissage_pre_syllabe.length < 14) {
                                                                display($('#continu_sur_apprentissage_bouton'));
                                                                masquer($('#reprendre_revision_bouton'));
                                                                masquer($('#continu_sur_evaluation_bouton'));
        
                                                                indexerP($('#continu_sur_apprentissage_bouton p'));
                                                            }
                                                        }
                                                        function afficherRedirectionSurEvaluationPreSyllabeBtn() {
                                                            if (lesson_d_apprentissage_pre_syllabe.length === 14) {
                                                                masquer($('#continu_sur_apprentissage_bouton'));
                                                                masquer($('#reprendre_revision_bouton'));
                                                                display($('#continu_sur_evaluation_bouton'));

                                                                indexerP($('#continu_sur_evaluation_bouton p'));
                                                            }
                                                        }
                                                        function continuSurApprentissagePreSyllabe() {
                                                            $('#continu_sur_apprentissage_bouton').click(() => { raffraichirLaPage(); });
                                                        }
                                                    }, 1800);
                                                }
                                            }

                                            function rechargerRevisionDialogueBtns() { $('#revision_dialogue_btns').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫'); }
                                            function masquerRevisionDialogueBtns() {
                                                setTimeout(() => { masquer($('#revision_dialogue_btns')); }, 1800);
                                            }
                                        }
                                    }
                                }
                                if (i == revision_pre_syllabe_questions.length) { i = 0; }
                            });
                        }
                        function afficherRevisionRepetitionBtn() {
                            masquer($('#revision_correction_btn'));
                            masquer($('#revision_repetition_btn'));
                            
                            setTimeout(() => { 
                                display($('#revision_repetition_btn')); 
                                rendreActif($('#revision_repetition_btn'));
                            }, 100);
                        }
                    }
                });
            }
            function evaluationPreSyllabe() {
                $('#evaluation_bouton, #reprendre_evaluation_bouton, #continu_sur_evaluation_bouton').click(function () {

                    lesson_d_evaluation_pre_syllabe = lessonDEvaluationPreSyllabe();

                    var evaluation_pre_syllabe_questions = [];

                    var question_d_evaluation_pre_syllabe = '', reponse_d_evaluation_pre_syllabe = [];
                    var note_d_evaluation_pre_syllabe = 0;
                    var evaluation_counter = 0;
                    let good_response_counter = 0;

                    lesson_active = 'pre_revision';

                    chargerEvaluationPreSyllabe();
                    afficherEvaluation();
                    evaluerPreSyllabe();


                    function chargerEvaluationPreSyllabe() {

                        chargerEvaluationPreSyllabeHead();
                        chargerEvaluationPreSyllabeBody();
                        chargerEvaluationPreSyllabeFoot();

                        function chargerEvaluationPreSyllabeHead() {
                            $('.notification_titre').text('ߜߋ߲߭ ߞߘߐߓߐߟߌ');
                            viderNotification();
                            setTimeout(() => { ecris("evaluation_notification_corps", "ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߊߟߎ߬ ߛߓߍ߫߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫."); }, 800);
                        }
                        function chargerEvaluationPreSyllabeBody() {
                            var evaluation_tbody_default_message = 'ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߐߝߟߌ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬.';
                            $('#evaluation_fiche_body').html("<p id='evaluation_tbody_default_content'>" + evaluation_tbody_default_message + "</p>");
                        }
                        function chargerEvaluationPreSyllabeFoot() {

                            var q_evaluation_total = parseIntNko(lesson_d_apprentissage_pre_syllabe.length);

                            $('#evaluation_question_bouton').html('<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ '+q_evaluation_total+'\\'+parseIntNko(1)+'߭ ߟߊߡߍ߲߫</p>');
                            $('#evaluation_repetition_bouton').html('<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ '+q_evaluation_total+'\\'+parseIntNko(1)+'߭ ߟߊߡߍ߲߫</p>');
                            $('#evaluation_correction_bouton').html('<p>ߏ߬ ߛߊߞߍ߫</p>');
                        }
                    }
                    function evaluerPreSyllabe() {

                        let i = 0;
                        let rang = '߭';
                        let action = "ߟߊߡߍ߲߫";
                        let question_status = 'repondue';

                        evaluation_pre_syllabe_questions = questionsDEvaluation();

                        initialiserEvaluationPreSyllabeAStocker();
                        initialiserProgressBar();
                        poserQuestionDEvaluationPreSyllabe();
                        repeterQuestionDEvaluationPreSyllabe();
                        repondreQuestionDEvaluationPreSyllabe();
                        rectificationDeReponseDEvaluationPreSyllabe();
                        correctionDEvaluationPreSyllabe();


                        function poserQuestionDEvaluationPreSyllabe() {
                            $('#evaluation_question_bouton').on('click', function (e) {
                                e.stopImmediatePropagation();

                                effacerPrecedenteReponse();
                                question_d_evaluation_pre_syllabe = evaluation_pre_syllabe_questions[evaluation_counter];
                                console.log(question_d_evaluation_pre_syllabe);


                                masquerEvaluationQuestionBtn();
                                lireEvaluationPreSyllabeQuestion();
                                enregistrerEvaluationPreSyllabeQuestion();
                                rechargerEvaluationQuestionBtn();
                                rechargerEvaluationRepetitionBtn();
                                afficherEvaluationRepetitionBtn();
                               
                                masquer($('#evaluation_cross'));
                                $('#evaluation_cross').css('transform', 'scale(0.4)');
                                $('#evaluation_reponse_container').css({ 'top': 0 });
                                afficherTesteContainer();


                                function masquerEvaluationQuestionBtn() { masquer($('#evaluation_question_bouton')); }
                                function lireEvaluationPreSyllabeQuestion() { lire('ߊ', question_d_evaluation_pre_syllabe); }
                                function enregistrerEvaluationPreSyllabeQuestion() {}
                                function rechargerEvaluationQuestionBtn() {

                                    i++;
                                    rang = '߲';
                                    action = "ߠߊߡߍ߲߫";
                                    question_status = 'posee';

                                    ordre_de_question = (evaluation_pre_syllabe_questions.length == i + 1) ? 'ߟߊߓߊ߲' : parseIntNko(i + 1)+rang;
                                    
                                    $('#evaluation_question_bouton').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(evaluation_pre_syllabe_questions.length)+' \\ ' + ordre_de_question + ' '+action);
                                    if (i == evaluation_pre_syllabe_questions.length) { masquer($('#evaluation_question_bouton')); }
                                }
                                function rechargerEvaluationRepetitionBtn() {
                                    if(i > 1) {
                                        ordre_de_question = (evaluation_pre_syllabe_questions.length == i) ? 'ߟߊߓߊ߲' : parseIntNko(i)+rang;
                                        $('#evaluation_repetition_bouton').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' +ordre_de_question+' ߠߊߡߍ߲߫ ߕߎ߲߯');
                                    }
                                }
                                function effacerPrecedenteReponse() {
                                    reponse_d_evaluation_pre_syllabe.splice(0, reponse_d_evaluation_pre_syllabe.length);
                                    $('#evaluation_reponse').html(reponse_d_evaluation_pre_syllabe);
                                }
                                function afficherTesteContainer() { $('#teste_container').css({ 'top': '-6rem' }); }
                            });
                        }
                        function repeterQuestionDEvaluationPreSyllabe() {
                            $('.repetition_btn').on('click', function () {
                                lire('syllabe', question_d_evaluation_pre_syllabe);
                                afficherEvaluationRepetitionBtn();
                            });
                        }
                        function repondreQuestionDEvaluationPreSyllabe() {
                            $('#clavier_nko td').on('click', function (e) {
                                e.stopImmediatePropagation();

                             /* Au cas où on tente de repondre sans qu'une question soit posée, evaluation_dialogue_btn clignote pour rappel */
                                if (question_d_evaluation_pre_syllabe == '') rappel($('#evaluation_dialogue_btn'));
                                if (question_d_evaluation_pre_syllabe != '') {

                                    var caractere = $(this).text();

                                    chargerEvaluationPreSyllabeReponse();
                                    afficherCorrectionButton();

                                    function chargerEvaluationPreSyllabeReponse() {
                                        reponse_d_evaluation_pre_syllabe.push(caractere);
                                        $('#evaluation_reponse').html(reponse_d_evaluation_pre_syllabe);
                                    }
                                    function afficherCorrectionButton() {
                                        masquer($('#evaluation_question_bouton'));
                                        masquer($('#evaluation_repetition_bouton'));
                                        
                                        setTimeout(() => { 
                                            display($('#evaluation_correction_bouton')); 
                                            rendreActif($('#evaluation_correction_bouton'));
                                            indexerP($('#evaluation_correction_bouton p'));
                                        }, 100);
                                    }
                                }
                            });
                        }
                        function afficherEvaluationRepetitionBtn() { 
                            masquer($('#evaluation_question_bouton'));
                            masquer($('#evaluation_repetition_bouton')); 
                            masquer($('#evaluation_correction_bouton'));

                            setTimeout(() => { 
                                display($('#evaluation_repetition_bouton')); 
                                rendreActif($('#evaluation_repetition_bouton'));
                            }, 100);
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

                                if (evaluation_counter <= evaluation_pre_syllabe_questions.length) {

                                    let q = question_d_evaluation_pre_syllabe;
                                    let r = reponse_d_evaluation_pre_syllabe.join('');
                                    let p = (q == r) ? 1 : 0;
                                    let question_reponse = [q, r, p];

                                    note_d_evaluation_pre_syllabe += p;

                                    marquerReponseDEvaluationPreSyllabe();
                                    effacerCheckMark();
                                    masquerTesteContainer();
                                    enregistrerEvaluationPreSyllabe();
                                    chargerFicheDEvaluation();
                                    progressBarDEvaluationPreSyllabe();
                                    afficherQuestionButton();
                                    finDEvaluationPreSyllabe();


                                    function chargerFicheDEvaluation() {
                                        setTimeout(() => {
                                            chargerInstantannementEvaluationTbody();
                                            defilementDuContenuVersLeHaut($('#evaluation_fiche_body'));

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
                                        }, 1400);
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
                                            actualiserEvaluationProgressBar();

                                            function actualiserEvaluationProgressBar() {
        
                                                if (question_d_evaluation_pre_syllabe == '') return;
                                                if (question_d_evaluation_pre_syllabe != '') {
        
                                                    let bar_width = evaluation_counter * progress_unity+1;
        
                                                    $('.progress_mauvaise_reponse_bar').css('width', bar_width + '%');

                                                    if (question_d_evaluation_pre_syllabe == reponse_d_evaluation_pre_syllabe.join('')) {
                                                        good_response_counter++;
                                                        let good_response_width = good_response_counter * progress_unity;
                                                        $('.progress_bonne_reponse_bar').css('width', good_response_width + '%');
                                                    }
        
                                                    question_d_evaluation_pre_syllabe = ''; //Vider la variable question_d_evaluation_pre_syllabe après son utilisation.
                                                }
                                            }
                                        }
                                    }
                                    function afficherQuestionButton() {
                                        if (evaluation_counter < evaluation_pre_syllabe_questions.length) {
                                            masquer($('#evaluation_repetition_bouton'));
                                            masquer($('#evaluation_correction_bouton'));
    
                                            setTimeout(() => { 
                                                display($('#evaluation_question_bouton')); 
                                                rendreActif($('#evaluation_question_bouton'));
                                            }, 100);
                                        }
                                    }
                                    function finDEvaluationPreSyllabe() {
                                        if (evaluation_counter === evaluation_pre_syllabe_questions.length) {

                                            let note_d_evaluation_pre_syllabe_syllabe = calculerNote(lesson_d_evaluation_pre_syllabe_du_jour);

                                            masquer($('#evaluation_dialogue_btns'));
                                            display($('#evaluation_redirection_btns'));

                                            if (note_d_evaluation_pre_syllabe_syllabe < 100) {
                                                setTimeout(() => { 
                                                    display($('#reprendre_evaluation_bouton'));
                                                    masquer($('#continu_sur_apprentissage_bouton'));
                                                    masquer($('#continu_sur_la_lesson_suivante'));

                                                    indexerP($('#reprendre_evaluation_bouton p'));
                                                }, 400);
                                            }
                                            if (note_d_evaluation_pre_syllabe_syllabe === 100) {

                                                stockerPreSyllabe();
                                                chargerLaLessonSuivanteBtn();
                                                afficherLaLessonSuivanteBtn();
                                                resultatDePreSyllabe();


                                                function stockerPreSyllabe() {

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

                                                                    sessionStorage.setItem('matiere_nouvellement_apprise', JSON.stringify(matiere_nom));
                                                                    
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
                                                function chargerLaLessonSuivanteBtn() {
                                                    $('#continu_sur_la_lesson_suivante a').text('ߞߊ߲ߡߊߛߙߋ ߘߊߡߌ߬ߘߊ߬');
                                                }
                                                function afficherLaLessonSuivanteBtn() {
                                                    setTimeout(() => {
                                                        masquer($('#reprendre_evaluation_bouton'));
                                                        masquer($('#continu_sur_apprentissage_bouton'));
                                                        afficher($('#continu_sur_la_lesson_suivante'));
    
                                                        rendreActif($('#continu_sur_la_lesson_suivante'));
                                                        indexerP($('#continu_sur_la_lesson_suivante p'));
                                                    }, 400);
                                                }
                                                function resultatDePreSyllabe() {

                                                    let apprentissage_pre_syllabe_data = {};
                                                    let exercice_pre_syllabe_data= {};
                                                    let revision_pre_syllabe_data= {};
                                                    let evaluation_pre_syllabe_data = {};
                                                
                                                    if (lesson_d_apprentissage_pre_syllabe.length === 14) {
                                                        if (lesson_d_exercice_pre_syllabe.length === 14) {
                                                            if (lesson_de_revision_pre_syllabe.length === 14) {
                                                                if (lesson_d_evaluation_pre_syllabe.length === 14) {

                                                                    var date = dateAcuelle();
                                                                    var niveau = niveau_en_cours;

                                                                    let note_d_apprentissage_pre_syllabe = calculerNote(lesson_d_apprentissage_pre_syllabe);
                                                                    var note_d_exercice_pre_syllabe = calculerNote(lesson_d_exercice_pre_syllabe);
                                                                    var note_de_revision_pre_syllabe = calculerNote(lesson_de_revision_pre_syllabe);
                                                                    var note_d_evaluation_pre_syllabe = calculerNote(lesson_d_evaluation_pre_syllabe);
                                                        
                                                                    apprentissage_pre_syllabe_data = {"date":date, "niveau":niveau, "phase":"syllabe_apprentissage", "lesson":lesson_d_apprentissage_pre_syllabe, "note":note_d_apprentissage_pre_syllabe};
                                                                    exercice_pre_syllabe_data = {"date":date, "niveau":niveau, "phase":"syllabe_exercice", "lesson":lesson_d_exercice_pre_syllabe, "note":note_d_exercice_pre_syllabe};
                                                                    revision_pre_syllabe_data = {"date":date, "niveau":niveau, "phase":"syllabe_revision", "lesson":lesson_d_evaluation_pre_syllabe, "note":note_de_revision_pre_syllabe};
                                                                    evaluation_pre_syllabe_data = {"date":date, "niveau":niveau, "phase":"syllabe_evaluation", "lesson":lesson_d_evaluation_pre_syllabe, "note":note_d_evaluation_pre_syllabe};
                                                                }
                                                            }
                                                        }
                                                    }

                                                    resultatGeneral(apprentissage_pre_syllabe_data, exercice_pre_syllabe_data, revision_pre_syllabe_data, evaluation_pre_syllabe_data);
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                        function questionsDEvaluation() {
                            let qe = [];
                            for (let j = 0; j < lesson_d_apprentissage_pre_syllabe.length; j++) {
                                qe.push(lesson_d_apprentissage_pre_syllabe[j][0]);
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
                                displayv($('#apprentissage_progress_bar'));
                                displayv($('#apprentissage_body'));
                                setTimeout(() => { affichageAnimeDeTableTd($('#apprentissage_body table')); }, 100);
                            }, 600);
                            setTimeout(() => {
                                displayv($('#apprentissage_foot'));
                                zoomDown($('.dialogue_btns'));

                                $('.media').css({ 'display': 'none', 'opacity': 0 });
                                $('.parametre').css({ 'display': 'none', 'opacity': 0 });
                                $('.lesson_suivante').css({ 'display': 'block', 'opacity': 1 });
                            }, 1500);
                        }, 100);
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
                                            // initialiserProgressBar
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
                    $('#reprendre_exercice_bouton').html('<p>'+liste_de_matieres[0][1] + ' ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯</p>');
                    indexerP($('#reprendre_exercice_bouton p'));
                }
                if (note >= 95) {
                    masquer($('#reprendre_exercice_bouton'));
                    afficher($('#continu_sur_revision_bouton'));
                    $('#continu_sur_revision_bouton').html('<p>'+liste_de_matieres[0][1] + ' ߞߘߐߓߐߟߌ ߞߍ߫</p>')
                    indexerP($('#continu_sur_revision_bouton p'));
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

                    $('#reprendre_revision_bouton').html('<p>'+liste_de_matieres[0][1] + ' ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯</p>');
                    indexerP($('#reprendre_revision_bouton p'));
                }

                if (note >= 95) {
                    if (data.length < 27) {
                        afficher($('#continu_sur_apprentissage_bouton'));
                        masquer($('#reprendre_revision_bouton'));
                        masquer($('#evaluation_bouton'));
                        masquer($('#syllabe_bouton'));

                        $('#continu_sur_apprentissage_bouton').html('<p>ߥߊ߫ ' + liste_de_matieres[0][1] + ' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬</p>');
                        indexerP($('#continu_sur_apprentissage_bouton p'));

                        $('#continu_sur_revision_bouton').click(() => { raffraichirLaPage(); });
                    }
                    if (data.length === 27) {
                        masquer($('#continu_sur_apprentissage_bouton'));
                        masquer($('#reprendre_revision_bouton'));
                        masquer($('#evaluation_bouton'));
                        afficher($('#syllabe_bouton'));

                        indexerP($('#syllabe_bouton p'));
                    }
                }
            }
            function afficherSyllabeExerciceBouton() {

                masquer($('#parametre_lesson_container'));
                masquer($('#panneaux'));
                masquer($('#apprentissage_dialogue_btns'));
                setTimeout(() => {
                    afficher($('#apprentissage_redirection_btns'));

                    masquer($('#pre_apprentissage_bouton'));
                    afficher($('#continu_sur_exercice_bouton'));
                    $('#continu_sur_exercice_bouton').html("<p>"+matiere_nom + " ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
                    indexerP($('#continu_sur_exercice_bouton p'));
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
            $('#apprentissage_progress_bar').css('display', 'block');
            $('#apprentissage_redirection_btns').css('display', 'none');

            afficher($('.dialogue_btns > div:not(.progress_bar_integre)'));
            $('#afficheur_de_panneau').css({ 'opacity': 1, 'transform': 'scale(1)' });
            rendreActif($('#afficheur_de_panneau'));
            indexerP($('#afficheur_de_panneau p'));
        }
        function afficherPreExerciceBtn() {
            $('#apprentissage_dialogue_btns').css('display', 'none');
            $('#apprentissage_redirection_btns').css('display', 'block');

            $('#pre_apprentissage_bouton').css('display', 'none');
            $('#continu_sur_exercice_bouton').css('display', 'block');
            $('#evaluation_bouton').css('display', 'none');
            indexerP($('#continu_sur_exercice_bouton p'));
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