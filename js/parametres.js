
 /* Declaration des variables */   
    var parametres_btn, parametres;
    var voyelles_checker, consonnes_checker, tedo_checker, tons_checker, nasalisation_checker;
    var checkbox_titre, check_btn_container, checkbox_parent, check_btn, checkbox_children;
    var voyelles_cochees = [], consonnes_cochees = [], tedos_coches = [], tons_coches = [], nasalisations_cochees = [], caracteres_coches = [],syllabes_coches = [];
    var niveau = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var phase_id = JSON.parse(sessionStorage.getItem('phase_id'));
    var lesson_courante = [];
    

    
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 /* Les variables tableaux regroupant les caracteres par types */  
    voyelles = lesVoyelles();
    consonnes = lesConsonnes();
    tedoo = leTedo();
    nasalisations = laNasalisation();
    tons = lesTons();

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/    
    parametrageDeLesson();
    actualiserCochage();
    affichageDeParametres();
    parametrageDeApprentissage();
    
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/    

    function actualiserCochage() {
        voyelles_cochees = $('#voyelles_cochees').html().split('');
        consonnes_cochees = $('#consonnes_cochees').html().split('');
        tedos_coches = $('#tedos_coches').html().split('');
        tons_coches = [''].concat($('#tons_coches').html().split(''));
        nasalisations_cochees = [''].concat($('#nasalisations_cochees').html().split(''));
        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];

        lettres = voyelles_cochees.concat(consonnes_cochees,tedos_coches);
        syllabes = syllab();                // Voir js/syllabes.js 
        syllabes_tonifies = tonification(); // Voir js/tons.js
    }	
    function affichageDeParametres(){ 
        
        $(".parametres_btns").on('mouseover', function() { afficherParametres(); });
        $(".parametres_popup").on('mouseleave', function(){ masquerParametres(); });
        $('.course_container, #submit_btn').on('click', function(){ masquerParametres(); });
        
        function afficherParametres() { 
            $(".media_btns").css({"tansform":"scale(0.75)", "opacity":0});
            $(".media_btns").css({"display":"none"});

            $(".parametres_container").css({"display":"block", "opacity":0}); 
            setTimeout(() => { $(".parametres_container").css({"transform":"scale(1)", "opacity":1}); }, 10);
        }
        function masquerParametres() {
            $(".parametres_container").css({"transform":"scale(0.75)", "opacity":0});
            setTimeout(() => { $(".parametres_container").css({'display':'none'}); }, 300);
        }
    }
    function parametrageDeLesson(){
       
        parametres = $('#parametres');
        lesson_parametres = $('#lesson_parametres');

        selectionDesElementsDeLessonParametres();
        chargementDesElementsDeLessonParametres();
        affichageDeLessonParametres();
        cocherLesCaracteres();
       
        function selectionDesElementsDeLessonParametres(){
            submit_btn = $('#submit_btn');
            lesson_parametres_glissiere = $('#lesson_parametres_glissiere');
            lesson_parametres_container = $('#lesson_parametres_container');
            
            checkbox_titre = $('.checkbox_titre');
            check_btn_container = $('.check_btn_container');
            check_btn = $('.check_btn');
            checkbox_parent = $('.checkbox_parent');
            checkbox_children = $('.checkbox_children');
            
            voyelle = $('.voyelle');
            consonne = $('.consonne');
            tedo = $('.tedo');
            ton = $('.ton');
            nasalisation = $('.nasalisation');
            
            parametres_btn = $('.parametre_btn_container');
            voyelles_checker = $('#voyelles_checker');
            consonnes_checker = $('#consonnes_checker');
            tedo_checker = $('#tedo_checker');
            tons_checker = $('#tons_checker');
            nasalisation_checker = $('#nasalisation_checker');

         }
        function chargementDesElementsDeLessonParametres(){
            consonnes_checker.html(consonnesCheckerHTML());
            tedo_checker.html(tedoCheckerHTML());
            voyelles_checker.html(voyellesCheckerHTML());
            tons_checker.html(tonsCheckerHTML());
            nasalisation_checker.html(nasalisationCheckerHTML());

                
            function voyellesCheckerHTML(){
                var vch = '';
                
                vch += "<table class='checkbox' id='checkbox_voyelles'>\n";
                    vch += "<tr class='checkbox_titre'><td><input type='checkbox' name='voyelle_checkbox' class='checkbox_parent'><label for='voyelle_checkbox'>ߛߌ߬ߙߊ߬ߟߊ߲</label></td></tr>\n";
                    vch += "<tr class='check_btn_container'>\n";
                        for(i=0;i<voyelles.length;i++){
                            vch += "<td class='check_btn'><input type='checkbox' name='voyelle_"+i+"' value='"+voyelles[i]+"' class='checkbox_children voyelle'><label for='voyelle_"+i+"'>"+voyelles[i]+"</label></td>\n";
                        }
                    vch += "</tr>\n";
                vch += "</table>\n";
                
                return vch;
            }
            function consonnesCheckerHTML(){
                var cch = '';
    
                cch += "<table class='checkbox' id='checkbox_consonnes'>\n";
                    cch += "<tr class='checkbox_titre'><td colspan='3'><input type='checkbox' name='consonne_checkbox' class='checkbox_parent'><label for='consonne_checkbox'>ߛߌ߬ߙߊ߬ߕߊ</label></td></tr>\n";
                    cch += "<tr class='check_btn_container'>\n";
                        for(var i=0;i<14;i+=7){
                            cch += "<td><table class='check_consonnes'>\n";
                            cch += "<tr>\n";
                                for(var j=0;j<7;j++){
                                cch += "<td class='check_btn'><input type='checkbox' name='consonne_"+i+j+"' value='"+consonnes[i+j]+"' class='checkbox_children consonne'><label for='consonne_"+i+j+"'>"+consonnes[i+j]+"</label></td>\n";
                                }
                            cch += "</tr>\n";
                            cch += "</table>";
                        }
                        cch += "<td><table class='check_consonnes'>\n";
                        cch += "<tr>\n";
                            for(var k=14;k<19;k++){
                            cch += "<td class='check_btn'><input type='checkbox' name='consonne_"+k+"' value='"+consonnes[k]+"' class='checkbox_children consonne'><label for='consonne_"+k+"'>"+consonnes[k]+"</label></td>\n";
                            }
                        cch += "</tr>\n";
                        cch += "</table>";
        
                    cch += "</tr></td>\n";
                cch += "</table>\n";
                
                return cch;
            }
            function tedoCheckerHTML(){
                var tdch = '';
                
                tdch += "<table class='checkbox' id='checkbox_tedo'>\n";
                    tdch += "<tr class='checkbox_titre'><td><input type='checkbox' name='tedo_checkbox' class='checkbox_parent'><label for='tedo_checkbox'>ߕߍߘߐ</label></td></tr>\n";
                    tdch += "<tr class='check_btn_container'>\n";
                        for(var i=0;i<tedoo.length;i++){
                            tdch += "<td class='check_btn'><input type='checkbox' name='tedo_"+i+"' value='"+tedoo[i]+"' class='checkbox_children tedo'><label for='tedo_"+i+"'>"+tedoo[i]+"</label></td>\n";
                        }
                    tdch += "</tr>\n";
                tdch += "</table>\n";
                
                return tdch;
            }
            function tonsCheckerHTML(){
                var tch = '';
                tch += "<table class='checkbox' id='checkbox_tons'>\n";
                    tch += "<tr class='checkbox_titre'><td><input type='checkbox' name='tons_checkbox' class='checkbox_parent'><label for='tons_checkbox'>ߞߊ߲ߡߊߛߙߋ</label></td></tr>\n";
                    tch += "<tr class='check_btn_container ponctuations'>\n";
                        for(var i=0;i<tons.length;i++){
                            tch += "<td class='check_btn'><input type='checkbox' name='ton_"+i+"' value='"+tons[i]+"' class='checkbox_children ton'><label class='ton_signe' for='ton_"+i+"'>"+tons[i]+"</label></td>\n";
                        }
                    tch += "</tr>\n";
                tch += "</table>\n";
                
                return tch;
            }
            function nasalisationCheckerHTML(){
                var nch = '';
                
                nch += "<table class='checkbox' id='checkbox_nasalisation'>\n";
                    nch += "<tr class='checkbox_titre'><td><input type='checkbox' name='nasalisation_checkbox' class='checkbox_parent'><label for='nasalisation_checkbox'>ߞߊ߲ߠߊߘߌߦߊߟߊ߲</label></td></tr>\n";
                    nch += "<tr class='check_btn_container nasalisations_btn_container'>\n";
                        for(var i=0;i<nasalisations.length;i++){
                            nch += "<td class='check_btn'><input type='checkbox' name='nasalisation_"+i+"' value='"+nasalisations[i]+"' class='checkbox_children nasalisation'><label for='nasalisation_"+i+"'>"+nasalisations[i]+"</label></td>\n";
                        }
                    nch += "</tr>\n";
                nch += "</table>\n";
                
                return nch;
            }
        }
        function cocherLesCaracteres(){
            
            checkbox_parentClick();
            checkbox_childrenClick();
            
            $.each($('.checkbox_parent'), function(){ $(this).click(); }); /* Cochage par defaut */
            $('.checkbox_titre').on('click', function(){ $(this).find('.checkbox_parent').click(); });
            $('.check_btn').on('click', function(){ $(this).children().first().click(); });
        
            function checkbox_parentClick(){
                
                $('.checkbox_parent').on('click', function(){
                
                    var checkbox_children_actifs = $(this).parent().parent().next().find('.checkbox_children');
                    if($(this).prop('checked')==true){ checkbox_children_actifs.prop('checked',true); }
                    if($(this).prop('checked')==false){ checkbox_children_actifs.prop('checked',false); }
                    
                    collecteDesCaracteresCoches();
                });
             }
            function checkbox_childrenClick(){ $('.checkbox_children').on('click', function(){ collecteDesCaracteresCoches(); }); }
            function collecteDesCaracteresCoches(){
                viderLesSousTableauxDesCaracteresCoches();
                rechargerLesSousTableauxDesCaracteresCoches();
              
                function viderLesSousTableauxDesCaracteresCoches(){
                    voyelles_cochees.splice(0,voyelles_cochees.length);
                    consonnes_cochees.splice(0,consonnes_cochees.length);
                    tedos_coches.splice(0,tedos_coches.length);
                    tons_coches.splice(0,tons_coches.length);
                    nasalisations_cochees.splice(0,nasalisations_cochees.length);
                 }
                function rechargerLesSousTableauxDesCaracteresCoches(){
                    if(niveau==1){
                        $.each($('.voyelle'), function(){
                            voyelle_coche = $(this).prop('checked');
                            if(voyelle_coche==true){ voyelles_cochees[voyelles_cochees.length] = $(this).attr('value'); }
                         });
                        $.each($('.consonne'), function(){
                            consonne_coche = $(this).prop('checked');
                            if(consonne_coche==true){ consonnes_cochees[consonnes_cochees.length] = $(this).attr('value'); }
                         });
                        $.each($('.tedo'), function(){
                            tedo_coche = $(this).prop('checked');
                            if(tedo_coche==true){ tedos_coches[tedos_coches.length] = $(this).attr('value'); }
                         });
                         
                        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches];
                    }
                    if(niveau==2){
                        
                        $.each($('.voyelle'), function(){
                            voyelle_coche = $(this).prop('checked');
                            if(voyelle_coche==true){ voyelles_cochees[voyelles_cochees.length] = $(this).attr('value'); }
                         });
                        $.each($('.consonne'), function(){
                            consonne_coche = $(this).prop('checked');
                            if(consonne_coche==true){ consonnes_cochees[consonnes_cochees.length] = $(this).attr('value'); }
                         });
                        $.each($('.tedo'), function(){
                            tedo_coche = $(this).prop('checked');
                            if(tedo_coche==true){ tedos_coches[tedos_coches.length] = $(this).attr('value'); }
                         });
                        $.each($('.nasalisation'), function(){
                            nasalisation_coche = $(this).prop('checked');
                            if(nasalisation_coche==true){ nasalisations_cochees[nasalisations_cochees.length] = $(this).attr('value'); }
                         });
                         
                        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, nasalisations_cochees];
                    }
                    if(niveau==3){
                        $.each($('.voyelle'), function(){
                            voyelle_coche = $(this).prop('checked');
                            if(voyelle_coche==true){ voyelles_cochees[voyelles_cochees.length] = $(this).attr('value'); }
                         });
                        $.each($('.consonne'), function(){
                            consonne_coche = $(this).prop('checked');
                            if(consonne_coche==true){ consonnes_cochees[consonnes_cochees.length] = $(this).attr('value'); }
                         });
                        $.each($('.tedo'), function(){
                            tedo_coche = $(this).prop('checked');
                            if(tedo_coche==true){ tedos_coches[tedos_coches.length] = $(this).attr('value'); }
                         });
                        $.each($('.ton'), function(){
                            ton_coche = $(this).prop('checked');
                            if(ton_coche==true){ tons_coches[tons_coches.length] = $(this).attr('value'); }
                         });
                        $.each($('.nasalisation'), function(){
                            nasalisation_coche = $(this).prop('checked');
                            if(nasalisation_coche==true){ nasalisations_cochees[nasalisations_cochees.length] = $(this).attr('value'); }
                         });
                         
                        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
                    }
                    if(niveau==4){
                        $.each($('.voyelle'), function(){
                            voyelle_coche = $(this).prop('checked');
                            if(voyelle_coche==true){ voyelles_cochees[voyelles_cochees.length] = $(this).attr('value'); }
                         });
                        $.each($('.consonne'), function(){
                            consonne_coche = $(this).prop('checked');
                            if(consonne_coche==true){ consonnes_cochees[consonnes_cochees.length] = $(this).attr('value'); }
                         });
                        $.each($('.tedo'), function(){
                            tedo_coche = $(this).prop('checked');
                            if(tedo_coche==true){ tedos_coches[tedos_coches.length] = $(this).attr('value'); }
                         });
                        $.each($('.ton'), function(){
                            ton_coche = $(this).prop('checked');
                            if(ton_coche==true){ tons_coches[tons_coches.length] = $(this).attr('value'); }
                         });
                        $.each($('.nasalisation'), function(){
                            nasalisation_coche = $(this).prop('checked');
                            if(nasalisation_coche==true){ nasalisations_cochees[nasalisations_cochees.length] = $(this).attr('value'); }
                         });
                        
                        caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
                    }
                }
             
                $('#voyelles_cochees').html(voyelles_cochees);
                $('#consonnes_cochees').html(consonnes_cochees);
                $('#tedos_coches').html(tedos_coches);
                $('#tons_coches').html(tons_coches);
                $('#nasalisations_cochees').html(nasalisations_cochees);
             }
         }
        function affichageDeLessonParametres(){
               
            choixDesOptionsNecessaires();
            function choixDesOptionsNecessaires(){
                
                if(niveau==1){ tons_checker.hide(); nasalisation_checker.hide(); }
                if(niveau==2){ tons_checker.hide(); tedo_checker.hide(); }
             }
         }
    }
    function parametrageDeApprentissage() {
        
        $('.checkbox_titre, .check_btn').on('click', function() { 

         // Chaque fois qu'un checkbox est clické, le cochage doit etre actualisé et le tableau noir rechargé. 
            actualiserCochage(); 
            lesson_courante = lessonCourante();
            $('#apprentissage_body').html( lesson_courante ); 
                
            lectureSemiAutomatique(); // Voir fonctions.js
            lecturePersonnalisee();   // Voir fonctions.js
            arreterLecture(lessonCourante); // Voir fonctions.js

            function lessonCourante() {

                if(phase_id=='alphabet_apprentissage') { lesson_courante = alphabetApprentissageHTML(); } //Voir alphabet.js 
                if(phase_id=='syllabes_apprentissage') { lesson_courante = syllabesApprentissageHTML(); } //Voir syllabes.js
                if(phase_id=='tons_apprentissage'    ) { lesson_courante = tonsApprentissageHTML();     } //Voir tons.js
                if(phase_id=='chiffres_apprentissage') { lesson_courante = chiffresApprentissageHTML(); } //Voir chiffres.js
                
                if(phase_id=='alphabet_exercice'     ) { lesson_courante = alphabetExercicesHTML();     } //Voir alphabet.js
                if(phase_id=='syllabes_exercice'     ) { lesson_courante = syllabesExercicesHTML();     } //Voir syllabes.js
                if(phase_id=='tons_exercice'         ) { lesson_courante = tonsExercicesHTML();         } //Voir tons.js
                if(phase_id=='chiffres_exercice'     ) { lesson_courante = chiffresExercicesHTML();     } //Voir chiffres.js
              
               if(phase_id=='syllabes_pratique'      ) { lesson_courante = syllabesPratiquesHTML();     } //Voir syllabes.js
               if(phase_id=='tons_pratique'          ) { lesson_courante = tonsPratiquesHTML();         } //Voir tons.js
               if(phase_id=='chiffres_pratique'      ) { lesson_courante = chiffresPratiquesHTML();     } //Voir chiffres.js
            
                return lesson_courante;
            }
        });
        
    }