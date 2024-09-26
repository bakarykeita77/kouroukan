// function evaluations() {
        
//     var id = JSON.parse(sessionStorage.getItem('id')); 
//     var matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom')); 
//     var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
//     var total_phase = $('.phases li').lenth;
//     var phase_class = JSON.parse(sessionStorage.getItem('phase_class'));
//     var questions_evaluation = JSON.parse(sessionStorage.getItem('questions'));

//     var nbr_max_de_questions_a_poser = 20;
//     var question_evaluation = '', questions_a_evaluer = [], reponse_evaluation = [];
//     var note_d_evaluation = 0;
//     var moyenne_d_evaluation = 1 ;
//     var compteur = incrementer();
//     var evaluation_counter = 0;
//     let good_response_counter = 0;
    
//     var memoire_rang = [];
     
//     var q_index = 0, q_rang = '߭';
//     var q_ordre = parseIntNko(q_index+1);
//     var evaluation_a_stocker = [];

//     $('#pratique_options').css('display','none');
//     $('.fermeture').attr('id', 'fermer_evaluation');
    

//     chargerEvaluationAlphabet();
//     afficheEvaluationAlphabet();
//     evaluerAlphabet();
//     // stockerEvaluationAlphabet();
//     assistantEvaluationAlphabet();
//     finDeEvaluationAlphabet();
//     initialiserEvaluation();


//     function chargerEvaluationAlphabet() {
        
//         var evaluation_tbody_default_message = 'ߞߘߐߓߐߟߌ ߞߐߝߟߌ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬.';
        
//         initialisationDEvaluationEntete();
//         $('#evaluation_tbody').html("<p id='evaluation_tbody_default_content'>"+evaluation_tbody_default_message+"</p>");


//         function initialisationDEvaluationEntete(){

//             var q_total = parseIntNko(nbr_max_de_questions_a_poser);
//             var q_index = 0;
//             var q_ordre = parseIntNko(q_index+1);
//             var q_label = 'ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ';
//             var q_rang = '߭';
//             var q_actiom = 'ߟߊߡߍ߲߫';
            
//             $('.question_label').html( q_label );
//             $('.question_total').html( q_total );
//             $('.question_ordre').html( q_ordre+q_rang );
//             $('.question_action').html( q_actiom );
    
//             $('.question_btn').css('display','block');
//             $('.repetition_btn').css('display','none');
//             $('.correction_btn').css('display','none');
//         }
//     }
//     function afficheEvaluationAlphabet() {}
//     function evaluerAlphabet() {
        
//         zoomUp($('#evaluation_dialogue_btn'));
//         poserQuestionEvaluation();
//         repeterQuestionEvaluation();
//         repondreEvaluation();
//         rectificationDEvaluation();
//         correctionEvaluation();
        
        
//         function poserQuestionEvaluation() {
//             $('.question_btn').on('click', function(){
//                 effacerPrecedenteReponse();
//                 question_evaluation = questions_evaluation[q_index]; 
                
//                 dicterLaQuestion();
//                 $('#evaluation_cross').css('display','none');
//                 $('#evaluation_cross').css('transform','scale(0.4)');
//                 $('#evaluation_reponse_container').css({'top':0}); 
//                 afficherTesteContainer(); 
//                 // memoriserQuestionRang();
    
//                 q_index = compteur();
//                 q_ordre = parseIntNko(q_index+1);
//                 q_rang = '߲';
                
//                 actualiserLesLibellesDeDialogueBtn();
                
//                 function effacerPrecedenteReponse() { $('#evaluation_reponse').html(''); }
//                 function actualiserLesLibellesDeDialogueBtn(){
                    
//                     $('.question_ordre').html(q_ordre+q_rang);
//                     $('.question_action').html('ߠߊߡߍ߲߫');
                    
//                     $('.question_btn').css('display','none');
//                     $('.repetition_btn').css('display','block');
//                     $('.correction_btn').css('display','none');
//                 }
//                 function dicterLaQuestion(){
//                     lireLettre('alphabet',question_evaluation);
//                 }
//                 function afficherTesteContainer() { $('#teste_container').css({'top':'-6rem'}); }
//                 function memoriserQuestionRang(){
//                     memoire_rang[memoire_rang.length] = q_ordre+q_rang;
//                     return memoire_rang;
//                 }
//             });
//         }
//         function repeterQuestionEvaluation() {
//             $('.repetition_btn').on('click', function(){
//                 lireLettre('alphabet',question_evaluation);
//             });
//         }
//         function repondreEvaluation() {
//             $('#clavier_nko td').on('click', function(){
             
//                 if(question_evaluation == '') rappel($('#evaluation_dialogue_btn'));
//                 if(question_evaluation != '') {
                    
//                     var caractere = $(this).text();
                    
