function pratique() {
                       
    let niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var id = JSON.parse(sessionStorage.getItem('id'));

    var data_options_nbr = JSON.parse(sessionStorage.getItem('data_options_nbr'));
    var option = '';
    var option_index = null;
    var option_active = '';
    var option_active_name = '';
    var nbr_option_vide = '';
    var nbr_option_non_vide = '';
    let all_options = [], DB_options = '', local_options = '';
    let total_option = $('#pratique_options span').length;
    
    var compteur_de_question_d_option = 1;
    var compteur = 0;
    var compteur_de_caractere = 0;
    var bulle_index = -1;
    var s_0 = [], s_1 = [], s_2 = [], s_3 = [], sc = [];
    
    var memoire_pratique  = [];
    var memoire_pratiques = [];

    var syllabes_1_total = monoSyllabesTotal();
    var syllabes_2_total = biSyllabesTotal();
    var syllabes_3_total = triSyllabesTotal();
    var syllabes_4_total = quadriSyllabesTotal();  

    let questions_syllabes_1 = malaxer(syllabes_1_total);
    let questions_syllabes_2 = malaxer(syllabes_2_total);
    let questions_syllabes_3 = malaxer(syllabes_3_total);
    let questions_syllabes_4 = malaxer(syllabes_4_total);
        
    let syllabes_1 = monoSyllabe();
    let syllabes_2 = biSyllabe();
    let syllabes_3 = triSyllabe();
    let syllabes_4 = quadriSyllabe();

    let pratique = $('#pratique');

    var question_d_option = '', reponse_d_option = [];
    var limite_des_questions_d_option = 10;
    var moyenne_d_option = 1;
    var moyenne_de_pratique = 1;
    var table = "";
   
 /*--------------------------------------------------------------------*/
    $('.fermeture').attr('id', 'fermer_pratique');
  
    recuperationDesOptionsEffectuees();
    afficherPratique();
    dimensionnerPratique();
    afficherPratiqueOptions();
    optionStyles(); 
    pratiquer();
    stockerPratique();
 
 /*--------------------------------------------------------------------*/

    function recuperationDesOptionsEffectuees() {

        DB_options = getDBOptions();
       // if(DB_options.length === 4) localStorage.clear();
        
        local_options = getLocalOptions();
        
        if(DB_options != "") localStorage.clear();
        
        all_options = (DB_options != '') ? DB_options : local_options;
        localStorage.setItem('all_options', JSON.stringify(all_options));
    }
    function getDBOptions() {
            
        let DB_pratiques = JSON.parse(localStorage.getItem('pratiques'));
        let DB_pratiques_length = (DB_pratiques == null) ? 0 : DB_pratiques.length;
   
        let niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
        
        for (var i = 0; i < DB_pratiques_length; i++) {
            if(DB_pratiques[i][0] == niveau_actif) DB_options = JSON.parse(DB_pratiques[i][1]);
        }
        
        return DB_options;    
    }
    
    function getLocalOptions() {
            
        let options = [], option_1 = [], option_2 = [], option_3 = [], option_4 = [];
                                        
        if(JSON.parse(localStorage.getItem(id+'_'+0)) != null) { option_1 = JSON.parse(localStorage.getItem(id+'_'+0)); options.push(option_1); }
        if(JSON.parse(localStorage.getItem(id+'_'+1)) != null) { option_2 = JSON.parse(localStorage.getItem(id+'_'+1)); options.push(option_2); }
        if(JSON.parse(localStorage.getItem(id+'_'+2)) != null) { option_3 = JSON.parse(localStorage.getItem(id+'_'+2)); options.push(option_3); }
        if(JSON.parse(localStorage.getItem(id+'_'+3)) != null) { option_4 = JSON.parse(localStorage.getItem(id+'_'+3)); options.push(option_4); }
                                         
        return options;
    }   
    function afficherPratique() {
        afficher(pratique);
        optionStyles();
    }
    function dimensionnerPratique() {

        let pratique_foot_height = $('#pratique_foot').height();

        let pratique_dialogue_btn_height = $('#pratique_dialogue_btn').height();
        let clavier_pratique_height = $('#clavier_pratique').height();

        let pratique_fiche_head_height = $('#pratique_head').height();
        let pratique_fiche_foot_height = $('#pratique_tfoot').height();

        let pratique_fiche_height = pratique_foot_height-pratique_dialogue_btn_height-clavier_pratique_height-24;
        let pratique_fiche_body_height = pratique_fiche_height-pratique_fiche_head_height-pratique_fiche_foot_height-54;

        $('#pratique_table').css('height', pratique_fiche_height+'px');
        $('#pratique_tbody').css('height', pratique_fiche_body_height+'px');
    }
    function initialiserPratiques() {
       
        compteur = 0;
        compteur_de_question_d_option = 1;
        initialiserPratiqueFiche();
        initialiserPratiqueQuestions();
        initialiserPratiqueImage();
        initialiserDialogueBtn();
        initialiserProgressBarr();
        masquerMessageDeFin();
        dimensionnerPratique();
       
        function initialiserPratiqueFiche() {

            viderPratiqueFicheBody();
            viderPratiqueFicheFoot();

            function viderPratiqueFicheBody() {                                        
                table = "";
                $('#pratique_tbody').html(table);
            }
            function viderPratiqueFicheFoot() {
                total_point = 0;
                $('#total_point').html(parseIntNko(total_point));
                $('#pourcentage_point').html('%'+parseIntNko(Math.round(total_point*100/limite_des_questions_d_option)));

            }
        }
        function initialiserPratiqueQuestions() {
            $.each($('#pratique_options span'), function() {
            
                option_index = $(this).index();
                
                switch(option_index) {
                    case 0: syllabes_1 = monoSyllabe();   break;
                    case 1: syllabes_2 = biSyllabe();     break;
                    case 2: syllabes_3 = triSyllabe();    break;
                    case 3: syllabes_4 = quadriSyllabe(); break;
                }
            });
        }
        function initialiserPratiqueImage() {
            $('#pratiques_images_container #image_name').html('');
            $('#pratiques_images_container img').attr('src', '/kouroukan/server-images/server-images-1-syllabe/ߛߊ߲.jpg');
            $('#pratiques_images_container img').css('opacity',1);
            nePasMettreCroixSurImage();
        }
        function masquerMessageDeFin() { $('#message_de_fin_container').css('display','none'); }
    }
    function monoSyllabe() {
        let syllabes_1 = [];
            
        for(let i = 0; i < limite_des_questions_d_option; i++) {
                                    
            let q = questions_syllabes_1[i];
            let r = '';
            let p = 0;
            let question_reponse = [q,r,p];
                                    
            syllabes_1.push( question_reponse );
        }
            
        return syllabes_1;
    }
    function biSyllabe() {
        let syllabes_2 = [];
            
        for(let i = 0; i < limite_des_questions_d_option; i++) {
                                    
            let q = questions_syllabes_2[i];
            let r = '';
            let p = 0;
            let question_reponse = [q,r,p];
                                    
            syllabes_2.push( question_reponse );
        }
            
        return syllabes_2;
    }
    function triSyllabe() {
        let syllabes_3 = [];
            
        for(let i = 0; i < limite_des_questions_d_option; i++) {
                                    
            let q = questions_syllabes_3[i];
            let r = '';
            let p = 0;
            let question_reponse = [q,r,p];
                                    
            syllabes_3.push( question_reponse );
        }
            
        return syllabes_3;
    }
    function quadriSyllabe() {
        let syllabes_4 = [];
            
        for(let i = 0; i < limite_des_questions_d_option; i++) {
                                    
            let q = questions_syllabes_4[i];
            let r = '';
            let p = 0;
            let question_reponse = [q,r,p];
                                    
            syllabes_4.push( question_reponse );
        }
            
        return syllabes_4;
    }
    function afficherPratiqueOptions() {
        $('#pratique_head, #pratique_body, #pratique_foot').css('display','none');
        $('#pratique_options').css('display','block');
    }
    function masquerPratiqueOptions() { $('#pratique_options').css('display','none'); }
    function afficherPratiqueLesson() { $('#pratique_head, #pratique_body, #pratique_foot').css('display','block'); }
    function afficherPratiqueClavier() { $('#guide_et_clavier_container').css('top',0); }
    function masquerPratiqueClavier() { $('#guide_et_clavier_container').css('top','100%'); }
    function afficherMessageDeFin() { $('#message_de_fin_container').css('display','block'); }
    function mettreCroixSurImage() { $('#image_croix').css('display','flex'); $('#pratiques_images_container img').css('opacity',0.4); }
    function nePasMettreCroixSurImage() { $('#image_croix').css('display','none'); $('#pratiques_images_container img').css('opacity',1); }
    function optionStyles() {
        nbr_option_vide = nombreOptionsVides();
        nbr_option_non_vide = all_options.length - nbr_option_vide;
  
        if(nbr_option_vide == 4) {
            $('#pratique_options span').addClass('a_apprendre');
            $('#pratique_options span:nth-child(1)').removeClass('a_apprendre');
            $('#pratique_options span:nth-child(1)').addClass('active');
        }
        if(nbr_option_vide < 4) {
            $.each($('#pratique_options span'), function() {
                let option_index = $(this).index();
                
                if(option_index <  nbr_option_non_vide) $(this).removeClass('a_apprendre');
                if(option_index <  nbr_option_non_vide) $(this).addClass('apprises');
                if(option_index == nbr_option_non_vide) $(this).removeClass('a_apprendre');
                if(option_index == nbr_option_non_vide) $(this).addClass('active');
                if(option_index >  nbr_option_non_vide) $(this).addClass('a_apprendre');
            });
        }
        
        function nombreOptionsVides() {
            let nov = 0;
            for (var i = 0; i < all_options.length; i++) {
                if(all_options[i] == null) nov += 1;
            }
            return nov;
        }
    }                        
    function nombreDOptionNonVide() {
        
        let nov = 0, nonv = 0;
        
        all_options = getLocalOptions();

        for (var i = 0; i < all_options.length; i++) {
            if(all_options[i] == null) nov++;
        }
        nonv = all_options.length - nov;
        return nonv;
    }
    function pratiquer() {

        var questions = [];
        var questions_posees = [];
      
     /* Une question_d_option doit etre posee avant de commencer à taper reponse_d_option.*/ 
        $('#clavier_pratique').on('click', function() { if( questions_posees == '' ) guiderClient(); });
        $('#pratique_options span').on('click', function() {
                       
            // if($(this).hasClass('a_apprendre')) { alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫");   return; }
            // if($(this).hasClass('apprises'))    { alert("ߕߊ߲߬ߓߌ߬ ߓߘߊ߫ ߞߍ߫ ߦߊ߲߬ ߘߐ߫ ߞߘߐ߬ߡߊ߲߬"); return; }
            sessionStorage.removeItem('option_status');                           

            initialiserPratiques();

            option_active = $(this);
            option_active_name = $(this).html();
            option_index = $(this).index();
            sessionStorage.setItem('option_index', JSON.stringify(option_index));
            masquerPratiqueOptions();
                
            switch(option_index) {
                case 0 : option = syllabes_1; break;
                case 1 : option = syllabes_2; break; 
                case 2 : option = syllabes_3; break;
                case 3 : option = syllabes_4; break;
            }
          
            for (var i = 0; i < option.length; i++) { questions_posees[i] = option[i][0]; }
            
            $(this).parent().parent().css('top','-110%'); //masquer les options de pratique
            
            afficherPratiqueLesson();
            poserQuestionPratique();
            repondreQuestionPratique();
            rectificationDeReponse();
            correctionPratique();
            
            
            function optionDeSyllabe() {
                var option_de_syllabe = '';
                        
                switch(option_index) {
                    case 0 : option_de_syllabe = 'ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߞߋ߬ߟߋ߲߬ߡߊ'; break;
                    case 1 : option_de_syllabe = 'ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߝߌ߬ߟߊ߬ߡߊ' ; break;
                    case 2 : option_de_syllabe = 'ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߛߓߊ߬ߡߊ'  ; break;
                    case 3 : option_de_syllabe = 'ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߣߊ߰ߣߌ߲߬ߡߊ' ; break;
                }
                        
                return option_de_syllabe;
            }
            function poserQuestionPratique() {
                
                if(!question_d_option) {
                    $('guide_container').css('z-index',1);
                    $('#pratiques_images_container').css('z-index',0);
                    $('#image_croix').css('display','none');
                    $('pratique_clavier_container').css('z-index',1);
                }

                $('.question_btn').on('click', function() { 
                    
                    let questions_option_suivante = JSON.parse(sessionStorage.getItem('questions_option_suivante'));    // Voir fonction changerDOption()
                    let option_status = JSON.parse(sessionStorage.getItem('option_status'));
                    questions = (option_status == "faite") ? questions_option_suivante : questions_posees;
        
                    $('#image_croix').css('display','none');

                    actualiserLesBoutonsDEntete();
                    afficherPratiqueClavier();
                    pratiqueGuide();
                    question_d_option = questions[compteur];
                    lireQuestion();
                    repeteQuestion();
                    setTimeout(() => {  $('#pratiques_images_container img').css('display','none'); }, 100);
                         

                    function pratiqueGuide() {
                            
                        var pratique_guide_html = pratiqueGuideHTML();
                         
                        $('#cumule_des_caracteres').html(questions[compteur]);
                        setTimeout(function() {$('#pratiques_image').attr('src','/kouroukan/server_images/server_images-1-syllabe/ߛߊ߲.jpg');}, 600);
                            
                       // $('#guide_container').animate({'top':0}, 400);
                            
                        function pratiqueGuideHTML() {
                            var pratique_guide_html = '';
                            var option_index = JSON.parse(sessionStorage.getItem('option_index'));
                            var nbr_de_bulle = 0;

                            let option_courante_index = (option_status == "faite") ? option_index+1 : option_index;
                            nbr_de_bulle = option_courante_index+1; 
                                
                            for (var i = 0; i < nbr_de_bulle; i++) { pratique_guide_html += '<span class="bulle" id="span_'+i+'"></span><span class="plus">+</span>'; }
                                
                            return pratique_guide_html;
                        }
                    }
                    function actualiserLesBoutonsDEntete() {
                        compteur_de_question_d_option++;
            
                        $('.question_ordre').html(parseIntNko(compteur_de_question_d_option)+'߲');
                        $('.question_action').html('ߠߊߡߍ߲߫');
                            
                        afficherRepetitionBtn();
                    }
                    function lireQuestion(){
                        $('#audio').attr({'src':'/kouroukan/son/mp3/'+question_d_option+'.mp3', 'autoplay':'on'});
                    }
                    function repeteQuestion(){
                        $('.repetition_btn').on('click', function(){ $('#audio').attr({'src':'/kouroukan/son/mp3/'+question_d_option+'.mp3', 'autoplay':'on'}); });
                    }
                });
            }
            function repondreQuestionPratique(){
                $('.clavier_container td').on('click', function() {
               
                    if(!question_d_option) return false;

                    let caractere = $(this).html();

                 // Doubler les caractères ici n'est pas permis!
                    if($.inArray(reponse_d_option[reponse_d_option.length - 1],caracteres[1]) != -1) {
                    if($.inArray(caractere,caracteres[1]) != -1) {
                        alert("ߜߙߊ߬ߟߌ ߕߍ߫ ߞߍ߫ ߟߊ߫ ߦߙߐ ߣߌ߲߬ ߘߐ߫");
                        return;
                    }}

                    if(reponse_d_option[reponse_d_option.length - 1] == caractere) {
                        alert("ߌ ߓߘߊ߫ "+caractere+" ߛߓߍ߫ ߛߋ߲߬ߢߊ߫ ߂");
                        return;
                    }

                    reponse_d_option[reponse_d_option.length] = caractere;

                    chargerBulles();
                    styliserBulles();
                    $('#cumule_des_caracteres').html(reponse_d_option);
                    afficherCorrectionBtn();
                    compteur_de_caractere++;
                      
                    function chargerBulles() {
                            
                        if($.inArray(caractere,caracteres[1]) != -1) bulle_index++; //Chaque fois que le caractere tapé est consonne, bulle_index augmente d'une unité.

                        if(bulle_index == 0) { s_0[s_0.length] = reponse_d_option[reponse_d_option.length-1];  $('#span_0').html(s_0); }
                        if(bulle_index == 1) { s_1[s_1.length] = reponse_d_option[reponse_d_option.length-1];  $('#span_1').html(s_1); }
                        if(bulle_index == 2) { s_2[s_2.length] = reponse_d_option[reponse_d_option.length-1];  $('#span_2').html(s_2); }
                        if(bulle_index == 3) { s_3[s_3.length] = reponse_d_option[reponse_d_option.length-1];  $('#span_3').html(s_3); }
                    }
                }); 
            }
            function styliserBulles() {
                $('.bulle:nth('+bulle_index+')').prevAll('.bulle').css({'background-color':'white', 'box-shadow':'0 0 8px #ccc', 'transform':'scale(1)'});
                $('.bulle:nth('+bulle_index+')').css({'background-color':'yellow', 'box-shadow':'0 0 8px yellow', 'transform':'scale(1.125)'});
                $('.bulle:nth('+bulle_index+')').nextAll('.bulle').css({'background-color':'#ccc', 'box-shadow':'0 0 8px #ccc', 'transform':'scale(1)'});
                if(bulle_index === -1) { $('.bulle').css({'background-color':'#ccc', 'box-shadow':'none'}); }
            }
            function rectificationDeReponse() {
                        
                $('#correcteur_de_pratique').on('click',function() {
                    rectifierBulles();
                    reponse_d_option.pop();
                    $('#cumule_des_caracteres').html(reponse_d_option);
                    
                    function rectifierBulles() {
                           
                        var derniere_bulle_non_vide_html = $('#span_'+bulle_index).html().split('');
                        derniere_bulle_non_vide_html.pop();
                        sc = derniere_bulle_non_vide_html;
                        $('#span_'+bulle_index).html(sc);

                        switch(bulle_index) {
                            case 0 : s_0 = sc; break;
                            case 1 : s_1 = sc; break;
                            case 2 : s_2 = sc; break;
                            case 3 : s_3 = sc; break;
                        }
                        
                        i=reponse_d_option.length-1;
                        if($.inArray(reponse_d_option[i],caracteres[1]) != -1) bulle_index--; //Chaque fois qu'un caractere de reponse_d_option est consonne, bulle_index diminue d'une unité.
                        i--;
                        
                        styliserBulles();
                    }
                });
            }
            function correctionPratique() {
                total_point = 0;
               
                $('.correction_btn').on('click',  function() {
                   
                    compteur++;
                    reponse_d_option = (question_d_option == reponse_d_option.join('')) ? reponse_d_option.join('') : '<del>'+reponse_d_option.join('')+'</del>';
                    point = (question_d_option == reponse_d_option)?1:0;
                    total_point = total_point + point;
                    effort_d_option = '%'+parseIntNko(Math.round(total_point*100/limite_des_questions_d_option));
                    memoire_pratique[memoire_pratique.length] = [question_d_option, reponse_d_option, point];
                    
                    var option_status = '';
                    var option_de_syllabe = optionDeSyllabe();
                    var message_1 = 'ߌ ߞߎߟߎ߲ߖߋ߫.<br/>'+option_de_syllabe+'  ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ '+effort_d_option+' ߟߊ߫. ߌ ߘߌ߫ ߛߋ߫ ߥߊ߫ ߟߊ߫ ߢߍ ߝߍ߬.';
                    var message_2 = 'ߌ ߘߐߖߊ߬. <br/>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ '+$("#pourcentage_point").html()+' ߟߋ߬ ߟߊ߫.<br/> ߘߌ߬ߢߍ߬ ߞߵߌ ߞߐߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬.';
                                      
                    afficherQuestionBouton();
                    masquerPratiqueClavier();
                    chargerPratiqueFiche();
                    animerPratiqueFiche();
                    stylesDePratiqueFicheBody();
                    chargerPratiqueBody();
                    controlerPratiqueBody();
                    revisionDOption();
                    actualiserPratiquesProgressBar();
                    enregistrerPratique();
                    
                    effacerQuestion();
                    effacerReponse();
                    effacerLesBulles();
                    initialiserCompteurDeCaractere();
                    finDOption();
                    finDePratique();
                    
                    
                    function chargerPratiqueBody() {

                        chargerImageName();                                            
                        chargerPratiquesImagesContainer();
                        afficherPratiquesImage();
                        affichageDeLaNotification();

                        function chargerImageName() { $('#image_name').html(reponse_d_option); }
                        function chargerPratiquesImagesContainer() {
                            reponse_d_option = (question_d_option == reponse_d_option) ? reponse_d_option : $('.pratique_tr_actif del').html();
                        
                            let dossier_image = dossierImage();
                            $('#pratiques_images_container img').attr('src', dossier_image+reponse_d_option+'.jpg');

                            if(question_d_option == reponse_d_option) {  nePasMettreCroixSurImage(); }
                            if(question_d_option != reponse_d_option) { mettreCroixSurImage(); }
                        }
                        function affichageDeLaNotification() {
                            if(questions.length === compteur) {
                                $('#message_de_fin_container').css({'display':'block'});
                                $('#message_de_fin_container').animate({'width':'100%'}, 400);
                                setTimeout(function(){$('#message_de_fin_container').animate({'width':0}, 400);}, 4000);
                                setTimeout(function(){$('#message_de_fin_container').css({'display':'block'});}, 6000);
                            }
                        }
                    }
                    function controlerPratiqueBody() {
                        if(question_d_option == reponse_d_option) { nePasMettreCroixSurImage(); }
                        if(question_d_option != reponse_d_option) { mettreCroixSurImage(); }
                    }
                    function chargerPratiqueFiche() {
                        
                        chargerPratiqueFicheBody();
                        chargerPratiqueFicheFoot();
                        pratique_tbody = $('#pratique_tbody');

                        function chargerPratiqueFicheBody() {

                            var n = parseIntNko(compteur);
                            n = (n == '߁') ? n+'߭' : n+'߲';
 
                            table += "\
                                <div class='tr'>\
                                    <span class='affiche_numero'>"+n+"</span>\
                                    <span class='affiche_question'>"+question_d_option+"</span>\
                                    <span class='affiche_reponse'>"+reponse_d_option+"</span>\
                                    <span class='affiche_point'>"+parseIntNko(point)+"</span>\
                                </div>\
                            ";
                        
                            $('#pratique_tbody').html(table);
                        }
                        function chargerPratiqueFicheFoot() {
                            $('#total_point').html(parseIntNko(total_point));
                            $('#pourcentage_point').html(effort_d_option);
                        }
                    }
                    function animerPratiqueFiche() {

                        defilementDuContenuVersLeHaut($('#pratique_tbody'));
                        affichageAnimeDeLaDerniereLigneDePratiqueFicheBody();

                        function affichageAnimeDeLaDerniereLigneDePratiqueFicheBody() {
                            $('#pratique_tbody .tr:last-child').css('height',0);
                            $('#pratique_tbody .tr:last-child').animate({'height':'1.6rem'}, 600);
                        }
                    }
                    function stylesDePratiqueFicheBody() {
                        $('#pratique_tbody div:last-child').addClass('pratique_tr_actif'); 
                        $('#pratique_tbody div:last-child').siblings().removeClass('pratique_tr_actif'); 
                        stylesDePratiqueTrActif();
                    }
                    function afficherQuestionBouton() {
                        $('.repetition_btn').css('display','none');
                        $('.correction_btn').css('display','none');
                        $('.question_btn').css('display','block');
                    }
                    function initialiserCompteurDeCaractere() { compteur_de_caractere = 0; }
                    function effacerLesBulles() {
                        
                        bulle_index = -1;
                        
                        s_0.splice(0,s_0.length);
                        s_1.splice(0,s_1.length);
                        s_2.splice(0,s_2.length);
                        s_3.splice(0,s_3.length);
                        
                        $('#span_0').html(s_0);
                        $('#span_1').html(s_1);
                        $('#span_2').html(s_2);
                        $('#span_3').html(s_3);
                    }
                    function actualiserPratiquesProgressBar(){
                        var progress_unity = $('#pratique_progress_bar').width()/limite_des_questions_d_option;
                                  
                        if(question_d_option != reponse_d_option){ 
                            $('.progress_question_bar').css('width','+='+progress_unity+'px');
                        }else{ 
                            $('.progress_question_bar, .progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                        }
                    }
                    function enregistrerPratique() {

                        point = (question_d_option == reponse_d_option) ? 1:0;
                        let question_reponse = [question_d_option,reponse_d_option,point];
                        
                        
                        switch(option_index) {
                            case 0 : actualiserOption(syllabes_1); break;
                            case 1 : actualiserOption(syllabes_2); break;
                            case 2 : actualiserOption(syllabes_3); break;
                            case 3 : actualiserOption(syllabes_4); break;
                        }
                        
                        function actualiserOption(syllabe) {
                            let index = '';
                            
                            $.each(syllabe, function() { if(question_d_option == this[0]) index = syllabe.indexOf(this); });
                            syllabe.splice(index,1,question_reponse); 
                        }
                    }
                    function noterOption(syllabe) {
                        let note_d_option = 0;

                        for (var i = 0; i < syllabe.length; i++) { note_d_option += syllabe[i][2]; }
                        syllabe = [syllabe,note_d_option]; 
                        return syllabe;             
                    }
                    function effacerQuestion() { question_d_option = ''; }
                    function effacerReponse() { reponse_d_option = []; }
                    function stockerOptionDansLocalStorage(syllabe) {
                        let note_d_option = noterOption(syllabe)[1];
                       
                        if(note_d_option <  moyenne_d_option) alert( "ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߛߌߦߊߡߊ߲߫ ߡߊ߫ ߟߊߡߌ߬ߘߊ߬ ߌ ߓߟߏ߫. ߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬." );
                        if(note_d_option >= moyenne_d_option) localStorage.setItem(id+'_'+option_index, JSON.stringify(syllabe));
                    }
                    function stockerPratiqueDansLocalStorage() {
                        localStorage.setItem('pratique', JSON.stringify([syllabes_1, syllabes_2, syllabes_3, syllabes_4]));
                    }
                    function finDOption() {
                        
                        if( all_options.length < 4 ) {
                        if(compteur_de_question_d_option - 1 === limite_des_questions_d_option){
                       
                            switch(option_index) {
                                case 0 : noterOption(syllabes_1); stockerOptionDansLocalStorage(syllabes_1); break;
                                case 1 : noterOption(syllabes_2); stockerOptionDansLocalStorage(syllabes_2); break;
                                case 2 : noterOption(syllabes_3); stockerOptionDansLocalStorage(syllabes_3); break;
                                case 3 : noterOption(syllabes_4); stockerOptionDansLocalStorage(syllabes_4); break;
                            }
                            
                            messageDeFinOption();
                            $('#pratique_dialogue_btn').off('click');
                            $('.fin_btn').html(option_active_name+' ߓߟߏߦߊߟߌ ߓߘߊ߫ ߓߊ߲߫. ߌ ߞߎߟߎ߲ߖߋ߫߹ ');
                            
                                    
                            afficherFinBtn();
                            afficherMessageDeFin()
                            optionCallBack();

                            function messageDeFinOption() {
                     
                                if(effort_d_option == '%߁߀߀') {

                                    if(option_index < 3) {
                                    
                                        $('#message_de_fin').html(message_1);
                                        $('#message_btn_1').html('ߛߍ߬ߦߌ߬ ߞߐ߫');
                                        $('#message_btn_2').html('ߥߊ߫ ߢߍ߫');
                                    }
                                    if(option_index === 3) {
                                      
                                        $('#message_de_fin').html(message_1);
                                        $('#message_btn_1').css('display','none');
                                        $('#message_btn_2').css('width','100%');
                                    }

                                    option_status = "faite";
                                }else{
                                    
                                    $('#message_de_fin').html(message_2);
                                    $('#message_btn_1').html('ߛߍ߬ߦߌ߬ ߞߐ߫');
                                    $('#message_btn_2').html('ߛߍ߬ߦߵߊ߬ ߡߊ߬');

                                    option_status = "refaire";
                                }
            
                                sessionStorage.setItem('option_status',JSON.stringify(option_status));
                            }
                            function optionCallBack() {   
                                $('#message_btn_2').click(function() { 
                                    total_point = 0;
                                    compteur_de_question_d_option = 1;
                                   
                                    if($(this).text() == 'ߥߊ߫ ߢߍ߫') { changerDOption(); }
                                    if($(this).text() == 'ߛߍ߬ߦߵߊ߬ ߡߊ߬') { reprendreOption(); }
                                });
                            }
                        }}
                    }
                    function finDePratique() {

                        if( all_options.length === 4 ) {
                            
                            dimensionnementDeFinDePratiquesBody();
                            messageDeFinPratique();

                            function dimensionnementDeFinDePratiquesBody() {
                                
                                let pfh = $('#pratique_foot').height();
                                let mfch = $('#message_de_fin_container').height(); 
                                var pratique_fiche_head_height = $('#pratique_thead').height(); 
                                var pratique_fiche_foot_height = $('#pratique_tfoot').height(); 

                                let pratique_fiche_height = pfh - mfch;
                                var pratique_fiche_body_height = pratique_fiche_height-pratique_fiche_head_height-pratique_fiche_foot_height; 
                                
                                
                                $('#pratique_table').css({'height':pratique_fiche_height+'px'});
                                $('#pratique_tbody').css({'display':'block', 'height':pratique_fiche_body_height+'px'});
                                $('#pratique_tfoot').css({'display':'block'});
                                $('#message_de_fin_container').css({'display':'block'});
                            }
                            function messageDeFinPratique() {
                     
                                if(effort_de_pratique == '%߁߀߀') {

                                    $('#message_de_fin').html(message_1);
                                    $('#message_btn_1').css('display','none');
                                    $('#message_btn_2').html(matiere_nom+' ߓߟߏߦߊߟߌ ߓߘߊ߫ ߓߊ߲߫');
                                    $('#message_btn_2').html('ߥߊ߫ ߢߍ߫');
                                    $('#message_btn_2').css('width','100%');
                                    
                                }else{
                                    
                                    $('#message_de_fin').html(message_2);
                                    $('#message_btn_1').html('ߛߍ߬ߦߌ߬ ߞߐ߫');
                                    $('#message_btn_2').html('ߛߍ߬ߦߵߊ߬ ߡߊ߬');
                                }
                            }
                        }
                    }  
                    function changerDOption() {

                        let option_status = JSON.parse(sessionStorage.getItem('option_status'));
                        option_index = (option_status == "faite") ? option_index++ : option_index;
                        
                        questions_pratiques = questionsPratiques(option_index+1);
                        changerStylesDesOptions();
                        afficherPratiqueOptions();

                        function changerStylesDesOptions() {
                            option_active.removeClass('active').addClass('apprises');
                            option_active.next().removeClass('a_apprendre').addClass('active');
                        }
                    }
                    function reprendreOption() {
                        questions = questionsPratiques(option_index); 
                        localStorage.removeItem(id+'_'+option_index);
                    } 
                }); 
            }
        });
    }
    function dossierImage() {
        let option_status = JSON.parse(sessionStorage.getItem('option_status'));
        let option_index = JSON.parse(sessionStorage.getItem('option_index'));
        let option = (option_status == "faite") ? option_index+1 : option_index;
        let dossier = '';

        if(option === 0) dossier = "/kouroukan/server-images/server-images-1-syllabe/";
        if(option === 1) dossier = "/kouroukan/server-images/server-images-2-syllabe/";
        if(option === 2) dossier = "/kouroukan/server-images/server-images-3-syllabe/";
        if(option === 3) dossier = "/kouroukan/server-images/server-images-4-syllabe/";

        return dossier;
    }
    function afficherPratiquesImage() {
        $('#pratiques_images_container img').css({'display':'block', 'transform':'scale(0.25)'});
        setTimeout(() => { $('#pratiques_images_container img').css('transform','scale(1)'); }, 10);
    }
    function revisionDOption() {
            
        $('#pratique_tbody .tr').on('click', function() {
          
            $('#pratiques_images_container img').css('display','none');
            $(this).siblings().removeClass('pratique_tr_actif');
            $(this).addClass('pratique_tr_actif'); 
            stylesDePratiqueTrActif();
            
            let question_d_option = $('.pratique_tr_actif .affiche_question').html(); 
            let reponse_d_option = $('.pratique_tr_actif .affiche_reponse').html();
            let dossier_image = dossierImage();

            reponse_d_option = (question_d_option == reponse_d_option) ? reponse_d_option : $('.pratique_tr_actif del').html();
            
            if(question_d_option == reponse_d_option) { nePasMettreCroixSurImage(); }
            if(question_d_option != reponse_d_option) { mettreCroixSurImage(); }

            $('#image_name').html(reponse_d_option);                                	        
            $('#pratiques_images_container img').attr('src', dossier_image+reponse_d_option+'.jpg');  
            setTimeout(() => { afficherPratiquesImage(); }, 10);                              	        
        });
    }
    function stockerPratique() {
        $('#fermer_pratique').on('click',function() {
            let index_phase_active = $('.phases_container ul li .active').index();
            let total_options_etudiees = nombreDOptionsEtudiees();
                
           // if(index_phase_active < data_options_nbr || nbr_option_non_vide < all_options.length) { return; }
            if(total_options_etudiees == total_option) {

                note_de_pratique = noterPratique(); 

                /* 
                Vérification de la validité de pratique:
                Pourqu'une pratique soit valable, il faut que chaque option soit passée.
                - Si non, la pratique est invalide et est retournée;
                - Si oui, la pratique est valable et le processus de stockage est engagé. 
                */
                            
                if(note_de_pratique >= moyenne_de_pratique) {
                    sendPratiqueToDB(); 
                    changerPhaseActive(index_phase_active);
                    initialiserProgressBarr();
                    deleteLocalOptions();
                }

                function noterPratique() {
                    
                    let note_total = 0;
                    
                    for (var i = 0; i < all_options.length; i++) {
                    for (var j = 0; j < all_options[i].length; j++) {
                        if(all_options[i][j] != undefined) note_total += all_options[i][j][2];
                    }}
                    
                    let note = Math.floor(note_total/4);
                
                    return note;
                }
                function sendPratiqueToDB() {

                    let matiere = JSON.parse(sessionStorage.getItem('matiere_active')); // Voir programmes.js fonction storagesDuProgramme()
                    let phase   = JSON.parse(sessionStorage.getItem('phase'));  // Voir lessons.js fonction phaseActiveName()
                    let lesson  = JSON.stringify(all_options);
                                    
                    const pratique_data = new URLSearchParams({
                        id     : id,
                        matiere: matiere,
                        niveau : niveau_en_cours,
                        phase  : phase,
                        lesson : lesson,
                        note   : note_de_pratique
                    });

                    fetch("/kouroukan/php/actions.php", {
                        method: "POST",
                        body: pratique_data 
                    })
                    .then(response => response.text())
                    .catch(error => console.log(error));
                }
            }
            
            function nombreDOptionsEtudiees() {
                let n = $('#pratique_options .apprises').length;
                return n;
            }
            function deleteLocalOptions() {
                
                localStorage.removeItem(id+'_'+0);
                localStorage.removeItem(id+'_'+1);
                localStorage.removeItem(id+'_'+2);
                localStorage.removeItem(id+'_'+3);        
            }
        });
    } 
    function stylesDePratiqueTrActif() {
        $('.pratique_tr_actif span:nth-child(1)').css({'background-color':'#226', 'color':'yellow'});
        $('.pratique_tr_actif span:nth-child(2)').css({'background-color':'#226', 'color':'yellow'});
        $('.pratique_tr_actif span:nth-child(3)').css({'background-color':'#226', 'color':'yellow'});
        $('.pratique_tr_actif span:nth-child(4)').css({'background-color':'#226', 'color':'yellow'});

        $('.pratique_tr_actif').siblings().find('span').css({'background-color':'#223', 'color':'white'});
    }

    function initialiserDialogueBtn() {
            
        afficherQuestionBtn();
            
        $('.question_total').html(parseIntNko(limite_des_questions_d_option));
        $('.question_ordre').html(parseIntNko(1)+'߭');
        $('.question_action').html('ߟߊߡߍ߲߫');
        
        compteur_de_question_d_option = 1;
        compteur = 0;
        total_point = 0;
    }
        
    function questionsPratiques(option_index) {
        
        var q = '';
        var questions = [];
                        
        switch(option_index) {
            case 0: q = malaxer(syllabes_1_total); break;
            case 1: q = malaxer(syllabes_2_total); break;
            case 2: q = malaxer(syllabes_3_total); break;
            case 3: q = malaxer(syllabes_4_total); break;
        }
        for (var i = 0; i < limite_des_questions_d_option; i++) questions[i] = q[i];
        
        return questions;
    }
    function decomposerEnSyllabes() {
        
        var character = question_d_option.split('');
        var c_1, c_2, c_3, c_4, c_5, c_6, c_7, c_8, c_9, c_10, c_11, c_12;
        var syllabe_1 = [], syllabe_2 = [], syllabe_3 = [], syllabe_4 = [];

        if(option_index == 0) {
            if(character.length == 2) {
            for (var i = 0; i < 2; i++) {
                syllabe_1[syllabe_1.length] = character[i];
            }}
            if(character.length == 3) {
            for (var i = 0; i < 3; i++) {
                syllabe_1[syllabe_1.length] = character[i];
            }}
        }
        if(option_index > 0) {
            var syllabes = [];
            for(var i = 0; i < option_index; i++) {

                var syllabe = [];
                
                if($.inArray(character[2],caracteres[1]) !== -1) {
                    for (var i = 0; i < 2; i++) {
                        syllabe[syllabe.length] = character[i];
                    }
                    syllabes[syllabes.length] = syllabe;
                }
                if(character[2] == caracteres[4][1]) {
                    for (var i = 0; i < 3; i++) {
                        syllabe[syllabe.length] = character[i];
                    }
                    syllabes[syllabes.length] = syllabe;
                }
                character.splice(0,2);
            }
        }
    }
    function afficherFinBtn() {
        $('.fin_btn').css('display','block');
        $('.repetition_btn').css('display','none');
        $('.correction_btn').css('display','none');
        $('.question_btn').css('display','none');
    }
    function afficherRepetitionBtn() {
        $('.fin_btn').css('display','none');
        $('.repetition_btn').css('display','block');
        $('.correction_btn').css('display','none');
        $('.question_btn').css('display','none');
    }
    function afficherCorrectionBtn() {
        $('.fin_btn').css('display','none');
        $('.repetition_btn').css('display','none');
        $('.correction_btn').css('display','block');
        $('.question_btn').css('display','none');
    }
    function afficherQuestionBtn() {
        $('.fin_btn').css('display','none');
        $('.repetition_btn').css('display','none');
        $('.correction_btn').css('display','none');
        $('.question_btn').css('display','block');
    }
    
    function monoSyllabesTotal() {
        var syllabes_1_total = monoSyllabes(); // Cette fonction provient de syllabes.js 
        var ms = [];
                
        for (var i = 0; i < syllabes_1_total.length; i++) {
        for (var j = 0; j < syllabes_1_total[i].length; j++) {
            ms[ms.length] = syllabes_1_total[i][j];
        }}
            
        return ms;
    }
    function biSyllabesTotal() {
        var syllabes_2_total = biSyllabes(); // Cette fonction provient de syllabes.js 
        var bs = [];
                
        for (var i = 0; i < syllabes_2_total.length; i++) {
        for (var j = 0; j < syllabes_2_total[i].length; j++) {
            bs[bs.length] = syllabes_2_total[i][j];
        }}
            
        return bs;
    }
    function triSyllabesTotal() {
        var syllabes_3_total = triSyllabes(); // Cette fonction provient de syllabes.js 
        var ts = [];
                
        for (var i = 0; i < syllabes_3_total.length; i++) {
        for (var j = 0; j < syllabes_3_total[i].length; j++) {
            ts[ts.length] = syllabes_3_total[i][j];
        }}
            
        return ts;
    }
    function quadriSyllabesTotal() {
        var syllabes_4_total = quadriSyllabes(); // Cette fonction provient de syllabes.js 
        var qs = [];
                
        for (var i = 0; i < syllabes_4_total.length; i++) {
        for (var j = 0; j < syllabes_4_total[i].length; j++) {
            qs[qs.length] = syllabes_4_total[i][j];
        }}
            
        return qs;
    }   
} 