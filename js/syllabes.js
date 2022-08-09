
    var syllabes = syllab();
    var syllabes_questions = mix1D(syllabes);
  
    function syllab() {
        let slb = [];
        let voyelles = caracteres_coches[0];
        let consonnes = caracteres_coches[1];
        let nasalisation = caracteres_coches[3];
        
        for(let i=0; i<nasalisation.length; i++) {
        for(let j=0; j<consonnes.length;    j++) {
        for(let k=0; k<voyelles.length;     k++) {
            slb[slb.length] = consonnes[j]+voyelles[k]+nasalisation[i];
        }}}
        
        return slb;
    }
    function syllabesApprentissageHTML() {
        let syllabes = makeSyllabs();
     
        let sah = "<table class='table_parlante'>\n";
        for(let i=0; i<syllabes.length; i+=voyelles.length) {
            sah += "<tr>\n";
            for(let j=0; j<7; j++) {
                sah += "<td>"+syllabes[i+j]+"</td>\n";
            }
            sah += "</tr>\n\n";
        }
        sah += "</table>";
        
        return sah;
        
        function makeSyllabs() {
            let slb = [];
            let voyelles = caracteres_coches[0];
            let consonnes = caracteres_coches[1];
            let tedo = caracteres_coches[2];
            let nasalisation = caracteres_coches[4];
    
            
            for(var i=0; i<nasalisation.length; i++) {
            for(var j=0; j<consonnes.length;    j++) {
            for(var k=0; k<voyelles.length;     k++) {
                slb[slb.length] = consonnes[j]+voyelles[k]+nasalisation[i];
            }}}
            return slb;
        }
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
                'ߖߊߟߊ',
                'ߖߏߟߏ',
                'ߗߌߙߏ',
                'ߕߊߓߐ',
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
                'ߛߋߙߋߥߊ',
                'ߛߌߟߊߓߊ',
                'ߛߎߟߎߞߎ',
                'ߡߌߣߌߢߊ߲',
                'ߕߌߓߌߟߌ'
            ],
            [
                'ߛߊ߲ߡߊߘߊ߲',
                'ߛߎߙߎ߲ߘߎ',
                'ߛߎ߲ߓߊߙߊ',
                'ߘߊ߲ߘߊߟߌ',
                'ߛߊ߲ߜߊߛߌ',
                'ߛߊ߲ߞߌߘߊ߲',
                'ߛߎ߲ߞߎߘߎ߲',
                'ߛߊߟߌߓߊ',
                'ߞߊߡߋߙߋ߲',
                'ߥߐߢߐ߲ߕߊ'
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