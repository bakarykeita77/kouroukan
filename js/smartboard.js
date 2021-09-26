$('document').ready(function() {
	
	var touche_clavier = $('#clavier_nko td:not(.boutons)');
	var recherche_input = $('#recherche_input');
	var recherche_val = "";
    var caracteres = [];
    var mots = []; 
    var noms_suggeres = "", pronoms_suggeres = "", verbes_suggeres = "", prepos_suggeres = "", preps_suggeres = "";
    var noms = [], pronoms = [], verbes = [], prepos = [], preps =[];
    var categories = [];
    var memoire_sb = [];


/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
 * Tri des mots par ordre alphabetique. */
    
   /* Recuperation des données du dictionnaire dans des tableaux javaScript pour être triées. */    
    var td_noms = document.querySelectorAll('#table_noms td');	
    for(var i=0;i<td_noms.length;i++) {
        noms[noms.length] = td_noms[i].textContent;
    }
    
    var td_pronoms = document.querySelectorAll('#table_pronoms td');	
    for(var i=0;i<td_pronoms.length;i++) {
	    pronoms[pronoms.length] = td_pronoms[i].textContent;
    }
    
    var td_verbes = document.querySelectorAll('#table_verbes td');	
    for(var i=0;i<td_verbes.length;i++) {
	    verbes[verbes.length] = td_verbes[i].textContent;
    }
    
    var td_prepos = document.querySelectorAll('#table_prepos td');	
    for(var i=0;i<td_prepos.length;i++) {
	    prepos[prepos.length] = td_prepos[i].textContent;
    }
    
    var td_preps = document.querySelectorAll('#table_preps td');	
    for(var i=0;i<td_preps.length;i++) {
	    preps[preps.length] = td_preps[i].textContent;
    }
    
/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−*/

/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
 * Tri proprement dit.*/
 
    noms.sort();
    pronoms.sort();
    verbes.sort();
    prepos.sort();
    preps.sort();    
    
/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−*/    

/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−    
 * Insertion des mots triés dans les tableaux de suggestions qui sont masqués par defaut. */
   
    for(var i=0;i<noms.length;i++) {
 	    noms_suggeres += "<tr class='noms_tr'><td class='mo'>"+noms[i]+"</td> <td>&#9836;</td></tr>";      
 	    $('#suggestions_noms').html(noms_suggeres);
    }
   
    for(var i=0;i<pronoms.length;i++) {
	    pronoms_suggeres += "<tr class='pronoms_tr'><td class='mo'>"+pronoms[i]+"</td> <td>&#9836;</td></tr>";      
	    $('#suggestions_pronoms').html(pronoms_suggeres);
    }
    
    for(var i=0;i<verbes.length;i++) {
	    verbes_suggeres += "<tr class='verbes_tr'><td class='mo'>"+verbes[i]+"</td> <td>&#9836;</td></tr>";      
	    $('#suggestions_verbes').html(verbes_suggeres);
    }
    
    for(var i=0;i<prepos.length;i++) {
	    prepos_suggeres += "<tr class='prepos_tr'><td class='mo'>"+prepos[i]+"</td> <td>&#9836;</td></tr>";      
	    $('#suggestions_prepos').html(prepos_suggeres);
    }
	 
	 for(var i=0;i<preps.length;i++) {
		 preps_suggeres += "<tr class='preps_tr'><td class='mo'>"+preps[i]+"</td> <td>&#9836;</td></tr>";      
		 $('#suggestions_preps').html(preps_suggeres);
	 }
	
	 
/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−*/    

/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−*/
	$('#suggestions tr td:first-child').on('click', function() {
		caracteres.splice(0,caracteres.length);
		recherche_input.val(caracteres);
	    
	    var class_tape = $(this).parent().attr('class');
	    memoire_sb[memoire_sb.length] = class_tape;    
	    
	    var dernier_class = memoire_sb[memoire_sb.length-2];
	    var deuxieme_dernier_class = memoire_sb[memoire_sb.length-3];
	    var troisieme_dernier_class = memoire_sb[memoire_sb.length-4];
	    var quatrieme_dernier_class = memoire_sb[memoire_sb.length-5];
	    
	    
	    if( class_tape == "noms_tr" ) {
		    if( deuxieme_dernier_class == undefined ) {
			    if( dernier_class == undefined ) {
				    proposer( "prepos" );
			    }
		    }
		    if( deuxieme_dernier_class == "noms_tr" ) {
			    if( dernier_class == "prepos_tr" ) {
				    //proposer( "verbes" );
				    proposer( "noms" );
			    }
		    }
		    if( deuxieme_dernier_class == "pronoms_tr" ) {
			    if( dernier_class == "prepos_tr" ) {
				    proposer( "verbes" );
			    }
		    }
	    }

	    if( class_tape == "pronoms_tr" ) {
		    if( deuxieme_dernier_class == undefined ) {
			    if( dernier_class == undefined ) {
				    proposer( "prepos" );
			    }
		    }
		    if( deuxieme_dernier_class == "noms_tr" || deuxieme_dernier_class == "pronoms_tr" ) {
			    if( dernier_class == "prepos_tr" ) {
					proposer( "pronoms" );
			    }
		    }
	    }
	    

	    if( class_tape == "verbes_tr" ) {
		    if( deuxieme_dernier_class == "noms_tr" ) {
		        if( dernier_class == "prepos_tr" ) {
			        proposer( "pronoms" );
		        }
	        }
	    }

	    if( class_tape == "prepos_tr" ) {
		    if( deuxieme_dernier_class == undefined ) {
			    if( dernier_class == "noms_tr" ) {
				    proposer( "verbes" );
			    }
			    if( dernier_class == "pronoms_tr" ) {
				    proposer( "pronoms" );
			    }
		    }
		    if( deuxieme_dernier_class == undefined ) {
		    }
		    if( deuxieme_dernier_class == undefined ) {
			    if( dernier_class == "pronoms_tr" ) {
				    proposer( "noms" );
			    }
		    }
	    }

	});

	
	function proposer(mots) {
	    $('#suggestions .'+mots+'_tr').show();
	    $('#suggestions tr:not(.'+mots+'_tr)').hide();
	}

/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−*/

/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−*/    
 /* Lorsqu'on clique sur un bouton du clavier,...*/
	touche_clavier.click(function(){
	  
	 /* La fenêtre de suggestion, masquée par defaut, s'affiche*/
		$('#suggestions').css('display','block');
		caracteres[caracteres.length] = caractere;
		
	 /*  */
		if( caractere == "effacer" ) {
			caracteres.splice(caracteres.length-2,2);
			recherche_val = caracteres.join("");
		}
	
	 /* La barre de recherche (masquée) est initialisée. */
		recherche_val = caracteres.join("");
		recherche_input.val( recherche_val );
	 
	 /* Ce sont les mots dans le tableau de suggestions dont une partie correspond aux caracteres tapés qui s'affichent. */
	    $('#suggestions tr').filter($(':contains('+ recherche_val +')')).show();
	 
	 /* Les mots du tableau de suggestions dont aucune lettre ne correspond aux caracteres tapés sont/ou restent cachés. */
	    $('#suggestions tr').not($(':contains('+ recherche_val +')')).hide();
	 
	 /* Mais on veut que seuls les mots dans le tableau de suggestions dont le début correspond aux caracteres tapés qui restent affichés. */
	    $('#suggestions tr .mo').each(function() {
	        var ms = $(this).html(); // Le contenu de chaque mot à suggerer.
	        var ms1 = ms[0];         // La première lettre de chaque mot à suggerer.
	        var c1 = caracteres[0];  // La première lettre des caracteres tapés.
	        
	        if( ms1 != c1 ) {
	            $(this).parent().hide();
	        }
	    });
	});
/*−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−*/

});