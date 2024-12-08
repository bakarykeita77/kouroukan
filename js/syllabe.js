function syllabe() {

    var nom = JSON.parse(sessionStorage.getItem('nom'));
    var prenom = JSON.parse(sessionStorage.getItem('prenom'));
    var id = JSON.parse(sessionStorage.getItem('id'));
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    var lesson_option = parseInt(JSON.parse(sessionStorage.getItem('lesson_option')));

    var table_id = $('.table_parlante').attr('id');
        
    var table = $('#'+table_id); 
    var tr = $('#'+table_id+' tr');
    var td = $('#'+table_id+' td');

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

    let total_syllabes_exercees = [];


    var apprentissage_clicks_memo = [];
    let nbr_raisonnable_de_click = 1;
    let clicked_elements_quantity = 0;
   
    
    if(niveau_actif < 3) {
        switch(lesson_option) {
            case 1 : preApprendreSyllabe(); break;
            case 2 : preApprendreSyllabe(); break;
        } 
    }
    

    function preApprendreSyllabe() {
            
        let lesson_active = '';
        let element_actif = '';
        let matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));
        let phase_id = JSON.parse(sessionStorage.getItem('phase_id'));

        let cercle_actif = '';
        let cercle_id = '';
        let cercle_index = 0;
        
        let quantite_normale_de_click = 1;

        let panneau_status = "masque";
        let consonnes_choisies = [];
        let syllabes_en_cours = [];
        let syllabes_revisees = [];
        let memoire_consonnes_choisies = JSON.parse(localStorage.getItem('memoire_consonnes_choisies'));
        let memoire_syllabes_etudiees = JSON.parse(localStorage.getItem('memoire_syllabes_etudiees'));
        

        let texte_1 = "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬."
        let texte_2 = "ߛߌ߬ߙߕߊ߬ ߞߋߟߋ߲߫ ߥߟߊ ߛߌߦߊߡߊ߲߫ ߛߎߥߊ߲ߘߌ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰.";
        let texte_3 = "ߜߋ߲߭ ߢߌ߲߬ ߠߎ߫ ߞߋ߬ߟߋ߲߬ ߞߋ߬ߟߋ߲߬ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߴߌ ߞߣߐ߫.";
        let texte_4 = "ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߴߊߟߎ߬ ߛߓߍ߫߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫.";
        let texte_5 = "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߠߎ߬ ߟߋ߬ ߓߍ߯ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫";


        apprentissagePreSyllabe();
        exercicePreSyllabe();
        revisionPreSyllabe();
        evaluationPreSyllabe();

        $('#fermer_resultat').click(function() { $('#envelope').css('display','none'); });


        function apprentissagePreSyllabe() {

            chargerApprendrePreSyllabe();
            afficherApprendrePreSyllabe();
            apprendrePreSyllabe();

            function chargerApprendrePreSyllabe() {

                chargerEnteteDePreSyllabe();
                chargerFootDePreSyllabe();
                chargerCorpsDePreSyllabe();

                
                function chargerEnteteDePreSyllabe() {
                    $('.notification_titre').html('ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                    setTimeout(() => {
                        ecrire("notification_corps",texte_1);
                    }, 1200);
                }
                function chargerFootDePreSyllabe() {
                            
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
                    function panneauxStyle() {
                        $.each($('#panneaux span'), function() {

                            let panneaux_span = $(this);
                            let panneaux_consonne = ($(this).text());

                            if(memoire_consonnes_choisies != null) {
                                memoire_consonnes_choisies.forEach(element => {
                                    if(element == panneaux_consonne) { panneaux_span.css({'color':'orange'}); }
                                });
                            }
                        });
                    }
                }
                function chargerCorpsDePreSyllabe() {

                    preChargementDuTableauNoir();
                    chargementDuTableauNoir();
                    
                    function preChargementDuTableauNoir() {
                        $('#table_syllabe_apprentissage').html("<div id='pre_texte'>ߜߋ߲߭ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬</div>");
                    }
                    function chargementDuTableauNoir() {
                    
                        initialiserConsonnesChoisies();

                        $('#panneaux span').click(function() {

                            var clicked_consonne_container = $(this);
                            var clicked_consonne = $(this).text();
                            var clicked_consonne_color = $(this).css('color');
                            let panneau_consonne_index = consonnes_choisies.indexOf(clicked_consonne);

                            if(panneau_consonne_index == '-1') { consonnes_choisies.push(clicked_consonne); }
                            if(panneau_consonne_index != '-1') { consonnes_choisies.splice(panneau_consonne_index, 1); }
                            if(clicked_consonne_color == 'rgb(255, 165, 0)') { 
                                alert('ߛߌ߬ߙߊ߬ߕߊ ߏ߬ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰ߣߍ߲߬ ߞߘߐ ߟߋ߬߹');
                                return; 
                            }

                            marquerLaConsonneCliquee(clicked_consonne_container);
                            decocherLesConsonnes();
                            decocherLaNasalisation();
                            afficherTableauNoir();
                            effacerTableau();
                            stylesDesSyllabes();
                            progressBarrApprendrePreSyllabe();

                        
                            function decocherLesConsonnes() {
                                if($('#consonnes_checker').find('.checkbox_parent').prop("checked") == true) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }            
                            }
                            function decocherLaNasalisation() {
                                if($('#nasalisation_checker').find('.check_btn:last-child input').prop("checked") == true) { $('#nasalisation_checker').find('.check_btn:last-child label').click(); }            
                            }
                            function chargerTableauNoir() {
                             /*
                             Cette fonction est liée à la fonction checkbox_childrenClick() dans la fonction chargerLesson() dans parametres.js.
                             Lorsqu'on clique sur une consonne du panneaux, la valeur correspondante est recherchée et cliquée dans les check_btn
                             au niveau de parametres.js. Ici la consonne cliquée est dans la variable clicked_consonne.
                             */
                                $.each($('.check_btn'), function(){
                                    var consonne_corespondante = $('label', this);
                                    if(clicked_consonne == consonne_corespondante.text()) { consonne_corespondante.click(); }
                                });
                                $('#table_syllabe_apprentissage tr').css('opacity',1);
                                $('.table_parlante td').css('opacity',1);
                            }
                            function effacerTableau() {
                                if(panneau_consonne_index != '-1') {
                                    $.each($('#apprentissage_body tr'), function() {
                                        let tr_actif = $(this);
                                        let consonne_du_tableau = $('td', this).text().split('')[0];

                                        if(clicked_consonne == consonne_du_tableau) {
                                            let td = $($('td', this));
                                            let td_ln = td.length;

                                            $.each(td, function() {
                                                let index_td = $(this).index();
                                                setTimeout(() => { $(this).css('transform','scale(0)'); }, (td_ln - index_td)*100);
                                            });

                                            setTimeout(() => { 
                                                tr_actif.css('display','none'); 
                                                chargerTableauNoir();
                                                stylesDesSyllabes();
                                            }, 500);
                                        }
                                    });
                                }
                            }
                            function afficherTableauNoir() {
                                if(panneau_consonne_index == '-1') {
                                    chargerTableauNoir();
                                    $.each($('#apprentissage_body tr'), function() {
                                        let consonne_du_tableau = $('td', this).text().split('')[0];
                                        if(clicked_consonne == consonne_du_tableau) {
                                            let td = $($('td', this));

                                            td.css({'transform':'scale(0)', 'transition':'100ms'});
                                            $.each(td, function() {
                                                let index_td = $(this).index();
                                                setTimeout(() => { $(this).css('transform','scale(1)'); }, index_td*100);
                                            });
                                        }
                                    }); 
                                }
                            }
                            function progressBarrApprendrePreSyllabe() {
                
                                let td = $('#table_syllabe_apprentissage td');
                                let progress_unity = 100/[(td.length)*quantite_normale_de_click];
                                let good_response_width = 0;
                                let total_clicks_normal = 0;
                
                                // masquerDialogueBtn();

                                $.each(td, function() {
                                    let compteur_td_click = 0;
            
                                    $(this).click(function(){
                                        if(compteur_td_click < quantite_normale_de_click) {
                                            compteur_td_click++;
                                            total_clicks_normal++;

                                            actualiserPreSyllabeProgressBar()
                                            reInitialiserProgressBar();

                                            function reInitialiserProgressBar() {
                                                if(total_clicks_normal === (td.length)*quantite_normale_de_click) {
                                                    setTimeout(() => { initialiserProgressBar(); }, 1000); 
                                                }
                                            }
                                        }

                                        function actualiserPreSyllabeProgressBar() {
                                            good_response_width += progress_unity;
                                            $('.progress_bonne_reponse_bar_integre').css('width', good_response_width+'%');
                                        }
                                    });
                                });

                                function masquerDialogueBtn() {
                                    $('#panneaux').css('height',0);
                                    $('.progress_bar_integre').css('display','block');
                                    $('#pre_apprentissage_btns').css('display','none');
                                    $('#apprentissage_dialogue_btn').css('display','none'); 
                                }
                            }
                            function stylesDesSyllabes() {
                                let td = $('#table_syllabe_apprentissage td');
                                
                                $.each(td, function(){
                                    let compteur = 0;
                                    $(this).css({'background-color':'rgb(85, 85, 85)', 'color':'yellow'});
                                    $(this).click(function(){
                                        let td_actif = $(this);
                                        let n = compteur++;
                                        
                                        if(compteur == quantite_normale_de_click){
                                            td_actif.css({ 
                                                'background-color':'transparent', 
                                                'color':'yellow', 
                                                'border':'1px solid rgb(85, 85, 85)' 
                                            });
                                        }
                                    });
                                });
                            }
                        });
                        function initialiserConsonnesChoisies() { consonnes_choisies.splice(0,consonnes_choisies.length); }
                    }
                }
            }
            function afficherApprendrePreSyllabe() {
                
                $('.page_body').css('display','none');
                $('.course_container').css('display','block');

                afficher($('.course'));

                $('#apprentissage_container').css('display','block');
                $('#exercice_container').css('display','none');
                $('#revision_container').css('display','none');
                $('#evaluation_container').css('display','none');


                setTimeout(() => { displayv($('#apprentissage_head')); }, 400);
                setTimeout(() => { displayv($('#apprentissage_body')); }, 800);
                setTimeout(() => { 
                    displayv($('#apprentissage_foot')); 
                    setTimeout(() => { afficherPreApprentissageBtns(); }, 100);
                }, 1200);

                $('.modificateur_de_choix_btn').on('click', function(){
                    if($('.modificateur_de_choix_message').css('display') == 'none') {
                        $('.modificateur_de_choix_message').css({'display':'block', 'height':'5rem'});
                    }else{
                        $('.modificateur_de_choix_message').css('height',0);
                        setTimeout(() => { $('.modificateur_de_choix_message').css('display','none'); }, 100);
                    }
                });

                $('.modificateur_de_choix_message button').click(function() {
                    $('.modificateur_de_choix_message').css('height',0);
                    setTimeout(() => { $('.modificateur_de_choix_message').css('display','none'); }, 100);
                });

                $('.modificateur_de_choix_message button:first-child').click(function() {
                    localStorage.clear(); 
                    sessionStorage.clear(); 
                });
            }
            function apprendrePreSyllabe() { 

                $('#afficheur_de_panneau').click(function(e) {
                    e.stopImmediatePropagation();
                    if(panneau_status == "masque") { afficherPanneau() }else{ masquerPanneau(); }; 
                }); 
                masquerLePanneauDesConsonnes();
      
                $('#panneaux span').click(function() {

                    let td = $('.table_parlante td');
                    let compteur_de_syllabe = 0;
                    let apprentissage_width = 0;
                    let global_clicks_counter = 1;

                    initialiserSyllabePreAppriseMemoire(); 
                    $.each(td, function(){         
                        let compteur_td_click = 0;
                        $(this).click(function() {
      
                            let td_actif = $(this);
                            let tr_index = td_actif.parent().index();
                            let td_index = td_actif.index() + tr_index*7;
                            let syllabe_clique = td_actif.text();

                            compteur_td_click++;
 
                            lire('ߊ',syllabe_clique); 
                            enregistrerApprendrePreSyllabe();
                            progressBarApprendrePreSyllabe();
                            finDeApprendrePreSyllabe();

                            
                            function enregistrerApprendrePreSyllabe() {
                        
                                let mark = (compteur_td_click >= quantite_normale_de_click) ? 1 : 0;
                                
                                syllabes_en_cours.splice(td_index,1,[syllabe_clique,compteur_td_click,mark]);

                                if(compteur_td_click === quantite_normale_de_click) { compteur_de_syllabe++; }
                                if(syllabes_en_cours.length === compteur_de_syllabe) {
                                    localStorage.setItem('syllabes_en_cours', JSON.stringify(syllabes_en_cours));
                                }
                            }
                            function progressBarApprendrePreSyllabe() {
                                if(compteur_td_click <= quantite_normale_de_click) {

                                    let clicked_td_length = quantite_normale_de_click*syllabes_en_cours.length;
                                    let diagramm_unity = 100/clicked_td_length;
                                    let global_clicks_count = global_clicks_counter++;

                                    apprentissage_width = global_clicks_count*diagramm_unity;
                                    $('#apprentissage_progress_bar .progress_bonne_reponse_bar').css('width', apprentissage_width+'%');
                                
                                //Initialiser la barre de progression
                                    if(global_clicks_count/quantite_normale_de_click == syllabes_en_cours.length) { 
                                        setTimeout(() => {
                                            $('#apprentissage_progress_bar').css('display','none'); 
                                            $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);
                                            td_click_counter = 0;
                                            compteur_td_click = 0;
                                            apprentissage_width = 0;
                                            global_clicks_counter = 1;
                                        }, 400);
                                    }
                                }
                            }
                            function finDeApprendrePreSyllabe() {
                                if(compteur_de_syllabe === syllabes_en_cours.length) {

                                    // resultatApprentissagePreSyllabe();
                                    setTimeout(() => { 
                                        $('#apprentissage_dialogue_btns').css('display','none'); 
                                        initialiserProgressBarIntegre();
                                        exercicePreSyllabe();
                                        setTimeout(() => { afficherPreExerciceBtn(); }, 200);
                                    }, 600);

                                    function resultatApprentissagePreSyllabe() {
                                    
                                        resultat(syllabes_en_cours);
                                        adapterLeResultatAuFormatDApprentissage(syllabes_en_cours);
                                        afficherApprentissagePreSyllabeResultat(); 
                                        masquerApprentissagePreSyllabeResultat(); 

                                        function afficherApprentissagePreSyllabeResultat() { goDown($('.resultat_container')); }
                                        function masquerApprentissagePreSyllabeResultat() {  
                                            $('#fermer_resultat, #avance').click(function() {
                                                $('.resultat_container').css('display','none');
                                                formatParDefautDuResultat();
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    });

                    function initialiserSyllabePreAppriseMemoire() {
                        let td_to_click = $('#table_syllabe_apprentissage td');
                        
                        syllabes_en_cours.splice(0,consonnes.length);
                        for(i=0; i<td_to_click.length; i++) { 
                            let syllabe_to_click = td_to_click[i].textContent;
                            let number_of_click = 0;
                            let mark = 0;
                            syllabes_en_cours.push([syllabe_to_click,number_of_click,mark]); 
                        }
                        questions_posees.splice(0,questions_posees.length);
                    } 
                });

                function masquerLePanneauDesConsonnes() {
                    $('#panneaux').on('mouseleave', function() { masquerPanneau(); });
                    $('#submit_panneau').on('click', masquerPanneau);
                }
            }
            function afficherPanneau(){
                $('#panneaux').css({'position':'absolute','height':'17rem'});
                $('#consonnes_cadre').animate({'top':'10px'}, 250);
                panneau_status = "affiche";

                ecrire("notification_corps",texte_2);
            }
            function masquerPanneau(){
                $('#consonnes_cadre').animate({'top':'12rem'}, 250);
                setTimeout(function(){$('#panneaux').css('height',0);}, 250);
                panneau_status = "masque";

                if($('.table_parlante tr').length == 0) ecrire("notification_corps",texte_1);
                if($('.table_parlante tr').length != 0) {
                    ecrire("notification_corps",texte_3);
                    setTimeout(() => { $('#apprentissage_dialogue_btns').css('display','none'); }, 400);
                    setTimeout(() => { $('#apprentissage_progress_bar').css('display','block'); }, 500);
                }
            }
        }
        function exercicePreSyllabe() {
            $('#exercice_bouton, #reprendre_exercice_bouton, #continu_sur_exercice_bouton').click(function(e) {
                e.stopImmediatePropagation();
                     
                lesson_active = 'pre_exercice';
                sessionStorage.setItem('lesson_active', JSON.stringify(lesson_active)); 
                syllabes_actives = syllabesActives();
                exercice_pre_questions = malaxer(malaxer(syllabes_actives));

                let total_questions = exercice_pre_questions.length;

                $('.fermeture_pre').attr('id','fermeture_pre_exercice');
                
                chargerPreExerciceSyllabe();
                afficherExercice();
                exercice();
    
    
                function chargerPreExerciceSyllabe() {
                    if(niveau_actif === 2) {
    
                        chargerEnteteDePreExerciceSyllabe();
                        chargerPiedDePreExerciceSyllabe();
                        chargerCorpsDePreExerciceSyllabe();
                    
                        function chargerEnteteDePreExerciceSyllabe() {
                            $('.notification_titre').html('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ');
                            viderNotification();
                            setTimeout(() => {
                                ecrire('notification_corps',"ߢߌ߬ߣߌ߲߬ߞߊߟߌ߬ ߞߘߎ ߘߌ߯߭ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊ߫ ߞߋߟߋ߲߫ ߞߋߟߋ߲߫߸ ߦߵߊ߬ߟߎ߫ ߦߌ߬ߘߊ߬߸ ߦߋ߫ ߓߊ߲߫ ߞߊ߬ ߛߊߞߍߟߌ߫ ߞߘߎ ߘߌ߲߯߸ ߞߵߊ߬ߟߎ߬ ߛߊߞߍ߫.");
                            }, 2000);
                        }
                        function chargerPiedDePreExerciceSyllabe() {
                            total_questions = exercice_pre_questions.length;

                            $('#exercice_dialogue_btns').html('\
                            <div class="question_btn" id="exercice_question_btn"></div> \
                            <div class="repetition_btn" id="exercice_repetition_btn"></div> \
                            <div class="correction_btn" id="exercice_correction_btn">ߏ߬ ߛߊߞߍ߫</div> \
                            '); 

                            $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ ߁߭ ߟߊߡߍ߲߫');
                            $('#reprendre_exercice_bouton').html('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯');
                            $('#continu_sur_revision_bouton').html('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫');
                        }
                        function chargerCorpsDePreExerciceSyllabe() {
                            let exercice_body_html = lessonHTML(exercice_pre_questions, '');
                            $('#exercice_body').html(exercice_body_html);
                        }  
                    }
                }
                function exercice() {
    
                    gestionDeExerciceBtns();
                    ecouterLaPreQuestion();
                    repondreLaPreQuestion();
                    corrigerLaPreQuestion();
                
    
                    function ecouterLaPreQuestion() {
    
                        let i=0;
                        let pre_questions = malaxer(exercice_pre_questions);
                        total_questions = pre_questions.length;
    
                        $('#exercice_question_btn').click(function(e) { 
                            e.stopImmediatePropagation(); 
          
                            ordre_de_question = (total_questions == i+2) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                            $('#exercice_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
                            $('#exercice_repetition_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(i+1)+'߲ ߠߊߡߍ߲߫ ߕߎ߲߯');
                            pre_question = pre_questions[i];
                            
        // alert(pre_question);
        console.log(pre_question);
    
                            if(i < pre_questions.length) { 
                                lire('ߊ',pre_question); 
                                relire(pre_question); 
                                questions_posees.push(pre_question);
                            }
                            i++; 
                            if(i == pre_questions.length) { 
                                $('#exercice_question_btn').css('display','none');
                                i = 0; 
                            }
    
                            function relire(pre_question) { $('#exercice_repetition_btn').click(function() { lire('ߊ',pre_question); }); }
                        });
                    }
                    function repondreLaPreQuestion() {
                        $.each($('#exercice_body td'), function() {
                            $(this).click(function(){
                                if(pre_question != '') {
                                    pre_reponse = this.innerHTML;
                    
                                    element_actif = $(this);
                                    $('#exercice_body .table_parlante td').css({'background-color':'rgba(85,85,85,0.25)', 'color':'white'});
                                    $(element_actif).css({'background-color':'rgba(85,85,85)'});
                                    rendreActif($('#exercice_correction_btn'));
                                }
                            });
                        });
                    }
                    function corrigerLaPreQuestion() {
    
                        let pre_question_counter = 0;
                        let bonne_reponse_counter = 0;
    
                        $('#exercice_correction_btn').click(function() {
                            if(questions_posees.length <= total_questions) {

                                marquerReponse(element_actif,pre_question);
                                enregistrerPreExerciceSyllabe();
                                progressBarPreExerciceSyllabe();
                                stockerPreExerciceSyllabe();
                                finDePreExerciceSyllabe();

    
                                function enregistrerPreExerciceSyllabe() {
    
                                    let question_reponse = [];
    
                                    //S'il n'y a pas de question, ne rien faire.
                                    if(pre_question == '') return false;
                        
                                    point = (pre_question == pre_reponse) ? 1 : 0;
                                    question_reponse = [pre_question, pre_reponse, point];
                                    pre_exercice_memoire.push(question_reponse);
                                    
                                    if(pre_question == pre_reponse) { nbr_bonne_reponse++; point_total++; }
                                    if(pre_question != pre_reponse) { nbr_mauvaise_reponse++; } 

                                    pre_question = '';
                                    pre_reponse = ''; 
    
                                    if(questions_posees.length === total_questions) {  
    
                                        let n_q = total_questions;
                                        let n_m_r = nbr_mauvaise_reponse;
    
                                        taux_de_fausse_reponse = Math.ceil((n_m_r/n_q)*100);
                                        taux_de_vraie_reponse =  100 - taux_de_fausse_reponse;
                                    }
                                }
                                function progressBarPreExerciceSyllabe() {
    
                                    let pre_exercice_width = total_questions;
                                    let diagramm_unity = 100/pre_exercice_width;
   
                                    setTimeout(() => { $('.progress_bar').css('display','block'); }, 400);
                                        
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
                                function stockerPreExerciceSyllabe() {
                                    if(pre_exercice_memoire.length === total_questions) {
                                        total_syllabes_exercees = total_syllabes_exercees.concat(pre_exercice_memoire);
                                        if(total_syllabes_exercees.length == 27) { 
                                            sendLessonDataToDB('alphabet_exercice',total_syllabes_exercees);
                                            console.log('Lesson de pre_exercice envoyée à la base de donnée.');
                                        }
                                    }
                                } 
                                function finDePreExerciceSyllabe() {
    
                                    fermerPreExercice();
    
                                    if(questions_posees.length === total_questions) {
                                        setTimeout(() => {
                                            
                                            $('#exercice_dialogue_btns').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫'); 
                                            $('#exercice_progress_bar').css('display','none'); 
                                            displayv($('#exercice_redirection_btns')); 

                                            // setTimeout(() => { preExerciceResultat(); }, 300);
        
                                            if(taux_de_vraie_reponse < 100) { 
                                                $('#reprendre_exercice_bouton').css('display','block');
                                                $('#continu_sur_revision_bouton').css('display','none');
                                                indexer($('#reprendre_exercice_bouton'));
                                                pre_exercice_memoire.splice(0,pre_exercice_memoire.length);
                                            }
                                            if(taux_de_vraie_reponse == 100) { 
                                                $('#reprendre_exercice_bouton').css('display','none');
                                                $('#continu_sur_revision_bouton').css('display','block');
                                                indexer($('#continu_sur_revision_bouton'));
                                            }
        
                                            $('#deliberation').click(function() { goUp($('.resultat_container')); });
        
                                            // Initialiser exercice
                                            setTimeout(() => { 
                                                initialiserProgressBar(); 
                                                initialiserExercice();
                                            }, 600);
                                        }, 600);
    
                                        
                                        function preExerciceResultat() {
    
                                            initialiserExerciceResultat();
                                            formatParDefautDuResultat();
                                            resultat(pre_exercice_memoire);
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
    
                                    function reprendreExercicePreSyllabe() {
                                        goUp($('.resultat_container'));
                                        setTimeout(() => { $('#exercice_bouton').click(); }, 400);   
                                    }
                                    function continuSurRevisionPreSyllabe() {  
                                        goUp($('.resultat_container'));
                                        setTimeout(() => { $('#evaluation_bouton').click(); }, 400);
                                    }
                                    
                                    
                                    function fermerPreExercice() {
                                        $('.fermeture_pre').one('click',function(){    
                                                                
                                            cercle_id = $('.apprentissage_en_cours').attr('id');
                                            exercice_btn_id = $('.exercice_en_cours').attr('id');
    
                                            zoomDown($('#exercice_body'));
                                            setTimeout(() => {
                                                $('#exercice_body').css('display','none');
                                                $('#pre_exercice_resultat').css('top','-100%');
                                            }, 250);
    
                                            setTimeout(() => {
                                                
                                                if(lesson_active == 'pre_exercice') { 
                                                    if(taux_de_vraie_reponse < 100) {
                                                        $('#exercice_bouton').text('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯'); 
                                                        afficherPreExerciceBtn();
                                                    }
                                                    if(taux_de_vraie_reponse == 100) {
                                                        afficherPreRevisionBtn();
                                                        $('#exercice_bouton').removeClass('exercice_en_cours').addClass('carre_depasse').css('z-index',0);
                                                    }
                                                }
                                            
                                                if(lesson_active == 'pre_revision') { 
                                                    
                                                    if(taux_de_vraie_reponse < 100) {
                                                        afficherPreRevisionBtn();
                                                        $('#evaluation_bouton').text('ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                                                    }
                                                    if(taux_de_vraie_reponse == 100) {
                                                        setTimeout(() => { afficherPreApprentissageBtns(); }, 400);
                                                        $('#'+cercle_id).removeClass('apprentissage_en_cours').addClass('cercle_depasse');
                                                        rendreActif($('#'+cercle_id).next()); 
                                                        
                                                        ecrire('notification_corps','ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߌ߲߯ ߘߎ߭ߡߊ߬');
                                                    }
                                                }
                                            }, 250);
                                        });
                                    } 
                                    function reprendreExercicePreAlphabet() {
                                        $('#reprise_btn').click(function() {
                                            goUp($('.resultat_container'));
                                            setTimeout(() => { $('#exercice_bouton').click(); }, 400);
                                        });
                                    }
                                    function continuSurRevisionPreAlphabet() {
                                        $('#avance_btn').click(function() {
                                            cercle_index++;                           
                                            goUp($('.resultat_container'));
                                            setTimeout(() => { $('#evaluation_bouton').click(); }, 400);
                                        });
                                    }
                                    function reprendreRevisionPreAlphabet() {
                                        $('#reprendre').click(function() {
                                            goUp($('.resultat_container'));
                                            setTimeout(() => { $('#evaluation_bouton').click(); }, 400);
                                        });
                                    }
                                    function continuSurApprendrePreAlphabet() {
                                        $('#avance').click(function() {
                                            cercle_index++; 
    
                                            $('#fermeture_pre_evaluation').click();
                                            $('#exercice_body').css('display','none');
                                            goUp($('.resultat_container'));
                                            setTimeout(() => { $('#cercles_des_partis_cadre span:nth-child('+cercle_index+')').click(); }, 600);
                                        });
                                    }
                                }
                            } 
                            if(questions_posees.length == total_questions) { $('#exercice_btns').css('display','none'); }
                        });
                    }
                }
                function assistantPreExerciceSyllabe() {
                    
                    switch(niveau_actif) {
                        case 1 : assistantDePreExerciceAlphabet(); break;
                        case 2 : assistantDePreExerciceSyllabes(); break;
                        case 3 : assistantDePreExerciceTons(); break;
                        case 4 : assistantDePreExerciceChiffres(); break;
                    }
    
    
                    function assistantDePreExerciceAlphabet() {
    
                        $('#evaluation_bouton').click(function() {
                            setTimeout(() => {
                                ecrire('notification_corps',texte_5);
                            }, 1000);
                        });
                        
                        $('#exercice_correction_btn').click(function() {
    
                            if(questions_posees.length == exercice_pre_questions.length) {
                                if(taux_de_vraie_reponse == 100) {
                                    let notification = liste_de_matieres[1][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                    ecrire('notification_corps',notification);
                                }
                                if(taux_de_vraie_reponse < 100) {
                                    let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                    ecrire('notification_corps',notification);
                                }
                            }
                            
                            // if(lesson_active == 'pre_revision') {
                            // if(questions_posees.length == exercice_pre_questions.length) {
                            //     if(taux_de_vraie_reponse == 100) {
                            //         ecrire('notification_corps','\
                            //             '+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߊ߬ߣߍ߲߬\n\
                            //             ߞߎߘߎ߲߫ ߁߭ ߤߊ߲߯ ߞߎߘߎ߲߫ '+cercle_actif.html()+' ߠߎ߬ ߓߍ߯ ߓߘߊ߫ ߢߊߦߋ߫ ߌ ߓߟߏ߫\n\
                            //             ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߞߎߘߎ߲߫ '+cercle_actif.next().html()+' ߘߋ߲߰.\n\
                            //             ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹\n\
                            //             ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)\
                            //         ');
                            //     }
                            //     if(taux_de_vraie_reponse < 100) {
                            //         ecrire('notification_corps','\
                            //             '+liste_de_matieres[0][1]+' ߣߐ߰ߡߊ߬ߛߍߦߌ ߡߊ߫ ߢߊ߬\n\
                            //             ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߣߐ߰ߡߊ߬ߛߍߦߌ ߢߌ߲߬ ߘߐ߫.\n\
                            //             ߞߐߝߟߌ ߝߟߍ߫ ߘߎ߭ߡߊ߬ ߓߊ߫߹\n\
                            //             ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)\
                            //         ');
                            //     }
                            // }}
                        });
                    }
                    function assistantDePreExerciceTons() {}
                    function assistantDePreExerciceChiffres() {}
                }

                function syllabesActives() {
                    let sa = [];
                    syllabes_en_cours.forEach(element => { sa.push(element[0]); });
                    return sa;
                } 
            });
        }
        function revisionPreSyllabe() {
            $('#revision_bouton, #reprendre_revision_bouton, #continu_sur_revision_bouton').click(function(e) {
                e.stopImmediatePropagation();
             
                var matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom')); 
                var total_phase = $('.phases li').lenth;
                let syllabes_nouvellement_apprises = [];
                let syllabes_anciennement_apprises = [];
                var syllabes_a_reviser = [];
                var questions_revision = [];
            
                var nbr_max_de_questions_a_poser = 20;
                var question_revision = '', reponse_revision = [];
                var note_de_revision = 0;
                var moyenne_de_revision = 1 ;
                var compteur = incrementer();
                var revision_counter = 0;
                let good_response_counter = 0;
                
                var memoire_rang = [];
                    
                var q_total = parseIntNko(syllabes_en_cours.length);
                var q_index = 0, q_rang = '߭';
                var q_ordre = parseIntNko(q_index+1);
                var q_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                var q_rang = '߭';
                var q_actiom = 'ߟߊߡߍ߲߫';
                var revision_a_stocker = [];
                               
                lesson_active = 'pre_revision';

                chargerPreRevisionSyllabe();
                afficherRevision();
                preRevisionSyllabe();


                function chargerPreRevisionSyllabe() {

                    chargerPreRevisionSyllabeHead();
                    chargerPreRevisionSyllabeBody();
                    chargerPreRevisionSyllabeFoot();


                    function chargerPreRevisionSyllabeHead() {
                        $('.notification_titre').text('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ');
                        viderNotification();
                        setTimeout(() => { ecrire("notification_corps",texte_4); }, 2000);
                    }
                    function chargerPreRevisionSyllabeBody() {

                        var evaluation_body_html = revisionBodyHTML();
                        $('#revision_body').html(evaluation_body_html);

                        function revisionBodyHTML() {

                            syllabes_a_reviser = syllabesAReviser(); 
                            let rbh = lessonHTML(syllabes_a_reviser,'');
                            return rbh;

                            function syllabesAReviser() {

                                syllabes_nouvellement_apprises = syllabesNouvellementapprises();
                                syllabes_anciennement_apprises = syllabesAnciennementapprises();
                                let sar = [];

                                if(syllabes_anciennement_apprises.length == 0) {
                                    sar = malaxer(syllabes_nouvellement_apprises);
                                }else{
                                    let nouveaux_syllabes_melanges = malaxer(syllabes_nouvellement_apprises);
                                    let anciens_syllabes_melanges = malaxer(syllabes_anciennement_apprises);

                                    for(let i=0; sar.length<(7 + syllabes_nouvellement_apprises.length); i++) {
                                        if(paire(i) == true)  { sar.push(nouveaux_syllabes_melanges.pop()); }
                                        if(paire(i) == false) { sar.push(anciens_syllabes_melanges.pop()); }
                                    }
                                }

                                return sar;

                                function syllabesNouvellementapprises() {
                                    let nouvelles_syllabes = [];
                                    for(let i=0; i<pre_exercice_memoire.length; i++) {
                                        nouvelles_syllabes.push(pre_exercice_memoire[i][0]);
                                    }                            
                                    return nouvelles_syllabes;
                                }
                                function syllabesAnciennementapprises() {
                                    let anciennes_syllabes = [];

                                    if(memoire_syllabes_etudiees == null) anciennes_syllabes = syllabes_nouvellement_apprises;
                                    if(memoire_syllabes_etudiees != null) {
                                        for(let i=0; i<memoire_syllabes_etudiees.length; i++) {
                                            let ancien_syllabe = memoire_syllabes_etudiees[i][0];
                                            if(anciennes_syllabes.indexOf(ancien_syllabe) === -1) anciennes_syllabes.push(ancien_syllabe);
                                        }
                                    }
                                    return anciennes_syllabes;
                                }
                            }
                        }
                    }
                    function chargerPreRevisionSyllabeFoot() {

                        initialisationDEvaluationFoot();
                        
                        $('#revision_dialogue_btns').html('\
                        <div class="question_btn" id="revision_question_btn"></div> \
                        <div class="repetition_btn" id="revision_repetition_btn"></div> \
                        <div class="correction_btn" id="revision_correction_btn">ߏ߬ ߛߊߞߍ߫</div> \
                        '); 

                        $('#continu_sur_apprentissage_bouton').html('ߥߊ߫ ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߊߌ ߡߊ߬');
                        $('#reprendre_revision_bouton').html('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߌߦߌ ߞߍ߫ ߕߎ߲߯');
                        $('#evaluation_bouton').html('ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߍ߫');
                        $('#syllabe_bouton').html('ߞߊ߲ߡߊߛߙߋ ߘߊߡߌ߬ߘߊ߬');

                        function initialisationDEvaluationFoot(){
                
                            q_total = parseIntNko(syllabes_a_reviser.length);
                            q_index = 0;
                            q_ordre = parseIntNko(q_index+1);
                            q_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                            q_rang = '߭';
                            q_actiom = 'ߟߊߡߍ߲߫';
                            
                            $('#revision_question_btn').html(q_label+' '+q_total+' \\ '+q_ordre+q_rang+' '+q_actiom);
                            $('#revision_repetition_btn').html(q_label+' '+q_ordre+q_rang+' ߠߊߡߎ߲߫ ߕߎ߲߯');
                            $('#revision_correction_btn').html('ߏ߬ ߛߊߞߍ߫');
                        }
                    }
                }
                function preRevisionSyllabe() {

                    let clicked_response_element = '';

                    questions_revision = malaxer(syllabes_a_reviser);
                    revision_a_stocker = initialiserDataAStocker(questions_revision);

                    gestionDeDialogueBtns();
                    poserQuestionRevision();
                    repeterQuestionRevision();
                    repondreQuestionRevision();
                    correctionRevision();
                    
                    
                    function poserQuestionRevision() {
                        $('#revision_question_btn').on('click', function(e){
                            e.stopImmediatePropagation();

                            question_revision = questions_revision[q_index];
console.log(question_revision);                     
                            dicterLaQuestion();
                            // memoriserQuestionRang();
                            actualiserLesLibellesDeDialogueBtn();

                            
                            function actualiserLesLibellesDeDialogueBtn() {
                                q_index = compteur();
                                q_ordre = parseIntNko(q_index+1);
                                q_rang = (q_index == 0) ? '߭' : '߲';
                                $('.question_btn').html(q_label+' '+q_total+' \\ '+q_ordre+q_rang+' ߠߊߡߍ߲߫');
                                $('.repetition_btn').html(q_label+' '+parseIntNko(q_index)+q_rang+' ߠߊߡߎ߲߫ ߕߎ߲߯');
                            }
                            function dicterLaQuestion(){ lireLettre('ߊ',question_revision); }
                            function memoriserQuestionRang(){
                                memoire_rang[memoire_rang.length] = q_ordre+q_rang;
                                return memoire_rang;
                            }
                        });
                    }
                    function repeterQuestionRevision() {
                        $('#revision_repetition_btn').on('click', function(){
                            lireLettre('ߊ',question_revision);
                        });
                    }
                    function repondreQuestionRevision() {
                        $('#revision_body table td').on('click', function(e){
                            e.stopImmediatePropagation();
   
                            clicked_response_element = $(this);
                            if(question_revision == '') rappel($('#evaluation_dialogue_btn'));
                            if(question_revision != '') { 
                                reponse_revision = $(this).text(); 
                                marquerLaConsonneCliquee(clicked_response_element);
                            }
                        });
                    }
                    function correctionRevision() {
                        $('#revision_correction_btn').click(function(e){
                            e.stopImmediatePropagation();

                            if(q_index <= questions_revision.length) {
                                    
                                let q = question_revision;
                                let r = reponse_revision;
                                let p = (q == r) ? 1:0;
                                let question_reponse = [q,r,p];
                                    
                                note_de_revision += p; 
                                revision_counter++;
                                
                                marquerReponse(clicked_response_element,question_revision);
                                enregistrerRevisionSyllabe();
                                progressBarPreRevisionSyllabe();
                                finDePreRevisionSyllabe();
            
                                  
                                function enregistrerRevisionSyllabe() { 
                                    revision_a_stocker.splice(revision_counter-1,1,question_reponse);
                                }
                                function progressBarPreRevisionSyllabe() {
                            
                                    let progress_unity = 100/questions_revision.length;
                                            
                                    if(question_revision == '') return;
                                    if(question_revision != '') {
                                        actualiserLessonProgressBar();
                                        
                                        function actualiserLessonProgressBar(){
                                    
                                            let bar_width = revision_counter*progress_unity;
           
                                            $('.progress_mauvaise_reponse_bar').css('width', bar_width+'%');
                                            if(question_revision == reponse_revision) { 
                                                good_response_counter++;
                                                let good_response_width = good_response_counter*progress_unity;
                                                $('.progress_bonne_reponse_bar').css('width', good_response_width+'%');
                                            }
                        
                                            question_revision = ''; //Vider la variable question_revision après son utilisation.
                                        }
                                    }
                                }
                                function finDePreRevisionSyllabe() {
                                    if(q_index === questions_revision.length) {

                                        let note_de_revision = calculerNote(revision_a_stocker);

                                        stockerPreRevisionSyllabe();
                                        afficherRevisionRedirectionBtn();
                                        continuSurApprentissagePreSyllabe();
                                        evaluationPreSyllabe();
                                        apprentissageDeTons();
                                        initialiserExercice();

                                        
                                        function stockerPreRevisionSyllabe() {
                                            if(note_de_revision === 100) {
                                                
                                                memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? consonnes_choisies : memoire_consonnes_choisies.concat(consonnes_choisies);
                                                memoire_syllabes_etudiees = (memoire_syllabes_etudiees == null) ? syllabes_en_cours : memoire_syllabes_etudiees.concat(syllabes_en_cours);
            
            
                                                sessionStorage.setItem('revision_a_stocker', JSON.stringify(revision_a_stocker));
                                                localStorage.setItem('memoire_consonnes_choisies', JSON.stringify(memoire_consonnes_choisies));
                                                localStorage.setItem('memoire_syllabes_etudiees', JSON.stringify(memoire_syllabes_etudiees));
                                            }
                                        }
                                        function afficherRevisionRedirectionBtn() {
                                            $('#revision_dialogue_btns').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫');
                                            setTimeout(() => { 

                                                masquer($('#revision_progress_bar'));
                                                displayv($('#revision_redirection_btns'));

                                                if(memoire_consonnes_choisies.length < 19) {
                                                    if(note_de_revision < 100) {
                                                        masquer($('#continu_sur_apprentissage_bouton'));
                                                        displayv($('#reprendre_revision_bouton'));
                                                        masquer($('#evaluation_bouton'));
                                                        indexer($('#reprendre_revision_bouton'));
                                                    }
                                                    if(note_de_revision === 100) {
                                                        displayv($('#continu_sur_apprentissage_bouton'));
                                                        masquer($('#reprendre_revision_bouton'));
                                                        masquer($('#evaluation_bouton'));
                                                        indexer($('#continu_sur_apprentissage_bouton'));
                                                    }
                                                }
                                                if(memoire_consonnes_choisies.length === 19) {
                                                    if(note_de_revision === 100) {
                                                        masquer($('#continu_sur_apprentissage_bouton'));
                                                        masquer($('#reprendre_revision_bouton'));
                                                        displayv($('#evaluation_bouton'));
                                                        indexer($('#evaluation_bouton'));
                                                    }
                                                }
                                                masquer($('#syllabe_bouton'));
                                            }, 800);
                                        }
                                        function continuSurApprentissagePreSyllabe() {
                                            $('#continu_sur_apprentissage_bouton').click(() => { raffraichirLaPage(); });
                                        }
                                        function evaluationPreSyllabe() {}
                                        function apprentissageDeTons() {}
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
        function evaluationPreSyllabe() {
            $('#evaluation_bouton').click(function() {
 
                var matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom')); 
                var total_phase = $('.phases li').lenth;
                var questions_revision = [];
            
                var nbr_max_de_questions_a_poser = 20;
                var question_revision = '', reponse_revision = [];
                var note_de_revision = 0;
                var moyenne_de_revision = 1 ;
                var compteur = incrementer();
                var revision_counter = 0;
                let good_response_counter = 0;
                
                var memoire_rang = [];
                    
                var q_total = parseIntNko(syllabes_en_cours.length);
                var q_index = 0, q_rang = '߭';
                var q_ordre = parseIntNko(q_index+1);
                var q_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                var q_rang = '߭';
                var q_actiom = 'ߟߊߡߍ߲߫';
                var revision_a_stocker = [];
                               
                lesson_active = 'pre_revision';

                chargerPreRevisionSyllabe();
                afficherPreRevisionSyllabe();
                preRevisionSyllabe();
                assistantPreRevisionSyllabe();


                function chargerPreRevisionSyllabe() {

                    chargerPreRevisionSyllabeHead();
                    chargerPreRevisionSyllabeFoot();
                    chargerPreRevisionSyllabeBody();

                    function chargerPreRevisionSyllabeHead() {
                        $('.notification_titre').text('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ');
                        ecrire("notification_corps",texte_4);
                    }
                    function chargerPreRevisionSyllabeFoot() {
                        initialisationDEvaluationFoot();

                        function initialisationDEvaluationFoot(){
                
                            q_total = parseIntNko(syllabes_en_cours.length);
                            q_index = 0;
                            q_ordre = parseIntNko(q_index+1);
                            q_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                            q_rang = '߭';
                            q_actiom = 'ߟߊߡߍ߲߫';
                            
                            $('.question_label').html( q_label );
                            $('.question_total').html( q_total );
                            $('.question_ordre').html( q_ordre+q_rang );
                            $('.question_action').html( q_actiom );
                    
                            $('.question_btn').css('display','block');
                            $('.repetition_btn').css('display','none');
                            $('.correction_btn').css('display','none');
                        }
                    }
                    function chargerPreRevisionSyllabeBody() {
                        var evaluation_tbody_default_message = 'ߜߋ߲߭ ߡߊ߬ߛߍ߬ߦߌ߬ߟߌ ߞߐߝߟߌ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬.';
                        $('#evaluation_tbody').html("<p id='evaluation_tbody_default_content'>"+evaluation_tbody_default_message+"</p>");
                    }
                }
                function afficherPreRevisionSyllabe() {
                    
                    masquer($('.course'));

                    $('#pratique_options').css('display','block');
                    $('.fermeture').attr('id', 'fermer_revision'); 

                    $('#exercice_body').css('display','none');
                    $('#apprentissage_container').css('display','none');
                    $('#exercice_container').css('display','none');
                    $('#evaluation_container').css('display','block');
                    $('#evaluation_dialogue_btn').css('display','block');
                    
                    $('.redirection_btns').css('display','none');

                    setTimeout(() => { afficher($('.course')); }, 100);
                }
                function preRevisionSyllabe() {

                    questions_revision = questionsRevision();
                    revision_a_stocker = initialiserRevisionSyllabeAStocker();
                   
                    poserQuestionRevision();
                    repeterQuestionRevision();
                    repondreQuestionRevision();
                    rectificationDeReponseRevision();
                    correctionRevision();
                    
                    
                    function poserQuestionRevision() {
                        $('.question_btn').on('click', function(e){
                            e.stopImmediatePropagation();

                            effacerPrecedenteReponse();
                            question_revision = questions_revision[q_index]; 
    // alert(question_revision);                   
    console.log(question_revision);                   
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

                            
                            function effacerPrecedenteReponse() {
                                reponse_revision.splice(0, reponse_revision.length); 
                                $('#evaluation_reponse').html(reponse_revision); 
                            }
                            function actualiserLesLibellesDeDialogueBtn(){
                                
                                $('.question_ordre').html(q_ordre+q_rang);
                                $('.question_action').html('ߠߊߡߍ߲߫');
                                
                                $('.question_btn').css('display','none');
                                $('.repetition_btn').css('display','block');
                                $('.correction_btn').css('display','none');
                            }
                            function dicterLaQuestion(){ lireLettre('alphabet',question_revision); }
                            function afficherTesteContainer() { $('#teste_container').css({'top':'-6rem'}); }
                            function memoriserQuestionRang(){
                                memoire_rang[memoire_rang.length] = q_ordre+q_rang;
                                return memoire_rang;
                            }
                        });
                    }
                    function repeterQuestionRevision() {
                        $('.repetition_btn').on('click', function(){
                            lireLettre('alphabet',question_revision);
                        });
                    }
                    function repondreQuestionRevision() {
                        $('#clavier_nko td').on('click', function(e){
                            e.stopImmediatePropagation();
   
                            if(question_revision == '') rappel($('#evaluation_dialogue_btn'));
                            if(question_revision != '') {
                                
                                var caractere = $(this).text();
                                
                                reponse_revision.push(caractere);
                                $('#evaluation_reponse').html(reponse_revision);
                                afficherCorrectionButton();
                                
                                function afficherCorrectionButton(){
                                    $('.question_btn').css('display','none');
                                    $('.repetition_btn').css('display','none');
                                    $('.correction_btn').css('display','block');
                                }
                            }
                        });
                    }
                    function rectificationDeReponseRevision() {
                        $('#correcteur_d_evaluation').on('click',function() {
                            reponse_revision.pop();
                            $('#evaluation_reponse').html(reponse_revision);
                        });
                    }
                    function correctionRevision() {
                        var evaluation_html = '';

                        $('.correction_btn').click(function(e){
                            e.stopImmediatePropagation();

                            if(q_index <= questions_revision.length) {
                                    
                                let q = question_revision;
                                let r = reponse_revision.join('');
                                let p = (q == r) ? 1:0;
                                let question_reponse = [q,r,p];
                                    
                                note_de_revision += p; 
                                
                                chargerInstantannementRevisionTbody();
                                marquerReponseRevision();
                                effacerCheckMark(); 
                                masquerTesteContainer();
                                enregistrerRevisionSyllabe();
                                progressBarPreRevisionSyllabe();
                                finDePreRevisionSyllabe();
                                afficherQuestionButton();
                                setTimeout(() => { defilementDuContenuVersLeHaut($('#evaluation_tbody')); }, 1300);
            
                                revision_counter++;
            
                                function chargerInstantannementRevisionTbody() {
            
                                    var n = parseIntNko(revision_counter+1);
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
            
                                    setTimeout(() => {
                                        $('#evaluation_tbody').html(evaluation_html);
                                        $('#evaluation_total_point').html(parseIntNko(note_de_revision));
                                        $('#evaluation_pourcentage_point').html('%'+parseIntNko(note_de_revision*100/question_revision.length));
                                    }, 1250);
                                }                                    
                                function marquerReponseRevision() {    
                                    if(reponse_revision.join('') == question_revision) {
                                        
                                        $("#evaluation_reponse").html("<p id='bonne_reponse'>"+reponse_revision.join('')+"</p><div id='check_mark_container'> <p id='check_mark'></p> <p id='check_mark_cover'></p> </div>");
                                        $('#check_mark_container').css({'display':'inline-block', 'margin-right':'4px'});
                                        $('#check_mark_cover').css({'right':'0.25rem'});
                                        $('#check_mark').html("&#10003;"); 
                                        setTimeout(function(){ $('#check_mark_cover').css({'right':'2rem'}); },100);
                                        setTimeout(function(){ $('#check_mark_container').css({'display':'none'}); },1000);
                                    }else{
                                        $("#evaluation_reponse").html("<p id='mauvaise_reponse'>"+reponse_revision.join('')+"</p><p id='evaluation_cross'>&#10060;</p>");
                                        $('#evaluation_cross').css({'display':'block', 'right':reponse_revision.join('').length/2+'rem', 'transform':'scale(0.5)', 'opacity':0});
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
                                function enregistrerRevisionSyllabe() { 
                                    revision_a_stocker.splice(revision_counter,1,question_reponse);
                                }
                                function progressBarPreRevisionSyllabe() {
                            
                                    let progress_unity = 100/questions_revision.length;
                                            
                                    if(question_revision == '') return;
                                    if(question_revision != '') {
                                        actualiserLessonProgressBar();
                                        
                                        function actualiserLessonProgressBar(){
                                    
                                            let bar_width = revision_counter*progress_unity;
            
                                            $('.progress_mauvaise_reponse_bar_integre').css('width', bar_width+'%');
                                            if(question_revision == reponse_revision.join('')) { 
                                                good_response_counter++;
                                                let good_response_width = good_response_counter*progress_unity;
                                                $('.progress_bonne_reponse_bar_integre').css('width', good_response_width+'%');
                                            }
                        
                                            question_revision = ''; //Vider la variable question_revision après son utilisation.
                                        }
                                    }
                                }
                                function finDePreRevisionSyllabe() {
                                    if(q_index === questions_revision.length) {

                                        stockerPreRevisionSyllabe();
                                        setTimeout(() => { afficherRedirection2(); }, 600);
                                        
                                        $('.redirection_btn_2').click(function() { 
                                            $('#syllabes_apprentissage').click();
                                            initialiserProgressBarIntegre();
                                            setTimeout(() => { afficherApprentissage(); }, 300); 
                                        });
                                        
                

                                        function stockerPreRevisionSyllabe() {
        
                                            memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? consonnes_choisies : memoire_consonnes_choisies.concat(consonnes_choisies);
                                            memoire_syllabes_etudiees = (memoire_syllabes_etudiees == null) ? syllabes_en_cours : memoire_syllabes_etudiees.concat(syllabes_en_cours);
        
                                            sessionStorage.setItem('revision_a_stocker', JSON.stringify(revision_a_stocker));
                                            localStorage.setItem('memoire_consonnes_choisies', JSON.stringify(memoire_consonnes_choisies));
                                            localStorage.setItem('memoire_syllabes_etudiees', JSON.stringify(memoire_syllabes_etudiees));
                                        }
                                        function afficherRedirection1() {
                                            $('#evaluation_dialogue_btn').css('display','block');
                                            
                                            $('.progress_bar_integre').css('display','none');
                                            $('.question_btn').css('display','none');
                                            $('.repetition_btn').css('display','none');
                                            $('.correction_btn').css('display','none');
                                            $('.redirection_btns').css('display','block');
                                            
                                            $('.redirection_btn_1').css('display','block');
                                            $('.redirection_btn_2').css('display','none');
                                        }
                                        function afficherRedirection2() {
                                            $('#evaluation_dialogue_btn').css('display','block');
                                            
                                            $('.progress_bar_integre').css('display','none');
                                            $('.question_btn').css('display','none');
                                            $('.repetition_btn').css('display','none');
                                            $('.correction_btn').css('display','none');
                                            $('.redirection_btns').css('display','block');
                                            
                                            $('.redirection_btn_1').css('display','none');
                                            $('.redirection_btn_2').css('display','block');
                                        }
                                    }
                                }
                                function afficherQuestionButton(){
                                    if(q_index < questions_revision.length) {
                                        $('.correction_btn').css('display','none');
                                        $('.question_btn').css('display','block');
                                        $('.repetition_btn').css('display','none');
                                    }
                                }
                            }
                        });

                    }
                    function questionsRevision() {
                        let qr = [];
                        for(let i=0; i<syllabes_en_cours.length; i++) {
                            qr.push(syllabes_en_cours[i][0]);
                        }
                        qr = malaxer(qr);
                        return qr;
                    }
                    function initialiserRevisionSyllabeAStocker() {
                        let data = [];
                        for(let i=0; i<questions_revision.length; i++) {
                            let qr = questions_revision[i];
                            let rr = '';
                            let pr = 0;
                            data.push([qr, rr, pr]);
                        }
                        return data;
                    }
                }
                function assistantPreRevisionSyllabe() {}
                function initialiserSyllabesRevisees() {

                }
            });
        }
    }
    function apprendreSyllabe() {}
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
        $('#apprentissage_dialogue_btns').css('display','block');
        $('#apprentissage_progress_bar').css('display','none');
        $('#apprentissage_redirection_btns').css('display','none');
        
        $('#afficheur_de_panneau').css({'opacity':1, 'transform':'scale(1)'});
        rendreActif($('#afficheur_de_panneau'));
    }
    function afficherPreExerciceBtn() {  
        $('#apprentissage_dialogue_btns').css('display','none');
        $('#apprentissage_progress_bar').css('display','none');
        $('#apprentissage_redirection_btns').css('display','block');

        $('#pre_apprentissage_bouton').css('display','none');
        $('#continu_sur_exercice_bouton').css('display','block');
        $('#evaluation_bouton').css('display','none');
        indexer($('#continu_sur_exercice_bouton'));
    }                  
    function afficherPreRevisionBtn() {  
        $('#pre_apprentissage_dialogue_btn').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');
        $('.progress_bar').css('display','none');

        $('.progress_bar_integre').css('display','block');
        $('#pre_apprentissage_btns').css('display','none');
        // $('#redirection_btns').css('display','block');

        $('#exercice_bouton').css('display','none');
        $('#evaluation_bouton').css('display','block');
    }                    
    function afficherRepriseBtn() {  
        $('#pre_apprentissage_dialogue_btn').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');

        $('.progress_bar_integre').css('display','block');
        $('#pre_apprentissage_btns').css('display','none');
        $('#redirection_btns').css('display','block');
        
        $('#exercice_bouton').css('display','block');
        $('#evaluation_bouton').css('display','none');
    }                    
    function afficherAvanceBtn() {  
        $('#pre_apprentissage_dialogue_btn').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');

        $('.progress_bar_integre').css('display','block');
        $('#pre_apprentissage_btns').css('display','none');
        $('#redirection_btns').css('display','block');
        
        $('#exercice_bouton').css('display','none');
        $('#evaluation_bouton').css('display','block');
    }                    
    function afficherPreExerciceBtns() {
        $('#pre_apprentissage_dialogue_btn').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');

        $('.progress_bar_integre').css('display','none');
        $('#exercice_btns').css('display','block');
        $('#pre_apprentissage_btns').css('display','none');
        $('#redirection_btns').css('display','none');
    }                      
    function afficherProgressBarIntegre() {
        $('#pre_apprentissage_dialogue_btn').css('display','block');
        $('#apprentissage_dialogue_btn').css('display','none');

        $('.progress_bar_integre').css('display','block');
        $('#pre_apprentissage_btns').css('display','none');
        $('#redirection_btns').css('display','none');
    }                     
    function afficherDialogueBtn() {
        $('.dialogue_btn').css('display','block');
    }                     
    function afficherProgressBar() {
        $('.progress_bar').css('display','block');
    }                    
    function initialiserExercice() { 

        questions_posees.splice(0,questions_posees.length); 
        nbr_bonne_reponse = 0;
        nbr_mauvaise_reponse = 0;
        taux_de_fausse_reponse = 0;
        taux_de_vraie_reponse = 0;
        taux_de_vraie_reponse = 0;
        point_total = 0;
    }                     
    function initialiserExerciceResultat() { 

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
    function raffraichissementDeLaPage() {
        $('#fermer_pre_apprentissage, #fermer_apprentissage').on('click',function() { raffraichirLaPage(); });
    }
}