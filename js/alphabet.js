    var voyelles_cochees = $('#voyelles_cochees').html().split('');
    var consonnes_cochees = $('#consonnes_cochees').html().split('');
    var tedos_coches = $('#tedos_coches').html().split('');
    var caracteres_coches = [voyelles_cochees,consonnes_cochees,tedos_coches];  
    var caracteres_coches = JSON.parse(sessionStorage.getItem('caracteres_coches'));    //Voir parametres.js fonction rechargerLesSousTableauxDesCaracteresCoches()
    var alphabet_questions = malaxer(caracteres_coches);


    function alphabetApprentissageHTML() {

        var table = "<table class = 'table_parlante'>\n";
        for(var i=0;i<caracteres_coches.length-caracteres_coches.length%7;i+=7) {
            table += "<tr>\n";
            for(var j=0;j<7;j++) table += "<td>"+caracteres_coches[i+j]+"</td>\n";
            table += "</tr>\n";
        }
        for(var k=caracteres_coches.length-caracteres_coches.length%7;k<caracteres_coches.length;k+=caracteres_coches.length%7){
            table += "<tr>\n";
            for(var l=0;l<caracteres_coches.length%7;l++) table += "<td>"+caracteres_coches[k+l]+"</td>\n";
            table += "</tr>\n";
        }
        table += "</table>";
                
        return table;
    } 	
    function alphabetExerciceHTML() { 

        var exercices_corps_html = '<table class="table_muette">\n\n';
        
        for(var i=0;i<alphabet_questions.length-alphabet_questions.length%7;i+=7){
            exercices_corps_html += '<tr>\n';
            for(var j=0;j<7;j++){ exercices_corps_html += '<td>'+alphabet_questions[i+j]+'</td>\n'; }
            exercices_corps_html += '</tr>\n\n'; 
        }
        for(var k=alphabet_questions.length-alphabet_questions.length%7;k<alphabet_questions.length;k+=alphabet_questions.length%7){
            exercices_corps_html += '<tr>\n';
            for(var l=0;l<alphabet_questions.length%7;l++){ exercices_corps_html += '<td>'+alphabet_questions[k+l]+'</td>\n'; }
            exercices_corps_html += '</tr>\n\n'; 
        }
        exercices_corps_html += '</table>';
       	    
        return exercices_corps_html;
    } 