
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
	            liste.css({'display':'block', 'height':'32px'});
	        }, index*200);
	    });

	}
	function aggrandir_caractere_de(element) { element.css( 'font-size','+=32px' ); }
	function appetir_caractere_de(element) { element.css( 'font-size','-=32px' ); }
    function arreterLecture(lessonHTML) {
        $('.stop_icon').parent().on('click',function(){ 
             $('#lesson_corps').html(lessonHTML());
             lecturePersonnalisee();
        });
    }
    
    function barrerLaFausseReponse(td) {
        var fausse_reponse = td.html();
        td.html(fausse_reponse+"<p id='croix'>&#10060;</p>");
        
        $('#croix').css({
            'position':'absolute', 
            'margin':0,
            'padding':'8px 0',
            'width':'100%', 
            'height':'100%', 
            'top':0,
            'left':0,
            'textAlign':'center', 
            'boxSizing':'border-box',
            'transform':'scale(0)',
            'opacity':0,
            'transition':'transform 0.6s'
        });
        setTimeout(function() { $('#croix').css({'transform': 'scale(1.5)' });}, 50);
        setTimeout(function() { $('#croix').css({'opacity': 0.6 });}, 50);
        setTimeout(function() {td.html(fausse_reponse);}, 2000);
    }
	
    function clignotage(reponse_ratee) {
        $.each($('.table_muette td'), function() {
            if ($(this).html() == reponse_ratee) {
                var td = $(this);

                td.addClass('fond_blanc_casse');
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 200);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 350);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 500);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 650);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 800);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 950);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 1100);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 1250);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 1400);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 1550);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 1700);
                setTimeout((function() { td.addClass('fond_blanc_casse');    }), 1850);
                setTimeout((function() { td.removeClass('fond_blanc_casse'); }), 2000);
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
	
	function incrementer(){
	    var i=0;
	    return function(){ return i += 1; };
	}
	
	function fermer(element) {
	    element.animate({ 'height':0 }, 200);
	    setTimeout((function(){ element.css({ 'display':'none' }) }),180);
	}
	
    function guiderClient(){

        $('.hand').css({ 'display':'block' });
        setTimeout(function(){ $('.hand').addClass('clicker'); }, 100);
        setTimeout(function() { $('.course_head').addClass('fond_noir_clair'); }, 300);
        setTimeout(function() { $('.course_head').removeClass('fond_noir_clair'); }, 800);
        setTimeout(function() { $('.hand').removeClass('clicker'); }, 1600);
        setTimeout(function() { $('.hand').css('display','none'); }, 1600);
        
        return;
    }
	
    function lecturePersonnalisee() {
        $('.table_parlante').on('click', function(e) {
            var td = $('.table_parlante td');
            var td_actif = e.target;
            var td_actif_value = td_actif.textContent;
    
            $('#audio').attr({ src: 'http://localhost:8080/kouroukan/son/mp3/'+td_actif_value+'.mp3', autoplay: 'on' });
    
            /*Animation de td lors de lecture*/
            $(td_actif).addClass('ombrage');
            setTimeout(function() { $(td_actif).removeClass('ombrage'); }, 600);
        });
     };
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
    
    function mix1D(tableau){
        var mixted_table = [];
        for(var i=0; mixted_table.length<tableau.length;i++){
            var nbr_aleatoire = Math.floor(Math.random()*tableau.length);
            var element_aleatoire = tableau[nbr_aleatoire];
            if($.inArray(element_aleatoire, mixted_table)==-1){ mixted_table[mixted_table.length] = element_aleatoire; }
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
	
	function softDisplay() {
	    var element = $('.soft_display');
	    var elements_secondaires = element.children();
	    
	   // alert( elements_secondaires ); 
	}

    function zoomArriere(element) { element.css('fontSize','-=16px'); }
    function zoomAvant(element)	{ element.css('fontSize','+=16px'); }
