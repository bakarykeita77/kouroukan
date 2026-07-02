$('document').ready(function() {
    
 /* Récupération des données, storées depuis accueil.js, sur l'apprenant */
    let id_client = JSON.parse(sessionStorage.getItem("id_client"));
    let datas = JSON.parse(sessionStorage.getItem("datas"));
    
    datas = (datas == undefined) ? [[],[],[],[]] : datas;
   
    var data_alphabet = datas[0];         
    var matiere_index = parseInt($("#matiere_index_container").text());
    var matiere_nom = $("#matiere_nom_container").text();
    var niveau = parseInt($("#niveau_container").text());
    var phases_etudiees = phasesEtudieesDuServeur(datas);
    let phase_id = phaseId();

    sessionStorage.setItem('matiere_index', JSON.stringify(matiere_index)); 
    sessionStorage.setItem('matiere_nom', JSON.stringify(matiere_nom)); 
    sessionStorage.setItem('niveau', JSON.stringify(niveau)); 
    sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees));
    sessionStorage.setItem('phase_id', JSON.stringify(phase_id));
    
    var rang = "";
    var phase_li_id = phaseLiId();
    var phase_nom = "";
    var option_retenue = JSON.parse(localStorage.getItem("option_retenue"));
    
    
    datas[matiere_index] = (datas[matiere_index] == undefined) ? [] : datas[matiere_index]; /* Pour éviter les erreurs d'undefined. */
    
    /*-------------------------------------------------------------------------------------------------------------------
    1)- La situation des études est faite par récupération et traitement des données reçues sur l'apprenant.
    2)- La liste des phases est établie en fonction du niveau d'étude de l'apprenant (selon les phases étudiées ou pas)
    3)- Le paramétrage conséquent est défini pour la leçon future.
    4)- Les phases s'affichent
    /*-----------------------------------------------------------------------------------------------------------------*/
    
    let datas_length = (data_alphabet.length != 0) ? data_alphabet.length : 0;
    if(datas_length === 0) matiere_index = 0;
    
    /*-----------------------------------------------------------------------------------------------------------------*/
    
    phases();
    matiere();
        
    // localStorage.clear();
    
    /*-----------------------------------------------------------------------------------------------------------------*/
    
    function phaseId() { 
        let phase_id = "";
        if(datas[niveau-1].length === 0) {
            switch (niveau) {
                case 1: phase_id = "alphabet_apprentissage"; break;
                case 2: phase_id = "syllabes_apprentissage"; break;
                case 3: phase_id = "tons_apprentissage"; break;
                case 4: phase_id = "chiffres_apprentissage"; break;
            }
        }
        if(datas[niveau-1].length != 0) {
            phase_id = datas[niveau-1][datas[niveau-1].length-1].phase;
        }
        return phase_id; 
    }
    function phaseLiId() {
        let pli = "";
        
        if(matiere_index === 0) {
            switch(phases_etudiees.length) {
                case 0 : pli = "alphabet_apprentissage"; break;
                case 1 : pli = "alphabet_exercice"; break;
                case 2 : pli = "alphabet_evaluation"; break; 
            } 
        }
        
        return pli;
    }
    function phases() {
        if(matiere_nom == "ߛߓߍߛߎ߲") {
        
            let all_options = JSON.parse(localStorage.getItem('all_options')); 
            let localOptionsLength = (all_options == null) ? 0 : all_options.length;
        
            chargerPhases();
            actualiserTitre();
            stylesDesPhases();
            afficherLesPhases();
            
                
            function chargerPhases() { 
    
                $('.phases_container').html(phasesHTML());
    
                function phasesHTML() {
                
                    var lesson_id = $('.lesson_title').attr('id');
                    lesson_id = $.trim(lesson_id);       
                    
                    /* Liste des phases */
                    var content = '<ul class="phases" id="phases_list">';
                    let phase = "";
    
                    if(matiere_index == 0) {
                        for(var i=0;i<2;i++) {
    
                            phase = liste_de_phases[i][0];
                            phase_nom = liste_de_phases[i][1];
                            phase_li_id = lesson_id+'_'+phase;
                    
                            content += '<li id="'+phase_li_id+'">'+phase_nom+'</li>';
                        }
                        for(var j=3;j<liste_de_phases.length;j++){
                            phase = liste_de_phases[j][0];
                            phase_nom = liste_de_phases[j][1];
                            phase_li_id = lesson_id+'_'+phase;
                            
                            content += '<li id="'+phase_li_id+'">'+phase_nom+'</li>';
                        }
                    }
                    if(matiere_index > 0) {
                        for(var i=0;i<liste_de_phases.length;i++){
                            phase = liste_de_phases[i][0];
                            phase_nom = liste_de_phases[i][1];
                            phase_li_id = lesson_id+'_'+phase;
                                
                            content += '<li id="'+phase_li_id+'">'+phase_nom+'</li>';
                        }
                    }
                    content += '</ul>';
                    
                    return content;
                }
            }
            function stylesDesPhases() {
    
                let lesson_status = lessonStatus();
        
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
                    
                    /*Cas specifique de pratiques */                   
                    if(localOptionsLength === 4) {
                        $('#syllabes_pratique, #tons_pratique, #chiffres_pratique').removeClass('active').addClass('apprises');
                    }
                });
            }
            function lessonStatus() {
                
                let li = $('#phases_list li');
                let indice = 0, ls = "";
                $.each(li, function() { 
                    let phase_li_id = $(this).attr('id');
                    indice = ($.inArray(phase_li_id, phases_etudiees) === -1) ? indice : indice+=1;
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
                if(option_retenue == null) {
                    $('.direction').css('display','block');
                    $('.salle_de_classe').css('display','none');
                }
                if(option_retenue != null) {
                    if(option_retenue === 1) {
                        $('.direction').css('display','none');
                        $('.salle_de_classe').css('display','block');
                    }
                    if(option_retenue === 2) {
                        $('.direction').css('display','block');
                        $('.salle_de_classe').css('display','none');
    
                        displayv($('#niveau_d_etude'));
                        displayv($('.lesson_title'));
                        displayv($('.phases_container'));
                        displayv($('#travaux_container'));
                    }
                }
            }
        }
    }
    function matiere() {
    
        etudeDesMatieres();
        modificationDuChoixDApprentissage();
        
        function etudeDesMatieres() {
            switch(niveau) {
                case 1 : if(datas[0].length < 3) alphabet(); break;
                case 2 : if(datas[1].length < 3) syllabes();  break;
                case 3 : if(datas[2].length < 3) ton();      break;
                case 4 : if(datas[3].length < 3) chiffre();  break;
            }
        }
        function modificationDuChoixDApprentissage() {
            if(matiere_nom == "ߛߓߍߛߎ߲") {
                affichageDeModificateurDeChoix();
                modificationDuChoix();
    
                function affichageDeModificateurDeChoix() {
                    $(".modificateur_de_choix").css("display","inline-block");
                    $('.modificateur_de_choix_btn').click(() => {
                        console.log("Volonté de changer l'option d'apprentissage !");
                        afficher($('.modificateur_de_choix_message'));
                    });
    
                    $('.pas_changer_option_btn, .changer_option_btn').click(() => { masquer($('.modificateur_de_choix_message')); });   
                }
                function modificationDuChoix() {
    
                    modifierLeChoix();
                    annulerLeChoix();
    
                    function modifierLeChoix() {
                        $('.changer_option_btn').click(() => { 
    
                            if(datas[0].length === 0) {
                                annulerApprentissageEnCours();
                                location.assign('programmes.php'); 
                            }else{
                                $('.modification_alerte').css('display','block');
                                $('.modification_alerte span:nth-child(1)').click(() => { 
                                    annulerApprentissageEnCours();
                                    location.assign('programmes.php'); 
                                });
                                $('.modification_alerte span:nth-child(2)').click(() => { 
                                    $('.modification_alerte').css('display','none');
                                    console.log("Non ! N'ennuler pas.");
                                });
                            }
                    
                            function annulerApprentissageEnCours() {
    
                                let matiere = "alphabet";
                                let id_client =  parseInt(JSON.parse(sessionStorage.getItem('id_client')));
                                let action = "supprimer_matiere_en_cours";
                
                                sendDataToDeleteLesson(matiere,id_client,action);
                                localStorage.clear();
                                console.log('La lesson en cours est annulée');
                    
                                function sendDataToDeleteLesson(matiere,id_client,action) {
                    
                                    const data_to_send = new URLSearchParams({
                                        matiere: matiere,
                                        id_client : id_client,
                                        action : action
                                    }); 
        
                                    fetch("../php/actions.php", {
                                        method: "POST",
                                        body: data_to_send
                                    })
                                    .then(response => response.text())
                                    .catch(error => console.log(error));  
                                }
                            }
                        });
                    }
                    function annulerLeChoix() {
                        $('.pas_changer_option_btn').click(() => { 
                            $('.modification_alerte, .modificateur_de_choix_message').css('display','none');
                            console.log("Volonté de changer l'option annulée !");
                        });
                    }
                }
            }
        }
    }
});