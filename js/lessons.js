$('document').ready(function() {

    var matieres_etudiees = sessionStorage.getItem('matieres_etudiees');     
    var matiere_id = $('#matiere_id_container').html();
    var matiere_index = parseInt($('#matiere_index_container').html());
    var matiere_nom = $('#matiere_nom_container').html();
    var derniere_matiere = sessionStorage.getItem('derniere_matiere');     
    
    var niveaux = sessionStorage.getItem('niveaux');     
    var niveaux_distincts = sessionStorage.getItem('niveaux_distincts');     
    var niveau_max = parseInt(sessionStorage.getItem('niveau_max'));
    var niveau = parseInt($('#niveau_container').html());
    
    var phases_collection = phasesCollection();
    var phases_etudiees = sessionStorage.getItem('phases_etudiees').split(','); 
    var phase_nbr = sessionStorage.getItem('dernieres_phases').split(',').length; 
    var dernieres_phases = sessionStorage.getItem('dernieres_phases').split(',');     
    var derniere_phase = sessionStorage.getItem('derniere_phase');     
    
    var resume_brut_des_etudes = $('#resume_brut_des_etudes_container').html();
    var voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees;
      
    var rang = '';
	var etapes_passees = '';
	var etape_actuelle = [];
	var etapes_a_faire = [];
	var etape_max = [];
        
    var niveaux_passes = [];
    var niveau_en_coure = '';
    var phase_active = '';
    var phases_a_etudier = [];
    var noms_des_phases = '';
    
    var resume_des_etudes = [];
        
	var phases_actuelles, phases_actuelles_etudiees, phase_precedante;
	var index_phase_actuelle, index_phase_precedante, index_phase_active;
	var avancer_btn = '';
	
//alert( sessionStorage.getItem('matiere') ); 
//alert( sessionStorage.getItem('phase') ); 
	

  /*--------------------------------------------------------------------
    
    1)- La situation des études est faite par récupération et traitement des données reçues sur l'apprenant.
	2)- La liste des phases est établie en fonction du niveau d'étude de l'apprenant (selon les phases étudiées ou pas)
	3)- Le paramétrage conséquent est défini pour la leçon future.
	4)- Les phases s'affichent et
	5)- On peut surfer
    
    --------------------------------------------------------------------*/
	    elementsActifs();

   /*1*/resume_des_etudes = convertirResuneBrutDesEtudesEnObjet();
        noms_des_phases   = nomsDesPhases();
	    phases_etudiees   = sessionStorage.getItem('phases_etudiees');
	    phase_active      = phaseActive(); 
	    phases_a_etudier  = phasesAEtudier();
	    
   /*2*/phases();
        softDisplay();
   /*4*/affichageDesPhases();
   /*3*/parametrageDeLesson();
	    actualiserCochage();
   /*5*/naviguerSurLesson();

	
  /*--------------------------------------------------------------------*/
	function elementsActifs() {
	    sessionStorage.setItem('niveau_actif',   document.getElementById('matiere_index_container' ).innerHTML);
        sessionStorage.setItem('matiere_active', document.getElementById('matiere_nom_container').innerHTML);
        sessionStorage.setItem('niveau_max',     document.getElementById('niveau_max_container' ).innerHTML);
	}
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
         
          // Liste des phases
            var content = '<ul class="liste_affichage_cascade">';
            if(niveau != 1) {
                for(var i=0;i<liste_de_phases.length;i++){
                    var lesson_id = $('.lesson_title').attr('id');
                    content += '<li id="'+lesson_id+'_'+liste_de_phases[i][0]+'">'+liste_de_phases[i][1]+'</li>';
                }
            }
            if(niveau == 1) {
                for(var i=0;i<2;i++){
                    var lesson_id = $('.lesson_title').attr('id');
                    content += '<li id="'+lesson_id+'_'+liste_de_phases[i][0]+'">'+liste_de_phases[i][1]+'</li>';
                }
                for(var j=3;j<liste_de_phases.length;j++){
                    var lesson_id = $('.lesson_title').attr('id');
                    content += '<li id="'+lesson_id+'_'+liste_de_phases[j][0]+'">'+liste_de_phases[j][1]+'</li>';
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
        function actualiserTitre() {
            var niveau = $('.niveau_courant').text();
      
            rang = (niveau=='߁')?'߭':'߲';
    	    $('.rang').html(rang);
    	
        	if(matiere_index == 1) {
        	    document.querySelector('.phases ul li:nth-child(3)').style.display = 'none';
        	}
        }
	    function stylesDesPhases() {

    	    var niveaux = sessionStorage.getItem('niveaux');  	    
    	    var niveaux_distincts = sessionStorage.getItem('niveaux_distincts').split(',');  	    
 
    	    
    	    $.each($('.phases ul li'), function() {
    	        
        	    var phase_index = phases_collection.indexOf($(this).html());
    	        
    	        if(niveau_max === 0) {
        
                    if(dernieres_phases != '') {
                	    if(phase_index <  phase_nbr) $(this).addClass('apprises');
                	    if(phase_index == phase_nbr) $(this).addClass('active');
                	    if(phase_index >  phase_nbr) $(this).addClass('a_apprendre');
                    }
                    if(dernieres_phases == '') {
                	    if(phase_index == 0) $(this).addClass('active');
                	    if(phase_index >  0) $(this).addClass('a_apprendre');
                    }
    	        }    	        
    	        if(niveau_max > 0) {
        	        if(niveau == niveau_max+1) {
                	    
                	    if(phase_index <  phase_nbr) $(this).addClass('apprises');
                	    if(phase_index == phase_nbr) $(this).addClass('active');
                	    if(phase_index >  phase_nbr) $(this).addClass('a_apprendre');
    
        	        }    	        
        	        if(niveau < niveau_max+1) {
                	    $(this).addClass('apprises');
        	        }
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
	function affichageDesPhases() {
	    affichageListeEnCascade();
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
	function naviguerSurLesson() {
    	
    	$('.phases ul li').on('click', function(){

            var syllabes_tonifies = tonification();  
            var questions_a_poser = questions();
            var chiffre = '';
          
    	    var phase_id = $(this).attr('id');
    	    var course_id = liste_de_phases[$(this).index()][0];
    	    var lesson_courante = lessonCourante();
         
            var parametres_btn = $('.parametre_btn_container');
            var parametres = $('#parametres');
            
            var apprentissage = $('#apprentissage');
            var exercice = $('#exercice');
            var pratiques = $('#pratique');
            var evaluation = $('#evaluation');
            
            var dialogue_btn_html = $('#dialogue_btn').html();
            var parametres_html = parametres.html();
          
          /*--------------------------------------------------------------------*/    
    	    
    	    phaseActiveName();
    	    dimensionnementDeCourseBody();
    	    affichageDeCours();
    	    dispenserCours();
         
          /*--------------------------------------------------------------------*/    
            
            function phaseActiveName() {
                sessionStorage.setItem('phase', course_id); 
            }
            function dimensionnementDeCourseBody() {
                
                var course_height = $('.course').height();
    	        var course_head_height = $('.course_head').height();
    	        var pratique_head_height = $('#pratique_head').height();
    	        var progress_bar_height = $('.progress_bar').height();
    	        var clavier_container_height = $('.clavier_container').height();
    	        var course_body_height = '';
    	    

    	        if(course_id == 'apprentissage' || course_id == 'exercice') {
    	            course_body_height = course_height - (course_head_height+progress_bar_height+6);
    	        }
    	        if(course_id == 'pratique'){
    	            course_body_height = course_height - (course_head_height+pratique_head_height+progress_bar_height+clavier_container_height+6);
    	        }
    	        if(course_id == 'evaluation'){
    	            course_body_height = course_height - (course_head_height+progress_bar_height+clavier_container_height+6);
    	        }
    	        
    	        $('.course_body').css('height', course_body_height-26+'px');
            }
    	    function coursEnteteHTML() {
    	        var ceh = '';
    	       
    	        if(course_id=='apprentissage'){ ceh = apprentissageEnteteHTML(); }
    	        if(course_id=='exercice'){ ceh = exerciceEnteteHTML(); }
    	        if(course_id=='pratique'){ ceh = pratiqueEnteteHTML(); }
    	         
    	        return ceh;
    	        
    	        
    	        function apprentissageEnteteHTML() {
    	            
                    var apprentissage_entete_html = "<div class='play_btn_container'><span class='play_label'>ߝߐߟߊ߲</span><span class='play_icon'>"+play_icon+"</span></div>";
                    apprentissage_entete_html += "<div class='stop_btn_container'><span class='stop_label'>ߘߊ߬ߘߋ߬ߟߊ߲ </span> <span class='stop_icon'>"+stop_icon+"</span></div>";
                    apprentissage_entete_html += "<div class='parametre_btn_container'><span class='parametre_label'>ߛߏ߯ߙߏߟߊ߲</span>  <span class='parametre_icon'>"+parametre_icon+"</span></div>";
                            
                    return apprentissage_entete_html;
    	        }
    	        function exerciceEnteteHTML() {
    	            
                    var exercice_entete_html = "<div class='play_icon_container' id='exercices_player' style='width:auto'>";
                        exercice_entete_html += "<span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>";
                    	exercice_entete_html += "<span class='qtite_question'>"+quantite_de_question+"</span> : <span class='ordre_question'>"+parseIntNko(compteur_de_question)+question_rang+" </span>";
                    	exercice_entete_html += "<span class='ecouter_question'> ߟߊߡߍ߲߫</span><span class='play_icon'>"+play_icon+"</span>";
                    exercice_entete_html += "</div>";
                    exercice_entete_html += "<div class='oreille_icon_container'><span class='reecoute_label'>ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> <span class='oreille_icon'>"+oreille_icon+"</span></div>";
                    
                    return exercice_entete_html;
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
              
                if(phase_id=='syllabes_pratique'     ) { lesson_courante = syllabesPratiquesHTML();     } //Cette fonction provient de syllabes.js
                if(phase_id=='tons_pratique'         ) { lesson_courante = tonsPratiquesHTML();         } //Cette fonction provient de tons.js
                if(phase_id=='chiffres_pratique'     ) { lesson_courante = chiffresPratiquesHTML();     } //Cette fonction provient de chiffres.js
             
                return lesson_courante;
                
            }
            function affichageDeCours(){
            	$('.course_container').css({'display':'block'});
                $('.course').css('display','none');
                
                if(course_id=='apprentissage' ) { afficherApprentissage();     }
                if(course_id=='exercice'      ) { afficherExercice();   }
                if(course_id=='pratique'      ) { afficherPratiques();  }
                if(course_id=='evaluation'    ) { afficherEvaluation(); }
            	
            	function afficherApprentissage(){
                    apprentissage.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                    setTimeout(function() { apprentissage.css({'transform':'scale(1)'});}, 5);
                    setTimeout(function() { apprentissage.css({'opacity':'1'});}, 5);
            	}
            	function afficherExercice(){
                    exercice.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                    setTimeout(function() { exercice.css({'transform':'scale(1)'});}, 5);
                    setTimeout(function() { exercice.css({'opacity':'1'});}, 5);
            	}
            	function afficherPratiques(){
                    pratiques.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                    setTimeout(function() { pratiques.css({'transform':'scale(1)'});}, 5);
                    setTimeout(function() { pratiques.css({'opacity':'1'});}, 5);
            	}
            	function afficherEvaluation(){
                    evaluation.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
                    setTimeout(function() { evaluation.css({'transform':'scale(1)'});}, 5);
                    setTimeout(function() { evaluation.css({'opacity':'1'});}, 5);
            	}
            }
            function questions() {
                var lq = '';
                if(niveau==1){ lq = mix1D(lettres); }
                if(niveau==2){ lq = mix1D(syllabes); }
                if(niveau==3){ lq = mix1D(syllabes_tonifies); }
                if(niveau==4){ lq = mix1D(chiffre); }
                
                return lq;
            }
    	    function dispenserCours(){
                
                switch (course_id) {
        	        case 'apprentissage':apprentissage(); break;
                    case 'exercice'    :exercice();     break;
                    case 'pratique'    :pratique();     break;
                    case 'evaluation'   :evaluations();   break;  // Cette fonction est dans evaluation.js
        	    }
        	  
            	function apprentissage(){
               
            	    chargerApprentissage();
                    parametrageDeApprentissage();
                    etudierLesson();
            	    stockerLesson();
   
                	function chargerApprentissage(){   
                        $('#apprentissage_entete').html( apprentissageEnteteHTML() );
                	    $('#apprentissage_corps').html( lesson_courante ); 
                     	
                    	function apprentissageEnteteHTML(){
                    	    
                    	    var entete_html = "<div class='play_btn_container'><span class='play_label'>ߝߐߟߊ߲</span><span class='play_icon'>"+play_icon+"</span></div>";
                    	    entete_html += "<div class='stop_btn_container'><span class='stop_label'>ߘߊ߬ߘߋ߬ߟߊ߲ </span> <span class='stop_icon'>"+stop_icon+"</span></div>";
                    	    entete_html += "<div class='parametre_btn_container'><span class='parametre_label'>ߛߏ߯ߙߏߟߊ߲</span>  <span class='parametre_icon'>"+parametre_icon+"</span></div>";
                            
                            return entete_html;
                    	}
                	}
                    function parametrageDeApprentissage(){
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
            	        
                        var table, tr, td, nbr_table, nbr_tr, nbr_td, nbr_table_td;
                        var clicks_memo = [];
                        
                        table = $('.table_parlante'); 
                        tr = $('.table_parlante tr'); 
                        td = $('.table_parlante td');
        
                        nbr_table = table.length;
                        nbr_tr = Math.ceil(td.length/tr.length);
                        nbr_table_td = Math.ceil(td.length/nbr_table);
                        nbr_td = td.length;
                        
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
                            
                            var table_courante = $(this).parent().parent().parent();
                            var table_index = table.index(table_courante);
                            var tr_index = $(this).parent().index();
                            var element_index = table_index*nbr_table_td + tr_index*nbr_tr + $(this).index();
                            var element_click_counter = 0;
                            var element = $(this).html();
        
                            
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
                                var table_elements_click_nbr = [];
                       
                              /*Actualisation de mémoire d'enregistrement
                                C'est à dire qu'après chaque click,les anciennes valeurs de chaque enregistrement elementaire sont remplacés par les nouvelles valeurs.                 */
                                
                                clicks_memo.splice(element_index,1,new_click_value);
                                non_clicked_elements = nonClickedElementsTable();
                                nbr_clicked_elements = td.length - non_clicked_elements.length;
                                
                                
                                $('#course_fermeture').on('click',function(){
                                    
                                    
                                  /*
                                  A la fermeture, on s'assure que chaque élément est clické au moins un nombre de fois défini.
                                  - Si oui le mémoire de click est envoyé au serveur;
                                  - Sinon, un message s'affiche et le mémoire n'est pas envoyé.
                                  */
                    
                                    for(var i=0;i<clicks_memo.length;i++) {
                                        table_elements_click_nbr[table_elements_click_nbr.length] = clicks_memo[i][1];
                                    }
                                    
                                    
                                    var nbr_click_min = Math.min.apply(null, table_elements_click_nbr);
                                    var nbr_click_max = Math.max.apply(null, table_elements_click_nbr);
                                    
                                    var id = parseInt(sessionStorage.getItem('user_id'));
                                    var matiere_active = sessionStorage.getItem('matiere_active');
                                    var niveau_actif = parseInt(sessionStorage.getItem('niveau_actif'));
                                    var phase_active = sessionStorage.getItem('phase');
                                    var lesson_active = clicks_memo;

                            alert( params );        
                                    if(nbr_click_min == 0) {
                                        alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
                                    }
                                    if(nbr_click_min >= 1) {

                                        const params = new URLSearchParams({
                                            id     :id,
                                            matiere:matiere_active,
                                            niveau :niveau_actif,
                                            phase  :phase_active,
                                            lesson :lesson_active,
                                            note   :18
                                        });
                                        
                                        fetch("http://localhost:8080/kouroukan/pages/actions.php", {
                                            method: 'POST',
                                            body: params 
                                        })
                                        .then(response => response.json())
                                        .then(data => alert(data))
                                        .catch(error => alert(error));
                                    
                                        
                                      //  chargerLessonForm(); 
                                       // sendLessonToDB(); 
                                    }
                                });
                               
                                function nonClickedElementsTable(){
                                    var table_elements_non_cliques = [];
        
                                    $.each(clicks_memo, function(){
                                        if($(this)[1]==0){ table_elements_non_cliques[table_elements_non_cliques.length] = $(this); }
                                    });
                                    
                                    return table_elements_non_cliques;
                                }
                                function chargerLessonForm(){ $('#course_input').val(clicks_memo.join(';')); }
                                function sendLessonToDB(){
                                    
                       
                                    let params = new URLSearchParams({
                                        id: user.prenom,
                                        matiere: "matiere"
                                    });
                                    
                                    var course_form = $('#course_form');
                                    course_form.attr('action','actions.php?get_action=archiver_lesson');
                                    $('#submit_course').click();
                                }
                            });   
                        });
            	    }
            	}
            	function exercice() {
            	    
            	    var compteur_de_question = 1;
            	    var quantite_de_question = quantiteDeQuestion();
            	    var question_rang = '߭';
                
            	    chargerExercice();
            	    afficherLessonBarrProgress();
            	    questionReponse();
            	    stockerExercice();
           	   
                    function quantiteDeQuestion(){
                        if(niveau==1){ var nq = parseIntNko(lettres.length); return nq; }
                        if(niveau==2){ var nq = parseIntNko(syllabes.length); return nq; }
                        if(niveau==3){ var nq = parseIntNko(syllabes_tonifies.length); return nq; }
                    }
                	function chargerExercice(){ 
                        
                        $('#exercice_entete').html( exerciceEnteteHTML() );
                	    $('#exercice_corps').html( lesson_courante ); 
                	    
                    	function exerciceEnteteHTML(){
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
                	    poserExercicesQuestion();
                	    repondreQuestion();
                	    
                	    function poserExercicesQuestion(){
                    	    $('#exercices_player').on('click',function(){
                  	        
                    	        compteur_de_question++;
                    	        question_rang = '߲';
                    	        $('.ecouter_question').html(' ߠߊߡߍ߲߫');
                    	        $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
                    	        question_posee = questions_a_poser[i];

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
            	        
            	        for(var i=0;i<questions_a_poser.length;i++){
            	            var q = questions_a_poser[i];
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
                function pratique() {
                        
                    var option_index = 0;
            	    var option_de_syllabe = '';
            	    var compteur_de_question = 1;
                    var compteur_de_caractere = 0;
                    var bulle_index = -1;
                    var s_0 = [], s_1 = [], s_2 = [], s_3 = [];
            	    var total_question = 4;
            	    var quantite_de_question = parseIntNko(total_question);
            	    var question_rang = '߭';
            	    
            	    var memoire_pratique = [];
            	    var memoire_pratiques = [];

                    var mono_syllabes   = monoSyllabesTotal();
                    var bi_syllabes     = biSyllabesTotal();
                    var tri_syllabes    = triSyllabesTotal();
                    var quadri_syllabes = quadriSyllabesTotal();                   
                    
                    var questions_pratiques=[], question_pratique='', reponse_tapee=[], point='';
                    var table = $('#pratiques_reponse_container table tbody').html();
                    
                
                
                  /*--------------------------------------------------------------------*/
            	    
            	    affichageParDefautDesBoutonsDEntete();
            	    $('#pratique_head span').on('click', function() {

            	        option_index = $(this).index();
            	        
            	        $(this).addClass('actif');
            	        $(this).siblings().removeClass('actif');
            	        compteur_de_question = 1;
            	        option_de_syllabe = optionDeSyllabe();
            	        table = '';
             
                        questions_pratiques = questionsPratiques();
            	        
            	        dimensionnementParDefautDePratiquesCorps()                   
            	        affichageParDefautDesBoutonsDEntete();
                       // animerCourseBtn();
                        afficherProgressBar();
                        initialiserProgressBarr();
            	    
                    	function animerCourseBtn() {
                    	    var course_head_btn = $('.course_head .btn span:first-child'); 
                    	    
                    	    course_head_btn.on('click', function(){
                    	        alert( $(this).html() ); 
                    	    });
                    	}
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
            	    });
                	poserQuestionPratique();
                	repondreQuestionPratique();
                	correctionPratique();
                	
                	
                	
                  /*--------------------------------------------------------------------*/

            	    function initialiserPratiques() {
            	        
            	        $('#pratique_head span').removeClass('actif');
            	        dimensionnementParDefautDePratiquesCorps()                   
            	        affichageParDefautDesBoutonsDEntete();
                        
                        afficherProgressBar();
                        initialiserProgressBarr();
            	    }
                    function dimensionnementParDefautDePratiquesCorps() {
                        $('#pratique_body').css('height','45vh');
                        $('#pratiques_demo_container').css('height','168px');
                        $('#pratiques_reponse_container').css('height','84px');
                        $('#pratiques_reponse_container #table_1').empty();
                        $('#message_de_fin_container').css('display','none');
    	                                        
    	                $('#pratiques_images_container img').attr('src','#');
    	                afficherClavierEtConsoles();
                    }
            	    function dimensionnementDePratiquesReponseContainer() {
            	        
            	        var pratique_body_height = $('#pratique_body').height();
            	        var pratiques_demo_container_height = $('#pratiques_demo_container').height();
            	        var pratiques_reponse_container_height = pratique_body_height - pratiques_demo_container_height;
            	        
            	        $('#pratiques_reponse_container').css('height', pratiques_reponse_container_height-10+'px');
            	    }
            	    function redimensionnementDePratiquesReponseContainer() {
            	        
            	        var pratique_body_height = $('#pratique_body').height();
            	        var pratiques_demo_container_height = $('#pratiques_demo_container').height();
        	            var message_de_fin_container_height = $('#message_de_fin_container').height();
            	        var pratiques_reponse_container_height = pratique_body_height - pratiques_demo_container_height - message_de_fin_container_height;
            	        
            	        $('#pratiques_reponse_container').css('height', pratiques_reponse_container_height-10+'px');
            	    }
            	    function reredimensionnementDePratiquesReponseContainer() {
            	        
            	        var pratique_body_height = $('#pratique_body').height();
            	        var pratiques_images_container_height = $('#pratiques_images_container').height();
        	            var message_de_fin_container_height = $('#message_de_fin').height();
            	        var pratiques_reponse_container_height = pratique_body_height - pratiques_images_container_height;
            	        
            	        $('#pratiques_reponse_container').css('height', pratiques_reponse_container_height-10+'px');
            	       // $('#table_1_cadre').css('height', pratiques_reponse_container_height-24+'px');
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

                	    $('.question_ordre').html(parseIntNko(1)+'߭');
                	    $('.question_action').html('ߟߊߡߍ߲߫');
                	                
                	    $('.question_btn').css('display','none');
                	    $('.repetition_btn').css('display','block');
                	    $('.correction_btn').css('display','none');
                    }
                	    
                    function questionsPratiques() {
                        var questions_pratiques = '';
                        	            
                        switch(option_index) {
                            case 0: questions_pratiques = mix1D(mono_syllabes);   break;
                            case 1: questions_pratiques = mix1D(bi_syllabes);     break;
                            case 2: questions_pratiques = mix1D(tri_syllabes);    break;
                            case 3: questions_pratiques = mix1D(quadri_syllabes); break;
                        }
                            
                        return questions_pratiques;
                    }
            	    function poserQuestionPratique() {
                	    $('.question_btn').on('click',function(){
        
                	        pratiqueGuide();
                	        question_pratique = questions_pratiques[compteur_de_question-1];
                	        lireQuestion();
                	        actualiserLesBoutonsDEntete();
                	        repeteQuestion();
                	       

                	        function pratiqueGuide() {
                	            
                	            var pratique_guide_html = pratiqueGuideHTML();
                	          
                	            $('#cumule_des_caracteres').html(questions_pratiques[compteur_de_question-1]);
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
                	            $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_pratique+'.mp3', 'autoplay':'on'});
                	        }
                	        function repeteQuestion(){
                	            $('.repetition_btn').on('click', function(){ $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_pratique+'.mp3', 'autoplay':'on'}); });
                	        }
          
                	    });
            	    }
            	    function decomposerEnSyllabes() {
            	        
            	        var character = question_pratique.split('');
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
            	    function repondreQuestionPratique(){
            
                	    $('.clavier_container td').on('click', function(){
                	       

                            if(question_pratique=='')
                            {   
                                guiderClient(); 
                            }
                            else
                            {
                                var caractere = $(this).html();
                                
                                reponse_tapee[reponse_tapee.length] = caractere;
                                chargementDesBulles();
                                bullesStyles();
                                $('#cumule_des_caracteres').html(reponse_tapee);
                                afficherCorrectionButton();
                                $('#table_2 td:last-child').html(reponse_tapee);
                                
                                compteur_de_caractere++;
                                
                                function afficherCorrectionButton() {
            	                    $('.repetition_btn').css('display','none');
            	                    $('.correction_btn').css('display','block');
            	                    $('.question_btn').css('display','none');
                                }
                                function chargementDesBulles() {
                                    
                                    if($.inArray(caractere,caracteres[1]) != -1) {
                                        bulle_index++;
                                    }
                                    
                                    if(bulle_index < 1) {
                                        s_0[s_0.length] = reponse_tapee[reponse_tapee.length-1];
                                        $('#span_0').html(s_0);
                                    }
                                    if(bulle_index == 1) {
                                        s_1[s_1.length] = reponse_tapee[reponse_tapee.length-1];
                                        $('#span_1').html(s_1);
                                    }
                                    if(bulle_index == 2) {
                                        s_2[s_2.length] = reponse_tapee[reponse_tapee.length-1];
                                        $('#span_2').html(s_2);
                                    }
                                    if(bulle_index == 3) {
                                        s_3[s_3.length] = reponse_tapee[reponse_tapee.length-1];
                                        $('#span_3').html(s_3);
                                    }
                                }
                                function bullesStyles() {
                                    $('.bulle:nth('+bulle_index+')').prevAll('.bulle').css({'background-color':'white', 'box-shadow':'0 0 8px #ccc', 'transform':'scale(1)'});
                                    $('.bulle:nth('+bulle_index+')').css({'background-color':'yellow', 'box-shadow':'0 0 8px yellow', 'transform':'scale(1.125)'});
                                }
                            }                    	       
        	            }); 
            	    }
                	function correctionPratique() {
            	        var total_point = 0;
            	       
            	        $('.correction_btn').on('click',  function() {
            	          
            	            reponse_tapee = reponse_tapee.join('');
            	            point = (question_pratique == reponse_tapee)?1:0;
                    	    total_point = total_point + point;
                    	    memoire_pratique[memoire_pratique.length] = [question_pratique, reponse_tapee, point];

                            afficherQuestionBouton();
                            chargerTableDeReponses();
                            stylesDeTableDeReponses();
                            afficherImage();
                            actualiserPratiquesProgressBar();
                            
                            effacerQuestion();
                            effacerReponse();
                            effacerLesBulles();
                            initialiserCompteurDeCaractere();
                            
                            finDePratique();
                            revisionDePratique();
                            
                            
                            
                            function chargerTableDeReponses() {
                                table += "<tr>\n <td>"+question_pratique+"</td>\n<td>"+reponse_tapee+"</td>\n<td>"+parseIntNko(point)+"</td>\n </tr>\n\n";
                                $('#pratiques_reponse_container #table_1').html(table);
                            }
                            function rechargerTableDeReponses() {
                                table += "<tr>\n <td></td>\n<td></td>\n<td></td>\n </tr>\n\n";
                                $('#pratiques_reponse_container #table_1').html(table);
                            }
                            function stylesDeTableDeReponses() {
                                defilementDeTableReponseVersLeBas();
                                $('#table_1 tr:last-child').addClass('pratique_tr_actif'); 
                                $('#table_1 tr:last-child').siblings().removeClass('pratique_tr_actif'); 
                            
                                function defilementDeTableReponseVersLeBas() {
                                    $('#table_1_cadre').animate({ scrollTop:$('#table_1_cadre')[0].scrollHeight }, 1000);
                                }	   
                            }
                            function afficherImage() {

                        	    var image_name = $('.pratique_tr_actif').children('td:nth(1)').html(); 
                                var image_src = imageSource();
                                
            	                $('#pratiques_image').attr('src', image_src);
                    	       
                    	        if(question_pratique == reponse_tapee) {
                    	            $('#pratiques_image').css('opacity',1);
                    	            $('#croix').css('display','none');
                    	        }
                    	        if(question_pratique !== reponse_tapee) {
                    	            $('#pratiques_image').css('opacity','0.15');
                    	            $('#croix').css('display','flex');
                    	        }
                    	        
                    	        setTimeout(function(){ $('#pratique_guide').animate({'top':'-100%'},400); }, 200);
                              	
                                function imageSource() {
                                    var image_src = '';
                                	    
                                	if(option_index == 0) {
                                	    image_src = 'http://localhost:8080/kouroukan/image/mono_syllabes/'+image_name+'.jpg';
                                	}
                                	if(option_index == 1) {
                                	    image_src = 'http://localhost:8080/kouroukan/image/bi_syllabes/'+image_name+'.jpg';
                                	}
                                	if(option_index == 2) {
                                	    image_src = 'http://localhost:8080/kouroukan/image/tri_syllabes/'+image_name+'.jpg';
                                	}
                                	if(option_index == 3) {
                                	    image_src = 'http://localhost:8080/kouroukan/image/quadri_syllabes/'+image_name+'.jpg';
                                	}
                                	    
                                	return image_src;
                                }
                            } 
                          
                            function afficherQuestionBouton() {
                	            $('.repetition_btn').css('display','none');
                	            $('.correction_btn').css('display','none');
                	            $('.question_btn').css('display','block');
                            }
                            function effacerQuestion() {
                            	question_pratique = '';
                            }
                            function effacerReponse() {
                            	reponse_tapee = reponse_tapee.split(',');
                            	reponse_tapee.splice(0,reponse_tapee.length);
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
                                var progress_unity = $('.progress_bar').width()/reverseIntNko(quantite_de_question);
                                          
                                if(question_pratique!=reponse_tapee){ 
                                    $('.progress_question_bar').css('width','+='+progress_unity+'px');
                                }else{ 
                                    $('.progress_question_bar, .progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                                }
                            }
                        	function revisionDePratique() {
                        	        
                        	    $('#table_1 tr').on('click', function() {
                        	        $(this).siblings().removeClass('pratique_tr_actif');
                        	        $(this).addClass('pratique_tr_actif'); 
                        	        afficherImage();
                        	        
                        	        var q = $('.pratique_tr_actif td:nth(0)').html(); 
                        	        var r = $('.pratique_tr_actif td:nth(1)').html(); 
                        	        if(q == r) {
                    	                $('#pratiques_image').css('opacity',1);
                    	                $('#croix').css('display','none');
                    	            }
                        	        if(q !== r) {
                        	            $('#pratiques_image').css('opacity','0.15');
                    	                $('#croix').css('display','flex');
                        	        }
                    	        
                        	    });
                        	}
                        	function finDePratique() {
                        	    
                        	    var effort = parseIntNko((total_point/total_question)*100)+'%';
                        	    var message_1 = 'ߌ ߞߎߟߎ߲ߖߋ߫.<br/>'+option_de_syllabe+'  ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ ߁߀߀% ߟߊ߫. ߌ ߘߌ߫ ߛߋ߫ ߥߊ߫ ߟߊ߫ ߢߍ ߝߍ߬.';
                        	    var message_2 = 'ߌ ߘߐߖߊ߬. <br/>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ '+effort+' ߟߊ߫.<br/> ߘߌ߬ߢߍ߬ ߞߵߌ ߞߐߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬.';
                       	    
                        	    if( total_question+1 === compteur_de_question ) {

                        	        memoriserPratiques();
                        	        dimensionnementDeFinDePratiquesBody();
                        	        masquerClavierEtConsoles();
                        	        initialiserProgressBarr();
                        	        table = '';
                        	                   
                        	        if(effort == '߁߀߀%') {
                        	            stockerPratiques();
                        	            
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
                        	        
                        	            $('#message_btn_2').on('click', function() {
                        	                
                        	                questions_pratiques = questionsPratiques();
                        	                compteur_de_question = 1;
        	                                affichageParDefautDesBoutonsDEntete();
        	                                dimensionnementParDefautDePratiquesCorps();

                        	                if($('#message_btn_2').text() == 'ߥߊ߫ ߢߍ߫') {
                        	                    
                        	                    changerNombreDeSyllabe();
                        	                    total_point = 0;
                        	                }
                        	                if($('#message_btn_2').text() == 'ߛߍ߬ߦߵߊ߬ ߡߊ߬') {
                        	                    
                        	                    questions = questionsPratiques();
                        	                    total_point = 0;
                        	                }

                        	            });
                        	            
                                    
                                    
                        	        function dimensionnementDeFinDePratiquesBody() {
                        	            
                        	            var course_height = $('.course').height();
    	                                var course_head_height = $('.course_head').height();
    	                                var pratique_head_height = $('#pratique_head').height();
                        	            var course_body_height = course_height - pratique_head_height + 6;
    	                                
    	                                $('.course_body').css('height', course_body_height-26+'px');
                        	            $('#message_de_fin_container').css('display','block');
                        	            redimensionnementDePratiquesReponseContainer();
                        	        }
                                    function memoriserPratiques() {
                                        memoire_pratiques = [option_index, memoire_pratique.join(';')].join('_');
                                    }
                                    function stockerPratiques() {
                                        
                                      /* Selection de submit bouton dont le click declenche le stockage de la pratique*/
                                        var pratique_submit = document.getElementById('pratique_submit');
                                        
                                        pratique_submit.addEventListener('click', e => {
                                            e.preventDefault();
                                            
                                            let id_input          = document.getElementById('id_input');
                                            let matiere_nom_input = document.getElementById('matiere_nom_input');
                                            let phase_input       = document.getElementById('phase_input');
                                            let lesson_input      = document.getElementById('lesson_input')
                                            let note_input        = document.getElementById('note_input')
                                            
                                            matiere_nom_input.value = sessionStorage.getItem('matiere');
                                            phase_input.value       = sessionStorage.getItem('phase');
                                            lesson_input.value      = memoire_pratiques;
                                            note_input.value        = total_point;
                                            
                                          /* Extration du contenu des inputs pour leur envoie a la page actions.php qui se chargé de les envoyer au serveur */  
                                            let id_client   = id_input.value;
                                            let matiere_nom = matiere_nom_input.value;
                                            let lesson      = lesson_input.value;
                                            let phase       = phase_input.value;
                                            let note        = note_input.value;
                                          
                                          /*--------------------------------------------------------------------*/
                                            
                                            const param = new URLSearchParams({
                                                post_action: 'archiver_pratiques',
                                                id_client: id_client,
                                                matiere: sessionStorage.getItem('matiere'),
                                                phase: phase,
                                                lesson: lesson,
                                                note: note
                                            });
                                      
                                            fetch('actions.php',{
                                                method: 'POST',
                                                body: param
                                            })
                                            .then(response => response.json())
                                        });
                                        
                                        pratique_submit.click();
                                    }
                                    function changerNombreDeSyllabe() {
                                        if(total_point === total_question) {
                                            $('#pratique_head .actif').next().click();
                                        }
                                    }  
                                }
                            }  
                        }); 
                    }
                    function afficherClavierEtConsoles() {
                        $('.progress_bar, .course_head, .clavier_container').css('display','block');
                    }
                    function masquerClavierEtConsoles() {
                        $('.progress_bar, .course_head, .clavier_container').css('display','none');
                    }
                    function initialiserProgressBarr() {
                        $('.progress_question_bar, .progress_bonne_reponse_bar').css('width',0);
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
                	        
                    function afficherProgressBar(){
        	            $('.progress_bar').css({'opacity':1});
        	        }
                                    	
                } 
    	    }
          
      	});
    	
    	$('#go_to_lesson').on('click', function() {
	        $('.phases ul li').click();
	    });
	}
    function phasesCollection() {
        let collection = [];
                
        for (var i = 0; i < liste_de_phases.length; i++) {
            collection[i] = liste_de_phases[i][1];
        }
               
        return collection;
    }
	
});
