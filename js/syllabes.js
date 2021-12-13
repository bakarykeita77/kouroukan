
    var syllabes = syllab();
    var syllabes_questions = mix1D(syllabes);
    
    
    function syllabesApprentissageHTML() {
        var table = '';
        for(var k=0;k<caracteres_coches[4].length;k++){
        table += "<table class = 'table_parlante'>\n";
            for(var i=0;i<caracteres_coches[1].length;i++) {
                table += "<tr>\n";
                for(var j=0;j<caracteres_coches[0].length;j++) {
                    table += "<td>"+[caracteres_coches[1][i]+caracteres_coches[0][j]+caracteres_coches[4][k]]+"</td>\n";
                }
                table += "</tr>\n";
            }                                                                                                                            
        table += "</table><br/><br/>";
        }
        
        return table;
    }
    function syllabesExercicesHTML(){
            	    
        var exercices_corps_html = '<table class="table_muette">';
        for(var i=0;i<syllabes_questions.length-syllabes_questions.length%7;i+=7){
            exercices_corps_html += '<tr>\n';
            for(var j=0;j<7;j++){
                exercices_corps_html += '<td>'+syllabes_questions[i+j]+'</td>\n';
            }
            exercices_corps_html += '</tr>\n';
        }
        for(var i=syllabes_questions.length-syllabes_questions.length%7;i<syllabes_questions.length;i+=syllabes_questions.length%7){
            exercices_corps_html += '<tr>\n';
            for(var j=0;j<syllabes_questions.length%7;j++){
                exercices_corps_html += '<td>'+syllabes_questions[i+j]+'</td>\n';
            }
            exercices_corps_html += '</tr>\n';
        }
        exercices_corps_html += '</table>';
            	    
        return exercices_corps_html;
    }
    function syllab() {
        var slb = [];
        
        for(var k=0;k<caracteres_coches[3].length;k++){
            for(var i=0;i<caracteres_coches[1].length;i++) {
                for(var j=0;j<caracteres_coches[0].length;j++) {
                    slb[slb.length] = caracteres_coches[1][i]+caracteres_coches[0][j]+caracteres_coches[3][k];
                }
            }                                                                                                                            
        }
        
        return slb;
    }