//                     reponse_evaluation.push(caractere);
//                     $('#evaluation_reponse').html(reponse_evaluation.join(''));
//                     afficherCorrectionButton();
                  
//                     function afficherCorrectionButton(){
//                         $('.question_btn').css('display','none');
//                         $('.repetition_btn').css('display','none');
//                         $('.correction_btn').css('display','block');
//                     }
//                 }
//             });
//         }
//         function rectificationDEvaluation() {
//             $('#correcteur_d_evaluation').on('click',function() {
//                 reponse_evaluation.pop();
//                 $('#evaluation_reponse').html(reponse_evaluation.join(''));
//             });
//         }
//         function correctionEvaluation() {
            
//             var evaluation_html = '';
//             $('.correction_btn').on('click', function(){
                
//                 corrigerEvaluation();
//                 progressBarrEvaluationAlphabet();
//                 effacerQuestions();
//                 afficherQuestionButton();
//                 finDEvaluation();
                
                                   
//                 function corrigerEvaluation(){

//                     let q = question_evaluation;
//                     let r = reponse_evaluation.join('');
//                     let p = (q == r) ? 1:0;
//                     let question_reponse = [q,r,p];
                     
//                     note_d_evaluation += p; 
                    
//                     enregistrerExerciceAlphabet();
//                     chargerInstantannementEvaluationTbody();
//                     marquerReponseEvaluation();
//                     effacerCheckMark(); 
//                     masquerTesteContainer();
//                     setTimeout(() => { defilementDuContenuVersLeHaut($('#evaluation_tbody')); }, 1200);

//                     evaluation_counter++;

                    
//                     function enregistrerExerciceAlphabet() { 
//                         evaluation_a_stocker.splice(evaluation_counter,1,question_reponse); 
//                     }
//                     function chargerInstantannementEvaluationTbody() {

//                         var n = parseIntNko(evaluation_counter);
//                         n = (n == '߁') ? n+'߭' : n+'߲';
//                         r = (q == r) ? r : "<del>"+r+"</del>";

//                         evaluation_html += '\
//                             <div>\
//                                 <span>'+n+'</span>\
//                                 <span>'+q+'</span>\
//                                 <span>'+r+'</span>\
//                                 <span>'+parseIntNko(p)+'</span>\
//                             </div>\
//                         ';

//                         $('#evaluation_tbody').html(evaluation_html);
//                         $('#evaluation_total_point').html(parseIntNko(note_d_evaluation));
//                         $('#evaluation_pourcentage_point').html('%'+parseIntNko(note_d_evaluation*100/nbr_max_de_questions_a_poser));
//                     }                                    
//                     function marquerReponseEvaluation() {    
//                         if(reponse_evaluation.join('') == question_evaluation) {
                            
//                             $("#evaluation_reponse").html("<p id='bonne_reponse'>"+reponse_evaluation.join('')+"</p><div id='check_mark_container'> <p id='check_mark'></p> <p id='check_mark_cover'></p> </div>");
//                             $('#check_mark_container').css({'display':'inline-block', 'margin-right':'4px'});
//                             $('#check_mark_cover').css({'right':'0.25rem'});
//                             $('#check_mark').html("&#10003;"); 
//                             setTimeout(function(){ $('#check_mark_cover').css({'right':'2rem'}); },100);
//                             setTimeout(function(){ $('#check_mark_container').css({'display':'none'}); },1000);
//                         }else{
//                             $("#evaluation_reponse").html("<p id='mauvaise_reponse'>"+reponse_evaluation.join('')+"</p><p id='evaluation_cross'>&#10060;</p>");
//                             $('#evaluation_cross').css({'display':'block', 'right':reponse_evaluation.length/2+'rem', 'transform':'scale(0.5)', 'opacity':0});
//                             setTimeout(function(){ $('#evaluation_cross').css({'transform':'scale(1)', 'opacity':0.75}); }, 100);
//                         }

//                         setTimeout(() => {
//                             $('#evaluation_reponse p').html('');
//                         }, 2000);
//                     } 
//                     function effacerCheckMark() {
//                         setTimeout(function(){
//                             $('#check_mark').empty();
//                         }, 1000);
//                     }
//                     function masquerTesteContainer() { 
//                         setTimeout(() => { $('#teste_container').css({'top':0}); }, 1000); 
//                     }
//                 }
//                 function progressBarrEvaluationAlphabet() {
            
//                     let progress_unity = 100/nbr_max_de_questions_a_poser;
                           
//                     if(question_evaluation == '') return;
//                     if(question_evaluation != '') {
//                         actualiserLessonProgressBar();
                        
//                         function actualiserLessonProgressBar(){
                    
//                             let bar_width = evaluation_counter*progress_unity;

