    var total_phase = JSON.parse(sessionStorage.getItem('total_phase'));
	
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
        course.css({'display':'block', 'transform':'scale(0.75)', 'opacity':1});
        setTimeout(function() { course.css({'transform':'scale(1)'}); }, 5);
        setTimeout(function() { course.css({'opacity':'1'});}, 5);
    }
	function aggrandir_caractere_de(element) { element.css( 'font-size','+=32px' ); }
	function appetir_caractere_de(element) { element.css( 'font-size','-=32px' ); }
    function arreterLecture(lessonHTML) {
        $('.stop_icon').parent().on('click',function(){ 
             $('#lesson_corps').html(lessonHTML());
             lecturePersonnalisee();
        });
    }
/*-------------------------------------------------------------------------------------------------------------------------------------*/ 
    
    function barrerLaFausseReponse(td) {
        var fausse_reponse = td.html();
        td.html(fausse_reponse+"<p id='croix'>&#10060;</p>");
       
        $('#croix').css({
            'position':'absolute', 
            'display':'block',
            'margin':0,
            'padding':'8px 0',
            'width':'100%', 
            'height':'100%', 
            'top':'4px',
            'left':0,
            'font-size':'16px',
            'textAlign':'center', 
            'boxSizing':'border-box',
            'transform':'scale(0)',
            'opacity':0,
            'transition':'transform 0.6s'
        });
        
        setTimeout(function() { $('#croix').css({'transform':'scale(1.5)', 'opacity':0.6, 'color':'red' }); }, 50);
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
    function clearStorage() {
        sessionStorage.clear();
        localStorage.clear();
    }
    function clignotage(reponse_ratee) {
        $.each($('.table_parlante td'), function() {
            if ($(this).html() == reponse_ratee) {
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
	
	function incrementer(){
	    var i=0;
	    return function(){ return i += 1; };
	}
    function initialiserProgressBarr() { 
        $('.parametres_popup td').on('click', function() {
            $('.progress_question_bar, .progress_bonne_reponse_bar').css('width',0); 
        });
    }
	function fermer(element) {
	    element.animate({ 'height':0 }, 200);
	    setTimeout((function(){ element.css({ 'display':'none' }) }),180);
	}

/*-------------------------------------------------------------------------------------------------------------------------------------*/
	
    function guiderClient(){

        $('.hand').css({ 'display':'block' });
        setTimeout(function(){ $('.hand').addClass('clicker'); }, 100);
        setTimeout(function() { $('.course_head').addClass('fond_noir_clair'); }, 300);
        setTimeout(function() { $('.course_head').removeClass('fond_noir_clair'); }, 800);
        setTimeout(function() { $('.hand').removeClass('clicker'); }, 1600);
        setTimeout(function() { $('.hand').css('display','none'); }, 1600);
        
        return;
    }

/*-------------------------------------------------------------------------------------------------------------------------------------*/
	
    function lecturePersonnalisee() {
        $('.table_parlante').on('click', function(e) {
            var td_actif = e.target;
            var td_actif_value = td_actif.textContent;
    
            $('#audio').attr({ src: 'http://localhost/kouroukan/son/mp3/'+td_actif_value+'.mp3', autoplay: 'on' });
    
            $(td_actif).addClass('ombrage');
            setTimeout(function() { $(td_actif).removeClass('ombrage'); }, 600);
        });
     }
    function lectureSemiAutomatique() {
        $(".play_icon").parent().on('click',function(){

            setTimeout(function(){
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
    function lessonHTML2(voyelles_length,tons_length,syllabes_tonifies_length,syllabes_tonifies) {
            
        var tons_apprentissage_html = '';
        var n1 = voyelles_length*tons_length;
                    
        for(var sous_table=0;sous_table<syllabes_tonifies_length;sous_table+=n1){
            tons_apprentissage_html += '<table class="table_parlante">\n\n';
            for(var ligne=0;ligne<n1;ligne+=tons_coches.length){
                tons_apprentissage_html += '<tr>\n';
                for(var colonne=0;colonne<tons_coches.length;colonne++){
                    tons_apprentissage_html += '<td>'+syllabes_tonifies[sous_table+ligne+colonne]+'</td>\n';
                }
                tons_apprentissage_html += '</tr>\n\n';
            }
            tons_apprentissage_html += "</table><br><br><hr><br>\n";
        }
                    
        return tons_apprentissage_html;
    }
    function lire_mot() {
	   for(var i=0; i<texte_memoire.length; i++) {
	       var mot = texte_memoire[i];
	   
	   	        var lecture = setInterval(lire, 800);
	   	        var r = 0;
	   	        function lire() {
	   	            audio.attr({ src:'son/mp3/'+mot[r]+'.mp3', autoplay:'on' });
	   	            r++;
	   	            if( r>mot.length ) { clearInterval( lecture ); }
	       }
	   
	   }
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
    
    function parseIntNko(nombre_a_convertir){
        var numberToString = String(nombre_a_convertir);
        var stringToTable = numberToString.split('');
        var nombre_converti = [];
        
        for(i=0;i<stringToTable.length;i++){
            nombre_converti[nombre_converti.length] = chiffres[stringToTable[i]];
        }
        
        return nombre_converti.join('');
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
	function prononcer(){
		id=this.id;
	
		son.src = "son/mp3"+id+".mp3";
		son.src = "son/ogg"+id+".ogg";
		son.src = "son/mp4"+id+".mp4";
		
		son.play();
	}

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function raffraichirLaPage() { alert('raffraichissement'); location = location; }
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

/*-------------------------------------------------------------------------------------------------------------------------------------*/
	
	function softDisplay() {
	    var element = $('.soft_display');
	    var elements_secondaires = element.children();
	    
	   // alert( elements_secondaires ); 
	}

/*-------------------------------------------------------------------------------------------------------------------------------------*/

    function zoomArriere(element) { element.css('fontSize','-=16px'); }
    function zoomAvant(element)	{ element.css('fontSize','+=16px'); }
