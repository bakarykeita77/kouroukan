$('document').ready(function() {
      
 //Récupération des données, storées depuis aaccueil.js, sur l'apprenant  
    var matieres          = JSON.parse(sessionStorage.getItem('matieres'));     
    var matiere_index     = JSON.parse(sessionStorage.getItem('matiere_index'));
    var niveau_en_cours   = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var niveau_actif      = JSON.parse(sessionStorage.getItem('niveau_actif'));
    var phases_distinctes = JSON.parse(sessionStorage.getItem('phases_distinctes'));
    
    var rang = '';
    var data_phase_nbr = 0;


 /*-------------------------------------------------------------------------------------------------------------------
    1)- La situation des études est faite par récupération et traitement des données reçues sur l'apprenant.
    2)- La liste des phases est établie en fonction du niveau d'étude de l'apprenant (selon les phases étudiées ou pas)
    3)- Le paramétrage conséquent est défini pour la leçon future.
    4)- Les phases s'affichent et
    5)- On peut surfer

 /*-----------------------------------------------------------------------------------------------------------------*/

    matieres_length = (matieres !== null) ? matieres.length : 0;
    if(matieres_length === 0) {  matiere_index = 0; niveau_en_cours = 1; }

 /*-----------------------------------------------------------------------------------------------------------------*/
  
    phases();
    matiere();
            
 /*-----------------------------------------------------------------------------------------------------------------*/
    
    function phases() {
    
        let all_options = JSON.parse(localStorage.getItem('all_options')); 
        let localOptionsLength = (all_options == null) ? 0 : all_options.length;

        chargerPhases();
        data_phase_nbr = nombreDePhasesEtudiees();
        sessionStorage.setItem('data_phase_nbr', JSON.stringify(data_phase_nbr));
        sessionStorage.setItem('total_phase', JSON.stringify($('#phases_list li').length));
        actualiserTitre();
        stylesDesPhases();
        
            
        function chargerPhases() { 
            $('.phases_container').html(phasesHTML()); 

            function phasesHTML() {
            
                var lesson_id = $('.lesson_title').attr('id');
                
            // Liste des phases
                var content = '<ul class="phases" id="phases_list">';
                if(matiere_index == 0) {
                    for(var i=0;i<2;i++){
                        let phase_id = liste_de_phases[i][0];
                        let phase_nom = liste_de_phases[i][1];
                    
                        content += '<li id="'+lesson_id+'_'+phase_id+'">'+phase_nom+'</li>';
                    }
                    for(var j=3;j<liste_de_phases.length;j++){
                        let phase_id = liste_de_phases[j][0];
                        let phase_nom = liste_de_phases[j][1];
                        
                        content += '<li id="'+lesson_id+'_'+phase_id+'">'+phase_nom+'</li>';
                    }
                }
                if(matiere_index > 0) {
                    for(var i=0;i<liste_de_phases.length;i++){
                        let phase_id = liste_de_phases[i][0];
                        let phase_nom = liste_de_phases[i][1];
                        
                        content += '<li id="'+lesson_id+'_'+phase_id+'">'+phase_nom+'</li>';
                    }
                }
                content += '</ul>';
                
                return content;
            }
        }
        function stylesDesPhases() {
        
            let lesson_status = lessonStatus();
            let n = nombreDePhasesEtudiees();

            $.each($('#phases_list li'), function() {
                
                var phase_index = $(this).index();
            
                if(lesson_status == "lesson_a_etudier") {

                    if(phase_index === 0) $(this).addClass('active');
                    if(phase_index  >  0) $(this).addClass('a_apprendre');
                }
                if(lesson_status == "lesson_en_cours") {
                    if(phase_index <= n-1) $(this).removeClass('active').addClass('apprises');
                    if(phase_index == n  ) $(this).removeClass('a_apprendre').addClass('active');
                    if(phase_index >= n+1) $(this).addClass('a_apprendre');
                }
                if(lesson_status == "lesson_etudie") $(this).addClass('apprises');
                
            //Cas specifique de pratiques                    
                if(localOptionsLength === 4) {
                    $('#syllabes_pratique, #tons_pratique, #chiffres_pratique').removeClass('active').addClass('apprises');
                }
            });
        }
        function lessonStatus() {
            
            let li = $('#phases_list li');
            let indice = 0, ls = "";
            $.each(li, function() { 
                let li_id = $(this).attr('id');
                indice = ($.inArray(li_id, phases_distinctes) === -1) ? indice : indice+=1; 
            });
            
            
            if(indice === 0) ls = "lesson_a_etudier";
            if(indice === li.length) ls = "lesson_etudie";
            if(indice > 0 && indice < li.length) ls = "lesson_en_cours";

            return ls;
        }
        function actualiserTitre() {
            var niveau = $('.niveau_courant').text();
        
            rang = (niveau=='߁')?'߭':'߲';
            $('.rang').html(rang);
        }
    }
    function nombreDePhasesEtudiees() {
        let n = 0; // nombre de phases étudiées.
        let phases = JSON.parse(sessionStorage.getItem('phases_distinctes')); // Voir accueil.js fonction dataStorage()
        
        $.each($('#phases_list li'), function() {
            let phase_id = $(this).attr('id');
            if($.inArray(phase_id, phases) !== -1) n++;
        });

        return n;
    }
    function matiere() {		
        
        $('#phases_list li').on('click', function(){
            
            var phase_class = $(this).attr('class');
            var phase_id = $(this).attr('id');
            var phase_nom = $(this).html();
            var course_id = phase_id.split('_')[1];
            var autorisation_d_acces_aux_cours = 'non';
            
            sessionStorage.setItem('phase_class', JSON.stringify(phase_class));
            sessionStorage.setItem('phase', JSON.stringify(phase_id));
            sessionStorage.setItem('phase_nom', JSON.stringify(phase_nom));
            sessionStorage.setItem("course_id", JSON.stringify(course_id));
            sessionStorage.setItem("phase_id", JSON.stringify(phase_id));

         /*--------------------------------------------------------------------*/ 
         
            autorisationDAccesAuxCours(); 
            choixDeProcedures();
            // suivreLesCours();
            
         /*--------------------------------------------------------------------*/  

            function autorisationDAccesAuxCours() {
                var frecance_du_cours = frecanceDuCours();

                if(phase_class == 'apprises') { 
                    autorisation_d_acces_aux_cours = (frecance_du_cours < 5) ? 'oui' : 'non';
                    if(autorisation_d_acces_aux_cours === 'non') { 
                        $('.course_container').css('display','none'); 
                        alert("ߥߟߊ߬ߘߊ ߣߌ߲߰ ߡߊ߬ߛߍ߬ߦߌ߬ߟߌ ߓߘߊ߫ ߟߏ߯ߟߎ߫ ߓߐ߫.\n ߕߊ߲߬ߓߌ߫ ߥߟߊ߬ߘߊ߬ ߜߘߍ߫ ߝߍ߬،"); 
                    }
                    return false;
                }
                if(phase_class == 'a_apprendre') { 
                    autorisation_d_acces_aux_cours = 'non';
                    $('.course_container').css('display','none'); alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫"); 
                    return false;
                }
                if(phase_class == 'active') { 
                    autorisation_d_acces_aux_cours = 'oui';
                }
                
                function frecanceDuCours() {
                    let frecance = 0;
                    $.each($('.travail'), function() {
                        var phase_travaux_nom = $('h3', this).html().split(' ')[1];
                        if(phase_travaux_nom == phase_nom) frecance = $('.bulles_container p', this).length;
                    });
                    return frecance;
                }  
            }
            function choixDeProcedures() {
                afficherCourse($('.course_container'));
                // afficherCourse($('#apprentissage_container > div:nth-child(2)'));

                // $('#lesson_option_1').click(function(){
                //     $('.fermeture').attr('id', 'fermer_pre_apprentissage'); 
                //     preApprentissage(); 
                // });
                // $('#lesson_option_2').click(function(){ 
                //     $('.fermeture').attr('id', 'fermer_apprentissage'); 
                //     apprentissage();
                // });
            }
            function suivreLesCours() {              
                if(autorisation_d_acces_aux_cours == 'oui') {

                    parametrageDeLesson();  // Voir parametres.js
                    afficherLesson();
                    dispenserLesson(); 

                    
                    function afficherLesson(){

                        var lesson_active = lessonActive();

                        $('.course_container').css({'display':'block'});
                        $('.course').css('display','none');
                        afficherCourse(lesson_active);

                        function lessonActive() {
                            var lesson = '';

                            switch (course_id) {
                                case 'apprentissage':lesson = $('#apprentissage'); break;
                                case 'exercice'     :lesson = $('#exercice');      break;
                                case 'pratique'     :lesson = $('#pratique');      break;
                                case 'evaluation'   :lesson = $('#evaluation');    break;
                            }

                            return lesson;
                        }
                    }
                    function dispenserLesson() {
                        switch (course_id) {
                            case 'apprentissage':apprentissages(); break;   // Voir apprentissage.js
                            case 'exercice'     :exercices();      break;   // Voir exercice.js
                            case 'pratique'     :pratique();       break;   // Voir pratiques.js
                            case 'evaluation'   :evaluations();    break;   // Voir evaluations.js
                        }
                    }
                }
            }
        });
        
        $('#go_to_lesson').on('click', function() { $('.phases_container ul li').click(); });
    }
});