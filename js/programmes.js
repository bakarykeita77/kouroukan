
     var programmes_container = $('#programmes_container');
     programmes_container.html(programme());
     
     function programme(){
      
         var programme_html = '<h2>ߘߋ߰ߟߌ ߢߍߥߟߊ </h2>';
         programme_html += '<ul>';
         for(var i=0;i<liste_de_matieres.length;i++){
             programme_html += '<li><a href="lesson.php?matiere_id='+liste_de_matieres[i][0]+'&matiere_nom='+liste_de_matieres[i][1]+'&niveau='+i+'">'+liste_de_matieres[i][1]+'</a></li>';
         }
         programme_html += '</ul>';
         
         return programme_html;
     }
