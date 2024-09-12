function alphabet() {
  
    let element_actif = '';
    let matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));
    let phase_id = JSON.parse(sessionStorage.getItem('phase_id'));
    let ordre_de_question = '';
    let total_questions = 0;
    let questions_posees = [];
    let pre_question = '', pre_reponse = '';
    let point = 0;

    let nbr_bonne_reponse = 0;
    let nbr_mauvaise_reponse = 0;
    let taux_de_fausse_reponse = 0;
    let taux_de_vraie_reponse = 0;
    let point_total = 0;

    let total_lettres_exercees = [];

    var nom = JSON.parse(sessionStorage.getItem('nom'));
    var prenom = JSON.parse(sessionStorage.getItem('prenom'));
    var id = JSON.parse(sessionStorage.getItem('id'));
    var lesson_option = $('#lesson_option').text();  
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    var lesson_option = parseInt(JSON.parse(sessionStorage.getItem('lesson_option')));
                 
// localStorage.clear();

    $('.page_body').css('display','none');
   
    if(niveau_actif <= 2) {
        switch(lesson_option) {
            case 1 : preAlphabet(); break;
            // case 2 : apprendreAlphabet(); break;
        } 
    }
    

    function preAlphabet() {
        
        let exercice_pre_questions = [];
        let revision_pre_questions = [];

        let alphabet_tr_index = JSON.parse(localStorage.getItem('alphabet_tr_index'));
        let cercle_actif = '';
        let cercle_id = '';

        
        let clickable_td = [];
        
        let rang = '';
        let lettres_apprises = [];
        let les_lettres_actives = [];
        let lettres_a_apprendre = [];
        let quantite_normale_de_click = 1;

        $('#apprentissage_container').css('display','block');
        $('#exercice_container').css('display','none');
        $('#evaluation_container').css('display','none');
        $('#exercice_body').css('display','none');
        afficher($('.course'));

        apprentissagePreAlphabet();
        exercicePreAlphabet();
        revisionPreAlphabet();

         
        function apprentissagePreAlphabet() {
                        
            let pre_apprentissage_memoire = JSON.parse(localStorage.getItem('pre_apprentissage_memoire'));
            let pre_apprentissage_data = [];

            lettres_apprises = lettresApprises();
            clickable_td = JSON.parse(localStorage.getItem('clickable_td'));

            chargerPreApprendreAlphabet();
            afficherPreApprendreAlphabet();
            apprendrePreAlphabet();
              

            function lettresApprises() {
                if(pre_apprentissage_memoire != null) {
                let la = [];
                for(let i=0; i<pre_apprentissage_memoire.length; i++) {
                    la.push(pre_apprentissage_memoire[i][0]);
                }
                return la
                }
            }
            function chargerPreApprendreAlphabet() {

                chargerEnteteDePreeAlphabet();
                chargerFootDePreAlphabet();
                chargerCorpsDePreAlphabet();
                
                function chargerEnteteDePreeAlphabet() {
                    viderNotification();
                    $('.notification_titre').html('ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                    setTimeout(() => { ecrire('notification_corps','ߞߏ߰ߙߌ߬ '+cercleRang() +' ('+parseIntNko(alphabet_tr_index)+'߲) ߘߌ߲߯ ߘߎ߭ߡߊ߬'); }, 1000);

                }
                function chargerFootDePreAlphabet() {
                    
                    var cercles_html = cerclesHTML();
                    var pre_apprentisssage_btn_html = "\
                        <div class='titre_de_parti'> ߞߎߘߎ߲</div> \
                        <div id='cercles_des_partis'>"+cercles_html+"</div> \
                    ";
                
                    $('#pre_apprentissage_btns').html(pre_apprentisssage_btn_html);

                    
                    function cerclesHTML() {
                        var html_1 = '<div id="cercles_des_partis_cadre">';
                        for(var i=0;i<5;i++) { 
                            var index = (i==0) ? parseIntNko(i+1)+'߭' : parseIntNko(i+1)+'߲';
                            html_1 += (i == 4) ? "<span id='cercle_"+i+"' class='cercle'>ߓߍ߯</span>" : "<span id='cercle_"+i+"' class='cercle'>"+index+"</span>"; 
                        }
                        html_1 += '</div>';
                        return html_1;
                    }
                }
                function chargerCorpsDePreAlphabet() {
                    $('#apprentissage_body').html(preApprentissageCorpsHTML());  // Voir fonction preApprentissageCorpsHTML() dans fonctions.js
                                
                    function preApprentissageCorpsHTML() {
                        var c = alphabet_nko[0];
                        c.push('');

                        var a_html = "<div id = 'table_pre_apprentissage'>\n";
                            for(var i=0;i<21;i+=7) {
                                a_html += "<div class='pre_apprentissage_tr'>\n";
                                    for(var j=0;j<7;j++) a_html += "<span class='pre_apprentissage_td'>"+c[i+j]+"</span>\n";
                                a_html += "</div>\n";
                            }
                            for(var k=21;k<28;k+=7){
                                a_html += "<div class='pre_apprentissage_tr'>\n";
                                    for(var l=0;l<7;l++) a_html += "<span class='pre_apprentissage_td'>"+c[k+l]+"</span>\n";
                                a_html += "</div>\n";
                            }
                        a_html += "</div>";
                                
                        return a_html;
                    }
                }
            }
            function afficherPreApprendreAlphabet() {

                alphabet_tr_index = (alphabet_tr_index == null) ? 1 : alphabet_tr_index

                let cercle_actif = $('.cercle:nth-child('+alphabet_tr_index+')');

                afficherApprentissage();
                afficherPreApprentissageBtns();
                tdStyle();
                cerclesStyle();


                function cerclesStyle() {
                    rendreActif(cercle_actif);
                    cercle_actif.prevAll().addClass('cercle_depasse');
                    cercle_actif.nextAll().addClass('cercle_a_faire');
                }
            }
            function apprendrePreAlphabet() {
                $('.pre_apprentissage_td, .cercle:not(.actif)').click(function() { secouer($('.cercle:nth-child('+alphabet_tr_index+')')); });
                $('#cercles_des_partis_cadre span').click(function() {

                    cercle_actif = $(this);
                    cercle_index = $(this).index();
                    rang = cercle_actif.text();

                    if(cercle_actif.attr('class') == 'cercle actif') {
                        
                        preparerPreAlphabet();
                        dispenserPreAlphabet();
    
                        function preparerPreAlphabet() {
                            
                            selectionDeLaLigneActive();
                            styleDeLaLigneActive();
                            traductionDeLaLigneActive();
                            afficherProgressBar(); 

                            viderNotification();
                            setTimeout(() => {
                                ecrire('notification_corps','ߛߓߍߘߋ߲߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߏ߫ ߌ ߞߣߐ߫. ');
                            }, 400);

                            les_lettres_actives = lesLettresActives();         
                            clickable_td = (pre_apprentissage_memoire == null) ? les_lettres_actives : lettres_apprises.concat(les_lettres_actives);
                            localStorage.setItem('clickable_td', JSON.stringify(clickable_td));
                            initialiserPreApprentissageData();

console.log('les_lettres_actives = '+les_lettres_actives);
console.log('clickable_td = '+clickable_td);
console.log('pre_apprentissage_memoire = '+pre_apprentissage_memoire);
console.log('pre_apprentissage_data = '+pre_apprentissage_data);

                            function selectionDeLaLigneActive() {
                                $('#tr_actif .pre_apprentissage_tr').unwrap();
                                $('#traducteur').remove();
                                $('.pre_apprentissage_tr:nth-child('+alphabet_tr_index+')').wrap('<div id="tr_actif"></div>');
                            }
                            function styleDeLaLigneActive() {
                                tdStyle();
                                $('#tr_actif .pre_apprentissage_td').css({'background-color':'#555', 'color':'yellow'});
                                if(alphabet_tr_index == 4) { $('#tr_actif .pre_apprentissage_td:last-child').css({'background-color':'transparent'}); }
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

                                    if(alphabet_tr_index == 1) {
                                        th += '<div class="traducteur_tr">';
                                            for(var i=0; i<7; i++) { th += '<span class="pre_td">'+alphabet_nko[1][i]+'</span>'; }
                                        th += '</div>';
                                        // th += '<div class="traducteur_tr">';
                                        //     for(var i=0; i<7; i++) { th += '<span class="pre_td">'+alphabet_nko[2][i]+'</span>'; }
                                        // th += '</div>';
                                    }
                                    if(alphabet_tr_index == 2) {
                                        th += '<div class="traducteur_tr">';
                                            for(var j=7; j<14; j++) { th += '<span class="pre_td">'+alphabet_nko[1][j]+'</span>'; }
                                        th += '</div>';
                                        // th += '<div class="traducteur_tr">';
                                        //     for(var j=7; j<14; j++) { th += '<span class="pre_td">'+alphabet_nko[2][j]+'</span>'; }
                                        // th += '</div>';
                                    }
                                    if(alphabet_tr_index == 3) {
                                        th += '<div class="traducteur_tr">';
                                            for(var k=14; k<21; k++) { th += '<span class="pre_td">'+alphabet_nko[1][k]+'</span>'; }
                                        th += '</div>';
                                        // th += '<div class="traducteur_tr">';
                                        //     for(var k=14; k<21; k++) { th += '<span class="pre_td">'+alphabet_nko[2][k]+'</span>'; }
                                        // th += '</div>';
                                    }
                                    if(alphabet_tr_index == 4) {
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
                            function afficherProgressBar() {
                                $('#pre_apprentissage_dialogue_btn').css('display','none');
                                $('.progress_bar').css('display','block');
                            }
                            function lesLettresActives() {
                                var la = [];
                                for(var i=0; i<$('#tr_actif .pre_apprentissage_td').length; i++) {
                                    let n = i+1;
                                    let td_value = $('#tr_actif .pre_apprentissage_td:nth-child('+n+')').html();
                                    if(td_value != '') { la.push(td_value); }
                                }
                                return la;
                            }
                            function initialiserPreApprentissageData() {
                                for(let i=0; i<les_lettres_actives.length; i++) { 
                                    pre_apprentissage_data.push([les_lettres_actives[i], 0, 0]); 
                                }
                            }
                        }
                        function dispenserPreAlphabet() {

                            let apprentissage_width = 0;
                            let clicks_counter = 0;
                            let clicked_td_length = 0;
                            let global_clicks_counter = 1;
                            let total_yellow_letter = ($('#tr_actif').index() === 3) ? 6 : $('#tr_actif span').length;

                            $.each($('.pre_apprentissage_td'), function() {
                                
                                let td_actif = $(this);
                                let td_click_counter = 1;
                                
                                td_actif.click(()=>{

                                    let clicked_letter = $(this).text();
                                    let td_index = $(this).index();
                                    let click_count = clicks_counter++;
                                    let td_click_count = td_click_counter++;

                                    if(clickable_td.includes(clicked_letter)) {

                                        lire('alphabet',clicked_letter);

                                        if(les_lettres_actives.includes(clicked_letter)) {
                                            
                                            styleDesTdDeLaLigneActive();
                                            enregistrerPreApprendreAlphabet();
                                            progressBarPreApprendreAlphabet();
                                            finDePreApprendreAlphabet(); 
                            
                                            function styleDesTdDeLaLigneActive() {
                                                if(td_click_count == quantite_normale_de_click) { 
                                                    td_actif.css('background-color','transparent'); 
                                                    clicked_td_length++;
                                                } 
                                            }
                                            function enregistrerPreApprendreAlphabet() {
                                                let point = (td_click_count >= quantite_normale_de_click) ? 1 : 0;
                                                pre_apprentissage_data.splice(td_index,1,[clicked_letter,td_click_count,point]);
                                            }
                                            function progressBarPreApprendreAlphabet() {
                                                if(td_click_count <= quantite_normale_de_click) {

                                                    let clicked_td_length = quantite_normale_de_click*les_lettres_actives.length;
                                                    let diagramm_unity = 100/clicked_td_length;
                                                    let global_clicks_count = global_clicks_counter++;

                                                    apprentissage_width = global_clicks_count*diagramm_unity;
                                                    $('.progress_bonne_reponse_bar').css('width', apprentissage_width+'%');
                                                
                                                //Initialiser la barre de progression
                                                    if(global_clicks_count/quantite_normale_de_click == les_lettres_actives.length) { 
                                                        setTimeout(() => {
                                                            $('.progress_bar').css('display','none'); 
                                                            $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);
                                                            td_click_counter = 0;
                                                            td_click_count = 0;
                                                            apprentissage_width = 0;
                                                            global_clicks_counter = 1;
                                                        }, 400);
                                                    }
                                                }
                                            }
                                            function finDePreApprendreAlphabet() {
                                                if(clicked_td_length === total_yellow_letter*quantite_normale_de_click) {
                                                    
                                                    $('#apprentissage_head').click(function() {
                                                        chargerResultat(pre_apprentissage_data);
                                                        adapterLeResultatAuFormatDApprentissage(pre_apprentissage_data);
                                                        afficherApprendrePreResultat();
                                                        masquerApprendrePreResultat();
                                                    });
                                        
                                                    viderNotification();
                                                    setTimeout(() => {
                                                        ecrire('notification_corps','\
                                                            ߣߌ߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߓߘߊ߫ ߟߐ߲߫ ߌ ߓߟߏ߫߸ ߢߊ߯ߡߌߟߊ߲ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫߹) ߞߊ߬ ߘߋ߲߬ߣߍ߲߬ ߞߎߘߊ ߟߎ߬ ߢߊ߯ߡߌ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߞߊ߲ߡߊ߬.\
                                                        ');
                                                    }, 400);


                                                    stockerPreApprendreAlphabet();
                                                    afficherPreExerciceBtns();
                                                    rendreActif($('#pre_exercice_bouton'));
                                                    viderLeTableau(pre_apprentissage_data);
                                                    reprendreApprentissagePreAlphabet();
                                                    exercerPreAlphabet();
                                                    
                                                    
                                                    function stockerPreApprendreAlphabet() {
                                                        if(clicked_td_length === total_yellow_letter) {

                                                            pre_apprentissage_memoire = (pre_apprentissage_memoire  == null) ? pre_apprentissage_data : pre_apprentissage_memoire.concat(pre_apprentissage_data);
                                                            localStorage.setItem('pre_apprentissage_memoire', JSON.stringify(pre_apprentissage_memoire));
                                            
    console.log('pre_apprentissage_data = '+pre_apprentissage_data);
    console.log('pre_apprentissage_memoire = '+pre_apprentissage_memoire);
    console.log('pre_apprentissage_memoire_ln = '+pre_apprentissage_memoire.length);

                                                            if(pre_apprentissage_memoire.length == 27) { 
                                                                sendLessonDataToDB('alphabet_apprentissage',pre_apprentissage_memoire);
                                                                console.log('Lesson de pre_apprentissage envoyée à la base de donnée.');
                                                            }
                                                        } 
                                                    }
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
                                                                viderLeTableau(pre_apprentissage_data);
                                                                apprentissagePreAlphabet();
                                                                $('.progress_bar').css('display','none');
                                                            }, 400);
                                                        });
                                                    }
                                                    function exercerPreAlphabet() {

                                                        exercicePreAlphabet();

                                                        $('#avance').click(function() {
                                                            goUp($('.resultat_container'));
                                                            afficherExercice();
                                                            $('#pre_exercice_bouton').click();
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    } 
                                });
                            });
                        }
                    }
                });
            }
            function tdStyle() {
                if(pre_apprentissage_memoire != null) {
                    $.each($('.pre_apprentissage_td'), function() {
                        let td = $(this);
                        let letter = td.text();
                        if(lettres_apprises.includes(letter)) { td.css({
                            'background-color':'rgba(85, 85, 85, 0.25)', 
                            'color':'#fff',
                        }); }
                    });  
                }
            }
            function cercleRang() {
                let cr = '';

                if(alphabet_tr_index === 1) { cr = 'ߝߟߐߡߊ'; }
                if(alphabet_tr_index === 2) { cr = 'ߝߌߟߊߣߊ߲'; }
                if(alphabet_tr_index === 3) { cr = 'ߛߓߊߣߊ߲'; }
                if(alphabet_tr_index === 4) { cr = 'ߣߊ߯ߣߌߣߊ߲'; }

                return cr;
            }
        }
        function exercicePreAlphabet() {
            $('#pre_exercice_bouton').click(function(e) {
          
                e.stopImmediatePropagation();
     
                $('.fermeture_pre').attr('id','fermeture_pre_exercice');
                
                let pre_exercice_memoire = JSON.parse(localStorage.getItem('pre_exercice_memoire'));
                let pre_exercice_data = [];
                
                exercice_btn_id = $(this).attr('id');
                questions_posees.splice(0,questions_posees.length);
                exercice_pre_questions = malaxer(malaxer(les_lettres_actives));
                total_questions = exercice_pre_questions.length;
                    
                chargerPreExerciceAlphabet();
                afficherPreExerciceAlphabet();
                exercicerAlphabet();


                function chargerPreExerciceAlphabet() {
                    
                    chargerEnteteDePreExerciceAlphabet();
                    chargerPiedDePreExerciceAlphabet();
                    chargerCorpsDePreExerciceAlphabet();
                
                    function chargerEnteteDePreExerciceAlphabet() {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
                    }
                    function chargerPiedDePreExerciceAlphabet() {
                        total_questions = exercice_pre_questions.length;
                        $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ ߁߭ ߟߊߡߍ߲߫');
                    }
                    function chargerCorpsDePreExerciceAlphabet() {
                        var exercice_body_html = lessonHTML(exercice_pre_questions, '');
                        $('#exercice_body').html(exercice_body_html);

                     /*revision body est chargé mais doit etre invisible jusqu'à l'éxécution de la fonction afficherPreRevisionAlphabet()*/
                        $('#revision_body td').css({'transform':'scale(0.75)', 'opacity':0});
                    }  
                }
                function afficherPreExerciceAlphabet() {

                    afficherExercice();
                    afficherEnteteDePreExerciceAlphabet();
                    afficherPiedDePreExerciceAlphabet();
                    afficherCorpsDePreExerciceAlphabet();
                    

                    function afficherEnteteDePreExerciceAlphabet() {}
                    function afficherPiedDePreExerciceAlphabet() {
                        zoomUp($('#exercice_dialogue_btn'));
                        $('#exercice_redirection_btns').css('display','none');
                        $('.progress_bar').css('display','block');
                    }
                    function afficherCorpsDePreExerciceAlphabet() {
                        
                        afficherPreExerciceCadres();
                        afficherPreExerciceContenus();
                        gestionDeExerciceFootBtn();
            
            
                        function afficherPreExerciceCadres() { $('#exercice_body').css({'display':'block'}); }
                        function afficherPreExerciceContenus() { affichageAnimeDeTable($('#exercice_body table')); }
                        function gestionDeExerciceFootBtn() {

                            total_questions = exercice_pre_questions.length;

                            $('#exercice_repeter_question_btn').css('display','none');
                            $('#exercice_correction_btn').css('display','none');
                            $('#exercice_question_btn').css('display','block');
                            rendreActif($('#exercice_question_btn'));

                            $('#exercice_question_btn').click(function() { 
                                $('#exercice_question_btn').css('display','none');
                                $('#exercice_correction_btn').css('display','none');
                                setTimeout(() => { 
                                    rendreActif($('#exercice_repeter_question_btn'));
                                    $('#exercice_repeter_question_btn').css('display','block'); 
                                }, 200);
                            });

                            $('#exercice_body td').click(function() {
                            
                                if(pre_question === '') { return; }
                                $('#exercice_question_btn').css('display','none');
                                $('#exercice_repeter_question_btn').css('display','none');
                                setTimeout(() => { 
                                    rendreActif($('#exercice_correction_btn'));
                                    $('#exercice_correction_btn').css('display','block'); 
                                }, 200);
                            });

                            $('#exercice_correction_btn').click(function() { 
                                if(questions_posees.length <= total_questions) { 
                                    $('#exercice_repeter_question_btn').css('display','none');
                                    $('#exercice_correction_btn').css('display','none');
                                    setTimeout(() => { 
                                        rendreActif($('#exercice_question_btn'));
                                        $('#exercice_question_btn').css('display','block'); 
                                    }, 200);
                                }
                                if(questions_posees.length == total_questions) { 
                                    $('#exercice_repeter_question_btn').css('display','none');
                                    $('#exercice_correction_btn').css('display','none');
                                    $('#exercice_question_btn').css('display','none'); 
                                }
                            });
                        }
                    }
                }
                function exercicerAlphabet() {
        
                    viderNotification();
                    setTimeout(() => {
                        ecrire('notification_corps','\
                            ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫.\n ߦߋ߫ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߣߌ߫ ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߣߌ߫ ߛߊߞߍߟߌ ߟߎ߬ ߞߍ߫ ߦߊ߲߬߸ ߤߊ߲߯ ߞߐߝߟߌ߫ ߥߟߊ ߦߋ߫ ߓߐ߫.\
                        ');
                    }, 1000);

                    ecouterLaPreQuestion();
                    repondreLaPreQuestion();
                    corrigerLaPreQuestion();
                
        
                    function ecouterLaPreQuestion() {

                        let pre_questions = malaxer(exercice_pre_questions);
                        let total_questions = exercice_pre_questions.length;
                        let i=0;
                        
        console.log(pre_questions);
        
                        $('#exercice_question_btn').click(function() { 
                                
                            ordre_de_question = (total_questions == i+2) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                            $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                            $('#exercice_repeter_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(i+1)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯');
                            pre_question = pre_questions[i];
                                    
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
                                    rendreActif($('#exercice_correction_btn'));
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

                        let bonne_reponse_counter = 0;
                        let pre_question_counter = 0;
                        let total_questions = exercice_pre_questions.length;

                        $('#exercice_correction_btn').click(function() { 
                            if(questions_posees.length <= total_questions) { 

                                if(pre_question == '') { return false; }
                                if(pre_question == pre_reponse) { accorder(element_actif); }
                                if(pre_question != pre_reponse) { barrer(element_actif); }
            
                                rendreActif($('#exercice_question_btn')); 
                                setTimeout(() => {
                                    $('#exercice_body td').css('background-color','rgba(85,85,85,0.25)');
                                }, 800);
                                
                                enregistrerPreExerciceAlphabet();
                                progressBarPreExerciceAlphabet();
                                stockerPreExerciceAlphabet();
                                finDePreExerciceAlphabet();


                                function enregistrerPreExerciceAlphabet() {

                                    let total_questions = exercice_pre_questions.length;
                                    let question_reponse = [];

                                    if(questions_posees.length <= total_questions) {
                                    
                                        if(pre_question == '') { return false; }
                            
                                        point = (pre_question == pre_reponse) ? 1 : 0;
                                        question_reponse = [pre_question,pre_reponse,point];
                                        pre_exercice_data.push(question_reponse);
                                        
                                        if(pre_question == pre_reponse) { nbr_bonne_reponse++; point_total++; }
                                        if(pre_question != pre_reponse) { nbr_mauvaise_reponse++; }

                                        pre_question = '';
                                        pre_reponse = ''; 
                                    }
                
                                    if(questions_posees.length == total_questions) {
                                        pre_exercice_memoire = (pre_exercice_memoire  == null) ? pre_exercice_data : pre_exercice_memoire.concat(pre_exercice_data);
                                        localStorage.setItem('pre_exercice_memoire', JSON.stringify(pre_exercice_memoire));
                                    }
                                }
                                function progressBarPreExerciceAlphabet() {

                                    let total_questions = exercice_pre_questions.length;
                                    let pre_exercice_width = total_questions;
                                    let diagramm_unity = 100/pre_exercice_width;

                                    $('.progress_bar').css('display','block');

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
                                }
                                function stockerPreExerciceAlphabet() {
                                    if(questions_posees.length === total_questions) {
                                        if(pre_exercice_memoire.length == 27) { 
                                            sendLessonDataToDB('alphabet_exercice',pre_exercice_memoire);
                                            console.log('Lesson de pre_exercice envoyée à la base de donnée.');
                                        }
                                    } 
                                }
                                function finDePreExerciceAlphabet() {
                                    if(questions_posees.length === total_questions) {  

                                        let n_q = total_questions;
                                        let n_m_r = nbr_mauvaise_reponse;

                                        taux_de_fausse_reponse = Math.ceil((n_m_r/n_q)*100);
                                        taux_de_vraie_reponse =  100 - taux_de_fausse_reponse;

                
                                        fermerPreExercice();
                                        // preExerciceResultat();                            

                                        if(taux_de_vraie_reponse < 100) { 
                                            let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                            ecrire('notification_corps',notification);
                                            afficherPreExerciceBouton();
                                            reprendreExercicePreAlphabet(); 
                                        }
                                        if(taux_de_vraie_reponse == 100) { 
                                            let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                            
                                            ecrire('notification_corps',notification);
                                            continuSurRevisionPreAlphabet(); 
                                        }
                                    
                                        function fermerPreExercice() {
                                            $('#apprentissage .fermeture_pre').one('click',function(){    
                    
                                                let lesson_a_fermer = $('#pre_exercice');
                                                                    
                                                cercle_id = $('.apprentissage_en_cours').attr('id');
                                                exercice_btn_id = $('.exercice_en_cours').attr('id');
                            
                                                zoomDown(lesson_a_fermer);
                                                setTimeout(() => {
                                                    $('#exercice_body').css('display','none');
                                                    $('#pre_exercice_resultat').css('top','-100%');
                                                }, 250);
                            
                                                setTimeout(() => {
                                                    if(taux_de_vraie_reponse < 100) {
                                                        $('#pre_exercice_bouton').text('ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯'); 
                                                        afficherPreExerciceBtns();
                                                    }
                                                    if(taux_de_vraie_reponse == 100) {
                                                        afficherPreRevisionBtn();
                                                    }
                                                }, 250);
                                            });
                                        } 
                                        function preExerciceResultat() {
                                                        
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
                                        function reprendreExercicePreAlphabet() {
                                        
                                            exercicePreAlphabet();
                                            viderNotification();

                                            // setTimeout(() => { $('#pre_exercice_bouton').click(); }, 1000);
                                            
                                            $('#reprendre').click(function() {
                                                goUp($('.resultat_container'));
                                                $('#pre_exercice_bouton').click();
                                            });
                                        }
                                        function continuSurRevisionPreAlphabet() {

                                            afficherPreRevisionBouton();
                                            revisionPreAlphabet();

                                            $('#avance').click(function() { 
                                                goUp($('.resultat_container'));
                                                $('#pre_revision_bouton').click();
                                            });
                                        }
                                    }
                                }
                            } 
                        });
                    }
                }
            });
        }
        function revisionPreAlphabet() {
            $('#pre_revision_bouton').click(function(e) {
                e.stopImmediatePropagation();    
 
                $('.fermeture_pre').attr('id','fermeture_pre_revision');
                
                let pre_revision_memoire = JSON.parse(localStorage.getItem('pre_revision_memoire'));
                let pre_revision_data = [];

                questions_posees.splice(0,questions_posees.length);
                revision_pre_questions = malaxer(clickable_td);
                total_questions = revision_pre_questions.length;
                    
                chargerPreRevisionAlphabet();
                afficherPreRevisionAlphabet();
                preRevisionAlphabet();


                function chargerPreRevisionAlphabet() {
                    
                    chargerEnteteDePreRevisionAlphabet();
                    chargerPiedDePreRevisionAlphabet();
                    chargerCorpsDePreRevisionAlphabet();
                
                    function chargerEnteteDePreRevisionAlphabet() {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߣߐ߰ߡߊ߬ߛߍߦߌ</h3>');
                    }
                    function chargerPiedDePreRevisionAlphabet() {
                        $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ ߁߭ ߟߊߡߍ߲߫');
                    }
                    function chargerCorpsDePreRevisionAlphabet() {
                        var revision_body_html =  lessonHTML(revision_pre_questions, '');
                        $('#revision_body').html(revision_body_html);

                    /*revision body est chargé mais doit etre invisible jusqu'à l'éxécution de la fonction afficherPreRevisionAlphabet()*/
                        $('#revision_body td').css({'transform':'scale(0.75)', 'opacity':0});
                }  
                }
                function afficherPreRevisionAlphabet() {

                    afficherRevision();

                    afficherEnteteDePreRevisionAlphabet();
                    afficherPiedDePreRevisionAlphabet();
                    afficherCorpsDePreRevisionAlphabet();
                    

                    function afficherEnteteDePreRevisionAlphabet() {}
                    function afficherPiedDePreRevisionAlphabet() {
                        zoomUp($('#revision_dialogue_btn'));
                        $('.dialogue_btn').css('display','block');
                        
                        $('#revision_dialogue_btn .redirection_btns').css('display','none');
                    }
                    function afficherCorpsDePreRevisionAlphabet() {
                            
                        afficherPreRevisionCadres();
                        afficherPreRevisionContenus();
                        gestionDeRevisionFootBtn();
            
            
                        function afficherPreRevisionCadres() {
                            $('#revision_body').css({'display':'block'}); 
                            setTimeout(function() { afficher($('#revision_container')); }, 200); 
                        }
                        function afficherPreRevisionContenus() {
            
                            // afficherRevisionDeLaLigneEnCours();
                            afficherRevisionDeToutesLesLignesEtudiees();
                                
                            function afficherRevisionDeLaLigneEnCours() { affichageAnimeDesTd($('#revision_body td')); }
                            function afficherRevisionDeToutesLesLignesEtudiees() {
                                setTimeout(function() { affichageAnimeDeTable($('#revision_body table')); }, 300); 
                            }
                        }
                        function gestionDeRevisionFootBtn() {

                            total_questions = revision_pre_questions.length;

                            $('#revision_repeter_question_btn').css('display','none');
                            $('#revision_correction_btn').css('display','none');
                            $('#revision_question_btn').css('display','block');
                            rendreActif($('#revision_question_btn'));

                            $('#revision_question_btn').click(function() { 
                                $('#revision_question_btn').css('display','none');
                                $('#revision_correction_btn').css('display','none');
                                setTimeout(() => { 
                                    rendreActif($('#revision_repeter_question_btn'));
                                    $('#revision_repeter_question_btn').css('display','block'); 
                                }, 200);
                            });

                            $('#revision_body td').click(function() {
                            
                                if(pre_question === '') { return; }
                                $('#revision_question_btn').css('display','none');
                                $('#revision_repeter_question_btn').css('display','none');
                                setTimeout(() => { 
                                    rendreActif($('#revision_correction_btn'));
                                    $('#revision_correction_btn').css('display','block'); 
                                }, 200);
                            });

                            $('#revision_correction_btn').click(function() { 
                                if(questions_posees.length <= total_questions) { 
                                    $('#revision_repeter_question_btn').css('display','none');
                                    $('#revision_correction_btn').css('display','none');
                                    setTimeout(() => { 
                                        rendreActif($('#revision_question_btn'));
                                        $('#revision_question_btn').css('display','block'); 
                                    }, 200);
                                }
                                if(questions_posees.length == total_questions) { 
                                    $('#revision_repeter_question_btn').css('display','none');
                                    $('#revision_correction_btn').css('display','none');
                                    $('#revision_question_btn').css('display','none'); 
                                }
                            });
                        }
                    }
                }
                function preRevisionAlphabet() {
                  
                    viderNotification();
                    setTimeout(() => {
                        let notification = "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߠߎ߬ ߟߋ߬ ߓߍ߯ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫";
                        ecrire('notification_corps',notification);
                    }, 1000);

                    revision_pre_questions = malaxer(revision_pre_questions);
console.log(revision_pre_questions);  

                    ecouterLaPreQuestion();
                    repondreLaPreQuestion();
                    corrigerLaPreQuestion();
                
        
                    function ecouterLaPreQuestion() {

                        let i=0;

                        $('#revision_question_btn').click(function() { 
        console.log(total_questions +'=='+ i);                        
                            ordre_de_question = (total_questions == i) ? 'ߟߊߓߊ߲' : parseIntNko(i);
                            $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                            $('#revision_repeter_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(i+1)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯');
                            
                            pre_question = revision_pre_questions[i];
                            
                            if(i < revision_pre_questions.length) { 
                                lire('alphabet',pre_question); 
                                relire(pre_question); 
                                questions_posees.push(pre_question);
                            }

                            i++; 

                            if(total_questions == i) { 
                                $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').off('click');
                                i = 0; 
                            }

                            function relire(pre_question) { $('#revision_repeter_question_btn').click(function() { lire('alphabet',pre_question); }); }
                        });
                    }
                    function repondreLaPreQuestion() {
                        $.each($('#revision_body td'), function() {
                            $(this).click(function(){
                                if(pre_question !== '') {
                                    pre_reponse = this.innerHTML;
                    
                                    element_actif = $(this);
                                    $(element_actif).css('background-color','#aaa').siblings().css('background-color','rgba(85,85,85,0.25)');
                                    rendreActif($('#revision_correction_btn'));
                                }
            
                                if(pre_question == '') { 
                                    $('#revision_question_btn').addClass('clignotant'); 
                                    setTimeout(function() { $('#revision_question_btn').removeClass('clignotant'); }, 1200);
                                    return;
                                }
                            });
                        });
                    }
                    function corrigerLaPreQuestion() {

                        let pre_question_counter = 0;
                        let bonne_reponse_counter = 0;
                        let taux_de_vraie_reponse = 0;
                        let pre_revision_width = total_questions;
                        let diagramm_unity = 100/pre_revision_width;

                        $('#revision_correction_btn').click(function() { 
                            if(questions_posees.length <= total_questions) { 

                                $('#revision_container .table_parlante td').css('background-color','rgba(85, 85, 85, 0.25)');
            
                                correctionDEvaluation();
                                enregistrerPreEvaluerAlphabet();
                                progressBarrPreEvaluerAlphabet();
                                stockerPreEvaluerAlphabet();
                                finDePreEvaluerAlphabet();
            
                                rendreActif($('#revision_question_btn')); 

                                
                                function correctionDEvaluation() {
                                    if(pre_question == '') { return false; }
                                    if(pre_question == pre_reponse) { accorder(element_actif); }
                                    if(pre_question != pre_reponse) { barrer(element_actif); }
                                }
                                function enregistrerPreEvaluerAlphabet() {

                                    let total_questions = revision_pre_questions.length;

                                    let question_reponse = [];

                                    if(questions_posees.length <= total_questions) {
                                    
                                        if(pre_question == '') { return false; }
                            
                                        point = (pre_question == pre_reponse) ? 1 : 0;
                                        question_reponse = [pre_question,pre_reponse,point];
                                        pre_revision_data.push(question_reponse);
                                        
                                        if(pre_question == pre_reponse) { nbr_bonne_reponse++; point_total++; }
                                        if(pre_question != pre_reponse) { nbr_mauvaise_reponse++; }

                                        pre_question = '';
                                        pre_reponse = ''; 
                                    }
                
                                    if(questions_posees.length == total_questions) {  
                                        pre_revision_memoire = (pre_revision_memoire  == null) ? pre_revision_data : pre_revision_memoire.concat(pre_revision_data);
                                        localStorage.setItem('pre_revision_memoire', JSON.stringify(pre_revision_memoire));
console.log('pre_revision_data = '+pre_revision_data);
console.log('pre_revision_memoire = '+pre_revision_memoire);
                                    }
                                }
                                function progressBarrPreEvaluerAlphabet() {

                                    $('.progress_bar').css('display','block');
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
                                }
                                function stockerPreEvaluerAlphabet() {
                                    if(pre_revision_memoire != null) {
                                    if(pre_revision_memoire.length === 27) {
                                        sendLessonDataToDB('alphabet_evaluation',pre_revision_memoire);
                                        console.log('Lesson de pre_revision envoyée à la base de donnée.');
                                    }}
                                }
                                function finDePreEvaluerAlphabet() {                             
                                    if(questions_posees.length === total_questions) {
                                    
                                        let n_q = total_questions;
                                        let n_m_r = nbr_mauvaise_reponse;

                                        taux_de_fausse_reponse = Math.ceil((n_m_r/n_q)*100);
                                        taux_de_vraie_reponse =  100 - taux_de_fausse_reponse;
console.log('Fin d\'apprentissage');
                                        fermerPreEvaluer();
                                        preEvaluerResultat();
                                    
                                        if(taux_de_vraie_reponse >= 92) {

                                            // ecrire('notification_corps','\
                                            //     '+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߊ߬ߣߍ߲߬\n\
                                            //     ߞߎߘߎ߲߫ ߁߭ ߤߊ߲߯ ߞߎߘߎ߲߫ '+cercle_actif.html()+' ߠߎ߬ ߓߍ߯ ߓߘߊ߫ ߢߊߦߋ߫ ߌ ߓߟߏ߫\n\
                                            //     ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߋ߲߰.\n\
                                            //     ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹\n\
                                            //     ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)\
                                            // ');
                                            
                                            clickable_td = lettresPreApprises();
                                            clickable_td = clickable_td.concat(les_lettres_actives);
                                            localStorage.setItem('clickable_td', JSON.stringify(clickable_td));
                    console.log('les_lettres_actives = '+les_lettres_actives);                    
                    console.log('clickable_td = '+clickable_td); 
                    
                                            continuSurApprendrePreAlphabet(); 
                                            reprendreRevisionPreAlphabet();
                                            
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
                                        if(taux_de_vraie_reponse < 92) {
                                            ecrire('notification_corps','\
                                                '+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߡߊ߫ ߢߊ߬\n\
                                                ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߌ߲߬ ߘߐ߫.\n\
                                                ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹\n\
                                                ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)\
                                            '); 
                                            reprendreRevisionPreAlphabet();       
                                        }
                                    
                                    
                                        function fermerPreEvaluer() {
                                            $('#apprentissage .fermeture_pre').one('click',function(){    
                    
                                                let lesson_a_fermer = $('#pre_revision');
                                                                    
                                                cercle_id = $('.apprentissage_en_cours').attr('id');
                                                revision_btn_id = $('.revision_en_cours').attr('id');
                            
                                                zoomDown(lesson_a_fermer);
                                                setTimeout(() => {
                                                    $('#revision_body').css('display','none');
                                                    $('#pre_revision_resultat').css('top','-100%');
                                                }, 250);
                            
                                                setTimeout(() => {
                                                        
                                                    if(taux_de_vraie_reponse < 100) {
                                                        afficherPreRevisionBtn();
                                                        $('#pre_revision_bouton').text('ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                                                    }
                                                    if(taux_de_vraie_reponse == 100) {
                                                        afficherPreApprentissageBtns();
                                                        $('#'+cercle_id).removeClass('apprentissage_en_cours').addClass('cercle_depasse');
                                                        rendreActif($('#'+cercle_id).next()); 
                                                        
                                                        ecrire('notification_corps','ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߌ߲߯ ߘߎ߭ߡߊ߬');
                                                    }
                                                }, 250);
                                            });
                                        } 
                                        function preEvaluerResultat() {
                
                                            formatParDefautDuResultat();
                                            chargerResultat(pre_revision_memoire);
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
                                        function reprendreRevisionPreAlphabet() {
                                            $('#reprendre').click(function() {
                                                goUp($('.resultat_container'));
                                                setTimeout(() => { 
                                                    $('#pre_revision_bouton').click();
                                                }, 400);
                                            });
                                        }
                                        function continuSurApprendrePreAlphabet() {
                                            
                                            alphabet_tr_index++; 
                                            localStorage.setItem('alphabet_tr_index',JSON.stringify(alphabet_tr_index));
                                            afficherPreApprentissageBtns();
                                            apprentissagePreAlphabet();
                                            viderNotification();
                                            $('.progress_bar').css('display','none');
                                            setTimeout(() => { ecrire('notification_corps','ߞߏ߰ߙߌ߬ '+alphabet_tr_index+'߲ ߘߌ߲߯ ߘߎ߭ߡߊ߬'); }, 1000);
                                            setTimeout(() => { $('#cercles_des_partis_cadre span:nth-child('+alphabet_tr_index+')').click(); }, 1000);

                                            $('#avance').click(function() {
                                                goUp($('.resultat_container'));
                                                $('#alphabet_apprentissage').click();
                                                setTimeout(() => { $('#cercles_des_partis_cadre span:nth-child('+alphabet_tr_index+')').click(); }, 1000);
                                            });
                                        }
                                    }
                                }
                            } 
                        });
                    }
                }
            });
        }
    }
    function apprendreAlphabet() {
        
        var table_id = $('.table_parlante').attr('id');
            
        var table = $('#'+table_id); 
        var tr = $('#'+table_id+' tr');
        var td = $('#'+table_id+' td');
        var nbr_table = table.length;
        var nbr_tr = tr.length;
        var nbr_td = td.length;

        var apprentissage_clicks_memo = [];

        var nbr_tr = tr.length;
        var nbr_td = td.length;
        var apprentissage_clicks_memo = [];
        let nbr_raisonnable_de_click = 1;
        let clicked_elements_quantity = 0;


        switch(phase_id) {
            case 'alphabet_apprentissage' : apprentissageAlphabet(); break;
            case 'alphabet_exercice'      : exerciceAlphabet();   break;
            case 'alphabet_revision'      : revisionAlphabet();   break;
            case 'alphabet_evaluation'    : evaluationAlphabet();   break;
        }


        function apprentissageAlphabet() {

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

                afficherEnteteDeAlphabet();
                afficherFootDeAlphabet();
                afficherCorpsDeAlphabet();
                        
                function afficherEnteteDeAlphabet() {}
                function afficherFootDeAlphabet() {
                    
                    zoomDown($('.dialogue_btn')); 

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
                
                let clicked_td_length = nbr_raisonnable_de_click*nbr_td;
                let barr_unity = 100/clicked_td_length;
                let elements_clickes = [];
                let click_counter = 0;
                
                $('.progress_bar').css('display','block');

                $.each(td, function() {
                    let td_counter = 0;

                    $(this).css({'background-color':'rgba(85,85,85,1)', 'color':'yellow'});
                    $(this).click(function(){
                        td_counter++;
                        if(td_counter <= nbr_raisonnable_de_click) {
                            
                            click_counter++;
                            $('.progress_bonne_reponse_bar').css('width',click_counter*barr_unity+'%');

                            if(click_counter === clicked_td_length) {
                                setTimeout(() => { $('.progress_bar').css('display','none'); }, 1000);
                            }
                        }

                        if(td_counter === nbr_raisonnable_de_click) { 
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
                
                let clicked_td_length = nbr_raisonnable_de_click*nbr_td;
                let click_counter = 0;

                $('.notification_titre').text(liste_de_matieres[0][1]+' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');

                viderNotification();
                setTimeout(() => {
                    ecrire('notification_corps','\
                        ߛߓߍߘߋ߲ ߠߎ߬ ߓߍ߯ ߘߌ߲߯ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߊ߬ ߣߴߌ ߦߴߌ ߖߊ߲߬ߕߏ߬ ߊ߬ߟߎ߬ ߝߐߢߊ ߘߐ߫ ߞߏߛߓߍ߫߹<br>\
                        ߌ ߣߊ߬ߕߐ߫ ߟߋ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ ߟߴߊ߬ߟߎ߬ ߓߍ߯ ߡߊ߬.\
                    ');
                }, 1000);

                $.each(td, function() {
                    $(this).click(function(){
                        
                        click_counter++;

                        if(click_counter === clicked_td_length) {
                            ecrire('notification_corps','\
                                ߌ ߞߎߟߎ߲ߖߋ߫ ߘߐ߬ߖߊ ߟߊ߫ ߛߓߍߘߋ߲ ߠߎ߫ ߘߋ߲߱ ߠߊ߫<br>\
                                ߣߴߌ ߓߘߴߊ߬ߟߎ߬ ߟߐ߲߫߸ ߓߐߟߌ߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫ ߛߊ߲ߝߍ߬ ߣߎߡߊ߲߫ ߓߟߏ ߟߊ߫)<br>\
                                ߣߴߌ ߘߏ߲߬ ߡߊ߫ ߓߊ߲߫ ߊ߬ߟߎ߬ ߟߐ߲߫ ߠߊ߫߸ ߒ߬ߓߊ߬ ߥߊ߫ ߘߋ߲߰ߠߌ ߡߊ߫ ߤߊ߲߯ ߌ ߦߴߊ߬ߟߎ߬ ߟߐ߲߫ ߞߊ߬ ߣߊ߬ߕߏ߫ ߓߐ߫ ߟߊ߫.\
                            ');

                            // zoomUp($('.dialogue_btn'));
                            setTimeout(() => { rendreActif($('#fermer_apprentissage')); }, 2000);
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
                            goUp($('.resultat_container'));
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
alert('afficherPreExerciceBouton');
                    afficherPreExerciceBouton();
                }
            }

        }    
        function exerciceAlphabet() {
                  
            let phase_id = JSON.parse(localStorage.getItem('phase_id'));
            var nbr_de_questionnaires = 20;
            var exercice_questions = [];
            var moyenne_d_exercice = 18;
            var note = 0;
        
            var question_posee = '', reponse_montree = ''; 
            var compteur_de_question = 1;
            var question_rang = '߭';
            var exercice_a_stocker = [];
            
        
            $('.fermeture').attr('id', 'fermer_exercice');

            $('#exercice_body').css('display','none');
            $('#apprentissage_container').css('display','none');
            $('#exercice_container').css('display','block');
            $('#evaluation_container').css('display','none');
            afficher($('.course'));
                
            
            reductionDesElementsDeExerciceCouranteA49(); // Réduction du nombre de questions à une quantité raisonable
            chargerExerciceAlphabet();
            afficherExerciceAlphabet();
            exercerAlphabetNko();
            enregistrerExerciceAlphabet();
            progressBarrExerciceAlphabet();
            stockerExerciceAlphabet();
            assistantExerciceAlphabet();
            finDExercice();
    
    
            function reductionDesElementsDeExerciceCouranteA49() {
                if($('#table_alphabet_exercice').length >= 6) {
                    for( var i = $('#table_alphabet_exercice').length-1; i > 6; i--) {
                        document.querySelector('#table_alphabet_exercice').deleteRow(i);
                    }
                    $.each($('#table_alphabet_exercice tr td'), function() {
                        exercice_questions.push($(this).html());
                    });
                }
                if($('#table_alphabet_exercice').length < 6) {
                    $.each($('#table_alphabet_exercice tr td'), function() {
                        exercice_questions.push($(this).html());
                    });
                }            
                
                exercice_questions = malaxer(exercice_questions);
            }
            function chargerExerciceAlphabet() {
                // Voir fonctions chargerLesson() / chargementDeLesson() dans parametrageDeLesson.js
            }
            function afficherExerciceAlphabet() {
    
                afficher($('#pre_exercice'));
                actualiserDialogueBtn();
                initialiserProgressBar();
    
                setTimeout(() => { zoomUp($('#exercice_dialogue_btn')); }, 400);
                gestionDeExerciceDialogueBtns();
    
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
                    rendreActif($('#exercice_dialogue_btn'));
                    $('.play_icon_container').on('click',function() {
                    
                        $('#question_rang').html(parseIntNko(compteur_de_question)+question_rang);
    
                        compteur_de_question++;
                        question_rang = '߲';
    
                        $('.ecouter_question').html(' ߠߊߡߍ߲߫');
                        $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
                        question_posee = exercice_questions[i];
        
                        lireQuestion();
                        i++;
                        
                        function lireQuestion() { lire('alphabet',question_posee); }
                    });
                }
                function repeterExerciceAlphabetQuestion(){ 
                    $('.oreille_icon_container').on('click', function() { lire('alphabet',question_posee); }); 
                }
                function repondreExerciceAlphabetQuestion(){
                            
                    $.each($('#table_alphabet_exercice td'), function() {
                        let td = $(this);
                        td.click(function() {
                            if(question_posee == '') { rappel($('#exercice_dialogue_btn')); return; }
                            if(question_posee != '') {
                                
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
                var td = $('#table_alphabet_exercice td');
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
    
                $('#table_alphabet_exercice td').one('click', function(){
                        
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
                $('#table_alphabet_exercice td').on('click', function() {
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
                
                viderNotification();
                setTimeout(() => {
                    ecrire('notification_corps','\
                        ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬߸ߦߋ߫ ߛߓߍߘߋ߲߫ ߟߊߡߍ߲ߣߍ߲ ߦߌ߬ߘߊ߬߸ ߤߊ߲߯ ߡߊ߬ߞߟߏ߬ߟߌ ߦߋ߫ ߓߊ߲߫.\
                    ');
                }, 1000);
                // if(compteur_de_question - 1 == nbr_de_questionnaires){ indexer($('#fermer_exercice')); }
            }
            function finDExercice() {
                $('#table_alphabet_exercice td').on('click', function() {
                    if(compteur_de_question - 1 == nbr_de_questionnaires){
                    // if(compteur_de_question == 3){
    
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
        }
        function revisionAlphabet() {}
        function evaluationAlphabet() {
 
            var matiere_nom = JSON.parse(localStorage.getItem('matiere_nom')); 
            var total_phase = $('.phases li').lenth;
            var questions_evaluation = JSON.parse(localStorage.getItem('questions'));
        
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
        
        
            chargerEvaluationAlphabet();
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
            function afficheEvaluationAlphabet() {
                
                $('#pratique_options').css('display','block');
                $('.fermeture').attr('id', 'fermer_evaluation'); 

                $('#exercice_body').css('display','none');
                $('#apprentissage_container').css('display','none');
                $('#exercice_container').css('display','none');
                $('#evaluation_container').css('display','block');
                afficher($('.course'));
                     
            }
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
        
                                var n = parseIntNko(evaluation_counter+1);
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
                
                viderNotification();
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
        $('#pre_apprentissage_btns').css('display','flex');
        $('#apprentissage_dialogue_btn').css('display','none');

        $('.redirection_btns').css('display','none');

        zoomUp($('.dialogue_btn'));
    }
    function afficherPreExerciceBtns() {  
        $('#apprentissage_dialogue_btn').css('display','none');

        $('#pre_apprentissage_btns').css('display','none');
        $('.redirection_btns').css('display','block');
   
        $('#pre_evaluation_bouton').css('display','none');
        $('#pre_exercice_bouton').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function afficherPreExerciceBouton() {  
        $('.progress_bar').css('display','none');
        $('#progress_bar_integre').css('display','none');
        $('#pre_apprentissage_btns').css('display','none');
        $('#panneaux').css('display','none');
        $('.redirection_btns').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');
        $('#exercice_redirection_btns').css('display','block');
   
        $('#pre_evaluation_bouton').css('display','none');
        $('#pre_exercice_bouton').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function afficherPreEvaluationBouton() {  

        $('#progress_bar_integre').css('display','none');
        $('#pre_apprentissage_btns').css('display','none');
        $('#panneaux').css('display','none');
        $('.redirection_btns').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');
   
        $('#pre_exercice_bouton').css('display','none');
        $('#pre_evaluation_bouton').css('display','block');
        $('#pre_revision_bouton').css('display','none');

        zoomUp($('.dialogue_btn'));
    }
    function afficherPreRevisionBouton() {  
        $('.progress_bar').css('display','none');
        $('#progress_bar_integre').css('display','none');
        $('#pre_apprentissage_btns').css('display','none');
        $('#panneaux').css('display','none');
        $('.redirection_btns').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');
        $('#exercice_redirection_btns').css('display','block');
   
        $('#pre_exercice_bouton').css('display','none');
        $('#pre_evaluation_bouton').css('display','none');
        $('#pre_revision_bouton').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function afficherPreRevisionBtn() {
        $('#apprentissage_dialogue_btn').css('display','none');

        $('#pre_apprentissage_btns').css('display','none');
        $('.redirection_btns').css('display','block');
   
        $('#pre_exercice_bouton').css('display','none');
        $('#pre_evaluation_bouton').css('display','block');

        zoomUp($('.dialogue_btn'));
    }
    function raffraichissementDeLaPage() {
        $('#fermer_pre_apprentissage, #fermer_apprentissage').on('click',function() { raffraichirLaPage(); });
    }                    
    function initialiserApprentissageResultat() { 

        questions_posees.splice(0,questions_posees.length); 
        pre_apprentissage_data.splice(0,pre_apprentissage_data.length); 
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
    function indice() {
        let n = 0;

        for(var i=0; i<pre_apprentissage_data.length; i++) {
            if(pre_apprentissage_data[i][1] >= quantite_normale_de_click) { n++; }
        }
        return n;
    } 
}