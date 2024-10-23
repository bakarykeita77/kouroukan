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
    function affichageAnimeDeTable(table) {
        let tr = '';
        $.each(table, function() { tr = $('tr', this); })
        setTimeout(() => {
            $.each(tr, function(){

                let tr_index = $(this).index();
                let td = $('td', this);
                let td_length = td.length;

                td.css({'transition':'0.1s', 'transform':'scale(0)', 'opcity':0});

                $.each(td, function() {
                    let td_index = $(this).index();
                    setTimeout(() => {
                        $(this).css({'transform':'scale(1)', 'opacity':1});
                    }, 100*((tr_index*td_length)+td_index));
                });
            });
        }, 200);
        
    }
    function afficher(element) {
        element.css({
            'display':'none', 
            'transform':'scale(0.75)', 
            'opacity':'0',
            'transition':'0.3s'
        });
        setTimeout(function() { element.css({ 'display':'block' }); }, 100); 
        setTimeout(function() { element.css({
            'transform':'scale(1)', 
            'opacity':1
        }); }, 150);
    }
    function afficherApprentissage() {
        masquer($('.course'));
        $('#apprentissage_container').css('display','block');
        $('#exercice_container').css('display','none');
        $('#revision_container').css('display','none');
        $('#evaluation_container').css('display','none');
        setTimeout(() => { afficher($('.course')); }, 50);
    }
	function afficher_en_jailli( element,largeur,hauteur,temps ) {
        element.css({'display':'block', 'width':0, 'height':0});
        element.animate({'width':largeur, 'height':hauteur}, temps);
    }
    function afficherEvaluation() {
        masquer($('.course'));
        $('#apprentissage_container').css('display','none');
        $('#exercice_container').css('display','none');
        $('#revision_container').css('display','none');
        $('#evaluation_container').css('display','block');
        setTimeout(() => { afficher($('.course')); }, 50);
    }
    function afficherExercice() {
        masquer($('.course'));
        $('#apprentissage_container').css('display','none');
        $('#exercice_container').css('display','block');
        $('#revision_container').css('display','none');
        $('#evaluation_container').css('display','none');
        setTimeout(() => { afficher($('.course')); }, 50);
    }
    function afficherRevision() {
        masquer($('.course'));
        $('#apprentissage_container').css('display','none');
        $('#exercice_container').css('display','none');
        $('#revision_container').css('display','block');
        $('#evaluation_container').css('display','none');
        setTimeout(() => { afficher($('.course')); }, 50);
    }
	function aggrandir_caractere_de(element) { element.css( 'font-size','+=32px' ); }
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
        if(data[i] !== undefined) {
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
    function changerPhaseActive(phase_index) {
        if(phase_index != -1) {
            phase_index++;
            $.each($('#phases_list li'), function() {
                
                var phase_index = $(this).index();
                if(total_phase > phase_index) {  
                    if(phase_index <= phase_index-1) $(this).removeClass('active').addClass('apprises');
                    if(phase_index == phase_index  ) $(this).removeClass('a_apprendre').addClass('active');
                    if(phase_index >= phase_index+1) $(this).addClass('a_apprendre');
                }       	    
                if(total_phase == phase_index) $(this).removeClass('active a_apprendre').addClass('apprises');
            });
            sessionStorage.setItem('nbr',JSON.stringify(phase_index));
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

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function ecrire(element_class,message) {
        let longueur = message.length;
        let indice = 0;

        setTimeout(() => { 
            write();
            function write() {
                indice++;
                $('.'+element_class).html(message.substr(0,indice));
                if(indice<longueur) {
                    setTimeout(() => { write(); }, 0.5);
                }
            }
        }, 400);
    }
    function effacerLeTableau() {
        $('.course_body').html("<p id='contenu_par_defaut_du_tableau'>ߥߟߊ߬ߓߊ ߓߘߊ߫ ߖߐ߬ߛߌ߬ ߹</p>");
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function gestionDeExerciceFootBtn(total_questions) {
        let i = 0;
        
        if(i <= total_questions) { 

            masquer($('#exercice_repeter_question_btn'));
            masquer($('#exercice_correction_btn'));
            afficher($('#exercice_question_btn'));
            rendreActif($('#exercice_question_btn'));

            $('#exercice_question_btn').click(function() { 
                masquer($('#exercice_question_btn'));
                masquer($('#exercice_correction_btn'));
                rendreActif($('#exercice_repeter_question_btn'));
                afficher($('#exercice_repeter_question_btn')); 
            });

            $('#exercice_body td').click(function() {
                masquer($('#exercice_question_btn'));
                masquer($('#exercice_repeter_question_btn'));
                rendreActif($('#exercice_correction_btn'));
                afficher($('#exercice_correction_btn')); 
            });

            $('#exercice_correction_btn').click(function() { 
                masquer($('#exercice_repeter_question_btn'));
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
        setTimeout(() => { element.animate({'top':0}, 400); }, 1200);
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
        }, 400);
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
                setTimeout(function(){ element.addClass('indicateur'); }, 5); 
            },5000);
            
            element.click(function() { clearInterval(r); $(this).removeClass('indicateur'); });
        }
    }
    function initialiserProgressBar() { 
        setTimeout(() => { 
            $('.progress_bar').css('display','none');
            $('.progress_bonne_reponse_bar, .progress_mauvaise_reponse_bar').css('width', 0);
        }, 450);
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
	
    function lecturePersonnalisee() {
        $('.table_parlante').on('click', function(e) {
            var td_actif = e.target;
            var td_actif_value = td_actif.textContent;
    
            $('#audio').attr({ src: '../son/mp3/alphabet/'+td_actif_value+'.mp3', autoplay:'on' });
    
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
    function masquer(element) {
        element.css({
            'display':'none',
            'transform':'scale(0.75)', 
            'opacity':'0'
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
    function rendreActif(element) {
        element.addClass('actif');
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/
    
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
    function refuser(element) {
        
        $(element).addClass('faux');

        setTimeout(function(){ $('.faux').addClass('croix'); }, 100);
        setTimeout(function(){ $('.faux').removeClass('croix'); }, 600);
        setTimeout(function(){ $(element).removeClass('faux'); }, 600);
    }
    function resultat(memoire) {
        
        let nom = JSON.parse(sessionStorage.getItem('nom'));
        let prenom = JSON.parse(sessionStorage.getItem('prenom'));
        let lesson_en_cours = $('.notification_titre').html();
        let lesson_suivante = lessonSuivante();
        let total_question = memoire.length;
        let total_bonne_reponse = totalPoint();
        let total_fausse_reponse = total_question - total_bonne_reponse;
        let taux_de_vraie_reponse = Math.floor(total_bonne_reponse*100/total_question);
        let taux_acceptable_de_vraie_reponse = (lesson_active = 'pre_exercice') ? 100 : 92;
        let reprendre_l_etape_en_cours = '<b id="reprendre">'+lesson_en_cours+' ߞߍ߫ ߕߎ߲߯</b>';
        let continu_sur_l_etape_suivante = '<b id="avance">'+lesson_suivante+'</b>';

        if(lesson_suivante == lesson_en_cours+' ߥߴߊ߬ ߡߊ߬') { $('.notification_titre').html('ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'); }

        chargerResultatTitre();
        chargerResultatHead();
        chargerResultatBody();
        chargerResultatFoot();
        chargerDeliberation();
        
        function chargerResultatTitre() { $('#resultat_titre').html('<h2>'+lesson_en_cours+' ߞߐߝߟߌ</h2>'); }
        function chargerResultatHead() {

            let d = new Date();
            let an = d.getFullYear();
            let lune = d.getMonth();
            let date = d.getDate();
            let jour = d.getDay();
            let heure = d.getHours();
            let minute = d.getMinutes();

            $('#etudiant h1').text(prenom+' '+nom);
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
        let phases = JSON.parse(localStorage.getItem('phases'));
        let lesson_en_cours = $('.notification_titre').html();
        let lesson_suivante = lessonSuivante();

        let total_question_1 = memoire_1.length;

        let total_bonne_reponse_1 = totalPoint()
        let taux_de_vraie_reponse_1 = Math.floor(total_bonne_reponse_1*100/total_question_1);
        let taux_acceptable_de_vraie_reponse = (lesson_active = 'pre_exercice') ? 100 : 92;
        let reprendre_l_etape_en_cours = '<b id="reprendre">'+lesson_en_cours+' ߞߍ߫ ߕߎ߲߯</b>';
        let continu_sur_l_etape_suivante = '<b id="avance">'+lesson_suivante+'</b>';


        chargerResultatGeneralEntete();
        chargerResultatGeneralCorps();
        chargerResultatFoot();
        chargerDeliberation();
        afficherResultat();
        masquerResultat();
        
        function masquerResultat() {
            $('#fermer_resultat').click(function() { masquer($('#envelope')); });
        }
        function afficherResultat() { goDown($('.resultat_container')); }

        function chargerResultatGeneralEntete() { 
            $('#resultat_titre').html('<h2>'+matiere_nom+' ߥߟߊ߬ߘߊ ߞߐߝߟߌ</h2>'); 
            $('#etudiant').html('<h1>'+prenom+' '+nom+'</h1> <span>ߓߟߏ߫</span>');
        }
        function chargerResultatGeneralCorps() {

            chargerResultatDApprentissageCorps();
            chargerResultatDExerciceCorps();
            chargerResultatDeRevivsionCorps();
            chargerResultatDEvaluationCorps();

            function chargerResultatDApprentissageCorps() {
                        
                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {

                    let d = new Date();
                    let an = d.getFullYear();
                    let lune = d.getMonth();
                    let date = d.getDate();
                    let jour = d.getDay();
                    let heure = d.getHours();
                    let minute = d.getMinutes();
                    
                    $('#phase_d_apprentissage').text(phases[0]);
                    $('#apprentissage_date').text(jours[jour]+' '+mois[lune]+' ߕߟߋ߬ '+parseIntNko(date)+' ߛߊ߲߭ '+parseIntNko(an));
                    $('#apprentissage_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                }
                function chargerResultatBody() {

                    let apprentissage_resultat_body_html = resultatTableBodyHTML(memoire_1);

                    if(memoire_1 == "") { $('#resultat_d_exercice_corps').css("display","none"); }
                    $('#apprentissage_resultat_body').html(apprentissage_resultat_body_html);
                    $('#total_d_apprentissage_question').html(parseIntNko(memoire_1.length));
                    $('#total_d_apprentissage_reponse').html(parseIntNko(memoire_1.length));
                    $('#total_d_apprentissage_point').html(parseIntNko(sommePoint(memoire_1)));
                }
            }
            function chargerResultatDExerciceCorps() {
                        
                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {

                    let d = new Date();
                    let an = d.getFullYear();
                    let lune = d.getMonth();
                    let date = d.getDate();
                    let jour = d.getDay();
                    let heure = d.getHours();
                    let minute = d.getMinutes();
                    
                    $('#phase_d_exercice').text(phases[1]);
                    $('#exercice_date').text(jours[jour]+' '+mois[lune]+' ߕߟߋ߬ '+parseIntNko(date)+' ߛߊ߲߭ '+parseIntNko(an));
                    $('#exercice_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                }
                function chargerResultatBody() {

                    let exercice_resultat_body_html = resultatTableBodyHTML(memoire_2);

                    if(memoire_2 == "") { $('#resultat_d_exercice_corps').css("display","none"); }
                    $('#exercice_resultat_body').html(exercice_resultat_body_html);
            
                    $('#total_d_exercice_question').html(parseIntNko(memoire_2.length));
                    $('#total_d_exercice_reponse').html(parseIntNko(memoire_2.length));
                    $('#total_d_exercice_point').html(parseIntNko(sommePoint(memoire_2)));
                }
            }
            function chargerResultatDeRevivsionCorps() {
                        
                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {

                    let d = new Date();
                    let an = d.getFullYear();
                    let lune = d.getMonth();
                    let date = d.getDate();
                    let jour = d.getDay();
                    let heure = d.getHours();
                    let minute = d.getMinutes();
                    
                    $('#phase_de_revision').text(phases[2]);
                    $('#revision_date').text(jours[jour]+' '+mois[lune]+' ߕߟߋ߬ '+parseIntNko(date)+' ߛߊ߲߭ '+parseIntNko(an));
                    $('#revision_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                }
                function chargerResultatBody() {

                    let revision_resultat_body_html = resultatTableBodyHTML(memoire_3);

                    if(memoire_3 == "") { $('#resultat_de_revision_corps').css("display","none"); }
                    $('#revision_resultat_body').html(revision_resultat_body_html);
            
                    $('#total_de_revision_question').html(parseIntNko(memoire_3.length));
                    $('#total_de_revision_reponse').html(parseIntNko(memoire_3.length));
                    $('#total_de_revision_point').html(parseIntNko(sommePoint(memoire_3)));
                }
            }
            function chargerResultatDEvaluationCorps() {
                        
                chargerResultatHead();
                chargerResultatBody();

                function chargerResultatHead() {

                    let d = new Date();
                    let an = d.getFullYear();
                    let lune = d.getMonth();
                    let date = d.getDate();
                    let jour = d.getDay();
                    let heure = d.getHours();
                    let minute = d.getMinutes();
                    
                    $('#phase_d_evaluation').text(phases[3]);
                    $('#evaluation_date').text(jours[jour]+' '+mois[lune]+' ߕߟߋ߬ '+parseIntNko(date)+' ߛߊ߲߭ '+parseIntNko(an));
                    $('#evaluation_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
                }
                function chargerResultatBody() {

                    let evaluation_resultat_body_html = resultatTableBodyHTML(memoire_4);

                    if(memoire_4 == "") { $('#resultat_d_evaluation_corps').css("display","none"); }
                    $('#evaluation_resultat_body').html(evaluation_resultat_body_html);
            
                    $('#total_d_evaluation_question').html(parseIntNko(memoire_4.length));
                    $('#total_d_evaluation_reponse').html(parseIntNko(memoire_4.length));
                    $('#total_d_evaluation_point').html(parseIntNko(sommePoint(memoire_4)));
                }

            }
        }
        function chargerResultatFoot() {

            let total_des_questions = memoire_1.length + memoire_2.length + memoire_3.length + memoire_4.length;
            let total_des_points = sommePoint(memoire_1) + sommePoint(memoire_2) + sommePoint(memoire_3) + sommePoint(memoire_4);

            $('#total_general_des_questions').text(parseIntNko(total_des_questions));
            $('#total_general_des_bonnes_reponses').text(parseIntNko(total_des_points));
            $('#pourcentage_point').text('%'+parseIntNko(Math.floor(total_des_points*100/total_des_questions)));
        }
        function chargerDeliberation() {
            if(taux_de_vraie_reponse_1 < taux_acceptable_de_vraie_reponse) {
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
        for(let i=0; i<memoire.length; i++) { html += memoire[i][2]; }
        return html;
    }
	function softDisplay() {
	    var element = $('.soft_display');
	    var elements_secondaires = element.children();
	    
	   // alert( elements_secondaires ); 
	}

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function triDuTableauParOrdreAlphabetique(table) {
        let elements_tries = [];

            table.forEach(function(element) {
                if(alphabet_nko[0][i] = element[0]) {
                    elements_tries.push(element);
                }
            });

        return elements_tries;
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