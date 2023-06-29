
function apprentissages() {
        
    var id = JSON.parse(sessionStorage.getItem('id'));  
    var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));   // Voir programmes.js fonction storagesDuProgramme()
    
    var table_id = $('.table_parlante').attr('id');
        
    var table = $('#'+table_id); 
    var tr = $('#'+table_id+' tr');
    var td = $('#'+table_id+' td');
    var nbr_table = table.length;
    var nbr_tr = tr.length;
    var nbr_td = td.length;

    var clicks_memo = [];
  
 /*-----------------------------------------------------------------------------------------------------------------------------------*/
    
    $('.fermeture').attr('id', 'fermer_apprentissage');

    apprendre();
    enregistrerApprentissage();
    stockerApprentissage();
                    
 /*-----------------------------------------------------------------------------------------------------------------------------------*/
    
    function apprendre() {

        affichageDesBoutonsMedia();
        lectureSemiAutomatique();  // Voir fonctions.js
        lecturePersonnalisee();    // Voir fonctions.js
        arreterLecture();          // Voir fonctions.js
        apprentissageProgressBarr();

      
        function affichageDesBoutonsMedia(){
            $(".media_label").on('mouseover', function() { afficherMediaBoutons(); });
            $(".media_btns").on('mouseleave', function(){ masquerMediaBoutons(); });
            $('.course_container').on('click', function(){ masquerMediaBoutons(); });

            $(".media_btns .btn").click(function() {
                $(".media_btns .btn").css('background-color','white');
                $(this).css('background-color','yellow');
            });
        }
        function afficherMediaBoutons() { 
            $(".parametres_container").css({"transform":"scale(0.75)", "opacity":0});
            setTimeout(() => { $(".parametres_container").css({"display":"none"}); }, 250);

            $(".media_btns").css({"display":"block", "transform":"scale(1)", "opacity":1}); 
        }
        function masquerMediaBoutons(){
            $(".media_btns").css({"tansform":"scale(0.75)", "opacity":0});
            setTimeout(() => { $(".media_btns").css({"display":"none"}); }, 300);
        }
        function apprentissageProgressBarr() {
         /*
          A chaque click sur un élément, progress barr avance d'une unité égale à progress_unity px.
          Mais si un élément est clické une deuxième fois, progress barr ne doit pas avancer.
          Pour cela, tous les éléments clichés sont enregistrés dans un tableau pour les distinguer.
         */
                        
            var nbr_click = nbr_td;
            let elements_clickes = [];
                     
            progression(nbr_click);
            initialiserApprentissageProgressBarr();

            function initialiserApprentissageProgressBarr() {
                $('.parametres_popup td').on('click', function() {  
                    
                    var nbr_td = JSON.parse(sessionStorage.getItem("nbr_td"));    // Voir parametres.js fonction lettresCochees()
                    var nbr_click = nbr_td;
                    elements_clickes = [];
                    progress_unity = 0;

                    $('.progress_bonne_reponse_bar').css('width', progress_unity+'px');
                    progression(nbr_click);
                });
            }
            function progression(nbr_click) {
                var progress_unity = $('#apprentissage_progress_bar').width()/nbr_click;
                $('.table_parlante td').on('click', function() {
                    if(elements_clickes.indexOf($(this).html()) == -1) $('.progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                    elements_clickes.push($(this).html());
                });
            }
        }
    }
    function enregistrerApprentissage() {
        
        nbr_td_par_table = Math.ceil(nbr_td/nbr_table);
        nbr_td_par_tr = Math.ceil(nbr_td/nbr_tr);
                       
        
        initialiserApprentissageAStocker();
        memoriserApprentissage();
        
        
        function initialiserApprentissageAStocker() {
            //
        }
        function memoriserApprentissage() {

            $.each(td, function(){   
              /* 
              --------------------------------------------------------------------------------------------------------
               Pour chaque click sur un bouton:
                  1)- Un compteur de click individuel est activé qui calcule combien de fois chaque bouton est clické.
                  2)- Une identification est faite pour savoir, quel bouton est clické.
                  3)- Un enregistrement capte le nombre de click pour chaque bouton.
                  4)- Et le memo de l'enregistrement est envoyé au serveur quand on ferme la leçon.
              --------------------------------------------------------------------------------------------------------
              */
                var element        = $(this).html();
                var table_courante = $(this).parent().parent().parent();
                var tr_index       = $(this).parent().index();
                var table_index    = table.index(table_courante);
                var element_index  = table_index*nbr_td_par_table + tr_index*nbr_td_par_tr + $(this).index();
                //var element_index  = $(this).index();
                var element_click_counter = 0;
                var point = 0;

              /*
              --------------------------------------------------------------------------------------------------------
                Initialisation de mémoire d'enregistrement qui est un tableau bidimentionnel.
                Il contient des petits tableaux de deux éléments chacun:
                - Le premier est le nom de l'élément clické;
                - Le deuxième est le nombre de fois que cet élément est clické.
                 
                L'initialisation consiste à donner la valeur 0 click à tous les éléments.
                On considère qu'aucun élément n'est clické pour le moment. 
               --------------------------------------------------------------------------------------------------------
               */
                clicks_memo[element_index] = [element,parseIntNko(element_click_counter),parseIntNko(point)];

                $(this).on('click', function(){
                    
                  /*--------------------------------------------------------------------
                   3)- Enregistrement des clicks 
                   
                   L'enregistrement par bouton ou élémentaire est un tableau de trois éléments dont
                   - L'élément clické;
                   - Le nombre de fois que cet élément est  clické. 
                   - Le point.

                   --------------------------------------------------------------------*/
                                                  
                    var clicked_element = $(this).html(); // Élément clické.
                    element_click_counter++; // Compteur de click pour chaque élément.
                    var new_mark = (element_click_counter >= 5) ? "߁" : "߀";
         
                    var new_click_value = [clicked_element,parseIntNko(element_click_counter),new_mark];  // Enregistrement elementaire.
                    var non_clicked_elements = '';
           
                  /*Actualisation de mémoire d'enregistrement
                    C'est à dire qu'après chaque click,les anciennes valeurs de chaque enregistrement elementaire sont remplacés par les nouvelles valeurs.                 */
                    
                    clicks_memo.splice(element_index,1,new_click_value);
                    non_clicked_elements = nonClickedElementsTable();
                    nbr_clicked_elements = td.length - non_clicked_elements.length;
                   

                    function nonClickedElementsTable(){
                        var table_elements_non_cliques = [];

                        $.each(clicks_memo, function(){
                            if($(this)[1]==0){ table_elements_non_cliques[table_elements_non_cliques.length] = $(this); }
                        });
                        
                        return table_elements_non_cliques;
                    }
                });   
            });
        }
    }
    function stockerApprentissage() {
  
        $('#fermer_apprentissage').one('click',function() {
            let moyenne_d_apprentissage = 1; 
            let index_phase_active = $('.phases_container ul li .active').index();

            note = noterApprentissage();

            if(note <  moyenne_d_apprentissage) alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
            if(note >= moyenne_d_apprentissage) {
                sendApprentissageToDB();
                changerPhaseActive(index_phase_active);
                initialiserProgressBarr();  // Voir fonction.js
            }


            function noterApprentissage() {
                var note = 0;
                for(var i=0;i<clicks_memo.length;i++) if(clicks_memo[i] !== undefined) if(clicks_memo[i][2] == "߁") note++;
                note = (note*20)/clicks_memo.length;

                return note;
                
                function nombreDeBoutonClicke() {
                    var sum_click = 0;
                    for (var i = 0; i < table_elements_click_nbr.length; i++) if(table_elements_click_nbr[i] >= click_min_admis) sum_click ++;
                    return sum_click;
                }
            }
            function sendApprentissageToDB() {       
             /*
             A la fermeture, on s'assure que chaque élément est clické au moins un nombre de fois défini.
             - Si oui le mémoire de click est envoyé au serveur;
             - Sinon, un message s'affiche et le mémoire n'est pas envoyé.
             */
                var matiere = JSON.parse(sessionStorage.getItem('matiere_active')); // Voir programmes.js fonction storagesDuProgramme()
                var phase   = JSON.parse(sessionStorage.getItem('phase'));  // Voir lessons.js fonction phaseActiveName()
                var lesson  = JSON.stringify(clicks_memo);
                
                const apprentissage_data = new URLSearchParams({
                    id     : id,
                    matiere: matiere,
                    niveau : niveau_actif,
                    phase  : phase,
                    lesson : lesson,
                    note   : note
                }); 

                fetch("/kouroukan/php/actions.php", {
                    method: "POST",
                    body: apprentissage_data
                })
                .then(response => response.text())
                .catch(error => console.log(error));  
            }
        });
    } 
}