$('document').ready(function() {

 //Declaration des variables
    var id = JSON.parse(sessionStorage.getItem('id'));  
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storageDeLaMatiereActive()
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
            
   
            var questions_quantity = quantiteDeQuestion();
            var quantite_de_question = quantiteDeQuestion();
            var compteur_de_question = 0;
            
            var phase_class = $(this).attr('class');
    	    var phase_id = $(this).attr('id');
    	    var course_id = phase_id.split('_')[1];
            var lesson_content = lessonContent()
    	    var lesson_courante = lessonHTML(lesson_content);
            
            sessionStorage.setItem('lesson_content',JSON.stringify(lesson_content));
            sessionStorage.setItem('lesson_courante',JSON.stringify(lesson_courante));
            sessionStorage.setItem('quantite_de_question',JSON.stringify(quantite_de_question));
            sessionStorage.setItem('phase_class', JSON.stringify(phase_class));
            sessionStorage.setItem("course_id", JSON.stringify(course_id));
            sessionStorage.setItem("phase_id", JSON.stringify(phase_id));

            /*--------------------------------------------------------------------*/ 

    	    phaseActiveName();
    	    cours();
            
          /*--------------------------------------------------------------------*/  

            function phaseActiveName() { sessionStorage.setItem('phase', JSON.stringify(phase_id)); }
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

                    chargerLesson();
                    afficherLesson();
                    dispenserLesson();
                    
                    sessionStorage.setItem('session_niveau_max', niveau_max);

                    function chargerLesson() {
                        var lesson_content = lessonContent();
                        var lesson_active = lessonHTML(lesson_content);
                        $('.course_body').html(lesson_active);
                    }
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
        	    //}


                
    	    }
      	});
    	
    	$('#go_to_lesson').on('click', function() { $('.phases_container ul li').click(); });
                  
        function lessonContent() {

            var niveau = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storageDeLaMatiereActive()
            var course_id = JSON.parse(sessionStorage.getItem('course_id'));   // Voir programmes.js fonction storageDeLaMatiereActive()
        
            
         // Recuperation des caractères cochés
            var voyelles_cochees      = JSON.parse(sessionStorage.getItem('voyelles_cochees'));
            var consonnes_cochees     = JSON.parse(sessionStorage.getItem('consonnes_cochees'));
            var tedos_coches          = JSON.parse(sessionStorage.getItem('tedos_coches'));
            var tons_coches           = JSON.parse(sessionStorage.getItem('tons_coches'));
            var nasalisations_cochees = JSON.parse(sessionStorage.getItem('nasalisations_cochees'));

            function lettresCochees() {
                var lettres = voyelles_cochees.concat(consonnes_cochees,tedos_coches);
                return lettres;
            }
            function syllabesSimples() {
                var syllabes = [];

                for(var i=0; i<nasalisations_cochees.length; i++) {
                for(var j=0; j<consonnes_cochees.length;     j++) {
                for(var k=0; k<voyelles_cochees.length;      k++) {
                    syllabes[syllabes.length] = consonnes_cochees[j]+voyelles_cochees[k]+nasalisations_cochees[i];
                }}}

                return syllabes;
            }
            function syllabesTonifiees() {
                var s_t = [];

                for(var i=0; i<nasalisations_cochees.length; i++) {
                for(var j=0; j<consonnes_cochees.length;     j++) {
                for(var k=0; k<voyelles_cochees.length;      k++) {
                for(var l=0; l<tons_coches.length;           l++) {
                    s_t[s_t.length] = consonnes_cochees[j]+voyelles_cochees[k]+nasalisations_cochees[i]+tons_coches[l];
                }}}}

                return s_t;
            }
            function chiffresDeBase() {
                var chiffre = chiffres;    // Voir caracteres.js
                return chiffre;
            }

            let lesson_content = [];
            
            
            if(course_id == "apprentissage") {
                if(niveau == 1) lesson_content = lettresCochees();
                if(niveau == 2) lesson_content = syllabesSimples();
                if(niveau == 3) lesson_content = syllabesTonifiees();
                if(niveau == 4) lesson_content = chiffresDeBase();
            }
            
            if(course_id == "exercice") {
                if(niveau == 1) lesson_content = malaxer(lettresCochees());
                if(niveau == 2) lesson_content = malaxer(syllabesSimples());
                if(niveau == 3) lesson_content = malaxer(syllabesTonifiees());
                if(niveau == 4) lesson_content = malaxer(chiffresDeBase());
            }
            
            if(course_id == "pratique") {
                if(niveau == 1) lesson_content = [];
                if(niveau == 2) lesson_content = [];
                if(niveau == 3) lesson_content = [];
                if(niveau == 4) lesson_content = [];
            }
            
            if(course_id == "evaluation") {
                if(niveau == 1) lesson_content = [];
                if(niveau == 2) lesson_content = [];
                if(niveau == 3) lesson_content = [];
                if(niveau == 4) lesson_content = [];
            }

            return lesson_content;
        }
	}
});