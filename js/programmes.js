/*Au click sur l'afficheur du programme 
    1)- On obtient le niveau d'étude de l'apprenant par analyse de sa situation.
    2)- On determine le programme en fonction de ce niveau d'étude.

-------------------------------------------------------------------------------------------------------------------------*/   

// Récupération du niveau d'avancement des études déterminé depuis accueil.js
let alphabet_data = JSON.parse(localStorage.getItem('alphabet_data'));
let memoire_syllabes_etudiees = JSON.parse(localStorage.getItem('memoire_syllabes_etudiees'));

var niveaux_etudies   = JSON.parse(sessionStorage.getItem('niveaux_etudies'));
var niveau_max        = JSON.parse(sessionStorage.getItem('niveau_max'));
var niveau_en_cours   = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
var matiere_nouvellement_apprise = JSON.parse(sessionStorage.getItem('matiere_nouvellement_apprise'));
var phases_etudiees   = JSON.parse(sessionStorage.getItem('phases_etudiees'));
var phases_distinctes = JSON.parse(sessionStorage.getItem('phases_distinctes'));
var derniere_phase    = JSON.parse(sessionStorage.getItem('derniere_phase'));
var option_retenue    = JSON.parse(localStorage.getItem('option_retenue'));

option_retenue = (memoire_syllabes_etudiees == null) ? null : option_retenue;

console.log('option_retenue = '+option_retenue);
console.log('alphabet_data = '+alphabet_data);
// localStorage.clear();

/*-----------------------------------------------------------------------------------------------------------------------*/

// Détermination du Programme
var programme_matieres = '';

