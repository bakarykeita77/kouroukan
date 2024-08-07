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
    function afficherCourse(course) {
        course.css({
            'display':'block', 
            'transform':'scale(0.75)', 
            'opacity':'0.25',
            'transition':'0.8s'
        });
        setTimeout(function() { course.css({
            'transform':'scale(1)', 
            'opacity':1
        }); }, 10);
    }
    function affichageAnimeDesTd(td) {
        setTimeout(() => {

            $.each(td, function() {
                let td = $(this);
                let td_index = $(this).index();

                setTimeout(() => { td.css({'transform':'scale(1)', 'opacity':1}); }, 120*td_index);
            });
        }, 200);
    }
    function affichageAnimeDesTr(tr) {
        $.each(tr, function(){
            var tr_index = $(this).index();
            var td = $('td', this);

            setTimeout(() => {
                $.each(td, function() {
                    let td = $(this);
                    let td_index = $(this).index();

                    setTimeout(() => { td.css({'transform':'scale(1)', 'opacity':1}); }, 60*td_index);
                });
            }, 700*tr_index);
        });
    }
	function aggrandir_caractere_de(element) { element.css( 'font-size','+=32px' ); }
	function appetir_caractere_de(element) { element.css( 'font-size','-=32px' ); }
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
    
    function chargerResultat(memoire) {
        
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

        if(lesson_suivante == 'ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߥߴߊ߬ ߡߊ߬') { $('.notification_titre').html('ߛߓߍߛߎ߲ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ'); }

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

            $('#etudiant').text(prenom+' '+nom);
            $('#resultat_date').text(jours[jour]+' '+mois[lune]+' ߕߟߋ߬ '+parseIntNko(date)+' ߛߊ߲߭ '+parseIntNko(an));
            $('#resultat_heure').text(parseIntNko(heure)+' : '+parseIntNko(minute));
        }
        function chargerResultatBody() {

            let table_body_html = resultatTableBodyHTML();
            let total_point = totalPoint();
                
            $('#table_body').html(table_body_html);
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
console.log(taux_de_vraie_reponse +' / '+ taux_acceptable_de_vraie_reponse);
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
            }
            return ls;
        }
    }
    function clearStorage() {
        sessionStorage.clear();
        localStorage.clear();
    }
    function clignotage(reponse_ratee) {
        $.each($('.table_muette td'), function() {
            if($(this).text() == reponse_ratee) {

                var td = $(this);

                td.addClass('fond_blanc_casse');
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 200);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 325);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 450);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 575);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 700);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 825);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 950);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 1075);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 1200);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 1325);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 1450);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 1575);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 1700);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 1825);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 1950);
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
       vartimestamp = timestamp.split(' ');
       timestamp = timestamp[0].split('-');
       
       var annee = 'ߛߊ߲߭ '+parseIntNko(timestamp[0]);
       var moi = mois[timestamp[1][1]];
       var jour = 'ߕߟߋ߬ '+parseIntNko(timestamp[2]);
       
       timestamp = moi+' '+jour+' '+annee; 
       return timestamp;
    }
    function couleurDeFond(element,couleur)	{ element.css('backgroundColor', couleur); }
    function couleurDeFont(element,couleur)	{ element.css('color', couleur); }

