/*Au click sur l'afficheur du programme 
    1)- On obtient le niveau d'étude de l'apprenant par analyse de sa situation.
    2)- On determine le programme en fonction de ce niveau d'étude.

-------------------------------------------------------------------------------------------------------------------------*/   

// Récupération du niveau d'avancement des études déterminé depuis accueil.js
let datas = JSON.parse(sessionStorage.getItem('datas'));
console.log(datas);
let pre_apprentissage_alpabet_memoire = JSON.parse(localStorage.getItem('pre_apprentissage_alpabet_memoire'));
let pre_exercice_alpabet_memoire = JSON.parse(localStorage.getItem('pre_exercice_alpabet_memoire'));
let pre_evaluation_alpabet_memoire = JSON.parse(localStorage.getItem('pre_evaluation_alpabet_memoire'));

let memoire_syllabes_etudiees = JSON.parse(localStorage.getItem('memoire_syllabes_etudiees'));

var niveaux_etudies = JSON.parse(sessionStorage.getItem('niveaux_etudies'));
var niveau_max = JSON.parse(sessionStorage.getItem('niveau_max'));
var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
var matiere_nouvellement_apprise = JSON.parse(sessionStorage.getItem('matiere_nouvellement_apprise'));

datas[niveau_max] = (datas[niveau_max] == undefined) ? [] : datas[niveau_max];

var phases_etudiees_du_serveur = (datas[niveau_max].length == 0) ? [] : phasesEtudieesDuServeur(datas[niveau_max]);
var phases_etudiees = (datas[niveau_max].length == 0) ? [] : JSON.parse(sessionStorage.getItem('phases_etudiees'));
var phases_distinctes = JSON.parse(sessionStorage.getItem('phases_distinctes'));
var derniere_phase = sessionStorage.getItem('derniere_phase');
var lesson_option = JSON.parse(localStorage.getItem('lesson_option'));
var option_retenue = JSON.parse(localStorage.getItem('option_retenue'));

let phase_index = (phases_etudiees == null) ? 0 : phases_etudiees.length - 1;

phases_etudiees = (phases_etudiees == null) ? [] : phases_etudiees;
phases_etudiees = (phases_etudiees_du_serveur.length == 0) ? phases_etudiees : phases_etudiees_du_serveur; 



// localStorage.clear();

/*-----------------------------------------------------------------------------------------------------------------------*/

// Détermination du Programme
var programme_matieres = '';

selectionDuProgramme();
chargementDuProgramme();
styleDuProgramme();
afficherProgrammes();
// alerteDuProgramme();
lessonOptions();

storagesDuProgramme();


