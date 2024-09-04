// Cette fonction est utilisée dans lesson.js au niveau de la fonction dispenserLesson().
function apprentissages() {
        
       
    var nom = JSON.parse(sessionStorage.getItem('nom'));
    var prenom = JSON.parse(sessionStorage.getItem('prenom'));
    var id = JSON.parse(sessionStorage.getItem('id'));  
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    var lesson_option = parseInt(JSON.parse(sessionStorage.getItem('lesson_option')));
    
    var table_id = $('.table_parlante').attr('id');
        
    var table = $('#'+table_id); 
    var tr = $('#'+table_id+' tr');
    var td = $('#'+table_id+' td');
    var nbr_table = table.length;
    var nbr_tr = tr.length;
    var nbr_td = td.length;

    var apprentissage_clicks_memo = [];
    let nbr_raisonnable_de_click = 1;
    let clicked_elements_quantity = 0;

    
 // Nota Beni: Le chargement de Apprentissage se fait dans parametres.js par la fonction parametrage()/chargerLesson().
    switch(lesson_option) {
        case 1 : preApprentissage(); break;
        case 2 : apprentissage(); break;
    }
                    
 /*-----------------------------------------------------------------------------------------------------------------------------------*/

    function choixDeProcedure() {
        afficher($('#apprentissage_container > div:nth-child(1)'));
    }
    function preApprentissage() {

        let lesson_active = '';
        let element_actif = '';
        let matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));
        let phase_id = JSON.parse(sessionStorage.getItem('phase_id'));

        let cercle_actif = '';
        let cercle_id = '';
        let cercle_index = 0;
        
        let rang = '';
        let les_lettres_actives = [];
        let lettres_pre_apprises = [];
        let total_lettres_apprises = [];
        let pre_apprentissage_memo = [];

        let exercice_pre_questions = [];
        let revision_pre_questions = [];
        let ordre_de_question = '';
        let total_questions = 0;
        let questions_posees = [];
        let pre_question = '', pre_reponse = '';
        let point = 0;
        let pre_exercice_memoire = [];
    
        let nbr_bonne_reponse = 0;
        let nbr_mauvaise_reponse = 0;
        let taux_de_fausse_reponse = 0;
        let taux_de_vraie_reponse = 0;
        let point_total = 0;

        let total_lettres_exercees = [];
    
        let pre_apprentissage_clicks_memo = [];
        let quantite_normale_de_click = 1;

        let panneau_status = "masque";
        let consonnes_choisies = [];

     /*-------------------------------------------------------------------------------------------------------------------*/ 

        
        switch(niveau_actif) {
            case 1 : preAlphabet(); break;
            case 2 : preSyllabe(); break;
            case 3 : preTon(); break;
            case 4 : preChiffre(); break;
        }
        
        raffraichissementDeLaPage();

        $('#apprentissage_dialogue_btn').css({'display':'none', 'opacity':'0'}); 
        $('#panneaux_de_consonnes_btn').css('display','block');


        function preAlphabet() {

            apprendrePreAlphabet();
            exercerPreAlphabet();
            reviserPreAlphabet();
            evaluerPreAlphabet();


            function apprendrePreAlphabet() {
                    
                chargerPreApprendreAlphabet();
                afficherPreApprendreAlphabet();
                preApprendreAlphabetNko();
                enregistrerPreApprendreAlphabet();
                progressBarrPreApprendreAlphabet();
                stockerPreApprendreAlphabet();
                assistantPreApprendreAlphabet();
                finDePreApprendreAlphabet();


                function chargerPreApprendreAlphabet() {

                    chargerEnteteDePreeAlphabet();
                    chargerFootDePreAlphabet();
                    chargerCorpsDePreeAlphabet();

                    
                    function chargerEnteteDePreeAlphabet() {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                    }
                    function chargerFootDePreAlphabet() {
                        
                        var cercles_html = cerclesHTML();
                        var redirection_btns_html = preExercicesBtnHTML();
                        var pre_apprentisssage_btn_html = "\
                            <div class='titre_de_parti'> ߞߎߘߎ߲</div> \
                            <div id='cercles_des_partis'>"+cercles_html+"</div> \
                        ";

                        $('#pre_apprentissage_btns').html(pre_apprentisssage_btn_html);
                        $('#redirection_btns').html(redirection_btns_html);

                        
                        function cerclesHTML() {
                            var html_1 = '<div id="cercles_des_partis_cadre">';
                            for(var i=0;i<5;i++) { 
                                var index = (i==0) ? parseIntNko(i+1)+'߭' : parseIntNko(i+1)+'߲';
                                html_1 += (i == 4) ? "<span id='cercle_"+i+"' class='cercle'>ߓߍ߯</span>" : "<span id='cercle_"+i+"' class='cercle'>"+index+"</span>"; 
                            }
                            html_1 += '</div>';
                            return html_1;
                        }
                        function preExercicesBtnHTML() {
                            let html = "\
                                <span class='redirection_btn' id='pre_exercice_bouton'>ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</span>  \
                                <span class='redirection_btn' id='pre_evaluation_bouton'>ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫</span>  \
                            ";
                            return html;
                        }
                    }
                    function chargerCorpsDePreeAlphabet() {
                        $('#apprentissage_body').html(preApprentissageCorpsHTML());  // Voir fonction preApprentissageCorpsHTML() dans fonctions.js
                    }
                }
                function afficherPreApprendreAlphabet() {

                    choixDeProcedure();
                    afficherPreApprentissageBtns();

                    $('#cercles_des_partis_cadre span').click(function() {
                                    
                        lesson_active = 'pre_apprentissage';
                        sessionStorage.setItem('lesson_active', JSON.stringify(lesson_active)); 
                        cercle_actif = $(this);
                        cercle_index = $(this).index();
                        rang = cercle_actif.html();
                    
                        var index = cercle_index+1;
                        var pre_apprentissage_permission = autorisationDePreExercice();


                        viderLeTableau(pre_apprentissage_clicks_memo);
                        controleDuNiveau();
                        if(pre_apprentissage_permission == 'pre_lesson_non_permise') return false;
                        preLessonEntete1Style();
                        selectionDeLaLigneActive();
                        styleDeLaLigneActive();
                        traductionDeLaLigneActive();
                        affichageDePreApprentissageBtns();
                        zoomDown($('.dialogue_btn'));
                        
                    

                        function controleDuNiveau() {
                            if(cercle_index > 0) {
                                pre_apprentissage_permission = (cercle_actif.prev().hasClass('cercle_depasse')) ? 'pre_lesson_permise' : 'pre_lesson_non_permise';
                            }
                        }
                        function preLessonEntete1Style() {
                            $('#pre_evaluation_bouton').removeClass('exercice_en_cours indicateur carre_depasse');
                            cercle_actif.addClass('apprentissage_en_cours');
                        }
                        function selectionDeLaLigneActive() {
                            $('#tr_actif .pre_apprentissage_tr').unwrap();
                            $('#traducteur').remove();
                            $('.pre_apprentissage_tr:nth-child('+index+')').wrap('<div id="tr_actif"></div>');
                        }
                        function styleDeLaLigneActive() {
                            $('#tr_actif .pre_apprentissage_td').css({'background-color':'#555', 'color':'yellow'});
                            if(index == 4) { $('#tr_actif .pre_apprentissage_td:last-child').css({'background-color':'transparent'}); }
                            $('#tr_actif').prevAll().children().css({'background-color':'transparent', 'color':'#fff'});
                            $('#tr_actif').nextAll().children().css({'background-color':'transparent', 'color':'#555'});
                        }
                        function traductionDeLaLigneActive() {
                            $('#tr_actif .pre_apprentissage_tr').append('<div id="traducteur"> \
                                <div id="manche_traducteur">&#8230</div> \
                                <div id="rows"></div> \
                            </div>');

                            var traducteur_html = traducteurHtml();

                            $('#manche_traducteur').click(()=>{
                                let traducteur_height = ($('#traducteur').height() == 16) ? 128 : 16;
                                $('#traducteur').animate({'height':traducteur_height+'px'}, 100);
                                $('#rows').html(traducteur_html);
                            });

                            function traducteurHtml() {
                                var th ='';

                                if(index == 1) {
                                    th += '<div class="traducteur_tr">';
                                        for(var i=0; i<7; i++) { th += '<span class="pre_td">'+alphabet_nko[1][i]+'</span>'; }
                                    th += '</div>';
                                    // th += '<div class="traducteur_tr">';
                                    //     for(var i=0; i<7; i++) { th += '<span class="pre_td">'+alphabet_nko[2][i]+'</span>'; }
                                    // th += '</div>';
                                }
                                if(index == 2) {
                                    th += '<div class="traducteur_tr">';
                                        for(var j=7; j<14; j++) { th += '<span class="pre_td">'+alphabet_nko[1][j]+'</span>'; }
                                    th += '</div>';
                                    // th += '<div class="traducteur_tr">';
                                    //     for(var j=7; j<14; j++) { th += '<span class="pre_td">'+alphabet_nko[2][j]+'</span>'; }
                                    // th += '</div>';
                                }
                                if(index == 3) {
                                    th += '<div class="traducteur_tr">';
                                        for(var k=14; k<21; k++) { th += '<span class="pre_td">'+alphabet_nko[1][k]+'</span>'; }
                                    th += '</div>';
                                    // th += '<div class="traducteur_tr">';
                                    //     for(var k=14; k<21; k++) { th += '<span class="pre_td">'+alphabet_nko[2][k]+'</span>'; }
                                    // th += '</div>';
                                }
                                if(index == 4) {
                                    th += '<div class="traducteur_tr">';
                                        for(var l=21; l<28; l++) { th += '<span class="pre_td">'+alphabet_nko[1][l]+'</span>'; }
                                    th += '</div>';
                                    // th += '<div class="traducteur_tr">';
                                    //     for(var l=21; l<28; l++) { th += '<span class="pre_td">'+alphabet_nko[2][l]+'</span>'; }
                                    // th += '</div>';
                                }

                                return th;
                            }
                        }
                        function affichageDePreApprentissageBtns() {

        
                            $.each($('.pre_apprentissage_td'), function() {
        
                                $(this).click(function() {

                                    let n = indice();

                                    if(n == 7) { 
                                        afficherPreExerciceBtns(); 
                                    }
                                });
                            });
                            
                            $('#pre_exercice_bouton').click(function() { 
                                zoomDown($('.dialogue_btn')); 
                            });
                        }
                    });

                    setTimeout(function(){ montrer($('.cercle:nth-child(1)')); }, 1000);

                }
                function preApprendreAlphabetNko() {
                    $.each($('.pre_apprentissage_td'), function() {
                        let clicks_counter = 1;
                        
                        $(this).click(()=>{

                            let td_actif = $(this);
                            let clicked_letter = $(this).html();
                            let click_count = clicks_counter++;

                            if(lettres_pre_apprises.includes(clicked_letter)) { lire('alphabet',clicked_letter); }
                            if(click_count == quantite_normale_de_click) { td_actif.css('background-color','transparent'); }  
                        });
                    });
                }
                function enregistrerPreApprendreAlphabet() {
                    
                    initialiserPreApprentissageClicksMemo();
                    
                    $.each($('.pre_apprentissage_td'), function() {

                        let clicks_counter = 1;

                        $(this).click(()=>{

                            let clicked_letter = $(this).html();
                            let td_index = $(this).index();
                            let click_count = clicks_counter++;
                            let point = (click_count >= quantite_normale_de_click) ? 1 : 0;

                            memorisationDePreApprentissage(); 
                            if(click_count == quantite_normale_de_click) {}

                            function memorisationDePreApprentissage() {
                                if(les_lettres_actives.includes(clicked_letter)) {
                                    pre_apprentissage_memo.push(clicked_letter);
                                    pre_apprentissage_clicks_memo.splice(td_index,1,[clicked_letter,click_count,point]);
                                }
                            }
                        });
                    });
                    
                    $('#cercles_des_partis_cadre span').click(function() {

                        les_lettres_actives = lesLettresActives();
                        lettres_pre_apprises = lettresPreApprises();
                        lettres_pre_apprises = lettres_pre_apprises.concat(les_lettres_actives);

                        
                        function lesLettresActives() {
                            var la = [];
                            for(var i=0; i<$('#tr_actif .pre_apprentissage_td').length; i++) {
                                let n = i+1;
                                let td_value = $('#tr_actif .pre_apprentissage_td:nth-child('+n+')').html();
                                if(td_value != '') { la.push(td_value); }
                            }
                            return la;
                        }
                        function lettresPreApprises() {
                            var trs = $('#tr_actif').prevAll();
                            var lpa = [];

                            $.each(trs, function(){
                                $.each($('.pre_apprentissage_td', this), function(){
                                    lpa.push($(this).html());
                                });
                            });

                            return lpa;
                        }
                    });
                }
                function progressBarrPreApprendreAlphabet() {
                    
                    let apprentissage_width = 0;
                    let global_clicks_counter = 1;

                    $('.dialogue_btn').click(()=>{ $('.progress_bar').css('display','block'); });

                    $.each($('.pre_apprentissage_td'), function() {

                        let td_click_counter = 0;

                        $(this).click(function() {

                            td_click_counter++;
                            if(td_click_counter <= quantite_normale_de_click) {

                                let total_click = quantite_normale_de_click*les_lettres_actives.length;
                                let diagramm_unity = 100/total_click;
                                let global_clicks_count = global_clicks_counter++;

                                apprentissage_width = global_clicks_count*diagramm_unity;
                                $('.progress_bonne_reponse_bar').css('width', apprentissage_width+'%');
                            
                            // Initialiser la barre de progression
                                if(global_clicks_count/quantite_normale_de_click == les_lettres_actives.length) { 
                                    setTimeout(() => {
                                        $('.progress_bar').css('display','none'); 
                                        $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);                                    td_click_counter = 0;
                                        apprentissage_width = 0;
                                        global_clicks_counter = 1;
                                    }, 400);
                                }
                            }
                        });
                        
                    });
                }
                function stockerPreApprendreAlphabet() {
                    $.each($('.pre_apprentissage_td'), function() {
                        $(this).click(function() {
                            if(lesson_active == 'pre_apprentissage') {        
                                if(pre_apprentissage_clicks_memo.length === les_lettres_actives.length) {

                                    total_lettres_apprises = total_lettres_apprises.concat(pre_apprentissage_clicks_memo);
                                    if(total_lettres_apprises.length == 27) { 
                                        sendLessonDataToDB('alphabet_apprentissage',total_lettres_apprises);
                                        console.log('Lesson de pre_apprentissage envoyée à la base de donnée.');
                                    }
                                } 
                            } 
                        });
                    });
                }
                function assistantPreApprendreAlphabet() {
                    
                    setTimeout(() => {
                        ecrire('notification_corps','ߞߏ߰ߙߌ߬ ߝߟߐߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬');
                    }, 800);
                        
                    $('#cercles_des_partis_cadre span').click(function() {
                        ecrire('notification_corps','\
                            ߛߓߍߘߋ߲߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߏ߫ ߌ ߞߣߐ߫.\
                        ');
                    });

                    $.each($('.pre_apprentissage_td'), function() {

                        $(this).click(function() {

                            preApprentissageNotifications();
                            montrerExerciceBtn();
                            
                            
                            function preApprentissageNotifications() {
                                let n = indice();

                                if(n == 7) {
                                
                                    ecrire('notification_corps','\
                                        ߣߌ߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߓߘߊ߫ ߟߐ߲߫ ߌ ߓߟߏ߫߸ ߢߊ߯ߡߌߟߊ߲ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫߹) ߞߊ߬ ߘߋ߲߬ߣߍ߲߬ ߞߎߘߊ ߟߎ߬ ߢߊ߯ߡߌ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߞߊ߲ߡߊ߬.\
                                    ');
                                }
                            }
                            function montrerExerciceBtn() {
                                let n = indice();

                                if(n == 7) { 
                                    afficherPreExerciceBtns();
                                    montrer($('#pre_exercice_bouton'));
                                }
                                
                                $('.cercle, #pre_revision_btn').click(()=>{ 
                                    $('#pre_evaluation_bouton').removeClass('indicateur'); 
                                    zoomDown($('.dialogue_btn'));
                                    viderLeTableau(pre_apprentissage_clicks_memo);
                                });
                            }
                        });
                    });

                    $('#pre_exercice_bouton').click(function() {
                        ecrire('notification_corps','\
                            ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫.\n ߦߋ߫ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߣߌ߫ ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߣߌ߫ ߛߊߞߍߟߌ ߟߎ߬ ߞߍ߫ ߦߊ߲߬߸ ߤߊ߲߯ ߞߐߝߟߌ߫ ߥߟߊ ߦߋ߫ ߓߐ߫.\
                        ');
                    });
                }
                function finDePreApprendreAlphabet() {
                    $('#cercles_des_partis_cadre span').click(function() {

                        let total_click = 0;
                        let total_yellow_letter = $('#tr_actif span').length;

                        $.each($('#tr_actif span'),function() {
                            let span_click_counter =0;
                            $(this).click(function() {
                                span_click_counter++;
                                if(span_click_counter <= quantite_normale_de_click) { 
                                    total_click++; 
                                    if(total_click === total_yellow_letter*quantite_normale_de_click) {
                                        $('#apprentissage_head').click(function() {

                                            chargerResultat(pre_apprentissage_clicks_memo);
                                            adapterLeResultatAuFormatDApprentissage(pre_apprentissage_clicks_memo);
                                            afficherApprendrePreResultat();
                                            masquerApprendrePreResultat();
                                            reprendreApprentissagePreAlphabet();
                                            exercerPreAlphabet();
                                            
                                            
                                            function afficherApprendrePreResultat() { goDown($('.resultat_container')); }
                                            function masquerApprendrePreResultat() {  
                                                $('#fermer_resultat').click(function() {
                                                    goUp($('.resultat_container'));
                                                    formatParDefautDuResultat();
                                                });
                                            }
                                            function reprendreApprentissagePreAlphabet() {
                                                $('#reprendre').click(function() {
                                                    
                                                    goUp($('.resultat_container'));

                                                    setTimeout(() => { 
                                                        cercle_actif.click(); 
                                                        viderLeTableau(pre_apprentissage_clicks_memo);
                                                        apprendrePreApprendreAlphabetNko();
                                                        enregistrerPreApprendreAlphabet();
                                                        progressBarrPreApprendreAlphabet();
                                                        stockerPreApprendreAlphabet();
                                                        assistantPreApprendreAlphabet();
                                                    }, 400);
                                                });
                                            }
                                            function exercerPreAlphabet() {
                                                $('#avance').click(function() {
                                                    goUp($('.resultat_container'));
                                                    setTimeout(() => { $('#pre_exercice_bouton').click();  }, 400);
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    });
                }
            }
            function exercerPreAlphabet() {
                $('#pre_exercice_bouton').click(function() {
                
                    let bouton_actif = $(this);
                    
                    lesson_active = 'pre_exercice';  
                    sessionStorage.setItem('lesson_active', JSON.stringify(lesson_active)); 
                    $('.fermeture_pre').attr('id','fermeture_pre_exercice');
                    
                    zoomDown($('.dialogue_btn'));
                    initialiserLeResultat();
                    exercice_btn_id = $(this).attr('id');
                    exercice_pre_questions = malaxer(malaxer(les_lettres_actives));
    
                    preExerciceEnteteStyle();
                    exercice();
    
                    function preExerciceEnteteStyle() {
                        $('#pre_evaluation_bouton').removeClass('exercice_en_cours');
                        bouton_actif.addClass('exercice_en_cours');
                    }
                });
            }
            function reviserPreAlphabet() {
                $('#pre_evaluation_bouton').click(function() {
                
                    let bouton_actif = $(this);

                    lesson_active = 'pre_revision';
                    sessionStorage.setItem('lesson_active', JSON.stringify(lesson_active)); 
                    $('.fermeture_pre').attr('id','fermeture_pre_evaluation');

                    zoomDown($('.dialogue_btn'));
                    initialiserLeResultat();
                    exercice_btn_id = $(this).attr('id');
                    revision_pre_questions = malaxer(malaxer(lettres_pre_apprises));

                    preRevisionEnteteStyle();
                    exercice(); 

                    function preRevisionEnteteStyle() {
                        $('#pre_exercice_bouton').removeClass('exercice_en_cours');
                        bouton_actif.addClass('exercice_en_cours');
                    }
                });
            }
            function evaluerPreAlphabet() {
                
                chargerPreEvaluerAlphabet();
                afficherPreEvaluerAlphabet();
                apprendrePreEvaluerAlphabetNko();
                enregistrerPreEvaluerAlphabet();
                progressBarrPreEvaluerAlphabet();
                stockerPreEvaluerAlphabet();
                assistantPreEvaluerAlphabet();
                finDePreEvaluerAlphabet();


                function chargerPreEvaluerAlphabet() {}
                function afficherPreEvaluerAlphabet() {}
                function apprendrePreEvaluerAlphabetNko() {}
                function enregistrerPreEvaluerAlphabet() {}
                function progressBarrPreEvaluerAlphabet() {}
                function stockerPreEvaluerAlphabet() {}
                function assistantPreEvaluerAlphabet() {}
                function finDePreEvaluerAlphabet() {}
            }
        }
        function preSyllabe() {

            apprendrePreSyllabe();
            exercerPreSyllabe();
            reviserPreSyllabe();
            evaluerPreSyllabe();

            function apprendrePreSyllabe() {

                chargerApprendrePreSyllabe();
                afficherApprendrePreSyllabe();
                apprentissagePreSyllabe();
                enregistrerApprendrePreSyllabe();
                progressBarrApprendrePreSyllabe();
                stockerApprendrePreSyllabe();
                assistantApprendrePreSyllabe();
                finDeApprendrePreSyllabe();


                function chargerApprendrePreSyllabe() {

                    chargerEnteteDePreSyllabe();
                    chargerCorpsDePreSyllabe();
                    chargerFootDePreSyllabe();

                    
                    function chargerEnteteDePreSyllabe() {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
                    }
                    function chargerCorpsDePreSyllabe() {
                        $('#panneaux span').click(function() {

                            var clicked_consonne_container = $(this);
                            var clicked_consonne = $(this).text();
                            var bc = this.style.backgroundColor;
                            var consonne_background = (bc == 'rgb(170, 170, 170)') ? '#fff' : 'rgb(170, 170, 170)';
                            let element_index = 0;
                            
                            $('.table_parlante td').css('transform','scale(0)');

                            marquerLaConsonneCliquee();
                            decocherLesConsonnes();
                            decocherLaNasalisation();
                            chargerTableauNoir(); 

                        
                            function marquerLaConsonneCliquee() {
                                clicked_consonne_container.css('background-color',consonne_background);

                                consonnes_choisies.forEach(element => {
                                    if(element == clicked_consonne) {
                                        element_index = consonnes_choisies.indexOf(clicked_consonne);
                                    }
                                });

                                if(consonne_background == 'rgb(170, 170, 170)') { consonnes_choisies.push(clicked_consonne); }
                                if(consonne_background == '#fff') { consonnes_choisies.splice(element_index,1); }

                            }
                            function chargerTableauNoir() {
                                $.each($('.check_btn'), function(){
                                    var consonne_active = $('label', this);
                                    var consonne_corespondante = $('label', this).html();

                                    if(clicked_consonne == consonne_corespondante) { consonne_active.click(); }
                                    $('#table_syllabe_apprentissage td').css({'background-color':'rgb(85, 85, 85)', 'color':'yellow'});
                                });
                            }
                            function decocherLesConsonnes() {
                                if($('#consonnes_checker').find('.checkbox_parent').prop("checked") == true) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }            
                            }
                            function decocherLaNasalisation() {
                                if($('#nasalisation_checker').find('.check_btn:last-child input').prop("checked") == true) { $('#nasalisation_checker').find('.check_btn:last-child label').click(); }            
                            }
                        }); 
                    }
                    function chargerFootDePreSyllabe() {
                        
                        chargerLesBoutonsDEntete();
                        
                        function chargerLesBoutonsDEntete() {
                                
                            var panneaux_des_lettres_html = panneauxDesLettresHTML();
                            var pre_lesson_head_12_html = "\
                                <div class='titre_de_parti'>\
                                    <div>ߞߎߘߎ߲</div>\
                                    <div class='cercle' id='afficheur_de_panneau'>+</div>\
                                </div>\
                                <div id='panneaux'>"+panneaux_des_lettres_html+"</div>\
                            ";
                            var pre_lesson_head_22_html = "ߞߎߘߎ߲ ߢߊ߯ߡߌߣߍ߲";

                            $('#pre_apprentissage_btns' ).html(pre_lesson_head_12_html);
                            $('#redirection_btns' ).html(pre_lesson_head_22_html);
                            
                            function panneauxDesLettresHTML() {
                                
                                var consonnes = caracteres[1];
                            
                                var html_2 = '<div id="consonnes_cadre">\n';
                                for(var i=0;i<18;i+=6) { 
                                    html_2 += "<div>\n"; 
                                    for(var j=0;j<6;j++) { 
                                        html_2 += "<span>"+consonnes[i+j]+"</span>"; 
                                    }
                                    html_2 += "</div>\n"; 
                                }
                                html_2 += '<div id="submit_panneau">ߏ߬ ߞߊߢߌ߲߬</div>\n';
                                html_2 += '</div>\n';
                                
                                return html_2;
                            }
                        }
                    }
                }
                function afficherApprendrePreSyllabe() {

                    choixDeProcedure();
                    
                    afficherLePanneauDesConsonnes();
                    masquerLePanneauDesConsonnes();
                    stylesDesSyllabes();

                        
                    function afficherLePanneauDesConsonnes() {
                        $('#afficheur_de_panneau').on('click', function() {
                            if(panneau_status == "masque") { afficherPanneau(); }
                            else{ masquerPanneau(); }
                        });
                    }
                    function masquerLePanneauDesConsonnes() {
                        $('#panneaux, #apprentissage_body').click(function(e) {
                            if(e.target.id != "") { masquerPanneau(); }
                        });
                        $('#submit_panneau').on('click', masquerPanneau);
                    }
                    function afficherPanneau(){
                        $('#panneaux').css('height','12rem');
                        $('#consonnes_cadre').animate({'top':0}, 250);
                        panneau_status = "affiche";
                    }
                    function masquerPanneau(){
                        $('#consonnes_cadre').animate({'top':'12rem'}, 250);
                        setTimeout(function(){$('#panneaux').css('height',0);}, 250);
                        panneau_status = "masque";
                    }
                    function stylesDesSyllabes() {
                        $('#apprentissage_body').click(function(){
                        
                            let id = $(this).attr('id');
                            let td = $('#'+id+' td');

                            $('#table_syllabe_apprentissage td').css({'background-color':'rgb(85, 85, 85)', 'color':'yellow'});
                            
                            $.each(td, function(){
                                let click_optimal = 3;
                                let compteur = 1;

                                $(this).click(function(e){
                    
                                    let td_actif = $(this);
                                    let n = compteur++;
                                    
                                    if(compteur == click_optimal+1){
                                        td_actif.css({'background-color':'transparent', 'color':'yellow'});
                                    }
                                });
                            });

                        });
                    }
                }
                function apprentissagePreSyllabe() {
                    
                    $('#apprentissage_body').click(function(e) {
                            
                        let id = this.id;
                        let td = $('#'+id+' .table_parlante td');

                        $.each(td, function(){
                            $(this).click(function(){ 
                                let son = $(this).text();
                                lire('ߊ',son); 
                            });
                        });
                    });
                }
                function enregistrerApprendrePreSyllabe() {
                    
                    $('#apprentissage_body').click(function(){
                            
                        let id = $(this).attr('id');
                        let td = $('#'+id+' td');
                        
                        consonnes_choisies.splice(0,consonnes_choisies.length);
                        initialiserMemoire();
                        memorisation();

                        function initialiserMemoire() {
                            for(i=0; i<td.length; i++) { 
                                let clicked_syllabe = td[i].textContent;
                                consonnes_choisies.push([clicked_syllabe,0]); 
                            }
                        }
                        function memorisation() {
                            
                            $.each(td, function(){
                                let compteur = 1;

                                $(this).click(function(e){
                    
                                    let syllabe_clique = $(this).text();
                                    let td_index = $(this).index();
                                    let n = compteur++;
                                    
                                    consonnes_choisies.splice(td_index,1,[syllabe_clique,n]);
                                    e.stopImmediatePropagation();
                                });
                            });
                            
                        }
                    });
                }
                function progressBarrApprendrePreSyllabe() {}
                function stockerApprendrePreSyllabe() {}
                function assistantApprendrePreSyllabe() {
                    
                    setTimeout(() => {
                        ecrire("notification_corps","ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬.");
                    }, 1000);

                    montrer($('#afficheur_de_panneau'));

                    $('#afficheur_de_panneau').click(function() {
                        if(panneau_status == "affiche") {
                            if(consonnes_choisies.length != 0) {
                                ecrire("notification_corps","ߛߌ߬ߙߕߊ߬ ߞߋߟߋ߲߫ ߥߟߊ ߛߌߦߊߡߊ߲߫ ߛߎߥߊ߲ߘߌ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰.");
                            }
                            if(consonnes_choisies.length == 0) {
                                ecrire("notification_corps","ߛߌ߬ߙߕߊ߬ ߞߋߟߋ߲߫ ߥߟߊ ߛߌߦߊߡߊ߲߫ ߛߎߥߊ߲ߘߌ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰.");
                            }
                        }
                    });

                    $('#afficheur_de_panneau, #panneaux, #apprentissage_body, #submit_panneau').click(function() {
                        if(panneau_status == "masque") {
                            if(consonnes_choisies.length == 0) {
                                ecrire("notification_corps","ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬.");
                                montrer($('#afficheur_de_panneau'));
                            }
                        }
                        if(panneau_status == "masque") {
                            if(consonnes_choisies.length != 0) {
                                ecrire("notification_corps","ߜߋ߲߭ ߢߌ߲߬ ߠߎ߫ ߞߋ߬ߟߋ߲߬ ߞߋ߬ߟߋ߲߬ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߴߌ ߞߣߐ߫.");
                            }
                        }
                    });
                }
                function finDeApprendrePreSyllabe() {}

            }
            function exercerPreSyllabe() {}
            function reviserPreSyllabe() {}
            function evaluerPreSyllabe() {}

        }
        function preTon() {

            chargerPreTon();
            afficherPreTon();
            apprendrePreAlpTon();
            enregistrerPreTon();
            progressBarrPreTon();
            stockerPreTon();
            assistantPreTon();
            finDePreTon();


            function chargerPreTon() {}
            function afficherPreTon() {}
            function apprendrePreAlpTon() {}
            function enregistrerPreTon() {}
            function progressBarrPreTon() {}
            function stockerPreTon() {}
            function assistantPreTon() {}
            function finDePreTon() {}
        }
        function preChiffre() {
            
            chargerPreChiffre();
            afficherPreChiffre();
            apprendrePreAlpChiffre();
            enregistrerPreChiffre();
            progressBarrPreChiffre();
            stockerPreChiffre();
            assistantPreChiffre();
            finDePreChiffre();


            function chargerPreChiffre() {}
            function afficherPreChiffre() {}
            function apprendrePreAlpChiffre() {}
            function enregistrerPreChiffre() {}
            function progressBarrPreChiffre() {}
            function stockerPreChiffre() {}
            function assistantPreChiffre() {}
            function finDePreChiffre() {}
        }

        function indice() {
            let n = 0;

            for(var i=0; i<pre_apprentissage_clicks_memo.length; i++) {
                if(pre_apprentissage_clicks_memo[i][1] >= quantite_normale_de_click) { n++; }
            }
            return n;
        } 
        function autorisationDePreExercice() {
            let autorisation = 'pre_exercice_non_permis';

            $.each($('.cercle'), function() {
                if($(this).hasClass('apprentissage_en_cours')) autorisation = 'pre_exercice_permis';
            });

            return autorisation;
        }
        function exercice(){

            chargerPreExerciceAlphabet();
            afficherPreExerciceAlphabet();
            exercicerAlphabet();
            enregistrerPreExerciceAlphabet();
            progressBarrPreExerciceAlphabet();
            stockerPreExerciceAlphabet();
            assistantPreExerciceAlphabet();
            finDePreExerciceAlphabet();


            function chargerPreExerciceAlphabet() {

                switch(niveau_actif) {
                    case 1 : chargerEnteteDePreExerciceAlphabet();
                             chargerPiedDePreExerciceAlphabet();
                             chargerCorpsDePreExerciceAlphabet();
                             break;

                    case 2 : chargerEnteteDePreExerciceSyllabes();
                             chargerPiedDePreExerciceSyllabes();
                             chargerCorpsDePreExerciceSyllabes();
                             break;

                    case 3 : chargerEnteteDePreExerciceTons();
                             chargerPiedDePreExerciceTons();
                             chargerCorpsDePreExerciceTons();
                             break;

                    case 4 : chargerEnteteDePreExerciceChiffres();
                             chargerPiedDePreExerciceChiffres();
                             chargerCorpsDePreExerciceChiffres();
                             break;
                }
              
                function chargerEnteteDePreExerciceAlphabet() {
                    if(lesson_active == 'pre_exercice') {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
                    }
                    if(lesson_active == 'pre_revision') {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߣߐ߰ߡߊ߬ߛߍߦߌ</h3>');
                    }
                }
                function chargerPiedDePreExerciceAlphabet() {

                    let pre_questions = [];

                    if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                    if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                    total_questions = pre_questions.length;
                    
                    var exercice_foot_html = '\
                        <div id="apprentissage_foot_btns_container"> \
                            <div id="exercice_btns"> \
                                <div id="exercice_question_btn">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(pre_questions.length)+' \\ ߁߭ ߟߊߡߍ߲߫</div> \
                                <div id="exercice_repeter_question_btn"></div> \
                                <div id="exercice_correction_btn">ߏ߬ ߛߊߞߍ߫</div> \
                            </div> \
                        </div> \
                    ';

                    $('#exercice_foot').html(exercice_foot_html);
                }
                function chargerCorpsDePreExerciceAlphabet() {
                    var exercice_body_html = '';
        
                    if(lesson_active == 'pre_exercice') { exercice_body_html = lessonHTML(exercice_pre_questions, ''); }
                    if(lesson_active == 'pre_revision') { exercice_body_html = lessonHTML(revision_pre_questions, ''); }
                    $('#exercice_body').html(exercice_body_html);
                }

                function chargerEnteteDePreExerciceSyllabes() {}
                function chargerPiedDePreExerciceSyllabes() {}
                function chargerCorpsDePreExerciceSyllabes() {}

                function chargerEnteteDePreExerciceTons() {}
                function chargerPiedDePreExerciceTons() {}
                function chargerCorpsDePreExerciceTons() {}

                function chargerEnteteDePreExerciceChiffres() {}
                function chargerPiedDePreExerciceChiffres() {}
                function chargerCorpsDePreExerciceChiffres() {}
            }
            function afficherPreExerciceAlphabet() {

                switch(niveau_actif) {
                    case 1 : afficherEnteteDePreExerciceAlphabet();
                             afficherPiedDePreExerciceAlphabet();
                             afficherCorpsDePreExerciceAlphabet();
                             break;

                    case 2 : afficherEnteteDePreExerciceSyllabes();
                             afficherPiedDePreExerciceSyllabes();
                             afficherCorpsDePreExerciceSyllabes();
                             break;

                    case 3 : afficherEnteteDePreExerciceTons();
                             afficherPiedDePreExerciceTons();
                             afficherCorpsDePreExerciceTons();
                             break;

                    case 4 : afficherEnteteDePreExerciceChiffres();
                             afficherPiedDePreExerciceChiffres();
                             afficherCorpsDePreExerciceChiffres();
                             break;
                }
                

                function afficherEnteteDePreExerciceAlphabet() {
                }
                function afficherPiedDePreExerciceAlphabet() {}
                function afficherCorpsDePreExerciceAlphabet() {
                        
                    afficherPreExerciceCadres();
                    afficherPreExerciceContenus();
                    gestionDeExerciceFootBtn();
        
        
                    function afficherPreExerciceCadres() {
                        $('#exercice_body').css({'display':'block'}); 
                        setTimeout(function() { afficher($('#pre_exercice')); }, 150); 
                    }
                    function afficherPreExerciceContenus() {
        
                        afficherExerciceDeLaLigneEnCours();
                        afficherExerciceDeToutesLesLignesEtudiees();
                            
                        function afficherExerciceDeLaLigneEnCours() {
                        if(lesson_active == 'pre_exercice') {
                            setTimeout(function() { affichageAnimeDesTd($('#exercice_body td')); }, 300); 
                        }}
                        function afficherExerciceDeToutesLesLignesEtudiees() {
                        if(lesson_active == 'pre_revision') {
                            setTimeout(function() { affichageAnimeDesTr($('#exercice_body tr')); }, 300); 
                        }}
                    }
                    function gestionDeExerciceFootBtn() {

                        let pre_questions = [];
    
                        if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                        if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                        total_questions = pre_questions.length;

                        $('#exercice_repeter_question_btn').css('display','none');
                        $('#exercice_correction_btn').css('display','none');
                        $('#exercice_question_btn').css('display','block');
                        montrer($('#exercice_question_btn'));

                        $('#exercice_question_btn').click(function() { 
                            $('#exercice_question_btn').css('display','none');
                            $('#exercice_correction_btn').css('display','none');
                            setTimeout(() => { 
                                montrer($('#exercice_repeter_question_btn'));
                                $('#exercice_repeter_question_btn').css('display','block'); 
                            }, 150);
                        });

                        $('#exercice_body td').click(function() {
                        
                            if(pre_question === '') { return; }
                            $('#exercice_question_btn').css('display','none');
                            $('#exercice_repeter_question_btn').css('display','none');
                            setTimeout(() => { 
                                montrer($('#exercice_correction_btn'));
                                $('#exercice_correction_btn').css('display','block'); 
                            }, 150);
                        });

                        $('#exercice_correction_btn').click(function() { 
                            if(questions_posees.length <= total_questions) { 
                                $('#exercice_repeter_question_btn').css('display','none');
                                $('#exercice_correction_btn').css('display','none');
                                setTimeout(() => { 
                                    montrer($('#exercice_question_btn'));
                                    $('#exercice_question_btn').css('display','block'); 
                                }, 150);
                            }
                            if(questions_posees.length == total_questions) { 
                                $('#exercice_repeter_question_btn').css('display','none');
                                $('#exercice_correction_btn').css('display','none');
                                $('#exercice_question_btn').css('display','none'); 
                            }
                        });
                    }
                }

                function afficherEnteteDePreExerciceSyllabes() {}
                function afficherPiedDePreExerciceSyllabes() {
                    afficherPreRevisionBtn();
                }
                function afficherCorpsDePreExerciceSyllabes() {}

                function afficherEnteteDePreExerciceTons() {}
                function afficherPiedDePreExerciceTons() {}
                function afficherCorpsDePreExerciceTons() {}

                function afficherEnteteDePreExerciceChiffres() {}
                function afficherPiedDePreExerciceChiffres() {}
                function afficherCorpsDePreExerciceChiffres() {}
            }
            function exercicerAlphabet() {
    
                ecouterLaPreQuestion();
                repondreLaPreQuestion();
                corrigerLaPreQuestion();
            
    
                function ecouterLaPreQuestion() {

                    let pre_questions = [];
                    let total_questions = 0;
                    let i=0;

                    if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                    if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                    pre_questions = malaxer(pre_questions);
                    total_questions = pre_questions.length;
    
                    $('#exercice_question_btn').click(function() { 
                               
                        ordre_de_question = (total_questions == i+2) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                        $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                        $('#exercice_repeter_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(i+1)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯');
                        pre_question = pre_questions[i];
                        
    console.log(pre_question);
    
                        if(i < pre_questions.length) { 
                            lire('alphabet',pre_question); 
                            relire(pre_question); 
                            questions_posees.push(pre_question);
                        }

                        i++; 
                        if(i == pre_questions.length) { 
                            $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').off('click');
                            i = 0; 
                        }
    
                        function relire(pre_question) { $('#exercice_repeter_question_btn').click(function() { lire('alphabet',pre_question); }); }
                    });
                }
                function repondreLaPreQuestion() {
                    $.each($('#exercice_body td'), function() {
                        $(this).click(function(){
                            if(pre_question !== '') {
                                pre_reponse = this.innerHTML;
                
                                element_actif = $(this);
                                $(element_actif).css('background-color','#aaa').siblings().css('background-color','rgba(85,85,85,0.25)');
                                $('#exercice_body .table_parlante td').css('border','0.25rem solid transparent');
                                montrer($('#exercice_correction_btn'));
                            }
        
                            if(pre_question == '') { 
                                $('#exercice_question_btn').addClass('clignotant'); 
                                setTimeout(function() { $('#exercice_question_btn').removeClass('clignotant'); }, 1200);
                                return;
                            }
                        });
                    });
                }
                function corrigerLaPreQuestion() {

                    let pre_questions = [];
                    let total_questions = 0;

                    if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                    if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                    total_questions = pre_questions.length;

                    $('#exercice_correction_btn').click(function() { 
                        if(questions_posees.length <= total_questions) { 

                            $('#pre_exercice_container .table_parlante td').css('background-color','rgba(85,85,85,0.25)');
        
                            if(pre_question == '') { return false; }
        
                            if(pre_question == pre_reponse) { accorder(element_actif); }
                            if(pre_question != pre_reponse) { barrer(element_actif); }
        
                            montrer($('#exercice_question_btn')); 
                        } 
                    });
                }
            }
            function enregistrerPreExerciceAlphabet() {

                let pre_questions = [];
                let total_questions = 0;

                if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                total_questions = pre_questions.length;

                $('#exercice_correction_btn').click(function() {
                    let question_reponse = [];

                    if(questions_posees.length <= total_questions) {
                       
                        if(pre_question == '') { return false; }
            
                        point = (pre_question == pre_reponse) ? 1 : 0;
                        question_reponse = [pre_question,pre_reponse,point];
                        pre_exercice_memoire.push(question_reponse);
                        
                        if(pre_question == pre_reponse) { nbr_bonne_reponse++; point_total++; }
                        if(pre_question != pre_reponse) { nbr_mauvaise_reponse++; }

                        pre_question = '';
                        pre_reponse = ''; 
                    }
 
                    if(questions_posees.length == total_questions) {  

                        let n_q = total_questions;
                        let n_m_r = nbr_mauvaise_reponse;

                        taux_de_fausse_reponse = Math.ceil((n_m_r/n_q)*100);
                        if(lesson_active == 'pre_exercice') { taux_de_vraie_reponse =  100 - taux_de_fausse_reponse; }
                        if(lesson_active == 'pre_revision') { taux_de_vraie_reponse =  100 - taux_de_fausse_reponse; }
                    }
                });
            }
            function progressBarrPreExerciceAlphabet() {

                let pre_questions = [];
                let total_questions = 0;

                if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                total_questions = pre_questions.length;

                let pre_question_counter = 0;
                let bonne_reponse_counter = 0;
                let pre_exercice_width = total_questions;
                let diagramm_unity = 100/pre_exercice_width;

                $('.progress_bar').css('display','block');

                $('#exercice_correction_btn').click(function() { 
                    
                    pre_question_counter++;

                    if(point === 1) {
                        bonne_reponse_counter++;
                        $('.progress_bonne_reponse_bar').css('width',bonne_reponse_counter*diagramm_unity+'%');
                        $('.progress_mauvaise_reponse_bar').css('width',pre_question_counter*diagramm_unity+'%');
                    }
                    if(point === 0) {
                        $('.progress_mauvaise_reponse_bar').css('width',pre_question_counter*diagramm_unity+'%');
                    }

                    // Initialiser la barre de progression
                    if(pre_question_counter === total_questions) { 
                        setTimeout(() => { 
                            $('.progress_bar').css('display','none');
                            $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);
                            pre_question_counter = 0;
                            bonne_reponse_counter = 0;
                        }, 1000);
                    }
                });
            }
            function stockerPreExerciceAlphabet() {

                let pre_questions = [];
                let total_questions = 0;

                if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                total_questions = pre_questions.length;

                $('#exercice_correction_btn').click(function() { 
                    if(lesson_active == 'pre_exercice') {       
                        if(pre_exercice_memoire.length === total_questions) {
                            total_lettres_exercees = total_lettres_exercees.concat(pre_exercice_memoire);
                            if(total_lettres_exercees.length == 27) { 
                                sendLessonDataToDB('alphabet_exercice',total_lettres_exercees);
                                console.log('Lesson de pre_exercice envoyée à la base de donnée.');
                            }
                        } 
                    }

                    if(lesson_active == 'pre_revision') {       
                        if(pre_exercice_memoire.length === 27) {
                            sendLessonDataToDB('alphabet_evaluation',pre_exercice_memoire);
                            console.log('Lesson de pre_revision envoyée à la base de donnée.');
                        } 
                    } 
                });
            }
            function assistantPreExerciceAlphabet() {
                
                switch(niveau_actif) {
                    case 1 : assistantDePreExerciceAlphabet(); break;
                    case 2 : assistantDePreExerciceSyllabes(); break;
                    case 3 : assistantDePreExerciceTons(); break;
                    case 4 : assistantDePreExerciceChiffres(); break;
                }


                function assistantDePreExerciceAlphabet() {

                    $('#pre_evaluation_bouton').click(function() {
                        let notification = "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߠߎ߬ ߟߋ߬ ߓߍ߯ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫";
                        
                        setTimeout(() => {
                            ecrire('notification_corps',notification);
                        }, 1000);
                    });
                    
                    $('#exercice_correction_btn').click(function() {

                        if(lesson_active == 'pre_exercice') {
                        if(questions_posees.length == exercice_pre_questions.length) {
                            if(taux_de_vraie_reponse == 100) {
                                let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                ecrire('notification_corps',notification);
                            }
                            if(taux_de_vraie_reponse < 100) {
                                let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                ecrire('notification_corps',notification);
                            }
                        }}
                        
                        if(lesson_active == 'pre_revision') {
                        if(questions_posees.length == exercice_pre_questions.length) {
                            if(taux_de_vraie_reponse == 100) {
                                ecrire('notification_corps','\
                                    '+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߊ߬ߣߍ߲߬\n\
                                    ߞߎߘߎ߲߫ ߁߭ ߤߊ߲߯ ߞߎߘߎ߲߫ '+cercle_actif.html()+' ߠߎ߬ ߓߍ߯ ߓߘߊ߫ ߢߊߦߋ߫ ߌ ߓߟߏ߫\n\
                                    ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߋ߲߰.\n\
                                    ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹\n\
                                    ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)\
                                ');
                            }
                            if(taux_de_vraie_reponse < 100) {
                                ecrire('notification_corps','\
                                    '+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߡߊ߫ ߢߊ߬\n\
                                    ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߌ߲߬ ߘߐ߫.\n\
                                    ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹\n\
                                    ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)\
                                ');
                            }
                        }}
                    });
                }
                function assistantDePreExerciceSyllabes() {

                    ecrire("notification_corps"," \
                        ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬. \
                    ");

                    $('#afficheur_de_panneau').click(function() {
                        ecrire("notification_corps"," \
                            ߛߌ߬ߙߕߊ߬ ߞߋߟߋ߲߫ ߥߟߊ ߛߌߦߊߡߊ߲߫ ߛߎߥߊ߲ߘߌ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰. \
                        ");
                    }); 

                    montrer($('#afficheur_de_panneau'));
                }
                function assistantDePreExerciceTons() {}
                function assistantDePreExerciceChiffres() {}
            }
            function finDePreExerciceAlphabet() {

                fermerPreExercice();
                preExerciceResultat();
                
                $('#exercice_correction_btn').click(function() {
                    if(questions_posees.length === total_questions) {
                        if(lesson_active == 'pre_exercice') {
                            if(taux_de_vraie_reponse < 100) { reprendreExercicePreAlphabet(); }
                            if(taux_de_vraie_reponse == 100) { continuSurRevisionPreAlphabet(); reprendreExercicePreAlphabet(); }
                        }
                        setTimeout(() => { masquer($('#pre_exercice')); }, 1500);
                        if(lesson_active == 'pre_revision') {
                            if(taux_de_vraie_reponse < 92) { reprendreRevisionPreAlphabet(); }
                            if(taux_de_vraie_reponse >= 92) { continuSurApprendrePreAlphabet(); reprendreRevisionPreAlphabet(); }
                        }
                    }
                });
                
                
                function fermerPreExercice() {
                    $('#apprentissage .fermeture_pre').one('click',function(){    

                        let lesson_a_fermer = '';
    
                        if(lesson_active == 'pre_exercice') { lesson_a_fermer = $('#pre_exercice'); }
                        if(lesson_active == 'pre_revision') { lesson_a_fermer = $('#pre_revision'); }
                                            
                        cercle_id = $('.apprentissage_en_cours').attr('id');
                        exercice_btn_id = $('.exercice_en_cours').attr('id');
    
                        zoomDown(lesson_a_fermer);
                        setTimeout(() => {
                            $('#exercice_body').css('display','none');
                             $('#pre_exercice_resultat').css('top','-100%');
                        }, 250);
    
                        setTimeout(() => {
                           
                            if(lesson_active == 'pre_exercice') { 
                                if(taux_de_vraie_reponse < 100) {
                                    $('#pre_exercice_bouton').text('ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯'); 
                                    afficherPreExerciceBtns();
                                }
                                if(taux_de_vraie_reponse == 100) {
                                    afficherPreRevisionBtn();
                                    $('#pre_exercice_bouton').removeClass('exercice_en_cours').addClass('carre_depasse').css('z-index',0);
                                }
                            }
                        
                            if(lesson_active == 'pre_revision') { 
                                
                                if(taux_de_vraie_reponse < 100) {
                                    afficherPreRevisionBtn();
                                    $('#pre_evaluation_bouton').text('ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                                }
                                if(taux_de_vraie_reponse == 100) {
                                    afficherPreApprentissageBtns();
                                    $('#'+cercle_id).removeClass('apprentissage_en_cours').addClass('cercle_depasse');
                                    montrer($('#'+cercle_id).next()); 
                                    
                                    ecrire('notification_corps','ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߌ߲߯ ߘߎ߭ߡߊ߬');
                                }
                            }
                        }, 250);
                    });
                } 
                function preExerciceResultat() {

                    let pre_questions = [];
                    let total_questions = 0;
    
                    if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                    if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                    total_questions = pre_questions.length;
    

                    $('#exercice_correction_btn').click(function() {
                        if(questions_posees.length === total_questions) {

                            formatParDefautDuResultat();
                            chargerResultat(pre_exercice_memoire);
                            afficherExerciceAlphabetResultat();
                            masquerExerciceAlphabetResultat();


                            function afficherExerciceAlphabetResultat() {
                                goDown($('.resultat_container'));
                            }
                            function masquerExerciceAlphabetResultat() {
                                $('#apprentissage #fermer_resultat').click(function() {
                                    goUp($('.resultat_container'));
                                });
                            }
                        }
                    });
                }
                function reprendreExercicePreAlphabet() {
                    $('#reprendre').click(function() {
                        goUp($('.resultat_container'));
                        setTimeout(() => { $('#pre_exercice_bouton').click(); }, 400);
                    });
                }
                function continuSurRevisionPreAlphabet() {
                    $('#avance').click(function() {
                        cercle_index++;                           
                        goUp($('.resultat_container'));
                        setTimeout(() => { $('#pre_evaluation_bouton').click(); }, 400);
                    });
                }
                function reprendreRevisionPreAlphabet() {
                    $('#reprendre').click(function() {
                        goUp($('.resultat_container'));
                        setTimeout(() => { $('#pre_evaluation_bouton').click(); }, 400);
                    });
                }
                function continuSurApprendrePreAlphabet() {
                    $('#avance').click(function() {
                        cercle_index++;       
                        $('#fermeture_pre_evaluation').click();
                        setTimeout(() => { $('#cercles_des_partis_cadre span:nth-child('+cercle_index+')').click(); }, 400);
                        setTimeout(() => { goUp($('.resultat_container')); }, 500);
                    });
                }
            }
        }                         
        function initialiserLeResultat() { 

            questions_posees.splice(0,questions_posees.length); 
            pre_exercice_memoire.splice(0,pre_exercice_memoire.length); 
            nbr_bonne_reponse = 0;
            nbr_mauvaise_reponse = 0;
            taux_de_fausse_reponse = 0;
            taux_de_vraie_reponse = 0;
            taux_de_vraie_reponse = 0;
            point_total = 0;
                    
            $('#pre_exercice_resultat h3').html('ߞߎߘߎ߲߫ ߞߐߝߟߌ');
            $('#pre_exercice_resultat #resultat').html('');
            $('#pre_exercice_resultat #libelles').html('');
            $('#pre_exercice_resultat #diagram').html('');
            $('#pre_exercice_resultat #legende').html('');
        }
        function initialiserPreApprentissageClicksMemo() {
            for(var i=0; i<7; i++) {
                pre_apprentissage_clicks_memo.push(['','']);
            }
        }
    }
    function apprentissage() {
      
        raffraichissementDeLaPage();

        switch(niveau_actif) {
            case 1 : alphabet(); break;
            case 2 : syllabe(); break;
            case 3 : ton(); break;
            case 4 : chiffre(); break;
        }

        function alphabet() {

            apprendreAlphabet();
            exercerAlphabet();
            reviserAlphabet();
            // evaluerAlphabet();


            function apprendreAlphabet() {
         
                chargerApprentissageAlphabet();
                afficherApprentissageAlphabet();
                apprendreAlphabetNko();
                enregistrerApprentissageAlphabet();
                progressBarrApprentissageAlphabet();
                stockerApprentissageAlphabet();
                assistantApprentissageAlphabet();
                finDApprentissageAlphabet();
    
                raffraichissementDeLaPage();
    
                    
                function chargerApprentissageAlphabet() {
                    // Voir fonctions chargerLesson() / chargementDeLesson() dans parametrageDeLesson.js
                }
                function afficherApprentissageAlphabet() {
    
                    choixDeProcedure(); 
                    
                    afficherEnteteDeAlphabet();
                    afficherFootDeAlphabet();
                    afficherCorpsDeAlphabet();
                            
                    function afficherEnteteDeAlphabet() {}
                    function afficherFootDeAlphabet() {
                        
                        zoomDown($('.dialogue_btn')); 
    
                        $('#panneaux_de_consonnes_btn').css('display','none'); 
                        $('.media').css({'display':'none', 'opacity':0});
                        $('.parametre').css({'display':'none', 'opacity':0});
                        $('.lesson_suivante').css({'display':'block', 'opacity':1});
    
                    }
                    function afficherCorpsDeAlphabet() {}
                }
                function apprendreAlphabetNko() {
                    lecturePersonnalisee();    // Voir fonctions.js
                }
                function enregistrerApprentissageAlphabet() {
                    
                    nbr_td_par_table = Math.ceil(nbr_td/nbr_table);
                    nbr_td_par_tr = Math.ceil(nbr_td/nbr_tr);
                    memoriserApprentissageAlphabet();
                    
                    function memoriserApprentissageAlphabet() {
    
                        $.each(td, function(){   
                        /* 
                        --------------------------------------------------------------------------------------------------------
                        Pour chaque click sur un bouton:
                            1)- Un compteur de click individuel est activé qui calcule combien de fois chaque bouton est clické.
                            2)- Une identification est faite pour savoir, quel bouton est clické.
                            3)- Un enregistrement capte le nombre de click pour chaque bouton.
                            4)- Et le memo de l'enregistrement est envoyé au serveur quand on ferme la leçon.
                        --------------------------------------------------------------------------------------------------------
                        */
                            var element        = $(this).html();
                            var table_courante = $(this).parent().parent().parent();
                            var tr_index       = $(this).parent().index();
                            var table_index    = table.index(table_courante);
                            var element_index  = table_index*nbr_td_par_table + tr_index*nbr_td_par_tr + $(this).index();
                            var element_click_counter = 0;
                            var point = 0;
    
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
                            apprentissage_clicks_memo[element_index] = [element,element_click_counter,point];
    
                            $(this).on('click', function(){
                                
                            /*--------------------------------------------------------------------
                            3)- Enregistrement des clicks 
                            
                            L'enregistrement par bouton ou élémentaire est un tableau de trois éléments dont
                            - L'élément clické;
                            - Le nombre de fois que cet élément est  clické. 
                            - Le point.
    
                            --------------------------------------------------------------------*/
                                                            
                                var clicked_element = $(this).html(); // Élément clické.
                                element_click_counter++; // Compteur de click specifique pour chaque élément.
    
                            /*Quand un élément est cliqué au moins 5 fois, il est considéré comme étant suffisemment appris.
                            *Il est noté par 1 et cette note est enregitrée dans  la varible new_mark. */ 
                                var new_mark = (element_click_counter >= nbr_raisonnable_de_click) ? 1 : 0;
                    
                            /*A chaque élément correspond un tableau (new_click_value) de 3 composants dont l'élément cliqué, le nombre de click de
                            *cet élément et le point new_mark. Ce tableau est régulièrement actualisé à chaque click */ 
                                var new_click_value = [clicked_element,element_click_counter,new_mark];  // Enregistrement elementaire.
                    
                            /*Actualisation de mémoire d'enregistrement
                                C'est à dire qu'après chaque click,les anciennes valeurs de chaque enregistrement elementaire sont remplacés par les nouvelles valeurs.                 */
                                
                                apprentissage_clicks_memo.splice(element_index,1,new_click_value);
                                clicked_elements_quantity = clickedElementsQuantity();
    
                                function clickedElementsQuantity() {
                                    var qtity = [];
                                    $.each(apprentissage_clicks_memo, function(){ if($(this)[2]==1){ qtity++; }});
                                    return qtity;
                                }
                            });   
                        });
                    }
                }
                function progressBarrApprentissageAlphabet() {
                    
                    let total_click = nbr_raisonnable_de_click*nbr_td;
                    let barr_unity = 100/total_click;
                    let elements_clickes = [];
                    let click_counter = 0;
                    
                    $('.progress_bar').css('display','block');
    
                    $.each(td, function() {
                        let td_click_counter = 0;
    
                        $(this).css({'background-color':'rgba(85,85,85,1)', 'color':'yellow'});
                        $(this).click(function(){
                            td_click_counter++;
                            if(td_click_counter <= nbr_raisonnable_de_click) {
                                
                                click_counter++;
                                $('.progress_bonne_reponse_bar').css('width',click_counter*barr_unity+'%');
    
                                if(click_counter === total_click) {
                                    setTimeout(() => { $('.progress_bar').css('display','none'); }, 1000);
                                }
                            }
    
                            if(td_click_counter === nbr_raisonnable_de_click) { 
                                $(this).css({'background-color':'rgba(85,85,85,0.25)', 'color':'white'}); 
                            }
                        });
                    });
                        
                    initialiserApprentissageAlphabetProgressBarr();
    
    
                    function initialiserApprentissageAlphabetProgressBarr() {
                        $('.parametres_popup td').on('click', function() {  
                            
                            var nbr_td = JSON.parse(sessionStorage.getItem("nbr_td"));    // Voir parametres.js fonction lettresCochees()
                            var nbr_click = nbr_td;
                            elements_clickes = [];
                            progress_unity = 0;
    
                            $('.progress_bonne_reponse_bar').css('width', progress_unity+'px');
                            progression(nbr_click);
                        });
                    }
                    function progression(nbr_click) {
                        var progress_unity = $('.progress_bar').width()/nbr_click;
                        
                        $('.table_parlante td').on('click', function() {
                            if(elements_clickes.indexOf($(this).html()) == -1) $('.progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                            elements_clickes.push($(this).html());
                        });
                    }
                }
                function stockerApprentissageAlphabet() {
                    $('#table_alphabet_apprentissage td').click(function(){
                        if(clicked_elements_quantity === apprentissage_clicks_memo.length) {
    
                            let moyenne_d_apprentissage = 100; 
                            let index_phase_active = $('.phases_container ul li .active').index();
                            let note = noterApprentissageAlphabet();
        
                            if(note <  moyenne_d_apprentissage) alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
                            if(note >= moyenne_d_apprentissage) {
                                sendLessonDataToDB('alphabet_apprentissage',apprentissage_clicks_memo);
                                changerPhaseActive(index_phase_active);
                                console.log('Les données de exercice sont envoyées à la base de données');
                            }
    
                            function noterApprentissageAlphabet() {
                                var note = 0;
                                for(var i=0;i<apprentissage_clicks_memo.length;i++) if(apprentissage_clicks_memo[i] !== undefined) if(apprentissage_clicks_memo[i][2] == 1) note++;
                                note = (note*100)/apprentissage_clicks_memo.length;
                                return note;
                            }
                        }
                    });
                } 
                function assistantApprentissageAlphabet() {
                    
                    let total_click = nbr_raisonnable_de_click*nbr_td;
                    let click_counter = 0;
    
                    $('.notification_titre').text(liste_de_matieres[0][1]+' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
    
                    ecrire('notification_corps','\
                        ߛߓߍߘߋ߲ ߠߎ߬ ߓߍ߯ ߘߌ߲߯ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߊ߬ ߣߴߌ ߦߴߌ ߖߊ߲߬ߕߏ߬ ߊ߬ߟߎ߬ ߝߐߢߊ ߘߐ߫ ߞߏߛߓߍ߫߹<br>\
                        ߌ ߣߊ߬ߕߐ߫ ߟߋ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ ߟߴߊ߬ߟߎ߬ ߓߍ߯ ߡߊ߬.\
                    ');
    
                    $.each(td, function() {
                        $(this).click(function(){
                            
                            click_counter++;
    
                            if(click_counter === total_click) {
                                ecrire('notification_corps','\
                                    ߌ ߞߎߟߎ߲ߖߋ߫ ߘߐ߬ߖߊ ߟߊ߫ ߛߓߍߘߋ߲ ߠߎ߫ ߘߋ߲߱ ߠߊ߫<br>\
                                    ߣߴߌ ߓߘߴߊ߬ߟߎ߬ ߟߐ߲߫߸ ߓߐߟߌ߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫ ߛߊ߲ߝߍ߬ ߣߎߡߊ߲߫ ߓߟߏ ߟߊ߫)<br>\
                                    ߣߴߌ ߘߏ߲߬ ߡߊ߫ ߓߊ߲߫ ߊ߬ߟߎ߬ ߟߐ߲߫ ߠߊ߫߸ ߒ߬ߓߊ߬ ߥߊ߫ ߘߋ߲߰ߠߌ ߡߊ߫ ߤߊ߲߯ ߌ ߦߴߊ߬ߟߎ߬ ߟߐ߲߫ ߞߊ߬ ߣߊ߬ߕߏ߫ ߓߐ߫ ߟߊ߫.\
                                ');
    
                                // zoomUp($('.dialogue_btn'));
                                setTimeout(() => { montrer($('#fermer_apprentissage')); }, 2000);
                            }
                        });
                    });
                }
                function finDApprentissageAlphabet() {
                    $('#table_alphabet_apprentissage td').click(function(){
                        if(clicked_elements_quantity === apprentissage_clicks_memo.length) {
                            resultatApprentissageAlphabet();
                            afficherBoutonDeRedirection();
                            reprendreApprentissageAlphabet();
                            continuSurExerciceAlphabet();
                        }
                    });
    
    
                    function resultatApprentissageAlphabet() {
    
                        chargerResultat(apprentissage_clicks_memo);
                        adapterLeResultatAuFormatDApprentissage(apprentissage_clicks_memo);
                        afficherApprentissageResultat();
                        masquerApprentissageResultat();
    
                        
                        function afficherApprentissageResultat() { goDown($('.resultat_container')); }
                        function masquerApprentissageResultat() {  
                            $('#fermer_resultat, #avance').click(function() {
                                $('.resultat_container').css('display','none');
                                formatParDefautDuResultat();
                            });
                        }
                    }
                    function reprendreApprentissageAlphabet() {
                        $('#reprendre').click(function() {
                            
                            goUp($('.resultat_container'));
    
                            setTimeout(() => { 
                                cercle_actif.click(); 
                                viderLeTableau(apprentissage_clicks_memo);
                            }, 400);
                        });
                    }
                    function afficherBoutonDeRedirection() {
                        td.click(() => {
                            if(clicked_elements_quantity === apprentissage_clicks_memo.length) { zoomUp($('.dialogue_btn')); }
                        });
                    }
                    function continuSurExerciceAlphabet() {
                        $('#avance').click(function() {
                            $('#apprentissage, #envelope').css('display','none');
                            afficher($('#exercice'));
                            exercices();
                        });
                    }
                }

            }    
            function exercerAlphabet() {
                $('#alphabet_exercice').click(function() {
     alert('ok');               
                    var lesson_active = 'exercice';
                    sessionStorage.setItem('lesson_active', JSON.stringify(lesson_active));
                    let phase_id = JSON.parse(sessionStorage.getItem('phase_id'));
                    var nbr_de_questionnaires = 20;
                    var exercice_questions = [];
                    var moyenne_d_exercice = 18;
                    var note = 0;
                
                    var question_posee = '', reponse_montree = ''; 
                    var compteur_de_question = 1;
                    var question_rang = '߭';
                    var exercice_a_stocker = [];
                
            
                    $('.fermeture').attr('id', 'fermer_exercice');
                    
                    reductionDesElementsDeExerciceCouranteA49(); // Réduction du nombre de questions à une quantité raisonable
                    chargerExerciceAlphabet();
                    afficheExerciceAlphabet();
                    exercerAlphabetNko();
                    enregistrerExerciceAlphabet();
                    progressBarrExerciceAlphabet();
                    stockerExerciceAlphabet();
                    assistantExerciceAlphabet();
                    finDExercice();
            
            
                    function reductionDesElementsDeExerciceCouranteA49() {
                
                        if($('#exercice .table_muette tr').length >= 6) {
                            for( var i = $('#exercice .table_muette tr').length-1; i > 6; i--) {
                                document.querySelector('#exercice .table_muette').deleteRow(i);
                            }
                            $.each($('#exercice .table_muette tr td'), function() {
                                exercice_questions.push($(this).html());
                            });
                        }
                        if($('#exercice .table_muette tr').length < 6) {
                            $.each($('#exercice .table_muette tr td'), function() {
                                exercice_questions.push($(this).html());
                            });
                        }            
                        
                        exercice_questions = malaxer(exercice_questions);
                    }
                    function chargerExerciceAlphabet() {
                        // Voir fonctions chargerLesson() / chargementDeLesson() dans parametrageDeLesson.js
                    }
                    function afficheExerciceAlphabet() {
            
                        afficher($('#pre_exercice'));
                        actualiserDialogueBtn();
                        initialiserProgressBar();
                        zoomDown($('#exercice_dialogue_btn'));
            
                        $('#exercice .progress_bar').css({'display':'none', 'z-index':0});
                        $('#exercice_dialogue_btn').css({'display':'block', 'z-index':1, 'background-color':'transparent'});
                        $('#exercice_dialogue_btn > div:nth-child(1)').css('display','block');
                        $('#exercice_dialogue_btn > div:nth-child(2)').css('display','none');
                        $('.resultat_container').css('display','none');
                    
                        setTimeout(() => { zoomUp($('#exercice_dialogue_btn')); }, 600);
            
            
            
                        // gestionDeExerciceDialogueBtns();
            
                        function actualiserDialogueBtn(){ 
                            $('.qtite_question').html(parseIntNko(nbr_de_questionnaires));
                            $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
                        }
                    }
                    function exercerAlphabetNko() {
                        
                        var i=0;
            
                        poserExerciceAlphabetQuestion();
                        repeterExerciceAlphabetQuestion();
                        repondreExerciceAlphabetQuestion();
                        
                        function poserExerciceAlphabetQuestion(){
                            montrer($('#exercice_dialogue_btn'));
                            $('.play_icon_container').on('click',function() {
                    
                                zoomDown($('#exercice_dialogue_btn'));
                                setTimeout(() => { zoomUp($('#exercice_dialogue_btn')); }, 200);
                    
                            
                                $('#question_rang').html(parseIntNko(compteur_de_question)+question_rang);
            
                                compteur_de_question++;
                                question_rang = '߲';
            
                                $('.ecouter_question').html(' ߠߊߡߍ߲߫');
                                $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
                                question_posee = exercice_questions[i];
                
                                $(this).css('display','none');
                                $('.oreille_icon_container').css('display','block');
                                
                                lireQuestion();
                                i++;
                                
                                function lireQuestion() { lire('alphabet',question_posee); }
                            });
                        }
                        function repeterExerciceAlphabetQuestion(){ 
                            $('.oreille_icon_container').on('click', function() { lire('alphabet',question_posee); }); 
                        }
                        function repondreExerciceAlphabetQuestion(){
                                    
                            $.each($('#exercice .table_muette td'), function() {
                                let td = $(this);
                                td.click(function() {
                                    if(question_posee == '') { rappel($('#exercice_dialogue_btn')); return; }
                                    if(question_posee != '') {
                                        zoomDown($('#exercice_dialogue_btn'));
                                        setTimeout(() => { zoomUp($('#exercice_dialogue_btn')); }, 200);
                                        
                                        let td = $(this);
                                        let bonne_reponse = question_posee;
            
                                        reponse_montree = td.text();
                                        point = (question_posee == reponse_montree) ? 1 : 0;
                                                            
                                        if(question_posee != reponse_montree){ barrer(td); clignotage(bonne_reponse); }
                                        if(question_posee == reponse_montree){ valider(td); }
                                        initialiserExerciceDialogueBtn();
                                    }
                                        
                                });
                                
                            });
                        }
                    }
                    function enregistrerExerciceAlphabet() {
                        var td = $('#exercice .table_muette td');
                        var exercice_counter = 0;
            
                        initialiserExerciceAStocker();
                        actualiserExerciceAStocker();
                        
                        function initialiserExerciceAStocker() {
                            for(var i=0;i<nbr_de_questionnaires;i++){
                                            
                                var q = exercice_questions[i];
                                var r = '';
                                var p = parseIntNko(0);
                                            
                                exercice_a_stocker[i] = [q,r,p];
                            }
                        }
                        function actualiserExerciceAStocker() {
                            $.each(td, function(){
                                $(this).on('click', function(){
                                    if(question_posee == '') return;       
                                    if(question_posee != '') {       
                                        var question_reponse = [question_posee,reponse_montree,point];
                                        exercice_a_stocker.splice(exercice_counter,1,question_reponse);
                                        exercice_counter++;
                                    }
                                });
                            });
                        }
                    }
                    function progressBarrExerciceAlphabet() {
            
                        let good_response_counter = 0;
                        let progress_unity = 100/nbr_de_questionnaires;
            
                        $('#exercice .table_muette td').one('click', function(){
                                
                            if(question_posee == '') return;
                            if(question_posee != '') {
                                actualiserLessonProgressBar();
                                
                                function actualiserLessonProgressBar(){
                                    let bar_width = (compteur_de_question - 1)*progress_unity;
                                    $('.progress_mauvaise_reponse_bar_integre').css('width', bar_width+'%');
                                    if(question_posee == reponse_montree) { 
                                        good_response_counter++;
                                        let good_response_width = good_response_counter*progress_unity;
                                        $('.progress_bonne_reponse_bar_integre').css('width', good_response_width+'%');
                                    }
            
                                    question_posee = ''; //Vider la variable question_posee après son utilisation.
                                }
                            }
                        });
                    }
                    function stockerExerciceAlphabet() {  
                        $('#exercice .table_muette td').on('click', function() {
                            if(compteur_de_question - 1 == nbr_de_questionnaires){
                                let index_phase_active = $('#'+phase_id).index();
                                
                                note = noterExercice();
                    
                                if(note <  moyenne_d_exercice) alert( "ߌ ߟߊ߫ ߓߍ߬ߙߍ߫ ߛߐ߬ߘߐ߲߬ߣߍ߲ ߡߎ߬ߡߍ ߦߋ߫ "+parseIntNko(note)+" ߟߋ߬ ߘߌ߫\n ߊ߬ ߡߊ߫ "+parseIntNko(moyenne_d_exercice)+" ߖߘߍ߬ ߓߐ߫ \n\n ߏ߬ߘߐ߬ ߛߍ߬ߦߌ߬ ߦߙߐ ߢߌ߲߬ ߡߊ߫." ); 
                                if(note >= moyenne_d_exercice) { 
                                    sendLessonDataToDB(phase_id,exercice_a_stocker); 
                                    changerPhaseActive(index_phase_active); 
                                    initialiserProgressBarr();
                                    console.log("Les données de exercice_alphabet sont envoyées à la base de données");
                                }
                            
                                function noterExercice() {
                                    var note_d_exercice = 0;
                                    
                                    for (var i = 0; i < nbr_de_questionnaires; i++) {
                                    if(exercice_a_stocker[i] !== undefined) {
                                        if(exercice_a_stocker[i][2] == 1) {
                                            note_d_exercice ++;
                                        }
                                    }}
            
                                    var note = Math.floor((note_d_exercice*20)/nbr_de_questionnaires);
                                    return note;
                                }  
                            }
                        });
                    }
                    function assistantExerciceAlphabet() {
                        $('.notification_titre').text('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
                        setTimeout(() => {
                            ecrire('notification_corps','\
                                ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬߸ߦߋ߫ ߛߓߍߘߋ߲߫ ߟߊߡߍ߲ߣߍ߲ ߦߌ߬ߘߊ߬߸ ߤߊ߲߯ ߡߊ߬ߞߟߏ߬ߟߌ ߦߋ߫ ߓߊ߲߫.\
                            ');
                        }, 1000);
                        // if(compteur_de_question - 1 == nbr_de_questionnaires){ indexer($('#fermer_exercice')); }
                    }
                    function finDExercice() {
                        $('#exercice .table_muette td').on('click', function() {
                            // if(compteur_de_question - 1 == nbr_de_questionnaires){
                            if(compteur_de_question == 3){
            
                                $('#exercices_player').html('ߡߊ߬ߞߟߏ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
                                $('#exercices_player').off('click');
                                exerciceResultat();
                                repriseDeExercice();
                                passageAAlphabetEvaluation();
                                indexer($('#fermer_exercice'));
            
                                $('.resultat_container').css('display','block');
                                setTimeout(() => { masquer($('#exercice')); }, 200);
            
                                function exerciceResultat() {
            
                                    chargerResultat(exercice_a_stocker);
                                    afficherExerciceAlphabetResultat();
                                    masquerExerciceAlphabetResultat();
            
                                    
                                    function afficherExerciceAlphabetResultat() { 
                                        goDown($('.resultat_container')); 
                                        setTimeout(() => {
                                            masquer($('#exercice'));
                                            initialiserExerciceDialogueBtn();
                                            initialiserProgressBar();
                                        }, 200);
                                    }
                                    function masquerExerciceAlphabetResultat() {
                                        $('#exercice #fermer_resultat').click(function() {
                                            goUp($('.resultat_container'));
                                            setTimeout(() => { $('#envelope').css('display','none'); }, 200);
                                        });
                                    }
                                }
                                function repriseDeExercice() {
                                    $('#reprendre').click(function() {
                                        $('#envelope').css('display','none');
                                        $('#alphabet_exercice').click();
                                        // progressBarrExerciceAlphabet();
                                        // parametrageDeLesson();
                                        // afficher($('#exercice'));
                                        // exercerAlphabet();
                                    });
                                }
                                function passageAAlphabetEvaluation() {
                                    $('#avance').click(function() {
                                        $('#envelope').css('display','none');
                                        initialiserProgressBar();
                                        parametrageDeLesson();
                                        afficher($('#evaluation'));
                                        evaluations();
                                    });
                                }
                                }
                        });
                    }
                    function initialiserExerciceDialogueBtn() {
                        $('.oreille_icon_container').css('display','none');
                        $('.play_icon_container').css('display','block');
                    }
                });
            }
            function reviserAlphabet() {}
            function evaluerAlphabet() {

        alert('ok');  
                var matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom')); 
                var total_phase = $('.phases li').lenth;
                var questions_evaluation = JSON.parse(sessionStorage.getItem('questions'));
            
                var nbr_max_de_questions_a_poser = 20;
                var question_evaluation = '', questions_a_evaluer = [], reponse_evaluation = [];
                var note_d_evaluation = 0;
                var moyenne_d_evaluation = 1 ;
                var compteur = incrementer();
                var evaluation_counter = 0;
                let good_response_counter = 0;
                
                var memoire_rang = [];
                    
                var q_index = 0, q_rang = '߭';
                var q_ordre = parseIntNko(q_index+1);
                var evaluation_a_stocker = [];
            
                $('#pratique_options').css('display','none');
                $('.fermeture').attr('id', 'fermer_evaluation');      
            
                // chargerEvaluationAlphabet();
                afficheEvaluationAlphabet();
                evaluerAlphabet();
                // stockerEvaluationAlphabet();
                assistantEvaluationAlphabet();
                finDeEvaluationAlphabet();
                initialiserEvaluation();
            
            
                function chargerEvaluationAlphabet() {
                    
                    var evaluation_tbody_default_message = 'ߞߘߐߓߐߟߌ ߞߐߝߟߌ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬.';
                    
                    initialisationDEvaluationEntete();
                    $('#evaluation_tbody').html("<p id='evaluation_tbody_default_content'>"+evaluation_tbody_default_message+"</p>");
            
            
                    function initialisationDEvaluationEntete(){
            
                        var q_total = parseIntNko(nbr_max_de_questions_a_poser);
                        var q_index = 0;
                        var q_ordre = parseIntNko(q_index+1);
                        var q_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                        var q_rang = '߭';
                        var q_actiom = 'ߟߊߡߍ߲߫';
                        
                        $('.question_label').html( q_label );
                        $('.question_total').html( q_total );
                        $('.question_ordre').html( q_ordre+q_rang );
                        $('.question_action').html( q_actiom );
                
                        $('.question_btn').css('display','block');
                        $('.repetition_btn').css('display','none');
                        $('.correction_btn').css('display','none');
                    }
                }
                function afficheEvaluationAlphabet() {}
                function evaluerAlphabet() {
                    
                    zoomUp($('#evaluation_dialogue_btn'));
                    poserQuestionEvaluation();
                    repeterQuestionEvaluation();
                    repondreEvaluation();
                    rectificationDEvaluation();
                    correctionEvaluation();
                    
                    
                    function poserQuestionEvaluation() {
                        $('.question_btn').on('click', function(){
                            effacerPrecedenteReponse();
                            question_evaluation = questions_evaluation[q_index]; 
                            
                            dicterLaQuestion();
                            $('#evaluation_cross').css('display','none');
                            $('#evaluation_cross').css('transform','scale(0.4)');
                            $('#evaluation_reponse_container').css({'top':0}); 
                            afficherTesteContainer(); 
                            // memoriserQuestionRang();
                
                            q_index = compteur();
                            q_ordre = parseIntNko(q_index+1);
                            q_rang = '߲';
                            
                            actualiserLesLibellesDeDialogueBtn();
                            
                            function effacerPrecedenteReponse() { $('#evaluation_reponse').html(''); }
                            function actualiserLesLibellesDeDialogueBtn(){
                                
                                $('.question_ordre').html(q_ordre+q_rang);
                                $('.question_action').html('ߠߊߡߍ߲߫');
                                
                                $('.question_btn').css('display','none');
                                $('.repetition_btn').css('display','block');
                                $('.correction_btn').css('display','none');
                            }
                            function dicterLaQuestion(){
                                lireLettre('alphabet',question_evaluation);
                            }
                            function afficherTesteContainer() { $('#teste_container').css({'top':'-6rem'}); }
                            function memoriserQuestionRang(){
                                memoire_rang[memoire_rang.length] = q_ordre+q_rang;
                                return memoire_rang;
                            }
                        });
                    }
                    function repeterQuestionEvaluation() {
                        $('.repetition_btn').on('click', function(){
                            lireLettre('alphabet',question_evaluation);
                        });
                    }
                    function repondreEvaluation() {
                        $('#clavier_nko td').on('click', function(){
                            
                            if(question_evaluation == '') rappel($('#evaluation_dialogue_btn'));
                            if(question_evaluation != '') {
                                
                                var caractere = $(this).text();
                                
                                reponse_evaluation.push(caractere);
                                $('#evaluation_reponse').html(reponse_evaluation.join(''));
                                afficherCorrectionButton();
                                
                                function afficherCorrectionButton(){
                                    $('.question_btn').css('display','none');
                                    $('.repetition_btn').css('display','none');
                                    $('.correction_btn').css('display','block');
                                }
                            }
                        });
                    }
                    function rectificationDEvaluation() {
                        $('#correcteur_d_evaluation').on('click',function() {
                            reponse_evaluation.pop();
                            $('#evaluation_reponse').html(reponse_evaluation.join(''));
                        });
                    }
                    function correctionEvaluation() {
                        
                        var evaluation_html = '';
                        $('.correction_btn').on('click', function(){
                            
                            corrigerEvaluation();
                            progressBarrEvaluationAlphabet();
                            effacerQuestions();
                            afficherQuestionButton();
                            finDEvaluation();
                            
                                                
                            function corrigerEvaluation(){
            
                                let q = question_evaluation;
                                let r = reponse_evaluation.join('');
                                let p = (q == r) ? 1:0;
                                let question_reponse = [q,r,p];
                                    
                                note_d_evaluation += p; 
                                
                                enregistrerExerciceAlphabet();
                                chargerInstantannementEvaluationTbody();
                                marquerReponseEvaluation();
                                effacerCheckMark(); 
                                masquerTesteContainer();
                                setTimeout(() => { defilementDuContenuVersLeHaut($('#evaluation_tbody')); }, 1200);
            
                                evaluation_counter++;
            
                                
                                function enregistrerExerciceAlphabet() { 
                                    evaluation_a_stocker.splice(evaluation_counter,1,question_reponse); 
                                }
                                function chargerInstantannementEvaluationTbody() {
            
                                    var n = parseIntNko(evaluation_counter);
                                    n = (n == '߁') ? n+'߭' : n+'߲';
                                    r = (q == r) ? r : "<del>"+r+"</del>";
            
                                    evaluation_html += '\
                                        <div>\
                                            <span>'+n+'</span>\
                                            <span>'+q+'</span>\
                                            <span>'+r+'</span>\
                                            <span>'+parseIntNko(p)+'</span>\
                                        </div>\
                                    ';
            
                                    $('#evaluation_tbody').html(evaluation_html);
                                    $('#evaluation_total_point').html(parseIntNko(note_d_evaluation));
                                    $('#evaluation_pourcentage_point').html('%'+parseIntNko(note_d_evaluation*100/nbr_max_de_questions_a_poser));
                                }                                    
                                function marquerReponseEvaluation() {    
                                    if(reponse_evaluation.join('') == question_evaluation) {
                                        
                                        $("#evaluation_reponse").html("<p id='bonne_reponse'>"+reponse_evaluation.join('')+"</p><div id='check_mark_container'> <p id='check_mark'></p> <p id='check_mark_cover'></p> </div>");
                                        $('#check_mark_container').css({'display':'inline-block', 'margin-right':'4px'});
                                        $('#check_mark_cover').css({'right':'0.25rem'});
                                        $('#check_mark').html("&#10003;"); 
                                        setTimeout(function(){ $('#check_mark_cover').css({'right':'2rem'}); },100);
                                        setTimeout(function(){ $('#check_mark_container').css({'display':'none'}); },1000);
                                    }else{
                                        $("#evaluation_reponse").html("<p id='mauvaise_reponse'>"+reponse_evaluation.join('')+"</p><p id='evaluation_cross'>&#10060;</p>");
                                        $('#evaluation_cross').css({'display':'block', 'right':reponse_evaluation.length/2+'rem', 'transform':'scale(0.5)', 'opacity':0});
                                        setTimeout(function(){ $('#evaluation_cross').css({'transform':'scale(1)', 'opacity':0.75}); }, 100);
                                    }
            
                                    setTimeout(() => {
                                        $('#evaluation_reponse p').html('');
                                    }, 2000);
                                } 
                                function effacerCheckMark() {
                                    setTimeout(function(){
                                        $('#check_mark').empty();
                                    }, 1000);
                                }
                                function masquerTesteContainer() { 
                                    setTimeout(() => { $('#teste_container').css({'top':0}); }, 1000); 
                                }
                            }
                            function progressBarrEvaluationAlphabet() {
                        
                                let progress_unity = 100/nbr_max_de_questions_a_poser;
                                        
                                if(question_evaluation == '') return;
                                if(question_evaluation != '') {
                                    actualiserLessonProgressBar();
                                    
                                    function actualiserLessonProgressBar(){
                                
                                        let bar_width = evaluation_counter*progress_unity;
            
                                        $('.progress_mauvaise_reponse_bar_integre').css('width', bar_width+'%');
                                        if(question_evaluation == reponse_evaluation) { 
                                            good_response_counter++;
                                            let good_response_width = good_response_counter*progress_unity;
                                            $('.progress_bonne_reponse_bar_integre').css('width', good_response_width+'%');
                                        }
                    
                                        question_evaluation = ''; //Vider la variable question_evaluation après son utilisation.
                                    }
                                }
                            }
                            function effacerQuestions() {
                                question_evaluation = '';
                                reponse_evaluation.splice(0,reponse_evaluation.length);
                                $('#reponse').html(reponse_evaluation);
                            }
                            function afficherQuestionButton(){
                                $('.correction_btn').css('display','none');
                                $('.question_btn').css('display','block');
                                $('.repetition_btn').css('display','none');
                            }
                            function finDEvaluation() {
                                if(q_index==nbr_max_de_questions_a_poser){
                                    $('.question_btn').off('click');
                                    $('.question_btn').html(matiere_nom+' ߞߘߐߓߐߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
                                }
                            }
                        });
                    }
                }
                function stockerEvaluationAlphabet() {
                    $('.correction_btn').on('click', function(){
                        let index_phase_active = $('.phases_container ul li .active').index();
                                    
                        if(evaluation_counter == nbr_max_de_questions_a_poser) {
                            if(note_d_evaluation <  moyenne_d_evaluation) alert( "ߛߍ߬ߦߵߊ߬ ߡߊ߬" ); 
                            if(note_d_evaluation >= moyenne_d_evaluation) {
                                // if(phase_class == "apprises") {alert("ߦߙߐ ߢߌ߲߬ ߞߍߣߍ߲߫ ߞߘߐ ߟߋ߬"); return false;}
                                
                                let phase_nbr = JSON.parse(sessionStorage.getItem('data_phase_nbr'));
                                sendLessonDataToDB('alphabet_evaluation',evaluation_a_stocker);
                                changerPhaseActive(index_phase_active);
                                sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr));
                                console.log('Les données de Alphabet_evaluation sont envoyées à la base de données.');
                                
                                
                                if(index_phase_active === total_phase) {
                                    sessionStorage.setItem('niveau_max',JSON.stringify(niveau_max+1));                                            
                                    sessionStorage.setItem('niveau_actif',JSON.stringify(niveau_max+2));
                                    sessionStorage.setItem('phase_nbr',JSON.stringify(0));
                                }
                            }
                        }
                    });
                    $('#fermer_evaluation').on('click', function() {
                        (location.replace("/kouroukan/php/programmes.php"))();
                    });
                }
                function assistantEvaluationAlphabet() {
                    $('.notification_titre').text('ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ');
                    setTimeout(() => {
                        ecrire('notification_corps','\
                            ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬߸ߦߋ߫ ߛߓߍߘߋ߲߫ ߟߊߡߍ߲ߣߍ߲ ߛߓߍ߫߸ ߤߊ߲߯ ߞߘߐߓߐߟߌ ߦߋ߫ ߓߊ߲߫.\
                        ');
                    }, 1000);
                }
                function finDeEvaluationAlphabet() {
                    $('.correction_btn').on('click', function(){
                        if(evaluation_counter == nbr_max_de_questions_a_poser) {
                            chargerResultat(evaluation_a_stocker);
                            afficherEvaluationAlphabetResultat();
                            reprendreEvaluationAlphabet();
                            continuSurSyllabe();
                            
                            function afficherEvaluationAlphabetResultat() {
                                goDown($('.resultat_container'));
                                setTimeout(() => { masquer($('#evaluation')); }, 1500);
                            }
                            function reprendreEvaluationAlphabet() {
                                $('#reprendre').click(function() {
                                    $('#envelope').css('display','none');
                                    goUp($('.resultat_container'));
                                    initialiserProgressBarIntegre();
                                    afficher($('#evaluation'));
                                    $('#alphabet_evaluation').click();
                                });
                            }
                            function continuSurSyllabe() {
                                $('#avance').html("<a href='http://localhost/kouroukan/php/programmes.php'>ߜߋ߲߭ ߥߟߊ߬ߘߊ ߕߊ߬ ߦߊ߲߬</a>");
                            }
                        }
                    });
                }
                    
                
                function initialiserEvaluation() {
                    for(var i = 0; i < 20; i++) questions_a_evaluer[i] = questions_evaluation[i];
                    for(var i=0;i<questions_a_evaluer.length;i++) {
                        var q = questions_a_evaluer[i], r = '', p = 0;
                        evaluation_a_stocker[i] = [q,r,p];
                    }
                }
            }
        }
        function syllabe() {
            
            chargerApprentissageSyllabe();
            afficherApprentissageSyllabe();
            lectureApprentissageSyllabe();
            enregistrerApprentissageSyllabe();
            progressBarrApprentissageSyllabe();
            stockerApprentissageSyllabe();
            assistantApprentissageSyllabe();
            finDApprentissageSyllabe();
            
            
            function chargerApprentissageSyllabe() {

                chargerEnteteDeSyllabe();
                chargerFootDeSyllabe();
                chargerCorpsDeSyllabe();

                function chargerEnteteDeSyllabe() {}
                function chargerFootDeSyllabe() {}
                function chargerCorpsDeSyllabe() {}
            } 
            function afficherApprentissageSyllabe() {
                
                choixDeProcedure(); 

                afficherEnteteDeSyllabe();
                afficherFootDeSyllabe();
                afficherCorpsDeSyllabe();
                        
                function afficherEnteteDeSyllabe() {}
                function afficherFootDeSyllabe() {}
                function afficherCorpsDeSyllabe() {}
            }
            function lectureApprentissageSyllabe() {}
            function enregistrerApprentissageSyllabe() {}
            function progressBarrApprentissageSyllabe() {}
            function stockerApprentissageSyllabe() {}
            function assistantApprentissageSyllabe() {}
            function finDApprentissageSyllabe() {}
        }
        function ton() {
           
            chargerApprentissageTon();
            afficherApprentissageTon();
            lectureApprentissageTon();
            enregistrerApprentissageTon();
            progressBarrApprentissageTon();
            stockerApprentissgeTon();
            assistantApprentissageTon();


            function chargerApprentissageTon() {

                chargerEnteteDeTon();
                chargerFootDeTon();
                chargerCorpsDeTon();
                
                function chargerEnteteDeTon() {}
                function chargerFootDeTon() {}
                function chargerCorpsDeTon() {}
            }
            function afficherApprentissageTon() {
                
                choixDeProcedure(); 
                
                afficherEnteteDeTon();
                afficherFootDeTon();
                afficherCorpsDeTon();
                        
                function afficherEnteteDeTon() {}
                function afficherFootDeTon() {}
                function afficherCorpsDeTon() {}
            }
            function lectureApprentissageTon() {}
            function enregistrerApprentissageTon() {}
            function progressBarrApprentissageTon() {}
            function stockerApprentissgeTon() {}
            function assistantApprentissageTon() {} 
        }
        function chiffre() {
            
            chargerApprentissageChiffre();
            afficherApprentissageChiffre();
            lectureApprentissageChiffre();
            enregistrerApprentissageChiffre();
            progressBarrApprentissageChiffre();
            stockerApprentissageChiffre();
            assistantApprentissageChiffre();


            
            function chargerApprentissageChiffre() {

                chargerEnteteDeChiffre();
                chargerFootDeChiffre();
                chargerCorpsDeChiffre();
                
                function chargerEnteteDeChiffre() {}
                function chargerFootDeChiffre() {}
                function chargerCorpsDeChiffre() {}
            }
            function afficherApprentissageChiffre() {
                
                choixDeProcedure(); 
                
                afficherEnteteDeChiffre();
                afficherFootDeChiffre();
                afficherCorpsDeChiffre();
                        
                function afficherEnteteDeChiffre() {}
                function afficherFootDeChiffre() {}
                function afficherCorpsDeChiffre() {}
            }
            function lectureApprentissageChiffre() {}
            function enregistrerApprentissageChiffre() {}
            function progressBarrApprentissageChiffre() {}
            function stockerApprentissageChiffre() {}
            function assistantApprentissageChiffre() {}
        }
    }
    function formatParDefautDuResultat() {

        $('#table_head tr:nth-child(2) td').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ');
        $('#table_head tr:nth-child(3) td').text('ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ');

        $.each($('#table_body tr:nth-child(3) td, #table_body tr:nth-child(4) td'), function() {
            $(this).html('');
        });

        $('#total_reponse').text('');
        $('#total_point_1').text('');

        $('#resultat_pied > div > div:nth-child(1) span:first-child').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߡߎ߬ߡߍ');
        $('#resultat_pied > div > div:nth-child(2) span:first-child').text('ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ߫ ߢߊ߬ߣߍ߲');
        $('#resultat_pied > div > div:nth-child(3)').css('display','block');

        $('#total_bonne_reponse').text('');
        $('#total_point_2').text('');
    }
    function adapterLeResultatAuFormatDApprentissage(table) {
           
        $('#table_head tr:nth-child(2) td').text('ߛߓߍߘߋ߲');
        $('#table_head tr:nth-child(3) td').text('ߘߌ߯ߟߌ');

        $.each($('#table_body tr:nth-child(3) td'), function() {
            $(this).html(parseIntNko($(this).html()));
        });

        $('#total_reponse').text(parseIntNko(totalDAppui()));
        $('#total_point_1').text(parseIntNko(totalApprentissagePoint()));

        $('#resultat_pied > div > div:nth-child(1) span:first-child').text('ߛߓߍߘߋ ߡߎ߬ߡߍ');
        $('#resultat_pied > div > div:nth-child(2) span:first-child').text('ߘߌ߯ߟߌ ߡߎ߬ߡߍ');
        $('#resultat_pied > div > div:nth-child(3)').css('display','none');

        $('#total_bonne_reponse').text(parseIntNko(totalDAppui()));
        $('#total_point_2').text(parseIntNko(totalApprentissagePoint()));
    

        function totalDAppui() {
            let ta = 0;
            for(let i=0; i<table.length; i++) {
                ta += table[i][1];
            }
            return ta;
        }
        function totalApprentissagePoint() {
            let tap = 0;
            for(let i=0; i<table.length; i++) {
                tap += table[i][2];
            }
            return tap;
        }
    }
    function afficherPreApprentissageBtns() {
        $('#panneaux_de_consonnes_btn').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');

        $('#redirection_btns').css('display','none');
        $('#pre_apprentissage_btns').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function afficherPreExerciceBtns() {  
        $('#apprentissage_dialogue_btn').css('display','none');
        $('#panneaux_de_consonnes_btn').css('display','block');

        $('#pre_apprentissage_btns').css('display','none');
        $('#redirection_btns').css('display','block');
   
        $('#pre_evaluation_bouton').css('display','none');
        $('#pre_exercice_bouton').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function afficherPreRevisionBtn() {
        $('#apprentissage_dialogue_btn').css('display','none');
        $('#panneaux_de_consonnes_btn').css('display','block');

        $('#pre_apprentissage_btns').css('display','none');
        $('#redirection_btns').css('display','block');
   
        $('#pre_exercice_bouton').css('display','none');
        $('#pre_evaluation_bouton').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function raffraichissementDeLaPage() {
        $('#fermer_pre_apprentissage, #fermer_apprentissage').on('click',function() { raffraichirLaPage(); });
    }
}