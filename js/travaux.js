    var matieres = JSON.parse(sessionStorage.getItem('matieres'));
    var travail_1 = $('#travail_1'), travail_2 = $('#travail_2'), travail_3 = $('#travail_3'), travail_4 = $('#travail_4');
    var matiere_nom = $('#matiere_nom_container').html();
    var fiche_html_vide = "<h1 class='neant'>ߝߏߦߊ߲߫ ߹</h1>";

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/    

// Recupération des lessons étudiées
    var matieres = JSON.parse(sessionStorage.getItem('matieres'));  // Voir accueil.js fonction dataStorage()
 
    chargerTravaux(); 
    afficherTravauxContent();
    reAfficherUnePhase();

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/    
    
    function chargerTravaux() {
        if(matieres.length == 0) chargerAVideLesFiches();
        if(matieres.length != 0) {
            if( matiere_nom == "ߛߓߍߛߎ߲" ) chargerTravail(0);
            if( matiere_nom == "ߜߋ߲߭"    ) chargerTravail(1);
            if( matiere_nom == "ߞߊ߲ߡߊߛߙߋ") chargerTravail(2);
            if( matiere_nom == "ߖߊ߰ߕߋ߬ߘߋ߲") chargerTravail(3);
        }

        function chargerAVideLesFiches() {
            if(matiere_nom == "ߛߓߍߛߎ߲") $('#fiche_de_pratique').css('display','none');  // Masquer la partie pratique pour alphabet.     
            $('.travail_content').html(fiche_html_vide);
            return false;
        }
        function chargerTravail(n) {
          
            if(matieres[n] == undefined) chargerAVideLesFiches();
            if(matieres[n] != undefined) chargerLesFiches();

            function chargerLesFiches() {

                var fiche_phase  = '';

                var travail_d_apprentissage_corps_html = [];
                var travail_d_exercice_corps_html = [];
                var travail_de_pratique_corps_html = [];
                var travail_d_evaluation_corps_html = [];

                if(matiere_nom == "ߛߓߍߛߎ߲") $('#travail_de_pratique').css('display','none');  // Masquer la partie pratique pour alphabet.     

                if(matieres[n]) {
                    for (let i = 0; i < matieres[n].length; i++) {

                        fiche_phase  = matieres[n][i].phase.split('_')[1];
                        let travail_lesson = matieres[n][i].lesson;   
                        let travail_note   = matieres[n][i].note;

                        if(fiche_phase == "apprentissage") travail_d_apprentissage_corps_html.push([fiche_phase,travail_lesson,travail_note]);
                        if(fiche_phase == "exercice"     ) travail_d_exercice_corps_html     .push([fiche_phase,travail_lesson,travail_note]);
                        if(fiche_phase == "pratique"     ) travail_de_pratique_corps_html    .push([fiche_phase,travail_lesson,travail_note]);
                        if(fiche_phase == "evaluation"   ) travail_d_evaluation_corps_html   .push([fiche_phase,travail_lesson,travail_note]);
                    }
                    
                    if(travail_d_apprentissage_corps_html.length == 0) travail_1.html(fiche_html_vide);
                    if(travail_d_exercice_corps_html.length      == 0) travail_2.html(fiche_html_vide);
                    if(travail_de_pratique_corps_html.length     == 0) travail_3.html(fiche_html_vide);
                    if(travail_d_evaluation_corps_html.length    == 0) travail_4.html(fiche_html_vide);
                }

                chargerTravailCorps(travail_d_apprentissage_corps_html);
                chargerTravailCorps(travail_d_exercice_corps_html);
                chargerTravailCorps(travail_de_pratique_corps_html);
                chargerTravailCorps(travail_d_evaluation_corps_html);
                designDesCercles();
        
                rechargerApprentissage();
                rechargerExercice();
                rechargerPratique();
                rechargerEvaluation();

                styleDuCercleActif();

                
                function chargerTravailCorps(content) {
                    for(var i=0; i<content.length; i++) {
                                
                        var phase_name = content[i][0];
                        var travail_lesson = JSON.parse(content[i][1]);
                        var travail_corps_html = travailCorpsHTML(phase_name,travail_lesson);
                        var nombre_de_bulle = nombreDeBulle();
        
                        var travail_note = parseIntNko(content[i][2]);
                        
                        switch(phase_name) {
                            case "apprentissage" : chargerTravauxDeApprentissage(); break;
                            case "exercice"      : chargerTravauxDeExercice();      break;
                            case "pratique"      : chargerTravauxDePratique();      break;
                            case "evaluation"    : chargerTravauxDeEvaluation();    break;
                        }
                        
                        
                        function nombreDeBulle() {
                            var nb = 0;

                            switch(phase_name) {
                                case "apprentissage" : nb = travail_d_apprentissage_corps_html.length; break;
                                case "exercice"      : nb = travail_d_exercice_corps_html.length;      break;
                                case "pratique"      : nb = travail_de_pratique_corps_html.length;     break;
                                case "evaluation"    : nb = travail_d_evaluation_corps_html.length;    break;
                            }

                            return nb;
                        }
                        function chargerTravauxDeApprentissage() {                
                            $('#bulles_d_apprentissage .bulles_glissiere').html(bullesHTML(nombre_de_bulle));
                            $('#travail_1_corps').html(travail_corps_html);
                            $('#travail_1_note').html(travail_note);
                        }
                        function chargerTravauxDeExercice() { 
                            $('#bulles_d_exercice .bulles_glissiere').html(bullesHTML(nombre_de_bulle));
                            $('#travail_2_corps').html(travail_corps_html);     
                            $('#travail_2_note').html(travail_note);
                        }
                        function chargerTravauxDePratique() {
                            $('#bulles_de_pratique .bulles_glissiere').html(bullesHTML(nombre_de_bulle));
                            $('#travail_31_corps').html(travail_corps_html[0]); $('#travail_31_note').html(travail_note); 
                            $('#travail_32_corps').html(travail_corps_html[1]); $('#travail_32_note').html(travail_note);
                            $('#travail_33_corps').html(travail_corps_html[2]); $('#travail_33_note').html(travail_note);
                            $('#travail_34_corps').html(travail_corps_html[3]); $('#travail_34_note').html(travail_note);
                        }
                        function chargerTravauxDeEvaluation() {
                            $('#bulles_d_evaluation .bulles_glissiere').html(bullesHTML(nombre_de_bulle));
                            $('#travail_4_corps').html(travail_corps_html);     
                            $('#travail_4_note').html(travail_note);
                        }
                    }
                    function bullesHTML(nombre_de_bulle) {
                        var cercle = "";
                        
                        for (var i = 0; i < nombre_de_bulle; i++) {
                            cercle += "<p>"+parseIntNko(i+1)+"</p>";
                        }
                        return cercle;
                    }
                }   
                function travailCorpsHTML(phase,lesson) {
                    if(lesson !== undefined) {

                        var corps_html = "";
                    
                        if(phase == "pratique") {
                            for(var i=0; i<lesson.length; i++) {
                            corps_html += "<table class='travail_corps_table' border=1>\n";
                                for(var j=0; j<3; j++) { 
                                
                                    if(j !== 2) {              
                                        corps_html += "<tr>\n";
                                            for(var k=0; k<lesson[i].length; k++) corps_html += "<td>"+lesson[i][k][j]+"</td>\n";
                                        corps_html += "</tr>\n";
                                    }

                                    if(j === 2) { 
                                        corps_html += "<tr>\n";
                                            for(var k=0; k<lesson[i].length; k++) corps_html += "<td>"+parseIntNko(lesson[i][k][j])+"</td>\n";
                                        corps_html += "</tr>\n";
                                    }
                                }
                            corps_html += "</table>\n---\n";
                            }

                            corps_html = corps_html.split('---');
                        }

                        if(phase != "pratique") {
                            corps_html = "<table class='travail_corps_table' border=1>\n";
                                corps_html += "<tr>\n";    
                                    for(let i=0; i<lesson.length; i++) if(lesson[i] !== null) corps_html += "<td>"+lesson[i][0]+"</td>\n";
                                corps_html += "</tr>\n";
                                corps_html += "<tr>\n";
                                    for(let j=0; j<lesson.length; j++) if(lesson[j] !== null) corps_html += "<td>"+lesson[j][1]+"</td>\n";
                                corps_html += "</tr>\n";
                                corps_html += "<tr>\n";
                                    for(let k=0; k<lesson.length; k++) if(lesson[k] !== null) corps_html += "<td>"+lesson[k][2]+"</td>\n";
                                corps_html += "</tr>\n";               
                            corps_html += "</table>\n\n\n";
                        }                        

                        return  corps_html;
                    }
                }
                function rechargerApprentissage() {
                    
                    $('#bulles_d_apprentissage p').click(function() {
                        let bulle_index = $(this).index();
                        let travail_lesson = JSON.parse(travail_d_apprentissage_corps_html[bulle_index][1]);
                        let travail_corps_html = travailCorpsHTML("apprentissage",travail_lesson);
                        let travail_note = travail_d_apprentissage_corps_html[bulle_index][2];

                        $('#travail_1_corps').html(travail_corps_html);
                        $('#travail_1_note').html(parseIntNko(travail_note));
                    });
                } 
                function rechargerExercice() {   
                    $('#bulles_d_exercice p').click(function() {

                        let bulle_index = $(this).index();
                    
                        let travail_lesson = JSON.parse(travail_d_exercice_corps_html[bulle_index][1]);
                        let travail_corps_html = travailCorpsHTML("exercice",travail_lesson);
                        let travail_note = travail_d_exercice_corps_html[bulle_index][2];

                        $('#travail_2_corps').html(travail_corps_html);
                        $('#travail_2_note').html(parseIntNko(travail_note));
                    });
                }
                function rechargerPratique() {    
                    $('#bulles_de_pratique p').click(function() {

                        var bulle_index = $(this).index();
                        var travail_lesson = JSON.parse(travail_de_pratique_corps_html[bulle_index][1]);
                
                        var travail_corps_html_0 = travailCorpsHTML(travail_lesson[0]);
                        var travail_corps_html_1 = travailCorpsHTML(travail_lesson[1]);
                        var travail_corps_html_2 = travailCorpsHTML(travail_lesson[2]);
                        var travail_corps_html_3 = travailCorpsHTML(travail_lesson[3]);

                        var travail_note = travail_de_pratique_corps_html[bulle_index][2];

                        $('#travail_31_corps').html(travail_corps_html_0); $('#travail_31_note').html(travail_note); 
                        $('#travail_32_corps').html(travail_corps_html_1); $('#travail_32_note').html(travail_note);
                        $('#travail_33_corps').html(travail_corps_html_2); $('#travail_33_note').html(travail_note);
                        $('#travail_34_corps').html(travail_corps_html_3); $('#travail_34_note').html(travail_note);

                        $('#travail_3_note').html(parseIntNko(travail_note));
                    });
                }
                function rechargerEvaluation() {     
                    $('#bulles_d_evaluation p').click(function() {

                        var bulle_index = $(this).index();
                        var travail_lesson = JSON.parse(travail_d_evaluation_corps_html[bulle_index][1]);
                        var travail_corps_html = travailCorpsHTML("evaluation",travail_lesson);
                        var travail_note = travail_d_evaluation_corps_html[bulle_index][2];

                        $('#travail_4_corps').html(travail_corps_html);
                        $('#travail_4_note').html(parseIntNko(travail_note));
                    });
                }
                function styleDuCercleActif() {

                    $('.bulles_container p:last-child').addClass('cercle_actif');

                    chargerTravailName();
                    chargerTravailDate();
                    reChargerTravailName();
                    reChargerTravailDate();


                    function chargerTravailName() {
                        $.each($('.travail_titre'), function() {
                            var travail_name_container = $(this).next().find('.travail_name');
                            var titre = $(this).find('h3').html();
                            var rang = $(this).find('.cercle_actif').html();
    
                            rang = (rang == '߁') ? rang+'߭' : rang+'߲';
                            var travail_name = titre+' '+rang;

                            travail_name_container.html(travail_name);
                        });
                    }     
                    function chargerTravailDate() {
                        $.each($('.travail_titre'), function() {
                            var travail_date_container = $(this).next().find('.travail_date');
                            var n = $('.bulles_container p:last-child', this).length;
                            var date = matieres[0][n].date;
                            var date_en_nko = '', heure_en_nko = '';

                            var a = parseIntNko(date.split(' ')[0].split('-')[0]);
                            var m = mois[parseInt(date.split(' ')[0].split('-')[1]) - 1];
                            var j = parseIntNko(date.split(' ')[0].split('-')[2]);

                            var h = parseIntNko(date.split(' ')[1].split(':')[0]);
                            var mn = parseIntNko(date.split(' ')[1].split(':')[1]);

                            date_en_nko = '&#128197; '+ m +' ߕߟߋ߬ '+j+' ߛߊ߲߭ '+a;
                            heure_en_nko = ' &#128338; '+h+':'+mn;

                            var travail_date = 'ߞߍ߫ ߕߎߡߊ :___ '+date_en_nko+' ___ '+heure_en_nko;

                            travail_date_container.html(travail_date);
                        });
                    }
                    function reChargerTravailName() {
                        $.each($('.bulles_container p'), function() {

                            $(this).click(function(){
                                $(this).addClass('cercle_actif');
                                $(this).siblings().removeClass('cercle_actif');

                                var travail_name = $(this).parent().parent().parent().next().find('.travail_name');
                                var travail_titre = $(this).parent().parent().prev();
                                var rang = $(this).html();

                                rang = (rang == '߁') ? rang+'߭' : rang+'߲';
                                travail_name.html( travail_titre.html()+' '+rang );
                            });
                        });
                    }  
                    function reChargerTravailDate() {
                        $.each($('.bulles_container p'), function() {

                            $(this).click(function(){
                                var travail_date_container = $(this).parent().parent().parent().next().find('.travail_date');
                                var n = $(this).index();
                                var date = matieres[0][n].date;
                                var date_en_nko = '', heure_en_nko = '';

                                var a = parseIntNko(date.split(' ')[0].split('-')[0]);
                                var m = mois[parseInt(date.split(' ')[0].split('-')[1]) - 1];
                                var j = parseIntNko(date.split(' ')[0].split('-')[2]);

                                var h = parseIntNko(date.split(' ')[1].split(':')[0]);
                                var mn = parseIntNko(date.split(' ')[1].split(':')[1]);

                                date_en_nko = '&#128197; '+ m +' ߕߟߋ߬ '+j+' ߛߊ߲߭ '+a;
                                heure_en_nko = ' &#128338; '+h+':'+mn;

                                var travail_date = 'ߞߍ߫ ߕߎߡߊ :___ '+date_en_nko+' ___ '+heure_en_nko;

                                travail_date_container.html(travail_date);

                            });
                        });
                    }

                }
                function designDesCercles() {

                    let nombre_de_cercle_1 = travail_d_apprentissage_corps_html.length;
                    let nombre_de_cercle_2 = travail_d_exercice_corps_html.length;
                    let nombre_de_cercle_3 = travail_de_pratique_corps_html.length;
                    let nombre_de_cercle_4 = travail_d_evaluation_corps_html.length;

                    $('#bulles_d_apprentissage .bulles_glissiere').css('width', nombre_de_cercle_1*2.75+'rem');
                    $('#bulles_d_exercice      .bulles_glissiere').css('width', nombre_de_cercle_2*2.75+'rem');
                    $('#bulles_de_pratique     .bulles_glissiere').css('width', nombre_de_cercle_3*2.75+'rem');
                    $('#bulles_d_evaluation    .bulles_glissiere').css('width', nombre_de_cercle_4*2.75+'rem');
                }
            }
        }
    }
    function afficherTravauxContent() {
     
        $('.travail').on('click', function(){ 
            var h = $('.travail_content', this).height();

            // Ouverture
            if(h == 1)   {
                $('.travail_content', this).animate({'height':'15rem'}, 250);
                $('.travail_titre', this).css('background-color','#aaa');
            } 
            // Fermeture
            if(h == 240) {
                $('.travail_content', this).animate({'height':1}, 250);
                $('.travail_titre', this).css('background-color','#eee');
            }       
        });

     // Empecher la propagation de l'évenement pouvant declencher la fermeture de travail_content
        $('.bulles_container p').on('click', function(e){ 
            var h = $(this).parent().parent().parent().next().height(); 
            if(h == 240)  e.stopPropagation();
        });
    }
    function reAfficherUnePhase() {
        $('.reevaluation').on('click', function(e) { e.stopPropagation(); });
        $('.reevaluation').on('click', function(){
            let id = $(this).attr('id');

            switch(id) {
                case "reevaluation_de_apprentissage" : $('#phases_list li:nth-child(1)').click(); break;
                case "reevaluation_de_exercice"      : $('#phases_list li:nth-child(2)').click(); break;
                case "reevaluation_de_pratique"      : $('#phases_list li:nth-child(3)').click(); break;
                case "reevaluation_de_evaluation"    : $('#phases_list li:nth-child(4)').click(); break;
            }
            
        });
    }