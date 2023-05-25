$('document').ready(function() {

 //Declaration des variables
    var id = JSON.parse(sessionStorage.getItem('id'));     
    var matieres = JSON.parse(sessionStorage.getItem('matieres'));     
    var matieres_etudiees = [],  matiere_index = 0;
    var niveaux = [], niveau_max = 0;
    
	var rang = '';
    var data_phase_nbr = 0, phases_distinctes = [], nbr = 0;
 
  /*-------------------------------------------------------------------------------------------------------------------
    1)- La situation des études est faite par récupération et traitement des données reçues sur l'apprenant.
	2)- La liste des phases est établie en fonction du niveau d'étude de l'apprenant (selon les phases étudiées ou pas)
	3)- Le paramétrage conséquent est défini pour la leçon future.
	4)- Les phases s'affichent et
	5)- On peut surfer

  /*--------------------------------------------------------------------*/
 //Récupération des données reçues sur l'apprenant  
    matieres        = JSON.parse(sessionStorage.getItem('matieres')); 
    matieres_length = (matieres !== null) ? matieres.length : 0;

  /*-----------------------------------------------------------------------------------------------------------------*/

  //Traitement des données reçues sur l'apprenant
    if(matieres_length === 0) {
        matiere_index = 0;
        
        niveaux_etudies = [];
        niveau_max = 0;
        niveau_en_cours = 1;
        
        phases_etudiees = [];
        derniere_phase = '';
        phase_en_cours = 'alphabet_apprentissage';
        
        nbr = 0;
    }
    if(matieres_length > 0) {

        getMatieres();
        getNiveaux();
        getPhases();
       
        nbr = JSON.parse(sessionStorage.getItem('nbr')); 
    }

  /*-----------------------------------------------------------------------------------------------------------------*/
    
    phases();
    matiere();
   
  /*-----------------------------------------------------------------------------------------------------------------*/
    
    function getMatieres() {
        matieres_etudiees   = JSON.parse(sessionStorage.getItem('matieres_etudiees'));     
        derniere_matiere    = JSON.parse(sessionStorage.getItem('derniere_matiere'));     
        matiere_active      = JSON.parse(sessionStorage.getItem('matiere_active'));     
        matiere_nom         = JSON.parse(sessionStorage.getItem('matiere_nom'));
        matiere_index       = JSON.parse(sessionStorage.getItem('matiere_index')); 
    }
    function getNiveaux() {
        niveaux             = JSON.parse(sessionStorage.getItem('niveaux'));     
        niveaux_etudies     = JSON.parse(sessionStorage.getItem('niveaux_etudies'));
        niveaux_distincts   = JSON.parse(sessionStorage.getItem('niveaux_distincts'));     
        niveau_max          = JSON.parse(sessionStorage.getItem('niveau_max'));
        niveau_en_cours     = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    }
	function getPhases() { 
        total_phase         = JSON.parse(sessionStorage.getItem('total_phase'));
        dernieres_phases    = JSON.parse(sessionStorage.getItem('dernieres_phases'));  
        derniere_phase      = JSON.parse(sessionStorage.getItem('derniere_phase')); 
        dernieres_phases_distinctes  = JSON.parse(sessionStorage.getItem('dernieres_phases_distinctes'));        
        phases_etudiees     = JSON.parse(sessionStorage.getItem('phases_etudiees'));
        phases_distinctes   = JSON.parse(sessionStorage.getItem('phases_distinctes'));
        phases_1_distinctes = JSON.parse(sessionStorage.getItem('phases_1_distinctes'));
        phases_2_distinctes = JSON.parse(sessionStorage.getItem('phases_2_distinctes'));
        phases_3_distinctes = JSON.parse(sessionStorage.getItem('phases_3_distinctes'));
        phases_4_distinctes = JSON.parse(sessionStorage.getItem('phases_4_distinctes'));
    }
    function phases() {
        
        var phases_collection = phasesCollection();

        let pratiques = JSON.parse(localStorage.getItem('pratiques'));
        let all_options = JSON.parse(localStorage.getItem('all_options')); 
        let localOptionsLength = (all_options == null) ? 0 : all_options.length;

    	chargerPhases();
    	
    	data_phase_nbr = nombreDePhasesEtudiees();
    	sessionStorage.setItem('data_phase_nbr', JSON.stringify(data_phase_nbr));
    	id_phases = idDesPhases();
    	sessionStorage.setItem('total_phase', JSON.stringify($('#phases_list li').length));
        actualiserTitre();
	    stylesDesPhases();
	    //affichageDesPhases();
	    
	    
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
                
            //Barre de navigation               
                // content += '<div class="nav_fleches_container">';
                //     content += '<span id="back_to_programmes"><a href="programmes.php">ߛߋ߬ߦߌ߬ ߞߐ߫</a></span>';
                //     content += '<span id="go_to_lesson">ߥߊ߫ ߢߍ߫</</span>';
                // content += '</div>';

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
        let phases = JSON.parse(sessionStorage.getItem('phases_distinctes'));
	    
        $.each($('#phases_list li'), function() {
            let phase_id = $(this).attr('id');
            if($.inArray(phase_id, phases) !== -1) n++;
        });

	    return n;
	}
    function phasesCollection() {
        let collection = [];
                
        for (var i = 0; i < liste_de_phases.length; i++) {
            collection[i] = liste_de_phases[i][1];
        }
               
        return collection;
    }
    function idDesPhases() {
        let id_phases = [];
        $.each($('#phases_list li'), function() {
            let phase_id = $(this).attr('id');
            id_phases.push(phase_id);
        });
        return id_phases;
    }
	function matiere() {
 		
    	$('#phases_list li').on('click', function(){
            
            var lesson_content = lessonContent(); // Voir js/parametres.js
    	    var lesson_courante = lessonHTML(lesson_content);
   
            var questions_quantity = quantiteDeQuestion();
            var quantite_de_question = quantiteDeQuestion();
            var compteur_de_question = 0;
            
            var phase_class = $(this).attr('class');
    	    var phase_id = $(this).attr('id');
    	    var course_id = phase_id.split('_')[1];
            
            
            sessionStorage.setItem('lesson_content',JSON.stringify(lesson_content));
            sessionStorage.setItem('lesson_courante',JSON.stringify(lesson_courante));
            sessionStorage.setItem('quantite_de_question',JSON.stringify(quantite_de_question));
            sessionStorage.setItem('phase_class', JSON.stringify(phase_class));
            sessionStorage.setItem("phase_id", JSON.stringify(phase_id));

            /*--------------------------------------------------------------------*/ 

    	    phaseActiveName();
    	    affichageDeCours();
    	    cours();
            
          /*--------------------------------------------------------------------*/  

            function phaseActiveName() { sessionStorage.setItem('phase', JSON.stringify(phase_id)); }

    	    function coursEnteteHTML() {
    	        var ceh = '';
    	       
    	        if(course_id=='apprentissage'){ ceh = apprentissageEnteteHTML(); }
    	        if(course_id=='exercice'){ ceh = exerciceEnteteHTML(); }
    	       // if(course_id=='pratique'){ ceh = pratiqueEnteteHTML(); }
    	         
    	        return ceh;
    	        
    	        function apprentissageEnteteHTML() {
    	            
                    var apprentissage_entete_html = "<div class='play_btn_container'><span class='play_label'>ߝߐߟߊ߲</span><span class='play_icon'>"+play_icon+"</span></div>";
                    apprentissage_entete_html += "<div class='stop_btn_container'><span class='stop_label'>ߘߊ߬ߘߋ߬ߟߊ߲ </span> <span class='stop_icon'>"+stop_icon+"</span></div>";
                    apprentissage_entete_html += "<div class='parametre_btn_container'><span class='parametre_label'>ߛߏ߯ߙߏߟߊ߲</span>  <span class='parametre_icon'>"+parametre_icon+"</span></div>";
                            
                    return apprentissage_entete_html;
    	        }
    	        function exerciceEnteteHTML() {
    	            
                    var exercice_head_html = "<div class='play_icon_container' id='exercice_player' style='width:auto'>";
                        exercice_head_html += "<span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>";
                    	exercice_head_html += "<span class='qtite_question'>"+quantite_de_question+"</span> : <span class='ordre_question'>"+parseIntNko(compteur_de_question)+question_rang+" </span>";
                    	exercice_head_html += "<span class='ecouter_question'> ߟߊߡߍ߲߫</span><span class='play_icon'>"+play_icon+"</span>";
                    exercice_head_html += "</div>";
                    exercice_head_html += "<div class='oreille_icon_container'><span class='reecoute_label'>ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> <span class='oreille_icon'>"+oreille_icon+"</span></div>";
                    
                    return exercice_head_html;
    	        }
    	    }
            function lessonCourante() {
                
                if(phase_id=='alphabet_apprentissage') lesson_courante = lessonHTML(lesson_content); // Voir alphabet.js 
                if(phase_id=='alphabet_exercice'     ) lesson_courante = alphabetExerciceHTML();      // Voir alphabet.js
                
                if(phase_id=='syllabes_apprentissage') lesson_courante = lessonHTML(lesson_content); // Voir syllabes.js
                if(phase_id=='syllabes_exercice'     ) lesson_courante = syllabesExerciceHTML();      // Voir syllabes.js
                if(phase_id=='syllabes_pratique'     ) lesson_courante = syllabesPratiquesHTML();     // Voir syllabes.js
              
                if(phase_id=='tons_apprentissage'    ) lesson_courante = tonsApprentissageHTML();     // Voir tons.js
                if(phase_id=='tons_exercice'         ) lesson_courante = tonsExerciceHTML();          // Voir tons.js
                if(phase_id=='tons_pratique'         ) lesson_courante = tonsPratiquesHTML();         // Voir tons.js
            
                if(phase_id=='chiffres_apprentissage') lesson_courante = chiffresApprentissageHTML(); // Voir chiffres.js
                if(phase_id=='chiffres_exercice'     ) lesson_courante = chiffresExerciceHTML();      // Voir chiffres.js
                if(phase_id=='chiffres_pratique'     ) lesson_courante = chiffresPratiquesHTML();     // Voir chiffres.js
 
                return lesson_courante;
            }
            
            function affichageDeCours(){
            	$('.course_container').css({'display':'block'});
                $('.course').css('display','none');
            }
            function quantiteDeQuestion(){
                let qq = 0;
                
                if(matiere_index==0) qq = 20;
                if(matiere_index==1) qq = 40;
                if(matiere_index==2) qq = 40;
                if(matiere_index==3) qq = 40;
                
                return qq; 
            }
    	    function cours() {
                
                //if(phase_class == 'apprises')    { $('.course_container').css('display','none'); alert("ߕߊ߲߬ߓߌ߬ ߓߘߊ߫ ߞߍ߫ ߦߊ߲߬ ߘߐ߫ ߞߘߐ߬ߡߊ߲߬"); }
                //if(phase_class == 'a_apprendre') { $('.course_container').css('display','none'); alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫");   }  
        	    //if(phase_class == 'active') {

                $('.course_container').css('display','block');
                $('.course').css('display','none');
                
                sessionStorage.setItem('session_niveau_max', niveau_max);
                $('#apprentissage_body').html('²');

                switch (course_id) {
                    case 'apprentissage':apprentissages(); break;   // Voir apprentissage.js
                    case 'exercice'     :exercices();      break;   // Voir exercice.js
                    case 'pratique'     :pratique();       break;   // Voir pratiques.js
                    case 'evaluation'   :evaluations();    break;   // Voir evaluations.js
                }

        	    //}
        	    if(phase_class == 'a_apprendre') $('.course_container').css('display','none');
    	    }
      	});
    	
    	$('#go_to_lesson').on('click', function() { $('.phases_container ul li').click(); });
	}
});