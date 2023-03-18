function exercices() {
                
    var id = JSON.parse(sessionStorage.getItem('id')); 
    var exercice = $('#exercice');
    var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var phase_id = JSON.parse(sessionStorage.getItem('phase_id'));
    var quantite_de_question = JSON.parse(sessionStorage.getItem('quantite_de_question'));
    var exercice_questions = [];
    var moyenne_d_exercice = 1;
  	    
    var lesson_courante = lessonCourante();
    var compteur_de_question = 1;
    var question_rang = '߭';
    var exercice_a_stocker = [];
   
    $('.fermeture').attr('id', 'fermer_exercice');
     
    chargerExercice();
    afficherExercice();
    exercer();
    enregistrerExercice();
    stockerExercice();


    function lessonCourante() {
        var lesson_courante = [];
                 
        if(phase_id=='alphabet_exercice' ) { lesson_courante = alphabetExerciceHTML(); } // Voir alphabet.js
        if(phase_id=='syllabes_exercice' ) { lesson_courante = syllabesExerciceHTML(); } // Voir syllabes.js
        if(phase_id=='tons_exercice'     ) { lesson_courante = tonsExerciceHTML();     } // Voir tons.js
        if(phase_id=='chiffres_exercice' ) { lesson_courante = chiffresExerciceHTML(); } // Voir chiffres.js

        return lesson_courante;
    }
    function chargerExercice(){ 

        $('#exercice_foot').html( exerciceEnteteHTML() );
        $('#exercice_body').html( lesson_courante ); 
        reductionDesElementsDeLessonCouranteA49();
        
        function exerciceEnteteHTML(){
            var exercices_entete_html = "<div class='dialogue_btn' id='exercice_dialogue_btn'>";   
            exercices_entete_html += "<div class='play_icon_container' id='exercices_player'>";
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
            
            exercice_questions = malaxer(exercice_questions);
        }
    }
    function afficherExercice(){
        
        exercice.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
        setTimeout(function() { exercice.css({'transform':'scale(1)'});}, 5);
        setTimeout(function() { exercice.css({'opacity':'1'});}, 5);
    }
    function exercer(){
        
        var i=0;
        var question_posee, reponse_montree; 

        question_posee = '';
        poserExerciceQuestion();
        repondreExerciceQuestion();
        
        function poserExerciceQuestion(){
            $('#exercices_player').on('click',function() {
              
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
                
                function lireQuestion() {
                    $('#audio').attr({'src':'/kouroukan/son/mp3/'+question_posee+'.mp3', 'autoplay':'on'});
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
                { guiderAuQuestionBouton(); }
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

            function guiderAuQuestionBouton() {
                setTimeout(() => { $('.play_icon_container').css('box-shadow','none'); }, 100);
                setTimeout(() => { $('.play_icon_container').css('box-shadow','var(--shadow_30)'); }, 200);
                setTimeout(() => { $('.play_icon_container').css('box-shadow','none'); }, 300);
                setTimeout(() => { $('.play_icon_container').css('box-shadow','var(--shadow_30)'); }, 400);
                setTimeout(() => { $('.play_icon_container').css('box-shadow','none'); }, 500);
                setTimeout(() => { $('.play_icon_container').css('box-shadow','var(--shadow_30)'); }, 600);
                setTimeout(() => { $('.play_icon_container').css('box-shadow','none'); }, 700);
                setTimeout(() => { $('.play_icon_container').css('box-shadow','var(--shadow_30)'); }, 800);
                setTimeout(() => { $('.play_icon_container').css('box-shadow','none'); }, 900);
                setTimeout(() => { $('.play_icon_container').css('box-shadow','var(--shadow_16)'); }, 1000);
            }
        }
    }
    function enregistrerExercice(){
        
        var td = $('.table_muette td');
        var exercice_counter = 0;

        initialiserExerciceAStocker();
        actualiserExerciceAStocker();
        
        function initialiserExerciceAStocker() {
            for(var i=0;i<quantite_de_question;i++){
                            
                var q = exercice_questions[i];
                var r = '';
                var p = parseIntNko(0);
                            
                exercice_a_stocker[i] = [q,r,p];
            }
        }
        function actualiserExerciceAStocker() {
            $.each(td, function(){
                $(this).on('click', function(){
                        
                    var q = exercice_a_stocker[exercice_counter][0];
                    var r = $(this).html();
                    var p = (q==r) ? "߁":"߀";
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

            if(note <  moyenne_d_exercice) alert( "reprendre" ); 
            if(note >= moyenne_d_exercice) { 
                
                let nbr = JSON.parse(sessionStorage.getItem('nbr'));
                let phase_nbr = JSON.parse(sessionStorage.getItem('data_phase_nbr'));
  
                
                sendExerciceToDB(); 
                changerPhaseActive(phase_nbr); 
                initialiserProgressBarr();
            }
        
            function noterExercice() {
                var note_total = 0;
                
                for (var i = 0; i < quantite_de_question; i++) {
                    if(exercice_a_stocker[i][2] == "߁") {
                        note_total ++;
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

                fetch("/kouroukan/pages/actions.php", {
                    method: "POST",
                    body: exercice_data 
                })
                .then(response => response.text())
                .catch(error => console.log(error));
            }
        });
    }
}