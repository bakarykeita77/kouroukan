<script>
    function zoomAvant(element)	{ element.css('fontSize','+=16px'); }
    function zoomArriere(element) { element.css('fontSize','-=16px'); }
    function couleurDeFond(element,couleur)	{ element.css('backgroundColor', couleur); }
    function couleurDeFont(element,couleur)	{ element.css('color', couleur); }
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
    
</script>