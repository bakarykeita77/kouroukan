    
    var voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees;
    var lettres = '';
    
    actualiserCochage();
    lettres = voyelles_cochees.concat(consonnes_cochees,tedos_coches);  
    //var lesson_questions = lessonQuestions();

     
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
    function alphabetExercicesHTML(){
        lettres = mix1D(lettres);
        
        var exercices_corps_html = '<table class="table_muette">';
        for(var i=0;i<lettres.length-lettres.length%7;i+=7){
            exercices_corps_html += '<tr>';
            for(var j=0;j<7;j++){ exercices_corps_html += '<td>'+lettres[i+j]+'</td>'; }
            exercices_corps_html += '</tr>'; 
        }
        for(var k=lettres.length-lettres.length%7;k<lettres.length;k+=lettres.length%7){
            exercices_corps_html += '<tr>';
            for(var l=0;l<lettres.length%7;l++){ exercices_corps_html += '<td>'+lettres[k+l]+'</td>'; }
            exercices_corps_html += '</tr>'; 
        }
        exercices_corps_html += '</table>';
            	    
        return exercices_corps_html;
    }       // Cette fonction est appelée dans lesson.js 
    function actualiserCochage(){
        voyelles_cochees = $('#voyelles_cochees').html().split('');
        consonnes_cochees = $('#consonnes_cochees').html().split('');
        tedos_coches = $('#tedos_coches').html().split('');
        tons_coches = [''].concat($('#tons_coches').html().split(''));
        nasalisations_cochees = [''].concat($('#nasalisations_cochees').html().split(''));
        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
    }

