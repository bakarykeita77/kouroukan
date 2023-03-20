function apprentissages() {
        
    var id              = JSON.parse(sessionStorage.getItem('id'));  
    var apprentissage   = $('#apprentissage');
    var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var phase_id        = JSON.parse(sessionStorage.getItem('phase_id'));
    var moyenne_d_apprentissage = JSON.parse(sessionStorage.getItem("moyenne"));

    var lesson_courante = lessonCourante();
    var clicks_memo = [];


    $('.fermeture').attr('id', 'fermer_apprentissage');

    afficherCourse(apprentissage);
    parametresPosition();
    chargerApprentissage();
    apprendre();
    enregistrerApprentissage();
    stockerApprentissage();
                    
   
    function lessonCourante() {
        let lesson_courante = [];
        if(phase_id == 'alphabet_apprentissage') lesson_courante = alphabetApprentissageHTML(); // Voir alphabet.js 
        if(phase_id == 'syllabes_apprentissage') lesson_courante = syllabesApprentissageHTML(); // Voir syllabes.js
        if(phase_id == 'tons_apprentissage'    ) lesson_courante = tonsApprentissageHTML();     // Voir tons.js
        if(phase_id == 'chiffres_apprentissage') lesson_courante = chiffresApprentissageHTML(); // Voir chiffres.js

        return lesson_courante;
    }
    function chargerApprentissage() { $('#apprentissage_body').html( "<div id='table_parlante_container'>"+lesson_courante+"</div>" ); }
    function parametresPosition() {

        let param_btn = document.querySelector('#parametre_lesson_btn');
        let param_btn_object = param_btn.getBoundingClientRect();
        let param_btn_top = param_btn_object.top;
        let param_btn_left = $('#parametre_lesson_btn').offset().left;

        let parametres_container = document.querySelector('.parametres_container');
        let parametres_object = parametres_container.getBoundingClientRect();
        let parametres_height = parametres_object.height;

        $('.parametres_container').offset({'top':param_btn_top, 'left':param_btn_left});
    }
    function apprendre() {
        
        affichageDesBoutonsMedia();
        
        lectureSemiAutomatique(); // Voir fonctions.js
        lecturePersonnalisee();   // Voir fonctions.js
        arreterLecture(lessonCourante); // Voir fonctions.js
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
                        
            var nbr_click = questions().length;
            var progress_unity = $('#apprentissage_progress_bar').width()/nbr_click;
            
         /*
          A chaque click sur un élément, progress barr avance d'une unité égale à progress_unity px.
          Mais si un élément est clické une deuxième fois, progress barr ne doit pas avancer.
          Pour cela, tous les éléments clichés sont enregistrés dans un tableau pour les distinguer.
         */            
            let elements_clickes = [];
            
            $('.table_parlante td').on('click', function() {
             
                if(elements_clickes.indexOf($(this).html()) == -1) $('.progress_bonne_reponse_bar').css('width','+='+progress_unity+'px');
                elements_clickes.push($(this).html());
            });

            
            function questions() {
                var lq = '';
                
                if(niveau_en_cours==1) lq = malaxer(lettres);
                if(niveau_en_cours==2) lq = malaxer(syllabes);
                if(niveau_en_cours==3) lq = malaxer(syllabes_tonifies);
                if(niveau_en_cours==4) lq = malaxer(chiffres);
                
                return lq;
            }
        }
    }
    function enregistrerApprentissage() {
        
        var table, tr, td, nbr_table, nbr_tr, nbr_td, nbr_table_td;
        
        table = $('.table_parlante'); 
        tr = $('.table_parlante tr'); 
        td = $('.table_parlante td');
        
        nbr_table = table.length;
        nbr_tr = Math.ceil(td.length/tr.length);
        nbr_table_td = Math.ceil(td.length/nbr_table);
        nbr_td = td.length;
                   
        
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
                var element_index  = table_index*nbr_table_td + tr_index*nbr_tr + $(this).index();
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

            note = noterApprentissage();
            if(note <  moyenne_d_apprentissage) alert("ߌ ߡߊ߫ ߛߓߍߘߋ߲ ߥߟߊ ߜߋ߭ ߠߎ߬ ߓߍ߯ ߟߊߡߍ߲߫");
            if(note >= moyenne_d_apprentissage) {

                let data_phase_nbr = JSON.parse(sessionStorage.getItem('data_phase_nbr'));

                sendApprentissageToDB();
                changerPhaseActive(data_phase_nbr);
                initialiserProgressBarr();
            }

            function sendApprentissageToDB() {       
             /*
             A la fermeture, on s'assure que chaque élément est clické au moins un nombre de fois défini.
             - Si oui le mémoire de click est envoyé au serveur;
             - Sinon, un message s'affiche et le mémoire n'est pas envoyé.
             */
                var matiere = JSON.parse(sessionStorage.getItem('matiere_active'));
                var phase   = JSON.parse(sessionStorage.getItem('phase'));
                var lesson  = JSON.stringify(clicks_memo);
                
                const apprentissage_data = new URLSearchParams({
                    id     : id,
                    matiere: matiere,
                    niveau : niveau_en_cours,
                    phase  : phase,
                    lesson : lesson,
                    note   : note
                }); 

                fetch("/kouroukan/pages/actions.php", {
                    method: "POST",
                    body: apprentissage_data
                })
                .then(response => response.text())
                .catch(error => console.log(error));  
            }
            function noterApprentissage() {
                var note = 0;
                
                for(var i=0;i<clicks_memo.length;i++) {
                    if(clicks_memo[i][2] == "߁") {
                        note ++;
                    }
                }
                
                return note;
                
                function nombreDeBoutonClicke() {
                    var sum_click = 0;
                    
                    for (var i = 0; i < table_elements_click_nbr.length; i++) {
                    if(table_elements_click_nbr[i] >= click_min_admis) {    
                        sum_click ++;
                    }}
                    return sum_click;
                }
            }
        });
    } 
}