$(document).ready(function() {

    var programmes_container = $('#programmes_container');
    
    var client_lessons_bruts_container      = document.querySelector('.page_head #client_lessons_bruts_container'); 
    var client_exercices_bruts_container    = document.querySelector('.page_head #client_exercices_bruts_container'); 
    var client_evaluations_brutes_container = document.querySelector('.page_head #client_evaluations_brutes_container'); 
    var code_des_etudes_container           = document.getElementById('code_des_etudes_container');
    
    var click_min_nbr = 0;
    var niveau_max = 1;
    
    $('#affiche_programme').on('click', function() {

        var lessons_suivies = '';
        var exercices_effectues = '';
        var evaluations_effectuees = '';
        
        var lessons_separees = [];
        var exercices_separes = [];
        var evaluations_separees = [];
        
        var lessons = [];
        var exercices = [];
        var evaluatons = [];
        
        var click_statistic = [];
        var element_click_statistic = [];

        var id, date, id_client, niveau, lesson_brute;

        var cours_par_phase = [];

        var cours   = [];
        var cours_1 = [];
        var cours_2 = [];
        var cours_3 = [];
        
        var situations  = [];
        var code_des_etudes = [];
        var data_cours_tries_par_niveau  = [];
        var data_cours_tries_par_phase  = [];
        var etape_1 = [];
        var etape_2 = [];
        var etape_3 = [];
        var etape_4 = [];
        
        var lessons   = [];
        var lessons_1 = [];
        var lessons_2 = [];
        var lessons_3 = [];
        
        var phases   = [];
        var phases_1 = [];
        var phases_2 = [];
        var phases_3 = [];
        var phases_4 = [];

        var client_info = [];
        var niveaux_client = [];
        var phases = [];
        
        var liste_des_niveaux = [];
        var liste_des_phases = [];

        var p = [];
   
     
        situationDesEtudes();
        chargementDeCodeDesEtudesContainer();
        calculDuNiveauMaxDuClient();
        chargementDuNiveauMaxContainer();
        verificationDesLessonsEtudiees();
        programme(); 
        

        function situationDesEtudes() {
            
            var donnees_ajax = document.getElementById('donnees_ajax');
            var phases_par_niveau = [];
            var cours_par_phase = [];
            var cour = [];
            
            
          /* Traitement de toutes les données provenant de données_ajax et leurs mises dans une constante nommée data_cours_tries_par_phase */
            
            traitementDesDonneesAjaxEtTriDesCoursParPhase();
            triDesCoursParNiveau();
            listeDesPhasesEtudies();
             
            
            function traitementDesDonneesAjaxEtTriDesCoursParPhase() {
                var data_container = document.querySelectorAll('#donnees_ajax div');
            
                $.each(data_container, function(){ cours[cours.length] = $(this).html(); });
                for (var i = 1; i < cours.length; i++) {
                    
                    var cours_par_phase = cours[i].split('%');
                    var cours_traite_par_phase = [];
                   
                    for (var j = 0; j < cours_par_phase.length; j++) {
                        var cour = cours_par_phase[j].split('/');

                        var phase = cour[0];
                        var date = cour[1];
                        var id_client = cour[2];
                        var niveau = cour[3];
                        var cour_c = cour[4].split(';');
                        var cour_traite = [];
                        
                        for (var k = 0; k < cour_c.length; k++) {
                            element = cour_c[k];
                            element = element.split(','); 
                            
                            cour_traite[cour_traite.length] = element;
                        }
                        cours_traite_par_phase[cours_traite_par_phase.length] = [phase, date, id_client, niveau, cour_traite];
                    }
                    data_cours_tries_par_phase[data_cours_tries_par_phase.length] = cours_traite_par_phase;
                }

                situations[situations.length] = data_cours_tries_par_phase;
            }
            function triDesCoursParNiveau() {
                
                for (var i = 0; i < data_cours_tries_par_phase.length; i++) {
                    for (var j = 0; j < data_cours_tries_par_phase[i].length; j++) {
                
                        var niveau = data_cours_tries_par_phase[i][j][3];
                    
                      /* Mettre les leçons du même niveau ensemble  */    
                        etape1();
                        etape2();
                        etape3();
                        etape4();
                        data_cours_tries_par_niveau  = [etape_1, etape_2, etape_3, etape_4];
              
                        function etape1() {
                            if(niveau==1) {
                                lessons_1[lessons_1.length] = data_cours_tries_par_phase[i][j];
                                etape_1 = [niveau, lessons_1];
                            }
                        }
                        function etape2() {
                            if(niveau==2) {
                                lessons_2[lessons_2.length] = data_cours_tries_par_phase[i][j];
                                etape_2 = [niveau, lessons_2];
                            }
                        }
                        function etape3() {
                            if(niveau==3) {
                                lessons_3[lessons_3.length] = data_cours_tries_par_phase[i][j];
                                etape_3 = [niveau, lessons_3];
                            }
                        }
                        function etape4() {
                            if(niveau==4) {
                                lessons_4[lessons_4.length] = data_cours_tries_par_phase[i][j];
                                etape_4 = [niveau, lessons_4];
                            }
                        }
                    }
                }
                
                situations[situations.length] = data_cours_tries_par_niveau;
            }
            function listeDesPhasesEtudies() {
                
                var phases_1 = [],  phases_11 = [],  phases_12,  phases_13 = [];
                var phases_2 = [],  phases_21 = [],  phases_22,  phases_23 = [];
                var phases_3 = [],  phases_31 = [],  phases_32,  phases_33 = [];

                var n_11=0, n_12=0, n_13=0;
                var n_21=0, n_22=0, n_23=0;
                var n_31=0, n_32=0, n_33=0;

                for (var i = 0; i < data_cours_tries_par_phase.length; i++) {
                for (var j = 0; j < data_cours_tries_par_phase[i].length; j++) {
                    
                    var list_element = [data_cours_tries_par_phase[i][j][3], data_cours_tries_par_phase[i][j][0]];
                    liste_des_phases[liste_des_phases.length] = list_element;
                }} 
                
                for (var i = 0; i < liste_des_phases.length; i++) {
                    
                    var nivo  = liste_des_phases[i][0];
                    var phase = liste_des_phases[i][1];

                    if(nivo == 1 && phase == liste_de_phases[0][1] ) {
                        var p = liste_des_phases[i][1];
                        n_11++;
                     
                        phases_11 = [nivo, p, n_11];
                    }
                    if(nivo == 1 && phase == liste_de_phases[1][1] ) {
                        var p = liste_des_phases[i][1];
                        n_12++;
                    
                        phases_12 = [nivo, p, n_12];
                    }
                    if(nivo == 1 && phase == liste_de_phases[2][1] ) {
                        var p = liste_des_phases[i][1];
                        n_13++;
                    
                        phases_13 = [nivo, p, n_13];
                    }
                
                    if(nivo == 2 && phase == liste_de_phases[0][1] ) {
                        var p = liste_des_phases[i][1];
                        n_21++;

                        phases_21 = [nivo, p, n_21];
                    }
                    if(nivo == 2 && phase == liste_de_phases[1][1] ) {
                        var p = liste_des_phases[i][1];
                        n_22++;

                        phases_22 = [nivo, p, n_22];
                    }
                    if(nivo == 2 && phase == liste_de_phases[2][1] ) {
                        var p = liste_des_phases[i][1];
                        n_23++;

                        phases_23 = [nivo, p, n_23];
                    }
                    
                }
                
                phases_1 = [phases_11, phases_21, phases_31].join(';');
                phases_2 = [phases_12, phases_22, phases_32].join(';');
                phases_3 = [phases_13, phases_23, phases_33].join(';');
                
                code_des_etudes = [phases_1, phases_2, phases_3];

                situations[situations.length] = code_des_etudes.join('/');
            }
        }
        function chargementDeCodeDesEtudesContainer() {
            code_des_etudes_container.innerHTML = code_des_etudes.join('%');
        }
        function calculDuNiveauMaxDuClient() {
  
            niveau_max = niveauMax();
            function niveauMax() {

                var codes;
                var sous_codes = [];
                var sous_codes_2 = [];
                var sous_codes_3 = [];
                
                codes = code_des_etudes_container.innerHTML;
                

            alert( codes );
               // niveau_max = Math.max(...niveaux);
               
               // return niveau_max;
            }
        }
        function chargementDuNiveauMaxContainer() {
            document.getElementById ('niveau_max_containner').innerHTML = niveau_max; 
        }
        function verificationDesLessonsEtudiees() {

            switch (niveau_max) {
                case 'NaN':
                    verifierLesson1();
                    break;
                case 1:
                    verifierLesson1();
                    break;
                case 2:
                    verifierLesson2();
                    break;
                case 3:
                    verifierLesson3();
                    break;
                case 4:
                    verifierLesson4();
                    break;
                default:
                    verifierLesson1();
            }

            function verifierLesson1() {
                
                var lessons = [];
                var lesson = [];
                var lesson_verifiee = [];
                var lessons_verifiees = [];
             
                for (var i = 0; i < lessons_1.length; i++) {
                    var lesson = lessons_1[i][4];
                    lesson = lesson.split(';');
                    lessons.push(lesson);
                }
                for (var i = 0; i < lessons.length; i++) {
                    for (var j = 0; j < lessons[i].length; j++) {
                        
                        var lesson_element = lessons[0][j];
                        lesson_element = lesson_element.split(',');
                        lesson_verifiee.push([lesson_element[0], parseInt(lesson_element[1])]);
                    }
                }
                lessons_verifiees.push(lesson_verifiee);
 
        
              /* Calcul du nombre de click pour chaque élément */
                for (var i = 0; i < lessons_verifiees.length; i++) {
                    for (var j = 0; j < lessons_verifiees[i].length; j++) {
                        
                        var index = lessons_verifiees[i].indexOf(lessons_verifiees[i][j]);
                        var element = lessons_verifiees[i][j][0];
                        var click = lessons_verifiees[i][j][1];
                        var element_click = [];

                        element_click[0] = index;
                        element_click[1] = element;
                        element_click[2] = click;

                        click_statistic.push(element_click);
                    }
                }
         
                var click_table = [];
                for (var i = 0; i < 26; i++) {
                    var nbr_click = 0;
                    $.each(click_statistic, function() {

                        if ($(this)[0] == i) {
                            nbr_click += $(this)[2];
                        }
                    });

                    click_table.push(nbr_click);
                }

                click_min_nbr = Math.min(...click_table);
            }
            function verifierLesson2() {
               
                var lessons = [];
                var lesson = [];
                var lesson_verifiee = [];
                var lessons_verifiees = [];
                   
                for (var i = 0; i < lessons_2.length; i++) {
                    var lesson = lessons_2[i][4];
                    lesson = lesson.split(';');
                    lessons.push(lesson);
                }
                for (var i = 0; i < lessons.length; i++) {
                    for (var j = 0; j < lessons[i].length; j++) {
                        
                        var lesson_element = lessons[0][j];
                        lesson_element = lesson_element.split(',');
                        lesson_verifiee.push([lesson_element[0], parseInt(lesson_element[1])]);
                    }
                }
                lessons_verifiees.push(lesson_verifiee);
 
        
              /* Calcul du nombre de click pour chaque élément */
                for (var i = 0; i < lessons_verifiees.length; i++) {
                    for (var j = 0; j < lessons_verifiees[i].length; j++) {
                        
                        var index = lessons_verifiees[i].indexOf(lessons_verifiees[i][j]);
                        var element = lessons_verifiees[i][j][0];
                        var click = lessons_verifiees[i][j][1];
                        var element_click = [];

                        element_click[0] = index;
                        element_click[1] = element;
                        element_click[2] = click;

                        click_statistic.push(element_click);
                    }
                }
         
                var click_table = [];
                for (var i = 0; i < 266; i++) {
                    var nbr_click = 0;
                    $.each(click_statistic, function() {

                        if ($(this)[0] == i) {
                            nbr_click += $(this)[2];
                        }
                    });

                    click_table.push(nbr_click);
                }

                click_min_nbr = Math.min(...click_table);
            }
        }
        function programme() {
            
            var programmes_container = $('#programmes_container');
            var reception = $('#reception');
            
            programmes_container.html(programmeHTML());
            affichageDuProgramme();
            stylesDuProgramme();
            
            function programmeHTML() {
                
                var code = clientInfo();  
                var programme_html = '<span class="fermeture" id="fermeture_programme">&times;</span>';
                
                programme_html += '<h2>ߘߋ߰ߟߌ ߢߍߥߟߊ </h2>';
                programme_html += '<ul id="programme_ul">';
                
                for (var i = 0; i < liste_de_matieres.length; i++) {
                    var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i])+1;       
                    
                    if(niveau_max >= matiere_index) {
                        programme_html += '<li><a href="lesson.php?matiere_id='+liste_de_matieres[i][0]+'&matiere_index='+matiere_index+'&matiere_nom='+liste_de_matieres[i][1]+'&niveau='+i+'&client_code='+code+'">'+liste_de_matieres[i][1]+'</a></li>';
                    }else{
                        programme_html += '<li><a href="#">'+liste_de_matieres[i][1]+'</a></li>';
                    }
                }   
                programme_html += '</ul>';
        
                return programme_html;
            }
            function affichageDuProgramme() {
                programmes_container.css({'display':'block'});
                reception.css({'display':'none'});
            }
            function stylesDuProgramme() {
                
                var lesson_active = $('#programme_ul li:nth-child('+niveau_max+')');
                var lessons_apprises = lesson_active.prevAll();
                var lessons_a_apprendre = lesson_active.nextAll();
                
                lessons_apprises.addClass('apprises');
                lesson_active.addClass('active');
                lessons_a_apprendre.addClass('a_apprendre');
            }
        }

    });
});