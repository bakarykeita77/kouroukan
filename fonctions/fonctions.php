<script>

	function afficher(element) {
	    element.css({ 'display':'block', 'height':0 });
		element.css({ 'display':'block' });
		element.animate({ 'height':'25vh' }, 200);
	}
	function afficher_en_jailli( element,largeur,hauteur ) {
	//	element.css({ 'width':0, 'height':0 });
		display(element);
		element.animate({ 'width':'90%', 'height':'25vh' }, 600);
	}
	function aggrandir_caractere_de(element) { element.css( 'font-size','+=32px' ); }
	function appetir_caractere_de(element) { element.css( 'font-size','-=32px' ); }
	function centrer(element) { element.addClass('center'); }
	function display(element) { element.css('display','block'); }
	function fermer(element) {
	    element.animate({ 'height':0 }, 200);
	    setTimeout((function(){ element.css({ 'display':'none' }) }),180);
	}
	
</script>