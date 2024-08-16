function syllabe() {

    var nom = JSON.parse(sessionStorage.getItem('nom'));
    var prenom = JSON.parse(sessionStorage.getItem('prenom'));
    var id = JSON.parse(sessionStorage.getItem('id'));
    var lesson_option = $('#lesson_option').text();  
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    var lesson_option = parseInt(JSON.parse(sessionStorage.getItem('lesson_option')));

    var table_id = $('.table_parlante').attr('id');
        
    var table = $('#'+table_id); 
    var tr = $('#'+table_id+' tr');
    var td = $('#'+table_id+' td');
    var nbr_table = table.length;
    var nbr_tr = tr.length;
    var nbr_td = td.length;

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
    let taux_de_vraie_reponse_1 = 0;
    let taux_de_vraie_reponse_2 = 0;
    let point_total = 0;

    let total_lettres_exercees = [];


    var apprentissage_clicks_memo = [];
    let nbr_raisonnable_de_click = 1;
    let clicked_elements_quantity = 0;

    
    if(niveau_actif <= 2) {
        switch(lesson_option) {
            case 1 : preApprendreSyllabe(); break;
            case 2 : apprendreSyllabe(); break;
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
        
        let rang = '';
        let les_lettres_actives = [];
        let lettres_pre_apprises = [];
        let total_lettres_apprises = [];
        let pre_apprentissage_memo = [];
        let pre_apprentissage_clicks_memo = [];
        let quantite_normale_de_click = 1;

        let panneau_status = "masque";
        let consonnes_choisies = [];
        let syllabes_en_cours = [];
        let memoire_consonnes_choisies = JSON.parse(localStorage.getItem('memoire_consonnes_choisies'));
        let memoire_syllabes_etudiees = JSON.parse(localStorage.getItem('memoire_syllabes_etudiees'));

// localStorage.removeItem('memoire_consonnes_choisies'); 
// localStorage.removeItem('memoire_syllabes_etudiees'); 

//   console.log('memoire_consonnes_choisies : '+memoire_consonnes_choisies.length);
//   console.log('memoire_syllabes_etudiees : '+memoire_syllabes_etudiees.length);
        
        $('#pre_exercice_cover').css('display','none');
        $('#apprentissage_container').css('display','block');
        $('#exercice_container').css('display','none');
        $('#evaluation_container').css('display','none');
        afficherCourse($('.course'));

        apprentissagePreSyllabe();
        exercicePreSyllabe();
        revisionPreSyllabe();
        evaluationPreSyllabe();

        function apprentissagePreSyllabe() {

            chargerApprendrePreSyllabe();
            afficherApprendrePreSyllabe();
            apprendrePreSyllabe();
            assistantApprendrePreSyllabe();


            function chargerApprendrePreSyllabe() {

                chargerEnteteDePreSyllabe();
                chargerFootDePreSyllabe();
                chargerCorpsDePreSyllabe();

                
                function chargerEnteteDePreSyllabe() {
                    $('.notification_titre').html('ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                }
                function chargerFootDePreSyllabe() {
                            
                    var panneaux_des_lettres_html = panneauxDesLettresHTML();
                    var pre_lesson_head_12_html = "\
                        <div class='titre_de_parti'>\
                            <div>ߞߎߘߎ߲</div>\
                            <div class='cercle' id='afficheur_de_panneau'>+</div>\
                        </div>\
                        <div id='panneaux'>"+panneaux_des_lettres_html+"</div>\
                    ";
                    var pre_lesson_head_22_html = preExercicesBtnHTML();

                    $('#pre_apprentissage_btns' ).html(pre_lesson_head_12_html);
                    $('#pre_exercice_btns' ).html(pre_lesson_head_22_html);
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
                    function preExercicesBtnHTML() {
                        let html = "\
                            <span class='pre_exercice_btn' id='pre_exercice_bouton'>ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</span>  \
                            <span class='pre_exercice_btn' id='pre_revision_bouton'>ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫</span>  \
                        ";
                        return html;
                    }
                }
                function chargerCorpsDePreSyllabe() {
                    let panneau_consonnes_index = [];

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
                            var clicked_consonne_index = $(this).index();
                            var clicked_consonne_color = $(this).css('color');
                            let panneau_consonne_index = consonnes_choisies.indexOf(clicked_consonne);

                            if(panneau_consonne_index == '-1') { consonnes_choisies.push(clicked_consonne); }
                            if(panneau_consonne_index != '-1') { consonnes_choisies.splice(panneau_consonne_index, 1); }
                         
                            panneau_consonnes_index.push(clicked_consonne_index);
                            if(clicked_consonne_color == 'rgb(255, 165, 0)') { 
                                alert('ߛߌ߬ߙߊ߬ߕߊ ߏ߬ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰ߣߍ߲߬ ߞߘߐ ߟߋ߬߹');
                                return; 
                            }

                            marquerLaConsonneCliquee();
                            decocherLesConsonnes();
                            decocherLaNasalisation();
                            afficherTableauNoir();
                            effacerTableau();
                            stylesDesSyllabes();
                            progressBarrApprendrePreSyllabe();

                        
                            function marquerLaConsonneCliquee() {
                                var bc = clicked_consonne_container.css('background-color');
                                var consonne_background = (bc == 'rgb(170, 170, 170)') ? '#fff' : 'rgb(170, 170, 170)';
                                clicked_consonne_container.css('background-color',consonne_background);
                            }
                            function decocherLesConsonnes() {
                                if($('#consonnes_checker').find('.checkbox_parent').prop("checked") == true) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }            
                            }
                            function decocherLaNasalisation() {
                                if($('#nasalisation_checker').find('.check_btn:last-child input').prop("checked") == true) { $('#nasalisation_checker').find('.check_btn:last-child label').click(); }            
                            }
                            function chargerTableauNoir() {
                                $.each($('.check_btn'), function(){
                                    var consonne_active = $('label', this);
                                    var consonne_corespondante = consonne_active.html();

                                    if(clicked_consonne == consonne_corespondante) { consonne_active.click(); }
                                });
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
                                            reAfficherDialogueBtn();

                                            function reAfficherDialogueBtn() {
                                                if(total_clicks_normal === (td.length)*quantite_normale_de_click) {
                                                    setTimeout(() => {
                                                        initialiserProgressBar();
                                                        $('.progress_bar_integre').css('display','none');
                                                        $('#pre_apprentissage_dialogue_btn').css('display','block');
                                                        $('#apprentissage_dialogue_btn').css('display','none');
                                                    }, 1000); 
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
                                    $('#pre_apprentissage_dialogue_btn').css('display','none');
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
                                            td_actif.css({ 'background-color':'transparent', 'color':'yellow' });
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
                
                afficherDialogueBtn();
                afficherLePanneauDesConsonnes();
                masquerLePanneauDesConsonnes();

                    
                function afficherDialogueBtn() {
                    $('#pre_apprentissage_btns').css('display','block');
                    $('#pre_apprentissage_dialogue_btn').css('display','block');
                    $('#apprentissage_dialogue_btn').css('display','none');
                    $('#pre_exercice_btns').css('display','none');
                }
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
                    $('#submit_panneau, .table_parlante').on('click', masquerPanneau);
                }
            }
            function apprendrePreSyllabe() {           
                $('#panneaux span').on('click', function() {

                    let td = $('.table_parlante td');
                    let compteur_de_syllabe = 0;

                    initialiserSyllabePreAppriseMemoire();

                    $.each(td, function(){         
                        let compteur_td_click = 0;
                        $(this).click(function() {
      
                            let td_actif = $(this);
                            let tr_index = td_actif.parent().index();
                            let td_index = td_actif.index() + tr_index*7;
                            let syllabe_clique = td_actif.text();

                            compteur_td_click++;

                            masquerPanneau(); 
                            lire('ߊ',syllabe_clique); 
                            enregistrerApprendrePreSyllabe();
                            stockerApprendrePreSyllabe();
                            finDeApprendrePreSyllabe();

                            
                            function enregistrerApprendrePreSyllabe() {
                        
                                let mark = (compteur_td_click >= quantite_normale_de_click) ? 1 : 0;
                                
                                syllabes_en_cours.splice(td_index,1,[syllabe_clique,compteur_td_click,mark]);

                                if(compteur_td_click === quantite_normale_de_click) { compteur_de_syllabe++; }
                                if(syllabes_en_cours.length === compteur_de_syllabe) {

                                    memoire_syllabes_etudiees = (memoire_syllabes_etudiees == null) ? syllabes_en_cours : memoire_syllabes_etudiees.concat(syllabes_en_cours);
                                    memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? consonnes_choisies : memoire_consonnes_choisies.concat(consonnes_choisies);

                                    localStorage.setItem('memoire_syllabes_etudiees', JSON.stringify(memoire_syllabes_etudiees));
                                    localStorage.setItem('memoire_consonnes_choisies', JSON.stringify(memoire_consonnes_choisies));
                                }
                            }
                            function stockerApprendrePreSyllabe() {
                                if(syllabes_en_cours.length === compteur_de_syllabe) {
                console.log('consonnes_choisies : '+consonnes_choisies);
                console.log('memoire_syllabes_etudiees : '+memoire_syllabes_etudiees);
                                }
                            }
                            function finDeApprendrePreSyllabe() {

                                if(syllabes_en_cours.length === compteur_de_syllabe) {

                                    // resultatApprentissagePreSyllabe();
                                    exercerPreSyllabe();

                                    function resultatApprentissagePreSyllabe() {
                                    
                                        chargerResultat(syllabes_en_cours);
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
                                    function exercerPreSyllabe() {
                                        afficherExerciceBtn();
                                        $('#avance').click(function() {
                                            $('#apprentissage, #envelope').css('display','none');
                                            afficherCourse($('#exercice'));
                                            exercicePreSyllabe();
                                            $('#pre_exercice_bouton').click();
                                        });
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
                    } 
                });
            }
            function assistantApprendrePreSyllabe() {
                
                setTimeout(() => {
                    ecrire("notification_corps","ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬.");
                }, 1000);

                montrer($('#afficheur_de_panneau'));

                $('#afficheur_de_panneau').click(function() {
                    if(panneau_status == "affiche") {
                        ecrire("notification_corps","ߛߌ߬ߙߕߊ߬ ߞߋߟߋ߲߫ ߥߟߊ ߛߌߦߊߡߊ߲߫ ߛߎߥߊ߲ߘߌ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰.");
                    }
                });

                $('#afficheur_de_panneau, #panneaux, #submit_panneau').click(function() {
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
            function afficherPanneau(){
                $('#panneaux').css('height','17rem');
                $('#consonnes_cadre').animate({'top':0}, 250);
                panneau_status = "affiche";
            }
            function masquerPanneau(){
                $('#consonnes_cadre').animate({'top':'12rem'}, 250);
                setTimeout(function(){$('#panneaux').css('height',0);}, 250);
                panneau_status = "masque";
            }
        }
        function exercicePreSyllabe() {
            $('#pre_exercice_bouton').click(function() {
                
                lesson_active = 'pre_exercice';  
                sessionStorage.setItem('lesson_active', JSON.stringify(lesson_active)); 
                $('.fermeture_pre').attr('id','fermeture_pre_exercice');
                
                masquerPreApprentissage();
                afficherPreExercice();
                zoomDown($('.dialogue_btn'));
                initialiserExerciceResultat();
                exercice_btn_id = $(this).attr('id');
                syllabes_en_cours = syllabesEnCours();
                exercice_pre_questions = malaxer(malaxer(syllabes_en_cours));

                preExerciceEnteteStyle();
                exercice();

                function masquerPreApprentissage() { 
                    masquerCourse($('#apprentissage_body'));
                }
                function afficherPreExercice() {
                    $('#pre_exercice_cover').css('display','block');
                    afficherCourse($('#pre_exercice'));
                }
                function preExerciceEnteteStyle() {
                    $('#pre_revision_bouton').removeClass('exercice_en_cours');
                }
                function syllabesEnCours() {
                    let sec = [];
                    syllabes_en_cours.forEach(element => { sec.push(element[0]); });
                    return sec;
                }
            });
        }
        function revisionPreSyllabe() {
            $('#pre_revision_bouton').click(function() {
                
                lesson_active = 'pre_revision';  
                exercicePreSyllabe();
            });
        }
        function exercice(){

            chargerPreExerciceSyllabe();
            afficherPreExerciceSyllabe();
            exercicerSyllabe();
            enregistrerPreExerciceSyllabe();
            progressBarrPreExerciceSyllabe();
            stockerPreExerciceSyllabe();
            assistantPreExerciceSyllabe();
            finDePreExerciceSyllabe();


            function chargerPreExerciceSyllabe() {
                if(niveau_actif === 2) {

                    chargerEnteteDePreExerciceSyllabe();
                    chargerPiedDePreExerciceSyllabe();
                    chargerCorpsDePreExerciceSyllabe();
                
                    function chargerEnteteDePreExerciceSyllabe() {
                        if(lesson_active == 'pre_exercice') {
                            $('.notification_titre').html('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ');
                        }
                        if(lesson_active == 'pre_revision') {
                            $('.notification_titre').html('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ</h3>');
                        }
                    }
                    function chargerPiedDePreExerciceSyllabe() {
   
                        let pre_questions = [];

                        if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                        if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                        total_questions = pre_questions.length;
                        
                        var pre_exercice_foot_html = '\
                            <div id="apprentissage_foot_btns_container"> \
                                <div id="pre_exercice_foot_btns"> \
                                    <div id="pre_question_btn">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(pre_questions.length)+' \\ ߁߭ ߟߊߡߍ߲߫</div> \
                                    <div id="repeter_pre_question_btn"></div> \
                                    <div id="pre_correction_btn">ߏ߬ ߛߊߞߍ߫</div> \
                                </div> \
                            </div> \
                        ';
    
                        $('#pre_exercice_foot').html(pre_exercice_foot_html);
                    }
                    function chargerCorpsDePreExerciceSyllabe() {
                        var pre_exercice_body_html = '';
            
                        if(lesson_active == 'pre_exercice') { pre_exercice_body_html = lessonHTML(exercice_pre_questions, ''); }
                        if(lesson_active == 'pre_revision') { pre_exercice_body_html = lessonHTML(revision_pre_questions, ''); }
                        $('#pre_exercice_body').html(pre_exercice_body_html);
                    }  
                }
            }
            function afficherPreExerciceSyllabe() {
                if(niveau_actif === 2) {

                    afficherEnteteDePreExerciceAlphabet();
                    afficherPiedDePreExerciceAlphabet();
                    afficherCorpsDePreExerciceAlphabet();
                

                    function afficherEnteteDePreExerciceAlphabet() {}
                    function afficherPiedDePreExerciceAlphabet() {}
                    function afficherCorpsDePreExerciceAlphabet() {
                            
                        afficherPreExerciceCadres();
                        afficherPreExerciceContenus();
                        gestionDeExerciceFootBtn();
            
            
                        function afficherPreExerciceCadres() {
                            $('#pre_exercice_cover').css({'display':'block'}); 
                            masquerCourse($('#pre_exercice'));
                            setTimeout(function() { afficherCourse($('#pre_exercice')); }, 200); 
                        }
                        function afficherPreExerciceContenus() {
            
                            afficherExerciceDeLaLigneEnCours();
                            afficherExerciceDeToutesLesLignesEtudiees();
                                
                            function afficherExerciceDeLaLigneEnCours() {
                            if(lesson_active == 'pre_exercice') {
                                setTimeout(function() { affichageAnimeDesTd($('#pre_exercice_body td')); }, 300); 
                            }}
                            function afficherExerciceDeToutesLesLignesEtudiees() {
                            if(lesson_active == 'pre_revision') {
                                setTimeout(function() { affichageAnimeDesTr($('#pre_exercice_body tr')); }, 300); 
                            }}
                        }
                        function gestionDeExerciceFootBtn() {

                            let pre_questions = [];
        
                            if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                            if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                            total_questions = pre_questions.length;

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
                                }, 200);
                            });

                            $('#pre_exercice_body td').click(function() {
                            
                                if(pre_question === '') { return; }
                                $('#pre_question_btn').css('display','none');
                                $('#repeter_pre_question_btn').css('display','none');
                                setTimeout(() => { 
                                    montrer($('#pre_correction_btn'));
                                    $('#pre_correction_btn').css('display','block'); 
                                }, 200);
                            });

                            $('#pre_correction_btn').click(function() { 
                                if(questions_posees.length <= total_questions) { 
                                    $('#repeter_pre_question_btn').css('display','none');
                                    $('#pre_correction_btn').css('display','none');
                                    setTimeout(() => { 
                                        montrer($('#pre_question_btn'));
                                        $('#pre_question_btn').css('display','block'); 
                                    }, 200);
                                }
                                if(questions_posees.length == total_questions) { 
                                    $('#repeter_pre_question_btn').css('display','none');
                                    $('#pre_correction_btn').css('display','none');
                                    $('#pre_question_btn').css('display','none'); 
                                }
                            });
                        }
                    }
                }
            }
            function exercicerSyllabe() {
    
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
    
                    $('#pre_question_btn').click(function() { 
                               
                        ordre_de_question = (total_questions == i+2) ? 'ߟߊߓߊ߲' : parseIntNko(i+2);
                        $('#pre_question_btn').html('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ '+parseIntNko(total_questions)+' \\ '+ordre_de_question+'߲ ߠߊߡߍ߲߫');
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
    
                        function relire(pre_question) { $('#repeter_pre_question_btn').click(function() { lire('alphabet',pre_question); }); }
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

                    $('#pre_correction_btn').click(function() { 
                        if(questions_posees.length <= total_questions) { 

                            $('#pre_exercice_container .table_parlante td').css('background-color','rgba(85,85,85,0.25)');
        
                            if(pre_question == '') { return false; }
        
                            if(pre_question == pre_reponse) { accorder(element_actif); }
                            if(pre_question != pre_reponse) { barrer(element_actif); }
        
                            montrer($('#pre_question_btn')); 
                        } 
                    });
                }
            }
            function enregistrerPreExerciceSyllabe() {

                let pre_questions = [];
                let total_questions = 0;

                if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                total_questions = pre_questions.length;

                $('#pre_correction_btn').click(function() {
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
                        if(lesson_active == 'pre_exercice') { taux_de_vraie_reponse_1 =  100 - taux_de_fausse_reponse; }
                        if(lesson_active == 'pre_revision') { taux_de_vraie_reponse_2 =  100 - taux_de_fausse_reponse; }
                    }
                });
            }
            function progressBarrPreExerciceSyllabe() {

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
            function stockerPreExerciceSyllabe() {

                let pre_questions = [];
                let total_questions = 0;

                if(lesson_active == 'pre_exercice') { pre_questions = exercice_pre_questions; }
                if(lesson_active == 'pre_revision') { pre_questions = revision_pre_questions; }
                total_questions = pre_questions.length;

                $('#pre_correction_btn').click(function() { 
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
            function assistantPreExerciceSyllabe() {
                
                switch(niveau_actif) {
                    case 1 : assistantDePreExerciceAlphabet(); break;
                    case 2 : assistantDePreExerciceSyllabes(); break;
                    case 3 : assistantDePreExerciceTons(); break;
                    case 4 : assistantDePreExerciceChiffres(); break;
                }


                function assistantDePreExerciceAlphabet() {

                    $('#pre_revision_bouton').click(function() {
                        let notification = "ߘߋ߰ߣߍ߲߬ ߞߎߘߊ ߣߌ߫ ߞߘߐ߬ߡߊ߲ ߠߎ߬ ߟߋ߬ ߓߍ߯ ߢߊ߯ߡߌߣߍ߲߫ ߢߐ߲ ߘߐ߫ ߣߌ߲߬ .ߣߴߌ ߛߋ߫ ߘߊ߫ ߞߵߊ߬ߟߎ߬ ߓߍ߯ ߢߊߓߐ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߗߍ߬ߡߍ ߟߊ߫ ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ .ߓߌ߬ߟߊ߬ ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߞߐ߫";
                        
                        setTimeout(() => {
                            ecrire('notification_corps',notification);
                        }, 1000);
                    });
                    
                    $('#pre_correction_btn').click(function() {

                        if(lesson_active == 'pre_exercice') {
                        if(questions_posees.length == exercice_pre_questions.length) {
                            if(taux_de_vraie_reponse_1 == 100) {
                                let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߢߊ߬ߣߍ߲߬ .ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߕߊ߯ ߣߐ߰ߡߊ߬ߛߍߦߌ ߦߙߐ. ߞߐߝߟߌ ߝߟߍ߫ \n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> . ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                ecrire('notification_corps',notification);
                            }
                            if(taux_de_vraie_reponse_1 < 100) {
                                let notification = liste_de_matieres[0][1]+" ߡߊ߬ߞߟߏ߬ߟߌ ߡߊ߫ ߢߊ߬ .ߌ ߓߘߊ߫ ߗߌߙߏ߲߫ ߡߊ߬ߞߟߏ߬ߟߌ ߢߌ߲߬ ߘߐ߫\n .<span class='pre_exercice_resultat_affiche'>ߞߐߝߟߌ ߝߟߍ߫ ߦߊ߲߬</span> .ߘߊߕߎ߲ߠߊ߲߫ ߞߘߎ ߘߌ߲߯ ߞߊ߬ ߓߐ߫ (ߓߌ߬ߢߍ߬ ߓߊ߯ߡߊ ߝߟߍ߫)";
                                ecrire('notification_corps',notification);
                            }
                        }}
                        
                        if(lesson_active == 'pre_revision') {
                        if(questions_posees.length == exercice_pre_questions.length) {
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
            function finDePreExerciceSyllabe() {

                fermerPreExercice();
                // preExerciceResultat();
                
                $('#pre_correction_btn').click(function() {
                    if(questions_posees.length === total_questions) {

                        afficherCourse($('.dialogue_btn'));
                        $('.progress_bar').css('display','none');

                        if(lesson_active == 'pre_exercice') {
                            if(taux_de_vraie_reponse_1 < 100) { 

                                $('#pre_exercice_bouton').text('ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯').css('display','block');
                                $('#pre_revision_bouton').css('display','none');

                                // reprendreExercicePreAlphabet(); 
                            }
                            if(taux_de_vraie_reponse_1 == 100) { 

                                $('#pre_exercice_bouton').css('display','none');
                                $('#pre_revision_bouton').text('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫').css('display','block');

                                // continuSurRevisionPreAlphabet(); 
                                // reprendreExercicePreAlphabet(); 
                            }
                        }
                        // setTimeout(() => { masquerCourse($('#pre_exercice')); }, 1500);
                        if(lesson_active == 'pre_revision') {
                            if(taux_de_vraie_reponse_1 < 92) { 

                                $('#pre_exercice_bouton').text('ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯').css('display','block');
                                $('#pre_revision_bouton').css('display','none');

                                // reprendreExercicePreAlphabet(); 
                            }
                            if(taux_de_vraie_reponse_1 >= 92) { 

                                $('#pre_exercice_bouton').css('display','none');
                                $('#pre_revision_bouton').text('ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߥߴߊ߬ ߡߊ߬').css('display','block');

                                // continuSurRevisionPreAlphabet(); 
                                // reprendreExercicePreAlphabet(); 
                            }


                            // if(taux_de_vraie_reponse_2 < 92) { reprendreRevisionPreAlphabet(); }
                            // if(taux_de_vraie_reponse_2 >= 92) { continuSurApprendrePreAlphabet(); reprendreRevisionPreAlphabet(); }
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
                            $('#pre_exercice_cover').css('display','none');
                             $('#pre_exercice_resultat').css('top','-100%');
                        }, 250);
    
                        setTimeout(() => {
                           
                            if(lesson_active == 'pre_exercice') { 
                                if(taux_de_vraie_reponse_1 < 100) {
                                    $('#pre_exercice_bouton').text('ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫ ߕߎ߲߯'); 
                                    afficherPreExerciceBtn();
                                }
                                if(taux_de_vraie_reponse_1 == 100) {
                                    afficherPreRevisionBtn();
                                    $('#pre_exercice_bouton').removeClass('exercice_en_cours').addClass('carre_depasse').css('z-index',0);
                                }
                            }
                        
                            if(lesson_active == 'pre_revision') { 
                                
                                if(taux_de_vraie_reponse_2 < 100) {
                                    afficherPreRevisionBtn();
                                    $('#pre_revision_bouton').text('ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫ ߕߎ߲߯');
                                }
                                if(taux_de_vraie_reponse_2 == 100) {
                                    afficherPreApprentissagesBtns();
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
    

                    $('#pre_correction_btn').click(function() {
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
                        setTimeout(() => { $('#pre_revision_bouton').click(); }, 400);
                    });
                }
                function reprendreRevisionPreAlphabet() {
                    $('#reprendre').click(function() {
                        goUp($('.resultat_container'));
                        setTimeout(() => { $('#pre_revision_bouton').click(); }, 400);
                    });
                }
                function continuSurApprendrePreAlphabet() {
                    $('#avance').click(function() {
                        cercle_index++; 
    
                        $('#fermeture_pre_revision').click();
                        $('#pre_exercice_cover').css('display','none');
                        goUp($('.resultat_container'));
                        setTimeout(() => { $('#cercles_des_partis_cadre span:nth-child('+cercle_index+')').click(); }, 600);
                    });
                }
            }
        }
        function evaluationPreSyllabe() {}

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
    function afficherExerciceBtn() {
        $('#apprentissage_dialogue_btn').css('display','none');
        $('#pre_apprentissage_dialogue_btn').css('display','block');

        $('#pre_apprentissage_btns').css('display','none');
        $('#pre_exercice_btns').css('display','block');
   
        $('#pre_exercice_bouton').css('display','block');
        $('#pre_revision_bouton').css('display','none');

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
    function initialiserExerciceResultat() { 

        questions_posees.splice(0,questions_posees.length); 
        pre_exercice_memoire.splice(0,pre_exercice_memoire.length); 
        nbr_bonne_reponse = 0;
        nbr_mauvaise_reponse = 0;
        taux_de_fausse_reponse = 0;
        taux_de_vraie_reponse_1 = 0;
        taux_de_vraie_reponse_2 = 0;
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