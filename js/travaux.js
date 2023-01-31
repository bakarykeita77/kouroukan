
    let matiere_nom = $('#matiere_nom_container').html();

// Selection des differents éléments de fiche
    let travail = $('.travail');

    let fiche_entete_1 = $('#'+travail[0].id+' .fiche_entete');
    let fiche_entete_2 = $('#'+travail[1].id+' .fiche_entete');
    let fiche_entete_3 = $('#'+travail[2].id+' .fiche_entete');
    let fiche_entete_4 = $('#'+travail[3].id+' .fiche_entete');

    let fiche_corps_1 = $('#'+travail[0].id+' .fiche_corps');
    let fiche_corps_2 = $('#'+travail[1].id+' .fiche_corps');
    let fiche_corps_3 = $('#'+travail[2].id+' .fiche_corps');
    let fiche_corps_4 = $('#'+travail[3].id+' .fiche_corps');

    let fiche_foot_1 = $('#'+travail[0].id+' .fiche_foot');
    let fiche_foot_2 = $('#'+travail[1].id+' .fiche_foot');
    let fiche_foot_3 = $('#'+travail[2].id+' .fiche_foot');
    let fiche_foot_4 = $('#'+travail[3].id+' .fiche_foot');

    let lesson_1 = [], lesson_2 = [], lesson_3 = [], lesson_4 = [];
    let note_1 = [], note_2 = [], note_3 = [], note_4 = [];

