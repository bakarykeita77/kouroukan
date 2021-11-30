$('document').ready(function() {
	
	var matiere_index  = $('#matiere_index_container').html();
    var voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees;
    var rang = '';
	var etapes_passees = [];
	var etape_actuelle = [];
	var etapes_a_faire = [];
	
	var phases_actuelles, phase_precedante, phase_active;
	var index_phase_actuelle, index_phase_precedante, index_phase_active;
    
    var niveau_max;
    
    rang = (niveau==1)?'߭':'߲';
     
	actualiserCochage();
	chargerPhases();
	controlDeNiveauDEtude();
	styliserPhases();
	cours();
	
    function actualiserCochage(){
        voyelles_cochees = $('#voyelles_cochees').html().split('');
        consonnes_cochees = $('#consonnes_cochees').html().split('');
        tedos_coches = $('#tedos_coches').html().split('');
        tons_coches = [''].concat($('#tons_coches').html().split(''));
        nasalisations_cochees = [''].concat($('#nasalisations_cochees').html().split(''));
        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
    }
	function chargerPhases(){
    	$('.rang').html(rang);
    	$('.phases').html(phasesHTML());
    	
        function phasesHTML(){
            var content = '<ul>';
            for(var i=0;i<liste_de_phases.length;i++){
                var lesson_id = $('.lesson_title').attr('id');
                content += '<li id="'+lesson_id+'_'+liste_de_phases[i][0]+'">'+liste_de_phases[i][1]+'</li>';
            }
            content += '</ul>';
            return content;
        }
	}
	function controlDeNiveauDEtude() {
	    
	    var code_container = $('#code_container');  
        var niveaux_passes = [];
        var client_code    = code_container.html();
        
        client_code = client_code.split(';');
	   
	    for (var i = 0; i < client_code.length; i++) {
alert( client_code[i] ); 	        
	        var etape = client_code[i].split(',');
	         
	        if(etape[1] !== '') { etapes_passees[etapes_passees.length] = etape; }
	        else{ etapes_a_faire[etapes_a_faire.length] = etape; }
	    }
	    
	    
	    for (var i = 0; i < etapes_passees.length; i++) {
	        niveaux_passes[niveaux_passes.length] = etapes_passees[i][0];
	    }
	    niveau_max = Math.max(...niveaux_passes);
	    
	    etape_actuelle = client_code[matiere_index-1].split('_'); 
	    phases_actuelles = etape_actuelle[1].split (',');
	    index_phase_precedante = phases_actuelles.length;
	    index_phase_actuelle = phases_actuelles.length+1;
	    phase_precedante = phases_actuelles[index_phase_precedante-1];
	    
	}
	
	function styliserPhases() {
	    
	   
        if(matiere_index == niveau_max) 
        {
            $('.phases ul li:nth-child('+index_phase_actuelle+')').addClass('active'); 
    	   
    	    $('.active').prevAll().css({'background-color':'#fff', 'color':'yellow', 'text-shadow':'0 0 16px #000'});
    	    $('.active').nextAll().css({'background-color':'#ccc', 'color':'#bbb'});
        }
        else
        {
            $('.phases ul li').css({'background-color':'#fff', 'color':'yellow', 'text-shadow':'0 0 16px #000'}); 
        } 
        
	}
	function cours(){
    	
    	$('.phases ul li').on('click', function(){
       
            var lettres = voyelles_cochees.concat(consonnes_cochees,tedos_coches);  
            var syllabes = syllab();  
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
                if(course_id=='apprentissage' || course_id=='exercices'){ afficherLesson(); }
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
                    case 'evaluation'   :evaluations();   break;
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
            	function exercices(){
            	    var compteur_de_question = 1;
            	    var quantite_de_question = quantiteDeQuestion();
            	    var question_rang = '߭';
                    
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
                    	    var exercices_entete_html = "<div class='play_icon_container' style='width:auto'>";
                    	        exercices_entete_html += "<span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>";
                    	        exercices_entete_html += "<span id='qtite_question_exercice'>"+quantite_de_question+"</span> : <span id='ordre_question'>"+parseIntNko(compteur_de_question)+question_rang+" </span>";
                    	        exercices_entete_html += "<span id='ecouter_exercice'> ߟߊߡߍ߲߫</span><span class='play_icon'>"+play_icon+"</span>";
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
                    	    $('.play_icon_container').on('click',function(){
                    	        
                    	        compteur_de_question++;
                    	        question_rang = '߲';
                    	        $('#ecouter_exercice').html(' ߠߊߡߍ߲߫');
                    	        $('#ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
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
                function evaluations(){
                            
                    var syllabes = syllab();
                    var syllabes_tonifies = tonification();
                    var nbr_max_de_questions_a_poser = 20;
                    
                    
                    var questions_table = questions();
                    var compteur = incrementer();
                    var question_posee = '';
                    var reponse_tapee = [];
                    
                    var memoire_rang = [];
                    var memoire_question = [];
                    var memoire_reponse = [];
                    var memoire_vraie_reponse = [];
                    var point = '';
                    var memoire_point = [];
                    var memoire_point_total = [];
                    var point_total = 0;
                     
                    var q_index = 0;
                    var q_ordre = parseIntNko(q_index+1);
                    var q_rang = '߭';
                    
                    evaluationCorpsStyle();
                    initialisationEvaluationEntete();
                    afficherProgressBar();
                    poserQuestion();
                    repeterQuestion();
                    taperReponse();
                    correctionEtStockage();
                 
            
                    function questions(){
                        if(niveau==1){ questions_table = mix1D(mix1D(caracteres[0]).concat(caracteres[1],caracteres[2],caracteres[3])); }
                        if(niveau==2){ questions_table = mix1D(syllabes); }
                        if(niveau==3){ questions_table = mix1D(syllabes_tonifies); }
                        
                        return questions_table;
                    }
                    function poserQuestion(){
                	    $('.question_btn').on('click', function(){
                	        question_posee = questions_table[q_index];
    alert(question_posee);            
                	        dicterLaQuestion();
                	        memoriserQuestionRang();
                	        memoriserQuestion();
                
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
                                $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_posee+'.mp3', 'autoplay':'on'});
                	            $('#progress_bar').css('top',0);
                	        }
                	        function memoriserQuestion(){
                	            memoire_question[memoire_question.length] = question_posee;
                	            return memoire_question;
                	        }
                	        function memoriserQuestionRang(){
                	            memoire_rang[memoire_rang.length] = q_ordre+q_rang;
                	            return memoire_rang;
                	        }
                	    });
                    }
                    function afficherProgressBar(){
        	            $('.progress_bar').css({'opacity':1});
        	        }
                    function repeterQuestion(){
                	    $('.repetition_btn').on('click', function(){
                            $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_posee+'.mp3', 'autoplay':'on'});
                	    });
                    }
                    function taperReponse(){
                        $('#clavier_nko td').on('click', function(){
                            
                            if(question_posee=='')
                            {   guiderClient(); }
                            else
                            {
                                var caractere = $(this).html();
                                
                                reponse_tapee[reponse_tapee.length] = caractere;
                                $('#reponse').html(reponse_tapee.join(''));
                                afficherCorrectionButton();
                            }
                            
                            function afficherCorrectionButton(){
                                $('.question_btn').css('display','none');
                                $('.repetition_btn').css('display','none');
                                $('.correction_btn').css('display','block');
                            }
                        });
                    }
                    function correctionEtStockage(){
                        $('.correction_btn').on('click', function(){
                            
                            actualiserProgressBar();
                            memoriserReponse();
                            corriger();
                            archiverTeste();
                            effacer();
                            afficherQuestionButton();
                            
                            function memoriserReponse(){
                                memoire_reponse[memoire_reponse.length] = reponse_tapee.join('');
                                return memoire_reponse;
                            }
                            function actualiserProgressBar(){
                                var progress_unity = $('.progress_bar').width()/nbr_max_de_questions_a_poser;
                               
                                if(reponse_tapee.join('')==question_posee){
                                    $('.progress_question_bar, .progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                                }else{
                                    $('.progress_question_bar').css('width','+='+progress_unity+'px');
                                }
                            }
                            function afficherQuestionButton(){
                                $('.correction_btn').css('display','none');
                                $('.question_btn').css('display','block');
                                $('.repetition_btn').css('display','none');
                            }
                            function corriger(){
                             
                                if(reponse_tapee.join('')==question_posee){
                                    
                                    point = 1;
                                    point_total ++;
                                    memoire_point_total[0] = parseIntNko(point_total);
                                    memoire_point_total[1] = parseIntNko(nbr_max_de_questions_a_poser);
                                     
                                    
                                    $('#check_mark_container').css('display','inline-block');
                                    $('#check_mark').html( check_true_icon );
                                    setTimeout(function(){ $('#check_mark_cover').css({'left':'-100%'}); },100);
                                    setTimeout(function(){ $('#check_mark_cover').css({'left':0}); },2000);
                                    setTimeout(function(){ $('#check_mark_container').css({'display':'none'}); },2000);
                                    
                                }else{
                                    point = 0;
                                    
                                    $('#cross').html( '&#10060;' );
                                    $('#cross_container').css({'display':'block', 'transform':'scale(0.5)', 'opacity':0});
                                    setTimeout(function(){ $('#cross_container').css({'transform':'scale(1)', 'opacity':0.75}); }, 100);
                                    setTimeout(function(){ $('#cross_container').css({'display':'none'}); },2000);
                                    
                                }
                                
                                memoriserPoint();
                                function memoriserPoint(){
                                    memoire_point[memoire_point.length] = parseIntNko(point);
                                }
                            }
                            function archiverTeste(){
                                var teste_to_upload = [];
                                if(q_index==nbr_max_de_questions_a_poser){
                                    
                                    for(var i=0;i<memoire_rang.length;i++){
                                        var teste = [memoire_rang[i],memoire_question[i],memoire_reponse[i],memoire_point[i]];
                                        teste_to_upload[i] = teste;
                                    }
                                    
                                    $('#teste').val(teste_to_upload.join(';'));
                                    $('#point').val(memoire_point_total);
                                    setTimeout(function(){ $('#submit').click(); },2000);
                                }
                            }
                            function effacer(){
                                setTimeout(function(){
                                    question_posee = '';
                                    reponse_tapee.splice(0,reponse_tapee.length);
                                    $('#reponse').html(reponse_tapee);
                                    $('#check_mark').empty();
                                },2000);
                            }
                
                        });
                    }
                    
                    function evaluationCorpsStyle(){
                        
                        var evaluation_height = $('#evaluation').height();
                        var evaluation_entete_height = $('#evaluation_entete').height();
                        var clavier_container_height = $('.clavier_container').height();
                        var progress_bar_height = $('.progress_bar').height();
                        var evaluation_corps_height = evaluation_height-evaluation_entete_height-clavier_container_height-progress_bar_height-28+'px';
                       
                        $('#evaluation_corps').css({ 'height':evaluation_corps_height });
                    }	    
                    function initialisationEvaluationEntete(){
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
                    function syllab() {
                        var slb = [];
                        for(var k=0;k<2;k++){
                            for(var i=0;i<18;i++) {
                                for(var j=0;j<7;j++) {
                                    slb[slb.length] = caracteres[1][i]+caracteres[0][j]+caracteres[4][k];
                                }
                            }                                                                                                                            
                        }
                
                        return slb;
                    }
                    function tonification(){
                        var tonifies = [];
                    
                        for(var consonne=0;consonne<18;consonne++) {
                        for(var voyelle=0;voyelle<7;voyelle++) {
                        for(var nasalisation=0;nasalisation<2;nasalisation++) {
                        for(var ton=0;ton<8;ton++) {
                                tonifies[tonifies.length] = caracteres[1][consonne]+caracteres[0][voyelle]+caracteres[4][nasalisation]+caracteres[5][ton];
                        }}}}
                
                        return tonifies;
                    }
                }
    	    }
            function lessonCourante(){
               
                if(phase_id=='alphabet_apprentissage'){ lesson_courante = alphabetApprentissageHTML(); }
                if(phase_id=='syllabes_apprentissage'){ lesson_courante = syllabesApprentissageHTML(); }
                if(phase_id=='tons_apprentissage'){ lesson_courante = tonsApprentissageHTML(); }
                if(phase_id=='chiffres_apprentissage'){ lesson_courante = chiffresApprentissageHTML(); }
                
                if(phase_id=='alphabet_exercices'){ lesson_courante = alphabetExercicesHTML(); }
                if(phase_id=='syllabes_exercices'){ lesson_courante = syllabesExercicesHTML(); }
                if(phase_id=='tons_exercices'){ lesson_courante = tonsExercicesHTML(); }
                if(phase_id=='chiffres_exercices'){ lesson_courante = chiffresExercicesHTML(); }
                
                return lesson_courante;
                
                function alphabetApprentissageHTML() {

                    var table = "<table class = 'table_parlante'>\n";
                    for(var i=0;i<lettres.length-lettres.length%7;i+=7) {
                        table += "<tr>\n";
                        for(var j=0;j<7;j++) {
                            table += "<td>"+lettres[i+j]+"</td>\n";
                        }
                        table += "</tr>\n";
                    }
                    for(var k=lettres.length-lettres.length%7;k<lettres.length;k+=lettres.length%7){
                        table += "<tr>\n";
                        for(var l=0;l<lettres.length%7;l++) {
                            table += "<td>"+lettres[k+l]+"</td>\n";
                        }
                        table += "</tr>\n";
                    }
                    table += "</table>";
                
                    return table;
                 }
            	function alphabetExercicesHTML(){
            	    lettres = mix1D(lettres);
        
            	    var exercices_corps_html = '<table class="table_muette">';
                        for(var i=0;i<lettres.length-lettres.length%7;i+=7){
            	        exercices_corps_html += '<tr>';
            	            for(var j=0;j<7;j++){ exercices_corps_html += '<td>'+lettres[i+j]+'</td>'; }
            	        exercices_corps_html += '</tr>'; 
                        }
                        for(var k=lettres.length-lettres.length%7;k<lettres.length;k+=lettres.length%7){
            	        exercices_corps_html += '<tr>';
            	            for(var l=0;l<lettres.length%7;l++){ exercices_corps_html += '<td>'+lettres[k+l]+'</td>'; }
            	        exercices_corps_html += '</tr>'; 
                        }
            	    exercices_corps_html += '</table>';
            	    
            	    return exercices_corps_html;
            	}
                function chiffresApprentissageHTML(){
                    var n_chiffres = chiffres.length;
                
                    table = "<table class='table_parlante'>\n";
                        table += "<tr>\n";
                        for(var n=0;n<n_chiffres;n++){    
                            table += "<td>"+chiffres[n]+"</td>\n";
                        }
                        table += "</tr>\n";
                    table += "</table>\n";
                
                    return table;
                };
                function chiffresExercicesHTML(){
                    ligne_aleatoire = Math.floor(Math.random()*10);
                    
                    table = "<table class='table_parlante'>\n";
                        table += "<tr>\n";
                        for(var n=0;n<n_chiffres;n++){    
                            table += "<td>"+chiffres[ligne_aleatoire]+"</td>\n";
                        }
                        table += "</tr>\n";
                    table += "</table>\n";
                    
                    return table;
                }
                function syllabesApprentissageHTML() {
                    var table = '';
                    for(var k=0;k<caracteres_coches[4].length;k++){
                    table += "<table class = 'table_parlante'>\n";
                        for(var i=0;i<caracteres_coches[1].length;i++) {
                            table += "<tr>\n";
                            for(var j=0;j<caracteres_coches[0].length;j++) {
                                table += "<td>"+[caracteres_coches[1][i]+caracteres_coches[0][j]+caracteres_coches[4][k]]+"</td>\n";
                            }
                            table += "</tr>\n";
                        }                                                                                                                            
                    table += "</table><br/><br/>";
                    }
        
                    return table;
                }
            	function syllabesExercicesHTML(){
            	    
            	    var exercices_corps_html = '<table class="table_muette">';
                    for(var i=0;i<lesson_questions.length-lesson_questions.length%7;i+=7){
                        exercices_corps_html += '<tr>\n';
                        for(var j=0;j<7;j++){
                            exercices_corps_html += '<td>'+lesson_questions[i+j]+'</td>\n';
                        }
                        exercices_corps_html += '</tr>\n';
                    }
                    for(var i=lesson_questions.length-lesson_questions.length%7;i<lesson_questions.length;i+=lesson_questions.length%7){
                        exercices_corps_html += '<tr>\n';
                        for(var j=0;j<lesson_questions.length%7;j++){
                            exercices_corps_html += '<td>'+lesson_questions[i+j]+'</td>\n';
                        }
                        exercices_corps_html += '</tr>\n';
                    }
            	    exercices_corps_html += '</table>';
            	    
            	    return exercices_corps_html;
            	}
                function tonsApprentissageHTML() {
                   
                    var tons_apprentissage_html = '';
                    var n1 = caracteres_coches[0].length*caracteres_coches[3].length*caracteres_coches[4].length;
                    
                    for(var sous_table=0;sous_table<syllabes_tonifies.length;sous_table+=n1){
                        tons_apprentissage_html += '<table class="table_parlante">\n\n';
                        for(var ligne=0;ligne<n1;ligne+=caracteres_coches[3].length){
                            tons_apprentissage_html += '<tr>\n';
                            for(var colonne=0;colonne<caracteres_coches[3].length;colonne++){
                                tons_apprentissage_html += '<td>'+syllabes_tonifies[sous_table+ligne+colonne]+'</td>\n';
                            }
                            tons_apprentissage_html += '</tr>\n\n';
                        }
                        tons_apprentissage_html += "</table><br><br><br>\n";
                    }
                    
                    return tons_apprentissage_html;
                }
            	function tonsExercicesHTML(){
        
            	    tonsApprentissageHTML();
            	    var exercices_corps_html = '<table class="table_muette">';
                    for(var i=0;i<lesson_questions.length - lesson_questions.length%8;i+=8){
                        exercices_corps_html += '<tr>\n';
                        for(var j=0;j<8;j++){
                            exercices_corps_html += '<td>'+lesson_questions[i+j]+'</td>\n';
                        }
                        exercices_corps_html += '</tr>\n';
                    }
                    for(var k=lesson_questions.length - lesson_questions.length%8;k<lesson_questions.length;k+=lesson_questions.length%8){
                        exercices_corps_html += '<tr>\n';
                        for(var l=0;l<lesson_questions.length%8;l++){
                            exercices_corps_html += '<td>'+lesson_questions[k+l]+'</td>\n';
                        }
                        exercices_corps_html += '</tr>\n';
                    }
            	    exercices_corps_html += '</table>';
            	    
            	    return exercices_corps_html;
            	}
            }
            function lessonQuestions(){
                var lq = '';
                if(niveau==1){ lq = mix1D(lettres); }
                if(niveau==2){ lq = mix1D(syllabes); }
                if(niveau==3){ lq = mix1D(syllabes_tonifies); }
                if(niveau==4){ lq = mix1D(chiffre); }
                
                return lq;
            }
        	function syllab() {
                var slb = [];
                for(var k=0;k<caracteres_coches[4].length;k++){
                    for(var i=0;i<caracteres_coches[1].length;i++) {
                        for(var j=0;j<caracteres_coches[0].length;j++) {
                            slb[slb.length] = caracteres_coches[1][i]+caracteres_coches[0][j]+caracteres_coches[4][k];
                        }
                    }                                                                                                                            
                }
        
                return slb;
            }
            function tonification(){
                var tonifies = [];
            
                for(var consonne=0;consonne<caracteres_coches[1].length;consonne++) {
                for(var voyelle=0;voyelle<caracteres_coches[0].length;voyelle++) {
                for(var nasalisation=0;nasalisation<caracteres_coches[4].length;nasalisation++) {
                for(var ton=0;ton<caracteres_coches[3].length;ton++) {
                        tonifies[tonifies.length] = caracteres_coches[1][consonne]+caracteres_coches[0][voyelle]+caracteres_coches[3][ton]+caracteres_coches[4][nasalisation];
                }}}}
        
                return tonifies;
            }
      	});
	}

});