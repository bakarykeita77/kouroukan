// Cette fonction est utilisée dans lesson.js au niveau de la fonction dispenserLesson().
function apprentissages() {
        
       
    var nom = JSON.parse(sessionStorage.getItem('nom'));
    var prenom = JSON.parse(sessionStorage.getItem('prenom'));
    var id = JSON.parse(sessionStorage.getItem('id'));  
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    
    var table_id = $('.table_parlante').attr('id');
        
    var table = $('#'+table_id); 
    var tr = $('#'+table_id+' tr');
    var td = $('#'+table_id+' td');
    var nbr_table = table.length;
    var nbr_tr = tr.length;
    var nbr_td = td.length;

    var clicks_memo = [];
  

 // Nota Beni: Le chargement de Apprentissage se fait dans parametres.js par la fonction parametrage()/chargerLesson().
          
    $('#apprentissage_option_1').click(function(){
        $('.fermeture').attr('id', 'fermer_pre_apprentissage'); 
        preApprentissage(); 
    });
    $('#apprentissage_option_2').click(function(){ 
        $('.fermeture').attr('id', 'fermer_apprentissage'); 
        apprentissage();
    });
          
                    
 /*-----------------------------------------------------------------------------------------------------------------------------------*/

    function preApprentissage() {

        let lesson_active = '';
        let element_actif = '';
        let matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));

        let cercle_actif = '';
        let cercle_id = '';
        let cercle_index = 0;
        let exercice_btn_index = 0;
        let rang = '';

        let les_lettres_actives = [];
        let lettres_pre_apprises = [];

        let pre_questions = [];
        let ordre_de_question = '';
        let total_questions = '';
        let questions_posees = [];
        let pre_question = '', pre_reponse = '';
        let point = 0;
        let melange_des_lettres_actives = [];
        let melange_des_lettres_pre_apprises = [];
        let pre_exercice_memoire = [];
    
        let nbr_bonne_reponse = 0;
        let nbr_mauvaise_reponse = 0;
        let taux_de_fausse_reponse = 0;
        let taux_de_vraie_reponse_1 = 0;
        let taux_de_vraie_reponse_2 = 0;
        let taux = 0;
        let point_total = 0;
    
        let pre_apprentissage_memo = [];
        let pre_apprentissage_clicks_memo = [];
        let quantite_normale_de_click = 1;

        let panneau_status = "masque";
        let consonnes_choisies = [];
        let phase_d_etude = 'apprentissage';
