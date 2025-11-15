	  
    function accorder(element) {
        $(element).addClass('vrais');
        setTimeout(function(){ $('.vrais').addClass('coche'); }, 100);
        setTimeout(function(){ $('.vrais').removeClass('coche'); }, 600);
        setTimeout(function(){ $(element).removeClass('vrais'); }, 600);
    }
    function activerSonDuClavier() {
		$('#clavier_nko td').on('click',function(){
			lettre = $(this).attr('id');
			source_son = 'son/mp3/'+lettre+'.mp3';
			son.attr({src: source_son, autoplay: "on"});
		});
	}
    function actualiserLessonSyllabe(lesson, lesson_du_jour) {

        let anciennes_syllabes = anciennesSyllabes();
        let nouvelles_syllabes = nouvellesSyllabes();

        nouvelles_syllabes.forEach(element => {
            let index = nouvelles_syllabes.indexOf(element);
            if ($.inArray(element, anciennes_syllabes) === -1) { lesson.push(lesson_du_jour[index]); }
        });

        function nouvellesSyllabes() {
            let ns = [];
            lesson_du_jour.forEach(element => { ns.push(element[0]); });
            return ns;
        }
        function anciennesSyllabes() {
            let as = [];
            lesson.forEach(element => { if (element != null) as.push(element[0]); });
            return as;
        }
    }
    function affichageAnimeDeTableTd(table) {
        
        let tr = $('tr', table);

        tr.css('opacity',0);
        $('td', table).css({'transition':'0.2s', 'opacity':0});
        
        setTimeout(() => {
            tr.css('opacity',1);
            $.each(tr, function(){

                let tr_index = $(this).index();
                let td = $('td', this);
                let td_length = td.length;

                $.each(td, function() {
                    let td_index = $(this).index();
                    setTimeout(() => {
                        $(this).css({'opacity':1});
                    }, 80*((tr_index*td_length)+td_index));
                });
            });
        }, 250);
        
    }
    function affichageAnimeDeTableTr(table) {

        $('td', table).css({'opacity':1, 'transform':'scale(1)'});
        let tr = $('tr', table);
        tr.css('opacity',0);

        setTimeout(() => {
            $.each(tr, function(){
                let tr_index = $(this).index();
                setTimeout(() => { $(this).css({'opacity':1}); }, 200*tr_index);
            });
        }, 200);
        
    }
    function affichage(element) {
        setTimeout(function() { 
            element.css({
                'transform':'scale(1)', 
                'opacity':1
            }); 
        }, 50);
    }
    function afficher(element) {
        masquer(element);
        element.css({'display':'block','transition':'0.4s'}); 
        affichage(element);
    }
    function afficherApprentissage() {

        afficherApprentissageContainer();
        afficherPanneauDesCaracteres();

        function afficherApprentissageContainer() {
            display($("#apprentissage_container"));
            masquer($('#apprentissage_container > div:not(#apprentissage_head)'));
            setTimeout(() => { afficher($('#apprentissage_container > div:not(#apprentissage_head)')); }, 400);
        
            rendreActif($('#afficheur_de_panneau'));
            indexer($('#afficheur_de_panneau p'));
            masquer($('#apprentissage_redirection_btns'));
        }
        function afficherPanneauDesCaracteres() {
            let memoire_consonnes_choisies = memoireConsonnesChoisies();

            togglePanneauDesConsonnes();
            panneauxStyle(memoire_consonnes_choisies);
        }
    }
    function afficherBoutonDeCorrection() {
        display($('.dialogue_btns'));
        masquer($('.redirection_btns'));
        masquer($(".dialogue_btns > div"));

        setTimeout(() => { 
            afficher($(".correction_btn")); 
            rendreActif($(".correction_btn")); 
        }, 400);
    }
    function afficherBoutonDeQuestion() {
        display($('.dialogue_btns'));
        masquer($('.redirection_btns'));
        masquer($(".dialogue_btns > div"));
        
        setTimeout(() => {
            masquer($('.dialogue_btns > div'));
            rendreActif($('.question_btn'));
            afficherRapidement($('.question_btn'));
        }, 400);
    }
    function afficherBoutonDeRepetition() {
        display($('.dialogue_btns'));
        masquer($('.redirection_btns'));
        masquer($(".dialogue_btns > div"));

        setTimeout(() => { 
            masquer($('.dialogue_btns > div'));
            rendreActif($('.repetition_btn'));
            afficher($('.repetition_btn')); 
        }, 400);
    }
    function afficherBoutonPourLaMatiereSuivante() {
        let matiere = nomDeLaMatiereSuivante();

        masquer($('.dialogue_btns'));
        display($('.redirection_btns'));
        masquer($('.redirection_btns > div'));
        
        setTimeout(() => {
            afficher($('.lesson_suivante'));
            rendreActif($('.lesson_suivante'));
            $('.lesson_suivante a').text(matiere+' ߘߋ߰ߟߌ ߘߊߡߌ߬ߘߊ߬');
            indexer($('.lesson_suivante p'));
        }, 400);
    }
    function afficherBoutonDExercice() {
        let matiere = JSON.parse(sessionStorage.getItem("matiere_nom"));
        
        masquer($('.dialogue_btns'));
        display($('.redirection_btns'));
        masquer($('.redirection_btns > div'));

        setTimeout(() => { 
            afficher($('.exercice_btn'));
            rendreActif($('.exercice_btn'));
            $('.exercice_btn').html("<p>"+matiere+" ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
            indexer($('.exercice_btn p'));
        }, 400);
    }
    function afficherBoutonDeRevision() {
        let matiere = JSON.parse(sessionStorage.getItem("matiere_nom"));
        
        masquer($('.dialogue_btns'));
        display($('.redirection_btns'));
        masquer($('.redirection_btns > div'));

        setTimeout(() => { 
            afficher($('.revision_btn'));
            rendreActif($('.revision_btn'));
            $('.revision_btn').html("<p>"+matiere+" ߞߘߐߓߐߟߌ ߞߍ߫</p>");
            indexer($('.revision_btn p'));
        }, 400);
    }
    function afficherBoutonDeReprise() {
        let matiere = JSON.parse(sessionStorage.getItem("matiere_nom"));
        
        masquer($('.dialogue_btns'));
        display($('.redirection_btns'));
        masquer($('.redirection_btns > div'));

        setTimeout(() => { 
            afficher($('.reprendre_btn'));
            rendreActif($('.reprendre_btn'));
            $('.reprendre_btn').html("<p>"+matiere+" ߞߘߐߓߐߟߌ ߞߍ߫ ߕߎ߲߯</p>");
            indexer($('.reprendre_btn p'));
        }, 400);
    }
    function afficherBoutonDeLaLessonSuivante() {
        let matiere = lessonSuivante();
        
        masquer($('.dialogue_btns'));
        display($('.redirection_btns'));
        masquer($('.redirection_btns > div'));

        setTimeout(() => { 
            afficher($('.lesson_suivante'));
            rendreActif($('.lesson_suivante'));
            $('.lesson_suivante').html("<p>"+matiere+" ߘߋ߰ߟߌ ߘߊߡߌ߬ߘߊ߬</p>");
            indexer($('.lesson_suivante p'));
        }, 400);
    }
    function afficherBoutonDApprentissage() {
        let matiere = JSON.parse(sessionStorage.getItem("matiere_nom"));
        
        masquer($('.dialogue_btns'));
        display($('.redirection_btns'));
        masquer($('.redirection_btns > div'));

        setTimeout(() => { 
            afficher($('.apprentissage_btn'));
            rendreActif($('.apprentissage_btn'));
            $('.apprentissage_btn').html("<p>ߥߊ߫ "+matiere+"ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߡߊ߬ </p>");
            indexer($('.apprentissage_btn p'));
        }, 400);
    }
    function afficherLentement(element) {
        masquer(element);
        element.css({'display':'block','transition':'0.8s'}); 
        affichage(element);
    }   
    function afficherRapidement(element) {
        masquer(element);
        element.css({'display':'block','transition':'0.1s'}); 
        affichage(element);
    }
	function afficher_en_jailli( element,largeur,hauteur,temps ) {
        element.css({'display':'block', 'width':0, 'height':0});
        element.animate({'width':largeur, 'height':hauteur}, temps);
    }
    function afficherEvaluationAlphabet() {

        $('.fermeture').attr('id', 'fermer_evaluation'); 

        masquer($(".direction"));
        display($(".salle_de_classe"));
        display($(".course"));
        display($("#evaluation_container"));
        masquer($('#evaluation_container > div:not(#evaluation_head)'));

        $('#evaluation_body table td').css("opacity",0);

        setTimeout(() => {
            afficher($('#evaluation_container > div:not(#evaluation_head)'));
            afficherParDefautDEvaluationDialogueBtns();
            setTimeout(() => { affichageAnimeDeTableTd($('#evaluation_body table')); }, 400);
        }, 400);
    }
    function afficherExercice() {
        masquer($(".direction"));
        display($(".salle_de_classe"));
        display($(".course"));
        masquer($(".course > div:not(#exercice_container)"));
        display($("#exercice_container"));
        masquer($('#exercice_container > div:not(#exercice_head)'));

        $('#exercice_body table td').css("opacity",0);

        setTimeout(() => {
            afficher($('#exercice_container > div:not(#exercice_head)'));
            afficherParDefautDExerciceDialogueBtns();
            setTimeout(() => { affichageAnimeDeTableTd($('#exercice_body table')); }, 400);
            
            function afficherParDefautDExerciceDialogueBtns() {
                masquer($('#exercice_redirection_btns'));
                afficher($('#exercice_dialogue_btns'));

                masquer($('#exercice_dialogue_btns > div'));
                afficherRapidement($('#exercice_question_btn'));
                rendreActif($('#exercice_question_btn'));
            }
        }, 200);
    }
    function afficherEvaluation() {

        masquer($(".direction"));
        display($(".salle_de_classe"));
        display($(".course"));
        masquer($(".course > div:not(#evaluation_container)"));
        display($("#evaluation_container"));
        masquer($('#evaluation_container > div:not(#evaluation_head)'));

        setTimeout(() => { 
            afficher($('#pratique_options'));
            $('.fermeture').attr('id', 'fermer_revision');

            afficher($('#evaluation_container > div:not(#evaluation_head)'));
            afficherParDefautDEvaluationDialogueBtns();
        }, 200);   
    }
    function afficherList(ul) {
        let li = $('li', ul);
        li.css({'opacity':0, 'transform':'scale(0.75)'});
        $.each(li, function(){
            let li_actif = $(this);
            let index = li_actif.index();
            
            setTimeout(() => { displayv(li_actif); }, 200*index);
        });
    }
    function afficherParDefautDEvaluationDialogueBtns() {

        afficher($('#evaluation_foot'));

        masquer($('#evaluation_redirection_btns'));
        afficher($('#evaluation_dialogue_btns'));

        masquer($('#evaluation_dialogue_btns > div'));
        afficherRapidement($('#evaluation_question_btn'));
        rendreActif($('#evaluation_question_btn'));
        indexer($('#evaluation_question_btn p'));
    }
    function afficherRevision() {

        masquer($(".direction"));
        display($(".salle_de_classe"));
        masquer($('.course'));
        display($(".course"));
        masquer($(".course > div"));
        display($("#revision_container"));
        masquer($('#revision_container > div:not(#revision_head)'));

        $('#revision_body table td').css("opacity",0);

        setTimeout(() => { 

            $('.fermeture').attr('id', 'fermer_revision');
            
            afficher($('#pratique_options'));
            afficher($('#revision_container > div:not(#revision_head)'));
            afficherParDefautDeRevisionDialogueBtns();
            setTimeout(() => { affichageAnimeDeTableTd($('#revision_body table')); }, 400);
            
            function afficherParDefautDeRevisionDialogueBtns() {

                afficher($('#revision_foot'));
                masquer($('#revision_redirection_btns'));
                afficher($('#revision_dialogue_btns'));

                masquer($('#revision_dialogue_btns > div'));
                afficherRapidement($('#revision_question_btn'));
                rendreActif($('#revision_question_btn'));
                    
                rendreActif($('#revision_question_btn'));
                indexer($('#revision_question_btn p'));
            }
        }, 200);
    }
	function aggrandir_caractere_de(element) { element.css('font-size','+=32px'); }
	function appetir_caractere_de(element) { element.css('font-size','-=32px'); } 
    function approuver(bonne_reponse) {
        $.each($('.table_parlante td, .table_muette td'), function() {
            var td = $(this);
            if(td.text() == bonne_reponse) {

                td.html(bonne_reponse+"<p id='coche'>✓</p><p id='coche_couvercle'></p>");
                td.addClass('ombrage');
            
                $('#coche').css({
                    'position':'absolute', 
                    'display':'block',
                    'margin':0,
                    'padding':0,
                    'width':'40%', 
                    'height':'40%', 
                    'line-height':'100%', 
                    'top':0,
                    'left':0,
                    'font-size':'1.5rem',
                    'textAlign':'center', 
                    'boxSizing':'border-box',
                    'color':'blue',
                    'rotate':'y 180deg',
                    'z-index':0,
                    'transition':'transform 0.6s'
                });
                $('#coche_couvercle').css({
                    'position':'absolute', 
                    'display':'block',
                    'background-color':'#fff',
                    'margin':0,
                    'padding':0,
                    'width':'40%', 
                    'height':'40%',  
                    'top':0,
                    'left':0,
                    'border-radius':'0.5rem',
                    'z-index':1,
                    'transition':'1200ms'
                });
            }
        });
        
        setTimeout(function() { $('#coche_couvercle').css({'left':'-40%' }); }, 10);
        setTimeout(function() { td.html(bonne_reponse).removeClass('ombrage'); }, 1200);
    }
    function arreterLecture() {
        $('.stop_icon').parent().on('click',function(){ 
             return;
        });
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/ 
    
    function barrer(td) {

        var fausse_reponse = td.html();
        td.html(fausse_reponse+"<p id='croix'>&#10060;</p>");
       
        $('#croix').css({
            'position':'absolute', 
            'display':'block',
            'margin':0,
            'padding':'8px 0',
            'width':'100%', 
            'height':'100%', 
            'top':'5%',
            'left':0,
            'font-size':'32px',
            'textAlign':'center', 
            'boxSizing':'border-box',
            'transform':'scale(0)',
            'opacity':0,
            'transition':'transform 0.6s'
        });
        
        setTimeout(function() { $('#croix').css({'transform':'scale(1.5)', 'opacity':0.5, 'color':'red' }); }, 50);
        setTimeout(function() { td.html(fausse_reponse); }, 2000);
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/	
        
    function cacherPanneauDesCaracteres() {
        $("#caracteres_container").animate({"top":"22rem"}, 250);
        setTimeout(() => { $("#panneaux, #caracteres_cadre").css({"height":0}); }, 250);
        
        setTimeout(() => {
            $('#afficheur_de_panneau').text("ߛߓߍߘߋ߲߫ ߥߟߊ ߦߌ߬ߘߊ߬");
            if(matiere_nom == "ߜߋ߲߭") { $("#afficheur_de_panneau").html("ߛߌ߬ߙߕߊ߬ ߥߟߊ ߦߌ߬ߘߊ߬"); }
            clignoterUneFois($('#afficheur_de_panneau'));
        }, 400);

        viderNotification();
        if ($('.table_parlante tr').length == 0) setTimeout(() => { ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬."); }, 800);
        if ($('.table_parlante tr').length != 0) {
            setTimeout(() => { ecris("apprentissage_notification_corps", "ߜߋ߲߭ ߢߌ߲߬ ߠߎ߫ ߞߋ߬ߟߋ߲߬ ߞߋ߬ߟߋ߲߬ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߴߌ ߞߣߐ߫."); }, 800);
        }
    }
    function calculerNote(data) {
        var point = 0;
        for (var i = 0; i < data.length; i++) {
            if(data[i] != undefined) {
                if(data[i][2] == 1) {  point ++; }
            }
        }
        var note = Math.floor((point*100)/data.length);
        return note;
    }
    function calculerPoint(data) {
        var point = 0;
        if(data != undefined) {
            for (var i = 0; i < data.length; i++) {
                if(data[i] != undefined) {
                    if(data[i][2] == 1) {  point ++; }
                }
            }
        }
        return point;
    }
    function caracteresSelectionnees() {
        let caracteres_selectionnees_du_serveur = caracteresSelectionneesDuServeur();
        let caracteres_selectionnees = JSON.parse(sessionStorage.getItem("caracteres_selectionnees"));

        caracteres_selectionnees = (caracteres_selectionnees == null) ? [] : caracteres_selectionnees;
        caracteres_selectionnees = (caracteres_selectionnees.length == 0) ? caracteres_selectionnees_du_serveur : caracteres_selectionnees;
        return caracteres_selectionnees;

        function caracteresSelectionneesDuServeur() {
            let caracteres_du_serveur = [];


            return caracteres_du_serveur;
        }
    }
	function centrerHorizontalement(element) {
		var largeur_element = element.width();
		var largeur_ecran = window.screen.width;

		element.css({ 'right':(largeur_ecran-largeur_element)/2+'px' });
	}
    function changerPhaseActive(phase_active_index) {
        if(phase_active_index != -1) {
            let total_phase = $('#phases_list li').length;

            phase_active_index++;

            $.each($('#phases_list li'), function() {
                
                var phase_index = $(this).index();
                if(total_phase > phase_active_index) {  
                    if(phase_index <= phase_active_index-1) $(this).removeClass('active').addClass('apprises');
                    if(phase_index == phase_active_index  ) {
                        $(this).removeClass('a_apprendre').addClass('active');
                        indexer($(this));
                    }
                    if(phase_index >= phase_active_index+1) $(this).addClass('a_apprendre');
                }       	    
                if(total_phase == phase_active_index) $(this).removeClass('active a_apprendre').addClass('apprises');
            });
            sessionStorage.setItem('phase_active_index',JSON.stringify(phase_active_index));
        }
    }
    function chargerLessonDApprentissage(caracteres_selectionnees=[]) {
        let voyelles_selectionnees = [];
                
        chargerPanneauSubmitBtn();

        $("#voyelles_container span").click((e) => {
            e.stopImmediatePropagation();

            let span = e.target;
            let voyelle_active = span.textContent;
            
            selectionnerLesVoyellesDuPanneau();
            selectionnerLesConsonnesDuPanneau();
            cocherLesVoyellesCorrespondantesDeParametre(voyelle_active);
            cocherLesConsonnesCorrespondantsDeParametre();
            rechargerPanneauSubmitBtn();
            chargerLesson();
            
            function selectionnerLesVoyellesDuPanneau() {

                let voyelle_index = caracteres_selectionnees.indexOf(voyelle_active);

                if(voyelle_index == -1) enregistrerLeCaractere(caracteres_selectionnees,voyelle_active);
                if(voyelle_index != -1) caracteres_selectionnees.splice(voyelle_index,1);
            }
            function selectionnerLesConsonnesDuPanneau() {
                deSelectionnerTous($("#consonnes_container span"));
                selectionDesConsonnesDuPanneau($("#consonnes_container span"),caracteres_selectionnees);
            }
            function cocherLesConsonnesCorrespondantsDeParametre() {

                let consonnes_a_selectionner = consonnesASelectionner(caracteres_selectionnees);

                decocherToutesLesConsonnes($("#consonnes_checker input"));
                consonnes_a_selectionner.forEach(element => { cocherLaConsonne(element); });
                
                function cocherLaConsonne(consonne) {
                    for (let i = 0; i < $("#consonnes_checker input").length; i++) {
                        let consonne_de_parametre = $("#consonnes_checker input")[i].value;
            
                        if(consonne == consonne_de_parametre) {
                            $("#consonnes_checker input")[i].click();
                            if(matiere_nom == "ߜߋ߲߭") {
                                if($.inArray(consonne, caracteres_selectionnees) == -1) {
                                    setTimeout(() => { $(".parametres_container #submit_btn").click(); }, 800); }else{
                                    $(".parametres_container #submit_btn").click();
                                }
                            }
                        }
                    }
                    affichageAnimeDesSyllabes();
            
                    function affichageAnimeDesSyllabes() {
                        $.each($(".table_parlante td"), function(e) {
            
                            if(matiere_nom == "ߜߋ߲߭") {
                                let td = $(this);
                                let caractere_du_tableau = td.text().split("")[0];
            
                                if(caracteres_selectionnees.indexOf(caractere) != -1) {
                                    if(caractere == caractere_du_tableau) {
                                        td.css("opacity",0);
                                        setTimeout(() => { td.css("opacity",1); }, 100*td.index());
                                    }
                                }
                                if(caracteres_selectionnees.indexOf(caractere) == -1) {
                                    if(caractere == caractere_du_tableau) {
                                        td.css("opacity",1);
                                        setTimeout(() => { td.css("opacity",0); }, 100*(7 - td.index()));
                                    }
                                }
                            }
                        });
                    }
                }
            }
            function rechargerPanneauSubmitBtn() {
                let voyelles_deja_selectionnees = voyellesDejaSelectionnees();
              
                if(voyelles_deja_selectionnees.length == 0) $("#panneau_submit").html("ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߬").removeClass("actif");
                if(voyelles_deja_selectionnees.length != 0) {
                    if($("#panneau_submit").html() == "ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߬") {
                        masquer($("#panneau_submit_btn_container > button"));
                        $("#panneau_submit").html("ߣߴߌ ߓߊ߲߫ ߘߊ߫߸ ߦߋ߫ ߢߣߊߕߊ߬ߣߍ߲ ߠߎ߬ ߛߓߍ߫ ߥߟߊ߬ߓߊ ߞߊ߲߬");
                        rendreActif($("#panneau_submit"));
                        setTimeout(() => { afficher($("#panneau_submit")); }, 100);
                    }
                }
            }
            function chargerLesson() {
                $("#panneau_submit").click(() => {
                    $(".parametres_popup #submit_btn").click(); 
                    cacherPanneauDesCaracteres(); 
                });
            }
        });
        
        function voyellesDejaSelectionnees() {
            let selection = [];
            $.each($("#voyelles_container span"), function() {
                if($(this).css("background-color") == "rgb(170, 170, 170)") selection.push($(this).text());
            });
            return selection;
        }
        function chargerPanneauSubmitBtn() {
            let voyelles_deja_selectionnees = voyellesDejaSelectionnees();
            if(voyelles_deja_selectionnees.length == 0) {
                $("#panneau_submit").html("ߌ ߢߣߊߕߊ߬ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߘߐ߬").removeClass("actif");
            }
            if(voyelles_deja_selectionnees.length != 0) $("#panneau_submit").html("ߣߴߌ ߓߊ߲߫ ߘߊ߫߸ ߦߋ߫ ߢߣߊߕߊ߬ߣߍ߲ ߠߎ߬ ߛߓߍ߫ ߥߟߊ߬ߓߊ ߞߊ߲߬");
        }
    }
    function chargerCorpsDePreAlphabet() {
        $('#apprentissage_body').html(preApprentissageCorpsHTML());
               
        function preApprentissageCorpsHTML() {
            var c = alphabet_nko[0];
            c.push('');

            var a_html = "<div id = 'table_pre_apprentissage'>\n";
                for(var i=0;i<21;i+=7) {
                    a_html += "<div class='pre_apprentissage_tr'>\n";
                        for(var j=0;j<7;j++) a_html += "<span class='pre_apprentissage_td'>"+c[i+j]+"</span>\n";
                    a_html += "</div>\n";
                }
                for(var k=21;k<28;k+=7){
                    a_html += "<div class='pre_apprentissage_tr'>\n";
                        for(var l=0;l<7;l++) a_html += "<span class='pre_apprentissage_td'>"+c[k+l]+"</span>\n";
                    a_html += "</div>\n";
                }
            a_html += "</div>";
              
            return a_html;
        }
    }
    function chargementParDefautDuTableauNoir() {
        let matiere_index = JSON.parse(sessionStorage.getItem("matiere_index"));
        let a_apprendre = "";

        if(matiere_index === 1) a_apprendre = "ߜߋ߲߭";
        if(matiere_index === 2) a_apprendre = "ߜߋ߲߬ ߞߊ߲ߡߊߛߙߋߡߊ߫";
        if(matiere_index === 3) a_apprendre = "ߖߊ߰ߕߋ߬ߘߋ߲߫";

        $('#apprentissage_body').html("<table id='table_syllabe_apprentissage'><div id='texte'></div></table>");
        setTimeout(() => { ecris("texte", a_apprendre+" ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬"); }, 1000);
    }
    function chargerPanneauDesCaracteres() {
        
        var panneaux_des_caracteres_html = panneauxDesCaracteresHTML();

        $('#panneaux').html(panneaux_des_caracteres_html);
        if(matiere_nom == "ߜߋ߲߭") {
            cocherToutesLesVoyelles();
            $("#afficheur_de_panneau").html("ߛߌ߬ߙߕߊ߬ ߥߟߊ ߦߌ߬ߘߊ߬");
        }

        function panneauxDesCaracteresHTML() {

            var voyelles = caracteres[0];
            var consonnes = caracteres[1];
            var nasalisations = caracteres[4];
            var tons = caracteres[5];

            var html_2 = '<div id="caracteres_cadre">\n';
                html_2 += '<div id="caracteres_container">\n';

                    html_2 += '<div id="panneau_submit_btn_container">\n';
                        html_2 += '<button id="panneau_submit"></button>\n';
                    html_2 += '</div>\n';
                
                    html_2 += "<div id='consonnes_container'>\n";
                    for (var i = 0; i < 18; i += 6) {
                        html_2 += "<div>\n";
                        for (var j = 0; j < 6; j++) {
                            html_2 += "<span>" + consonnes[i + j] + "</span>";
                        }
                        html_2 += "</div>\n";
                    }
                    html_2 += "</div>\n";

                    html_2 += "<div id='voyelles_container'>\n";
                        html_2 += "<div>\n";
                        for (var i = 0; i < 7; i++) {
                            html_2 += "<span>" + voyelles[i] + "</span>";
                        }
                        html_2 += "</div>\n";
                    html_2 += "</div>\n";

                    html_2 += "<div id='nasalisations_container'>\n";
                        html_2 += "<div>\n";
                        for (var i = 0; i < 2; i++) {
                            html_2 += "<span>" + nasalisations[i] + "</span>";
                        }
                        html_2 += "</div>\n";
                    html_2 += "</div>\n";

                    html_2 += "<div id='tons_container'>\n";
                        html_2 += "<div>\n";
                        for (var i = 0; i < 8; i++) {
                            html_2 += "<span>" + tons[i] + "</span>";
                        }
                        html_2 += "</div>\n";
                    html_2 += "</div>\n";
                    
                html_2 += '</div>\n';
            html_2 += '</div>\n';

            return html_2;
        }
    }
    function clearStorage() {
        sessionStorage.clear();
        localStorage.clear();
    }
    function clignoterUneFois(element) {
        element.css('display','none');
        setTimeout(() => { element.css('display','block'); }, 250);
    }
    function clignotage(reponse_ratee) {
        $.each($('.table_parlante td, .table_muette td'), function() {
            let td = $(this);
            if(td.text() == reponse_ratee) {
                td.css('background-color','#666');
                setTimeout((function() { td.css('background-color','transparent'); }), 200);
                setTimeout((function() { td.css('background-color','#666');        }), 325);
                setTimeout((function() { td.css('background-color','transparent'); }), 450);
                setTimeout((function() { td.css('background-color','#666');        }), 575);
                setTimeout((function() { td.css('background-color','transparent'); }), 700);
                setTimeout((function() { td.css('background-color','#666');        }), 825);
                setTimeout((function() { td.css('background-color','transparent'); }), 950);
                setTimeout((function() { td.css('background-color','#666');        }), 1075);
                setTimeout((function() { td.css('background-color','transparent'); }), 1200);
                setTimeout((function() { td.css('background-color','#666');        }), 1325);
                setTimeout((function() { td.css('background-color','transparent'); }), 1450);
                setTimeout((function() { td.css('background-color','#666');        }), 1575);
                setTimeout((function() { td.css('background-color','transparent'); }), 1700);
                setTimeout((function() { td.css('background-color','#666');        }), 1825);
                setTimeout((function() { td.css('background-color','transparent'); }), 1950);
            }  
        });
    }
    function clignoter(element) {
        element.addClass('shadow');
        setTimeout((function() { td.removeClass('shadow'); }), 200);
        setTimeout((function() { td.addClass('shadow');    }), 600);
        setTimeout((function() { td.removeClass('shadow'); }), 1000);
        setTimeout((function() { td.addClass('shadow');    }), 1400);
         setTimeout((function() { td.removeClass('shadow'); }), 1800);
    }
    function cocherLeCaractereCorrespondantDeParametre(caractere) {
            for (let i = 0; i < $(".parametres_container input").length; i++) {
                let caractere_de_parametre = $(".parametres_container input")[i].value;

                if(caractere == caractere_de_parametre) {
                    $(".parametres_container input")[i].click();
                    if(matiere_nom == "ߜߋ߲߭") {
                        if($.inArray(caractere, caracteres_selectionnees) == -1) {
                            setTimeout(() => { $(".parametres_container #submit_btn").click(); }, 800); }else{
                            $(".parametres_container #submit_btn").click();
                        }
                    }
                }
            }
            affichageAnimeDesSyllabes();

            function affichageAnimeDesSyllabes() {
                $.each($(".table_parlante td"), function(e) {

                    if(matiere_nom == "ߜߋ߲߭") {
                        let td = $(this);
                        let caractere_du_tableau = td.text().split("")[0];

                        if(caracteres_selectionnees.indexOf(caractere) != -1) {
                            if(caractere == caractere_du_tableau) {
                                td.css("opacity",0);
                                setTimeout(() => { td.css("opacity",1); }, 100*td.index());
                            }
                        }
                        if(caracteres_selectionnees.indexOf(caractere) == -1) {
                            if(caractere == caractere_du_tableau) {
                                td.css("opacity",1);
                                setTimeout(() => { td.css("opacity",0); }, 100*(7 - td.index()));
                            }
                        }
                    }
                });
            }
    }
    function cocherLesTonsCorrespondantsDeParametre(ton) {
        for (let i = 0; i < $("#tons_checker input").length; i++) {
            let ton_de_parametre = $("#tons_checker input")[i].value;

            if(ton == ton_de_parametre) {
                $("#tons_checker input")[i].click();
                if(matiere_nom == "ߜߋ߲߭") {
                    if($.inArray(ton, caracteres_selectionnees) == -1) {
                        setTimeout(() => { $(".parametres_container #submit_btn").click(); }, 800); }else{
                        $(".parametres_container #submit_btn").click();
                    }
                }
            }
        }
        affichageAnimeDesSyllabes();

        function affichageAnimeDesSyllabes() {
            $.each($(".table_parlante td"), function(e) {

                if(matiere_nom == "ߜߋ߲߭") {
                    let td = $(this);
                    let caractere_du_tableau = td.text().split("")[0];

                    if(caracteres_selectionnees.indexOf(caractere) != -1) {
                        if(caractere == caractere_du_tableau) {
                            td.css("opacity",0);
                            setTimeout(() => { td.css("opacity",1); }, 100*td.index());
                        }
                    }
                    if(caracteres_selectionnees.indexOf(caractere) == -1) {
                        if(caractere == caractere_du_tableau) {
                            td.css("opacity",1);
                            setTimeout(() => { td.css("opacity",0); }, 100*(7 - td.index()));
                        }
                    }
                }
            });
        }
    }
    function cocherLesVoyellesCorrespondantesDeParametre(voyelle) {
            for (let i = 0; i < $("#voyelles_checker input").length; i++) {
                let voyelle_de_parametre = $("#voyelles_checker input")[i].value;

                if(voyelle == voyelle_de_parametre) {
                    $("#voyelles_checker input")[i].click();
                    if(matiere_nom == "ߜߋ߲߭") {
                        if($.inArray(voyelle, caracteres_selectionnees) == -1) {
                            setTimeout(() => { $(".parametres_container #submit_btn").click(); }, 800); }else{
                            $(".parametres_container #submit_btn").click();
                        }
                    }
                }
            }
            affichageAnimeDesSyllabes();

            function affichageAnimeDesSyllabes() {
                $.each($(".table_parlante td"), function(e) {

                    if(matiere_nom == "ߜߋ߲߭") {
                        let td = $(this);
                        let caractere_du_tableau = td.text().split("")[0];

                        if(caracteres_selectionnees.indexOf(caractere) != -1) {
                            if(caractere == caractere_du_tableau) {
                                td.css("opacity",0);
                                setTimeout(() => { td.css("opacity",1); }, 100*td.index());
                            }
                        }
                        if(caracteres_selectionnees.indexOf(caractere) == -1) {
                            if(caractere == caractere_du_tableau) {
                                td.css("opacity",1);
                                setTimeout(() => { td.css("opacity",0); }, 100*(7 - td.index()));
                            }
                        }
                    }
                });
            }
    }
    function cocherLeTedo() {
        $.each($('#tedo_checker .checkbox_parent'), function(){ 
            if($(this).prop('checked')==false) $(this).click(); 
        });
    }
    function cocherToutesLesConsonnes() {
        $.each($('#consonnes_checker .checkbox_parent'), function(){ 
            if($(this).prop('checked')==false) $(this).click(); 
        });
    }
    function cocherToutesLesNasalisations() {
        $.each($('#nasalisation_checker .checkbox_parent'), function(){ 
            if($(this).prop('checked')==false) $(this).click(); 
        });
    }
    function cocherToutesLesVoyelles() {
        $.each($('#voyelles_checker .checkbox_parent'), function(){ 
            if($(this).prop('checked')==false) $(this).click(); 
        });
    }
    function cocherTousLesCaracteres() {
        $.each($('.checkbox_parent'), function(){ 
            if($(this).prop('checked')==false) $(this).click(); 
        });
    }
    function cocherTousLesTons() {
        $.each($('#tons_checker .checkbox_parent'), function(){ 
            if($(this).prop('checked')==false) $(this).click(); 
        });
    }
	function compteur(){
	    var i=0;
	    return function(){ return i += 1; };
	}
    function conversionDeDateEnNko(timestamp){
       var timestamp = timestamp.split(' ');
       timestamp = timestamp[0].split('-');
       
       var annee = 'ߛߊ߲߭ '+parseIntNko(timestamp[0]);
       var moi = mois[timestamp[1][1]];
       var jour = 'ߕߟߋ߬ '+parseIntNko(timestamp[2]);
       
       timestamp = moi+' '+jour+' '+annee; 
       return timestamp;
    }
    function consonnesASelectionner(caracteres_selectionnees) {

        let syllabe_1 = ["ߓߊ","ߛߊ","ߕߊ","ߜߊ"];
        let syllabe_2 = ["ߞߋ"];
        let syllabe_3 = ["ߓߌ","ߛߌ","ߟߌ","ߣߌ"];
        let syllabe_4 = ["ߝߍ","ߣߍ"];
        let syllabe_5 = ["ߝߎ"];
        let syllabe_6 = ["ߓߏ","ߔߏ","ߛߏ","ߝߏ"];
        let syllabe_7 = ["ߣߐ"];

        let consonnes_a_cocher = [];
        
        caracteres_selectionnees.forEach(element => {
            if(element == "ߊ") { for (let i = 0; i < syllabe_1.length; i++) pusher(consonnes_a_cocher,syllabe_1[i].split("")[0]); }
            if(element == "ߋ") { for (let i = 0; i < syllabe_2.length; i++) pusher(consonnes_a_cocher,syllabe_2[i].split("")[0]); }
            if(element == "ߌ") { for (let i = 0; i < syllabe_3.length; i++) pusher(consonnes_a_cocher,syllabe_3[i].split("")[0]); }
            if(element == "ߍ") { for (let i = 0; i < syllabe_4.length; i++) pusher(consonnes_a_cocher,syllabe_4[i].split("")[0]); }
            if(element == "ߎ") { for (let i = 0; i < syllabe_5.length; i++) pusher(consonnes_a_cocher,syllabe_5[i].split("")[0]); }
            if(element == "ߏ") { for (let i = 0; i < syllabe_6.length; i++) pusher(consonnes_a_cocher,syllabe_6[i].split("")[0]); }
            if(element == "ߐ") { for (let i = 0; i < syllabe_7.length; i++) pusher(consonnes_a_cocher,syllabe_7[i].split("")[0]); }
        });

        return consonnes_a_cocher;
    }
    function consonnesChoisiesDuServeur() {
   
        let niveau_actif = JSON.parse(sessionStorage.getItem("niveau_actif"));
        let datas = JSON.parse(sessionStorage.getItem("datas"));
        let cs = [];
        let lesson = [];

        if (datas[niveau_actif-1][0] != undefined)  lesson = JSON.parse(datas[niveau_actif-1][0].lesson);
        lesson.forEach(element => {
            let consonne = element[0].split('')[0];
            if ($.inArray(consonne, cs) === -1) { cs.push(consonne); }
        });
        return cs;
    }
    function contenuVide() {
        let contenu_vide = "<div class='contenu_vide'>ߝߏߦߊ߲߫ ߹</div>";
        return contenu_vide;
    }
    function convertirDateEnNko(date){
        
        let annee = 'ߛߊ߲߭ '+parseIntNko(date.split(' ')[0].split('-')[0]);
        let moi = mois[parseInt(date.split(' ')[0].split('-')[1]) - 1];
        let jour = 'ߕߟߋ߬ '+parseIntNko(date.split(' ')[0].split('-')[2]);
        
        date = moi+' '+jour+' '+annee; 
        return date;
    }
    function couleurDeFond(element,couleur)	{ element.css('backgroundColor', couleur); }
    function couleurDeFont(element,couleur)	{ element.css('color', couleur); }

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function dateAcuelle() {

        let d = new Date();
        let an = d.getFullYear();
        let lune = d.getMonth();
        let date = d.getDate();
        let nom_du_jour = d.getDay();
        let heure = d.getHours();
        let minute = d.getMinutes();
        let temps = [heure+':'+minute];
        let date_actuelle = an+'-'+lune+'-'+date+' '+temps+' '+nom_du_jour;

        return date_actuelle;
    }
    function dateDApprentissageAlphabetDuServeur() {
        let datas = JSON.parse(sessionStorage.getItem('datas'));
        let date = "";
        if(datas.length != 0) {
            date = (datas[0][0] == undefined) ? dateAcuelle() : datas[0][0].date;
        }
        return date;
    }
    function dateEnNko(date_a_convertir) {

        let d = date_a_convertir;

        let an = parseIntNko(d.split('-')[0]);
        let lune = mois[parseInt(d.split('-')[1])];
        let date = parseIntNko(parseInt(d.split('-')[2]));
        let heure = parseIntNko(parseInt(d.split(' ')[1].split(':')[0]));
        let minute = parseIntNko(parseInt(d.split(' ')[1].split(':')[1]));
        let temps = [heure+':'+minute];
        let date_actuelle = temps+' '+lune+' ߕߟߋ߬ '+date+' ߛߊ߲߭ '+an;

        return date_actuelle;
    }
    function dateEnNko1(date_a_convertir) {

        let d = date_a_convertir;

        let an = parseIntNko(d.split('-')[0]);
        let lune = mois[parseInt(d.split('-')[1] - 1)];
        let date = parseIntNko(parseInt(d.split('-')[2]));
        let heure = parseIntNko(parseInt(d.split(' ')[1].split(':')[0]));
        let minute = parseIntNko(parseInt(d.split(' ')[1].split(':')[1]));
        let temps = [heure+':'+minute];
        let date_actuelle = temps+' '+lune+' ߕߟߋ߬ '+date+' ߛߊ߲߭ '+an;

        return date_actuelle;
    }
    function decocherLeTedo() {
        $.each($('#tedo_checker .checkbox_parent'), function(){ 
            if($(this).prop('checked')==true) $(this).click(); 
        });
    }
    function decocherLesCaracteresNonConcernes() {

        deSelectionnerLesConsonnesDuPanneau();
        deSelectionnerLesVoyellesDuPanneau();
        decocherLaNasalisation();
        decocherLeTedo();
        decocherLesTons();

        function deSelectionnerLesConsonnesDuPanneau() {
            if ($('#consonnes_checker').find('.checkbox_parent').prop("checked") == true) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }
        }
        function deSelectionnerLesVoyellesDuPanneau() {
            if ($('#voyelles_checker').find('.checkbox_parent').prop("checked") == true) { $('#voyelles_checker').find('.checkbox_parent').next().click(); }
        }
        function decocherLaNasalisation() {
            if ($('#nasalisation_checker').find('.checkbox_parent').prop("checked") == true) { $('#nasalisation_checker').find('.checkbox_parent').next().click(); }
        }
        function decocherLeTedo() {
            if ($('#tedo_checker').find('.checkbox_parent').prop("checked") == true) { $('#tedo_checker').find('.checkbox_parent').next().click(); }
        }
        function decocherLesTons() {
            if ($('#tons_checker').find('.checkbox_parent').prop("checked") == true) { $('#tons_checker').find('.checkbox_parent').next().click(); }
        }
    }
    function decocherToutesLesConsonnes(consonnes) {
        $.each(consonnes, function(){ 
            if($(this).prop('checked')==true) $(this).click(); 
        });
    }
    function decocherToutesLesNasalisations() {
        $.each($('#nasalisation_checker .checkbox_parent'), function(){ 
            if($(this).prop('checked')==true) $(this).click(); 
        });
    }
    function decocherToutesLesVoyelles() {
        $.each($('#voyelles_checker .checkbox_parent'), function(){ 
            if($(this).prop('checked')==true) $(this).click(); 
        });
    }
    function decocherTousLesTons() {
        $.each($('#tons_checker .checkbox_parent'), function(){ 
            if($(this).prop('checked')==true) $(this).click(); 
        });
    }
    function decocherTousLesCaracteres() {
        $.each($('.checkbox_parent'), function(){ 
            if($(this).prop('checked')==true) $(this).click(); 
        });
    }
    function defilementDuContenuVersLeHaut(container) {
        container.animate({ scrollTop:container[0].scrollHeight }, 1000);
    }
    function demarquer(element) {
        element.css('background-color','#aaa').siblings().css('background-color','rgba(85,85,85,0.25)');
    }
    function deSelectionnerTous(spans) {
        spans.each(function() {
            let span = $(this);
            if(span.css("background-color") == "rgb(170, 170, 170)") span.click();
        });
    }
    function display(element) {
        element.css({
            'display':'block',
            'opacity':1, 
            'transform':'scale(1)'
        });
    }
    function displayv(element) {
        element.css({
            'display':'block',
            'opacity':0, 
            'transition':'0.25s', 
            'transform-origin':'0 0',
            'transform':'scaleY(0.75)'
        });
        setTimeout(() => { element.css({'opacity':1, 'transform':'scaleY(1)'}); }, 50);
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function ecris(element_id,message) {
        let longueur = message.length;
        let indice = 0;

        viderNotification();
        setTimeout(() => { 
            write();
            function write() {
                indice++;
                $('#'+element_id).html(message.substr(0,indice));
                if(indice<longueur) {
                    setTimeout(() => { write(); }, 5);
                }
            }
        }, 100);
    }
    function ecrire(element_class,message) {
        let longueur = message.length;
        let indice = 0;

        viderNotification();
        setTimeout(() => { 
            write();
            function write() {
                indice++;
                $('.'+element_class).html(message.substr(0,indice));
                if(indice<longueur) {
                    setTimeout(() => { write(); }, 5);
                }
            }
        }, 100);
    }
    function effacerLeTableau() {
        $('.course_body').html("<p id='contenu_par_defaut_du_tableau'>ߥߟߊ߬ߓߊ ߓߘߊ߫ ߖߐ߬ߛߌ߬ ߹</p>");
    }
    function enregistrerLeCaractere(caracteres_selectionnees,caractere) {
        let caractere_index = caracteres_selectionnees.indexOf(caractere);
        if(caractere_index === -1) { caracteres_selectionnees.push(caractere); }
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/
    
    function fermer(element) {
        element.animate({ 'height':0 }, 200);
        setTimeout((function(){ element.css({ 'display':'none' }) }),180);
    }
    function fermerLaPage() {
        $(".fermeture").click(() => { history.back(); });
    }
    function formatParDefautDuResultat() {

        $('.table_head tr:nth-child(2) td').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ');
        $('.table_head tr:nth-child(3) td').text('ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ');

        $.each($('.table_body tr:nth-child(3) td, .table_body tr:nth-child(4) td'), function() {
            $(this).html('');
        });

        $('#total_reponse').text('');
        $('#total_point_1').text('');

        $('#resultat_pied > div > div:nth-child(1) span:first-child').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߡߎ߬ߡߍ');
        $('#resultat_pied > div > div:nth-child(2) span:first-child').text('ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ߫ ߢߊ߬ߣߍ߲');
        $('#resultat_pied > div > div:nth-child(3)').css('display','block');

        $('#total_bonne_reponse').text('');
        $('#total_point_2').text('');
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function gestionDeExerciceFootBtn(total_questions) {
        let i = 0;
        
        if(i <= total_questions) { 

            masquer($('#exercice_dialogue_btns > div'));
            afficherRapidement($('#exercice_question_btn'));
            indexer($('#exercice_question_btn p'));

            $('#exercice_question_btn').click(function() { 
                masquer($('#exercice_dialogue_btns > div'));
                rendreActif($('#exercice_repetition_btn'));
                afficherRapidement($('#exercice_repetition_btn')); 
            });

            $('#exercice_body td').click(function() {
                masquer($('#exercice_dialogue_btns > div'));
                rendreActif($('#exercice_correction_btn'));
                afficherRapidement($('#exercice_correction_btn')); 
            });

            $('#exercice_correction_btn').click(function() { 
                masquer($('#exercice_dialogue_btns > div'));
 
                if(i < total_questions - 1) { rendreActif($('#exercice_question_btn')); }
                if(i === total_questions - 1) { 
                    $('#exercice_question_btn').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').removeClass('actif').off('click');
                }
                afficherRapidement($('#exercice_question_btn')); 
                i++;
            });
        }
    }
    function gestionDeExerciceDialogueBtns2() {

        $('#exercices_player').css('display','block');
        $('.oreille_icon_container').css('display','none');
  
        zoomUp($('#exercice_dialogue_btn'));
        
        $('#exercices_player').click(function(){
            zoomDown($('#exercices_player'));
            setTimeout(() => {
                $('.oreille_icon_container').css('display','block');
                zoomUp($('.oreille_icon_container'));
            }, 200);
        });

        $('.table_muette td, .table_parlante td').click(function(){
            zoomDown($('.oreille_icon_container'));
            setTimeout(() => {
                $('#exercices_player').css('display','block');
                $('.oreille_icon_container').css('display','none');
                
                zoomUp($('#exercices_player'));
            }, 200);
        });
    }
    function gestionDeDialogueBtns() {

        let question_status = 'repondue';

        rendreActif($('.question_btn'));

        $('.question_btn').click(function() { 
            question_status = 'posee';
            $(this).css('display','none');
            $('.correction_btn').css('display','none');
            setTimeout(() => { 
                $('.repetition_btn').css('display','block'); 
                rendreActif($('.repetition_btn'));
            }, 200);
        });

        $('.table_parlante td').click(function() {
            if(question_status == 'repondue') {
                secouer($('.question_btn'));
                return;
            }

            $('.question_btn').css('display','none');
            $('.repetition_btn').css('display','none');
            setTimeout(() => { 
                $('.correction_btn').css('display','block'); 
                rendreActif($('.correction_btn'));
            }, 200);
        });

        $('.correction_btn').click(function() { 
            question_status = 'repondue';
            $('.repetition_btn').css('display','none');
            $('.correction_btn').css('display','none');
            setTimeout(() => { 
                $('.question_btn').css('display','block'); 
                rendreActif($('.question_btn'));
            }, 200);
        });               
    }
    function gestionDeExerciceBtns() {

        let question_status = 'repondue';

        rendreActif($('#exercice_question_btn'));
        indexer($('#exercice_question_btn p'));

        $('#exercice_question_btn').click(function() { 
            question_status = 'posee';
            $(this).css('display','none');
            $('#exercice_correction_btn').css('display','none');
            setTimeout(() => { 
                $('#exercice_repetition_btn').css('display','block'); 
                rendreActif($('#exercice_repetition_btn'));
            }, 200);
        });

        $('#exercice_body td').click(function() {
            if(question_status == 'repondue') {
                secouer($('#exercice_question_btn'));
                return;
            }

            $('#exercice_question_btn').css('display','none');
            $('#exercice_repetition_btn').css('display','none');
            setTimeout(() => { 
                $('#exercice_correction_btn').css('display','block'); 
                rendreActif($('#exercice_correction_btn'));
            }, 200);
        });

        $('#exercice_correction_btn').click(function() { 
            question_status = 'repondue';
            $('#exercice_repetition_btn').css('display','none');
            $('#exercice_correction_btn').css('display','none');
            setTimeout(() => { 
                $('#exercice_question_btn').css('display','block'); 
                rendreActif($('#exercice_question_btn'));
            }, 200);
        });               
    }
    function goDown(element) {
        
        element.wrap('<div id="envelope"></div>');

        $('#envelope').css({
            'position':'absolute',
            'display':'block',
            'top':'3.5rem',
            'left':'2%',
            'height':'calc(100% - 3.5rem)',
            'width':'96%',
            'margin':'auto',
            'overflow':'hidden',
            'z-index': 1
        });

        element.css('display','block');
        element.animate({'top':0}, 400);
    }
    function goUp(element) {
        element.css('display','none'); 
        element.animate({'top':'-100%'}, 400);
        setTimeout(() => { 
            element.unwrap();

            $('#envelope').css({
                'display':'none',
                'height':0,
                'z-index': 0
            });
        }, 600);
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/
	
	function incrementer(){
	    var i=0;
	    return function(){ return i += 1; };
	}   
    function indexer(element) { 
        let r = setInterval(function(){
            element.addClass('indicateur'); 
        },1000);
        element.click(function() { clearInterval(r); $(this).removeClass('indicateur'); });
    }
    function initialiserData(tableau) {
        let data = [];
        for(let i=0; i<tableau.length; i++) {
            let q = tableau[i];
            let r = '';
            let p = 0;
            data.push([q, r, p]);
        }
        return data;
    }
    function initialiserData1(tableau) {
        let data = [];
        for(let i=0; i<tableau.length; i++) {
            let q = tableau[i];
            let r = 0;
            let p = 0;
            data.push([q, r, p]);
        }
        return data;
    }
    function initialiserProgressBar() { 
        $('.progress_bar').css({'display':'none'});
        $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css({'width':0});
        setTimeout(() => { $('.progress_bar').css({'display':'block'}); }, 400);
    }
    function initialiserProgressBarr() { 
        $('.parametres_popup td').on('click', function() {
            setTimeout(() => { 
                $('.progress_bar').css('display','none');
                $('.progress_question_bar, .progress_bonne_reponse_bar').css('width',0); 
            }, 450);
        });
    } 

/*-------------------------------------------------------------------------------------------------------------------------------------*/
	
    function lecturePersonnalisee(ton) {
        $('.table_parlante').on('click', function(e) {
            var td_actif = e.target;
            var td_actif_value = td_actif.textContent;
    
            $('#audio').attr({ src: '../son/mp3/'+ton+'/'+td_actif_value+'.mp3', autoplay:'on' });
    
            // $(td_actif).addClass('ombrage');
            // setTimeout(function() { $(td_actif).removeClass('ombrage'); }, 600);
        });
     }
    function lectureSemiAutomatique() {
        let play = false;
        $(".play_icon").parent().on('click',function(){

            if(play == true) return;

            let lecture = setTimeout(function(){
                var td = $('.table_parlante td');
            
                var read_events = [];
                var td_delay = '';
                var td_index = -1;
                var td_length = td.length;
            
                for (let i = 0; i <= td_length; i++) {
                    td_delay = 0;
                    read_events[read_events.length] = setTimeout((function() {
                        if(td_index < td_length) {
                            td[td_index++].click();
                        }
                    }), td_delay += i*2000)+'\n';

                    play = true;
                }
            },600);
         });
    }
    function lessonHTML(array, table_id = '#') {

        var table = "<table class = 'table_parlante' id='"+table_id+"'>\n";
        for(var i=0;i<array.length-array.length%7;i+=7) {
            table += "<tr>\n";
            for(var j=0;j<7;j++) table += "<td>"+array[i+j]+"</td>\n";
            table += "</tr>\n";
        }
        for(var k=array.length-array.length%7;k<array.length;k+=array.length%7){
            table += "<tr>\n";
            for(var l=0;l<array.length%7;l++) table += "<td>"+array[k+l]+"</td>\n";
            table += "</tr>\n";
        }
        table += "</table>";
                
        return table;
    }
    function lessonHTML3(array, table_id = '#') {

        var table = "<table class = 'table_parlante' id='"+table_id+"'>\n";
        for(var i=0;i<array.length-array.length%7;i+=7) {
            table += "<tr>\n";
            for(var j=0;j<7;j++) table += "<td>"+array[i+j][0]+"</td>\n";
            table += "</tr>\n";
        }
        for(var k=array.length-array.length%7;k<array.length;k+=array.length%7){
            table += "<tr>\n";
            for(var l=0;l<array.length%7;l++) table += "<td>"+array[k+l][0]+"</td>\n";
            table += "</tr>\n";
        }
        table += "</table>";
                
        return table;
    }
    function lessonDExerciceHTML(array, table_id = '#') {

        var table = "<table class = 'table_muette' id='"+table_id+"'>\n";
        for(var i=0;i<array.length-array.length%7;i+=7) {
            table += "<tr>\n";
            for(var j=0;j<7;j++) table += "<td>"+array[i+j]+"</td>\n";
            table += "</tr>\n";
        }
        for(var k=array.length-array.length%7;k<array.length;k+=array.length%7){
            table += "<tr>\n";
            for(var l=0;l<array.length%7;l++) table += "<td>"+array[k+l]+"</td>\n";
            table += "</tr>\n";
        }
        table += "</table>";
                
        return table;
    }
    function lessonHTML2(voyelles_length,tons_length,syllabes_tonifies_length,syllabes_tonifies) {
           
        var tons_apprentissage_html = '';
        var m = voyelles_length*tons_length;
                    
        for(var sous_table_index=0;sous_table_index<syllabes_tonifies_length;sous_table_index+=m){
            tons_apprentissage_html += '<table class="table_parlante">\n\n';
            for(var ligne=0;ligne<m;ligne+=tons_length){
                tons_apprentissage_html += '<tr>\n';
                for(var colonne=0;colonne<tons_length;colonne++){
                    tons_apprentissage_html += '<td>'+syllabes_tonifies[sous_table_index+ligne+colonne]+'</td>\n';
                }
                tons_apprentissage_html += '</tr>\n\n';
            }
            tons_apprentissage_html += "</table>\n";
        }
                   
        return tons_apprentissage_html;
    }
    function lessonDApprentissagePreAlphabet() {

        let datas = JSON.parse(sessionStorage.getItem('datas'));
        let ldap = [];

        if(datas.length === 0) { console.log("La variable datas est vide !"); }
        if(datas.length != 0) {
            for (let i = 0; i < datas[0].length; i++) {
                let phase = datas[0][i].phase;
                if(phase == "alphabet_apprentissage") { ldap = JSON.parse(datas[0][i].lesson); }
            }
        }

        return ldap;
    }
    function lessonDExercicePreAlphabet() {
        
        let datas = JSON.parse(sessionStorage.getItem('datas'));
        let ldex = [];

        if(datas.length === 0) { console.log("La variable datas est vide !"); }
        if(datas.length != 0) {
            for (let j = 0; j < datas[0].length; j++) {
                let phase = datas[0][j].phase;
                if(phase == "alphabet_exercice") { ldex = JSON.parse(datas[0][j].lesson); }
            }
        }

        return ldex;
    }
    function lessonDEvaluationPreAlphabet() {
        
        let datas = JSON.parse(sessionStorage.getItem('datas'));
        let ldev = [];

        if(datas.length === 0) { console.log("La variable datas est vide !"); }
        if(datas.length != 0) {
            for (let k = 0; k < datas[0].length; k++) {
                let phase = datas[0][k].phase;
                if(phase == "alphabet_evaluation") { ldev = JSON.parse(datas[0][k].lesson); }
            }
        }
        
        return ldev;
    }
    function lire_mot() {
	   for(var i=0; i<texte_memoire.length; i++) {
           
            var mot = texte_memoire[i];
            var lecture = setInterval(lire, 800);
            var r = 0;
            
            function lire() {
                $('#audio').attr({ src:'../son/m4a/'+tons+'/'+lettre+'.m4a', autoplay:'on' }); 

                // $('#audio').attr({ src:'../son/aac/'+lettre+'.aac', autoplay:'on' }); 
                // $('#audio').attr({ src:'../son/amr/'+lettre+'.amr', autoplay:'on' }); 
                // $('#audio').attr({ src:'../son/flac/'+lettre+'.flac', autoplay:'on' }); 
                // $('#audio').attr({ src:'../son/ogg/'+lettre+'.ogg', autoplay:'on' }); 
                // $('#audio').attr({ src:'../son/wav/'+lettre+'.wav', autoplay:'on' }); 
                // $('#audio').attr({ src:'../son/m4a/'+lettre+'.m4a', autoplay:'on' }); 
                // $('#audio').attr({ src:'../son/mp3/'+lettre+'.mp3', autoplay:'on' }); 

                r++;
                if( r>mot.length ) { clearInterval( lecture ); }
	        }
	   }
    }
    function lire(parent_direct,son) { 
         //$('#audio').attr({ src:'../son/m4a/'+parent_direct+'/'+son+'.m4a', autoplay:'on' }); 
        // $('#audio').attr({ src:'../son/aac/'+'+parent_direct+'/'lettre+'.aac', autoplay:'on' }); 
        // $('#audio').attr({ src:'../son/amr/'+'+parent_direct+'/'lettre+'.amr', autoplay:'on' }); 
        // $('#audio').attr({ src:'../son/flac/'+'+parent_direct+'/'lettre+'.flac', autoplay:'on' }); 
        // $('#audio').attr({ src:'../son/ogg/'+'+parent_direct+'/'lettre+'.ogg', autoplay:'on' }); 
        // $('#audio').attr({ src:'../son/wav/'+'+parent_direct+'/'lettre+'.wav', autoplay:'on' }); 
        // $('#audio').attr({ src:'../son/m4a/'+'+parent_direct+'/'lettre+'.m4a', autoplay:'on' }); 
        $('#audio').attr({ src:'../son/mp3/'+parent_direct+'/'+son+'.mp3', autoplay:'on' });  
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/
    
    function malaxer(tableau){  
        var mixted_table = [];

        for(var i=0; mixted_table.length<tableau.length;i++){
            var nbr_aleatoire = Math.floor(Math.random()*tableau.length);
            var element_aleatoire = tableau[nbr_aleatoire];
            if($.inArray(element_aleatoire, mixted_table)==-1) mixted_table[mixted_table.length] = element_aleatoire;
        }
    
        return mixted_table;
    }
    function marquerLeCaractereChoisi(clicked_caractere_container) {
        if(clicked_caractere_container.css("color") != "rgb(255, 165, 0)") {
            var bc = clicked_caractere_container.css('background-color');
            var consonne_background = (bc == 'rgb(170, 170, 170)') ? 'rgb(255, 255, 255)' : 'rgb(170, 170, 170)';
            clicked_caractere_container.css('background-color',consonne_background);
        }
    }
    function marquerReponse(td_actif,question) {
        let reponse = td_actif.text();
        $('.table_parlante td').css('background-color','rgba(85,85,85,0.25)');
        if(question == reponse) { valider(td_actif); }
        if(question != reponse) { barrer(td_actif); }
    }
    function masquer(element) {
        element.css({
            'display':'none',
            'transform':'scale(0.75)', 
            'opacity':'0'
        });
    } 
    function memoireConsonnesChoisies() {

        let consonnes_choisies_du_serveur = consonnesChoisiesDuServeur();

        consonnes_choisies_du_serveur = (consonnes_choisies_du_serveur == null) ? [] : consonnes_choisies_du_serveur;
        let memoire_consonnes_choisies = JSON.parse(localStorage.getItem("memoire_consonnes_choisies"));
        memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? [] : memoire_consonnes_choisies;
        
        if(consonnes_choisies_du_serveur.length != 0) {
            consonnes_choisies_du_serveur.forEach(element => {
                if($.inArray(element,memoire_consonnes_choisies) === -1) memoire_consonnes_choisies.push(element);
            });
        }

        return memoire_consonnes_choisies;
    }
    function memoriserClicks(table,elements){

        let id = table.attr('id');
        let td = $('#'+id+' td');
        
        elements = [];
        td.css({'background-color':'rgb(85, 85, 85)', 'color':'yellow'});

        initialiserMemoire();
        memorisation();

        
        function initialiserMemoire() {
            for(i=0; i<td.length; i++) { 
                let clicked_syllabe = td[i].textContent;
                elements.push([clicked_syllabe,0]); 
            }
        }
        function memorisation() {
            $.each(td, function(){

                let compteur = 1;
                let syllabe_clique = $(this).text();
                let td_index = $(this).index();
                
                $(this).click(function(){
                    let n = compteur++;
                    elements.splice(td_index,1,[syllabe_clique,n]);
                    console.log(elements);
                });
            });
        }
    }
    function mettreEnSurbrillance(element) {
        element.addClass('surbrillance');
        element.siblings().removeClass('surbrillance');
    }
    function mix2D(tableau){
        var mixted_table = [];
        for(var i=0; mixted_table.length<tableau[0].length*tableau[1].length;i++){
            var nbr_aleatoire0 = Math.floor(Math.random()*tableau[0].length);
            var nbr_aleatoire1 = Math.floor(Math.random()*tableau[1].length);
            
            var element_aleatoire0 = tableau[0][nbr_aleatoire0];
            var element_aleatoire1 = tableau[1][nbr_aleatoire1];
            
            var element_aleatoire = element_aleatoire1+element_aleatoire0;
            if($.inArray(element_aleatoire, mixted_table)==-1){ mixted_table[mixted_table.length] = element_aleatoire; }
        }
        return mixted_table;
    }
    function mix3D(tableau){
        var mixted_table = [];
        for(var i=0; mixted_table.length<tableau[0].length*tableau[1].length*tableau[4].length;i++){
            var nbr_aleatoire0 = Math.floor(Math.random()*tableau[0].length);
            var nbr_aleatoire1 = Math.floor(Math.random()*tableau[1].length);
            var nbr_aleatoire4 = Math.floor(Math.random()*tableau[4].length);
            
            var element_aleatoire0 = tableau[0][nbr_aleatoire0];
            var element_aleatoire1 = tableau[1][nbr_aleatoire1];
            var element_aleatoire4 = tableau[4][nbr_aleatoire4];
            
            var element_aleatoire = element_aleatoire1+element_aleatoire0+element_aleatoire4;
            if($.inArray(element_aleatoire, mixted_table)==-1){ mixted_table[mixted_table.length] = element_aleatoire; }
        }
        return mixted_table;
    }
    function mix4D(tableau){
        var mixted_table = [];
        for(var i=0; mixted_table.length<tableau[0].length*tableau[1].length*tableau[4].length*tableau[5].length;i++){
            var nbr_aleatoire0 = Math.floor(Math.random()*tableau[0].length);
            var nbr_aleatoire1 = Math.floor(Math.random()*tableau[1].length);
            var nbr_aleatoire4 = Math.floor(Math.random()*tableau[4].length);
            var nbr_aleatoire5 = Math.floor(Math.random()*tableau[5].length);
            
            var element_aleatoire0 = tableau[0][nbr_aleatoire0];
            var element_aleatoire1 = tableau[1][nbr_aleatoire1];
            var element_aleatoire4 = tableau[4][nbr_aleatoire4];
            var element_aleatoire5 = tableau[5][nbr_aleatoire5];
            
            var element_aleatoire = element_aleatoire1+element_aleatoire0+element_aleatoire5+element_aleatoire4;
            if($.inArray(element_aleatoire, mixted_table)==-1){ mixted_table[mixted_table.length] = element_aleatoire; }
        }
        return mixted_table;
    }
    function montrerPanneauDesCaracteres() {

     /*Par defaut, voyelles_container, nasalisations_container et tons_container sont masqués*/
        if(matiere_nom == "ߜߋ߲߭") {
            masquer($("#caracteres_container > div"));
            afficher($("#consonnes_container"));

            setTimeout(() => {
                $('#afficheur_de_panneau').html("<p>ߛߌ߬ߙߕߊ߬ ߥߟߊ ߘߏ߲߰</p>");
                clignoterUneFois($('#afficheur_de_panneau'));
            }, 400); 
        }
        
        $('#panneaux').css({ "height":"22rem" });
        $('#caracteres_cadre').css({ "height":"max-content" });
        $("#caracteres_container").css("height","max-content");
        $('#caracteres_container').animate({"top":0}, 250);
    }
    function montrerReponse(question,element_correspondant) {
        $.each(element_correspondant, function () {
            let reponse = $(this);
            if(question == reponse.text()) {
                reponse.css("border-color","orange");
                setTimeout(() => { reponse.css("border-color","rgb(85,85,85)"); }, 600);
            }
        });
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function niveauMaxDuServeur() {
        let datas = JSON.parse(sessionStorage.getItem('datas'));
        let niveaux = [];
        let niveau_max = 0;

        for (let i = 0; i < datas.length; i++) {
            if(datas[i].length != 0) {niveaux.push(i);}
        }
        niveau_max = Math.max(...niveaux)+1;
        return niveau_max;
    }
    function nomDeLaMatiereSuivante() {
        let ms = "";
        let niveau_actif = JSON.parse(sessionStorage.getItem("niveau_actif"));

        if(niveau_actif == 1) ms = "ߜߋ߲߲߭";
        if(niveau_actif == 2) ms = "ߞߊ߲ߡߊߛߙߋ";
        if(niveau_actif == 3) ms = "ߖߊ߰ߕߋ߬ߘߋ߲";

        return ms;
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/
    
    function paire(nombre) {
        let test = (nombre%2 === 0) ? true : false;
        return test;
    }
    function panneauxStyle(memoire_consonnes_choisies) {

        memoire_consonnes_choisies = memoireConsonnesChoisies();

        $.each($(".parametres_container input"), function() {
            if($(this).prop("checked") == true) {
                let caractere_de_parametre = $(this).prop("value");
                
                $.each($('#panneaux span'), function () {
                    let panneaux_span = $(this);
                    let panneaux_consonne = ($(this).text());
                    if (caractere_de_parametre == panneaux_consonne) panneaux_span.css("background-color","rgb(170, 170, 170)");
                });
            }
        });
            
        $.each($('#panneaux span'), function () {

            let panneaux_span = $(this);
            let panneaux_consonne = ($(this).text());

            if (memoire_consonnes_choisies.length > 0) {
                memoire_consonnes_choisies.forEach(element => {
                    if (element == panneaux_consonne) { panneaux_span.css({ 'color':'orange', 'font-weight':'bold', 'box-shadow':'none' }); }
                });
            }
        });
    }
    function parseIntNko(nombre_a_convertir){
        var numberToString = String(nombre_a_convertir);
        var stringToTable = numberToString.split('');
        var nombre_converti = [];
        
        for(i=0;i<stringToTable.length;i++){
            nombre_converti[nombre_converti.length] = chiffres[stringToTable[i]];
        }
        
        return nombre_converti.join('');
    }
    function phasesEtudieesDuServeur() {

        let datas = JSON.parse(sessionStorage.getItem('datas'));
        let niveau_max = JSON.parse(sessionStorage.getItem('niveau_max'));
        niveau_max = (niveau_max == undefined) ? 0 : niveau_max;
        let peds = [];

        let matiere = datas[niveau_max];
        matiere = (matiere == undefined) ? [] : matiere;

        if(matiere.length == 0) {
            console.log("Cette matiere est vide !");
            peds = [];
        }
        if(matiere.length != 0) {
            for (let i = 0; i < datas[niveau_max].length; i++) {
                if(datas[niveau_max][i] != undefined) peds.push(datas[niveau_max][i].phase);
            }  
        }
        
        return peds;
    }
    function pourcentagePoint(memoire) {
        if(memoire != null) {
            let pp = 0;
            let tp = 0;
            for(let i=0; i<memoire.length; i++) { tp += memoire[i][2]; }
            pp = Math.floor(tp*100/memoire.length);
            return pp;
        }
    }
    function profileResulat() {

        chargerLeResulat();
        afficherLeResulat();
        fermerLeResulat();

        function chargerLeResulat() {

            let datas = JSON.parse(sessionStorage.getItem('datas'));
            // let lessons_etudier = calculDesLessonsEtudiees();

            resultatGeneral(datas);
        }
        function afficherLeResulat() {
            $('#afficheur_du_resultat').click(() => {
                $('#profile_resultat').css('display','block');
            });
        }
        function fermerLeResulat() {
            $('#fermer_resultat').click(() => {
                $('#profile_resultat').css('display','none');
            });
        }
        function calculDesLessonsEtudiees() {
            
            let lessons=[[],[],[],[]];
            let lessons_d_alphabet=[], lessons_de_syllabes=[], lessons_de_tons=[], lessons_de_chiffres=[];

            for (let i = 0; i < datas.length; i++) {
                if(datas[i] != undefined) {
                    for (let j = 0; j < datas[i].length; j++) {
                        if(datas[i][j] != undefined) {
                            lessons[i][j] = [datas[i][j].date, datas[i][j].niveau, datas[i][j].phase, datas[i][j].lesson, datas[i][j].note];
                        }
                    }
                }
            }
            
            let lessons_trier_par_matiere = triDesLessonsParMatiere(lessons);
            let lessons_trier_par_phase = triDesLessonsParPhase(lessons_trier_par_matiere); 

            return lessons_trier_par_phase;

            function triDesLessonsParMatiere(lessons) {
                let tri = [];
                for (let i = 0; i < lessons.length; i++) {
                    for (let j = 0; j < 1; j++) {
                        if(lessons[i][j] != undefined) {
                            if(lessons[i][j][2].split("_")[0] == "alphabet") { lessons_d_alphabet = lessons[i]; }
                            if(lessons[i][j][2].split("_")[0] == "syllabe") { lessons_de_syllabes = lessons[i]; }
                            if(lessons[i][j][2].split("_")[0] == "tons") { lessons_de_tons = lessons[i]; }
                            if(lessons[i][j][2].split("_")[0] == "chiffres") { lessons_de_chiffres = lessons[i]; }
                        }
                    }
                }
                tri = [lessons_d_alphabet, lessons_de_syllabes, lessons_de_tons, lessons_de_chiffres];
                return tri;
            }
            function triDesLessonsParPhase(lessons_trier_par_matiere) {
                let tri = [[],[],[],[]];

                for (let i = 0; i < lessons_trier_par_matiere.length; i++) {
                    for (let j = 0; j < lessons_trier_par_matiere[i].length; j++) {
                            if(lessons_trier_par_matiere[i][j] != undefined) {
                            if(lessons_trier_par_matiere[i][j][2].split("_")[1] == "apprentissage") { tri[i][0] = lessons_trier_par_matiere[i][j]; }
                            if(lessons_trier_par_matiere[i][j][2].split("_")[1] == "exercice") { tri[i][1] = lessons_trier_par_matiere[i][j]; }
                            if(lessons_trier_par_matiere[i][j][2].split("_")[1] == "revision") { tri[i][2] = lessons_trier_par_matiere[i][j]; }
                            if(lessons_trier_par_matiere[i][j][2].split("_")[1] == "evaluation") { tri[i][3] = lessons_trier_par_matiere[i][j]; }
                        }
                    }
                }

                return tri;
            }
        }
    }
    function progressBarDApprentissage(td,qtite_click) {
        /*
        td est les td de la table à cliquer.
        qtite_click est le nombre de fois qu'un td doit être cliquer.
        */

        let progress_unity = 100 / [td.length * qtite_click];
        let good_response_width = 0;
        let total_des_clicks = 0;

        initialiserProgressBar();

        $.each(td, function () {
            let compteur_td_click = 0;

            $(this).click(function () {
                if (compteur_td_click < qtite_click) {
                    compteur_td_click++;
                    total_des_clicks++;
                    good_response_width += progress_unity;
                    $('.progress_bonne_reponse_bar').css('width', good_response_width + '%');
                }
                
                if (total_des_clicks / qtite_click == td.length) {
                    compteur_td_click = 0;
                    good_response_width = 0;
                    total_des_clicks = 0;
                }
            });
        });
    }
	function prononcer(){
		id=this.id;
	
		son.src = "son/mp3"+id+".mp3";
		son.src = "son/ogg"+id+".ogg";
		son.src = "son/mp4"+id+".mp4";
		
		son.play();
	}
    function pusher(tableau,element) {
        let element_index = tableau.indexOf(element);
        if(element_index === -1) { tableau.push(element); }
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function questions(tableau) {
        let qr = [];
        for(let i=0; i<tableau.length; i++) {
            qr.push(tableau[i][0]);
        }
        qr = malaxer(qr);
        return qr;
    }
    

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function raffraichirLaPage() { location = location; }
    function rappel(button) {
        setTimeout(() => { button.css('box-shadow','none'); }, 100);
        setTimeout(() => { button.css('box-shadow','0 0 3rem #000'); }, 200);
        setTimeout(() => { button.css('box-shadow','none'); }, 300);
        setTimeout(() => { button.css('box-shadow','0 0 3rem #000'); }, 400);
        setTimeout(() => { button.css('box-shadow','none'); }, 500);
        setTimeout(() => { button.css('box-shadow','0 0 3rem #000'); }, 600);
        setTimeout(() => { button.css('box-shadow','none'); }, 700);
        setTimeout(() => { button.css('box-shadow','0 0 3rem #000'); }, 800);
        setTimeout(() => { button.css('box-shadow','none'); }, 900);
        setTimeout(() => { button.css('box-shadow','0 0 1rem #666'); }, 1000);
    }
    function reagirAuClickDeDialogueBtns() {
        $.each($('.dialogue_btns > div'), function(){
            $(this).click(function() {
                $('.dialogue_btns').css('box-shadow','none');
            });
        });
    }
    function rectificationDeReponse(text_container,texte) {
        $('.correcteur').on('click',function() {
            texte.pop();
            text_container.html(texte);
        });
    }
    function recapitulatifDuResultat1(ligne1_td, ligne2_td, ligne3_td, matiere) {

        let lesson_1 = (matiere[0] == undefined) ? {} : JSON.parse(matiere[0].lesson);
        let lesson_2 = (matiere[1] == undefined) ? {} : JSON.parse(matiere[1].lesson);
        let lesson_3 = (matiere[2] == undefined) ? {} : JSON.parse(matiere[2].lesson);

        let question_total_1 = lesson_1.length;
        let question_total_2 = lesson_2.length;
        let question_total_3 = lesson_3.length;

        let vrais_reponses_1 = calculerPoint(lesson_1);
        let vrais_reponses_2 = calculerPoint(lesson_2);
        let vrais_reponses_3 = calculerPoint(lesson_3);

        let fausses_reponses_1 = question_total_1 - vrais_reponses_1;
        let fausses_reponses_2 = question_total_1 - vrais_reponses_2;
        let fausses_reponses_3 = question_total_1 - vrais_reponses_3;

        ligne1_td[2].innerHTML = parseIntNko(question_total_1);
        ligne1_td[3].innerHTML = parseIntNko(vrais_reponses_1);
        ligne1_td[4].innerHTML = parseIntNko(fausses_reponses_1);
        ligne1_td[5].innerHTML = parseIntNko(vrais_reponses_1);

        ligne2_td[1].innerHTML = parseIntNko(question_total_2);
        ligne2_td[2].innerHTML = parseIntNko(vrais_reponses_2);
        ligne2_td[3].innerHTML = parseIntNko(fausses_reponses_2);
        ligne2_td[4].innerHTML = parseIntNko(vrais_reponses_2);

        ligne3_td[1].innerHTML = parseIntNko(question_total_3);
        ligne3_td[2].innerHTML = parseIntNko(vrais_reponses_3);
        ligne3_td[3].innerHTML = parseIntNko(fausses_reponses_3);
        ligne3_td[4].innerHTML = parseIntNko(vrais_reponses_3);
    }
    function recapitulatifDuResultat2(ligne1_td, ligne2_td, ligne3_td, ligne4_td, matiere) {

        let lesson_1 = (matiere[0] == undefined) ? {} : JSON.parse(matiere[0].lesson);
        let lesson_2 = (matiere[1] == undefined) ? {} : JSON.parse(matiere[1].lesson);
        let lesson_3 = (matiere[2] == undefined) ? {} : JSON.parse(matiere[2].lesson);
        let lesson_4 = (matiere[3] == undefined) ? {} : JSON.parse(matiere[3].lesson);

        let question_total_1 = lesson_1.length;
        let question_total_2 = lesson_2.length;
        let question_total_3 = lesson_3.length;
        let question_total_4 = lesson_4.length;

        let vrais_reponses_1 = calculerPoint(lesson_1);
        let vrais_reponses_2 = calculerPoint(lesson_2);
        let vrais_reponses_3 = calculerPoint(lesson_3);
        let vrais_reponses_4 = calculerPoint(lesson_4);

        let fausses_reponses_1 = question_total_1 - vrais_reponses_1;
        let fausses_reponses_2 = question_total_2 - vrais_reponses_2;
        let fausses_reponses_3 = question_total_3 - vrais_reponses_3;
        let fausses_reponses_4 = question_total_4 - vrais_reponses_4;

        ligne1_td[2].innerHTML = parseIntNko(question_total_1);
        ligne1_td[3].innerHTML = parseIntNko(vrais_reponses_1);
        ligne1_td[4].innerHTML = parseIntNko(fausses_reponses_1);
        ligne1_td[5].innerHTML = parseIntNko(vrais_reponses_1);

        ligne2_td[1].innerHTML = parseIntNko(question_total_2);
        ligne2_td[2].innerHTML = parseIntNko(vrais_reponses_2);
        ligne2_td[3].innerHTML = parseIntNko(fausses_reponses_2);
        ligne2_td[4].innerHTML = parseIntNko(vrais_reponses_2);

        ligne3_td[1].innerHTML = parseIntNko(question_total_3);
        ligne3_td[2].innerHTML = parseIntNko(vrais_reponses_3);
        ligne3_td[3].innerHTML = parseIntNko(fausses_reponses_3);
        ligne3_td[4].innerHTML = parseIntNko(vrais_reponses_3);

        ligne4_td[1].innerHTML = parseIntNko(question_total_4);
        ligne4_td[2].innerHTML = parseIntNko(vrais_reponses_4);
        ligne4_td[3].innerHTML = parseIntNko(fausses_reponses_4);
        ligne4_td[4].innerHTML = parseIntNko(vrais_reponses_4);
    }
    function recupererDeLocalStorage(data) {return(JSON.parse(localStorage.getItem(data)));}
    function recupererDeSessionStorage(data) {return(JSON.parse(sessionStorage.getItem(data)));}
    function refuser(element) {
        
        $(element).addClass('faux');

        setTimeout(function(){ $('.faux').addClass('croix'); }, 100);
        setTimeout(function(){ $('.faux').removeClass('croix'); }, 600);
        setTimeout(function(){ $(element).removeClass('faux'); }, 600);
    }
    function relire(question, repetition_btn) { 
        repetition_btn.click(function () { 
            lire('ߊ', question); 
            clignoterUneFois(repetition_btn); 
        });
    }
    function rendreActif(element) {
        if(element.attr('class') != "cercle shadow") {
            element.siblings().removeClass("actif").css("display","none");
            element.addClass('actif'); 
        }else{
            element.addClass('actif'); 
        }
    }
    function resultat(memoire) {
        
        let nom = JSON.parse(sessionStorage.getItem('nom'));
        let prenom = JSON.parse(sessionStorage.getItem('prenom'));
        let etudiant = '<h1>'+prenom+' '+nom+'<h1>';
        let lesson_en_cours = $('.notification_titre').html();
        let lesson_suivante = lessonSuivante();
        let total_question = memoire.length;
        let total_bonne_reponse = totalPoint();
        let total_fausse_reponse = total_question - total_bonne_reponse;
        let taux_de_vraie_reponse = '%'+parseIntNko(Math.floor(total_bonne_reponse*100/total_question));
        let taux_acceptable_de_vraie_reponse = (lesson_active = 'pre_exercice') ? 100 : 92;
        let continu_sur_l_etape_suivante = '<b id="avance">'+lesson_suivante+'</b>';

        if(lesson_suivante == 'ߥߊ߫ '+lesson_en_cours+' ߡߊ߬') { $('.notification_titre').html('ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'); }

        chargerResultatEntete();
        chargerResultatHead();
        chargerResultatBody();
        chargementDuResultatFoot();
        chargerDeliberation();
        
        function chargerResultatEntete() {
            $('#resultat_titre').html('<h3>ߒߞߏ߫ ߛߓߍ ߘߋ߰ߟߌ ߝߏ߲߬ߝߏ߲</h3>'); 
            $('#etudiant').html(etudiant+' ߓߟߏ߫');
        }
        function chargerResultatHead() {

            let d = new Date();
    
            let an = d.getFullYear();
            let lune = d.getMonth();
            let date = d.getDate();
            let jour = d.getDay();
            let heure = d.getHours();
            let minute = d.getMinutes();

            $('#resultat_date').text(jours[jour]+' '+mois[lune]+' ߕߟߋ߬ '+parseIntNko(date)+' ߛߊ߲߭ '+parseIntNko(an));
            $('#resultat_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
        }
        function chargerResultatBody() {

            let table_body_html = resultatTableBodyHTML(memoire);
            let total_point = totalPoint();
                
            $('.table_body').html(table_body_html);
            $('#total_question_1').html(parseIntNko(memoire.length));
            $('#total_reponse').html(parseIntNko(memoire.length));
            $('#total_point_1').html(parseIntNko(total_point));
        }
        function chargementDuResultatFoot() {
            $('#total_question_2').text(parseIntNko(total_question));
            $('#total_bonne_reponse').text(parseIntNko(total_bonne_reponse));
            $('#total_fausse_reponse').text(parseIntNko(total_fausse_reponse));
            $('#total_point_2').text(parseIntNko(total_bonne_reponse));
            $('#pourcentage_point').text(taux_de_vraie_reponse);
        }
        function chargerDeliberation() {
            if(taux_de_vraie_reponse < taux_acceptable_de_vraie_reponse) {
                $('#deliberation').html('ߌ ߖߌߖߊ߬ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ '+lesson_en_cours+' ߓߍ߬ߙߍ ߡߊ߫ ߤߊߟߌ߬ ߁߈ ߓߐ߫. ߏ߬ߘߐ߬߸ ߌ ߞߐߛߍ߬ߦߌ߬ ߦߊ߲߬ ߡߊ߫. <b id="reprendre">'+lesson_en_cours+' ߞߍ߫ ߕߎ߲߯</b>');
            }else{
                $('#deliberation').html(
                    'ߌ ߞߎߟߎ߲ߖߋ߫ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ ߘߐ߬ߖߊ ߟߊ߫ '+lesson_en_cours+' ߟߐ߲ ߠߊ߫ ߤߊ߲߯ '+$('#pourcentage_point').text()+
                    '</b> ߟߊ߫. ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ '+lesson_suivante+'.<br/>'+
                    'ߣߴߌ ߟߊ߫ ߓߍ߬ߙߍ ߡߴߌ ߥߛߊ߬߸ <b id="reprendre">'+lesson_en_cours+' ߞߍ߫ ߕߎ߲߯</b><br/>'+
                    'ߣߴߌ ߟߊ߫ ߓߍ߬ߙߍ ߞߵߌ ߥߛߊ߬߸ '+continu_sur_l_etape_suivante
                );
            }
        }
        function totalPoint() {
            let html = 0;
            for(let i=0; i<memoire.length; i++) { html += memoire[i][2]; }
            return html;
        }
        function lessonSuivante() {
            let ls = '';
            switch(lesson_en_cours) {
                case 'ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ' : ls = 'ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫'; break;
                case 'ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ' : ls = 'ߛߓߍߛߎ߲ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫'; break;
                case 'ߛߓߍߛߎ߲ ߣߐ߰ߡߊ߬ߛߍߦߌ' : ls = 'ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߥߴߊ߬ ߡߊ߬'; break;

                case 'ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ' : ls = 'ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫'; break;
                case 'ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ' : ls = 'ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫'; break;
                case 'ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ' : ls = 'ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߍ߫'; break;
                case 'ߜߋ߲߭ ߞߘߐߓߐߟߌ' : ls = 'ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߥߴߊ߬ ߡߊ߬'; break;
            }
            return ls;
        }
    }
    function resultatDeLaMatiere(matiere,matiere_nom) {

        let lesson_1={}, lesson_2={}, lesson_3={},lesson_4={};
        
        if(matiere != undefined) {
            lesson_1 = (matiere[0] == undefined) ? {} : matiere[0];
            lesson_2 = (matiere[1] == undefined) ? {} : matiere[1];
            lesson_3 = (matiere[2] == undefined) ? {} : matiere[2];
            lesson_4 = (matiere[3] == undefined) ? {} : matiere[3];
        }

        let nom = JSON.parse(sessionStorage.getItem('nom'));
        let prenom = JSON.parse(sessionStorage.getItem('prenom'));
        let lesson_en_cours = $('.notification_titre').html();
        let lesson_actuelle = lessonActuelle(lesson_en_cours);
        let total_point = totalPoint(lesson_actuelle);
        let moyenne_d_evaluation = 1;
        let lesson_suivante = lessonSuivante(lesson_en_cours);
        let continu_sur_l_etape_suivante = '<b id="avance"><a href="/kouroukan/php/programmes.php">'+lesson_suivante+'</a></b>';

        chargerResultatDeLaMatiereEntete();
        chargerResultatDeLaMatiereCorps();
        chargerResultatDeLaMatierePied();
        // chargerDeliberation();
        afficherResultatDeLaMatiere();
        // reprendreLesson();
    
        $('#fermer_resultat').click(function() { masquerResultatDeLaMatiere(); });


        function chargerResultatDeLaMatiereEntete() { 
            $('#etudiant').html('<h1>'+prenom+' '+nom+'</h1> <span>ߟߊ߫</span>');
            $('#resultat_titre').html('<h3>ߒߞߏ߫ ߛߓߍ ߘߋ߰ߟߌ ߝߏ߲߬ߝߏ߲</h3>'); 
        }
        function chargerResultatDeLaMatiereCorps() {

            chargerResultatDApprentissageCorps();
            chargerResultatDExerciceCorps();
            chargerResultatDeRevivsionCorps();
            chargerResultatDEvaluationCorps();
                
            function chargerResultatDApprentissageCorps() {

                chargerResultatHead();
                chargerResultatBody();
                chargerResultatFoot();
            
                function chargerResultatHead() {
                    if(Object.keys(lesson_1).length === 0) {
                        $('#phase_d_apprentissage').text(matiere_nom+' '+liste_de_phases[0][1]);
                        $('#apprentissage_date').text(" - ");
                        $('#apprentissage_heure').text(" - ");
                    }
                    if(Object.keys(lesson_1).length > 0) {

                        let d = lesson_1.date;
                        let an = d.split("-")[0];
                        let lune = d.split("-")[1];
                        let date = d.split("-")[2];
                        let jour = date.split(" ")[0];
                        let temps = date.split(" ")[1];
                        let heure = temps.split(":")[0];
                        let minute = temps.split(":")[1];
                        
                        $('#phase_d_apprentissage').text(matiere_nom+' '+liste_de_phases[0][1]);
                        $('#apprentissage_date').text(mois[parseInt(lune-1)]+' ߕߟߋ߬ '+parseIntNko(jour)+' ߛߊ߲߭ '+parseIntNko(an));
                        $('#apprentissage_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                    }
                }
                function chargerResultatBody() {
                    if(Object.keys(lesson_1).length === 0) {
                        $('#apprentissage_resultat_body').html(contenuVide()); 
                        $('#total_d_apprentissage_question').html("");
                        $('#total_d_apprentissage_reponse').html("");
                        $('#total_d_apprentissage_point').html("");
                    } 
                    if(Object.keys(lesson_1).length > 0) {
                        $("#resultat_d_apprentissage_corps").css("display","block");

                        let lesson = JSON.parse(lesson_1.lesson);
                        let apprentissage_resultat_body_html = resultatTableBodyHTML(lesson);

                        $('#apprentissage_resultat_body').html(apprentissage_resultat_body_html);
                        $('#total_d_apprentissage_question').html(parseIntNko(lesson.length));
                        $('#total_d_apprentissage_reponse').html(parseIntNko(lesson.length));
                        $('#total_d_apprentissage_point').html(parseIntNko(sommePoint(lesson)));
                    }
                }
                function chargerResultatFoot() {
                    if(Object.keys(lesson_1).length === 0) {
                        $('#total_general_des_questions').text("");
                        $('#total_general_des_bonnes_reponses').text("");
                        $('#pourcentage_point').text("");
                    }
                    if(Object.keys(lesson_1).length > 0) {
                    
                        let lesson = JSON.parse(lesson_1.lesson);
                        let total_des_questions = parseIntNko(lesson.length);
                        let total_des_points = parseIntNko(sommePoint(lesson));
                        let pourcentage_des_points = '%'+parseIntNko(Math.floor(reverseIntNko(total_des_points)*100/reverseIntNko(total_des_questions)));
                        
                        $('#total_general_des_questions').text(total_des_questions);
                        $('#total_general_des_bonnes_reponses').text(total_des_points);
                        $('#pourcentage_point').text(pourcentage_des_points);
                    }
                }
            }
            function chargerResultatDExerciceCorps() {

                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {
                    if(Object.keys(lesson_2).length === 0) {
                        $('#phase_d_exercice').text(matiere_nom+' '+liste_de_phases[1][1]);
                        $('#exercice_date').text(" - ");
                        $('#exercice_heure').text(" - ");
                    }
                    if(Object.keys(lesson_2).length != 0) {

                        let d = lesson_2.date;
                        let an = d.split("-")[0];
                        let lune = d.split("-")[1];
                        let date = d.split("-")[2];
                        let jour = date.split(" ")[0];
                        let temps = date.split(" ")[1];
                        let heure = temps.split(":")[0];
                        let minute = temps.split(":")[1];
                        
                        $('#phase_d_exercice').text(matiere_nom+' '+liste_de_phases[1][1]);
                        $('#exercice_date').text(mois[parseInt(lune-1)]+' ߕߟߋ߬ '+parseIntNko(jour)+' ߛߊ߲߭ '+parseIntNko(an));
                        $('#exercice_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                    }
                }
                function chargerResultatBody() {
                    if(Object.keys(lesson_2).length === 0) {
                        $('#exercice_resultat_body').html(contenuVide()); 
                        $('#total_d_exercice_question').html("");
                        $('#total_d_exercice_reponse').html("");
                        $('#total_d_exercice_point').html("");
                    }
                    if(Object.keys(lesson_2).length != 0) {
                            
                        $("#resultat_d_exercice_corps").css("display","block");

                        let lesson = JSON.parse(lesson_2.lesson);
                        let exercice_resultat_body_html = resultatTableBodyHTML(lesson);

                        $('#exercice_resultat_body').html(exercice_resultat_body_html);
                        $('#total_d_exercice_question').html(parseIntNko(lesson.length));
                        $('#total_d_exercice_reponse').html(parseIntNko(lesson.length));
                        $('#total_d_exercice_point').html(parseIntNko(sommePoint(lesson)));
                    }
                }
            }
            function chargerResultatDeRevivsionCorps() {

                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {
                    if(Object.keys(lesson_3).length === 0) {
                        $('#phase_de_revision').text(matiere_nom+' '+liste_de_phases[2][1]);
                        $('#revision_date').text(" - ");
                        $('#revision_heure').text(" - ");
                    }
                    if(Object.keys(lesson_3).length != 0) {

                        let d = lesson_3.date;
                        let an = d.split("-")[0];
                        let lune = d.split("-")[1];
                        let date = d.split("-")[2];
                        let jour = date.split(" ")[0];
                        let temps = date.split(" ")[1];
                        let heure = temps.split(":")[0];
                        let minute = temps.split(":")[1];
                    
                        $('#phase_de_revision').text(matiere_nom+' '+liste_de_phases[2][1]);
                        $('#revision_date').text(mois[parseInt(lune-1)]+' ߕߟߋ߬ '+parseIntNko(jour)+' ߛߊ߲߭ '+parseIntNko(an));
                        $('#revision_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                    }
                }
                function chargerResultatBody() {
                    
                    if(Object.keys(lesson_3).length === 0) {
                        $('#revision_resultat_body').html(contenuVide()); 
                        $('#total_de_revision_question').html("");
                        $('#total_de_revision_reponse').html("");
                        $('#total_de_revision_point').html("");
                    }
                    if(Object.keys(lesson_3).length != 0) {
                            
                        $("#resultat_de_revision_corps").css("display","block");

                        let lesson = JSON.parse(lesson_3.lesson);
                        let revision_resultat_body_html = resultatTableBodyHTML(lesson);

                        $('#revision_resultat_body').html(revision_resultat_body_html);
                        $('#total_de_revision_question').html(parseIntNko(lesson.length));
                        $('#total_de_revision_reponse').html(parseIntNko(lesson.length));
                        $('#total_de_revision_point').html(parseIntNko(sommePoint(lesson))); 
                    }
                }
            }
            function chargerResultatDEvaluationCorps() {

                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {
                    if(Object.keys(lesson_4).length === 0) {
                        $('#phase_d_evaluation').text(matiere_nom+' '+liste_de_phases[3][1]);
                        $('#evaluation_date').text(" - ");
                        $('#evaluation_heure').text(" - ");
                    }
                    if(Object.keys(lesson_4).length != 0) {
                       
                        let d = lesson_4.date;
                        let an = d.split("-")[0];
                        let lune = d.split("-")[1];
                        let date = d.split("-")[2];
                        let jour = date.split(" ")[0];
                        let temps = date.split(" ")[1];
                        let heure = temps.split(":")[0];
                        let minute = temps.split(":")[1];
                        
                        $('#phase_d_evaluation').text(matiere_nom+' '+liste_de_phases[3][1]);
                        $('#evaluation_date').text(mois[parseInt(lune-1)]+' ߕߟߋ߬ '+parseIntNko(jour)+' ߛߊ߲߭ '+parseIntNko(an));
                        $('#evaluation_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute)); 
                    }
                }
                function chargerResultatBody() {
                        
                    if(Object.keys(lesson_4).length === 0) {
                        $('#evaluation_resultat_body').html(contenuVide());
                        $('#total_d_evaluation_question').html("");
                        $('#total_d_evaluation_reponse').html("");
                        $('#total_d_evaluation_point').html("");
                    }
                    if(Object.keys(lesson_4).length != 0) {
                            
                        $("#resultat_d_evaluation_corps").css("display","block");

                        let lesson = JSON.parse(lesson_4.lesson);
                        let evaluation_resultat_body_html = resultatTableBodyHTML(lesson);
                        
                        $('#evaluation_resultat_body').html(evaluation_resultat_body_html);
                        $('#total_d_evaluation_question').html(parseIntNko(lesson.length));
                        $('#total_d_evaluation_reponse').html(parseIntNko(lesson.length));
                        $('#total_d_evaluation_point').html(parseIntNko(sommePoint(lesson))); 
                    }
                }
            }
        }
        function chargerResultatDeLaMatierePied() {
 
            lesson_1 = (Object.keys(lesson_1).length != 0) ? JSON.parse(lesson_1.lesson) : undefined;
            lesson_2 = (Object.keys(lesson_2).length != 0) ? JSON.parse(lesson_2.lesson) : undefined;
            lesson_3 = (Object.keys(lesson_3).length != 0) ? JSON.parse(lesson_3.lesson) : undefined;
            lesson_4 = (Object.keys(lesson_4).length != 0) ? JSON.parse(lesson_4.lesson) : undefined;
            
            let total_des_questions = totalDesQuestions();
            let total_general_des_points = totalDesPoints();
            let pourcentage_general_des_points = pourcentagePoint();
       
            $('#total_general_des_questions').text(total_des_questions);
            $('#total_general_des_bonnes_reponses').text(total_general_des_points);
            $('#pourcentage_general_des_points').text(pourcentage_general_des_points);

            function totalDesQuestions() {
                let total_question = 0;  
                if(lesson_1 != undefined) if(lesson_2 != undefined) if(lesson_3 != undefined) if(lesson_4 == undefined) total_question = lesson_1.length + lesson_2.length + lesson_3.length;
                if(lesson_1 != undefined) if(lesson_2 != undefined) if(lesson_3 != undefined) if(lesson_4 != undefined) total_question = lesson_1.length + lesson_2.length + lesson_3.length + lesson_4.length;
                if(lesson_1 == undefined) if(lesson_2 == undefined) if(lesson_3 == undefined) if(lesson_4 == undefined) 0;
                total_question = (total_question === 0) ? "" : parseIntNko(total_question);
                return total_question;
            }
            function totalDesPoints() {
                let total_point = 0;
                if(lesson_4 == undefined) total_point = sommePoint(lesson_1) + sommePoint(lesson_2) + sommePoint(lesson_3);
                if(lesson_4 != undefined) total_point = sommePoint(lesson_1) + sommePoint(lesson_2) + sommePoint(lesson_3) + sommePoint(lesson_4); 
                total_point = (total_point === 0) ? "" : parseIntNko(total_point);
                return total_point;
            }
            function pourcentagePoint() {
                let pourcentage_general_des_points = (total_general_des_points == "") ? "" : "%"+parseIntNko(Math.floor(reverseIntNko(total_general_des_points)*100/reverseIntNko(total_des_questions)));
                return pourcentage_general_des_points;
            }
        }
        function chargerDeliberation() {
            matiere_nom = $('#resultat_corps h3').text().split(" ")[0];
            if(total_point < moyenne_d_evaluation) {
                $('#deliberation').html('ߌ ߖߌߖߊ߬ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ '+matiere_nom+' ߓߍ߬ߙߍ ߡߊ߫ ߤߊߟߌ߬ ߁߈ ߓߐ߫. ߏ߬ߘߐ߬߸ ߌ ߞߐߛߍ߬ߦߌ߬ ߦߊ߲߬ ߡߊ߫. <b id="reprendre">'+matiere_nom+' ߞߍ߫ ߕߎ߲߯</b>');
            }else{
                $('#deliberation').html(
                    'ߌ ߞߎߟߎ߲ߖߋ߫ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ ߘߐ߬ߖߊ ߟߊ߫ '+matiere_nom+' ߟߐ߲ ߠߊ߫ ߤߊ߲߯ '+$('#pourcentage_point').text()+
                    '</b> ߟߊ߫. ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ '+lesson_suivante+'.<br/>'+
                    'ߣߴߌ ߟߊ߫ ߓߍ߬ߙߍ ߡߴߌ ߥߛߊ߬߸ <b id="reprendre">'+matiere_nom+' ߞߍ߫ ߕߎ߲߯</b><br/>'+
                    'ߣߴߌ ߟߊ߫ ߓߍ߬ߙߍ ߞߵߌ ߥߛߊ߬߸ '+continu_sur_l_etape_suivante
                );
            }
        }
        function masquerResultatDeLaMatiere() { masquer($('.resultat_container')); }
        function afficherResultatDeLaMatiere() { 
            if(matiere_nom == "ߛߓߍߛߎ߲") $("#resultat_d_evaluation_corps").css("display","none");
            if(matiere_nom != "ߛߓߍߛߎ߲") $("#resultat_d_evaluation_corps").css("display","block");
            setTimeout(() => { afficher($('.resultat_container')); }, 3000);
        }
        function reprendreLesson() { $('#reprendre').click(() => { raffraichirLaPage(); }); }
        function lessonSuivante(lesson_en_cours) {
            let ls = '';
            switch(lesson_en_cours) {
                case 'ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ' : ls = 'ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫'; break;
                case 'ߛߓߍߛߎ߲ ߡߊ߬ߞߟߏ߬ߟߌ' : ls = 'ߛߓߍߛߎ߲ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫'; break;
                case 'ߛߓߍߛߎ߲ ߣߐ߰ߡߊ߬ߛߍߦߌ' : ls = 'ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߥߴߊ߬ ߡߊ߬'; break;
                case 'ߛߓߍߛߎ߲ ߞߘߐߓߐߟߌ' : ls = 'ߜߋ߲߭ ߘߋ߰ߟߌ ߘߊߡߌ߬ߘߊ߬'; break;

                case 'ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ' : ls = 'ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫'; break;
                case 'ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ' : ls = 'ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ ߞߍ߫'; break;
                case 'ߜߋ߲߭ ߣߐ߰ߡߊ߬ߛߍߦߌ' : ls = 'ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߍ߫'; break;
                case 'ߜߋ߲߭ ߞߘߐߓߐߟߌ' : ls = 'ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߥߴߊ߬ ߡߊ߬'; break;
            }
            return ls;
        }
        function lessonActuelle(lesson_en_cours) {
            
            let l = [];
            let m = (lesson_en_cours != undefined) ? lesson_en_cours.split(' ')[0] : '';
            let p = (lesson_en_cours != undefined) ? lesson_en_cours.split(' ')[1] : '';

            if(m == 'ߛߓߍߛߎ߲') {
                switch(p) {
                    case 'ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'  : l = (lesson_1 != "") ? lesson_1.lesson : []; break;
                    case 'ߡߊ߬ߞߟߏ߬ߟߌ'  : l = (lesson_2 != "") ? lesson_2.lesson : []; break;
                    case 'ߞߘߐߓߐߟߌ' : l = (lesson_3 != "") ? lesson_3.lesson : []; break;
                }
            }
            if(m == 'ߜߋ߲߭') {
                switch(p) {
                    case 'ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'  : l = (lesson_1 != "") ? lesson_1.lesson : []; break;
                    case 'ߡߊ߬ߞߟߏ߬ߟߌ'  : l = (lesson_2 != "") ? lesson_2.lesson : []; break;
                    case 'ߣߐ߰ߡߊ߬ߛߍߦߌ' : l = (lesson_3 != "") ? lesson_3.lesson : []; break;
                    case 'ߞߘߐߓߐߟߌ' : l = (lesson_4 != "") ? lesson_4.lesson : []; break;
                }
            }
    
            return l;
        }
    }
    function resultatGeneral(datas) {
        let matiere_1=datas[0], matiere_2=datas[1], matiere_3=datas[2],matiere_4=datas[3];
        let matiere_nom_1 = "", matiere_nom_2 = "", matiere_nom_3 = "", matiere_nom_4 = "";

        matiere_nom_1 = "ߛߓߍߛߎ߲";
        matiere_nom_2 = "ߜߋ߲߭";
        matiere_nom_3 = "ߞߊ߲ߡߊߛߙߋ";
        matiere_nom_4 = "ߖߊ߰ߕߋ߬ߘߋ߲";

     /* Affichage par défaut */
        $("#details_du_resultat").css("display","block"); 
        $("#recapitulatif_du_resultat").css("display","none"); 

        resultatDeLaMatiere(matiere_1, matiere_nom_1);
        $("#resultat_matieres_liste ul li").removeClass("li_actif");
        $("#resultat_matieres_liste ul li:nth-child(1)").addClass("li_actif");

     /* Affichage presonnalisé */
        $("#resultat_matieres_liste ul li:nth-child(1)").click(() => { 
            $("#details_du_resultat").css("display","block"); 
            $("#recapitulatif_du_resultat").css("display","none"); 

            resultatDeLaMatiere(matiere_1, matiere_nom_1); 
            $("#resultat_matieres_liste ul li").removeClass("li_actif");
            $("#resultat_matieres_liste ul li:nth-child(1)").addClass("li_actif"); 
        });

        $("#resultat_matieres_liste ul li:nth-child(2)").click(() => { 
            $("#details_du_resultat").css("display","block"); 
            $("#recapitulatif_du_resultat").css("display","none"); 

            resultatDeLaMatiere(matiere_2, matiere_nom_2); 
            $("#resultat_matieres_liste ul li").removeClass("li_actif");
            $("#resultat_matieres_liste ul li:nth-child(2)").addClass("li_actif"); 
        });

        $("#resultat_matieres_liste ul li:nth-child(3)").click(() => { 
            $("#details_du_resultat").css("display","block"); 
            $("#recapitulatif_du_resultat").css("display","none"); 

            resultatDeLaMatiere(matiere_3, matiere_nom_3); 
            $("#resultat_matieres_liste ul li").removeClass("li_actif");
            $("#resultat_matieres_liste ul li:nth-child(3)").addClass("li_actif"); 
        });

        $("#resultat_matieres_liste ul li:nth-child(4)").click(() => { 
            $("#details_du_resultat").css("display","block"); 
            $("#recapitulatif_du_resultat").css("display","none"); 

            resultatDeLaMatiere(matiere_4, matiere_nom_4); 
            $("#resultat_matieres_liste ul li").removeClass("li_actif");
            $("#resultat_matieres_liste ul li:nth-child(4)").addClass("li_actif"); 
        });

        $("#resultat_matieres_liste ul li:nth-child(5)").click(() => { 
            chargerRecapitulatifDuResultat();
            afficherRecapitulatifDuResultat();
        });

        function chargerRecapitulatifDuResultat() {
                
            let tr2_td = $("#recapitulatif_du_resultat tr:nth-child(2) td");
            let tr3_td = $("#recapitulatif_du_resultat tr:nth-child(3) td");
            let tr4_td = $("#recapitulatif_du_resultat tr:nth-child(4) td");
            
            let tr5_td = $("#recapitulatif_du_resultat tr:nth-child(5) td");
            let tr6_td = $("#recapitulatif_du_resultat tr:nth-child(6) td");
            let tr7_td = $("#recapitulatif_du_resultat tr:nth-child(7) td");
            let tr8_td = $("#recapitulatif_du_resultat tr:nth-child(8) td");
            
            let tr9_td = $("#recapitulatif_du_resultat tr:nth-child(9) td");
            let tr10_td = $("#recapitulatif_du_resultat tr:nth-child(10) td");
            let tr11_td = $("#recapitulatif_du_resultat tr:nth-child(11) td");
            let tr12_td = $("#recapitulatif_du_resultat tr:nth-child(12) td");
            
            let tr13_td = $("#recapitulatif_du_resultat tr:nth-child(13) td");
            let tr14_td = $("#recapitulatif_du_resultat tr:nth-child(14) td");
            let tr15_td = $("#recapitulatif_du_resultat tr:nth-child(15) td");
            let tr16_td = $("#recapitulatif_du_resultat tr:nth-child(16) td");

            recapitulatifDuResultat1(tr2_td, tr3_td, tr4_td, matiere_1);
            recapitulatifDuResultat2(tr5_td, tr6_td, tr7_td, tr8_td, matiere_2);
            recapitulatifDuResultat2(tr9_td, tr10_td, tr11_td, tr12_td, matiere_3);
            recapitulatifDuResultat2(tr13_td, tr14_td, tr15_td, tr16_td, matiere_4);
        }
        function afficherRecapitulatifDuResultat() {
            $("#details_du_resultat").css("display","none"); 
            $("#recapitulatif_du_resultat").css("display","block"); 

            $("#resultat_matieres_liste ul li").removeClass("li_actif");
            $("#resultat_matieres_liste ul li:nth-child(5)").addClass("li_actif"); 
        }
    }
    function resultatTableBodyHTML(memoire) {
        let html = '';

        html +=  '<tr class="thin">';
        if(memoire != undefined) {
            
            for(let j=0; j<memoire.length; j++) {
                let ordre = (j === 0) ? parseIntNko(j+1)+'߭' : parseIntNko(j+1)+'߲';
                html += '<td>'+ordre+'</td>';
            }
            html +=  '</tr>';

            html +=  '<tr class="bold">';
            for(let k=0; k<memoire.length; k++) { html += '<td>'+memoire[k][0]+'</td>'; }
            html +=  '</tr>';

            html +=  '<tr class="bold">';
            for(let l=0; l<memoire.length; l++) { html += '<td>'+memoire[l][1]+'</td>'; }
            html +=  '</tr>';

            html +=  '<tr class="bold">';
            for(let m=0; m<memoire.length; m++) { html += '<td>'+parseIntNko(memoire[m][2])+'</td>'; }
            html +=  '</tr>';
        }

        return html;
    }
    function retirerLeCaractere(caracteres_selectionnees,caractere) {
        let caractere_index = caracteres_selectionnees.indexOf(caractere);
        if(caractere_index != -1) { caracteres_selectionnees.splice(caractere_index,1); }
    }
    function retourALaPageDAcceuil() { window.location.replace("../kouroukan/index.php"); }
    function reverseIntNko(nombre_a_convertir){
        var nombre_converti = [];
        
        for(i=0;i<nombre_a_convertir.length;i++){
            nombre_converti[nombre_converti.length] = chiffres_latins[ chiffres.indexOf(nombre_a_convertir[i]) ];
        }
        nombre_converti = nombre_converti.join('');
        nombre_converti = parseInt(nombre_converti);
        
        return nombre_converti;
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/
	
    
    function secouer(element) { 
        element.addClass('clignotant'); 
        setTimeout(function() { 
            element.removeClass('clignotant');
            indexer($('p',element));
        }, 1200);
    }
    function selectionDeTr(tr) {
        tr.siblings().unwrap();
        $('#traducteur').remove();
        tr.wrap('<div id="tr_actif"></div>');
    }
    function selectionDesConsonnesDuPanneau(consonnes,caracteres_selectionnees) {
        let consonnes_a_selectionner = consonnesASelectionner(caracteres_selectionnees);
                     
        consonnes_a_selectionner.forEach(element => { 
            $.each(consonnes, function() {
            let consonne = $(this).text();
                if(consonne == element) {
                    $(this).click();
                    enregistrerLeCaractere(caracteres_selectionnees,consonne);
                }
            });
        });
    }
    function selectionnerLeCaractere(caractere) {
        $.each($("#caracteres_container span"), function() {
            let caractere_actif = $(this).text();
            if(caractere == caractere_actif) { $(this).click(); }
        });
    }
    function selectionnerLesConsonnes(consonne) {
        $.each($("#consonnes_container span"), function() {
            let consonne_actif = $(this).text();
            if(consonne == consonne_actif) { $(this).click(); }
        });
    }
    function selectionnerLesTons(ton) {
        $.each($("#tons_container span"), function() {
            let ton_actif = $(this).text();
            if(ton == ton_actif) { $(this).click(); }
        });
    }
    function selectionnerLesVoyelles(voyelle) {
        $.each($("#voyelles_container span"), function() {
            let voyelle_active = $(this).text();
            if(voyelle == voyelle_active) $(this).click();
        });
    }
    function sendLessonDataToDB(lesson_phase,lesson_data) {

        var id_client = JSON.parse(sessionStorage.getItem('id_client'));
        var matiere = JSON.parse(sessionStorage.getItem('matiere_active')); // Voir programmes.js fonction storagesDuProgramme()
        var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
        var phase   = lesson_phase;
        var lesson  = JSON.stringify(lesson_data);
        var note = totalPoint(lesson_data);
    
        const data_to_send = new URLSearchParams({
            id_client : id_client,
            matiere : matiere,
            niveau : niveau_actif,
            phase : phase,
            lesson : lesson,
            note : note
        }); 

        fetch("/kouroukan/php/actions.php", {
            method: "POST",
            body: data_to_send
        })
        .then(response => response.text())
        .catch(error => console.log(error));  
    }
    function sommePoint(memoire) {
        let html = 0;
        if(memoire != undefined) {
            for(let i=0; i<memoire.length; i++) { 
                html += memoire[i][2];
            }
        } 
        return html;
    }
	function softDisplay() {
	    var element = $('.soft_display');
	    var elements_secondaires = element.children();
	    
	   // alert( elements_secondaires ); 
	}
    function stylesDesCaracteres() {

        styleDeTonsSymboles();
        styleDesCaracteresDuPanneau();

        function styleDeTonsSymboles() {

            let caracteres_selectionnees = caracteresSelectionnees();
            let n = caracteres_selectionnees.length+1;
            let caractere_actif = $(".ton_symbole:nth-child("+n+")");

            indexer($(".actif")); 
            caractere_actif.prevAll().addClass("apprises");
            caractere_actif.addClass('actif shadow'); 
            caractere_actif.nextAll().addClass("a_apprendre");
        }
        function styleDesCaracteresDuPanneau() {
            $.each($("#panneaux span"), function() {
                let caractere_container = $(this);
                caractere_container.click(function() { marquerLeCaractereChoisi(caractere_container); });
            });
        }
    }
    function syllabesApprentisageDataMemo() {

        let datas = JSON.parse(sessionStorage.getItem('datas'));

        if(datas.length === 0) return;
        let sad = [];

        for (let i = 0; i < datas[0].length; i++) {
            let phase = datas[0][i].phase;
            if(phase == "syllabes_apprentissage") { sad = JSON.parse(datas[0][i].lesson); }
        }

        return sad;
    }
    function syllabesExerciceDataMemo() {
        
        let datas = JSON.parse(sessionStorage.getItem('datas'));

        if(datas.length === 0) return;
        let sed = [];

        for (let j = 0; j < datas[0].length; j++) {
            let phase = datas[0][j].phase;
            if(phase == "syllabes_exercice") { sedpedm = JSON.parse(datas[0][j].lesson); }
        }

        return sed;
    }
    function syllabesEvaluationDataMemo() {
        
        let datas = JSON.parse(sessionStorage.getItem('datas'));

        if(datas.length === 0) return;
        let s_e_d = [];

        for (let k = 0; k < datas[0].length; k++) {
            let phase = datas[0][k].phase;
            if(phase == "syllabes_revision") { s_e_d = JSON.parse(datas[0][k].lesson); }
            
        }
        
        return s_e_d;;
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function tableau2DVide(tableau) {

        let element_ln = 0;
        tableau.forEach(element => {
            if(element != undefined) element_ln += element.length;
        });
        if(element_ln === 0) { return true; }else{ return false; }
    }
    function togglePanneauDesConsonnes() {

        let panneau_height = $("#panneaux").height();

        $("#afficheur_de_panneau").click(function (e) {
            e.stopImmediatePropagation();
            $(this).removeClass('indicateur');
            if (panneau_height == 0) { montrerPanneauDesCaracteres(); panneau_height = 352; } else { cacherPanneauDesCaracteres(); panneau_height = 0; }
        }); 
    }
    function totalPoint(data) {
        if(data != null) {
            let tp = 0;
            for(let i=0; i<data.length; i++) {
                tp += data[i][2];
            }
            return  Math.floor(tp*100/data.length); 
        }
    }
    function triDuTableauParOrdreAlphabetique(table) {
        let elements_tries = [];

            table.forEach(function(element) {
                if(alphabet_nko[0][i] = element[0]) {
                    elements_tries.push(element);
                }
            });

        return elements_tries;
    }


/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function updateLessonData(id,lesson) {

        var action = "modifier_matiere_en_cours";
        var matiere = JSON.parse(sessionStorage.getItem('matiere_active')); // Voir programmes.js fonction storagesDuProgramme()
        var note = calculerNote(lesson);
        var lesson = JSON.stringify(lesson);

        const data_to_send = new URLSearchParams({
            id : id,
            action : action,
            matiere: matiere,
            lesson : lesson,
            note : note
        }); 

        fetch("/kouroukan/php/actions.php", {
            method: "POST",
            body: data_to_send
        })
        .then(response => response.text())
        .catch(error => console.log(error));  
    }
    function user(id_client,lesson_name,option) {
        user.id = id_client;
        user.lesson_name = lesson_name;
        user.option = option;
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/
      
    function valider(td) {
        
        var vraie_reponse = td.html();
        td.html(vraie_reponse+"<div id='coche_container'><p id='coche'>✓</p><p id='coche_couvercle'></p></div>");
        td.addClass('ombrage');
       
        $('#coche_container').css({
            'position':'absolute',
            'background-color':'#fff',
            'overflow':'hidden',
            'margin':0,
            'padding':0,
            'top':'-2rem',
            'left':'-2rem',
            'width':'2.5rem',
            'height':'2.5rem',
            'border-radius':'2.5rem',
            'z-index':1
        });
        $('#coche').css({
            'position':'absolute', 
            'display':'block',
            'margin':0,
            'padding':0,
            'width':'2.5rem', 
            'height':'2.5rem', 
            'line-height':'2.5rem', 
            'top':0,
            'left':0,
            'font-size':'1.75rem',
            'textAlign':'center', 
            'boxSizing':'border-box',
            'background-color':'#fff',
            'color':'blue',
            'rotate':'y 180deg',
            'z-index':0,
            'transition':'transform 0.6s'
        });
        $('#coche_couvercle').css({
            'position':'absolute', 
            'display':'block',
            'background-color':'#fff',
            'margin':0,
            'padding':0,
            'width':'2.5rem', 
            'height':'2.5rem',  
            'top':0,
            'left':0,
            'border-radius':'0.5rem',
            'z-index':1,
            'transition':'1200ms'
        });
        
        setTimeout(function() { $('#coche_couvercle').css({'left':'-100%' }); }, 10);
        setTimeout(function() { td.html(vraie_reponse).removeClass('ombrage'); }, 1200);
    }
    function viderLeTableau(array) { array.splice(0,array.length); }
    function viderNotification() {
        $('.notification_corps').text('');
    }
    

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function zoomArriere(element) { element.css('fontSize','-=16px'); }
    function zoomAvant(element)	{ element.css('fontSize','+=16px'); }
    function zoomer(element) { element.addClass("zoom"); }
    function zoomDown(element) {
        element.css({ 
            'opacity':0,
            'transform':'scale(0.75)'
        });
        setTimeout(() => { element.css('display','none'); }, 200);
    }
    function zoomUp(element) {
        element.css({
            'display':'none',
            'opacity':0,
            'transform':'scale(0.75)'
        });
        setTimeout(() => {
            element.css({
                'display':'block',
                'opacity':1,
                'transform':'scale(1)', 
                'transition':'0.15s'
            });
        }, 250);
    }