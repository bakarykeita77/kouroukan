
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

        chargementDePreLesson();
        
        afficherPreApprentissage();
        enregistrementDePreApprentissage();
        stockageDePreApprentissage();

        afficherPreExercice();
        enregistrementDePreExercice();
        stockageDePreExercice();
        

        function chargementDePreLesson() {

            chargerEnteteDePreLesson();
            chargerCorpsDePreLesson();
            chargerPiedDePreLesson();


            function chargerEnteteDePreLesson() {

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
                    var pre_lesson_head_21_html = "\
                        <div class='titre_de_parti'>ߞߎߘߎ߲ ߢߊ߯ߡߌߣߍ߲</div> \
                        <div id='carres_pour_exercices'>"+carres_html+"</div>\
                    ";

                    $('.pre_lesson_head_1').html(pre_lesson_head_11_html);
                    $('.pre_lesson_head_2').html(pre_lesson_head_21_html);

                    
                    function cerclesHTML() {
                        var html_1 = '<div id="cercles_des_partis_cadre">';
                        for(var i=0;i<5;i++) { 
                            var index = (i==0) ? parseIntNko(i+1)+'߭' : parseIntNko(i+1)+'߲';
                            html_1 += (i == 4) ? "<span class='cercle'>ߓߍ߯</span>" : "<span class='cercle'>"+index+"</span>"; 
                        }
                        html_1 += '</div>';
                        return html_1;
                    }
                    function carresHTML() {
                        var carres_html = "\
                            <span id='carre_1'>ߞߎߘߊ</span>  \
                            <span id='carre_2'>ߞߎߙߎ߬</span>  \
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

                        $('.pre_lesson_head_1' ).html(pre_lesson_head_12_html);
                        $('.pre_lesson_head_2' ).html(pre_lesson_head_22_html);
                        
                        function panneauxDesLettresHTML() {
                            
                            var consonnes = caracteres[1];
                            var consonnes_melanges = malaxer(consonnes);
                            var pre_lesson_melange_html = lessonHTML(consonnes_melanges, 'table_parlante');
                        
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
                        
                        $('#cercles_des_partis_cadre span:first-child').css({'background-color':'#fff', 'box-shadow':'0 0 1rem #555'});
                        $('#cercles_des_partis_cadre span').click(function() {
                            
                            var cercle_active = $(this);
                            var cercle_index = $(this).index();
                            var index = cercle_index+1;
                            var ordre_de_parti = $(this).html();

                            preLessonEntete1Style();
                            selectionDeLaLigneActive();
                            styleDeLaLigneActive();
                            traductionDeLaLigneActive();
                            
                            preExercice1();

                            sessionStorage.setItem('les_lettres_actives', JSON.stringify(lesLettresActives()));
                        

                            function preLessonEntete1Style() {
                                cercle_active.css({'background-color':'white', 'box-shadow':'0 0 1rem #444'});
                                cercle_active.siblings().css({'background-color':'transparent', 'box-shadow':'none'});
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
                                    
                                var lettres_pre_apprises = lettresPreApprises();
                                var les_lettres_actives = lesLettresActives();

                                lettres_pre_apprises = lettres_pre_apprises.concat(les_lettres_actives);
                                sessionStorage.setItem('lettres_pre_apprises', JSON.stringify(lettres_pre_apprises));

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
                                        th += '<div class="traducteur_tr">';
                                            for(var i=0; i<7; i++) { th += '<span class="pre_td">'+alphabet_nko[2][i]+'</span>'; }
                                        th += '</div>';
                                    }
                                    if(index == 2) {
                                        th += '<div class="traducteur_tr">';
                                            for(var j=7; j<14; j++) { th += '<span class="pre_td">'+alphabet_nko[1][j]+'</span>'; }
                                        th += '</div>';
                                        th += '<div class="traducteur_tr">';
                                            for(var j=7; j<14; j++) { th += '<span class="pre_td">'+alphabet_nko[2][j]+'</span>'; }
                                        th += '</div>';
                                    }
                                    if(index == 3) {
                                        th += '<div class="traducteur_tr">';
                                            for(var k=14; k<21; k++) { th += '<span class="pre_td">'+alphabet_nko[1][k]+'</span>'; }
                                        th += '</div>';
                                        th += '<div class="traducteur_tr">';
                                            for(var k=14; k<21; k++) { th += '<span class="pre_td">'+alphabet_nko[2][k]+'</span>'; }
                                        th += '</div>';
                                    }
                                    if(index == 4) {
                                        th += '<div class="traducteur_tr">';
                                            for(var l=21; l<28; l++) { th += '<span class="pre_td">'+alphabet_nko[1][l]+'</span>'; }
                                        th += '</div>';
                                        th += '<div class="traducteur_tr">';
                                            for(var l=21; l<28; l++) { th += '<span class="pre_td">'+alphabet_nko[2][l]+'</span>'; }
                                        th += '</div>';
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
       
                            function preExercice1() {

                                chargerPreExercice();
                                enregistrementDePreExercice();
                                stockageDePreExercice();
                                fermerPreLesson();


                                function chargerPreExercice() {

                                    chargerEnteteDePreExercice();
                                    chargerCorpsDePreExercice();
                                    chargerPiedDePreExercice();

                                    
                                    function chargerEnteteDePreExercice() {
                                        var pre_exercice_head_html = '';

                                        pre_exercice_head_html = '<h3>ߞߎߘߎ߲߫ '+ordre_de_parti+' ߢߊ߯ߡߌߣߍ߲</h3>';
                                        $('#pre_exercice_head').html(pre_exercice_head_html);
                                    }
                                    function chargerCorpsDePreExercice() {

                                        chargerCorpsPreExercice1();
                                        chargerCorpsPreExercice2();
                                        chargerCorpsPreExercice3();
                                        chargerCorpsPreExercice4();

                                        
                                        function chargerCorpsPreExercice1() {

                                            var pre_exercice_body_html = '';
                                           
                                            $('#carre_1').click(function() {
                                                var les_lettres_actives = JSON.parse(sessionStorage.getItem('les_lettres_actives'));
                                                les_lettres_actives = malaxer(les_lettres_actives);
                                                pre_exercice_body_html = lessonHTML(les_lettres_actives, '');
                                               
                                                $('#pre_exercice_body').html(pre_exercice_body_html);
                                            }); 
                                            
                                            $('#carre_2').click(function() {
                                                var lettres_pre_apprises = JSON.parse(sessionStorage.getItem('lettres_pre_apprises'));
                                               
                                                lettres_pre_apprises = malaxer(lettres_pre_apprises);
                                                pre_exercice_body_html = lessonHTML(lettres_pre_apprises, '');
                                               
                                                $('#pre_exercice_body').html(pre_exercice_body_html);
                                            }); 
                                        }
                                        function chargerCorpsPreExercice2() {}
                                        function chargerCorpsPreExercice3() {}
                                        function chargerCorpsPreExercice4() {}
                                    }
                                    function chargerPiedDePreExercice() {

                                    }
                                }
                                function enregistrementDePreExercice() {}
                                function stockageDePreExercice() {}
                                function fermerPreLesson() {
                                    $('.fermeture').click(function(){ 
                                        $('#pre_exercice_cover').css({'display':'none'}); 
                                        setTimeout(function() { $('#pre_exercice').css({'transform':'scale(0.8)', 'opacity':0}); }, 10); 
                                    });
                                }
                            }
                        });
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
            function chargerPiedDePreLesson() {}
        }
        function afficherPreApprentissage() {
            $('.dialogue_btn').css('display','none');
            affichageDePreApprentissage();
            reAffichageDePreLesson();

            function affichageDePreApprentissage() {
                $('#table_pre_apprentissage').css('height',0);
                setTimeout(function(){ $('#table_pre_apprentissage').animate({'min-height':'90%'},600); }, 200);
            }
            function reAffichageDePreLesson() {
                $('#cercles_des_partis span').click(function() { affichageDePreApprentissage(); });
            }
        }
        function enregistrementDePreApprentissage() {}
        function stockageDePreApprentissage() {}
        function afficherPreExercice() {
            
            $('#carre_1, #carre_2').click(function(){ 
                
                $('#pre_exercice_cover, #pre_exercice').css({'display':'block'}); 
                $('#pre_exercice').css({'transform':'scale(0.8)', 'opacity':0});

                setTimeout(function() { 
                    $('#pre_exercice').css({'transform':'scale(1)', 'opacity':1}); 
                    $('#pre_exercice_body td').css({'transform':'scale(0)', 'opacity':0});
                }, 10); 
            });
            $('#carre_1').click(function(){ 
                setTimeout(function() { affichageAnimeDesTd($('#pre_exercice_body td')); }, 100); 
            });
            $('#carre_2').click(function(){ 
                setTimeout(function() { affichageAnimeDesTr($('#pre_exercice_body tr')); }, 100); 
            });
        }
        function enregistrementDePreExercice() {}
        function stockageDePreExercice() {}
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