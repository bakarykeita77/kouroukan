
    var programmes_container = document.getElementById('programmes_container');
    var programme_div        = document.getElementById('programme_div');
    var reception            = document.getElementById('reception');
    var programme_ul         = document.getElementById('programme_ul');
    
    var matieres = JSON.parse(sessionStorage.getItem('matieres'));
    
    var niveaux           = JSON.parse(sessionStorage.getItem('niveaux'));
    var niveau_max        = JSON.parse(sessionStorage.getItem('niveau_max'));
    var niveau_en_cours   = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    if(matieres.length === 0) {
        niveau_max = 0;
        niveau_en_cours = 1;
    }
    
    var matieres_etudiees = JSON.parse(sessionStorage.getItem('matieres_etudiees'));
    var derniere_matiere  = JSON.parse(sessionStorage.getItem('derniere_matiere'));
    
    var phase_nbr = JSON.parse(sessionStorage.getItem('phase_nbr'));
    
	var matiere = [], matiere_1 = [], matiere_2 = [], matiere_3 = [], matiere_4 = [], matieres_etudiees = [], derniere_matiere = '';
    
	var phases_etudiees = [], dernieres_phases = [], dernieres_phases_distinctes = [], derniere_phase = '';
	var phase = [], phases_1 = [], phases_2 = [], phases_3 = [], phases_4 = [];

    var click_min_nbr = 0;

    var matieres_etudiees, niveaux, niveau_max, DB_niveau_max, session_niveau_max, phases_etudiees, phase_max_index;
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
    

    $('#nav ul li:nth(1)').addClass('surbrillance');
    $('#nav ul li:nth(1)').siblings().removeClass('surbrillance');

      
/*-------------------------------------------------------------------------------------------------------------------------

Au click sur l'afficheur du programme 
    1)- On obtient le niveau d'étude de l'apprenant par analyse de sa situation.
    2)- On determine le programme en fonction de ce niveau d'étude.

-------------------------------------------------------------------------------------------------------------------------*/
    

    
    programme();
    
/*-----------------------------------------------------------------------------------------------------------------------*/
    
    function programme() {
       
        programme_div.innerHTML = programmeHTML();
        programmeStyle();
        storageDeLaMatiereActive();
        programmeNavigation();
       
        function programmeHTML() {
            var programme_html = '<ul id="programme_ul">';
        
            for (var i = 0; i < liste_de_matieres.length; i++) {

                var matiere_id    = liste_de_matieres[i][0];
                var matiere_nom   = liste_de_matieres[i][1];
                var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i]);
                var niveau        = matiere_index+1;                   
             
              
                if(niveau_max === 0) {
                    var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max;
                    if(matiere_index === 0) {
                        programme_html += '<li id="'+liste_de_matieres[i][0]+'"><a href="'+phases_lien+'">'+liste_de_matieres[i][1]+'</a></li>\n\n';
                    }
                    if(matiere_index > 0) programme_html += '<li><a href="#">'+liste_de_matieres[i][1]+'</a></li>';
                }
                   
                if(niveau_max > 0) {
                    var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&phases_etudiees='+phases_etudiees+'&derniere_phase='+derniere_phase;
                    if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                        if(matiere_index > 0) programme_html += '<li><a href="#">'+liste_de_matieres[i][1]+'</a></li>';
                    }
                    if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                        programme_html += '<li id="'+liste_de_matieres[i][0]+'"><a href="'+phases_lien+'">'+liste_de_matieres[i][1]+'</a></li>\n\n';
                    }
                }
            }
            programme_html += '</ul>';
            
            return programme_html;
        }           
        function programmeStyle() {
        /*--------------------------------------------------------------------------------------------------------------------
         A chaque élément de la liste du programme correspondant un index.
         Cet index est comparé au niveau en cours de l'étudiant : 
            a)- Si l'index est inférieur au niveau en cours, l'élément prend la classe apprises définie dans class.css;
            b)- Si l'index est égal au niveau en cours, l'élément prend la classe active définie dans class.css;
            c)- Si l'index est supérieur au niveau en cours, l'élément prend la classe a_apprendre définie dans class.css.
        --------------------------------------------------------------------------------------------------------------------*/

            let programme_li = $("#programme_ul li");
            
            $.each(programme_li, function() {
                         
                var matiere_index = $(this).index();
                sessionStorage.setItem('matiere_index', JSON.stringify($(this).index()));

                if(niveau_max === 0) {
                    if(matiere_index+1 == niveau_en_cours) $(this).addClass('active');
                    if(matiere_index+1  > niveau_en_cours) $(this).addClass('a_apprendre');
                }
        
                if(niveau_max > 0) {
                    if(matiere_index+1  < niveau_en_cours) $(this).addClass('apprises');
                    if(matiere_index+1  > niveau_en_cours) $(this).addClass('a_apprendre');
                    if(matiere_index+1 == niveau_en_cours) $(this).addClass('active');
                }
            });
        }
        function storageDeLaMatiereActive() {
            $('#programme_ul li').on('click', function(){
                sessionStorage.setItem('matiere_active', JSON.stringify($(this).attr('id'))); 
                sessionStorage.setItem('matiere_nom'   , JSON.stringify($(this).text()    )); 
                sessionStorage.setItem('matiere_index' , JSON.stringify($(this).index()   )); 
                sessionStorage.setItem('niveau_actif'  , JSON.stringify($(this).index()+1 )); 
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
    function changerProgramme() {
        
        let total_phase = sessionStorage.getItem('total_phase');
        
        if( phase_nbr === total_phase) {

            $.each($('#programme_ul li'), function() {
                
                let index = $(this).index();
                
                if(index  < niveau_max) $(this).removeClass('active');
                if(index  < niveau_max) $(this).addClass('apprises');
                if(index == niveau_max) $(this).removeClass('a_apprendre');
                if(index == niveau_max) $(this).addClass('active');
                if(index  > niveau_max) $(this).addClass('a_apprendre');
            });
        }
    }