
    var tons_parametres_container = $('#tons_parametres_container');
    var tons_parametres_glissiere = $('#tons_parametres_glissiere');
    var checkbox_titre = $('.checkbox_titre');
    var check_btn_container = $('.check_btn_container');
    var checkbox_parent = $('.checkbox_parent');
    var checkbox_children = $('.checkbox_children');
    var submit_btn = $('#submit_btn');
    var voyelle = $('.voyelle');
    var consonne = $('.consonne');
    var ton = $('.ton');
    var nasalisation = $('.nasalisation');
    
    var voyelles = [];
    var consonnes = [];
    var tons = [];
    var double_r = ['ߚ'];
    var tedo = ['ߒ'];
    var nasalisations = [];
    var caracteres_coches = [];
    var syllabes_tonifiees = [];

//     affichageDeTonsParamtres();
//     masquerTonsParametres();
//     cochageAutomatique();
//     tableauDesCaracteresCoches();
    
    
//     function affichageDeTonsParamtres(){
//         tons_parametres_container.on('click', function(){
//             tons_parametres_glissiere.animate({'top':0, 'height':'200px'}, 200);
//         });
//     }
//     function masquerTonsParametres(){
//         submit_btn.on('click',function(e){
//             e.stopPropagation();
//             tons_parametres_glissiere.animate({'top':'-220px', 'height':'16px'},200);
//         });
//      }
//     function cochageAutomatique(){
//         $.each(checkbox_parent, function(){
//             $(this).on('click', function(){
//                 var checkbox_children_actifs = $(this).parent().parent().next().find('.checkbox_children');
            
//                 if($(this).prop('checked')==true){ checkbox_children_actifs.prop('checked',true); }
//                 if($(this).prop('checked')==false){ checkbox_children_actifs.prop('checked',false); }
//             });
//         });
//     }
//     function tableauDesCaracteresCoches(){
//         submit_btn.on('click', function(){
     
//             var voyelle_coche;
//             var consone_coche;
//             var ton_coche;
//             var nasalisation_coche;
//             collecteDesCaracteresCoches();
//             tableauDeSyllabesTonifiees();
//             chargementDeTableParlante();

//             function collecteDesCaracteresCoches(){
    
//                 voyelles.splice(0,voyelles.length);
//                 consonnes.splice(0,consonnes.length);
//                 tons.splice(0,tons.length);
//                 nasalisations.splice(0,nasalisations.length);

//                 $.each(voyelle, function(){
//                     voyelle_coche = $(this).prop('checked');
                    
//                     if(voyelle_coche==true){
//                         voyelles[voyelles.length] = $(this).attr('value');
//                     }
//                  });
//                 $.each(consonne, function(){
//                     consone_coche = $(this).prop('checked');
                    
//                     if(consone_coche==true){
//                         consonnes[consonnes.length] = $(this).attr('value');
//                     }
//                  });
//                 $.each(ton, function(){
//                     ton_coche = $(this).prop('checked');
                    
//                     if(ton_coche==true){
//                         tons[tons.length] = $(this).attr('value');
//                     }
//                  });
//                 $.each(nasalisation, function(){
//                     nasalisation_coche = $(this).prop('checked');
                    
//                     if(nasalisation_coche==true){
//                         nasalisations[nasalisations.length] = $(this).attr('value');
//                     }
//                  });

//                  caracteres_coches = [voyelles, consonnes, double_r, tedo, tons, nasalisations];
//              }
//             function tableauDeSyllabesTonifiees(){
//                 syllabes_tonifiees.splice(0,syllabes_tonifiees.length);
            
//                 for(l=0;l<caracteres_coches[5].length;l++){
//                 for(i=0;i<caracteres_coches[1].length;i++){
//                 for(j=0;j<caracteres_coches[0].length;j++){
//                 for(k=0;k<caracteres_coches[4].length;k++){
//                     syllabes_tonifiees[syllabes_tonifiees.length] = caracteres_coches[1][i]+caracteres_coches[0][j]+caracteres_coches[4][k]+caracteres_coches[5][l];
//                 }
//                 }
//                 }
//                 }
//             }
//             function chargementDeTableParlante(){
                      
//                 var nbre_syllabes = syllabes_tonifiees.length;
//                 var nbre_voyelles = caracteres_coches[0].length;
//                 var nbre_consonnes = caracteres_coches[1].length;
//                 var nbre_tons = caracteres_coches[4].length;
//                 var nbre_nasalisations = caracteres_coches[5].length;
                
// // alert(nbre_syllabes+'_'+nbre_voyelles+'_'+nbre_consonnes+'_'+nbre_tons+'_'+nbre_nasalisations);
                
//                 var table = '<div class=\"table_parlante_container\">';
//                 for (l = 0; l < nbre_syllabes; l += nbre_syllabes/nbre_nasalisations) {
//                 table += '<div class=\"nasalisations_div\">';
//                 for (i = 0; i < nbre_syllabes; i += nbre_syllabes/(nbre_voyelles*nbre_tons*2)) {
//                 table += '<div>';
//                 for (m = 0; m < nbre_syllabes; m += nbre_syllabes/(nbre_voyelles*2)) {
//                 table += '<div>';
//                 for (j = 0; j < nbre_syllabes; j+=nbre_syllabes/(nbre_consonnes*nbre_tons*2)) {
//                     table += '<div>';
//                         for (k = 0; k < nbre_syllabes; k+=nbre_syllabes/(nbre_consonnes*nbre_voyelles*2)) {
//                             alert(syllabes_tonifiees[l+i+m+j+k]);
//                             table += '<div>'+syllabes_tonifiees[l+i+m+j+k]+'</div>';
//                         }
//                     table += '</div>';
//                 }
//                 table += '</div>';
//                 }
//                 table += '</div>';
//                 }
                
//                 table += '</div>';
//                 }
//                 table += '</div>';
                
//                 // var table = '<div class=\"table_parlante_container\">';
//                 // table += '<table class = \"table_parlante\">';
//                 // for (i = 0; i < syllabes_tonifiees.length; i += caracteres_coches[4].length) {
//                 //     table += '<tr>';
//                 //     for (j = 0; j < caracteres_coches[4].length; j++) {
//                 //         table += '<td>'+syllabes_tonifiees[i+j]+'</td>';
//                 //     }
//                 //     table += '</tr>';
//                 // }
//                 // table += '</table>';
//                 // table += '</div>';
                
//                 $('#lesson_corps').html(table);
//              }
            
//          });
//      }
     
submit_btn.on('mouseover',function(){
    alert('ok');
});