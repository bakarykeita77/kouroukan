
    var programmes_container = document.getElementById('programmes_container');
    var programme_div        = document.getElementById('programme_div');
    var reception            = document.getElementById('reception');
    var programme_ul         = document.getElementById('programme_ul');

    var client_lessons_bruts_container      = document.querySelector('.page_head #client_lessons_bruts_container');
    var client_exercices_bruts_container    = document.querySelector('.page_head #client_exercices_bruts_container');
    var client_evaluations_brutes_container = document.querySelector('.page_head #client_evaluations_brutes_container');
    var situation_des_etudes_container      = document.getElementById('situation_des_etudes_container');

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


/*-------------------------------------------------------------------------------------------------------------------------

Au click sur l'afficheur du programme 
    1)- On obtient le niveau d'étude de l'apprenant par analyse de sa situation.
    2)- On determine le programme en fonction de ce niveau d'étude.

-------------------------------------------------------------------------------------------------------------------------*/
    
    let session_phase_nbr = sessionStorage.getItem('session_phase_nbr');
// sessionStorage.removeItem('sessison_phase_nbr'); sessionStorage.removeItem('DB_phase_nbr'); sessionStorage.removeItem('session_niveau_max'); sessionStorage.removeItem('DB_niveau_max'); sessionStorage.removeItem('niveau_max'); 	    
    
    niveaux            = JSON.parse(sessionStorage.getItem('niveaux'));
    session_niveau_max = JSON.parse(sessionStorage.getItem('session_niveau_max'));
    DB_niveau_max      = JSON.parse(sessionStorage.getItem('niveau_max'));
    if(session_niveau_max != null && DB_niveau_max != null) {
        niveau_max = (session_niveau_max > DB_niveau_max) ?  session_niveau_max : DB_niveau_max;
        
        matieres_etudiees = sessionStorage.getItem('matieres_etudiees');
        derniere_matiere  = sessionStorage.getItem('derniere_matiere');
        phases_etudiees   = sessionStorage.getItem('phases_etudiees');
        dernieres_phases  = sessionStorage.getItem('dernieres_phases');
        dernieres_phases_distinctes  = JSON.parse(sessionStorage.getItem('dernieres_phases_distinctes'));
        derniere_phase    = sessionStorage.getItem('derniere_phase');
    }else{
        niveau_max = 0;
    }
  
/*2*/programme();
    if(session_niveau_max > DB_niveau_max) changerProgramme();
      
    
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
         Cet index est comparé au niveau max de l'étudiant : 
            a)- Si l'index est inférieur au niveau max, l'élément prend la classe apprises définie dans class.css;
            b)- Si l'index est égal au niveau max, l'élément prend la classe active définie dans class.css;
            c)- Si l'index est supérieur au niveau max, l'élément prend la classe a_apprendre définie dans class.css.
        --------------------------------------------------------------------------------------------------------------------*/

            let programme_li = $("#programme_ul li");
            
            $.each(programme_li, function() {
                         
                var matiere_index = $(this).index();

                if(niveau_max === 0) {
                    if(matiere_index === 0) $(this).addClass('active');
                    if(matiere_index > 0) $(this).addClass('a_apprendre');
                }
        
                if(niveau_max > 0) {
                    if(matiere_index  < niveau_max) $(this).addClass('apprises');
                    if(matiere_index  > niveau_max+1) $(this).addClass('a_apprendre');
                    if(matiere_index == niveau_max) {
                        
                        let total_phases = (niveau_max == 0) ? 3:4;
                        let nbr_phases_etudiees = dernieres_phases_distinctes.length;
                    
                        if(total_phases == nbr_phases_etudiees) { 
                            
                            $(this).removeClass('active'); 
                            $(this).addClass('apprises'); 
                            $(this).next().removeClass('a_apprendre'); 
                            $(this).next().addClass('active');
                        }
                        if(total_phases > nbr_phases_etudiees) { 
                            
                            $(this).removeClass('a_apprendre'); 
                            $(this).addClass('active'); 
                            $(this).next().removeClass('a_apprendre'); 
                            $(this).next().addClass('a_apprendre');
                        }
                    }
                }
            });
        }
        function storageDeLaMatiereActive() {
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
    function changerProgramme() {
        
        let total_phase = sessionStorage.getItem('total_phase');
        
        if( session_phase_nbr === total_phase) {
            //sessionStorage.removeItem('session_phase_nbr');
        
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