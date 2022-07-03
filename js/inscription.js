$('#afficherInscription').on('click', function(){
	$('#arrierePlanInscription').css('right','0');

	$('#form_title').show('slow','linear',function(){
		$('#form_title').css('right','0');
		$('#form').show(1000,'linear');
	});
});

$('#inscription_form input').on('focus', function(){$('#clavier').css('bottom','0');});

$('#btnFermerInscription').on('click',function(){
	$('#popupInscription').css('top','-500em');
	$('#form').css('display','none');

	$('#haut_de_page').css('display', 'block');
	
	$('#pied_de_page').css('display', 'block');	
	$('#tableau_noir').css('display', 'block');
	$('#cadreClavier').css('display', 'none');
	$('#corps').css('display', 'block');

	$('#inscription').css('display', 'none');

});

// Ecrire le caractère tapé dans la zone où se trouve le curseur.
	$('input').on('mouseOver', function(e){
		$(this).attr('id','zone_de_saisie');
		alert(e.clientX);
	});