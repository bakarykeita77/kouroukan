$(document).ready(function() {

    var programmes_container = $('#programmes_container');
    
    var client_lessons_bruts_container      = document.querySelector('.page_head #client_lessons_bruts_container'); 
    var client_exercices_bruts_container    = document.querySelector('.page_head #client_exercices_bruts_container'); 
    var client_evaluations_brutes_container = document.querySelector('.page_head #client_evaluations_brutes_container'); 
    
    var click_min_nbr = 0;
    var niveau_max = 1;
    
    $('#affiche_programme').on('click', function() {

        var data_cours_tries_par_phase = [];
        
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


    /*
        recuperationGlobaleDesLessons();
        recuperationGlobaleDesExercices();
        recuperationGlobaleDesEvaluations();
        
        separationDesLessons();
        separationDesExercices();
        separationDesEvaluations();
     */   
     
        calculDuNiveauMaxDuClient();
        chargementDuNiveauMaxContainer();
        triDesLessonsParNiveau();
        verificationDesLessonsEtudiees();
        situationDesEtudes();   
alert( data_cours_tries_par_niveau ); 
        programme();

        function situationDesEtudes() {
            
            var donnees_ajax = document.getElementById('donnees_ajax');
            var phases_par_niveau = [];
            var cours_par_phase = [];
            var cour = [];
            
            
          /* Traitement de toutes les données provenant de données_ajax et leurs mises dans une constante nommée data_cours_tries_par_phase */
            
            traitementDesDonneesAjaxEtTriDesCoursParNiveau();
            triDesCoursParPhase();
            listeDesNiveauxEtudies();
            listeDesPhasesEtudies();
            
            function traitementDesDonneesAjaxEtTriDesCoursParNiveau() {
                var data_container = document.querySelectorAll('#donnees_ajax div');
            
                $.each(data_container, function(){ cours[cours.length] = $(this).html(); });
                for (var i = 1; i < cours.length; i++) {
                    var cours_par_phase = cours[i].split('%');
                    var cours_traite_par_phase = [];
                    
                    for (var j = 0; j < cours_par_phase.length; j++) {
                        var cour = cours_par_phase[j];
                        cour = cour.split('/');
                        
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
            function triDesCoursParPhase() {
                for (var i = 0; i < data_cours_tries_par_phase.length; i++) {
                    for (var j = 0; j < data_cours_tries_par_phase[i].length; j++) {
                
                        var niveau = data_cours_tries_par_phase[i][j][3];
                    
                      /* Mettre les leçons et les phases du même niveau ensemble  */    
                        etape1();
                        etape2();
                        etape3();
                        etape4();
                        data_cours_tries_par_niveau  = [etape_1, etape_2, etape_3, etape_4];
                        
                        function etape1() {
                            if(niveau==1) {
                                lessons_1[lessons_1.length] = data_cours_tries_par_phase[i][j];
                                if(phases_1.indexOf(data_cours_tries_par_phase[i][j][0]) == -1) {
                                    phases_1[phases_1.length] = data_cours_tries_par_phase[i][j][0];
                                }
                                
                                etape_1 = [niveau, phases_1, lessons_1];
                            }
                        }
                        function etape2() {
                            if(niveau==2) {
                                lessons_2[lessons_2.length] = data_cours_tries_par_phase[i][j];
                                if(phases_2.indexOf(data_cours_tries_par_phase[i][j][0]) == -1) {
                                    phases_2[phases_2.length] = data_cours_tries_par_phase[i][j][0];
                                }
                                
                                etape_2 = [niveau, phases_2, lessons_2];
                            }
                        }
                        function etape3() {
                            if(niveau==3) {
                                lessons_3[lessons_3.length] = data_cours_tries_par_phase[i][j];
                                if(phases_3.indexOf(data_cours_tries_par_phase[i][j][0]) == -1) {
                                    phases_3[phases_3.length] = data_cours_tries_par_phase[i][j][0];
                                }
                                
                                etape_3 = [niveau, phases_3, lessons_3];
                            }
                        }
                        function etape4() {
                            if(niveau==4) {
                                lessons_4[lessons_4.length] = data_cours_tries_par_phase[i][j];
                                if(phases_4.indexOf(data_cours_tries_par_phase[i][j][0]) == -1) {
                                    phases_4[phases_4.length] = data_cours_tries_par_phase[i][j][0];
                                }
                                
                                etape_4 = [niveau, phases_4, lessons_4];
                            }
                        }
                    }
                }
                
                situations[situations.length] = data_cours_tries_par_niveau;
            }
            function listeDesNiveauxEtudies() {
         alert( data_cours_tries_par_niveau );        
                for (var i = 0; i < data_cours_tries_par_niveau.length; i++) {
                for (var j = 0; j < data_cours_tries_par_niveau[i].length; j++) {
                    
                        liste_des_niveaux[liste_des_niveaux.length] = data_cours_tries_par_niveau[i][0];
                    
                }}   
            }

            return situations ;
        }
        function recuperationGlobaleDesLessons() {
            lessons_suivies = client_lessons_bruts_container.innerHTML;
            lessons_suivies = lessons_suivies.split('%');
        } 
        function recuperationGlobaleDesExercices() {
            exercices_effectues = client_exercices_bruts_container.innerHTML;
            exercices_effectues = exercices_effectues.split('%');
        } 
        function recuperationGlobaleDesEvaluations() {
            evaluations_effectuees = client_evaluations_brutes_container.innerHTML;
            evaluations_effectuees = evaluations_effectuees.split('%');
        } 
        
        function separationDesLessons() {

            for (var i = 0; i < lessons_suivies.length; i++) {

                var lesson_suivie = lessons_suivies[i].split('/');
                lessons_separees.push(lesson_suivie);
            }
            data_cours_tries_par_phase[data_cours_tries_par_phase.length] = lessons_separees
        }
        function separationDesExercices() {

            for (var i = 0; i < exercices_effectues.length; i++) {

                var exercice_effectuee = exercices_effectues[i].split('/');
                exercices_separes.push(exercice_effectuee);
            }
            data_cours_tries_par_phase[data_cours_tries_par_phase.length] = exercices_separes;
        }
        function separationDesEvaluations() {

            for (var i = 0; i < evaluations_effectuees.length; i++) {

                var evaluation_effectuee = evaluations_effectuees[i].split('/');
                evaluations_separees.push(evaluation_effectuee);
            }
            
            data_cours_tries_par_phase[data_cours_tries_par_phase.length] = evaluations_separees;
        }
        
        function calculDuNiveauMaxDuClient() {
            niveau_max = niveauMax();
            function niveauMax() {
                var niveaux = [];
              
                for (var i = 0; i < lessons_separees.length; i++) {
                    niveaux.push(lessons_separees[i][3]);
                }
                niveau_max = Math.max(...niveaux);
           
                return niveau_max;
            }
        }
        function chargementDuNiveauMaxContainer() {
            document.getElementById ('niveau_max_containner').innerHTML = niveau_max; 
        }
        function triDesLessonsParNiveau() {
 
            for (var i = 0; i < lessons_separees.length; i++) {

                var niveau = lessons_separees[i][3];

                if (niveau == 1) {
                    lessons_1.push(lessons_separees[i]);
                }
                if (niveau == 2) {
                    lessons_2.push(lessons_separees[i]);
                }
                if (niveau == 3) {
                    lessons_3.push(lessons_separees[i]);
                }
                if (niveau == 4) {
                    lessons_4.push(lessons_separees[i]);
                }
            }
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