
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
    function syllabesPratiquesHTML() {
        
    
        syllabes_pratiques_html = '<div id="pratiques_container">';
        
            syllabes_pratiques_html += '<div id="pratiques_programme">';
                syllabes_pratiques_html += '<span>ߜߋ߲߬ ߁ ߡߊ</span>';
                syllabes_pratiques_html += '<span>ߜߋ߲߬ ߂ ߡߊ</span>';
                syllabes_pratiques_html += '<span>ߜߋ߲߬ ߃ ߡߊ</span>';
                syllabes_pratiques_html += '<span>ߜߋ߲߬ ߄ ߡߊ</span>';
            syllabes_pratiques_html += '</div>';
        
            syllabes_pratiques_html += '<div id="pratiques">';
                syllabes_pratiques_html += '<div id="pratiques_image_container" align="center"><img src="" id="pratiques_image" alt="?"></div>';
                syllabes_pratiques_html += '<div id="pratiques_input_container"><input name="pratiques_input" id="pratiques_input" placeholder="ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߞߍ߫ ߦߊ߲߬"></div>';
            syllabes_pratiques_html += '</div>';
        
        syllabes_pratiques_html += '</div>';
        
        
        return syllabes_pratiques_html;
    }
    
    function monoSyllabes() {
       
        var mono_syllabes = [
            [
                'ߓߊ',
                'ߓߐ',
                'ߖߌ',
                'ߖߍ',
                'ߖߎ',
                'ߘߊ',
                'ߛߊ',
                'ߛߌ',
                'ߛߍ',
                'ߛߎ',
                'ߛߏ',
                'ߜߊ',
                'ߜߐ',
                'ߝߊ',
                'ߝߍ',
                'ߝߏ',
                'ߞߏ',
                'ߞߎ',
                'ߞߐ',
                'ߟߌ',
                'ߟߍ',
                'ߟߎ',
                'ߟߐ',
                'ߡߎ',
                'ߢߊ',
                'ߢߍ',
                'ߣߊ',
                'ߣߐ'
            ],
            [
                'ߓߌ߲',
                'ߓߎ߲',
                'ߓߏ߲',
                'ߗߍ߲',
                'ߘߋ߲',
                'ߘߎ߲',
                'ߛߊ߲',
                'ߛߌ߲',
                'ߛߏ߲',
                'ߛߐ߲',
                'ߜߊ߲',
                'ߜߋ߲',
                'ߝߊ߲',
                'ߞߏ߲',
                'ߟߍ߲',
                'ߟߏ߲',
                'ߢߌ߲',
                'ߣߎ߲'
            ]
        ];       
            
        return mono_syllabes;
    }
    function biSyllabes() {
        var bi_syllabes = [
            [
                'ߓߊߓߊ',
                'ߓߊߘߊ',
                'ߓߊߛߊ',
                'ߓߊߛߌ',
                'ߓߊߟߊ',
                'ߓߌߙߊ',
                'ߓߌߓߌ',
                'ߓߌߟߊ',
                'ߓߌߟߌ',
                'ߖߊߟߊ',
                'ߖߏߟߏ',
                'ߗߌߙߏ',
                'ߝߊߘߊ',
                'ߝߏߣߌ',
                'ߞߊߙߏ',
                'ߞߊߟߊ',
                'ߞߍߙߍ',
                'ߛߏߟߌ',
                'ߢߊߘߊ',
                'ߢߊߛߌ',
                'ߢߌߣߊ',
                'ߥߊߘߊ'
            ],
            [
                'ߓߊ߲ߘߊ',
                'ߓߊߘߋ߲',
                'ߓߊߞߊ߲',
                'ߓߌ߲ߞߊ',
                'ߛߊߣߌ߲',
                'ߛߊ߲ߖߌ',
                'ߛߊ߲ߛߊ߲',
                'ߝߊ߲ߕߏ',
                'ߝߏߘߏ߲',
                'ߟߊߝߋ߲',
                'ߢߊߖߌ',
                'ߣߐ߲ߛߌ߲',
                'ߥߎߛߋ߲'
            ]
        ];
        
        return bi_syllabes;
    }
    function triSyllabes() {
        var tri_syllabes = [
            [
                'ߞߐߣߐߡߊ',
                'ߞߎߡߊߟߊ',
                'ߛߊߘߊߡߊ',
                'ߛߊߙߊߥߊ',
                'ߛߌߟߊߓߊ',
                'ߛߎߟߎߞߎ',
                'ߡߌߣߌߢߊ߲',
                'ߕߌߓߌߟߌ'
            ],
            [
                'ߛߎߙߎ߲ߘߎ',
                'ߛߎ߲ߓߊߙߊ',
                'ߕߊ߲ߞߊߟߊ߲',
                'ߘߊ߲ߘߊߟߌ',
                'ߛߊ߲ߜߊߛߌ',
                'ߛߊ߲ߞߌߘߊ߲',
                'ߛߎ߲ߞߎߘߎ߲',
                'ߛߊߟߌߓߊ',
                'ߞߊߡߋߙߋ߲'
            ]
        ];

        return tri_syllabes;
    }
    function quadriSyllabes() {
        var quadri_syllabes = [
            [
                'ߕߌߓߌߟߌߟߊ',
                'ߕߊߙߊߟߌߟߊ',
                'ߕߊߟߊߡߊߟߐ',
                'ߓߏߟߏߞߊߘߊ'
            ],
            [
                'ߕߌ߲ߓߌߘߌ߲ߘߊ',
                'ߘߊ߲ߘߊߟߌߟߊ',
                'ߛߊ߲ߡߊߞߎߟߎ߲',
                'ߛߊ߲ߜߊߟߌߡߊ'
            ]
        ];
        
        return quadri_syllabes;
    }
        