
// Charger les mots de smartboard
	var c = $('#choix').html();
	
	$('#smartboard').html(
		
		'<table id="liste_de_choix">'+
			'<tr>'+
				'<td>'+c+'</td>'+
			'</tr>'+				
		'</table>'
	);

// Changer la couleur de fond lorsqu'on survole sur un mot. Faire une sorte d'animation.
	$('#smartboard td').on('mouseover', surbrillance);
	$('#smartboard td').on('mouseout', proprietes_initiales);
	$('#smartboard td').on('mousedown', changer_couleur_de_fond);
	$('#smartboard td').on('mouseup', reprendre_couleur_initiale);

	function surbrillance(){
		$(this).css('backgroundColor','#000');
		$(this).css('color','#fff');
	};

	function proprietes_initiales(){
		$(this).css('backgroundColor','#555');
		$(this).css('color','orange');
	};
	
	// Quand on enfonce le bouton sur nu mot, la couleur de fond change en jaune et la couleur de texte en noir.
	function changer_couleur_de_fond(){
		$(this).css('backgroundColor','yellow');
		$(this).css('color','#000');
	};

	// Quand on relache le bouton sur nu mot, la couleur de fond et la couleur de texte en noir reviennent à l'initial.
	function reprendre_couleur_initiale(){
		$(this).css('backgroundColor','#555');
		$(this).css('color','#fff');
	};

// Afficher le mot cliqué de smartboard sur le tableau.
	$('#smartboard td').on('click', ecrire_au_tableau);

	function ecrire_au_tableau(){
		tableau_text[tableau_text.length] = $(this).html()+" ";
		$('#tableau').val(tableau_text.join(""));
		$('#tableau').trigger('focus');
	};