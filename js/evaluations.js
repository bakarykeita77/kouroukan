
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
                    initialisationDEvaluationEntete();
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