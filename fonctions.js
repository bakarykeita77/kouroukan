    var total_phase = JSON.parse(sessionStorage.getItem('total_phase'));
	  
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
	function affichageListeEnCascade() {
	    
	    var liste = $('.liste_affichage_cascade');
	    var li = $('.liste_affichage_cascade li');
	    
	    liste.css('display','block');
	    $.each(li, function(){
	        var liste = $(this);
	        var index = $(this).index();
	        setTimeout(function(){
	            liste.css({'display':'block', 'height':'48px'});
	        }, index*50);
	    });

	}
    function affichageAnimeDesTd(td) {
        td.css({
            'transform':'scale(0.75)', 
            'opacity':0,
            'transition':'0.6s'
        });
        setTimeout(() => {
            $.each(td, function() {
                let td_index = $(this).index();
                setTimeout(() => { 
                    $(this).css({
                        'transform':'scale(1)', 
                        'opacity':1,
                    }); 
                }, 80*td_index);
            });
        }, 600);
    }
    function affichageAnimeDeTableTd(table) {
        let tr = $('tr', table);

        tr.css('opacity',1);
        $('td', table).css({'transition':'0.1s', 'transform':'scale(0.75)', 'opacity':0});
        
        setTimeout(() => {
            $.each(tr, function(){

                let tr_index = $(this).index();
                let td = $('td', this);
                let td_length = td.length;

                $.each(td, function() {
                    let td_index = $(this).index();
                    setTimeout(() => {
                        $(this).css({'opacity':1, 'transform':'scale(1)'});
                    }, 60*((tr_index*td_length)+td_index));
                });
            });
        }, 200);
        
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
    function afficher(element) {
        masquer(element);
        setTimeout(function() { element.css({ 'display':'block' }); }, 100); 
        setTimeout(function() { element.css({
            'transform':'scale(1)', 
            'opacity':1
        }); }, 150);
    }
	function afficher_en_jailli( element,largeur,hauteur,temps ) {
        element.css({'display':'block', 'width':0, 'height':0});
        element.animate({'width':largeur, 'height':hauteur}, temps);
    }
    function afficherEvaluation() {
        let td_total = $('#evaluation_body table td').length;
        $('.salle_de_classe').css({'display':'block'});

        masquer($('.course'));
        setTimeout(() => { 
            displayv($('.course'));

            $('#apprentissage_container').css('display','none');
            $('#exercice_container').css('display','block');
            $('#revision_container').css('display','none');
            $('#evaluation_container').css('display','none');
                
            setTimeout(() => { displayv($('#evaluation_head')); }, 60);
            setTimeout(() => { 
                setTimeout(() => { 
                    $('#evaluation_body').css({'display':'block'});
                    affichageAnimeDeTableTd($('#evaluation_body table')); 
                }, 60); 
                setTimeout(() => { 
                    $('#evaluation_foot').css('display','block'); 
                    displayv($('#evaluation_dialogue_btns'));
                    setTimeout(() => {
                        $('#evaluation_question_btn').css('display','block'); 
                        $('#evaluation_repetition_btn').css('display','none'); 
                        $('#evaluation_correction_btn').css('display','none');
                    }, 200); 
                }, (400 + td_total*60)); 
            }, 600);
            setTimeout(() => { displayv($('#evaluation_progress_bar')); }, (1600 + td_total*60));
            $('#evaluation_redirection_btns').css('display','none');
        }, 50);
        
        masquer($('#evaluation_redirection_btns'));

        setTimeout(() => { 
            setTimeout(() => { displayv($('#evaluation_dialogue_btns')); }, 300);
            setTimeout(() => { indexer($('#evaluation_question_btn'));   }, 300);
            setTimeout(() => { displayv($('#evaluation_progress_bar'));  }, 600);
        }, 1200);
    }
    function afficherEvaluationAlphabet() {

        $('#pratique_options').css('display','block');
        $('.fermeture').attr('id', 'fermer_evaluation'); 

        $('.salle_de_classe').css({'display':'block'});

        $('#exercice_body').css('display','none');
        $('#apprentissage_container').css('display','none');
        $('#exercice_container').css('display','none');
        $('#evaluation_container').css('display','block');

        afficher($('.course'));

        setTimeout(() => { displayv($('#evaluation_head')); }, 600);

        setTimeout(() => { displayv($('#evaluation_body')); }, 900);

        setTimeout(() => { displayv($('#evaluation_foot')); }, 1200);

        setTimeout(() => {
            displayv($('#evaluation_dialogue_btns'));
            $('#evaluation_redirection_btns').css('display','none');
            $('#evaluation_progress_bar').css('display','none');
        }, 1500);
    }
    function afficherExercice() {
        let td_total = $('#exercice_body table td').length;

        masquer($('.course'));
        setTimeout(() => { 
            displayv($('.course'));
            afficher($('#exercice_body'));

            masquer($('#apprentissage_container'));
            afficher($('#exercice_container'));
            masquer($('#revision_container'));
            masquer($('#evaluation_container'));
                
            setTimeout(() => { displayv($('#exercice_course_head')); }, 60);
            setTimeout(() => { 
                displayv($('#exercice_body_cadre'));

                setTimeout(() => { 
                    $('#exercice_body').css({'display':'block'});
                    affichageAnimeDeTableTd($('#exercice_body table')); 
                }, 60); 
                setTimeout(() => { 
                    $('#exercice_foot').css('display','block'); 
                    displayv($('#exercice_dialogue_btns'));
                    setTimeout(() => {
                        $('#exercice_question_btn').css('display','block'); 
                        $('#exercice_repetition_btn').css('display','none'); 
                        $('#exercice_correction_btn').css('display','none');
                    }, 200); 
                }, (60 + td_total*60)); 
            }, 200);
            setTimeout(() => { displayv($('#exercice_progress_bar')); }, (200 + td_total*60));
            $('#exercice_redirection_btns').css('display','none');
        }, 50);
        
        masquer($('#exercice_redirection_btns'));

        setTimeout(() => { 
            setTimeout(() => { displayv($('#exercice_dialogue_btns')); }, 300);
            setTimeout(() => { indexer($('#exercice_question_btn'));   }, 300);
            setTimeout(() => { displayv($('#exercice_progress_bar'));  }, 600);
        }, 1200);
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
    function afficherRevision() {
        let td_total = $('#revision_body table td').length;
       
        $('.salle_de_classe').css({'display':'block'});

        masquer($('.course'));
        setTimeout(() => { 
            displayv($('.course'));

            $('#apprentissage_container').css('display','none');
            $('#exercice_container').css('display','none');
            displayv($('#revision_container'));
            $('#evaluation_container').css('display','none');
                
            setTimeout(() => { displayv($('#revision_head')); }, 60);
            setTimeout(() => { 
                displayv($('#revision_body_cadre'));
                masquer($('#revision_body'));

                setTimeout(() => { 
                    displayv($('#revision_body'));
                    affichageAnimeDeTableTd($('#revision_body table')); 
                }, 60); 
                setTimeout(() => { 
                    $('#revision_foot').css('display','block'); 
                    displayv($('#revision_dialogue_btns'));
                    setTimeout(() => {
                        $('#revision_question_btn').css('display','block'); 
                        $('#revision_repetition_btn').css('display','none'); 
                        $('#revision_correction_btn').css('display','none');
                        setTimeout(() => { indexer($('#revision_question_btn'));   }, 300);
                    }, 200); 
                }, (td_total*60)); 
            }, 200);
            setTimeout(() => { 
                reInitialiserProgressBar();
                displayv($('#revision_progress_bar')); 
            }, (1000 + td_total*60));
            masquer($('#revision_redirection_btns'));
        }, 50);
    }
	function aggrandir_caractere_de(element) { element.css( 'font-size','+=32px' ); }
    function alphabetApprentisageDataMemo() {

        let matieres = JSON.parse(sessionStorage.getItem('matieres'));

        if(matieres.length === 0) return;
        let padm = [];

        for (let i = 0; i < matieres[0].length; i++) {
            let phase = matieres[0][i].phase;
            if(phase == "alphabet_apprentissage") { padm = JSON.parse(matieres[0][i].lesson); }
        }

        return padm;
    }
    function alphabetExerciceDataMemo() {
        
        let matieres = JSON.parse(sessionStorage.getItem('matieres'));

        if(matieres.length === 0) return;
        let pedm = [];

        for (let j = 0; j < matieres[0].length; j++) {
            let phase = matieres[0][j].phase;
            if(phase == "alphabet_exercice") { pedm = JSON.parse(matieres[0][j].lesson); }
        }

        return pedm;
    }
    function alphabetEvaluationDataMemo() {
        
        let matieres = JSON.parse(sessionStorage.getItem('matieres'));

        if(matieres.length === 0) return;
        let prdm = [];

        for (let k = 0; k < matieres[0].length; k++) {
            let phase = matieres[0][k].phase;
            if(phase == "alphabet_evaluation") { prdm = JSON.parse(matieres[0][k].lesson); }
        }
        
        return prdm;
    }
	function appetir_caractere_de(element) { element.css( 'font-size','-=32px' ); } 
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
    
    function calculerNote(data) {
        var note_d_exercice = 0;

        for (var i = 0; i < data.length; i++) {
    
        if(data[i] != undefined) {
            if(data[i][2] == 1) {
                note_d_exercice ++;
            }
        }}

        var note = Math.floor((note_d_exercice*100)/data.length);
        return note;
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
    function chargerApprendrePreSyllabe() {

        chargerEnteteDePreSyllabe();
        chargerFootDePreSyllabe();
        chargerCorpsDePreSyllabe();

        
        function chargerEnteteDePreSyllabe() {
            $('.notification_titre').html('ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
            setTimeout(() => {
                ecrire("notification_corps",texte_1);
            }, 1200);
        }
        function chargerFootDePreSyllabe() {
                    
            var pre_exercice_panneaux_html = panneauxDesLettresHTML();
            var apprentissage_dialogue_btns_html = "\
                <div> \
                    <p class='titre_de_parti'> \
                        <span>ߞߎߘߎ߲</span> \
                        <span class='cercle' id='afficheur_de_panneau'>+</span> \
                    </p> \
                </div> \
            ";

            $('#panneaux').html(pre_exercice_panneaux_html);
            $('#apprentissage_dialogue_btns').html(apprentissage_dialogue_btns_html);
            $('#pre_apprentissage_bouton').html("ߜߋ߲߭ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߞߍ߫");
            $('#continu_sur_exercice_bouton').html("ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫");
            $('#pre_evauation_bouton').html("ߜߋ߲߭ ߞߘߐߓߐߟߌ ߞߍ߫");

            initialiserProgressBar();
            panneauxStyle();
            
            function panneauxDesLettresHTML() {
                
                var consonnes = caracteres[1];
            
                var html_2 = '<div id="consonnes_cadre">\n';
                for(var i=0;i<18;i+=6) { 
                    html_2 += "<div>\n"; 
                    for(var j=0;j<6;j++) { 
                        html_2 += "<span>"+consonnes[i+j]+"</span>"; 
                    }
                    html_2 += "</div>\n"; 
                }
                html_2 += '<div id="submit_panneau">ߏ߬ ߞߊߢߌ߲߬</div>\n';
                html_2 += '</div>\n';
                
                return html_2;
            }
            function panneauxStyle() {
                $.each($('#panneaux span'), function() {

                    let panneaux_span = $(this);
                    let panneaux_consonne = ($(this).text());

                    if(memoire_consonnes_choisies != null) {
                        memoire_consonnes_choisies.forEach(element => {
                            if(element == panneaux_consonne) { panneaux_span.css({'color':'orange'}); }
                        });
                    }
                });
            }
        }
        function chargerCorpsDePreSyllabe() {

            preChargementDuTableauNoir();
            chargementDuTableauNoir();
            
            function preChargementDuTableauNoir() {
                $('#table_syllabe_apprentissage').html("<div id='pre_texte'>ߜߋ߲߭ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬</div>");
            }
            function chargementDuTableauNoir() {
            
                initialiserConsonnesChoisies();

                $('#panneaux span').click(function() {

                    var clicked_consonne_container = $(this);
                    var clicked_consonne = $(this).text();
                    var clicked_consonne_color = $(this).css('color');
                    let panneau_consonne_index = consonnes_choisies.indexOf(clicked_consonne);

                    if(panneau_consonne_index == '-1') { consonnes_choisies.push(clicked_consonne); }
                    if(panneau_consonne_index != '-1') { consonnes_choisies.splice(panneau_consonne_index, 1); }
                    if(clicked_consonne_color == 'rgb(255, 165, 0)') { 
                        alert('ߛߌ߬ߙߊ߬ߕߊ ߏ߬ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰ߣߍ߲߬ ߞߘߐ ߟߋ߬߹');
                        return; 
                    }

                    marquerLaConsonneCliquee(clicked_consonne_container);
                    decocherLesConsonnes();
                    decocherLaNasalisation();
                    afficherTableauNoir();
                    effacerTableau();
                    stylesDesSyllabes();
                    progressBarrApprendrePreSyllabe();

                
                    function decocherLesConsonnes() {
                        if($('#consonnes_checker').find('.checkbox_parent').prop("checked") == true) { $('#consonnes_checker').find('.checkbox_parent').next().click(); }            
                    }
                    function decocherLaNasalisation() {
                        if($('#nasalisation_checker').find('.check_btn:last-child input').prop("checked") == true) { $('#nasalisation_checker').find('.check_btn:last-child label').click(); }            
                    }
                    function chargerTableauNoir() {
                     /*
                     Cette fonction est liée à la fonction checkbox_childrenClick() dans la fonction chargerLesson() dans parametres.js.
                     Lorsqu'on clique sur une consonne du panneaux, la valeur correspondante est recherchée et cliquée dans les check_btn
                     au niveau de parametres.js. Ici la consonne cliquée est dans la variable clicked_consonne.
                     */
                        $.each($('.check_btn'), function(){
                            var consonne_corespondante = $('label', this);
                            if(clicked_consonne == consonne_corespondante.text()) { consonne_corespondante.click(); }
                        });
                        $('#table_syllabe_apprentissage tr').css('opacity',1);
                        $('.table_parlante td').css('opacity',1);
                    }
                    function effacerTableau() {
                        if(panneau_consonne_index != '-1') {
                            $.each($('#apprentissage_body tr'), function() {
                                let tr_actif = $(this);
                                let consonne_du_tableau = $('td', this).text().split('')[0];

                                if(clicked_consonne == consonne_du_tableau) {
                                    let td = $($('td', this));
                                    let td_ln = td.length;

                                    $.each(td, function() {
                                        let index_td = $(this).index();
                                        setTimeout(() => { $(this).css('transform','scale(0)'); }, (td_ln - index_td)*100);
                                    });

                                    setTimeout(() => { 
                                        tr_actif.css('display','none'); 
                                        chargerTableauNoir();
                                        stylesDesSyllabes();
                                    }, 500);
                                }
                            });
                        }
                    }
                    function afficherTableauNoir() {
                        if(panneau_consonne_index == '-1') {
                            chargerTableauNoir();
                            $.each($('#apprentissage_body tr'), function() {
                                let consonne_du_tableau = $('td', this).text().split('')[0];
                                if(clicked_consonne == consonne_du_tableau) {
                                    let td = $($('td', this));

                                    td.css({'transform':'scale(0)', 'transition':'100ms'});
                                    $.each(td, function() {
                                        let index_td = $(this).index();
                                        setTimeout(() => { $(this).css('transform','scale(1)'); }, index_td*100);
                                    });
                                }
                            }); 
                        }
                    }
                    function progressBarrApprendrePreSyllabe() {
        
                        let td = $('#table_syllabe_apprentissage td');
                        let progress_unity = 100/[(td.length)*quantite_normale_de_click];
                        let good_response_width = 0;
                        let total_clicks_normal = 0;
        
                        // masquerDialogueBtn();

                        $.each(td, function() {
                            let compteur_td_click = 0;
    
                            $(this).click(function(){
                                if(compteur_td_click < quantite_normale_de_click) {
                                    compteur_td_click++;
                                    total_clicks_normal++;

                                    actualiserPreSyllabeProgressBar()
                                    reInitialiserProgressBar();

                                    function reInitialiserProgressBar() {
                                        if(total_clicks_normal === (td.length)*quantite_normale_de_click) {
                                            setTimeout(() => { initialiserProgressBar(); }, 1000); 
                                        }
                                    }
                                }

                                function actualiserPreSyllabeProgressBar() {
                                    good_response_width += progress_unity;
                                    $('.progress_bonne_reponse_bar_integre').css('width', good_response_width+'%');
                                }
                            });
                        });

                        function masquerDialogueBtn() {
                            $('#panneaux').css('height',0);
                            $('.progress_bar_integre').css('display','block');
                            $('#pre_apprentissage_btns').css('display','none');
                            $('#apprentissage_dialogue_btn').css('display','none'); 
                        }
                    }
                    function stylesDesSyllabes() {
                        let td = $('#table_syllabe_apprentissage td');
                        
                        $.each(td, function(){
                            let compteur = 0;
                            $(this).css({'background-color':'rgb(85, 85, 85)', 'color':'yellow'});
                            $(this).click(function(){
                                let td_actif = $(this);
                                let n = compteur++;
                                
                                if(compteur == quantite_normale_de_click){
                                    td_actif.css({ 
                                        'background-color':'transparent', 
                                        'color':'yellow', 
                                        'border':'1px solid rgb(85, 85, 85)' 
                                    });
                                }
                            });
                        });
                    }
                });
                
                function initialiserConsonnesChoisies() { consonnes_choisies.splice(0,consonnes_choisies.length); }
            }
        }
    }
    function clearStorage() {
        sessionStorage.clear();
        localStorage.clear();
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
        // setTimeout((function() { td.addClass('shadow');    }), 825);
        // setTimeout((function() { td.removeClass('shadow'); }), 950);
        // setTimeout((function() { td.addClass('shadow');    }), 1075);
        // setTimeout((function() { td.removeClass('shadow'); }), 1200);
        // setTimeout((function() { td.addClass('shadow');    }), 1325);
        // setTimeout((function() { td.removeClass('shadow'); }), 1450);
        // setTimeout((function() { td.addClass('shadow');    }), 1575);
        // setTimeout((function() { td.removeClass('shadow'); }), 1700);
        // setTimeout((function() { td.addClass('shadow');    }), 1825);
        // setTimeout((function() { td.removeClass('shadow'); }), 1950);
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
    function defilementDuContenuVersLeHaut(container) {
        container.animate({ scrollTop:container[0].scrollHeight }, 1000);
    }
    function dialogueBtnsStyle() {
        $('.dialogue_btns > div').removeClass('actif');
        $.each($('.dialogue_btns > div'), function(){
            let btn_actif = $(this);
            if(btn_actif.css('display') == 'block') btn_actif.addClass('actif');
        });
    }
    function reagirAuClickDeDialogueBtns() {
        $.each($('.dialogue_btns > div'), function(){
            $(this).click(function() {
                $('.dialogue_btns').css('box-shadow','none');
            });
        });
    }
    function display(element) {
        element.css({
            'display':'block',
            'opacity':0, 
            'transition':'0.4s', 
            'transform':'scale(0.75)'
        });
        setTimeout(() => { element.css({'opacity':1, 'transform':'scale(1)'}); }, 50);
    }
    function displayv(element) {
        element.css({
            'display':'block',
            'opacity':0, 
            'transition':'0.6s', 
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
                    setTimeout(() => { write(); }, 25);
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

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function gestionDeExerciceFootBtn(total_questions) {
        let i = 0;
        
        if(i <= total_questions) { 

            masquer($('#exercice_repetition_btn'));
            masquer($('#exercice_correction_btn'));
            afficher($('#exercice_question_btn'));
            rendreActif($('#exercice_question_btn'));

            $('#exercice_question_btn').click(function() { 
                masquer($('#exercice_question_btn'));
                masquer($('#exercice_correction_btn'));
                rendreActif($('#exercice_repetition_btn'));
                afficher($('#exercice_repetition_btn')); 
            });

            $('#exercice_body td').click(function() {
console.log(total_questions[i]);
                masquer($('#exercice_question_btn'));
                masquer($('#exercice_repetition_btn'));
                rendreActif($('#exercice_correction_btn'));
                afficher($('#exercice_correction_btn')); 
            });

            $('#exercice_correction_btn').click(function() { 
                masquer($('#exercice_repetition_btn'));
                masquer($('#exercice_correction_btn'));
 
                if(i < total_questions - 1) { rendreActif($('#exercice_question_btn')); }
                if(i === total_questions - 1) { 
                    $('#exercice_question_btn').text('ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߓߘߊ߫ ߓߊ߲߫').removeClass('actif').off('click');
                }
                afficher($('#exercice_question_btn')); 
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
            'left':0,
            'height':'calc(100% - 3.5rem)',
            'width':'100%',
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
        let element_id = element.attr('id');
        rendreActif(element);
        setTimeout(function() { 
            element.addClass('indicateur'); 
            repeterIndexation($('#'+element_id)); 
        }, 1000);
        
        function repeterIndexation(element) {
            let r = setInterval(function(){
                element.removeClass('indicateur'); 
                if(element.hasClass('actif')) element.addClass('indicateur');
            },5000);
            
            element.click(function() { clearInterval(r); $(this).removeClass('indicateur'); });
        }
    }
    function initialiserDataAStocker(tableau) {
        let data = [];
        for(let i=0; i<tableau.length; i++) {
            let qr = tableau[i];
            let rr = '';
            let pr = 0;
            data.push([qr, rr, pr]);
        }
        return data;
    }
    function initialiserProgressBar() { 
        setTimeout(() => { reInitialiserProgressBar(); }, 450);
    }
    function initialiserProgressBarIntegre() { 
        setTimeout(() => { 
            $('.progress_bar').css('display','none');
            $('.progress_mauvaise_reponse_bar_integre, .progress_bonne_reponse_bar_integre').css('width',0);
        }, 450);
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
	
    function fermer(element) {
	    element.animate({ 'height':0 }, 200);
	    setTimeout((function(){ element.css({ 'display':'none' }) }),180);
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
            tons_apprentissage_html += "</table><br><br><hr><br>\n";
        }
                   
        return tons_apprentissage_html;
    }
    function lireLettre(parent_direct,lettre) { 
        //$('#audio').attr({ src:'../son/aac/'+parent_direct+'/'+lettre+'.aac', autoplay:'on' }); 
        //$('#audio').attr({ src:'../son/amr/'+parent_direct+'/'+lettre+'.amr', autoplay:'on' }); 
        //$('#audio').attr({ src:'../son/flac/'+parent_direct+'/'+lettre+'.flac', autoplay:'on' }); 
        //$('#audio').attr({ src:'../son/ogg/'+parent_direct+'/'+lettre+'.ogg', autoplay:'on' }); 
        //$('#audio').attr({ src:'../son/wav/'+parent_direct+'/'+lettre+'.wav', autoplay:'on' }); 
        //$('#audio').attr({ src:'../son/m4a/'+parent_direct+'/'+lettre+'.m4a', autoplay:'on' }); 
        $('#audio').attr({ src:'../son/mp3/'+parent_direct+'/'+lettre+'.mp3', autoplay:'on' }); 
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
    function marquerLaConsonneCliquee(clicked_consonne_container) {
        var bc = clicked_consonne_container.css('background-color');
        var consonne_background = (bc == 'rgb(170, 170, 170)') ? '#fff' : 'rgb(170, 170, 170)';
        clicked_consonne_container.css('background-color',consonne_background);
    }
    function marquerReponse(td_actif,question) {
        let reponse = td_actif.text();
        $('.table_parlante td').css('background-color','rgba(85,85,85,0.25)');
        if(question == reponse) { accorder(td_actif); }
        if(question != reponse) { barrer(td_actif); }
    }
    function masquer(element) {
        element.css({
            'display':'none',
            'transform':'scale(0.75)', 
            'opacity':'0',
            'transition':'0.3s'
        });
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

/*-------------------------------------------------------------------------------------------------------------------------------------*/
    
    function paire(nombre) {
        let test = (nombre%2 === 0) ? true : false;
        return test;
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
    function pourcentagePoint(memoire) {
        if(memoire != null) {
            let pp = 0;
            let tp = 0;
            for(let i=0; i<memoire.length; i++) { tp += memoire[i][2]; }
            pp = Math.floor(tp*100/memoire.length);
            return pp;
        }
    }
	function prononcer(){
		id=this.id;
	
		son.src = "son/mp3"+id+".mp3";
		son.src = "son/ogg"+id+".ogg";
		son.src = "son/mp4"+id+".mp4";
		
		son.play();
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
    function rectificationDeReponse(text_container,texte) {
        $('.correcteur').on('click',function() {
            texte.pop();
            text_container.html(texte);
        });
    }
    function refuser(element) {
        
        $(element).addClass('faux');

        setTimeout(function(){ $('.faux').addClass('croix'); }, 100);
        setTimeout(function(){ $('.faux').removeClass('croix'); }, 600);
        setTimeout(function(){ $(element).removeClass('faux'); }, 600);
    }
    function reInitialiserProgressBar() { 
        $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);
    }
    function rendreActif(element) {
        element.addClass('actif');
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
        let taux_de_vraie_reponse = Math.floor(total_bonne_reponse*100/total_question);
        let taux_acceptable_de_vraie_reponse = (lesson_active = 'pre_exercice') ? 100 : 92;
        let reprendre_l_etape_en_cours = '<b id="reprendre">'+lesson_en_cours+' ߞߍ߫ ߕߎ߲߯</b>';
        let continu_sur_l_etape_suivante = '<b id="avance">'+lesson_suivante+'</b>';

        if(lesson_suivante == 'ߥߊ߫ '+lesson_en_cours+' ߡߊ߬') { $('.notification_titre').html('ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'); }

        chargerResultatEntete();
        chargerResultatHead();
        chargerResultatBody();
        chargerResultatFoot();
        chargerDeliberation();
        
        function chargerResultatEntete() {
            $('#resultat_titre').html('<h3>'+lesson_en_cours+' ߞߐߝߟߌ</h3>'); 
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

            let table_body_html = resultatTableBodyHTML();
            let total_point = totalPoint();
                
            $('.table_body').html(table_body_html);
            $('#total_question_1').html(parseIntNko(memoire.length));
            $('#total_reponse').html(parseIntNko(memoire.length));
            $('#total_point_1').html(parseIntNko(total_point));

            function resultatTableBodyHTML() {
                let html = '';

                html +=  '<tr class="thin">';
                for(let j=0; j<memoire.length; j++) {
                    let ordre = (j === 0) ? parseIntNko(j+1)+'߭' : parseIntNko(j+1)+'߲';
                    html += '<td>'+ordre+'</td>';
                }
                html +=  '</tr>';

                html +=  '<tr class="bold">';
                for(let k=0; k<memoire.length; k++) {
                    html += '<td>'+memoire[k][0]+'</td>';
                }
                html +=  '</tr>';

                html +=  '<tr class="bold">';
                for(let l=0; l<memoire.length; l++) {
                    html += '<td>'+memoire[l][1]+'</td>';
                }
                html +=  '</tr>';

                html +=  '<tr class="bold">';
                for(let m=0; m<memoire.length; m++) {
                    html += '<td>'+parseIntNko(memoire[m][2])+'</td>';
                }
                html +=  '</tr>';

                return html;
            }
        }
        function chargerResultatFoot() {
            $('#total_question_2').text(parseIntNko(total_question));
            $('#total_bonne_reponse').text(parseIntNko(total_bonne_reponse));
            $('#total_fausse_reponse').text(parseIntNko(total_fausse_reponse));
            $('#total_point_2').text(parseIntNko(total_bonne_reponse));
            $('#pourcentage_point').text('%'+parseIntNko(taux_de_vraie_reponse));
        }
        function chargerDeliberation() {
            if(taux_de_vraie_reponse < taux_acceptable_de_vraie_reponse) {
                $('#deliberation').html('ߌ ߖߌߖߊ߬ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ '+lesson_en_cours+' ߓߍ߬ߙߍ ߡߊ߫ ߤߊߟߌ߬ ߁߈ ߓߐ߫. ߏ߬ߘߐ߬߸ ߌ ߞߐߛߍ߬ߦߌ߬ ߦߊ߲߬ ߡߊ߫.'+reprendre_l_etape_en_cours);
            }else{
                $('#deliberation').html(
                    'ߌ ߞߎߟߎ߲ߖߋ߫ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ ߘߐ߬ߖߊ ߟߊ߫ '+lesson_en_cours+' ߟߐ߲ ߠߊ߫ ߤߊ߲߯ '+$('#pourcentage_point').text()+
                    '</b> ߟߊ߫. ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ '+lesson_suivante+'.<br/>'+
                    'ߣߴߌ ߟߊ߫ ߓߍ߬ߙߍ ߡߴߌ ߥߛߊ߬߸ '+reprendre_l_etape_en_cours+'<br/>'+
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
    function resultatGeneral(memoire_1='', memoire_2='', memoire_3='',memoire_4='') {
        
        let nom = JSON.parse(sessionStorage.getItem('nom'));
        let prenom = JSON.parse(sessionStorage.getItem('prenom'));
        let matiere_nom = JSON.parse(sessionStorage.getItem('matiere_nom'));
        let lesson_en_cours = $('.notification_titre').html();
        let lesson_actuelle = lessonActuelle(lesson_en_cours);
        let total_question = totalQuestion(lesson_en_cours);
        let total_point = totalPoint(lesson_actuelle);
        let moyenne_d_evaluation = 1;
        let reprendre_l_etape_en_cours = '<b id="reprendre">'+lesson_en_cours+' ߞߍ߫ ߕߎ߲߯</b>';
        let lesson_suivante = lessonSuivante(lesson_en_cours);
        let phase = phaseEnCours(lesson_en_cours);
        let continu_sur_l_etape_suivante = '<b id="avance"><a href="/kouroukan/php/programmes.php">'+lesson_suivante+'</a></b>';


        chargerResultatGeneralEntete();
        chargerResultatGeneralCorps();
        chargerResultatFoot();
        chargerDeliberation();
        afficherResultat();
        reprendreLesson();
        continuSuLaLessonSuivante();
    
        $('#fermer_resultat').click(function() { masquerResultat(); });


        function chargerResultatGeneralEntete() { 
            $('#resultat_titre').html('<h3>'+matiere_nom+' ߥߟߊ߬ߘߊ ߞߐߝߟߌ</h3>'); 
            $('#etudiant').html('<h1>'+prenom+' '+nom+'</h1> <span>ߓߟߏ߫</span>');
        }
        function chargerResultatGeneralCorps() {

            chargerResultatDApprentissageCorps();
            chargerResultatDExerciceCorps();
            chargerResultatDeRevivsionCorps();
            chargerResultatDEvaluationCorps();

            function chargerResultatDApprentissageCorps() {

                if(memoire_1 == "") { 
                    $('#resultat_d_apprentissage_corps').css("display","none"); 
                    return;
                }
                                          
                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {

                    let d = memoire_1.date;
                    let an = d.split("-")[0];
                    let lune = parseInt(d.split("-")[1]);
                    let date = d.split("-")[2];
                    let jour = parseInt(date.split(" ")[0]);
                    let temps = date.split(" ")[1];
                    let heure = parseInt(temps.split(":")[0]);
                    let minute = parseInt(temps.split(":")[1]);
                    
                    $('#phase_d_apprentissage').text(matiere_nom+' '+liste_de_phases[0][1]);
                    $('#apprentissage_date').text(mois[parseInt(lune)]+' ߕߟߋ߬ '+parseIntNko(jour)+' ߛߊ߲߭ '+parseIntNko(an));
                    $('#apprentissage_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                }
                function chargerResultatBody() {

                    let lesson = JSON.parse(memoire_1.lesson)
                    let apprentissage_resultat_body_html = resultatTableBodyHTML(lesson);

                    $('#apprentissage_resultat_body').html(apprentissage_resultat_body_html);
                    $('#total_d_apprentissage_question').html(parseIntNko(lesson.length));
                    $('#total_d_apprentissage_reponse').html(parseIntNko(lesson.length));
                    $('#total_d_apprentissage_point').html(parseIntNko(sommePoint(lesson)));
                }
            }
            function chargerResultatDExerciceCorps() {

                if(memoire_2 == "") { 
                    $('#resultat_d_exercice_corps').css("display","none"); 
                    return;
                }
                    
                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {

                    let d = memoire_2.date;
                    let an = d.split("-")[0];
                    let lune = d.split("-")[1];
                    let date = d.split("-")[2];
                    let jour = date.split(" ")[0];
                    let temps = date.split(" ")[1];
                    let heure = temps.split(":")[0];
                    let minute = temps.split(":")[1];
                    
                    $('#phase_d_exercice').text(matiere_nom+' '+liste_de_phases[1][1]);
                    $('#exercice_date').text(mois[parseInt(lune)]+' ߕߟߋ߬ '+parseIntNko(jour)+' ߛߊ߲߭ '+parseIntNko(an));
                    $('#exercice_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                }
                function chargerResultatBody() {

                    let lesson = JSON.parse(memoire_2.lesson)
                    let exercice_resultat_body_html = resultatTableBodyHTML(lesson);

                    $('#exercice_resultat_body').html(exercice_resultat_body_html);
                    $('#total_d_exercice_question').html(parseIntNko(lesson.length));
                    $('#total_d_exercice_reponse').html(parseIntNko(lesson.length));
                    $('#total_d_exercice_point').html(parseIntNko(sommePoint(lesson)));
                }
            }
            function chargerResultatDeRevivsionCorps() {

                if(memoire_3 == "") { 
                    $('#resultat_de_revision_corps').css("display","none"); 
                    return;
                }
                          
                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {

                    let d = memoire_3.date;

                    let an = d.split("-")[0];
                    let lune = d.split("-")[1];
                    let date = d.split("-")[2];
                    let jour = date.split(" ")[0];
                    let temps = date.split(" ")[1];
                    let heure = temps.split(":")[0];
                    let minute = temps.split(":")[1];
                  
                    $('#phase_de_revision').text(matiere_nom+' '+liste_de_phases[2][1]);
                    $('#revision_date').text(mois[parseInt(lune)]+' ߕߟߋ߬ '+parseIntNko(jour)+' ߛߊ߲߭ '+parseIntNko(an));
                    $('#revision_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                }
                function chargerResultatBody() {
                    let lesson = JSON.parse(memoire_3.lesson)
                    let revision_resultat_body_html = resultatTableBodyHTML(lesson);

                    $('#revision_resultat_body').html(revision_resultat_body_html);
                    $('#total_de_revision_question').html(parseIntNko(lesson.length));
                    $('#total_de_revision_reponse').html(parseIntNko(lesson.length));
                    $('#total_de_revision_point').html(parseIntNko(sommePoint(lesson)));
                }
            }
            function chargerResultatDEvaluationCorps() {

                if(memoire_4 == "") { 
                    $('#resultat_d_evaluation_corps').css("display","none"); 
                    return;
                }
                        
                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {

                    let d = memoire_4.date;
                    let an = d.split("-")[0];
                    let lune = d.split("-")[1];
                    let date = d.split("-")[2];
                    let jour = date.split(" ")[0];
                    let temps = date.split(" ")[1];
                    let heure = temps.split(":")[0];
                    let minute = temps.split(":")[1];
                    
                    $('#phase_d_evaluation').text(matiere_nom+' '+liste_de_phases[3][1]);
                    $('#evaluation_date').text(mois[parseInt(lune)]+' ߕߟߋ߬ '+parseIntNko(jour)+' ߛߊ߲߭ '+parseIntNko(an));
                    $('#evaluation_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                }
                function chargerResultatBody() {

                    let lesson = JSON.parse(memoire_4.lesson)
                    let evaluation_resultat_body_html = resultatTableBodyHTML(lesson);
                    
                    $('#evaluation_resultat_body').html(evaluation_resultat_body_html);
                    $('#total_d_evaluation_question').html(parseIntNko(lesson.length));
                    $('#total_d_evaluation_reponse').html(parseIntNko(lesson.length));
                    $('#total_d_evaluation_point').html(parseIntNko(sommePoint(lesson)));
                }

            }
        }
        function chargerResultatFoot() {

            let lesson_1 = (memoire_1 != "") ? JSON.parse(memoire_1.lesson) : [];
            let lesson_2 = (memoire_2 != "") ? JSON.parse(memoire_2.lesson) : [];
            let lesson_3 = (memoire_3 != "") ? JSON.parse(memoire_3.lesson) : [];
            let lesson_4 = (memoire_4 != "") ? JSON.parse(memoire_4.lesson) : [];

            let total_des_questions = lesson_1.length + lesson_2.length + lesson_3.length + lesson_4.length;
            let total_des_points = sommePoint(lesson_1) + sommePoint(lesson_2) + sommePoint(lesson_3) + sommePoint(lesson_4);
            
            $('#total_general_des_questions').text(parseIntNko(total_des_questions));
            $('#total_general_des_bonnes_reponses').text(parseIntNko(total_des_points));
            $('#pourcentage_point').text('%'+parseIntNko(Math.floor(total_des_points*100/total_des_questions)));
        }
        function chargerDeliberation() {
            if(total_point < moyenne_d_evaluation) {
                $('#deliberation').html('ߌ ߖߌߖߊ߬ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ '+lesson_en_cours+' ߓߍ߬ߙߍ ߡߊ߫ ߤߊߟߌ߬ ߁߈ ߓߐ߫. ߏ߬ߘߐ߬߸ ߌ ߞߐߛߍ߬ߦߌ߬ ߦߊ߲߬ ߡߊ߫.'+reprendre_l_etape_en_cours);
            }else{
                $('#deliberation').html(
                    'ߌ ߞߎߟߎ߲ߖߋ߫ <b>'+prenom+'</b>߸ ߌ ߟߊ߫ ߘߐ߬ߖߊ ߟߊ߫ '+lesson_en_cours+' ߟߐ߲ ߠߊ߫ ߤߊ߲߯ '+$('#pourcentage_point').text()+
                    '</b> ߟߊ߫. ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ '+lesson_suivante+'.<br/>'+
                    'ߣߴߌ ߟߊ߫ ߓߍ߬ߙߍ ߡߴߌ ߥߛߊ߬߸ '+reprendre_l_etape_en_cours+'<br/>'+
                    'ߣߴߌ ߟߊ߫ ߓߍ߬ߙߍ ߞߵߌ ߥߛߊ߬߸ '+continu_sur_l_etape_suivante
                );
            }
        }
        function masquerResultat() { goUp($('.resultat_container')); }
        function afficherResultat() { goDown($('.resultat_container')); }
        function reprendreLesson() {
            $('#reprendre').click(() => { raffraichirLaPage(); });
        }
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
        function continuSuLaLessonSuivante() {
            
        }
        function phaseEnCours(lesson_en_cours) {

            let m = lesson_en_cours.split(' ')[0];
            let p = lesson_en_cours.split(' ')[1];
            let phase = "";

            if(m == 'ߛߓߍߛߎ߲') {
                switch(p) {
                    case 'ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'  : phase = (memoire_1 != "") ? memoire_1.phase : ""; break;
                    case 'ߡߊ߬ߞߟߏ߬ߟߌ'  : phase = (memoire_2 != "") ? memoire_2.phase : ""; break;
                    case 'ߞߘߐߓߐߟߌ' : phase = (memoire_3 != "") ? memoire_3.phase : ""; break;
                }
            }
            if(m == 'ߜߋ߲߭') {
                switch(p) {
                    case 'ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'  : phase = (memoire_1 != "") ? memoire_1.phase : ""; break;
                    case 'ߡߊ߬ߞߟߏ߬ߟߌ'  : phase = (memoire_2 != "") ? memoire_2.phase : ""; break;
                    case 'ߣߐ߰ߡߊ߬ߛߍߦߌ' : phase = (memoire_3 != "") ? memoire_3.phase : ""; break;
                    case 'ߞߘߐߓߐߟߌ' : phase = (memoire_4 != "") ? memoire_4.phase : ""; break;
                }
            }
            return phase;
        }
        function totalQuestion(lesson_en_cours) {
            
            let tq = 0;
            let m = lesson_en_cours.split(' ')[0];
            let p = lesson_en_cours.split(' ')[1];
            
            if(m == 'ߛߓߍߛߎ߲') {
                switch(p) {
                    case 'ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'  : tq = (memoire_1 != "") ? JSON.parse(memoire_1.lesson).length : 0; break;
                    case 'ߡߊ߬ߞߟߏ߬ߟߌ'  : tq = (memoire_2 != "") ? JSON.parse(memoire_2.lesson).length : 0; break;
                    case 'ߞߘߐߓߐߟߌ' : tq = (memoire_3 != "") ? JSON.parse(memoire_3.lesson).length : 0; break;
                }
            }
            if(m == 'ߜߋ߲߭') {
                switch(p) {
                    case 'ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'  : tq = (memoire_1 != "") ? JSON.parse(memoire_1.lesson).length : 0; break;
                    case 'ߡߊ߬ߞߟߏ߬ߟߌ'  : tq = (memoire_2 != "") ? JSON.parse(memoire_2.lesson).length : 0; break;
                    case 'ߣߐ߰ߡߊ߬ߛߍߦߌ' : tq = (memoire_3 != "") ? JSON.parse(memoire_3.lesson).length : 0; break;
                    case 'ߞߘߐߓߐߟߌ' : tq = (memoire_4 != "") ? JSON.parse(memoire_4.lesson).length : 0; break;
                }
            }

            return tq;
        }
        function lessonActuelle(lesson_en_cours) {
            
            let l = [];
            let m = lesson_en_cours.split(' ')[0];
            let p = lesson_en_cours.split(' ')[1];

            if(m == 'ߛߓߍߛߎ߲') {
                switch(p) {
                    case 'ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'  : l = (memoire_1 != "") ? memoire_1.lesson : []; break;
                    case 'ߡߊ߬ߞߟߏ߬ߟߌ'  : l = (memoire_2 != "") ? memoire_2.lesson : []; break;
                    case 'ߞߘߐߓߐߟߌ' : l = (memoire_3 != "") ? memoire_3.lesson : []; break;
                }
            }
            if(m == 'ߜߋ߲߭') {
                switch(p) {
                    case 'ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'  : l = (memoire_1 != "") ? memoire_1.lesson : []; break;
                    case 'ߡߊ߬ߞߟߏ߬ߟߌ'  : l = (memoire_2 != "") ? memoire_2.lesson : []; break;
                    case 'ߣߐ߰ߡߊ߬ߛߍߦߌ' : l = (memoire_3 != "") ? memoire_3.lesson : []; break;
                    case 'ߞߘߐߓߐߟߌ' : l = (memoire_4 != "") ? memoire_4.lesson : []; break;
                }
            }
    
            return l;
        }
    }
    function resultatTableBodyHTML(memoire) {
        let html = '';

        html +=  '<tr class="thin">';
        for(let j=0; j<memoire.length; j++) {
            let ordre = (j === 0) ? parseIntNko(j+1)+'߭' : parseIntNko(j+1)+'߲';
            html += '<td>'+ordre+'</td>';
        }
        html +=  '</tr>';

        html +=  '<tr class="bold">';
        for(let k=0; k<memoire.length; k++) {
            html += '<td>'+memoire[k][0]+'</td>';
        }
        html +=  '</tr>';

        html +=  '<tr class="bold">';
        for(let l=0; l<memoire.length; l++) {
            html += '<td>'+memoire[l][1]+'</td>';
        }
        html +=  '</tr>';

        html +=  '<tr class="bold">';
        for(let m=0; m<memoire.length; m++) {
            html += '<td>'+parseIntNko(memoire[m][2])+'</td>';
        }
        html +=  '</tr>';

        return html;
    }
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
        setTimeout(function() { element.removeClass('clignotant'); }, 1200);
    }
    function selectionDeTr(tr) {
        tr.siblings().unwrap();
        $('#traducteur').remove();
        tr.wrap('<div id="tr_actif"></div>');
    }
    function sendLessonDataToDB(lesson_phase,lesson_data) {

        var id = JSON.parse(sessionStorage.getItem('id'));
        var matiere = JSON.parse(sessionStorage.getItem('matiere_active')); // Voir programmes.js fonction storagesDuProgramme()
        var niveau_actif = JSON.parse(sessionStorage.getItem('niveau_actif'));
        var phase   = lesson_phase;
        var lesson  = JSON.stringify(lesson_data);
        var note = totalPoint(lesson_data);
    
        const data_to_send = new URLSearchParams({
            id     : id,
            matiere: matiere,
            niveau : niveau_actif,
            phase  : phase,
            lesson : lesson,
            note   : note
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
    function syllabesApprentisageDataMemo() {

        let matieres = JSON.parse(sessionStorage.getItem('matieres'));

        if(matieres.length === 0) return;
        let sad = [];

        for (let i = 0; i < matieres[0].length; i++) {
            let phase = matieres[0][i].phase;
            if(phase == "syllabes_apprentissage") { sad = JSON.parse(matieres[0][i].lesson); }
        }

        return sad;
    }
    function syllabesExerciceDataMemo() {
        
        let matieres = JSON.parse(sessionStorage.getItem('matieres'));

        if(matieres.length === 0) return;
        let sed = [];

        for (let j = 0; j < matieres[0].length; j++) {
            let phase = matieres[0][j].phase;
            if(phase == "syllabes_exercice") { sedpedm = JSON.parse(matieres[0][j].lesson); }
        }

        return sed;
    }
    function syllabesEvaluationDataMemo() {
        
        let matieres = JSON.parse(sessionStorage.getItem('matieres'));

        if(matieres.length === 0) return;
        let s_e_d = [];

        for (let k = 0; k < matieres[0].length; k++) {
            let phase = matieres[0][k].phase;
            if(phase == "syllabes_revision") { s_e_d = JSON.parse(matieres[0][k].lesson); }
            
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

    function user(id,lesson_name,option) {
        user.id = id;
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