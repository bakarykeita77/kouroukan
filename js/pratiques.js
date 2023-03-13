
function pratique() {
                        
    let phase_nbr = $('.apprises').length;

    var option = '';
    var option_index = null;
    var option_active = '';
    var nbr_option_vide = '';
    var nbr_option_non_vide = '';
    let all_options = [], DB_options = '', local_options = '';
    
    var compteur_de_question = 1;
    var compteur = 0;
    var compteur_de_caractere = 0;
    var bulle_index = -1;
    var s_0 = [], s_1 = [], s_2 = [], s_3 = [], sc = [];
    var question_limit = 10;
    var quantite_de_question = parseIntNko(question_limit);
    var question_rang = '߭';
    
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
    let pratiques = JSON.parse(localStorage.getItem('pratiques'));

    var questions=[], question='', reponse=[];
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
        
        all_options = (DB_options != '') ? DB_options:local_options;
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
        pratique.css({'display':'block', 'transform':'scale(0.75)', 'opacity':0});
        setTimeout(function() { pratique.css({'transform':'scale(1)'});}, 5);
        setTimeout(function() { pratique.css({'opacity':'1'});}, 5);

        optionStyles();
    }
    function dimensionnerPratique() {

        let pratique_head_height = $('#pratique_head').height();
        let pratique_foot_height = $('#pratique_foot').height();

        let pratique_dialogue_btn_height = $('#pratique_dialogue_btn').height();
        let clavier_pratique_height = $('#clavier_pratique').height();

        let pratique_fiche_head_height = $('#pratique_head').height();
        let pratique_fiche_foot_height = $('#pratique_fiche_foot').height();

        let pratique_fiche_height = pratique_foot_height-pratique_dialogue_btn_height-clavier_pratique_height-24;
        let pratique_fiche_body_height = pratique_fiche_height-pratique_fiche_head_height-pratique_fiche_foot_height-54;

        $('#pratique_fiche').css('height', pratique_fiche_height+'px');
        $('#pratique_fiche_body').css('height', pratique_fiche_body_height+'px');
    }
    function initialiserPratiques() {
       
        compteur = 0;
        compteur_de_question = 1;
        initialiserPratiqueFiche();
        initialiserPratiqueQuestions();
        initialiserPratiqueImage();
        initialiserDialogueBtn();
        initialiserProgressBarr();
        afficherClavierEtConsoles();
        masquerMessageDeFin();
        dimensionnerPratique();
       
        function initialiserPratiqueFiche() {

            viderPratiqueFicheBody();
            viderPratiqueFicheFoot();
            $('#pratique_fiche_foot').css('display','none');

            function viderPratiqueFicheBody() {                                        
                table = "";
                $('#pratique_fiche_body').html(table);
            }
            function viderPratiqueFicheFoot() {
                total_point = 0;
                $('#total_point').html(parseIntNko(total_point));
                $('#pourcentage_point').html('%'+parseIntNko(Math.round(total_point*100/question_limit)));

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
        function afficherClavierEtConsoles() {
            $('.progress_bar, .course_head, .clavier_container, #pratique_dialogue_btn').css('display','block');
        }
        function masquerMessageDeFin() {
            $('#message_de_fin_container').css('display','none');
        }
    }
    function monoSyllabe() {
        let syllabes_1 = [];
            
        for(let i = 0; i < question_limit; i++) {
                                    
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
            
        for(let i = 0; i < question_limit; i++) {
                                    
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
            
        for(let i = 0; i < question_limit; i++) {
                                    
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
            
        for(let i = 0; i < question_limit; i++) {
                                    
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
    function masquerPratiqueLesson() { $('#pratique_head, #pratique_body, #pratique_foot').css('display','none'); }
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

        let questions_posees = [];
      
     /* Une question doit etre posee avant de commencer à taper reponse.*/ 
        $('#clavier_pratique').on('click', function() {
            if( questions_posees == '' ) guiderClient(); 
        });

        $('#pratique_options span').one('click', function() {

            if($(this).hasClass('a_apprendre')) { alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫");   return; }
            if($(this).hasClass('apprises'))    { alert("ߕߊ߲߬ߓߌ߬ ߓߘߊ߫ ߞߍ߫ ߦߊ߲߬ ߘߐ߫ ߞߘߐ߬ߡߊ߲߬"); return; }
            sessionStorage.removeItem('fin_status')                            

            initialiserPratiques();

            option_active = $(this);
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
            
            function dossierImage() {
                let option_status = JSON.parse(sessionStorage.getItem('fin_status'));
                let option_index = JSON.parse(sessionStorage.getItem('option_index'));
                let option = (option_status == "avancer") ? option_index+1 : option_index;
                let dossier = '';

                if(option === 0) dossier = "/kouroukan/server-images/server-images-1-syllabe/";
                if(option === 1) dossier = "/kouroukan/server-images/server-images-2-syllabe/";
                if(option === 2) dossier = "/kouroukan/server-images/server-images-3-syllabe/";
                if(option === 3) dossier = "/kouroukan/server-images/server-images-4-syllabe/";

                return dossier;
            }
            function poserQuestionPratique() {
                
                if(!question) {
                    $('guide_container').css('z-index',1);
                    $('#pratiques_images_container').css('z-index',0);
                    $('#image_croix').css('display','none');
                    $('pratique_clavier_container').css('z-index',1);
                }

                let questions = [];
                $('.question_btn').on('click', function() { 
                    
                    let questions_option_suivante = JSON.parse(sessionStorage.getItem('questions_option_suivante'));
                    let option_status = JSON.parse(sessionStorage.getItem('fin_status'));
                    questions = (option_status == "avancer") ? questions_option_suivante : questions_posees;
        
                    $('guide_container').css('z-index',1);
                    $('#pratiques_images_container').css('z-index',0);
                    $('#image_croix').css('display','none');
                    $('pratique_clavier_container').css('z-index',1);

                    actualiserLesBoutonsDEntete();
                    pratiqueGuide();
                    question = questions[compteur];
                    lireQuestion();
                    repeteQuestion();
                         
                    function pratiqueGuide() {
                            
                        var pratique_guide_html = pratiqueGuideHTML();
                         
                        $('#cumule_des_caracteres').html(questions[compteur]);
                        setTimeout(function() {$('#pratiques_image').attr('src','/kouroukan/server_images/server_images-1-syllabe/ߛߊ߲.jpg');}, 600);
                            
                        $('#bulles_container').html(pratique_guide_html);
                        $('#bulles_container span:last').remove();
                       // $('#guide_container').animate({'top':0}, 400);
                            
                        function pratiqueGuideHTML() {
                            var pratique_guide_html = '';
                            var option_index = JSON.parse(sessionStorage.getItem('option_index'));
                            var nbr_de_bulle = 0;

                            let option_courante_index = (option_status == "avancer") ? option_index+1 : option_index;
                            nbr_de_bulle = option_courante_index+1; 
                                
                            for (var i = 0; i < nbr_de_bulle; i++) { pratique_guide_html += '<span class="bulle" id="span_'+i+'"></span><span class="plus">+</span>'; }
                                
                            return pratique_guide_html;
                        }
                    }
                    function actualiserLesBoutonsDEntete() {
                        compteur_de_question++;
            
                        $('.question_ordre').html(parseIntNko(compteur_de_question)+'߲');
                        $('.question_action').html('ߠߊߡߍ߲߫');
                            
                        $('.question_btn').css('display','none');
                        $('.repetition_btn').css('display','block');
                        $('.correction_btn').css('display','none');
                    }
                    function lireQuestion(){
                        $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question+'.mp3', 'autoplay':'on'});
                    }
                    function repeteQuestion(){
                        $('.repetition_btn').on('click', function(){ $('#audio').attr({'src':'http://localhost:8080/kouroukan/son/mp3/'+question+'.mp3', 'autoplay':'on'}); });
                    }
                });
            }
            function repondreQuestionPratique(){
                $('.clavier_container td').on('click', function() {
                   
                    var caractere = $(this).html();
                    
                    if(!question) return false;
                    if($.inArray(reponse[reponse.length-1],caracteres[1]) != -1 && $.inArray(caractere,caracteres[1]) != -1) {
                        alert('ߜߙߊ߬ߟߌ ߕߍ߫ ߞߍ߫ ߟߊ߫ ߥߟߊ߬ߘߊ ߣߌ߲߬ ߘߐ߫');
                        return false;
                    }
                    
                    reponse[reponse.length] = caractere;
                    chargerBulles();
                    styliserBulles();
                    $('#cumule_des_caracteres').html(reponse);
                    afficherCorrectionButton();
                    compteur_de_caractere++;
                        
                    function afficherCorrectionButton() {
                        $('.repetition_btn').css('display','none');
                        $('.correction_btn').css('display','block');
                        $('.question_btn').css('display','none');
                    }
                    function chargerBulles() {
                            
                        if($.inArray(caractere,caracteres[1]) != -1) bulle_index++; //Chaque fois que le caractere tapé est consonne, bulle_index augmente d'une unité.

                        if(bulle_index == 0) { s_0[s_0.length] = reponse[reponse.length-1];  $('#span_0').html(s_0); }
                        if(bulle_index == 1) { s_1[s_1.length] = reponse[reponse.length-1];  $('#span_1').html(s_1); }
                        if(bulle_index == 2) { s_2[s_2.length] = reponse[reponse.length-1];  $('#span_2').html(s_2); }
                        if(bulle_index == 3) { s_3[s_3.length] = reponse[reponse.length-1];  $('#span_3').html(s_3); }
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
                        
                $('#correcteur').on('click',function() {
                    rectifierBulles();
                    reponse.pop();
                    $('#cumule_des_caracteres').html(reponse);
                    
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
                        
                        i=reponse.length-1;
                        if($.inArray(reponse[i],caracteres[1]) != -1) bulle_index--; //Chaque fois qu'un caractere de reponse est consonne, bulle_index diminue d'une unité.
                        i--;
                        
                        styliserBulles();
                    }
                });
            }
            function correctionPratique() {
                total_point = 0;
               
                $('.correction_btn').on('click',  function() {

                    reponse = reponse.join('');
                    point = (question == reponse)?1:0;
                    total_point = total_point + point;
                    effort = '%'+parseIntNko(Math.round(total_point*100/question_limit));
                    memoire_pratique[memoire_pratique.length] = [question, reponse, point];
        
                    
                    $('pratique_clavier_container').css('z-index',0);
                    $('#pratiques_images_container').css('z-index',1);
                    $('guide_container').css('z-index',0);

                    afficherQuestionBouton();
                    chargerPratiqueFiche();
                    animerPratiqueFiche();
                    stylesDePratiqueFicheBody();
                    chargerPratiqueBody();
                    actualiserPratiquesProgressBar();
                            
                    if(question == reponse) { nePasMettreCroixSurImage(); }
                    if(question != reponse) { mettreCroixSurImage(); }

                   
                    enregistrerPratique();
                 
                    effacerQuestion();
                    effacerReponse();
                    effacerLesBulles();
                    initialiserCompteurDeCaractere();
                    finDOption();
                    revisionDOption();
                    
                    compteur++;
                    
                    function chargerPratiqueBody() {

                        chargerImageName();                                            
                        chargerPratiquesImagesContainer();

                        function chargerImageName() { $('#image_name').html(reponse); }
                        function chargerPratiquesImagesContainer() {
                        
                            let dossier_image = dossierImage();

                            $('#pratiques_images_container img').attr('src', dossier_image+reponse+".jpg");
                            $('#pratiques_images_container img').css('transform','scale(1)'); //Scale est à 0.25 dans la fonction poserQuestionPratique()
                            
                            if(question == reponse) {  nePasMettreCroixSurImage(); }
                            if(question !== reponse) { mettreCroixSurImage(); }
                        }
                    }
                    function chargerPratiqueFiche() {
                        
                        chargerPratiqueFicheBody();
                        chargerPratiqueFicheFoot();
                        pratique_fiche_body = $('#pratique_fiche_body');

                        function chargerPratiqueFicheBody() {

                            if(question == reponse) table += "<div class='tr'>\n <span class='affiche_question'>"+question+"</span>\n<span class='affiche_reponse'><span class='fiche_vraie_reponse'>"+reponse+"</span></span>\n<span class='affiche_point'>"+parseIntNko(point)+"</span>\n </div>\n\n";
                            if(question != reponse) table += "<div class='tr'>\n <span class='affiche_question'>"+question+"</span>\n<span class='affiche_reponse'><span class='fiche_mauvaise_reponse'>"+reponse+"</span><span class='fiche_croix'>&#10060;</span></span>\n<span class='affiche_point'>"+parseIntNko(point)+"</span>\n </div>\n\n";
                          
                            $('#pratique_fiche_body').html(table);
                        }
                        function chargerPratiqueFicheFoot() {
                            $('#total_point').html(parseIntNko(total_point));
                            $('#pourcentage_point').html(effort);
                        }
                    }
                    function animerPratiqueFiche() {

                        defilementDePratiqueFicheVersLeHaut();
                        affichageAnimeDeLaDerniereLigneDePratiqueFicheBody();

                        function defilementDePratiqueFicheVersLeHaut() {
                            $('#pratique_fiche_body').animate({ scrollTop:$('#pratique_fiche_body')[0].scrollHeight }, 1000);
                        }
                        function affichageAnimeDeLaDerniereLigneDePratiqueFicheBody() {
                            $('#pratique_fiche_body .tr:last-child').css('height',0);
                            $('#pratique_fiche_body .tr:last-child').animate({'height':'1.5rem'}, 600);
                        }
                    }
                    function stylesDePratiqueFicheBody() {
                        $('#pratique_fiche_body div:last-child').addClass('pratique_tr_actif'); 
                        $('#pratique_fiche_body div:last-child').siblings().removeClass('pratique_tr_actif'); 
                    } 
                  
                    function afficherQuestionBouton() {
                        $('.repetition_btn').css('display','none');
                        $('.correction_btn').css('display','none');
                        $('.question_btn').css('display','block');
                    }
                    function effacerQuestion() { question = ''; }
                    function effacerReponse() {
                        reponse = reponse.split(',');
                        reponse.splice(0,reponse.length);
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
                        var progress_unity = $('#pratique_progress_bar').width()/reverseIntNko(quantite_de_question);
                                  
                        if(question != reponse){ 
                            $('.progress_question_bar').css('width','+='+progress_unity+'px');
                        }else{ 
                            $('.progress_question_bar, .progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                        }
                    }
                    function enregistrerPratique() {

                        point = (question == reponse) ? 1:0;
                        let question_reponse = [question,reponse,point];
                        
                        
                        switch(option_index) {
                            case 0 : actualiserOption(syllabes_1);   break;
                            case 1 : actualiserOption(syllabes_2);     break;
                            case 2 : actualiserOption(syllabes_3);    break;
                            case 3 : actualiserOption(syllabes_4); break;
                        }
                        
                        function actualiserOption(syllabe) {
                            let index = '';
                            
                            $.each(syllabe, function() {
                                if(question == this[0]) index = syllabe.indexOf(this);
                            });
                                
                            syllabe.splice(index,1,question_reponse); 
                        }
                    }
                    function noterOption(syllabe) {
                        for (var i = 0; i < syllabe.length; i++) { note += syllabe[i][2]; }
                        syllabe = [syllabe,note];
                    }
                    function stockerOptionDansLocalStorage(syllabe) {
                        if(note <  moyenne) alert( "ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߛߌߦߊߡߊ߲߫ ߡߊ߫ ߟߊߡߌ߬ߘߊ߬ ߌ ߓߟߏ߫. ߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬." );
                        if(note >= moyenne) localStorage.setItem(id+'_'+option_index, JSON.stringify(syllabe));
                    }
                    function finDOption() {

                        var option_de_syllabe = '', message_1 = '', message_2 = '';

                        if( question_limit === compteur+1 ) {
                            
                            option_de_syllabe = '';
                            option_de_syllabe = optionDeSyllabe();
                            
                            message_1 = 'ߌ ߞߎߟߎ߲ߖߋ߫.<br/>'+option_de_syllabe+'  ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ '+effort+' ߟߊ߫. ߌ ߘߌ߫ ߛߋ߫ ߥߊ߫ ߟߊ߫ ߢߍ ߝߍ߬.';
                            message_2 = 'ߌ ߘߐߖߊ߬. <br/>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߟߎ߬ ߟߊߡߌ߬ߘߊ ߢߊ߬ߣߍ߲߬ '+$("#pourcentage_point").html()+' ߟߋ߬ ߟߊ߫.<br/> ߘߌ߬ߢߍ߬ ߞߵߌ ߞߐߛߍ߬ߦߌ߬ ߦߙߐ ߣߌ߲߬ ߡߊ߬.';
                            
                       
                            switch(option_index) {
                                case 0 : noterOption(syllabes_1); stockerOptionDansLocalStorage(syllabes_1); break;
                                case 1 : noterOption(syllabes_2); stockerOptionDansLocalStorage(syllabes_2); break;
                                case 2 : noterOption(syllabes_3); stockerOptionDansLocalStorage(syllabes_3); break;
                                case 3 : noterOption(syllabes_4); stockerOptionDansLocalStorage(syllabes_4); break;
                            }
                            
                           // masquerClavierEtConsoles();
                            dimensionnementDeFinDePratiquesBody();
                            messageDeFinOption();
                            optionCallBack();
                            
                            function optionDeSyllabe() {
                                var option_de_syllabe = '';
                                        
                                switch(option_index) {
                                    case 0: option_de_syllabe='ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߞߋ߬ߟߋ߲߬ߡߊ'; break;
                                    case 1: option_de_syllabe='ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߝߌ߬ߟߊ߬ߡߊ'; break;
                                    case 2: option_de_syllabe='ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߛߓߊ߬ߡߊ'; break;
                                    case 3: option_de_syllabe='ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߣߊ߰ߣߌ߲߬ߡߊ'; break;
                                }
                                        
                                return option_de_syllabe;
                            }
                            function dimensionnementDeFinDePratiquesBody() {
                                
                                let pfh = $('#pratique_foot').height();
                                let mfch = $('#message_de_fin_container').height(); 
                                var pratique_fiche_head_height = $('#pratique_fiche_head').height(); 
                                var pratique_fiche_foot_height = $('#pratique_fiche_foot').height(); 

                                let pratique_fiche_height = pfh - mfch;
                                var pratique_fiche_body_height = pratique_fiche_height-pratique_fiche_head_height-pratique_fiche_foot_height; 
                                
                                
                                $('#pratique_fiche').css({'height':pratique_fiche_height+'px'});
                                $('#pratique_fiche_body').css({'display':'block', 'height':pratique_fiche_body_height+'px'});
                                $('#pratique_fiche_foot').css({'display':'block'});
                                $('#message_de_fin_container').css({'display':'block'});
                            }
                            function messageDeFinOption() {
                     
                                if(effort == '%߁߀߀') {

                                    if(option_index < 3) {
                                    
                                        $('#message_de_fin').html(message_1);
                                        $('#message_btn_1').html('ߛߍ߬ߦߌ߬ ߞߐ߫');
                                        $('#message_btn_2').html('ߥߊ߫ ߢߍ߫');
                                    }
                                    if(option_index === 3) {
                                      
                                        $('#message_de_fin').html(message_1);
                                        $('#message_btn_1').css('display','none');
                                        $('#message_btn_2').html(matiere_nom+' ߓߟߏߦߊߟߌ ߓߘߊ߫ ߓߊ߲߫');
                                        $('#message_btn_2').css('width','100%');
                                    }
                                    
                                }else{
                                    
                                    $('#message_de_fin').html(message_2);
                                    $('#message_btn_1').html('ߛߍ߬ߦߌ߬ ߞߐ߫');
                                    $('#message_btn_2').html('ߛߍ߬ߦߵߊ߬ ߡߊ߬');
                                }
                            }
                            function optionCallBack() {   
                                $('#message_btn_2').one('click', function() {
                                    var fin_status = '';
                                    
                                    initialiserPratiques();
                                    total_point = 0;
                                    
                                    if($('#message_btn_2').text() == 'ߥߊ߫ ߢߍ߫')   { changerDOption();   fin_status = "avancer"; }
                                    if($('#message_btn_2').text() == 'ߛߍ߬ߦߵߊ߬ ߡߊ߬') { reprendreOption(); fin_status = "reprendre"; }

                                    sessionStorage.setItem('fin_status',JSON.stringify(fin_status));

                                    function changerDOption() {

                                        let fin_status = JSON.parse(sessionStorage.getItem('fin_status'));
                                        let index = JSON.parse(sessionStorage.getItem('option_index'));
                                        let option_index = (fin_status == "avancer") ? index+1 : index;
                                        sessionStorage.setItem('option_index',JSON.stringify(option_index));
                                     
                                        questions_pratiques = questionsPratiques(option_index+1);
                                        sessionStorage.setItem('questions_option_suivante',JSON.stringify(questions_pratiques));
                                        changerStylesDesOptions();

                                        function changerStylesDesOptions() {
                                            option_active.removeClass('active');
                                            option_active.addClass('apprises');
                                            option_active.next().removeClass('a_apprendre');
                                            option_active.next().addClass('active');
                                        }
                                    }
                                    function reprendreOption() {

                                        let option_index = JSON.parse(sessionStorage.getItem('option_index'));
                                        questions = questionsPratiques(option_index); 
                                        //localStorage.removeItem(id+'_'+option_index);

                                    } 
                                });
                            }
                        }
                    }  
                    function revisionDOption() {
                            
                        $('#pratique_fiche_body .tr').on('click', function() {
                            
                            $(this).siblings().removeClass('pratique_tr_actif');
                            $(this).addClass('pratique_tr_actif'); 
                            
                            let question = $('.pratique_tr_actif .affiche_question').html(); 
                            let reponse = $('.pratique_tr_actif .affiche_reponse span:nth-child(1)').html();
                                          
                            let dossier_image = dossierImage();
                            
                            if(question == reponse) { nePasMettreCroixSurImage(); }
                            if(question != reponse) { mettreCroixSurImage(); }
     
                            $('#image_name').html(reponse);                                	        
                            $('#pratiques_images_container img').attr('src', dossier_image+reponse+'.jpg');                                	        
                        });
                    }
                }); 
            }
            function afficherClavier() { $('pratique_clavier_container').css('display','block'); }
            function masquerClavier() { $('pratique_clavier_container').css('display','none'); }
        });
    }
    function stockerPratique() {
        $('#fermer_pratique').on('click',function(){

            if(phase_index <  phase_nbr || nbr_option_non_vide < all_options.length) { return; }
            if(phase_index === phase_nbr && nbr_option_non_vide == all_options.length) {
                
                let DB_options = getDBOptions();
                let local_options = getLocalOptions();

                if(phase_index <  data_phase_nbr || nbr_option_non_vide < all_options.length) { return; }
                if(phase_index == data_phase_nbr && nbr_option_non_vide == all_options.length) {

                    note = noterPratique(); 

                /* Vérification de la validité de pratique:
                    Pourqu'une pratique soit valable, il faut que chaque option soit passée.
                    - Si non, la pratique est invalide et est retournée;
                    - Si oui, la pratique est valable et le processus de stockage est engagé. */
                                
                    if(note >= moyenne) {
                        let phase_nbr = nombreDePhasesEtudiees();
                
                        sendPratiqueToDB(); 
                        changerPhaseActive(phase_nbr);
                        sessionStorage.setItem('phase_nbr',JSON.stringify(phase_nbr)); 
                    }
                }
            }

            $('#pratique_phases').css('display','block');

            
            function noterPratique() {
                
                let note_total = 0;
                
                for (var i = 0; i < all_options.length; i++) {
                for (var j = 0; j < all_options[i].length; j++) {
                    note_total += all_options[i][j][2];
                }}
                
                let note = Math.floor(note_total/4);
             
                return note;
            }
            function sendPratiqueToDB() {

                let matiere = JSON.parse(sessionStorage.getItem('matiere_active'));
                let phase   = JSON.parse(sessionStorage.getItem('phase'));
                let lesson  = JSON.stringify(all_options);
                                
                const pratique_data = new URLSearchParams({
                    id     : id,
                    matiere: matiere,
                    niveau : niveau_en_cours,
                    phase  : phase,
                    lesson : lesson,
                    note   : note
                });

                fetch("/kouroukan/pages/actions.php", {
                    method: "POST",
                    body: pratique_data 
                })
                .then(response => response.text())
                .catch(error => console.log(error));
            }
            function deleteLocalOptions() {
                
                localStorage.removeItem(id+'_'+0);
                localStorage.removeItem(id+'_'+1);
                localStorage.removeItem(id+'_'+2);
                localStorage.removeItem(id+'_'+3);        
            }
        });
    }
    
    function initialiserDialogueBtn() {
            
        $('.repetition_btn').css('display','none');
        $('.correction_btn').css('display','none');
        $('.question_btn').css('display','block');
            
        $('.question_total').html(quantite_de_question);
        $('.question_ordre').html(parseIntNko(1)+'߭');
        $('.question_action').html('ߟߊߡߍ߲߫');
        
        compteur_de_question = 1;
        compteur = 0;
        total_point = 0;
    }
        
    function questionsPratiques(option_index) {
        
        var q = '';
        var questions = [];
                        
        switch(option_index) {
            case 0: q = malaxer(syllabes_1_total);   break;
            case 1: q = malaxer(syllabes_2_total);     break;
            case 2: q = malaxer(syllabes_3_total);    break;
            case 3: q = malaxer(syllabes_4_total); break;
        }
        for (var i = 0; i < question_limit; i++) questions[i] = q[i];
        
        return questions;
    }
    function decomposerEnSyllabes() {
        
        var character = question.split('');
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
    function masquerClavierEtConsoles() { $('.progress_bar, .clavier_container, #pratique_dialogue_btn').css('display','none'); }
    
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