
function apprentissages() {
        
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
  
 /*-----------------------------------------------------------------------------------------------------------------------------------*/
    
    $('.fermeture').attr('id', 'fermer_apprentissage');

 // Le chargement de Apprentissage se fait dans parametres.js
    preLesson();
    //apprendre();
    enregistrerApprentissage();
    stockerApprentissage();
                    
 /*-----------------------------------------------------------------------------------------------------------------------------------*/
    
    function preLesson() {

        let element_actif = '';

        let lettres_apprises = [];
        let cercle_actif = '';
        let cercle_id = '';
        let cercle_index = 0;
        let carre_index = 0;
        let carre_id = '';
        let rang = '';

        let les_lettres_actives = [];
        let lettres_pre_apprises = [];

        let pre_questions = [];
        let ordre_de_question = '';
        let total_questions = '';
        let questions_posees = [];
        let pre_question = '', pre_reponse = '';
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


        preApprentissage();
        preExercice();
        preRevision();

        
        function preApprentissage(){
    
            let pre_apprentissage_memo = [];
            let pre_apprentissage_clicks_memo = [];

            chargerPreApprentissage();
            afficherPreApprentissage();
            preApprendre();
            enregistrerPreApprentissage();
            stockageDePreApprentissage();

            
            function chargerPreApprentissage() {

                chargerEnteteDePreApprentissage();
                chargerCorpsDePreLesson();
                chargerPiedDePreApprentissage();


                function chargerEnteteDePreApprentissage() {

                    switch(niveau_actif) {
                        case 1 : chargerCorpsDePreApprentissage1Head(); break;
                        case 2 : chargerCorpsDePreApprentissage2Head(); break;
                    }


                    function chargerCorpsDePreApprentissage1Head() {

                        var cercles_html = cerclesHTML();
                        var carres_html = carresHTML();

                        var pre_lesson_head_11_html = "\
                            <div class='titre_de_parti'> ߞߎߘߎ߲</div> \
                            <div id='cercles_des_partis'>"+cercles_html+"</div> \
                        ";
                        var pre_lesson_head_21_html = "<div id='carres_pour_exercices'>"+carres_html+"</div>";

                        ecrire('pre_apprentissage_note','\
                            <h3>ߡߊ߬ߘߋ߲߰ߠߌ</h3>\
                            <p>ߞߎߘߎ߲߫ ߝߟߐߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬</p>\
                        ');
                        $('.pre_lesson_foot_1').html(pre_lesson_head_11_html);
                        $('.pre_lesson_foot_2').html(pre_lesson_head_21_html);

                        
                        function cerclesHTML() {
                            var html_1 = '<div id="cercles_des_partis_cadre">';
                            for(var i=0;i<5;i++) { 
                                var index = (i==0) ? parseIntNko(i+1)+'߭' : parseIntNko(i+1)+'߲';
                                html_1 += (i == 4) ? "<span id='cercle_"+i+"' class='cercle'>ߓߍ߯</span>" : "<span id='cercle_"+i+"' class='cercle'>"+index+"</span>"; 
                            }
                            html_1 += '</div>';
                            return html_1;
                        }
                        function carresHTML() {
                            var carres_html = "\
                                <span id='carre_1'>ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߢߊ߯ߡߌ߲߫</span>  \
                                <span id='carre_2'>ߘߋ߰ߣߍ߲ ߞߎߙߎ߬ ߢߊ߯ߡߌ߲߫</span>  \
                            ";
                            return carres_html;
                        }
                    }
                    function chargerCorpsDePreApprentissage2Head() {

                        chargerLesBouonsDEntete();
                        afficherLePanneauDesLettres();
                        masquerLePanneauDesLettres();


                        function chargerLesBouonsDEntete() {
                                
                            var panneaux_des_lettres_html = panneauxDesLettresHTML();
                            var pre_lesson_head_12_html = "\
                                <div class='titre_de_parti'>\
                                    <div>ߞߎߘߎ߲</div>\
                                    <div class='cercle' id='afficheur_de_panneau'>+</div>\
                                </div>\
                                <div id='panneaux'>"+panneaux_des_lettres_html+"</div>\
                            ";
                            var pre_lesson_head_22_html = "ߞߎߘߎ߲ ߢߊ߯ߡߌߣߍ߲";

                            $('.pre_lesson_foot_1' ).html(pre_lesson_head_12_html);
                            $('.pre_lesson_foot_2' ).html(pre_lesson_head_22_html);
                            
                            function panneauxDesLettresHTML() {
                                
                                var consonnes = caracteres[1];
                            
                                var html_2 = '<div id="consonnes_cadre">';
                                for(var i=0;i<18;i+=6) { 
                                    html_2 += "<div>"; 
                                    for(var j=0;j<6;j++) { 
                                        html_2 += "<span>"+consonnes[i+j]+"</span>"; 
                                    }
                                    html_2 += "</div>"; 
                                }
                                html_2 += '<div id="submit_panneau">ߏ߬ ߞߊߢߌ߲߬</div>';
                                html_2 += '</div>';
                                
                                return html_2;
                            }
                        }
                        function afficherLePanneauDesLettres() {
                            $('#afficheur_de_panneau').on('click', function() {
                                $('#panneaux').css('height','12rem');
                                $('#consonnes_cadre').animate({'top':0}, 250);
                            });
                        }
                        function masquerLePanneauDesLettres() {
                            $('#consonnes_cadre').on('mouseleave', function() {
                                $('#consonnes_cadre').animate({'top':'-10rem'}, 250);
                                setTimeout(function(){$('#panneaux').css('height',0);}, 250);
                            });
                            $('#submit_panneau').on('click', function() {
                                $('#consonnes_cadre').animate({'top':'-10rem'}, 250);
                                setTimeout(function(){$('#panneaux').css('height',0);}, 250);
                            });
                        }
                    }
                }
                function chargerCorpsDePreLesson() {

                    chargerCorpsDePreApprentissage1();
                    chargerCorpsDePreApprentissage2();
                    chargerCorpsDePreApprentissage3();
                    chargerCorpsDePreApprentissage4();


                    function chargerCorpsDePreApprentissage1() {
                        if(niveau_actif == 1) {
                            $('#apprentissage_body').html(preApprentissageCorpsHTML());  // Voir fonction preApprentissageCorpsHTML() dans fonctions.js
                        }
                    }
                    function chargerCorpsDePreApprentissage2() {
                        if(niveau_actif == 2) {
                            $('#panneaux span').click(function() {

                                var clicked_consonne_container = $(this);
                                var clicked_consonne = $(this).html();
                                var bc = this.style.backgroundColor;
                                var consonne_background = (bc == 'rgb(170, 170, 170)') ? '#fff' : 'rgb(170, 170, 170)';

                                $('.table_parlante td').css('transform','scale(0)');

                                marquerLaConsonneCliquee();
                                decocherLesConsonnes();
                                decocherLaNasalisation();
                                chargerTableauNoir(); 
                            
                                function marquerLaConsonneCliquee() {
                                    clicked_consonne_container.css('background-color',consonne_background);
                                }
                                function chargerTableauNoir() {
                                    $.each($('.check_btn'), function(){
                                        var consonne_active = $('label', this);
                                        var consonne_corespondante = $('label', this).html();

                                        if(clicked_consonne == consonne_corespondante) { consonne_active.click(); }
                                    });
                                }
                            }); 
                        }
                    }
                    function chargerCorpsDePreApprentissage3() {}
                    function chargerCorpsDePreApprentissage4() {}
                }
                function chargerPiedDePreApprentissage() {}
            }
            function afficherPreApprentissage() {
                $('.dialogue_btn').css('display','none');
    
                $('#table_pre_apprentissage').css('mpn-height',0);
                setTimeout(function(){ $('#table_pre_apprentissage').animate({'min-height':'90%'},600); }, 200);

                $('.pre_lesson_foot_1').css('z-index',1);
                $('.pre_lesson_foot_2').css('z-index',0);
                

                $('#cercles_des_partis_cadre span').click(function() {
                                
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
                    
                    les_lettres_actives = lesLettresActives();
                    reInitialiserPreApprentissageClicksMemo();
                

                    function controleDuNiveau() {
                        if(cercle_index > 0) {
                            pre_apprentissage_permission = (cercle_actif.prev().hasClass('cercle_depasse')) ? 'pre_lesson_permise' : 'pre_lesson_non_permise';
                        }
                    }
                    function preLessonEntete1Style() {
                        $('#carres_pour_exercices span').removeClass('carre_en_cours indicateur carre_depasse');
                        cercle_actif.addClass('cercle_en_cours');
                    }
                    function selectionDeLaLigneActive() {
                        $('#tr_actif .pre_apprentissage_tr').unwrap();
                        $('#traducteur').remove();
                        $('.pre_apprentissage_tr:nth-child('+index+')').wrap('<div id="tr_actif"></div>');
                        
                        ecrire('pre_apprentissage_note','\
                            <h3>ߡߊ߬ߘߋ߲߰ߠߌ</h3>\
                            <p>ߛߓߍߘߋ߲߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߏ߫ ߌ ߞߣߐ߫.</p>\
                        ');
                    }
                    function styleDeLaLigneActive() {
                        $('#tr_actif .pre_apprentissage_td').css({'background-color':'#555', 'color':'yellow'});
                        if(index == 4) { $('#tr_actif .pre_apprentissage_td:last-child').css({'background-color':'transparent'}); }
                        $('#tr_actif').prevAll().children().css({'background-color':'transparent', 'color':'#fff'});
                        $('#tr_actif').nextAll().children().css({'background-color':'transparent', 'color':'#555'});
                            
                        var les_lettres_actives = lesLettresActives();
                        
                        lettres_pre_apprises = lettresPreApprises();
                        lettres_pre_apprises = lettres_pre_apprises.concat(les_lettres_actives);

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
                    function lesLettresActives() {
                        var les_lettres_actives = [];
                        for(var i=0; i<$('#tr_actif .pre_apprentissage_td').length; i++) {
                            let n = i+1;
                            les_lettres_actives.push($('#tr_actif .pre_apprentissage_td:nth-child('+n+')').html());
                        }
    
                        return les_lettres_actives;
                    }
                });

                setTimeout(function(){ indexer($('.cercle:nth-child(1)')); }, 1000);
            }
            function preApprendre() {
                $('#cercles_des_partis_cadre span').click(function() {
                    lectureDePreApprentissage();

                    function lectureDePreApprentissage() {
                        $.each($('.table_parlante td, .pre_apprentissage_td'), function() {
                            var lettre = $(this).html();
                            $(this).click(()=>{
                                if(lettres_pre_apprises.includes(lettre)) { lireLettre('alphabet/',lettre); }
                            });
                        });
                    }
                });
            }
            function enregistrerPreApprentissage() {
                $('#cercles_des_partis_cadre span').click(function() {
    
                  // Initialisation de pre_apprentissage_clicks_memoir
                    initialiserPreApprentissageClicksMemo();
    
                    $.each($('.pre_apprentissage_td'), function() {

                        let lettre = $(this).html();
                        let quantite_normale_de_click = 1;
                        let quantite_max_de_click = 10;
                        var clicks_counter = 1;
                        
                        $(this).click(function() {
                            
                            let td_actif = $(this);
                            let clicked_letter = $(this).html();
                            let td_index = $(this).index();
                            let click_count = clicks_counter++;
    
                            if(les_lettres_actives.includes(lettre)) { pre_apprentissage_memo.push(lettre); }

                            registrerPreApprentissage();
                            preApprentissageNote();
                            indexerExerciceBtn1();
                            indexerExerciceBtn2();
                            
    
                            function registrerPreApprentissage() {
                                if(les_lettres_actives.includes(clicked_letter)) {
                                    pre_apprentissage_clicks_memo.splice(td_index,1,[clicked_letter,click_count]);
                                }
                                if(click_count == quantite_normale_de_click) { td_actif.css('background-color','transparent'); }  
                            }
                            function preApprentissageNote() {
                                let n = indice();
                                if(n == 7) {
                                    if($('#pre_apprentissage_note p').html() != 'ߛߓߍߘߋ߲߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߏ߫ ߌ ߞߣߐ߫.') { return false; }
                                    
                                    ecrire('pre_apprentissage_note','\
                                        <h3>ߡߊ߬ߘߋ߲߰ߠߌ</h3>\
                                        <p>ߣߌ߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߓߘߊ߫ ߟߐ߲߫ ߌ ߓߟߏ߫߸ ߢߊ߯ߡߌߟߊ߲ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫߹) ߞߊ߬ ߘߋ߲߬ߣߍ߲߬ ߞߎߘߊ ߟߎ߬ ߢߊ߯ߡߌ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߞߊ߲ߡߊ߬.</p>\
                                    ');

                                    $('#carre_1').css('z-index','1');
                                    $('#carre_2').css('z-index','0');
                                }
                            }
                            function indexerExerciceBtn1() {
                                let n = indice();
    
                                if(n == 7) { 
                                    $('.pre_lesson_foot_1').css('z-index',0);
                                    $('.pre_lesson_foot_2').css('z-index',1);
                                    $('#carre_1').css('z-index',1);
                                    $('#carre_2').css('z-index',0);
                                    
                                    if(!$('#carre_1').hasClass('indicateur')) { indexer($('#carre_1')); } 
                                }
                                    
                               
                                $('.cercle, #carres_pour_exercices span').click(()=>{ 
                                    $('#carres_pour_exercices span').removeClass('indicateur'); 
                                    reInitialiserPreApprentissageClicksMemo();
                                });
                            }
                            function indexerExerciceBtn2() {}
                            function indice() {
                                let n = 0;
    
                                for(var i=0; i<pre_apprentissage_clicks_memo.length; i++) {
                                    if(pre_apprentissage_clicks_memo[i][1] >= quantite_normale_de_click) { n++; }
                                }
                                return n;
                            }
                        });
                    });
                    
    
                    function initialiserPreApprentissageClicksMemo() {
                        for(var i=0; i<7; i++) {
                            pre_apprentissage_clicks_memo.push(['','']);
                        }
                    }
                });
            }
            function stockageDePreApprentissage() {}
            function reInitialiserPreApprentissageClicksMemo() { 
                pre_apprentissage_clicks_memo.splice(0,pre_apprentissage_clicks_memo.length); 
            }
        }
        function autorsationDePreExercice() {
            let autorisation = 'pre_exercice_non_permis';

            $.each($('.cercle'), function() {
                if($(this).hasClass('cercle_en_cours')) autorisation = 'pre_exercice_permis';
            });

            return autorisation;
        }
        function preExercice() {
            $('#carre_1').click(function() {
                let carre_actif = $(this);
                
                initialiserLeResultat();
                carre_index = $(this).index();
                carre_id = $(this).attr('id');
                melange_des_lettres_actives = malaxer(les_lettres_actives);
                pre_questions = malaxer(melange_des_lettres_actives);

                preExerciceNote();
                preExerciceEnteteStyle();
                preLessonExercice();

                function preExerciceNote() {
                    ecrire('pre_apprentissage_note','\
                        <h3>ߡߊ߬ߞߟߏ߬ߟߌ</h3>\
                        <p>ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫. ߦߋ߫ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߣߌ߫ ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߣߌ߫ ߛߊߞߍߟߌ ߟߎ߬ ߞߍ߫ ߦߊ߲߬߸ ߤߊ߲߯ ߞߐߝߟߌ߫ ߥߟߊ ߦߋ߫ ߓߐ߫.</p>\
                    ');
                }
                function preExerciceEnteteStyle() {
                    $('#carres_pour_exercices span').removeClass('carre_en_cours');
                    carre_actif.addClass('carre_en_cours');
                }
            });
        }
        function preRevision() {
            $('#carre_2').click(function() { 
                let carre_actif = $(this);

                initialiserLeResultat();
                carre_index = $(this).index();
                carre_id = $(this).attr('id');
                melange_des_lettres_pre_apprises = malaxer(lettres_pre_apprises);
                pre_questions = melange_des_lettres_pre_apprises;
                pre_questions = malaxer(pre_questions);

                preRevisionNote();
                preRevisionEnteteStyle();
                preLessonExercice();


                function preRevisionNote() {
                    ecrire('pre_apprentissage_note','\
                        <h3>ߣߐ߰ߡߊ߬ߛߍߦߌ</h3>\
                        <p>ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߠߎ߬ ߟߋ߬ ߓߍ߯ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬<br>\
                        ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫߸ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫<br>\
                        ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫.\
                    ');
                }
                function preRevisionEnteteStyle() {
                    $('#carres_pour_exercices span').removeClass('carre_en_cours');
                    carre_actif.addClass('carre_en_cours');
                }
            }); 
        }
        function preLessonExercice(){

            $('.pre_lesson_foot_1').css('z-index','1');
            $('.pre_lesson_foot_2').css('z-index','0');

            chargerPreExercice();
            afficherPreExercice();
            preExercer();
            enregistrementDePreExercice();
            stockageDeDePreExercice();
            fermerPreExercice();


            function chargerPreExercice() {

                chargerCorpsDePreExercice();
                chargerPiedDePreExercice();

                
                function chargerCorpsDePreExercice() {

                    chargerCorpsPreExercice1();
                    chargerCorpsPreExercice2();
                    chargerCorpsPreExercice3();
                    chargerCorpsPreExercice4();

                    
                    function chargerCorpsPreExercice1() {
                        var pre_exercice_body_html = (carre_index == 0) ? lessonHTML(melange_des_lettres_actives, '') : lessonHTML(melange_des_lettres_pre_apprises, '');
                        $('#pre_exercice_body').html(pre_exercice_body_html);
                    }
                    function chargerCorpsPreExercice2() {}
                    function chargerCorpsPreExercice3() {}
                    function chargerCorpsPreExercice4() {}
                }
            }
            function afficherPreExercice() {
    
                afficherPreExerciceCadres();
                afficherPreExerciceContenus();
                indexerPreQuestionBtn();
    
    
                function afficherPreExerciceCadres() {
                        
                    $('#pre_exercice_cover, #pre_exercice').css({'display':'block'}); 
                    $('#pre_exercice').css({'transform':'scale(0.8)', 'opacity':0});
    
                    setTimeout(function() { 
                        $('#pre_exercice').css({'transform':'scale(1)', 'opacity':1}); 
                        $('#pre_exercice_body td').css({'transform':'scale(0)', 'opacity':0});
                    }, 10); 
                }
                function afficherPreExerciceContenus() {
    
                    afficherExerciceDeLaLigneEnCours();
                    afficherExerciceDeToutesLesLignesEtudiees();
                        
                    function afficherExerciceDeLaLigneEnCours() {
                    if(carre_index == 0) {
                        setTimeout(function() { affichageAnimeDesTd($('#pre_exercice_body td')); }, 300); 
                    }}
                    function afficherExerciceDeToutesLesLignesEtudiees() {
                    if(carre_index == 1) {
                        setTimeout(function() { affichageAnimeDesTr($('#pre_exercice_body tr')); }, 300); 
                    }}
                }
                function indexerPreQuestionBtn() {
                    setTimeout(function() { indexer($('#pre_question')); }, 1000); 
                }
            }
            function preExercer() {
       
                ecouterLaPreQuestion();
                repondreLaPreQuestion();
                corrigerLaPreQuestion();
    
    
                function ecouterLaPreQuestion() {
    
                    let i=0;
    
                    $('#poser_pre_question').click(function() { 
    
                        $('#poser_pre_question').css('display','none');
                        $('#repeter_pre_question').css('display','block');
                        $('#pre_exercice_body .table_parlante td').css('border','0.25rem solid blue');
    
                        ordre_de_question = (total_questions == parseIntNko(i+2)) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                        $('#poser_pre_question').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+total_questions+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                        pre_question = pre_questions[i];
    console.log(pre_question);
    
                        if(i < pre_questions.length) { 
                            lire('alphabet/',pre_question); 
                            relire(pre_question); 
                            questions_posees.push(pre_question);
                        }

                        i++; 
                        if(i == pre_questions.length) { i = 0; }
    
                        function relire(question) {
                            $('#repeter_pre_question').click(function() { lire('alphabet/',question); });
                        }
                    });
                }
                function repondreLaPreQuestion() {
                    $.each($('#pre_exercice_body td'), function() {
                        $(this).click(function(){
                            
                            if(pre_question !== '') {
                                pre_reponse = this.innerHTML;
                 
                                element_actif = $(this);
                                $(element_actif).css('background-color','#aaa').siblings().css('background-color','transparent');
                                $('#pre_exercice_body .table_parlante td').css('border','0.25rem solid transparent');
                                indexer($('#pre_correction'));
                            }
        
                            if(pre_question == '') { 
                                $('#pre_question').addClass('clignotant'); 
                                setTimeout(function() { $('#pre_question').removeClass('clignotant'); }, 1200);
                            }
                        });
                    });
                }
                function corrigerLaPreQuestion() {
                    $('#pre_correction').click(function() { 
    
                        $('#repeter_pre_question').css('display','none');
                        $('#poser_pre_question').css('display','block');
                        $('#pre_exercice_container td').css('background-color','transparent');
    
                        if(pre_question == '') { return false; }
    
                        let point = (pre_question == pre_reponse) ? 1 : 0;
                        let question_reponse = [pre_question,pre_reponse,point];
                        
                        if(pre_question == pre_reponse) { validerLaPreReponse(); }
                        if(pre_question != pre_reponse) { nePasValiderLaPreReponse(); }
    
                        pre_exercice_memoire.push(question_reponse);
                        pre_question = '';
                        pre_question = '';
  
                        if(questions_posees.length < pre_questions.length) { indexer($('#pre_question')); }
                        if(questions_posees.length == pre_questions.length) { 
                            
                            resultatDePreExercice();
                            resultatDePreExerciceNote();
                            stockageDePreExercice();
                            notificationDeFinDExercice();
                            
    
                            function resultatDePreExercice() {
    
                                chargerPreExerciceResultat();
                                afficherPreExerciceResultat();
    
    
                                function chargerPreExerciceResultat() {
    
                                    let resultat_html = resultatHTML();
                                    let libelles_html = libellesHTML();
                                    let diagram_html = diagramHTML();
                                    let legende_html = legendeHTML();
    
    
                                    $('#pre_exercice_resultat h3').html('ߞߎߘߎ߲߫ '+rang+' ߞߐߝߟߌ');
                                    $('#pre_exercice_resultat #resultat').html(resultat_html);
                                    $('#pre_exercice_resultat #libelles').html(libelles_html);
                                    $('#pre_exercice_resultat #diagram').html(diagram_html);
                                    $('#pre_exercice_resultat #legende').html(legende_html);
    
    
                                    function resultatHTML() {
    
                                        let html = '<table border=1>';
    
                                        html += '<thead><tr><th>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</th> <th>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</th><th>ߓߍ߬ߙߍ</th><tr></thead>';
                                        html += '<tbody>';
                                        for(let i=0; i<pre_exercice_memoire.length; i++) {
    
                                            let question = pre_exercice_memoire[i][0];
                                            let reponse = pre_exercice_memoire[i][1];
                                            let point = pre_exercice_memoire[i][2];
        
                                            html += '<tr>';
                                                html += '<td>'+question+'</td> <td>'+reponse+'</td> <td>'+parseIntNko(point)+'</td>';
                                            html += '</tr>';
                                        }
                                        html += '</tbody>';
                                        html += '<tfoot><tr><td colspan=2 id="tfoot_td1">ߓߍ߬ߙߍ ߡߎ߬ߡߍ</td> <td id="tfoot_td2">'+parseIntNko(point_total)+'</td><tr></tfoot>';
                                        html += '</table>';
    
                                        return html;
                                    }
                                    function libellesHTML() {
                                        let html = ' \
                                            <div> \
                                                <span style="background-color:yellow">ߢߊ߬ߣߍ߲</span> \
                                                <span style="background-color:#aaa">ߝߏߣߍ߲</span> \
                                            </div>' 
                                        ;
                                        return html;
                                    }
                                    function diagramHTML() {
                                        let html = '<div class="diagram_circulaire" id="pre_exercice_diagram_circulaire"></div>';
                                        return html;
                                    }
                                    function legendeHTML() {
                                        
                                        let html = '';
                                        let n_q = pre_questions.length;
                                        let n_b_r = nbr_bonne_reponse;
                                        let n_m_r = nbr_mauvaise_reponse;
    
                                        taux_de_fausse_reponse = Math.ceil((n_m_r/n_q)*100);
                                        if(carre_index == 0) { taux_de_vraie_reponse_1 =  100 - taux_de_fausse_reponse; }
                                        if(carre_index == 1) { taux_de_vraie_reponse_2 =  100 - taux_de_fausse_reponse; }
    
                                        taux = (carre_index == 0) ? taux_de_vraie_reponse_1 : taux_de_vraie_reponse_2;

                                        html += ' \
                                            <table id="legende_table" border=1> \
                                                <tr> <td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߡߎ߬ߡߍ</td> <td>'+parseIntNko(n_q)+'</td> <td>%߁߀߀</td> </tr>  \
                                                <tr> <td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ߫ ߢߊ߬ߣߍ߲</td> <td>'+parseIntNko(n_b_r)+'</td> <td>%<span>'+parseIntNko(taux)+'</span></td> </tr>  \
                                                <tr> <td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ߫ ߝߏߣߍ߲</td> <td>'+parseIntNko(n_m_r)+'</td> <td>%<span>'+parseIntNko(taux_de_fausse_reponse)+'</span></td> </tr>  \
                                            </table>  \
                                        ';
    
                                        return html;
                                    }
                                }
                                function afficherPreExerciceResultat() {
                                    setTimeout(() => {
                                        $('#pre_exercice_resultat').css('display','block');
                                        $('#pre_exercice_resultat').animate({'height':'100%'}, 250);
                                        $('#diagram .diagram_circulaire').css({ 
                                            'background': 'conic-gradient( #aaa 0 '+taux_de_fausse_reponse+'%, yellow '+taux_de_fausse_reponse+'% 100% )'
                                        });
                                        $('#pre_question').removeClass('indicateur');
                                    }, 2000);
    
                                    setTimeout(() => { indexer($('#fermeture_pre_exercice')); }, 5000);
                                }
                            }
                            function resultatDePreExerciceNote() {

                                if(carre_index == 0) {
                                    if(taux_de_vraie_reponse_1 == 100) {
                                        ecrire('pre_apprentissage_note','\
                                            <h3>ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬</h3>\
                                            <p>ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ.<br>\
                                            ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹<br>\
                                            ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)</p>\
                                        ');
                                    }
                                    if(taux_de_vraie_reponse_1 < 100) {
                                        ecrire('pre_apprentissage_note','\
                                            <h3>ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬</h3>\
                                            <p>ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫.<br>\
                                            ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹<br>\
                                            ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)</p>\
                                        ');
                                    }
                                }
                                
                                if(carre_index == 1) {
                                    if(taux_de_vraie_reponse_2 == 100) {
                                        ecrire('pre_apprentissage_note','\
                                            <h3>ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߊ߬ߣߍ߲߬</h3>\
                                            <p>ߞߎߘߎ߲߫ ߁߭ ߤߊ߲߯ ߞߎߘߎ߲߫ '+cercle_actif.html()+' ߠߎ߬ ߓߍ߯ ߓߘߊ߫ ߢߊߦߋ߫ ߌ ߓߟߏ߫<br>\
                                            <p>ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߋ߲߰.<br>\
                                            ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹<br>\
                                            ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)</p>\
                                        ');
                                    }
                                    if(taux_de_vraie_reponse_2 < 100) {
                                        ecrire('pre_apprentissage_note','\
                                            <h3>ߣߐ߰ߡߊ߬ߛߍߦߌ ߡߊ߫ ߢߊ߬</h3>\
                                            <p>ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߌ߲߬ ߘߐ߫.<br>\
                                            ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹<br>\
                                            ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)</p>\
                                        ');
                                    }
                                }
                            }
                            function notificationDeFinDExercice() {
                                $('#pre_exercice_foot_alerte').animate({'width':'100%'}, 250);
                                setTimeout(() => {
                                    $('#pre_exercice_foot_alerte').animate({'width':0},250);
                                }, 3000);
                            }
                            function stockageDePreExercice() {
    
                                let tr_ln = cercle_index + 2;
                                for(let i=1; i<tr_ln; i++){
                                    let td_ln = $('#table_pre_apprentissage > div:nth-child('+i+') span').length;
                                    for(let j=1; j<td_ln+1; j++){
                                        lettres_apprises.push($('#table_pre_apprentissage > div:nth-child('+i+') span:nth-child('+j+')').html());
                                    }
                                }
                                sessionStorage.setItem('lettres_apprises', JSON.stringify(lettres_apprises));
                            }
                        }
    
    
                        function validerLaPreReponse() {
                            
                            $(element_actif).addClass('vrais');
                            nbr_bonne_reponse++;
                            point_total++;
    
                            setTimeout(function(){ $('.vrais').addClass('coche'); }, 300);
                            setTimeout(function(){ $('.vrais').removeClass('coche'); }, 1600);
                            setTimeout(function(){ $(element_actif).removeClass('vrais'); }, 2000);
                        }
                        function nePasValiderLaPreReponse() {
                            
                            $(element_actif).addClass('faux');
                            nbr_mauvaise_reponse++;
    
                            setTimeout(function(){ $('.faux').addClass('croix'); }, 300);
                            setTimeout(function(){ $('.faux').removeClass('croix'); }, 1600);
                            setTimeout(function(){ $(element_actif).removeClass('faux'); }, 2000);
                        }
                            
                    });
                }
            }
            function enregistrementDePreExercice() {}
            function stockageDeDePreExercice() {}
            function fermerPreExercice() {
                $('#fermeture_pre_exercice').one('click',function(){                                            
                    cercle_id = $('.cercle_en_cours').attr('id');
                    carre_id = $('.carre_en_cours').attr('id');
 
                    $('#pre_exercice').css({'transform':'scale(0.8)', 'opacity':0});
                    $('.pre_lesson_foot_1').css('z-index',0);
                    $('.pre_lesson_foot_2').css('z-index',1);
                    $('#carre_1').css('z-index',0);
                    $('#carre_2').css('z-index',1);
                    
                    setTimeout(() => {
console.log('carre_index = '+carre_index+'\n'+'taux_de_vraie_reponse_1 = '+taux_de_vraie_reponse_1+'\n'+'taux_de_vraie_reponse_2 = '+taux_de_vraie_reponse_2); 
                        $('#pre_exercice_cover, #pre_exercice, #pre_exercice_resultat').css({'display':'none'});
                        
                        if(carre_index == 0) { 
                            if(taux_de_vraie_reponse_1 < 100) {
                                $('#carre_1').click(); 
                            }
                            if(taux_de_vraie_reponse_1 == 100) {
                                $('#carre_1').removeClass('carre_en_cours').addClass('carre_depasse').css('z-index',0);
                                $('#carre_2').css('z-index',1);
                                $('#carre_2').click();
                            }
                        }
                    
                        if(carre_index == 1) { 
                            
                            if(taux_de_vraie_reponse_2 < 100) {
                                $('#carre_2').click();
                            }
                            if(taux_de_vraie_reponse_2 == 100) {
                                $('.pre_lesson_foot_1').css('z-index','1');
                                $('.pre_lesson_foot_2').css('z-index','0');
                                $('#'+cercle_id).removeClass('cercle_en_cours').addClass('cercle_depasse');
                                indexer($('#'+cercle_id).next()); 
                                
                                ecrire('pre_apprentissage_note','\
                                    <h3>ߡߊ߬ߘߋ߲߰ߠߌ</h3>\
                                    <p>ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߌ߲߯ ߘߎ߭ߡߊ߬</p>\
                                ');
                            }
                        }

                        return;
                        
                    }, 400);
                });
            }
        }
        function chargerPiedDePreExercice() {
        
            total_questions = parseIntNko(pre_questions.length);
            var pre_exercice_foot_html = '\
                <div id="pre_foot_btns_container"> \
                    <div id="pre_exercice_foot_btns"> \
                        <div id="pre_question"> \
                            <div id="poser_pre_question">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+total_questions+' \\ ߁߭ ߟߊߡߍ߲߫</div> \
                            <div id="repeter_pre_question">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫</div> \
                        </div> \
                        <div id="pre_correction">ߏ߬ ߛߊߞߍ߫</div> \
                    </div> \
                    <div id="pre_exercice_foot_alerte">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹</div> \
                </div> \
            ';

            $('#pre_exercice_foot').html(pre_exercice_foot_html);
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
        function cocherToutesLesCases() {
            if($('#voyelles_checker'    ).find('.checkbox_parent').prop("checked") == false) { $('#voyelles_checker'    ).find('.checkbox_parent').next().click(); }
            if($('#consonnes_checker'   ).find('.checkbox_parent').prop("checked") == false) { $('#consonnes_checker'   ).find('.checkbox_parent').next().click(); }
            if($('#tedo_checker'        ).find('.checkbox_parent').prop("checked") == false) { $('#tedo_checker'        ).find('.checkbox_parent').next().click(); }
            if($('#nasalisation_checker').find('.checkbox_parent').prop("checked") == false) { $('#nasalisation_checker').find('.checkbox_parent').next().click(); }
        }
        function cocherLesConsonnes() {
            if($('#consonnes_checker').find('.checkbox_parent').prop("checked") == false) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }            
        }
        function decocherLesConsonnes() {
            if($('#consonnes_checker').find('.checkbox_parent').prop("checked") == true) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }            
        }
        function decocherLesNasalisations() {
            if($('#nasalisation_checker').find('.checkbox_parent').prop("checked") == true) { $('#nasalisation_checker').find('.checkbox_parent').next().click(); }            
        }
        function decocherLaNasalisation() {
            if($('#nasalisation_checker').find('.check_btn:last-child input').prop("checked") == true) { $('#nasalisation_checker').find('.check_btn:last-child label').click(); }            
        }
    }
    function apprendre() {

        affichageDesBoutonsMedia();
        lectureSemiAutomatique();  // Voir fonctions.js
        lecturePersonnalisee();    // Voir fonctions.js
        arreterLecture();          // Voir fonctions.js
        apprentissageProgressBarr();

      
        function affichageDesBoutonsMedia(){
            $(".media_label").on('mouseover', function() { afficherMediaBoutons(); });
            $(".media_btns").on('mouseleave', function(){ masquerMediaBoutons(); });
            $('.course_container').on('click', function(){ masquerMediaBoutons(); });

            $(".media_btns .btn").click(function() {
                $(".media_btns .btn").css('background-color','white');
                $(this).css('background-color','yellow');
            });
        }
        function afficherMediaBoutons() { 
            $(".parametres_container").css({"transform":"scale(0.75)", "opacity":0});
            setTimeout(() => { $(".parametres_container").css({"display":"none"}); }, 250);

            $(".media_btns").css({"display":"block", "transform":"scale(1)", "opacity":1}); 
        }
        function masquerMediaBoutons(){
            $(".media_btns").css({"tansform":"scale(0.75)", "opacity":0});
            setTimeout(() => { $(".media_btns").css({"display":"none"}); }, 300);
        }
        function apprentissageProgressBarr() {
         /*
          A chaque click sur un élément, progress barr avance d'une unité égale à progress_unity px.
          Mais si un élément est clické une deuxième fois, progress barr ne doit pas avancer.
          Pour cela, tous les éléments clichés sont enregistrés dans un tableau pour les distinguer.
         */
                        
            var nbr_click = nbr_td;
            let elements_clickes = [];
                     
            progression(nbr_click);
            initialiserApprentissageProgressBarr();

            function initialiserApprentissageProgressBarr() {
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
    }
    function enregistrerApprentissage() {
        
        nbr_td_par_table = Math.ceil(nbr_td/nbr_table);
        nbr_td_par_tr = Math.ceil(nbr_td/nbr_tr);
                       
        
        initialiserApprentissageAStocker();
        memoriserApprentissage();
        
        
        function initialiserApprentissageAStocker() {
            //
        }
        function memoriserApprentissage() {

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
                //var element_index  = $(this).index();
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
                    element_click_counter++; // Compteur de click pour chaque élément.
                    var new_mark = (element_click_counter >= 5) ? "߁" : "߀";
         
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
    function stockerApprentissage() {
  
        $('#fermer_apprentissage').one('click',function() {
            let moyenne_d_apprentissage = 1; 
            let index_phase_active = $('.phases_container ul li .active').index();

            note = noterApprentissage();

            if(note <  moyenne_d_apprentissage) alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
            if(note >= moyenne_d_apprentissage) {
                sendApprentissageToDB();
                changerPhaseActive(index_phase_active);
                initialiserProgressBarr();  // Voir fonction.js
            }


            function noterApprentissage() {
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
            function sendApprentissageToDB() {       
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
            }
        });
    } 
}