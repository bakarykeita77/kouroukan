function alphabet() {
    
    let datas = JSON.parse(sessionStorage.getItem('datas'));
    let date_d_apprentissage_alphabet_du_serveur = dateDApprentissageAlphabetDuServeur();
    let data_apprentissage_alphabet = {};
    let data_exercice_alphabet = {};
    let data_evaluation_alphabet = {};

    let element_actif = '';
    let matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));
    let phases_etudiees = JSON.parse(sessionStorage.getItem('phases_etudiees'));
    let ordre_de_question = '';
    let total_exercice_questions = 0;
    let total_evaluation_questions = 0;
    let questions_posees = [];
    let total_questions_posees = 0;
    let pre_question = '', pre_reponse = '';

    let point = 0;
    let pourcentage_general = 0;

    var nom = JSON.parse(sessionStorage.getItem('nom'));
    var prenom = JSON.parse(sessionStorage.getItem('prenom'));
    var niveaux_etudies = JSON.parse(sessionStorage.getItem('niveaux_etudies')); 
    var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var niveau_max = JSON.parse(sessionStorage.getItem('niveau_max'));   // Voir programmes.js fonction storagesDuProgramme()
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    var option_retenue = JSON.parse(localStorage.getItem('option_retenue')); // Voir programmes.js : lessonOptions()
  
    if(niveau_actif === 1) {

        phases_etudiees = (phases_etudiees == null) ? [] : phases_etudiees;
                    
        if(option_retenue != null) {
            switch(option_retenue) {
                case 1 : preAlphabetNko(); break;
                case 2 : alphabetNko();  break; 
            }
        }

        function preAlphabetNko() {
            
            let lesson_d_apprentissage_pre_alphabet = JSON.parse(localStorage.getItem('lesson_d_apprentissage_pre_alphabet'));
            let lesson_d_exercice_pre_alphabet = JSON.parse(localStorage.getItem('lesson_d_exercice_pre_alphabet'));
            let lesson_d_evaluation_pre_alphabet = JSON.parse(localStorage.getItem('lesson_d_evaluation_pre_alphabet'));
            
            let lettres_apprises = JSON.parse(localStorage.getItem('lettres_apprises'));
            lettres_apprises = (lettres_apprises == null) ? [] : lettres_apprises;

            lesson_d_apprentissage_pre_alphabet = (lesson_d_apprentissage_pre_alphabet == null) ? [] : lesson_d_apprentissage_pre_alphabet;
            lesson_d_exercice_pre_alphabet = (lesson_d_exercice_pre_alphabet == null) ? [] : lesson_d_exercice_pre_alphabet;
            lesson_d_evaluation_pre_alphabet = (lesson_d_evaluation_pre_alphabet == null) ? [] : lesson_d_evaluation_pre_alphabet;
            
            let cercle_actif = '';
            let cercle_id = '';

            let clickable_td = [];
            
            let alphabet_tr_index = 0;
            let cercle_index = 0;
            let les_lettres_actives = [];
            let quantite_normale_de_click = 1;

            let nbr_bonne_reponse = 0;
            let nbr_mauvaise_reponse = 0;
            let point_total = 0;
            
            let note_d_exercice_pre_alphabet = 0;
            let note_d_evaluation_pre_alphabet = 0;


            masquer($('.direction'));

            apprentissagePreAlphabet();
            exercicePreAlphabet();
            evaluationPreAlphabet();
            fermerLaPage()
            

            function apprentissagePreAlphabet() {
                
                let pre_apprentissage_alphabet_partiel = [];

                alphabet_tr_index = alphabetTrIndex();

                initialiserProgressBar();
                chargerApprendrePreAlphabet();
                afficherApprendrePreAlphabet();
                apprendrePreAlphabet();
            

                function chargerApprendrePreAlphabet() {

                    chargerEnteteDePreAlphabet();
                    chargerCorpsDePreAlphabet();
                    chargerFootDePreAlphabet();
                    
                    function chargerEnteteDePreAlphabet() {
                        $('.notification_titre').html('ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                        viderNotification();
                        if(lesson_d_apprentissage_pre_alphabet.length < 27) {
                            setTimeout(() => { 
                                ecrire('notification_corps','ߞߏ߰ߙߌ߬ '+cercleRang() +' ('+parseIntNko(alphabet_tr_index)+'߲) ߘߌ߲߯ ߘߎ߭ߡߊ߬'); 
                            }, 4000);
                        }
                    }
                    function chargerFootDePreAlphabet() {
                        
                        var cercles_html = cerclesHTML();
                        var pre_apprentisssage_btn_html = "\
                            <div class='titre_de_parti'> ߞߎߘߎ߲</div> \
                            <div id='cercles_des_partis'>"+cercles_html+"</div> \
                        ";
                        $('#apprentissage_dialogue_btns').html(pre_apprentisssage_btn_html);
                        
                        $('#pre_apprentissage_bouton').html('<p>ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߞߍ߫ ߕߎ߲߯</p>');
                        $('#continu_sur_exercice_bouton').html('<p>ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>');
                        
                        
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
                    function cercleRang() {
                        let cr = '';

                        if(alphabet_tr_index === 1) { cr = 'ߝߟߐߡߊ'; }
                        if(alphabet_tr_index === 2) { cr = 'ߝߌߟߊߣߊ߲'; }
                        if(alphabet_tr_index === 3) { cr = 'ߛߓߊߣߊ߲'; }
                        if(alphabet_tr_index === 4) { cr = 'ߣߊ߯ߣߌߣߊ߲'; }

                        return cr;
                    }
                }
                function afficherApprendrePreAlphabet() {

                    affichageDApprendrePreAlphabet();
                    tdStyle();
                    cerclesStyle();

                    function affichageDApprendrePreAlphabet() {
                      
                        masquer($(".course > div"));
                        display($('#apprentissage_container'));
                        masquer($('#apprentissage_container > div:not(#apprentissage_head'));
                        setTimeout(() => { afficher($('#apprentissage_container > div:not(#apprentissage_head')); }, 100);
                        
                        masquer($('#apprentissage_foot > div'));
                        $('#apprentissage_dialogue_btns').css({
                            "display":"flex",
                            "transform":"scale(1)",
                            "opacity":1
                        }); 
                        afficherPreApprendreAlphabetTd();
                
                        function afficherPreApprendreAlphabetTd() { 

                            $('.pre_apprentissage_td, .table_parlante td').css({'opacity': 0});
                            $('.pre_apprentissage_td, .table_parlante td').each(function() {

                                let row = $(this).parent();
                                let tr_index = row.index();
                                let td_index = $(this).index();
                                let index = tr_index*7 + td_index;  // 7 est le nombre maximal de td par tr.
                        
                                setTimeout(() => {
                                    setTimeout(() => { $(this).css({'opacity': 1}); }, index*100); // 100 en milli second est le temps qui sépare l'affichage des td.
                                }, 1000);
                            });
                        } 
                    }
                    function cerclesStyle() {
                        if(lesson_d_apprentissage_pre_alphabet.length < 27) {
                            
                            cercle_actif = $('.cercle:nth-child('+alphabet_tr_index+')');
                            cercle_actif.addClass("shadow");
                            rendreActif(cercle_actif);
                            indexer(cercle_actif);

                            cercle_actif.prevAll().addClass('cercle_depasse');
                            cercle_actif.nextAll().addClass('cercle_a_faire');
                        }
                        if(lesson_d_apprentissage_pre_alphabet.length == 27) $('.cercle').removeClass('indicateur').addClass('cercle_depasse');
                    }
                }
                function apprendrePreAlphabet() {

                    // rappelDuCercleActif();
                    $('#cercles_des_partis_cadre span').click(function() {
                        
                        cercle_actif = $(this);
                        cercle_index = $(this).index();
                        rang = cercle_actif.text();
                
                        if(cercle_actif.attr('class') == 'cercle shadow actif') {
     
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
                                clickable_td = (lesson_d_apprentissage_pre_alphabet == null) ? les_lettres_actives : lettres_apprises.concat(les_lettres_actives);

                                sessionStorage.setItem('les_lettres_actives', JSON.stringify(les_lettres_actives));
                                sessionStorage.setItem('clickable_td', JSON.stringify(clickable_td));

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
                                        pre_apprentissage_alphabet_partiel.push([les_lettres_actives[i], 0, 0]); 
                                    }
                                }
                            }
                            function dispenserPreAlphabet() {

                                let apprentissage_width = 0;
                                let clicks_counter = 0;
                                let clicked_td_length = 0;
                                let global_clicks_counter = 1;
                                let total_yellow_letter = ($('#tr_actif').index() === 3) ? 6 : $('#tr_actif span').length;

                                $.each($('.pre_apprentissage_td, .table_parlante td'), function() {
                                    
                                    let td_actif = $(this);
                                    let td_click_counter = 1;
                                    
                                    td_actif.click(()=>{
                                        if(lesson_d_apprentissage_pre_alphabet.length < 27) {

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
                                                        pre_apprentissage_alphabet_partiel.splice(td_index,1,[clicked_letter,td_click_count,point]);
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
                                                            setTimeout(() => {
                                                                ecris('apprentissage_notification_corps','\
                                                                    ߣߌ߫ ߟߊ߲ߞߣߍߡߊߣߍ߲ ߠߎ߬ ߓߘߊ߫ ߟߐ߲߫ ߌ ߓߟߏ߫߸ ߢߊ߯ߡߌߟߊ߲ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫߹) ߞߊ߬ ߘߋ߲߬ߣߍ߲߬ ߞߎߘߊ ߟߎ߬ ߢߊ߯ߡߌ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߞߊ߲ߡߊ߬.\
                                                                '); 
                                                            }, 400);

                                                            stockerApprentissagePreAlphabet();
                                                            afficherAlphabetExerciceBouton();
                                                            exercicePreAlphabet();

                                                            function stockerApprentissagePreAlphabet() { 

                                                                if((cercle_index+1)*total_yellow_letter === lesson_d_apprentissage_pre_alphabet.length) {
                                                                    console.log("L'apprentissage pre_alphabet est déjà fait");
                                                                    return;
                                                                }
                                                                
                                                                lesson_d_apprentissage_pre_alphabet = (lesson_d_apprentissage_pre_alphabet.length === 0) ? pre_apprentissage_alphabet_partiel : lesson_d_apprentissage_pre_alphabet.concat(pre_apprentissage_alphabet_partiel);
                                                                console.log("La leçon d'apprentissage pre_alphabet fait :");
                                                                console.log(lesson_d_apprentissage_pre_alphabet);

                                                                localStorage.setItem('lesson_d_apprentissage_pre_alphabet', JSON.stringify(lesson_d_apprentissage_pre_alphabet));
                                                            }
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
                    if(lesson_d_apprentissage_pre_alphabet.length === 27) {
                        if(datas.length != 0) {
                            lectureSimpleDeLAlphabet();
                            viderNotification();
                            ecrire('notification_corps','ߌ ߕߎ߲߬ ߓߘߊ߫ ߛߓߍߛߎ߲ ߘߋ߲߰ ߞߊ߬ ߢߊ߬߸ ߞߊ߬ߓߌ߯ '+date_d_apprentissage_alphabet_du_serveur+'\
                                ߛߌߛߊ߲߬ ߌ ߘߌ߫ ߛߋ߫ ߛߓߍߛߎ߲ ߘߋ߲߰ ߠߊ߫ (ߞߵߊ߬ ߟߊߡߍ߲߫ ߘߐߙߐ߲߫ ߞߊ߬ߣߌ߲߬) ߒ߬ߞߊ߬ ߌ ߕߍߣߊ߬ ߖߊ߬ߕߋ߬ߓߐ߬ ߟߊ߫ ߊ߬ ߟߊ߫. ߏ߬ ߘߐ߫߸ ߡߊ߬ߞߟߏ߬ߟߌ߫ ߣߌ߫ ߞߘߐߓߐߟߌ߫ ߛߌ߫ ߕߍ߫ ߦߋ߲߬ ߓߊ ߏ߬ ߟߎ߬ ߞߍߣߍ߲߫ ߞߘߐ ߟߋ߬.\
                            ');
                            
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
                        }
                        $('.pre_apprentissage_td').click(function() { lire('alphabet',$(this).text()); });
                    }

                    function rappelDuCercleActif() {
                        if(lesson_d_apprentissage_pre_alphabet.length < 27) {
                            $('.pre_apprentissage_tr:not(.actif), .cercle:not(.actif)').click(function() { 
                                secouer($('.cercle:nth-child('+alphabet_tr_index+')')); 
                            });
                        }
                    }
                }
                function tdStyle() {
                    if(lesson_d_apprentissage_pre_alphabet != null) {
                        $.each($('.pre_apprentissage_td, .table_parlante td'), function() {
                            let td = $(this);
                            let letter = td.text();
                            if(lettres_apprises.includes(letter)) { td.css({
                                'background-color':'rgba(85, 85, 85, 0.25)', 
                                'color':'#fff'
                            }); }
                        });  
                    }
                }
                function alphabetTrIndex() {
                    let ati = 1;
                    if(lettres_apprises.length != 0) {
                        switch(lettres_apprises.length) {
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
                $('#exercice_bouton, #reprendre_exercice_bouton, #continu_sur_exercice_bouton').click(function(e) {

                    console.log("Début d'exercice partiel d'alphabet");
                    e.stopImmediatePropagation(); 
                    
                    let pre_exercice_alphabet_partiel = [];
                    let exercice_pre_questions = [];

                    $('.fermeture_pre').attr('id','fermeture_pre_exercice');

                    les_lettres_actives = JSON.parse(sessionStorage.getItem('les_lettres_actives'));
                    lesson_d_exercice_pre_alphabet = JSON.parse(localStorage.getItem('lesson_d_exercice_pre_alphabet'));
                    lesson_d_exercice_pre_alphabet = (lesson_d_exercice_pre_alphabet == null) ? [] : lesson_d_exercice_pre_alphabet;

                    exercice_btn_id = $(this).attr('id');
                    questions_posees.splice(0,questions_posees.length);
                    exercice_pre_questions = malaxer(malaxer(les_lettres_actives));

                    total_exercice_questions = exercice_pre_questions.length;
                                 
                    initialiserProgressBar();   
                    chargerExercicePreAlphabet();
                    afficherExercice();
                    exercerAlphabet();


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
                            $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_exercice_questions)+' \\ ߁߭ ߟߊߡߍ߲߫');
                            $('#exercice_correction_btn').html('<p>ߏ߬ ߛߊߞߍ߫</p>');
                            $('#reprendre_exercice_bouton').html('<p>ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯</p>');
                            $('#revision_bouton').html('<p>ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ ߞߍ߫</p>');
                        }
                        function chargerCorpsDExercicePreAlphabet() {
                            var exercice_body_html = lessonHTML(exercice_pre_questions, '');
                            $('#exercice_body').html(exercice_body_html);

                        /*revision body est chargé mais doit etre invisible jusqu'à l'éxécution de la fonction afficherRevisionAlphabet()*/
                            $('#revision_body td').css({'opacity':0});
                        }  
                    }
                    function exercerAlphabet() {
                        
                        let i=0;
                        let pre_questions = malaxer(exercice_pre_questions);
        
                        initialiserExercicePreAlphabetPartiel();
                        ecouterExercicePreQuestion();
                        repeterExercicePreQuestion();
                        repondreExercicePreQuestion();
                        corrigerExercicePreQuestion();
                    
            
                        function initialiserExercicePreAlphabetPartiel() {
                            for(let i=0; i<pre_questions.length; i++) { 
                                pre_exercice_alphabet_partiel.push([pre_questions[i], 0, 0]); 
                            }
                        }                                                                                                                                 
                        function ecouterExercicePreQuestion() {
                            $('#exercice_question_btn').click(function() { 

                                pre_question = pre_questions[i];
                                montrerReponse(pre_question,$("#exercice_body td"));
                                        
                                if(i < total_exercice_questions) { 
                                    
                                    actualiserLeLabelDeQuestionBtn();
                                    actualiserLeLabelDeRepetitionBtn();
                                    afficherRepetitionBtn();
                                    lire('alphabet',pre_question); 
                                    
                                    questions_posees.push(pre_question);
                                    total_questions_posees = questions_posees.length;

                                    
                                    function actualiserLeLabelDeQuestionBtn() {
                                        ordre_de_question = (total_exercice_questions == i+2) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                                        $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_exercice_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                                    }
                                    function actualiserLeLabelDeRepetitionBtn() {
                                        let repeter_btn_html = (i === 0) ? 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߁߭ ߟߊߡߍ߲߫ ߕߎ߲߯' : 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(i+1)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯';
                                        $('#exercice_repetition_btn').html(repeter_btn_html);
                                    }
                                }
                            });
                        }
                        function repeterExercicePreQuestion() {
                            $('#exercice_repetition_btn').click(function() { 

                                pre_question = pre_questions[i];
                                lire('alphabet',pre_question); 
                                montrerReponse(pre_question,$("#exercice_body td"));

                                afficherRepetitionBtn();
                                montrerReponse(pre_question,$("#exercice_body td"));
                            });
                        }
                        function repondreExercicePreQuestion() {
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
                                            masquer($('#exercice_dialogue_btns > div'));
                                            rendreActif($('#exercice_correction_btn'));
                                            afficherRapidement($('#exercice_correction_btn')); 
                                        }
                                    }
                                });
                            });
                        }
                        function corrigerExercicePreQuestion() {

                            let bonne_reponse_counter = 0;
                            let pre_question_counter = 0;

                            $('#exercice_correction_btn').click(function() { 
                                if(total_questions_posees <= total_exercice_questions) { 

                                    marquerLaReponse();
                                    reAfficherQuestionBtn();
                                    setTimeout(() => { $('#exercice_body td').css('background-color','rgba(85,85,85,0.25)'); }, 800);
                                    
                                    enregistrerPreExerciceAlphabet();
                                    progressBarExercicePreAlphabet();
                                    finDExercicePreAlphabet();
                                    i++;


                                    function marquerLaReponse() {
                                        if(pre_question == '') { return false; }
                                        if(pre_question == pre_reponse) { valider(element_actif); }
                                        if(pre_question != pre_reponse) { barrer(element_actif); }
                                    }
                                    function reAfficherQuestionBtn() {
                                        
                                        masquer($('#exercice_dialogue_btns > div'));
                                        if(i < total_exercice_questions - 1) { 
                                            rendreActif($('#exercice_question_btn')); 
                                            afficherRapidement($('#exercice_question_btn')); 
                                        }
                                    }
                                    function enregistrerPreExerciceAlphabet() {

                                        let question_reponse = [];
                                        let question_index = i;
                                        
                                        if(pre_question == '') { return false; }
                            
                                        point = (pre_question == pre_reponse) ? 1 : 0;
                                        question_reponse = [pre_question,pre_reponse,point];
                                        pre_exercice_alphabet_partiel.splice(question_index,1,question_reponse);
                                        
                                        if(pre_question == pre_reponse) { nbr_bonne_reponse++; point_total++; }
                                        if(pre_question != pre_reponse) { nbr_mauvaise_reponse++; }

                                        pre_question = '';
                                        pre_reponse = ''; 
                                    }
                                    function progressBarExercicePreAlphabet() {

                                        let diagramm_unity = 100/total_exercice_questions;

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
                                        if(pre_question_counter === total_exercice_questions) { 
                                            setTimeout(() => { 
                                                pre_question_counter = 0;
                                                bonne_reponse_counter = 0;
                                            }, 1000);
                                        }
                                    }
                                    function finDExercicePreAlphabet() {
                                        if(total_questions_posees === total_exercice_questions) {  
        
                                         /* Suppression d'effet des clicks précédents sur les dialogue_boutons */
                                            $('#exercice_question_btn').unbind('click');
                                            $('#exercice_repetition_btn').unbind('click');
                                            $('#table_alphabet_exercice td').unbind('click');
                                            $('#exercice_correction_btn').unbind('click');
            
                                            note_d_exercice_pre_alphabet = calculerNote(pre_exercice_alphabet_partiel);
                    
                                            redirectionDExercicePreAlphabet(pre_exercice_alphabet_partiel);
                                            notificationDeFinDExercicePreAlphabet();
                                            stockerExercicePreAlphabet();

                                            // preExerciceResultat();  
                                            fermerPreExercice();

                                            function notificationDeFinDExercicePreAlphabet() {
                                                viderNotification();
                                                setTimeout(() => { 
                            
                                                    if(note_d_exercice_pre_alphabet < 100) {
                                                        let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                        viderLeTableau(pre_exercice_alphabet_partiel);
                                                        setTimeout(() => { ecris('exercice_notification_corps', notification); }, 600);
                                                    }
                                                    if(note_d_exercice_pre_alphabet == 100) { 
                                                        let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                        setTimeout(() => { ecris('exercice_notification_corps', notification); }, 600);
                                                    }

                                                //Initialisation du nombre de mauvaise reponse
                                                    nbr_mauvaise_reponse = 0;
                                                }, 600); 
                                            }
                                        
                                            
                                            function stockerExercicePreAlphabet() {
                                                if(note_d_exercice_pre_alphabet < 100) {
                                                    viderLeTableau(pre_exercice_alphabet_partiel);
                                                    console.log("pre_exercice_alphabet_partiel est vidé");
                                                    console.log(pre_exercice_alphabet_partiel);
                                                    console.log(lesson_d_exercice_pre_alphabet);
                                                }
                                                if(note_d_exercice_pre_alphabet === 100) {
                                                    
                                                    if((cercle_index+1)*les_lettres_actives.length === lesson_d_exercice_pre_alphabet.length) {
                                                        console.log("L'exercice pre_alphabet est déjà fait");
                                                        return;
                                                    }
                                                    
                                                    lesson_d_exercice_pre_alphabet = (lesson_d_exercice_pre_alphabet.length === 0) ? pre_exercice_alphabet_partiel : lesson_d_exercice_pre_alphabet.concat(pre_exercice_alphabet_partiel);
                                                    console.log("La leçon d'exercice pre_alphabet fait :");
                                                    console.log(lesson_d_exercice_pre_alphabet); 
                                                    localStorage.setItem('lesson_d_exercice_pre_alphabet', JSON.stringify(lesson_d_exercice_pre_alphabet));
                                                }
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
                                                        if(note_d_exercice_pre_alphabet < 100) { $('#exercice_bouton').html('<p>ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯</p>'); }
                                                        if(note_d_exercice_pre_alphabet == 100) { afficherPreRevisionBtn(); }
                                                    }, 250);
                                                });
                                            } 
                                            function preExerciceResultat() {
                                                            
                                                resultat(lesson_d_exercice_pre_alphabet);
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
                                        }
                                    }
                                } 
                            });
                        }
                    }
                });
            }
            function evaluationPreAlphabet() {
                $('#revision_bouton, #reprendre_revision_bouton, #continu_sur_revision_bouton').click(function(e) {
                    e.stopImmediatePropagation();    
                    console.log("Début d'évaluation partiel d'alphabet");

                    let pre_evaluation_alphabet_partiel = [];
                    let evaluation_pre_questions = [];
                    
                    $('.fermeture_pre').attr('id','fermeture_pre_revision');
                    
                    clickable_td = JSON.parse(sessionStorage.getItem('clickable_td'));
                    lesson_d_evaluation_pre_alphabet = JSON.parse(localStorage.getItem('lesson_d_evaluation_pre_alphabet'));
                    lesson_d_evaluation_pre_alphabet = (lesson_d_evaluation_pre_alphabet == null) ? [] : lesson_d_evaluation_pre_alphabet;

                    questions_posees.splice(0,questions_posees.length);
                    evaluation_pre_questions = malaxer(clickable_td);
                    total_evaluation_questions =  evaluation_pre_questions.length;

                    initialiserProgressBar();
                    chargerEvaluationPreAlphabet();
                    afficherRevision();
                    evaluerPreAlphabet();


                    function chargerEvaluationPreAlphabet() {
                        
                        chargerEnteteDePreEvaluationAlphabet();
                        chargerPiedDePreRevisionAlphabet();
                        chargerCorpsDePreRevisionAlphabet();
                    
                        function chargerEnteteDePreEvaluationAlphabet() {

                            let notification = "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߠߎ߬ ߟߋ߬ ߓߍ߯ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫";
                            
                            $('#revision_notification_titre').html('ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ</h3>');
                            viderNotification();
                            setTimeout(() => { ecris('revision_notification_corps',notification); }, 1000);
                        }
                        function chargerPiedDePreRevisionAlphabet() {
                            $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_evaluation_questions)+' \\ ߁߭ ߟߊߡߍ߲߫');
                            $('#reprendre_revision_bouton').html(matiere_nom+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                            $('#evaluation_bouton').html(matiere_nom+'  ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߥߴߊ߬ ߡߊ߬');
                        }
                        function chargerCorpsDePreRevisionAlphabet() {
                            var revision_body_html =  lessonHTML(evaluation_pre_questions, '');
                            $('#revision_body').html(revision_body_html);

                         /*revision body est chargé mais doit etre invisible jusqu'à l'éxécution de la fonction afficherEvaluationPreAlphabet()*/
                            $('#revision_body td').css({'opacity':0});
                        }  
                    }
                    function  evaluerPreAlphabet() {

                        let i=0;
                        evaluation_pre_questions = malaxer(evaluation_pre_questions);

                        initialiserEvaluationPreAlphabetPartiel();
                        affichageParDefautDEvaluationPreAlphabet(); 
                        ecouterEvaluationPreQuestion();
                        repeterEvaluationPreQuestion();
                        repondreEvaluationPreQuestion();
                        corrigerEvaluationPreQuestion();
                    
            
                        function initialiserEvaluationPreAlphabetPartiel() {
                            for(let i=0; i<evaluation_pre_questions.length; i++) { 
                                pre_evaluation_alphabet_partiel.push([evaluation_pre_questions[i], 0, 0]); 
                            }
                        }
                        function affichageParDefautDEvaluationPreAlphabet() {
                            masquer($('#revision_dialogue_btns > div'));
                            rendreActif($('#revision_question_btn'));
                            afficherRapidement($('#revision_question_btn'));
                        }
                        function ecouterEvaluationPreQuestion() {
                            $('#revision_question_btn').click(function(e) {
                                if(i < total_evaluation_questions) { 
                                    e.stopImmediatePropagation();

                                    pre_question =  evaluation_pre_questions[i];
                                    montrerReponse(pre_question,$("#revision_body td"));
                                
                                    actualiserLeLabelDeRevisionQuestionBtn();
                                    actualiserLeLabelDeRevisionRepetitionBtn();
                                    afficherRevisionRepetitionBtn();
                                    lire('alphabet',pre_question); 
                                    questions_posees.push(pre_question);
                                    total_questions_posees = questions_posees.length;


                                    if(i == total_evaluation_questions) { i = 0; }

                                    function actualiserLeLabelDeRevisionQuestionBtn() {
                                        ordre_de_question = (total_evaluation_questions == i+2) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                                        $('#revision_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_evaluation_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                                    }
                                    function actualiserLeLabelDeRevisionRepetitionBtn() {
                                        let repeter_btn_html = (i === 0) ? 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߁߭ ߟߊߡߍ߲߫ ߕߎ߲߯' : 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(i+1)+' ߠߊߡߍ߲߫ ߕߎ߲߯';
                                        $('#revision_repetition_btn').html(repeter_btn_html);
                                    }
                                    function afficherRevisionRepetitionBtn() {
                                        masquer($('#revision_dialogue_btns > div'));
                                        rendreActif($('#revision_repetition_btn'));
                                        afficherRapidement($('#revision_repetition_btn')); 
                                    }
                                }
                            });
                        }
                        function repeterEvaluationPreQuestion() {
                            $('#revision_repetition_btn').click(function() { 

                                lire('alphabet',pre_question); 
                                montrerReponse(pre_question,$("#revision_body td"));

                                afficherRepetitionBtn();
                                montrerReponse(pre_question,$("#revision_body td"));
                            });
                        }
                        function repondreEvaluationPreQuestion() {
                            $.each($('#revision_body td'), function() {
                                let td = $(this);
                                td.click(function(){
                                    element_actif = $(this);
                                    if(i <= total_evaluation_questions) { 

                                        rappelerRevisionQuestionBtnSiPasDeQuestion();
                                        repondrePreAlphabetRevision();
                                        afficherRevisionCorrectionBtn();
                    
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
                                        function afficherRevisionCorrectionBtn() {
                                            if(total_questions_posees <= total_evaluation_questions) {
                                                
                                                if(pre_question === '') { return; }
                                            
                                                masquer($('#revision_dialogue_btns > div'));
                                                rendreActif($('#revision_correction_btn'));
                                                afficherRapidement($('#revision_correction_btn')); 
                                            }
                                        }
                                    }
                                });
                            });
                        }
                        function corrigerEvaluationPreQuestion() {

                            let pre_question_counter = 0;
                            let bonne_reponse_counter = 0;

                            $('#revision_correction_btn').click(function(e) { 
                                e.stopImmediatePropagation();

                                if(i <= total_evaluation_questions) { 

                                    $('#revision_container .table_parlante td').css('background-color','rgba(85, 85, 85, 0.25)');
                
                                    correctionDeEvaluation();
                                    enregistrerEvaluationPreAlphabet();
                                    progressBarrEvaluationPreAlphabet();
                                    afficherRevisionQuestionBtn();
                                    finDEvaluationPreAlphabet();
                                    i++;
                
                                    
                                    function correctionDeEvaluation() {
                                        if(pre_question == '') { return false; }
                                        if(pre_question == pre_reponse) { valider(element_actif); }
                                        if(pre_question != pre_reponse) { barrer(element_actif); }
                                    }
                                    function enregistrerEvaluationPreAlphabet() {

                                        let question_reponse = [];
                                        let question_index = i;

                                        if(pre_question == '') { return false; }
                            
                                        point = (pre_question == pre_reponse) ? 1 : 0;
                                        question_reponse = [pre_question,pre_reponse,point];
                                        pre_evaluation_alphabet_partiel.splice(question_index,1,question_reponse);
                                    
                                        if(pre_question == pre_reponse) { nbr_bonne_reponse++; point_total++; }
                                        if(pre_question != pre_reponse) { nbr_mauvaise_reponse++; }
                                        pre_question = '';
                                        pre_reponse = ''; 
                                    }
                                    function progressBarrEvaluationPreAlphabet() {

                                        let diagramm_unity = 100/total_evaluation_questions;

                                        afficher($('.progress_bar'));
                                        pre_question_counter++;

                                        if(point === 1) {
                                            bonne_reponse_counter++;
                                            $('.progress_bonne_reponse_bar').css('width',bonne_reponse_counter*diagramm_unity+'%');
                                            $('.progress_mauvaise_reponse_bar').css('width',pre_question_counter*diagramm_unity+'%');
                                        }
                                        if(point === 0) {
                                            $('.progress_mauvaise_reponse_bar').css('width',pre_question_counter*diagramm_unity+'%');
                                        }
                                    }
                                    function afficherRevisionQuestionBtn() {

                                        masquer($('#revision_dialogue_btns > div'));
                                        rendreActif($('#revision_question_btn'));
                                        afficherRapidement($('#revision_question_btn')); 
                                        
                                        if(i == total_evaluation_questions) {
                                            masquer($('#revision_dialogue_btns > div'));
                                        }
                                    }
                                    function finDEvaluationPreAlphabet() {
                                        if(total_questions_posees === total_evaluation_questions) {
        
                                         /* Suppression d'effet des clicks précédents sur les dialogue_boutons */
                                            $('#revision_question_btn').unbind('click');
                                            $('#revision_repetition_btn').unbind('click');
                                            $('#revision_body .table_parlante td').unbind('click');
                                            $('#revision_correction_btn').unbind('click');
                                        
                                            note_d_evaluation_pre_alphabet = calculerNote(pre_evaluation_alphabet_partiel);

                                            redirectionDEvaluationPreAlphabet(pre_evaluation_alphabet_partiel); 
                                            notificationDeFinDEvaluationPreAlphabet();
                                            stockerEvaluationPreAlphabet();

                                            setTimeout(() => { fermerPreEvaluer(); }, 200);
                                            resultatGeneralDAlphabet(); 
                                            nbr_mauvaise_reponse = 0;


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
                                                            
                                                        if(note_d_evaluation_pre_alphabet < 100) {
                                                            afficherPreRevisionBtn();
                                                            $('#revision_bouton').html('<p>ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯</p>');
                                                        }
                                                        if(note_d_evaluation_pre_alphabet == 100) {
                                                            $('#'+cercle_id).removeClass('apprentissage_en_cours').addClass('cercle_depasse');
                                                            rendreActif($('#'+cercle_id).next()); 
                                                            indexer($('#'+cercle_id).next()); 
                                                            ecrire('notification_corps','ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߌ߲߯ ߘߎ߭ߡߊ߬');
                                                        }
                                                    }, 250);
                                                });
                                            }
                                            function stockerEvaluationPreAlphabet() {
                                             /* Pourque l'évaluation soit stockée, il faut que la note d'évaluation soit superieur ou égale à la moyenne */
                                                
                                                if(note_d_evaluation_pre_alphabet < 92) {
                                                    viderLeTableau(pre_evaluation_alphabet_partiel);
                                                    console.log("pre_evaluation_alphabet_partiel est vidé");
                                                    console.log(pre_evaluation_alphabet_partiel);
                                                    console.log(lesson_d_evaluation_pre_alphabet);
                                                }
                                                if(note_d_evaluation_pre_alphabet >= 92) {
                                                    if(lesson_d_evaluation_pre_alphabet.length < 27) {
                                                    
                                                        if((cercle_index+1)*les_lettres_actives.length === lesson_d_evaluation_pre_alphabet.length) {
                                                            console.log("L'evaluation pre_alphabet est déjà fait");
                                                            return;
                                                        }
                                                        
                                                        lesson_d_evaluation_pre_alphabet = pre_evaluation_alphabet_partiel;
                                                        console.log("La leçon d'évaluation pre_alphabet fait :");
                                                        console.log(lesson_d_evaluation_pre_alphabet); 
                                                        localStorage.setItem('lesson_d_evaluation_pre_alphabet', JSON.stringify(lesson_d_evaluation_pre_alphabet));
                                                        
                                                        lettres_apprises = lettresApprises();
                                                        localStorage.setItem('lettres_apprises', JSON.stringify(lettres_apprises));

                                                        function lettresApprises() {
                                                            if(lesson_d_evaluation_pre_alphabet.length != 0) {
                                                                let la = [];
                                                                for(let i=0; i<lesson_d_evaluation_pre_alphabet.length; i++) {
                                                                    la.push(lesson_d_evaluation_pre_alphabet[i][0]);
                                                                }
                                                                return la
                                                            }
                                                        }
                                                    }
                                                    if(lesson_d_evaluation_pre_alphabet.length === 27) {
                                                                                                                
                                                        lesson_d_evaluation_pre_alphabet = pre_evaluation_alphabet_partiel;
                                                        localStorage.setItem('lesson_d_evaluation_pre_alphabet', JSON.stringify(lesson_d_evaluation_pre_alphabet));
                
                                                        if(pourcentagePoint(lesson_d_apprentissage_pre_alphabet) === 100) {
                                                        if(pourcentagePoint(lesson_d_exercice_pre_alphabet) === 100) {
                                                        if(pourcentagePoint(lesson_d_evaluation_pre_alphabet) >= 92) {
                                                            
                                                            sendLessonDataToDB('alphabet_apprentissage',lesson_d_apprentissage_pre_alphabet);
                                                            sendLessonDataToDB('alphabet_exercice',lesson_d_exercice_pre_alphabet);
                                                            sendLessonDataToDB('alphabet_evaluation',lesson_d_evaluation_pre_alphabet);
                    
                                                            let date = dateAcuelle();
                                                            let niveau = niveau_en_cours;
                                                            
                                                            let note_finale_d_apprentissage_pre_alphabet = calculerNote(lesson_d_apprentissage_pre_alphabet);
                                                            let note_finale_d_exercice_pre_alphabet = calculerNote(lesson_d_exercice_pre_alphabet);
                                                            let note_finale_d_evaluation_pre_alphabet = calculerNote(lesson_d_evaluation_pre_alphabet);

                                                            pourcentage_general = Math.floor([pourcentagePoint(lesson_d_apprentissage_pre_alphabet) + pourcentagePoint(lesson_d_exercice_pre_alphabet) + pourcentagePoint(lesson_d_evaluation_pre_alphabet)]/3);
            
                                                            niveaux_etudies.push(niveau_en_cours);
                                                            phases_etudiees = ["alphabet_apprentissage", "alphabet_exercice", "alphabet_evaluation"];
                                                            niveau_max++; 
                                                            niveau_en_cours++; 
                                                            
                                                            sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees));
                                                            sessionStorage.setItem('niveau_max', JSON.stringify(niveau_max));
                                                            sessionStorage.setItem('niveau_en_cours', JSON.stringify(niveau_en_cours));
                                                            sessionStorage.setItem('niveaux_etudies', JSON.stringify(niveaux_etudies));
            
                                                            console.log('Lesson de pre_apprentissage envoyée à la base de donnée.');
                                                            console.log('Lesson de pre_exercice envoyée à la base de donnée.');
                                                            console.log('Lesson de pre_evaluation envoyée à la base de donnée.');

                                                            sessionStorage.setItem('lesson_d_apprentissage_pre_alphabet', JSON.stringify(lesson_d_apprentissage_pre_alphabet));
                                                            sessionStorage.setItem('lesson_d_exercice_pre_alphabet', JSON.stringify(lesson_d_exercice_pre_alphabet));
                                                            sessionStorage.setItem('lesson_d_evaluation_pre_alphabet', JSON.stringify(lesson_d_evaluation_pre_alphabet));

                                                            data_apprentissage_alphabet = {"date":date, "niveau":niveau, "phase":"alphabet_apprentissage", "lesson":lesson_d_apprentissage_pre_alphabet, "note":note_finale_d_apprentissage_pre_alphabet};
                                                            data_exercice_alphabet = {"date":date, "niveau":niveau, "phase":"alphabet_exercice", "lesson":lesson_d_exercice_pre_alphabet, "note":note_finale_d_exercice_pre_alphabet};
                                                            data_evaluation_alphabet = {"date":date, "niveau":niveau, "phase":"alphabet_evaluation", "lesson":lesson_d_evaluation_pre_alphabet, "note":note_finale_d_evaluation_pre_alphabet};
                                                            
                                                            sessionStorage.setItem('data_apprentissage', JSON.stringify(data_apprentissage_alphabet));
                                                            sessionStorage.setItem('data_exercice', JSON.stringify(data_exercice_alphabet));
                                                            sessionStorage.setItem('data_evaluation', JSON.stringify(data_evaluation_alphabet));

                                                            console.log("La leçon entière pre_alphabet fait :");
                                                            console.log([data_apprentissage_alphabet,data_exercice_alphabet,data_evaluation_alphabet]);
                
                                                            setTimeout(() => {
                                                                localStorage.removeItem('lesson_d_apprentissage_pre_alphabet');
                                                                localStorage.removeItem('lesson_d_exercice_pre_alphabet');
                                                                localStorage.removeItem('lesson_d_evaluation_pre_alphabet');
                                                            }, 86400000);
                                                        }}}
                                                    }
                                                }
                                            }
                                            function notificationDeFinDEvaluationPreAlphabet() {
                                                viderNotification();
                                                setTimeout(() => { 
                                                    if(note_d_evaluation_pre_alphabet < 92) {
                                                        let notification = liste_de_matieres[1][1]+" ߞߘߐߓߐߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                                        ecris('revision_notification_corps', notification);
                                                    }
                                                    if(note_d_evaluation_pre_alphabet >= 92) {
                                                        let notification_1 = liste_de_matieres[1][1]+" ߞߘߐߓߐߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߦߙߐ. \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .";
                                                        let notification_2 = liste_de_matieres[1][1]+" ߞߘߐߓߐߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߜߋ߲߭ ߘߋ߰ߟߌ ߘߊߡߌ߬ߘߊ߬. \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .";
                                                        
                                                        if(lesson_d_evaluation_pre_alphabet.length < 27) {
                                                            ecris('revision_notification_corps', notification_1);
                                                        }
                                                        if(lesson_d_evaluation_pre_alphabet.length === 27) {
                                                            ecris('revision_notification_corps', notification_2);
                                                            console.log("Fin de la leçon d'alphabet");
                                                        }
                                                    }

                                                //Initialisation du nombre de mauvaise reponse
                                                    nbr_mauvaise_reponse = 0;
                                                }, 600); 
                                            }
                                            function resultatGeneralDAlphabet() {

                                                console.log("Resultat général pre_alphabet");     

                                                if(data_apprentissage_alphabet.lesson != undefined) {
                                                if(data_exercice_alphabet.lesson != undefined) {
                                                if(data_evaluation_alphabet.lesson != undefined) {

                                                    let note_d_apprentissage = pourcentagePoint(lesson_d_apprentissage_pre_alphabet);
                                                    let note_d_evaluation = pourcentagePoint(lesson_d_evaluation_pre_alphabet);

                                                    let point_d_apprentissage = calculerPoint(data_apprentissage_alphabet.lesson);
                                                    let point_d_exercice = calculerPoint(data_exercice_alphabet.lesson);
                                                    let point_d_evaluation = calculerPoint(data_evaluation_alphabet.lesson);

                                                    if(note_d_apprentissage === 100) {
                                                    if(note_d_exercice_pre_alphabet === 100) {
                                                    if(note_d_evaluation >= 92) {
                                                            
                                                        $('#revision_body_cadre').append('\
                                                            <div id="resume_de_alphabet_resultat">\
                                                                <p>ߛߓߍߛߎ߲ ߘߋ߰ߟߌ ߢߊ߬ߣߍ߲߬ %/'+parseIntNko(pourcentage_general)+' ߟߊ߫.</p>\
                                                                <h3>ߒߞߏ ߛߓߍߛߎ߲ ߘߋ߰ߟߌ ߞߐߝߟߌ ߟߊߛߎ߬ߘߎ߲߬ߧߊ߬ߣߍ߲ ߝߟߍ߫ ߕߊ߲߬</h3>\
                                                                <div id="resultat_table_container">\
                                                                    <table id="resultat_table">\
                                                                        <tr>\
                                                                            <th>ߝߐߘߊ</th>\
                                                                            <th>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</th>\
                                                                            <th>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߢߊ߬ߣߍ߲</th>\
                                                                            <th>ߓߍ߬ߙߍ</th>\
                                                                        </tr>\
                                                                        <tr>\
                                                                            <td>ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ</td>\
                                                                            <td>'+parseIntNko(data_apprentissage_alphabet.lesson.length)+'</td>\
                                                                            <td>'+parseIntNko(point_d_apprentissage)+'</td>\
                                                                            <td>'+parseIntNko(note_d_apprentissage)+'</td>\
                                                                        </tr>\
                                                                        <tr>\
                                                                            <td>ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ</td>\
                                                                            <td>'+parseIntNko(data_exercice_alphabet.lesson.length)+'</td>\
                                                                            <td>'+parseIntNko(point_d_exercice)+'</td>\
                                                                            <td>'+parseIntNko(note_d_exercice_pre_alphabet)+'</td>\
                                                                        </tr>\
                                                                        <tr>\
                                                                            <td>ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ</td>\
                                                                            <td>'+parseIntNko(data_evaluation_alphabet.lesson.length)+'</td>\
                                                                            <td>'+parseIntNko(point_d_evaluation)+'</td>\
                                                                            <td>'+parseIntNko(note_d_evaluation)+'</td>\
                                                                        </tr>\
                                                                    </table>\
                                                                </div> \
                                                                    \
                                                                <div id="resultat_btn_container">\
                                                                    <p>ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߜߋ߲߭ ߘߋ߰ߟߌ ߘߊߡߌ߬ߘߊ߬</p>\
                                                                    <p>ߣߴߌ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߝߛߍ߬ߝߛߍ߬ߟߌ ߞߍ߫ ߌ ߟߊ߫ ߛߓߍߛߎ߲ ߘߋ߰ߟߌ ߞߐߝߟߌ ߞߊ߲߬߸ ߞߘߎ߬ ߓߊ߯ߡߊ ߢߌ߲߬ ߘߌ߲߯. <span id="afficheur_de_resultat">ߒߞߏ ߛߓߍߛߎ߲ ߘߋ߰ߟߌ ߞߐߝߟߌ ߕߐ߬ߝߍ߬ߦߊ߬ߣߍ߲</span></p>\
                                                                </div> \
                                                            </div> \
                                                        ');

                                                        $('#resultat_table_container').css({
                                                            'background-color':'#fff',
                                                            'padding':'0.5rem'
                                                        });
                                                        $('#resultat_table td').css({
                                                            'border':'1px solid #aaa', 
                                                            'padding':'0.5rem'
                                                        });
                                                        $('#resultat_btn_container').css({'height':0, 'transition':'0.25s'});

                                                        masquer($('#resultat_table_container, #resultat_btn_container'));
                                                        setTimeout(() => { $('.course_body, .course_foot').css('display','none'); }, 600);
                                                        setTimeout(() => { afficher($('#resultat_table_container, #resultat_btn_container')); }, 800);
                                                        setTimeout(() => { $('#resultat_btn_container').css({'height':'max-content'}); }, 2000);

                                                        $('#afficheur_de_resultat').click(function() {
                                                            resultatDeLaMatiere([data_apprentissage_alphabet, data_exercice_alphabet, data_evaluation_alphabet],"ߛߓߍߛߎ߲");
                                                        });
                                                    }}}
                                                }}}
                                            }
                                        }
                                    }
                                } 
                            });
                        }
                    }
                });
            }
            function afficherRepetitionBtn() {
                masquer($('#exercice_dialogue_btns > div'));
                rendreActif($('#exercice_repetition_btn'));
                afficherRapidement($('#exercice_repetition_btn')); 
            }
        }
        function alphabetNko() {

            let lesson_d_apprentissage_alphabet = "";
            let phase_li_id = JSON.parse(sessionStorage.getItem('phase_li_id'));
            let nbr_raisonnable_de_click = 1;
            let clicked_elements_quantity = 0;
            let note_d_apprentissage_alphabet = 0;
            let note_d_exercice_alphabet = 0;

            initialiserProgressBar();
            switch(phase_li_id) {
                case 'alphabet_apprentissage' : apprentissageAlphabet(); break;
                case 'alphabet_exercice'      : exerciceAlphabet();      break;
                case 'alphabet_evaluation'    : evaluationAlphabet();    break;
            }


            function apprentissageAlphabet() {
                $('#alphabet_apprentissage').click(() => { 
                    
                    let phase_id = "alphabet_apprentissage";
                    sessionStorage.setItem("phase_id", JSON.stringify(phase_id));
                    let niveau_d_apprentissage_alphabet_du_serveur = 1, phase_d_apprentissage_alphabet_du_serveur = phase_li_id, lesson_d_apprentissage_alphabet_du_serveur = [], note_d_apprentissage_alphabet_du_serveur = 0;
                    
                    lesson_d_apprentissage_alphabet_du_serveur = lessonDApprentissagePreAlphabet();

                    if(datas.length != 0) {
                        date_d_apprentissage_alphabet_du_serveur = (datas[0][0] == undefined) ? dateAcuelle() : datas[0][0].date;
                        niveau_d_apprentissage_alphabet_du_serveur = (datas[0][0] == undefined) ? 1 : datas[0][0].niveau;
                        phase_d_apprentissage_alphabet_du_serveur = (datas[0][0] == undefined) ? phase_li_id : datas[0][0].phase;
                        lesson_d_apprentissage_alphabet_du_serveur = (datas[0][0] == undefined) ? [] : JSON.parse(datas[0][0].lesson);
                        note_d_apprentissage_alphabet_du_serveur = (datas[0][0] == undefined) ? 0 : datas[0][0].note;

                        apprentissage_alphabet_stocker_au_serveur = {"date":date_d_apprentissage_alphabet_du_serveur, "niveau":niveau_d_apprentissage_alphabet_du_serveur, "phase":phase_d_apprentissage_alphabet_du_serveur, "lesson":lesson_d_apprentissage_alphabet_du_serveur, "note":note_d_apprentissage_alphabet_du_serveur}
                    }

                    if(lesson_d_apprentissage_alphabet_du_serveur.length != 0) {
                        console.log("La leçon d'apprentissage alphabet est déjà faite.");
                        return;
                    }
        
                    lesson_d_apprentissage_alphabet = JSON.parse(sessionStorage.getItem('lesson_d_apprentissage_alphabet'));
                    let data_apprentissage_alphabet = JSON.parse(sessionStorage.getItem('data_apprentissage_alphabet'));
                    let phases_etudiees_du_serveur = phasesEtudieesDuServeur();

                    phases_etudiees = JSON.parse(sessionStorage.getItem('phases_etudiees'));
                    phases_etudiees = (phases_etudiees == null) ? [] : phases_etudiees;
                    phases_etudiees = (phases_etudiees_du_serveur.length === 0) ? phases_etudiees : phases_etudiees_du_serveur;

                    lesson_d_apprentissage_alphabet = (lesson_d_apprentissage_alphabet == null) ? [] : lesson_d_apprentissage_alphabet;
                    lesson_d_apprentissage_alphabet = (lesson_d_apprentissage_alphabet_du_serveur.length === 0) ? lesson_d_apprentissage_alphabet : lesson_d_apprentissage_alphabet_du_serveur;
        
                    if(lesson_d_apprentissage_alphabet.length === 0) { note_d_apprentissage_alphabet = 0; }
                        
                        
                    initialiserProgressBar();
                    chargerApprentissageAlphabet();
                    afficherApprentissageAlphabet();
                    apprendreAlphabetNko();
                    raffraichissementDeLaPage();
                    fermerLaPage()
                    
                    function chargerApprentissageAlphabet() {
                        
                        chargerEnteteDeApprentissageAlphabet();
                        chargerPiedDeApprentissageAlphabet();
                        chargerCorpsDeApprentissageAlphabet();


                        function chargerEnteteDeApprentissageAlphabet() {

                            $('.notification_titre').text(liste_de_matieres[0][1]+' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');

                            viderNotification();
                            setTimeout(() => {
                                if(note_d_apprentissage_alphabet === 0) {
                                    viderNotification();
                                    ecris('apprentissage_notification_corps','\
                                        ߛߓߍߘߋ߲ ߠߎ߬ ߓߍ߯ ߘߌ߲߯ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߊ߬ ߣߴߌ ߦߴߌ ߖߊ߲߬ߕߏ߬ ߊ߬ߟߎ߬ ߝߐߢߊ ߘߐ߫ ߞߏߛߓߍ߫߹<br>\
                                        ߌ ߣߊ߬ߕߐ߫ ߟߋ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ ߟߴߊ߬ߟߎ߬ ߓߍ߯ ߡߊ߬.\
                                    ');
                                }  
                        
                                if(note_d_apprentissage_alphabet != 0) {
                                    if(datas.length === 0) {
                                    if(data_apprentissage_alphabet != null) {
                                        viderNotification();
                                        setTimeout(() => {
                                            ecris('apprentissage_notification_corps','\
                                                ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߘߋ߲߰ߣߍ߲߬ ߞߘߐ ߟߴߌ ߓߟߏ߫ ߞߊ߬ߓߌ߫ '+dateEnNko(data_apprentissage_alphabet.date)+'߸ ߏ߬ߘߐ߬ ߌ ߘߌ߫ ߛߴߊ߬ ߡߊߛߍ߬ߦߌ߬ ߟߊ߫߸ ߞߐ߬ߣߌ߲߬ ߊ߬ ߕߍ߫ ߖߊ߰ߕߋ߬ ߟߊ߫.<br>\
                                            ');
                                        }, 400);
                                    }}
                                    if(datas.length != 0) {
                                    if(data_apprentissage_alphabet == null) {
                                        viderNotification();
                                        setTimeout(() => {
                                            ecris('apprentissage_notification_corps','\
                                            ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߘߋ߲߰ߣߍ߲߬ ߞߘߐ ߟߴߌ ߓߟߏ߫ ߞߊ߬ߓߌ߫ '+dateEnNko1(date_d_apprentissage_alphabet_du_serveur)+'߸ ߏ߬ߘߐ߬ ߌ ߘߌ߫ ߛߴߊ߬ ߡߊߛߍ߬ߦߌ߬ ߟߊ߫߸ ߞߐ߬ߣߌ߲߬ ߊ߬ ߕߍ߫ ߖߊ߰ߕߋ߬ ߟߊ߫.<br>\
                                            ');
                                        }, 400);
                                    }}
                                }
                            }, 3000);
                        }
                        function chargerPiedDeApprentissageAlphabet() {
                            $("#apprentissage_dialogue_btns").html("<p>ߒ ߓߘߊ߫ ߛߓߍߛߎ߲ ߟߐ߲߫</p>");
                        }
                        function chargerCorpsDeApprentissageAlphabet() { 
                            parametrageDeLesson();
                            cocherTousLesCaracteres();
                            $(".parametres_popup #submit_btn").click(); 
                        }
                    }
                    function afficherApprentissageAlphabet() { 
                        masquer($(".direction"));
                        afficher($(".salle_de_classe"));

                        masquer($(".course > div"));
                        afficher($('#apprentissage_container'));
                
                        masquer($('#apprentissage_redirection_btns'));
                        setTimeout(() => { affichageAnimeDeTableTd($('#apprentissage_body table')); }, 100);
                    }
                    function apprendreAlphabetNko() {
                            
                        let table_id = $('.table_parlante').attr('id');          
                        let table = $('#'+table_id); 
                        let tr = $('#'+table_id+' tr');
                        let td = $('#'+table_id+' td');
                        let nbr_table = table.length;
                        let nbr_tr = tr.length;
                        let nbr_td = td.length;

                        let nbr_td_par_table = Math.ceil(nbr_td/nbr_table);
                        let nbr_td_par_tr = Math.ceil(nbr_td/nbr_tr);
               
                        let td_click_length = nbr_raisonnable_de_click*nbr_td;
                        let barr_unity = 100/td_click_length;
                        let elements_clickes = [];
                        let click_counter = 0;


                        lecturePersonnalisee('alphabet');    // Voir fonctions.js

                        if(lesson_d_apprentissage_alphabet.length != 0) {
                            $.each(td, function(){ $(this).css({'background-color':'rgba(85,85,85,1)', 'color':'white'}); });
                        }

                        if(lesson_d_apprentissage_alphabet.length === 0) {
                        
                            let lettres_cliques = [];
                            let stocker_apprentissage_status = 'non_stocker';
                            initialiserLessonDApprentissageAlphabet();

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
                                var table_courante = td_actif.parent().parent().parent();
                                var tr_index       = td_actif.parent().index();
                                var table_index    = table.index(table_courante);
                                var element_index  = table_index*nbr_td_par_table + tr_index*nbr_td_par_tr + td_actif.index();
                                var element_click_counter = 0;

                                td_actif.css({'background-color':'rgba(85,85,85,1)', 'color':'yellow'});

                                td_actif.on('click', function() {

                                    let clicked_td = $(this);
                                    let lettre = clicked_td.text();
                                    td_counter++;

                                    if(lettres_cliques.indexOf(lettre) == -1) lettres_cliques.push(lettre);
                                   
                                    styleDeApprentissageTd();
                                    enregistrerApprentissageAlphabet();
                                    progressBarrApprentissageAlphabet();
                                    finDApprentissageAlphabet();
                                    
                                    function styleDeApprentissageTd() {
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
                                        lesson_d_apprentissage_alphabet.splice(element_index,1,new_click_value);
                                        clicked_elements_quantity = clickedElementsQuantity();

                                        function clickedElementsQuantity() {
                                            var qtity = [];
                                            $.each(lesson_d_apprentissage_alphabet, function(){ if($(this)[2]==1){ qtity++; }});
                                            return qtity;
                                        }
                                    }
                                    function progressBarrApprentissageAlphabet() {
                                        if(td_counter <= nbr_raisonnable_de_click) {
                                            click_counter++;
                                            $('.progress_bonne_reponse_bar').css('width',click_counter*barr_unity+'%');
                                        }
                                    } 
                                    function finDApprentissageAlphabet() {
                                        if(stocker_apprentissage_status == 'non_stocker') {

                                            if(clicked_elements_quantity >= lesson_d_apprentissage_alphabet.length) {
                                                $('#apprentissage_dialogue_btns').css("background-color","yellow");
                                            } 

                                            $('#apprentissage_dialogue_btns').click((e) => {
                                                e.stopImmediatePropagation();
                        alert('apprentissage_dialogue_btns clické');
                                                if(lettres_cliques.length === 27) {
                                                    
                                                    note_d_apprentissage_alphabet = calculerNote(lesson_d_apprentissage_alphabet);
                                                    
                                                    viderNotification();
                                                    stockerApprentissageAlphabet();
                                                    notificationDeFinDApprentissageAlphabet();
                                                    afficherAlphabetExerciceBouton();
                                                    transitionVersExerciceAlphabet();


                                                    function stockerApprentissageAlphabet() {

                                                        let date_d_apprentissage = dateAcuelle();
                                                        let niveau_d_apprentissage = niveau_en_cours;
                                                        let phase_d_apprentissage = phase_li_id;
                                                        let moyenne_d_apprentissage = 100; 

                                                        if(note_d_apprentissage_alphabet <  moyenne_d_apprentissage) alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
                                                        if(note_d_apprentissage_alphabet >= moyenne_d_apprentissage) {
                                                        
                                                            sendLessonDataToDB('alphabet_apprentissage',lesson_d_apprentissage_alphabet);

                                                            phases_etudiees.push(phase_d_apprentissage);     
                                                            data_apprentissage_alphabet = {"date":date_d_apprentissage, "niveau":niveau_d_apprentissage, "phase":phase_d_apprentissage, "lesson":lesson_d_apprentissage_alphabet, "note":note_d_apprentissage_alphabet};

                                                            sessionStorage.setItem('lesson_d_apprentissage_alphabet', JSON.stringify(lesson_d_apprentissage_alphabet));
                                                            sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees));
                                                            sessionStorage.setItem('data_apprentissage_alphabet', JSON.stringify(data_apprentissage_alphabet));
                                                            sessionStorage.setItem('data_apprentissage', JSON.stringify(data_apprentissage_alphabet));

                                                            stocker_apprentissage_status = 'stocker';

                                                            console.log('Les données d\'apprentissage sont envoyées à la base de données');
                                                            console.log("Les phases étudiées sont : "+phases_etudiees); 
                                                        }
                                                    }
                                                    function notificationDeFinDApprentissageAlphabet() {
                                                        
                                                        viderNotification();
                                                        setTimeout(() => {
                                                            ecris('apprentissage_notification_corps','\
                                                                ߌ ߞߎߟߎ߲ߖߋ߫ ߘߐ߬ߖߊ ߟߊ߫ ߛߓߍߘߋ߲ ߠߎ߫ ߘߋ߲߱ ߠߊ߫<br>\
                                                                ߣߴߌ ߓߘߴߊ߬ߟߎ߬ ߟߐ߲߫߸ ߓߐߟߌ߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫ ߛߊ߲ߝߍ߬ ߣߎߡߊ߲߫ ߓߟߏ ߟߊ߫)<br>\
                                                                ߣߴߌ ߘߏ߲߬ ߡߊ߫ ߓߊ߲߫ ߊ߬ߟߎ߬ ߟߐ߲߫ ߠߊ߫߸ ߒ߬ߓߊ߬ ߥߊ߫ ߘߋ߲߰ߠߌ ߡߊ߫ ߤߊ߲߯ ߌ ߦߴߊ߬ߟߎ߬ ߟߐ߲߫ ߞߊ߬ ߣߊ߬ߕߏ߫ ߓߐ߫ ߟߊ߫.\
                                                            ');
                                                        }, 400);

                                                        setTimeout(() => { indexer($('#fermer_apprentissage')); }, 2000);
                                                    }
                                                    function transitionVersExerciceAlphabet() {
                                                        let index_phase_active = $('.phases_container ul .active').index();

                                                        if(note_d_apprentissage_alphabet < 100) 
                                                        {console.log('La note d\'apprentissage est inférieure à 100. Cela bloque la transition vers Exercice Alphabet');}else
                                                        {console.log('La note d\'apprentissage est égale à 100. Félicitation, la transition vers Exercice Alphabet doit se passer avec succès! Cliquer sur la phase active "alphabet_exercice -> ߡߊ߬ߞߟߏ߬ߟߌ"');}

                                                        if(note_d_apprentissage_alphabet == 100) {
                                                            $('#continu_sur_exercice_bouton').click(() => { raffraichirLaPage(); });
                                                            changerPhaseActive(index_phase_active);
                                                        }
                                                    }
                                                }else{
                                                    alert("ߛߓߍߘߋ߲ ߠߎ߬ ߓߍ߯ ߡߊ߫ ߘߋ߲߰ ߌ ߓߟߏ߫.");
                                                }
                                            });
                                        }
                                    } 
                                }); 
                            });
                        
                            function initialiserLessonDApprentissageAlphabet() {
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
                    
                                $('.progress_bar').css("display","block");

                                $.each(tr, function(){  
                                    let tr_index = $(this).index();
                                    $.each($('td', this), function(){  
                    
                                        let td_index = tr_index*7 + $(this).index();
                                        let td_content = $(this).text();
                    
                                        lesson_d_apprentissage_alphabet[td_index] = [td_content,0,0];
                                    });  
                                });
                            }
                        }
                    }
                });
            }    
            function exerciceAlphabet() {
                $('#alphabet_exercice').click(() => {

                    console.log("Début d'Exercice d'alphabet");

                    let phase_id = "alphabet_exercice";
                    sessionStorage.setItem("phase_id", JSON.stringify(phase_id));
                    let exercice_alphabet_stocker_au_serveur = {};
                    let date_d_exercice_alphabet_du_serveur = '', niveau_d_exercice_alphabet_du_serveur = 1, phase_d_exercice_alphabet_du_serveur = phase_li_id, lesson_d_exercice_alphabet_du_serveur = [], note_d_exercice_alphabet_du_serveur = 0;
                    
                    lesson_d_exercice_alphabet_du_serveur = lessonDExercicePreAlphabet();
                    
                    if(datas.length != 0) {
                        date_d_exercice_alphabet_du_serveur = (datas[0][1] == undefined) ? dateAcuelle() : datas[0][1].date;
                        niveau_d_exercice_alphabet_du_serveur = (datas[0][1] == undefined) ? 1 : datas[0][1].niveau;
                        phase_d_exercice_alphabet_du_serveur = (datas[0][1] == undefined) ? phase_li_id : datas[0][1].phase;
                        lesson_d_exercice_alphabet_du_serveur = (datas[0][1] == undefined) ? [] : JSON.parse(datas[0][1].lesson);
                        note_d_exercice_alphabet_du_serveur = (datas[0][1] == undefined) ? 0 : datas[0][1].note;

                        exercice_alphabet_stocker_au_serveur = {"date":date_d_exercice_alphabet_du_serveur, "niveau":niveau_d_exercice_alphabet_du_serveur, "phase":phase_d_exercice_alphabet_du_serveur, "lesson":lesson_d_exercice_alphabet_du_serveur, "note":note_d_exercice_alphabet_du_serveur}
                    }

                    if(lesson_d_exercice_alphabet_du_serveur.length != 0) {
                        console.log("La leçon d'exercice alphabet est déjà faite.");
                        return;
                    }

                    let lesson_d_exercice_alphabet = JSON.parse(sessionStorage.getItem('lesson_d_exercice_alphabet'));
                    lesson_d_exercice_alphabet = (lesson_d_exercice_alphabet == null) ? [] : lesson_d_exercice_alphabet;
                    lesson_d_exercice_alphabet = (lesson_d_exercice_alphabet_du_serveur.length == 0) ? lesson_d_exercice_alphabet : lesson_d_exercice_alphabet_du_serveur;

                    let data_exercice_alphabet = JSON.parse(sessionStorage.getItem('data_exercice_alphabet'));
                    let phases_etudiees_du_serveur = phasesEtudieesDuServeur();

                    phases_etudiees = JSON.parse(sessionStorage.getItem('phases_etudiees'));
                    phases_etudiees = (phases_etudiees == null) ? [] : phases_etudiees;
                    phases_etudiees = (phases_etudiees_du_serveur.length === 0) ? phases_etudiees : phases_etudiees_du_serveur;

                    console.log('Phases déjà étudiées sont ci-dessous');
                    console.log(phases_etudiees);

                     if(lesson_d_exercice_alphabet.length != 0) { 
                        console.log("La leçon d'exercice alphabet n'est pas vide, ce qui veut dire que cette leçon est déjà faite. Voir ci-dessous");
                        console.log(lesson_d_exercice_alphabet);
                        apprentissageAlphabet();
                        fermerLaPage(); 
                    }

                    if(lesson_d_exercice_alphabet.length === 0) {
                        
                        let exercice_questions = [];
                        let moyenne_d_exercice = 95;
                        let exercice_question = '', exercice_reponse = ''; 
                        let compteur_d_exercice_question = 1;

                        $('.fermeture').attr('id', 'fermer_exercice');
                        $('.fermeture').click(function() { raffraichirLaPage(); });
                        
                        chargerExerciceAlphabet();
                        afficherExercice();
                        exercerAlphabetNko();
                        fermerLaPage(); 
                
                
                        function chargerExerciceAlphabet() {

                            chargerEnteteDeExerciceAlphabet();
                            chargerCorpsDeExerciceAlphabet();
                            chargerPiedDeExerciceAlphabet();
                            
                            function reductionDesElementsDeExerciceCouranteA49() {
                            
                                if($('#table_alphabet_exercice').length >= 6) {
                                    for( var i = $('#table_alphabet_exercice').length-1; i > 6; i--) { document.querySelector('#table_alphabet_exercice').deleteRow(i); }
                                    $.each($('#table_alphabet_exercice tr td'), function() { exercice_questions.push($(this).html()); });
                                }
                                if($('#table_alphabet_exercice').length < 6) {
                                    $.each($('#table_alphabet_exercice tr td'), function() {  exercice_questions.push($(this).html()); });
                                }            
                                
                                exercice_questions = malaxer(exercice_questions);
                            }
                            function chargerEnteteDeExerciceAlphabet() {
                                $('.notification_titre').html('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
                                viderNotification();
                                setTimeout(() => {
                                    ecrire('notification_corps','\
                                        ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫.\n ߦߋ߫ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߣߌ߫ ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߣߌ߫ ߛߊߞߍߟߌ ߟߎ߬ ߞߍ߫ ߦߊ߲߬߸ ߤߊ߲߯ ߞߐߝߟߌ߫ ߥߟߊ ߦߋ߫ ߓߐ߫.\
                                    ');
                                }, 3000);
                            }
                            function chargerCorpsDeExerciceAlphabet() { 
                                parametrageDeLesson();
                                cocherTousLesCaracteres();
                                $(".parametres_popup #submit_btn").click(); 
                                reductionDesElementsDeExerciceCouranteA49(); // Réduction du nombre de questions à une quantité raisonable
                            }
                            function chargerPiedDeExerciceAlphabet() {
                                $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(exercice_questions.length)+' \\ ߁߭ ߟߊߡߍ߲߫');
                                $('#exercice_repetition_btn').html('<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߊߡߍ߲߫ ߕߎ߲߯</p>');
                                $('#exercice_correction_btn').html('<p>ߏ߬ ߛߊߞߍ߫</p>');
                            }
                        }
                        function exercerAlphabetNko() {

                            let date_d_exercice = dateAcuelle();
                            let niveau_d_exercice = niveau_en_cours; 
                            let phase_d_exercice = phase_li_id;

                            exercice_questions = malaxer(exercice_questions);

                            initialiserExerciceAlphabet();
                            affichageParDefautDeExerciceDialogueBtns();
                            poserExerciceAlphabetQuestion();
                            repeterExerciceAlphabetQuestion();
                            repondreExerciceAlphabetQuestion();
                            corrigerExerciceAlphabetQuestion();

                            
                            function initialiserExerciceAlphabet() {
                                for(var i=0;i<exercice_questions.length;i++) {
                                    var q = exercice_questions[i], r = '', p = 0;
                                    lesson_d_exercice_alphabet[i] = [q,r,p];
                                }
                                data_exercice_alphabet = {"date":date_d_exercice, "niveau":niveau_d_exercice, "phase":phase_d_exercice, "lesson":lesson_d_exercice_alphabet, "note":note_d_exercice_alphabet};
                            }
                            function affichageParDefautDeExerciceDialogueBtns() {
                                masquer($("#exercice_dialogue_btns > div"));
                                rendreActif($('#exercice_question_btn'));
                                afficherRapidement($('#exercice_repetition_btn'));
                            }
                            function poserExerciceAlphabetQuestion(){
                                $('#exercice_question_btn').on('click',function() {

                                    let repeter_btn_html = (compteur_d_exercice_question === 1) ? 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߁߭ ߟߊߡߍ߲߫ ߕߎ߲߯' : '߬ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(compteur_d_exercice_question)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯';

                                    $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_exercice_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                                    $('#exercice_repetition_btn').html(repeter_btn_html);

                                    masquer($('#exercice_dialogue_btns > div'));
                                    rendreActif($('#exercice_repetition_btn'));
                                    afficherRapidement($('#exercice_repetition_btn'));
                                    
                                    exercice_question = exercice_questions[compteur_d_exercice_question - 1];

                                    actualiserExerciceQuestionBtn();
                                    lireExerciceQuestion();
                                    montrerReponse(exercice_question,$("#exercice_body td"));

                                    compteur_d_exercice_question++;
                                    
                                    function lireExerciceQuestion() { lire('alphabet',exercice_question); }
                                    function actualiserExerciceQuestionBtn(){ 
                                        let repeter_btn_html = (compteur_d_exercice_question === 1) ? 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߁߭ ߟߊߡߍ߲߫ ߕߎ߲߯' : 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ '+parseIntNko(compteur_d_exercice_question)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯';
                                        // compteur_d_exercice_question = (compteur_d_exercice_question === exercice_questions.length) ? 'ߟߊߓߊ߲' : compteur_d_exercice_question;
                                        $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(exercice_questions.length)+' \\ '+parseIntNko(compteur_d_exercice_question + 1)+'߲ ߠߊߡߍ߲߫');
                                        $('#exercice_repetition_btn').html(repeter_btn_html);
                                    }
                                });
                            }
                            function repeterExerciceAlphabetQuestion(){ 
                                $('#exercice_repetition_btn').on('click', function() { 
                                    lire('alphabet',exercice_question); 
                                    masquer($('#exercice_dialogue_btns > div'));
                                    afficherRapidement($('#exercice_repetition_btn'));
                                    rendreActif($('#exercice_repetition_btn'));
                                    
                                    montrerReponse(exercice_question,$("#exercice_body td"));
                                }); 
                            }
                            function repondreExerciceAlphabetQuestion(){
                                $.each($('#table_alphabet_exercice td'), function() {
                                
                                    let td = $(this);   
                                    td.click(function() {

                                        $('#table_alphabet_exercice td').css('background-color','rgba(85,85,85,0.25)');
                                        if(exercice_question == "") {secouer($('#exercice_question_btn')); return;}
                                        element_actif = $(this);

                                        masquer($('#exercice_dialogue_btns > div'));
                                        afficherRapidement($('#exercice_correction_btn'));
                                        rendreActif($('#exercice_correction_btn'));

                                        exercice_reponse = element_actif.text();
                                        $(element_actif).css('background-color','#aaa');
                                    });
                                    
                                });
                            }
                            function corrigerExerciceAlphabetQuestion() {
                                
                                let exercice_counter = 0;
                                let good_response_counter = 0;
                                let progress_unity = 100/exercice_questions.length;

                                $('#exercice_correction_btn').click(function() {
                                    if(exercice_question != '') {
                                        
                                        masquer($('#exercice_dialogue_btns > div'));
                                        rendreActif($('#exercice_question_btn'));
                                        afficherRapidement($('#exercice_question_btn'));
                
                                        if(compteur_d_exercice_question-1 < exercice_questions.length) { rendreActif($('#exercice_question_btn')); }
                                        if(compteur_d_exercice_question-1 === exercice_questions.length) { $('#exercice_question_btn').removeClass('actif').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').off('click'); }

                                        marquerReponseDExerciceAlphabet();
                                        enregistrerExerciceAlphabet();
                                        progressBarrExerciceAlphabet();
                                        finDExerciceAlphabet();


                                        function marquerReponseDExerciceAlphabet() {
                                            
                                            let bonne_reponse = "";
                                            let mauvaise_reponse = "";

                                            if(exercice_question == exercice_reponse) { bonne_reponse = exercice_reponse; }
                                            if(exercice_question != exercice_reponse) { mauvaise_reponse = exercice_reponse; }

                                            point = (exercice_question == exercice_reponse) ? 1 : 0; 
                                            $.each($('#table_alphabet_exercice td'), function(){
                                                let td = $(this);
                                                if(td.text() == bonne_reponse) { valider(td); }
                                                if(td.text() == mauvaise_reponse) { barrer(td); clignotage(exercice_question); }
                                            }); 
                                            
                                            setTimeout(() => {
                                                $('#table_alphabet_exercice td').css('background-color','rgba(85,85,85,0.25)');
                                            }, 1200);
                                        }
                                        function enregistrerExerciceAlphabet() { 

                                            let point = (exercice_question == exercice_reponse) ? 1 : 0;    
                                            let question_reponse = [exercice_question,exercice_reponse,point];

                                            lesson_d_exercice_alphabet.splice(exercice_counter,1,question_reponse);
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
                                        function finDExerciceAlphabet() {  
                                            if(compteur_d_exercice_question - 1 == exercice_questions.length) {
                                                setTimeout(() => {

                                                    compteur_d_exercice_question = 1;
                                                    note_d_exercice_alphabet = calculerNote(lesson_d_exercice_alphabet);
                            
                                                    viderNotification();
                                                    resultatDeLaMatiere(data_exercice_alphabet);
                                                    notificationDeFinDExerciceAlphabet();
                                                    redirectionDExercicePreAlphabet(lesson_d_exercice_alphabet);
                                                    reprendreExerciceAlphabet();
                                                    transitionVersEvaluationAlphabet();
                                                    stockerExerciceAlphabet();
                                
                                                    function reprendreExerciceAlphabet() {
                                                        if(note_d_exercice_alphabet < moyenne_d_exercice) { 
                                                            $('#reprendre_exercice_bouton').click(function(e) {
                                                                e.stopImmediatePropagation();
                                                                
                                                                viderLeTableau(lesson_d_exercice_alphabet);
                                                                if(option_retenue == 2) {

                                                                /* Suppression d'effet des clicks précédents sur les dialogue_boutons */
                                                                    $('#exercice_question_btn').unbind('click');
                                                                    $('#exercice_repetition_btn').unbind('click');
                                                                    $('#table_alphabet_exercice td').unbind('click');
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
                                                        if(note_d_exercice_alphabet <  1) alert( "ߌ ߟߊ߫ ߓߍ߬ߙߍ߫ ߛߐ߬ߘߐ߲߬ߣߍ߲ ߡߎ߬ߡߍ ߦߋ߫ "+parseIntNko(note_d_exercice_alphabet)+" ߟߋ߬ ߘߌ߫\n ߊ߬ ߡߊ߫ "+parseIntNko(moyenne_d_exercice)+" ߖߘߍ߬ ߓߐ߫ \n\n ߏ߬ߘߐ߬ ߛߍ߬ߦߌ߬ ߦߙߐ ߢߌ߲߬ ߡߊ߫." ); 
                                                        if(note_d_exercice_alphabet >= 1) { 

                                                            sendLessonDataToDB('alphabet_exercice', lesson_d_exercice_alphabet); 
                                                            phases_etudiees.push(phase_li_id);
                                                            data_exercice_alphabet = {"date":date_d_exercice, "niveau":niveau_d_exercice, "phase":phase_d_exercice, "lesson":lesson_d_exercice_alphabet, "note":note_d_exercice_alphabet};


                                                            sessionStorage.setItem('lesson_d_exercice_alphabet', JSON.stringify(lesson_d_exercice_alphabet));
                                                            sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees));
                                                            sessionStorage.setItem('data_exercice_alphabet', JSON.stringify(data_exercice_alphabet));
                                                            sessionStorage.setItem('data_exercice', JSON.stringify(data_exercice_alphabet));

                                                            console.log("Les données de exercice_alphabet sont envoyées à la base de données");
                                                            console.log("Les phases étudiées sont : "+phases_etudiees);
                                                        }
                                                    }
                                                    function notificationDeFinDExerciceAlphabet() {
                                                        if(note_d_exercice_alphabet >= moyenne_d_exercice) {
                                                            viderNotification();
                                                            setTimeout(() => {
                                                                ecris('exercice_notification_corps','\
                                                                ߌ ߞߎߟߎ߲ߖߋ߫ ߘߐ߬ߖߊ ߟߊ߫ ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߟߐ߲ ߠߊ߫ ߤߊ߲߯ %'+parseIntNko(note_d_exercice_alphabet)+' ߟߊ߫. ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߛߓߍߛߎ߲ ߞߘߐߟߌ ߞߍ߫.\
                                                                ߞߘߐߓߐߟߌ߫ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬\
                                                                ');
                                                            }, 400);
                                                        }
                                                        if(note_d_exercice_alphabet < moyenne_d_exercice) {
                                                            viderNotification();
                                                            setTimeout(() => {
                                                                ecris('exercice_notification_corps','\
                                                                    ߌ ߖߌߖߊ߬. ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬.ߌ ߟߊ߫ ߓߍ߬ߙߍ߫ ߛߐ߬ߘߐ߲߬ߣߍ߲ ߦߋ߫ %'+parseIntNko(note_d_exercice_alphabet)+' ߟߋ߬ ߘߌ߫. ߊ߬ ߘߏ߲߬ ߡߊߞߊ߲߫ ߞߊ߬ ߖߌ߬ %'+parseIntNko(moyenne_d_exercice)+' ߞߘߐ߫. ߏ߬ߘߐ߬ ߘߌ߬ߢߍ߬ ߞߊ߬ ߛߍ߬ߦߌ߬ ߦߙߐ ߢߌ߲߬ ߡߊ߬.߫.\
                                                                ');
                                                            }, 400);
                                                        }
                                                    }
                                                    function transitionVersEvaluationAlphabet() {
                                                        if(note_d_exercice_alphabet >= moyenne_d_exercice) { 
                                                            $('#continu_sur_revision_bouton').click(() => { raffraichirLaPage();  /* setTimeout(() => { changerPhaseActive(index_phase_active); }, 1200);*/ });
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
                });
            }
            function evaluationAlphabet() {
                $('#alphabet_evaluation').click(() => {
                
                    console.log("Début d'Evaluation d'alphabet");
                    
                    let total_phase = $('.phases li').length;
                    let index_phase_active = $('#alphabet_evaluation').index();
                    let phase_id = "alphabet_evaluation";
                    sessionStorage.setItem("phase_id", JSON.stringify(phase_id));
                    let evaluation_alphabet_stocker_au_serveur = {}
                                                
                    $('#fermer_evaluation').on('click', function() { raffraichirLaPage(); });

                    let date_d_evaluation_alphabet_du_serveur = dateAcuelle(), niveau_d_evaluation_alphabet_du_serveur = 1, phase_d_evaluation_alphabet_du_serveur = '', lesson_d_evaluation_alphabet_du_serveur = [], note_d_evaluation_alphabet_du_serveur = 0;
                    
                    lesson_d_evaluation_alphabet_du_serveur = lessonDEvaluationPreAlphabet();

                    if(datas.length != 0) {

                        date_d_evaluation_alphabet_du_serveur = (datas[0][2] == undefined) ? dateAcuelle() : datas[0][2].date;
                        niveau_d_evaluation_alphabet_du_serveur = (datas[0][2] == undefined) ? 1 : datas[0][2].niveau;
                        phase_d_evaluation_alphabet_du_serveur = (datas[0][2] == undefined) ? phase_li_id : datas[0][2].phase;
                        lesson_d_evaluation_alphabet_du_serveur = (datas[0][2] == undefined) ? [] : JSON.parse(datas[0][2].lesson);
                        note_d_evaluation_alphabet_du_serveur = (datas[0][2] == undefined) ? 0 : datas[0][2].note;  

                        evaluation_alphabet_stocker_au_serveur = {"date":date_d_evaluation_alphabet_du_serveur, "niveau":niveau_d_evaluation_alphabet_du_serveur, "phase":phase_d_evaluation_alphabet_du_serveur, "lesson":lesson_d_evaluation_alphabet_du_serveur, "note":note_d_evaluation_alphabet_du_serveur}
                    } 
                    
                    if(lesson_d_evaluation_alphabet_du_serveur.length != 0) {
                        console.log("La leçon d'évaluation alphabet est déjà faite.");
                        return;
                    }

                    let lesson_d_evaluation_alphabet = JSON.parse(sessionStorage.getItem('lesson_d_evaluation_alphabet'));
                    lesson_d_evaluation_alphabet = (lesson_d_evaluation_alphabet == null) ? [] : lesson_d_evaluation_alphabet;
                    lesson_d_evaluation_alphabet = (lesson_d_evaluation_alphabet_du_serveur.length === 0) ? lesson_d_evaluation_alphabet : lesson_d_exercice_alphabet_du_serveur;

                    let phases_etudiees = JSON.parse(sessionStorage.getItem('phases_etudiees'));

                    data_evaluation_alphabet = JSON.parse(sessionStorage.getItem('data_evaluation_alphabet'));
                    console.log('Phases déjà étudiées sont ci-dessous');
                    console.log(phases_etudiees);

                    if(lesson_d_evaluation_alphabet.length != 0) { 
                        console.log("La leçon d'evaluation alphabet est déjà faite.  Voir ci-dessous");
                        console.log(lesson_d_exercice_alphabet);
                        apprentissageAlphabet(); 
                        fermerLaPage(); 
                    }

                    if(lesson_d_evaluation_alphabet.length === 0) {

                        var evaluation_questions = [];
                        var nbr_max_de_questions_a_poser = 20;
                        var q_total = parseIntNko(nbr_max_de_questions_a_poser);
                        var question_evaluation = '', reponse_evaluation = [];
                        var moyenne_d_evaluation = 1;
                        var compteur = incrementer();
                        var evaluation_counter = 0;
                        var good_response_counter = 0;
                        var q_index = 0;
            
                        data_evaluation_alphabet = {};
                    
                        chargerEvaluationAlphabet();
                        afficherEvaluationAlphabet();
                        evaluerAlphabet();
                        fermerLaPage(); 
                    
                    
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
                                $('#evaluation_question_bouton').html("<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߫ "+q_total+" \\ ߁߭ ߟߊߡߍ߲߫</p>");
                            }
                            function chargerCorpsDeEvaluatonAlphabet() {
                                var evaluation_tbody_default_message = 'ߞߘߐߓߐߟߌ ߞߐߝߟߌ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬.';
                                $('#evaluation_tbody').html("<p id='evaluation_tbody_default_content'>"+evaluation_tbody_default_message+"</p>");
                            }
                        }
                        function evaluerAlphabet() {

                            var date_d_evaluation = dateAcuelle();
                            var niveau_d_evaluation = niveau_en_cours;
                            var phase_d_evaluation = phase_li_id;
                            var note_d_evaluation = 0;
                
                            evaluation_questions = malaxer(alphabet_nko[0]);    // alphabet_nko est dans caracteres.js       
                                
                            initialiserEvaluationAlphabet();
                            poserQuestionDEvaluationAlphabet();
                            repeterQuestionDEvaluationAlphabet();
                            repondreDEvaluationAlphabet();
                            rectificationDDEvaluationAlphabet();
                            correctionDEvaluationAlphabet();
                            
                            
                            function initialiserEvaluationAlphabet() {
                                for(var i=0;i<evaluation_questions.length;i++) {
                                    var q = evaluation_questions[i], r = '', p = 0;
                                    lesson_d_evaluation_alphabet[i] = [q,r,p];
                                }
                                data_evaluation_alphabet = {"date":date_d_evaluation, "niveau":niveau_d_evaluation, "phase":phase_d_evaluation, "lesson":lesson_d_evaluation_alphabet, "note":note_d_evaluation};
                            }
                            function poserQuestionDEvaluationAlphabet() {
                                $('.question_btn').on('click', function(){

                                    effacerPrecedenteReponse();       
                                    effacerLeTableauDEvaluation();
                                    question_evaluation = evaluation_questions[q_index]; 
                                   
                                    dicterLaQuestion();
                                    $('#evaluation_cross').css('display','none');
                                    $('#evaluation_cross').css('transform','scale(0.4)');
                                    $('#evaluation_reponse_container').css({'top':0}); 
                                    afficherTesteContainer(); 
                        
                                    q_index = compteur();
                                    q_ordre = parseIntNko(q_index+1);

                                    var q_rang = (q_ordre == '߁') ? '߭' : '߲';
                                    var q_rang = (q_index == 1) ? '߭' : '߲';
          
                                    actualiserLesLibellesDeDialogueBtn();
                                    afficherEvaluationRepetitionBtn();
                                    
                                    function effacerPrecedenteReponse() { $('#evaluation_reponse').html(''); }
                                    function effacerLeTableauDEvaluation() {
                                        if(q_index === 0) $('#evaluation_tbody').html("<p id='evaluation_tbody_default_content'></p>");
                                    }
                                    function actualiserLesLibellesDeDialogueBtn(){
                                        let action = (q_index != 1) ? "ߠߊߡߍ߲߫ ߕߎ߲߯" : "ߟߊߡߍ߲߫ ߕߎ߲߯";
                                        $("#evaluation_question_bouton").html("<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߫ "+q_total+" \\ "+q_ordre+q_rang+" ߟߊߡߍ߲߫</p>");
                                        $("#evaluation_repetition_bouton").html("<p>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ "+parseIntNko(q_index)+q_rang+" "+action+"</p>");
                                    }
                                    function afficherEvaluationRepetitionBtn() {
                                        masquer($("#evaluation_dialogue_btns > div"));
                                        setTimeout(() => { 
                                            afficher($("#evaluation_repetition_bouton")); 
                                            rendreActif($("#evaluation_repetition_bouton")); 
                                        }, 100);
                                    }
                                    function dicterLaQuestion(){
                                        lire('alphabet',question_evaluation);
                                    }
                                    function afficherTesteContainer() { $('#teste_container').css({'top':'-6rem'}); }
                                });
                            }
                            function repeterQuestionDEvaluationAlphabet() {
                                $('.repetition_btn').on('click', function(){
                                    lire('alphabet',question_evaluation);
                                    reAfficherEvaluationRepetitionBtn();

                                    function reAfficherEvaluationRepetitionBtn() { afficherEvaluationRepetitionBtn(); }
                                });
                            }
                            function repondreDEvaluationAlphabet() {
                                $('#clavier_nko td').on('click', function(){
                                    
                                    if(question_evaluation == '') secouer($('#evaluation_dialogue_btns'));
                                    if(question_evaluation != '') {
                                        
                                        var caractere = $(this).text();
                                        
                                        reponse_evaluation.push(caractere);
                                        $('#evaluation_reponse').html(reponse_evaluation.join(''));
                                        afficherEvaluationCorrectionButton();
                                        
                                        function afficherEvaluationCorrectionButton(){
                                            masquer($("#evaluation_dialogue_btns > div"));
                                            setTimeout(() => { 
                                                afficher($("#evaluation_correction_bouton")); 
                                                rendreActif($("#evaluation_correction_bouton")); 
                                            }, 100);
                                        }
                                    }
                                });
                            }
                            function rectificationDDEvaluationAlphabet() {
                                $('#correcteur_d_evaluation').on('click',function() {
                                    reponse_evaluation.pop();
                                    $('#evaluation_reponse').html(reponse_evaluation.join(''));
                                });
                            }
                            function correctionDEvaluationAlphabet() {
                                
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
                                            defilementDuContenuVersLeHaut($('#evaluation_fiche_body')); 
                                        }, 1400);
                    
                                        evaluation_counter++;
                                        
                                        function enregistrerExerciceAlphabet() { 
                                            lesson_d_evaluation_alphabet.splice(evaluation_counter,1,question_reponse); 
                                        }
                                        function chargerInstantannementEvaluationTbody() {
                    
                                            var n = parseIntNko(evaluation_counter);
                                            n = (n == '߁') ? n+'߭' : n+'߲';
                                            r = (q == r) ? r : "<del>"+r+"</del>";
                    
                                            evaluation_html += '<div><span>'+n+'</span><span>'+q+'</span><span>'+r+'</span><span>'+parseIntNko(p)+'</span></div>\n';
        
                                            $('#evaluation_fiche_body').html(evaluation_html);
                                            $('#total_point_d_evaluation').html(parseIntNko(note_d_evaluation));
                                            $('#pourcentage_point_d_evaluation').html('%'+parseIntNko(note_d_evaluation*100/nbr_max_de_questions_a_poser));
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
                
                                                $('.progress_mauvaise_reponse_bar').css('width', bar_width+'%');
                                                if(question_evaluation == reponse_evaluation) { 
                                                    good_response_counter++;
                                                    let good_response_width = good_response_counter*progress_unity;
                                                    $('.progress_bonne_reponse_bar').css('width', good_response_width+'%');
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
                                        
                                        masquer($("#evaluation_dialogue_btns > div"));
                                        setTimeout(() => { 
                                            afficher($("#evaluation_question_bouton")); 
                                            rendreActif($("#evaluation_question_bouton")); 
                                            indexer($("#evaluation_question_bouton p")); 
                                        }, 100);
                                    }
                                    function finDeEvaluationAlphabet() {
                                        if(q_index==nbr_max_de_questions_a_poser) {

                                            viderNotification();

                                            $('#revision_dialogue_btns').html('ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹').off('click'); 
                                            
                                            if(note_d_evaluation >= moyenne_d_evaluation) {
                                                viderNotification();
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
                                                viderNotification();
                                                setTimeout(() => {
                                                    ecris('evaluation_notification_corps','\
                                                    ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ ߡߊ߫ ߢߊ߬. ߌ ߖߌߖߊ߬ ߞߊ߬ ߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬. \
                                                    ');
                                                }, 400);
                                                afficherRepriseEvaluationBtn();
                                            }
                                            
                                                                            
                                            function stockerEvaluationAlphabet() {
                                                    
                                                lesson_d_evaluation_alphabet = lesson_d_evaluation_alphabet;
                                                sendLessonDataToDB('alphabet_evaluation',lesson_d_evaluation_alphabet);
                                                sessionStorage.setItem('lesson_d_evaluation_alphabet', JSON.stringify(lesson_d_evaluation_alphabet));

                                                phases_etudiees.push(phase_li_id);
                                                data_evaluation_alphabet = {"date":date_d_evaluation, "niveau":niveau_d_evaluation, "phase":phase_d_evaluation, "lesson":lesson_d_evaluation_alphabet, "note":note_d_evaluation};

                                                let phase_nbr = phases_etudiees.length;

                                                sessionStorage.setItem('lesson_d_evaluation_alphabet', JSON.stringify(lesson_d_evaluation_alphabet));
                                                sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees));
                                                sessionStorage.setItem('data_evaluation_alphabet', JSON.stringify(data_evaluation_alphabet));
                                                sessionStorage.setItem('data_evaluation', JSON.stringify(data_evaluation_alphabet));

                                                changerPhaseActive(index_phase_active);
                                                sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr));
                                                console.log('Les données de Alphabet_evaluation sont envoyées à la base de données.');
                         
                                                if(index_phase_active+1 === total_phase) {
                                                    sessionStorage.setItem('matiere_nouvellement_apprise',JSON.stringify(matiere_nom));
                                                    sessionStorage.setItem('niveau_max',JSON.stringify(niveau_max+1));                                        
                                                    sessionStorage.setItem('niveau_actif',JSON.stringify(niveau_max+2));
                                                    sessionStorage.setItem('phase_nbr',JSON.stringify(0));
                                                }

                                                console.log("Les données de evaluation_alphabet sont envoyées à la base de données");
                                                console.log("Les phases étudiées sont : ");
                                                console.log(phases_etudiees);
                                            }
                                            function resultatDAlphabet() {
                                                setTimeout(() => {
                                                    $('<span class="resultat_btn" id="alphabet_resultat_btn">ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span>').insertAfter($('#evaluation_notification_titre'));
                                                    $('#alphabet_resultat_btn').click(()=>{ 
                                                        $('#alphabet_resultat_btn').css('display','none');
                                                        resultatDeLaMatiere(lesson_d_apprentissage_alphabet, lesson_d_exercice_alphabet, lesson_d_evaluation_alphabet); 
                                                    });
                                                }, 4000);
                                            }
                                            function afficherSyllabeBtn() {
                                                masquer($('#evaluation_dialogue_btns'));
                                                afficher($('#evaluation_redirection_btns'));

                                                masquer($("#evaluation_redirection_btns > div"));
                                                afficherRapidement($('#continu_sur_la_lesson_suivante'));
                                                rendreActif($('#continu_sur_la_lesson_suivante'));
                                                indexer($('#continu_sur_la_lesson_suivante p'));
                                                $('#continu_sur_la_lesson_suivante a').html("ߜߋ߲߭ ߘߋ߰ߟߌ ߘߊߡߌ߬ߘߊ߬");
                                            }
                                            function afficherRepriseEvaluationBtn() {
                                                masquer($('#evaluation_dialogue_btns'));

                                                masquer($("#evaluation_redirection_btns > div"));
                                                afficherRapidement($('#reprendre_evaluation_bouton'));
                                                rendreActif($('#reprendre_evaluation_bouton'));
                                                indexer($('#reprendre_evaluation_bouton p'));
                                                $('#reprendre_evaluation_bouton p').html("ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ ߞߍ߫ ߕߎ߲߯");
                                            }
                                            function continuSurSyllabe() {
                                                $('#continu_sur_apprentissage_bouton').html("<a id='redirection_sur_syllabe' href='http://localhost/kouroukan/php/programmes.php'>ߜߋ߲߭ ߥߟߊ߬ߘߊ ߕߊ߬ ߦߊ߲߬</a>");
                                            }
                                        }
                                    }
                                });
                            }
                            function afficherEvaluationRepetitionBtn() {
                                masquer($("#evaluation_dialogue_btns > div"));
                                setTimeout(() => { 
                                    afficher($("#evaluation_repetition_bouton")); 
                                    rendreActif($("#evaluation_repetition_bouton")); 
                                }, 100);
                            }
                        } 
                    }
                });
            }
        }
        function redirectionDExercicePreAlphabet(data) {

            let note = calculerNote(data);
            let exercice_question_btn_html = (note < 100) ? 'ߌ ߖߌߖߊ߬ ߹' : 'ߌ ߞߎߟߎ߲ߖߋ߫ ߹';

            afficher($("#exercice_dialogue_btns"));
            masquer($("#exercice_dialogue_btns > div"));
            afficherRapidement($("#exercice_question_btn"));
            $('#exercice_question_btn').text(exercice_question_btn_html).off('click');
            
            setTimeout(() => {
                masquer($('#exercice_dialogue_btns'));
                afficherRapidement($('#exercice_redirection_btns'));
                masquer($('#exercice_redirection_btns > div'));

                if(note < 100) {
                    afficherRapidement($('#reprendre_exercice_bouton'));
                    $('#reprendre_exercice_bouton').html('<p>'+liste_de_matieres[0][1]+' ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯</p>');
                    rendreActif($('#reprendre_exercice_bouton'));
                    indexer($('#reprendre_exercice_bouton p'));
                }
                if(note === 100) {
                    afficherRapidement($('#continu_sur_revision_bouton'));
                    $('#continu_sur_revision_bouton').html('<p>'+liste_de_matieres[0][1]+' ߞߘߐߓߐߟߌ ߞߍ߫</p>');
                    rendreActif($('#continu_sur_revision_bouton'));
                    indexer($('#continu_sur_revision_bouton p'));
                }
            }, 1500);
        }
        function redirectionDEvaluationPreAlphabet(data) {

            let note = calculerNote(data); 
            let revision_question_btn_html = (note < 100) ? 'ߌ ߖߌߖߊ߬ ߹' : 'ߌ ߞߎߟߎ߲ߖߋ߫ ߹';

            afficher($("#revision_dialogue_btns"));
            masquer($("#revision_dialogue_btns > div"));
            afficherRapidement($("#revision_question_btn"));
            $('#revision_question_btn').text(revision_question_btn_html).off('click');
            
            setTimeout(() => {
                masquer($("#revision_dialogue_btns"));
                afficherRapidement($('#revision_redirection_btns'));

                if(note < 92) {
                    
                    masquer($('#revision_redirection_btns > div'));
                    afficherRapidement($('#reprendre_revision_bouton'));
                    
                    $('#reprendre_revision_bouton').html('<p>'+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯</p>');
                    rendreActif($('#reprendre_revision_bouton'));
                    indexer($('#reprendre_revision_bouton p'));
                }

                if(note >= 92) {
                    if(data.length < 27) {
                        masquer($('#revision_redirection_btns > div'));
                        afficherRapidement($('#continu_sur_apprentissage_bouton'));

                        $('#continu_sur_apprentissage_bouton').html('<p>'+'ߥߊ߫ '+liste_de_matieres[0][1]+' ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬</p>');
                        rendreActif($('#continu_sur_apprentissage_bouton'));
                        indexer($('#continu_sur_apprentissage_bouton p'));

                        $('#continu_sur_apprentissage_bouton').click(() => { raffraichirLaPage(); });
                    }
                    if(data.length === 27) {
                        masquer($('#revision_redirection_btns > div'));
                        afficherRapidement($('#syllabe_bouton'));

                        $('#syllabe_bouton').html('<p>'+liste_de_matieres[1][1]+' ߘߋ߰ߟߌ ߘߊߡߌ߬ߘߊ߬</p>');
                        rendreActif($('#syllabe_bouton'));
                        indexer($('#syllabe_bouton p'));
                        $("#syllabe_bouton").click(() => {
                            location.assign('programmes.php'); 
                        });
                    }
                }
            }, 1500);
        }
        function afficherAlphabetExerciceBouton() {

            masquer($('#parametre_lesson_container'));
            masquer($('#panneaux'));
            $('#apprentissage_dialogue_btns').text('ߌ ߞߎߟߎ߲ߖߋ߫ ߹').off('click');
            
            setTimeout(() => { 
                masquer($('#apprentissage_dialogue_btns'));
                afficherRapidement($('#apprentissage_redirection_btns')); 
    
                masquer($('#apprentissage_redirection_btns > div'));
                afficherRapidement($('#continu_sur_exercice_bouton'));
                $('#continu_sur_exercice_bouton').html('<p>'+matiere_nom+" ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
                rendreActif($('#continu_sur_exercice_bouton'));
                indexer($('#continu_sur_exercice_bouton p'));
            }, 1500);
        }
        function afficherPreRevisionBtn() {
            $('#apprentissage_dialogue_btn').css('display','none');

            $('#apprentissage_dialogue_btns').css('display','none');
            $('.redirection_btns').css('display','block');
    
            $('#exercice_bouton').css('display','none');
            $('#evaluation_bouton').css('display','block');

            zoomUp($('.dialogue_btns'));
        }
        function raffraichissementDeLaPage() {
            $('#fermer_pre_apprentissage, #fermer_apprentissage').on('click',function() { raffraichirLaPage(); });
        }
    }
}