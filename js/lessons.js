$('document').ready(function() {
      
    //Récupération des données, storées depuis accueil.js, sur l'apprenant  
        var datas = JSON.parse(sessionStorage.getItem('datas'));     
        var data_apprentissage_alphabet = JSON.parse(sessionStorage.getItem('data_apprentissage_alphabet'));     
        var lesson_d_apprentissage_alphabet_temporaire = JSON.parse(sessionStorage.getItem('lesson_d_apprentissage_alphabet_temporaire'));     
        var matiere_index = JSON.parse(sessionStorage.getItem('matiere_index'));
        var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
        var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
        var phases_etudiees = JSON.parse(sessionStorage.getItem('phases_etudiees'));
        var option_retenue = JSON.parse(localStorage.getItem('option_retenue')); 
        var lesson_d_apprentissage_alphabet = [];
        var rang = '';
        var phase_id = '';
        var phase_nom = '';
        var phase_index = 0;

        datas[matiere_index] = (datas[matiere_index] == undefined) ? [] : datas[matiere_index]; //Pour éviter les erreurs d'undefined.
        data_apprentissage_alphabet = (data_apprentissage_alphabet == null) ? [] : data_apprentissage_alphabet;
        data_apprentissage_alphabet = (datas[matiere_index].length === 0) ? data_apprentissage_alphabet : datas;
            
        phases_etudiees = (phases_etudiees == null) ? [] : phases_etudiees;                     
 
        sessionStorage.setItem('option_retenue', JSON.stringify(option_retenue));
 
        console.log("La variable datas est :");
        console.log(datas);
        console.log("Les phases étudiées sont : ");
        console.log(phases_etudiees);
        console.log('option_retenue = '+option_retenue);

    /*-------------------------------------------------------------------------------------------------------------------
       1)- La situation des études est faite par récupération et traitement des données reçues sur l'apprenant.
       2)- La liste des phases est établie en fonction du niveau d'étude de l'apprenant (selon les phases étudiées ou pas)
       3)- Le paramétrage conséquent est défini pour la leçon future.
       4)- Les phases s'affichent et
       5)- On peut surfer
   
    /*-----------------------------------------------------------------------------------------------------------------*/
    
        datas_length = (data_apprentissage_alphabet.length != 0) ? data_apprentissage_alphabet.length : 0;
        if(datas_length === 0) {  matiere_index = 0; niveau_en_cours = 1; }
    
    /*-----------------------------------------------------------------------------------------------------------------*/
        
        phases();
        matiere();
           
// localStorage.clear();

    /*-----------------------------------------------------------------------------------------------------------------*/
        
        function phases() {
          
            let all_options = JSON.parse(localStorage.getItem('all_options')); 
            let localOptionsLength = (all_options == null) ? 0 : all_options.length;
        
            chargerPhases();
            sessionStorage.setItem('total_phase', JSON.stringify($('#phases_list li').length));
            actualiserTitre();
            stylesDesPhases();
            afficherLesPhases();
            
                
            function chargerPhases() { 
                $('.phases_container').html(phasesHTML()); 

                function phasesHTML() {
                
                    var lesson_id = $('.lesson_title').attr('id');
                    lesson_id = $.trim(lesson_id);       
                    
                // Liste des phases
                    var content = '<ul class="phases" id="phases_list">';
                    if(matiere_index == 0) {
                        for(var i=0;i<2;i++){
                            phase_id = liste_de_phases[i][0];
                            phase_nom = liste_de_phases[i][1];
                        
                            content += '<li id="'+lesson_id+'_'+phase_id+'">'+phase_nom+'</li>';
                        }
                        for(var j=3;j<liste_de_phases.length;j++){
                            phase_id = liste_de_phases[j][0];
                            phase_nom = liste_de_phases[j][1];
                            
                            content += '<li id="'+lesson_id+'_'+phase_id+'">'+phase_nom+'</li>';
                        }
                    }
                    if(matiere_index > 0) {
                        for(var i=0;i<liste_de_phases.length;i++){
                            phase_id = liste_de_phases[i][0];
                            phase_nom = liste_de_phases[i][1];
                                
                            content += '<li id="'+lesson_id+'_'+phase_id+'">'+phase_nom+'</li>';
                        }
                    }
                    content += '</ul>';
                    
                    return content;
                }
            }
            function stylesDesPhases() {

                let lesson_status = lessonStatus();

                lesson = (data_apprentissage_alphabet.length === 0) ? [] : data_apprentissage_alphabet.lesson;

                $.each($('#phases_list li'), function() {
                    
                    let n = phases_etudiees.length;
                    let phase_index = $(this).index();
                       
                    if(lesson_status == "lesson_a_etudier") {
                        if(phase_index === 0) $(this).addClass('active');
                        if(phase_index  >  0) $(this).addClass('a_apprendre');
                    }
                    if(lesson_status == "lesson_en_cours") {
                        if(phase_index <= n-1) $(this).removeClass('active').addClass('apprises');
                        if(phase_index == n) $(this).removeClass('a_apprendre').addClass('active');
                        if(phase_index >= n+1) $(this).addClass('a_apprendre');
                    }
                    if(lesson_status == "lesson_etudie") $(this).addClass('apprises');
                    
                //Cas specifique de pratiques                    
                    if(localOptionsLength === 4) {
                        $('#syllabes_pratique, #tons_pratique, #chiffres_pratique').removeClass('active').addClass('apprises');
                    }
                });
            }
            function lessonStatus() {
                
                let li = $('#phases_list li');
                let indice = 0, ls = "";
                $.each(li, function() { 
                    let li_id = $(this).attr('id');
                    indice = ($.inArray(li_id, phases_etudiees) === -1) ? indice : indice+=1;
                });              
                
                if(indice === 0) ls = "lesson_a_etudier";
                if(indice === li.length) ls = "lesson_etudie";
                if(indice > 0 && indice < li.length) ls = "lesson_en_cours";
    
                return ls;
            }
            function actualiserTitre() {
                var niveau = $('.niveau_courant').text();
            
                rang = (niveau=='߁')?'߭':'߲';
                $('.rang').html(rang);
            }
            function afficherLesPhases() {

            /*
            Si l'option retenue est egal à 1, les phases ne s'affichent pas. L'étudiant est dirigé directement en classe ou il apprend 
            tout l'alphabet en une seule cours.
            Si l'option retenue est egal à 2, les phases s'affichent. L'étudiant apprend l'alphabet en differents cours.
            */
                if(option_retenue != null) {
                    if(option_retenue === 1) {
                        $('.direction').css('display','none');
                        $('.salle_de_classe').css('display','block');
                        alphabet();
                    }
                    if(option_retenue === 2) {
                        setTimeout(() => {
                            $('.direction').css('display','block');
                            $('.salle_de_classe').css('display','none');
                        });
                    }
                }

                setTimeout(() => { displayv($('#niveau_d_etude')); }, 100);
                setTimeout(() => { displayv($('.lesson_title')); }, 300);
                setTimeout(() => { displayv($('.phases_container')); }, 500);
                setTimeout(() => { displayv($('#travaux_container')); }, 700);
            } 
        }
        function matiere() {
            let matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom')); //Déterminé depuis storagesDuProgramme() dans programmes.js

            modificationDuChoixDApprentissage();

            if(option_retenue == 2 || option_retenue == null) {
                $('#phases_list li').on('click', function() {

                    phase_id = $(this).attr('id');
                    phase_nom = $(this).html();
                    phase_index = $(this).index();

                    var phase_class = $(this).attr('class');
                    var course_id = phase_id.split('_')[1];
                
                    sessionStorage.setItem('phase_class', JSON.stringify(phase_class));
                    sessionStorage.setItem('phase_id', JSON.stringify(phase_id));
                    sessionStorage.setItem('phase_nom', JSON.stringify(phase_nom));
                    sessionStorage.setItem('phase_index', JSON.stringify(phase_index));
                    sessionStorage.setItem("course_id", JSON.stringify(course_id));

                /*--------------------------------------------------------------------*/ 
                        
                    // if(phase_class == "apprises") {
                    //     if(phase_nom != 'ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ') {
                    //         console.log(matiere_nom+" "+phase_nom+" ߢߌ߲߬ ߞߍߣߍ߲߫ ߞߘߐ ߟߋ߬"); 
                    //         return false;
                    //     }
                    // }

                    switch(niveau_actif) {
                        case 1 : alphabet(); break;
                        case 2 : syllabe();  break;
                        case 3 : ton();      break;
                        case 4 : chiffre();  break;
                    }
                });
            }

            function modificationDuChoixDApprentissage() {

                affichageDeModificateurDeChoix();
                modificationDuChoix();

                function affichageDeModificateurDeChoix() {
                    $('.modificateur_de_choix_btn').click(() => {
                        console.log("Volonté de changer l'option d'apprentissage !");
                        if($('.modificateur_de_choix_message').css('display') == 'none') { 
                            afficher($('.modificateur_de_choix_message'));
                        }else{
                            masquer($('.modificateur_de_choix_message'));
                        }
                    });

                    $('#pas_changer_option_btn, #changer_option_btn').click(() => { masquer($('.modificateur_de_choix_message')); });   
                }
                function modificationDuChoix() {
                    $('.changer_option_btn').click(() => { 

                        $('.modification_alerte').css('display','block');
                        console.log("Volonté de changer l'option confirmée !\n\nAttention !\nLa lesson en cours sera annulée de façon irreversible.");

                        $('.modification_alerte span:nth-child(1)').click(() => { 
                            $('.modification_alerte').css('display','none'); 

                            datas = [];
                            data_apprentissage_alphabet = null;
                            lesson_d_apprentissage_alphabet = [];
                            lesson_d_apprentissage_alphabet_temporaire = null;
                            phases_etudiees = [];
                            phases_etudiees = [];

                            sessionStorage.setItem('datas', JSON.stringify(datas));
                            sessionStorage.setItem('data_apprentissage_alphabet', JSON.stringify(data_apprentissage_alphabet));
                            sessionStorage.setItem('lesson_d_apprentissage_alphabet', JSON.stringify(lesson_d_apprentissage_alphabet));
                            sessionStorage.setItem('lesson_d_apprentissage_alphabet_temporaire', JSON.stringify(lesson_d_apprentissage_alphabet_temporaire));
                            sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees));
                            sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees));

                            location.assign('programmes.php?changer=option');
                        });
                        $('.modification_alerte span:nth-child(2)').click(() => { 
                            $('.modification_alerte, .modificateur_de_choix_message').css('display','none');
                            console.log("Volonté de changer l'option annulée !");
                        });

                    });
                }
            }
        }
    });