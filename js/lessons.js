$('document').ready(function() {
<<<<<<< HEAD
    
    var id              = JSON.parse(sessionStorage.getItem('id'));     
    var matieres        = JSON.parse(sessionStorage.getItem('matieres'));     
    var matiere_index   = JSON.parse(sessionStorage.getItem('matiere_index'));  
    
    var niveaux_etudies = JSON.parse(sessionStorage.getItem('niveaux_etudies'));
    var niveau_max      = JSON.parse(sessionStorage.getItem('niveau_max'));
    var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    
    var groupe_d_images = $('#images_pratique .images_container');
    
    var id_phases = [], data_phase_nbr;
    var phases_etudiees = JSON.parse(sessionStorage.getItem('phases_etudiees'));
    var derniere_phase  = JSON.parse(sessionStorage.getItem('derniere_phase'));
    var nbr  = JSON.parse(sessionStorage.getItem('nbr'));

   
    if(matieres.length === 0) {
        niveau_max = 0;
        niveau_en_cours = 1;
    }
    if(matieres.length > 0) {
        
        niveaux           = JSON.parse(sessionStorage.getItem('niveaux'));     
        niveau_en_cours   = sessionStorage.getItem('niveau_en_cours');
        niveaux_distincts = JSON.parse(sessionStorage.getItem('niveaux_distincts'));     
        niveau_max        = JSON.parse(sessionStorage.getItem('niveau_max'));
        
        matieres_etudiees = JSON.parse(sessionStorage.getItem('matieres_etudiees'));     
        derniere_matiere  = JSON.parse(sessionStorage.getItem('derniere_matiere'));     
        matiere_active    = JSON.parse(sessionStorage.getItem('matiere_active'));     
        matiere_index     = JSON.parse(sessionStorage.getItem('matiere_index')); 
        matiere_nom       = JSON.parse(sessionStorage.getItem('matiere_nom')); 
    }

    var rang = '';
	var etapes_passees = '';
	var etape_actuelle = [];
	var etapes_a_faire = [];
	var etape_max = [];
    
	var derniere_phase = '', phase_en_cours = '', phase_nbr = 0;
=======

 //Declaration des variables
    var matieres = [], matieres_length = 0, matiere_index = 0, nbr = 0;
    var niveaux_etudies = [], niveau_max = 0, niveau_en_cours = 1;
	var etapes_passees = [], etape_actuelle = [], etapes_a_faire = [], etape_max = [], rang = '';
	var phases_etudiees = [], derniere_phase = '', phase_en_cours = '', phase_nbr = 0;
    var phases_distinctes = [], phases_1_distinctes = [], phases_2_distinctes = [], phases_3_distinctes = [], phases_4_distinctes = [];
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
	var avancer_btn = '';
    var id_phases = [], data_phase_nbr;

  /*-------------------------------------------------------------------------------------------------------------------
    1)- La situation des études est faite par récupération et traitement des données reçues sur l'apprenant.
	2)- La liste des phases est établie en fonction du niveau d'étude de l'apprenant (selon les phases étudiées ou pas)
	3)- Le paramétrage conséquent est défini pour la leçon future.
	4)- Les phases s'affichent et
	5)- On peut surfer
  -------------------------------------------------------------------------------------------------------------------*/
    
 //Récupération de l'id de l'étudiant 
    var id = JSON.parse(sessionStorage.getItem('id')); 

<<<<<<< HEAD
        getPhases(); 
        phases();
        matiere();
        
        
  /*--------------------------------------------------------------------*/
=======
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
        
        matieres_etudiees   = JSON.parse(sessionStorage.getItem('matieres_etudiees'));     
        derniere_matiere    = JSON.parse(sessionStorage.getItem('derniere_matiere'));     
        matiere_active      = JSON.parse(sessionStorage.getItem('matiere_active'));     
        matiere_nom         = JSON.parse(sessionStorage.getItem('matiere_nom'));
        matiere_index       = JSON.parse(sessionStorage.getItem('matiere_index')); 
        
        niveaux             = JSON.parse(sessionStorage.getItem('niveaux'));     
        niveaux_etudies     = JSON.parse(sessionStorage.getItem('niveaux_etudies'));
        niveaux_distincts   = JSON.parse(sessionStorage.getItem('niveaux_distincts'));     
        niveau_max          = JSON.parse(sessionStorage.getItem('niveau_max'));
        niveau_en_cours     = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
        
        phases_etudiees     = JSON.parse(sessionStorage.getItem('phases_etudiees'));
        phases_distinctes   = JSON.parse(sessionStorage.getItem('phases_distinctes'));
        phases_1_distinctes = JSON.parse(sessionStorage.getItem('phases_1_distinctes'));
        phases_2_distinctes = JSON.parse(sessionStorage.getItem('phases_2_distinctes'));
        phases_3_distinctes = JSON.parse(sessionStorage.getItem('phases_3_distinctes'));
        phases_4_distinctes = JSON.parse(sessionStorage.getItem('phases_4_distinctes'));
        derniere_phase      = JSON.parse(sessionStorage.getItem('derniere_phase'));

        nbr                 = JSON.parse(sessionStorage.getItem('nbr')); 
    }

  /*-----------------------------------------------------------------------------------------------------------------*/
    getPhases(); 
    phases();
    matiere();
   
  /*-----------------------------------------------------------------------------------------------------------------*/
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
	
	function getPhases() { 

        total_phase       = JSON.parse(sessionStorage.getItem('total_phase'));
        phases_etudiees   = JSON.parse(sessionStorage.getItem('phases_etudiees')); 
        dernieres_phases  = JSON.parse(sessionStorage.getItem('dernieres_phases'));     
        derniere_phase    = JSON.parse(sessionStorage.getItem('derniere_phase'));     
        dernieres_phases_distinctes  = JSON.parse(sessionStorage.getItem('dernieres_phases_distinctes'));
    }
    function phases() {
<<<<<<< HEAD
        var phases_collection = phasesCollection();
=======

        let pratiques = JSON.parse(localStorage.getItem('pratiques'));
        let all_options = JSON.parse(localStorage.getItem('all_options')); 
        let localOptionsLength = (all_options == null) ? 0 : all_options.length;
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a

    	$('.phases').html(phasesHTML());
    	
    	data_phase_nbr = phasesNombre(derniere_phase);
    	id_phases = idDesPhases();
    	sessionStorage.setItem('total_phase', JSON.stringify($('#phases_list li').length));
        actualiserTitre();
	    stylesDesPhases();
	    affichageDesPhases();
	    
        function phasesHTML() {
          
            var lesson_id = $('.lesson_title').attr('id');
            
          // Liste des phases
            var content = '<ul class="phases liste_affichage_cascade" id="phases_list">';
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
            content += '<div class="nav_fleches_container">';
                content += '<span id="back_to_programmes"><a href="programmes.php">ߛߋ߬ߦߌ߬ ߞߐ߫</a></span>';
                content += '<span id="go_to_lesson">ߥߊ߫ ߢߍ߫</</span>';
            content += '</div>';

            return content;
        }
    	function stylesDesPhases() {
<<<<<<< HEAD
            var nbr = JSON.parse(sessionStorage.getItem('nbr'));
    
           // if(total_phase === nbr) sessionStorage.removeItem('nbr');
    	    var lesson_statut = lessonStatut();
    	    var phase_nbr = nombre();
      
    	    $.each($('#phases_list li'), function() {
    	      
        	    var phase_index = $(this).index();
        	    var phase_attr_id = $(this).attr('id');
                
    	        if(lesson_statut == "ended") {
                    $(this).removeClass('active a_apprendre').addClass('apprises');
    	        }
                if(lesson_statut == "beginning") {
                    if(phase_nbr ===0) {
=======
        
    	    var phase_status = phaseStatus();
    	    var phase_nbr = nombre();
   	    
    	    $.each($('#phases_list li'), function() {
    	      
        	    var phase_index = $(this).index();
               
                if(phase_status == "vierge") {
                    if(phase_nbr === 0) {
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                        if(phase_index === 0) $(this).addClass('active');
                        if(phase_index  >  0) $(this).addClass('a_apprendre');
                    }
                    if(phase_nbr > 0) {
                        if(phase_index <= phase_nbr-1) $(this).removeClass('active').addClass('apprises');
                        if(phase_index == phase_nbr  ) $(this).removeClass('a_apprendre').addClass('active');
                        if(phase_index >= phase_nbr+1) $(this).addClass('a_apprendre');
                    }
                }
<<<<<<< HEAD
    	        if(lesson_statut == "in_progress") {
=======
    	        if(phase_status == "non_vierge") {

>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                    if(phase_index <= phase_nbr-1) $(this).removeClass('active').addClass('apprises');
                    if(phase_index == phase_nbr  ) $(this).removeClass('a_apprendre').addClass('active');
                    if(phase_index >= phase_nbr+1) $(this).addClass('a_apprendre');
    	        }

             //Cas specifique de pratiques                    
                if(localOptionsLength === 4) {
                    $('#syllabes_pratique, #tons_pratique, #chiffres_pratique').removeClass('active').addClass('apprises');
                    $('#syllabes_pratique, #tons_pratique, #chiffres_pratique').next().removeClass('a_apprendre').addClass('active');
                }
            });
    	}
        function phaseStatus() {
            let li = $('#phases_list li');
<<<<<<< HEAD
            let indice = 0, ls = "";
=======
            let indice = 0;

            
            
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
            
            $.each(li, function() { 
                let li_id = $(this).attr('id');
                indice = ($.inArray(li_id, phases_distinctes) === -1) ? indice : indice+=1; 
            });
<<<<<<< HEAD
            
            if(li.length === indice) ls = "ended";
            if(li.length > indice) ls = (indice === 0) ? "beginning" : "in_progress";
            
            return ls;
=======
          
            let ps = (indice === 0) ? "vierge" : "non_vierge";
            return ps;
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
        }
        function actualiserTitre() {
            var niveau = $('.niveau_courant').text();
      
            rang = (niveau=='߁')?'߭':'߲';
    	    $('.rang').html(rang);
    	
        	if(matiere_index == 1) {
        	    document.querySelector('.phases ul li:nth-child(3)').style.display = 'none';
        	}
        }
    	function affichageDesPhases() {
    	    affichageListeEnCascade();
    	}
	}
    function phasesNombre(derniere_phase) {
        
        let phase_nbr, derniere_phase_index;
        let nbr = JSON.parse(sessionStorage.getItem('nbr'));

        $.each($('#phases_list li'), function() {
            let phase_id = $(this).attr('id');
            id_phases.push(phase_id);
        });
        
        if($.inArray(derniere_phase,id_phases) === -1) { derniere_phase_index = 0; phase_nbr = 0; }
        if($.inArray(derniere_phase,id_phases) !== -1) {
            derniere_phase_index = $('#phases_list #'+derniere_phase).index();
            phase_nbr = derniere_phase_index+1;
        }
        
        sessionStorage.setItem('derniere_phase_index',JSON.stringify(derniere_phase_index));
        sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr));
        
        return phase_nbr; 
    }
    function changerPhaseActive(phase_nbr) {
        
        phase_nbr++;
        $.each($('#phases_list li'), function() {
    	       
            var phase_index = $(this).index();
            if(total_phase > phase_nbr) {  
                if(phase_index <= phase_nbr-1) $(this).removeClass('active').addClass('apprises');
                if(phase_index == phase_nbr  ) $(this).removeClass('a_apprendre').addClass('active');
                if(phase_index >= phase_nbr+1) $(this).addClass('a_apprendre');
            }       	    
            if(total_phase == phase_nbr) $(this).removeClass('active a_apprendre').addClass('apprises');
        });
        sessionStorage.setItem('nbr',JSON.stringify(phase_nbr));
        initialiserProgressBarr();
    }
    function nombre() {
        let phase_nbr = 0;
       
        if(nbr === null || nbr === 0) phase_nbr = (data_phase_nbr === 0) ? 0 : data_phase_nbr;
        if(nbr > 0) phase_nbr = (nbr >= data_phase_nbr) ? nbr : data_phase_nbr;

        return phase_nbr;
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
    	
    	actualiserCochage();
        lettres = voyelles_cochees.concat(consonnes_cochees,tedos_coches);
        syllabes = syllab();
    	
    	$('#phases_list li').on('click', function(e){
      
<<<<<<< HEAD
            var syllabes = syllab();
            var syllabes_tonifies = tonification();  
=======
            var syllabes_tonifies = tonification(); // Voir cette fonction dans js/tons.js 
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a

            var questionnaires = questions();
            var questions_quantity = quantiteDeQuestion();
            var quantite_de_question = quantiteDeQuestion();
            var compteur_de_question = 0;
            var exercice_questions = [];
            
            var total_point = 0, point = 0, effort = '';
            var note = 0;
            var moyenne = 1;
            
            var chiffre = '';
            var phase_active_index = $('.active').index();
            var phase_index = $(this).index();
            var phase_class = $(this).attr('class');
    	    var phase_id = $(this).attr('id');
    	    var course_id = phase_id.split('_')[1];
    	    var lesson_courante = lessonCourante();
        
            var parametres_btn = $('.parametre_btn_container');
            var parametres = $('#parametres');
            
            var apprentissage = $('#apprentissage');
            var exercice = $('#exercice');
            var pratiques = $('#pratique');
            var evaluation = $('#evaluation');
            
            var dialogue_btn_html = $('.dialogue_btn').html();
            var parametres_html = parametres.html();

<<<<<<< HEAD
          /*--------------------------------------------------------------------*/   
            
    	    phaseActiveName();
    	    dimensionnementDeCourseBody();
    	    affichageDeCours();
    	    cours();
=======
          /*--------------------------------------------------------------------*/    
            phaseActiveName();
            affichageDeCours();
            dimensionnementDeCourseBody();
            cours(); 
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
        
          /*--------------------------------------------------------------------*/  


          /*--------------------------------------------------------------------*/  

            function phaseActiveName() { sessionStorage.setItem('phase', JSON.stringify(phase_id)); }
            function dimensionnementDeCourseBody() {
                
                var course_height = $('.course').height();
    	        var course_head_height = $('.course_head').height();

    	        var apprentissage_head_height = $('#apprentissage_head').height();
    	        var apprentissage_foot_height = $('#apprentissage_foot').height();

    	        var exercice_head_height = $('#exercice_head').height();
    	        var exercice_foot_height = $('#exercice_foot').height();

    	        var pratique_head_height = $('#pratique_head').height();
    	        var pratique_foot_height = $('#pratique_foot').height();

    	        var evaluation_head_height = $('#evaluation_head').height();
    	        var evaluation_foot_height = $('#evaluation_foot').height();

    	        var course_body_height = '';

    	        if(course_id == 'apprentissage') {
    	            course_body_height = course_height - (apprentissage_head_height+apprentissage_foot_height);
    	        }
    	        if(course_id == 'exercice') {
    	            course_body_height = course_height - (exercice_head_height+exercice_foot_height);
    	        }
    	        if(course_id == 'pratique'){
    	            course_body_height = course_height - (pratique_head_height+pratique_foot_height);
    	        }
    	        if(course_id == 'evaluation'){
    	            course_body_height = course_height - (evaluation_head_height+evaluation_foot_height);
    	        }
    	        
    	        $('.course_body').css('height', course_body_height-12+'px');
            }
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
    	            
                    var exercice_head_html = "<div class='play_icon_container' id='exercices_player' style='width:auto'>";
                        exercice_head_html += "<span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>";
                    	exercice_head_html += "<span class='qtite_question'>"+quantite_de_question+"</span> : <span class='ordre_question'>"+parseIntNko(compteur_de_question)+question_rang+" </span>";
                    	exercice_head_html += "<span class='ecouter_question'> ߟߊߡߍ߲߫</span><span class='play_icon'>"+play_icon+"</span>";
                    exercice_head_html += "</div>";
                    exercice_head_html += "<div class='oreille_icon_container'><span class='reecoute_label'>ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> <span class='oreille_icon'>"+oreille_icon+"</span></div>";
                    
                    return exercice_head_html;
    	        }
    	    }
       
            function lessonCourante() {

                if(phase_id=='alphabet_apprentissage') { lesson_courante = alphabetApprentissageHTML(); } //Cette fonction provient de alphabet.js 
                if(phase_id=='syllabes_apprentissage') { lesson_courante = syllabesApprentissageHTML(); } //Cette fonction provient de syllabes.js
                if(phase_id=='tons_apprentissage'    ) { lesson_courante = tonsApprentissageHTML();     } //Cette fonction provient de tons.js
                if(phase_id=='chiffres_apprentissage') { lesson_courante = chiffresApprentissageHTML(); } //Cette fonction provient de chiffres.js
                
                if(phase_id=='alphabet_exercice'     ) { lesson_courante = alphabetExercicesHTML();     } //Cette fonction provient de alphabet.js
                if(phase_id=='syllabes_exercice'     ) { lesson_courante = syllabesExercicesHTML();     } //Cette fonction provient de syllabes.js
                if(phase_id=='tons_exercice'         ) { lesson_courante = tonsExercicesHTML();         } //Cette fonction provient de tons.js
                if(phase_id=='chiffres_exercice'     ) { lesson_courante = chiffresExercicesHTML();     } //Cette fonction provient de chiffres.js
              
               // if(phase_id=='syllabes_pratique'     ) { lesson_courante = syllabesPratiquesHTML();     } //Cette fonction provient de syllabes.js
               // if(phase_id=='tons_pratique'         ) { lesson_courante = tonsPratiquesHTML();         } //Cette fonction provient de tons.js
               // if(phase_id=='chiffres_pratique'     ) { lesson_courante = chiffresPratiquesHTML();     } //Cette fonction provient de chiffres.js
            
                return lesson_courante;
                
            }
            function affichageDeCours(){
            	$('.course_container').css({'display':'block'});
                $('.course').css('display','none');
            }
            function questions() {
                var lq = '';
<<<<<<< HEAD
                if(niveau_en_cours==1) lq = mix1D(lettres);
                if(niveau_en_cours==2) lq = mix1D(syllabes);
                if(niveau_en_cours==3) lq = mix1D(syllabes_tonifies);
                if(niveau_en_cours==4) lq = mix1D(chiffres);
=======
               
                if(niveau_en_cours==1) lq = malaxer(lettres);
                if(niveau_en_cours==2) lq = malaxer(syllabes);
                if(niveau_en_cours==3) lq = malaxer(syllabes_tonifies);
                if(niveau_en_cours==4) lq = malaxer(chiffres);
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                
                return lq;
            }
            function quantiteDeQuestion(){
                let nq = 0;
                
                if(matiere_index==0) nq = 20;
                if(matiere_index==1) nq = 40;
                if(matiere_index==2) nq = 40;
                if(matiere_index==3) nq = 40;
                
                return nq; 
            }
            function clearStorage() {
                sessionStorage.clear();
                localStorage.clear();
            }
    	    function cours() {
                
                if(phase_class == 'apprises') {
                    $('.course_container').css('display','none'); 
                    alert("Tu as dépassé ce niveau !");
                }
                if(phase_class == 'a_apprendre') {
                    $('.course_container').css('display','none'); 
                    alert("Tu n'est pas encore arrivé à ce niveau !");
                } 
  
        	    if(phase_class == 'active') {       

                    $('.course_container').css('display','block');
                    $('.course').css('display','none');
                    
                    sessionStorage.setItem('session_niveau_max', niveau_max);
                    var session_niveau_max = JSON.parse(sessionStorage.getItem('session_niveau_max'));

                    switch (course_id) {
                        case 'apprentissage':apprentissages(); break;
                        case 'exercice'     :exercices();      break;
                        case 'pratique'     :pratique();       break;
                        case 'evaluation'   :evaluations();    break;
            	    }
            	  
                	function apprentissages() {
<<<<<<< HEAD
             	                    	    
                	    var compteur_de_question = 1;
                        var apprentissage_a_stocker = [];
                        var memo = [];
=======
                	                    	    
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                        var clicks_memo = [];
                      
                        $('.fermeture').attr('id', 'fermer_apprentissage');
                   
                	    chargerApprentissage();
                	    afficherApprentissage();
                        parametrageDeApprentissage();
                        apprendre();
                    	enregistrerApprentissage();
                	    stockerApprentissage();
                    	                        	
                    	function chargerApprentissage() { 
                           // $('#fermer_apprentissage').click(function(){lesson_courante = '';});  
                            $('#apprentissage_body').html( "<div id='table_parlante_container'>"+lesson_courante+"</div>" ); 
                    	}
                    	function afficherApprentissage() {
                            apprentissage.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                            setTimeout(function() { apprentissage.css({'transform':'scale(1)'});}, 5);
                            setTimeout(function() { apprentissage.css({'opacity':'1'});}, 5);
                    	}
                        function parametrageDeApprentissage() {
                            affichageDeParametres();
                            
                    	    $('#parametres td').on('click', function(){ 
                                
                    	        actualiserCochage(); 
                    	        
                    	        lettres = voyelles_cochees.concat(consonnes_cochees,tedos_coches);
                    	        syllabes = syllab();
                    	        syllabes_tonifies = tonification(); // Voir cette fonction dans js/tons.js 
                    	        
                    	        $('#apprentissage_body').html( lessonCourante() ); 
                    	        $('.stop_btn_container').css({'display':'none'});
                    	        $('.play_btn_container').css({'display':'block'});
                        	        
                        	    lectureSemiAutomatique(); // Voir fonctions.js
                        	    lecturePersonnalisee();   // Voir fonctions.js
                        	    arreterLecture(lessonCourante); // Voir fonctions.js
                    	    });
                    	    
                            function affichageDeParametres(){
                                $('.parametre_btn_container').on('click', function(){
                                    parametres.css({'display':'block'});
                                });
                            }
                        }
                        function apprendre() {
                            
                            changementDesBoutonsMedia();
                    	    
                    	    lectureSemiAutomatique(); // Voir fonctions.js
                    	    lecturePersonnalisee();   // Voir fonctions.js
                    	    arreterLecture(lessonCourante); // Voir fonctions.js
                    	    apprentissageProgressBarr();
                    	    
                    	    
                            function changementDesBoutonsMedia(){
                        	    $('.play_btn_container').on('click', function(){
                        	        $(this).css({'display':'none'});
                        	        $('.stop_btn_container').css({'display':'block'});
                        	    });
                       	        
                        	    $('.stop_btn_container').on('click', function(){
                        	        $(this).css({'display':'none'});
                        	        $('.play_btn_container').css({'display':'block'});
                        	    });
                            }
                            function apprentissageProgressBarr() {
                                            
                                var nbr_click = questions().length;
                                var progress_unity = $('#apprentissage_progress_bar').width()/nbr_click;
                                
                             /*
                              A chaque click sur un élément, progress barr avance d'une unité égale à progress_unity px.
                              Mais si un élément est clické une deuxième fois, progress barr ne doit pas avancer.
                              Pour cela, tous les éléments clichés sont enregistrés dans un tableau pour les distinguer.
                             */            
                                let elements_clickes = [];
                                
                                $('.table_parlante td').on('click', function() {
                                 
                                    if(elements_clickes.indexOf($(this).html()) == -1) $('.progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                                    elements_clickes.push($(this).html());
                                });
                            }
                        }
                        function enregistrerApprentissage() {
                            
                            var table, tr, td, nbr_table, nbr_tr, nbr_td, nbr_table_td;
                            
                            table = $('.table_parlante'); 
                            tr = $('.table_parlante tr'); 
                            td = $('.table_parlante td');
                            
                            nbr_table = table.length;
                            nbr_tr = Math.ceil(td.length/tr.length);
                            nbr_table_td = Math.ceil(td.length/nbr_table);
                            nbr_td = td.length;
                                       
                            
                            initialiserApprentissageAStocker();
                            memoriserApprentissage();
                            
                            
                            function initialiserApprentissageAStocker() {
                                //
                            }
                            function memoriserApprentissage() {
    
                                $.each(td, function(){
                                    
                                  /* 
                                  --------------------------------------------------------------------
                                   Pour chaque click sur un bouton:
                                      1)- Un compteur de click individuel est activé qui calcule combien de fois chaque bouton est clické.
                                      2)- Une identification est faite pour savoir, quel bouton est clické.
                                      3)- Un enregistrement capte le nombre de click pour chaque bouton.
                                      4)- Et le memo de l'enregistrement est envoyé au serveur quand on ferme la leçon.
                                  --------------------------------------------------------------------
                                  */
                                    
                                    var element        = $(this).html();
                                    var table_courante = $(this).parent().parent().parent();
                                    var tr_index       = $(this).parent().index();
                                    var table_index    = table.index(table_courante);
                                    var element_index  = table_index*nbr_table_td + tr_index*nbr_tr + $(this).index();
                                    var element_click_counter = 0;
                
                                    
                                  /*--------------------------------------------------------------------
                                   Initialisation de mémoire d'enregistrement qui est un tableau bidimentionnel.
                                   Il contient des petits tableaux de deux éléments chacun:
                                   - Le premier est le nom de l'élément clické;
                                   - Le deuxième est le nombre de fois que cet élément est clické.
                                     
                                   L'initialisation consiste à donner la valeur 0 click à tous les éléments.
                                   On considère qu'aucun élément n'est clické pour le moment. */
                                    
                                    clicks_memo[element_index] = [element,element_click_counter];
                 
                                    $(this).on('click', function(){
                                        
                                      /*--------------------------------------------------------------------
                                       3)- Enregistrement des clicks 
                                       
                                       L'enregistrement par bouton ou élémentaire est un tableau de deux éléments dont
                                       - L'élément clické;
                                       - Le nombre de fois que cet élément est  clické. */
                                                                      
                                        var clicked_element = $(this).html(); // Élément clické.
                                        element_click_counter++; // Compteur de click pour chaque élément.
                             
                                        var new_click_value = [clicked_element,element_click_counter];  // Enregistrement elementaire.
                                        var non_clicked_elements = '';
                                        var nbr_clicked_elements = 0;
                               
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
                    	        var course = $(this).siblings('#apprentissage').html();
                    
                                note = noterApprentissage();
                                if(note <  moyenne) alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
                                if(note >= moyenne) {
                    
                                    let nbr = JSON.parse(sessionStorage.getItem('nbr'));
                                    let phase_nbr = nombre();

                                    sendApprentissageToDB();
                                    changerPhaseActive(phase_nbr);
                                }

                                function sendApprentissageToDB() {       
                                 /*
                                 A la fermeture, on s'assure que chaque élément est clické au moins un nombre de fois défini.
                                 - Si oui le mémoire de click est envoyé au serveur;
                                 - Sinon, un message s'affiche et le mémoire n'est pas envoyé.
                                 */
                                    var matiere = JSON.parse(sessionStorage.getItem('matiere_active'));
                                    var phase   = JSON.parse(sessionStorage.getItem('phase'));
                                    var lesson  = JSON.stringify(clicks_memo);
                                    
                                    const apprentissage_data = new URLSearchParams({
                                        id     : id,
                                        matiere: matiere,
                                        niveau : niveau_en_cours,
                                        phase  : phase,
                                        lesson : lesson,
                                        note   : JSON.stringify(note)
                                    }); 
                    
                                    fetch("/kouroukan/pages/actions.php", {
                                        method: "POST",
                                        body: apprentissage_data
                                    })
                                    .then(response => response.text())
                                    .catch(error => console.log(error));  
                                }
                                function noterApprentissage() {
                                    var table_elements_click_nbr = [];
                                    
                                    for(var i=0;i<clicks_memo.length;i++) {
                                        table_elements_click_nbr[table_elements_click_nbr.length] = clicks_memo[i][1];
                                    }
                                    
                                    var nbr_click_min = Math.min.apply(null, table_elements_click_nbr);
                                    var nbr_click_max = Math.max.apply(null, table_elements_click_nbr);
                                    var click_min_admis = 1;
                                    
                                    
                                    var nbr_btn_clicke = nombreDeBoutonClicke();
                                    var note = Math.floor((nbr_btn_clicke*20)/clicks_memo.length);
                                    
                                    return note;
                                    
                                    function nombreDeBoutonClicke() {
                                        var sum_click = 0;
                                        
                                        for (var i = 0; i < table_elements_click_nbr.length; i++) {
                                        if(table_elements_click_nbr[i] >= click_min_admis) {    
                                            sum_click ++;
                                        }}
                                        return sum_click;
                                    }
                                }
                            });
                	    } 
                	}
                	function exercices() {
               	    
                	    var compteur_de_question = 1;
                	    var question_rang = '߭';
                        var exercice_a_stocker = [];
                        
                        $('.fermeture').attr('id', 'fermer_exercice');
                  	    
                	    chargerExercice();
                	    afficherExercice();
                	    exercer();
                	    enregistrerExercice();
                	    stockerExercice();
                    
                    	
                    	function chargerExercice(){ 

                            $('#exercice_foot').html( exerciceEnteteHTML() );
                    	    $('#exercice_body').html( lesson_courante ); 
                	        reductionDesElementsDeLessonCouranteA49();
                        	
                        	function exerciceEnteteHTML(){
                        	    var exercices_entete_html = "<div class='dialogue_btn' id='exercice_dialogue_btn'>";   
                                exercices_entete_html += "<div class='play_icon_container' id='exercices_player' style='width:auto'>";
                                exercices_entete_html += "<span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>";
                                exercices_entete_html += "<span class='qtite_question'>"+parseIntNko(quantite_de_question)+"</span> : <span class='ordre_question'>"+parseIntNko(compteur_de_question)+question_rang+" </span>";
                                exercices_entete_html += "<span class='ecouter_question'> ߟߊߡߍ߲߫</span><span class='play_icon'>&#9664;</span>";
                                exercices_entete_html += "</div>";
                                exercices_entete_html += "<div class='oreille_icon_container'><span class='reecoute_label'>ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> <span class='oreille_icon'>&#128066;</span></div>";
                                exercices_entete_html += "</div>";
                                return exercices_entete_html;
                        	}
                    	    function reductionDesElementsDeLessonCouranteA49() {
                        	    for( var i = $('.table_muette tr').length-1; i > 6; i--) {
                        	        document.querySelector('.table_muette').deleteRow(i);
                        	    }
                                $.each($('.table_muette tr td'), function() {
                                    exercice_questions.push($(this).html());
                                });
                                
                                exercice_questions = malaxer(exercice_questions);
                    	    }
                    	}
                    	function afficherExercice(){
                            
                            exercice.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                            setTimeout(function() { exercice.css({'transform':'scale(1)'});}, 5);
                            setTimeout(function() { exercice.css({'opacity':'1'});}, 5);
                    	}
                	    function exercer(){
                	        
                    	    var i=0;
                    	    var question_posee, reponse_montree; 
        
                    	    question_posee = '';
                    	    poserExerciceQuestion();
                    	    repondreExerciceQuestion();
                    	    
                    	    function poserExerciceQuestion(){
                        	    $('#exercices_player').on('click',function(){
                      	        
                        	        compteur_de_question++;
                        	        question_rang = '߲';
                        	        $('.ecouter_question').html(' ߠߊߡߍ߲߫');
                        	        $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
                        	        question_posee = exercice_questions[i];
                        	        
                        alert( question_posee ); 
                      
                        	        $(this).css('display','none');
                        	        $('.oreille_icon_container').css('display','block');
                        	        
                        	        lireQuestion();
                        	        repeteQuestion();
    
                        	        i++;
                        	        
                        	        function lireQuestion(){
                        	            $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_posee+'.mp3', 'autoplay':'on'});
                        	        }
                        	        function repeteQuestion(){
                        	            $('.oreille_icon_container').on('click', function() { lireQuestion();});
                        	        }
                        	    });
                    	    }
                    	    function repondreExerciceQuestion(){
                	            var nbr_de_questionnaires = 40;
                            	        
                        	    $('.table_muette').on('click', function(e){
                        	        if(question_posee=='')
                        	        {  /* guiderClient(); */}
                        	        else
                        	        {   
                        	            var td = $(e.target);
                            	        reponse_montree = td.html();
                                        point = (question_posee==reponse_montree)?1:0;
                                                            
                            	        if(question_posee != reponse_montree){ barrerLaFausseReponse(td); clignotage(question_posee); }
                            	        if(question_posee == reponse_montree){ td.addClass('ombrage'); }
                            	        setTimeout(function(){ td.removeClass('ombrage'); },1000);
                            	        actualiserLessonProgressBar();
                            	        
                            	        question_posee = '';    /* Vider la variable question_posee. */
                            	        
                            	        $('.oreille_icon_container').css('display','none');
                            	        $('.play_icon_container').css('display','block');
                            	        
                                        function actualiserLessonProgressBar(){
                                            
                                            var progress_unity = $('#exercice_progress_bar').width()/nbr_de_questionnaires;
                                          
                                            if(question_posee!=reponse_montree){ 
                                                $('.progress_question_bar').css('width','+='+progress_unity+'px');
                                            }else{ 
                                                $('.progress_question_bar, .progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                                            }
                                        }
                        	        }
                        	    });
                    	    }
                	    }
                	    function enregistrerExercice(){
                	        
                	        var td = $('.table_muette td');
                	        var exercice_counter = 0;

                	        initialiserExerciceAStocker();
                	        actualiserExerciceAStocker();
                	        
                            function initialiserExerciceAStocker() {
                                for(var i=0;i<questions_quantity;i++){
                                	            
                                    var q = exercice_questions[i];
                                    var r = '';
                                    var p = 0;
                                	            
                                    exercice_a_stocker[i] = [q,r,p];
                                }
                            }
                	        function actualiserExerciceAStocker() {
                    	        $.each(td, function(){
                    	            $(this).on('click', function(){
                         	               
                    	                var q = exercice_a_stocker[exercice_counter][0];
                    	                var r = $(this).html();
                    	                var p = (q==r) ? 1:0;
                    	                var question_reponse = [q,r,p];
                    	                
                    	                exercice_a_stocker.splice(exercice_counter,1,question_reponse);
                    	                
                    	                exercice_counter++;
                    	            });
                    	        });
                	        }
                        }
                	    function stockerExercice() {
                	                        	             
                            $('#fermer_exercice').one('click',function(){ 
                            
                                note = noterExercice(); 
                                if(note <  moyenne) alert( "reprendre" ); 
                                if(note >= moyenne) { 
                                    
                                    let nbr = JSON.parse(sessionStorage.getItem('nbr'));
                                    let phase_nbr = nombre();
                      
                                    
                                    sendExerciceToDB(); 
                                    changerPhaseActive(phase_nbr); 
                                }
                            
                                function noterExercice() {
                                    var note_total = 0;
                                    
                                    for (var i = 0; i < questions_quantity; i++) {
                                        if(exercice_a_stocker[i][2] == 1) {
                                            note_total += exercice_a_stocker[i][2];
                                        }
                                    }
                                    
                                    var note = Math.floor((note_total*20)/quantite_de_question);
                                    return note;
                                }                                
                                function sendExerciceToDB() {

                                    let matiere = JSON.parse(sessionStorage.getItem('matiere_active'));
                                    let phase   = JSON.parse(sessionStorage.getItem('phase'));
                                    let lesson  = JSON.stringify(exercice_a_stocker);
                                                                                
                                    const exercice_data = new URLSearchParams({
                                        id     : id,
                                        matiere: matiere,
                                        niveau : niveau_en_cours,
                                        phase  : phase,
                                        lesson : lesson,
                                        note   : note
                                    });
    
                                    fetch("http://localhost:8080/kouroukan/pages/actions.php", {
                                        method: "POST",
                                        body: exercice_data 
                                    })
                                    .then(response => response.json())
                                    .catch(error => console.log(error));
                                }
                            });
                	    }
                    }
                    function pratique() {
                        
                        let phase_nbr = nombre();

                        var option = '';
                        var option_index = null;
                        var option_active = '';
                	    var nbr_option_vide = '';
                	    var nbr_option_non_vide = '';
                    	let all_options = [], DB_options = '', local_options = '';
                	    
                	    var compteur_de_question = 1;
                	    var compteur = 0;
                        var compteur_de_caractere = 0;
                        var bulle_index = -1;
                        var s_0 = [], s_1 = [], s_2 = [], s_3 = [], sc = [];
                	    var question_limit = 3;
                	    var quantite_de_question = parseIntNko(question_limit);
                	    var question_rang = '߭';
                	    
                	    var memoire_pratique  = [];
                	    var memoire_pratiques = [];
    
                        var syllabes_1_total = monoSyllabesTotal();
                        var syllabes_2_total = biSyllabesTotal();
                        var syllabes_3_total = triSyllabesTotal();
                        var syllabes_4_total = quadriSyllabesTotal();  

                    	let questions_syllabes_1 = malaxer(syllabes_1_total);
                    	let questions_syllabes_2 = malaxer(syllabes_2_total);
                    	let questions_syllabes_3 = malaxer(syllabes_3_total);
                    	let questions_syllabes_4 = malaxer(syllabes_4_total);
                    	    
                    	let syllabes_1 = monoSyllabe();
                    	let syllabes_2 = biSyllabe();
                    	let syllabes_3 = triSyllabe();
                    	let syllabes_4 = quadriSyllabe();
            
                        var questions=[], question='', reponse=[];
                        var table = $('#pratique_fiche_body').html();
                       
                     /*--------------------------------------------------------------------*/
                        $('.fermeture').attr('id', 'fermer_pratique');
                      
                	    recuperationDesOptionsEffectuees();
                	    afficherPratique();
                        dimensionnerPratique();
                        afficherPratiqueOptions();
                        optionStyles();
                	    pratiquer();
                	    stockerPratique();
             	    
                     /*--------------------------------------------------------------------*/

                    	function recuperationDesOptionsEffectuees() {
<<<<<<< HEAD
                    	    
                    	    DB_pratiques = JSON.parse(localStorage.getItem('pratiques'));
=======
                    
                    	    DB_options = getDBOptions();
                    	   // if(DB_options.length === 4) localStorage.clear();
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                    	    local_options = getLocalOptions();
                    	    
                    	    if(DB_options != "") localStorage.clear();
                            
                            all_options = (DB_options != '') ? DB_options:local_options;
                            localStorage.setItem('all_options', JSON.stringify(all_options));
                    	}
<<<<<<< HEAD
=======
                    	function getDBOptions() {
                        	    
                            let DB_pratiques = JSON.parse(localStorage.getItem('pratiques'));
                            let DB_pratiques_length = (DB_pratiques == null) ? 0 : DB_pratiques.length;
                       
                        	let niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
                            
                        	for (var i = 0; i < DB_pratiques_length; i++) {
                        	    if(DB_pratiques[i][0] == niveau_actif) DB_options = JSON.parse(DB_pratiques[i][1]);
                        	}
                        	
                        	return DB_options;    
                        }
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                        function getLocalOptions() {
                        	    
                            let options = [], option_1 = [], option_2 = [], option_3 = [], option_4 = [];
                        	                                
                            if(JSON.parse(localStorage.getItem(id+'_'+0)) != null) { option_1 = JSON.parse(localStorage.getItem(id+'_'+0)); options.push(option_1); }
                            if(JSON.parse(localStorage.getItem(id+'_'+1)) != null) { option_2 = JSON.parse(localStorage.getItem(id+'_'+1)); options.push(option_2); }
                            if(JSON.parse(localStorage.getItem(id+'_'+2)) != null) { option_3 = JSON.parse(localStorage.getItem(id+'_'+2)); options.push(option_3); }
                            if(JSON.parse(localStorage.getItem(id+'_'+3)) != null) { option_4 = JSON.parse(localStorage.getItem(id+'_'+3)); options.push(option_4); }
                                                     	    
                            return options;
                        }   
                    	function afficherPratique() {
                            pratiques.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                            setTimeout(function() { pratiques.css({'transform':'scale(1)'});}, 5);
                            setTimeout(function() { pratiques.css({'opacity':'1'});}, 5);

                            optionStyles();
                    	}
                        function dimensionnerPratique() {

                            let pratique_head_height = $('#pratique_head').height();
                            let pratique_foot_height = $('#pratique_foot').height();

                            let pratique_dialogue_btn_height = $('#pratique_dialogue_btn').height();
                            let clavier_pratique_height = $('#clavier_pratique').height();

                            let pratique_fiche_head_height = $('#pratique_head').height();
                            let pratique_fiche_foot_height = $('#pratique_fiche_foot').height();

                            let pratique_fiche_height = pratique_foot_height-pratique_dialogue_btn_height-clavier_pratique_height-24;
                            let pratique_fiche_body_height = pratique_fiche_height-pratique_fiche_head_height-pratique_fiche_foot_height;

                            $('#pratique_fiche').css('height', pratique_fiche_height+'px');
                            $('#pratique_fiche_body').css('height', pratique_fiche_body_height+'px');
                        }
                	    function initialiserPratiques() {
               	        
                            compteur = 0;
                            compteur_de_question = 1;
                            initialiserPratiqueFiche();
                            initialiserPratiqueQuestions();
                            initialiserPratiqueImage();
                	        initialiserDialogueBtn();
                            initialiserProgressBarr();
        	                afficherClavierEtConsoles();
                            masquerMessageDeFin();
                            dimensionnerPratique();
                           
                            function initialiserPratiqueFiche() {

                                viderPratiqueFicheBody();
                                viderPratiqueFicheFoot();
                                $('#pratique_fiche_foot').css('display','none');

                                function viderPratiqueFicheBody() {                                        
                                    table = "";
                                    $('#pratique_fiche_body').html(table);
                                }
                                function viderPratiqueFicheFoot() {
                                    total_point = 0;
                                    $('#total_point').html(parseIntNko(total_point));
                                    $('#pourcentage_point').html('%'+parseIntNko(Math.round(total_point*100/question_limit)));

                                }
                            }
                            function initialiserPratiqueQuestions() {
                                $.each($('#pratique_options span'), function() {
                                
                                    option_index = $(this).index();
                                    
                                    switch(option_index) {
                                        case 0: syllabes_1 = monoSyllabe();   break;
                                        case 1: syllabes_2 = biSyllabe();     break;
                                        case 2: syllabes_3 = triSyllabe();    break;
                                        case 3: syllabes_4 = quadriSyllabe(); break;
                                    }

                                });
                            }
                            function initialiserPratiqueImage() {
                                $('#pratiques_images_container #image_name').html('');
                                $('#pratiques_images_container img').attr('src', '/kouroukan/image/ߛߊ߲.jpg');
                                $('#pratiques_images_container').css('opacity',1);
                                nePasMettreCroixSurImage();
                            }
                            function afficherClavierEtConsoles() {
                                $('.progress_bar, .course_head, .clavier_container, #pratique_dialogue_btn').css('display','block');
                            }
                            function masquerMessageDeFin() {
                                $('#message_de_fin_container').css('display','none');
                            }
                        }
                        function monoSyllabe() {
                            let syllabes_1 = [];
                                
                            for(let i = 0; i < question_limit; i++) {
                                                        
                                let q = questions_syllabes_1[i];
                                let r = '';
                                let p = 0;
                                let question_reponse = [q,r,p];
                                                        
                                syllabes_1.push( question_reponse );
                            }
                                
                            return syllabes_1;
                        }
                        function biSyllabe() {
                            let syllabes_2 = [];
                                
                            for(let i = 0; i < question_limit; i++) {
                                                        
                                let q = questions_syllabes_2[i];
                                let r = '';
                                let p = 0;
                                let question_reponse = [q,r,p];
                                                        
                                syllabes_2.push( question_reponse );
                            }
                                
                            return syllabes_2;
                        }
                        function triSyllabe() {
                            let syllabes_3 = [];
                                
                            for(let i = 0; i < question_limit; i++) {
                                                        
                                let q = questions_syllabes_3[i];
                                let r = '';
                                let p = 0;
                                let question_reponse = [q,r,p];
                                                        
                                syllabes_3.push( question_reponse );
                            }
                                
                            return syllabes_3;
                        }
                        function quadriSyllabe() {
                            let syllabes_4 = [];
                                
                            for(let i = 0; i < question_limit; i++) {
                                                        
                                let q = questions_syllabes_4[i];
                                let r = '';
                                let p = 0;
                                let question_reponse = [q,r,p];
                                                        
                                syllabes_4.push( question_reponse );
                            }
                                
                            return syllabes_4;
                        }
                        function afficherPratiqueOptions() {
                            $('#pratique_head, #pratique_body, #pratique_foot').css('display','none');
                            $('#pratique_options').css('display','block');
                        }
                        function masquerPratiqueOptions() {
                            $('#pratique_options').css('display','none');
                        }
                        function afficherPratiqueLesson() {
                            $('#pratique_head, #pratique_body, #pratique_foot').css('display','block');
                        }
                        function masquerPratiqueLesson() {
                            $('#pratique_head, #pratique_body, #pratique_foot').css('display','none');
                        }
                        function afficherMessageDeFin() {
                            $('#message_de_fin_container').css('display','block');
                        }
                        function mettreCroixSurImage() {
                            $('#image_croix').css('display','flex');
                        }
                        function nePasMettreCroixSurImage() {
                            $('#image_croix').css('display','none');
                        }
                        function optionStyles() {
                            nbr_option_vide = nombreOptionsVides();
                            nbr_option_non_vide = all_options.length - nbr_option_vide;
                      
                            if(nbr_option_vide == 4) {
                                $('#pratique_options span').addClass('a_apprendre');
                                $('#pratique_options span:nth-child(1)').removeClass('a_apprendre');
                                $('#pratique_options span:nth-child(1)').addClass('active');
                            }
                            if(nbr_option_vide < 4) {
                                $.each($('#pratique_options span'), function() {
                                    let option_index = $(this).index();
                                    
                                    if(option_index <  nbr_option_non_vide) $(this).removeClass('a_apprendre');
                                    if(option_index <  nbr_option_non_vide) $(this).addClass('apprises');
                                    if(option_index == nbr_option_non_vide) $(this).removeClass('a_apprendre');
                                    if(option_index == nbr_option_non_vide) $(this).addClass('active');
                                    if(option_index >  nbr_option_non_vide) $(this).addClass('a_apprendre');
                                });
                            }
                            
                            function nombreOptionsVides() {
                                let nov = 0;
                                for (var i = 0; i < all_options.length; i++) {
                                    if(all_options[i] == null) nov += 1;
                                }
                                return nov;
                            }
                        }                        
                        function nombreDOptionNonVide() {
                            
                            let nov = 0, nonv = 0;
                            
                            all_options = getLocalOptions();

                            for (var i = 0; i < all_options.length; i++) {
                                if(all_options[i] == null) nov++;
                            }
                            nonv = all_options.length - nov;
                            return nonv;
                        }
                        function pratiquer() {
              
                            let questions_posees = [];
                          
                         /* Une question doit etre posee avant de commencer à taper reponse.*/ 
                            $('#clavier_pratique').on('click', function() {
                                if( questions_posees == '' ) guiderClient(); 
                            });

                            $('#pratique_options span').one('click', function() {
                                
<<<<<<< HEAD
                                if($(this).hasClass('a_apprendre')) {
                                    alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫");
                                    return; 
                                }
                                if($(this).hasClass('apprises')) {
                                    alert("ߕߊ߲߬ߓߌ߬ ߓߘߊ߫ ߞߍ߫ ߦߊ߲߬ ߘߐ߫ ߞߘߐ߬ߡߊ߲߬");
                                    return; 
                                }
=======
                                if($(this).hasClass('a_apprendre')) { alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫");   return; }
                                if($(this).hasClass('apprises'))    { alert("ߕߊ߲߬ߓߌ߬ ߓߘߊ߫ ߞߍ߫ ߦߊ߲߬ ߘߐ߫ ߞߘߐ߬ߡߊ߲߬"); return; }
                                sessionStorage.removeItem('fin_status')                            

                                initialiserPratiques();

>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                                option_active = $(this);
                            	option_index = $(this).index();
                                sessionStorage.setItem('option_index', JSON.stringify(option_index));
                                masquerPratiqueOptions();
                                    
                                switch(option_index) {
                                    case 0 : option = syllabes_1; break;
                                    case 1 : option = syllabes_2; break; 
                                    case 2 : option = syllabes_3; break;
                                    case 3 : option = syllabes_4; break;
                                }
                              
                                for (var i = 0; i < option.length; i++) { questions_posees[i] = option[i][0]; }
                                
                                $(this).parent().parent().css('top','-110%'); //masquer les options de pratique
                                
                                afficherPratiqueLesson();
                        	    poserQuestionPratique();
                            	repondreQuestionPratique();
                                rectificationDeReponse();
                            	correctionPratique();
                                
                                function dossierImage() {
                                    let option_status = JSON.parse(sessionStorage.getItem('fin_status'));
                                    let option_index = JSON.parse(sessionStorage.getItem('option_index'));
                                    let option = (option_status == "avancer") ? option_index+1 : option_index;
                                    let dossier = '';

                                    if(option === 0) dossier = "/kouroukan/image/image-1-syllabe/";
                                    if(option === 1) dossier = "/kouroukan/image/image-2-syllabe/";
                                    if(option === 2) dossier = "/kouroukan/image/image-3-syllabe/";
                                    if(option === 3) dossier = "/kouroukan/image/image-4-syllabe/";

                                    return dossier;
                                }
                        	    function poserQuestionPratique() {
<<<<<<< HEAD
                            	    $('.question_btn').on('click', function() {
                                	    question = questions_courantes[compteur];
                                	    
                                	    if(question) $('.clavier_container').css('opacity',1);
                                	    $('#pratiques_images_container').css('transform','scale(0.25)');
                                	    $('#pratique_guide').css('top',0);
                      	        
                                	    actualiserLesBoutonsDEntete();
                                	    pratiqueGuide();
                                	    repeteQuestion();
                                 	        
=======
                                    if(!question) $('.clavier_container').css('opacity',0.5);

                                    let questions = [];
                            	    $('.question_btn').on('click', function() { 
                                        
                                        let questions_option_suivante = JSON.parse(sessionStorage.getItem('questions_option_suivante'));
                                        let option_status = JSON.parse(sessionStorage.getItem('fin_status'));
                                        questions = (option_status == "avancer") ? questions_option_suivante : questions_posees;
                            
                                	    $('.clavier_container').css('opacity',1);
                                	    $('#pratiques_images_container img').css('transform','scale(0.25)');

                                	    actualiserLesBoutonsDEntete();
                                        pratiqueGuide();
                                	    question = questions[compteur];
                                        lireQuestion();
                                	    repeteQuestion();
                                 	        
                                	    function pratiqueGuide() {
                                	            
                                	        var pratique_guide_html = pratiqueGuideHTML();
                               	          
                                	        $('#cumule_des_caracteres').html(questions[compteur]);
                                	     //   setTimeout(function() {$('#pratiques_image').attr('src','/kouroukan/image/image-1-syllabe/ߛߊ߲.jpg');}, 600);
                                	            
                                	        $('#bulles_container').html(pratique_guide_html);
                                	        $('#bulles_container span:last').remove();
                                	        $('#pratique_guide').animate({'top':0}, 400);
                                	            
                                	        function pratiqueGuideHTML() {
                                	            var pratique_guide_html = '';
                                                var option_index = JSON.parse(sessionStorage.getItem('option_index'));
                                	            var nbr_de_bulle = 0;

                                                let option_courante_index = (option_status == "avancer") ? option_index+1 : option_index;
                                	            nbr_de_bulle = option_courante_index+1; 
                                	                
                                	            for (var i = 0; i < nbr_de_bulle; i++) { pratique_guide_html += '<span class="bulle" id="span_'+i+'"></span><span class="plus">+</span>'; }
                                	                
                                	            return pratique_guide_html;
                                	        }
                                	    }
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                                	    function actualiserLesBoutonsDEntete() {
                                	        compteur_de_question++;
                                
                            	            $('.question_ordre').html(parseIntNko(compteur_de_question)+'߲');
                            	            $('.question_action').html('ߠߊߡߍ߲߫');
                            	                
                            	            $('.question_btn').css('display','none');
                            	            $('.repetition_btn').css('display','block');
                            	            $('.correction_btn').css('display','none');
                                	    }
                                	    function lireQuestion(){
                                	        $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question+'.mp3', 'autoplay':'on'});
                                	    }
                                	    function repeteQuestion(){
                                	        $('.repetition_btn').on('click', function(){ $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question+'.mp3', 'autoplay':'on'}); });
                                	    }
                            	    });
                        	    }
                        	    function pratiqueGuide() {
                        	            
                        	        var pratique_guide_html = pratiqueGuideHTML();
                       	          
                        	        $('#cumule_des_caracteres').html(questions_courantes[compteur]);
                        	        setTimeout(function() {$('#pratiques_image').attr('src','#');}, 600);
                        	            
                        	        $('#bulles_container').html(pratique_guide_html);
                        	        $('#bulles_container span:last').remove();
                        	        $('#pratique_guide').animate({'top':0}, 400);
                        	            
                        	        function pratiqueGuideHTML() {
                        	            var pratique_guide_html = '';
                        	            var nbr_de_bulle = option_index+1; 
                        	                
                        	            for (var i = 0; i < nbr_de_bulle; i++) {
                        	                pratique_guide_html += '<span class="bulle" id="span_'+i+'"></span><span class="plus">+</span>';
                        	            }
                        	                
                        	            return pratique_guide_html;
                        	        }
                        	    }
                        	    function repondreQuestionPratique(){
                            	    $('.clavier_container td').on('click', function() {
                                       
                                        var caractere = $(this).html();
                                        
                                        if(!question) return false;
                                        if($.inArray(reponse[reponse.length-1],caracteres[1]) != -1 && $.inArray(caractere,caracteres[1]) != -1) {
                                            alert('ߜߙߊ߬ߟߌ ߕߍ߫ ߞߍ߫ ߟߊ߫ ߥߟߊ߬ߘߊ ߣߌ߲߬ ߘߐ߫');
                                            return false;
                                        }
                                        
                                        reponse[reponse.length] = caractere;
                                        chargerBulles();
                                        styliserBulles();
                                        $('#cumule_des_caracteres').html(reponse);
                                        afficherCorrectionButton();
                                        compteur_de_caractere++;
                                            
                                        function afficherCorrectionButton() {
                        	                $('.repetition_btn').css('display','none');
                        	                $('.correction_btn').css('display','block');
                        	                $('.question_btn').css('display','none');
                                        }
                                        function chargerBulles() {
                                                
                                            if($.inArray(caractere,caracteres[1]) != -1) bulle_index++; //Chaque fois que le caractere tapé est consonne, bulle_index augmente d'une unité.

                                            if(bulle_index == 0) { s_0[s_0.length] = reponse[reponse.length-1];  $('#span_0').html(s_0); }
                                            if(bulle_index == 1) { s_1[s_1.length] = reponse[reponse.length-1];  $('#span_1').html(s_1); }
                                            if(bulle_index == 2) { s_2[s_2.length] = reponse[reponse.length-1];  $('#span_2').html(s_2); }
                                            if(bulle_index == 3) { s_3[s_3.length] = reponse[reponse.length-1];  $('#span_3').html(s_3); }
                                        }
                            	    }); 
                        	    }
                                function styliserBulles() {
                                    $('.bulle:nth('+bulle_index+')').prevAll('.bulle').css({'background-color':'white', 'box-shadow':'0 0 8px #ccc', 'transform':'scale(1)'});
                                    $('.bulle:nth('+bulle_index+')').css({'background-color':'yellow', 'box-shadow':'0 0 8px yellow', 'transform':'scale(1.125)'});
                                    $('.bulle:nth('+bulle_index+')').nextAll('.bulle').css({'background-color':'#ccc', 'box-shadow':'0 0 8px #ccc', 'transform':'scale(1)'});
                                    if(bulle_index === -1) { $('.bulle').css({'background-color':'#ccc', 'box-shadow':'none'}); }
                                }
                                function rectificationDeReponse() {
                                            
                                    $('#correcteur').on('click',function() {
                                        rectifierBulles();
                                        reponse.pop();
                                        $('#cumule_des_caracteres').html(reponse);
                                        
                                        function rectifierBulles() {
                                               
                                            var derniere_bulle_non_vide_html = $('#span_'+bulle_index).html().split('');
                                            derniere_bulle_non_vide_html.pop();
                                            sc = derniere_bulle_non_vide_html;
                                            $('#span_'+bulle_index).html(sc);

                                            switch(bulle_index) {
                                                case 0 : s_0 = sc; break;
                                                case 1 : s_1 = sc; break;
                                                case 2 : s_2 = sc; break;
                                                case 3 : s_3 = sc; break;
                                            }
                                            
                                            i=reponse.length-1;
                                            if($.inArray(reponse[i],caracteres[1]) != -1) bulle_index--; //Chaque fois qu'un caractere de reponse est consonne, bulle_index diminue d'une unité.
                                            i--;
                                            
                                            styliserBulles();
                                        }
                                    });
                                }
                            	function correctionPratique() {
                        	        total_point = 0;
                        	       
                        	        $('.correction_btn').on('click',  function() {
                                        
                        	            $('.clavier_container').css('opacity',0.5);

                        	            reponse = reponse.join('');
                        	            point = (question == reponse)?1:0;
                                	    total_point = total_point + point;
                                        effort = '%'+parseIntNko(Math.round(total_point*100/question_limit));
                                	    memoire_pratique[memoire_pratique.length] = [question, reponse, point];
                            
                                        afficherQuestionBouton();
                                        chargerPratiqueFiche();
                                        animerPratiqueFiche();
                                        stylesDePratiqueFicheBody();
                                        chargerPratiqueBody();
                                        actualiserPratiquesProgressBar();
                                       
                    	                enregistrerPratique();
                                     
                                        effacerQuestion();
                                        effacerReponse();
                                        effacerLesBulles();
                                        initialiserCompteurDeCaractere();
                                        finDOption();
                                        revisionDOption();
                                        
                                        compteur++;
                                        
                                        function chargerPratiqueBody() {

                                            chargerImageName();                                            
                                            chargerPratiquesImagesContainer();

                                            function chargerImageName() { $('#image_name').html(reponse); }
                                            function chargerPratiquesImagesContainer() {

                                                /*
                                                let image_source = $('#'+reponse+' img').attr('src');
                                                let image = (image_source !== undefined) ? $('#'+reponse).html() : $('#ߖߌ߬ߦߊ').html();
                                                */
                                            
                                                let dossier_image = dossierImage();

                                                $('#pratiques_images_container img').attr('src', dossier_image+reponse);
                                                $('#pratiques_images_container img').css('transform','scale(1)'); //Scale est à 0.25 dans la fonction poserQuestionPratique()
                                                
                                                if(question == reponse) {
                                                    $('#pratiques_images_container').css('opacity',1);
                                                    nePasMettreCroixSurImage();
                                                }
                                                if(question !== reponse) {
                                                    $('#pratiques_images_container').css('opacity','0.15');
                                                    mettreCroixSurImage();
                                                }
                                                
                                                setTimeout(function(){ $('#pratique_guide').animate({'top':'-100%'},400); }, 200);
                                            }
                                        }
                                        function chargerPratiqueFiche() {
                                            
                                            chargerPratiqueFicheBody();
                                            chargerPratiqueFicheFoot();

                                            function chargerPratiqueFicheBody() {

                                                if(question == reponse) table += "<div class='tr'>\n <span class='affiche_question'>"+question+"</span>\n<span class='affiche_reponse'><span id='fiche_vraie_reponse'>"+reponse+"</span></span>\n<span class='affiche_point'>"+parseIntNko(point)+"</span>\n </div>\n\n";
                                                if(question != reponse) table += "<div class='tr'>\n <span class='affiche_question'>"+question+"</span>\n<span class='affiche_reponse'><span id='fiche_mauvaise_reponse'>"+reponse+"</span><span id='fiche_croix'>&#10060;</span></span>\n<span class='affiche_point'>"+parseIntNko(point)+"</span>\n </div>\n\n";
                                              
                                                $('#pratique_fiche_body').html(table);
                                            }
                                            function chargerPratiqueFicheFoot() {
                                                $('#total_point').html(parseIntNko(total_point));
                                                $('#pourcentage_point').html(effort);
                                            }
                                        }
                                        function animerPratiqueFiche() {

                                            defilementDePratiqueFicheVersLeHaut();
                                            affichageAnimeDeLaDerniereLigneDePratiqueFicheBody();

                                            function defilementDePratiqueFicheVersLeHaut() {
                                                $('#pratique_fiche_body').animate({ scrollTop:$('#pratique_fiche_body')[0].scrollHeight }, 1000);
                                            }
                                            function affichageAnimeDeLaDerniereLigneDePratiqueFicheBody() {
                                                $('#pratique_fiche_body .tr:last-child').css('height',0);
                                                $('#pratique_fiche_body .tr:last-child').animate({'height':'1.5rem'}, 600);
                                            }
                                        }
                                        function stylesDePratiqueFicheBody() {
                                            $('#pratique_fiche_body div:last-child').addClass('pratique_tr_actif'); 
                                            $('#pratique_fiche_body div:last-child').siblings().removeClass('pratique_tr_actif'); 
                                            $('#pratique_fiche_body div:last-child').siblings().addClass('noir_clair'); 
                                        
                                        } 
                                      
                                        function afficherQuestionBouton() {
                            	            $('.repetition_btn').css('display','none');
                            	            $('.correction_btn').css('display','none');
                            	            $('.question_btn').css('display','block');
                                        }
                                        function effacerQuestion() {
                                        	question = '';
                                        }
                                        function effacerReponse() {
                                        	reponse = reponse.split(',');
                                        	reponse.splice(0,reponse.length);
                                        }
                                        function initialiserCompteurDeCaractere() {
                            	            compteur_de_caractere = 0;
                                        }
                                        function effacerLesBulles() {
                                            
                                            bulle_index = -1;
                                            
                                            s_0.splice(0,s_0.length);
                                            s_1.splice(0,s_1.length);
                                            s_2.splice(0,s_2.length);
                                            s_3.splice(0,s_3.length);
                                            
                                            $('#span_0').html(s_0);
                                            $('#span_1').html(s_1);
                                            $('#span_2').html(s_2);
                                            $('#span_3').html(s_3);
                                        }
                                        function actualiserPratiquesProgressBar(){
                                            var progress_unity = $('#pratique_progress_bar').width()/reverseIntNko(quantite_de_question);
                                                      
                                            if(question != reponse){ 
                                                $('.progress_question_bar').css('width','+='+progress_unity+'px');
                                            }else{ 
                                                $('.progress_question_bar, .progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                                            }
                                        }
                                    	function enregistrerPratique() {
    
                                            point = (question == reponse) ? 1:0;
                                            let question_reponse = [question,reponse,point];
                                            
                                            
                                            switch(option_index) {
                                                case 0 : actualiserOption(syllabes_1);   break;
                                                case 1 : actualiserOption(syllabes_2);     break;
                                                case 2 : actualiserOption(syllabes_3);    break;
                                                case 3 : actualiserOption(syllabes_4); break;
                                            }
                                            
                                            function actualiserOption(syllabe) {
                                                let index = '';
                                                
                                                $.each(syllabe, function() {
                                                    if(question == this[0]) index = syllabe.indexOf(this);
                                                });
                                                    
                                                syllabe.splice(index,1,question_reponse); 
                                            }
                                    	}
                                    	function noterOption(syllabe) {
                                            for (var i = 0; i < syllabe.length; i++) { note += syllabe[i][2]; }
                                            syllabe = [syllabe,note];
                                    	}
                                    	function stockerOptionDansLocalStorage(syllabe) {
                                    	    if(note <  moyenne) alert( "ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߛߌߦߊߡߊ߲߫ ߡߊ߫ ߟߊߡߌ߬ߘߊ߬ ߌ ߓߟߏ߫. ߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬." );
                                            if(note >= moyenne) localStorage.setItem(id+'_'+option_index, JSON.stringify(syllabe));
                                    	}
                                    	function finDOption() {

                                            var option_de_syllabe = '', message_1 = '', message_2 = '';

                                    	    if( question_limit === compteur+1 ) {
                                                
                	                            option_de_syllabe = '';
                            	                option_de_syllabe = optionDeSyllabe();
                                    	        
                                    	        message_1 = 'ߌ ߞߎߟߎ߲ߖߋ߫.<br/>'+option_de_syllabe+'  ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ '+effort+' ߟߊ߫. ߌ ߘߌ߫ ߛߋ߫ ߥߊ߫ ߟߊ߫ ߢߍ ߝߍ߬.';
                                    	        message_2 = 'ߌ ߘߐߖߊ߬. <br/>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ '+$("#pourcentage_point").html()+' ߟߋ߬ ߟߊ߫.<br/> ߘߌ߬ߢߍ߬ ߞߵߌ ߞߐߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬.';
                                                
                                   	    
                                                switch(option_index) {
                                                    case 0 : noterOption(syllabes_1); stockerOptionDansLocalStorage(syllabes_1); break;
                                                    case 1 : noterOption(syllabes_2); stockerOptionDansLocalStorage(syllabes_2); break;
                                                    case 2 : noterOption(syllabes_3); stockerOptionDansLocalStorage(syllabes_3); break;
                                                    case 3 : noterOption(syllabes_4); stockerOptionDansLocalStorage(syllabes_4); break;
                                                }
                                                
                                    	        masquerClavierEtConsoles();
                                    	        dimensionnementDeFinDePratiquesBody();
                                    	        messageDeFinOption();
                                    	        optionCallBack();
                                                
                                                function optionDeSyllabe() {
                                                    var option_de_syllabe = '';
                                                            
                                                    switch(option_index) {
                                                        case 0: option_de_syllabe='ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߞߋ߬ߟߋ߲߬ߡߊ'; break;
                                                        case 1: option_de_syllabe='ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߝߌ߬ߟߊ߬ߡߊ'; break;
                                                        case 2: option_de_syllabe='ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߛߓߊ߬ߡߊ'; break;
                                                        case 3: option_de_syllabe='ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߣߊ߰ߣߌ߲߬ߡߊ'; break;
                                                    }
                                                            
                                                    return option_de_syllabe;
                                                }
                                    	        function dimensionnementDeFinDePratiquesBody() {
                                    	            
                                    	            let pfh = $('#pratique_foot').height();
                                    	            let mfch = $('#message_de_fin_container').height(); 
                                                    var pratique_fiche_head_height = $('#pratique_fiche_head').height(); 
                                                    var pratique_fiche_foot_height = $('#pratique_fiche_foot').height(); 

                                                    let pratique_fiche_height = pfh - mfch;
                                                    var pratique_fiche_body_height = pratique_fiche_height-pratique_fiche_head_height-pratique_fiche_foot_height; 
                                    	            
                                                    
                                    	            $('#pratique_fiche').css({'height':pratique_fiche_height+'px'});
                                    	            $('#pratique_fiche_body').css({'display':'block', 'height':pratique_fiche_body_height+'px'});
                                    	            $('#pratique_fiche_foot').css({'display':'block'});
                                    	            $('#message_de_fin_container').css({'display':'block'});
                                    	        }
                                                function messageDeFinOption() {
                                         
                                        	        if(effort == '%߁߀߀') {
        
                                        	            if(option_index < 3) {
                                        	            
                                        	                $('#message_de_fin').html(message_1);
                                        	                $('#message_btn_1').html('ߛߍ߬ߦߌ߬ ߞߐ߫');
                                        	                $('#message_btn_2').html('ߥߊ߫ ߢߍ߫');
                                        	            }
                                        	            if(option_index === 3) {
                                        	              
                                        	                $('#message_de_fin').html(message_1);
                                        	                $('#message_btn_1').css('display','none');
                                        	                $('#message_btn_2').html(matiere_nom+' ߓߟߏߦߊߟߌ ߓߘߊ߫ ߓߊ߲߫');
                                        	                $('#message_btn_2').css('width','100%');
                                        	            }
                                        	            
                                        	        }else{
                                        	            
                                        	            $('#message_de_fin').html(message_2);
                                        	            $('#message_btn_1').html('ߛߍ߬ߦߌ߬ ߞߐ߫');
                                        	            $('#message_btn_2').html('ߛߍ߬ߦߵߊ߬ ߡߊ߬');
                                        	        }
                                                }
                                    	        function optionCallBack() {   
                                    	            $('#message_btn_2').one('click', function() {
                                                        var fin_status = '';
                                    	                
                                                        initialiserPratiques();
                                                        total_point = 0;
                                    	                
                                    	                if($('#message_btn_2').text() == 'ߥߊ߫ ߢߍ߫')   { changerDOption();   fin_status = "avancer"; }
                                    	                if($('#message_btn_2').text() == 'ߛߍ߬ߦߵߊ߬ ߡߊ߬') { reprendreOption(); fin_status = "reprendre"; }

                                                        sessionStorage.setItem('fin_status',JSON.stringify(fin_status));

                                                        function changerDOption() {

                                                            let fin_status = JSON.parse(sessionStorage.getItem('fin_status'));
                                                            let index = JSON.parse(sessionStorage.getItem('option_index'));
                                                            let option_index = (fin_status == "avancer") ? index+1 : index;
                                                            sessionStorage.setItem('option_index',JSON.stringify(option_index));
                                                         
                                                            questions_pratiques = questionsPratiques(option_index+1);
                                                            sessionStorage.setItem('questions_option_suivante',JSON.stringify(questions_pratiques));
                                                            changerStylesDesOptions();

                                                            function changerStylesDesOptions() {
                                                                option_active.removeClass('active');
                                                                option_active.addClass('apprises');
                                                                option_active.next().removeClass('a_apprendre');
                                                                option_active.next().addClass('active');
                                                            }
                                                        }
                                                        function reprendreOption() {

                                                            let option_index = JSON.parse(sessionStorage.getItem('option_index'));
                                                            questions = questionsPratiques(option_index); 
                                                            //localStorage.removeItem(id+'_'+option_index);

                                                        } 
                                    	            });
                                    	        }
                                            }
                                        }  
                                    	function revisionDOption() {
                                    	        
                                    	    $('#pratique_fiche_body .tr').on('click', function() {
                                                
                                    	        $('#pratique_fiche_body div').addClass('noir_clair');
                                    	        $(this).siblings().removeClass('pratique_tr_actif');
                                    	        $(this).addClass('pratique_tr_actif'); 
                                    	        
                                    	        let question = $('.pratique_tr_actif .affiche_question').html(); 
                                    	        let reponse = $('.pratique_tr_actif .affiche_reponse span:nth-child(1)').html();
                                                  	        
                                                let dossier_image = dossierImage();
                                                
                                    	        if(question == reponse) {
                                	                $('#pratiques_images_container').css('opacity',1);
                                	                nePasMettreCroixSurImage();
                                	            }
                                    	        if(question != reponse) {
                                    	            $('#pratiques_images_container').css('opacity','0.15');
                                	                mettreCroixSurImage();
                                    	        }
                         
                                                $('#image_name').html(reponse);                                	        
                                                $('#pratiques_images_container img').attr('src', dossier_image+reponse+'.jpg');                                	        
                                    	    });
                                    	}
                                    }); 
                                }
                            });
                        }
                    	function stockerPratique() {
                    	    $('#fermer_pratique').on('click',function(){

<<<<<<< HEAD
                                if(phase_index <  phase_nbr || nbr_option_non_vide < all_options.length) { return; }
                                if(phase_index === phase_nbr && nbr_option_non_vide == all_options.length) {
=======
                                let DB_options = getDBOptions();
                                let local_options = getLocalOptions();

                                if(phase_index <  data_phase_nbr || nbr_option_non_vide < all_options.length) { return; }
                                if(phase_index == data_phase_nbr && nbr_option_non_vide == all_options.length) {
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                                    
                                 
                                    note = noterPratique(); 
                                    
                                   
                                 /* Vérification de la validité de pratique:
                                    Pourqu'une pratique soit valable, il faut que chaque option soit passée.
                                    - Si non, la pratique est invalide et est retournée;
                                    - Si oui, la pratique est valable et le processus de stockage est engagé. */
                                    	        
                                    if(note >= moyenne) {
                                        let phase_nbr = phasesNombre(derniere_phase);
                                
                                        sendPratiqueToDB(); 
                                        changerPhaseActive(phase_nbr);
                                        sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr)); 
                                    }
                                }

                                $('#pratique_phases').css('display','block');

                                
                                function noterPratique() {
                                    
                                    let note_total = 0;
                                    
                                    for (var i = 0; i < all_options.length; i++) {
                                    for (var j = 0; j < all_options[i].length; j++) {
                                        note_total += all_options[i][j][2];
                                    }}
                                    
                                    let note = Math.floor(note_total/4);
                                 
                                    return note;
                                }
                                function sendPratiqueToDB() {
<<<<<<< HEAD
                                    
                                    let matiere = JSON.parse(sessionStorage.getItem('matiere_active'));
                                    let phase   = JSON.parse(sessionStorage.getItem('phase'));
                                    let lesson  = JSON.stringify(all_options);
                                                    
                                    const pratique_data = new URLSearchParams({
                                        id     : id,
                                        matiere: matiere,
                                        niveau : niveau_en_cours,
=======

                                    let matiere = JSON.parse(sessionStorage.getItem('matiere_active'));
                                    let phase   = JSON.parse(sessionStorage.getItem('phase'));
                                    let lesson  = JSON.stringify(all_options);

                                    const pratique_data = new URLSearchParams({
                                        id     : id,
                                        matiere: matiere,
                                        niveau : niveau,
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                                        phase  : phase,
                                        lesson : lesson,
                                        note   : note
                                    });
    
                                    fetch("http://localhost:8080/kouroukan/pages/actions.php", {
                                        method: "POST",
                                        body: pratique_data 
                                    })
<<<<<<< HEAD
                                    .then(response => response.json())
                                    .catch(error => alert(error));
=======
                                    .then(response => response.text())
                                    .catch(error => console.log(error));
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                                }
                                function deleteLocalOptions() {
                                    
                                    localStorage.removeItem(id+'_'+0);
                                	localStorage.removeItem(id+'_'+1);
                                	localStorage.removeItem(id+'_'+2);
                                	localStorage.removeItem(id+'_'+3);        
                                }
                    	    });
                    	}
                        
                    	function initialiserDialogueBtn() {
                    	        
                    	    $('.repetition_btn').css('display','none');
                    	    $('.correction_btn').css('display','none');
                    	    $('.question_btn').css('display','block');
                    	        
                    	    $('.question_total').html(quantite_de_question);
                    	    $('.question_ordre').html(parseIntNko(1)+'߭');
                    	    $('.question_action').html('ߟߊߡߍ߲߫');
                    	    
                    	    compteur_de_question = 1;
                            compteur = 0;
                    	    total_point = 0;
                    	}
                    	    
                        function questionsPratiques(option_index) {
                            
                            var q = '';
                            var questions = [];
                            	            
                            switch(option_index) {
                                case 0: q = malaxer(syllabes_1_total);   break;
                                case 1: q = malaxer(syllabes_2_total);     break;
                                case 2: q = malaxer(syllabes_3_total);    break;
                                case 3: q = malaxer(syllabes_4_total); break;
                            }
                            for (var i = 0; i < question_limit; i++) questions[i] = q[i];
                            
                            return questions;
                        }
                	    function decomposerEnSyllabes() {
                	        
                	        var character = question.split('');
                	        var c_1, c_2, c_3, c_4, c_5, c_6, c_7, c_8, c_9, c_10, c_11, c_12;
                	        var syllabe_1 = [], syllabe_2 = [], syllabe_3 = [], syllabe_4 = [];
    
                	        if(option_index == 0) {
                    	        if(character.length == 2) {
                    	        for (var i = 0; i < 2; i++) {
                    	            syllabe_1[syllabe_1.length] = character[i];
                    	        }}
                    	        if(character.length == 3) {
                    	        for (var i = 0; i < 3; i++) {
                    	            syllabe_1[syllabe_1.length] = character[i];
                    	        }}
                	        }
                	        if(option_index > 0) {
                	            var syllabes = [];
                    	        for(var i = 0; i < option_index; i++) {
    
                        	        var syllabe = [];
                        	        
                        	        if($.inArray(character[2],caracteres[1]) !== -1) {
                            	        for (var i = 0; i < 2; i++) {
                            	            syllabe[syllabe.length] = character[i];
                            	        }
                        	            syllabes[syllabes.length] = syllabe;
                        	        }
                        	        if(character[2] == caracteres[4][1]) {
                            	        for (var i = 0; i < 3; i++) {
                            	            syllabe[syllabe.length] = character[i];
                            	        }
                        	            syllabes[syllabes.length] = syllabe;
                        	        }
                        	        character.splice(0,2);
                    	        }
                	        }
                	    }
                        function masquerClavierEtConsoles() {
                            $('.progress_bar, .clavier_container, #pratique_dialogue_btn').css('display','none');
                        }
                    	
                      	function monoSyllabesTotal() {
                    	    var syllabes_1_total = monoSyllabes(); // Cette fonction provient de syllabes.js 
                    	    var ms = [];
                    	            
                        	for (var i = 0; i < syllabes_1_total.length; i++) {
                        	for (var j = 0; j < syllabes_1_total[i].length; j++) {
                        	    ms[ms.length] = syllabes_1_total[i][j];
                        	}}
                    	        
                    	    return ms;
                    	}
                    	function biSyllabesTotal() {
                    	    var syllabes_2_total = biSyllabes(); // Cette fonction provient de syllabes.js 
                    	    var bs = [];
                    	            
                        	for (var i = 0; i < syllabes_2_total.length; i++) {
                        	for (var j = 0; j < syllabes_2_total[i].length; j++) {
                        	    bs[bs.length] = syllabes_2_total[i][j];
                        	}}
                    	        
                    	    return bs;
                    	}
                    	function triSyllabesTotal() {
                    	    var syllabes_3_total = triSyllabes(); // Cette fonction provient de syllabes.js 
                    	    var ts = [];
                    	            
                            for (var i = 0; i < syllabes_3_total.length; i++) {
                        	for (var j = 0; j < syllabes_3_total[i].length; j++) {
                        	    ts[ts.length] = syllabes_3_total[i][j];
                        	}}
                    	        
                    	    return ts;
                    	}
                    	function quadriSyllabesTotal() {
                    	    var syllabes_4_total = quadriSyllabes(); // Cette fonction provient de syllabes.js 
                    	    var qs = [];
                    	            
                        	for (var i = 0; i < syllabes_4_total.length; i++) {
                        	for (var j = 0; j < syllabes_4_total[i].length; j++) {
                        	    qs[qs.length] = syllabes_4_total[i][j];
                        	}}
                    	        
                    	    return qs;
                    	}   
                    } 
                    function evaluations() {
                                
                        var syllabes = syllab();
                        var nbr_max_de_questions_a_poser = 4;
                        var questions_evaluation = questions();
                        var question_evaluation = '', questions_a_evaluer = [], reponse_evaluation = [];
                        var compteur = incrementer();
                        var evaluation_counter = 0;
                        
                        var memoire_rang = [], memoire_question = [], memoire_reponse = [], memoire_vraie_reponse = [];
                        var memoire_point = [], memoire_point_total = [];
                         
                        var q_index = 0, q_rang = '߭';
                        var q_ordre = parseIntNko(q_index+1);
                        var evaluation_a_stocker = [];
                         
                        $('.fermeture').attr('id', 'fermer_evaluation');

                        afficherEvaluation();
                        initialiserEvaluation();
                        evaluer();
                        correctionEvaluation();
                        stockerEvaluation();

                    	function afficherEvaluation(){
                            evaluation.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                            setTimeout(function() { evaluation.css({'transform':'scale(1)'});}, 5);
                            setTimeout(function() { evaluation.css({'opacity':'1'});}, 5);
                        }
            	        function initialiserEvaluation() {
            	            
            	            initialisationDEvaluationEntete();
                            initialiserEvaluationAStocker();
                           
                            function initialisationDEvaluationEntete(){
                        	    var q_total = parseIntNko(nbr_max_de_questions_a_poser);
                                 
                        	    var compteur = incrementer();
                        	    var q_index = 0;
                        	    var q_ordre = parseIntNko(q_index+1);
                        	    var q_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
                        	    var q_rang = '߭';
                        	    var q_actiom = 'ߟߊߡߍ߲߫';
                        	    
                        	    $('.question_label').html( q_label );
                        	    $('.question_total').html( q_total );
                        	    $('.question_ordre').html( q_ordre+q_rang );
                        	    $('.question_action').html( q_actiom );
                        
                                $('.question_btn').css('display','block');
                                $('.repetition_btn').css('display','none');
                                $('.correction_btn').css('display','none');
                            }
                            function initialiserEvaluationAStocker() {
                                for (var i = 0; i < 20; i++) questions_a_evaluer[i] = questions_evaluation[i];
                                for(var i=0;i<questions_a_evaluer.length;i++){
                                	            
                                    var q = questions_a_evaluer[i];
                                    var r = '';
                                    var p = 0;
                                	            
                                    evaluation_a_stocker[i] = [q,r,p];
                                } 
                            }
                        }
                        function evaluer() {
                            	            
                            poserQuestionEvaluation();
                            repeterQuestionEvaluation();
                            repondreEvaluation();
                            
                            function poserQuestionEvaluation(){
                        	    $('.question_btn').on('click', function(){
                        	        effacerPrecedenteReponse();
                        	        question_evaluation = questions_evaluation[q_index];
<<<<<<< HEAD
                       
=======
            alert(question_evaluation);            
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                        	        dicterLaQuestion();
                        	        $('#evaluation_cross').css('display','none');
                        	        $('#evaluation_cross').css('transform','scale(0.4)');
                                    $('#evaluation_reponse_container').css({'top':0});                        	       // memoriserQuestionRang();
                        
                        	        q_index = compteur();
                        	        q_ordre = parseIntNko(q_index+1);
                        	        q_rang = '߲';
                        	        
                                    if(q_index==nbr_max_de_questions_a_poser){
                                        $('.question_btn').off('click');
                                        $('.question_btn').html('ߞߘߐߓߐߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
                                    }
                        	        actualiserLesLibellesDeDialogueBtn();
                    alert(question_evaluation);     	        
                        	        function effacerPrecedenteReponse() {
                        	            $('#evaluation_reponse').html('');
                        	        }
                        	        function actualiserLesLibellesDeDialogueBtn(){
                        	            
                            	        $('.question_ordre').html(q_ordre+q_rang);
                            	        $('.question_action').html('ߠߊߡߍ߲߫');
                            	        
                            	        $('.question_btn').css('display','none');
                            	        $('.repetition_btn').css('display','block');
                            	        $('.correction_btn').css('display','none');
                        	        }
                        	        function dicterLaQuestion(){
                                        $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_evaluation+'.mp3', 'autoplay':'on'});
                        	            $('#progress_bar').css('top',0);
                        	        }
                        	        function memoriserQuestionRang(){
                        	            memoire_rang[memoire_rang.length] = q_ordre+q_rang;
                        	            return memoire_rang;
                        	        }
                        	    });
                            }
                            function repeterQuestionEvaluation(){
                        	    $('.repetition_btn').on('click', function(){
                                    $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_evaluation+'.mp3', 'autoplay':'on'});
                        	    });
                            }
                            function repondreEvaluation(){
                                $('#clavier_nko td').on('click', function(){
                                 
                                    if(question_evaluation == '') guiderClient();
                                    if(question_evaluation != '') {
                                        
                                        var caractere = $(this).html();
                                        
                                        reponse_evaluation[reponse_evaluation.length] = caractere;
                                        $('#evaluation_reponse').html(reponse_evaluation.join(''));
                                        afficherCorrectionButton();
                                        
                                        function afficherCorrectionButton(){
                                            $('.question_btn').css('display','none');
                                            $('.repetition_btn').css('display','none');
                                            $('.correction_btn').css('display','block');
                                        }
                                    }
                                });
                            }
                        }
                        function correctionEvaluation(){
                            $('.correction_btn').on('click', function(){
                                 
                                corrigerEvaluation();
                                actualiserEvaluationProgressBar();
                                effacer();
                                setTimeout(function() { afficherQuestionButton(); }, 1500);
                            	evaluation_counter++;
                                
                                function corrigerEvaluation(){
                                    
                                    let q = question_evaluation;
                            	    let r = reponse_evaluation.join('');
                            	    let p = (q == r) ? 1:0;
                            	    let question_reponse = [];
                           	    
                                    note += p; 
                            	    evaluation_a_stocker.splice(evaluation_counter,1,question_reponse);
                            	    marquerReponseEvaluation();            
                            	    
                                    function marquerReponseEvaluation() {    
                                        if(reponse_evaluation.join('') == question_evaluation) {
<<<<<<< HEAD
                                            $('#evaluation_reponse_container').css({'top':'-100%'});
                                        }else{
                                            
                                            $('#evaluation_cross').html( '&#10060;' );
                                            $('#evaluation_cross').css({'display':'block', 'transform':'scale(0.5)', 'opacity':0});
                                            setTimeout(function(){ $('#evaluation_cross').css({'transform':'scale(1)', 'opacity':0.75}); }, 100);
=======
                                          
                                            $('#check_mark_container, #reponse').css('display','inline-block');
                                            $('#check_mark').html("&#10003;"); 
                                            setTimeout(function(){ $('#check_mark_cover').css({'left':'-100%'}); },100);
                                            setTimeout(function(){ $('#check_mark_cover').css({'left':0}); },1500);
                                            setTimeout(function(){ $('#check_mark_container').css({'display':'none'}); },1500);
                                        }else{
                                            $("#reponse").html(reponse_evaluation.join('')+"<span id='cross'>&#10060;</span>");
                                            $('#cross').css({'display':'block', 'transform':'scale(0.5)', 'opacity':0});
                                            setTimeout(function(){ $('#cross').css({'transform':'scale(1)', 'opacity':0.75}); }, 100);
                                            setTimeout(function(){ $('#cross').css({'display':'none'}); },1500);
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                                        }
                                    }    
                                }
                                function actualiserEvaluationProgressBar(){
                                            
<<<<<<< HEAD
                                    var course_width = $('#evaluation_foot').width();
                                    $('#evaluation_progress_bar').width( course_width - 2 );
                                    var progress_unity = $('#evaluation_progress_bar').width()/nbr_max_de_questions_a_poser;
                                           
=======
                                    var progress_unity = $('#evaluation_progress_bar').width()/nbr_max_de_questions_a_poser;
                                        
>>>>>>> a7134bcdf180a037e5b3f4da5cf471008131216a
                                    if(question_evaluation != reponse_evaluation.join('')){ 
                                        $('.progress_question_bar').css('width','+='+progress_unity+'px');
                                    }else{ 
                                        $('.progress_question_bar, .progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                                    }
                                }
                                function effacer(){
                                    setTimeout(function(){
                                        question_evaluation = '';
                                        reponse_evaluation.splice(0,reponse_evaluation.length);
                                        $('#reponse').html(reponse_evaluation);
                                        $('#check_mark').empty();
                                    },1500);
                                }
                                function afficherQuestionButton(){
                                    $('.correction_btn').css('display','none');
                                    $('.question_btn').css('display','block');
                                    $('.repetition_btn').css('display','none');
                                }
                            });
                        }
                        function stockerEvaluation() {
                            $('.correction_btn').on('click', function(){
                         
                                if(evaluation_counter == nbr_max_de_questions_a_poser) {
                                     
                                    if(note <  moyenne) alert( "ߛߍ߬ߦߵߊ߬ ߡߊ߬" ); 
                                    if(note >= moyenne) {
                                        if(phase_class == "apprises") {alert("ߦߙߐ ߢߌ߲߬ ߞߍߣߍ߲߫ ߞߘߐ ߟߋ߬"); return false;}
                                       
                                        let phase_nbr = phasesNombre(derniere_phase);
                                        sendEvaluationToDB();
                                        changerPhaseActive(phase_nbr);
                                        sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr));
                                        
                                        if(phase_nbr === total_phase) {
                                            sessionStorage.setItem('niveau_max',JSON.stringify(niveau_max+1));                                            sessionStorage.setItem('niveau_en_cours',JSON.stringify(niveau_max+2));
                                            sessionStorage.setItem('phase_nbr',JSON.stringify(0));
                                        }
                                    }
                                    
                                    function sendEvaluationToDB() {
                                       
                                        let matiere = JSON.parse(sessionStorage.getItem('matiere_active'));
                                        let phase   = JSON.parse(sessionStorage.getItem('phase'));
                                        let lesson  = JSON.stringify(evaluation_a_stocker);
                                                
                                            
                                        const evaluation_data = new URLSearchParams({
                                            id     : id,
                                            matiere: matiere,
                                            niveau : niveau_en_cours,
                                            phase  : phase,
                                            lesson : lesson,
                                            note   : JSON.stringify(note)
                                        });
                                
                                        fetch("http://localhost:8080/kouroukan/pages/actions.php", {
                                            method: "POST",
                                            body: evaluation_data 
                                        })
                                        .then(response => console.log(response))
                                        .catch(error => console.log(error));
                                    }
                                }
                            });
                            $('#fermer_evaluation').on('click', function() {
                                (location.replace("http://localhost:8080/kouroukan/pages/programmes.php"))();
                            });
                        }
                    }
        	    }
        	   // if(phase_class == 'a_apprendre') $('.course_container').css('display','none');
    	    }
      	});
    	
    	$('#go_to_lesson').on('click', function() { $('.phases ul li').click(); });
	    
        function actualiserCochage() {
            voyelles_cochees = $('#voyelles_cochees').html().split('');
            consonnes_cochees = $('#consonnes_cochees').html().split('');
            tedos_coches = $('#tedos_coches').html().split('');
            tons_coches = [''].concat($('#tons_coches').html().split(''));
            nasalisations_cochees = [''].concat($('#nasalisations_cochees').html().split(''));
            caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
        }	    
	}
    function initialiserProgressBarr() {
        $('.progress_question_bar, .progress_bonne_reponse_bar').css('width',0);
    }
});