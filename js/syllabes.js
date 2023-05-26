  
    // var lesson_content       = JSON.parse(sessionStorage.getItem('lesson_content'));       // Voir parametres.js fonction collecteDesCaracteresCoches()
    // var mixed_syllabes = JSON.parse(sessionStorage.getItem('mixed_syllabes')); // Voir parametres.js fonction collecteDesCaracteresCoches()    

    // var voyelles_cochees = JSON.parse(sessionStorage.getItem('voyelles_cochees'));           // voir parametres.js fonction collecteDesCaracteresCoches()
    // var consonnes_cochees = JSON.parse(sessionStorage.getItem('consonnes_cochees'));         // voir parametres.js fonction collecteDesCaracteresCoches()
    // var tedos_coches = JSON.parse(sessionStorage.getItem('tedos_coches'));                   // voir parametres.js fonction collecteDesCaracteresCoches()
    // var nasalisations_cochees = JSON.parse(sessionStorage.getItem('nasalisations_cochees')); // voir parametres.js fonction collecteDesCaracteresCoches()
    // var tons_coches = JSON.parse(sessionStorage.getItem('tons_coches'));                     // voir parametres.js fonction collecteDesCaracteresCoches()

    // sessionStorage.setItem('syllabes_apprentissage_html', JSON.stringify(syllabesApprentissageHTML()));
    // sessionStorage.setItem('syllabes_exercice_html', JSON.stringify(syllabesExerciceHTML()));
    // sessionStorage.setItem('syllabes_pratique_html', JSON.stringify(syllabesPratiquesHTML()));

    
    // function monoSyllabes() {
       
    //     var mono_syllabes = [
    //         [
    //             'ߓߐ',
    //             'ߖߌ',
    //             'ߖߍ',
    //             'ߖߎ',
    //             'ߘߊ',
    //             'ߛߊ',
    //             'ߛߌ',
    //             'ߛߍ',
    //             'ߛߍ߲',
    //             'ߛߏ',
    //             'ߜߊ',
    //             'ߝߍ',
    //             'ߞߎ',
    //             'ߞߐ',
    //             'ߟߌ',
    //             'ߟߎ',
    //             'ߟߐ',
    //             'ߡߎ',
    //             'ߢߊ',
    //             'ߣߊ'
    //         ],
    //         [
    //             'ߓߌ߲',
    //             'ߓߎ߲',
    //             'ߓߏ߲',
    //             'ߔߎ߲',
    //             'ߗߍ߲',
    //             'ߘߋ߲',
    //             'ߛߊ߲',
    //             'ߜߊ߲',
    //             'ߜߋ߲',
    //             'ߞߏ߲',
    //             'ߟߍ߲',
    //             'ߢߌ߲'
    //         ]
    //     ];       
            
    //     return mono_syllabes;
    // }
    // function biSyllabes() {
    //     var bi_syllabes = [
    //         [
    //             'ߓߊߘߊ',
    //             'ߓߊߛߊ',
    //             'ߓߊߛߌ',
    //             'ߓߊߟߊ',
    //             'ߓߌߙߊ',
    //             'ߓߌߓߌ',
    //             'ߓߌߘߌ',
    //             'ߓߎߘߎ',
    //             'ߕߎߙߊ',
    //             'ߕߎߟߎ',
    //             'ߖߏߟߏ',
    //             'ߗߌߙߏ',
    //             'ߘߋߣߍ߲',
    //             'ߝߊߘߊ',
    //             'ߝߊߙߊ',
    //             'ߝߋߙߋ',
    //             'ߞߊߓߊ',
    //             'ߞߏߙߊ',
    //             'ߞߏߙߏ',
    //             'ߞߏߟߏ',
    //             'ߞߎߟߎ߲',
    //             'ߞߐߙߍ',
    //             'ߞߍߙߍ',
    //             'ߟߌߡߐ',
    //             'ߛߏߟߌ',
    //             'ߢߊߘߊ',
    //             'ߢߊߛߌ',
    //             'ߢߌߣߊ',
    //             'ߥߊߘߊ',
    //             'ߦߌߙߌ'
    //         ],
    //         [
    //             'ߓߊߘߋ߲',
    //             'ߓߌ߲ߞߊ',
    //             'ߕߌ߲ߛߐ߲',
    //             'ߕߍߓߍ߲',
    //             'ߛߊߣߌ߲',
    //             'ߛߊ߲ߣߍ߲',
    //             'ߛߊ߲ߕߌ߲',
    //             'ߛߊ߲ߛߊ߲',
    //             'ߝߏߘߏ߲',
    //             'ߟߊߝߋ߲',
    //             'ߢߌߡߌ߲',
    //             'ߣߐ߲ߛߌ߲',
    //             'ߥߎߛߋ߲'
    //         ]
    //     ];
        
    //     return bi_syllabes;
    // }
    // function triSyllabes() {
    //     var tri_syllabes = [
    //         [
    //             'ߘߌߦߊߢߍ',
    //             'ߞߐߣߐߡߊ',
    //             'ߞߎߡߊߟߊ',
    //             'ߛߊߙߊߖߋ',
    //             'ߛߋߙߋߥߊ',
    //             'ߛߌߟߊߓߊ',
    //             'ߛߎߟߎߞߎ',
    //             'ߟߌߞߌߛߍ',
    //             'ߡߌߣߌߢߊ߲',
    //             'ߕߌߓߌߟߌ',
    //             'ߦߌߙߌߖߋ',
    //             'ߦߌߙߌߝߍ'
    //         ],
    //         [
    //             'ߛߊ߲ߡߊߘߊ߲',
    //             'ߛߊ߲ߝߍߙߍ߲',
    //             'ߛߎߙߎ߲ߘߎ',
    //             'ߘߊ߲ߘߊߟߌ',
    //             'ߘߋ߲ߓߊߕߌ',
    //             'ߘߋ߲ߓߊߦߊ',
    //             'ߛߊ߲ߜߊߛߌ',
    //             'ߛߊ߲ߞߌߘߊ߲',
    //             'ߛߎ߲ߞߎߘߎ߲',
    //             'ߛߊߟߌߓߊ',
    //             'ߛߋߙߋߟߋ߲',
    //             'ߝߐߟߌߝߋ߲',
    //             'ߞߊߡߋߙߋ߲',
    //             'ߞߎߟߎ߲ߣߍ߲',
    //             'ߟߌߝߊ߲ߝߊ߲'
    //         ]
    //     ];

    //     return tri_syllabes;
    // }
    // function quadriSyllabes() {
    //     var quadri_syllabes = [
    //         [
    //             'ߕߊߙߊߟߌߟߊ',
    //             'ߕߌߓߌߟߌߟߊ',
    //             'ߜߊߛߊߞߊߙߊ',
    //             'ߝߊߘߌߦߊߓߐ',
    //             'ߞߎߡߊߓߎߘߎ',
    //             'ߛߍߓߍߟߌߟߊ',
    //             'ߞߊߙߊߟߌߟߊ',
    //             'ߡߍߣߍߡߍߣߍ',
    //             'ߢߊߡߊߞߎߖߌ'
    //         ],
    //         [
    //             'ߓߏߟߏߞߏߟߏ߲',
    //             'ߓߏߟߏߡߊߘߏ߲',
    //             'ߕߊߟߊ߲ߕߊߟߊ߲',
    //             'ߕߌ߲ߓߌߘߌ߲ߘߊ',
    //             'ߕߏߟߏߜߋߘߋ߲',
    //             'ߘߊ߲ߘߊߟߌߟߊ',
    //             'ߛߊ߲ߜߊߟߌߡߊ',
    //             'ߛߊ߲ߡߊߞߎߟߎ߲',
    //             'ߛߍߓߍߟߌߝߋ߲',
    //             'ߞߊ߲ߥߏߙߏߝߋ',
    //             'ߞߐߣߐߡߊߣߍ߲'
    //         ]
    //     ];
        
    //     return quadri_syllabes;
    // } 
     
    // function syllabesApprentissageHTML() {
         
    //     var sah = "<table class='table_parlante'>\n";
    //     for(var i=0; i<lesson_content.length; i+=voyelles_cochees.length) {
    //         sah += "<tr>\n";
    //         for(var j=0; j<voyelles_cochees.length; j++) {
    //             sah += "<td>"+lesson_content[i+j]+"</td>\n";
    //         }
    //         sah += "</tr>\n\n";
    //     }
    //     sah += "</table>";
        
    //     return sah;        
    // }
    // function syllabesExerciceHTML(){
            	    
    //     var exercices_corps_html = '<table class="table_muette">';
    //     for(var i=0;i<mixed_syllabes.length-mixed_syllabes.length%7;i+=7){
    //         exercices_corps_html += '<tr>\n';
    //         for(var j=0;j<7;j++){
    //             exercices_corps_html += '<td>'+mixed_syllabes[i+j]+'</td>\n';
    //         }
    //         exercices_corps_html += '</tr>\n';
    //     }
    //     for(var i=mixed_syllabes.length-mixed_syllabes.length%7;i<mixed_syllabes.length;i+=mixed_syllabes.length%7){
    //         exercices_corps_html += '<tr>\n';
    //         for(var j=0;j<mixed_syllabes.length%7;j++){
    //             exercices_corps_html += '<td>'+mixed_syllabes[i+j]+'</td>\n';
    //         }
    //         exercices_corps_html += '</tr>\n';
    //     }
    //     exercices_corps_html += '</table>';
            	    
    //     return exercices_corps_html;
    // }
    // function syllabesPratiquesHTML() {
    
    //     syllabes_pratiques_html = '<div id="pratiques_container">';
        
    //         syllabes_pratiques_html += '<div id="pratiques_programme">';
    //             syllabes_pratiques_html += '<span>ߜߋ߲߬ ߁ߡߊ</span>';
    //             syllabes_pratiques_html += '<span>ߜߋ߲߬߂ߡߊ</span>';
    //             syllabes_pratiques_html += '<span>ߜߋ߲߬߃ߡߊ</span>';
    //             syllabes_pratiques_html += '<span>ߜߋ߲߬߄ߡߊ</span>';
    //         syllabes_pratiques_html += '</div>';
        
    //         syllabes_pratiques_html += '<div id="pratiques">';
    //             syllabes_pratiques_html += '<div id="pratiques_image_container"><img src="" id="pratiques_image" alt="pratiques_image"></div>';
    //             syllabes_pratiques_html += '<div id="pratiques_input_container"><input name="pratiques_input" id="pratiques_input" placeholder="ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ ߞߍ߫ ߦߊ߲߬"></div>';
    //         syllabes_pratiques_html += '</div>';
        
    //     syllabes_pratiques_html += '</div>';
        
    //     return syllabes_pratiques_html;
    // }    