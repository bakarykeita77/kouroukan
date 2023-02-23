
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
        $('.fiche').html(fiche_html);

        return false;
    }
    function chargerTravaux(n) {
          
        if(matieres[n] == undefined) chargerAVideLesFiches();
        if(matieres[n] != undefined) chargerLesFiches();

        
        function chargementInitialDesFiches() {
            var fiche_html = "<h1 class='neant'>ߝߏߦߊ߲߫ ߹</h1>";
            
            if(matieres[n][0] == undefined) $('#travail_1_corps').html(fiche_html);
            if(matieres[n][1] == undefined) $('#fiche_2_corps').html(fiche_html);
            if(matieres[n][2] == undefined) $('#fiche_3').html(fiche_html);
            if(matieres[n][3] == undefined) $('#fiche_4').html(fiche_html);
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
                    
                    case "apprentissage" : $('#travail_1_corps').html(travail_corps_html); $('#travail_1_note').html(travail_note); break;
                    case "exercice"      : $('#travail_2_corps').html(travail_corps_html); $('#travail_2_note').html(travail_note); break;
                    case "pratiques"     : $('#travail_3_corps').html(travail_corps_html); $('#travail_3_note').html(travail_note); break;
                    case "evaluation"    : $('#travail_4_corps').html(travail_corps_html); $('#travail_4_note').html(travail_note); break;
                }

                function travailCorpsHTML(travail_lesson) {

                    var corps_html = "<table class='travail_corps_table' border=1>\n";
                    if(phase_name == "pratique") {
                  
                        for(var i=0; i<travail_lesson.length; i++) {
                            corps_html += "<tr>\n";           
                            corps_html += "<td>";
                            corps_html += "<table>";
                            for(var j=0; j<3; j++) {                  
                                corps_html += "<tr>\n";
                                for(var k=0; k<travail_lesson[i].length; k++) {                  
                                    corps_html += "<td>"+travail_lesson[i][k][j]+"<td>\n";
                                }
                                corps_html += "</tr>\n";
                            }
                            corps_html += "</table>\n";
                            corps_html += "</td>\n";
                            corps_html += "</tr>\n";
                        }
                        corps_html += "</table>\n";
    console.log(corps_html);
                    }

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
                    corps_html += "</table>\n";

                    return  corps_html;
                }
            }
        }
    }
    function fichePratiqueHTML() {
        var pratique_html = "";

        for(var h=0; h<travail_lesson.length; h++) {

            let entete_html = ficheDePratiqueEnteteHTML();
            var corps_html  = ficheDePratiqueCorpsHTML();
            let foot_html   = ficheDePratiqueFootHTML();

            pratique_html += "<div class='t'>\n"; 
                pratique_html += "<div class='t1'>"+entete_html+"</div>\n\n";
                pratique_html += "<div class='t2'>"+corps_html+"</div>\n\n";       
                pratique_html += "<div class='t3'>"+foot_html+"</div>\n\n";
            pratique_html += "</div>\n\n\n\n";
                    
            function ficheDePratiqueEnteteHTML() {
                let entete_html = "<table border=1>\n";
                entete_html += "<tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>\n";
                entete_html += "<tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>\n";
                entete_html += "<tr><td>ߓߙߍ߬ߦߊ</td></tr>\n";
                entete_html += "</table>\n";

                return entete_html;
            }
            function ficheDePratiqueCorpsHTML() {
                let corps_html = "<table border=1>\n";

                for(var i=0;i<3; i++) {
                    corps_html += "<tr>\n";
                    for(var j=0; j<travail_lesson[h].length; j++) { corps_html += "<td>"+travail_lesson[h][j][i]+"</td>\n"; }
                    corps_html += "</tr>\n";
                }
                corps_html += "</table>\n";

                return  corps_html;
            }
            function ficheDePratiqueFootHTML() {
                
                let travail_note = parseIntNko(note3()); 
                
                let foot_html = "<table border=1>\n";
                foot_html += "<tr><td> ߓߍ߬ߙߍ</td></tr>\n";
                foot_html += "<tr><td> ߡߎ߬ߡߍ</td></tr>\n";
                foot_html += "<tr><td>"+travail_note+"</td></tr>\n";
                foot_html += "</table>\n";
        
                return foot_html;

                function note3() {
                    let travail_note = 0;
                    for(var i=0; i<travail_lesson[h].length; i++) {
                        travail_note += travail_lesson[h][i][2];
                    }

                    return travail_note;
                }
            }
        }
                
        return pratique_html
    }