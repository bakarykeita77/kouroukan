
    var voyelles_cochees = [], consonnes_cochees = [], tedos_coches = [], tedos_coches = [], nasalisations_cochees = [], caracteres_coches = [];
    actualiserCochage();

    var syllabes_tonifies = tonification();  
    var tons_questions = malaxer(syllabes_tonifies);

    function tonification(){
        var tonifies = [];
            
        for(var nasalisation=0;nasalisation<caracteres_coches[4].length;nasalisation++) {
        for(var consonne=0;consonne<caracteres_coches[1].length;consonne++) {
        for(var voyelle=0;voyelle<caracteres_coches[0].length;voyelle++) {
        for(var ton=0;ton<caracteres_coches[3].length;ton++) {
            tonifies[tonifies.length] = caracteres_coches[1][consonne]+caracteres_coches[0][voyelle]+caracteres_coches[3][ton]+caracteres_coches[4][nasalisation];
        }}}}
        
        return tonifies;
    }
    function tonsApprentissageHTML() {
            
    var tons_apprentissage_html = '';
    var n1 = caracteres_coches[0].length*caracteres_coches[3].length*caracteres_coches[4].length;
                
    for(var sous_table=0;sous_table<syllabes_tonifies.length;sous_table+=n1){
        tons_apprentissage_html += '<table class="table_parlante">\n\n';
        for(var ligne=0;ligne<n1;ligne+=caracteres_coches[3].length){
            tons_apprentissage_html += '<tr>\n';
            for(var colonne=0;colonne<caracteres_coches[3].length;colonne++){
                tons_apprentissage_html += '<td>'+syllabes_tonifies[sous_table+ligne+colonne]+'</td>\n';
            }
            tons_apprentissage_html += '</tr>\n\n';
        }
        tons_apprentissage_html += "</table><br><br><br>\n";
    }
                
    return tons_apprentissage_html;
    }

    function tonsExerciceHTML() {
        
        tonsApprentissageHTML();
        var exercices_corps_html = '<table class="table_muette">';
        for(var i=0;i<tons_questions.length - tons_questions.length%8;i+=8){
            exercices_corps_html += '<tr>\n';
            for(var j=0;j<8;j++){
                exercices_corps_html += '<td>'+tons_questions[i+j]+'</td>\n';
            }
            exercices_corps_html += '</tr>\n';
        }
        for(var k=tons_questions.length - tons_questions.length%8;k<tons_questions.length;k+=tons_questions.length%8){
            exercices_corps_html += '<tr>\n';
            for(var l=0;l<tons_questions.length%8;l++){
                exercices_corps_html += '<td>'+tons_questions[k+l]+'</td>\n';
            }
            exercices_corps_html += '</tr>\n';
        }
        exercices_corps_html += '</table>';
            	    
        return exercices_corps_html;
    }
    function tonsPratiquesHTML() {
        // Code
    }
    function actualiserCochage() {
        voyelles_cochees = $('#voyelles_cochees').html().split('');
        consonnes_cochees = $('#consonnes_cochees').html().split('');
        tedos_coches = $('#tedos_coches').html().split('');
        tons_coches = [''].concat($('#tons_coches').html().split(''));
        nasalisations_cochees = [''].concat($('#nasalisations_cochees').html().split(''));
        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
    }
