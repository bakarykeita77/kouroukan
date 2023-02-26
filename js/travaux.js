
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

            var travail_html = [];

            var travail_d_apprentissage_corps_html = [];
            var travail_d_exercice_corps_html = [];
            var travail_de_pratique_corps_html = [];
            var travail_d_evaluation_corps_html = [];

            chargementInitialDesFiches();

            if(matiere_nom == "ߛߓߍߛߎ߲") $('#fiche_de_pratique').css('display','none');  // Masquer la partie pratique de Apprentissage.     

            if(matieres[n]) {
            for (let i = 0; i < matieres[n].length; i++) {

                let fiche_phase  = matieres[n][i].phase.split('_')[1];
                let travail_lesson = matieres[n][i].lesson;   
                let travail_note   = parseIntNko(matieres[n][i].note);

                if(fiche_phase == "apprentissage") travail_d_apprentissage_corps_html.push([fiche_phase,travail_lesson,travail_note]);
                if(fiche_phase == "exercice")      travail_d_exercice_corps_html.push([fiche_phase,travail_lesson,travail_note]);
                if(fiche_phase == "pratique")      travail_de_pratique_corps_html.push([fiche_phase,travail_lesson,travail_note]);
                if(fiche_phase == "evaluation")    travail_d_evaluation_corps_html.push([fiche_phase,travail_lesson,travail_note]);
            }}


            var n_apprentissage = travail_d_apprentissage_corps_html.length;
            var n_exercice = travail_d_exercice_corps_html.length;
            var n_pratique = travail_de_pratique_corps_html.length;
            var n_evaluation = travail_d_evaluation_corps_html.length;


            chargerTravail(travail_d_apprentissage_corps_html);
            chargerTravail(travail_d_exercice_corps_html);
            chargerTravail(travail_de_pratique_corps_html);
            chargerTravail(travail_d_evaluation_corps_html);
            designerCercles();
            
            
            rechargerApprentissage();
            rechargerExercice();
            rechargerPratique();
            rechargerEvaluation();

            
            function chargerTravail(content) {
                for(var i=0; i<content.length; i++) {
                            
                    var ordre_de_travail_html = "";
                    var phase_name = content[i][0];
                    var travail_lesson = JSON.parse(content[i][1]);
                    var travail_corps_html = travailCorpsHTML(travail_lesson);
                    var travail_note = content[i][2];
   

                    switch(phase_name) {
                        
                        case "apprentissage" : $('#ordre_d_apprentissage .ordres_glissiere').html(ordreDeTravailHTML(travail_d_apprentissage_corps_html));
                                               $('#travail_1_corps').html(travail_corps_html);
                                               $('#travail_1_note').html(travail_note); 
                                               break;
                        case "exercice"      : $('#ordre_d_exercice .ordres_glissiere').html(ordreDeTravailHTML(travail_d_exercice_corps_html));
                                               $('#travail_2_corps').html(travail_corps_html);     
                                               $('#travail_2_note').html(travail_note); 
                                               break;

                        case "pratique"      : $('#travail_31_corps').html(travail_corps_html[0]); $('#travail_31_note').html(travail_note); 
                                               $('#travail_32_corps').html(travail_corps_html[1]); $('#travail_32_note').html(travail_note);
                                               $('#travail_33_corps').html(travail_corps_html[2]); $('#travail_33_note').html(travail_note);
                                               $('#travail_34_corps').html(travail_corps_html[3]); $('#travail_34_note').html(travail_note);
                                               break;

                        case "evaluation"    : $('#ordre_d_evaluation .ordres_glissiere').html(ordreDeTravailHTML(travail_d_evaluation_corps_html));
                                               $('#travail_4_corps').html(travail_corps_html);     
                                               $('#travail_4_note').html(travail_note); 
                                               break;
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
                function ordreDeTravailHTML() {
                    var cercle = "";
                    
                    for (var i = 0; i < content.length; i++) {
                        cercle += "<p>"+parseIntNko(i+1)+"</p>";
                    }
                    return cercle;
                }
            }
            function rechargerApprentissage() {
                
                $('#ordre_d_apprentissage p').click(function() {

                    let constante = $(this).index();
                    let travail_lesson = JSON.parse(travail_d_apprentissage_corps_html[constante][1]);
                    let travail_corps_html = travailCorpsHTML(travail_lesson);
                    let travail_note = travail_d_apprentissage_corps_html[constante][2];

                    $('#travail_1_corps').html(travail_corps_html);
                    $('#travail_1_note').html(travail_note);
                });
            } 
            function rechargerExercice() {   
                $('#ordre_d_exercice p').click(function() {

                    let constante = $(this).index();
                    let travail_lesson = JSON.parse(travail_d_exercice_corps_html[constante][1]);
                    let travail_corps_html = travailCorpsHTML(travail_lesson);
                    let travail_note = travail_d_exercice_corps_html[constante][2];

                    $('#travail_2_corps').html(travail_corps_html);
                    $('#travail_2_note').html(travail_note);
                });
            }
            function rechargerPratique() {     
                $('#ordre_de_pratique p').click(function() {

                    var constante = $(this).index();
                    var travail_lesson = JSON.parse(travail_de_pratique_corps_html[constante][1]);
                    var travail_corps_html = travailCorpsHTML(travail_lesson);
                    var travail_note = travail_de_pratique_corps_html[constante][2];

                    $('#travail_31_corps').html(travail_corps_html[0]); $('#travail_31_note').html(travail_note); 
                    $('#travail_32_corps').html(travail_corps_html[1]); $('#travail_32_note').html(travail_note);
                    $('#travail_33_corps').html(travail_corps_html[2]); $('#travail_33_note').html(travail_note);
                    $('#travail_34_corps').html(travail_corps_html[3]); $('#travail_34_note').html(travail_note);

                    $('#travail_3_corps').html(travail_corps_html);
                    $('#travail_3_note').html(travail_note);
                });
            }
            function rechargerEvaluation() {     
                $('#ordre_d_evaluation p').click(function() {

                    var constante = $(this).index();
                    var travail_lesson = JSON.parse(travail_d_evaluation_corps_html[constante][1]);
                    var travail_corps_html = travailCorpsHTML(travail_lesson);
                    var travail_note = travail_d_evaluation_corps_html[constante][2];

                    $('#travail_4_corps').html(travail_corps_html);
                    $('#travail_4_note').html(travail_note);
                });
            }

            function travailCorpsHTML(lesson) {

                var corps_html = "";
                var pratique_travail_html = [];
                var corps_html = "";
                var phase_name = lesson[0];

                if(phase_name == "pratique") {
                    
                    for(var i=0; i<lesson.length; i++) {
                    corps_html += "<table class='travail_corps_table' border=1>\n";
                        for(var j=0; j<3; j++) {                  
                            corps_html += "<tr>\n";
                            for(var k=0; k<lesson[i].length; k++) {                  
                                corps_html += "<td>"+lesson[i][k][j]+"<td>\n";
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
                        for(let i=0; i<lesson.length; i++) {
                            corps_html += "<td>"+lesson[i][0]+"</td>\n";
                        }
                    corps_html += "</tr>\n";
                    corps_html += "<tr>\n";
                        for(let j=0; j<lesson.length; j++) {
                            corps_html += "<td>"+lesson[j][1]+"</td>\n";
                        }
                    corps_html += "</tr>\n";
                    corps_html += "<tr>\n";
                        for(let k=0; k<lesson.length; k++) {
                            corps_html += "<td>"+parseIntNko(lesson[k][2])+"</td>\n";
                        }
                    corps_html += "</tr>\n";
                    
                    corps_html += "</table>\n\n\n";

                }

                return  corps_html;
            }
            function designerCercles() {

                let nombre_de_cercle_1 = travail_d_apprentissage_corps_html.length;
                let nombre_de_cercle_2 = travail_d_exercice_corps_html.length;
                let nombre_de_cercle_3 = travail_de_pratique_corps_html.length;
                let nombre_de_cercle_4 = travail_d_evaluation_corps_html.length;

                $('#ordre_d_apprentissage .ordres_glissiere').css('width', nombre_de_cercle_1*2.75+'rem');
                $('#ordre_d_exercice .ordres_glissiere').css('width', nombre_de_cercle_2*2.75+'rem');
                $('#ordre_de_pratique .ordres_glissiere').css('width', nombre_de_cercle_3*2.75+'rem');
                $('#ordre_d_evaluation .ordres_glissiere').css('width', nombre_de_cercle_4*2.75+'rem');
            }
        }
    }