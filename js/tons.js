
var syllabes_tonifies = tonification();  
var tons_questions = mix1D(syllabes_tonifies);


function tonification(){
    var tonifies = [];
        
    for(var consonne=0;consonne<caracteres_coches[1].length;consonne++) {
    for(var voyelle=0;voyelle<caracteres_coches[0].length;voyelle++) {
    for(var nasalisation=0;nasalisation<caracteres_coches[4].length;nasalisation++) {
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
function tonsExercicesHTML() {
    
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