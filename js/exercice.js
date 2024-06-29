function exercices() {
       
    var prenom = JSON.parse(sessionStorage.getItem('prenom'));
    var id = JSON.parse(sessionStorage.getItem('id'));
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
    var nbr_de_questionnaires = 20;
    var exercice_questions = [];
    var moyenne_d_exercice = 18;
    var note = 0;

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

    $('#exercice .resultat_container').css('display','none');
         
    function exercerAlphabet() {

        chargerExerciceAlphabet();
        afficheExerciceAlphabet();
        exercerAlphabet();
        enregistrerExerciceAlphabet();
        progressBarrExerciceAlphabet();
        stockerExerciceAlphabet();
        assistantExerciceAlphabet();
        finDExercice();


        function chargerExerciceAlphabet() {
            // Voir fonctions chargerLesson() / chargementDeLesson() dans parametrageDeLesson.js
        }
        function afficheExerciceAlphabet() {
            actualiserDialogueBtn();
            gestionDeExerciceDialogueBtns();

            function actualiserDialogueBtn(){ 
                $('.qtite_question').html(parseIntNko(nbr_de_questionnaires));
                $('.ordre_question').html(parseIntNko(compteur_de_question)+question_rang);
            }
        }
        function exercerAlphabet() {
            
            var i=0;
            var question_posee = '', reponse_montree = ''; 

            poserExerciceAlphabetQuestion();
            repeterExerciceAlphabetQuestion();
            repondreExerciceAlphabetQuestion();
            
            function poserExerciceAlphabetQuestion(){
                montrer($('#exercice_dialogue_btn'));
                $('.play_icon_container').on('click',function() {
                
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
                    if(question_posee=='') { rappel($('.dialogue_btn')); }
                    else
                    {   
                        let td = $(e.target);
                        let bonne_reponse = question_posee;

                        reponse_montree = td.html();
                        point = (question_posee==reponse_montree)?1:0;
                                            
                        if(question_posee != reponse_montree){ barrer(td); clignotage(bonne_reponse); }
                        if(question_posee == reponse_montree){ valider(td); }
                        
                        question_posee = '';    /* Vider la variable question_posee. */
                        
                        $('.oreille_icon_container').css('display','none');
                        $('.play_icon_container').css('display','block');
                    }
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
                        var p = (q==r) ? "߁":"߀";
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
            $('#fermer_exercice').one('click',function(){ 
                let index_phase_active = $('.phases_container ul li .active').index();
                
                note = noterExercice();
    
                if(note <  moyenne_d_exercice) alert( "ߌ ߟߊ߫ ߓߍ߬ߙߍ߫ ߛߐ߬ߘߐ߲߬ߣߍ߲ ߡߎ߬ߡߍ ߦߋ߫ "+parseIntNko(note)+" ߟߋ߬ ߘߌ߫\n ߊ߬ ߡߊ߫ "+parseIntNko(moyenne_d_exercice)+" ߖߘߍ߬ ߓߐ߫ \n\n ߏ߬ߘߐ߬ ߛߍ߬ߦߌ߬ ߦߙߐ ߢߌ߲߬ ߡߊ߫." ); 
                if(note >= moyenne_d_exercice) { 
                    sendExerciceToDB(); 
                    changerPhaseActive(index_phase_active); 
                    initialiserProgressBarr();
                }
            
                function noterExercice() {
                    var note_d_exercice = 0;
                    
                    for (var i = 0; i < nbr_de_questionnaires; i++) {
                    if(exercice_a_stocker[i] !== undefined) {
                        if(exercice_a_stocker[i][2] == "߁") {
                            note_d_exercice ++;
                        }
                    }}

                    var note = Math.floor((note_d_exercice*20)/nbr_de_questionnaires);
                    return note;
                }                                
                function sendExerciceToDB() {

                    let matiere = JSON.parse(sessionStorage.getItem('matiere_active')); // Voir programmes.js fonction storagesDuProgramme() 
                    let phase   = JSON.parse(sessionStorage.getItem('phase'));  // Voir lessons.js fonction phaseActiveName()  
                    let lesson  = JSON.stringify(exercice_a_stocker);
                                                                
                    const exercice_data = new URLSearchParams({
                        id     : id,
                        matiere: matiere,
                        niveau : niveau_actif,
                        phase  : phase,
                        lesson : lesson,
                        note   : note
                    });

                    fetch("/kouroukan/php/actions.php", {
                        method: "POST",
                        body: exercice_data 
                    })
                    .then(response => response.text())
                    .catch(error => console.log(error));

                    console.log("Les données de exercice sont envoyées à la base de données");
                }
            });
        }
        function assistantExerciceAlphabet() {
            $('.notification_titre').text('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ');
            
            ecrire('notification_corps','\
                ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߞߘߎ ߘߌ߲߯ ߘߎ߭ߡߊ߬߸ ߦߴߌ ߕߟߏߡߊߟߐ߬߸ߦߋ߫ ߛߓߍߘߋ߲߫ ߟߊߡߍ߲ߣߍ߲ ߦߌ߬ߘߊ߬߸ ߤߊ߲߯ ߡߊ߬ߞߟߏ߬ߟߌ ߦߋ߫ ߓߊ߲߫.\
            ');

            if(compteur_de_question - 1 == nbr_de_questionnaires){
                
                indexer($('#fermer_exercice'));
            }
        }
        function finDExercice() {
            $('#exercice .table_muette td').on('click', function() {

                // if(compteur_de_question - 1 == nbr_de_questionnaires){
                if(compteur_de_question == 2){

                    $('#exercices_player').html('ߡߊ߬ߞߟߏ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
                    $('#exercices_player').off('click');
                    exerciceResultat();
                    repriseDeExercice();
                    passageARevivsion();
                    indexer($('#fermer_exercice'));

                    $('#exercice .resultat_container').css('display','block');

                    function exerciceResultat() {

                        chargerExerciceAlphabetResultat();
                        afficherExerciceAlphabetResultat();

                        function chargerExerciceAlphabetResultat() {

                            chargerExerciceAlphabetResultatHead();
                            chargerExerciceAlphabetResultatBody();
                            chargerExerciceAlphabetResultatFoot();

                            
                            function chargerExerciceAlphabetResultatHead() {

                                let nom = JSON.parse(sessionStorage.getItem('nom'));
                                let d = new Date();
                                let an = d.getFullYear();
                                let lune = d.getMonth();
                                let date = d.getDate();
                                let jour = d.getDay();
                                let heure = d.getHours();
                                let minute = d.getMinutes();

                                $('#exercice #resultat_titre').text('ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߞߐߝߟߌ');
                                $('#exercice #etudiant').text(prenom+' '+nom);
                                $('#exercice #resultat_date').text(jours[jour-1]+' '+mois[lune]+' ߕߟߋ߬ '+parseIntNko(date)+' ߛߊ߲߭ '+parseIntNko(an));
                                $('#exercice #resultat_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                            }
                            function chargerExerciceAlphabetResultatBody() {

                                let table_body_html = tableBodyHTML();
                                let total_point = totalPoint();
                                        
                                $('#exercice #table_body').html(table_body_html);
                                $('#exercice #total_question_1').html(parseIntNko(exercice_a_stocker.length));
                                $('#exercice #total_reponse_1').html(parseIntNko(exercice_a_stocker.length));
                                $('#exercice #total_point_1').html(parseIntNko(total_point));

                                function tableBodyHTML() {
                                    let html = '';

                                    html +=  '<tr>';
                                    for(let j=0; j<exercice_a_stocker.length; j++) {
                                        html += '<td>'+parseIntNko(j+1)+'</td>';
                                    }
                                    html +=  '</tr>';

                                    html +=  '<tr>';
                                    for(let k=0; k<exercice_a_stocker.length; k++) {
                                        html += '<td>'+exercice_a_stocker[k][0]+'</td>';
                                    }
                                    html +=  '</tr>';

                                    html +=  '<tr>';
                                    for(let l=0; l<exercice_a_stocker.length; l++) {
                                        html += '<td>'+exercice_a_stocker[l][1]+'</td>';
                                    }
                                    html +=  '</tr>';

                                    html +=  '<tr>';
                                    for(let m=0; m<exercice_a_stocker.length; m++) {
                                        html += '<td>'+exercice_a_stocker[m][2]+'</td>';
                                    }
                                    html +=  '</tr>';

                                    return html;
                                }
                            }
                            function chargerExerciceAlphabetResultatFoot() {

                                let total_question = exercice_a_stocker.length;
                                let total_bonne_reponse = totalPoint();
                                let total_fausse_reponse = total_question - total_bonne_reponse;

                                $('#exercice #total_question_2').text(parseIntNko(total_question));
                                $('#exercice #total_bonne_reponse').text(parseIntNko(total_bonne_reponse));
                                $('#exercice #total_fausse_reponse').text(parseIntNko(total_fausse_reponse));
                                $('#exercice #total_point_2').text(parseIntNko(total_bonne_reponse));
                                $('#exercice #pourcentage_point').text('%'+parseIntNko(Math.floor(total_bonne_reponse*100/total_question)));

                                if(total_bonne_reponse < 1) {
                                    $('#exercice #deliberation').html('ߌ ߖߌߖߊ߬ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߓߍ߬ߙߍ ߡߊ߫ ߤߊߟߌ߬ ߁߈ ߓߐ߫. ߏ߬ߘߐ߬߸ ߌ ߞߐߛߍ߬ߦߌ߬ ߦߊ߲߬ ߡߊ߫.');
                                }else{
                                    $('#exercice #deliberation').html('ߌ ߞߎߟߎ߲ߖߋ߫ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ ߘߐ߬ߖߊ ߟߊ߫ ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߟߐ߲ ߠߊ߫ ߤߊ߲߯ '+$('#exercice #pourcentage_point').text()+' ߟߊ߫. ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߛߓߍߛߎ߲ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫.');
                                }
                            }
                            function totalPoint() {
                                let html = 0;

                                for(let i=0; i<exercice_a_stocker.length; i++) {
                                    html += reverseIntNko(exercice_a_stocker[i][2]);
                                }

                                return html;
                            }
                        }
                        function afficherExerciceAlphabetResultat() {
                            comeDown($('#exercice .resultat_container'));
                        }
                    }
                    function repriseDeExercice() {}
                    function passageARevivsion() {}
                 }
            });
        }
    }
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