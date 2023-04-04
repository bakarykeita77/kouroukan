function evaluations() {
        
    var id = JSON.parse(sessionStorage.getItem('id')); 
    var evaluation = $('#evaluation');
    var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var total_phase = $('.phases li').lenth;
    var phase_class = JSON.parse(sessionStorage.getItem('phase_class'));

    var syllabes = syllab();
    var nbr_max_de_questions_a_poser = 20;
    var questions_evaluation = questions();
    var question_evaluation = '', questions_a_evaluer = [], reponse_evaluation = [];
    var note_d_evaluation = 0;
    var moyenne_d_evaluation = 18;
    var compteur = incrementer();
    var evaluation_counter = 0;
    
    var memoire_rang = [], memoire_question = [], memoire_reponse = [], memoire_vraie_reponse = [];
    var memoire_point = [], memoire_point_total = [];
     
    var q_index = 0, q_rang = '߭';
    var q_ordre = parseIntNko(q_index+1);
    var evaluation_a_stocker = [];

    var evaluation_fiche_body = $('#evaluation_fiche_body');
    var fiche_body_html = evaluation_fiche_body.html();

    $('#pratique_options').css('display','none');
     
    $('.fermeture').attr('id', 'fermer_evaluation');

    afficherCourse(evaluation);
    initialiserEvaluation();
    evaluer();
    correctionEvaluation();
    stockerEvaluation();

    function questions() {
        var lq = '';
        
        if(niveau_en_cours==1) lq = malaxer(lettres);
        if(niveau_en_cours==2) lq = malaxer(syllabes);
        if(niveau_en_cours==3) lq = malaxer(syllabes_tonifies);
        if(niveau_en_cours==4) lq = malaxer(chiffres);
        
        return lq;
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

        var reponse_font_size = $('#evaluation_reponse').height()/2;
        $('#evaluation_reponse').css('font-size',reponse_font_size+'px');
                        
        poserQuestionEvaluation();
        repeterQuestionEvaluation();
        repondreEvaluation();
        
        
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
        function repeterQuestionEvaluation(){
            $('.repetition_btn').on('click', function(){
                $('#audio').attr({'src':'/kouroukan/son/mp3/'+question_evaluation+'.mp3', 'autoplay':'on'});
            });
        }
        function repondreEvaluation(){
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
    }
    function correctionEvaluation(){
        $('.correction_btn').on('click', function(){
             
            corrigerEvaluation();
            actualiserEvaluationProgressBar();
            effacer();
            afficherQuestionButton();
            finDEvaluation();
            
            evaluation_counter++;
            
            
            function corrigerEvaluation(){
                
                let q = question_evaluation;
                let r = reponse_evaluation.join('');
                let p = (q == r) ? 1:0;
                let question_reponse = [q,r,p];
               
                note_d_evaluation += p; 
                evaluation_a_stocker.splice(evaluation_counter,1,question_reponse);
                chargerEvaluationFicheBody();
                chargerEvaluationFicheFoot();
                marquerReponseEvaluation(); 
                defilementDeEvaluationFicheVersLeHaut();


                function chargerEvaluationFicheBody() {
                    if(q == r) fiche_body_html += "<div class='tr'>\n <span class='affiche_question'>"+q+"</span>\n<span class='affiche_reponse'><span id='fiche_vraie_reponse'>"+r+"</span></span>\n<span class='affiche_point'>"+parseIntNko(p)+"</span>\n </div>\n\n";
                    if(q != r) fiche_body_html += "<div class='tr'>\n <span class='affiche_question'>"+q+"</span>\n<span class='affiche_reponse'><span id='fiche_mauvaise_reponse'>"+r+"</span><span id='fiche_croix'>&#10060;</span></span>\n<span class='affiche_point'>"+parseIntNko(p)+"</span>\n </div>\n\n";
                 
                    evaluation_fiche_body.html(fiche_body_html);
                    afficherLaDerniereLigne();
                    
                    function afficherLaDerniereLigne() {
                        $('#evaluation_fiche_body .tr:last-child').css({
                            'height':0,
                            'overflow':'hidden',
                            'transition':'height 0.6s ease-out'
                        });

                        $('.tr:last-child').css({'height':'2rem'});
                    }
                }
                function chargerEvaluationFicheFoot() {
                    $('#total_point_d_evaluation').html(parseIntNko(nbr_max_de_questions_a_poser)+'/'+parseIntNko(note_d_evaluation));
                    $('#pourcentage_point_d_evaluation').html('%'+parseIntNko(Math.floor((note_d_evaluation/nbr_max_de_questions_a_poser)*100)));
                }                                    
                function marquerReponseEvaluation() {    
                    if(reponse_evaluation.join('') == question_evaluation) {
                      
                        $('#check_mark_container').css('display','block');
                        $('#check_mark_cover').css({'left':0});
                        $('#check_mark').html("&#10003;"); 
                        setTimeout(function(){ $('#check_mark_cover').css({'left':'-100%'}); },100);
                        setTimeout(function(){ $('#check_mark_container').css({'display':'none'}); },2500);
                    }else{
                        $("#evaluation_reponse").html(reponse_evaluation.join('')+"<span id='evaluation_cross'>&#10060;</span>");
                        $('#evaluation_cross').css({'display':'block', 'transform':'scale(0.5)', 'opacity':0});
                        setTimeout(function(){ $('#evaluation_cross').css({'transform':'scale(1)', 'opacity':0.75}); }, 100);
                    }
                } 
                function defilementDeEvaluationFicheVersLeHaut() {
                    $('#evaluation_fiche_body').animate({ scrollTop:$('#evaluation_fiche_body')[0].scrollHeight }, 1000);
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
            function effacer(){
                setTimeout(function(){
                    question_evaluation = '';
                    reponse_evaluation.splice(0,reponse_evaluation.length);
                    $('#reponse').html(reponse_evaluation);
                    $('#check_mark').empty();
                },2500);
            }
            function afficherQuestionButton(){
                $('.correction_btn').css('display','none');
                $('.question_btn').css('display','block');
                $('.repetition_btn').css('display','none');
            }
            function finDEvaluation() {
                if(q_index==nbr_max_de_questions_a_poser){
                    $('.question_btn').off('click');
                    $('.question_btn').html('ߞߘߐߓߐߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
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
                        note_d_evaluation   : JSON.stringify(note_d_evaluation)
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