//                             $('.progress_mauvaise_reponse_bar_integre').css('width', bar_width+'%');
//                             if(question_evaluation == reponse_evaluation) { 
//                                 good_response_counter++;
//                                 let good_response_width = good_response_counter*progress_unity;
//                                 $('.progress_bonne_reponse_bar_integre').css('width', good_response_width+'%');
//                             }
        
//                             question_evaluation = ''; //Vider la variable question_evaluation après son utilisation.
//                         }
//                     }
//                 }
//                 function effacerQuestions() {
//                     question_evaluation = '';
//                     reponse_evaluation.splice(0,reponse_evaluation.length);
//                     $('#reponse').html(reponse_evaluation);
//                 }
//                 function afficherQuestionButton(){
//                     $('.correction_btn').css('display','none');
//                     $('.question_btn').css('display','block');
//                     $('.repetition_btn').css('display','none');
//                 }
//                 function finDEvaluation() {
//                     if(q_index==nbr_max_de_questions_a_poser){
//                         $('.question_btn').off('click');
//                         $('.question_btn').html(matiere_nom+' ߞߘߐߓߐߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
//                     }
//                 }
//             });
//         }
//     }
//     function stockerEvaluationAlphabet() {
//         $('.correction_btn').on('click', function(){
//             let index_phase_active = $('.phases_container ul li .active').index();
                        
//             if(evaluation_counter == nbr_max_de_questions_a_poser) {
//                 if(note_d_evaluation <  moyenne_d_evaluation) alert( "ߛߍ߬ߦߵߊ߬ ߡߊ߬" ); 
//                 if(note_d_evaluation >= moyenne_d_evaluation) {
//                     // if(phase_class == "apprises") {alert("ߦߙߐ ߢߌ߲߬ ߞߍߣߍ߲߫ ߞߘߐ ߟߋ߬"); return false;}
                   
//                     let phase_nbr = JSON.parse(sessionStorage.getItem('data_phase_nbr'));
//                     sendLessonDataToDB('alphabet_evaluation',evaluation_a_stocker);
//                     changerPhaseActive(index_phase_active);
//                     sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr));
//                     console.log('Les données de Alphabet_evaluation sont envoyées à la base de données.');
                    
                    
//                     if(index_phase_active === total_phase) {
//                         sessionStorage.setItem('niveau_max',JSON.stringify(niveau_max+1));                                            
//                         sessionStorage.setItem('niveau_actif',JSON.stringify(niveau_max+2));
//                         sessionStorage.setItem('phase_nbr',JSON.stringify(0));
//                     }
//                 }
//             }
//         });
//         $('#fermer_evaluation').on('click', function() {
//             (location.replace("/kouroukan/php/programmes.php"))();
//         });
//     }
//     function assistantEvaluationAlphabet() {
//         $('.notification_titre').text('ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ');
//         setTimeout(() => {
//             ecrire('notification_corps','\
//                 ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬߸ߦߋ߫ ߛߓߍߘߋ߲߫ ߟߊߡߍ߲ߣߍ߲ ߛߓߍ߫߸ ߤߊ߲߯ ߞߘߐߓߐߟߌ ߦߋ߫ ߓߊ߲߫.\
//             ');
//         }, 1000);
//     }
//     function finDeEvaluationAlphabet() {
//         $('.correction_btn').on('click', function(){
//             if(evaluation_counter == nbr_max_de_questions_a_poser) {
//                 resultat(evaluation_a_stocker);
//                 afficherEvaluationAlphabetResultat();
//                 reprendreEvaluationAlphabet();
//                 continuSurSyllabe();
                
//                 function afficherEvaluationAlphabetResultat() {
//                     goDown($('.resultat_container'));
//                     setTimeout(() => { masquer($('#evaluation')); }, 1500);
//                 }
//                 function reprendreEvaluationAlphabet() {
//                     $('#reprendre').click(function() {
//                         $('#envelope').css('display','none');
//                         goUp($('.resultat_container'));
//                         initialiserProgressBarIntegre();
//                         afficher($('#evaluation'));
//                         $('#alphabet_evaluation').click();
//                     });
//                 }
//                 function continuSurSyllabe() {
//                     $('#avance').html("<a href='http://localhost/kouroukan/php/programmes.php'>ߜߋ߲߭ ߥߟߊ߬ߘߊ ߕߊ߬ ߦߊ߲߬</a>");
//                 }
//             }
//         });
//     }
        
    
//     function initialiserEvaluation() {
//         for(var i = 0; i < 20; i++) questions_a_evaluer[i] = questions_evaluation[i];
//         for(var i=0;i<questions_a_evaluer.length;i++) {
//             var q = questions_a_evaluer[i], r = '', p = 0;
//             evaluation_a_stocker[i] = [q,r,p];
//         }
//     }
// }