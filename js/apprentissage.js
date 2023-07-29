
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
    preApprendre();
    apprendre();
    enregistrerApprentissage();
    stockerApprentissage();
                    
 /*-----------------------------------------------------------------------------------------------------------------------------------*/
    
    function preApprendre() {

        $('.parametre').css('display','none');

        chargerEnteteDePreLesson();
        chargementParDefautDePreLesson();
        chargementDePreLesson();
        melangerPreLesson();
        
        
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
        function chargementParDefautDePreLesson() {
            $('#consonnes_checker, #tedo_checker').find('.checkbox_parent').next().click();
            $('#cercles_des_partis_cadre span:first-child').addClass('active_2');
        }
        function chargementDePreLesson() {

            chargementDePreLesson1();
            $('#panneaux span').click(function() {

                var clicked_consonne_container = $(this);
                var clicked_consonne = $(this).html();
                var bc = this.style.backgroundColor;
                var consonne_background = (bc == 'rgb(170, 170, 170)') ? '#fff' : 'rgb(170, 170, 170)';

                chargementDePreLesson2();
                chargementDePreLesson3();


                function chargementDePreLesson2() {
                    if(niveau_actif == 2) {
                        marquerLaConsonneCliquee();
                        decocherLesConsonnes();
                        decocherLaNasalisation();
                        chargerTableauNoir(); 
                    }
                }
                function chargementDePreLesson3() {
                    //
                }
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

            function chargementDePreLesson1() {
                if(niveau_actif == 1) {
                    $('#cercles_des_partis_cadre span').click(function() {
                        var cercle_index = $(this).index();
        
                        if(cercle_index == 0) { 
                            cocherToutesLesCases();
                            $('#consonnes_checker, #tedo_checker').find('.checkbox_parent').next().click(); 
                        }
                        if(cercle_index == 1) { 
                            cocherToutesLesCases();
                            if($('#voyelles_checker' ).find('.checkbox_parent').prop('checked') == true ) { $('#voyelles_checker' ).find('.checkbox_parent').next().click(); }
                            if($('#consonnes_checker').find('.checkbox_parent').prop('checked') == true ) { $('#consonnes_checker').find('.checkbox_parent').click();        }
                            if($('#consonnes_checker').find('.checkbox_parent').prop('checked') == false) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }
                            if($('#tedo_checker'     ).find('.checkbox_parent').prop('checked') == true ) { $('#tedo_checker'     ).find('.checkbox_parent').click();        }
        
                        
                            if($('#td_7 .check_btn' ).find('input').prop('checked') == true) { $('#td_7 .check_btn' ).find('label').click(); }
                            if($('#td_14 .check_btn').find('input').prop('checked') == true) { $('#td_14 .check_btn').find('label').click(); }
                        }
                        if(cercle_index == 2) { 
                            cocherToutesLesCases();
                            if($('#voyelles_checker' ).find('.checkbox_parent').prop('checked') == true ) { $('#voyelles_checker' ).find('.checkbox_parent').next().click(); }
                            if($('#consonnes_checker').find('.checkbox_parent').prop('checked') == true ) { $('#consonnes_checker').find('.checkbox_parent').click();        }
                            if($('#consonnes_checker').find('.checkbox_parent').prop('checked') == false) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }
                            if($('#tedo_checker'     ).find('.checkbox_parent').prop('checked') == true ) { $('#tedo_checker'     ).find('.checkbox_parent').click();        }
        
                            if($('#td_0 .check_btn' ).find('input').prop('checked') == true) { $('#td_0 .check_btn' ).find('label').click(); }
                            if($('#td_14 .check_btn').find('input').prop('checked') == true) { $('#td_14 .check_btn').find('label').click(); }
                        }
                        if(cercle_index == 3) { 
                            cocherToutesLesCases();
                            if($('#voyelles_checker' ).find('.checkbox_parent').prop('checked') == true ) { $('#voyelles_checker' ).find('.checkbox_parent').click();        }
                            if($('#consonnes_checker').find('.checkbox_parent').prop('checked') == true ) { $('#consonnes_checker').find('.checkbox_parent').click();        }
                            if($('#consonnes_checker').find('.checkbox_parent').prop('checked') == false) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }
        
                            if($('#td_0 .check_btn').find('input').prop('checked') == true) { $('#td_0 .check_btn').find('label').click(); }
                            if($('#td_7 .check_btn').find('input').prop('checked') == true) { $('#td_7 .check_btn').find('label').click(); }
                        }
                        if(cercle_index == 4) { 
                            cocherToutesLesCases();
        
                            if($('#td_0 .check_btn' ).find('input').prop('checked') == false) { $('#td_0 .check_btn' ).find('label').click(); }
                            if($('#td_7 .check_btn' ).find('input').prop('checked') == false) { $('#td_7 .check_btn' ).find('label').click(); }
                            if($('#td_14 .check_btn').find('input').prop('checked') == false) { $('#td_14 .check_btn').find('label').click(); }
                        }
        
                        $(this).addClass('active_2');
                        $(this).siblings().removeClass('active_2');
                    });
                }
            }
        }
        function melangerPreLesson() {

            $('.partis_de_lesson:nth-child(2)').click(function() {
                var pre_lesson_melange_html = '';
                
                if(niveau_actif == 1) {
                    var caracteres_coches = JSON.parse(sessionStorage.getItem('caracteres_coches'));
                    var caracteres_coches_melanges = malaxer(caracteres_coches);
                    pre_lesson_melange_html = lessonHTML(caracteres_coches_melanges, 'table_parlante');
                }
                if(niveau_actif == 2) {
                    var syllabes_simples = JSON.parse(sessionStorage.getItem('syllabes_simples'));
                    var syllabes_simples_melanges = malaxer(syllabes_simples);
                    pre_lesson_melange_html = lessonHTML(syllabes_simples_melanges, 'table_parlante');
                }
                if(niveau_actif == 3) {
                    var syllabes_tonifies = JSON.parse(sessionStorage.getItem('syllabes_tonifies'));
                    var syllabes_tonifies_melanges = malaxer(syllabes_tonifies);
                    pre_lesson_melange_html = lessonHTML(syllabes_tonifies_melanges, 'table_parlante');
                }


                $('#apprentissage_body').html(pre_lesson_melange_html);
            });
        }
        function afficherPreLesson() {
            $.each($('.table_parlante td'), function() { 

                var td_actif = $(this);
                var td_text  = $(this).html();
                var td_index = $(this).index();

                td_actif.css('color','transparent');

                setTimeout(() => {
                    td_actif.css('color','#fff');
                }, 200*td_index);
            
            });
        }
    }
        

    function chargerEnteteDePreLesson() {
        var panneaux_html = panneauxHTML();

        switch(niveau_actif) {
            case 1 : chargerPartisDeLesson(); break;
            case 2 : preApprendreSyllabes(); break;
        }


        function chargerPartisDeLesson() {
            var cercle_de_parti_html = cerclesDePartiHTML();
            $('.partis_de_lesson:first-child').html('<div class="titre_de_parti"> ߞߎߘߎ߲</div><div id="cercles_des_partis">'+cercle_de_parti_html+'</div>');

            function cerclesDePartiHTML() {
                var html_1 = '<div id="cercles_des_partis_cadre">';
                for(var i=0;i<5;i++) { 
                    var index = (i==0) ? parseIntNko(i+1)+'߭' : parseIntNko(i+1)+'߲';
                    html_1 += (i == 4) ? "<span>ߓߍ߯</span>" : "<span>"+index+"</span>"; 
                }
                html_1 += '</div>';
                return html_1;
            }
        }
        function preApprendreSyllabes(){
            
            chargerLePanneau();
            afficherLePanneau();
            masquerLePanneau();


            function chargerLePanneau() {
                $('.partis_de_lesson:first-child' ).html('<div class="titre_de_parti"> ߞߎߘߎ߲</div><div id="panneaux">'+panneaux_html+'</div>');
            }
            function afficherLePanneau() {
                $('.titre_de_parti').on('mouseover', function() {
                    $('#panneaux').css('height','12rem');
                    $('#consonnes_cadre').animate({'top':0}, 250);
                });
            }
            function masquerLePanneau() {
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
        function panneauxHTML() {
            
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
console.log(note);
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