
//     var lettres = ''; 
//   // var lesson_questions = lessonQuestions();
//     alert(lettres);
//     function exercices(){
   
// 	    //chargerExercices();
// 	    questionReponse();
// 	    //stockerExercice();

//     // 	function chargerExercices(){ 
//     //         $('#lesson_entete').html( exercicesEnteteHTML() );
//     // 	    $('#lesson_corps').html( lesson_courante ); 
    	    
//     //     	function exercicesEnteteHTML(){
//     //     	    var exercices_entete_html = "<div class='play_icon_container'><span class='play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߊߡߍ߲߫</span><span class='play_icon'>"+play_icon+"</span></div>";
//     //     	    exercices_entete_html += "<div class='oreille_icon_container'><span class='reecoute_label'>ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> <span class='oreille_icon'>"+oreille_icon+"</span></div>";
        
//     //             return exercices_entete_html;
//     //     	}
//     // 	}
// 	    function questionReponse(){
//     	    var i=0;
//     	    var question_posee = ''; 
//     	    var reponse_montree = '';

//     	    poserQuestion();
//     	    repondreQuestion();
    	    
//     	    function poserQuestion(){
//         	    $('.play_icon_container').on('click',function(){
        	        
//         	        question_posee = lesson_questions[i];
        	        
//         	        $(this).css('display','none');
//         	        $('.oreille_icon_container').css('display','block');
        	        
//         	        lireQuestion();
//         	        repeteQuestion();
        	        
//         	        i++;
        	        
//         	        function lireQuestion(){
//         	            $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question_posee+'.mp3', 'autoplay':'on'});
//         	        }
//         	        function repeteQuestion(){
//         	            $('.oreille_icon_container').on('click', function(){ lireQuestion(); });
//         	        }
//         	    });
//     	    }
//     	    function repondreQuestion(){
//         	    $('.table_muette').on('click', function(e){
//         	        if(question_posee=='')
//         	        {   guiderClient(); }
//         	        else
//         	        {   
//         	            var td = $(e.target);
//             	        reponse_montree = td.html();
            	        
//             	        if(question_posee!=reponse_montree){ barrerLaFausseReponse(td); clignotage(question_posee); }
//             	        if(question_posee==reponse_montree){ td.addClass('ombrage'); }
//             	        setTimeout(function(){ td.removeClass('ombrage'); },1000);
            	        
//             	        question_posee = '';    /* Vider la variable question_posee. */
            	        
//             	        $('.oreille_icon_container').css('display','none');
//             	        $('.play_icon_container').css('display','block');
//         	        }
//         	    });
//     	    }
// 	    }
// 	    function stockerExercice(){
	        
// 	        var td = $('.table_muette td');
// 	        var exercices_table = [];
// 	        var exercice_counter = 0;
// 	        var course_form = $('#course_form');
// 	        var nbr_max_exercice = '';
	        
// 	        for(var i=0;i<lesson_questions.length;i++){
// 	            var q = lesson_questions[i];
// 	            var r = '';
	            
// 	            exercices_table[exercices_table.length] = [q,r];
// 	        }
	        
// 	        $.each(td, function(){
// 	            $(this).on('click', function(){
	                
// 	                var q = exercices_table[exercice_counter][0];
// 	                var r = $(this).html();
// 	                var nouvel_exercice = [q,r];
	                
// 	                exercices_table.splice(exercice_counter,1,nouvel_exercice);
//                     $('#course_fermeture').on('click',function(){ chargementDeLessonForm(); sendExerciceToDB(); });
// 	                exercice_counter++;
	                
// 	                function chargementDeLessonForm(){
// 	                    $('#course_input').val(exercices_table.join(';'));
// 	                }
// 	                function sendExerciceToDB(){
//                         course_form.attr('action','actions.php?get_action=archiver_exercice');
// 	                    $('#submit_course').click();
// 	                }
// 	            });
// 	        });
// 	    }
//     }
    
// 	function alphabetExercicesHTML(){
// 	    lettres = mix1D(lettres);

// 	    var exercices_corps_html = '<table class="table_muette">';
//             for(var i=0;i<lettres.length-lettres.length%7;i+=7){
// 	        exercices_corps_html += '<tr>';
// 	            for(var j=0;j<7;j++){ exercices_corps_html += '<td>'+lettres[i+j]+'</td>'; }
// 	        exercices_corps_html += '</tr>'; 
//             }
//             for(var k=lettres.length-lettres.length%7;k<lettres.length;k+=lettres.length%7){
// 	        exercices_corps_html += '<tr>';
// 	            for(var l=0;l<lettres.length%7;l++){ exercices_corps_html += '<td>'+lettres[k+l]+'</td>'; }
// 	        exercices_corps_html += '</tr>'; 
//             }
// 	    exercices_corps_html += '</table>';
	    
// 	    return exercices_corps_html;
// 	}
