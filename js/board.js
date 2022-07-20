
$(document).ready(function(){
/*___________________________________________________________________________________________________________________________________
    les variables */
		var ww = window.screen.width;
		var wh = window.screen.height;

		var form = $('#tableau_form');
		var tableau_noir = $('#tableau_noir');
		var clavier = $('#clavier_nko');
		
		var memoire_tableau = $('#memoire_tableau');
		var syllabe_visible_input = $('#syllabe_visible_input');
		var syllabe_audible_input = $('#syllabe_audible_input');
		var mot_audible_input = $('#mot_audible_input');
		var texte_audible_input = $('#texte_audible_input');
		
		var syllabe_visible = [];
		var syllabe_audible = [];
		var mot_audible = [];
		var texte_audible = [];
		
        var dernier_caractere = "", avant_dernier_caractere = "";
        var c1 = "", c2 = "", c3 = "", c4 = "",c5 = "", c6 = "", c7 = "";
		
		var audio0 = $('#audio0');
		var audio1 = $('#audio1');
		var audio2 = $('#audio2');
		var audio3 = $('#audio3');
		var audio4 = $('#audio4');
		var audio5 = $('#audio5');
		var audio6 = $('#audio6');
		var audio7 = $('#audio7');
		var audio8 = $('#audio8');
		var audio9 = $('#audio9');

		

		var s = [], s1 = [], s2 = [], s3 = [], s4 = [], s5 = [];
		var cs = "";
		var caracteres = []; 
		
		var mot_courant = "";
		var texte1 = [];
		var texte2 = [];
		var texte_tableau = [];
		var texte_memoire = [];

		var lettres = ['ߊ', 'ߋ', 'ߌ', 'ߍ', 'ߎ', 'ߏ', 'ߐ', 'ߓ', 'ߔ', 'ߕ', 'ߖ', 'ߗ', 'ߘ', 'ߙ', 'ߚ', 'ߛ', 'ߜ', 'ߝ', 'ߞ', 'ߟ', 'ߡ', 'ߢ', 'ߣ', 'ߤ', 'ߥ', 'ߦ', 'ߒ'];
		var voyelles =  ['ߊ', 'ߋ', 'ߌ', 'ߍ', 'ߎ', 'ߏ', 'ߐ', 'ߒ'];
		var consonnes = ['ߓ', 'ߔ', 'ߕ', 'ߖ', 'ߗ', 'ߘ', 'ߙ', 'ߚ', 'ߛ', 'ߜ', 'ߝ', 'ߞ', 'ߟ', 'ߡ', 'ߢ', 'ߣ', 'ߤ', 'ߥ', 'ߦ', 'ߧ', 'ߠ']; 
		var espace = ' ';
		var apostrophes = ['ߴ', 'ߵ'];
		var ton = ['߫', '߬', '߭', '߮', '߯', '߰', '߱'];
		var nasalisation = '߲'; 
		var ponctuations = ['.', '߸', '߹', ',', '_', 'ߑ',';', '+', , '?'];
		var autres = ['(', ')', '{', '}', '߳', ':',  '@', '$', '&', '*', '|'];

		var chiffres = ['߀', '߁', '߂', '߃', '߄', '߅', '߆', '߇', '߈', '߉'];
		var erreur_content = [], correcte_content = [];
		var message_erreur = $('#message_erreur');
		
		var tableau_texte = [];
		var c = [], ch1 = "", ch2 = "", ch3 = "", ch4 = "",ch5 = "", ch6 = "", ch7 = "";
		var ds = "", ds1 = [], ds2 = [];

/*___________________________________________________________________________________________________________________________________
Les fonctions */
	function initialiser() { 
		syllabe_input.val(""); mot1_input.val(""); mot2_input.val(""); textarea1.val(""); textarea2.val("");
	 }
    function controle_caractere() {
		c  = syllabe;
		ch1 = c[c.length-1];
		ch2 = c[c.length-2];
		ch3 = c[c.length-3];
		ch4 = c[c.length-4];
		ch5 = c[c.length-5];
		
		ds  = mot1_input.val();
		ds1 = ds[ds.length-1];
		ds2 = ds[ds.length-2];
		ds3 = ds[ds.length-3];

		if( $.inArray( caractere,consonnes ) != -1 ) {
		
			$('#ecrit_errone').css( 'paddingRight',0 );
			$('#ecrit_errone').css( 'display','inline' ); 
		
			if( $.inArray( ch1,consonnes ) != -1 ) {
				if( $.inArray( ch2,consonnes ) != -1 ) {
					message_erreur.text( 'ߛߌ߬ߙߊ߬ߕߊ߫ ߛߓߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫' );
					afficher_erreur();
				}	
			}	
			if( $.inArray( ch1,apostrophes ) != -1 ) {
				if( $.inArray( ch2,apostrophes ) != -1 ) {
					message_erreur.text( 'ߘߜߊߛߌߒߠߊ߫ ߝߌ߬ߟߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫' );
					afficher_erreur();
				}
			}
		}
		
		if( $.inArray( caractere,voyelles ) != -1 ) {
			if( $.inArray( ds1,voyelles ) != -1 ) {
		        if( caractere == ds1 && caracteres.length != 0 ) {
					message_erreur.text( 'ߛߌ߬ߙߊ߬ߟߊ߲߬ ߛߎ߰ ߞߋߟߋ߲ ߞߊ߲ߡߊߛߙߋߒߕߊ߲߫ ߝߌ߬ߟߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫' );
					afficher_erreur();
					die();
				}
				if( $.inArray( ds2,voyelles ) != -1 && caracteres.length == 0 ) {
					message_erreur.text( 'ߛߌ߬ߙߊ߬ߟߊ߲߫ ߛߓߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫' );
					afficher_erreur();
					die();
				}
			}
		}
		
		if( $.inArray( caractere,ton ) != -1 ) {
		
			$('#ecrit_errone').css( 'paddingRight','16px' );
			$('#ecrit_errone').css( 'display','inline-block' ); 
		
			if( $.inArray( ch1,consonnes ) != -1 ) {
				message_erreur.text( 'ߞߊ߲ߡߊߛߙߋ߫ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߛߌ߬ߙߊ߬ߕߊ ߟߊ߫' );
				afficher_erreur();
			}
			if( $.inArray( ds1,ton ) != -1 ) {
				message_erreur.text( 'ߞߊ߲ߡߊߛߙߋ߫ ߝߌ߬ߟߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫');
				afficher_erreur();
			}
			if( $.inArray( ch1,apostrophes ) != -1 ) {
				message_erreur.text( 'ߞߊ߲ߡߊߛߋߙߋ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߘߜߊߛߌߒߠߊ ߟߊ߫' );
				afficher_erreur();
			}
		}
		
		
		if( caractere == nasalisation ) {
			
			$('#ecrit_errone').css( 'paddingRight','12px' );
			$('#ecrit_errone').css( 'display','inline-block' );  
		
			if( ds1 == nasalisation ) {
				message_erreur.text( 'ߞߊ߲ߠߊߘߌߦߊߟߊ߲߫ ߝߌ߬ߟߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫' );
				afficher_erreur();
			}
			if( ds1 == "" && caractere == nasalisation ) {
				//message_erreur.text( "ߞߎߡߊߘߋ߲ ߕߍ߫ ߘߊߡߌ߬ߘߊ߬ ߟߊ߫ ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߡߊ߬" );
				//afficher_erreur();
			}
			if( $.inArray( ch1,consonnes ) != -1 ) {
				message_erreur.text( 'ߞߊ߲ߠߊߘߌߦߊߟߊ߲߫ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߛߌ߬ߙߊ߬ߕߊ ߟߊ߫' );
				afficher_erreur();
			} 
			if( $.inArray( ch1,apostrophes ) != -1 ) {
				message_erreur.text( 'ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߣߌ߫ ߘߜߊߛߌߒߠߊ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫' );
				afficher_erreur();
			}
		}
		
		
		if( $.inArray( caractere,apostrophes ) != -1 ) {
			
			$('#ecrit_errone').css( 'paddingRight','4px' );
			$('#ecrit_errone').css( 'display','inline-block' );  
			
			if( $.inArray( ch1,apostrophes ) != -1 ) {
				message_erreur.text( 'ߘߜߊߛߌߒߠߊ߫ ߝߌ߬ߟߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫' );
				afficher_erreur();
			}
			if( $.inArray( ds1,voyelles ) != -1 ) {
				message_erreur.text( 'ߘߜߊߛߌߒߠߊ߫ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߊ߫' );
				afficher_erreur();
			}
			if( $.inArray( ds1,ton ) != -1 ) {
				message_erreur.text( 'ߘߜߊߛߌߒߠߊ߫ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߞߊ߲ߡߊߛߋߙߋ ߟߊ߫' );
				afficher_erreur();
			}
			if( ds1 == nasalisation ) {
				message_erreur.text( 'ߘߜߊߛߌߒߠߊ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߠߊ߫' );
				afficher_erreur();
			}
		}
	 }
	function effacer_caractere() {

	    if( syllabe.length > 0 ) {       
	        syllabe.splice(syllabe.length-1,1);
	    }else if( mot1.length > 0 ) {
		    
		    s = mot1[mot1.length-1];
		    c1 = s[s.length-1];
		    c2 = s[s.length-2];
		    c3 = s[s.length-3];
		    c4 = s[s.length-4];
		    c5 = s[s.length-5];
	
			if( $.inArray(c1,voyelles) != -1 && $.inArray(c2,consonnes) != -1 && $.inArray(c3,consonnes) != -1 ) {
			    mot2.splice(mot2.length-1,2);
		    }
		    if( $.inArray(c1,ton) != -1 && $.inArray(c2,voyelles) != -1 &&$.inArray(c3,consonnes) != -1 && $.inArray(c4,consonnes) != -1 ) {
			    mot2.splice(mot2.length-1,2);
		    }
	
		    mot1.splice(mot1.length-1,1);
	 	    mot2.splice(mot2.length-1,1);
	    }else if( syllabe.length == "" && mot1.length == "" && texte_tableau.length > 0 ) {
		    texte_tableau.splice(texte_tableau.length-1,1);
		    texte_memoire.splice(texte_memoire.length-1,1);
	    }else {
	        die();
	    }
	
	    tableau_texte = texte_tableau.concat(mot1).concat(syllabe);
	    
	    syllabe_input.val( syllabe.join("") );
	    
	    mot1_input.val( mot1.join("") );
	    mots_visible = mot1_input.val();
	    
	    mot2_input.val( mot2 );
	    mots_audible = mot2_input.val();
	    
	    tableau.val(tableau_texte.join(''));
	    textarea1.val( texte_tableau.join("") );
	    textarea2.val( texte_memoire );
	
	    die();
	}
	function charge_mots() {
		if( $.inArray( ch1,voyelles ) != -1 ) {
		    s1 = s2 = ch1;
			if( $.inArray( ch2,consonnes ) != -1 ) {
			    s1 = [ ch2,ch1 ].join("");
			    if( $.inArray( ch3,consonnes ) != -1 ) {
				    s1 = [ ch3,ch2,ch1 ].join("");		
				    s2 = [ ch3,ch1,"߫" ].join("");
				    s3 = [ ch2,ch1 ].join(""); 
			    }
				if( $.inArray( ch3,apostrophes ) != -1 ) {
					if( $.inArray( ch4,consonnes ) != -1 ) {
						s1 = [ ch4,ch3,ch2,ch1 ].join("");		
						s2 = [ ch4,ch3 ].join("");
						s3 = [ ch2,ch1 ].join(""); 
					}
				}
			}
			if( $.inArray( ch2,apostrophes ) != -1 ) {
				if( $.inArray( ch3,consonnes ) != -1 ) {
					s1 = [ ch3,ch2,ch1 ].join("");
					if( $.inArray( ch4,consonnes ) != -1 ) {
						s1 = [ ch4,ch3,ch2,ch1 ].join("");
						
						s2 = [ ch4,ch1,'߫' ].join("");
						s3 = [ ch3,ch2,ch1 ].join("");
					}
				}
			}
		}

		mot1[mot1.length] = s1;
		mot1_input.val( mot1.join("") );
		mots_visible = mot1_input.val();

		
		if( syllabe.length <= 2 ) {
			mot2[mot2.length] = s1;
		}
		if( syllabe.length == 3 && $.inArray(ch2,apostrophes) != -1 ) {
			mot2[mot2.length] = s1;
		}
		if( syllabe.length == 4 || syllabe.length == 3 && $.inArray(ch2,consonnes) != -1 ) {
			mot2[mot2.length] = s2;
			mot2[mot2.length] = s3;
		}
		mot2_input.val( mot2 );
		mots_audible = mot2_input.val();    

		vider_syllabe();
	}
	function charge_texte() {
		texte_vu =  texte_vu.concat( mot1.join("") );
		texte_entendu =  texte_entendu.concat( mot2.join("") );

		texte_tableau = texte_vu;
		texte_memoire = texte_entendu;

		textarea1.val( texte_tableau.join("") );
		textarea2.val( texte_memoire );
		espacer();

		vider_syllabe();
		//vider_syllabes();
		vider_mots();
		vider_assistant();
	 }
	 function lire(mot) {
	     /*
	     var lm = "";	     
	     for(i=0;i<mot.length;i++) { lm += "function lecture"+i+"() { audio"+i+".attr({ src:'son/mp3/'+mot["+i+"]+'.mp3', autoplay:'on' }); }"+'\n'; }  
  	     lm;
         */

	     function lecture0() { audio0.attr({ src:'son/mp3/'+mot[0]+'.mp3', autoplay:'on' }); }
	     function lecture1() { audio1.attr({ src:'son/mp3/'+mot[1]+'.mp3', autoplay:'on' }); }
	     function lecture2() { audio2.attr({ src:'son/mp3/'+mot[2]+'.mp3', autoplay:'on' }); }
	     function lecture3() { audio3.attr({ src:'son/mp3/'+mot[3]+'.mp3', autoplay:'on' }); }
	     function lecture4() { audio4.attr({ src:'son/mp3/'+mot[4]+'.mp3', autoplay:'on' }); }
	     function lecture5() { audio5.attr({ src:'son/mp3/'+mot[5]+'.mp3', autoplay:'on' }); }
	     function lecture6() { audio6.attr({ src:'son/mp3/'+mot[6]+'.mp3', autoplay:'on' }); }
	     function lecture7() { audio7.attr({ src:'son/mp3/'+mot[7]+'.mp3', autoplay:'on' }); }
	     function lecture8() { audio8.attr({ src:'son/mp3/'+mot[8]+'.mp3', autoplay:'on' }); }
	     function lecture9() { audio9.attr({ src:'son/mp3/'+mot[9]+'.mp3', autoplay:'on' }); }

	     function lire_mot() {
		     var p = 200;
		     setTimeout( lecture0, 0*p );
		     setTimeout( lecture1, 1*p );
		     setTimeout( lecture2, 2*p );
		     setTimeout( lecture3, 3*p );
		     setTimeout( lecture4, 4*p );
	     }
	     
	     lire_mot();
	 }
	 function lire_dernier_mot() {
	     mot_courant = texte_memoire[texte_memoire.length-2];	 
	     lire( mot_courant );
	 }
	 function lire_texte() {
		 var discours = [];
		 var i=0;

		 for( i=0;i<texte_memoire.length;i++ ) {
			 if( texte_memoire[i] != " " ) {
				 discours[discours.length] = texte_memoire[i];
				 
				 mot_courant = texte_memoire[i];	 
				 lire( mot_courant );
			 }
		 }
		 
		 var e = 0;

		 for(var i=0;i<discours.length;i++) {
			 e += discours[i-1].length*200;

			 setTimeout(l0,  e);
			 setTimeout(l1,  e);
			 setTimeout(l2,  e);
		 }
		 
		 function l0() { lire(discours[0]); }
		 function l1() { lire(discours[1]); }
		 function l2() { lire(discours[2]); }
	/*	 
		 for( i=0;i<discours.length;i++ ) {
			 mot_courant = texte_memoire[i];	 
			 lire( mot_courant );
		 }
	*/	 
	 }

	 function espacer() {
		texte_tableau[texte_tableau.length] = " ";
		texte_memoire[texte_memoire.length] = " ";
	 }
	/*Si Ton est le dernier caractere tapé*/
	function tonifier() {

		if( $.inArray( c1,voyelles ) != -1 ) {
			s1 = [ c1,caractere ].join(""); 
			if( $.inArray( c2,consonnes ) != -1 ) {
				s1 = [ c2,c1,caractere ].join(""); 
				if( $.inArray( c3,consonnes ) != -1 ) {
					s1 = [ c3,c2,c1,caractere ].join(""); 
					s2 = [ c2,c1,caractere ].join("");
					s3 = [ c3,c1,caractere ].join("");
				}
				if( $.inArray( c3,apostrophes ) != -1 ) {
					if( $.inArray( c4,consonnes ) != -1 ) {
						s1 = [ c4,c3,c2,c1,caractere ].join(""); 
						s2 = [ c4,c3 ].join("");
						s3 = [ c2,c1,caractere ].join("");
					}
				}
			}
			if( $.inArray( c2,apostrophes ) != -1 ) {
				if( $.inArray( c3,consonnes ) != -1 ) { 
		        	s1 = [ c3,c2,c1,caractere ].join("");
					if( $.inArray( c4,consonnes ) != -1 ) { 
						s1 = [c4,c3,c2,c1,caractere].join("");
						s2 = [c4,c1,caractere ].join("");
						s3 = [c3,c2,c1,caractere].join("");
					}
				}
			}
		}
		
		if( c1 == "߲" ) {
			if( $.inArray( c2,voyelles ) != -1 ) {
				s1 = [ c2,c1,caractere ].join(""); 
				if( $.inArray( c3,consonnes ) != -1 ) {
					s1 = [ c3,c2,c1,caractere ].join("");
					if( $.inArray( c4,apostrophes ) != -1 ) {
						if( $.inArray( c5,consonnes ) != -1 ) {
							s1 = [ c5,c4,c3,c2,c1,caractere ].join(""); 
							s2 = [ c5,c4 ].join("");
							s3 = [ c3,c2,c1,caractere ].join("");
						}
					}
				}
				if( $.inArray( c3,apostrophes ) != -1 ) {
					if( $.inArray( c4,consonnes ) != -1 ) {
						s1 = [ c4,c3,c2,c1,caractere ];
					}
				}
			}
		}
		
		mot1[mot1.length-1] = s1;
		mot1_input.val( mot1.join("") );
		mots_visible = mot1_input.val();
	    
	    if( s.length <= 2 ) {
		    mot2[mot2.length-1] = s1;
	    }
	    if( s.length == 3 ) {
		    if( $.inArray(c2,consonnes) != -1 ) {
			    mot2[mot2.length-1] = s2;
			    mot2[mot2.length-2] = s3;
		    }
			if( c1 == "߲" &&  $.inArray(c2,voyelles) != -1 ) {
			    mot2[mot2.length-1] = s1;
			}
		    if( $.inArray(c2,apostrophes) != -1 ) {
			    mot2[mot2.length-1] = s1;
		    }
	    }
	    if( s.length >= 4 ) {
			mot2[mot2.length-1] = s2;
			mot2[mot2.length-1] = s3;
			if( c1 == "߲"&& $.inArray(c2,voyelles) != -1  && $.inArray(c3,apostrophes) != -1 ) {
				mot2[mot2.length-1] = s1;
			}
		}   
		  

		mot2_input.val( mot2 );
		mots_audible = mot2_input.val();    

		vider_syllabe();	
 	 }
	function tonification_automatique() {

		if( $.inArray( c1,voyelles ) != -1 ) {
			s2 = [c1,'߫'].join("");
			if( $.inArray( c2,consonnes ) != -1 ) {
				s2 = [c2,c1,'߫'].join("");
				if( $.inArray( c3,consonnes ) != -1 ) {
					s2 = [c3,c1,'߫'].join("");
					s3 = [c2,c1,'߫'].join("");
				}
			}
			if( $.inArray( c2,apostrophes ) != -1 ) {
				if( $.inArray( c3,consonnes ) != -1 ) {
					s2 = [c3,c2,c1,'߫'].join("");
				}
			}
		}
		
		if( $.inArray( c1,ton ) != -1 ) {
		    if( $.inArray( c2,voyelles ) != -1 ) {
			    s2 = [ c2,c1 ].join("");
			    if( $.inArray( c3,consonnes ) != -1 ) {
				    s2 = [ c3,c2,c1 ].join("");
			    }
			    if( $.inArray( c3,apostrophes ) != -1 ) {
				    if( $.inArray( c4,consonnes ) != -1 ) {
				    s2 = [ c4,c3,c2,c1 ].join("");
				    }
			    }
		    }
			if( c2 == "߲" ) {
				if( $.inArray( c3,voyelles ) != -1 ) {
					s2 = [ c3,c2,c1 ].join("");
					if( $.inArray( c4,consonnes ) != -1 ) {
						s2 = [ c4,c3,c2,c1 ].join("");
					}
					if( $.inArray( c4,apostrophes ) != -1 ) {
						if( $.inArray( c5,consonnes ) != -1 ) {
							s2 = [ c5,c4,c3,c2,c1 ].join("");
						}
					}
				}
			}
		}

		if( c1 == '߲' ) {
			if( $.inArray( c2,voyelles ) != -1 ) {
				s2 = [ c2,c1,'߫' ].join("");
				if( $.inArray( c3,consonnes ) != -1 ) {
					s2 = [ c3,c2,c1,'߫' ].join("");
				}
				if( $.inArray( c3,apostrophes ) != -1 ) {
					if( $.inArray( c4,consonnes ) != -1 ) {
						s2 = [ c4,c3,c2,'߫' ].join("");
					}
				}
			}
			if( $.inArray( c2,ton ) != -1 ) {
				if( $.inArray( c3,voyelles ) != -1 ) {
					s2 = [ c3,c2,c1,'߫' ].join("");
					if( $.inArray( c4,consonnes ) != -1 ) {
						s2 = [ c4,c3,c2,c1,'߫' ].join("");
					}
				}
			}
		}
		
	    if(s.length <= 2) {
			mot2[ mot2.length-1 ] = s2;
			mot2_input.val( mot2 );
			mots_audible = mot2_input.val();
		}
		if( s.length = 3 && $.inArray(c2,consonnes) != -1 && $.inArray(c3,consonnes) != -1 ) {
			mot2[ mot2.length-2 ] = s2;
			mot2[ mot2.length-1 ] = s3;
			mot2_input.val( mot2 );
			mots_audible = mot2_input.val();
		}
	 }
 	function nasaliser() {

	 	if( $.inArray( c1,voyelles ) != -1 ) {
		 	s1 = [ c1,caractere ].join("");
		 	if( $.inArray( c2,consonnes ) != -1 ) {
			 	s1 = [ c2,c1,caractere ].join("");
			 	if( $.inArray( c3,apostrophes ) != -1 ) {
				 	if( $.inArray( c4,consonnes ) != -1 ) {
					 	s1 = [ c4,c3,c2,c1,caractere ].join(""); 
					 	s2 = [ c4,c3 ].join("");
					 	s3 = [ c2,c1,caractere ].join("");
				 	}
			 	}
		 	}
		 	if( $.inArray( c2,apostrophes ) != -1 ) {
		 		if( $.inArray( c3,consonnes ) != -1 ) {
			 		s1 = [ c3,c2,c1,caractere ].join("");
		 		}
		 	}
	 	}
	 	if( $.inArray( c1,ton ) != -1 ) {
			if( $.inArray( c2,voyelles ) != -1 ) {
			 	s1 = [ c2,c1,caractere ].join("");
			 	if( $.inArray( c3,consonnes ) != -1 ) {
				 	s1 = [ c3,c2,c1,caractere ].join("");
				 	if( $.inArray( c4,apostrophes ) != -1 ) {
					 	if( $.inArray( c5,consonnes ) != -1 ) {
						 	s1 = [ c5,c4,c3,c2,c1,caractere ].join(""); 
						 	s2 = [ c5,c4 ].join("");
						 	s3 = [ c3,c2,c1,caractere ].join("");
					 	}
				 	}
			 	}
			}
	 	}î
	 	
	 	mot1[mot1.length-1] = s1;
	 	mot1_input.val( mot1.join("") );
	 	mots_visible = mot1_input.val();
	 	
	 	if( s.length <= 2 ) {
		 	mot2[mot2.length-1] = s1;
		 	mot2_input.val( mot2 );
		 	mots_audible = mot2_input.val();  
	 	}
	 	if( s.length >= 3 ) {
	 	    if($.inArray( c1,ton ) != -1) {
			 	mot2[mot2.length-1] = s1;
			 	mot2_input.val( mot2 );
	 	    }else{
			 	mot2[mot2.length-2] = s2;
			 	mot2[mot2.length-1] = s3;
			 	mot2_input.val( mot2 );
			 	mots_audible = mot2_input.val();
		 	} 
	 	}	
	 		
	 	vider_syllabe();
 	 }
	function vider_syllabe() {
 	 	syllabe.splice( 0,syllabe.length );
		syllabe_input.val( syllabe );
	 }	
	function vider_mots() {
	  // Suppression du contenu de la variable "syllabes" pour eviter sa repetition.
		mot1.splice( 0,mot1.length );
		mot2.splice( 0,mot2.length );

  		mot1_input.val( mot1 );
  		mot2_input.val( mot2 );

  		mots_visible = mot1_input.val();
  		mots_audible = mot2_input.val();
	 }	
	function vider_mot() {
		 mot1.splice( 0,mot1.length );
		 mot2.splice( 0,mot2.length );
	 }
	function afficher_erreur() {
		$('#ecrit_errone').text( caractere );
		$('#ecrit_correcte').text( mot1.join("") + syllabe.join("") );
		$('#assistant').css({ 'transform':'scale(1)' });
		die();
	 }
	function vider_assistant() {
		erreur_content = "";
  		correcte_content = "";
		$('#ecrit_errone').html( erreur_content );
		$('#ecrit_correcte').html( correcte_content );
	 }

//initialiser();


    effacerMemoire();
	
/*___________________________________________________________________________________________________________________________________
   
   
   
   
   Les parametrages du tableau */
    $('#parametre_icone').on('click', function() { $('#parametres_tableau').toggle(100); $('#board_menu_deroulant').css('display','none'); });
    $('#board_menu_icone').on('click', function() { $('#board_menu_deroulant').toggle(100); });
    
    $('#pause').on('click', function() {
        $(this).css('display','none');
        $('#play').css('display','inline-block');
    });
    $('#tableau_noir').on('dblclick', function() { $('#memoire_tableau').toggle(100); });
    $('#effacer_tableau').on('click', function() { effacerMemoire(); });
    $('#play').on('click', function() {
        var texte = tableau_noir.val();
        
        $(this).css('display','none');
        $('#pause').css('display','inline-block');
        
        effacerMemoire();

        for(var i=0; i<texte.length; i++) {
            
            let caractere_suivante = texte[i];  
            let caractere_precedante = syllabe_visible[syllabe_visible.length-1]; 
  //  alert(caractere_suivante);
         /*---------------------------------------------------------------------------------------*/   
        
            if($.inArray(caractere_suivante,espace.concat(ponctuations)) != -1) { 
                if($.inArray(caractere_precedante,espace.concat(ponctuations)) == -1) { 
                    
                    chargerSyllabeAudible1();
                    chargerMotAudible();
                    chargerTexteAudible();
                    
                    
                    effacerSyllabeVisible();
                    effacerSyllabeAudible();
                    effacerMotAudible();
                }
            }
            
         /*---------------------------------------------------------------------------------------*/   
            
            if($.inArray(caractere_suivante,consonnes) != -1 ) { 
                if($.inArray(caractere_precedante,consonnes) == -1 ) { 
                    chargerSyllabeAudible2(); 
                    chargerMotAudible();
                    
                    effacerSyllabeVisible();   
                    effacerSyllabeAudible();
                }
            }

         /*---------------------------------------------------------------------------------------*/ 
          
            chargerSyllabeVisible();
            
         /*---------------------------------------------------------------------------------------*/   
    
            function chargerSyllabeVisible() {
                syllabe_visible.push(caractere_suivante);
                syllabe_visible_input.val(syllabe_visible);
            }
            function chargerSyllabeAudible1() {
                
                syllabe_audible[syllabe_audible.length] = syllabeVisibleConvertiEnAudible1();
                syllabe_audible_input.val(syllabe_audible);

                
                function syllabeVisibleConvertiEnAudible1() {
                    
                    let syllabe_a_convertir = syllabe_visible_input.val().split(',');
                    let sa1 = []; // Comme syllabe audible
             
                    c1 = syllabe_a_convertir[syllabe_a_convertir.length-1];
                    c2 = syllabe_a_convertir[syllabe_a_convertir.length-2];
                    c3 = syllabe_a_convertir[syllabe_a_convertir.length-3];
                    c4 = syllabe_a_convertir[syllabe_a_convertir.length-4];
                    c5 = syllabe_a_convertir[syllabe_a_convertir.length-5];
             

                    if($.inArray(c1,ton) != -1) {
                        if($.inArray(c2,voyelles) != -1) {
                            sa1[sa1.length] = c2+c1;
                            if($.inArray(c3,consonnes) != -1) {
                                sa1[sa1.length-1] = c3+c2+c1;
                                if($.inArray(c4,consonnes) != -1) {
                                    sa1[sa1.length-1] = c4+c2+c1;
                                    sa1[sa1.length] = c3+c2+c1;
                                }
                            }
                        }
                    }
                    if($.inArray(c1,voyelles) != -1) {
                        if($.inArray(c2,consonnes) != -1) {
                            sa1[sa1.length] = c2+c1;
                            if($.inArray(c3,consonnes) != -1) {
                                sa1[sa1.length-1] = c3+c1+'߫';
                                sa1[sa1.length] = c2+c1;
                            }
                        }
                    }
           
                    return sa1;
                }    
            }
            function chargerSyllabeAudible2() {
                
                syllabe_audible[syllabe_audible.length] = syllabeVisibleConvertiEnAudible2();
                syllabe_audible_input.val(syllabe_audible);
                

                function syllabeVisibleConvertiEnAudible2() {
                    
                    let syllabe_a_convertir = syllabe_visible_input.val().split(',');
                    let sa2 = []; // Comme syllabe audible
          
                    c1 = syllabe_a_convertir[syllabe_a_convertir.length-1];
                    c2 = syllabe_a_convertir[syllabe_a_convertir.length-2];
                    c3 = syllabe_a_convertir[syllabe_a_convertir.length-3];
                    c4 = syllabe_a_convertir[syllabe_a_convertir.length-4];
                    c5 = syllabe_a_convertir[syllabe_a_convertir.length-5];
             
         

                    if($.inArray(c1,ton) != -1) {
                        if($.inArray(c2,voyelles) != -1) {
                            sa2[sa2.length] = c2+c1;
                            if($.inArray(c3,consonnes) != -1) {
                                sa2[sa2.length-1] = c3+c2+c1;
                                if($.inArray(c4,consonnes) != -1) {
                                    sa2[sa2.length-1] = c4+c2+c1;
                                    sa2[sa2.length] = c3+c2+c1;
                                }
                            }
                        }
                    }
                    if($.inArray(c1,voyelles) != -1) {
                        sa2[sa2.length] = c1+'߫';
                        if($.inArray(c2,consonnes) != -1) {
                            sa2[sa2.length-1] = c2+c1+'߫';
                            if($.inArray(c3,consonnes) != -1) {
                                sa2[sa2.length-1] = c3+c1+'߫';
                                sa2[sa2.length] = c2+c1+'߫';
                            }
                        }
                    }

                    return sa2;
                }    
            }
            function chargerMotAudible() {
                mot_audible[mot_audible.length] = syllabe_audible_input.val().split(',');
                mot_audible_input.val(mot_audible);
                
                let maiv = mot_audible_input.val().split(',');
                if(maiv[0] == "") {
                    maiv.splice(0,1);
                    mot_audible_input.val(maiv);
                }
            }
            function chargerTexteAudible() {
                texte_audible[texte_audible.length] = mot_audible_input.val().split(',');
                texte_audible[texte_audible.length] = espace;
                texte_audible_input.val(texte_audible);
            }
            
        }
    });
    function effacerTableau() { tableau_noir.val(''); }
    function effacerMemoire() {
        
        syllabe_visible.splice(0,syllabe_visible.length);
        syllabe_audible.splice(0,syllabe_audible.length);
        mot_audible.splice(0,mot_audible.length);
        texte_audible.splice(0,texte_audible.length);
            
        $('#syllabe_visible_input').val(syllabe_visible);
        $('#syllabe_audible_input').val(syllabe_audible);
        $('#mot_audible_input').val(mot_audible);
        $('#texte_audible_input').val(texte_audible);
    }
    function effacerSyllabeVisible() {
        syllabe_visible.splice(0,syllabe_visible.length);
        syllabe_visible_input.val(syllabe_visible);
    }
    function effacerSyllabeAudible() {
        syllabe_audible.splice(0,syllabe_audible.length);
        syllabe_audible_input.val(syllabe_audible);
    }
    function effacerMotAudible() {
        mot_audible.splice(0,mot_audible.length);
        mot_audible_input.val(mot_audible);
    }
    
    
    /*
    document.getElementById('tableau_noir').onkeyup = function(event){
        
        //let x = event.key; 
    
        let tableau = $('#tableau_noir');
        
        let dernier_caractere = tableau.val()[tableau.val().length-1];  
        
        if($.inArray(dernier_caractere,espace) != -1) {
            
            mot1[mot1.length] = $('#syllabe_input').val();
            $('#mot1_input').val(mot1.join(''));
            
            texte1[texte1.length] = $('#mot1_input').val();
            texte1[texte1.length] = $('syllabe_input').val();
            $('#texte1_input').val(texte1);
            
            syllabe.splice(0,syllabe.length);
            $('#syllabe_input').val(syllabe);
            
            mot1.splice(0,mot1.length);
            $('#mot1_input').val(mot1);
            
        }
        
        if($.inArray(dernier_caractere,consonnes) != -1 ) {
            mot1[mot1.length] = $('#syllabe_input').val();
            $('#mot1_input').val(mot1.join(''));
            
            syllabe.splice(0,syllabe.length);
            $('#syllabe_input').val(syllabe);
        }
        
        if($.inArray(dernier_caractere,espace) == -1) {
            syllabe.push(dernier_caractere);
            $('#syllabe_input').val(syllabe.join(''));
        }
    }
    */
   
   

	$('#couleur').on('click', reglage_couleurs);
	//$('#zoum').on('click', reglage_zoom);
	
	function reglage_couleurs() { $('#details_parametres').animate({ 'top':0 }, 250); }
	function reglage_zoom() { $('#details_parametres').animate({ 'top':'-100%' }, 250); }

/*___________________________________________________________________________________________________________________________________
Lorsqu'on appuie une touche du clavier, il se passe ce qui suit: */
	$('#clavier_nko td:not(.boutons)').on('click', function(){
	
	/* L'assistant reste caché comme par defaut (ses dimensions sont reduites à 0). Il n'apparaitra qu'en cas d'erreur de frappe. */
	    $('#assistant').css({ 'transform':'scale(0)' });
	
    /*___________________________________________________________________________________________________________________________
	1°)- Formation du caractere	*/
	    if( tableau.hasClass('tableau_active') ) {

			if( caractere == "effacer" ) {
	            effacer_caractere();
			}

		
	/*___________________________________________________________________________________________________________________________
	2°)- Control du caractere	*/
            controle_caractere(); // voir ligne 64.
	/*___________________________________________________________________________________________________________________________
	3°)- Formation des caracteres	
	* Les caractères s'accumulent dans la variable nommée "syllabe" pour former une syllabe.	*/		
	
		syllabe[ syllabe.length ] = caractere;
		syllabe_input.val( syllabe.join("") );
		
		/* Affichage des textes tapées, au tableau noir.  */
		tableau_texte = texte_tableau.concat(mot1).concat(syllabe1).concat(syllabe);
		tableau.val(tableau_texte.join(''));
	/*___________________________________________________________________________________________________________________________
	4°) - Formation de syllabe lorsqu'on appuie une voyelle	*/
			if( $.inArray( caractere,voyelles ) != -1 || caractere == 'ߒ' ) {
		
				c  = syllabe;
				ch1 = c[c.length-1];
				ch2 = c[c.length-2];
				ch3 = c[c.length-3];
				ch4 = c[c.length-4];
				ch5 = c[c.length-5];
				
		  		charge_mots();
			}
	/*___________________________________________________________________________________________________________________________
	5°)- Tonification et nasalisation des voyelles */
			if( $.inArray( caractere,ton ) != -1 ) {
			  	
			  	s  = mot1[mot1.length-1];
			  	c1 = s[s.length-1];
			  	c2 = s[s.length-2];
			  	c3 = s[s.length-3];
			  	c4 = s[s.length-4];
			  	c5 = s[s.length-5];
			  	
			  	tonifier();		  		
			}	
	/*___________________________________________________________________________________________________________________________
	6°)- Tonification et nasalisation des voyelles */
			if( caractere == "߲" ) {
				
				s  = mot1[mot1.length-1];
				c1 = s[s.length-1];
				c2 = s[s.length-2];
				c3 = s[s.length-3];
				c4 = s[s.length-4];
				c5 = s[s.length-5];
				
				nasaliser();		  		
			}	
	/*___________________________________________________________________________________________________________________________
	    7°)- Tonification automatique lorsqu'on appuie une consonne : */
			if( $.inArray( caractere,consonnes ) != -1 ) {
				
				s  = mot1[mot1.length-1];
				c1 = s[s.length-1];
				c2 = s[s.length-2];
				c3 = s[s.length-3];
				c4 = s[s.length-4];
				c5 = s[s.length-5];
				
				tonification_automatique();
			}
	/*___________________________________________________________________________________________________________________________
	8°)- Formation de mot lorsqu'on appuie un espace	*/
			if( caractere == espace || $.inArray( caractere,ponctuations ) != -1 ) {
				charge_texte();
				lire_dernier_mot();
		    }

	}});

    tableau.on('click', function(){
	    lire_texte();
	    afficherClavier();

    });
    

    function lire_textes() {
        setTimeout(lecture1,   0);
        setTimeout(lecture2, 400);
        setTimeout(lecture3, 800);
    }
    
    function lecture1() { var m = texte_memoire; audio.attr({ src:"son/mp3/"+m[m.length-2][0]+".mp3", autoplay:"on" }); }
	function lecture2() { var m = texte_memoire; audio.attr({ src:"son/mp3/"+m[m.length-2][1]+".mp3", autoplay:"on" }); }
    function lecture3() { var m = texte_memoire; audio.attr({ src:"son/mp3/"+m[m.length-2][2]+".mp3", autoplay:"on" }); }


    $('#fermer_clavier').on('click', function() {
        $('#clavier_tableau').css({ 'transform':'scaleY(0)' });
    });
    
    function afficherClavier() {
        $('#clavier_tableau').css({ 'transform':'scaleY(1)' });
    }
    
});