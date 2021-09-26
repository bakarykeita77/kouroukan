/* Determination des variables */
    var cadre_table_de_matiere = $('#cadre_table_de_matiere');
    var programme, table_de_matieres_container, matieres, matiere, matiere_titre, matiere_content;
    var les_elements_de_phases, phase_entete, phase_corps;
    var id_matiere, id_matiere_titre;

    var nombres_aleatoires = [];
    var nombre_aleatoire = 0;
    var td;

    var ligne_aleatoire, colonne_aleatoire;

    var audio = $('#audio');

    var table, table_parlante;
    var i, j, k, l, m, n;

    var liste_de_matieres = [
        ["alphabet_nko", "ߛߓߍߛߎ߲"],
        ["syllabes_nko", "ߜߋ߲߭"],
        ["nasalisation", "ߞߊ߲ߠߊߘߌߦߊߟߊ߲"],
        ["tons", "ߞߊ߲ߡߊߛߙߋ"],
        ["chiffres_nko", "ߖߊ߰ߕߋ߬ߘߋ߲"]
     ];
    var liste_de_phases = [
        ["apprentissage", "ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ"],
        ["exercices", "ߡߊ߬ߞߟߏ߬ߟߌ"],
        ["evaluation", "ߞߘߐߓߐߟߌ"]
     ];
    var caracteres = [
        ["ߊ", "ߋ", "ߌ", "ߍ", "ߎ", "ߏ", "ߐ"],
        ["ߓ", "ߔ", "ߕ", "ߖ", "ߗ", "ߘ", "ߙ", "ߛ", "ߜ", "ߝ", "ߞ", "ߟ", "ߡ", "ߢ", "ߣ", "ߤ", "ߥ", "ߦ", ""],
        ["ߚ"],
        ["ߒ"],
        ["", "߲"],
        ["߫", "߬", "", "߭"],
        ["߯", "߰", "߮", "߱"]
     ];
    var chiffres = ['߀', '߁', '߂', '߃', '߄', '߅', '߆', '߇', '߈', '߉'];

    var table_de_matieres = '';
    var alphabetisation = $('#alphabetisation');

    var table_de_matieres_titre, table_de_matieres_content;
    var fermeture, fermeture_element, fermeture_html, fermeture_btn;
    var lesson_div_elements, teste_div_elements;

    var v = 0, v1 = 0, v2 = 0;

    var lesson_page = $('#lesson_page');
    var lesson, lesson_reference;

    var parametre_btn = $('.parametre_btn');
    var menu_btn = $('.menu_btn');

    var tableau_de_matiere_active_id = [];
    var window_h = $(window).innerHeight();
    var window_w = $(window).innerWidth();

    var haut_de_page_h = $('#affiche_haut_de_page').outerHeight();
    var barre_navigation_h = $('#barre_navigation').outerHeight();

    var container = $('#container');
    var container_w = container.width();
    var container_h = container.height();
    var alphabetisation_w = container_w;
    var alphabetisation_h = window_h - 80;
    
    var matieres_id = []; // Tableau des id des matieres.
    var matieres_nom = []; // Tableau des nom des matieres.

    /* Les futurs elements des phases */
    var phase_div, phase_div_phase, phase, phase_div_titre, phase_titre;
    var phase_titre_content, phase_corps_contents, phase_corps_content, phase_pied_content;
    var phase_id, phase_active_nom;
    var tableau_de_phase_id = [];
    var tableau_de_nom_de_phase = [];
    
    var teste_div, teste_container;

    /* Les futurs elements de lesson */
    var menu_content, lesson_matiere_menu_btn_nom, lesson_phase_menu_btn_nom;
    var lesson_div, lesson_elements, lesson_entete, lesson_parametres_container, lesson_corps, lesson_container, lesson_pied;
    var lesson_parametres_btn, lesson_matiere_menu_btn, lesson_phase_menu_btn, lesson_sonorisation_btn;
    var lesson_parametres_btn_html, lesson_matiere_menu_btn_html, lesson_matiere_sous_menu_btn_content, lesson_phase_menu_btn_html, lesson_sonorisation_btn_html, lesson_corps_html, teste_html, clavier_html;
    var menu_flotant;
    var dicter_btn, repeat_btn;
    var id_active;
    
    var matiere_active_id, matiere_active, matiere_active_nom;
    
    var lesson_phases;
    var liste_lesson_phases_id = [];

    var lesson_parametres, lesson_parametres_html, lesson_parametres_glissiere, submit_btn;
    var check_btn_container, checkbox_titre, check_btn, checkbox_parent, checkbox_children;
    var voyelles_checker, consonnes_checker, tedo_checker, tons_checker, nasalisation_checker;
    
    var voyelle, consonne, tedo, ton, nasalisation;
    var voyelle_coche, consonne_coche, tedo_coche, ton_coche, nasalisation_coche;
    var voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, double_r, nasalisations_cochees;
    var caracteres_coches, syllabes_tonifiees;

    var phase_active_id, phase_active;
    var phase_div_titres_id = [];
    var lesson_menu_phase, phase_menu_titre, menu_flotant_container, menu_flotant_corps, menu_flotant_phase, menu_flotant_phase_titre;
    
    alphabetisation.css({'height':alphabetisation_h - 4+'px'});
    selectionDesElementsDeAlphabetisation();
    tableDeMatieres();
    testeDiv();
    
    
    

function creationDeAlphabetNko() {
    table = "<table class = 'table_parlante'>\n";
    for(var i=0;i<4;i++) {
        table += "<tr>\n";
        for(var j=0;j<7;j++) {
            table += "<td>";
                table += caracteres[i][j];
            table += "</td>\n";
        }
        table += "</tr>\n";
    }

    table += "</table>";

    return table;
 }
function creationDeAlphabetExercices() {
    table = "<table class = 'table_parlante'>\n";
    for(var i=0;i<4;i++) {
        ligne_aleatoire = Math.floor(Math.random()*4);
        table += "<tr>\n";
        for(var j=0;j<7;j++) {
            colonne_aleatoire = Math.floor(Math.random()*7);
            table += "<td>";
                        table += caracteres[i][colonne_aleatoire];
            table += "</td>\n";
        }
        table += "</tr>\n";
    }
    table += "</table>";
    return table;
 }
function creationDeAlphabetEvaluation(){}

function creationDeApostrophes(){};
function creationDeApostrophesExercices(){}
function creationDeApostrophesEvaluation(){}

function creationDeAssociation(){};
function creationDeAssociationExercices(){}
function creationDeAssociationEvaluation(){}

function creationDeBoutonDeFermeture(){
    fermeture = "<span class='fermeture_btn'>&times;</span>";
    return fermeture;
 }

function creationDeCaracteres(){}
function creationDeCaracteresExercices(){}
function creationDeCaracteresEvaluation(){}

function creationDeChiffres(){
    var n_chiffres = chiffres.length;

    table = "<table class='table_parlante'>\n";
        table += "<tr>\n";
        for(var n=0;n<n_chiffres;n++){    
            table += "<td>"+chiffres[n]+"</td>\n";
        }
        table += "</tr>\n";
    table += "</table>\n";

    return table;
};
function creationDeChiffresExercices(){
    ligne_aleatoire = Math.floor(Math.random()*10);
    
    table = "<table class='table_parlante'>\n";
        table += "<tr>\n";
        for(var n=0;n<n_chiffres;n++){    
            table += "<td>"+chiffres[ligne_aleatoire]+"</td>\n";
        }
        table += "</tr>\n";
    table += "</table>\n";
}
function creationDeChiffresEvaluation(){}

function creationDeNasalisation() {
    table = "<table class = 'table_parlante'>\n";
        for(var sr=0;sr<19;sr++) {
            table += "<tr>\n";
            for(var sc=0;sc<7;sc++) {
                table += "<td>";
                    table += [ slb[1][sr]+slb[0][sc]+slb[2] ];
                table += "</td>\n";
            }
            table += "</tr>\n";
        }
    table += "</table>";

    return table;
 }
function creationDeNasalisationExercices(){}
function creationDeNasalisationEvaluation(){}

function creationDeSyllabes() {
    table = "<table class = 'table_parlante' id = 'snko'>\n";
        for(var sr=0;sr<19;sr++) {
            for(var sc=0;sc<7;sc++) {
                table += "<td>";
                    table += [slb[1][sr]+slb[0][sc]];
                table += "</td>\n";
            }
            table += "</tr>\n";
        }
    table += "</table>";

    return table;
 }
function creationDeSyllabesExercices() {
    table = "<table class = 'table_parlante' id = 'snko'>\n";
        for(var sr=0;sr<19;sr++) {
            table += "<tr>\n";
            for(var sc=0;sc<7;sc++) {
                var consonne_aleatoire = Math.floor(Math.random()*19);
                var voyelle_aleatoire = Math.floor(Math.random()*7);
                table += "<td>";
                    table += [slb[1][consonne_aleatoire]+slb[0][voyelle_aleatoire]];
                table += "</td>\n";
            }
            table += "</tr>\n";
        }
    table += "</table>";

    return table;
 }
