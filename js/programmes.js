/*Au click sur l'afficheur du programme 
    1)- On obtient le niveau d'étude de l'apprenant par analyse de sa situation.
    2)- On determine le programme en fonction de ce niveau d'étude.

-------------------------------------------------------------------------------------------------------------------------*/   

 // Récupération du niveau d'avancement des études déterminé depuis accueil.js
    var niveaux_etudies   = JSON.parse(sessionStorage.getItem('niveaux_etudies'));
    var niveau_max        = JSON.parse(sessionStorage.getItem('niveau_max'));
    var niveau_en_cours   = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var phases_etudiees   = JSON.parse(sessionStorage.getItem('phases_etudiees'));
    var phases_distinctes = JSON.parse(sessionStorage.getItem('phases_distinctes'));
    var derniere_phase    = JSON.parse(sessionStorage.getItem('derniere_phase'));

console.log('phases_etudiees = '+phases_etudiees);
console.log('niveaux_etudies = '+niveaux_etudies);
console.log('niveau_max = '+niveau_max);
console.log('niveau_en_cours = '+niveau_en_cours);
/*-----------------------------------------------------------------------------------------------------------------------*/
    
 // Détermination du Programme
    var programme_matieres = '';

    selectionDuProgramme();
    chargementDuProgramme();
    styleDuProgramme();
   // alerteDuProgramme();
    lessonOptions()
    storagesDuProgramme();


    function selectionDuProgramme() { 
        programme_matieres = document.getElementById('programme_matieres'); 
    }
    function chargementDuProgramme() {
        programme_matieres.innerHTML = programmeHTML();

        function programmeHTML() {
            var programme_html = '<ul id="programme_ul">';
     
            for (var i = 0; i < 2; i++) {    // Pour liste_de_matieres, voir caracteres.js

                var matiere_id    = liste_de_matieres[i][0];
                var matiere_nom   = liste_de_matieres[i][1];
                var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i]);
                var niveau        = matiere_index+1;                   
        
            
                if(niveau_max === 0) {
                    if(matiere_index === 0) programme_html += '<li id="'+liste_de_matieres[i][0]+'">'+liste_de_matieres[i][1]+'</li>\n\n';
                    if(matiere_index  >  0) programme_html += '<li>'+liste_de_matieres[i][1]+'</li>';
                }
                
                if(niveau_max > 0) {
                    if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                        if(matiere_index > 0) programme_html += '<li>'+liste_de_matieres[i][1]+'</li>';
                    }
                    if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                        programme_html += '<li id="'+liste_de_matieres[i][0]+'">'+liste_de_matieres[i][1]+'</li>\n\n';
                    }
                }
            }

            for (var i = 2; i < liste_de_matieres.length; i++) {    // Pour liste_de_matieres, voir caracteres.js

                var matiere_id    = liste_de_matieres[i][0];
                var matiere_nom   = liste_de_matieres[i][1];
                var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i]);
                var niveau        = matiere_index+1;                   
        
            
                if(niveau_max === 0) {

                    var phases_lien = '\
                        lesson.php?\
                        matiere_id='+matiere_id+'\
                        &matiere_index='+matiere_index+'\
                        &matiere_nom='+matiere_nom+'\
                        &niveau='+niveau+'\
                        &niveau_max='+niveau_max
                    ;
                    
                    if(matiere_index === 0) programme_html += '<li id="'+liste_de_matieres[i][0]+'"><a href="'+phases_lien+'">'+liste_de_matieres[i][1]+'</a></li>\n\n';
                    if(matiere_index  >  0) programme_html += '<li><a href="#">'+liste_de_matieres[i][1]+'</a></li>';
                }
                
                if(niveau_max > 0) {
                    
                    var phases_lien = '\
                        lesson.php?\
                        matiere_id='+matiere_id+'\
                        &matiere_index='+matiere_index+'\
                        &matiere_nom='+matiere_nom+'\
                        &niveau='+niveau+'\
                        &niveau_max='+niveau_max+'\
                        &phases_etudiees='+phases_etudiees+'\
                        &derniere_phase='+derniere_phase
                    ;
                    
                    if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                        if(matiere_index > 0) programme_html += '<li><a href="#">'+liste_de_matieres[i][1]+'</a></li>';
                    }
                    if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                        programme_html += '<li id="'+liste_de_matieres[i][0]+'"><a href="'+phases_lien+'">'+liste_de_matieres[i][1]+'</a></li>\n\n';
                    }
                }
            }
            programme_html += '</ul>';
               
            return programme_html;
        } 
    }          
    function styleDuProgramme() {
            
        // if(niveau_max > niveau_en_cours) niveau_max = niveau_en_cours;

        let programme_li = $("#programme_ul li");
            
        $.each(programme_li, function() {
            
            var matiere_index = $(this).index();
            
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
    function alerteDuProgramme() {
        $('#programme_ul li').on('click', function() {
            if($(this).hasClass('a_apprendre')) { alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫");   return false; }
            if($(this).hasClass('apprises'))    { alert("ߕߊ߲߬ߓߌ߬ ߓߘߊ߫ ߞߍ߫ ߦߊ߲߬ ߘߐ߫ ߞߘߐ߬ߡߊ߲߬"); return false; }
        });
    }
    function lessonOptions() {
        $('#programme_ul li:nth-child(1)').click(function() {
            
            let nom_de_lesson_a_etdier = $(this).text();

            $('#lesson_options_titre').text('ߌ ߢߣߊߕߊ߬ '+nom_de_lesson_a_etdier+' ߘߋ߲߰ߠߌ ߞߍߢߊ߫ ߝߌ߬ߟߊ ߢߌ߲߬ ߠߎ߬ ߘߐ߫'); 
            $('#lesson_option_1').html(lessonOption11HTML());
            $('#lesson_option_2').html(lessonOption12HTML());
            masquer($('#programmes_container')); 
            afficher($('#lesson_options')); 
           
            function lessonOption11HTML() {
                    
                let option_1_html = '';

                var matiere_id    = liste_de_matieres[0][0];
                var matiere_nom   = liste_de_matieres[0][1];
                var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[0]);
                var niveau        = matiere_index+1; 
                var libele_du_choix_1 = '<span>߁߭</span> - '+matiere_nom+' ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߮';                  
            
                if(niveau_max === 0) {

                    var phases_lien = '\
                        lesson.php?\
                        matiere_id='+matiere_id+'\
                        &matiere_index='+matiere_index+'\
                        &matiere_nom='+matiere_nom+'\
                        &niveau='+niveau+'\
                        &niveau_max='+niveau_max+'\
                        &lesson_option=1'
                    ;
                    
                    if(matiere_index === 0) option_1_html += '<a href="'+phases_lien+'" id="'+liste_de_matieres[0][0]+'">'+libele_du_choix_1+'</a>\n\n';
                    if(matiere_index  >  0) option_1_html += '<a href="#">'+libele_du_choix_1+'</a>';
                }
                
                if(niveau_max > 0) {

                    var phases_lien = '\
                        lesson.php?\
                        matiere_id='+matiere_id+'\
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
                var libele_du_choix_1 = '<span>߂߲</span> - '+matiere_nom+' ߜߘߏߓߊ߫ ߘߋ߲߮';                 
            
                if(niveau_max === 0) {

                    var phases_lien = '\
                        lesson.php?\
                        matiere_id='+matiere_id+'\
                        &matiere_index='+matiere_index+'\
                        &matiere_nom='+matiere_nom+'\
                        &niveau='+niveau+'\
                        &niveau_max='+niveau_max+'\
                        &lesson_option=2'
                    ;
                    
                    if(matiere_index === 0) option_2_html += '<a href="'+phases_lien+'" id="'+liste_de_matieres[0][0]+'">'+libele_du_choix_1+'</a>\n\n';
                    if(matiere_index  >  0) option_2_html += '<a href="#">'+libele_du_choix_1+'</a>';
                }
                
                if(niveau_max > 0) {

                    var phases_lien = '\
                        lesson.php?\
                        matiere_id='+matiere_id+'\
                        &matiere_index='+matiere_index+'\
                        &matiere_nom='+matiere_nom+'\
                        &niveau='+niveau+'\
                        &niveau_max='+niveau_max+'\
                        &phases_etudiees='+phases_etudiees+'\
                        &derniere_phase='+derniere_phase+'\
                        &lesson_option=2'
                    ;
                    
                    if (niveau_max < matiere_index || $('#'+matiere_id).hasClass('a_apprendre')) {
                        if(matiere_index > 0) option_2_html += '<a href="#">'+libele_du_choix_1+'</a>';
                    }
                    if (niveau_max >= matiere_index || $('#'+matiere_id).hasClass('active')) {
                        option_2_html += '<a href="'+phases_lien+'" id="'+liste_de_matieres[0][0]+'">'+libele_du_choix_1+'</a>\n\n';
                    }
                }

                return option_2_html;
            }
        });
        
        $('#programme_ul li:nth-child(2)').click(function() {
            
            let nom_de_lesson_a_etdier = $(this).text();
            let index_de_lesson = $(this).index();

            $('#lesson_options_titre').text('ߌ ߢߣߊߕߊ߬ '+nom_de_lesson_a_etdier+' ߘߋ߲߰ߠߌ ߞߍߢߊ߫ ߝߌ߬ߟߊ ߢߌ߲߬ ߠߎ߬ ߘߐ߫'); 
            $('#lesson_option_1').html(lessonOption21HTML());
            $('#lesson_option_2').html(lessonOption22HTML());
            masquer($('#programmes_container')); 
            afficher($('#lesson_options')); 
            
           
            function lessonOption21HTML() {
                    
                let option_1_html = '';

                var matiere_id    = liste_de_matieres[1][0];
                var matiere_nom   = liste_de_matieres[1][1];
                var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[1]);
                var niveau        = matiere_index+1; 
                var libele_du_choix_1 = '<span>߁߭</span> - '+matiere_nom+' ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߮';                  
            
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
                var libele_du_choix_2 = '<span>߂߲</span> - '+matiere_nom+' ߜߘߏߓߊ߫ ߘߋ߲߮';                 
            
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
        });

        $('#fermer_lesson_option').click(function() { masquer($('#lesson_options')); });
    }
    function storagesDuProgramme() {
        $('#programme_ul li').on('click', function(){
            sessionStorage.setItem('matiere_active', JSON.stringify($(this).attr('id'))); 
            sessionStorage.setItem('matiere_nom'   , JSON.stringify($(this).text()    )); 
            sessionStorage.setItem('matiere_index' , JSON.stringify($(this).index()   )); 
            sessionStorage.setItem('niveau_actif'  , JSON.stringify($(this).index()+1 )); 
        });
    }