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

        let pre_apprentissage_clicks_memo = [];
        let quantite_normale_de_click = 2;

        let panneau_status = "masque";
        let consonnes_choisies = [];
            
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
            enregistrerApprendrePreSyllabe();
            stockerApprendrePreSyllabe();
            assistantApprendrePreSyllabe();
            finDeApprendrePreSyllabe();


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
                    var pre_lesson_head_22_html = "ߞߎߘߎ߲ ߢߊ߯ߡߌߣߍ߲";

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
                        let panneaux_consonnes_apprises = JSON.parse(sessionStorage.getItem('syllabe_pre_apprentissage_memo'));

                        console.log('panneaux_consonnes_apprises = '+panneaux_consonnes_apprises);
                    }
                }
                function chargerCorpsDePreSyllabe() {
                    let panneau_consonnes_index = [];
                    var panneau_consonnes = [];

                    preChargementDuTableauNoir();
                    chargementDuTableauNoir();
                    
                    function preChargementDuTableauNoir() {
                        $('#table_syllabe_apprentissage').html("<div id='pre_texte'>ߜߋ߲߭ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬</div>");
                    }
                    function chargementDuTableauNoir() {
                        $('#panneaux span').click(function() {

                            var clicked_consonne_container = $(this);
                            var clicked_consonne = $(this).text();
                            var consonne_index = $(this).index();
                            var td_to_click = '';
                            var bc = this.style.backgroundColor;
                            var consonne_background = (bc == 'rgb(170, 170, 170)') ? '#fff' : 'rgb(170, 170, 170)';
                            let element_index = 0;
                            let panneau_consonne_index = panneau_consonnes.indexOf(clicked_consonne);


                            if(panneau_consonne_index == '-1') { panneau_consonnes.push(clicked_consonne); }
                            if(panneau_consonne_index != '-1') { panneau_consonnes.splice(panneau_consonne_index, 1); }
                            
                            panneau_consonnes_index.push(consonne_index);

                            marquerLaConsonneCliquee();
                            decocherLesConsonnes();
                            decocherLaNasalisation();
                            afficherTableauNoir();
                            effacerTableau();
                            stylesDesSyllabes();
                            progressBarrApprendrePreSyllabe();
                            initialiserMemoire();

                        
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
                                    let compteur_de_click = 0;
            
                                    $(this).click(function(){
                                        if(compteur_de_click < quantite_normale_de_click) {
                                            compteur_de_click++;
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
                            function initialiserMemoire() {
                                consonnes_choisies.splice(0,consonnes.length);
                                td_to_click = $('#table_syllabe_apprentissage td');

                                for(i=0; i<td_to_click.length; i++) { 
                                    let syllabe_to_click = td_to_click[i].textContent;
                                    let number_of_click = 0;
                                    let mark = 0;
                                    consonnes_choisies.push([syllabe_to_click,number_of_click,mark]); 
                                }
                            } 
                        });
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
                    $('#submit_panneau').on('click', masquerPanneau);
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
            function apprendrePreSyllabe() {
                $('#apprentissage_body').click(function(e) {
                    let son = $(e.target).text();
                    lire('ߊ',son); 
                });
            }
            function enregistrerApprendrePreSyllabe() {
                $('#apprentissage_body').on('mouseover', function(){
                        
                    let id = $(this).attr('id');
                    let td = $('#'+id+' td');
                    
                    memorisation();

                    function memorisation() {
                        
                        $.each(td, function(){
                            let compteur = 1;

                            $(this).click(function(){
                
                                let syllabe_clique = $(this).text();
                                let td_index = $(this).index();
                                let n = compteur++;
                                let mark = (n >= quantite_normale_de_click) ? 1 : 0;
                                
                                consonnes_choisies.splice(td_index,1,[syllabe_clique,n,mark]);
                            });
                        });
                    }
                });
            }
            function stockerApprendrePreSyllabe() {
                $('#apprentissage_body').on('mouseover', function(){
                        
                    let id = $(this).attr('id');
                    let td = $('#'+id+' td');
                    let nbr_de_syllabe_apprise = 0;
                    
                    $.each(td, function(){
                        let compteur = 0;
                        $(this).click(function(){
                            compteur++;
                            if(compteur === quantite_normale_de_click) { nbr_de_syllabe_apprise++; }
                            
                            if(consonnes_choisies.length === nbr_de_syllabe_apprise) {
                                sessionStorage.setItem('syllabe_pre_apprentissage_memo', JSON.stringify(consonnes_choisies));
                            }
                        });
                    });
                });
            }
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
            function finDeApprendrePreSyllabe() {
                $('#apprentissage_body').on('mouseover', function(){
                        
                    let id = $(this).attr('id');
                    let td = $('#'+id+' td');
                    let nbr_de_syllabe_apprise = 0;
                    
                    $.each(td, function(){
                        let compteur = 0;
                        $(this).click(function(){
                            compteur++;
                            if(compteur === quantite_normale_de_click) { nbr_de_syllabe_apprise++; }
                            
                            if(consonnes_choisies.length === nbr_de_syllabe_apprise) {
                                sessionStorage.setItem('syllabe_pre_apprentissage_memo', JSON.stringify(consonnes_choisies));
                            }
                        });
                    });
                });
            }
        }
        function exercicePreSyllabe() {}
        function revisionPreSyllabe() {}
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