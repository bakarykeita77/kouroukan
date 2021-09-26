var clavier_nko = $('#clavier_nko');
var tr = $('#clavier_nko tr');
var td = $('#clavier_nko td');
var son = $('#audio');
var source_son = "";
var caractere = "";
var lettre = "";

var niveau = $('.niveau').html();

if( niveau == 1 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo), #clavier_nko span').css( 'display','none' ); }
if( niveau == 2 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo, .nasalisation), #clavier_nko span, #ߚ').css( 'display','none' ); }
if( niveau == 3 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo, .tons, .nasalisation, .wolosso), #clavier_nko span, #ߚ').css( 'display','none' ); }
if( niveau == 4 ) { $('#clavier_nko').css( 'display','block' ); }




/*
// Codes pour espacer et lire les mots. 
	$('.espace').on('click', function(){

		//Entrer espace entre les caractères au tableau et dans le memoire du clavier
			var espace = $(this).attr('id');

		// Mettre l'espave entre les mots au tableau
			tableau_text[tableau_text.length] = espace;
			tableau.val(tableau_text.join(''));

		// Mettre l'espave entre les mots dans la memoire du clavier
			syllabes[syllabes.length] = espace;
			zone3.val(syllabes.join(''));

		// Codes pour la lecture audio des caractères saisies
			var audio = $('#audio');
			var source_son = "";

			var lecture_mot = setInterval(lire_mot, 300);

			var i = 0;
			function lire_mot(){

				audio.attr({src: 'son/mp3/syllabes/'+zone2_text[i]+'.mp3', autoplay: "on"});
				audio.attr({src: 'son/ogg/syllabes/'+zone2_text[i]+'.ogg', autoplay: "on"});
				
				i++;

				if(i>zone2_text.length){
					clearInterval(lecture_mot); // Fin de lecture dès après le dernier mot
					zone2_text.length = ""; // La zone2 doit etre vider après chaque lecture pour laisser la place à d'autre mot.
					zone2.val(zone2_text);
				};
			};
		});

// Codes pour lire à haute voix les mots saisis.
	$('#lire').on('click', function(){

		//Codes pour lire les caractères saisies
			var audio = $('#audio');
			var source_son = "";
				
			var lecture = setInterval(lire, 300);
			
			var i = 0;
			function lire(){
				
				audio.attr({src: 'son/mp3/syllabes/'+syllabes[i]+'.mp3', autoplay: "on"});
				audio.attr({src: 'son/ogg/syllabes/'+syllabes[i]+'.ogg', autoplay: "on"});
				i++;/* Iteraction évitant qu'une meme syllabe ne se repete cotinuellement. 
					   Ainsi chaque syllabe est lue une seule fois et de façon successive jusqu'à la dernier syllabe. */

				// La lecture doit s'arreter lorsque les syllabes seront lues en totalité.
/*				if(i>syllabes.length){
					clearInterval(lecture);
				}
			}	
	});
*/



// Event
/*	$('#tableau').on('click', function(e){
		
		var X = e.clientX;
		var Y = e.clientY;
		var tableau_text = $('#tableau').val();
		var liste = $('#liste');
		var titre_liste = $('#titre_liste');

		zone1.val(Y);
		zone2.val(X);
		zone3.val('Les coordonnées du curseur de la souris')

		// $('#smartboard').css('top', Y+'px');
		// $('#smartboard').css('right', -X+'px');

	});

// Deplacer le smartboard sur le tableau
	$('#tableau').on('focus', function(){
		
		var tableau_text = $('#tableau').val();
		var dernier_syllabe = tableau_text[tableau_text.length-1];
		var p = $('#apercu');
		var position = p.position();
		var top = position.top/10;
		var right = position.right;
		var n = tableau_text.length;
		
		$('#smartboard').css('top', '150px');
		$('#smartboard').css('right', n+'em');

		// $('#smartboard').css('top', Y+'em');
		// $('#smartboard').css('right', X+'em');

		$('#apercu').css('display', 'none');		
	});
	*/