function creationDeSyllabesEvaluation(){}

function creationDeTons() {
    table = "<table>\n";

    for(var consonne=0;consonne<19;consonne++) {
        table += "<table class = 'table_parlante' id = 'sous_tableau_ton'>";
        for(var voyelle=0;voyelle<7;voyelle++) {
            table += "<tr>\n";
            for(var ton=0;ton<4;ton++) {
                table += "<td>";
                    table += [ slb[1][consonne]+slb[0][voyelle]+slb[3][ton] ];
                table += "</td>\n";
            }
            table += "</tr>\n";
        }
        table += "</table>";
    }

    table += "</table>";

    return table;
 }
function creationDeTonsExercices(){}
function creationDeTonsEvaluation(){}
    
    
    
  
    function testeDivElements(){
        var teste_div_elements = "<div id = 'teste'>\n";
                teste_div_elements += "<span id = 'fermer_teste'>&times;</span>\n\n";
            
                teste_div_elements += "<div id='teste_entete'> <p id='titre_teste'>ߞߘߐߓߐߟߌ</p><p id = 'nivo'></p> </div>\n";
                teste_div_elements += "<table id='teste_corps'>\n";
                teste_div_elements += "<tr id='epreuves_btns_container'>\n";
                    teste_div_elements += "<td id = 'questionneur'><p id = 'question_qtite'><span id = 'tq'></span>\<span id = 'rq'></span> <span id='ecoute_label'></span></p></td>\n";
                    teste_div_elements += "<td id = 'repeteur'>ߒ ߡߴߊ߬ ߡߍ߲߫ ߞߊ߬ ߢߊ߰</td>\n";
                    teste_div_elements += "<td id = 'correcteur'>ߏ߬  ߛߊߞߍ߫</td>\n";
                    teste_div_elements += "<td id = 'afficheur_de_resultat' style='display:none'></td>\n";
                teste_div_elements += "</tr>\n\n";
                teste_div_elements += "<tr id='epreuves_container'>\n";
                    teste_div_elements += "<td colspan = '2'>\n";
                    teste_div_elements += "<div id = 'epreuves'>\n";
                        teste_div_elements += "<div id = 'sujet'><p id = 'question'></p><p id = 'reponse_teste'></p></div>\n";
                        teste_div_elements += "<div id = 'correction'><div id='felicitation'><p id='p1'> &#128077;&#127999; </p><p id='p2'> ߌ ߞߎߟߎ߲ߖߋ߫ </p></div>\n";
                        teste_div_elements += "<div id = 'ducourrage'>\n";
                            teste_div_elements += "<div> <p id = 'a_ecrire'>ߛߓߍߕߊ</p>  <p id = 'ex1'></p> </div>\n";
                            teste_div_elements += "<div> <p id = 'ecris'>ߛߓߍߣߍ߲</p>    <p id = 'ex2'></p> </div\n";
                            teste_div_elements += "<div> <p id = 'resultat_faux'>ߞߋߟߋ߲߫</p> <p id = 'ex3'></p> </div\n";
                        teste_div_elements += "</div>\n";
                        
                        teste_div_elements += "<div id='indication'>\n";
                            teste_div_elements += "<p id='doigt'> &#128070;&#127999; </p>\n";
                            teste_div_elements += "<p id='guide'>  ߞߘߎ ߣߌ߲߬ ߘߌ߲߯ ߝߟߐ߫ </p>\n";
                        teste_div_elements += "</div>\n";
                        
                        teste_div_elements += "<div id='archive_form_container'></div>\n";
                    teste_div_elements += "</div>\n";
                    teste_div_elements += "</td>\n";
                teste_div_elements += "</tr>\n\n";
                teste_div_elements += "<tr>\n";
                    teste_div_elements += "<td><div id = 'progress_bar'><div id='question_progress_bar'></div><div id='bonne_reponse_progress_bar'></div></div></td>\n";
                teste_div_elements += "</tr>\n\n";
                teste_div_elements += "<tr>\n";
                    teste_div_elements += "<td><div id = 'teste_clavier'> <?php include 'body/clavier.php'; ?> </div></td>\n";
                teste_div_elements += "</tr>\n\n";
                teste_div_elements += "</table>\n";
                
                teste_div_elements +="<div id='resultat_div'><div id='resultat_content'></div></div>\n";
                teste_div_elements +="<div id='deliberation_div'></div>\n";
                teste_div_elements +="<p class = 'evaluation_btn'>ߞߘߐߓߐߟߌ  </p>	\n";
            teste_div_elements +="</div>";
            
            return teste_div_elements;
     }
    function selectionDesElementsDeAlphabetisation(){
        table_de_matieres = $('#table_de_matieres');
        phase_div = $('#phase_div');
        lesson_container = $('#lesson_container');
        teste_container = $('#teste_container');
     }
    function tableDeMatieres(){
        
        tableDeMatieresHTML();
        chargementDeLaTableDeMatieres();
        afficherLaTableDeMatieres();
        manipulationDeLaTableDeMatieres();
        
        function tableDeMatieresHTML() {
            var nombre_de_matiere = liste_de_matieres.length;
            var lecon_reference;
    
            table_de_matieres_content = "<h2 id='table_de_matieres_titre'>ߞߊ߬ߙߊ߲ ߢߍߥߟߊ</h2>"+'\n\n';
    
            table_de_matieres_content += "<div id='table_de_matieres_container'>"+'\n\n';
            for (i = 0; i < nombre_de_matiere; i++) {
                table_de_matieres_content += "<div class='matieres' id='"+liste_de_matieres[i][0]+"'>"+'\n';
                    table_de_matieres_content += "<span class='matiere_titre'>"+liste_de_matieres[i][1]+"</span>"+'\n';
                table_de_matieres_content += "</div>"+'\n\n\n';
    
                tableau_de_matiere_active_id[tableau_de_matiere_active_id.length] = liste_de_matieres[i][0];
            }
            table_de_matieres_content += "</div>";
    
            return table_de_matieres_content;
         }
        function chargementDeLaTableDeMatieres() {
            table_de_matieres.html( table_de_matieres_content );
         }
        function afficherLaTableDeMatieres() {
            table_de_matieres_container = $('#table_de_matieres_container');
            table_de_matieres.css({ 'width': alphabetisation_w-32+'px', 'margin': '0 16px' });
            table_de_matieres_container.css({'height':'auto'});
         }
        function manipulationDeLaTableDeMatieres(){
            
            matieres = $('#table_de_matieres_container .matieres');
            matiere_titre = $('#table_de_matieres_container .matiere_titre');
    
            matiere_titre.on('click', function(e) { $(this).parent().click(); e.stopPropagation(); });
            matieres.on('click', function(){
               
                /*Au clic sur la table de matiere, les phases correspondantes a la matiere selectionnee s'affiche*/
                /* Selection des elements de la matiere active pour un usage ulterieure */
                matiere_active_id = $(this).attr('id');
                matiere_active = $('#'+matiere_active_id);
                matiere_active_nom = $('#'+matiere_active_id+' span').first().html();
           
                
                $.each(matieres, function() { matieres_id[matieres_id.length] = $(this).attr('id'); });
                for(i=0;i<liste_de_matieres.length;i++){
                    matieres_nom[matieres_nom.length] = liste_de_matieres[i][1];
                }
                
                miseEnSurbrillanceDeLaMatiereActive();
                selectionDePhaseDiv();
                phasesElementsHTML();  //Generation des elements de phase_div, pour le momen vides.
                insertionDePhasesElements();
                chargementDePhasesElements();
                afficherLesPhases();
                manipulationDePhases();
                

                selectionDeLessonDiv();
                lesElementsDeLesson();
                insertionDesElementsDeLessonDiv();
                manipulationDeLessonDiv();
                
                
                function miseEnSurbrillanceDeLaMatiereActive() {
                    matieres.css({ 'background-color': '#eee' });
                    matiere_active.css({ 'background-color': '#ccc' });
                 }
                 
                function selectionDePhaseDiv() { phase_div = $('#phase_div'); }
                function phasesElementsHTML() {
                    les_elements_de_phases = "<div class='phases_content'>\n";
                        les_elements_de_phases += "<div class='phase_entete'><h3 id='phase_titre'></h3></div>\n";
                        les_elements_de_phases += "<div class='phase_corps'></div>\n";
                    les_elements_de_phases += "</div>\n";
                    
                    return les_elements_de_phases;
                 }
                function insertionDePhasesElements(){
                    phase_div.html(les_elements_de_phases); //Insertion de ces elements vides dans la phase_div.
                 }
                function chargementDePhasesElements() {
        
                    /* Selection et chargement de chaque element de phase_div */
                    phase_titre = $('.phases_content #phase_titre');
                    phase_titre_content = phaseTitre();
                    phase_titre.html(phase_titre_content);
    
                    phase_corps = $('.phase_corps');
                    phase_corps_contents = creationDePhaseCorpsContent();
                    phase_corps.html(phase_corps_contents);
    
                    function phaseTitre(){
                        var ptc = '';
                        var rang = '';
                        var rdm = matieres_nom.indexOf(matiere_active_nom)+1;
                        var rand_de_matiere = chiffres[rdm];
                        
                        if(rdm===1){ 
                            rang = '߭';
                        }else{
                            rang = '߲';
                        }
                        
                        ptc = "ߥߟߊ߬ߘߊ_"+rand_de_matiere+rang+": "+matiere_active_nom;
                        return ptc; 
                    }
                    function creationDePhaseCorpsContent() {
                        phase_corps_content = "<div class='phases_corps_container'>"+'\n';
                        for (i = 0; i < liste_de_phases.length; i++) {
                            phase_id = liste_de_phases[i][0];
        
                            phase_corps_content += "<div class='phase' id='"+matiere_active_id+"_"+phase_id+"'>\n\n";
                                phase_corps_content += "<span class='phase_titre'>"+liste_de_phases[i][1]+"</span>\n";
                            phase_corps_content += "</div>\n";
                        }
                        phase_corps_content += "</div>\n\n";
        
                        return phase_corps_content;
                    }
                 }
                function afficherLesPhases() {
                    var phase_div_h = phase_div.height();
                    var phase_div_w = phase_div.width();
                    
                    if(phase_div.css('display')=='none'){
                        phase_div.css({ 'display': 'block', 'transform':'scale(0)' });
                        setTimeout(function() { phase_div.css({ 'transform': 'scale(1.2)' }); }, 10);
                    }else{
                        phase_div.css({ 'transform':'scale(0)' });
                        setTimeout(function() { phase_div.css({ 'display': 'none' }); }, 400);
                        
                        setTimeout(function() { phase_div.css({ 'display': 'block' }); }, 405);
                        setTimeout(function() { phase_div.css({ 'transform': 'scale(1.2)' }); }, 410);
                    }
                 }
                function manipulationDePhases() {
                    /* Tableau de phases utiliser pour la surbrillance de la phase cliquee */
                    phase = $('.phase_corps .phase');
                    phase_titre = $('.phase_corps .phase_titre');
                  
                    $.each(phase, function() {
                        tableau_de_phase_id[tableau_de_phase_id.length] = $(this).attr('id');
                    });
                    $.each(phase_titre, function() {
                        tableau_de_nom_de_phase[tableau_de_nom_de_phase.length] = $(this).html();
                    });
            
                    phase_titre.on('click', function() { $(this).parent().click(); });
                    phase.on('click', function(e) {
        
                        phase_active_id = e.target.id;
                        phase_active = $('#'+phase_active_id);
                        phase_active_nom = phase_active.children().first().html();

                        miseEnSurbrillanceDePhaseActive();
                        lessonPhaseClick();
                        
                        function miseEnSurbrillanceDePhaseActive() {
                            phase_active.parent().siblings().removeClass('fond_noir_clair');
                            phase_active.parent().addClass('fond_noir_clair');
                         }
                        function lessonPhaseClick(){
                            for(i=0;i<liste_lesson_phases_id.length;i++){
                                var id_de_lesson_phase_a_cliquer = liste_lesson_phases_id[i];
                    
                                if(phase_active_id == id_de_lesson_phase_a_cliquer){ 
                                    var lessonPhaseACliquer = $('#phase_menu_content #'+id_de_lesson_phase_a_cliquer);
                                    lessonPhaseACliquer.click();
                                }
                            }
                         }
                    });
                 }
                
                function selectionDeLessonDiv() { lesson_div = $('#lesson_div'); }
                function lesElementsDeLesson() {
                    
                    lessonFermeture();
                    lessonEnteteElements();
                    lessonParametresElements()
                    lessonCorpsElements();
                    lessonPiedElements();
                    
                    function lessonFermeture(){
                        lesson_div_elements = "<span class='fermeture' id='fermeture_lesson_div'>&times;</span>\n\n";
                     }
                    function lessonEnteteElements(){
                        
                        lesson_parametres_btn_html = genererLessonParametresBtnHTML();
                        lesson_matiere_menu_btn_html = genererLessonMatiereMenuBtnHTML();
                        lesson_phase_menu_btn_html = genererLessonPhaseMenuBtnHTML();
                        lesson_sonorisation_btn_html = lessonSonorisationBtnHTML();
        
                        lesson_div_elements += "<div id='lesson_entete'>\n";
                            lesson_div_elements += "<div id='lesson_parametres_btn'>"+lesson_parametres_btn_html+"</div>\n";
                            lesson_div_elements += "<div id='lesson_matiere_menu_btn'>"+lesson_matiere_menu_btn_html+"</div>\n";
                            lesson_div_elements += "<div id='lesson_phase_menu_btn'>"+lesson_phase_menu_btn_html+"</div>\n";
                            lesson_div_elements += "<div id='lesson_sonorisation_btn'>"+lesson_sonorisation_btn_html+"</div>\n";
                        lesson_div_elements += "</div>\n\n";
                        
                        function genererLessonParametresBtnHTML() {
                            var lpbc =
                            "<div>\n"+
                                "<table>\n"+
                                    "<tr class='menu_btn'>\n"+
                                        "<td>\n<span id='parametre_btn_nom'></span>\n</td>\n"+
                                        "<td>\n<span class='menu_icone'>&#9881;</span>\n</td>\n"+
                                    "</tr>\n\n"+
                                    
                                    "<tr class='menu_content'><td></td></tr>\n\n"+
                                "</table>\n"+
                            "</div>";
        
                            return lpbc;
                        }
                        function genererLessonMatiereMenuBtnHTML() {
                            var lmmbc =
                            "<div>\n"+
                            "<table class='menu_table'>\n\n"+
                            
                            "<tr class='menu_btn'>\n"+
                            "<td><span id='lesson_matiere_menu_btn_nom'>"+matiere_active_nom+"</span></td>\n"+
                            "</tr>\n\n"+
                            
                            "<tr class='menu_content' id='matieres_menu_content'>\n"+
                            "<td>\n<div id='lesson_matiere_menu'>\n"+$('#table_de_matieres_container').html()+"\n</div>\n</td>\n\n"+
                            "</tr>\n\n"+
                            
                            "<div id='menu_flotant_container'>\n\n"+phase_corps_content+"\n\n</div>"+
                            
                            "</table>\n"+
                            "</div>\n";
        
                            return lmmbc;
                        }
                        function genererLessonPhaseMenuBtnHTML() {
                            var lpmbc =
                            "<div>\n"+
                            "<table class='menu_table'>\n"+
                            "<tr class='menu_btn'>\n"+
                                "<td>\n<span id='lesson_phase_menu_btn_nom'>"+phase_active_nom+"</span>\n </td>\n"+
                                "<td>\n<span class='menu_icone'></span>\n</td>\n"+
                            "</tr>\n\n"+
                            
                            "<tr class='menu_content' id='phase_menu_content'>\n"+
                                "<td>\n<span>\n"+phase_corps_content+"</span>\n</td>\n"+
                            "</tr>\n\n"+
                            "</table>\n"+
                            "</div>\n\n";
        
                            return lpmbc;
                        }
                        function lessonSonorisationBtnHTML() {
                            var lsbc = '';
        
                            if (phase_active_nom == liste_de_phases[0][1]) {
                                lesson_sonorisation_btn_html = genererlessonSonorisationBtnContent1();
                                function genererlessonSonorisationBtnContent1() {
                                    lsbc =
                                    "<div>\n"+
                                    "<table>\n"+
                                    "<tr class='menu_btn'>\n"+
                                    "<td><span id='sonorisation_btn_nom1'>ߝߐߟߊ߲ </span> </td>\n"+
                                    "<td><button class='play_btn'>&#9664;</button><button class='stop_btn'>&#x25A0;</button></td>\n"+
                                    "</tr>\n"+
                                    
                                    "<tr class='menu_content'><td></td> </tr>\n"+
                                    "</table>\n"+
                                    "</div>";
                                }
                            }
                            if (phase_active_nom == liste_de_phases[1][1]) {
                                lesson_sonorisation_btn_html = genererlessonSonorisationBtnContent2();
                                function genererlessonSonorisationBtnContent2() {
                                    lsbc =
                                    "<div>\n"+
                                    "<table>\n"+
                                    "<tr class='menu_btn'>\n"+
                                    "<td><span id='sonorisation_btn_nom2'>ߡߊ߬ߞߟߏ߬ߟߊ߲ </span> </td>\n"+
                                    "<td><span class='dicter_btn'>&#9664;</span><span class='repeat_btn'>&#128066;&#127997;</span></td>\n"+
                                    "</tr>\n"+
                                    "<tr class='menu_content'><td></td> </tr>\n"+
                                    "</table>\n"+
                                    "</div>";
                                }
                            }
        
                            return lsbc;
                        }
                     }
                    function lessonParametresElements(){
                        
                        lesson_parametres_html = lessonParametresHTML();
                        lesson_div_elements += "<div id='lesson_parametres_container'><div id='lesson_parametres'>"+lesson_parametres_html+"</div></div>\n\n\n";
                        function lessonParametresHTML(){
                            var lph = '';
                                
                            lph += "<div id='lesson_parametres_glissiere'>\n";
                            lph += "<table id='table1'>\n\n";
                                lph += "<tr id='tr11'>\n";
                            
                                    lph += "<td id='voyelles_checker'>\n";
                                        lph += "<table>\n";
                                            lph += "<tr class='checkbox_titre'><td><input type='checkbox' name='voyelle_checkbox' class='checkbox_parent'><label for='voyelle_checkbox'>ߛߌ߬ߙߊ߬ߟߊ߲</label></td></tr>\n";
                                            lph += "<tr class='check_btn_container'>\n";
                                                for(i=0;i<caracteres[0].length;i++){
                                                    lph += "<td class='check_btn'><input type='checkbox' name='voyelle_"+i+"' value='"+caracteres[0][i]+"' class='checkbox_children voyelle'><label for='voyelle_"+i+"'>"+caracteres[0][i]+"</label></td>\n";
                                                }
                                            lph += "</tr>\n";
                                        lph += "</table>\n";
                                    lph += "</td>\n\n";
                                        
                                    lph += "<td id='consonnes_checker'>\n";
                                        lph += "<table>\n";
                                                lph += "<tr class='checkbox_titre'><td><input type='checkbox' name='consonne_checkbox' class='checkbox_parent'><label for='consonne_checkbox'>ߛߌ߬ߙߊ߬ߕߊ</label></td></tr>\n";
                                                lph += "<tr class='check_btn_container'>\n";
                                                    for(i=0;i<7;i++){
                                                        lph += "<td class='check_btn'><input type='checkbox' name='consonne_"+i+"' value='"+caracteres[1][i]+"' class='checkbox_children consonne'><label for='consonne_"+i+"'>"+caracteres[1][i]+"</label></td>\n";
                                                    }
                                                    for(i=0;i<caracteres[2].length;i++){
                                                        lph += "<td class='check_btn double_r'><input type='checkbox' name='consonne_"+i+"' value='"+caracteres[2][i]+"' class='checkbox_children consonne'><label for='consonne_"+i+"'>"+caracteres[2][i]+"</label></td>\n";
                                                    }
                                                    for(i=7;i<caracteres[1].length-1;i++){
                                                        lph += "<td class='check_btn'><input type='checkbox' name='consonne_"+i+"' value='"+caracteres[1][i]+"' class='checkbox_children consonne'><label for='consonne_"+i+"'>"+caracteres[1][i]+"</label></td>\n";
                                                    }
                                                lph += "</tr>\n";
                                            lph += "</table>\n";
                                        lph += "</td>\n\n";
                                            
                                        lph += "<td id='tedo_checker'>\n";
                                            lph += "<table>\n";
                                                lph += "<tr class='checkbox_titre'><td><input type='checkbox' name='tedo_checkbox' class='checkbox_parent'><label for='tedo_checkbox'>ߕߍߘߐ </label></td></tr>\n";
                                                lph += "<tr class='check_btn_container'>\n";
                                                    for(i=0;i<caracteres[3].length;i++){
                                                        lph += "<td class='check_btn'><input type='checkbox' name='tedo_"+i+"' value='"+caracteres[3][i]+"' class='checkbox_children tedo'><label for='tedo_"+i+"'>"+caracteres[3][i]+"</label></td>\n";
                                                    }
                                                lph += "</tr>\n";
                                            lph += "</table>\n";
                                        lph += "</td>\n\n";
                                            
                                        lph += "<td id='tons_checker'>\n";
                                            lph += "<table>\n";
                                                lph += "<tr class='checkbox_titre'><td><input type='checkbox' name='tons_checkbox' class='checkbox_parent'><label for='tons_checkbox'>ߞߊ߲ߡߊߛߙߋ</label></td></tr>\n";
                                                lph += "<tr class='check_btn_container'>\n";
                                                    for(i=0;i<caracteres[5].length;i++){
                                                        lph += "<td class='check_btn'><input type='checkbox' name='ton_"+i+"' value='"+caracteres[5][i]+"' class='checkbox_children ton'><label class='ton_signe' for='ton_"+i+"'>"+caracteres[5][i]+"</label></td>\n";
                                                    }
                                                    for(i=0;i<(caracteres[6].length);i++){
                                                        lph += "<td class='check_btn'><input type='checkbox' name='ton_"+i+"' value='"+caracteres[6][i]+"' class='checkbox_children ton'><label class='ton_signe' for='ton_"+i+"'>"+caracteres[6][i]+"</label></td>\n";
                                                    }
                                                lph += "</tr>\n";
                                            lph += "</table>\n";
                                        lph += "</td>\n\n";
                                            
                                        lph += "<td id='nasalisation_checker'>\n";
                                            lph += "<table>\n";
                                                lph += "<tr class='checkbox_titre'><td><input type='checkbox' name='nasalisation_checkbox' class='checkbox_parent'><label for='nasalisation_checkbox'>ߞߊ߲ߠߊߘߌߦߊߟߊ߲</label></td></tr>\n";
                                                lph += "<tr class='check_btn_container'>\n";
                                                    for(i=0;i<caracteres[4].length;i++){
                                                        lph += "<td class='check_btn'><input type='checkbox' name='nasalisation_"+i+"' value='"+caracteres[4][i]+"' class='checkbox_children nasalisation'><label class='nasalisation_signe' for='nasalisation_"+i+"'>"+caracteres[4][i]+"</label></td>\n";
                                                    }
                                                lph += "</tr>\n";
                                            lph += "</table>\n";
                                        lph += "</td>\n\n";
                                            
                                    lph += "</tr>\n\n\n";
                                lph += "</table>\n";
                                lph += "<table><tr><td><input type='submit' name='submit_btn' value='ߏ߬ ߛߓߍߦߊ߫. ' id='submit_btn'></td></tr></table>\n\n\n";
                            lph += "</div>\n";
                            return lph; 
                        }
                     }
                    function lessonCorpsElements(){
                        lesson_div_elements += "<div id='lesson_corps'></div>\n\n";
                     }
                    function lessonPiedElements(){
                        var lesson_pied_html = '';
                        lesson_div_elements += "<div id='lesson_pied'>"+lesson_pied_html+"</div>\n\n";
                     }
                    
                    return lesson_div_elements;
                 }
                function insertionDesElementsDeLessonDiv() {
                    var lesson_container = $('#lesson_container');
                    lesson_container.html(lesson_div_elements);
                 }
                function manipulationDeLessonDiv(){
                    
                    var lesson_matiere_active, lesson_matiere_active_id, lesson_matiere_active_nom;
                     
                    parametrageDeLesson();
                    matieresMenu();
                    affichageDeLessonMenues();
                    manipulationDePhasesMenu();

                    function parametrageDeLesson(){
                        
                        lesson_parametres = $('#lesson_parametres');
                        selectionDesElementsDeLessonParametres();
                        cocherLesCaracteres();
                        affichageDeLessonParametres();
                        submit_btnClick();
        
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
                            
                            voyelles_checker = $('#voyelles_checker');
                            consonnes_checker = $('#consonnes_checker');
                            tedo_checker = $('#tedo_checker');
                            tons_checker = $('#tons_checker');
                            nasalisation_checker = $('#nasalisation_checker');
                
                            voyelles_cochees = [];
                            consonnes_cochees = [];
                            tedos_coches = [];
                            tons_coches = [];
                            nasalisations_cochees = [];
                            caracteres_coches = [];
                            syllabes_tonifiees = [];
                         }
                        function cocherLesCaracteres(){ 
                            checkbox_parentClick();
                            checkbox_childrenClick();
                            $.each(checkbox_parent, function(){ $(this).click(); }); 
                            
                            function checkbox_parentClick(){
                                checkbox_parent.on('click', function(){
                                
                                    var checkbox_children_actifs = $(this).parent().parent().next().find('.checkbox_children');
                                    if($(this).prop('checked')==true){ checkbox_children_actifs.prop('checked',true); }
                                    if($(this).prop('checked')==false){ checkbox_children_actifs.prop('checked',false); }
                                    
                                    collecteDesCaracteresCoches();
                                });
                                checkbox_titre.on('click', function(){
                                    $(this).children().children().first().click();
                                });
                             }
                            function checkbox_childrenClick(){
                                checkbox_children.on('click', function(){ collecteDesCaracteresCoches(); }); 
                                check_btn.on('click', function(){
                                    $(this).children().first().click();  
                                });
                             }
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
                                    
                                    $.each(voyelle, function(){
                                        voyelle_coche = $(this).prop('checked');
                                        
                                        if(voyelle_coche==true){
                                            voyelles_cochees[voyelles_cochees.length] = $(this).attr('value');
                                        }
                                     });
                                    $.each(consonne, function(){
                                        consonne_coche = $(this).prop('checked');
                                        
                                        if(consonne_coche==true){
                                            consonnes_cochees[consonnes_cochees.length] = $(this).attr('value');
                                        }
                                     });
                                    $.each(tedo, function(){
                                        tedo_coche = $(this).prop('checked');
                                        
                                        if(tedo_coche==true){
                                            tedos_coches[tedos_coches.length] = $(this).attr('value');
                                        }
                                     });
                                    $.each(ton, function(){
                                        ton_coche = $(this).prop('checked');
                                        
                                        if(ton_coche==true){
                                            tons_coches[tons_coches.length] = $(this).attr('value');
                                        }
                                     });
                                    $.each(nasalisation, function(){
                                        nasalisation_coche = $(this).prop('checked');
                                        
                                        if(nasalisation_coche==true){
                                            nasalisations_cochees[nasalisations_cochees.length] = $(this).attr('value');
                                        }
                                     });
                    
                                    caracteres_coches = [voyelles_cochees, consonnes_cochees, tedos_coches, tons_coches, nasalisations_cochees];
                                }
                    
                                return caracteres_coches;
                             }
                         }
                        function affichageDeLessonParametres(){
                               
                            choixDesOptionsNecessaires();
                            lesson_parametres.on('click', function(){
                                
                                lesson_parametres_glissiere.css({'height':'185px'}); 
                                setTimeout(function(){
                                    lesson_parametres_glissiere.css({'box-shadow':'0 6px 16px #000'});
                                }, 10); 
                                $(this).animate({ 'height':'200px', 'padding':'16px 0'}, 300); 
                            });
                            
                            function choixDesOptionsNecessaires(){
                                
                                if(matiere_active_nom==='ߛߓߍߛߎ߲'){
                                    tons_checker.hide();
                                    nasalisation_checker.hide();
                                }
                                if(matiere_active_nom==='ߜߋ߲߭'){
                                    tons_checker.hide();
                                    nasalisation_checker.hide();
                                    tedo_checker.hide();
                                }
                                if(matiere_active_nom==='ߞߊ߲ߠߊߘߌߦߊߟߊ߲'){
                                    tons_checker.hide();
                                    nasalisation_checker.show();
                                }
                             }
                         }
                        function submit_btnClick(){  
                            submit_btn.on('click', function(e){
                                
                                e.stopPropagation();
                                masquerLessonParametres();
                                
                                function masquerLessonParametres(){
                                    lesson_parametres_glissiere.css({'height':0, 'box-shadow':'none'}); 
                                    lesson_parametres.animate({'height':'8px', 'padding':0}, 300);
                                 }
                             });
                         }
                     }
                    function matieresMenu() {
                        var lesson_matieres, lesson_matiere_titre;
                        
                        selectionDesMatieres();
                        manipulationDesMatieres();
                        
                        function selectionDesMatieres(){
                            lesson_matieres = $('#matieres_menu_content .matieres');
                            lesson_matiere_titre = $('#matieres_menu_content .matiere_titre');
                        }
                        function manipulationDesMatieres(){
                            lesson_matiere_titre.on('click', function(e) { $(this).parent().click(); e.stopPropagation(); });
                            lesson_matieres.on('click', manipulerMatieresMenu);
                            
                            function manipulerMatieresMenu() {
            
                                lesson_matiere_active_id = $(this).attr('id');
                                lesson_matiere_active = $('#'+lesson_matiere_active_id);
                                lesson_matiere_active_nom = lesson_matiere_active.children().html();
                                
                                var matiere_choisie = $(this);
                                var lesson_matiere_index = lesson_matieres.index($(this));
            
                                changerDeSurbrillance();
                                changerLeNomDeMatiere();
                                
                                selectionDeMenuFlotantElements();
                                afficherMenuFlotant();
                                manipulationDeMenuFlotant();
                    
                                function changerDeSurbrillance() {
                                    matiere_choisie.css({ 'background-color': '#fff' });
                                    matiere_choisie.siblings().css({ 'background-color': '#eee' });
                                 }
                                function changerLeNomDeMatiere() {
                                    var lesson_matiere_menu_btn_nom = $('#lesson_matiere_menu_btn_nom');
                                    var lesson_matiere_nom = $('#'+lesson_matiere_active_id+' span').first().html();
            
                                    lesson_matiere_menu_btn_nom.html(lesson_matiere_nom);
                                 }
                                    
                                function selectionDeMenuFlotantElements(){
                                    menu_flotant_container = $('#menu_flotant_container');
                                    menu_flotant_corps = $('#menu_flotant_container .phases_corps_container');
                    
                                    menu_flotant_phase = $('#menu_flotant_container .phase');
                                    menu_flotant_phase_titre = $('#menu_flotant_container .phase_titre');
                                }
                                function afficherMenuFlotant() {
            
                                    var matiere_height = lesson_matieres.height();
                                    var menu_flotant_top = lesson_matiere_index*matiere_height;
                                  
                                    var mapo = lesson_matiere_active.offset();
                                    var mapt = mapo.top; 
                                    var mft = mapt-(matiere_height+12);
            
                                    var mo = $('.menu_table').parent().offset();
                                    var ml = mo.left; 
                                    var mbw = $('.menu_table').width(); 
                                    var mfl = ml-mbw+12;
                                    
                                    menu_flotant_container.css({ 'display': 'block' });

                                    menu_flotant_corps.css({ 'right': '-100%' });
                                    menu_flotant_container.offset({top:mft, left:mfl});
                                    menu_flotant_corps.animate({ 'right': 0 }, 200);
                                }
                                function manipulationDeMenuFlotant(){
                                    
                                    menu_flotant_phase_titre.on('click', function() { $(this).parent().click(); });
                                    menu_flotant_phase.on('click', manipulerMenuFlotant);
                                    
                                    function manipulerMenuFlotant() {
                                        var phase_index = menu_flotant_phase.index($(this));
                                        
                                       // masquerMenuFlotant();
                                        changementDeMatiere();
                                        changementDePhase();
                                        
                                        function masquerMenuFlotant() {
                                            menu_flotant_corps.animate({ 'right': '-100%' }, 200);
                                            setTimeout(function() { menu_flotant_container.css({ 'display': 'none' });}, 200);
                                         }
                                        function masquerLessonMatiereMenuContent() {
                                            setTimeout(function() {
                                                $('#matieres_menu_content').css({
                                                    'display': 'none'
                                                });
                                            },
                                                200);
                                        }
                                        function changementDeMatiere(){
                                            matieres[lesson_matiere_index].click();
                                         }
                                        function changementDePhase(){
                                            lesson_reference = lesson_matiere_active_id +'_'+ liste_de_phases[phase_index][0];
                                            $(phase[phase_index]).attr('id',lesson_reference);
                                            $(phase[phase_index]).click();
                                        }
                                    }
                                }
                            }
                        }
                     }
                    function affichageDeLessonMenues() {
                        var menu_table = $('.menu_table');
                        var matiere_h = matieres.height();
                        var menu_index, menu_h;
                        
                        $('.menu_btn').on('click',function(){
                            var menu_w = $(this).width();
                            $(this).siblings().width(menu_w);
                        });
        
                        menu_table.on('mouseover',function(e) {
                            var menu_actif = $(this).find('tr').last();
                            menu_index = menu_table.index($(this));

                            if(menu_index===0){ menu_h = (matiere_h+2)*liste_de_matieres.length+4; }
                            if(menu_index===1){ menu_h = (matiere_h+2)*liste_de_phases.length+4; }
                        
                            menu_actif.css({'display':'block', 'height': menu_h+'px'});
                        });
                        menu_table.on('mouseout',function() { $(this).find('tr').last().css({ 'height': 0, 'display':'none'}); });
                     }
                    function manipulationDePhasesMenu() {
                        var liste_phase_menu_titre = [];
        
                        lesson_phase = $('#phase_menu_content .phase');
                        phase_menu_titre = $('#phase_menu_content .phase_titre');
                        $.each(lesson_phase, function(){
                            liste_lesson_phases_id[liste_lesson_phases_id.length] = $(this).attr('id');
                        });
                          
                        phase_menu_titre.on('click', function(e) {$(this).parent().click(); e.stopPropagation();});
                        lesson_phase.on('click', manipulerPhaseMenu);
                        function manipulerPhaseMenu() {
        
                            var lesson_phase_active_id = $(this).attr('id');
                            var x = ['ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ','ߡߊ߬ߞߟߏ߬ߟߌ'];
                            var lesson_phase_active = $(this);
                            var lesson_phase_active_nom = lesson_phase_active.find('.phase_titre').html();
                            lesson_corps = $('#lesson_corps');
                            var table_parlante_container = $('.table_parlante_container');
                            lesson_reference = lesson_phase_active_id;
               
                            fermerPhasesMenu();
                            if($.inArray(lesson_phase_active_nom,x)!=-1){
                                changerDeSurbrillanceDeLessonPhaseActive(); 
                                afficherLesson();
                                changerLaLesson();
                                modifierLaLesson();
                            }
                            if($.inArray(lesson_phase_active_nom,x)==-1){
                                
                                testeDivStyle();
                                affichageDeTesteDiv();
                                
                                function testeDivStyle(){
                                    $('#teste_div').css({'width':container_w+'px', 'height':0});
                                    teste_div = $('#teste_div');
                                    teste_container.css({'width':container_w-32+'px', 'height':window_h-116+'px'});
                                 }
                                function affichageDeTesteDiv() {
                                    setTimeout(function(){ $('.evaluation_btn').click(); });
                                 }
                            }
                            
                            
                            function changerDeSurbrillanceDeLessonPhaseActive() {
                                lesson_phase_active.addClass('fond_noir_clair');
                                lesson_phase_active.siblings().removeClass('fond_noir_clair');
                            }
                            function afficherLesson(){
                                var lesson_div_h = window_h-(haut_de_page_h+barre_navigation_h)+'px';
                                
                                lesson_div.css({
                                    'display': 'block',
                                    'width': container_w+'px',
                                    'height': lesson_div_h+'px',
                                    'transform':'scale(1)'
                                });
                            }
                            function fermerPhasesMenu(){
                                $('.menu_content').css({'height':0});
                            }
                            function modifierLaLesson(){
                                $('#submit_btn').on('click', function(){
                                    $('.table_parlante_container').css({'height':0});
                                    setTimeout(function(){
                                        chargerLessonCorps();
                                        chargerLessonPied();
                                        etudeDeLesson();
                                    }, 600);
                                    setTimeout(function(){ $('.table_parlante_container').css({'height':'calc(70vh - 5px)'}); }, 600);
                                });
                             }
                            function changerLaLesson() {
                          
                                $('.table_parlante_container').css({'height':0});
                                changementDesBoutonsDeLessonEntete();
                                setTimeout(function(){
                                    chargerLessonCorps();
                                    chargerLessonPied();
                                    $('.table_parlante_container').css({'height':0});
                                    $('.table_parlante_container').css({'height':'calc(70vh - 5px)'});
                                    etudeDeLesson();
                                }, 600);

                                $('#fermeture_lesson_div').on('click', function() {
                                    lesson_div.css({'transform':'scale(0.75)', 'display': 'none'});
                                });
                            }
                            function changementDesBoutonsDeLessonEntete(){
                                changerLeNomDePhaseBtn();
                                changerLeNomDeSonorisationBtn();
                                
                                function changerLeNomDePhaseBtn() {
                                    lesson_phase_menu_btn_nom = $('#lesson_phase_menu_btn_nom');
                                    lesson_phase_menu_btn_nom.html(lesson_phase_active.html());
                                 }
                                function changerLeNomDeSonorisationBtn() {
                                    lesson_sonorisation_btn = $('#lesson_sonorisation_btn');
                                    lesson_sonorisation_btn_html = lessonSonorisationBtnHTML();
                                    lesson_sonorisation_btn.html(lesson_sonorisation_btn_html);
                                   
                                    function lessonSonorisationBtnHTML() {
                                        var lsbc = '';
                    
                                        if (lesson_phase_active_nom == liste_de_phases[0][1]) {
                                            lesson_sonorisation_btn_html = genererlessonSonorisationBtnContent1();
                                            function genererlessonSonorisationBtnContent1() {
                                                lsbc =
                                                "<div>\n"+
                                                "<table>\n"+
                                                
                                                "<tr class='menu_btn'>\n"+
                                                "<td><span id='sonorisation_btn_nom'>ߝߐߟߊ߲ </span> </td>\n"+
                                                "<td><span class='play_btn'>&#9664;</span><span class='stop_btn'>&#x25A0;</span></td>\n"+
                                                "</tr>\n"+
                                                
                                                "</table>\n"+
                                                "</div>";
                                            }
                                        }
                                        if (lesson_phase_active_nom == liste_de_phases[1][1]) {
                                            lesson_sonorisation_btn_html = genererlessonSonorisationBtnContent2();
                                            function genererlessonSonorisationBtnContent2() {
                                                lsbc =
                                                "<div>\n"+
                                                "<table>\n"+
                                                
                                                "<tr class='menu_btn'>\n"+
                                                "<td><span id='sonorisation_btn_nom'>ߡߊ߬ߞߟߏ߬ߟߊ߲ </span> </td>\n"+
                                                "<td><span class='dicter_btn'>&#9664;</span><span class='repeat_btn'>&#128066;&#127997;</span></td>\n"+
                                                "</tr>\n"+
                                                
                                                "</table>\n"+
                                                "</div>";
                                            }
                                        }
                
                                        return lsbc;
                                     }
                                 }
                             }
                            function chargerLessonCorps(){
                                lesson_corps_html = lessonCorpsHTML();
                                lesson_corps.html(lesson_corps_html);
                                
                                function lessonCorpsHTML() {
                        
                                    lessonDeAlphabet();
                                    lessonDeSyllabes();
                                    lessonDeNasalisation();
                                    lessonDeTons();
                                    lessonDeChiffres();
                                    
                                    function lessonDeAlphabet(){
                                        if (lesson_reference === "alphabet_nko_apprentissage") { lesson = alphabetHTML(); }
                                        if (lesson_reference === "alphabet_nko_exercices") { lesson = alphabetExercicesHTML(); }

                                        function alphabetHTML() {
                                            var nc = '';    // Nombre de colonne.
                                            
                                            calculDenc();
                                            function calculDenc(){
                                             /* Calcul du nombre de colonne des consonnes qui varie en fonction du nombre de caracteres_coches*/
                                                if(caracteres_coches[0].length < caracteres_coches[1].length/3)
                                                { nc = Math.ceil((caracteres_coches[1].length)/3); }else
                                                { nc = caracteres_coches[0].length; }
                                                
                                                return nc;
                                             }
                                             
                                            table = "<div class='table_parlante_container'>\n";
                                            table += "<table class = 'table_parlante'>\n";
                                            
                                                if(caracteres_coches[0].length!=0){
                                                table += "<tr>"+'\n';
                                                    for (var i = 0; i < caracteres_coches[0].length; i++) {
                                                        table += "<td>"+caracteres_coches[0][i]+"</td>"+'\n';
                                                    }
                                                table += "</tr>"+'\n';
                                                }
                                                if(caracteres_coches[1].length!=0){
                                                    table += "<tr>"+'\n';
                                                        if(nc<caracteres_coches[1].length){
                                                            for (var k = 0; k < nc; k++) {
                                                                table += "<td>"+caracteres_coches[1][k]+"</td>"+'\n';
                                                            }
                                                        }else{
                                                            for (var k = 0; k < caracteres_coches[1].length; k++) {
                                                                table += "<td>"+caracteres_coches[1][k]+"</td>"+'\n';
                                                            }
                                                        }
                                                    table += "</tr>"+'\n';
                        
                                                    table += "<tr>"+'\n';
                                                        if(2*nc < caracteres_coches[1].length){
                                                            for (var k = nc; k < 2*nc; k++) {
                                                                table += "<td>"+caracteres_coches[1][k]+"</td>"+'\n';
                                                            }
                                                        }else{
                                                            for (var k = nc; k < caracteres_coches[1].length - nc; k++) {
                                                                table += "<td>"+caracteres_coches[1][k]+"</td>"+'\n';
                                                            }
                                                        }
                                                    table += "</tr>"+'\n';
                                                }
                                                if((caracteres_coches[1].length+caracteres_coches[2].length)!=0){
                                                table += "<tr>"+'\n';
                                                    for (var l = 2*nc; l < caracteres_coches[1].length; l++) {
                                                        table += "<td>"+caracteres_coches[1][l]+"</td>"+'\n';
                                                    }
                                                    for(var n=0;n<caracteres_coches[2].length;n++){
                                                        if(caracteres_coches[2][0]===undefined){
                                                            table += "<td></td>"+'\n';
                                                        }else{
                                                            table += "<td>"+caracteres_coches[2][n]+"</td>"+'\n';
                                                        }
                                                    }
                                                table += "</tr>"+'\n';
                                                }
                                               
                                            table += "</table>";
                                            table += "</div>";
                                    
                                            return table;
                                        }
                                        function alphabetExercicesHTML() {
                                            var cc, chiffres_aleatoires, caracteres_melanges, nbre_caracteres_melanges, nbre_caracteres_coches;
                                            
                                            determinationDesVariables();
                                            les_caracteres_coches();
                                            tirageAuSortDesNbres();
                                            chargementDuTableauParlant();
                                             
                                            function determinationDesVariables(){
                                                cc = [];
                                                caracteres_melanges = [];
                                                nombres_aleatoires = [];
                                                nbre_caracteres_coches = 0;
                                                nbre_caracteres_melanges = 0;
                                             }
                                            function les_caracteres_coches(){
                                                 for(i=0;i<caracteres_coches[0].length;i++){ 
                                                     cc[cc.length] = caracteres_coches[0][i]; 
                                                 }
                                                 for(j=0;j<caracteres_coches[1].length;j++){
                                                     if(caracteres_coches[1][j] != ''){
                                                     cc[cc.length] = caracteres_coches[1][j];
                                                     }
                                                 }
                                                 for(k=0;k<caracteres_coches[2].length;k++){ 
                                                     cc[cc.length] = caracteres_coches[2][k]; 
                                                 }
                                
                                                 return cc;
                                             }
                                            function tirageAuSortDesNbres(){
                                                nbre_caracteres_coches = cc.length;
                        
                                                for(var i=0;nombres_aleatoires.length<nbre_caracteres_coches;i++) {
                                                    
                                                    var nbre_aleatoire = Math.floor(Math.random()*cc.length);
                                                    var presence = $.inArray(nbre_aleatoire,nombres_aleatoires);
                        
                                                    if (presence===-1) {
                                                        nombres_aleatoires[nombres_aleatoires.length] = nbre_aleatoire;
                                                    }
                                                }
                        
                                                return nombres_aleatoires;
                                             }
                                            function chargementDuTableauParlant(){
                                                table = "<div class='table_parlante_container'>\n";
                                                table += "<table class='table_parlante'>\n";
                                        
                                                    for(i=0;i<nombres_aleatoires.length;i+=7){
                                                    var dif = i+7-nombres_aleatoires.length;
                                        
                                                    table += "<tr>\n";
                                                        if(dif<=0){
                                                            for(j=0;j<7;j++){
                                                                var ca = nombres_aleatoires[i+j];
                                                                table += "<td>"+cc[ca]+"</td>\n";
                                                            }
                                                        }
                                                        if(dif>0){
                                                            for(j=0;j<nombres_aleatoires.length-i;j++){
                                                                var ca = nombres_aleatoires[i+j];
                                                                table += "<td>"+cc[ca]+"</td>\n";
                                                            }
                                                            
                                                          /* Empecher l'affichage d'undefined */
                                                            for(j=0;j<dif;j++){
                                                                table += "<td></td>\n";
                                                            }
                                                        }
                                                    table += "</tr>\n";
                                                    }
                                                table += "</table>\n";
                                                table += "</div>";
                                             }
                        
                                            return table;
                                         }
                                     }
                                    function lessonDeSyllabes(){
                        
                                        if (lesson_reference === "syllabes_nko_apprentissage") { lesson = syllabesHTML(); }
                                        if (lesson_reference === "syllabes_nko_exercices") { lesson = syllabesExercicesHTML(); }

                                        function syllabesHTML() {
                                            table = "<div class='table_parlante_container'>\n";
                                            table += "<table class = 'table_parlante' id = 'snko'>\n";
                                            for (var sr = 0; sr < consonnes_cochees.length; sr++) {
                                                table += "<tr>\n";
                                                for (var sc = 0; sc < voyelles_cochees.length; sc++) {
                                                    table += "<td>";
                                                    table += [caracteres_coches[1][sr]+caracteres_coches[0][sc]];
                                                    table += "</td>\n";
                                                }
                                                table += "</tr>\n";
                                            }
                                            table += "</table>";
                                            table += "</div>";
                                    
                                    
                                            return table;
                                         }
                                        function syllabesExercicesHTML() {
                                            var melange_syllbes = [];
                                    
                                            for (i = 0; melange_syllbes.length < consonnes_cochees.length*voyelles_cochees.length; i++) {
                                                var voyelle_aleatoire = Math.floor(Math.random()*voyelles_cochees.length);
                                                var consonne_aleatoire = Math.floor(Math.random()*consonnes_cochees.length);
                                                var syllabe_alatoire = consonnes_cochees[consonne_aleatoire] + voyelles_cochees[voyelle_aleatoire];
                                                var teste_syllabe = $.inArray(syllabe_alatoire, melange_syllbes);
                                    
                                                if (teste_syllabe == -1) {
                                                    melange_syllbes[melange_syllbes.length] = syllabe_alatoire;
                                                }
                                            }
                                
                                            table = "<div class='table_parlante_container'>\n";
                                            table += "<table class = 'table_parlante'>\n";
                                            for (var ligne = 0; ligne < consonnes_cochees.length*voyelles_cochees.length; ligne += 7) {
                                                var dif = ligne+7-melange_syllbes.length;
                                                
                                                    table += "<tr>\n";
                                                    if(dif<=0){
                                                        for (var colonne = 0; colonne < 7; colonne++) {
                                                            table += "<td>"+melange_syllbes[ligne+colonne]+"</td>\n";
                                                        }
                                                    }else{
                                                        for(var colonne = 0; colonne < melange_syllbes.length - ligne; colonne++){
                                                            table += "<td>"+melange_syllbes[ligne+colonne]+"</td>\n";
                                                        }
                                                    }
                                                    table += "</tr>\n";
                                                }
                                            table += "</table>";
                                            table += "</div>";
                                    
                                            return table;
                                         }
                                     }
                                    function lessonDeNasalisation(){
                        
                                        if (lesson_reference === "nasalisation_apprentissage") { lesson = nasalisationHTML(); }
                                        if (lesson_reference === "nasalisation_exercices") { lesson = nasalisationExercicesHTML(); }

                                        function nasalisationHTML() {
                                            table = "<div class='table_parlante_container'>\n";
                                            table += "<table class = 'table_parlante'>\n";
                                            for (var sr = 0; sr < consonnes_cochees.length; sr++) {
                                                table += "<tr>\n";
                                                for (var sc = 0; sc < voyelles_cochees.length; sc++) {
                                                    table += "<td>";
                                                    table += consonnes_cochees[sr]+voyelles_cochees[sc]+nasalisations_cochees[1];
                                                    table += "</td>\n";
                                                }
                                                table += "</tr>\n";
                                            }
                                            table += "</table>";
                                            table += "</div>";
                                    
                                            return table;
                                        }
                                        function nasalisationExercicesHTML() {
                                            
                                            table = "<div class='table_parlante_container'>\n";
                                                var melange_nasalisation = [];
                                                
                                                for(i=0; melange_nasalisation.length<consonnes_cochees.length*voyelles_cochees.length;i++){
                                                    var nbr_aleatoire_pour_voyelle = Math.floor(Math.random()*voyelles_cochees.length);
                                                    var nbr_aleatoire_pour_consonne = Math.floor(Math.random()*consonnes_cochees.length);
                                                    
                                                    consonne_aleatoire = consonnes_cochees[nbr_aleatoire_pour_consonne];
                                                    voyelle_aleatoire = voyelles_cochees[nbr_aleatoire_pour_voyelle];
                                                    var nasalisation_aleatire = nasalisations_cochees[1];
                                                    var syllabe_nasalisee = consonne_aleatoire+voyelle_aleatoire+nasalisation_aleatire;
                                                   
                                                    var test_nasalisation = $.inArray(syllabe_nasalisee, melange_nasalisation);
                                                    if(test_nasalisation==-1){ melange_nasalisation[melange_nasalisation.length] = syllabe_nasalisee; }
                                                }
                                                
                                                table += "<table class='table_parlante'>\n";
                                                    for(j=0;j<melange_nasalisation.length;j+=7){
                                                        var dif = j+7-melange_nasalisation.length;
                                                        
                                                        table += "<tr>\n";
                                                            if(dif<=0){
                                                                for(k=0;k<7;k++){ table += "<td>"+melange_nasalisation[j+k]+"</td>\n"; }
                                                            }else{
                                                                for(k=0;k<melange_nasalisation.length-j;k++){ table += "<td>"+melange_nasalisation[j+k]+"</td>\n"; }
                                                            }
                                                        table += "</tr>\n";
                                                    }
                                                table += "</table>\n";
                                            table += "</div>";
                                            
                                            return table;
                                        }
                                     }
                                    function lessonDeTons(){
                                        
                                        if (lesson_reference === "tons_apprentissage") { lesson = tonsHTML(); }
                                        if (lesson_reference === "tons_exercices") { lesson = tonsExercicesHTML(); }

                                        function tonsHTML() {
                                            var tons = [];
                                    
                                            for (var n = 0; n < nasalisations_cochees.length; n++) {
                                            for (var c = 0; c < consonnes_cochees.length; c++) {
                                            for (var v = 0; v < voyelles_cochees.length; v++) {
                                            for (var t = 0; t < tons_coches.length; t++) {
                                                tons[tons.length] = consonnes_cochees[c] + voyelles_cochees[v] + tons_coches[t] + nasalisations_cochees[n];
                                            }}}}
                                    
                                             table = "<div class='table_parlante_container'>\n";
                                                for (j = 0; j < tons.length; j += voyelles_cochees.length*tons_coches.length) {
                                                table += "<table class = 'table_parlante'>\n";
                                                    for (k = 0; k < voyelles_cochees.length*tons_coches.length; k += tons_coches.length) {
                                                    table += "<tr>"+'\n';
                                                        for (l = 0; l < tons_coches.length; l++) {
                                                        table += "<td>";
                                                            table += tons[j+k+l];
                                                        table += "</td>\n";
                                                        }
                                                    table += "</tr>"+'\n';
                                                    }
                                                table += "</table>\n\n";
                                                }
                                             table += "</div>\n";
                                   
                                             return table;
                                        }
                                        function tonsExercicesHTML() {}
                                     }
                                    function lessonDeChiffres(){
                                        
                                        if (lesson_reference === "chiffres_nko_apprentissage") { lesson = chiffresHTML(); }
                                        if (lesson_reference === "chiffres_nko_exercices") { lesson = chiffresExercicesHTML(); }

                                        function chiffresHTML() {
                                            var n_chiffres = chiffres.length;
                                    
                                            table = "<div class='table_parlante_container'>\n";
                                            table += "<table class = 'table_parlante'>\n";
                                            table += "<tr>\n";
                                            for (var n = 0; n < n_chiffres; n++) {
                                                table += "<td>"+chiffres[n]+"</td>\n";
                                            }
                                            table += "</tr>\n";
                                            table += "</table>\n";
                                            table += "</div>\n";
                                    
                                            return table;
                                        }
                                        function chiffresExercicesHTML() {
                                            ligne_aleatoire = Math.floor(Math.random()*10);
                                    
                                            table = "<div class='table_parlante_container'>\n";
                                            table += "<table class = 'table_parlante'>\n";
                                            table += "<tr>\n";
                                            for (var n = 0; n < n_chiffres; n++) {
                                                table += "<td>"+chiffres[ligne_aleatoire]+"</td>\n";
                                            }
                                            table += "</tr>\n";
                                            table += "</table>\n";
                                            table += "</div>\n";
                                        }
                                     }
                              
                                    return lesson;
                                 }
                             }
                            function chargerLessonPied(){}
                            function etudeDeLesson() {
                                
                                if (lesson_phase_active_nom == liste_de_phases[0][1]) { apprentissage(); }
                                if (lesson_phase_active_nom == liste_de_phases[1][1]) { exercices(); }
                                if (lesson_phase_active_nom == liste_de_phases[2][1]) { afficherEvaluation(); }
                            
                                function apprentissage() {
                                    lecturePersonnalisee();
                                    lectureContinue();
                                    arreterLecture();
                        
                                    function lectureContinue() {
                                        $('.play_btn').on('click', function() {
                                        
                                            afficherStopBtn();
                                            setTimeout(lectureSemiAutomatique, 1000);
                                            
                                            function lectureSemiAutomatique(){
                                                
                                                var td = $('.table_parlante td');
                                                var read_events = [];
                                                var td_delay = '';
                                                var td_index = -1;
                                                for (i = 0; i < td.length; i++) {
                                                    
                                                    td_delay = 0;
                                                    read_events[read_events.length] = setTimeout((function() {
                                                        td[td_index += 1].click();
                                                    }), td_delay += i*2000)+'\n';
        
                                                }
                                                setTimeout((function(){ afficherPlayBtn(); }), td.length*2000);
                                            }
                                        });
                                     }
                                    function arreterLecture() {
                                        $('.stop_btn').on('click', function() {
                                            afficherPlayBtn();
                                            
                                            chargerLessonCorps();
                                            chargerLessonPied();
                                            etudeDeLesson();
                                            $('.table_parlante_container').css({'height':'calc(70vh - 5px)'});
                                        });
                                     }
                                 }
                                function exercices() {
                        
                                    td = $('.table_parlante td');
                                    dicter_btn = $('.dicter_btn');
                                    repeat_btn = $('.repeat_btn');
                                    var q_melange = [];
                                    var m = -1;
                        
                                    td.addClass('noshadow');
                        
                                    tirageAuSort(); 
                                    mixageDesQuestions();
                                    dicterUneQuestion();
                                    repeterLaQuestion();
                                    reponseALaQuestion();
                        
                                    function mixageDesQuestions() {
                                        for (i = 0; i < td.length; i++) {
                                            var j = nombres_aleatoires[i];
                                            q_melange[q_melange.length] = td[j].textContent;
                                        }
                                    }
                                    function dicterUneQuestion() {
                                        dicter_btn.on('click', function() {
                                            for (j = 0; j < q_melange.length; j++) {
                                                m++;
                                                break;
                                            }
                        
                                            $(this).css({ 'display': 'none' });
                                            repeat_btn.css({ 'display': 'block' });
                        
                                            lireUneQuestion();
                                            function lireUneQuestion() {
                                                $('#audio').attr({ src: 'son/mp3/'+q_melange[m]+'.mp3', autoplay: 'on' });
                                            }
                                        });
                                    }
                                    function repeterLaQuestion() {
                                        repeat_btn.on('click', function() {
                                            $('#audio').attr({ src: 'son/mp3/'+q_melange[m]+'.mp3', autoplay: 'on' });
                                        });
                                     }
                                    function reponseALaQuestion() {
                                        td.on('click', function() {
                                            var td_clique = $(this);
                                            var td_non_cliquer = '';
                                            var q = q_melange[m];
                                            var r = td_clique.html();
                    
                                            repeat_btn.css({ 'display': 'none' });
                                            $('.dicter_btn').css({ 'display': 'block' });
                    
                                            if (q == r) {
                                                td_clique.html("<span id='reponse'>"+r+"</span><span id='cosh'></span>");
                                                setTimeout(function() { $('#cosh').css({ 'transform': 'scale(1.5)' }); }, 5);
                                                setTimeout(function() { $('#cosh').css({ 'transform': 'scale(0)' }); }, 2500);
                                                setTimeout(function() { td_clique.html(r); }, 2500);
                                            }
                                            if (q !== r) {
                                                barrerLaFausseReponse();
                                                clignotageDeLaReponseRatee();
                    
                                                function barrerLaFausseReponse() {
                                                    td_clique.html(r+"<span id='croix'>&#10060;</span>");
                    
                                                    setTimeout(function() {$('#croix').css({'transform': 'scale(1.5)'});}, 1);
                                                    setTimeout(function() {td_clique.html(r);}, 2000);
                                                }
                                                function clignotageDeLaReponseRatee() {
                                                    $.each(td, function() {
                                                        if ($(this).html() == q) {
                                                            var reponse_rate = $(this);
                    
                                                            reponse_rate.addClass('fond_blanc_casse');
                                                            setTimeout((function() { reponse_rate.removeClass('fond_blanc_casse'); }), 200);
                                                            setTimeout((function() { reponse_rate.addClass('fond_blanc_casse');    }), 350);
                                                            setTimeout((function() { reponse_rate.removeClass('fond_blanc_casse'); }), 500);
                                                            setTimeout((function() { reponse_rate.addClass('fond_blanc_casse');    }), 650);
                                                            setTimeout((function() { reponse_rate.removeClass('fond_blanc_casse'); }), 800);
                                                            setTimeout((function() { reponse_rate.addClass('fond_blanc_casse');    }), 950);
                                                            setTimeout((function() { reponse_rate.removeClass('fond_blanc_casse'); }), 1100);
                                                            setTimeout((function() { reponse_rate.addClass('fond_blanc_casse');    }), 1250);
                                                            setTimeout((function() { reponse_rate.removeClass('fond_blanc_casse'); }), 1400);
                                                            setTimeout((function() { reponse_rate.addClass('fond_blanc_casse');    }), 1550);
                                                            setTimeout((function() { reponse_rate.removeClass('fond_blanc_casse'); }), 1700);
                                                            setTimeout((function() { reponse_rate.addClass('fond_blanc_casse');    }), 1850);
                                                            setTimeout((function() { reponse_rate.removeClass('fond_blanc_casse'); }), 2000);
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                     }
                                 }
                                function afficherEvaluation(){ $('.evaluation_btn').click(); }
                                
                                function rechargerLesson() {
                                    lesson_corps_html = lessonCorpsHTML();
                                    lesson_corps.html(lesson_corps_html);
                                 }
                                function afficherPlayBtn(){
                                    $('.stop_btn').hide();
                                    $('.play_btn').show();
                                 }
                                function afficherStopBtn(){
                                    $('.stop_btn').show();
                                    $('.play_btn').hide();
                                 }
                                function tirageAuSort() {
                                    td = $('.table_parlante td');
                                    for (i = 0; nombres_aleatoires.length < td.length; i++) {
                                        nombre_aleatoire = Math.floor(Math.random()*td.length);
                        
                                        var test_de_presence = $.inArray(nombre_aleatoire, nombres_aleatoires);
                                        if (test_de_presence==-1) {
                                            nombres_aleatoires[nombres_aleatoires.length] = nombre_aleatoire;
                                        }
                                    }
                                    return nombres_aleatoires;
                                 }
                             }
                         }
                     }
                    function lecturePersonnalisee() {
                        $('.table_parlante').on('click', function(e) {
                            var td = $('.table_parlante td');
                            var td_actif = e.target;
                            var td_actif_value = td_actif.textContent;
                
                            $('#audio').attr({ src: 'son/mp3/'+td_actif_value+'.mp3', autoplay: 'on' });
                
                            /*Animation de td lors de lecture*/
                            td.removeClass('shadow');
                            $(td_actif).addClass('shadow');
                
                            setTimeout(function() {
                                $(td_actif).removeClass('shadow');
                            }, 5000);
                        });
                     }
                    function lectureAutomatique() {
                
                        var td = $('.table_parlante td');
                
                        var read_events = [];
                        var td_delay = '';
                        var td_index = -1;
                
                        for (i = 0; i < td.length; i++) {
                            td_delay = 0;
                            read_events[read_events.length] = setTimeout((function() {
                                td[td_index += 1].click();
                            }), td_delay += i*2000)+'\n';
                        }
                     }
                 }
             });
            
         }
     }
    function testeDiv(){
        var zz = testeDivElements();
        $('#teste_container').html(zz);
    }

