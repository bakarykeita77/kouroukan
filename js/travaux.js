
    var matiere_nom = $('#matiere_nom_container').html();

// Selection des differents éléments de fiche
    let travail = $('.travail');
    let fiche_lesson = [];
    let fiche_note = [];

    
// Recupération des lessons étudiées
    var matieres = JSON.parse(sessionStorage.getItem('matieres')); 

console.log(matieres);
    if(matieres.length == 0) initialiserTravaux();
 
    if(matieres.length !== 0) {
        if( matiere_nom == "ߛߓߍߛߎ߲" ) chargerTravaux(0);
        if( matiere_nom == "ߜߋ߲߭"    ) chargerTravaux(1);
        if( matiere_nom == "ߞߊ߲ߡߊߛߙߋ") chargerTravaux(2);
        if( matiere_nom == "ߖߊ߰ߕߋ߬ߘߋ߲") chargerTravaux(3);
    } 


    function initialiserTravaux() {
        $('#fiche_de_pratique').css('display','none');  // Masquer la partie pratique de Apprentissage.
        
        var fiche_html = "<h1 class='neant'>ߝߏߦߊ߲߫ ߹</h1>";
        $('.fiche').html(fiche_html);
    }
    function chargerTravaux(n) {
        chargementParDefautDesFiches();

        if(matiere_nom == "ߛߓߍߛߎ߲") $('#fiche_de_pratique').css('display','none');  // Masquer la partie pratique de Apprentissage.     

        if(matieres[n][0]) {

            fiche_lesson = matieres[n][0].lesson;
            fiche_lesson = JSON.parse(fiche_lesson);    
            fiche_note = parseIntNko(matieres[n][0].note);

            var fiche = $('#fiche_1');
            var fiche_html = ficheApprentissageHTML();

            fiche.html(fiche_html);
        }
        if(matieres[n][1]) {

            fiche_lesson = matieres[n][1].lesson;
            fiche_lesson = JSON.parse(fiche_lesson);
            fiche_note = parseIntNko(matieres[n][1].note);

            var fiche = $('#fiche_2');
            var fiche_html = ficheExerciceEtEvaluationCorpsHTML();

            fiche.html(fiche_html);
        }
        if( matiere_nom == "ߛߓߍߛߎ߲" ) {
            
            if(matieres[n][2]) {
                
                fiche_lesson = matieres[n][2].lesson;
                fiche_lesson = JSON.parse(fiche_lesson);
                fiche_note = parseIntNko(matieres[n][2].note);

                var fiche = $('#fiche_4');
                var fiche_html = ficheExerciceEtEvaluationCorpsHTML();

                fiche.html(fiche_html);
            }
        }else{
            if(matieres[n][2]) {
                fiche_lesson = matieres[n][2].lesson;
                fiche_lesson = JSON.parse(fiche_lesson);
    
                let pratique = $('#fiche_3');
                let pratique_html = fichePratiqueHTML();
    
                pratique.html(pratique_html);
            }
        }
        if(matieres[n][3]) {
            fiche_lesson = matieres[n][3].lesson;
            fiche_lesson = JSON.parse(fiche_lesson);
            fiche_note = parseIntNko(matieres[n][3].note);

            var fiche = $('#fiche_4');
            var fiche_html = ficheExerciceEtEvaluationCorpsHTML();

            fiche.html(fiche_html);
        }

        
        function chargementParDefautDesFiches() {
            var fiche_html = "<h1 class='neant'>ߝߏߦߊ߲߫ ߹</h1>";
            
            if(matieres[n] == undefined) $('.fiche').html(fiche_html);
            
            if(matieres[n][0] == undefined) $('#fiche_1').html(fiche_html);
            if(matieres[n][1] == undefined) $('#fiche_2').html(fiche_html);
            if(matieres[n][2] == undefined) $('#fiche_3').html(fiche_html);
            if(matieres[n][3] == undefined) $('#fiche_4').html(fiche_html);
        }
    }
    
    function ficheEnteteHTMLPourApprentissage() {
        var entete_html = "<table border=1>";
        entete_html += "<tr><td>"+matiere_nom+"</td></tr>";
        entete_html += "<tr><td>ߘߌ߯ߟߌ</td></tr>";
        entete_html += "</table>";

        return entete_html;
    }
    function ficheCorpsHTMLPourApprentissage() {
        var corps_html = "<table border=1>";
        corps_html+= "<tr>";
                for(let i=0; i<fiche_lesson.length; i++) {
                corps_html+= "<td>"+fiche_lesson[i][0]+"</td>";
                }
        corps_html+= "</tr>";
        corps_html+= "<tr>";
                for(let j=0; j<fiche_lesson.length; j++) {
                corps_html+= "<td>"+parseIntNko(fiche_lesson[j][1])+"</td>";
                }
        corps_html+= "</tr>";
        corps_html+= "</table>";

        return  corps_html;
    }
    function ficheFootHTMLPourApprentissage() {
        var foot_html= "<table border=1>";
        foot_html+= "<tr><td> ߡߎ߬ߡߍ</td></tr>";
        foot_html+= "<tr><td>"+fiche_note+"</td></tr>";
        foot_html+= "</table>";

        return foot_html;
    }
    function ficheEnteteHTML() {
        var entete_html = "<table border=1>\n";
        entete_html += "<tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>\n";
        entete_html += "<tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>\n";
        entete_html += "<tr><td>ߓߙߍ߬ߦߊ</td></tr>\n";
        entete_html += "</table>\n";

        return entete_html;
    }
    function ficheCorpsHTML() {
        var corps_html = "<table border=1>\n";
        corps_html += "<tr>\n";
            for(let i=0; i<fiche_lesson.length; i++) {
                corps_html += "<td>"+fiche_lesson[i][0]+"</td>\n";
            }
        corps_html += "</tr>\n";
        corps_html += "<tr>\n";
            for(let j=0; j<fiche_lesson.length; j++) {
                corps_html += "<td>"+fiche_lesson[j][1]+"</td>\n";
            }
        corps_html += "</tr>\n";
            corps_html += "<tr>\n";
                for(let k=0; k<fiche_lesson.length; k++) {
                    corps_html += "<td>"+parseIntNko(fiche_lesson[k][2])+"</td>\n";
                }
        corps_html += "</tr>\n";
        corps_html += "</table>\n";

        return  corps_html;
    }
    function ficheFootHTML() {
        var foot_html = "<table border=1 width=100>\n";
        foot_html += "<tr><td> ߓߍ߬ߙߍ</td></tr>\n";
        foot_html += "<tr><td> ߡߎ߬ߡߍ</td></tr>\n";
        foot_html += "<tr><td>"+fiche_note+"</td></tr>\n";
        foot_html += "</table>\n";

        return foot_html;
    }

    function ficheApprentissageHTML() {

        var entete_html = ficheEnteteHTMLPourApprentissage();
        var corps_html  = ficheCorpsHTMLPourApprentissage();
        var foot_html   = ficheFootHTMLPourApprentissage();
    
        var fiche_html = "";

        fiche_html += "<div class='t'>\n";
            fiche_html += "<div class='t1'>"+entete_html+"</div>\n";
            fiche_html += "<div class='t2'>"+corps_html+"</div>\n";
            fiche_html += "<div class='t3'>"+foot_html+"</div>\n";
        fiche_html += "</div>\n";

        return fiche_html;
    }
    function fichePratiqueHTML() {
        var pratique_html = "";

        for(var h=0; h<fiche_lesson.length; h++) {

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
                    for(var j=0; j<fiche_lesson[h].length; j++) { corps_html += "<td>"+fiche_lesson[h][j][i]+"</td>\n"; }
                    corps_html += "</tr>\n";
                }
                corps_html += "</table>\n";

                return  corps_html;
            }
            function ficheDePratiqueFootHTML() {
                
                let fiche_note = parseIntNko(note3()); 
                
                let foot_html = "<table border=1>\n";
                foot_html += "<tr><td> ߓߍ߬ߙߍ</td></tr>\n";
                foot_html += "<tr><td> ߡߎ߬ߡߍ</td></tr>\n";
                foot_html += "<tr><td>"+fiche_note+"</td></tr>\n";
                foot_html += "</table>\n";
        
                return foot_html;

                function note3() {
                    let fiche_note = 0;
                    for(var i=0; i<fiche_lesson[h].length; i++) {
                        fiche_note += fiche_lesson[h][i][2];
                    }

                    return fiche_note;
                }
            }
        }
                
        return pratique_html
    }
    function ficheExerciceEtEvaluationCorpsHTML() {

        var fiche_entete_html = ficheEnteteHTML();
        var fiche_corps_html  = ficheCorpsHTML();
        var fiche_foot_html   = ficheFootHTML();
        
        let fiche_html = "";

        fiche_html += "<div class='t'>\n";
            fiche_html += "<div class='t1'>"+fiche_entete_html+"</div>\n";
            fiche_html += "<div class='t2'>"+fiche_corps_html+"</div>\n";
            fiche_html += "<div class='t3'>"+fiche_foot_html+"</div>\n";
        fiche_html += "</div>\n";

        return fiche_html;
    }