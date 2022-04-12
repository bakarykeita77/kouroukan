$(document).ready(function() {

    var programmes_container = $('#programmes_container');
    var reception = $('#reception');
    var programme_ul = $('#programme_ul');

    var client_lessons_bruts_container = document.querySelector('.page_head #client_lessons_bruts_container');
    var client_exercices_bruts_container = document.querySelector('.page_head #client_exercices_bruts_container');
    var client_evaluations_brutes_container = document.querySelector('.page_head #client_evaluations_brutes_container');
    var situation_des_etudes_container = document.getElementById('situation_des_etudes_container');

    var click_min_nbr = 0;
  
  /*-----------------------------------------------------------------------------------------------------------------------*/


        var matieres_etudiees, niveau_max, phases_etudiees, phase_max_index;
        var lessons_suivies = '';
        var exercices_effectues = '';
        var evaluations_effectuees = '';

        var lessons_separees = [], exercices_separes = [], evaluations_separees = [];
        var exercices = [], evaluatons = [];

        var click_statistic = [];
        var element_click_statistic = [];

        var id, date, id_client, niveau, lesson_brute;

        var cours_par_phase = [];
        var situations = [];
        var situation_des_etudes = [];
        var data_cours_tries_par_phase = [];
        var data_cours_tries_par_niveau = [];
        
        var etape_1 = [], etape_2   = [], etape_3   = [], etape_4   = [];
        var cours   = [], cours_1   = [], cours_2   = [], cours_3   = [];
        var lessons = [], lessons_1 = [], lessons_2 = [], lessons_3 = [];
        var phases  = [], phases_1  = [], phases_2  = [], phases_3  = [];
        
        var client_info = [], niveaux_client = [], phases = [];
        var liste_des_niveaux = [], liste_des_phases = [];
        var situations_container = '', situation_globale = [];

        var resume_brut_des_etudes = [];
        var resume_des_etudes = [];
        var p = [];
        var point_max = '';
        


    /*-------------------------------------------------------------------------------------------------------------------------

     Au click sur l'afficheur du programme 
        1)- On obtient le niveau d'étude de l'apprenant par analyse de sa situation.
        2)- On determine le programme en fonction du niveau d'étude.

    -------------------------------------------------------------------------------------------------------------------------*/


        niveaux           = sessionStorage.getItem('niveaux');
        niveau_max        = parseInt(sessionStorage.getItem('niveau_max'));
        matieres_etudiees = sessionStorage.getItem('matieres_etudiees');
        derniere_matiere  = sessionStorage.getItem('derniere_matiere');
        phases_etudiees   = sessionStorage.getItem('phases_etudiees');
        derniere_phase    = sessionStorage.getItem('derniere_phase');

   /*2*/programme();
   

       // situationDesEtudes();
       // resume_brut_des_etudes = situations[situations.length-1];
       // resume_des_etudes = convertirResumeDeSituationsEnObjet();
       // verificationDesLessonsEtudiees();
       


    /*-----------------------------------------------------------------------------------------------------------------------*/
        
        
        function situationDesEtudes() {

            var donnees_ajax = document.getElementById('donnees_ajax');
            var phases_par_niveau = [];
            var cours_par_phase = [];
            var cour = [];
            var points = [], points_1 = [], points_2 = [], points_3 = [], points_4 = [];
            
            var user          = JSON.parse(sessionStorage.getItem('users'));
            var user_alphabet = JSON.parse(localStorage.getItem('alphabet'));
            var user_syllabes = JSON.parse(localStorage.getItem('syllabes'));
            var user_tons     = JSON.parse(localStorage.getItem('tons'));
            var user_chiffres = JSON.parse(localStorage.getItem('chiffres'));
             

            
            recuperationDesDonneesAjax();
            triDesCoursParPhase();
            triDesCoursParNiveau();
            situation();
           
            return situations; 


            function recuperationDesDonneesAjax() {
                var data_container = document.querySelectorAll('#donnees_ajax div');
    
                $.each(data_container, function() {
                    cours[cours.length] = $(this).html();
                });
            }
            function triDesCoursParPhase() {
                for (var i = 1; i < cours.length; i++) {
                         
                    if(cours[i] !== '') {    
                        var cours_par_phase = cours[i].split('%');
                        var cours_traite_par_phase = [];
        
                        for (var j = 0; j < cours_par_phase.length; j++) {
        
                            var cour = cours_par_phase[j].split('/');
                            

                            var phase = cour[0];
                            var date = cour[1];
                            var id_client = cour[2];
                            var niveau = cour[3];
                            var cour_c = cour[4].split(';');
                            if(cour.length == 6) {
                                var point = cour[5]; 
                            }
                            
                            var cour_traite = [];
         
                            
                            for (var k = 0; k < cour_c.length; k++) {
                                
                                element = cour_c[k];
                                element = element.split(',');
                                cour_traite[cour_traite.length] = element;
                            }
                            
                             
                            cours_traite_par_phase[cours_traite_par_phase.length] = [phase, date, id_client, niveau, cour_traite, point];
                        }
                        data_cours_tries_par_phase.push(cours_traite_par_phase);
                    }
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
                        
                        data_cours_tries_par_niveau = [etape_1, etape_2, etape_3, etape_4];

                        function etape1() {
                            if (niveau == 1) {
                                lessons_1[lessons_1.length] = data_cours_tries_par_phase[i][j];
                                etape_1 = [niveau, lessons_1];
                            }
                        }
                        function etape2() {
                            if (niveau == 2) {
                                lessons_2[lessons_2.length] = data_cours_tries_par_phase[i][j];
                                etape_2 = [niveau, lessons_2];
                            }
                        }
                        function etape3() {
                            if (niveau == 3) {
                                lessons_3[lessons_3.length] = data_cours_tries_par_phase[i][j];
                                etape_3 = [niveau, lessons_3];
                            }
                        }
                        function etape4() {
                            if (niveau == 4) {
                                lessons_4[lessons_4.length] = data_cours_tries_par_phase[i][j];
                                etape_4 = [niveau, lessons_4];
                            }
                        }
                    }
                }

                situations[situations.length] = data_cours_tries_par_niveau;
            }
            function situation() {
                

                var phases_1 = [], phases_11 = [], phases_12, phases_13 = [], phases_14 = [];
                var phases_2 = [], phases_21 = [], phases_22, phases_23 = [], phases_24 = [];
                var phases_3 = [], phases_31 = [], phases_32, phases_33 = [], phases_34 = [];

                var n_11 = 0, n_12 = 0, n_13 = 0, n_14 = 0;
                var n_21 = 0, n_22 = 0, n_23 = 0, n_24 = 0;
                var n_31 = 0, n_32 = 0, n_33 = 0, n_34 = 0;

                for (var i = 0; i < data_cours_tries_par_phase.length; i++) {
                    for (var j = 0; j < data_cours_tries_par_phase[i].length; j++) {
        
                        var niveau = data_cours_tries_par_phase[i][j][3];
                        var phaze = data_cours_tries_par_phase[i][j][0];
                        var list_element = [niveau, phaze];
                    
                        if(niveau == 1 && phaze == 'ߓߟߏߦߊߟߌ') {
                            points_1[points_1.length] = data_cours_tries_par_phase[i][j][5];
                        }
                        if(niveau == 2 && phaze == 'ߓߟߏߦߊߟߌ') {
                            points_2[points_2.length] = data_cours_tries_par_phase[i][j][5];
                        }
                        if(niveau == 3 && phaze == 'ߓߟߏߦߊߟߌ') {
                            points_3[points_3.length] = data_cours_tries_par_phase[i][j][5];
                        }
                        if(niveau == 4 && phaze == 'ߓߟߏߦߊߟߌ') {
                            points_4[points_4.length] = data_cours_tries_par_phase[i][j][5];
                        }
                        
                        liste_des_phases[liste_des_phases.length] = list_element;
                    }
                }

                for (var i = 0; i < liste_des_phases.length; i++) {

                    var nivo = liste_des_phases[i][0];
                    var phase = liste_des_phases[i][1];
                    var p = liste_des_phases[i][1];
                    
                    
                    if (nivo == 1 && phase == liste_de_phases[0][1]) {
                        n_11++;
                        phases_11 = [nivo, p, n_11];
                    }
                    if (nivo == 2 && phase == liste_de_phases[0][1]) {
                        n_12++;
                        phases_12 = [nivo, p, n_12];
                    }
                    if (nivo == 3 && phase == liste_de_phases[0][1]) {
                        n_13++;
                        phases_13 = [nivo, p, n_13];
                    }
                    if (nivo == 4 && phase == liste_de_phases[0][1]) {
                        n_14++;
                        phases_14 = [nivo, p, n_14];
                    }
                    
                   
                    if (nivo == 1 && phase == liste_de_phases[1][1]) {
                        n_21++;
                        phases_21 = [nivo, p, n_21];
                    }
                    if (nivo == 2 && phase == liste_de_phases[1][1]) {
                        n_22++;
                        phases_22 = [nivo, p, n_22];
                    }
                    if (nivo == 3 && phase == liste_de_phases[1][1]) {
                        n_23++;
                        phases_23 = [nivo, p, n_23];
                    }
                    if (nivo == 4 && phase == liste_de_phases[1][1]) {
                        n_24++;
                        phases_24 = [nivo, p, n_24];
                    }
                    
                    
                    if (nivo == 1 && phase == liste_de_phases[2][1]) {
                        n_31++;
                        phases_31 = [nivo, p, n_31, points_1.join('_')];
                    }
                    if (nivo == 2 && phase == liste_de_phases[2][1]) {
                        n_32++;
                        phases_32 = [nivo, p, n_32, points_2.join('_')];
                    }
                    if (nivo == 3 && phase == liste_de_phases[2][1]) {
                        n_33++;
                        phases_33 = [nivo, p, n_33, points_3.join('_')];
                    }
                    if (nivo == 4 && phase == liste_de_phases[2][1]) {
                        n_34++;
                        phases_34 = [nivo, p, n_34, points_4.join('_')];
                    }
                }
                
    
                phases_1 = [phases_11, phases_21, phases_31].join(';');
                phases_2 = [phases_12, phases_22, phases_32].join(';');
                phases_3 = [phases_13, phases_23, phases_33].join(';');

                situation_des_etudes = [phases_1, phases_2, phases_3].join('/');
                situations[situations.length] = situation_des_etudes;
            }
            
        }
        function verificationDesLessonsEtudiees() {
        
            var niveau_en_cours = niveau_max+1;
            var lessons_du_niveau_en_cours = '';    // Varie en fonction du niveau_en_cours.
            var lessons = [], lesson = [], lesson_verifiee = [], lessons_verifiees = [];

            switch (niveau_en_cours) {

                case 1:
                    lessons_du_niveau_en_cours = lessons_1;
                    break;
                case 2:
                    lessons_du_niveau_en_cours = lessons_2;
                    break;
                case 3:
                    lessons_du_niveau_en_cours = lessons_3;
                    break;
                case 4:
                    lessons_du_niveau_en_cours = lessons_4;
                    break;
            }
            verifications();

            function verifications() {
                    for (var i = 0; i < lessons_du_niveau_en_cours.length; i++) {
                        
                        var lesson = lessons_du_niveau_en_cours[i][4];
                        lessons[lessons.length] = lesson;                        
                    }
                    for (var i = 0; i < lessons.length; i++) {
                        for (var j = 0; j < lessons[i].length; j++) {

                            var lesson_element = lessons[0][j];
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
        }
        function convertirResumeDeSituationsEnObjet() {
            var resume = situations[situations.length-1].split('/');
                   
            for (var i = 0; i < resume.length; i++) {
                resume[i] = resume[i].split(';');
                for (var j = 0; j < resume[i].length; j++) {
                    resume[i][j] = resume[i][j].split(',');
                    for (var k = 0; k < resume[i][j].length; k++) {
                                
                        if(k == 0 && resume[i][j][k] !== '') {
                            resume[i][j][k] = parseInt(resume[i][j][k]);
                        }
                        if(k == 2 && resume[i][j][k] !== '') {
                            resume[i][j][k] = parseInt(resume[i][j][k]);
                        }
                        if(k == 3) {
                            resume[i][j][k] = resume[i][j][k].split('_');
                            for (var l = 0; l < resume[i][j][k].length; l++) {
                                resume[i][j][k][l] = reverseIntNko(resume[i][j][k][l]);
                                resume[i][j][k][l] = parseInt(resume[i][j][k][l]); 
                            }
                        }
                    }
                }
            }
         
            return resume; 
        }
        function programme() {
            
            programme_ul.html(programmeHTML());
            programmeStyle();
            nomDeLaMatiereActive();
            programmeNavigation();
            

            function programmeHTML() {
                var programme_html = '<ul id="programme_ul">';
            
                for (var i = 0; i < liste_de_matieres.length; i++) {
                                
                    var matiere_id    = liste_de_matieres[i][0];
                    var matiere_nom   = liste_de_matieres[i][1];
                    var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i]);
                    var niveau        = matiere_index+1;
                   
                   if (niveau_max >= matiere_index) 
                   {
                        var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&phases_etudiees='+phases_etudiees+'&derniere_phase='+derniere_phase;
                        programme_html += '<li id="'+liste_de_matieres[i][0]+'"><a href="'+phases_lien+'">'+liste_de_matieres[i][1]+'</a></li>\n\n';
                    } else {
                        programme_html += '<li><a href="#">'+liste_de_matieres[i][1]+'</a></li>';
                    } 
                }
                programme_html += '</ul>';
                
                return programme_html;
            }           
            function programmeStyle() {
             /*--------------------------------------------------------------------------------------------------------------------
              A chaque élément de la liste du programme correspondant un index.
              Cet index est comparé au niveau max de l'étudiant : 
                a)- Si l'index est inférieur au niveau max, l'élément prend la classe apprises définie dans class.css;
                b)- Si l'index est égal au niveau max, l'élément prend la classe active définie dans class.css;
                c)- Si l'index est supérieur au niveau max, l'élément prend la classe a_apprendre définie dans class.css.
             --------------------------------------------------------------------------------------------------------------------*/

                $.each($('#programmes_container ul li'), function() {
                    
                    var matiere_index = $(this).index();
                  
                    if(matiere_index  < niveau_max) $(this).addClass('apprises');
                    if(matiere_index == niveau_max) $(this).addClass('active');
                    if(matiere_index  > niveau_max) $(this).addClass('a_apprendre');
                });
            }
            function nomDeLaMatiereActive() {
                $('#programme_ul li').on('click', function(){
                    
                    sessionStorage.setItem('matiere_active', $(this).attr('id')); 
                    sessionStorage.setItem('matiere_nom'   , $(this).text()    ); 
                    sessionStorage.setItem('matiere_index' , $(this).index()   ); 
                    sessionStorage.setItem('niveau_actif'  , $(this).index()+1 ); 
                    
                });
            }
            function programmeNavigation() {
    
                $('#back_to_accueil').on('click', function() {
                    programmes_container.css('display','none');
                    reception.css('display','block');
                });
                
              //Le click sur le bouton next redirige sur la page de lessons.
            }
        }
       

});