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

/*-----------------------------------------------------------------------------------------------------------------------*/
 
// Détermination du Programme
 var programme_matieres = '';

 selectionDuProgramme();
 chargementDuProgramme();
 styleDuProgramme();
// alerteDuProgramme();
 storagesDuProgramme();


 function selectionDuProgramme() { 
     programme_matieres = document.getElementById('programme_matieres'); 
 }
 function chargementDuProgramme() {
     programme_matieres.innerHTML = programmeHTML();

     function programmeHTML() {
         var programme_html = '<ul id="programme_ul">';
     
         for (var i = 0; i < liste_de_matieres.length; i++) {    // Pour liste_de_matieres, voir caracteres.js

             var matiere_id    = liste_de_matieres[i][0];
             var matiere_nom   = liste_de_matieres[i][1];
             var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i]);
             var niveau        = matiere_index+1;                   
     
         
             if(niveau_max === 0) {
                 var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max;
                 
                 if(matiere_index === 0) programme_html += '<li id="'+liste_de_matieres[i][0]+'"><a href="'+phases_lien+'">'+liste_de_matieres[i][1]+'</a></li>\n\n';
                 if(matiere_index  >  0) programme_html += '<li><a href="#">'+liste_de_matieres[i][1]+'</a></li>';
             }
             
             if(niveau_max > 0) {
                 var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&phases_etudiees='+phases_etudiees+'&derniere_phase='+derniere_phase;
                 
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
         
     if(niveau_max > niveau_en_cours) niveau_max = niveau_en_cours;

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
 function storagesDuProgramme() {
     $('#programme_ul li').on('click', function(){
         sessionStorage.setItem('matiere_active', JSON.stringify($(this).attr('id'))); 
         sessionStorage.setItem('matiere_nom'   , JSON.stringify($(this).text()    )); 
         sessionStorage.setItem('matiere_index' , JSON.stringify($(this).index()   )); 
         sessionStorage.setItem('niveau_actif'  , JSON.stringify($(this).index()+1 )); 
     });
 }