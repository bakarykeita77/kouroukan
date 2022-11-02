$('document').ready(function() {

 //Declaration des variables
    var matieres = [], matieres_length = 0, matiere_index = 0, nbr = 0;
    var niveaux_etudies = [], niveau_max = 0, niveau_en_cours = 1;
	var etapes_passees = [], etape_actuelle = [], etapes_a_faire = [], etape_max = [], rang = '';
	var phases_etudiees = [], derniere_phase = '', phase_en_cours = '', phase_nbr = 0;
    var phases_distinctes = [], phases_1_distinctes = [], phases_2_distinctes = [], phases_3_distinctes = [], phases_4_distinctes = [];
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
	
	function getPhases() { 

        total_phase       = JSON.parse(sessionStorage.getItem('total_phase'));
        phases_etudiees   = JSON.parse(sessionStorage.getItem('phases_etudiees')); 
        dernieres_phases  = JSON.parse(sessionStorage.getItem('dernieres_phases'));     
        derniere_phase    = JSON.parse(sessionStorage.getItem('derniere_phase'));     
        dernieres_phases_distinctes  = JSON.parse(sessionStorage.getItem('dernieres_phases_distinctes'));
    }
    function phases() {

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
        
    	    var lesson_statut = lessonStatut();
    	    var phase_nbr = nombre();
   	    
    	    $.each($('#phases_list li'), function() {
    	      
        	    var phase_index = $(this).index();
                
                if(lesson_statut == "vierge") {
                    if(phase_nbr === 0) {
                        if(phase_index === 0) $(this).addClass('active');
                        if(phase_index  >  0) $(this).addClass('a_apprendre');
                    }
                    if(phase_nbr > 0) {
                        if(phase_index <= phase_nbr-1) $(this).removeClass('active').addClass('apprises');
                        if(phase_index == phase_nbr  ) $(this).removeClass('a_apprendre').addClass('active');
                        if(phase_index >= phase_nbr+1) $(this).addClass('a_apprendre');
                    }
                }
    	        if(lesson_statut == "non_vierge") {
                    if(phase_index <= phase_nbr-1) $(this).removeClass('active').addClass('apprises');
                    if(phase_index == phase_nbr  ) $(this).removeClass('a_apprendre').addClass('active');
                    if(phase_index >= phase_nbr+1) $(this).addClass('a_apprendre');
    	        }
            });
    	}
        function lessonStatut() {
            let li = $('#phases_list li');
            let indice = 0;
            
            $.each(li, function() { 
                let li_id = $(this).attr('id');
                indice = ($.inArray(li_id, phases_distinctes) === -1) ? indice : indice+=1; 
            });
          
            let ls = (indice === 0) ? "vierge" : "non_vierge";
            return ls;
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
      
            var syllabes_tonifies = tonification(); // Voir cette fonction dans js/tons.js 

            var questionnaires = questions();
            var questions_quantity = quantiteDeQuestion();
            var quantite_de_question = quantiteDeQuestion();
            var compteur_de_question = 0;
            var exercice_questions = [];
            
            var total_point = 0;
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

          /*--------------------------------------------------------------------*/    
     
    	    phaseActiveName();
    	    affichageDeCours();
    	    dimensionnementDeCourseBody();
    	    cours();
        
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
               
                if(niveau_en_cours==1) lq = mix1D(lettres);
                if(niveau_en_cours==2) lq = mix1D(syllabes);
                if(niveau_en_cours==3) lq = mix1D(syllabes_tonifies);
                if(niveau_en_cours==4) lq = mix1D(chiffres);
                
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
                /*
                if(phase_class == 'apprises') {
                    $('.course_container').css('display','none'); 
                    alert("Tu as dépassé ce niveau !");
                }
                if(phase_class == 'a_apprendre') {
                    $('.course_container').css('display','none'); 
                    alert("Tu n'est pas encore arrivé à ce niveau !");
                } */
        	    if(phase_class == 'apprises') {    

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
                                
                                exercice_questions = mix1D(exercice_questions);
                    	    }
                    	}
                    	function afficherExercice(){
                            
                            exercice.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                            setTimeout(function() { exercice.css({'transform':'scale(1)'});}, 5);
                            setTimeout(function() { exercice.css({'opacity':'1'});}, 5);
                    	}
                	    function exercer(){
                	        
                    	    var i=0;
                    	    var question_posee, reponse_montree, point; 
        
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

                        var option = '';
                        var option_index = null;
                        var option_active = '';
                	    var option_de_syllabe = '';
                	    var nbr_option_vide = '';
                	    var nbr_option_non_vide = '';
                    	let all_options = [], DB_options = '', local_options = '';
                	    
                	    var compteur_de_question = 1;
                	    var compteur = 0;
                        var compteur_de_caractere = 0;
                        var bulle_index = -1;
                        var s_0 = [], s_1 = [], s_2 = [], s_3 = [];
                	    var question_limit = 10;
                	    var quantite_de_question = parseIntNko(question_limit);
                	    var question_rang = '߭';
                	    
                	    var memoire_pratique = [];
                	    var memoire_pratiques = [];
    
                        var mono_syllabes   = monoSyllabesTotal();
                        var bi_syllabes     = biSyllabesTotal();
                        var tri_syllabes    = triSyllabesTotal();
                        var quadri_syllabes = quadriSyllabesTotal();  

                    	let questions_mono_syllabe   = mix1D(mono_syllabes);
                    	let questions_bi_syllabe     = mix1D(bi_syllabes);
                    	let questions_tri_syllabe    = mix1D(tri_syllabes);
                    	let questions_quadri_syllabe = mix1D(quadri_syllabes);
                    	    
                    	let mono_syllabe   = [];
                    	let bi_syllabe     = [];
                    	let tri_syllabe    = [];
                    	let quadri_syllabe = [];
                    	    
                    	let pratique_a_stocker = [];
            
                        var questions_pratiques=[], questions=[], question='', reponse=[], point='';
                        var table = $('#pratique_fiche_body').html();
                        
                      /*--------------------------------------------------------------------*/
                        $('.fermeture').attr('id', 'fermer_pratique');
                      
                	    recuperationDesOptionsEffectuees();
                	    afficherPratique();
                        initialiserPratiques();
                        optionStyles();
                	    pratiquer();
                	    stockerPratique();
             	    
                      /*--------------------------------------------------------------------*/

                    	function recuperationDesOptionsEffectuees() {
                    
                    	    DB_options = getDBOptions();
                    	    if(DB_options.length === 4) localStorage.clear();
                    	    local_options = getLocalOptions();
                            
                            all_options = (DB_options != '') ? DB_options:local_options;
                    	}
                    	function getDBOptions() {
                        	    
                            let DB_pratiques = JSON.parse(localStorage.getItem('pratiques'));
                       
                        	let pratiques_niveaux = [], niveau_max = '';
                        	let niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
                            
                        	for (var i = 0; i < DB_pratiques.length; i++) {
                        	    if(DB_pratiques[i][0] == niveau_actif) DB_options = JSON.parse(DB_pratiques[i][1]);
                        	}
                        	
                        	return DB_options;    
                        }
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
                	        affichageParDefautDesBoutonsDEntete();
                            setTimeout(function() { pratiques.css({'transform':'scale(1)'});}, 5);
                            setTimeout(function() { pratiques.css({'opacity':'1'});}, 5);

                            optionStyles();
                    	}
                	    function initialiserPratiques() {
               	        
                	        initialiserOptions();
                	        dimensionnementParDefautDePratiquesCorps()                   
                	        affichageParDefautDesBoutonsDEntete();
                            initialiserProgressBarr();
                            table = '';
                            $('#pratique_fiche_body').html('');
                            
                        	function initialiserOptions() {
                            	$.each($('#pratique_options span'), function() {
                               	
                                	let option_de_syllabe = '';
                            	    let option = $(this);
                            	    
                            	    option_index = $(this).index();
                            	    compteur = 0;
                            	    table = '';
                                                               
                                    option.removeClass('active'); 
                                    option.addClass('a_apprendre');
                                        
                                    questions = questionsPratiques();
                            	    dimensionnementParDefautDePratiquesCorps()                   
                                    initialiserProgressBarr();
                                     
                                	switch(option_index) {
                                	    case 0: mono_syllabe   = monoSyllabe();   break;
                                	    case 1: bi_syllabe     = biSyllabe();     break;
                                	    case 2: tri_syllabe    = triSyllabe();    break;
                                	    case 3: quadri_syllabe = quadriSyllabe(); break;
                                	}
                                
                                	function monoSyllabe() {
                                	    let mono_syllabe = [];
                                	        
                                        for(let i = 0; i < question_limit; i++) {
                                                	                
                                            let q = questions_mono_syllabe[i];
                                            let r = '';
                                            let p = 0;
                                            let question_reponse = [q,r,p];
                                                	                
                                            mono_syllabe.push( question_reponse );
                                        }
                                	        
                                	    return mono_syllabe;
                                	}
                                	function biSyllabe() {
                                	    let bi_syllabe = [];
                                	        
                                        for(let i = 0; i < question_limit; i++) {
                                                	                
                                            let q = questions_bi_syllabe[i];
                                            let r = '';
                                            let p = 0;
                                            let question_reponse = [q,r,p];
                                                	                
                                            bi_syllabe.push( question_reponse );
                                        }
                                	        
                                	    return bi_syllabe;
                                	}
                                	function triSyllabe() {
                                	    let tri_syllabe = [];
                                	        
                                        for(let i = 0; i < question_limit; i++) {
                                                	                
                                            let q = questions_tri_syllabe[i];
                                            let r = '';
                                            let p = 0;
                                            let question_reponse = [q,r,p];
                                                	                
                                            tri_syllabe.push( question_reponse );
                                        }
                                	        
                                	    return tri_syllabe;
                                	}
                                	function quadriSyllabe() {
                                	    let quadri_syllabe = [];
                                	        
                                        for(let i = 0; i < question_limit; i++) {
                                                	                
                                            let q = questions_quadri_syllabe[i];
                                            let r = '';
                                            let p = 0;
                                            let question_reponse = [q,r,p];
                                                	                
                                            quadri_syllabe.push( question_reponse );
                                        }
                                	        
                                	    return quadri_syllabe;
                                	}
                            	});
                        	}
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
                                
                               // if($(this).hasClass('a_apprendre')) { alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫");   return; }
                              //  if($(this).hasClass('apprises'))    { alert("ߕߊ߲߬ߓߌ߬ ߓߘߊ߫ ߞߍ߫ ߦߊ߲߬ ߘߐ߫ ߞߘߐ߬ߡߊ߲߬"); return; }                               

                                option_active = $(this);
                            	option_index = $(this).index();
                                masquerLesOptions();
                            	compteur_de_question = 1;
                            	compteur = 0;
                            	option_de_syllabe = optionDeSyllabe();
                            	table = ""; // Table de reponse
                                    
                                switch(option_index) {
                                    case 0 : option = mono_syllabe;   break;
                                    case 1 : option = bi_syllabe;     break;
                                    case 2 : option = tri_syllabe;    break;
                                    case 3 : option = quadri_syllabe; break;
                                }
                              
                                for (var i = 0; i < option.length; i++) { questions_posees[i] = option[i][0]; }
                                
                                $(this).parent().parent().css('top','-110%');
                                
                                initialiserProgressBarr();
                        	    poserQuestionPratique();
                            	repondreQuestionPratique();
                            	correctionPratique();
                                
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
                                function dossierImage() {
                                    let dossier = '';

                                    if(option_index === 0) dossier = "/kouroukan/image/image-1-syllabe/";
                                    if(option_index === 1) dossier = "/kouroukan/image/image-2-syllabe/";
                                    if(option_index === 2) dossier = "/kouroukan/image/image-3-syllabe/";
                                    if(option_index === 3) dossier = "/kouroukan/image/image-4-syllabe/";

                                    return dossier;
                                }
                                function masquerLesOptions() {
                                    $('#pratique_options').css('top','-120%');
                                }
                        	    function poserQuestionPratique() {
                                    if(!question) $('.clavier_container').css('opacity',0.5);

                            	    $('.question_btn').on('click', function() {
                                        pratiqueGuide();
                                	    question = questions_posees[compteur];
                                	    
                                	    if(question) $('.clavier_container').css('opacity',1);
                                	    $('#pratiques_images_container').css('transform','scale(0.25)');
                      	        
                                	    actualiserLesBoutonsDEntete();
                                	    repeteQuestion();
                                 	        
                                	    function pratiqueGuide() {
                                	            
                                	        var pratique_guide_html = pratiqueGuideHTML();
                               	          
                                	        $('#cumule_des_caracteres').html(questions_posees[compteur]);
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
                        	    function repondreQuestionPratique(){
                            	    $('.clavier_container td').on('click', function() {
                                        
                                        var caractere = $(this).html();
                                        
                                        if(!question) return false;
                                        
                                        reponse[reponse.length] = caractere;
                                        chargementDesBulles();
                                        bullesStyles();
                                        $('#cumule_des_caracteres').html(reponse);
                                        afficherCorrectionButton();
                                        compteur_de_caractere++;
                                            
                                        function afficherCorrectionButton() {
                        	                $('.repetition_btn').css('display','none');
                        	                $('.correction_btn').css('display','block');
                        	                $('.question_btn').css('display','none');
                                        }
                                        function chargementDesBulles() {
                                                
                                            if($.inArray(caractere,caracteres[1]) != -1) bulle_index++;

                                            if(bulle_index < 1) {
                                                s_0[s_0.length] = reponse[reponse.length-1];
                                                $('#span_0').html(s_0);
                                            }
                                            if(bulle_index == 1) {
                                                s_1[s_1.length] = reponse[reponse.length-1];
                                                $('#span_1').html(s_1);
                                            }
                                            if(bulle_index == 2) {
                                                s_2[s_2.length] = reponse[reponse.length-1];
                                                $('#span_2').html(s_2);
                                            }
                                            if(bulle_index == 3) {
                                                s_3[s_3.length] = reponse[reponse.length-1];
                                                $('#span_3').html(s_3);
                                            }
                                        }
                                        function bullesStyles() {
                                            $('.bulle:nth('+bulle_index+')').prevAll('.bulle').css({'background-color':'white', 'box-shadow':'0 0 8px #ccc', 'transform':'scale(1)'});
                                            $('.bulle:nth('+bulle_index+')').css({'background-color':'yellow', 'box-shadow':'0 0 8px yellow', 'transform':'scale(1.125)'});
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
                                	    memoire_pratique[memoire_pratique.length] = [question, reponse, point];
                            
                                        afficherQuestionBouton();
                                        chargerTableDeReponses();
                                        defilementDeTableReponseVersLeHaut();
                                        stylesDeTableDeReponses();
                                        afficherImage();
                                        actualiserPratiquesProgressBar();
                                       
                    	                enregistrerPratique();
                                     
                                        effacerQuestion();
                                        effacerReponse();
                                        effacerLesBulles();
                                        initialiserCompteurDeCaractere();
                                        finDOption();
                                        revisionDOption();
                                        
                                        compteur++;
                                        
                                        function chargerTableDeReponses() {
                                            table += "<div class='tr'>\n <span class='td'>"+question+"</span>\n<span class='td'>"+reponse+"</span>\n<span class='td'>"+parseIntNko(point)+"</span>\n </div>\n\n";
                                            $('#pratique_fiche_body').html(table);
                                        }
                                        function rechargerTableDeReponses() {
                                            table += "<div>\n <span class='td'></span>\n<span class='td'></span>\n<span class='td'></span>\n </div>\n\n";
                                            $('#pratique_fiche_body').html(table);
                                        }
                                        function stylesDeTableDeReponses() {
                                            $('#pratique_fiche_body div:last-child').addClass('pratique_tr_actif'); 
                                            $('#pratique_fiche_body div:last-child').siblings().removeClass('pratique_tr_actif'); 
                                            $('#pratique_fiche_body div:last-child').siblings().addClass('noir_clair'); 
                                        
                                        }
                                        function defilementDeTableReponseVersLeHaut() {
                                            $('#pratique_fiche_body').animate({ scrollTop:$('#pratique_fiche_body')[0].scrollHeight }, 1000);
                                        }	   
                                        function afficherImage() {
                                            /*
                                            let image_source = $('#'+reponse+' img').attr('src');
                                            let image = (image_source !== undefined) ? $('#'+reponse).html() : $('#ߖߌ߬ߦߊ').html();
                                            */
                                            
                                            let dossier_image = dossierImage();
                                            let image_html = '<img src="'+dossier_image+reponse+'.jpg" id="pratiques_image" alt="?">';
            
                                    	    $('#pratiques_images_container').html(image_html);
                                	        $('#pratiques_images_container').css('transform','scale(1)');
                                	        
                                	        if(question == reponse) {
                                	            $('#pratiques_images_container').css('opacity',1);
                                	            $('#croix').css('display','none');
                                	        }
                                	        if(question !== reponse) {
                                	            $('#pratiques_images_container').css('opacity','0.15');
                                	            $('#croix').css('display','flex');
                                	        }
                                	        
                                	        setTimeout(function(){ $('#pratique_guide').animate({'top':'-100%'},400); }, 200);

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
    
                                            let point = (question == reponse) ? 1:0;
                                            let question_reponse = [question,reponse,point];
                                            
                                            
                                            switch(option_index) {
                                                case 0 : actualiserOption(mono_syllabe);   break;
                                                case 1 : actualiserOption(bi_syllabe);     break;
                                                case 2 : actualiserOption(tri_syllabe);    break;
                                                case 3 : actualiserOption(quadri_syllabe); break;
                                            }
                                            
                                            function actualiserOption(syllabe) {
                                                let index = '', note = 0;
                                                
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
                                    	    if( question_limit === compteur+1 ) {
                                    	        
                                    	        var effort = '%'+parseIntNko((total_point/question_limit)*100);
                                    	        var message_1 = 'ߌ ߞߎߟߎ߲ߖߋ߫.<br/>'+option_de_syllabe+'  ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ ߁߀߀% ߟߊ߫. ߌ ߘߌ߫ ߛߋ߫ ߥߊ߫ ߟߊ߫ ߢߍ ߝߍ߬.';
                                    	        var message_2 = 'ߌ ߘߐߖߊ߬. <br/>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ '+effort+' ߟߋ߬ ߟߊ߫.<br/> ߘߌ߬ߢߍ߬ ߞߵߌ ߞߐߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬.';
                                   	    
                                                switch(option_index) {
                                                    case 0 : noterOption(mono_syllabe);   stockerOptionDansLocalStorage(mono_syllabe);   break;
                                                    case 1 : noterOption(bi_syllabe);     stockerOptionDansLocalStorage(bi_syllabe);     break;
                                                    case 2 : noterOption(tri_syllabe);    stockerOptionDansLocalStorage(tri_syllabe);    break;
                                                    case 3 : noterOption(quadri_syllabe); stockerOptionDansLocalStorage(quadri_syllabe); break;
                                                }
                                                
                                    	        masquerClavierEtConsoles();
                                    	        dimensionnementDeFinDePratiquesBody();
                                    	        chargerTotalPoints();
                                    	        initialiserProgressBarr();
                                    	        messageDeFinOption();
                                    	        continueLaPratique();
                                                
                                    	        function dimensionnementDeFinDePratiquesBody() {
                                    	            
                                    	            let pfh = $('#pratique_foot').height();
                                    	            
                	                                $('#tbody').css('height', (pfh-120)+'px');
                                    	            $('#pratique_fiche_foot').css('display','block');
                                    	            $('#message_de_fin_container').css('display','block');
                                    	        }
                                    	        function chargerTotalPoints() {
                                    	            $('#total_point').html(parseIntNko(total_point));
                                    	            $('#pourcentage_point').html('%'+parseIntNko(total_point*100/question_limit));
                                    	        }
                                                function messageDeFinOption() {
                                            
                                        	        if(effort == '߁߀߀%') {
        
                                        	            if(option_index <= 2) {
                                        	            
                                        	                $('#message_de_fin').html(message_1);
                                        	                $('#message_btn_1').html('ߛߍ߬ߦߌ߬ ߞߐ߫');
                                        	                $('#message_btn_2').html('ߥߊ߫ ߢߍ߫');
                                        	            }
                                        	            if(option_index > 2) {
                                        	              
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
                                    	        function continueLaPratique() {   
                                    	            $('#message_btn_2').on('click', function() {
                                    	                
                                    	                questions_pratiques = questionsPratiques();
                                    	                affichageParDefautDesBoutonsDEntete();
                                    	                dimensionnementParDefautDePratiquesCorps();
                                                        total_point = 0;
                                    	                
                                    	                if(option_active.hasClass('apprises')) { alert( "Cette option est déjà passée"); questions_posees.splice(0,questions_posees.length); return; }
                                    	                if($('#message_btn_2').text() == 'ߥߊ߫ ߢߍ߫') changerDOption();
                                    	                if($('#message_btn_2').text() == 'ߛߍ߬ߦߵߊ߬ ߡߊ߬') questions = questionsPratiques();
                                    	            });
                                    	        }
                                            }
                                        }  
                                        function changerDOption() {
                                            
                                            option_active.removeClass('active');
                                            option_active.addClass('apprises');
                                            option_active.next().removeClass('a_apprendre');
                                            option_active.next().addClass('active');
                                    	    
                                    	    afficherClavierEtConsoles();
                                    	    initialiserLesBoutonsDEntete();
                                    	    table = '';
                                        }  
                                    	function revisionDOption() {
                                    	        
                                    	    $('#pratique_fiche_body div').on('click', function() {
                                    	        $('#pratique_fiche_body div').addClass('noir_clair');
                                    	        $(this).siblings().removeClass('pratique_tr_actif');
                                    	        $(this).addClass('pratique_tr_actif'); 
                                    	        
                                    	        let question = $('.pratique_tr_actif .td:nth(0)').html(); 
                                    	        let reponse = $('.pratique_tr_actif .td:nth(1)').html(); 
                                    	        
                                            let dossier_image = dossierImage();
                                            let image_html = '<img src="'+dossier_image+reponse+'.jpg" id="pratiques_image" alt="?">';
            
                                    	    $('#pratiques_images_container').html(image_html);
                                    	  
                                    	        if(question == reponse) {
                                	                $('#pratiques_images_container').css('opacity',1);
                                	                $('#croix').css('display','none');
                                	            }
                                    	        if(question !== reponse) {
                                    	            $('#pratiques_images_container').css('opacity','0.15');
                                	                $('#croix').css('display','flex');
                                    	        }
                                	        
                                    	    });
                                    	}
                                    }); 
                                }
                            });
                        }
                    	function stockerPratique() {
                    	    $('#fermer_pratique').on('click',function(){

                                let DB_options = getDBOptions();
                                let local_options = getLocalOptions();
console.log(DB_options);
                                if(phase_index <  data_phase_nbr || nbr_option_non_vide < all_options.length) { return; }
                                if(phase_index == data_phase_nbr && nbr_option_non_vide == all_options.length) {
                                    
                                    note = noterPratique(); 
                                   
                                 /* Vérification de la validité de pratique:
                                    Pourqu'une pratique soit valable, il faut que chaque option soit passée.
                                    - Si non, la pratique est invalide et est retournée;
                                    - Si oui, la pratique est valable et le processus de stockage est engagé. */
                                    	        
                                    if(note >= moyenne) {
                                        let phase_nbr = phasesNombre(derniere_phase);
                                        
                                        sendPratiqueToDB(); 
                                        changerPhaseActive(phase_nbr);
                                        //deleteLocalOptions();
                                        sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr)); 
                                    }
                                }
                                initialiserPratiques();

                                
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

                                    let matiere = JSON.parse(sessionStorage.getItem('matiere_active'));
                                    let phase   = JSON.parse(sessionStorage.getItem('phase'));
                                    let lesson  = JSON.stringify(all_options);

                                    const pratique_data = new URLSearchParams({
                                        id     : id,
                                        matiere: matiere,
                                        niveau : niveau,
                                        phase  : phase,
                                        lesson : lesson,
                                        note   : note
                                    });
    
                                    fetch("http://localhost:8080/kouroukan/pages/actions.php", {
                                        method: "POST",
                                        body: pratique_data 
                                    })
                                    .then(response => response.text())
                                    .catch(error => console.log(error));
                                }
                                function deleteLocalOptions() {
                                    
                                    localStorage.removeItem(id+'_'+0);
                                	localStorage.removeItem(id+'_'+1);
                                	localStorage.removeItem(id+'_'+2);
                                	localStorage.removeItem(id+'_'+3);        
                                }
                    	    });
                    	}
                        
                        function dimensionnementParDefautDePratiquesCorps() {
                	        var pratiques_body_height = $('#pratique_body').height();
                	        var pratique_fiche_height = $('#pratique_fiche').height();
                	        var pratique_body_height = pratiques_body_height - pratique_fiche_height;  

                            $('#message_de_fin_container').css('display','none');
        	                $('#pratiques_images_container img').attr('src','#');
        	                
        	                afficherClavierEtConsoles();
                        }
                    	function affichageParDefautDesBoutonsDEntete() {
                    	        
                    	    $('.repetition_btn').css('display','none');
                    	    $('.correction_btn').css('display','none');
                    	    $('.question_btn').css('display','block');
                    	        
                    	    $('.question_total').html(quantite_de_question);
                    	    $('.question_ordre').html(parseIntNko(1)+'߭');
                    	    $('.question_action').html('ߟߊߡߍ߲߫');
                    	}
                        function initialiserLesBoutonsDEntete() {
    
                    	    $('.question_ordre').html(parseIntNko(compteur+1)+'߭');
                    	    $('.question_action').html('ߟߊߡߍ߲߫');
                    	                
                    	    $('.question_btn').css('display','block');
                    	    $('.repetition_btn').css('display','none');
                    	    $('.correction_btn').css('display','none');
                    	    
                    	    compteur = 0;
                    	    total_point = 0;
                        }
                    	    
                        function questionsPratiques() {
                            
                            var q = '';
                            var questions = [];
                            	            
                            switch(option_index) {
                                case 0: q = mix1D(mono_syllabes);   break;
                                case 1: q = mix1D(bi_syllabes);     break;
                                case 2: q = mix1D(tri_syllabes);    break;
                                case 3: q = mix1D(quadri_syllabes); break;
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
                        function afficherClavierEtConsoles() {
                            $('.progress_bar, .course_head, .clavier_container, #pratique_dialogue_btn').css('display','block');
                        }
                        function masquerClavierEtConsoles() {
                            $('.progress_bar, .clavier_container, #pratique_dialogue_btn').css('display','none');
                        }
                    	
                      	function monoSyllabesTotal() {
                    	    var mono_syllabes = monoSyllabes(); // Cette fonction provient de syllabes.js 
                    	    var ms = [];
                    	            
                        	for (var i = 0; i < mono_syllabes.length; i++) {
                        	for (var j = 0; j < mono_syllabes[i].length; j++) {
                        	    ms[ms.length] = mono_syllabes[i][j];
                        	}}
                    	        
                    	    return ms;
                    	}
                    	function biSyllabesTotal() {
                    	    var bi_syllabes = biSyllabes(); // Cette fonction provient de syllabes.js 
                    	    var bs = [];
                    	            
                        	for (var i = 0; i < bi_syllabes.length; i++) {
                        	for (var j = 0; j < bi_syllabes[i].length; j++) {
                        	    bs[bs.length] = bi_syllabes[i][j];
                        	}}
                    	        
                    	    return bs;
                    	}
                    	function triSyllabesTotal() {
                    	    var tri_syllabes = triSyllabes(); // Cette fonction provient de syllabes.js 
                    	    var ts = [];
                    	            
                            for (var i = 0; i < tri_syllabes.length; i++) {
                        	for (var j = 0; j < tri_syllabes[i].length; j++) {
                        	    ts[ts.length] = tri_syllabes[i][j];
                        	}}
                    	        
                    	    return ts;
                    	}
                    	function quadriSyllabesTotal() {
                    	    var quadri_syllabes = quadriSyllabes(); // Cette fonction provient de syllabes.js 
                    	    var qs = [];
                    	            
                        	for (var i = 0; i < quadri_syllabes.length; i++) {
                        	for (var j = 0; j < quadri_syllabes[i].length; j++) {
                        	    qs[qs.length] = quadri_syllabes[i][j];
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
                        var point = '', memoire_point = [], memoire_point_total = [];
                        var point_total = 0;
                         
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
                        	        question_evaluation = questions_evaluation[q_index];
            alert(question_evaluation);            
                        	        dicterLaQuestion();
                        	       // memoriserQuestionRang();
                        
                        	        q_index = compteur();
                        	        q_ordre = parseIntNko(q_index+1);
                        	        q_rang = '߲';
                        	        
                                    if(q_index==nbr_max_de_questions_a_poser){
                                        $('.question_btn').off('click');
                                        $('.question_btn').html('ߞߘߐߓߐߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
                                    }
                        	        actualiserEvaluationEntete();
                        	        
                        	        function actualiserEvaluationEntete(){
                        	            
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
                                        $('#reponse').html(reponse_evaluation.join(''));
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
                                actualiserProgressBar();
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
                                        }
                                    }    
                                }
                                function actualiserProgressBar(){
                                            
                                    var progress_unity = $('#evaluation_progress_bar').width()/nbr_max_de_questions_a_poser;
                                        
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
                                    
                                    if(note <  moyenne) alert( "reprendre" ); 
                                    if(note >= moyenne) {
                                        let phase_nbr = phasesNombre(derniere_phase);
                                        
                                        sendEvaluationToDB();
                                        changerPhaseActive(phase_nbr);
                                        sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr));
                                        
                                        if(phase_nbr === total_phase) {
                                            sessionStorage.setItem('niveau_max',JSON.stringify(niveau_max+1));
                                            sessionStorage.setItem('niveau_en_cours',JSON.stringify(niveau_max+2));
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