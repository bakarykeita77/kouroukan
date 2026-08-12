
	function activerSonDuClavier() {
		$('#clavier_nko td').on('click',function(){
			lettre = $(this).attr('id');
			source_son = '../son/mp3/tons/ߊ/'+lettre+'.mp3';
			son.attr({src: source_son, autoplay: "on"});
		});
	}
	function aggrandir_caractere_de(element) { element.css( 'font-size','+=32px' ); }
	function appetir_caractere_de(element) { element.css( 'font-size','-=32px' ); }
    function arreterLecture(lessonHTML){
        $('.stop_icon').parent().on('click',function(){ 
             $('#lesson_corps').html(lessonHTML1());
             lecturePersonnalisee();
        });
    }
    
    function barrer(td) {
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
        attendre(50,function() { $('#croix').css({'transform': 'scale(1.5)' });});
        attendre(50,function() { $('#croix').css({'opacity': 0.6 });});
        attendre(2000,function() {td.html(fausse_reponse);});
    }
	
    function clignotage(reponse_ratee) {
        $.each($('.table_muette td'), function() {
            if ($(this).html() == reponse_ratee) {
                var td = $(this);

                td.addClass('fond_blanc_casse');
                attendre(200, (function() { td.removeClass('fond_blanc_casse'); }));
                attendre(350, (function() { td.addClass('fond_blanc_casse');    }));
                attendre(500, (function() { td.removeClass('fond_blanc_casse'); }));
                attendre(650, (function() { td.addClass('fond_blanc_casse');    }));
                attendre(800, (function() { td.removeClass('fond_blanc_casse'); }));
                attendre(950, (function() { td.addClass('fond_blanc_casse');    }));
                attendre(1100,(function() { td.removeClass('fond_blanc_casse'); }));
                attendre(1250,(function() { td.addClass('fond_blanc_casse');    }));
                attendre(1400,(function() { td.removeClass('fond_blanc_casse'); }));
                attendre(1550,(function() { td.addClass('fond_blanc_casse');    }));
                attendre(1700,(function() { td.removeClass('fond_blanc_casse'); }));
                attendre(1850,(function() { td.addClass('fond_blanc_casse');    }));
                attendre(2000,(function() { td.removeClass('fond_blanc_casse'); }));
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
	    attendre(180,(function(){ element.css({ 'display':'none' }) }));
	}
	
    function guiderClient(){

        $('.hand').css({ 'display':'block' });
        attendre(100,function(){ $('.hand').addClass('clicker'); });
        attendre(300,function() { $('.course_head').addClass('fond_noir_clair'); });
        attendre(800,function() { $('.course_head').removeClass('fond_noir_clair'); });
        attendre(1600,function() { $('.hand').removeClass('clicker'); });
        attendre(1600,function() { $('.hand').css('display','none'); });
        
        return;
    }
	
    function lecturePersonnalisee() {
        $('.table_parlante').on('click', function(e) {
            var td = $('.table_parlante td');
            var td_actif = e.target;
            var td_actif_value = td_actif.textContent;
    
            $('#audio').attr({ src: '../son/mp3/tons/ߊ/'+td_actif_value+'.mp3', autoplay: 'on' });
    
            /*Animation de td lors de lecture*/
            $(td_actif).addClass('ombrage');
            attendre(600,function() { $(td_actif).removeClass('ombrage'); });
        });
     };
    function lectureSemiAutomatique() {
        $(".play_icon").parent().on('click',function(){

            attendre(600,function(){
            var td = $('.table_parlante td');
        
            var read_events = [];
            var td_delay = "";
            var td_index = -1;
        
            for (i = 0; i < td.length; i++) {
                td_delay = 0;
                read_events[read_events.length] = attendre(td_delay += i*2000,(function() {
                    td[td_index += 1].click();
                }))+'\n';
            }
            });
         });
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
	
		son.src = "../son/mp3/tons/ߊ/"+id+".mp3";
		son.src = "../son/ogg/tons/ߊ/"+id+".ogg";
		son.src = "../son/mp4/tons/ߊ/"+id+".mp4";
		
		son.play();
	}

    function zoomArriere(element) { element.css('fontSize','-=16px'); }
    function zoomAvant(element)	{ element.css('fontSize','+=16px'); }
