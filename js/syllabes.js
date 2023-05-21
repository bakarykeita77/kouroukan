    
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));                   // Voir programmes.js fonction storageDeLaMatiereActive()
    var caracteres_coches = JSON.parse(sessionStorage.getItem('caracteres_coches'));         // Voir parametres.js fonction collecteDesCaracteresCoches()
    var session_syllabes = JSON.parse(sessionStorage.getItem('syllabes'));         // Voir parametres.js fonction collecteDesCaracteresCoches()
    var syllabes = (niveau_actif > 1) ? session_syllabes : [];
    var syllabes_questions = malaxer(syllabes);

// Récupération des caractères cochés
    var voyelles_cochees = JSON.parse(sessionStorage.getItem('voyelles_cochees'));           // voir parametres.js fonction collecteDesCaracteresCoches()
    var consonnes_cochees = JSON.parse(sessionStorage.getItem('consonnes_cochees'));         // voir parametres.js fonction collecteDesCaracteresCoches()
    var tedos_coches = JSON.parse(sessionStorage.getItem('tedos_coches'));                   // voir parametres.js fonction collecteDesCaracteresCoches()
    var nasalisations_cochees = JSON.parse(sessionStorage.getItem('nasalisations_cochees')); // voir parametres.js fonction collecteDesCaracteresCoches()
    var tons_coches = JSON.parse(sessionStorage.getItem('tons_coches'));                     // voir parametres.js fonction collecteDesCaracteresCoches()
        
    // voyelles_cochees      = $('#voyelles_cochees').html().split('');
    // consonnes_cochees     = $('#consonnes_cochees').html().split('');
    // tedos_coches          = $('#tedos_coches').html().split('');
    // tons_coches           = $('#tons_coches').html().split('');
    // nasalisations_cochees = $('#nasalisations_cochees').html().split('');

    
    sessionStorage.setItem('syllabes_apprentissage_html', JSON.stringify(syllabesApprentissageHTML()));

    
    function monoSyllabes() {
       
        var mono_syllabes = [
            [
                'ߓߐ',
                'ߖߌ',
                'ߖߍ',
                'ߖߎ',
                'ߘߊ',
                'ߛߊ',
                'ߛߌ',
                'ߛߍ',
                'ߛߍ߲',
                'ߛߏ',
                'ߜߊ',
                'ߝߍ',
                'ߞߎ',
                'ߞߐ',
                'ߟߌ',
                'ߟߎ',
                'ߟߐ',
                'ߡߎ',
                'ߢߊ',
                'ߣߊ'
            ],
            [
                'ߓߌ߲',
                'ߓߎ߲',
                'ߓߏ߲',
                'ߔߎ߲',
                'ߗߍ߲',
                'ߘߋ߲',
                'ߛߊ߲',
                'ߜߊ߲',
                'ߜߋ߲',
                'ߞߏ߲',
                'ߟߍ߲',
                'ߢߌ߲'
            ]
        ];       
            
        return mono_syllabes;
    }
    function biSyllabes() {
        var bi_syllabes = [
            [
                'ߓߊߘߊ',
                'ߓߊߛߊ',
                'ߓߊߛߌ',
                'ߓߊߟߊ',
                'ߓߌߙߊ',
                'ߓߌߓߌ',
                'ߓߌߘߌ',
                'ߓߎߘߎ',
                'ߕߎߙߊ',
                'ߕߎߟߎ',
                'ߖߏߟߏ',
                'ߗߌߙߏ',
                'ߘߋߣߍ߲',
                'ߝߊߘߊ',
                'ߝߊߙߊ',
                'ߝߋߙߋ',
                'ߞߊߓߊ',
                'ߞߏߙߊ',
                'ߞߏߙߏ',
                'ߞߏߟߏ',
                'ߞߎߟߎ߲',
                'ߞߐߙߍ',
                'ߞߍߙߍ',
                'ߟߌߡߐ',
                'ߛߏߟߌ',
                'ߢߊߘߊ',
                'ߢߊߛߌ',
                'ߢߌߣߊ',
                'ߥߊߘߊ',
                'ߦߌߙߌ'
            ],
            [
                'ߓߊߘߋ߲',
                'ߓߌ߲ߞߊ',
                'ߕߌ߲ߛߐ߲',
                'ߕߍߓߍ߲',
                'ߛߊߣߌ߲',
                'ߛߊ߲ߣߍ߲',
                'ߛߊ߲ߕߌ߲',
                'ߛߊ߲ߛߊ߲',
                'ߝߏߘߏ߲',
                'ߟߊߝߋ߲',
                'ߢߌߡߌ߲',
                'ߣߐ߲ߛߌ߲',
                'ߥߎߛߋ߲'
            ]
        ];
        
        return bi_syllabes;
    }
    function triSyllabes() {
        var tri_syllabes = [
            [
                'ߘߌߦߊߢߍ',
                'ߞߐߣߐߡߊ',
                'ߞߎߡߊߟߊ',
                'ߛߊߙߊߖߋ',
                'ߛߋߙߋߥߊ',
                'ߛߌߟߊߓߊ',
                'ߛߎߟߎߞߎ',
                'ߟߌߞߌߛߍ',
                'ߡߌߣߌߢߊ߲',
                'ߕߌߓߌߟߌ',
                'ߦߌߙߌߖߋ',
                'ߦߌߙߌߝߍ'
            ],
            [
                'ߛߊ߲ߡߊߘߊ߲',
                'ߛߊ߲ߝߍߙߍ߲',
                'ߛߎߙߎ߲ߘߎ',
                'ߘߊ߲ߘߊߟߌ',
                'ߘߋ߲ߓߊߕߌ',
                'ߘߋ߲ߓߊߦߊ',
                'ߛߊ߲ߜߊߛߌ',
                'ߛߊ߲ߞߌߘߊ߲',
                'ߛߎ߲ߞߎߘߎ߲',
                'ߛߊߟߌߓߊ',
                'ߛߋߙߋߟߋ߲',
                'ߝߐߟߌߝߋ߲',
                'ߞߊߡߋߙߋ߲',
                'ߞߎߟߎ߲ߣߍ߲',
                'ߟߌߝߊ߲ߝߊ߲'
            ]
        ];

        return tri_syllabes;
    }
    function quadriSyllabes() {
        var quadri_syllabes = [
            [
                'ߕߊߙߊߟߌߟߊ',
                'ߕߌߓߌߟߌߟߊ',
                'ߜߊߛߊߞߊߙߊ',
                'ߝߊߘߌߦߊߓߐ',
                'ߞߎߡߊߓߎߘߎ',
                'ߛߍߓߍߟߌߟߊ',
                'ߞߊߙߊߟߌߟߊ',
                'ߡߍߣߍߡߍߣߍ',
                'ߢߊߡߊߞߎߖߌ'
            ],
            [
                'ߓߏߟߏߞߏߟߏ߲',
                'ߓߏߟߏߡߊߘߏ߲',
                'ߕߊߟߊ߲ߕߊߟߊ߲',
                'ߕߌ߲ߓߌߘߌ߲ߘߊ',
                'ߕߏߟߏߜߋߘߋ߲',
                'ߘߊ߲ߘߊߟߌߟߊ',
                'ߛߊ߲ߜߊߟߌߡߊ',
                'ߛߊ߲ߡߊߞߎߟߎ߲',
                'ߛߍߓߍߟߌߝߋ߲',
                'ߞߊ߲ߥߏߙߏߝߋ',
                'ߞߐߣߐߡߊߣߍ߲'
            ]
        ];
        
        return quadri_syllabes;
    } 
     
    function syllabesApprentissageHTML() {
         
        let sah = "<table class='table_parlante'>\n";
        for(let i=0; i<syllabes.length; i+=voyelles_cochees.length) {
            sah += "<tr>\n";
            for(let j=0; j<voyelles_cochees.length; j++) {
                sah += "<td>"+syllabes[i+j]+"</td>\n";
            }
            sah += "</tr>\n\n";
        }
        sah += "</table>";
        
        return sah;        
    }
    function syllabesExerciceHTML(){
            	    
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
                syllabes_pratiques_html += '<span>ߜߋ߲߬ ߁ߡߊ</span>';
                syllabes_pratiques_html += '<span>ߜߋ߲߬߂ߡߊ</span>';
                syllabes_pratiques_html += '<span>ߜߋ߲߬߃ߡߊ</span>';
                syllabes_pratiques_html += '<span>ߜߋ߲߬߄ߡߊ</span>';
            syllabes_pratiques_html += '</div>';
        
            syllabes_pratiques_html += '<div id="pratiques">';
                syllabes_pratiques_html += '<div id="pratiques_image_container"><img src="" id="pratiques_image" alt="pratiques_image"></div>';
                syllabes_pratiques_html += '<div id="pratiques_input_container"><input name="pratiques_input" id="pratiques_input" placeholder="ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߞߍ߫ ߦߊ߲߬"></div>';
            syllabes_pratiques_html += '</div>';
        
        syllabes_pratiques_html += '</div>';
        
        return syllabes_pratiques_html;
    }    