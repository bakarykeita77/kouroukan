
    var caracteres_coches = '';
    var voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees;
    var syllabes = '';  

    actualiserCochage();
    syllabes = syllab();
    
    alert( syllabesApprentissageHTML() ); 
    
    
    function actualiserCochage(){
        voyelles_cochees = $('#voyelles_cochees').html().split('');
        consonnes_cochees = $('#consonnes_cochees').html().split('');
        tedos_coches = $('#tedos_coches').html().split('');
        tons_coches = [''].concat($('#tons_coches').html().split(''));
        nasalisations_cochees = [''].concat($('#nasalisations_cochees').html().split(''));
        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
    }
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
                    for(var i=0;i<lesson_questions.length-lesson_questions.length%7;i+=7){
                        exercices_corps_html += '<tr>\n';
                        for(var j=0;j<7;j++){
                            exercices_corps_html += '<td>'+lesson_questions[i+j]+'</td>\n';
                        }
                        exercices_corps_html += '</tr>\n';
                    }
                    for(var i=lesson_questions.length-lesson_questions.length%7;i<lesson_questions.length;i+=lesson_questions.length%7){
                        exercices_corps_html += '<tr>\n';
                        for(var j=0;j<lesson_questions.length%7;j++){
                            exercices_corps_html += '<td>'+lesson_questions[i+j]+'</td>\n';
                        }
                        exercices_corps_html += '</tr>\n';
                    }
            	    exercices_corps_html += '</table>';
            	    
            	    return exercices_corps_html;
            	}
    function syllab() {
        var slb = [];
        for(var k=0;k<caracteres_coches[4].length;k++){
            for(var i=0;i<caracteres_coches[1].length;i++) {
                for(var j=0;j<caracteres_coches[0].length;j++) {
                    slb[slb.length] = caracteres_coches[1][i]+caracteres_coches[0][j]+caracteres_coches[4][k];
                }
            }                                                                                                                            
        }
        
        return slb;
    }
