function syllabe() {
    
    var niveaux_etudies = JSON.parse(sessionStorage.getItem('niveaux_etudies')); 
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));

    if (niveau_actif === 2) {

        controlSurLesPhasesEtudiees();
        syllabeNko();
        
        function controlSurLesPhasesEtudiees() {

            let datas = JSON.parse(sessionStorage.getItem('datas'));
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
        }
        function syllabeNko() {
            
            let datas = JSON.parse(sessionStorage.getItem('datas'));

         /* Recupreation des id de syllabe_apprentissage et syllabe_exercice précédents pour leurs modifications ulterieures */
            let id_syllabe_lesson_1 = null;
            let id_syllabe_lesson_2 = null;

            if(datas[1].length != 0) {
                for(let i=0; i<2; i++) {
                    if(datas[1][i].phase == "syllabe_apprentissage") { id_syllabe_lesson_1 = datas[1][i].id; }
                    if(datas[1][i].phase == "syllabe_exercice") { id_syllabe_lesson_2 = datas[1][i].id; }
                }
            }

            let lesson_active = '';
            let element_actif = '';

            let quantite_normale_de_click = 1;

            let consonnes_choisies_du_serveur = consonnesChoisiesDuServeur();
            let memoire_consonnes_choisies = JSON.parse(localStorage.getItem("memoire_consonnes_choisies"));
            memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? consonnes_choisies_du_serveur : memoire_consonnes_choisies;
            let consonnes_choisies = [];

            let lesson_d_apprentissage_syllabe = lessonDApprentissageSyllabe();
            let lesson_d_exercice_syllabe = lessonDExerciceSyllabe();
            let lesson_de_revision_syllabe = lessonDeRevisionSyllabe();
            let lesson_d_evaluation_syllabe = lessonDEvaluationSyllabe();

            let lesson_d_apprentissage_syllabe_du_jour = [];
            let lesson_de_syllabe_exercice_du_jour = [];
            let lesson_de_syllabe_revision_du_jour = [];
            let lesson_de_syllabe_evaluation_du_jour = [];
        
            apprentissageSyllabe();
            exerciceSyllabe();
            revisionSyllabe();
            evaluationSyllabe();
            
            $('#fermer_resultat').click(function () { $('#envelope').css('display', 'none'); });


            function apprentissageSyllabe() {

                parametrageDeLesson();
                chargerApprentissageSyllabe();
                afficherApprentissage();
                apprendreSyllabe();

                function chargerApprentissageSyllabe() {

                    chargerEnteteDApprentissageSyllabe();
                    chargerFootDApprentissageSyllabe();
                    chargerCorpsDApprentissageSyllabe();

                    function chargerEnteteDApprentissageSyllabe() {
                        $('.notification_titre').html('ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                        viderNotification();
                        setTimeout(() => { ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬."); }, 1000);
                    }
                    function chargerFootDApprentissageSyllabe() {

                        chargerPanneauDesCaracteres();
                        chargerApprentissageDialoguesBtns();
                        chargerApprentissageRedirectionBtns();

                        function chargerApprentissageDialoguesBtns() {
                            $('#apprentissage_dialogue_btns').html("<div class='titre_de_parti' id='afficheur_de_panneau'><p>ߛߌ߬ߙߕߊ߬ ߥߟߊ ߦߌ߬ߘߊ߬</p></div>");
                        }
                        function chargerApprentissageRedirectionBtns() {
                            $('#continu_sur_exercice_bouton').html("<p>ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
                        }
                    }
                    function chargerCorpsDApprentissageSyllabe() {
                        preChargementDuTableauNoir();
                        chargerLessonDApprentissage();

                        function preChargementDuTableauNoir() {
                            $('#apprentissage_body').html("<table id='table_syllabe_apprentissage'><div id='texte'>ߜߋ߲߭ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬</div></table>");
                        }
                    }
                }
                function apprendreSyllabe() {

                    rappelDesBoutons();
                    initialiserProgressBar();
                    apprenezSyllabe();

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
                    function apprenezSyllabe() {
                        $('#panneaux span').click(function () {

                            let td = "";
                            let consonnes_choisie = $(this).text();
                            let compteur_de_syllabe = 0;
                            let global_clicks_counter = 0;

                            memoriserLesConsonnesChoisies();
                            suivreLApprentissage();
                        

                            function initialiserApprentissageSyllabe() {
                                let td_to_click = $('#table_syllabe_apprentissage td');
                                lesson_d_apprentissage_syllabe_du_jour.splice(0, consonnes.length);
                                lesson_d_apprentissage_syllabe_du_jour = initialiserData(td_to_click);
                            }
                            function memoriserLesConsonnesChoisies() {
                                consonnes_choisies.push(consonnes_choisie);
                                $("#afficheur_de_panneau p").click(() => { 
                                    localStorage.setItem("consonnes_choisies", JSON.stringify(consonnes_choisies)); 
                                });
                            }
                            function suivreLApprentissage() {
                                setTimeout(() => {
                                    initialiserApprentissageSyllabe();
                                    td = $('#table_syllabe_apprentissage td');
                                    progressBarDApprentissage(td,quantite_normale_de_click);

                                    $.each(td, function () {
                                        let compteur_td_click = 0;
                                        $(this).click(function () {
                                            
                                            let td_actif = $(this);
                                            let tr_index = td_actif.parent().index();
                                            let td_index = td_actif.index() + tr_index * 7;
                                            let syllabe_clique = td_actif.text();

                                            global_clicks_counter++;
                                            compteur_td_click++;

                                            rappelDesBoutonsTdEtRedirectionBtns();
                                            lire('ߊ', syllabe_clique);
                                            enregistrerApprentissageSyllabe();
                                            finDApprentissageSyllabe();


                                            function rappelDesBoutonsTdEtRedirectionBtns() {
                                                $('#apprentissage_body').click(function (e) {
                                                    if(compteur_de_syllabe < td.length) {
                                                        if(e.target.tagName == "DIV") {
                                                            secouer($('#table_syllabe_apprentissage td'));
                                                            return;
                                                        }
                                                    }
                                                    if(compteur_de_syllabe === td.length) {
                                                        if(e.target.tagName == "DIV") {
                                                            secouer($("#apprentissage_redirection_btns"));
                                                            return;
                                                        }
                                                    }
                                                });
                                            }
                                            function enregistrerApprentissageSyllabe() {

                                                let mark = (compteur_td_click >= quantite_normale_de_click) ? 1 : 0;

                                                lesson_d_apprentissage_syllabe_du_jour.splice(td_index, 1, [syllabe_clique, compteur_td_click, mark]);
                                                if (compteur_td_click === quantite_normale_de_click) { compteur_de_syllabe++; }
                                            }
                                            function finDApprentissageSyllabe() {
                                                if (compteur_de_syllabe === td.length) {

                                                    let note_d_apprentissage_syllabe = calculerNote(lesson_d_apprentissage_syllabe_du_jour);
            
                                                    if (note_d_apprentissage_syllabe === 100) {
                                                        setTimeout(() => {
                                                        
                                                            notificationDeFinDApprentissageSyllabe();
                                                            affichageDeExerciceBtn();
                                                            exerciceSyllabe();
                                                            
                                                            function notificationDeFinDApprentissageSyllabe() {
                                                                viderNotification();
                                                                setTimeout(() => {
                                                                    ecris('apprentissage_notification_corps', "ߌ ߞߎߟߎ߲ߖߋ߫ ߘߐ߬ߖߊ ߟߊ߫ ߞߊ߬ ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߞߍ߫߸ ߛߌߛߊ߲߬ ߡߊ߬ߞߟߏ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߜߋ߲߭ ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߟߎ߬ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫");
                                                                }, 400); 
                                                            }
                                                            function affichageDeExerciceBtn() {
                                                                masquer($('#apprentissage_dialogue_btns'));
                                                                afficherRapidement($('#apprentissage_redirection_btns'));

                                                                masquer($('#apprentissage_bouton'));
                                                                afficherRapidement($('#continu_sur_exercice_bouton'));
                                                                masquer($('#evaluation_bouton'));
                                                                rendreActif($('#continu_sur_exercice_bouton'));
                                                                
                                                                indexer($('#continu_sur_exercice_bouton p'));
                                                            }
                                                        }, 600);
                                                    }
                                                }
                                            }
                                        });
                                    });  
                                }, 800);
                            }
                        });
                    }
                }
            }
            function exerciceSyllabe() {
                $('#exercice_bouton, #reprendre_exercice_bouton, #continu_sur_exercice_bouton').click(function (e) {
                    e.stopImmediatePropagation();

                    lesson_d_exercice_syllabe = lessonDExerciceSyllabe();
                    lesson_active = 'exercice';
                    sessionStorage.setItem("lesson_active", JSON.stringify(lesson_active));
                    syllabes_actives = syllabesActives();

                    let exercice_syllabe_questions = malaxer(malaxer(syllabes_actives));
                    let ordre_de_question = '';
                    let total_exercice_syllabe_questions = 0;
                    let exercice_syllabe_questions_posees = [];
                    let exercice_syllabe_question = '', exercice_syllabe_reponse = '';
                    let point = 0;
                    let i = 0;
                    let rang = '߭';
                    let action = "ߟߊߡߍ߲߫";

                    total_exercice_syllabe_questions = exercice_syllabe_questions.length;

                    $('.fermeture_pre').attr('id', 'fermeture_exercice');

                    chargerExerciceSyllabe();
                    afficherExercice();
                    exercice();


                    function chargerExerciceSyllabe() {

                        chargerEnteteDExerciceSyllabe();
                        chargerCorpsDExerciceSyllabe();
                        chargerPiedDExerciceSyllabe();

                        function chargerEnteteDExerciceSyllabe() {
                            $('.notification_titre').html('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ');
                            viderNotification();
                            setTimeout(() => {
                                ecris('exercice_notification_corps', "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߟߎ߫ ߟߋ߬ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߵߊ߬ߟߎ߫ ߦߌ߬ߘߊ߬߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫.");
                            }, 800);
                        }
                        function chargerCorpsDExerciceSyllabe() {
                            let exercice_body_html = lessonHTML(malaxer(syllabes_actives), '');
                            $('#exercice_body').html(exercice_body_html);
                        }
                        function chargerPiedDExerciceSyllabe() {
                            total_exercice_syllabe_questions = exercice_syllabe_questions.length;

                            chargerExerciceSyllabeDialogueBtns();
                            chargerExerciceSyllabeRedirectionBtns();

                            function chargerExerciceSyllabeDialogueBtns() {
                                $('#exercice_question_btn').html('<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(total_exercice_syllabe_questions) + ' \\ ߁߭ ߟߊߡߍ߲߫</p>');
                                $('#exercice_repetition_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(1)+'߭ ߟߊߡߍ߲߫ ߕߎ߲߯');
                                $('#exercice_correction_btn').html('ߏ߬ ߛߊߞߍ߫');
                            }
                            function chargerExerciceSyllabeRedirectionBtns() {
                                $('#reprendre_exercice_bouton').html('<p>ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯</p>');
                                $('#continu_sur_revision_bouton').html('<p>ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫</p>');
                            }
                        }
                    }
                    function exercice() {

                        let question_status = 'repondue';

                        initialiserExerciceSyllabe();
                        initialiserProgressBar();
                        ecouterLaQuestionDExerciceSyllabe();
                        repeterLaQuestionDExerciceSyllabe();
                        repondreLaQuestionDExerciceSyllabe();
                        corrigerLaQuestionDExerciceSyllabe();


                        function initialiserExerciceSyllabe() {
                            lesson_de_syllabe_exercice_du_jour = initialiserData(exercice_syllabe_questions);
                        }
                        function ecouterLaQuestionDExerciceSyllabe() {

                            rendreActif($('#exercice_question_btn'));
                            indexer($('#exercice_question_btn p'));
                    
                            $('#exercice_question_btn').click(function (e) {
                                e.stopImmediatePropagation();
                                let exercice_question_btn = $(this);
                                exercice_syllabe_question = exercice_syllabe_questions[i];

                                montrerReponse(exercice_syllabe_question,$('#exercice_body td'));

                                masquerExerciceQuestionBtn();
                                lireExerciceSyllabeQuestion();
                                enregistrerExerciceSyllabeQuestion();
                                rechargerExerciceQuestionBtn();
                                rechargerExerciceRepetitionBtn();
                                afficherExerciceRepetitionBtn();
                

                                function masquerExerciceQuestionBtn() { masquer(exercice_question_btn); }
                                function lireExerciceSyllabeQuestion() {
                                    if (i < exercice_syllabe_questions.length) {
                                        lire('ߊ', exercice_syllabe_question);
                                    }
                                }
                                function enregistrerExerciceSyllabeQuestion() { 
                                    if (i < exercice_syllabe_questions.length) {
                                        exercice_syllabe_questions_posees.push(exercice_syllabe_question); 
                                    }
                                }
                                function rechargerExerciceQuestionBtn() {
                                          
                                    rang = '߲';
                                    action = "ߠߊߡߍ߲߫";
                                    question_status = 'posee';
                                    i++;
                                    ordre_de_question = (total_exercice_syllabe_questions == i + 1) ? 'ߟߊߓߊ߲' : parseIntNko(i + 1)+rang;
                                    
                                    $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(total_exercice_syllabe_questions) + ' \\ ' + ordre_de_question + ' '+action);
                                    if (i == exercice_syllabe_questions.length) { masquer($('#exercice_question_btn')); }
                                }
                                function rechargerExerciceRepetitionBtn() {
                                    if(i > 1) {
                                        ordre_de_question = (exercice_syllabe_questions.length == i) ? 'ߟߊߓߊ߲' : parseIntNko(i)+rang;
                                        $('#exercice_repetition_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' +ordre_de_question+' ߠߊߡߍ߲߫ ߕߎ߲߯');
                                    }
                                }
                            });
                        }
                        function repeterLaQuestionDExerciceSyllabe() {
                            $('#exercice_repetition_btn').click(function (e) {
                                e.stopImmediatePropagation();

                                montrerReponse(exercice_syllabe_question,$('#exercice_body td'));
                                relireExerciceQuestion();
                                afficherExerciceRepetitionBtn();

                                function relireExerciceQuestion() {
                                    if (i < exercice_syllabe_questions.length) lire('ߊ', exercice_syllabe_question);
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
                        function repondreLaQuestionDExerciceSyllabe() {
                            $.each($('#exercice_body td'), function () {
                                $(this).click(function () {
                                    element_actif = $(this);

                                 /* Au cas où on tente de repondre sans qu'une question soit posée, exercice_btn clignote pour rappel */
                                    if(question_status == 'repondue') {
                                        secouer($('#exercice_question_btn'));
                                        return;
                                    }
                        
                                    if(exercice_syllabe_question != '') {

                                        demarquer($(element_actif));
                                        enregistrerExerciceSyllabeReponse();
                                        // marquageDeLaConsonneChoisie();
                                        afficherExerciceCorrectionBtn();

                                        function enregistrerExerciceSyllabeReponse() {
                                            exercice_syllabe_reponse = element_actif.html();
                                        }
                                        function marquageDeLaConsonneChoisie() {
                                            $('#exercice_body table td').css({ 'background-color': 'rgba(85,85,85,0.25)', 'color': 'white' });
                                            // marquerLaConsonneChoisie(element_actif);
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
                        function corrigerLaQuestionDExerciceSyllabe() {

                            let question_counter = 0;
                            let bonne_reponse_counter = 0;

                            let nbr_bonne_reponse = 0;
                            let nbr_mauvaise_reponse = 0;
                            let point_total = 0;

                            $('#exercice_correction_btn').click(function () {
                                if(exercice_syllabe_questions_posees.length <= total_exercice_syllabe_questions) {
                                                        
                                    question_status = 'repondue';

                                    marquerReponse(element_actif, exercice_syllabe_question);
                                    enregistrerExerciceSyllabe();
                                    progressBarExerciceSyllabe();
                                    afficherExerciceQuestionBtn();
                                    finDeExerciceSyllabe();


                                    function enregistrerExerciceSyllabe() {

                                        let question_reponse = [];

                                     /*S'il n'y a pas de question, ne rien faire.*/
                                        if (exercice_syllabe_question == '') return false;

                                        point = (exercice_syllabe_question == exercice_syllabe_reponse) ? 1 : 0;
                                        question_reponse = [exercice_syllabe_question, exercice_syllabe_reponse, point];
                                        lesson_de_syllabe_exercice_du_jour.splice(question_counter, 1, question_reponse);

                                        if (exercice_syllabe_question == exercice_syllabe_reponse) { nbr_bonne_reponse++; point_total++; }
                                        if (exercice_syllabe_question != exercice_syllabe_reponse) { nbr_mauvaise_reponse++; }

                                        exercice_syllabe_question = '';
                                        exercice_syllabe_reponse = '';
                                    }
                                    function progressBarExerciceSyllabe() {

                                        let exercice_width = total_exercice_syllabe_questions;
                                        let diagramm_unity = 100 / exercice_width;

                                        setTimeout(() => { display($('.progress_bar')); }, 400);

                                        question_counter++;

                                        if (point === 1) {
                                            bonne_reponse_counter++;

                                            $('.progress_bonne_reponse_bar').css('width', bonne_reponse_counter * diagramm_unity + '%');
                                            $('.progress_mauvaise_reponse_bar').css('width', question_counter * diagramm_unity + '%');
                                        }
                                        if (point === 0) {
                                            $('.progress_mauvaise_reponse_bar').css('width', question_counter * diagramm_unity + '%');
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
                                    function finDeExerciceSyllabe() {
                                        if (exercice_syllabe_questions_posees.length === total_exercice_syllabe_questions) {

                                            $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫');

                                            setTimeout(() => {

                                                let note_d_exercice_syllabe = calculerNote(lesson_de_syllabe_exercice_du_jour);

                                                // setTimeout(() => { preExerciceResultat(); }, 300);

                                                if (note_d_exercice_syllabe < 100) {

                                                    notificationDeRepriseDExercice();
                                                    affichageDeRepriseDExerciceBtn();
                                                    viderLeTableau(lesson_de_syllabe_exercice_du_jour);

                                                    function notificationDeRepriseDExercice() {
                                                        viderNotification();
                                                        setTimeout(() => {
                                                            let notification = liste_de_matieres[0][1] + " ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                            ecris('exercice_notification_corps', notification);
                                                        }, 800); 
                                                    }
                                                    function affichageDeRepriseDExerciceBtn() {
                                                        setTimeout(() => { masquer($('#exercice_dialogue_btns')); }, 1800);
                                                        setTimeout(() => {
                                                            afficher($('#exercice_redirection_btns'));

                                                            afficher($('#reprendre_exercice_bouton'));
                                                            masquer($('#continu_sur_revision_bouton'));
                                                            rendreActif($('#reprendre_exercice_bouton'));
                                                            indexer($('#reprendre_exercice_bouton p'));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exerciceSyllabe().
                                                        }, 2000);
                                                    }
                                                }
                                                if (note_d_exercice_syllabe == 100) {

                                                    notificationDeReussiteDExercice();
                                                    affichageDeRevisionBtn();

                                                    function notificationDeReussiteDExercice() {
                                                        viderNotification();
                                                        setTimeout(() => {
                                                            let notification = liste_de_matieres[1][1] + " ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                            ecris('exercice_notification_corps', notification);
                                                        }, 800);
                                                    }
                                                    function affichageDeRevisionBtn() {
                                                        setTimeout(() => { masquer($('#exercice_dialogue_btns')); }, 1700);
                                                        setTimeout(() => {
                                                            display($('#exercice_redirection_btns'));

                                                            masquer($('#reprendre_exercice_bouton'));
                                                            afficher($('#continu_sur_revision_bouton'));
                                                            rendreActif($('#continu_sur_revision_bouton'));
                                                            indexer($('#continu_sur_revision_bouton p'));   //L'évenement click est attaché à ce bouton dès le début de la fonction  exerciceSyllabe().
                                                        }, 2000);
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
                                                resultat(lesson_de_syllabe_exercice_du_jour);
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

                                if (i == exercice_syllabe_questions.length) { 
                                    i = 0; 
                                    viderLeTableau(exercice_syllabe_questions);

                                 /* Suppression d'effet des clicks précédents sur les dialogue_boutons */
                                    $('#exercice_question_btn').unbind('click');
                                    $('#exercice_repetition_btn').unbind('click');
                                    $('#table_alphabet_exercice td').unbind('click');
                                    $('#exercice_correction_btn').unbind('click');
                                }
                            });
                        }
                    }
                    function syllabesActives() {
                        let sa = [];
                        lesson_d_apprentissage_syllabe_du_jour.forEach(element => { sa.push(element[0]); });
                        return sa;
                    }
                });
            }
            function revisionSyllabe() {
                $('#revision_bouton, #reprendre_revision_bouton, #continu_sur_revision_bouton').click(function (e) {
                    e.stopImmediatePropagation();

                    lesson_de_revision_syllabe = lessonDeRevisionSyllabe();

                    let syllabes_nouvellement_apprises = [];
                    let syllabes_anciennement_apprises = [];
                    var syllabes_a_reviser = [];

                    var question_de_revision_syllabe = '', reponse_de_revision_syllabe = [];
                    var revision_counter = 0;
                    let good_response_counter = 0;
                    var q_revision_total = parseIntNko(lesson_d_apprentissage_syllabe.length);

                    lesson_active = 'revision';

                    chargerRevisionSyllabe();
                    afficherRevision();
                    reviserSyllabe();


                    function chargerRevisionSyllabe() {

                        chargerRevisionSyllabeHead();
                        chargerRevisionSyllabeBody();
                        chargerRevisionSyllabeFoot();


                        function chargerRevisionSyllabeHead() {
                            $('.notification_titre').text('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ');
                            viderNotification();
                            setTimeout(() => { ecris("revision_notification_corps", "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߘߏ߫ ߟߎ߫ ߟߋ߬ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ . ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߊߟߎ߬ ߛߓߍ߫߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫."); }, 800);
                        }
                        function chargerRevisionSyllabeBody() {
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
                                        for (let i = 0; i < lesson_d_apprentissage_syllabe_du_jour.length; i++) {
                                            nouvelles_syllabes.push(lesson_d_apprentissage_syllabe_du_jour[i][0]);
                                        }
                                        return nouvelles_syllabes;
                                    }
                                    function syllabesApprises() {
                                        let sa = [];
                                        let lesson_d_apprentissage_syllabe = JSON.parse(localStorage.getItem("lesson_d_apprentissage_syllabe"));
                                        lesson_d_apprentissage_syllabe = (lesson_d_apprentissage_syllabe == null) ? [] : lesson_d_apprentissage_syllabe;
                                        for (let i = 0; i < lesson_d_apprentissage_syllabe.length; i++) { sa.push(lesson_d_apprentissage_syllabe[i][0]); }
                                        return sa;
                                    }
                                }
                            }
                        }
                        function chargerRevisionSyllabeFoot() {

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
                    function reviserSyllabe() {

                        let clicked_response_element = "";
                        let revision_syllabe_questions = malaxer(syllabes_a_reviser);
                        let i = 0;
                        let rang = "߭";
                        let action = "ߟߊߡߍ߲߫";

                        let question_status = "repondue";

                        initialiserRevisionSyllabe();
                        initialiserProgressBar();
                        poserQuestionRevisionSyllabe();
                        repeterQuestionRevisionSyllabe();
                        repondreQuestionRevisionSyllabe();
                        correctionRevisionSyllabe();


                        function initialiserRevisionSyllabe() {
                            lesson_de_syllabe_revision_du_jour = initialiserData(revision_syllabe_questions);
                        }
                        function poserQuestionRevisionSyllabe() {

                            rendreActif($('#revision_question_btn'));
                            indexer($('#revision_question_btn p'));
                    
                            $('#revision_question_btn').on('click', function (e) {
                                e.stopImmediatePropagation();

                                let revision_question_btn = $(this);
                                
                                question_de_revision_syllabe = revision_syllabe_questions[i];
                                question_status = 'posee';
                                montrerReponse(question_de_revision_syllabe,$('#revision_body table td'));

                                masquerRevisionQuestionBtn();
                                lireRevisionSyllabeQuestion();
                                rechargerRevisionQuestionBtn();
                                rechargerRevisionRepetitionBtn();
                                afficherRevisionRepetitionBtn();

                                function masquerRevisionQuestionBtn() { revision_question_btn.css('display','none'); }
                                function lireRevisionSyllabeQuestion() { lire('ߊ', question_de_revision_syllabe); }
                                function rechargerRevisionQuestionBtn() {  

                                    i++;
                                    rang = '߲';
                                    action = "ߠߊߡߍ߲߫";
                                    ordre_de_question = (revision_syllabe_questions.length == i + 1) ? 'ߟߊߓߊ߲' : parseIntNko(i + 1)+rang;
                                    
                                    $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' + parseIntNko(revision_syllabe_questions.length) + ' \\ ' + ordre_de_question + ' '+action);
                                    if (i-1 == revision_syllabe_questions.length) { masquer($('#revision_question_btn')); }
                                }
                                function rechargerRevisionRepetitionBtn() {
                                    if(i > 1) {
                                        ordre_de_question = (revision_syllabe_questions.length == i) ? 'ߟߊߓߊ߲' : parseIntNko(i)+rang;
                                        $('#revision_repetition_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' +ordre_de_question+' ߠߊߡߍ߲߫ ߕߎ߲߯');
                                    }
                                }
                            });
                        }
                        function repeterQuestionRevisionSyllabe() {
                            $('#revision_repetition_btn').on('click', function () {
                                montrerReponse(question_de_revision_syllabe,$('#revision_body table td'));
                                lire('ߊ', question_de_revision_syllabe);
                                afficherRevisionRepetitionBtn();
                            });
                        }
                        function repondreQuestionRevisionSyllabe() {
                            $('#revision_body table td').on('click', function (e) {
                                e.stopImmediatePropagation();

                                clicked_response_element = $(this);
                                if (question_de_revision_syllabe == '') rappel($('#evaluation_dialogue_btn'));
                                if (question_de_revision_syllabe != '') {
                                    reponse_de_revision_syllabe = $(this).text();
                                    $('#revision_body table td').css({ 'background-color': 'rgba(85,85,85,0.25)', 'color': 'white' });
                                    demarquer($(clicked_response_element));
                                    afficherRevisionCorrectionBtn();
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
                        function correctionRevisionSyllabe() {
                            $('#revision_correction_btn').click(function (e) {
                                e.stopImmediatePropagation();

                                question_status = 'repondue';

                                if (i <= revision_syllabe_questions.length) {

                                    marquerReponse(clicked_response_element, question_de_revision_syllabe);
                                    enregistrerRevisionSyllabe();
                                    progressBarRevisionSyllabe();
                                    afficherRevisionQuestionBtn();
                                    finDeRevisionSyllabe();
                                    

                                    function enregistrerRevisionSyllabe() {

                                        let q = question_de_revision_syllabe;
                                        let r = reponse_de_revision_syllabe;
                                        let p = (q == r) ? 1 : 0;
                                        let question_reponse = [q, r, p];

                                        lesson_de_syllabe_revision_du_jour.splice(revision_counter - 1, 1, question_reponse);
                                        revision_counter++;
                                    }
                                    function progressBarRevisionSyllabe() {

                                        let progress_unity = 100 / revision_syllabe_questions.length;

                                        if (question_de_revision_syllabe == '') return;
                                        if (question_de_revision_syllabe != '') {

                                            let bar_width = revision_counter * progress_unity;

                                            $('.progress_mauvaise_reponse_bar').css('width', bar_width + '%');
                                            if (question_de_revision_syllabe == reponse_de_revision_syllabe) {
                                                good_response_counter++;
                                                let good_response_width = good_response_counter * progress_unity;
                                                $('.progress_bonne_reponse_bar').css('width', good_response_width + '%');
                                            }

                                            question_de_revision_syllabe = ''; //Vider la variable question_de_revision_syllabe après son utilisation.
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
                                    function finDeRevisionSyllabe() {
                                        if (i === revision_syllabe_questions.length) {

                                            let note_de_syllabe_revision = calculerNote(lesson_de_syllabe_revision_du_jour);

                                            rechargerRevisionDialogueBtns();
                                            masquerRevisionFootBtns();
            
                                            if (note_de_syllabe_revision < 100) {

                                                notificationDeRepriseDeRevision();
                                                afficherRevisionSyllabeRepriseBtn();
                                                viderLeTableau(lesson_de_syllabe_revision_du_jour);
                                                
                                                function notificationDeRepriseDeRevision() {}
                                                function afficherRevisionSyllabeRepriseBtn() {
                                                    setTimeout(() => {
                                                        display($('#revision_redirection_btns'));
                                                        
                                                        masquer($('#revision_redirection_btns > div'));
                                                        afficher($('#reprendre_revision_bouton'));

                                                        rendreActif($('#reprendre_revision_bouton'));
                                                        indexer($('#reprendre_revision_bouton p'));
                                                    }, 2000);
                                                }
                                            }
                                            if (note_de_syllabe_revision === 100) {

                                                stockerApprentissageSyllabe();
                                                stockerExerciceSyllabe();
                                                stockerRevisionSyllabe();

                                                actualiserConsonnesChoisies();
                                                notificationDuSuccesDeRevision();
                                                afficherRedirectionBtns();
                                                // initialiserExercice();
                                                        

                                                function stockerApprentissageSyllabe() {
                
                                                    let note_d_apprentissage_syllabe = calculerNote(lesson_d_apprentissage_syllabe_du_jour);

                                                    if (note_d_apprentissage_syllabe === 100) {

                                                        actualiserLessonSyllabe(lesson_d_apprentissage_syllabe, lesson_d_apprentissage_syllabe_du_jour);
                                                        localStorage.setItem("lesson_d_apprentissage_syllabe", JSON.stringify(lesson_d_apprentissage_syllabe));
                                                        
                                                        console.log("lesson_d_apprentissage_syllabe actualisée est");
                                                        console.log(lesson_d_apprentissage_syllabe);

                                                        if (lesson_d_apprentissage_syllabe.length === 7) {
                                                            sendLessonDataToDB('syllabe_apprentissage', lesson_d_apprentissage_syllabe);
                                                            console.log("Lesson d'apprentissage syllabe est envoyée à la base de donnée.");
                                                        }
                                                        if (lesson_d_apprentissage_syllabe.length > 7) {
                                                            if (lesson_d_apprentissage_syllabe.length <= 14) {
                                                                updateLessonData(id_syllabe_lesson_1,lesson_d_apprentissage_syllabe);
                                                                console.log("Lesson d'apprentissage syllabe est modifiée à la base de donnée.");
                                                            }
                                                        }
                                                    }
                                                }
                                                function stockerExerciceSyllabe() {

                                                    let note_d_exercice_syllabe = calculerNote(lesson_de_syllabe_exercice_du_jour);

                                                    if (note_d_exercice_syllabe === 100) {

                                                        actualiserLessonSyllabe(lesson_d_exercice_syllabe, lesson_de_syllabe_exercice_du_jour);
                                    console.log("lesson_d_exercice_syllabe actualisée est");
                                    console.log(lesson_d_exercice_syllabe);
                                                        localStorage.setItem("lesson_d_exercice_syllabe", JSON.stringify(lesson_d_exercice_syllabe));

                                                        if (lesson_d_exercice_syllabe.length === 7) {
                                                            sendLessonDataToDB('syllabe_exercice', lesson_d_exercice_syllabe);
                                                            console.log("Lesson d'exercice syllabe est envoyée à la base de donnée.");
                                                        }
                                                        if (lesson_d_exercice_syllabe.length > 7) {
                                                            if (lesson_d_exercice_syllabe.length <= 14) {
                                                                updateLessonData(id_syllabe_lesson_2,lesson_d_exercice_syllabe);
                                                                console.log("Lesson d'exercice syllabe est modifiée à la base de donnée.");
                                                            }
                                                        }
                                                    }
                                                }
                                                function stockerRevisionSyllabe() {

                                                    actualiserLessonSyllabe(lesson_de_revision_syllabe, lesson_de_syllabe_revision_du_jour);
                                                    localStorage.setItem("lesson_de_revision_syllabe", JSON.stringify(lesson_de_revision_syllabe));

                                                    console.log("La lesson de revision syllabe fait :");
                                                    console.log(lesson_de_revision_syllabe);
                                                }
                                                function actualiserConsonnesChoisies() {

                                                    consonnes_choisies = JSON.parse(localStorage.getItem("consonnes_choisies"));
                                                    consonnes_choisies = (consonnes_choisies == null) ? [] : consonnes_choisies;
                                            
                                                    consonnes_choisies.forEach(element => {
                                                        if($.inArray(element, memoire_consonnes_choisies) === -1) {
                                                            memoire_consonnes_choisies.push(element);
                                                        }
                                                    });

                                                    localStorage.setItem("memoire_consonnes_choisies", JSON.stringify(memoire_consonnes_choisies));

                                                    console.log("Les consonnes choisies sont :");
                                                    console.log(consonnes_choisies);                            
                                                    console.log('memoire_consonnes_choisies est');
                                                    console.log(memoire_consonnes_choisies);
                                                }
                                                function notificationDuSuccesDeRevision() {}
                                                function afficherRedirectionBtns() {
                                                    setTimeout(() => {
                                                        display($('#revision_redirection_btns'));
                                                        masquer($('#revision_redirection_btns > div'));
                                                                                    
                                                        afficherRedirectionSurApprentissageSyllabeBtn();
                                                        afficherRedirectionSurEvaluationSyllabeBtn();
                                                        continuSurApprentissageSyllabe();

                                                        function afficherRedirectionSurApprentissageSyllabeBtn() {
                                                            if (lesson_d_apprentissage_syllabe.length < 14) {
                                                                afficher($('#continu_sur_apprentissage_bouton'));
        
                                                                rendreActif($('#continu_sur_apprentissage_bouton'));
                                                                indexer($('#continu_sur_apprentissage_bouton p'));
                                                            }
                                                        }
                                                        function afficherRedirectionSurEvaluationSyllabeBtn() {
                                                            if (lesson_d_apprentissage_syllabe.length === 14) {
                                                                afficher($('#continu_sur_evaluation_bouton'));

                                                                rendreActif($('#continu_sur_evaluation_bouton'));
                                                                indexer($('#continu_sur_evaluation_bouton p'));
                                                            }
                                                        }
                                                        function continuSurApprentissageSyllabe() {
                                                            $('#continu_sur_apprentissage_bouton').click(() => { raffraichirLaPage(); });
                                                        }
                                                    }, 1800);
                                                }
                                            }

                                            function rechargerRevisionDialogueBtns() { $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫'); }
                                            function masquerRevisionFootBtns() {
                                                setTimeout(() => { masquer($('#revision_foot > div')); }, 1800);
                                            }
                                        }
                                    }
                                }

                                if (i == revision_syllabe_questions.length) { 
                                    i = 0; 
                                    viderLeTableau(revision_syllabe_questions);

                                 /* Suppression d'effet des clicks précédents sur les dialogue_boutons */
                                    $('#revision_question_btn').unbind('click');
                                    $('#revision_repetition_btn').unbind('click');
                                    $('.table_parlante td').unbind('click');
                                    $('#revision_correction_btn').unbind('click');
                                }
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
            function evaluationSyllabe() {

                $('#evaluation_bouton, #reprendre_evaluation_bouton, #continu_sur_evaluation_bouton').click(function () { evaluation(); });
                
                /* Un étudiant qui s'est connecté et qui a fini d'apprendre toutes les syllabes sauf la dernière évaluation,
                il est directement redirigé sur la page d'évaluation.*/
                if (memoire_consonnes_choisies.length === 2) evaluation();
                
                function evaluation() {
                
                    lesson_d_evaluation_syllabe = lessonDEvaluationSyllabe();

                    var evaluation_syllabe_questions = [];
                    var question_d_evaluation_syllabe = '', reponse_d_evaluation_syllabe = [];
                    var note_d_evaluation_syllabe = 0;
                    var evaluation_counter = 0;
                    let good_response_counter = 0;

                    lesson_active = 'revision';

                    chargerEvaluationSyllabe();
                    afficherEvaluation();
                    evaluerSyllabe();


                    function chargerEvaluationSyllabe() {

                        chargerEvaluationSyllabeHead();
                        chargerEvaluationSyllabeBody();
                        chargerEvaluationSyllabeFoot();

                        function chargerEvaluationSyllabeHead() {
                            $('.notification_titre').text('ߜߋ߲߭ ߞߘߐߓߐߟߌ');
                            viderNotification();
                            setTimeout(() => { ecris("evaluation_notification_corps", "ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߊߟߎ߬ ߛߓߍ߫߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫."); }, 800);
                        }
                        function chargerEvaluationSyllabeBody() {
                            var evaluation_tbody_default_message = 'ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߐߝߟߌ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬.';
                            $('#evaluation_fiche_body').html("<p id='evaluation_tbody_default_content'>" + evaluation_tbody_default_message + "</p>");
                        }
                        function chargerEvaluationSyllabeFoot() {

                            var q_evaluation_total = parseIntNko(lesson_d_apprentissage_syllabe.length);

                            $('#evaluation_question_bouton').html('<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ '+q_evaluation_total+'\\'+parseIntNko(1)+'߭ ߟߊߡߍ߲߫</p>');
                            $('#evaluation_repetition_bouton').html('<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ '+q_evaluation_total+'\\'+parseIntNko(1)+'߭ ߟߊߡߍ߲߫</p>');
                            $('#evaluation_correction_bouton').html('<p>ߏ߬ ߛߊߞߍ߫</p>');
                        }
                    }
                    function evaluerSyllabe() {

                        let i = 0;
                        let rang = '߭';
                        let action = "ߟߊߡߍ߲߫";
                        let question_status = 'repondue';

                        evaluation_syllabe_questions = questionsDEvaluation();

                        initialiserEvaluationSyllabeAStocker();
                        initialiserProgressBar();
                        poserQuestionDEvaluationSyllabe();
                        repeterQuestionDEvaluationSyllabe();
                        repondreQuestionDEvaluationSyllabe();
                        rectificationDeReponseDEvaluationSyllabe();
                        correctionDEvaluationSyllabe();


                        function poserQuestionDEvaluationSyllabe() {
                            $('#evaluation_question_bouton').on('click', function (e) {
                                e.stopImmediatePropagation();

                                effacercedenteReponse();
                                question_d_evaluation_syllabe = evaluation_syllabe_questions[evaluation_counter];
                                alert(question_d_evaluation_syllabe);


                                masquerEvaluationQuestionBtn();
                                lireEvaluationSyllabeQuestion();
                                enregistrerEvaluationSyllabeQuestion();
                                rechargerEvaluationQuestionBtn();
                                rechargerEvaluationRepetitionBtn();
                                afficherEvaluationRepetitionBtn();
                            
                                masquer($('#evaluation_cross'));
                                $('#evaluation_cross').css('transform', 'scale(0.4)');
                                $('#evaluation_reponse_container').css({ 'top': 0 });
                                afficherTesteContainer();


                                function masquerEvaluationQuestionBtn() { masquer($('#evaluation_question_bouton')); }
                                function lireEvaluationSyllabeQuestion() { lire('ߊ', question_d_evaluation_syllabe); }
                                function enregistrerEvaluationSyllabeQuestion() {}
                                function rechargerEvaluationQuestionBtn() {

                                    i++;
                                    rang = '߲';
                                    action = "ߠߊߡߍ߲߫";
                                    question_status = 'posee';

                                    ordre_de_question = (evaluation_syllabe_questions.length == i + 1) ? 'ߟߊߓߊ߲' : parseIntNko(i + 1)+rang;
                                    
                                    $('#evaluation_question_bouton').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(evaluation_syllabe_questions.length)+' \\ ' + ordre_de_question + ' '+action);
                                    if (i == evaluation_syllabe_questions.length) { masquer($('#evaluation_question_bouton')); }
                                }
                                function rechargerEvaluationRepetitionBtn() {
                                    if(i > 1) {
                                        ordre_de_question = (evaluation_syllabe_questions.length == i) ? 'ߟߊߓߊ߲' : parseIntNko(i)+rang;
                                        $('#evaluation_repetition_bouton').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ' +ordre_de_question+' ߠߊߡߍ߲߫ ߕߎ߲߯');
                                    }
                                }
                                function effacercedenteReponse() {
                                    reponse_d_evaluation_syllabe.splice(0, reponse_d_evaluation_syllabe.length);
                                    $('#evaluation_reponse').html(reponse_d_evaluation_syllabe);
                                }
                                function afficherTesteContainer() { $('#teste_container').css({ 'top': '-6.25rem' }); }
                            });
                        }
                        function repeterQuestionDEvaluationSyllabe() {
                            $('.repetition_btn').on('click', function () {
                                montrerReponse(question_d_evaluation_syllabe);
                                lire('syllabe', question_d_evaluation_syllabe);
                                afficherEvaluationRepetitionBtn();
                            });
                        }
                        function repondreQuestionDEvaluationSyllabe() {
                            $('#clavier_nko td').on('click', function (e) {
                                e.stopImmediatePropagation();

                            /* Au cas où on tente de repondre sans qu'une question soit posée, evaluation_dialogue_btn clignote pour rappel */
                                if (question_d_evaluation_syllabe == '') rappel($('#evaluation_dialogue_btn'));
                                if (question_d_evaluation_syllabe != '') {

                                    var caractere = $(this).text();

                                    chargerEvaluationSyllabeReponse();
                                    afficherCorrectionButton();

                                    function chargerEvaluationSyllabeReponse() {
                                        reponse_d_evaluation_syllabe.push(caractere);
                                        $('#evaluation_reponse').html(reponse_d_evaluation_syllabe);
                                    }
                                    function afficherCorrectionButton() {
                                        masquer($('#evaluation_question_bouton'));
                                        masquer($('#evaluation_repetition_bouton'));
                                        
                                        setTimeout(() => { 
                                            display($('#evaluation_correction_bouton')); 
                                            rendreActif($('#evaluation_correction_bouton'));
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
                        function rectificationDeReponseDEvaluationSyllabe() {
                            $('#correcteur_d_evaluation').on('click', function () {
                                reponse_d_evaluation_syllabe.pop();
                                $('#evaluation_reponse').html(reponse_d_evaluation_syllabe);
                            });
                        }
                        function correctionDEvaluationSyllabe() {

                            var evaluation_html = '';

                            $('.correction_btn').click(function (e) {
                                e.stopImmediatePropagation();

                                if (evaluation_counter <= evaluation_syllabe_questions.length) {

                                    let q = question_d_evaluation_syllabe;
                                    let r = reponse_d_evaluation_syllabe.join('');
                                    let p = (q == r) ? 1 : 0;
                                    let question_reponse = [q, r, p];

                                    note_d_evaluation_syllabe += p;

                                    marquerReponseDEvaluationSyllabe();
                                    effacerCheckMark();
                                    masquerTesteContainer();
                                    enregistrerEvaluationSyllabe();
                                    chargerFicheDEvaluation();
                                    progressBarDEvaluationSyllabe();
                                    afficherQuestionButton();
                                    finDEvaluationSyllabe();


                                    function chargerFicheDEvaluation() {
                                        setTimeout(() => {
                                            chargerInstantannementEvaluationTbody();
                                            defilementDuContenuVersLeHaut($('#evaluation_fiche_body'));

                                            function chargerInstantannementEvaluationTbody() {

                                                var n = parseIntNko(evaluation_counter);
                                                n = (n == '߁') ? n + '߭' : n + '߲';
                                                r = (q == r) ? r : "<del>" + r + "</del>";

                                                evaluation_html += '<div><span>' + n + '</span><span>' + q + '</span><span>' + r + '</span><span>' + parseIntNko(p) + '</span></div>\n';
                                                let total_point_d_evaluation = parseIntNko(note_d_evaluation_syllabe);
                                                let pourcentage_point_d_evaluation = '%' + parseIntNko(Math.floor(note_d_evaluation_syllabe * 100 / evaluation_syllabe_questions.length));

                                                $('#evaluation_fiche_body').html(evaluation_html);
                                                $('#total_point_d_evaluation').html(total_point_d_evaluation);
                                                $('#pourcentage_point_d_evaluation').html(pourcentage_point_d_evaluation);
                                            }
                                        }, 1400);
                                    }
                                    function marquerReponseDEvaluationSyllabe() {
                                        if (reponse_d_evaluation_syllabe.join('') == question_d_evaluation_syllabe) {

                                            $("#evaluation_reponse").html("<p id='bonne_reponse'>" + reponse_d_evaluation_syllabe.join('') + "</p><div id='check_mark_container'> <p id='check_mark'></p> <p id='check_mark_cover'></p> </div>");
                                            $('#check_mark_container').css({ 'display': 'inline-block', 'margin-right': '4px' });
                                            $('#check_mark_cover').css({ 'right': '0.25rem' });
                                            $('#check_mark').html("&#10003;");
                                            setTimeout(function () { $('#check_mark_cover').css({ 'right': '2rem' }); }, 100);
                                            setTimeout(function () { $('#check_mark_container').css({ 'display': 'none' }); }, 1000);
                                        } else {
                                            $("#evaluation_reponse").html("<p id='mauvaise_reponse'>" + reponse_d_evaluation_syllabe.join('') + "</p><p id='evaluation_cross'>&#10060;</p>");
                                            $('#evaluation_cross').css({ 'display': 'block', 'right': reponse_d_evaluation_syllabe.join('').length / 2 + 'rem', 'transform': 'scale(0.5)', 'opacity': 0 });
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
                                    function enregistrerEvaluationSyllabe() {
                                        lesson_de_syllabe_evaluation_du_jour.splice(evaluation_counter, 1, question_reponse);
                                        evaluation_counter++;
                                    }
                                    function progressBarDEvaluationSyllabe() {

                                        let progress_unity = 100 / evaluation_syllabe_questions.length;

                                        if (question_d_evaluation_syllabe == '') return;
                                        if (question_d_evaluation_syllabe != '') {
                                            actualiserEvaluationProgressBar();

                                            function actualiserEvaluationProgressBar() {
        
                                                if (question_d_evaluation_syllabe == '') return;
                                                if (question_d_evaluation_syllabe != '') {
        
                                                    let bar_width = evaluation_counter * progress_unity+1;
        
                                                    $('.progress_mauvaise_reponse_bar').css('width', bar_width + '%');

                                                    if (question_d_evaluation_syllabe == reponse_d_evaluation_syllabe.join('')) {
                                                        good_response_counter++;
                                                        let good_response_width = good_response_counter * progress_unity;
                                                        $('.progress_bonne_reponse_bar').css('width', good_response_width + '%');
                                                    }
        
                                                    question_d_evaluation_syllabe = ''; //Vider la variable question_d_evaluation_syllabe après son utilisation.
                                                }
                                            }
                                        }
                                    }
                                    function afficherQuestionButton() {
                                        if (evaluation_counter < evaluation_syllabe_questions.length) {
                                            masquer($('#evaluation_repetition_bouton'));
                                            masquer($('#evaluation_correction_bouton'));
    
                                            setTimeout(() => { 
                                                display($('#evaluation_question_bouton')); 
                                                rendreActif($('#evaluation_question_bouton'));
                                            }, 100);
                                        }
                                    }
                                    function finDEvaluationSyllabe() {
                                        if (evaluation_counter === evaluation_syllabe_questions.length) {

                                            let note_de_fin_d_evaluation_syllabe = calculerNote(lesson_de_syllabe_evaluation_du_jour);

                                            masquer($('#evaluation_dialogue_btns'));
                                            display($('#evaluation_redirection_btns'));

                                            if (note_de_fin_d_evaluation_syllabe < 100) {
                                                setTimeout(() => { 
                                                    masquer($('#evaluation_redirection_btns > div'));
                                                    afficher($('#reprendre_evaluation_bouton'));

                                                    rendreActif($('#reprendre_evaluation_bouton'));
                                                    indexer($('#reprendre_evaluation_bouton p'));
                                                    $('#reprendre_evaluation_bouton p').text("ߜߋ߲߲߭ ߞߘߐߓߐߟߌ ߞߍ߫ ߕߎ߲߯");
                                                }, 400);
                                                
                                                viderLeTableau(lesson_de_syllabe_evaluation_du_jour);
                                            }
                                            if (note_de_fin_d_evaluation_syllabe === 100) {

                                                stockerSyllabe();
                                                afficherLaLessonSuivanteBtn();
                                                resultatDeSyllabe();

                                                function stockerSyllabe() {

                                                    actualiserLessonSyllabe(lesson_d_evaluation_syllabe, lesson_de_syllabe_evaluation_du_jour);
                                                    localStorage.setItem("lesson_d_evaluation_syllabe", JSON.stringify(lesson_d_evaluation_syllabe));
                                                    
                                                    console.log("lesson_d_evaluation_syllabe actualisée est");
                                                    console.log(lesson_d_evaluation_syllabe);

                                                    if (lesson_d_apprentissage_syllabe.length === 14) {
                                                        if (lesson_d_exercice_syllabe.length === 14) {
                                                            if (lesson_de_revision_syllabe.length === 14) {
                                                                if (lesson_d_evaluation_syllabe.length === 14) {

                                                                    sendLessonDataToDB('syllabe_revision', lesson_de_revision_syllabe);
                                                                    sendLessonDataToDB('syllabe_evaluation', lesson_d_evaluation_syllabe);

                                                                    niveaux_etudies.push(niveau_en_cours);
                                                                    sessionStorage.setItem('niveaux_etudies',JSON.stringify(niveaux_etudies));
                                                                    sessionStorage.setItem('matiere_nouvellement_apprise',JSON.stringify(matiere_nom));
                                                                    
                                                                    console.log("Lesson de revision syllabe est envoyée à la base de donnée.");
                                                                    console.log("Lesson d'evaluation syllabe est envoyée à la base de donnée.");
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                function afficherLaLessonSuivanteBtn() {
                                                    setTimeout(() => {
                                                        masquer($('#evaluation_dialogue_btns'));
                                                        display($('#evaluation_redirection_btns'));
                                                        
                                                        masquer($('#evaluation_redirection_btns > div'));
                                                        afficher($('#continu_sur_la_lesson_suivante'));
                                                        rendreActif($('#continu_sur_la_lesson_suivante'));
                                                        indexer($('#continu_sur_la_lesson_suivante p'));
                                                        $('#continu_sur_la_lesson_suivante a').text('ߞߊ߲ߡߊߛߙߋ ߘߊߡߌ߬ߘߊ߬');
                                                    }, 400);
                                                }
                                                function resultatDeSyllabe() {

                                                    let apprentissage_syllabe_data = {};
                                                    let exercice_syllabe_data= {};
                                                    let revision_syllabe_data= {};
                                                    let evaluation_syllabe_data = {};
                                                
                                                    if (lesson_d_apprentissage_syllabe.length === 14) {
                                                        if (lesson_d_exercice_syllabe.length === 14) {
                                                            if (lesson_de_revision_syllabe.length === 14) {
                                                                if (lesson_d_evaluation_syllabe.length === 14) {

                                                                    var date = dateAcuelle();
                                                                    var niveau = niveau_en_cours;

                                                                    let note_d_apprentissage_syllabe = calculerNote(lesson_d_apprentissage_syllabe);
                                                                    var note_d_exercice_syllabe = calculerNote(lesson_d_exercice_syllabe);
                                                                    var note_de_syllabe_revision = calculerNote(lesson_de_revision_syllabe);
                                                                    var note_d_evaluation_syllabe = calculerNote(lesson_d_evaluation_syllabe);
                                                        
                                                                    apprentissage_syllabe_data = {"date":date, "niveau":niveau, "phase":"syllabe_apprentissage", "lesson":lesson_d_apprentissage_syllabe, "note":note_d_apprentissage_syllabe};
                                                                    exercice_syllabe_data = {"date":date, "niveau":niveau, "phase":"syllabe_exercice", "lesson":lesson_d_exercice_syllabe, "note":note_d_exercice_syllabe};
                                                                    revision_syllabe_data = {"date":date, "niveau":niveau, "phase":"syllabe_revision", "lesson":lesson_de_revision_syllabe, "note":note_de_syllabe_revision};
                                                                    evaluation_syllabe_data = {"date":date, "niveau":niveau, "phase":"syllabe_evaluation", "lesson":lesson_d_evaluation_syllabe, "note":note_d_evaluation_syllabe};
                                                                }
                                                            }
                                                        }
                                                    }

                                                    resultatDeLaMatiere(apprentissage_syllabe_data, exercice_syllabe_data, revision_syllabe_data, evaluation_syllabe_data);
                                                }
                                            }
                                        }
                                    }
                                }

                                if (evaluation_counter == evaluation_syllabe_questions.length) { 
                                    evaluation_counter = 0; 
                                    viderLeTableau(evaluation_syllabe_questions);

                                 /* Suppression d'effet des clicks précédents sur les dialogue_boutons */
                                    $('#evaluation_question_bouton').unbind('click');
                                    $('#evaluation_repetition_bouton').unbind('click');
                                    $('.table_parlante td').unbind('click');
                                    $('#evaluation_correction_bouton').unbind('click');
                                }
                            });
                        }
                        function questionsDEvaluation() {
                            let qe = [];
                            for (let j = 0; j < lesson_d_apprentissage_syllabe.length; j++) {
                                qe.push(lesson_d_apprentissage_syllabe[j][0]);
                            }
                            qe = malaxer(qe);
                            return qe;
                        }
                        function initialiserEvaluationSyllabeAStocker() {
                            lesson_de_syllabe_evaluation_du_jour = initialiserData(evaluation_syllabe_questions);
                        }
                    }
                }
            }
            function lessonDApprentissageSyllabe() {

                let lesson_d_apprentissage_syllabe_du_serveur = lessonDApprentissageSyllabeDuServeur();
                let lesson_d_apprentissage_syllabe = JSON.parse(localStorage.getItem("lesson_d_apprentissage_syllabe"));
                
                lesson_d_apprentissage_syllabe = (lesson_d_apprentissage_syllabe == null) ? lesson_d_apprentissage_syllabe_du_serveur : lesson_d_apprentissage_syllabe_du_serveur.concat(lesson_d_apprentissage_syllabe);
                return lesson_d_apprentissage_syllabe;
            }
            function lessonDExerciceSyllabe() {

                let lesson_d_exercice_syllabe_du_serveur = lessonDExerciceSyllabeDuServeur();
                let lesson_d_exercice_syllabe = JSON.parse(localStorage.getItem("lesson_d_exercice_syllabe"));

                lesson_d_exercice_syllabe = (lesson_d_exercice_syllabe == null) ? lesson_d_exercice_syllabe_du_serveur : lesson_d_exercice_syllabe_du_serveur.concat(lesson_d_exercice_syllabe);
                return lesson_d_exercice_syllabe;
            }
            function lessonDeRevisionSyllabe() {

                let lesson_de_revision_syllabe_du_serveur = lessonDeRevisionSyllabeDuServeur();
                let lesson_de_revision_syllabe = JSON.parse(localStorage.getItem("lesson_de_revision_syllabe"));
                
                lesson_de_revision_syllabe = (lesson_de_revision_syllabe == null) ? lesson_de_revision_syllabe_du_serveur : lesson_de_revision_syllabe_du_serveur.concat(lesson_de_revision_syllabe);
                return lesson_de_revision_syllabe;
            }
            function lessonDEvaluationSyllabe() {

                let lesson_d_evaluation_syllabe_du_serveur = lessonDEvaluationSyllabeDuServeur();
                let lesson_d_evaluation_syllabe = JSON.parse(localStorage.getItem('lesson_d_evaluation_syllabe'));
                
                lesson_d_evaluation_syllabe = (lesson_d_evaluation_syllabe == null) ? lesson_d_evaluation_syllabe_du_serveur : lesson_d_evaluation_syllabe_du_serveur.concat(lesson_d_evaluation_syllabe);
                return lesson_d_evaluation_syllabe;
            }
            function consonnesChoisiesDuServeur() {
    
                datas = JSON.parse(sessionStorage.getItem("datas"));

                let cs = [];
                let lesson = [];
                if (datas[1][0] != undefined) lesson = JSON.parse(datas[1][0].lesson);
    
                lesson.forEach(element => {
                    let consonne = element[0].split('')[0];
                    if ($.inArray(consonne, cs) === -1) { cs.push(consonne); }
                });
                return cs;
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
        function initialiserExerciceResultat() {

            questions_posees.splice(0, questions_posees.length);
            exercice_syllabe_memoire.splice(0, exercice_syllabe_memoire.length);
            nbr_bonne_reponse = 0;
            nbr_mauvaise_reponse = 0;
            taux_de_fausse_reponse = 0;
            taux_de_vraie_reponse = 0;
            point_total = 0;

            $('#exercice_resultat h3').html('ߞߎߘߎ߲߫ ߞߐߝߟߌ');
            $('#exercice_resultat #resultat').html('');
            $('#exercice_resultat #libelles').html('');
            $('#exercice_resultat #diagram').html('');
            $('#exercice_resultat #legende').html('');
        }
        function lessonDApprentissageSyllabeDuServeur() {
            let lesson_d_apprentissage_syllabe_du_serveur = [];
            let datas = JSON.parse(sessionStorage.getItem("datas"));
            if (datas[1].length != 0) lesson_d_apprentissage_syllabe_du_serveur = JSON.parse(datas[1][0].lesson);
            return lesson_d_apprentissage_syllabe_du_serveur;
        }
        function lessonDExerciceSyllabeDuServeur() {
            let lesson_d_exercice_syllabe_du_serveur = [];
            let datas = JSON.parse(sessionStorage.getItem("datas"));
            if (datas[1].length != 0) lesson_d_exercice_syllabe_du_serveur = JSON.parse(datas[1][1].lesson);
            return lesson_d_exercice_syllabe_du_serveur;
        }
        function lessonDeRevisionSyllabeDuServeur() {
            let lesson_de_revision_syllabe_du_serveur = [];
            let datas = JSON.parse(sessionStorage.getItem("datas"));
            if (datas[1].length != 0) if(datas[1][2] != undefined) lesson_de_revision_syllabe_du_serveur = JSON.parse(datas[1][2].lesson);
            return lesson_de_revision_syllabe_du_serveur;
        }
        function lessonDEvaluationSyllabeDuServeur() {
            let lesson_d_evaluation_syllabe_du_serveur = [];
            let datas = JSON.parse(sessionStorage.getItem("datas"));
            if (datas[1].length != 0) if(datas[1][3] != undefined) lesson_d_evaluation_syllabe_du_serveur = JSON.parse(datas[1][3].lesson);
            return lesson_d_evaluation_syllabe_du_serveur;
        }
    }
}