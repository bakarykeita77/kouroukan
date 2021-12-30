$('document').ready(function() {
	    
	var matiere_id = $('#matiere_id_container').html();
	var matiere_index = parseInt($('#matiere_index_container').html());
	var matiere_nom = $('#matiere_nom_container').html();
    var niveau = parseInt($('#niveau_container').html());
    var niveau_max = parseInt($('#niveau_max_container').html());
    var resume_brut_des_etudes = $('#resume_brut_des_etudes_container').html();
    var voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees;
   
    var rang = '';
	var etapes_passees = '';
	var etape_actuelle = [];
	var etapes_a_faire = [];
	var etape_max = [];
        
    var niveaux_passes = [];
    var niveau_en_coure = '';
    var phases_etudiees = [];
    var phase_active = '';
    var phases_a_etudier = [];
    var noms_des_phases = '';
    
    var resume_des_etudes = [];
        
	var phases_actuelles, phases_actuelles_etudiees, phase_precedante;
	var index_phase_actuelle, index_phase_precedante, index_phase_active;
	var avancer_btn = '';

    
    
    resume_des_etudes = convertirResuneBrutDesEtudesEnObjet();
    noms_des_phases = nomsDesPhases();
	phases_etudiees = phasesEtudiees();
	phase_active = phaseActive(); 
	phases_a_etudier = phasesAEtudier();
	phases();
	parametrageDeLesson();
	actualiserCochage();
	cours();
	naviguerSurLesson();
	

	function nomsDesPhases() {
	    var noms_des_phases = [];
	        
	    for (var i = 0; i < liste_de_phases.length; i++) {
	        noms_des_phases[noms_des_phases.length] = liste_de_phases[i][1];
	    }
	    return noms_des_phases;
	}
	function controlDesEtapesDEtude() {

        var tableau_de_niveaux_passes = [];
        var tableau_de_niveaux_restants = [];
        var tableau_de_phases_passees = '';
        var tableau_de_phases_restantes = [];
        
             
               
        niveau = reverseIntNko(niveau);
        resume_brut_des_etudes = resume_brut_des_etudes.split('/');
        etapes_passees = etapesPassees();
        etape_actuelle = etapeActuelle(); 
	    changementDePhase();
	    index_phase_actuelle = phases_etudiees.length;


	    function etapeActuelle() {
            var etape_actuelle = resume_brut_des_etudes[matiere_index-1].split(';'); 
	        return etape_actuelle;
	    }
	    function etapesPassees() {
    	    var etapes_passees = [];
    	    for (var i = 0; i < resume_brut_des_etudes.length; i++) {
     	       
    	        var etape = resume_brut_des_etudes[i].split(';');
    	        for (var j = 0; j < etape.length; j++) {
    	            var etape_passee = '';
    	            etape[j] = etape[j].split(',');
    	            
    	            if(etape[j][0] !== '' && etape[j][1] !== undefined && etape[j][2] !== undefined) {
    	                etapes_passees[etapes_passees.length] = etape[j];
    	            }
    	        }
    	    }
    	    
    	    return etapes_passees;
	    }
	    function changementDePhase() {
	        
	        var phases_des_etapes_passees = phasesDesEtapesPassees();
	        var phases_d_etape_actuelle_etudiees =[];
	        var phases_d_etape_actuelle_intermediaires =[];
	        var phase_d_etape_actuelle_en_cours =[];
	        var phases_d_etape_actuelle_a_etudier =[];
	       
	        
	        
	        phasesDEtapeActuelleEtudiees();
	        phasesDEtapeActuelleIntermediaires();
	        phaseDEtapeActuelleEnCours();
	        phasesDEtapeActuelleAEtudier();
	        
        
	        
	        function phasesDEtapeActuelleEtudiees() {
    	        $.each(etape_actuelle, function(){
    	            var etape_courante = this.split(',');
    
    	            if(etape_courante[1] !== undefined) {
        	            phases_d_etape_actuelle_etudiees[phases_d_etape_actuelle_etudiees.length] = etape_courante[1];
    	            }
    	        });
	        }
	        function phasesDEtapeActuelleIntermediaires() {
    	        for(var i=0;i<noms_des_phases.length;i++) {
    	            var nom_de_phase = noms_des_phases[i];
    	            if(phases_d_etape_actuelle_etudiees.indexOf(nom_de_phase) == -1) {
    	                phases_d_etape_actuelle_intermediaires[phases_d_etape_actuelle_intermediaires.length] = nom_de_phase;
    	            }
    	        }
	        }
	        function phaseDEtapeActuelleEnCours() {
	            if(phases_d_etape_actuelle_intermediaires == '') {
	                phase_d_etape_actuelle_en_cours = '';
	            }else{
	                phase_d_etape_actuelle_en_cours = phases_d_etape_actuelle_intermediaires[0];
	            }
	        }
	        function phasesDEtapeActuelleAEtudier() {
	            for (var i = 1; i < phases_d_etape_actuelle_intermediaires.length; i++) {
	                phases_d_etape_actuelle_a_etudier[phases_d_etape_actuelle_a_etudier.length] = phases_d_etape_actuelle_intermediaires[i];
	            }
	        }
	        function phasesDesEtapesPassees() {
	            var phases_des_etapes_passees = [];
	            
	            $.each(etapes_passees, function() {
	                phases_des_etapes_passees.push(this[1]);
	            });
	           
	            return phases_des_etapes_passees;
	        }
	    }
	    function phasesAEtudier() {
	        var phases_a_etudier = [];
	        $.each(etape_actuelle, function(){
	            if(etapes_passees.indexOf(this) !== -1 && noms_des_phases.indexOf(this.split(',')[1]) !== -1) {
	                phases_a_etudier[phases_a_etudier.length] = this;
	            }
	        });
	        
	        return phases_a_etudier; 
	    }
	    
	}
    function phasesEtudiees() {
            
        var index_matiere_active = niveau_max+1;
        var index_matiere_clickee = matiere_index; 
       
        phases_etudiees = phasesPassees();
        return phases_etudiees;
            
        function phasesPassees() {
            
            var phases_etudiees = [];
            var etapes_non_vide = [];
            var etape_active = '';
                   
            niveau_en_coure = niveau_max+1;

            if(niveau_en_coure == index_matiere_clickee) {
                for (var i = 0; i < niveau_en_coure; i++) {
                    etapes_non_vide[etapes_non_vide.length] = resume_des_etudes[i];
                }
                 
                etape_active = etapes_non_vide[etapes_non_vide.length-1];
                     
                for (var j = 0; j < etape_active.length; j++) {
                    if(etape_active[j][1] !== undefined) {
                        phases_etudiees[phases_etudiees.length] = etape_active[j][1];
                    }
                }
            }
          
            if(niveau_en_coure > index_matiere_clickee) {
                for (var i = 0; i < liste_de_phases.length; i++) {
                    phases_etudiees[phases_etudiees.length] = liste_de_phases[i][1];
                }
            } 

            return phases_etudiees;
        }
    }
    function phaseActive() {
        var index_phase_active = '';
        
        if(phases_etudiees != '') {
            index_phase_active = phases_etudiees.length+1;  
        }else{
            index_phase_active = 0;
        }
        
        var phase_active = noms_des_phases[index_phase_active];
         
        return phase_active;
    }
    function phasesAEtudier() {
        var phases_a_etudier = [];

        $.each(liste_de_phases, function() {
            var phase_a_etudier = this[1];

            if(phases_etudiees.indexOf(phase_a_etudier) == -1 && phase_active !== phase_a_etudier) {
                phases_a_etudier[phases_a_etudier.length] = phase_a_etudier;
            }
        });
       
        return phases_a_etudier;
    }
	function phases() {
        
    	$('.phases').html(phasesHTML());
        actualiserTitre();	   
	    stylesDesPhases();
    
    
        function phasesHTML(){

            var content = '<ul>';
            
            for(var i=0;i<liste_de_phases.length;i++){
                var lesson_id = $('.lesson_title').attr('id');
                content += '<li id="'+lesson_id+'_'+liste_de_phases[i][0]+'">'+liste_de_phases[i][1]+'</li>';
            }
            content += '</ul>';
                            
            content += '<div class="nav_fleches_container">';
            content += '<span id="back_to_programmes"><a href="programmes.php?programmes_visibility=visible">ߛߋ߬ߦߌ߬ ߞߐ߫</a></span>';
            content += '<span id="go_to_lesson">ߥߊ߫ ߢߍ߫</</span>';
            content += '</div>';

            return content;
        }
        function actualiserTitre() {
            var niveau = $('.niveau_courant').text();
      
            rang = (niveau=='߁')?'߭':'߲';
    	    $('.rang').html(rang);
    	
        	if(matiere_index == 1) {
        	    document.querySelector('.phases ul li:nth-child(3)').style.display = 'none';
        	}
        }
	    function stylesDesPhases() {

    	    $.each($('.phases ul li'), function(){

        	    if(phase_active == $(this).html()) {
        	        $(this).addClass('active');
        	    }
        	    if(phases_etudiees.indexOf($(this).html()) !== -1 ) {
        	        $(this).addClass('apprises');
        	    }
        	    if(phases_a_etudier.indexOf($(this).html()) !== -1 && phase_active !== $(this).html()) {
        	        $(this).addClass('a_apprendre');
        	    }
            });
	    }
	}
    function actualiserCochage() {
        voyelles_cochees = $('#voyelles_cochees').html().split('');
        consonnes_cochees = $('#consonnes_cochees').html().split('');
        tedos_coches = $('#tedos_coches').html().split('');
        tons_coches = [''].concat($('#tons_coches').html().split(''));
        nasalisations_cochees = [''].concat($('#nasalisations_cochees').html().split(''));
        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
    }
	function cours() {
    	
    	$('.phases ul li').on('click', function(){
       
            var syllabes_tonifies = tonification();  
            var lesson_questions = lessonQuestions();
            var chiffre = '';
          
    	    var phase_id = $(this).attr('id');
    	    var course_id = liste_de_phases[$(this).index()][0];
    	    var lesson_courante = lessonCourante();
         
            var parametres_btn = $('.parametre_btn_container');
            var parametres = $('#parametres');
            var lesson = $('#lesson');
            var evaluation = $('#evaluation');
            var parametres_html = parametres.html();
         
         
    	    affichageDeCours();
    	    dispenserCours();
    	 

            function affichageDeCours(){
                if(course_id=='apprentissage' || course_id=='exercices' || course_id=='pratiques'){ afficherLesson(); }
                if(course_id=='evaluation'){ afficherEvaluation(); }
            	
            	function afficherLesson(){
                    evaluation.css('display','none');
                	    
            	    $('.course_container').css({'display':'block'});
                    lesson.css('display','block');
                    lesson.css({'transform':'scale(0.75)', 'opacity':0});
                    setTimeout(function() { lesson.css({'transform':'scale(1)'});}, 5);
                    setTimeout(function() { lesson.css({'opacity':'1'});}, 5);
            	}
            	function afficherEvaluation(){
                    lesson.css('display','none');
               
            	    $('.course_container').css({'display':'block'});
                    evaluation.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                    setTimeout(function() { evaluation.css({'transform':'scale(1)'});}, 5);
                    setTimeout(function() { evaluation.css({'opacity':'1'});}, 5);
            	}
            }
    	    function dispenserCours(){
                switch (course_id) {
        	        case 'apprentissage':apprentissage(); break;
                    case 'exercices'    :exercices();     break;
                    case 'pratiques'    :pratiques();     break;
                    case 'evaluation'   :evaluations();   break;  // Cette fonction est dans evaluation.js
        	    }
        	  
            	function apprentissage(){
               
            	    chargerLesson();
                    parametrageDeLesson();
                    masquerLessonBarrProgress();
                    etudierLesson();
            	    stockerLesson();
   
                    function masquerLessonBarrProgress(){
                        $('.lesson_progress_bar').css('display','none');
                    }
                	function chargerLesson(){   
                        $('#lesson_entete').html( lessonEnteteHTML() );
                	    $('#lesson_corps').html( lesson_courante ); 
                     	
                    	function lessonEnteteHTML(){
                    	    
                    	    var lesson_entete_html = "<div class='play_btn_container'><span class='play_label'>ߝߐߟߊ߲</span><span class='play_icon'>"+play_icon+"</span></div>";
                    	    lesson_entete_html += "<div class='stop_btn_container'><span class='stop_label'>ߘߊ߬ߘߋ߬ߟߊ߲ </span> <span class='stop_icon'>"+stop_icon+"</span></div>";
                    	    lesson_entete_html += "<div class='parametre_btn_container'><span class='parametre_label'>ߛߏ߯ߙߏߟߊ߲</span>  <span class='parametre_icon'>"+parametre_icon+"</span></div>";
                            
                            return lesson_entete_html;
                    	}
                	}
                    function parametrageDeLesson(){
                        affichageDeParametres();
                        
                	    $('#parametres td').on('click', function(){ 
                            
                	        actualiserCochage(); 
                	        
                	        lettres = voyelles_cochees.concat(consonnes_cochees,tedos_coches);
                	        syllabes = syllab();
                	        syllabes_tonifies = tonification();
                	        
                	        $('#lesson_corps').html( lessonCourante() ); 
                	        $('.stop_btn_container').css({'display':'none'});
                	        $('.play_btn_container').css({'display':'block'});
                    	        
                    	    lectureSemiAutomatique();
                    	    lecturePersonnalisee();
                    	    arreterLecture(lessonCourante);
                	    });
                	    
                        function affichageDeParametres(){
                            $('.parametre_btn_container').on('click', function(){
                                parametres.css({'display':'block'});
                            });
                        }
                    }
                    function etudierLesson(){
                        
                        changementDesBoutonsMedia();
                	    lectureSemiAutomatique();
                	    lecturePersonnalisee();
                	    arreterLecture(lessonCourante);
                	    
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
                    }
            	    function stockerLesson(){
            	        
                        var table, tr, td, nbr_table, nbr_tr, nbr_td, nbr_table_td = '';
                        var lesson_clicks = [];
                        
                        table = $('.table_parlante'); 
                        tr = $('.table_parlante tr'); 
                        td = $('.table_parlante td');
        
                        nbr_table = table.length;
                        nbr_tr = Math.ceil(td.length/tr.length);
                        nbr_table_td = Math.ceil(td.length/nbr_table);
                        nbr_td = td.length;
                        
                        $.each(td, function(){
                            
                            var table_courante = $(this).parent().parent().parent();
                            var table_index = table.index(table_courante);
                            var tr_index = $(this).parent().index();
                            var element_index = table_index*nbr_table_td + tr_index*nbr_tr + $(this).index();
                            var element_click_counter = 0;
                            var element = $(this).html();
        
                            lesson_clicks[element_index] = [element,element_click_counter];
         
                            $(this).on('click', function(){
        
                                element_click_counter++;
                                var clicked_element = $(this).html();
                                var new_click_value = [clicked_element,element_click_counter];
                                var non_clicked_elements = '';
                                var nbr_clicked_elements = 0;
                       
                                lesson_clicks.splice(element_index,1,new_click_value);
                               
                                non_clicked_elements = nonClickedElementsTable();
                                nbr_clicked_elements = td.length - non_clicked_elements.length;
                                $('#course_fermeture').on('click',function(){
                                    
                                    var table_elements_click_nbr = [];
                                    
                                    for(var i=0;i<lesson_clicks.length;i++) {
                                        table_elements_click_nbr[table_elements_click_nbr.length] = lesson_clicks[i][1];
                                    }
                                   
                                    var nbr_click_min = Math.min.apply(null, table_elements_click_nbr);
                                    var nbr_click_max = Math.max.apply(null, table_elements_click_nbr);
                                    
                                    if(nbr_click_min == 0) {
                                        alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
                                    }
                                    if(nbr_click_min >= 1) {
                                        chargerLessonForm(); 
                                        sendLessonToDB(); 
                                    }
                                });
                               
                                function nonClickedElementsTable(){
                                    var table_elements_non_cliques = [];
        
                                    $.each(lesson_clicks, function(){
                                        if($(this)[1]==0){ table_elements_non_cliques[table_elements_non_cliques.length] = $(this); }
                                    });
                                    
                                    return table_elements_non_cliques;
                                }
                                function chargerLessonForm(){ $('#course_input').val(lesson_clicks.join(';')); }
                                function sendLessonToDB(){
                                    
                                    var course_form = $('#course_form');
                                    course_form.attr('action','actions.php?get_action=archiver_lesson');
                                    $('#submit_course').click();
                                }
                            });   
                        });
            	    }
            	}
            	function exercices() {
            	    
            	    var compteur_de_question = 1;
            	    var quantite_de_question = quantiteDeQuestion();
            	    var question_rang = '߭';
            alert( quantite_de_question );        
            	    chargerExercices();
            	    afficherLessonBarrProgress();
            	    questionReponse();
            	    stockerExercice();
            	   
                    function quantiteDeQuestion(){
                        if(niveau==1){ var nq = parseIntNko(lettres.length); return nq; }
                        if(niveau==2){ var nq = parseIntNko(syllabes.length); return nq; }
                        if(niveau==3){ var nq = parseIntNko(syllabes_tonifies.length); return nq; }
                    }
                	function chargerExercices(){ 
               	    
                        $('#lesson_entete').html( exercicesEnteteHTML() );
                	    $('#lesson_corps').html( lesson_courante ); 
                	    
                    	function exercicesEnteteHTML(){
                    	    var exercices_entete_html = "<div class='play_icon_container' id='exercices_player' style='width:auto'>";
                    	        exercices_entete_html += "<span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>";
                    	        exercices_entete_html += "<span class='qtite_question'>"+quantite_de_question+"</span> : <span class='ordre_question'>"+parseIntNko(compteur_de_question)+question_rang+" </span>";
                    	        exercices_entete_html += "<span class='ecouter_question'> ߟߊߡߍ߲߫</span><span class='play_icon'>"+play_icon+"</span>";
                    	    exercices_entete_html += "</div>";
                    	    exercices_entete_html += "<div class='oreille_icon_container'><span class='reecoute_label'>ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> <span class='oreille_icon'>"+oreille_icon+"</span></div>";
                    
                            return exercices_entete_html;
                    	}
                	}
                    function afficherLessonBarrProgress(){
                        $('.lesson_progress_bar').css('display','block');
                    }
            	    function questionReponse(){
            	        
                	    var i=0;
                	    var question_posee, reponse_montree, point; 
    
                	    question_posee = '';
                	    poserQuestion();
                	    repondreQuestion();
                	    
                	    function poserQuestion(){
                    	    $('#exercices_player').on('click',function(){
                  	        
                    	        compteur_de_question++;
                    	        question_rang = '߲';
                    	        $('.ecouter_question').html(' ߠߊߡߍ߲߫');
                    	        $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
                    	        question_posee = lesson_questions[i];

                    	        $(this).css('display','none');
                    	        $('.oreille_icon_container').css('display','block');
                    	        
                    	        lireQuestion();
                    	        repeteQuestion();

                    	        i++;
                    	        
                    	        function lireQuestion(){
                    	            $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_posee+'.mp3', 'autoplay':'on'});
                    	        }
                    	        function repeteQuestion(){
                    	            $('.oreille_icon_container').on('click', function(){ lireQuestion(); });
                    	        }
                    	    });
                	    }
                	    function repondreQuestion(){
            	            var nbr_de_questions_a_poser = $('.table_muette td').length;
                        	        
                    	    $('.table_muette').on('click', function(e){
                    	        if(question_posee=='')
                    	        {   guiderClient(); }
                    	        else
                    	        {   
                    	            var td = $(e.target);
                        	        reponse_montree = td.html();
            	                    point = (question_posee==reponse_montree)?1:0;
    
                        	        if(question_posee!=reponse_montree){ barrerLaFausseReponse(td); clignotage(question_posee); }
                        	        if(question_posee==reponse_montree){ td.addClass('ombrage'); }
                        	        actualiserLessonProgressBar();
                        	        setTimeout(function(){ td.removeClass('ombrage'); },1000);
                        	        
                        	        question_posee = '';    /* Vider la variable question_posee. */
                        	        
                        	        $('.oreille_icon_container').css('display','none');
                        	        $('.play_icon_container').css('display','block');
                        	        
                                    function actualiserLessonProgressBar(){
                                        var progress_unity = $('.lesson_progress_bar').width()/nbr_de_questions_a_poser;
                                       
                                        if(question_posee!=reponse_montree){ 
                                            $('.lesson_progress_question_bar').css('width','+='+progress_unity+'px');
                                        }else{ 
                                            $('.lesson_progress_question_bar, .lesson_progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                                        }
                                    }
                    	        }
                    	    });
                	    }
            	    }
            	    function stockerExercice(){
            	        
            	        var td = $('.table_muette td');
            	        var exercices_table = [];
            	        var exercice_counter = 0;
            	        var course_form = $('#course_form');
            	        var nbr_max_exercice = '';
            	        
            	        for(var i=0;i<lesson_questions.length;i++){
            	            var q = lesson_questions[i];
            	            var r,p = '';
            	            
            	            exercices_table[exercices_table.length] = [q,r,p];
            	        }
            	        
            	        $.each(td, function(){
            	            $(this).on('click', function(){
            	               
            	                var q = exercices_table[exercice_counter][0];
            	                var r = $(this).html();
            	                var p = '';
            	                var nouvel_exercice = [];
            	                
            	                p = (q==r)?'ߞߎߟߎ߲ߖߋ߫':'ߝߏߦߊ߲߫';     
            	                nouvel_exercice = [q,r,p];
            	               
            	                exercices_table.splice(exercice_counter,1,nouvel_exercice);
            	             
                                $('#course_fermeture').on('click',function(){ chargementDeLessonForm(); sendExerciceToDB(); });
            	                exercice_counter++;
            	                
            	                function chargementDeLessonForm(){
            	                    
            	                    $('#course_input').val(exercices_table.join(';'));
            	                }
            	                function sendExerciceToDB(){
                                    course_form.attr('action','actions.php?get_action=archiver_exercice');
            	                    $('#submit_course').click();
            	                }
            	            });
            	        });
            	    }
                }
                function pratiques() {
                    
            	    var compteur_de_question = 1;
            	    var quantite_de_question = parseIntNko( 20 );
            	    var question_rang = '߭';
                    
                    
            	    chargerPratiques();
            	    stylesPratiquesProgramme();
            	    //afficherLessonBarrProgress();
            	    questionReponse();
            	    //stockerPratiques();
            	    
            	    
            	    function chargerPratiques() {
            	    
                        $('#lesson_entete').html( pratiquesEnteteHTML() );
                	    $('#lesson_corps').html( lesson_courante ); 
                	    
                	    function pratiquesEnteteHTML() {
                	         var pratiques_entete_html = "<div class='play_icon_container' id='pratiques_player' style='width:auto'>";
                    	        pratiques_entete_html += "<span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>";
                    	        pratiques_entete_html += "<span class='qtite_question'>"+quantite_de_question+"</span> : <span class='ordre_question'>"+parseIntNko(compteur_de_question)+question_rang+" </span>";
                    	        pratiques_entete_html += "<span class='ecouter_question'> ߟߊߡߍ߲߫</span><span class='play_icon'>"+play_icon+"</span>";
                    	    pratiques_entete_html += "</div>";
                    	    pratiques_entete_html += "<div class='oreille_icon_container'><span class='reecoute_label'>ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> <span class='oreille_icon'>"+oreille_icon+"</span></div>";
                    
                            return pratiques_entete_html;
                	     }  
            	    }
            	    function stylesPratiquesProgramme() {
            	        $('#pratiques_programme span:nth-child(1)').addClass('actif');
            	    }
            	    function questionReponse() {
                   
                	    var i=0;
                	    var question_posee, reponse_tapee, point; 
    
                	    question_posee = '';
                	    poserQuestion();
                	    repondreQuestion();
                	    
                	    function poserQuestion(){
                    	    $('#pratiques_player').on('click',function(){
                    	  
                    	        var pratiques_syllabes_active_index = $('.actif').index();
                    	        var questions = '';
                    	        
                    	        var mono_syllabes   = monoSyllabesTotal();
                    	        var bi_syllabes     = biSyllabesTotal();
                    	        var tri_syllabes    = triSyllabesTotal();
                    	        var quadri_syllabes = quadriSyllabesTotal();
                    	        
                    	        switch(pratiques_syllabes_active_index) {
                    	            case 0: questions = mix1D(mono_syllabes);   break;
                    	            case 1: questions = mix1D(bi_syllabes);     break;
                    	            case 2: questions = mix1D(tri_syllabes);    break;
                    	            case 3: questions = mix1D(quadri_syllabes); break;
                    	        }
                    	     
                    	        compteur_de_question++;
                    	        question_rang = '߲';
                    	        $('.ecouter_question').html(' ߠߊߡߍ߲߫');
                    	        $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
                    	        
                    	        question_posee = questions[i];
                    
                    	        $(this).css('display','none');
                    	        $('.oreille_icon_container').css('display','block');
                    	        
                    	        lireQuestion();
                    	        repeteQuestion();

                    	        i++;
                    	        
                    	        function lireQuestion(){
                    	            $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_posee+'.mp3', 'autoplay':'on'});
                    	        }
                    	        function repeteQuestion(){
                    	            $('.oreille_icon_container').on('click', function(){ lireQuestion(); });
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
                    	    });
                	    }
                	    function repondreQuestion(){
            	            var nbr_de_questions_a_poser = 20;
                        	        
                    	    $('#pratiques_input').on('click', function(){
                    	       
                        	        reponse_tapee = $(this).val();
            	                    //point = (question_posee == reponse_tapee)?1:0;
            	                    imageMonoSyllabes();
            	                    function imageMonoSyllabes() {
            	                        
            	                        chargerImageMonoSyllabes();
            	                        afficherImageMonoSyllabes();
            	                        
            	                        function chargerImageMonoSyllabes() {
            	                            $('#pratiques_image').attr('src','http://localhost:8080/kouroukan/image/mono_syllabes/'+reponse_tapee+'.jpg');
            	                        }
            	                        function afficherImageMonoSyllabes() {
            	                           $('#pratiques_image_container').css({'width':0, 'height':0});
            	                            
            	                            setTimeout(function() {
            	                                $('#pratiques_image_container').animate({'width':'100%', 'height':'100%'},300);
            	                            },50);
            	                        }
            	                    }
    
                        	        if(question_posee != reponse_tapee){ barrerLaFausseReponse(td); clignotage(question_posee); }
                        	        if(question_posee == reponse_tapee){ td.addClass('ombrage'); }
                        	        //actualiserLessonProgressBar();
                        	        setTimeout(function(){ td.removeClass('ombrage'); },1000);
                        	        
                        	        question_posee = '';    /* Vider la variable question_posee. */
                        	        
                        	        $('.oreille_icon_container').css('display','none');
                        	        $('.play_icon_container').css('display','block');
                        	        
                                    function actualiserLessonProgressBar(){
                                        var progress_unity = $('.lesson_progress_bar').width()/nbr_de_questions_a_poser;
                                       
                                        if(question_posee!=reponse_tapee){ 
                                            $('.lesson_progress_question_bar').css('width','+='+progress_unity+'px');
                                        }else{ 
                                            $('.lesson_progress_question_bar, .lesson_progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                                        }
                                    }
                    	        
                    	    });
                	    }
            	    }
                }
    	    }
    	 coursEnteteHTML();   
    	    function coursEnteteHTML() {
    	        var ceh = '';
    	       
    	        if(course_id=='apprentissage'){ ceh = apprentissageEnteteHTML(); }
    	        if(course_id=='exercices'){ ceh = exercicesEnteteHTML(); }
    	        if(course_id=='pratiques'){ ceh = pratiquesEnteteHTML(); }
    	  alert( quantite_de_question );       
    	        return ceh;
    	        
    	        
    	        function apprentissageEnteteHTML() {
    	            
                    var apprentissage_entete_html = "<div class='play_btn_container'><span class='play_label'>ߝߐߟߊ߲</span><span class='play_icon'>"+play_icon+"</span></div>";
                    apprentissage_entete_html += "<div class='stop_btn_container'><span class='stop_label'>ߘߊ߬ߘߋ߬ߟߊ߲ </span> <span class='stop_icon'>"+stop_icon+"</span></div>";
                    apprentissage_entete_html += "<div class='parametre_btn_container'><span class='parametre_label'>ߛߏ߯ߙߏߟߊ߲</span>  <span class='parametre_icon'>"+parametre_icon+"</span></div>";
                            
                    return apprentissage_entete_html;
    	        }
    	        function exercicesEnteteHTML() {
    	            
                    var exercices_entete_html = "<div class='play_icon_container' id='exercices_player' style='width:auto'>";
                        exercices_entete_html += "<span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>";
                    	exercices_entete_html += "<span class='qtite_question'>"+quantite_de_question+"</span> : <span class='ordre_question'>"+parseIntNko(compteur_de_question)+question_rang+" </span>";
                    	exercices_entete_html += "<span class='ecouter_question'> ߟߊߡߍ߲߫</span><span class='play_icon'>"+play_icon+"</span>";
                    exercices_entete_html += "</div>";
                    exercices_entete_html += "<div class='oreille_icon_container'><span class='reecoute_label'>ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> <span class='oreille_icon'>"+oreille_icon+"</span></div>";
                    
                    return exercices_entete_html;
    	        }
    	        function pratiquesEnteteHTML() {
    	            
                    var pratiques_entete_html = "<div class='play_icon_container' id='pratiques_player' style='width:auto'>";
                    	pratiques_entete_html += "<span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>";
                    	pratiques_entete_html += "<span class='qtite_question'>"+quantite_de_question+"</span> : <span class='ordre_question'>"+parseIntNko(compteur_de_question)+question_rang+" </span>";
                        pratiques_entete_html += "<span class='ecouter_question'> ߟߊߡߍ߲߫</span><span class='play_icon'>"+play_icon+"</span>";
                    pratiques_entete_html += "</div>";
                    pratiques_entete_html += "<div class='oreille_icon_container'><span class='reecoute_label'>ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> <span class='oreille_icon'>"+oreille_icon+"</span></div>";
                    
                    return pratiques_entete_html;
    	        }
    	        
    	    }
            function lessonCourante() {
         
                if(phase_id=='alphabet_apprentissage'){ lesson_courante = alphabetApprentissageHTML(); } //Cette fonction provient de alphabet.js 
                if(phase_id=='syllabes_apprentissage'){ lesson_courante = syllabesApprentissageHTML(); } //Cette fonction provient de syllabes.js
                if(phase_id=='tons_apprentissage'){ lesson_courante = tonsApprentissageHTML(); } //Cette fonction provient de tons.js
                if(phase_id=='chiffres_apprentissage'){ lesson_courante = chiffresApprentissageHTML(); } //Cette fonction provient de chiffres.js
                
                if(phase_id=='alphabet_exercices'){ lesson_courante = alphabetExercicesHTML(); } //Cette fonction provient de alphabet.js
                if(phase_id=='syllabes_exercices'){ lesson_courante = syllabesExercicesHTML(); } //Cette fonction provient de syllabes.js
                if(phase_id=='tons_exercices'){ lesson_courante = tonsExercicesHTML(); } //Cette fonction provient de tons.js
                if(phase_id=='chiffres_exercices'){ lesson_courante = chiffresExercicesHTML(); } //Cette fonction provient de chiffres.js
                
                if(phase_id=='syllabes_pratiques'){ lesson_courante = syllabesPratiquesHTML(); } //Cette fonction provient de syllabes.js
                if(phase_id=='tons_pratiques'){ lesson_courante = tonsPratiquesHTML(); } //Cette fonction provient de tons.js
                if(phase_id=='chiffres_pratiques'){ lesson_courante = chiffresPratiquesHTML(); } //Cette fonction provient de chiffres.js
             
                return lesson_courante;
                
            }
            function lessonQuestions() {
                var lq = '';
                if(niveau==1){ lq = mix1D(lettres); }
                if(niveau==2){ lq = mix1D(syllabes); }
                if(niveau==3){ lq = mix1D(syllabes_tonifies); }
                if(niveau==4){ lq = mix1D(chiffre); }
                
                return lq;
            }
      	});
	}
	function naviguerSurLesson() {
    	$('#go_to_lesson').on('click', function() {
	        $('.phases ul li').click();
	    });
	}
    function convertirResuneBrutDesEtudesEnObjet() {
        var resume = resume_brut_des_etudes.split('/');
                    
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

});