/*-------------------------------------------------------------------------------------------------------------------*/ 

        
        switch(niveau_actif) {
            case 1 : preAlphabet(); break;
            case 2 : preSyllabe(); break;
            case 3 : preTon(); break;
            case 4 : preChiffre(); break;
        }

        $('#apprentissage_dialogue_btn').css({'display':'none', 'opacity':'0'}); 
        $('#pre_apprentissage_dialogue_btn').css('display','block');


        function preAlphabet() {

            preApprendreAlphabet();
            preExercerAlphabet();
            preReviserAlphabet();
            preEvaluerAlphabet();


            function preApprendreAlphabet() {
                    
                chargerPreApprendreAlphabet();
                afficherPreApprendreAlphabet();
                apprendrePreApprendreAlphabetNko();
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
                        var pre_exercice_btns_html = preExercicesBtnHTML();
                        var pre_apprentisssage_btn_html = "\
                            <div class='titre_de_parti'> ߞߎߘߎ߲</div> \
                            <div id='cercles_des_partis'>"+cercles_html+"</div> \
                        ";

                        $('#pre_apprentissage_btns').html(pre_apprentisssage_btn_html);
                        $('#pre_exercice_btns').html(pre_exercice_btns_html);

                        
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
                                <span class='pre_exercice_btn' id='pre_exercice_bouton'>ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</span>  \
                                <span class='pre_exercice_btn' id='pre_revision_bouton'>ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫</span>  \
                            ";
                            return html;
                        }
                    }
                    function chargerCorpsDePreeAlphabet() {
                        $('#apprentissage_body').html(preApprentissageCorpsHTML());  // Voir fonction preApprentissageCorpsHTML() dans fonctions.js
                    }
                }
                function afficherPreApprendreAlphabet() {

                    afficherLesson();
                    afficherPreApprentissagesBtns();

                    $('#cercles_des_partis_cadre span').click(function() {
                                    
                        lesson_active = 'pre_apprentissage';
                        cercle_actif = $(this);
                        cercle_index = $(this).index();
                        rang = cercle_actif.html();
                    
                        var index = cercle_index+1;
                        var pre_apprentissage_permission = '';


                        controleDuNiveau();
                        if(pre_apprentissage_permission == 'pre_lesson_non_permise') return false;
                        preLessonEntete1Style();
                        selectionDeLaLigneActive();
                        styleDeLaLigneActive();
                        traductionDeLaLigneActive();
                        affichageDePreApprentissageBtns();
                        zoomDown($('.dialogue_btn'));
                        
                        reInitialiserPreApprentissageClicksMemo();
                    

                        function controleDuNiveau() {
                            if(cercle_index > 0) {
                                pre_apprentissage_permission = (cercle_actif.prev().hasClass('cercle_depasse')) ? 'pre_lesson_permise' : 'pre_lesson_non_permise';
                            }
                        }
                        function preLessonEntete1Style() {
                            $('#pre_revision_bouton').removeClass('exercice_en_cours indicateur carre_depasse');
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
                                        afficherPreExerciceBtn(); 
                                    }
                                });
                            });
                            
                            $('#pre_exercice_bouton').click(function() { zoomDown($('.dialogue_btn')); });
                        }
                    });

                    setTimeout(function(){ indexer($('.cercle:nth-child(1)')); }, 1000);

                }
                function apprendrePreApprendreAlphabetNko() {

                    initialiserPreApprentissageClicksMemo();
                    $.each($('.pre_apprentissage_td'), function() {
                        let clicks_counter = 1;
                        $(this).click(()=>{

                            let clicked_letter = $(this).html();
                            let td_actif = $(this);
                            let td_index = $(this).index();
                            let click_count = clicks_counter++;


                            lectureDesLettresJaunes();
                            memorisationDePreApprentissage(); 

                        
                            function lectureDesLettresJaunes() {
                                if(lettres_pre_apprises.includes(clicked_letter)) { lire('alphabet',clicked_letter); }
                            }    
                            function memorisationDePreApprentissage() {
                                if(les_lettres_actives.includes(clicked_letter)) {
                                    pre_apprentissage_memo.push(clicked_letter);
                                    pre_apprentissage_clicks_memo.splice(td_index,1,[clicked_letter,click_count]);
                                }
                                if(click_count == quantite_normale_de_click) { td_actif.css('background-color','transparent'); }  
                            }
                        });
                    });
                }
                function enregistrerPreApprendreAlphabet() {
                    
                    $('#cercles_des_partis_cadre span').click(function() {

                        les_lettres_actives = lesLettresActives();
                        lettres_pre_apprises = lettresPreApprises();
                        lettres_pre_apprises = lettres_pre_apprises.concat(les_lettres_actives);

                        
                        function lesLettresActives() {
                            var les_lettres_actives = [];
                            for(var i=0; i<$('#tr_actif .pre_apprentissage_td').length; i++) {
                                let n = i+1;
                                les_lettres_actives.push($('#tr_actif .pre_apprentissage_td:nth-child('+n+')').html());
                            }
        
                            return les_lettres_actives;
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

                    $('.dialogue_btn').click(()=>{ zoomUp($('#apprentissage_progress_bar')); });

                    $.each($('.pre_apprentissage_td'), function() {

                        let td_click_counter = 0;

                        $(this).click(function() {

                            td_click_counter++;
                            if(td_click_counter <= quantite_normale_de_click) {

                                let total_click = quantite_normale_de_click*les_lettres_actives.length;
                                let diagramm_unity = 100/total_click;
                                let global_clicks_count = global_clicks_counter++;

                                apprentissage_width = global_clicks_count*diagramm_unity;
                                $('#apprentissage_progress_bar .progress_bonne_reponse_bar').css('width', apprentissage_width+'%');
                            
                            // Initialiser la barre de progression
                                if(global_clicks_count/quantite_normale_de_click == les_lettres_actives.length) { 
                                    setTimeout(() => {
                                        zoomDown($('#apprentissage_progress_bar')); 
                                        $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);                                    td_click_counter = 0;
                                        apprentissage_width = 0;
                                        global_clicks_counter = 1;
                                    }, 1000);
                                }
                            }
                        });
                        
                    });
                }
                function stockerPreApprendreAlphabet() {}
                function assistantPreApprendreAlphabet() {
                    
                    ecrire('notification_corps','ߞߏ߰ߙߌ߬ ߝߟߐߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬');
                        
                    $('#cercles_des_partis_cadre span').click(function() {
                        ecrire('notification_corps','\
                            ߛߓߍߘߋ߲߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߏ߫ ߌ ߞߣߐ߫.\
                        ');
                    });

                    $.each($('.pre_apprentissage_td'), function() {

                        $(this).click(function() {

                            preApprentissageNotifications();
                            indexerExerciceBtn();
                            
                            
                            function preApprentissageNotifications() {
                                let n = indice();

                                if(n == 7) {
                                
                                    ecrire('notification_corps','\
                                        ߣߌ߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߓߘߊ߫ ߟߐ߲߫ ߌ ߓߟߏ߫߸ ߢߊ߯ߡߌߟߊ߲ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫߹) ߞߊ߬ ߘߋ߲߬ߣߍ߲߬ ߞߎߘߊ ߟߎ߬ ߢߊ߯ߡߌ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߞߊ߲ߡߊ߬.\
                                    ');
                                }
                            }
                            function indexerExerciceBtn() {
                                let n = indice();

                                if(n == 7) { 
                                    afficherPreExerciceBtn();
                                    montrer($('#pre_exercice_bouton'));
                                }
                                
                                $('.cercle, #pre_revision_btn').click(()=>{ 
                                    $('#pre_revision_bouton').removeClass('indicateur'); 
                                    zoomDown($('.dialogue_btn'));
                                    reInitialiserPreApprentissageClicksMemo();
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
                function finDePreApprendreAlphabet() {}
            }
            function preExercerAlphabet() {
                $('#pre_exercice_bouton').click(function() {
                
                    lesson_active = 'pre_exercice';
                    let carre_actif = $(this);
                    
                    zoomDown($('.dialogue_btn'));
                    initialiserLeResultat();
                    exercice_btn_index = $(this).index();
                    exercice_btn_id = $(this).attr('id');
                    melange_des_lettres_actives = malaxer(les_lettres_actives);
                    pre_questions = malaxer(melange_des_lettres_actives);
                                
    
                    preExerciceEnteteStyle();
                    exercice();
    
    
                    function preExerciceEnteteStyle() {
                        $('#pre_revision_bouton').removeClass('exercice_en_cours');
                        carre_actif.addClass('exercice_en_cours');
                    }
                });
            }
            function preReviserAlphabet() {
                
                chargerPreReviserAlphabet();
                afficherPreReviserAlphabet();
                apprendrePreReviserAlphabetNko();
                enregistrerPreReviserAlphabet();
                progressBarrPreReviserAlphabet();
                stockerPreReviserAlphabet();
                assistantPreReviserAlphabet();
                finDePreReviserAlphabet();


                function chargerPreReviserAlphabet() {}
                function afficherPreReviserAlphabet() {}
                function apprendrePreReviserAlphabetNko() {}
                function enregistrerPreReviserAlphabet() {}
                function progressBarrPreReviserAlphabet() {}
                function stockerPreReviserAlphabet() {}
                function assistantPreReviserAlphabet() {}
                function finDePreReviserAlphabet() {}
            }
            function preEvaluerAlphabet() {
                
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

            chargerPreSyllabe();
            afficherPreSyllabe();
            apprendrePreAlpSyllabe();
            enregistrerPreSyllabe();
            progressBarrPreSyllabe();
            stockerPreSyllabe();
            assistantPreSyllabe();
            finDePreSyllabe();


            function chargerPreSyllabe() {

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
                        $('#pre_exercice_btns' ).html(pre_lesson_head_22_html);
                        
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
            function afficherPreSyllabe() {
                
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
            function apprendrePreAlpSyllabe() {
                
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
            function enregistrerPreSyllabe() {
                
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
            function progressBarrPreSyllabe() {}
            function stockerPreSyllabe() {}
            function assistantPreSyllabe() {
                
                ecrire("notification_corps","ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬.");

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
                            indexer($('#afficheur_de_panneau'));
                        }
                    }
                    if(panneau_status == "masque") {
                        if(consonnes_choisies.length != 0) {
                            ecrire("notification_corps","ߜߋ߲߭ ߢߌ߲߬ ߠߎ߫ ߞߋ߬ߟߋ߲߬ ߞߋ߬ߟߋ߲߬ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߴߌ ߞߣߐ߫.");
                        }
                    }
                });
            }
            function finDePreSyllabe() {}
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
/*-------------------------------------------------------------------------------------------------------------------*/ 
  
        preRevision();
        raffraichissementDeLaPage();

        
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
        function preRevision() {
            $('#pre_revision_bouton').click(function() { 
                
                lesson_active = 'pre_revision';
                let carre_actif = $(this);

                zoomDown($('.dialogue_btn'));
                initialiserLeResultat();
                exercice_btn_index = $(this).index();
                exercice_btn_id = $(this).attr('id');
                melange_des_lettres_pre_apprises = malaxer(lettres_pre_apprises);
                pre_questions = melange_des_lettres_pre_apprises;
                pre_questions = malaxer(pre_questions);

                preRevisionEnteteStyle();
                exercice();

                function preRevisionEnteteStyle() {
                    $('#pre_revision_bouton').removeClass('exercice_en_cours');
                    carre_actif.addClass('exercice_en_cours');
                }
            }); 
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
                    if(exercice_btn_index == 0) {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
                    }
                    if(exercice_btn_index == 1) {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߣߐ߰ߡߊ߬ߛߍߦߌ</h3>');
                    }
                }
                function chargerPiedDePreExerciceAlphabet() {

                    var pre_exercice_foot_html = '\
                        <div id="pre_foot_btns_container"> \
                            <div id="pre_exercice_foot_btns"> \
                                <div id="pre_question_btn">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+total_questions+' \\ ߁߭ ߟߊߡߍ߲߫</div> \
                                <div id="repeter_pre_question_btn"></div> \
                                <div id="pre_correction_btn">ߏ߬ ߛߊߞߍ߫</div> \
                            </div> \
                        </div> \
                    ';

                    total_questions = parseIntNko(pre_questions.length);
                    
                    $('#pre_exercice_foot').html(pre_exercice_foot_html);
                }
                function chargerCorpsDePreExerciceAlphabet() {
                    var pre_exercice_body_html = (exercice_btn_index == 0) ? lessonHTML(melange_des_lettres_actives, '') : lessonHTML(melange_des_lettres_pre_apprises, '');
                    $('#pre_exercice_body').html(pre_exercice_body_html);
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
                        $('#pre_exercice_cover').css({'display':'block'}); 
                        setTimeout(function() { zoomUp($('#pre_exercice')); }, 150); 
                    }
                    function afficherPreExerciceContenus() {
        
                        afficherExerciceDeLaLigneEnCours();
                        afficherExerciceDeToutesLesLignesEtudiees();
                            
                        function afficherExerciceDeLaLigneEnCours() {
                        if(exercice_btn_index == 0) {
                            setTimeout(function() { affichageAnimeDesTd($('#pre_exercice_body td')); }, 300); 
                        }}
                        function afficherExerciceDeToutesLesLignesEtudiees() {
                        if(exercice_btn_index == 1) {
                            setTimeout(function() { affichageAnimeDesTr($('#pre_exercice_body tr')); }, 300); 
                        }}
                    }
                    function gestionDeExerciceFootBtn() {

                        $('#repeter_pre_question_btn').css('display','none');
                        $('#pre_correction_btn').css('display','none');
                        $('#pre_question_btn').css('display','block');
                        montrer($('#pre_question_btn'));

                        $('#pre_question_btn').click(function() { 
                            $('#pre_question_btn').css('display','none');
                            $('#pre_correction_btn').css('display','none');
                            setTimeout(() => { 
                                montrer($('#repeter_pre_question_btn'));
                                $('#repeter_pre_question_btn').css('display','block'); 
                            }, 150);
                        });

                        $('#pre_exercice_body td').click(function() {
                            $('#pre_question_btn').css('display','none');
                            $('#repeter_pre_question_btn').css('display','none');
                            setTimeout(() => { 
                                montrer($('#pre_correction_btn'));
                                $('#pre_correction_btn').css('display','block'); 
                            }, 150);
                        });

                        $('#pre_correction_btn').click(function() { 
                            if(questions_posees.length <= pre_questions.length) { 
                                $('#repeter_pre_question_btn').css('display','none');
                                $('#pre_correction_btn').css('display','none');
                                setTimeout(() => { 
                                    montrer($('#pre_question_btn'));
                                    $('#pre_question_btn').css('display','block'); 
                                }, 150);
                            }
                        });

                        $('#pre_correction_btn').click(function() { 
                            if(questions_posees.length == pre_questions.length) { 
                                $('#repeter_pre_question_btn').css('display','none');
                                $('#pre_correction_btn').css('display','none');
                                $('#pre_question_btn').css('display','none'); 
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
    
                    let i=0;
    
                    $('#pre_question_btn').click(function() { 
                                                            
                        ordre_de_question = (total_questions == parseIntNko(i+2)) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                        $('#pre_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+total_questions+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                        $('#repeter_pre_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(i+1)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯');
                        pre_question = pre_questions[i];
                        
    console.log(pre_question);
    
                        if(i < pre_questions.length) { 
                            lire('alphabet',pre_question); 
                            relire(pre_question); 
                            questions_posees.push(pre_question);
                        }

                        i++; 
                        if(i == pre_questions.length) { 
                            $('#pre_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').off('click');
                            i = 0; 
                        }
    
                        function relire(question) { $('#repeter_pre_question_btn').click(function() { lire('alphabet',question); }); }
                    });
                }
                function repondreLaPreQuestion() {
                    $.each($('#pre_exercice_body td'), function() {
                        $(this).click(function(){
                            if(pre_question !== '') {
                                pre_reponse = this.innerHTML;
                
                                element_actif = $(this);
                                $(element_actif).css('background-color','#aaa').siblings().css('background-color','rgba(85,85,85,0.25)');
                                $('#pre_exercice_body .table_parlante td').css('border','0.25rem solid transparent');
                                montrer($('#pre_correction_btn'));
                            }
        
                            if(pre_question == '') { 
                                $('#pre_question_btn').addClass('clignotant'); 
                                setTimeout(function() { $('#pre_question_btn').removeClass('clignotant'); }, 1200);
                            }
                        });
                    });
                }
                function corrigerLaPreQuestion() {
                    $('#pre_correction_btn').click(function() { 
                        if(questions_posees.length <= pre_questions.length) { 

                            $('#pre_exercice_container .table_parlante td').css('background-color','rgba(85,85,85,0.25)');
        
                            if(pre_question == '') { return false; }
        
                            if(pre_question == pre_reponse) { accorder(element_actif); }
                            if(pre_question != pre_reponse) { barrer(element_actif); }
        
                            montrer($('#pre_question_btn')); 
                        } 
                    });
                }
            }
            function enregistrerPreExerciceAlphabet() {
                $('#pre_correction_btn').click(function() {
                    let question_reponse = [];

                    if(questions_posees.length <= pre_questions.length) {
                       
                        if(pre_question == '') { return false; }
            
                        point = (pre_question == pre_reponse) ? 1 : 0;
                        question_reponse = [pre_question,pre_reponse,point];
                        
                        if(pre_question == pre_reponse) { nbr_bonne_reponse++; point_total++; }
                        if(pre_question != pre_reponse) { nbr_mauvaise_reponse++; }

                        pre_exercice_memoire.push(question_reponse);
                        pre_question = '';
                        pre_reponse = ''; 
                    }
 
                    if(questions_posees.length == pre_questions.length) {  

                        let n_q = pre_questions.length;
                        let n_b_r = nbr_bonne_reponse;
                        let n_m_r = nbr_mauvaise_reponse;

                        taux_de_fausse_reponse = Math.ceil((n_m_r/n_q)*100);
                        if(exercice_btn_index == 0) { taux_de_vraie_reponse_1 =  100 - taux_de_fausse_reponse; }
                        if(exercice_btn_index == 1) { taux_de_vraie_reponse_2 =  100 - taux_de_fausse_reponse; }

                        taux = (exercice_btn_index == 0) ? taux_de_vraie_reponse_1 : taux_de_vraie_reponse_2;

                    }
                });
            }
            function progressBarrPreExerciceAlphabet() {
                
                let pre_question_counter = 0;
                let bonne_reponse_counter = 0;
                let pre_exercice_width = pre_questions.length;
                let diagramm_unity = 100/pre_exercice_width;

                zoomUp($('#apprentissage_progress_bar'));

                $('#pre_correction_btn').click(function() { 
                    
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
                    if(pre_question_counter === pre_questions.length) { 
                        setTimeout(() => { 
                            zoomDown($('#apprentissage_progress_bar')); 
                            $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);
                            pre_question_counter = 0;
                            bonne_reponse_counter = 0;
                        }, 1000);
                    }
                });
            }
            function stockerPreExerciceAlphabet() {
                $('#pre_correction_btn').click(function() { 
                    if(questions_posees.length == pre_questions.length) { 
                        if(lesson_active == 'pre_revision') {       

                            if(pre_exercice_memoire.length === 27) {
                                sendPreApprentissageToDB();
                                console.log('Lesson envoyée à la base de donnée.');
                            }

                            function sendPreApprentissageToDB() {
                                var matiere = JSON.parse(sessionStorage.getItem('matiere_active')); // Voir programmes.js fonction storagesDuProgramme()
                                var phase   = 'alphabet_apprentissage';
                                var lesson  = pre_exercice_memoire;
                                var note = 20;
                            
                                const apprentissage_data = new URLSearchParams({
                                    id     : id,
                                    matiere: matiere,
                                    niveau : niveau_actif,
                                    phase  : phase,
                                    lesson : lesson,
                                    note   : note
                                }); 

                                fetch("/kouroukan/php/actions.php", {
                                    method: "POST",
                                    body: apprentissage_data
                                })
                                .then(response => response.text())
                                .catch(error => console.log(error));  
                            }
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

                    $('#pre_revision_bouton').click(function() {
                        let notification = "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߠߎ߬ ߟߋ߬ ߓߍ߯ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫";
                        ecrire('notification_corps',notification);
                    });
                    
                    $('#pre_correction_btn').click(function() {

                        if(exercice_btn_index == 0) {
                        if(questions_posees.length == pre_questions.length) {
                            if(taux_de_vraie_reponse_1 == 100) {
                                let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                ecrire('notification_corps',notification);
                            }
                            if(taux_de_vraie_reponse_1 < 100) {
                                let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                ecrire('notification_corps',notification);
                            }
                        }}
                        
                        if(exercice_btn_index == 1) {
                        if(questions_posees.length == pre_questions.length) {
                            if(taux_de_vraie_reponse_2 == 100) {
                                ecrire('notification_corps','\
                                    '+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߊ߬ߣߍ߲߬\n\
                                    ߞߎߘߎ߲߫ ߁߭ ߤߊ߲߯ ߞߎߘߎ߲߫ '+cercle_actif.html()+' ߠߎ߬ ߓߍ߯ ߓߘߊ߫ ߢߊߦߋ߫ ߌ ߓߟߏ߫\n\
                                    ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߋ߲߰.\n\
                                    ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹\n\
                                    ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)\
                                ');
                            }
                            if(taux_de_vraie_reponse_2 < 100) {
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
                repriseDePreExercice();
                passageARevision();


                function fermerPreExercice() {
                    $('#apprentissage #fermeture_pre_exercice').one('click',function(){                                            
                        cercle_id = $('.apprentissage_en_cours').attr('id');
                        exercice_btn_id = $('.exercice_en_cours').attr('id');
    
                        zoomDown($('#pre_exercice'));
                        setTimeout(() => {
                            $('#pre_exercice_cover').css('display','none');
                             $('#pre_exercice_resultat').css('top','-100%');
                        }, 250);
    
                        setTimeout(() => {
                           
                            if(exercice_btn_index == 0) { 
                                if(taux_de_vraie_reponse_1 < 100) {
                                    $('#pre_exercice_bouton').text('ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯'); 
                                    afficherPreExerciceBtn();
                                }
                                if(taux_de_vraie_reponse_1 == 100) {
                                    afficherPreRevisionBtn();
                                    $('#pre_exercice_bouton').removeClass('exercice_en_cours').addClass('carre_depasse').css('z-index',0);
                                }
                            }
                        
                            if(exercice_btn_index == 1) { 
                                
                                if(taux_de_vraie_reponse_2 < 100) {
                                    afficherPreRevisionBtn();
                                    $('#pre_revision_bouton').text('ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                                }
                                if(taux_de_vraie_reponse_2 == 100) {
                                    afficherPreApprentissagesBtns();
                                    $('#'+cercle_id).removeClass('apprentissage_en_cours').addClass('cercle_depasse');
                                    indexer($('#'+cercle_id).next()); 
                                    
                                    ecrire('notification_corps','ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߌ߲߯ ߘߎ߭ߡߊ߬');
                                }
                            }
    
                            return;
                            
                        }, 250);
                    });
                } 
                function preExerciceResultat() {

                    $('#pre_correction_btn').click(function() {
                        if(questions_posees.length === pre_questions.length) {
                            chargerResultat(pre_exercice_memoire);
                            afficherExerciceAlphabetResultat();
                            masquerExerciceAlphabetResultat();
                        }
                    });

                    function afficherExerciceAlphabetResultat() {
                        comeDown($('#apprentissage .resultat_container'));
                    }
                    function masquerExerciceAlphabetResultat() {
                        $('#apprentissage #fermer_resultat').click(function() {
                            goUp($('#apprentissage .resultat_container'));
                        });
                    }
                }
                function repriseDePreExercice() {
                    $('#redirige_sur_alphabet_exercice').click(function() { $('#fermeture_pre_exercice').click(); }); 
                }
                function passageARevision() {}
            }
        }                          
        function initialiserLeResultat() { 

            questions_posees.splice(0,questions_posees.length); 
            pre_exercice_memoire.splice(0,pre_exercice_memoire.length); 
            nbr_bonne_reponse = 0;
            nbr_mauvaise_reponse = 0;
            taux_de_fausse_reponse = 0;
            taux = 0;
            taux_de_vraie_reponse_1 = 0;
            taux_de_vraie_reponse_2 = 0;
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
        function reInitialiserPreApprentissageClicksMemo() { 
            pre_apprentissage_clicks_memo.splice(0,pre_apprentissage_clicks_memo.length); 
        }
    }
    function apprentissage() {
        
        switch(niveau_actif) {
            case 1 : apprentissageAlphabet(); break;
            case 2 : apprentissageSyllabe(); break;
            case 3 : apprentissageTon(); break;
            case 4 : apprentissageChiffre(); break;
        }
         
        $('#pre_apprentissage_dialogue_btn').css('display','none'); 
        $('#apprentissage_dialogue_btn').css({'display':'block', 'opacity':'1'}); 


        function apprentissageAlphabet() {

            let nbr_raisonnable_de_click = 1;

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

                afficherLesson(); 
                
                afficherEnteteDeAlphabet();
                afficherFootDeAlphabet();
                afficherCorpsDeAlphabet();
                        
                function afficherEnteteDeAlphabet() {}
                function afficherFootDeAlphabet() {}
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
                        Il contient des petits tableaux de deux éléments chacun:
                        - Le premier est le nom de l'élément clické;
                        - Le deuxième est le nombre de fois que cet élément est clické.
                        
                        L'initialisation consiste à donner la valeur 0 click à tous les éléments.
                        On considère qu'aucun élément n'est clické pour le moment. 
                    --------------------------------------------------------------------------------------------------------
                    */
                        clicks_memo[element_index] = [element,parseIntNko(element_click_counter),parseIntNko(point)];

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
                            var new_mark = (element_click_counter >= nbr_raisonnable_de_click) ? "߁" : "߀";
                
                        /*A chaque élément correspond un tableau (new_click_value) de 3 composants dont l'élément cliqué, le nombre de click de
                        *cet élément et le point new_mark. Ce tableau est régulièrement actualisé à chaque click */ 
                            var new_click_value = [clicked_element,parseIntNko(element_click_counter),new_mark];  // Enregistrement elementaire.
                            var non_clicked_elements = '';
                
                        /*Actualisation de mémoire d'enregistrement
                            C'est à dire qu'après chaque click,les anciennes valeurs de chaque enregistrement elementaire sont remplacés par les nouvelles valeurs.                 */
                            
                            clicks_memo.splice(element_index,1,new_click_value);
                            non_clicked_elements = nonClickedElementsTable();
                            nbr_clicked_elements = td.length - non_clicked_elements.length;

                            function nonClickedElementsTable(){
                                var table_elements_non_cliques = [];

                                $.each(clicks_memo, function(){
                                    if($(this)[1]==0){ table_elements_non_cliques[table_elements_non_cliques.length] = $(this); }
                                });
                                
                                return table_elements_non_cliques;
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
                
                zoomUp($('#apprentissage_progress_bar'));

                $.each(td, function() {
                    let td_click_counter = 0;

                    $(this).css({'background-color':'rgba(85,85,85,1)', 'color':'yellow'});
                    $(this).click(function(){
                        td_click_counter++;
                        if(td_click_counter <= nbr_raisonnable_de_click) {
                            
                            click_counter++;
                            $('.progress_bonne_reponse_bar').css('width',click_counter*barr_unity+'%');

                            if(click_counter === total_click) {
                                setTimeout(() => { zoomDown($('#apprentissage_progress_bar')); }, 1000);
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
                    var progress_unity = $('#apprentissage_progress_bar').width()/nbr_click;
                    
                    $('.table_parlante td').on('click', function() {
                        if(elements_clickes.indexOf($(this).html()) == -1) $('.progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                        elements_clickes.push($(this).html());
                    });
                }
            }
            function stockerApprentissageAlphabet() {
        
                $('#fermer_apprentissage').one('click',function() {
                    let moyenne_d_apprentissage = 1; 
                    let index_phase_active = $('.phases_container ul li .active').index();

                    let note = noterApprentissageAlphabet();

                    if(note <  moyenne_d_apprentissage) alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
                    if(note >= moyenne_d_apprentissage) {
                        sendApprentissageAlphabetToDB();
                        changerPhaseActive(index_phase_active);
                        initialiserProgressBarr();  // Voir fonction.js
                    }


                    function noterApprentissageAlphabet() {
                        var note = 0;
                        for(var i=0;i<clicks_memo.length;i++) if(clicks_memo[i] !== undefined) if(clicks_memo[i][2] == "߁") note++;
                        note = (note*20)/clicks_memo.length;

                        return note;
                        
                        function nombreDeBoutonClicke() {
                            var sum_click = 0;
                            for (var i = 0; i < table_elements_click_nbr.length; i++) if(table_elements_click_nbr[i] >= click_min_admis) sum_click ++;
                            return sum_click;
                        }
                    }
                    function sendApprentissageAlphabetToDB() {       
                    /*
                    A la fermeture, on s'assure que chaque élément est clické au moins un nombre de fois défini.
                    - Si oui le mémoire de click est envoyé au serveur;
                    - Sinon, un message s'affiche et le mémoire n'est pas envoyé.
                    */
                        var matiere = JSON.parse(sessionStorage.getItem('matiere_active')); // Voir programmes.js fonction storagesDuProgramme()
                        var phase   = JSON.parse(sessionStorage.getItem('phase'));  // Voir lessons.js fonction phaseActiveName()
                        var lesson  = JSON.stringify(clicks_memo);
                        
                        const apprentissage_data = new URLSearchParams({
                            id     : id,
                            matiere: matiere,
                            niveau : niveau_actif,
                            phase  : phase,
                            lesson : lesson,
                            note   : note
                        }); 

                        fetch("/kouroukan/php/actions.php", {
                            method: "POST",
                            body: apprentissage_data
                        })
                        .then(response => response.text())
                        .catch(error => console.log(error)); 
                        
                        console.log("Félicitations. Les données d'apprentissage sont envoyées à la base de données");
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
                            setTimeout(() => { indexer($('#fermer_apprentissage')); }, 2000);
                        }
                    });
                });
            }
            function finDApprentissageAlphabet() {}
        }
        function apprentissageSyllabe() {
            
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
                
                afficherLesson(); 

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
        function apprentissageTon() {
           
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
                
                afficherLesson(); 
                
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
        function apprentissageChiffre() {
            
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
                
                afficherLesson(); 
                
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

    function apprendre() {


        function assistantsAlphabet() {
            
            let note_1_affiche = 'off';
            let note_2_affiche = 'off';
            let note_3_affiche = 'off';
            let note_4_affiche = 'off';
                    
            notificationDApprentissage1();

            $('.parametres_container #submit_btn').on('click', function() { notificationDApprentissage1(); });
            $('.parametres_container').on('mouseleave', function(){ notificationDApprentissage1(); });

            $(".media_label").on('mouseenter', function() { notificationDApprentissage3(); });

            $(".media_btns .btn:nth-child(1)").on('click', function() { notificationDApprentissage2(); });
            $(".media_btns .btn:nth-child(2)").on('click', function() { notificationDApprentissage1(); note_2_affiche = 'off'; });
            $(".media_btns").on('mouseleave', function() { notificationDApprentissage1(); });

            $('#parametre_lesson_btn').on('mouseenter', function() { notificationDApprentissage4(); });
            


            function notificationDApprentissage1() {
                if(note_1_affiche == 'on') return;
                if(note_2_affiche == 'on') return;

                ecrire('notification_corps','\
                    <h3>'+liste_de_matieres[0][1]+' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ</h3>\
                    <p>ߛߓߍߘߋ߲ ߠߎ߬ ߓߍ߯ ߘߌ߲߯ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߊ߬ ߣߴߌ ߦߴߌ ߖߊ߲߬ߕߏ߬ ߊ߬ߟߎ߬ ߝߐߢߊ ߘߐ߫ ߞߏߛߓߍ߫߹<br>\
                    ߌ ߣߊ߬ߕߐ߫ ߟߋ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ ߟߴߊ߬ߟߎ߬ ߓߍ߯ ߡߊ߬.</p>\
                ');
                
                note_1_affiche = 'on';
                note_2_affiche = 'off';
                note_3_affiche = 'off';
                note_4_affiche = 'off';
            }
            function notificationDApprentissage2() {
                if(note_2_affiche == 'on') return;

                ecrire('notification_corps','\
                    <h3>'+liste_de_matieres[0][1]+' ߟߊ߬ߡߍ߲߬ߠߌ ߞߍ߫</h3>\
                    <p>ߌ ߕߟߏߡߊߟߐ߬ ߛߓߍߘߋ߲ ߠߎ߬ ߓߍ߯ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߊ߬ ߣߴߌ ߦߴߌ ߖߊ߲߬ߕߏ߬ ߊ߬ߟߎ߬ ߝߐߢߊ ߘߐ߫ ߞߏߛߓߍ߫<br>\
                    ߌ ߣߊ߬ߕߐ߫ ߟߋ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ ߟߴߊ߬ߟߎ߬ ߓߍ߯ ߡߊ߬.</p>\
                    <p> <b class="enrober">■</b> ߘߊߘߋ߰ߟߊ߲߬ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߝߐߟߌ ߟߊߟߐ߬.</p>\
                ');
                
                note_1_affiche = 'off';
                note_2_affiche = 'on';
                note_3_affiche = 'off';
                note_4_affiche = 'off';
            }
            function notificationDApprentissage3() {
                if(note_3_affiche == 'on') return;
                if(note_2_affiche == 'on') return;

                ecrire('notification_corps','\
                    <h3>ߝߊߟߊ߲ߞߏ</h3>\
                    <p> <b class="enrober">◀</b> ߝߐߟߊ߲߫ ߞߘߎ ߘߌ߲߯߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߛߓߍߘߋ߲ ߠߎ߬ ߝߐߢߊ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫.</p>\
                    <p> <b class="enrober">■</b> ߘߊߘߋ߰ߟߊ߲߬ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߝߐߟߌ ߟߊߟߐ߬.</p>\
                ');
                
                note_1_affiche = 'off';
                note_2_affiche = 'off';
                note_3_affiche = 'on';
                note_4_affiche = 'off';
            }
            function notificationDApprentissage4() {
                if(note_4_affiche == 'on') return;
                if(note_2_affiche == 'on') return;

                ecrire('notification_corps','\
                    <h3>ߛߏ߯ߙߏߟߌ</h3>\
                    <p>ߞߊ߬ ߥߟߊ߬ߓߊ ߛߓߍߘߋ߲ ߠߎ߬ ߛߏ߯ߙߏ߫ ߌ ߖߍ߬ߘߍ ߢߣߊߕߊ ߟߊ߫</p>\
                    <p>ߞߊ߬ߞߘߐ߬߸ ߛߓߍߘߋ߲ ߠߎ߬ ߓߍ߯ ߞߐߞߘߎ ߘߐߞߍߣߍ߲߫ ߠߋ߬߸ ߞߵߊ߬ߟߎ߫ ߦߌ߬ߘߊ߬.<br>\
                    ߞߐ߬ߣߌ߬ ߣߴߌ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߠߎ߬ ߟߊߕߎߣߎ߲߫߸ ߦߴߏ߬ ߟߎ߬ ߞߐߞߘߎ ߘߐߞߊ߬<br>\
                    ߣߴߌ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߠߎ߬ ߦߌ߬ߘߊ߬߸ ߦߴߏ߬ ߟߎ߬ ߞߐߞߘߎ ߘߐߞߍ߫.</p>\
                ');
                
                note_1_affiche = 'off';
                note_2_affiche = 'off';
                note_3_affiche = 'off';
                note_4_affiche = 'on';
            }
        }
        function afficherApprentissage() {
            
         /* Pour l'affichage des parametres voir parsmetres.js dans fonction affichageDeLessonParametres() */
            afficherApprentissagesBtns();
            // affichageDesBoutonsMedia();
        
            function affichageDesBoutonsMedia() {
           
                $('#pre_apprentissage_dialogue_btn').css('display','none');
                $(".media_label").on('mouseover', function() { afficherMediaBoutons(); masquerParametreBoutons(); });
                $(".media_btns").on('click', function() { masquerMediaBoutons(); });
                $(".media_btns").on('mouseleave', function() { masquerMediaBoutons(); });
                $(".media_btns .btn").on('mouseover', function() {
                    $(".media_btns .btn").css('background-color','white');
                    $(this).css('background-color','yellow');
                });

                function afficherMediaBoutons() { $(".media_btns").css({"display":"block", "transform":"scale(1)", "opacity":1}); }
                function masquerMediaBoutons() {
                    $(".media_btns").css({"tansform":"scale(0.75)", "opacity":0});
                    setTimeout(() => { $(".media_btns").css({"display":"none"}); }, 250);
                }
                function masquerParametreBoutons() { 
                    $(".parametres_container").css({"transform":"scale(0.75)", "opacity":0});
                    setTimeout(() => { $(".parametres_container").css({"display":"none"}); }, 250);
                }
            }
            function afficherApprentissagesBtns() {
                $('#pre_apprentissage_dialogue_btn').css('display','none');
                $('#apprentissage_dialogue_btn').css('display','block');
        
                zoomUp($('.dialogue_btn'));
                $('#apprentissage_body').on('click', function(){ zoomUp($('.dialogue_btn')); });
                $('.dialogue_btn').click('click', function(){ zoomDown($(this)); });
            }
        }
    }
    function afficherLesson() {
        $('#apprentissage_options').css('display','none');
        $('#apprentissage_container > div:nth-child(2)').css('display','block');
    }
    function afficherPreApprentissagesBtns() {
        $('#pre_apprentissage_dialogue_btn').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');

        $('#pre_exercice_btns').css('display','none');
        $('#pre_apprentissage_btns').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function afficherPreExerciceBtn() {  
        $('#apprentissage_dialogue_btn').css('display','none');
        $('#pre_apprentissage_dialogue_btn').css('display','block');

        $('#pre_apprentissage_btns').css('display','none');
        $('#pre_exercice_btns').css('display','block');
   
        $('#pre_revision_bouton').css('display','none');
        $('#pre_exercice_bouton').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function afficherPreRevisionBtn() {
        $('#apprentissage_dialogue_btn').css('display','none');
        $('#pre_apprentissage_dialogue_btn').css('display','block');

        $('#pre_apprentissage_btns').css('display','none');
        $('#pre_exercice_btns').css('display','block');
   
        $('#pre_exercice_bouton').css('display','none');
        $('#pre_revision_bouton').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function raffraichissementDeLaPage() {
        $('#fermer_pre_apprentissage, #fermer_apprentissage').on('click',function() { raffraichirLaPage(); });
    }
}