// Recupération des lessons étudiées
    let matieres = JSON.parse(sessionStorage.getItem("matieres"));


    if( matiere_nom == "ߛߓߍߛߎ߲") {
        $('#fiche_de_pratique').css('display','none');
        if(matieres[0][0]) {

            lesson_1 = matieres[0][0].lesson;
            lesson_1 = JSON.parse(lesson_1);
            note_1 = parseIntNko(matieres[0][0].note);


            let entete_html_1 = ficheDApprentissageEnteteHTML();
            let corps_html_1  = ficheDApprentissageCorpsHTML();
            let foot_html_1   = ficheDApprentissageFootHTML();
        
            fiche_entete_1.html(entete_html_1);
            fiche_corps_1.html(corps_html_1);
            fiche_foot_1.html(foot_html_1);

            function ficheDApprentissageEnteteHTML() {
                let entete_html = "<table border=1>";
                entete_html += "<tr><td>ߛߓߍߘߋ߲ ߠߎ߬</td></tr>";
                entete_html += "<tr><td>ߘߌ߯ߟߌ ߦߙߌߞߊ</td></tr>";
                entete_html += "</table>";
        
                return entete_html;
            }
            function ficheDApprentissageCorpsHTML() {
                let fac = "<table border=1>";
                    fac += "<tr>";
                        for(let i=0; i<lesson_1.length; i++) {
                            fac += "<td>"+lesson_1[i][0]+"</td>";
                        }
                    fac += "</tr>";
                    fac += "<tr>";
                        for(let j=0; j<lesson_1.length; j++) {
                            fac += "<td>"+parseIntNko(lesson_1[j][1])+"</td>";
                        }
                    fac += "</tr>";
                fac += "<table>";
        
                return  fac;
            }
            function ficheDApprentissageFootHTML() {
                let ffh = "<table border=1 width=100>";
                ffh += "<tr><td> ߡߎ߬ߡߍ</td></tr>";
                ffh += "<tr><td>"+note_1+"</td></tr>";
                ffh += "<table>";
        
                return ffh;
            }
        }
        if(matieres[0][1]) {

            lesson_2 = matieres[0][1].lesson;
            lesson_2 = JSON.parse(lesson_2);
            note_2 = parseIntNko(matieres[0][1].note);

            let entete_html_2 = ficheDExerciceEnteteHTML();
            let corps_html_2  = ficheDExerciceCorpsHTML();
            let foot_html_2   = ficheDExerciceFootHTML();
        
            fiche_entete_2.html(entete_html_2);
            fiche_corps_2.html(corps_html_2);
            fiche_foot_2.html(foot_html_2);


            function ficheDExerciceEnteteHTML() {
                let entete_html = "<table border=1>";
                entete_html += "<tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߓߙߍ߬ߦߊ</td></tr>";
                entete_html += "</table>";

                return entete_html;
            }
            function ficheDExerciceCorpsHTML() {
                let corps_html = "<table border=1>";
                corps_html += "<tr>";
                    for(let i=0; i<lesson_2.length; i++) {
                        corps_html += "<td>"+lesson_2[i][0]+"</td>";
                    }
                corps_html += "</tr>";
                corps_html += "<tr>";
                    for(let j=0; j<lesson_2.length; j++) {
                        corps_html += "<td>"+lesson_2[j][1]+"</td>";
                    }
                corps_html += "</tr>";
                    corps_html += "<tr>";
                        for(let k=0; k<lesson_2.length; k++) {
                            corps_html += "<td>"+parseIntNko(lesson_2[k][2])+"</td>";
                        }
                corps_html += "</tr>";
                corps_html += "</table>";
        
                return  corps_html;
            }
            function ficheDExerciceFootHTML() {
                let foot_html = "<table border=1 width=100>";
                foot_html += "<tr><td> ߓߍ߬ߙߍ</td></tr>";
                foot_html += "<tr><td> ߡߎ߬ߡߍ</td></tr>";
                foot_html += "<tr><td>"+note_2+"</td></tr>";
                foot_html += "</table>";
        
                return foot_html;
            }
        }
        if(matieres[0][2]) {
            lesson_3 = matieres[0][2].lesson;
            lesson_3 = JSON.parse(lesson_3);
            note_3 = parseIntNko(matieres[0][2].note);

            let entete_html_3 = ficheDApprentissageEvaluationEnteteHTML();
            let corps_html_3  = ficheDApprentissageEvaluationCorpsHTML();
            let foot_html_3   = ficheDApprentissageEvaluationFootHTML();
        
            fiche_entete_4.html(entete_html_3);
            fiche_corps_4.html(corps_html_3);
            fiche_foot_4.html(foot_html_3);


            function ficheDApprentissageEvaluationEnteteHTML() {
                let entete_html = "<table border=1>";
                entete_html += "<tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߓߙߍ߬ߦߊ</td></tr>";
                entete_html += "</table>";

                return entete_html;
            }
            function ficheDApprentissageEvaluationCorpsHTML() {
                let corps_html = "<table border=1>";
                    corps_html += "<tr>";
                        for(let i=0; i<lesson_3.length; i++) {
                            corps_html += "<td>"+lesson_3[i][0]+"</td>";
                        }
                    corps_html += "</tr>";
                    corps_html += "<tr>";
                        for(let j=0; j<lesson_3.length; j++) {
                            corps_html += "<td>"+lesson_3[j][1]+"</td>";
                        }
                    corps_html += "</tr>";
                    corps_html += "<tr>";
                        for(let k=0; k<lesson_3.length; k++) {
                            corps_html += "<td>"+parseIntNko(lesson_3[k][2])+"</td>";
                        }
                    corps_html += "</tr>";
                corps_html += "<table>";
        
                return  corps_html;
            }
            function ficheDApprentissageEvaluationFootHTML() {
                let foot_html = "<table border=1 width=100>";
                foot_html += "<tr><td> ߓߍ߬ߙߍ</td></tr>";
                foot_html += "<tr><td> ߡߎ߬ߡߍ</td></tr>";
                foot_html += "<tr><td>"+note_3+"</td></tr>";
                foot_html += "<table>";
        
                return foot_html;
            }
        }
        if(matieres[0][3]) {
            lesson_4 = matieres[0][3].lesson;
            lesson_4 = JSON.parse(lesson_4);
            note_4 = parseIntNko(matieres[0][3].note);

            let entete_html_4 = ficheDEvaluationEnteteHTML();
            let corps_html_4  = ficheDEvaluationCorpsHTML();
            let foot_html_4   = ficheDEvaluationFootHTML();
        
            fiche_entete_4.html(entete_html_4);
            fiche_corps_4.html(corps_html_4);
            fiche_foot_4.html(foot_html_4);


            function ficheDEvaluationEnteteHTML() {
                let entete_html = "<table border=1>";
                entete_html += "<tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߓߙߍ߬ߦߊ</td></tr>";
                entete_html += "</table>";

                return entete_html;
            }
            function ficheDEvaluationCorpsHTML() {
                let corps_html = "<table border=1>";
                    corps_html += "<tr>";
                        for(let i=0; i<lesson_4.length; i++) {
                            corps_html += "<td>"+lesson_4[i][0]+"</td>";
                        }
                    corps_html += "</tr>";
                    corps_html += "<tr>";
                        for(let j=0; j<lesson_4.length; j++) {
                            corps_html += "<td>"+parseIntNko(lesson_4[j][1])+"</td>";
                        }
                corps_html += "</tr>";
                corps_html += "<table>";
        
                return  corps_html;
            }
            function ficheDEvaluationFootHTML() {
                let foot_html = "<table border=1 width=100>";
                foot_html += "<tr><td> ߡߎ߬ߡߍ</td></tr>";
                foot_html += "<tr><td>"+note_4+"</td></tr>";
                foot_html += "<table>";
        
                return foot_html;
            }
        }
    }

    if( matiere_nom == "ߜߋ߲߭") {
        if(matieres[1][0]) {

            lesson_1 = matieres[1][0].lesson;
            lesson_1 = JSON.parse(lesson_1);
            note_1 = parseIntNko(matieres[1][0].note);


            let entete_html_1 = ficheDApprentissageEnteteHTML();
            let corps_html_1  = ficheDApprentissageCorpsHTML();
            let foot_html_1   = ficheDApprentissageFootHTML();
        
            fiche_entete_1.html(entete_html_1);
            fiche_corps_1.html(corps_html_1);
            fiche_foot_1.html(foot_html_1);

            function ficheDApprentissageEnteteHTML() {
                let entete_html = "<table border=1>";
                entete_html += "<tr><td>ߜߋ߲߭ ߠߎ߬</td></tr>";
                entete_html += "<tr><td>ߘߌ߯ߟߌ ߦߙߌߞߊ</td></tr>";
                entete_html += "</table>";
        
                return entete_html;
            }
            function ficheDApprentissageCorpsHTML() {
                let fac = "<table border=1>";
                    fac += "<tr>";
                        for(let i=0; i<lesson_1.length; i++) {
                            fac += "<td>"+lesson_1[i][0]+"</td>";
                        }
                    fac += "</tr>";
                    fac += "<tr>";
                        for(let j=0; j<lesson_1.length; j++) {
                            fac += "<td>"+parseIntNko(lesson_1[j][1])+"</td>";
                        }
                    fac += "</tr>";
                fac += "<table>";
        
                return  fac;
            }
            function ficheDApprentissageFootHTML() {
                let ffh = "<table border=1 width=100>";
                ffh += "<tr><td> ߡߎ߬ߡߍ</td></tr>";
                ffh += "<tr><td>"+note_1+"</td></tr>";
                ffh += "<table>";
        
                return ffh;
            }
        }
        if(matieres[1][1]) {

            lesson_2 = matieres[1][1].lesson;
            lesson_2 = JSON.parse(lesson_2);
            note_2 = parseIntNko(matieres[1][1].note);

            let entete_html_2 = ficheDExerciceEnteteHTML();
            let corps_html_2  = ficheDExerciceCorpsHTML();
            let foot_html_2   = ficheDExerciceFootHTML();
        
            fiche_entete_2.html(entete_html_2);
            fiche_corps_2.html(corps_html_2);
            fiche_foot_2.html(foot_html_2);


            function ficheDExerciceEnteteHTML() {
                let entete_html = "<table border=1>";
                entete_html += "<tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߓߙߍ߬ߦߊ</td></tr>";
                entete_html += "</table>";

                return entete_html;
            }
            function ficheDExerciceCorpsHTML() {
                let corps_html = "<table border=1>";
                corps_html += "<tr>";
                    for(let i=0; i<lesson_2.length; i++) {
                        corps_html += "<td>"+lesson_2[i][0]+"</td>";
                    }
                corps_html += "</tr>";
                corps_html += "<tr>";
                    for(let j=0; j<lesson_2.length; j++) {
                        corps_html += "<td>"+lesson_2[j][1]+"</td>";
                    }
                corps_html += "</tr>";
                    corps_html += "<tr>";
                        for(let k=0; k<lesson_2.length; k++) {
                            corps_html += "<td>"+parseIntNko(lesson_2[k][2])+"</td>";
                        }
                corps_html += "</tr>";
                corps_html += "</table>";
        
                return  corps_html;
            }
            function ficheDExerciceFootHTML() {
                let foot_html = "<table border=1 width=100>";
                foot_html += "<tr><td> ߓߍ߬ߙߍ</td></tr>";
                foot_html += "<tr><td> ߡߎ߬ߡߍ</td></tr>";
                foot_html += "<tr><td>"+note_2+"</td></tr>";
                foot_html += "</table>";
        
                return foot_html;
            }
        }
        if(matieres[1][2]) {
            lesson_3 = matieres[1][2].lesson;
            lesson_3 = JSON.parse(lesson_3);
            note_3 = parseIntNko(matieres[1][2].note);

            let entete_html_3 = ficheDePratiqueEnteteHTML();
            let corps_html_3  = ficheDePratiqueCorpsHTML();
            let foot_html_3   = ficheDePratiqueFootHTML();
        
            fiche_entete_3.html(entete_html_3);
            fiche_corps_3.html(corps_html_3);
            fiche_foot_3.html(foot_html_3);


            function ficheDePratiqueEnteteHTML() {
                let entete_html = "<table border=1>";
                entete_html += "<tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߓߙߍ߬ߦߊ</td></tr>";
                entete_html += "</table>";

                return entete_html;
            }
            function ficheDePratiqueCorpsHTML() {
                let corps_html = "<table border=1>";
                    corps_html += "<tr>";
                        for(let i=0; i<lesson_3.length; i++) {
                            corps_html += "<td>"+lesson_3[i][0]+"</td>";
                        }
                    corps_html += "</tr>";
                    corps_html += "<tr>";
                        for(let j=0; j<lesson_3.length; j++) {
                            corps_html += "<td>"+parseIntNko(lesson_3[j][1])+"</td>";
                        }
                corps_html += "</tr>";
                corps_html += "<table>";
        
                return  corps_html;
            }
            function ficheDePratiqueFootHTML() {
                let foot_html = "<table border=1 width=100>";
                foot_html += "<tr><td> ߡߎ߬ߡߍ</td></tr>";
                foot_html += "<tr><td>"+note_3+"</td></tr>";
                foot_html += "<table>";
        
                return foot_html;
            }
        }
        if(matieres[1][3]) {
            lesson_4 = matieres[1][3].lesson;
            lesson_4 = JSON.parse(lesson_4);
            note_4 = parseIntNko(matieres[1][3].note);

            let entete_html_4 = ficheDEvaluationEnteteHTML();
            let corps_html_4  = ficheDEvaluationCorpsHTML();
            let foot_html_4   = ficheDEvaluationFootHTML();
        
            fiche_entete_4.html(entete_html_4);
            fiche_corps_4.html(corps_html_4);
            fiche_foot_4.html(foot_html_4);


            function ficheDEvaluationEnteteHTML() {
                let entete_html = "<table border=1>";
                entete_html += "<tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>";
                entete_html += "<tr><td>ߓߙߍ߬ߦߊ</td></tr>";
                entete_html += "</table>";

                return entete_html;
            }
            function ficheDEvaluationCorpsHTML() {
                let corps_html = "<table border=1>";
                    corps_html += "<tr>";
                        for(let i=0; i<lesson_4.length; i++) {
                            corps_html += "<td>"+lesson_4[i][0]+"</td>";
                        }
                    corps_html += "</tr>";
                    corps_html += "<tr>";
                        for(let j=0; j<lesson_4.length; j++) {
                            corps_html += "<td>"+parseIntNko(lesson_4[j][1])+"</td>";
                        }
                corps_html += "</tr>";
                corps_html += "<table>";
        
                return  corps_html;
            }
            function ficheDEvaluationFootHTML() {
                let foot_html = "<table border=1 width=100>";
                foot_html += "<tr><td> ߡߎ߬ߡߍ</td></tr>";
                foot_html += "<tr><td>"+note_4+"</td></tr>";
                foot_html += "<table>";
        
                return foot_html;
            }
        }
    }