/*-------------------------------------------------------------------------------------------------------------------------------------*/
    function defilementDuContenuLeHaut(container) {
        container.animate({ scrollTop:container[0].scrollHeight }, 1000);
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function ecrire(element_class,message) {
        let longueur = message.length;
        let indice = 0;

        write();
        function write() {
            indice++;
            $('.'+element_class).html(message.substr(0,indice));
            if(indice<longueur) {
                setTimeout(() => { write(); }, 1);
            }
        }
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function gestionDeExerciceDialogueBtns() {

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
        element.animate({'top':'-100%'}, 400);
        setTimeout(() => { 
            element.unwrap();
            element.css('display','none'); 

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
        
        setTimeout(function() { 
            element.addClass('indicateur'); 
             repeterIndexation($('#'+element_id)); 
        }, 5);
        
        function repeterIndexation(element) {
            let r = setInterval(function(){
                element.removeClass('indicateur'); 
                setTimeout(function(){ element.addClass('indicateur'); }, 5); 
            },5000);
            
            element.click(function() { clearInterval(r); $(this).removeClass('indicateur'); });
        }
    }
    function initialiserProgressBar() { 
        $('.progress_mauvaise_reponse_bar, .progress_bonne_reponse_bar').css('width',0);
    }
    function initialiserProgressBarIntegre() { 
        $('.progress_mauvaise_reponse_bar_integre, .progress_bonne_reponse_bar_integre').css('width',0);
    }
    function initialiserProgressBarr() { 
        $('.parametres_popup td').on('click', function() {
            $('.progress_question_bar, .progress_bonne_reponse_bar').css('width',0); 
        });
    } 

/*-------------------------------------------------------------------------------------------------------------------------------------*/
	
    function fermer(element) {
	    element.animate({ 'height':0 }, 200);
	    setTimeout((function(){ element.css({ 'display':'none' }) }),180);
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
    
    function mettreEnSurbrillance(element) {
        element.addClass('surbrillance');
        element.siblings().removeClass('surbrillance');
    }
    function malaxer(tableau){  
        var mixted_table = [];

        for(var i=0; mixted_table.length<tableau.length;i++){
            var nbr_aleatoire = Math.floor(Math.random()*tableau.length);
            var element_aleatoire = tableau[nbr_aleatoire];
            if($.inArray(element_aleatoire, mixted_table)==-1) mixted_table[mixted_table.length] = element_aleatoire;
        }
    
        return mixted_table;
    }
    function masquerCourse(course) {
        course.css({
            'transform':'scale(0.75)', 
            'opacity':'0.25'
        });
        setTimeout(() => { course.css('display','none'); }, 50);
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
    function montrer(element) {
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
        setTimeout(() => { button.css('box-shadow','var(--shadow_30)'); }, 200);
        setTimeout(() => { button.css('box-shadow','none'); }, 300);
        setTimeout(() => { button.css('box-shadow','var(--shadow_30)'); }, 400);
        setTimeout(() => { button.css('box-shadow','none'); }, 500);
        setTimeout(() => { button.css('box-shadow','var(--shadow_30)'); }, 600);
        setTimeout(() => { button.css('box-shadow','none'); }, 700);
        setTimeout(() => { button.css('box-shadow','var(--shadow_30)'); }, 800);
        setTimeout(() => { button.css('box-shadow','none'); }, 900);
        setTimeout(() => { button.css('box-shadow','var(--shadow_16)'); }, 1000);
    }
    function refuser(element) {
        
        $(element).addClass('faux');

        setTimeout(function(){ $('.faux').addClass('croix'); }, 100);
        setTimeout(function(){ $('.faux').removeClass('croix'); }, 600);
        setTimeout(function(){ $(element).removeClass('faux'); }, 600);
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
        let tp = 0;
        for(let i=0; i<data.length; i++) {
            tp += data[i][2];
        }
        return  Math.floor(tp*100/data.length);
    }


/*-------------------------------------------------------------------------------------------------------------------------------------*/

      
    function valider(td) {
        
        var vraie_reponse = td.html();
        td.html(vraie_reponse+"<p id='coche'>✓</p><p id='coche_couvercle'></p>");
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
        
        setTimeout(function() { $('#coche_couvercle').css({'left':'-40%' }); }, 10);
        setTimeout(function() { td.html(vraie_reponse).removeClass('ombrage'); }, 1200);
    }
    function viderLeTableau(array) { array.splice(0,array.length); }
    

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function zoomArriere(element) { element.css('fontSize','-=16px'); }
    function zoomAvant(element)	{ element.css('fontSize','+=16px'); }
    function zoomDown(element) {
        element.css({ 
            'opacity':0,
            'transform':'scale(0.75)'
        });
        setTimeout(() => { element.css('display','none'); }, 200);
    }
    function zoomUp(element) {
        setTimeout(() => {
            element.css({
                'display':'block',
                'opacity':1,
                'transform':'scale(1)', 
                'transition':'0.15s'
            });
        }, 200);
    }