selectionDuProgramme();
chargementDuProgramme();
styleDuProgramme();
afficherProgrammes();
// alerteDuProgramme();
lessonOptions()
styleDeOptionChoisie();
storagesDuProgramme();



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
    if(option_retenue != null) {
        if(niveau_en_cours === 1) {
            if(option_retenue == 1) {
                $('#programme_ul li:nth-child(1)').html(lessonOption11HTML());
                $('#lesson_options').css('display','none');
            }
            if(option_retenue == 2) $('#programme_ul li:nth-child(1)').html(lessonOption12HTML());
        }
        if(niveau_en_cours === 2) {
            if(option_retenue == 1) {
                $('#programme_ul li:nth-child(2)').html(lessonOption21HTML());
                $('#lesson_options').css('display','none');
            }
            if(option_retenue == 2) $('#programme_ul li:nth-child(2)').html(lessonOption22HTML());
        }
    }
        
    $('#programme_ul li:nth-child(1)').click(function() {
    
        let nom_de_lesson_a_etdier = $(this).text();

        $('#lesson_options_titre').text('ߌ ߢߣߊߕߊ߬ '+nom_de_lesson_a_etdier+' ߘߋ߲߰ߠߌ ߞߍߢߊ߫ ߝߌ߬ߟߊ ߢߌ߲߬ ߠߎ߬ ߘߐ߫'); 
        $('#lesson_option_1').html(lessonOption11HTML());
        $('#lesson_option_2').html(lessonOption12HTML());
        
        $('#lesson_option_1').click(function() {
            localStorage.removeItem("option_retenue");
            option_retenue = localStorage.setItem('option_retenue', JSON.stringify(1));
        });
        $('#lesson_option_2').click(function() {
            localStorage.removeItem("option_retenue");
            option_retenue = localStorage.setItem('option_retenue', JSON.stringify(2));
        });

        masquer($('#programmes_container'));
        afficherLessonOptions();

        function afficherLessonOptions() {
        
            $('#lesson_options').css('display','block'); 
            $('#lesson_options_titre, #lesson_option_1, #lesson_option_2').css({
                'opacity':0, 
                'transition':'0.3s', 
                'transform':'scaleY(0.75)'
            });
            setTimeout(() => { displayv($('#lesson_options_titre')); }, 100);
            setTimeout(() => { displayv($('#lesson_option_1')); }, 300);
            setTimeout(() => { displayv($('#lesson_option_2')); }, 500);
        }
    });
    
    $('#programme_ul li:nth-child(2)').click(function() {
        
        let nom_de_lesson_a_etdier = $(this).text();

        $('#lesson_options_titre').text('ߌ ߢߣߊߕߊ߬ '+nom_de_lesson_a_etdier+' ߘߋ߲߰ߠߌ ߞߍߢߊ߫ ߝߌ߬ߟߊ ߢߌ߲߬ ߠߎ߬ ߘߐ߫'); 
        $('#lesson_option_1').html(lessonOption21HTML());
        $('#lesson_option_2').html(lessonOption22HTML());

        $('#lesson_option_1').click(function() {
            localStorage.removeItem("option_retenue");
            option_retenue = localStorage.setItem('option_retenue', JSON.stringify(1));
        });
        $('#lesson_option_2').click(function() {
            localStorage.removeItem("option_retenue");
            option_retenue = localStorage.setItem('option_retenue', JSON.stringify(2));
        });

        masquer($('#programmes_container')); 
        afficher($('#lesson_options')); 
    });

    $('#fermer_lesson_option').click(function() { masquer($('#lesson_options')); }); 
    

    function lessonOption11HTML() {
                
        let option_1_html = '';

        var matiere_id    = liste_de_matieres[0][0];
        var matiere_nom   = liste_de_matieres[0][1];
        var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[0]);
        var niveau        = matiere_index+1; 
        var libele_du_choix_1 = (option_retenue == null) ? '<span>߁߭</span> - '+matiere_nom+' ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߮' : 'ߛߓߍߛߎ߲';                  
    
        if(niveau_max === 0) {

            var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&lesson_option=1';
            
            if(matiere_index === 0) option_1_html += '<a href="'+phases_lien+'" id="'+liste_de_matieres[0][0]+'">'+libele_du_choix_1+'</a>\n\n';
            if(matiere_index  >  0) option_1_html += '<a href="#">'+libele_du_choix_1+'</a>';
        }
        
        if(niveau_max > 0) {

            var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&phases_etudiees='+phases_etudiees+'&derniere_phase='+derniere_phase+'&lesson_option=1';
            
            if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                if(matiere_index > 0) option_1_html += '<a href="#">'+libele_du_choix_1+'</a>';
            }
            if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                option_1_html += '<a href="'+phases_lien+'" id="'+liste_de_matieres[0][0]+'">'+libele_du_choix_1+'</a>\n\n';
            }
        }

        return option_1_html;
    }
    function lessonOption12HTML() {
            
        let option_2_html = '';

        var matiere_id    = liste_de_matieres[0][0];
        var matiere_nom   = liste_de_matieres[0][1];
        var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[0]);
        var niveau        = matiere_index+1; 
        var libele_du_choix_1 = (option_retenue == null) ? '<span>߂߲</span> - '+matiere_nom+' ߜߘߏߓߊ߫ ߘߋ߲߮': 'ߛߓߍߛߎ߲';    
    
        if(niveau_max === 0) {

            var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&lesson_option=2';
            
            if(matiere_index === 0) option_2_html += '<a href="'+phases_lien+'" id="'+liste_de_matieres[0][0]+'">'+libele_du_choix_1+'</a>\n\n';
            if(matiere_index  >  0) option_2_html += '<a href="#">'+libele_du_choix_1+'</a>';
        }
        
        if(niveau_max > 0) {

            var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&phases_etudiees='+phases_etudiees+'&derniere_phase='+derniere_phase+'&lesson_option=2';
            
            if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                if(matiere_index > 0) option_2_html += '<a href="#">'+libele_du_choix_1+'</a>';
            }
            if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                option_2_html += '<a href="'+phases_lien+'" id="'+liste_de_matieres[0][0]+'">'+libele_du_choix_1+'</a>\n\n';
            }
        }

        return option_2_html;
    }
    function lessonOption21HTML() {
            
        let option_1_html = '';

        var matiere_id    = liste_de_matieres[1][0];
        var matiere_nom   = liste_de_matieres[1][1];
        var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[1]);
        var niveau        = matiere_index+1; 
        var libele_du_choix_1 = (option_retenue == null) ? '<span>߁߭</span> - '+matiere_nom+' ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߮' : 'ߜߋ߲߭';                  
    
        if(niveau_max === 0) {

            let phases_lien121 = '\
                lesson.php?matiere_id='+matiere_id+'\
                &matiere_index='+matiere_index+'\
                &matiere_nom='+matiere_nom+'\
                &niveau='+niveau+'\
                &niveau_max='+niveau_max+'\
                &lesson_option=1'
            ;
            
            if(matiere_index === 0) option_1_html += '<a href="'+phases_lien121+'" id="'+liste_de_matieres[1][0]+'">'+libele_du_choix_1+'</a>\n\n';
            if(matiere_index  >  0) option_1_html += '<a href="#">'+libele_du_choix_1+'</a>';
        }
        
        if(niveau_max > 0) {

            let phases_lien122 = '\
                lesson.php?matiere_id='+matiere_id+'\
                &matiere_index='+matiere_index+'\
                &matiere_nom='+matiere_nom+'\
                &niveau='+niveau+'\
                &niveau_max='+niveau_max+'\
                &phases_etudiees='+phases_etudiees+'\
                &derniere_phase='+derniere_phase+'\
                &lesson_option=1'
            ;
            
            if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                if(matiere_index > 0) option_1_html += '<a href="#">'+libele_du_choix_1+'</a>';
            }
            if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                option_1_html += '<a href="'+phases_lien122+'" id="'+liste_de_matieres[1][0]+'">'+libele_du_choix_1+'</a>\n\n';
            }
        }

        return option_1_html;
    }
    function lessonOption22HTML() {
            
        let option_2_html = '';

        var matiere_id    = liste_de_matieres[1][0];
        var matiere_nom   = liste_de_matieres[1][1];
        var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[1]);
        var niveau        = matiere_index+1; 
        var libele_du_choix_2 = (option_retenue == null) ? '<span>߂߲</span> - '+matiere_nom+' ߜߘߏߓߊ߫ ߘߋ߲߮': 'ߜߋ߲߭';                 
    
        if(niveau_max === 0) {

            let phases_lien221 = '\
                lesson.php?\
                matiere_id='+matiere_id+'\
                &matiere_index='+matiere_index+'\
                &matiere_nom='+matiere_nom+'\
                &niveau='+niveau+'\
                &niveau_max='+niveau_max+'\
                &lesson_option=2'
            ;
        
            if(matiere_index === 0) option_2_html = '<a href="'+phases_lien221+'" id="'+liste_de_matieres[1][0]+'">'+libele_du_choix_2+'</a>\n\n';
            if(matiere_index  >  0) option_2_html = '<a href="#">'+libele_du_choix_2+'</a>';
        }
        
        if(niveau_max > 0) {
            var phases_lien222 = '\
                lesson.php?matiere_id='+matiere_id+'\
                &matiere_index='+matiere_index+'\
                &matiere_nom='+matiere_nom+'\
                &niveau='+niveau+'\
                &niveau_max='+niveau_max+'\
                &phases_etudiees='+phases_etudiees+'\
                &derniere_phase='+derniere_phase+'\
                &lesson_option=2'
            ;
            
            if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                if(matiere_index > 0) option_2_html = '<a href="#">'+libele_du_choix_2+'</a>';
            }
            if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                option_2_html = '<a href="'+phases_lien222+'" id="'+liste_de_matieres[1][0]+'">'+libele_du_choix_2+'</a>\n\n';
            }
        }

        return option_2_html;
    }
}
function styleDeOptionChoisie() {
    if(option_retenue != null) {
        if(option_retenue == 1) { 
            $('#lesson_option_1').css('background','yellow');
            $('#lesson_option_1').click();
        }
        if(option_retenue == 2) { 
            $('#lesson_option_2').css('background','yellow');
            indexer($('#lesson_option_2'));
        }
    }
}
function storagesDuProgramme() {
    $('#programme_ul li').on('click', function(){
        sessionStorage.setItem('matiere_active', JSON.stringify($(this).attr('id'))); 
        sessionStorage.setItem('matiere_nom'   , JSON.stringify($(this).text()    )); 
        sessionStorage.setItem('matiere_index' , JSON.stringify($(this).index()   )); 
        sessionStorage.setItem('niveau_actif'  , JSON.stringify($(this).index()+1 )); 
    });
}