function alphabetData() {
    let alphabet_apprentissage_data = lessonDApprentissagePreAlphabet();
    let alphabet_exercice_data = lessonDExercicePreAlphabet();
    let alphabet_evaluation_data = lessonDEvaluationPreAlphabet();

    let a_d = [alphabet_apprentissage_data, alphabet_exercice_data, alphabet_evaluation_data];
    return a_d;
}
function syllabesData() {
    let syllabes_apprentissage_data = syllabesApprentisageDataMemo();
    let syllabes_exercice_data = syllabesExerciceDataMemo();
    let syllabes_evaluation_data = syllabesEvaluationDataMemo();

    let s_d = [syllabes_apprentissage_data, syllabes_exercice_data, syllabes_evaluation_data];
    return s_d;
}
function selectionDuProgramme() { 
    programme_matieres = document.getElementById('programme_matieres'); 
}
function chargementDuProgramme() {
   
    programme_matieres.innerHTML = programmeHTML();

    function programmeHTML() {
        var programme_html = '<ul id="programme_ul">\n\n';

        for (var i = 0; i < 2; i++) {    // Pour liste_de_matieres, voir caracteres.js

            var matiere_id = liste_de_matieres[i][0];
            var matiere_nom = liste_de_matieres[i][1];
            var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i]);
            var niveau = matiere_index+1; 
        
            if(niveau_max === 0) {
                if(matiere_index === 0) programme_html += '<li id="'+matiere_id+'">'+matiere_nom+'</li>\n';
                if(matiere_index  >  0) programme_html += '<li>'+matiere_nom+'</li>\n';
            }
            
            if(niveau_max > 0) {
                if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                    if(matiere_index > 0) programme_html += '<li>'+matiere_nom+'</li>\n';
                }
                if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                    programme_html += '<li id="'+matiere_id+'">'+matiere_nom+'</li>\n';
                }
            }
        }

        for (var i = 2; i < liste_de_matieres.length; i++) {    // Pour liste_de_matieres, voir caracteres.js

            var matiere_id = liste_de_matieres[i][0];
            var matiere_nom = liste_de_matieres[i][1];
            var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i]);
            var niveau = matiere_index+1;                   
           
            if(niveau_max === 0) {

                var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max;
                
                if(matiere_index === 0) programme_html += '<li id="'+matiere_id+'"><a href="'+phases_lien+'">'+matiere_nom+'</a></li>\n';
                if(matiere_index  >  0) programme_html += '<li><a href="#">'+matiere_nom+'</a></li>\n';
            }
            
            if(niveau_max > 0) {
                
                var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&phases_etudiees='+phases_etudiees+'&derniere_phase='+derniere_phase;

                if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                    if(matiere_index > 0) programme_html += '<li><a href="#">'+matiere_nom+'</a></li>\n';
                }
                if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                    programme_html += '<li id="'+matiere_id+'"><a href="'+phases_lien+'">'+matiere_nom+'</a></li>\n';
                }
            }
        }
        programme_html += '\n</ul>';
        
        return programme_html;
    } 
}          
function styleDuProgramme() {
    
    // if(niveau_max > niveau_en_cours) niveau_max = niveau_en_cours;

    let programme_li = $("#programme_ul li");

    if(matiere_nouvellement_apprise != null) {
        $.each(programme_li, function() {
            let li_actif = $(this);
            if(li_actif.text() == matiere_nouvellement_apprise) {
                $('#programme_ul li').removeClass('apprises actif indicateur').addClass('a_apprendre');
                li_actif.prev().removeClass('a_apprendre').addClass('apprises');
                li_actif.removeClass('a_apprendre actif indicateur').addClass('apprises');
                li_actif.next().removeClass('a_apprendre').addClass('actif indicateur');
            }
        });
    } 
    if(matiere_nouvellement_apprise == null) {
        $.each(programme_li, function() {
            
            let matiere_index = $(this).index();
            
            if(niveau_max === 0) {
                if(matiere_index === 0) $(this).addClass("actif");
                if(matiere_index  >  0) $(this).addClass("a_apprendre");
            }
            if(niveau_max > 0) {
                if($.inArray(matiere_index+1,niveaux_etudies) !== -1) $(this).addClass("apprises");
                if($.inArray(matiere_index+1,niveaux_etudies) === -1) $(this).addClass("a_apprendre");
                if(matiere_index+1 === niveau_en_cours) $(this).removeClass("a_apprendre").addClass("actif");
            }
        });
    } 
    indexer($('.actif'));
}
function afficherProgrammes() {
    setTimeout(() => { displayv($("#programmes_container h1")); }, 100);
    setTimeout(() => { displayv($("#programme_commentaire")); }, 400);
    setTimeout(() => {
        displayv($("#programme_matieres"));
        displayv($("#programme_ul"));
    }, 600);
}
function alerteDuProgramme() {
    $('#programme_ul li').on('click', function() {
        if($(this).hasClass('a_apprendre')) { alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫");   return false; }
        if($(this).hasClass('apprises'))    { alert("ߕߊ߲߬ߓߌ߬ ߓߘߊ߫ ߞߍ߫ ߦߊ߲߬ ߘߐ߫ ߞߘߐ߬ߡߊ߲߬"); return false; }
    });
}
function lessonOptions() {
    
    var matiere_id = (niveau_en_cours == 1) ? liste_de_matieres[0][0] : liste_de_matieres[1][0];
    var matiere_nom = (niveau_en_cours == 1) ? liste_de_matieres[0][1] : liste_de_matieres[1][1];
    var matiere_index = (niveau_en_cours == 1) ?  0 : 1;
    var niveau = (niveau_en_cours == 1) ? 1 : 2;          

    var libele_du_choix_11 = '<span>߁߭</span> - '+matiere_nom+' ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߮';
    var libele_du_choix_12 = '<span>߂߲</span> - '+matiere_nom+' ߜߘߏߓߊ߫ ߘߋ߲߮'; 
    let option_du_serveur = optionDuServeur();
    
    option_retenue = (option_retenue ==null) ? option_du_serveur : option_retenue;
    
    let phase_lien = phaseLien();

    console.log('option_retenue = '+option_retenue);
    console.log('phase_lien = '+phase_lien);

    if(location.href.split('=')[1] == 'option') {
        $('.page_body').css('display','none');
        chargerLesOptions();
        stockerLOption();
        afficherLessonOptions();
        annulerApprentissageEnCours();
    }
         
    $('#programme_ul li:nth-child(1), #programme_ul li:nth-child(2)').click(function() {
        let matiere_index = $(this).index();
        
        if(option_retenue != null) {
            $('.page_body').css('display','none');
            location.assign(phase_lien);
        }
        if(option_retenue == null) {         
            if(datas[matiere_index].length === 0) {
                $('.page_body').css('display','none');
                chargerLesOptions();
                stockerLOption();
                afficherLessonOptions();
            }

            if(datas[matiere_index].length != 0) {
                let data_lesson = JSON.parse(datas[matiere_index][phase_index].lesson);
                if(tableau2DVide(data_lesson)) {
                    $('.page_body').css('display','none');
                    chargerLesOptions();
                    stockerLOption();
                    afficherLessonOptions();
                }
                if(!tableau2DVide(data_lesson)) {
                    $('.page_body').css('display','none');
                    location.assign(phase_lien);
                }
            }
        }
    });

    $('#fermer_lesson_option').click(function() { masquer($('#lesson_options')); }); 
    

    function optionDuServeur() {
        datas[matiere_index] = (datas[matiere_index] == null) ? [] : datas[matiere_index];
        let option = (datas[matiere_index].length === 0) ? null : 2;
        return option;
    }
    function phaseLien() {
        let phase_lien_1 = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+0+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&lesson_option='+option_retenue;
        let phase_lien_2 = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+1+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&phases_etudiees='+phases_etudiees+'&derniere_phase='+derniere_phase+'&lesson_option='+option_retenue;
        let pl = '';
        pl = (niveau_max == 0) ? phase_lien_1 : phase_lien_2;
        return pl;
    }
    function chargerLesOptions() {

        if(niveau_en_cours === 1) {
            $('#lesson_options_titre').text('ߌ ߢߣߊߕߊ߬ ߛߓߍߛߎ߲ ߘߋ߲߰ߠߌ ߞߍߢߊ߫ ߝߌ߬ߟߊ ߢߌ߲߬ ߠߎ߬ ߘߐ߫'); 
            $('#lesson_option_1').html(lessonOption1HTML());
            $('#lesson_option_2').html(lessonOption2HTML());
        }
        if(niveau_en_cours === 2) {
            $('#lesson_options_titre').text('ߌ ߢߣߊߕߊ߬ ߜߋ߲߭ ߘߋ߲߰ߠߌ ߞߍߢߊ߫ ߝߌ߬ߟߊ ߢߌ߲߬ ߠߎ߬ ߘߐ߫'); 
            $('#lesson_option_1').html(lessonOption1HTML());
            $('#lesson_option_2').html(lessonOption2HTML());
        }

        function lessonOption1HTML() {
                    
            let option_html = '';

            if(niveau_max === 0) {
                if(matiere_index === 0) option_html += '<a href="'+phase_lien+'" id="'+matiere_id+'">'+libele_du_choix_11+'</a>\n\n';
                if(matiere_index  >  0) option_html += '<a href="#">'+libele_du_choix_11+'</a>';
            }
            
            if(niveau_max > 0) {
                if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                    if(matiere_index > 0) option_html += '<a href="#">'+libele_du_choix_11+'</a>';
                }
                if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                    option_html += '<a href="'+phase_lien+'" id="'+matiere_id+'">'+libele_du_choix_11+'</a>\n\n';
                }
            }

            return option_html;
        }
        function lessonOption2HTML() {
                
            let option_html = '';

            if(niveau_max === 0) {
                if(matiere_index === 0) option_html += '<a href="'+phase_lien+'" id="'+matiere_id+'">'+libele_du_choix_12+'</a>\n\n';
                if(matiere_index  >  0) option_html += '<a href="#">'+libele_du_choix_12+'</a>';
            }
            
            if(niveau_max > 0) {
                if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                    if(matiere_index > 0) option_html += '<a href="#">'+libele_du_choix_12+'</a>';
                }
                if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                    option_html += '<a href="'+phase_lien+'" id="'+matiere_id+'">'+libele_du_choix_12+'</a>\n\n';
                }
            }

            return option_html;
        }
    }
    function stockerLOption() {
        $('#lesson_option_1').click(function() {
            localStorage.removeItem("option_retenue");
            option_retenue = 1;
            localStorage.setItem('option_retenue', JSON.stringify(option_retenue));
        });
        $('#lesson_option_2').click(function() {
            localStorage.removeItem("option_retenue");
            option_retenue = 2;
            localStorage.setItem('option_retenue', JSON.stringify(option_retenue));
        });
    }
    function afficherLessonOptions() {
        afficher($('#lesson_options')); 
        $('#lesson_options_titre, #lesson_option_1, #lesson_option_2').css({
            'opacity':0, 
            'transition':'0.3s', 
            'transform':'scaleY(0.75)'
        });
        setTimeout(() => { displayv($('#lesson_options_titre')); }, 100);
        setTimeout(() => { displayv($('#lesson_option_1')); }, 300);
        setTimeout(() => { displayv($('#lesson_option_2')); }, 500);
    }
    function annulerApprentissageEnCours() {

        let matiere = matiereActuelle();
        let id_client =  parseInt(JSON.parse(sessionStorage.getItem('id')));
        let action = 'supprimer_matiere_en_cours';

        sendDataToDeleteLesson(matiere,id_client,action);
        console.log('La lesson en cours est annulée');

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
        
        function matiereActuelle() {
            let ma = '';
            switch(niveau_en_cours) {
                case 1 : ma = 'alphabet'; break;
                case 2 : ma = 'syllabes'; break;
            }
            return ma;
        }  
        function sendDataToDeleteLesson(matiere,id_client,action) {

            const data_to_send = new URLSearchParams({
                matiere: matiere,
                id : id_client,
                action : action
            }); 

            fetch("/kouroukan/php/actions.php", {
                method: "POST",
                body: data_to_send
            })
            .then(response => response.text())
            .catch(error => console.log(error));  
        }
    }
}
function storagesDuProgramme() {
    $('#programme_ul li').on('click', function(){
        sessionStorage.setItem('matiere_active', JSON.stringify($(this).attr('id'))); 
        sessionStorage.setItem('matiere_nom', JSON.stringify($(this).text())); 
        sessionStorage.setItem('matiere_index', JSON.stringify($(this).index())); 
        sessionStorage.setItem('niveau_actif', JSON.stringify($(this).index()+1)); 
        sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees)); 
    });
}