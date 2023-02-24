
    var matiere_nom = $('#matiere_nom_container').html();

// Selection des differents éléments de fiche
    let travail = $('.travail');
    let travail_lesson = [];
    let fiche_phase = [];
    let travail_note = [];

    
// Recupération des lessons étudiées
    var matieres = JSON.parse(sessionStorage.getItem('matieres')); 
 
    if(matieres.length == 0) chargerAVideLesFiches();
 
    if(matieres.length !== 0) {
        if( matiere_nom == "ߛߓߍߛߎ߲" ) chargerTravaux(0);
        if( matiere_nom == "ߜߋ߲߭"    ) chargerTravaux(1);
        if( matiere_nom == "ߞߊ߲ߡߊߛߙߋ") chargerTravaux(2);
        if( matiere_nom == "ߖߊ߰ߕߋ߬ߘߋ߲") chargerTravaux(3);
    } 


    function chargerAVideLesFiches() {
        if(matiere_nom == "ߛߓߍߛߎ߲") $('#fiche_de_pratique').css('display','none');  // Masquer la partie pratique de Apprentissage.     
        
        var fiche_html = "<h1 class='neant'>ߝߏߦߊ߲߫ ߹</h1>";
        $('.travail_content').html(fiche_html);

        return false;
    }
    function chargerTravaux(n) {
          
        if(matieres[n] == undefined) chargerAVideLesFiches();
        if(matieres[n] != undefined) chargerLesFiches();

        
        function chargementInitialDesFiches() {
            var fiche_html = "<h1 class='neant'>ߝߏߦߊ߲߫ ߹</h1>";
            
            if(matieres[n][0] == undefined) $('#travail_1').html(fiche_html);
            if(matieres[n][1] == undefined) $('#travail_2').html(fiche_html);
            if(matieres[n][2] == undefined) $('#travail_3').html(fiche_html);
            if(matieres[n][3] == undefined) $('#travail_4').html(fiche_html);
        }
        function chargerLesFiches() {

            var fiches_html = [];
            chargementInitialDesFiches();

            if(matiere_nom == "ߛߓߍߛߎ߲") $('#fiche_de_pratique').css('display','none');  // Masquer la partie pratique de Apprentissage.     

            if(matieres[n]) {
            for (let i = 0; i < matieres[n].length; i++) {

                let fiche_phase  = matieres[n][i].phase.split('_')[1];
                let travail_lesson = matieres[n][i].lesson;   
                let travail_note   = parseIntNko(matieres[n][i].note);

                fiches_html[fiches_html.length] = [fiche_phase,travail_lesson,travail_note];
            }}
      
            for(var i=0; i<fiches_html.length; i++) {
                
                var phase_name = fiches_html[i][0];
                var travail_lesson = JSON.parse(fiches_html[i][1]);
                var travail_corps_html = travailCorpsHTML(travail_lesson);
                var travail_note = fiches_html[i][2];

    
                switch(phase_name) {
                    
                    case "apprentissage" : $('#travail_1_corps').html(travail_corps_html);     $('#travail_1_note').html(travail_note); break;
                    case "exercice"      : $('#travail_2_corps').html(travail_corps_html);     $('#travail_2_note').html(travail_note); break;

                    case "pratique"      : $('#travail_31_corps').html(travail_corps_html[0]); $('#travail_31_note').html(travail_note); 
                                           $('#travail_32_corps').html(travail_corps_html[1]); $('#travail_32_note').html(travail_note);
                                           $('#travail_33_corps').html(travail_corps_html[2]); $('#travail_33_note').html(travail_note);
                                           $('#travail_34_corps').html(travail_corps_html[3]); $('#travail_34_note').html(travail_note);
                                           break;

                    case "evaluation"    : $('#travail_4_corps').html(travail_corps_html);     $('#travail_4_note').html(travail_note); break;
                }

                function travailCorpsHTML(travail_lesson) {
                    var corps_html = "";
                    var pratique_travail_html = [];
                    var corps_html = "";

                    if(phase_name == "pratique") {
                        
                        for(var i=0; i<travail_lesson.length; i++) {
                        corps_html += "<table class='travail_corps_table' border=1>\n";
                            for(var j=0; j<3; j++) {                  
                                corps_html += "<tr>\n";
                                for(var k=0; k<travail_lesson[i].length; k++) {                  
                                    corps_html += "<td>"+travail_lesson[i][k][j]+"<td>\n";
                                }
                                corps_html += "</tr>\n";
                            }
                        corps_html += "</table>\n---\n";
                        }

                        corps_html = corps_html.split('---');
                    }

                    if(phase_name != "pratique") {
                        var corps_html = "<table class='travail_corps_table' border=1>\n";

                        corps_html += "<tr>\n";
                            for(let i=0; i<travail_lesson.length; i++) {
                                corps_html += "<td>"+travail_lesson[i][0]+"</td>\n";
                            }
                        corps_html += "</tr>\n";
                        corps_html += "<tr>\n";
                            for(let j=0; j<travail_lesson.length; j++) {
                                corps_html += "<td>"+travail_lesson[j][1]+"</td>\n";
                            }
                        corps_html += "</tr>\n";
                        corps_html += "<tr>\n";
                            for(let k=0; k<travail_lesson.length; k++) {
                                corps_html += "<td>"+parseIntNko(travail_lesson[k][2])+"</td>\n";
                            }
                        corps_html += "</tr>\n";
                        
                        corps_html += "</table>\n\n\n";

                    }

                    return  corps_html;
                }
            }
        }
    }