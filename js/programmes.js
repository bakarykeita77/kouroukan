$(document).ready(function() {

    var programmes_container = $('#programmes_container');
    var client_lessons_bruts_container = document.querySelector('.page_head #client_lessons_bruts_container'); 
    var click_min_nbr = 0;
    
    $('#affiche_programme').on('click', function() {

        var lessons_suivies = '';
        var lessons_separees = [];
        var niveau_max = 1;
        var lessons = [];
        var click_statistic = [];
        var element_click_statistic = [];

        var id, date, id_client, niveau, lesson_brute;

        var lessons_1 = [];
        var lessons_2 = [];
        var lessons_3 = [];
        var lessons_4 = [];
        
        
        recuperationGlobaleDesLessons();
        separationDesLessons();
        calculDuNiveauMaxDuClient();
        triDesLessonsParNiveau();
        verificationDesLessonsEtudiees();
        afficherProgramme();
   
        function recuperationGlobaleDesLessons() {
            lessons_suivies = client_lessons_bruts_container.innerHTML;
            lessons_suivies = lessons_suivies.split('%');
        }
        function separationDesLessons() {

            for (var i = 0; i < lessons_suivies.length; i++) {

                var lesson_suivie = lessons_suivies[i].split('/');
                lessons_separees.push(lesson_suivie);
            }
    
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
        function afficherProgramme() {
            $('#programmes_container').css({'display':'block'});
            $('#reception').css({'display':'none'});
            
            var lesson_active = $('#programme_ul li:nth-child('+niveau_max+')');
            var lessons_apprises = lesson_active.prevAll();
            var lessons_a_apprendre = lesson_active.nextAll();
            
            lessons_apprises.addClass('lessons_apprises');
            lesson_active.addClass('lesson_active');
            lessons_a_apprendre.addClass('lessons_a_apprendre');
            lessons_a_apprendre.click(off);
        }
    });

    programmes_container.html(programme());

    function programme() {

        var programme_html = '<h2>ߘߋ߰ߟߌ ߢߍߥߟߊ </h2>';
        programme_html += '<ul id="programme_ul">';
        for (var i = 0; i < liste_de_matieres.length; i++) {
            programme_html += '<li><a href="lesson.php?matiere_id='+liste_de_matieres[i][0]+'&matiere_nom='+liste_de_matieres[i][1]+'&niveau='+i+'">'+liste_de_matieres[i][1]+'</a></li>';
        }
        programme_html += '</ul>';

        return programme_html;
    }
});