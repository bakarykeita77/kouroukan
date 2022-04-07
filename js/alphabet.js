    
    var lettres = voyelles_cochees.concat(consonnes_cochees,tedos_coches);  
    var alphabet_questions = mix1D(lettres);


    function alphabetApprentissageHTML() {

        var table = "<table class = 'table_parlante'>\n";
        for(var i=0;i<lettres.length-lettres.length%7;i+=7) {
            table += "<tr>\n";
            for(var j=0;j<7;j++) {
                table += "<td>"+lettres[i+j]+"</td>\n";
            }
            table += "</tr>\n";
        }
        for(var k=lettres.length-lettres.length%7;k<lettres.length;k+=lettres.length%7){
            table += "<tr>\n";
            for(var l=0;l<lettres.length%7;l++) {
                table += "<td>"+lettres[k+l]+"</td>\n";
            }
            table += "</tr>\n";
        }
        table += "</table>";
                
        return table;
    }  // Cette fonction est appelée dans lesson.js    	
    function alphabetExercicesHTML() {

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
    }       // Cette fonction est appelée dans lesson.js 

