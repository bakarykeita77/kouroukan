function alphabet() {
  
    let element_actif = '';
    let matieres = JSON.parse(sessionStorage.getItem('matieres'));
    let matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));
    let phase_id = JSON.parse(sessionStorage.getItem('phase_id'));
    let phases_etudiees = [];
    let ordre_de_question = '';
    let total_questions = 0;
    let questions_posees = [];
    let total_questions_posees = 0;
    let pre_question = '', pre_reponse = '', question = '', reponse = '';

    let apprentissage_clicks_memo = [];
    let exercice_a_stocker = [];

    let nbr_bonne_reponse = 0;
    let nbr_mauvaise_reponse = 0;
    let taux_de_fausse_reponse = 0;
    let taux_de_vraie_reponse = 0;

    let point = 0;
    let pourcentage_general = 0;
    let point_total = 0;

    var nom = JSON.parse(sessionStorage.getItem('nom'));
    var prenom = JSON.parse(sessionStorage.getItem('prenom'));
    var niveaux_etudies = JSON.parse(sessionStorage.getItem('niveaux_etudies')); 
    var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var niveau_max = JSON.parse(sessionStorage.getItem('niveau_max'));   // Voir programmes.js fonction storagesDuProgramme()
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    var option_retenue = JSON.parse(localStorage.getItem('option_retenue')); // Voir programmes.js : lessonOptions()

    let apprentissage_data_memo = alphabetApprentisageDataMemo();
    let exercice_data_memo = alphabetExerciceDataMemo();
    let evaluation_data_memo = alphabetEvaluationDataMemo();
    
    let alphabet_data = [apprentissage_data_memo, exercice_data_memo, evaluation_data_memo];
    sessionStorage.setItem('alphabet_data', JSON.stringify(alphabet_data));

                 
    $('.direction').css('display','none');
  
    if(niveau_actif === 1) {
        if(option_retenue != null) {
            switch(option_retenue) {
                case 1 : preAlphabetNko(); break;
                case 2 : alphabetNko();  break;
            }
        }
    }

    function preAlphabetNko() {

        let matieres = JSON.parse(sessionStorage.getItem('matieres'));
        let pre_apprentissage_memo = JSON.parse(localStorage.getItem('pre_apprentissage_alpabet_memoire'));
        let pre_exercice_memo = JSON.parse(localStorage.getItem('pre_exercice_alpabet_memoire'));
        let pre_revision_memo = JSON.parse(localStorage.getItem('pre_evaluation_alpabet_memoire'));

        pre_apprentissage_memo = (pre_apprentissage_memo == null) ? [] : pre_apprentissage_memo;
        pre_exercice_memo = (pre_exercice_memo == null) ? [] : pre_exercice_memo;
        pre_revision_memo = (pre_revision_memo == null) ? [] : pre_revision_memo;

        let pre_apprentissage_alpabet_memoire = (apprentissage_data_memo == undefined) ? pre_apprentissage_memo : apprentissage_data_memo.concat(pre_apprentissage_memo);
        let pre_exercice_alpabet_memoire = (exercice_data_memo == undefined) ? pre_exercice_memo : exercice_data_memo.concat(pre_exercice_memo);
        let pre_evaluation_alpabet_memoire = (evaluation_data_memo == undefined) ? pre_revision_memo : evaluation_data_memo.concat(pre_revision_memo);

        let alphabet_data = [pre_apprentissage_alpabet_memoire, pre_exercice_alpabet_memoire, pre_evaluation_alpabet_memoire];
        sessionStorage.setItem('alphabet_data', JSON.stringify(alphabet_data));

                        
        let pre_apprentissage_data = [];
        let pre_exercice_data = [];
        
        let exercice_pre_questions = [];
        let evaluation_pre_questions = [];
        let cercle_actif = '';
        let cercle_id = '';

        let clickable_td = [];
        
        let lettres_apprises = [];
        let les_lettres_actives = [];
        let quantite_normale_de_click = 1;


        apprentissagePreAlphabet();
        exercicePreAlphabet();
        evaluationPreAlphabet();
        

        function apprentissagePreAlphabet() {
          
            let alphabet_tr_index = alphabetTrIndex();
            lettres_apprises = lettresApprises();

            chargerApprendrePreAlphabet();
            afficherApprendreAlphabet();
            tdStyle();
            cerclesStyle();
            apprendrePreAlphabet();
            lectureSimpleDeLAlphabet();
           

            function lettresApprises() {
                if(pre_apprentissage_alpabet_memoire != null) {
                let la = [];
                for(let i=0; i<pre_apprentissage_alpabet_memoire.length; i++) {
                    la.push(pre_apprentissage_alpabet_memoire[i][0]);
                }
                return la
                }
            }
            function chargerApprendrePreAlphabet() {

                chargerEnteteDePreAlphabet();
                chargerFootDePreAlphabet();
                chargerCorpsDePreAlphabet();
                
                function chargerEnteteDePreAlphabet() {
                    $('.notification_titre').html('ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                    viderNotification();
                    if(pre_apprentissage_alpabet_memoire.length < 27) {
                        setTimeout(() => { 
                            ecrire('notification_corps','ߞߏ߰ߙߌ߬ '+cercleRang() +' ('+parseIntNko(alphabet_tr_index)+'߲) ߘߌ߲߯ ߘߎ߭ߡߊ߬'); 
                        }, 3600);
                    }
                }
                function chargerFootDePreAlphabet() {
                    
                    var cercles_html = cerclesHTML();
                    var pre_apprentisssage_btn_html = "\
                        <div class='titre_de_parti'> ߞߎߘߎ߲</div> \
                        <div id='cercles_des_partis'>"+cercles_html+"</div> \
                    ";
                    $('#apprentissage_dialogue_btns').html(pre_apprentisssage_btn_html);
                    
                    $('#pre_apprentissage_bouton').text('ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߞߍ߫ ߕߎ߲߯');
                    $('#continu_sur_exercice_bouton').text('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫');
                    
                    
                    function cerclesHTML() {
                        var html_1 = '<div id="cercles_des_partis_cadre">';
                        for(var i=0;i<4;i++) { 
                            var index = (i==0) ? parseIntNko(i+1)+'߭' : parseIntNko(i+1)+'߲';
                            html_1 += "<span id='cercle_"+i+"' class='cercle'>"+index+"</span>"; 
                        }
                        html_1 += '</div>';
                        return html_1;
                    }
                }
            }
            function afficherApprendreAlphabet() {
                afficher($('.salle_de_classe'));
                afficher($('.course'));
        
                afficher($('#apprentissage_container'));
                masquer($('#exercice_container'));
                masquer($('#evaluation_container'));
                
                masquer($('#panneaux'));
                masquer($('#apprentissage_dialogue_btns'));
                masquer($('.redirection_btns'));
        
                setTimeout(() => { displayv($('#apprentissage_head')); }, 400);
        
                setTimeout(() => { 
                    displayv($('#apprentissage_body')); 
                    setTimeout(() => { afficherPreApprendreAlphabetTd(); }, 200);
                }, 600);
        
                setTimeout(() => { 
                    displayv($('#apprentissage_foot')); 
                    
                    displayv($('#apprentissage_dialogue_btns'));
                    $('#pre_apprentissage_btns').css('display','flex'); 
                    setTimeout(() => { afficherPreApprendreAlphabetCercles(); }, 400);
                }, 2600);
        
                
                function afficherPreApprendreAlphabetTd() { 
                    $('.pre_apprentissage_td, .table_parlante td').each(function() {
                        let row = $(this).parent();
                        let tr_index = row.index();
                        let td_index = $(this).index();
                        let index = tr_index*7 + td_index;  // 7 est le nombre maximal de td par tr.
                
                        setTimeout(() => { $(this).css('opacity',1); }, index*60);
                    });
                }
                function afficherPreApprendreAlphabetCercles() {
                    $.each($('.cercle'), function(){
                        let cercle_index = $(this).index();
                        setTimeout(() => { $(this).css({'opacity':1, 'transform':'scale(1.125)'}); }, cercle_index*80);
                    });
                }
            }
            function apprendrePreAlphabet() {

                rappelDuCercleActif();
                $('#cercles_des_partis_cadre span').on('mouseover', function() { $(this).removeClass('indicateur'); });
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
                            afficherApprentissageProgressBar(); 

                            viderNotification();
                            setTimeout(() => { ecrire('notification_corps','ߛߓߍߘߋ߲߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߏ߫ ߌ ߞߣߐ߫. '); }, 200);

                            les_lettres_actives = lesLettresActives();         
                            clickable_td = (pre_apprentissage_alpabet_memoire == null) ? les_lettres_actives : lettres_apprises.concat(les_lettres_actives);
                            initialiserPreApprentissageData();



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
                            function afficherApprentissageProgressBar() {
                                $('#apprentissage_dialogue_btns').css('display','none');
                                afficher($('#apprentissage_progress_bar'));
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
                            let click_count = 0;
                            let clicked_td_length = 0;
                            let global_clicks_counter = 1;
                            let total_yellow_letter = ($('#tr_actif').index() === 3) ? 6 : $('#tr_actif span').length;

                            $.each($('.pre_apprentissage_td, .table_parlante td'), function() {
                                
                                let td_actif = $(this);
                                let td_click_counter = 1;
                                
                                td_actif.click(()=>{
                                    if(pre_apprentissage_alpabet_memoire.length < 27) {

                                        let clicked_letter = $(this).text();
                                        let td_index = $(this).index();
                                        let td_click_count = td_click_counter++;

                                        click_count = clicks_counter++;

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
                                                        $('#apprentissage_progress_bar .progress_bonne_reponse_bar').css('width', apprentissage_width+'%');
                                                    
                                                    //Initialiser la barre de progression
                                                        if(global_clicks_count/quantite_normale_de_click == les_lettres_actives.length) { 
                                                            setTimeout(() => {
                                                                $('#apprentissage_progress_bar').css('display','none'); 
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
                                                    
                                                        viderNotification();
                                                        ecris('apprentissage_notification_corps','\
                                                            ߣߌ߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߓߘߊ߫ ߟߐ߲߫ ߌ ߓߟߏ߫߸ ߢߊ߯ߡߌߟߊ߲ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫߹) ߞߊ߬ ߘߋ߲߬ߣߍ߲߬ ߞߎߘߊ ߟߎ߬ ߢߊ߯ߡߌ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߞߊ߲ߡߊ߬.\
                                                        ');

                                                        afficherAlphabetExerciceBouton();
                                                        exercicePreAlphabet();

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
                if(pre_apprentissage_alpabet_memoire.length === 27) {
                    if(matieres.length != 0) {
                        let date_d_apprentissage_d_alphabet = convertirDateEnNko(matieres[0][0].date);
                        viderNotification();
                        ecrire('notification_corps','ߌ ߕߎ߲߬ ߓߘߊ߫ ߛߓߍߛߎ߲ ߘߋ߲߰ ߞߊ߬ ߢߊ߬߸ ߞߊ߬ߓߌ߯ '+date_d_apprentissage_d_alphabet+'\
                            ߛߌߛߊ߲߬ ߌ ߘߌ߫ ߛߋ߫ ߛߓߍߛߎ߲ ߘߋ߲߰ ߠߊ߫ (ߞߵߊ߬ ߟߊߡߍ߲߫ ߘߐߙߐ߲߫ ߞߊ߬ߣߌ߲߬) ߒ߬ߞߊ߬ ߌ ߕߍߣߊ߬ ߖߊ߬ߕߋ߬ߓߐ߬ ߟߊ߫ ߊ߬ ߟߊ߫. ߏ߬ ߘߐ߫߸ ߡߊ߬ߞߟߏ߬ߟߌ߫ ߣߌ߫ ߞߘߐߓߐߟߌ߫ ߛߌ߫ ߕߍ߫ ߦߋ߲߬ ߓߊ ߏ߬ ߟߎ߬ ߞߍߣߍ߲߫ ߞߘߐ ߟߋ߬.\
                        ');
                    }
                    $('.pre_apprentissage_td').click(function() { lire('alphabet',$(this).text()); });
                }

                function rappelDuCercleActif() {
                    if(pre_apprentissage_alpabet_memoire.length < 27) {
                        $('.pre_apprentissage_td, .table_parlante td, .cercle:not(.actif)').click(function() { secouer($('.cercle:nth-child('+alphabet_tr_index+')')); });
                    }
                }
            }
            function lectureSimpleDeLAlphabet() {
                if($('.cercle_depasse').length == 4) {
                    setTimeout(() => {
                        $.each($('.table_parlante td'), function() {
                            let t = $(this);
 
                            t.click(() => {
                                let clicked_letter = t.text();
                                lire('alphabet',clicked_letter); 
                            });
                        });
                    }, 400);
                }
            }
            function cerclesStyle() {
                if(pre_apprentissage_alpabet_memoire.length < 27) {
                    
                cercle_actif = $('.cercle:nth-child('+alphabet_tr_index+')');
                indexer(cercle_actif);

                cercle_actif.prevAll().addClass('cercle_depasse');
                cercle_actif.nextAll().addClass('cercle_a_faire');
                }
                if(pre_apprentissage_alpabet_memoire.length == 27) $('.cercle').removeClass('indicateur').addClass('cercle_depasse');
            }
            function cercleRang() {
                let cr = '';

                if(alphabet_tr_index === 1) { cr = 'ߝߟߐߡߊ'; }
                if(alphabet_tr_index === 2) { cr = 'ߝߌߟߊߣߊ߲'; }
                if(alphabet_tr_index === 3) { cr = 'ߛߓߊߣߊ߲'; }
                if(alphabet_tr_index === 4) { cr = 'ߣߊ߯ߣߌߣߊ߲'; }

                return cr;
            }
            function tdStyle() {
                if(pre_apprentissage_alpabet_memoire != null || pre_apprentissage_alpabet_memoire != null) {
                    $.each($('.pre_apprentissage_td, .table_parlante td'), function() {
                        let td = $(this);
                        let letter = td.text();
                        if(lettres_apprises.includes(letter)) { td.css({
                            'background-color':'rgba(85, 85, 85, 0.25)', 
                            'color':'#fff',
                            'opacity':1
                        }); }
                    });  
                }
            }
            function alphabetTrIndex() {
                let ati = 1;
                if(pre_apprentissage_alpabet_memoire != null) {
                    switch(pre_apprentissage_alpabet_memoire.length) {
                        case 0  : ati = 1; break;
                        case 7  : ati = 2; break;
                        case 14 : ati = 3; break;
                        case 21 : ati = 4; break;
                    }
                }
                return ati;
            }
        }
        function exercicePreAlphabet() {
            $('#exercice_bouton, #continu_sur_exercice_bouton').click(function(e) {

                e.stopImmediatePropagation();   

                $('.fermeture_pre').attr('id','fermeture_pre_exercice');

                pre_exercice_alpabet_memoire = JSON.parse(localStorage.getItem('pre_exercice_alpabet_memoire'));
                exercice_btn_id = $(this).attr('id');
                questions_posees.splice(0,questions_posees.length);
                exercice_pre_questions = malaxer(malaxer(les_lettres_actives));
                total_questions = exercice_pre_questions.length;
                                  
                chargerExercicePreAlphabet();
                afficherExercice();
                exercicerAlphabet();


                function chargerExercicePreAlphabet() {
                    
                    chargerEnteteDExercicePreAlphabet();
                    chargerPiedDExercicePreAlphabet();
                    chargerCorpsDExercicePreAlphabet();
                
                    function chargerEnteteDExercicePreAlphabet() {
                        $('#exercice_notification_titre').html('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
                        viderNotification();
                        setTimeout(() => { 
                            ecris('exercice_notification_corps','\
                                ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫.\n ߦߋ߫ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߣߌ߫ ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߣߌ߫ ߛߊߞߍߟߌ ߟߎ߬ ߞߍ߫ ߦߊ߲߬߸ ߤߊ߲߯ ߞߐߝߟߌ߫ ߥߟߊ ߦߋ߫ ߓߐ߫.\
                            ');
                        }, 1000);
                    }
                    function chargerPiedDExercicePreAlphabet() {
                        $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ ߁߭ ߟߊߡߍ߲߫');
                        $('#reprendre_exercice_bouton').text('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯');
                        $('#revision_bouton').text('ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ ߞߍ߫');
                    }
                    function chargerCorpsDExercicePreAlphabet() {
                        var exercice_body_html = lessonHTML(exercice_pre_questions, '');
                        $('#exercice_body').html(exercice_body_html);

                     /*revision body est chargé mais doit etre invisible jusqu'à l'éxécution de la fonction afficherRevisionAlphabet()*/
                        $('#revision_body td').css({'transform':'scale(0.75)', 'opacity':0});
                    }  
                }
                function exercicerAlphabet() {
                    
                    let i=0;
                    let pre_questions = malaxer(exercice_pre_questions);
                 console.log(pre_questions);
    
                    afficherParDefautDuDialogueBtns();
                    ecouterLaPreQuestion();
                    repondreLaPreQuestion();
                    corrigerLaPreQuestion();
                
        
                    function afficherParDefautDuDialogueBtns() {
                        masquer($('#exercice_repetition_btn'));
                        masquer($('#exercice_correction_btn'));
                        afficher($('#exercice_question_btn'));
                        rendreActif($('#exercice_question_btn'));
                    }
                    function ecouterLaPreQuestion() {
                        $('#exercice_question_btn').click(function() { 

                            pre_question = pre_questions[i];
                                    
                            if(i < total_questions) { 
                                
                                actualiserLeLabelDeQuestionBtn();
                                actualiserLeLabelDeRepetitionBtn();
                                afficherRepetitionBtn();
                                lire('alphabet',pre_question); 
                                relire(pre_question); 
                                questions_posees.push(pre_question);
                                total_questions_posees = questions_posees.length;

                                   
                                function actualiserLeLabelDeQuestionBtn() {
                                    ordre_de_question = (total_questions == i+2) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                                    $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                                }
                                function actualiserLeLabelDeRepetitionBtn() {
                                    let repeter_btn_html = (i === 0) ? 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߁߭ ߟߊߡߍ߲߫ ߕߎ߲߯' : 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(i+1)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯';
                                    $('#exercice_repetition_btn').html(repeter_btn_html);
                                }
                                function afficherRepetitionBtn() {
                                    masquer($('#exercice_question_btn'));
                                    masquer($('#exercice_correction_btn'));
                                    rendreActif($('#exercice_repetition_btn'));
                                    afficher($('#exercice_repetition_btn'));
                                }
                                function relire(pre_question) { $('#exercice_repetition_btn').click(function() { lire('alphabet',pre_question); }); }
                            }
                        });
                    }
                    function repondreLaPreQuestion() {
                        $.each($('#exercice_body td'), function() {

                            let td = $(this);
                            td.click(function(){
  
                                element_actif = $(this);

                                rappelerQuestionBtnSiPasDeQuestion();
                                repondre();
                                actualiserLeLabelDeCorrectionBtn();

                                function rappelerQuestionBtnSiPasDeQuestion() {
                                    if(pre_question == '') { secouer($('#exercice_question_btn')); return; }
                                }
                                function repondre() {
                                    if(pre_question !== '') {
                                        pre_reponse = element_actif.text();
                                        $(element_actif).css('background-color','#aaa').siblings().css('background-color','rgba(85,85,85,0.25)');
                                    }
                                }
                                function actualiserLeLabelDeCorrectionBtn() {
                                    if(pre_question != '') {
                                        masquer($('#exercice_question_btn'));
                                        masquer($('#exercice_repetition_btn'));
                                        rendreActif($('#exercice_correction_btn'));
                                        afficher($('#exercice_correction_btn')); 
                                    }
                                }
                            });
                        });
                    }
                    function corrigerLaPreQuestion() {

                        let bonne_reponse_counter = 0;
                        let pre_question_counter = 0;

                        $('#exercice_correction_btn').click(function() { 
                            if(total_questions_posees <= total_questions) { 

                                marquerLaReponse();
                                reAfficherQuestionBtn();
                                setTimeout(() => { $('#exercice_body td').css('background-color','rgba(85,85,85,0.25)'); }, 800);
                                
                                enregistrerPreExerciceAlphabet();
                                progressBarExercicePreAlphabet();
                                finDExercicePreAlphabet();


                                function marquerLaReponse() {
                                    if(pre_question == '') { return false; }
                                    if(pre_question == pre_reponse) { accorder(element_actif); }
                                    if(pre_question != pre_reponse) { barrer(element_actif); }
                                }
                                function reAfficherQuestionBtn() {
                                    
                                    masquer($('#exercice_repetition_btn'));
                                    masquer($('#exercice_correction_btn'));
                    
                                    if(i < total_questions - 1) { rendreActif($('#exercice_question_btn')); }
                                    if(i === total_questions - 1) { 
                                        $('#exercice_question_btn').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').removeClass('actif').off('click');
                                    }
                                    afficher($('#exercice_question_btn')); 
                                    i++;
                                }
                                function enregistrerPreExerciceAlphabet() {

                                    let question_reponse = [];
                                    
                                    if(pre_question == '') { return false; }
                        
                                    point = (pre_question == pre_reponse) ? 1 : 0;
                                    question_reponse = [pre_question,pre_reponse,point];
                                    pre_exercice_data.push(question_reponse);
                                    
                                    if(pre_question == pre_reponse) { nbr_bonne_reponse++; point_total++; }
                                    if(pre_question != pre_reponse) { nbr_mauvaise_reponse++; }

                                    pre_question = '';
                                    pre_reponse = ''; 
                                }
                                function progressBarExercicePreAlphabet() {

                                    let diagramm_unity = 100/total_questions;

                                    pre_question_counter++;

                                    if(point === 1) {
                                        bonne_reponse_counter++;
                                        $('#exercice_progress_bar .progress_bonne_reponse_bar').css('width',bonne_reponse_counter*diagramm_unity+'%');
                                        $('#exercice_progress_bar .progress_mauvaise_reponse_bar').css('width',pre_question_counter*diagramm_unity+'%');
                                    }
                                    if(point === 0) {
                                        $('#exercice_progress_bar .progress_mauvaise_reponse_bar').css('width',pre_question_counter*diagramm_unity+'%');
                                    }

                                    // Initialiser la barre de progression
                                    if(pre_question_counter === total_questions) { 
                                        setTimeout(() => { 
                                            masquer($('#exercice_progress_bar'));
                                            $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);
                                            pre_question_counter = 0;
                                            bonne_reponse_counter = 0;
                                        }, 1000);
                                    }
                                }
                                function finDExercicePreAlphabet() {
                                    if(total_questions_posees === total_questions) {  

                                        let note_de_pre_exercice = calculerNote(pre_exercice_data);
                                        let n_q = total_questions;
                                        let n_m_r = nbr_mauvaise_reponse;
                                      
                                        taux_de_fausse_reponse = Math.ceil((n_m_r/n_q)*100);
                                        taux_de_vraie_reponse =  100 - taux_de_fausse_reponse;
                
                                        viderNotification();
                                        setTimeout(() => { fermerPreExercice(); }, 200);
                                        setTimeout(() => { 

                                            afficherExerciceRedirectionBtns(pre_exercice_data);                           

                                            if(note_de_pre_exercice < 100) {
                                    
                                                let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                
                                                setTimeout(() => { ecris('exercice_notification_corps', notification); }, 600);
                                                reprendreExercicePreAlphabet(); 
                                            }
                                            if(note_de_pre_exercice == 100) { 
                                                let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                setTimeout(() => { ecris('exercice_notification_corps', notification); }, 600);
                                            }

                                         //Initialisation du nombre de mauvaise reponse
                                            nbr_mauvaise_reponse = 0;
                                        }, 600);
                                         // preExerciceResultat();  
                                    
                                        
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
                                                    if(taux_de_vraie_reponse < 100) { $('#exercice_bouton').text('ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯'); }
                                                    if(taux_de_vraie_reponse == 100) { afficherPreRevisionBtn(); }
                                                }, 250);
                                            });
                                        } 
                                        function preExerciceResultat() {
                                                        
                                            // formatParDefautDuResultat();
                                            resultat(pre_exercice_alpabet_memoire);
                                            afficherExerciceResultat();
                                            masquerExerciceAlphabetResultat();
            
            
                                            function afficherExerciceResultat() {
                                                goDown($('.resultat_container'));
                                            }
                                            function masquerExerciceAlphabetResultat() {
                                                $('#apprentissage #fermer_resultat').click(function() {
                                                    goUp($('.resultat_container'));
                                                });
                                            }
                                        }
                                        function reprendreExercicePreAlphabet() {
                                            $('#reprendre_exercice_bouton').click(function(e) { 
                                                e.stopImmediatePropagation(); 

                                                viderLeTableau(pre_exercice_data);
                                                if(option_retenue == 1) {
                                                    exercicePreAlphabet(); 
                                                    $('#continu_sur_exercice_bouton').click();
                                                }
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
        function evaluationPreAlphabet() {
            $('#revision_bouton, #continu_sur_revision_bouton').click(function(e) {
                e.stopImmediatePropagation();    

                $('.fermeture_pre').attr('id','fermeture_pre_revision');
                
                pre_evaluation_alpabet_memoire = JSON.parse(localStorage.getItem('pre_evaluation_alpabet_memoire'));
                questions_posees.splice(0,questions_posees.length);
                evaluation_pre_questions = malaxer(clickable_td);
                total_questions =  evaluation_pre_questions.length;

                chargerEvaluationPreAlphabet();
                afficherEvaluationAlphabet();
                evaluerPreAlphabet();


                function chargerEvaluationPreAlphabet() {
                    
                    chargerEnteteDePreEvaluationAlphabet();
                    chargerPiedDePreRevisionAlphabet();
                    chargerCorpsDePreRevisionAlphabet();
                
                    function chargerEnteteDePreEvaluationAlphabet() {
                        $('#revision_notification_titre').html('ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ</h3>');
                        viderNotification();
                  
                        let notification = "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߠߎ߬ ߟߋ߬ ߓߍ߯ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫";
                        setTimeout(() => { ecris('revision_notification_corps',notification); }, 1000);
                    }
                    function chargerPiedDePreRevisionAlphabet() {
                        $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ ߁߭ ߟߊߡߍ߲߫');
                        $('#reprendre_revision_bouton').html(matiere_nom+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                        $('#evaluation_bouton').html(matiere_nom+'  ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߥߴߊ߬ ߡߊ߬');
                    }
                    function chargerCorpsDePreRevisionAlphabet() {
                        var revision_body_html =  lessonHTML(evaluation_pre_questions, '');
                        $('#revision_body').html(revision_body_html);

                     /*revision body est chargé mais doit etre invisible jusqu'à l'éxécution de la fonction afficherEvaluationAlphabet()*/
                        $('#revision_body td').css({'transform':'scale(0.75)', 'opacity':0});
                    }  
                }
                function afficherEvaluationAlphabet() {
            
                    afficherRevision();
                    gestionDePreEvaluationBtns();
                    
                    function gestionDePreEvaluationBtns() {
                        if(total_questions_posees <= total_questions) {
                            
                            afficher($('#revision_question_btn'));
                            masquer($('#revision_repetition_btn'));
                            masquer($('#revision_correction_btn'));
                            rendreActif($('#revision_question_btn'));
            
                            $('#revision_question_btn').click(function() { 
                                masquer($('#revision_question_btn'));
                                masquer($('#revision_repetition_btn'));
                                masquer($('#revision_correction_btn'));
                                
                                rendreActif($('#revision_repetition_btn'));
                                afficher($('#revision_repetition_btn')); 
                            });
            
                            $('#revision_body td').click(function() {
                            
                                if(pre_question === '') { return; }
                            
                                masquer($('#revision_question_btn'));
                                masquer($('#revision_repetition_btn'));
                                masquer($('#revision_correction_btn'));
                                
                                rendreActif($('#revision_correction_btn'));
                                afficher($('#revision_correction_btn')); 
                            });
            
                            $('#revision_correction_btn').click(function() { 
                                masquer($('#revision_question_btn'));
                                masquer($('#revision_repetition_btn'));
                                masquer($('#revision_correction_btn'));
                                
                                rendreActif($('#revision_question_btn'));
                                afficher($('#revision_question_btn')); 
                                
                                if(total_questions_posees == total_questions) { 
                                    masquer($('#revision_question_btn'));
                                    masquer($('#revision_repetition_btn'));
                                    masquer($('#revision_correction_btn'));
                                }
                            });
                        }
                    }
                }
                function  evaluerPreAlphabet() {

                    let pre_evaluation_data = [];

                    evaluation_pre_questions = malaxer(evaluation_pre_questions);
console.log(evaluation_pre_questions);
                    ecouterLaPreQuestion();
                    repondreLaPreQuestion();
                    corrigerLaPreQuestion();
                
        
                    function ecouterLaPreQuestion() {

                        let i = 0;
                        
                        $('#revision_question_btn').click(function(e) {
                            if(i < total_questions) { 
                                e.stopImmediatePropagation();

                                if(i < total_questions) {  

                                    pre_question =  evaluation_pre_questions[i];
                                
                                    actualiserLeLabelDeRevisionQuestionBtn();
                                    actualiserLeLabelDeRevisionRepetitionBtn();
                                    lire('alphabet',pre_question); 
                                    relire(pre_question); 
                                    questions_posees.push(pre_question);
                                    total_questions_posees = questions_posees.length;

                                    i++;
                                }
                                if(i == total_questions) { i = 0; }

                                function actualiserLeLabelDeRevisionQuestionBtn() {
                                    ordre_de_question = (total_questions == i+2) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                                    $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                                }
                                function actualiserLeLabelDeRevisionRepetitionBtn() {
                                    let repeter_btn_html = (i === 0) ? 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߁߭ ߟߊߡߍ߲߫ ߕߎ߲߯' : 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(i+1)+' ߠߊߡߍ߲߫ ߕߎ߲߯';
                                    $('#revision_repetition_btn').html(repeter_btn_html);
                                }
                                function relire(pre_question) { $('#revision_repetition_btn').click(function() { lire('alphabet',pre_question); }); }
                            }
                        });
                    }
                    function repondreLaPreQuestion() {
                        $.each($('#revision_body td'), function() {
                            let td = $(this);
                            td.click(function(){
                                element_actif = $(this);

                                rappelerRevisionQuestionBtnSiPasDeQuestion();
                                repondrePreAlphabetRevision();
            
                                function rappelerRevisionQuestionBtnSiPasDeQuestion() {
                                    if(pre_question == '') { 
                                        $('#revision_question_btn').addClass('clignotant'); 
                                        setTimeout(function() { $('#revision_question_btn').removeClass('clignotant'); }, 1200);
                                        return;
                                    } 
                                }
                                function repondrePreAlphabetRevision() {
                                    if(pre_question !== '') {
                                        pre_reponse = element_actif.text();
                                        $(element_actif).css('background-color','#aaa').siblings().css('background-color','rgba(85,85,85,0.25)');
                                    } 
                                }
                            });
                        });
                    }
                    function corrigerLaPreQuestion() {

                        let pre_question_counter = 0;
                        let bonne_reponse_counter = 0;
                        let taux_de_vraie_reponse = 0;

                        $('#revision_correction_btn').click(function(e) { 
                            e.stopImmediatePropagation();

                            if(total_questions_posees <= total_questions) { 

                                $('#revision_container .table_parlante td').css('background-color','rgba(85, 85, 85, 0.25)');
            
                                correctionDeEvaluation();
                                enregistrerEvaluationPreAlphabet();
                                progressBarrEvaluationPreAlphabet();
                                finDEvaluationPreAlphabet();
            
                                
                                function correctionDeEvaluation() {
                                    if(pre_question == '') { return false; }
                                    if(pre_question == pre_reponse) { accorder(element_actif); }
                                    if(pre_question != pre_reponse) { barrer(element_actif); }
                                }
                                function enregistrerEvaluationPreAlphabet() {

                                    let question_reponse = [];

                                    if(pre_question == '') { return false; }
                        
                                    point = (pre_question == pre_reponse) ? 1 : 0;
                                    question_reponse = [pre_question,pre_reponse,point];
                                    pre_evaluation_data.push(question_reponse);
                                  
                                    if(pre_question == pre_reponse) { nbr_bonne_reponse++; point_total++; }
                                    if(pre_question != pre_reponse) { nbr_mauvaise_reponse++; }
                                    pre_question = '';
                                    pre_reponse = ''; 
                                }
                                function progressBarrEvaluationPreAlphabet() {

                                    let diagramm_unity = 100/total_questions;

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
                                            $('#evaluation_progress_bar').css('display','none');
                                            $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);
                                            pre_question_counter = 0;
                                            bonne_reponse_counter = 0;
                                        }, 1000);
                                    }
                                }
                                function finDEvaluationPreAlphabet() {                    
                                    if(total_questions_posees === total_questions) {
                                    
                                        let n_q = total_questions;
                                        let n_m_r = nbr_mauvaise_reponse;

                                        taux_de_fausse_reponse = Math.ceil((n_m_r/n_q)*100);
                                        taux_de_vraie_reponse =  100 - taux_de_fausse_reponse;

                                        viderNotification();
                                        stockerEvaluationPreAlphabet();
                                        setTimeout(() => { fermerPreEvaluer(); }, 200);
                                        
                                        setTimeout(() => { masquer($('#revision_progress_bar')); }, 600);
   
                                        if(pre_evaluation_alpabet_memoire.length < 27) {
                                            if(taux_de_vraie_reponse < 92) reprendreEvaluationPreAlphabet();
                                            if(taux_de_vraie_reponse >= 92) continuSurApprendrePreAlphabet();
                                        }
                                        if(pre_evaluation_alpabet_memoire.length === 27) {
                                            if(taux_de_vraie_reponse < 92) reprendreRevisionPreAlphabet();
                                            if(taux_de_vraie_reponse >= 92) {
                                                continuSurApprendreSyllabe();
                                            }
                                        }
                                    
console.log([pre_apprentissage_alpabet_memoire, pre_exercice_alpabet_memoire, pre_evaluation_alpabet_memoire]);

                                        redirectionSurApprentissage(pre_evaluation_data);   
                                    
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
                                                        $('#revision_bouton').text('ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                                                    }
                                                    if(taux_de_vraie_reponse == 100) {
                                                        afficherPreApprentissageBtns();
                                                        $('#'+cercle_id).removeClass('apprentissage_en_cours').addClass('cercle_depasse');
                                                        indexer($('#'+cercle_id).next()); 
                                                        ecrire('notification_corps','ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߌ߲߯ ߘߎ߭ߡߊ߬');
                                                    }
                                                }, 250);
                                            });
                                        }
                                        function stockerEvaluationPreAlphabet() {
    
                                            pre_apprentissage_alpabet_memoire = (pre_apprentissage_alpabet_memoire  == null) ? pre_apprentissage_data : pre_apprentissage_alpabet_memoire.concat(pre_apprentissage_data);
                                            pre_exercice_alpabet_memoire = (pre_exercice_alpabet_memoire  == null) ? pre_exercice_data : pre_exercice_alpabet_memoire.concat(pre_exercice_data);
                                            pre_evaluation_alpabet_memoire = pre_evaluation_data;
                                            
                                            localStorage.setItem('pre_apprentissage_alpabet_memoire', JSON.stringify(pre_apprentissage_alpabet_memoire));
                                            localStorage.setItem('pre_exercice_alpabet_memoire', JSON.stringify(pre_exercice_alpabet_memoire));
                                            localStorage.setItem('pre_evaluation_alpabet_memoire', JSON.stringify(pre_evaluation_alpabet_memoire));
    
                                            if(pre_evaluation_alpabet_memoire.length === 27) {
                                                if(pourcentagePoint(pre_apprentissage_alpabet_memoire) === 100) {
                                                if(pourcentagePoint(pre_exercice_alpabet_memoire) === 100) {
                                                if(pourcentagePoint(pre_evaluation_alpabet_memoire) >= 92) {
                                                    
                                                    sendLessonDataToDB('alphabet_apprentissage',pre_apprentissage_alpabet_memoire);
                                                    sendLessonDataToDB('alphabet_exercice',pre_exercice_alpabet_memoire);
                                                    sendLessonDataToDB('alphabet_evaluation',pre_evaluation_alpabet_memoire);
    
                                                    sessionStorage.setItem('alphabet_data', JSON.stringify([pre_apprentissage_alpabet_memoire, pre_exercice_alpabet_memoire, pre_evaluation_alpabet_memoire]));
    
                                                    setTimeout(() => {
                                                        localStorage.removeItem('pre_apprentissage_alpabet_memoire');
                                                        localStorage.removeItem('pre_exercice_alpabet_memoire');
                                                        localStorage.removeItem('pre_evaluation_alpabet_memoire');
                                                    }, 86400000);
                                                    
                                                    pourcentage_general = Math.floor([pourcentagePoint(pre_apprentissage_alpabet_memoire) + pourcentagePoint(pre_exercice_alpabet_memoire) + pourcentagePoint(pre_evaluation_alpabet_memoire)]/3);
    
                                                    niveaux_etudies.push(niveau_en_cours);
                                                    phases_etudiees = ["ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ", "ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ", "ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ"];
                                                    niveau_max++; 
                                                    niveau_en_cours++; 
                                                    
                                                    sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees));
                                                    sessionStorage.setItem('niveau_max', JSON.stringify(niveau_max));
                                                    sessionStorage.setItem('niveau_en_cours', JSON.stringify(niveau_en_cours));
                                                    sessionStorage.setItem('niveaux_etudies', JSON.stringify(niveaux_etudies));
    
                                                    console.log('Lesson de pre_apprentissage envoyée à la base de donnée.');
                                                    console.log('Lesson de pre_exercice envoyée à la base de donnée.');
                                                    console.log('Lesson de pre_evaluation envoyée à la base de donnée.');
                                                }}}
                                            }
                                        }
                                        function reprendreEvaluationPreAlphabet() {
                                                
                                            setTimeout(() => {
                                                ecris('revision_notification_corps','\
                                                    '+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߡߊ߫ ߢߊ߬\n\
                                                    ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߌ߲߬ ߘߐ߫.\n\
                                                    ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹\n\
                                                    ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)\
                                                '); 
                                            }, 600);
                                                
                                            nbr_mauvaise_reponse = 0;

                                            $('#reprendre_revision_bouton').click(function(e) { 
                                                e.stopImmediatePropagation(); 
                                                
                                                setTimeout(() => {
                                                    evaluationPreAlphabet(); 
                                                    $('#continu_sur_revision_bouton').click();
                                                }, 250);
                                            });
                                        }
                                        function continuSurApprendrePreAlphabet() {
                                            setTimeout(() => { 
                                                ecris('revision_notification_corps','\
                                                    '+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߊ߬ߣߍ߲߬\n\
                                                    ߞߎߘߎ߲߫ ߁߭ ߤߊ߲߯ ߞߎߘߎ߲߫ '+cercle_actif.html()+' ߠߎ߬ ߓߍ߯ ߓߘߊ߫ ߢߊߦߋ߫ ߌ ߓߟߏ߫\n\
                                                    ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߋ߲߰.\n\
                                                    ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹\n\
                                                    ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)\
                                                ');
                                            }, 600);  

                                            clickable_td = clickable_td.concat(les_lettres_actives);

                                            $('#continu_sur_apprentissage_bouton').click(() =>{
                                                masquer($('#revision_container'));
                                                setTimeout(() => { raffraichirLaPage();  }, 250); 
                                            });
                                        }
                                        function continuSurApprendreSyllabe() {
                                                
                                            ecris('revision_notification_corps', 'ߌ ߞߎߟߎ߲ߖߋ߫ '+prenom+' '+nom+' ߌ ߟߊ߫ ߘߐ߬ߖߊ ߟߊ߫߸ ߞߊ߬ ߒߞߏ ߛߓߍߛߎ߲ ߘߋ߰.');
                                                    
                                            degagerRevisionBodyCadre();
                                            resultatGeneralDAlphabet();

                                            function degagerRevisionBodyCadre() {
                                                $("#revision_body_cadre").css('background-color','#fff');
                                                $("#revision_body_cadre > div").css('display','none');
                                            }
                                            function resultatGeneralDAlphabet() {

                                                $('#revision_body_cadre').append('\
                                                    <div id="resultat_btn_container">\
                                                        <p>ߛߓߍߛߎ߲ ߘߋ߰ߟߌ ߢߊ߬ߣߍ߲߬ %/'+parseIntNko(pourcentage_general)+' ߟߊ߫.</p>\
                                                        <p>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߬ <span id="afficheur_de_resultat">ߒߞߏ ߛߓߍߛߎ߲ ߘߋ߰ߟߌ ߞߐߝߟߌ</span></p>\
                                                        <p>ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߜߋ߲߭ ߘߋ߰ߟߌ ߘߊߡߌ߬ߘߊ߬</p>\
                                                        \
                                                    </div> \
                                                ');

                                                $('#resultat_btn_container').css({'height':0, 'transition':'0.25s'});
                                                setTimeout(() => { $('#resultat_btn_container').css({'height':'max-content'}); }, 2000);
                                                $('#afficheur_de_resultat').click(function() {
                                                    resultatGeneral(pre_apprentissage_alpabet_memoire, pre_exercice_alpabet_memoire, pre_evaluation_alpabet_memoire);
                                                });
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
    }
    function alphabetNko() {

        let apprentissage_alpabet_memoire = (apprentissage_data_memo != undefined) ? apprentissage_data_memo : JSON.parse(sessionStorage.getItem('apprentissage_alpabet_memoire'));
        let exercice_alpabet_memoire      = (exercice_data_memo      != undefined) ? exercice_data_memo      : JSON.parse(sessionStorage.getItem('exercice_alpabet_memoire'));
        let evaluation_alpabet_memoire    = (evaluation_data_memo    != undefined) ? evaluation_data_memo    : JSON.parse(sessionStorage.getItem('evaluation_alpabet_memoire'));

        let alphabet_data = [apprentissage_alpabet_memoire, exercice_alpabet_memoire, evaluation_alpabet_memoire];
        sessionStorage.setItem('alphabet_data', JSON.stringify(alphabet_data));
      
        var table_id = $('.table_parlante').attr('id');
            
        var table = $('#'+table_id); 
        var tr = $('#'+table_id+' tr');
        var td = $('#'+table_id+' td');
        var nbr_table = table.length;
        var nbr_tr = tr.length;
        var nbr_td = td.length;

        var nbr_tr = tr.length;
        var nbr_td = td.length;
        let nbr_raisonnable_de_click = 1;
        let clicked_elements_quantity = 0;
        

        afficher($('.salle_de_classe'));
        afficher($('.course'));

        switch(phase_id) {
            case 'alphabet_apprentissage' : apprentissageAlphabet(); break;
            case 'alphabet_exercice'      : exerciceAlphabet();      break;
            case 'alphabet_evaluation'    : evaluationAlphabet();    break;
        }


        function apprentissageAlphabet() {

            chargerApprentissageAlphabet();
            afficherApprentissageAlphabet();
            apprendreAlphabetNko();
            raffraichissementDeLaPage();

                
            function chargerApprentissageAlphabet() {

                chargerEnteteDeApprentissageAlphabet();
                chargerPiedDeApprentissageAlphabet();
                chargerCorpsDeApprentissageAlphabet();

                function chargerEnteteDeApprentissageAlphabet() {
                    $('.notification_titre').text(liste_de_matieres[0][1]+' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');

                    viderNotification();
                    setTimeout(() => {
                        if(apprentissage_data_memo != undefined) {
                            ecris('apprentissage_notification_corps','\
                                ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߘߋ߲߰ߣߍ߲߬ ߞߘߐ ߟߴߌ ߓߟߏ߫߸ ߏ߬ߘߐ߬ ߌ ߘߌ߫ ߛߴߊ߬ ߡߊߛߍ߬ߦߌ߬ ߟߊ߫߸ ߞߐ߬ߣߌ߲߬ ߊ߬ ߕߍ߫ ߖߊ߰ߕߋ߬ ߟߊ߫.<br>\
                            ');
                        }
                        if(apprentissage_data_memo == undefined) {
                            ecris('apprentissage_notification_corps','\
                                ߛߓߍߘߋ߲ ߠߎ߬ ߓߍ߯ ߘߌ߲߯ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߊ߬ ߣߴߌ ߦߴߌ ߖߊ߲߬ߕߏ߬ ߊ߬ߟߎ߬ ߝߐߢߊ ߘߐ߫ ߞߏߛߓߍ߫߹<br>\
                                ߌ ߣߊ߬ߕߐ߫ ߟߋ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ ߟߴߊ߬ߟߎ߬ ߓߍ߯ ߡߊ߬.\
                            ');
                        }
                    }, 2000);
                }
                function chargerPiedDeApprentissageAlphabet() {}
                function chargerCorpsDeApprentissageAlphabet() {
                // Voir fonctions chargerLesson() / chargementDeLesson() dans parametrageDeLesson.js
                }
            }
            function afficherApprentissageAlphabet() { 

                $('#apprentissage_container').css('display','block');
                $('#exercice_container').css('display','none');
                $('#revision_container').css('display','none');
                $('#evaluation_container').css('display','none');
        
                $('#apprentissage_redirection_btns').css('display','none');
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

                        $('.media').css({'display':'none', 'opacity':0});
                        $('.parametre').css({'display':'none', 'opacity':0});
                        $('.lesson_suivante').css({'display':'block', 'opacity':1});
                    }, 1500);
                }, 200);
            }
            function apprendreAlphabetNko() {
                    
                let nbr_td_par_table = Math.ceil(nbr_td/nbr_table);
                let nbr_td_par_tr = Math.ceil(nbr_td/nbr_tr);
                            
                let clicked_td_length = nbr_raisonnable_de_click*nbr_td;
                let barr_unity = 100/clicked_td_length;
                let elements_clickes = [];
                let click_counter = 0;


                lecturePersonnalisee('alphabet');    // Voir fonctions.js
                if(apprentissage_alpabet_memoire != null) {
                    $('.progress_bar').css('display','none');
                    $.each(td, function(){ $(this).css({'background-color':'rgba(85,85,85,1)', 'color':'white'}); });
                }
                if(apprentissage_alpabet_memoire == null) {
                
                    $('.progress_bar').css('display','block');

                    $.each(td, function(){  

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
                        var element        = td_actif.html();
                        var table_courante = td_actif.parent().parent().parent();
                        var tr_index       = td_actif.parent().index();
                        var table_index    = table.index(table_courante);
                        var element_index  = table_index*nbr_td_par_table + tr_index*nbr_td_par_tr + td_actif.index();
                        var element_click_counter = 0;
                        var point = 0; 


                        td_actif.css({'background-color':'rgba(85,85,85,1)', 'color':'yellow'});
                        initialisationDeApprentissageClicksMemo();

                        td_actif.on('click', function() {

                            let clicked_td = $(this);
                            td_counter++;

                            styleDeAppretissageTd();
                            enregistrerApprentissageAlphabet();
                            progressBarrApprentissageAlphabet();
                            finDApprentissageAlphabet();
                            
                            function styleDeAppretissageTd() {
                                if(td_counter === nbr_raisonnable_de_click) { 
                                    clicked_td.css({'background-color':'rgba(85,85,85,0.25)', 'color':'white'}); 
                                } 
                            }
                            function enregistrerApprentissageAlphabet() {
                                    
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
                            }
                            function progressBarrApprentissageAlphabet() {

                                if(td_counter <= nbr_raisonnable_de_click) {
                                    
                                    click_counter++;
                                    $('.progress_bonne_reponse_bar').css('width',click_counter*barr_unity+'%');

                                    if(click_counter === clicked_td_length) {
                                        setTimeout(() => { $('#apprentissage_progress_bar').css('display','none'); }, 400);
                                    }
                                }
                                    
                                initialiserApprentissageAlphabetProgressBarr();


                                function initialiserApprentissageAlphabetProgressBarr() {
                                    $('.parametres_popup td').on('click', function() {  
                                        
                                        var nbr_td = JSON.parse(sessionStorage.getItem("nbr_td"));    // Voir parametres.js fonction lettresCochees()
                                        var nbr_click = nbr_td;
                                        elements_clickes = [];
                                        progress_unity = 0;

                                        $('.progress_bonne_reponse_bar').css('width', progress_unity+'px');
                                        progression(nbr_click);
                                        
                                        function progression(nbr_click) {
                                            var progress_unity = $('.progress_bar').width()/nbr_click;
                                            
                                            $('.table_parlante td').on('click', function() {
                                                if(elements_clickes.indexOf($(this).html()) == -1) $('.progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                                                elements_clickes.push($(this).html());
                                            });
                                        }
                                    });
                                }
                            } 
                            function finDApprentissageAlphabet() {
                                if(clicked_elements_quantity === apprentissage_clicks_memo.length) {

                                    let note = calculerNote(apprentissage_clicks_memo);
                                    
                                    viderNotification();
                                    initialiserProgressBar
                                    stockerApprentissageAlphabet();
                                    // resultatApprentissageAlphabet();
                                    afficherAlphabetExerciceBouton();
                                    transitionVersExerciceAlphabet();


                                    function stockerApprentissageAlphabet() {

                                        let moyenne_d_apprentissage = 1; 

                                        if(note <  moyenne_d_apprentissage) alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
                                        if(note >= moyenne_d_apprentissage) {
                                            apprentissage_alpabet_memoire = apprentissage_clicks_memo;
                                            sendLessonDataToDB('alphabet_apprentissage',apprentissage_alpabet_memoire);
                                            sessionStorage.setItem('apprentissage_alpabet_memoire', JSON.stringify(apprentissage_alpabet_memoire));

                                            alphabet_data = [apprentissage_alpabet_memoire, exercice_alpabet_memoire, evaluation_alpabet_memoire];
                                            sessionStorage.setItem('alphabet_data', JSON.stringify(alphabet_data));

                                            console.log('Les données d\'apprentissage sont envoyées à la base de données');
                                        }
                                    }
                                    function resultatApprentissageAlphabet() { 

                                        resultatGeneral(apprentissage_clicks_memo);
                                        notificationDeFinDAlphabetApprentissage();
                                        reprendreApprentissageAlphabet();
                                        continuSurExerciceAlphabet();

                                        function notificationDeFinDAlphabetApprentissage() {
                                            
                                            ecris('apprentissage_notification_corps','\
                                                ߌ ߞߎߟߎ߲ߖߋ߫ ߘߐ߬ߖߊ ߟߊ߫ ߛߓߍߘߋ߲ ߠߎ߫ ߘߋ߲߱ ߠߊ߫<br>\
                                                ߣߴߌ ߓߘߴߊ߬ߟߎ߬ ߟߐ߲߫߸ ߓߐߟߌ߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫ ߛߊ߲ߝߍ߬ ߣߎߡߊ߲߫ ߓߟߏ ߟߊ߫)<br>\
                                                ߣߴߌ ߘߏ߲߬ ߡߊ߫ ߓߊ߲߫ ߊ߬ߟߎ߬ ߟߐ߲߫ ߠߊ߫߸ ߒ߬ߓߊ߬ ߥߊ߫ ߘߋ߲߰ߠߌ ߡߊ߫ ߤߊ߲߯ ߌ ߦߴߊ߬ߟߎ߬ ߟߐ߲߫ ߞߊ߬ ߣߊ߬ߕߏ߫ ߓߐ߫ ߟߊ߫.\
                                            ');

                                            // zoomUp($('.dialogue_btns'));
                                            setTimeout(() => { indexer($('#fermer_apprentissage')); }, 2000);
                                        }
                                        function reprendreApprentissageAlphabet() {
                                            $('#reprendre').click(function() {
                                                goUp($('.resultat_container'));
                                                $('#alphabet_apprentissage').click(); 
                                                afficher($('#apprentissage_progress_bar'));
                                                viderLeTableau(apprentissage_clicks_memo);
                                            });
                                        }
                                        function continuSurExerciceAlphabet() {
                                            $('#avance').click(function() { 
                                                goUp($('.resultat_container'));
                                                $('#alphabet_exercice').click();
                                            });
                                        }
                                    }
                                    function transitionVersExerciceAlphabet() {
                                        let index_phase_active = $('.phases_container ul .active').index();

                                        if(note == 100) {
                                            $('#continu_sur_exercice_bouton').click(() => {
                                                masquer($('.salle_de_classe'));
                                                setTimeout(() => { 
                                                    $('.container').css('display','block'); 
                                                    displayv($('.direction')); 
                                                }, 400);
                                            });

                                            changerPhaseActive(index_phase_active);
                                        }
                                    }
                                }
                            } 
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
                            apprentissage_clicks_memo[element_index] = [element,element_click_counter,point];  
                        } 
                    });
                }
            }
        }    
        function exerciceAlphabet() {
            if(exercice_alpabet_memoire == undefined || exercice_alpabet_memoire == null || exercice_alpabet_memoire == '') {
                
                let nbr_de_questionnaires = 20;
                let exercice_questions = [];
                let moyenne_d_exercice = 95;
                let exercice_question = '', exercice_reponse = ''; 
                let compteur_d_exercice_question = 1;
                            
                $('.fermeture').attr('id', 'fermer_exercice');
                
                reductionDesElementsDeExerciceCouranteA49(); // Réduction du nombre de questions à une quantité raisonable
                chargerExerciceAlphabet();
                afficherExercice();
                exercerAlphabetNko();
        
        
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
                    chargerEnteteDeExerciceAlphabet();
                    chargerPiedDeExerciceAlphabet();
                    chargerCorpsDeExerciceAlphabet();
                
                    function chargerEnteteDeExerciceAlphabet() {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
                        viderNotification();
                        setTimeout(() => {
                            ecrire('notification_corps','\
                                ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫.\n ߦߋ߫ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߣߌ߫ ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߣߌ߫ ߛߊߞߍߟߌ ߟߎ߬ ߞߍ߫ ߦߊ߲߬߸ ߤߊ߲߯ ߞߐߝߟߌ߫ ߥߟߊ ߦߋ߫ ߓߐ߫.\
                            ');
                        }, 1300);
                    }
                    function chargerPiedDeExerciceAlphabet() {
                        $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(nbr_de_questionnaires)+' \\ ߁߭ ߟߊߡߍ߲߫');
                        $('#exercice_repetition_btn').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߊߡߍ߲߫ ߕߎ߲߯');
                        $('#exercice_correction_btn').text('ߏ߬ ߛߊߞߍ߫');
                        indexer($('#exercice_question_btn'));
                    }
                    function chargerCorpsDeExerciceAlphabet() {

                        var exercice_body_html = lessonHTML(exercice_questions, '');

                        $('#exercice_body').html(exercice_body_html);
                        setTimeout(() => { affichageAnimeDeTableTd($('.table_parlante')); }, 400);

                        /*revision body est chargé mais doit etre invisible jusqu'à l'éxécution de la fonction afficherRevisionAlphabet()*/
                        $('#revision_body td').css({'transform':'scale(0.75)', 'opacity':0});
                    } 
                }
                function exercerAlphabetNko() {

                    exercice_questions = malaxer(exercice_questions);

                    initialiserExerciceAStocker();
                    poserExerciceAlphabetQuestion();
                    repeterExerciceAlphabetQuestion();
                    repondreExerciceAlphabetQuestion();
                    corrigerExerciceAlphabetQuestion();

                    
                    function initialiserExerciceAStocker() {
                        for(var i=0;i<nbr_de_questionnaires;i++){
                                        
                            var q = exercice_questions[i];
                            var r = '';
                            var p = parseIntNko(0);
                                        
                            exercice_a_stocker[i] = [q,r,p];
                        }
                    }
                    function poserExerciceAlphabetQuestion(){
                        $('#exercice_question_btn').on('click',function() {

                            let repeter_btn_html = (compteur_d_exercice_question === 1) ? 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߁߭ ߟߊߡߍ߲߫ ߕߎ߲߯' : '߬ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(compteur_d_exercice_question)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯';

                            $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                            $('#exercice_repetition_btn').html(repeter_btn_html);
                            masquer($('#exercice_question_btn'));
                            afficher($('#exercice_repetition_btn'));
                            masquer($('#exercice_correction_btn'));
                            $('#exercice_repetition_btn').addClass('actif');
                            
                            exercice_question = exercice_questions[compteur_d_exercice_question - 1];

                            actualiserExerciceQuestionBtn();
                            lireExerciceQuestion();

                            compteur_d_exercice_question++;
                            
                            function lireExerciceQuestion() { lire('alphabet',exercice_question); }
                            function actualiserExerciceQuestionBtn(){ 
                                let repeter_btn_html = (compteur_d_exercice_question === 1) ? 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߁߭ ߟߊߡߍ߲߫ ߕߎ߲߯' : 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ '+parseIntNko(compteur_d_exercice_question)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯';
                                // compteur_d_exercice_question = (compteur_d_exercice_question === nbr_de_questionnaires) ? 'ߟߊߓߊ߲' : compteur_d_exercice_question;
                                $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(nbr_de_questionnaires)+' \\ '+parseIntNko(compteur_d_exercice_question + 1)+'߲ ߠߊߡߍ߲߫');
                                $('#exercice_repetition_btn').html(repeter_btn_html);
                            }
                        });
                    }
                    function repeterExerciceAlphabetQuestion(){ 
                        $('#exercice_repetition_btn').on('click', function() { lire('alphabet',exercice_question); }); 
                    }
                    function repondreExerciceAlphabetQuestion(){
                        $.each($('#exercice_body .table_parlante td'), function() {
                            let td = $(this);   
                            td.click(function() {
                                $('#exercice_body .table_parlante td').css('background-color','rgba(85,85,85,0.25)');
                                if(exercice_question == "") {secouer($('#exercice_question_btn')); return;}

                                element_actif = $(this);

                                masquer($('#exercice_question_btn'));
                                masquer($('#exercice_repetition_btn'));
                                afficher($('#exercice_correction_btn'));
                                $('#exercice_correction_btn').addClass('actif');

                                exercice_reponse = element_actif.text();
                                $(element_actif).css('background-color','#aaa');
                            });
                            
                        });
                    }
                    function corrigerExerciceAlphabetQuestion() {
                        
                        let exercice_counter = 0;
                        let good_response_counter = 0;
                        let progress_unity = 100/nbr_de_questionnaires;

                        $('#exercice_correction_btn').click(function() {
                            if(exercice_question != '') {
                                
                                afficher($('#exercice_question_btn'));
                                masquer($('#exercice_repetition_btn'));
                                masquer($('#exercice_correction_btn'));
        
                                if(compteur_d_exercice_question-1 < nbr_de_questionnaires) {
                                    $('#exercice_question_btn').addClass('actif');
                                }
                                if(compteur_d_exercice_question-1 === nbr_de_questionnaires) {
                                    $('#exercice_question_btn').removeClass('actif').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').off('click');
                                }

                                marquerReponseDExerciceAlphabet();
                                enregistrerExerciceAlphabet();
                                progressBarrExerciceAlphabet();
                                finDExercice();


                                function marquerReponseDExerciceAlphabet() {
                                    
                                    let bonne_reponse = "";
                                    let mauvaise_reponse = "";

                                    if(exercice_question == exercice_reponse) { bonne_reponse = exercice_reponse; }
                                    if(exercice_question != exercice_reponse) { mauvaise_reponse = exercice_reponse; }

                                    point = (exercice_question == exercice_reponse) ? 1 : 0; 
                                    $.each($('#exercice_body .table_parlante td'), function(){
                                        let td = $(this);
                                        if(td.text() == bonne_reponse) { valider(td); }
                                        if(td.text() == mauvaise_reponse) { barrer(td); clignotage(exercice_question); }
                                    }); 
                                    
                                    setTimeout(() => {
                                        $('#exercice_body .table_parlante td').css('background-color','rgba(85,85,85,0.25)');
                                    }, 1200);
                                }
                                function enregistrerExerciceAlphabet() { 

                                    let point = (exercice_question == exercice_reponse) ? 1 : 0;    
                                    let question_reponse = [exercice_question,exercice_reponse,point];

                                    exercice_a_stocker.splice(exercice_counter,1,question_reponse);
                                    exercice_counter++;
                                }
                                function progressBarrExerciceAlphabet() {
                                    let bar_width = (compteur_d_exercice_question - 1)*progress_unity;

                                    $('#exercice_progress_bar .progress_mauvaise_reponse_bar').css('width', bar_width+'%');
                                    if(exercice_question == exercice_reponse) { 
                                        good_response_counter++;
                                        let good_response_width = good_response_counter*progress_unity;
                                        $('#exercice_progress_bar .progress_bonne_reponse_bar').css('width', good_response_width+'%');
                                    }
            
                                    exercice_question = ''; //Vider la variable exercice_question après son utilisation.
                                }
                                function finDExercice() {  
                                    if(compteur_d_exercice_question - 1 == nbr_de_questionnaires){
                                        setTimeout(() => {
                                                
                                            compteur_d_exercice_question = 1;

                                            let note = calculerNote(exercice_a_stocker);
                        
                                            viderNotification();
                                            initialiserProgressBar();
                                            stockerExerciceAlphabet();
                                            resultatGeneral(exercice_a_stocker);
                                            afficherExerciceRedirectionBtns(exercice_a_stocker);
                                            reprendreExerciceAlphabet();
                                            transitionVersEvaluationAlphabet();
                        
                                            function reprendreExerciceAlphabet() {
                                                if(note < moyenne_d_exercice) { 
                                                    $('#reprendre_exercice_bouton').click(function(e) {
                                                        e.stopImmediatePropagation();
                                                        
                                                        viderLeTableau(exercice_a_stocker);
                                                        if(option_retenue == 2) {

                                                        /* Suppression d'effet des clicks précédents sur les dialogue_boutons */
                                                            $('#exercice_question_btn').unbind('click');
                                                            $('#exercice_repetition_btn').unbind('click');
                                                            $('#exercice_body .table_parlante td').unbind('click');
                                                            $('#exercice_correction_btn').unbind('click');

                                                            $('#alphabet_exercice').removeClass('apprises').addClass('active');
                                                            $('#alphabet_exercice').click();
                                                        }
                                                    });
                                                }
                                                $('#reprendre').click(function(e) {
                                                    e.stopImmediatePropagation();
                                                    $('#envelope').css('display','none');
                                                    $('#alphabet_exercice').click();
                                                });
                                            }
                                            function stockerExerciceAlphabet() {  
                                                if(note <  moyenne_d_exercice) alert( "ߌ ߟߊ߫ ߓߍ߬ߙߍ߫ ߛߐ߬ߘߐ߲߬ߣߍ߲ ߡߎ߬ߡߍ ߦߋ߫ "+parseIntNko(note)+" ߟߋ߬ ߘߌ߫\n ߊ߬ ߡߊ߫ "+parseIntNko(moyenne_d_exercice)+" ߖߘߍ߬ ߓߐ߫ \n\n ߏ߬ߘߐ߬ ߛߍ߬ߦߌ߬ ߦߙߐ ߢߌ߲߬ ߡߊ߫." ); 
                                                if(note >= moyenne_d_exercice) { 
                                                    exercice_alpabet_memoire = exercice_a_stocker;
                                                    sendLessonDataToDB('alphabet_exercice', exercice_alpabet_memoire); 
                                                    sessionStorage.setItem('exercice_alpabet_memoire', JSON.stringify(exercice_alpabet_memoire));

                                                    alphabet_data = [apprentissage_alpabet_memoire, exercice_alpabet_memoire, evaluation_alpabet_memoire];
                                                    sessionStorage.setItem('alphabet_data', JSON.stringify(alphabet_data));

                                                    initialiserProgressBarr();
                                                    console.log("Les données de exercice_alphabet sont envoyées à la base de données");
                                                }
                                            }
                                            function transitionVersEvaluationAlphabet() {
                                                let index_phase_active = $('#alphabet_exercice').index();

                                                if(note >= moyenne_d_exercice) { 
                                                    $('#continu_sur_revision_bouton').click(() => {
                                                        masquer($('.salle_de_classe'));
                                                        setTimeout(() => { 
                                                            $('.container').css('display','block'); 
                                                            displayv($('.direction')); 
                                                            displayv($('#evaluation_container')); 
                                                        }, 400);
                                                        setTimeout(() => { changerPhaseActive(index_phase_active); }, 1200);
                                                    });
                                                }
                                            }
                                        }, 600);
                                    }
                                } 
                            }
                        });
                    }
                }
            }
        }
        function evaluationAlphabet() {
 
            var total_phase = $('.phases li').lenth;
            let index_phase_active = $('.phases_container ul li .active').index();
            var questions_evaluation = malaxer(alphabet_nko[0]);    // alphabet_nko est dans caracteres.js       
            var nbr_max_de_questions_a_poser = 20;
            var question_evaluation = '', questions_a_evaluer = [], reponse_evaluation = [];
            var moyenne_d_evaluation = 1;
            var compteur = incrementer();
            var evaluation_counter = 0;
            let good_response_counter = 0;
            
            var q_index = 0, q_rang = '߭';

            var date_d_evaluation = dateDEvaluation();
            var niveau_d_evaluation = niveau_en_cours;
            var phase_d_evaluation = phase_id;
            var lesson_d_evaluation = [];
            var note_d_evaluation = 0;
            var evaluation_a_stocker = [];
       
        
            initialiserEvaluation();
            chargerEvaluationAlphabet();
            afficherEvaluationAlphabet();
            evaluerAlphabet();
        
        
            function dateDEvaluation() {

                let d = new Date();
                let an = d.getFullYear();
                let lune = d.getMonth();
                let date = d.getDate();
                let nom_du_jour = d.getDay();
                let heure = d.getHours();
                let minute = d.getMinutes();
                let temps = [heure+':'+minute];
                let date_d_evaluation = an+'-'+lune+'-'+date+' '+temps+' '+nom_du_jour;

                return date_d_evaluation;
            }
            function initialiserEvaluation() {
                for(var i = 0; i < 20; i++) questions_a_evaluer[i] = questions_evaluation[i];
                for(var i=0;i<questions_a_evaluer.length;i++) {
                    var q = questions_a_evaluer[i], r = '', p = 0;
                    lesson_d_evaluation[i] = [q,r,p];
                }
                evaluation_a_stocker = {"date":date_d_evaluation, "niveau":niveau_d_evaluation, "phase":phase_d_evaluation, "lesson":lesson_d_evaluation, "note":note_d_evaluation};
            }
            function chargerEvaluationAlphabet() {
                
                chargerEnteteDeEvaluatonAlphabet();
                chargerPiedDeEvaluatonAlphabet();
                chargerCorpsDeEvaluatonAlphabet();
            
        
                function chargerEnteteDeEvaluatonAlphabet() {
                    $('.notification_titre').text('ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ');
                    viderNotification();
                    setTimeout(() => {
                        ecrire('notification_corps','\
                            ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬߸ߦߋ߫ ߛߓߍߘߋ߲߫ ߟߊߡߍ߲ߣߍ߲ ߛߓߍ߫߸ ߤߊ߲߯ ߞߘߐߓߐߟߌ ߦߋ߫ ߓߊ߲߫.\
                        ');
                    }, 1600);
                }
                function chargerPiedDeEvaluatonAlphabet() {

                    var q_total = parseIntNko(nbr_max_de_questions_a_poser);
                    var q_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                    var q_ordre = parseIntNko(q_index+1);
                    var q_rang = (q_index == 0) ? '߭' : '߲';
                    var q_actiom = 'ߟߊߡߍ߲߫';

                    $('.question_label').html( q_label );
                    $('.question_total').html( q_total+' \\ ' );
                    $('.question_ordre').html( q_ordre + q_rang );
                    $('.question_action').html( q_actiom );
            
                    $('.question_btn').css('display','block');
                    $('.repetition_btn').css('display','none');
                    $('.correction_btn').css('display','none');
                }
                function chargerCorpsDeEvaluatonAlphabet() {
                    var evaluation_tbody_default_message = 'ߞߘߐߓߐߟߌ ߞߐߝߟߌ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬.';
                    $('#evaluation_tbody').html("<p id='evaluation_tbody_default_content'>"+evaluation_tbody_default_message+"</p>");
                }
            }
            function evaluerAlphabet() {
                
                poserQuestionEvaluation();
                repeterQuestionEvaluation();
                repondreEvaluation();
                rectificationDEvaluation();
                correctionEvaluation();
                
                
                function poserQuestionEvaluation() {
                    $('.question_btn').on('click', function(){

                        effacerPrecedenteReponse();       
                        effacerLeTableauDEvaluation();
                        question_evaluation = questions_evaluation[q_index]; 
console.log(question_evaluation);                       
                        dicterLaQuestion();
                        $('#evaluation_cross').css('display','none');
                        $('#evaluation_cross').css('transform','scale(0.4)');
                        $('#evaluation_reponse_container').css({'top':0}); 
                        afficherTesteContainer(); 
            
                        q_index = compteur();
                        q_ordre = parseIntNko(q_index+1);

                        var q_rang = (q_ordre == '߁') ? '߭' : '߲';
                        var q_rang_1 = (q_index == 1) ? '߭' : '߲';
                        
                        actualiserLesLibellesDeDialogueBtn();
                        
                        function effacerPrecedenteReponse() { $('#evaluation_reponse').html(''); }
                        function effacerLeTableauDEvaluation() {
                            if(q_index === 0) $('#evaluation_tbody').html("<p id='evaluation_tbody_default_content'></p>");
                        }
                        function actualiserLesLibellesDeDialogueBtn(){
                            let action_1 = (q_index != 1) ? 'ߠߊߡߍ߲߫ ߕߎ߲߯' : 'ߟߊߡߍ߲߫ ߕߎ߲߯';
                            
                            $('#evaluation_question_btn .question_ordre').html( q_ordre + q_rang );
                            $('#evaluation_repetition_btn .question_ordre').html( parseIntNko(q_index) + q_rang_1 );
                            $('#evaluation_question_btn .question_action').html('ߠߊߡߍ߲߫');
                            $('#evaluation_repetition_btn .question_action').html(action_1);
                            
                            $('.question_btn').css('display','none');
                            $('.repetition_btn').css('display','block');
                            $('.correction_btn').css('display','none');
                        }
                        function dicterLaQuestion(){
                            lireLettre('alphabet',question_evaluation);
                        }
                        function afficherTesteContainer() { $('#teste_container').css({'top':'-6rem'}); }
                    });
                }
                function repeterQuestionEvaluation() {
                    $('.repetition_btn').on('click', function(){
                        lireLettre('alphabet',question_evaluation);
                    });
                }
                function repondreEvaluation() {
                    $('#clavier_nko td').on('click', function(){
                        
                        if(question_evaluation == '') secouer($('#evaluation_dialogue_btns'));
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
                        finDeEvaluationAlphabet();
                        
                           
                        function corrigerEvaluation(){
        
                            let q = question_evaluation;
                            let r = reponse_evaluation.join('');
                            let p = (q == r) ? 1:0;
                            let question_reponse = [q,r,p];
                                
                            note_d_evaluation += p; 
                            
                            enregistrerExerciceAlphabet();
                            marquerReponseEvaluation();
                            effacerCheckMark(); 
                            masquerTesteContainer();
                            setTimeout(() => { 
                                chargerInstantannementEvaluationTbody();
                                defilementDuContenuVersLeHaut($('#evaluation_tbody')); 
                            }, 1400);
        
                            evaluation_counter++;
                               
                            function enregistrerExerciceAlphabet() { 
                                lesson_d_evaluation.splice(evaluation_counter,1,question_reponse); 
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
                        function finDeEvaluationAlphabet() {
                            if(q_index==nbr_max_de_questions_a_poser) {

                                viderNotification();

                                $('.question_btn').off('click');
                                $('.question_btn').html('ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹'); 
                                initialiserProgressBarIntegre();
                                
                                if(note_d_evaluation >= moyenne_d_evaluation) {
                                    setTimeout(() => {
                                        ecris('evaluation_notification_corps','\
                                        ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ ߓߘߊ߫ ߓߊ߲߫. ߏ߬ ߦߋ߫ ߛߓߍߛߎ߲ ߖߍ߬ߘߍ ߘߋ߰ߟߌ ߓߊ߲ߣߍ߲ ߘߌ߫. ߌ ߞߎߟߎ߲ߖߋ߫. \
                                        ');
                                    }, 400);
                                    
                                    stockerEvaluationAlphabet();
                                    resultatDAlphabet();
                                    afficherSyllabeBtn();
                                    continuSurSyllabe();
                                }
                                if(note_d_evaluation < moyenne_d_evaluation)  {
                                    setTimeout(() => {
                                        ecris('evaluation_notification_corps','\
                                        ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ ߡߊ߫ ߢߊ߬. ߌ ߖߌߖߊ߬ ߞߊ߬ ߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬. \
                                        ');
                                    }, 400);
                                    afficherRepriseEvaluationBtn();
                                    reprendreEvaluationAlphabet();
                                }
                                
                                                                
                                function stockerEvaluationAlphabet() {
                                    if(note_d_evaluation >= moyenne_d_evaluation) {
                                        // if(phase_class == "apprises") {alert("ߦߙߐ ߢߌ߲߬ ߞߍߣߍ߲߫ ߞߘߐ ߟߋ߬"); return false;}
                                        
                                        let phase_nbr = JSON.parse(sessionStorage.getItem('data_phase_nbr'));
                                        evaluation_alpabet_memoire = lesson_d_evaluation;
                                        sendLessonDataToDB('alphabet_evaluation',evaluation_alpabet_memoire);
                                        sessionStorage.setItem('evaluation_alpabet_memoire', JSON.stringify(evaluation_alpabet_memoire));

                                        let alphabet_data = [apprentissage_alpabet_memoire, exercice_alpabet_memoire, evaluation_alpabet_memoire];
                                        sessionStorage.setItem('alphabet_data', JSON.stringify(alphabet_data));

                                        changerPhaseActive(index_phase_active);
                                        sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr));
                                        console.log('Les données de Alphabet_evaluation sont envoyées à la base de données.');
                                        
                                        
                                        if(index_phase_active === total_phase) {
                                            sessionStorage.setItem('niveau_max',JSON.stringify(niveau_max+1));                                        
                                            sessionStorage.setItem('niveau_actif',JSON.stringify(niveau_max+2));
                                            sessionStorage.setItem('phase_nbr',JSON.stringify(0));
                                        }
                                    }
                                    $('#fermer_evaluation').on('click', function() {
                                        (location.replace("/kouroukan/php/programmes.php"))();
                                    });
                                }
                                function resultatDAlphabet() {
                                    setTimeout(() => {
                                        $('<span class="resultat_btn" id="alphabet_resultat_btn">ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span>').insertAfter($('#evaluation_notification_titre'));
                                        $('#alphabet_resultat_btn').click(()=>{ 
                                            $('#alphabet_resultat_btn').css('display','none');
                                            evaluation_a_stocker.lesson = JSON.stringify(evaluation_a_stocker.lesson);
                                            resultatGeneral(apprentissage_alpabet_memoire, exercice_alpabet_memoire, evaluation_a_stocker); 
                                        });
                                    }, 4000);
                                }
                                function reprendreEvaluationAlphabet() {
                                    $('.redirection_btn_1').click(() => { 
                                        viderLeTableau(lesson_d_evaluation);
                                        raffraichirLaPage(); 
                                    });
                                }
                                function afficherSyllabeBtn() {
                                    masquer($('#evaluation_dialogue_btns, #evaluation_progress_bar'));
                                    afficher($('#evaluation_redirection_btns'));
                                    masquer($('.redirection_btn_1, .redirection_btn_2'));
                                    afficher($('.redirection_btn_3'));
                                    indexer($('.redirection_btn_3'));
                                }
                                function afficherRepriseEvaluationBtn() {
                                    masquer($('#evaluation_dialogue_btns, #evaluation_progress_bar'));
                                    afficher($('#evaluation_redirection_btns'));
                                    masquer($('.redirection_btn_2, .redirection_btn_3'));
                                    $('.redirection_btn_1').html('ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ ߞߍ߫ ߕߎ߲߯');
                                    afficher($('.redirection_btn_1'));
                                    indexer($('.redirection_btn_1'));
                                }
                                function continuSurSyllabe() {
                                    sessionStorage.setItem('matiere_nouvellement_apprise',JSON.stringify(matiere_nom));
                                    // localStorage.removeItem('option_retenue');
                                    $('.redirection_btn_3').html("<a id='redirection_sur_syllabe' href='http://localhost/kouroukan/php/programmes.php'>ߜߋ߲߭ ߥߟߊ߬ߘߊ ߕߊ߬ ߦߊ߲߬</a>");
                                }
                            }
                        }
                    });
                }
            }
        }
    } 
    function afficherExerciceRedirectionBtns(data) {
        let note = calculerNote(data);

        masquer($('#exercice_progress_bar'));
        afficher($('#exercice_redirection_btns'));

        if(note < 95) {
            afficher($('#reprendre_exercice_bouton'));
            masquer($('#continu_sur_revision_bouton'));
            $('#reprendre_exercice_bouton').text(liste_de_matieres[0][1]+' ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯');
            indexer($('#reprendre_exercice_bouton'));
        }
        if(note >= 95) {
            masquer($('#reprendre_exercice_bouton'));
            afficher($('#continu_sur_revision_bouton'));
            $('#continu_sur_revision_bouton').text(liste_de_matieres[0][1]+' ߞߘߐߓߐߟߌ ߞߍ߫')
            indexer($('#continu_sur_revision_bouton'));
        }
    }
    function redirectionSurApprentissage(data) {
        let note = calculerNote(data);

        masquer($('#revision_progress_bar'));
        afficher($('#revision_redirection_btns'));

        $('#revision_question_btn').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').off('click');
        $('#revision_question_btn').removeClass("actif");

        if(note < 95) {
            masquer($('#continu_sur_apprentissage_bouton'));
            afficher($('#reprendre_revision_bouton'));
            masquer($('#evaluation_bouton'));
            masquer($('#syllabe_bouton'));
            
            $('#reprendre_revision_bouton').text(liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
            indexer($('#reprendre_revision_bouton'));
        }

        if(note >= 95) {
            if(data.length < 27) {
                afficher($('#continu_sur_apprentissage_bouton'));
                masquer($('#reprendre_revision_bouton'));
                masquer($('#evaluation_bouton'));
                masquer($('#syllabe_bouton'));

                $('#continu_sur_apprentissage_bouton').text('ߥߊ߫ '+liste_de_matieres[0][1]+' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬')
                indexer($('#continu_sur_apprentissage_bouton'));

                $('#continu_sur_revision_bouton').click(() => { raffraichirLaPage(); });
            }
            if(data.length === 27) {
                masquer($('#continu_sur_apprentissage_bouton'));
                masquer($('#reprendre_revision_bouton'));
                masquer($('#evaluation_bouton'));
                afficher($('#syllabe_bouton'));

                indexer($('#syllabe_bouton'));
            }
        }
    }
    function afficherAlphabetExerciceBouton() {

        masquer($('#parametre_lesson_container'));
        masquer($('#panneaux'));
        masquer($('#apprentissage_dialogue_btns'));
        setTimeout(() => { 
            masquer($('#apprentissage_progress_bar'));
            afficher($('#apprentissage_redirection_btns')); 
   
            masquer($('#pre_apprentissage_bouton'));
            afficher($('#continu_sur_exercice_bouton'));
            $('#continu_sur_exercice_bouton').text("ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫");
            indexer($('#continu_sur_exercice_bouton'));
        }, 400);
    }
    function afficherPreRevisionBtn() {
        $('#apprentissage_dialogue_btn').css('display','none');

        $('#pre_apprentissage_btns').css('display','none');
        $('.redirection_btns').css('display','block');
   
        $('#exercice_bouton').css('display','none');
        $('#evaluation_bouton').css('display','block');

        zoomUp($('.dialogue_btns'));
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
}