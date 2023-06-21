function evaluations() {
        
    var id = JSON.parse(sessionStorage.getItem('id')); 
    var matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom')); 
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
    var total_phase = $('.phases li').lenth;
    var phase_class = JSON.parse(sessionStorage.getItem('phase_class'));
    var questions_evaluation = JSON.parse(sessionStorage.getItem('questions'));

    var nbr_max_de_questions_a_poser = 20;
    var question_evaluation = '', questions_a_evaluer = [], reponse_evaluation = [];
    var note_d_evaluation = 0;
    var moyenne_d_evaluation = 1 ;
    var compteur = incrementer();
    var evaluation_tbody_default_message = 'ߞߘߐߓߐߟߌ ߞߐߝߟߌ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬.';
    var evaluation_counter = 0;
    
    var memoire_rang = [];
     
    var q_index = 0, q_rang = '߭';
    var q_ordre = parseIntNko(q_index+1);
    var evaluation_a_stocker = [];

    $('#pratique_options').css('display','none');
    $('.fermeture').attr('id', 'fermer_evaluation');

    $('#evaluation_tbody').html("<p id='evaluation_tbody_default_content'>"+evaluation_tbody_default_message+"</p>");
    initialiserEvaluation();
    evaluer();
    correctionEvaluation();
    stockerEvaluation();

    
    function initialiserEvaluation() {
        
        initialisationDEvaluationEntete();
        initialiserEvaluationAStocker();
       
        function initialisationDEvaluationEntete(){

            var q_total = parseIntNko(nbr_max_de_questions_a_poser);
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
            for(var i = 0; i < 20; i++) questions_a_evaluer[i] = questions_evaluation[i];
            for(var i=0;i<questions_a_evaluer.length;i++) {

                var q = questions_a_evaluer[i], r = '', p = 0;
                evaluation_a_stocker[i] = [q,r,p];
            } 
        }
    }
    function evaluer() {

        var reponse_font_size = $('#evaluation_reponse').height()/2;
        var correction_line_height = $('#correcteur_d_evaluation').height();
        $('#evaluation_reponse').css('font-size',reponse_font_size+'px');
        $('#correcteur_d_evaluation').css('line-height',correction_line_height+'px');
                        
        poserQuestionEvaluation();
        repeterQuestionEvaluation();
        repondreEvaluation();
        rectificationDEvaluation();
        
        
        function poserQuestionEvaluation() {
            $('.question_btn').on('click', function(){
                effacerPrecedenteReponse();
                question_evaluation = questions_evaluation[q_index];

                alert(question_evaluation);            
                
                dicterLaQuestion();
                $('#evaluation_cross').css('display','none');
                $('#evaluation_cross').css('transform','scale(0.4)');
                $('#evaluation_reponse_container').css({'top':0});  
                // memoriserQuestionRang();
    
                q_index = compteur();
                q_ordre = parseIntNko(q_index+1);
                q_rang = '߲';
                
                actualiserLesLibellesDeDialogueBtn();
                
                function effacerPrecedenteReponse() { $('#evaluation_reponse').html(''); }
                function actualiserLesLibellesDeDialogueBtn(){
                    
                    $('.question_ordre').html(q_ordre+q_rang);
                    $('.question_action').html('ߠߊߡߍ߲߫');
                    
                    $('.question_btn').css('display','none');
                    $('.repetition_btn').css('display','block');
                    $('.correction_btn').css('display','none');
                }
                function dicterLaQuestion(){
                    $('#audio').attr({'src':'/kouroukan/son/mp3/'+question_evaluation+'.mp3', 'autoplay':'on'});
                    $('#progress_bar').css('top',0);
                }
                function memoriserQuestionRang(){
                    memoire_rang[memoire_rang.length] = q_ordre+q_rang;
                    return memoire_rang;
                }
            });
        }
        function repeterQuestionEvaluation() {
            $('.repetition_btn').on('click', function(){
                $('#audio').attr({'src':'/kouroukan/son/mp3/'+question_evaluation+'.mp3', 'autoplay':'on'});
            });
        }
        function repondreEvaluation() {
            $('#clavier_nko td').on('click', function(){
             
                if(question_evaluation == '') rappel($('#evaluation_dialogue_btn'));
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
        function rectificationDEvaluation() {
            $('#correcteur_d_evaluation').on('click',function() {
                reponse_evaluation.pop();
                $('#evaluation_reponse').html(reponse_evaluation.join(''));
            });
        }
    }
    function correctionEvaluation() {
        
        var evaluation_html = '';
        $('.correction_btn').on('click', function(){
             
            corrigerEvaluation();
            actualiserEvaluationProgressBar();
            effacerQuestion();
            effacerCheckMark();
            afficherQuestionButton();
            finDEvaluation();
            
            
            function corrigerEvaluation(){
                
                let q = question_evaluation;
                let r = reponse_evaluation.join('');
                let p = (q == r) ? 1:0;
                let question_reponse = [q,r,p];
                
                evaluation_counter++;
                note_d_evaluation += p; 
                evaluation_a_stocker.splice(evaluation_counter,1,question_reponse);

                chargerEvaluationTbody();
                marquerReponseEvaluation(); 
                defilementDuContenuLeHaut($('#evaluation_tbody'));

                                   
                function chargerEvaluationTbody() {

                    var n = parseIntNko(evaluation_counter);
                    n = (n == '߁') ? n+'߭' : n+'߲';
                    r = (q == r) ? r : "<del>"+r+"</del>";

                    evaluation_html += '\
                        <div>\
                            <span>'+n+'</span>\
                            <span>'+q+'</span>\
                            <span>'+r+'</span>\
                            <span>'+parseIntNko(p)+'</span>\
                        </div>\
                    ';

                    $('#evaluation_tbody').html(evaluation_html);
                    $('#evaluation_total_point').html(parseIntNko(note_d_evaluation));
                    $('#evaluation_pourcentage_point').html('%'+parseIntNko(note_d_evaluation*100/nbr_max_de_questions_a_poser));
                }                                    
                function marquerReponseEvaluation() {    
                    if(reponse_evaluation.join('') == question_evaluation) {
                        
                        $("#evaluation_reponse").html("<p id='bonne_reponse'>"+reponse_evaluation.join('')+"</p><div id='check_mark_container'> <p id='check_mark'></p> <p id='check_mark_cover'></p> </div>");
                        $('#check_mark_container').css({'display':'inline-block', 'margin-right':'4px'});
                        $('#check_mark_cover').css({'right':'0.25rem'});
                        $('#check_mark').html("&#10003;"); 
                        setTimeout(function(){ $('#check_mark_cover').css({'right':'2rem'}); },100);
                        setTimeout(function(){ $('#check_mark_container').css({'display':'none'}); },1000);
                    }else{
                        $("#evaluation_reponse").html("<p id='mauvaise_reponse'>"+reponse_evaluation.join('')+"</p><p id='evaluation_cross'>&#10060;</p>");
                        $('#evaluation_cross').css({'display':'block', 'right':reponse_evaluation.length/2+'rem', 'transform':'scale(0.5)', 'opacity':0});
                        setTimeout(function(){ $('#evaluation_cross').css({'transform':'scale(1.5)', 'opacity':0.75}); }, 100);
                    }

                    setTimeout(() => {
                        $('#evaluation_reponse p').html('');
                    }, 1000);
                } 
            }
            function actualiserEvaluationProgressBar(){
                        
                var course_width = $('#evaluation_foot').width();
                $('#evaluation_progress_bar').width( course_width - 2 );
                
                var progress_unity = $('#evaluation_progress_bar').width()/nbr_max_de_questions_a_poser;
                       
                if(question_evaluation != reponse_evaluation.join('')){ 
                    $('.progress_question_bar').css('width','+='+progress_unity+'px');
                }else{ 
                    $('.progress_question_bar, .progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                }
            }
            function effacerQuestion() {
                question_evaluation = '';
                reponse_evaluation.splice(0,reponse_evaluation.length);
                $('#reponse').html(reponse_evaluation);
            }
            function effacerCheckMark() {
                setTimeout(function(){
                    $('#check_mark').empty();
                }, 1000);
            }
            function afficherQuestionButton(){
                $('.correction_btn').css('display','none');
                $('.question_btn').css('display','block');
                $('.repetition_btn').css('display','none');
            }
            function finDEvaluation() {
                if(q_index==nbr_max_de_questions_a_poser){
                    $('.question_btn').off('click');
                    $('.question_btn').html(matiere_nom+' ߞߘߐߓߐߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
                }
            }
        });
    }
    function stockerEvaluation() {
        $('.correction_btn').on('click', function(){
            let index_phase_active = $('.phases_container ul li .active').index();
                        
            if(evaluation_counter == nbr_max_de_questions_a_poser) {
                if(note_d_evaluation <  moyenne_d_evaluation) alert( "ߛߍ߬ߦߵߊ߬ ߡߊ߬" ); 
                if(note_d_evaluation >= moyenne_d_evaluation) {
                    if(phase_class == "apprises") {alert("ߦߙߐ ߢߌ߲߬ ߞߍߣߍ߲߫ ߞߘߐ ߟߋ߬"); return false;}
                   
                    let phase_nbr = JSON.parse(sessionStorage.getItem('data_phase_nbr'));
                    sendEvaluationToDB();
                    changerPhaseActive(index_phase_active);
                    sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr));
                    
                    
                    if(index_phase_active === total_phase) {
                        sessionStorage.setItem('niveau_max',JSON.stringify(niveau_max+1));                                            
                        sessionStorage.setItem('niveau_actif',JSON.stringify(niveau_max+2));
                        sessionStorage.setItem('phase_nbr',JSON.stringify(0));
                    }
                }
                
                    
                function sendEvaluationToDB() {
                   
                    let matiere = JSON.parse(sessionStorage.getItem('matiere_active')); // Voir programmes.js fonction storagesDuProgramme()
                    let phase   = JSON.parse(sessionStorage.getItem('phase'));  // Voir lessons.js fonction phaseActiveName()
                    let lesson  = JSON.stringify(evaluation_a_stocker);
                            
                        
                    const evaluation_data = new URLSearchParams({
                        id     : id,
                        matiere: matiere,
                        niveau : niveau_actif,
                        phase  : phase,
                        lesson : lesson,
                        note   : note_d_evaluation
                    });
           
                    fetch("/kouroukan/pages/actions.php", {
                        method: "POST",
                        body: evaluation_data 
                    })
                    .then(response =>  response.text())
                    .catch(error => console.log(error));
                }
            }
        });
        $('#fermer_evaluation').on('click', function() {
            (location.replace("/kouroukan/pages/programmes.php"))();
        });
    }
}