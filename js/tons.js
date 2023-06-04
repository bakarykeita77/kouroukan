
    // var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));  // Voir programmes.js fonction storagesDuProgramme()

    // if(niveau_actif > 2) {

    //     var voyelles_cochees = $('#voyelles_cochees').html().split('');
    //     var consonnes_cochees = $('#consonnes_cochees').html().split('');
    //     var tedos_coches = $('#tedos_coches').html().split('');
    //     var tons_coches = [''].concat($('#tons_coches').html().split(''));
    //     var nasalisations_cochees = [''].concat($('#nasalisations_cochees').html().split(''));
    //     var caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
    //    // var syllabes_tonifies = (niveau_actif > 2) ? syllabesTonifiees() : []; 
    //     var syllabes_tonifies = JSON.parse(sessionStorage.getItem('syllabes'));  // Voir parametres.js fonction collecteDesCaracteresCoches()


    //     reactualiserCochage();

    //     sessionStorage.setItem('syllabes_tonifies', JSON.stringify(syllabes_tonifies)); 
    //     var tons_questions = malaxer(syllabes_tonifies);
            
    //     sessionStorage.setItem('tons_apprentissage_html', JSON.stringify(tonsApprentissageHTML()));
    //     sessionStorage.setItem('tons_exercice_html', JSON.stringify(tonsExerciceHTML()));
    //     sessionStorage.setItem('tons_pratique_html', JSON.stringify(tonsPratiquesHTML()));



    //     function syllabesTonifiees(){
    //         var tonifies = [];
                
    //         for(var nasalisation=0;nasalisation<nasalisations_cochees.length;nasalisation++) {
    //         for(var consonne=0;consonne<consonnes_cochees.length;consonne++) {
    //         for(var voyelle=0;voyelle<voyelles_cochees.length;voyelle++) {
    //         for(var ton=0;ton<tons_coches.length;ton++) {
    //             tonifies[tonifies.length] = consonnes_cochees[consonne]+voyelles_cochees[voyelle]+tons_coches[ton]+nasalisations_cochees[nasalisation];
    //         }}}}
            
    //         return tonifies;
    //     }
    //     function tonsApprentissageHTML() {
                
    //     var tons_apprentissage_html = '';
    //     var n1 = voyelles_cochees.length*tons_coches.length;
                    
    //     for(var sous_table=0;sous_table<syllabes_tonifies.length;sous_table+=n1){
    //         tons_apprentissage_html += '<table class="table_parlante">\n\n';
    //         for(var ligne=0;ligne<n1;ligne+=tons_coches.length){
    //             tons_apprentissage_html += '<tr>\n';
    //             for(var colonne=0;colonne<tons_coches.length;colonne++){
    //                 tons_apprentissage_html += '<td>'+syllabes_tonifies[sous_table+ligne+colonne]+'</td>\n';
    //             }
    //             tons_apprentissage_html += '</tr>\n\n';
    //         }
    //         tons_apprentissage_html += "</table><br><br><br>\n";
    //     }
                    
    //     return tons_apprentissage_html;
    //     }
    //     function tonsExerciceHTML() {
            
    //         tonsApprentissageHTML();

    //         var exercices_corps_html = '<table class="table_muette">';
    //         for(var i=0;i<tons_questions.length - tons_questions.length%8;i+=8){
    //             exercices_corps_html += '<tr>\n';
    //             for(var j=0;j<8;j++){
    //                 exercices_corps_html += '<td>'+tons_questions[i+j]+'</td>\n';
    //             }
    //             exercices_corps_html += '</tr>\n';
    //         }
    //         for(var k=tons_questions.length - tons_questions.length%8;k<tons_questions.length;k+=tons_questions.length%8){
    //             exercices_corps_html += '<tr>\n';
    //             for(var l=0;l<tons_questions.length%8;l++){
    //                 exercices_corps_html += '<td>'+tons_questions[k+l]+'</td>\n';
    //             }
    //             exercices_corps_html += '</tr>\n';
    //         }
    //         exercices_corps_html += '</table>';
                        
    //         return exercices_corps_html;
    //     }
    //     function tonsPratiquesHTML() {
    //         // Code
    //     }
    //     function reactualiserCochage() {
    //         voyelles_cochees = $('#voyelles_cochees').html().split('');
    //         consonnes_cochees = $('#consonnes_cochees').html().split('');
    //         tedos_coches = $('#tedos_coches').html().split('');
    //         tons_coches = [''].concat($('#tons_coches').html().split(''));
    //         nasalisations_cochees = [''].concat($('#nasalisations_cochees').html().split(''));
    //         caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
    //     }
    // }