function exercices() {
       
    var lesson_active = 'exercice';
    sessionStorage.setItem('lesson_active', JSON.stringify(lesson_active));
    var nom = JSON.parse(sessionStorage.getItem('nom'));
    var prenom = JSON.parse(sessionStorage.getItem('prenom'));
    var id = JSON.parse(sessionStorage.getItem('id'));
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
    let phase_id = JSON.parse(sessionStorage.getItem('phase_id'));
    var nbr_de_questionnaires = 20;
    var exercice_questions = [];
    var moyenne_d_exercice = 18;
    var note = 0;

    var question_posee = '', reponse_montree = ''; 
    var compteur_de_question = 1;
    var question_rang = '߭';
    var exercice_a_stocker = [];
   

    $('.fermeture').attr('id', 'fermer_exercice');
    reductionDesElementsDeExerciceCouranteA49(); // Réduction du nombre de questions à une quantité raisonable

    switch(niveau_actif) {
        case 1 : exercerAlphabet(); break;
        case 2 : exercerSyllabe(); break;
        case 3 : exercerTon(); break;
        case 4 : exercerChiffre(); break;
    }

    $('.resultat_container').css('display','none');
         
    function exercerAlphabet() {

        chargerExerciceAlphabet();
        afficheExerciceAlphabet();
        exercerAlphabetNko();
        enregistrerExerciceAlphabet();
        progressBarrExerciceAlphabet();
        stockerExerciceAlphabet();
        assistantExerciceAlphabet();
        finDExercice();


        function chargerExerciceAlphabet() {
            // Voir fonctions chargerLesson() / chargementDeLesson() dans parametrageDeLesson.js
        }
        function afficheExerciceAlphabet() {

            afficherCourse($('#pre_exercice'));
            actualiserDialogueBtn();
            initialiserProgressBar('exercice');
            zoomDown($('#exercice_dialogue_btn'));

            $('.progress_bar').css({'display':'block', 'z-index':0});
            $('#exercice_dialogue_btn').css({'display':'block', 'z-index':1, 'background-color':'transparent'});
            $('#exercice_dialogue_btn > div:nth-child(1)').css('display','block');
            $('#exercice_dialogue_btn > div:nth-child(2)').css('display','none');
        
            setTimeout(() => { zoomUp($('#exercice_dialogue_btn')); }, 600);



            // gestionDeExerciceDialogueBtns();

            function actualiserDialogueBtn(){ 
                $('.qtite_question').html(parseIntNko(nbr_de_questionnaires));
                $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
            }
        }
        function exercerAlphabetNko() {
            
            var i=0;

            poserExerciceAlphabetQuestion();
            repeterExerciceAlphabetQuestion();
            repondreExerciceAlphabetQuestion();
            
            function poserExerciceAlphabetQuestion(){
                montrer($('#exercice_dialogue_btn'));
                $('.play_icon_container').on('click',function() {
        
                    zoomDown($('#exercice_dialogue_btn'));
                    setTimeout(() => { zoomUp($('#exercice_dialogue_btn')); }, 200);
        
                
                    $('#question_rang').html(parseIntNko(compteur_de_question)+question_rang);

                    compteur_de_question++;
                    question_rang = '߲';

                    $('.ecouter_question').html(' ߠߊߡߍ߲߫');
                    $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
                    question_posee = exercice_questions[i];
                    
                    // alert( question_posee ); 
    
                    $(this).css('display','none');
                    $('.oreille_icon_container').css('display','block');
                    
                    lireQuestion();
                    i++;
                    
                    function lireQuestion() { lire('alphabet',question_posee); }
                });
            }
            function repeterExerciceAlphabetQuestion(){ 
                $('.oreille_icon_container').on('click', function() { lire('alphabet',question_posee); }); 
            }
            function repondreExerciceAlphabetQuestion(){
                        
                $('#exercice .table_muette').on('click', function(e) {
                    
                    if(question_posee == '') { rappel($('#exercice_dialogue_btn')); return; }
        
                    zoomDown($('#exercice_dialogue_btn'));
                    setTimeout(() => { zoomUp($('#exercice_dialogue_btn')); }, 200);
                      
                    let td = $(e.target);
                    let bonne_reponse = question_posee;

                    reponse_montree = td.html();
                    point = (question_posee == reponse_montree) ? 1 : 0;
                                        
                    if(question_posee != reponse_montree){ barrer(td); clignotage(bonne_reponse); }
                    if(question_posee == reponse_montree){ valider(td); }
                    
                    question_posee = '';    /* Vider la variable question_posee. */
                    initialiserExerciceDialogueBtn();
                });
            }
        }
        function enregistrerExerciceAlphabet() {
            var td = $('#exercice .table_muette td');
            var exercice_counter = 0;

            initialiserExerciceAStocker();
            actualiserExerciceAStocker();
            
            function initialiserExerciceAStocker() {
                for(var i=0;i<nbr_de_questionnaires;i++){
                                
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
                        var p = (q==r) ? 1:0;
                        var question_reponse = [q,r,p];
                        
                        exercice_a_stocker.splice(exercice_counter,1,question_reponse);
                        
                        exercice_counter++;
                    });
                });
            }
        }
        function progressBarrExerciceAlphabet() {
            let question_counter = 0;
            let good_response_counter = 0;
            let progress_unity = 100/nbr_de_questionnaires;
            
            zoomUp($('#exercice_progress_bar'));

            $('#exercice .table_muette td').one('click', function(){
                
                let question_posee = exercice_questions[question_counter];
                let reponse_montree = $(this).text();
                actualiserLessonProgressBar();
                question_counter++;

                function actualiserLessonProgressBar(){
                    let bar_width = (question_counter+1)*progress_unity;
            
                    $('.progress_mauvaise_reponse_bar').css('width', bar_width+'%');
                    if(question_posee == reponse_montree) { 
                        good_response_counter++;
                        let good_response_width = good_response_counter*progress_unity;
                        $('.progress_bonne_reponse_bar').css('width', good_response_width+'%');
                    }
                }
            });
        }
        function stockerExerciceAlphabet() {  
            $('#exercice .table_muette td').on('click', function() {
                if(compteur_de_question - 1 == nbr_de_questionnaires){
                    let index_phase_active = $('#'+phase_id).index();
                    
                    note = noterExercice();
        
                    if(note <  moyenne_d_exercice) alert( "ߌ ߟߊ߫ ߓߍ߬ߙߍ߫ ߛߐ߬ߘߐ߲߬ߣߍ߲ ߡߎ߬ߡߍ ߦߋ߫ "+parseIntNko(note)+" ߟߋ߬ ߘߌ߫\n ߊ߬ ߡߊ߫ "+parseIntNko(moyenne_d_exercice)+" ߖߘߍ߬ ߓߐ߫ \n\n ߏ߬ߘߐ߬ ߛߍ߬ߦߌ߬ ߦߙߐ ߢߌ߲߬ ߡߊ߫." ); 
                    if(note >= moyenne_d_exercice) { 
                        sendLessonDataToDB(phase_id,exercice_a_stocker); 
                        changerPhaseActive(index_phase_active); 
                        initialiserProgressBarr();
                        console.log("Les données de exercice_alphabet sont envoyées à la base de données");
                    }
                
                    function noterExercice() {
                        var note_d_exercice = 0;
                        
                        for (var i = 0; i < nbr_de_questionnaires; i++) {
                        if(exercice_a_stocker[i] !== undefined) {
                            if(exercice_a_stocker[i][2] == 1) {
                                note_d_exercice ++;
                            }
                        }}

                        var note = Math.floor((note_d_exercice*20)/nbr_de_questionnaires);
                        return note;
                    }  
                }
            });
        }
        function assistantExerciceAlphabet() {
            $('.notification_titre').text('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
            
            ecrire('notification_corps','\
                ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬߸ߦߋ߫ ߛߓߍߘߋ߲߫ ߟߊߡߍ߲ߣߍ߲ ߦߌ߬ߘߊ߬߸ ߤߊ߲߯ ߡߊ߬ߞߟߏ߬ߟߌ ߦߋ߫ ߓߊ߲߫.\
            ');

            if(compteur_de_question - 1 == nbr_de_questionnaires){ indexer($('#fermer_exercice')); }
        }
        function finDExercice() {
            $('#exercice .table_muette td').on('click', function() {
                if(compteur_de_question - 1 == nbr_de_questionnaires){

                    $('#exercices_player').html('ߡߊ߬ߞߟߏ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
                    $('#exercices_player').off('click');
                    exerciceResultat();
                    repriseDeExercice();
                    passageAAlphabetEvaluation();
                    indexer($('#fermer_exercice'));

                    $('.resultat_container').css('display','block');
                    setTimeout(() => { masquerCourse($('#exercice')); }, 200);

                    function exerciceResultat() {

                        chargerResultat(exercice_a_stocker);
                        afficherExerciceAlphabetResultat();
                        masquerExerciceAlphabetResultat();

                        
                        function afficherExerciceAlphabetResultat() { 
                            goDown($('.resultat_container')); 
                            setTimeout(() => {
                                masquerCourse($('#exercice'));
                                initialiserExerciceDialogueBtn();
                                initialiserProgressBar('exercice');
                            }, 200);
                        }
                        function masquerExerciceAlphabetResultat() {
                            $('#exercice #fermer_resultat').click(function() {
                                goUp($('.resultat_container'));
                                setTimeout(() => { $('#envelope').css('display','none'); }, 200);
                            });
                        }
                    }
                    function repriseDeExercice() {
                        $('#reprendre').click(function() {
                            setTimeout(() => {
                                $('#envelope').css('display','none');
                                afficherCourse($('#exercice'));
                                exercerAlphabet();
                            }, 100);
                        });
                    }
                    function passageAAlphabetEvaluation() {
                        $('#avance').click(function() {
                            $('#envelope').css('display','none');
                            initialiserProgressBar('exercice');
                            $('#alphabet_evaluation').click();
                        });
                    }
                 }
            });
        }
        function initialiserExerciceDialogueBtn() {
            $('.oreille_icon_container').css('display','none');
            $('.play_icon_container').css('display','block');
        }
    }
    function exercerSyllabe() {}
    function exercerTon() {}
    function exercerChiffre() {}
    function reductionDesElementsDeExerciceCouranteA49() {

        if($('#exercice .table_muette tr').length >= 6) {
            for( var i = $('#exercice .table_muette tr').length-1; i > 6; i--) {
                document.querySelector('#exercice .table_muette').deleteRow(i);
            }
            $.each($('#exercice .table_muette tr td'), function() {
                exercice_questions.push($(this).html());
            });
        }
        if($('#exercice .table_muette tr').length < 6) {
            $.each($('#exercice .table_muette tr td'), function() {
                exercice_questions.push($(this).html());
            });
        }            
        
        exercice_questions = malaxer(exercice_questions);
    }
}