$(document).ready(function() {
    
    var window_h = $(window).innerHeight();
    var teste_div, teste_container, teste, reponse_teste, evaluation, evaluation_btn, fermer_teste;
    var clavier = $('#teste_clavier');
    var touche_clavier = "";
    var lien = [];
    var alphabets = [], syllabe = [], tonifie = [];

    var liste_de_matieres = [
        ["alphabet_nko", "ߛߓߍߛߎ߲"],
        ["syllabes_nko", "ߜߋ߲߭"],
        ["nasalisation", "ߞߊ߲ߠߊߘߌߦߊߟߊ߲"],
        ["tons", "ߞߊ߲ߡߊߛߙߋ"],
        ["chiffres_nko", "ߖߊ߰ߕߋ߬ߘߋ߲"]
     ];
    var liste_de_phases = [
        ["apprentissage", "ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ"],
        ["exercices", "ߡߊ߬ߞߟߏ߬ߟߌ"],
        ["evaluation", "ߞߘߐߓߐߟߌ"]
     ];
    var caracteres = [
        ["ߊ", "ߋ", "ߌ", "ߍ", "ߎ", "ߏ", "ߐ"],
        ["ߓ", "ߔ", "ߕ", "ߖ", "ߗ", "ߘ", "ߙ", "ߛ", "ߜ", "ߝ", "ߞ", "ߟ", "ߡ", "ߢ", "ߣ", "ߤ", "ߥ", "ߦ"],
        ["ߚ"],
        ["ߒ"],
        ["", "߲"],
        ["߫", "߬", "", "߭", "߯", "߰", "߮", "߱"]
     ];
    var chiffres = ["߀", "߁", "߂", "߃", "߄", "߅", "߆", "߇", "߈", "߉"];
    var niveau_d_apprentissage, matieres, matiere_active_nom, matiere_suivante_nom, matiere_precedante_nom;
    var matieres_nom = [];
    
    
    var les_caracteres = [];
    var l_alphabet = [];
    var les_syllabes = [];
    var la_nasalisation = [];
    var les_tons = [];
    var les_apostrophes = [];

    var mot = "";
    var questionneur, repeteur, correcteur;
    var tableau_questions = [];
    var questionnaire = [];
    var ducourrage = "";
    var nombre_aleatoire = "", na = "", n = "";
    var i, j, k, l, m;
    var audio = $('#audio');
    var tdw = $('.table_parlante td').css('width');
    var conformite = "", reponse = [], question = [];
    var ch = "", syllab = [], tonn = [];
    var q = "", q1 = "", q2 = "", q3 = "", q4 = "", q5 = "";
    var r = "", r1 = "", r2 = "", r3 = "", r4 = "", r5 = "";
    
    alphabet();	
    lesSyllabes();
    laNasalisation();
    lesTons();
  
    les_caracteres = [l_alphabet, les_syllabes, la_nasalisation, les_tons, chiffres];
    
    function alphabet(){	
        for(i=0;i<caracteres[0].length;i++){
            l_alphabet[l_alphabet.length] = caracteres[0][i];
        }
        for(j=0;j<caracteres[1].length;j++){
            l_alphabet[l_alphabet.length] = caracteres[1][j];
        }
        for(k=0;k<caracteres[2].length;k++){
            l_alphabet[l_alphabet.length] = caracteres[2][k];
        }
        for(l=0;l<caracteres[3].length;l++){
            l_alphabet[l_alphabet.length] = caracteres[3][l];
        }
        
        return l_alphabet;
     }
    function lesSyllabes(){
        for(i=0;i<caracteres[1].length;i++){
        for(j=0;j<caracteres[0].length;j++){
            les_syllabes[les_syllabes.length] = caracteres[1][i] + caracteres[0][j];
        }}
        
        return les_syllabes;
     }
    function laNasalisation(){
        for(i=0;i<caracteres[1].length;i++){
        for(j=0;j<caracteres[0].length;j++){
            la_nasalisation[la_nasalisation.length] = caracteres[1][i] + caracteres[0][j] + caracteres[4][1];
         }}
       
        return la_nasalisation;
     }
    function lesTons(){
        for(l=0;l<caracteres[4].length;l++){
        for(i=0;i<caracteres[1].length;i++){
        for(j=0;j<caracteres[0].length;j++){
        for(k=0;k<caracteres[5].length;k++){
            les_tons[les_tons.length] = caracteres[1][i] + caracteres[0][j] + caracteres[5][k] + caracteres[4][l];
        }}}}
        
        return les_tons;
     }
    
    
    matieres = $('#table_de_matieres_container .matieres');
    $.each(matieres, function(){
        matieres_nom[matieres_nom.length] = $(this).children().html();
     });
    
    matieres.on('click', function(){
        matiere_active_nom = $(this).children().html();
        matiere_suivante_nom = $(this).next().children().html();
        var nda = matieres_nom.indexOf(matiere_active_nom)+1;
        niveau_d_apprentissage = chiffres[nda];
         		
        /* Evaluation est par defaut cachee */
        evaluation_btn = $('.evaluation_btn');
        teste_div = $('#teste_div');
        teste_container = $('#teste_container');
        teste = $('#teste');
        fermer_teste = $('#fermer_teste');
        teste_div.hide();
        
        evaluation_btn.on('click', function(){
            
            var nombre_maximal_de_question = 5;
            var numeros_memoire = [];
            var questions_memoire = [];
            var reponses_memoire = [];
            var reponses_tapees_memoire = [];
            var reponse_tapee = '';
            var points_memoire = [];
            var teste_memoire = [numeros_memoire, questions_memoire, reponses_memoire, points_memoire];
            var point, total_point = 0;
                        
            var compteur_de_question = 0;
    	    var nombre_de_vrai_reponse = 0;
    	    var nombre_de_fausse_reponse = 0;

            teste = $(this).siblings('#teste');
            selectionDesElementsDeTeste();
                
    		function incrementer() {
    			var i = 0;
    			return function() { return i++; };
    		 }
    		var compteur = incrementer();

            parametrageDuClavier();
            afficherTestDiv();
        	chargerTesteEntete();
    		initialisationDuLabeleDeBoutonQuestionneur();
            permutationDeTesteBoutons();
        	
        	questions();
        	repetition();
        	reponses();
    	    correctionEtResultat();

            var cw = $('#felicitation').width();
        	$('#felicitation').css({ 'height':cw });
            fermerTestDiv();
            
            
            function selectionDesElementsDeTeste(){
                teste_corps     = $('#teste_corps');
                questionneur    = teste.find( '#questionneur');
                repeteur        = teste.find( '#repeteur'    );
                correcteur      = teste.find( '#correcteur'  );
                touche_clavier  = teste.find( '#teste_clavier #clavier_nko td' );
                reponse_teste   = $('#reponse_teste');
             }
            function parametrageDuClavier(){
                $('#clavier_nko td').css({ 'display':'block' });
                
                if( nda == 1 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo), #clavier_nko span').css( 'display','none' ); }
                if( nda == 2 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo, .nasalisation), #clavier_nko span, #ߚ').css( 'display','none' ); }
                if( nda == 3 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo, .nasalisation), #clavier_nko span, #ߚ').css( 'display','none' ); }
                if( nda == 4 ) { $('#clavier_nko td:not(.voyelles, .consonnes, .tedo, .tons, .nasalisation, .wolosso), #clavier_nko span, #ߚ').css( 'display','none' ); }
                if( nda == 5 ) { $('#clavier_nko td:not(.chiffres), #clavier_nko span, #ߚ').css( 'display','none' ); }
             }
            function afficherTestDiv(){
                teste_div.css({ 'display':'block', 'height':window_h-84+'px' });
             }
        	function chargerTesteEntete(){
        	    
            	var rang = '';
            	var nom_de_la_matiere = liste_de_matieres[nda-1][1];

            	if(nda===1){ rang = '߭'; }else{ rang = '߲'; }
            	$('#nivo').html( "ߞߛߊߞߊ_"+niveau_d_apprentissage+rang+": "+nom_de_la_matiere );
        	 }
    		function initialisationDuLabeleDeBoutonQuestionneur(){
    		    	
                var premier_tour_du_compteur = compteur();
            	tableau_questions = les_caracteres[nda-1];
               
                $('#tq').text( convertirChiffreEnNko(nombre_maximal_de_question) );
    		    $('#rq').html( convertirChiffreEnNko(premier_tour_du_compteur+1)+'߭' );
    		    $('#ecoute_label').html('ߟߊߡߍ߲߫');
    		 }
    	    function permutationDeTesteBoutons(){
    	        questionneur.on('click', function(){
    	            $(this).css({'display':'none'});
    	            repeteur.css({'display':'block'});
                    correcteur.css({'display':'none'});
    	        });
    	        $('#teste_clavier td').on('click', function(){
                    questionneur.css({'display':'none'});
    	            repeteur.css({'display':'none'});
    	            correcteur.css({'display':'block'});
    	        });
    	        correcteur.on('click', function(){
    	            $(this).css({'display':'none'});
                    repeteur.css({'display':'none'});
    	            setTimeout(function(){ questionneur.css({'display':'block'}); }, 3500);
    	        });
    	     }
    	    
        	function questions(){
        	    var questionnaires = mixterTableElements(tableau_questions);
            	questionneur.on('click', function() {
         	   
            		$('#felicitation #p1').removeClass( 'main_animee' );
            	    $('#indication, #felicitation, #ducourrage').css('transform','scale(0)');
            	    
                    actualisationDuLibeleDeBoutonQuestionneur();
            	    effacerLaReponsePrecedente();
            	    poserUneQuestion();
            	    chargementDesTableauxPourLeRemplissageDuResultat();
    
            	    function actualisationDuLibeleDeBoutonQuestionneur(){
                		compteur_de_question = compteur();
            		    rang = '߲';
                    	ecoute_label_html = 'ߠߊߡߍ߲߫' ;
            			
                		$('#rq').html( convertirChiffreEnNko(compteur_de_question+1)+rang );
            		    $('#ecoute_label').html( ecoute_label_html );
                		$('#progress_bar').css({'display':'block'});
            	     }
            	    function effacerLaReponsePrecedente(){
                	    reponse.splice(0,reponse.length);
                	    reponse_teste.html( reponse );
            	     }
            	    function poserUneQuestion(){
                		question = questionnaires[compteur_de_question-1];
                		lireQuestion();
            	     }
            	    function chargementDesTableauxPourLeRemplissageDuResultat(){
                    	if(compteur_de_question===1){
            		        rang = '߭';
                    	}else{
            		        rang = '߲';
                    	}
        
                		numeros_memoire[numeros_memoire.length] = convertirChiffreEnNko(compteur_de_question)+rang;
                		questions_memoire[questions_memoire.length] = question;
            	     }
            	});
        	 }
        	function repetition(){
        	    repeteur.on('click', function() { lireQuestion(); });
        	 }
        	function reponses(){
        	    touche_clavier.on('click', function(e){
        	        e.stopPropagation();
                        
                    if(compteur_de_question===0){
            
                        questionneur.css({'display':'block'});
                        repeteur.css({'display':'none'});
                        correcteur.css({'display':'none'});

                     /* Si l'usager veut taper un caractere alors qu'aucune question n'est encore posée (le
                        compteur est zero), un message s'affiche pour l'indiquer qu'il doit d'abord cliquer sur
                        le bouton questionneur pour ecouter la question*/
                        guider_apprenant();
                        die();
                     }
        		    reponse[reponse.length] = caractere;

        		  /* effacer le dernier caractere tape. */
        		    if( caractere == "effacer" ) 
        		    { reponse.splice( reponse.length-2,2 ); reponse_teste.html( reponse.join('') ); }else 
                    { reponse_teste.html( reponse.join('') ); }
                
    	         });
                function guider_apprenant() {

                    $('#indication').css({ 'transform':'scale(1)' });
                    $('#doigt').addClass( 'ai' );
            
                    setTimeout((function() {questionneur.css( 'background-color','#aaa' );}), 750);
                    setTimeout((function() {questionneur.css( 'background-color','#666' );}), 1000);
                    setTimeout((function() {$('#doigt').removeClass( 'ai' );}), 1400);
                    setTimeout((function() {$('#indication').css( 'transform','scale(0)' );}), 1400);
                 }
        	 }
    	    function correctionEtResultat(){
        	    correcteur.on('click', function(){
        	        correction();
        	        proclamationDuresultat();
                    reload();
                    
            	    function correction(){
        
                      /* Comparaison des variables 'question' et 'reponse'    */
                        if(question===reponse.join("") && question.length >= reponse.length){
                            conformite = "vrais";
                            reponse_tapee = reponse.join("");
                            point = chiffres[1]; 
                            total_point += 1;
                        }else{
                            conformite = "fausse"; 
                            point = chiffres[0]; 
                            reponse_tapee = '<span class="fausse_rps">'+reponse.join("")+'</span><span class="fausse_rps rouge">&#10005;</span>';
                         }
                        

                        reponses_memoire[reponses_memoire.length] = reponse_tapee;
                	    reponses_tapees_memoire[reponses_tapees_memoire.length] = reponse.join("");
                        points_memoire[points_memoire.length] = point;
  
                		if( conformite == "vrais" && question.length == reponse.length ) {
                			
                			$('#felicitation').css( 'transform','scale(1)' );
                			$('#felicitation #p1').addClass( 'main_animee' );
                			
                			nombre_de_vrai_reponse++;
                			$('#question_progress_bar').css({'width':5*compteur_de_question+'%'});
                			$('#bonne_reponse_progress_bar').css({'width':5*nombre_de_vrai_reponse+'%'});
                			
                			setTimeout((function() {
                				$('#felicitation').css( 'transform','scale(0)' );
                				reponse.splice(0,reponse.length);
                				reponse_teste.html(reponse);
                			}), 3000);
                		 }
                		if( conformite == "fausse" ){
                		    
                		    diagrammeDeNotes();
                	        encourager();

                			setTimeout((function() {
                				reponse.splice(0,reponse.length);
                				reponse_teste.html(reponse);
                			 }), 3000);
                		    function diagrammeDeNotes(){
                		        reponse_teste.html( "<span id='fausse_reponse'>"+reponse.join("")+"</span><span id='fausse_reponse_signe'>&#10005;</span>" ); 
                			    $('#question_progress_bar').css({'width':5*compteur_de_question+'%'});
                		     }
                    	    function encourager() {
                    		     ducourrage = $('#ducourrage');
                    		     $('#ex1').text( question );
                    		     $('#ex2').text( reponse.join("") );
                    		     $('#ex3').text( "ߕߍ߫" );
                    
                    		     ducourrage.css( 'display','block' );
                
                    		     setTimeout((function(){ ducourrage.css({ 'transform':'scale(1)' }); }), 400);
                    		     setTimeout((function(){ $('#fausse_reponse_signe').css({ 'transform':'scale(1.5,1)' }); }), 300);
                    		     setTimeout((function(){ ducourrage.css({ 'transform':'scale(0)' }); }), 3000);
                    	     }
                		 }
            	     }
            	    function proclamationDuresultat(){
            	        var deliberation_html = '';
            	        
            	        if(questions_memoire.length===nombre_maximal_de_question){
            	            
                	        $('#epreuves_btns_container td, #teste_clavier td').off('click');
                	        $('#epreuves_btns_container td, #teste_clavier td').css({'color':'#888'});
            	            
            	            setTimeout(function(){
            	                
            	                var teste_container_h = $('#teste_container').height();
            	                var resultat_div_h = $('#resultat_div').height();
            	                
            	                resultats();
            	                deliberer();

                                function resultats(){
                                    
                                    resultatPreparation();
                                    resultatShow();
                                        
                                    function resultatPreparation(){
                        
                                        var resultat_content = $('#resultat_content');
                                        var resultat_content_html = '';
                                        
                                        resultat_content_html = resultatContentHTML();
                                        resultat_content.html( resultat_content_html );
                                        fermetureDeResultatDiv();

                                        $.each($('.fausse_reponse_td'), function(){
                                            var valeur_r = $(this).next().html();
                                            if(valeur_r === chiffres[0]){
                                                $(this).addClass('erreur_back_color');
                                            } 
                                        });
                        
                                        function resultatContentHTML(){
                                            var resultat_fermeture_html, resultat_entete_html, resultat_corps_html, rch, resultat_pied_html;
                                            var nom_d_apprenant = '<span>ߓߊߞߊ߬ߙߌ߬ ߞߋߕߊ߬ </span>';
                                            var titre_du_bulletin = '<h3>'+nom_d_apprenant+' ߟߊ߫  <span>ߓߙߍ߬ߦߊ߬ߥߟߊ</spn></h3>';
                                            var niveau_d_etude = '<p>'+$('#nivo').html()+'</p>';
                                            
                                            resultat_fermeture_html = '&times;';
                                            resultat_entete_html = titre_du_bulletin + niveau_d_etude;
                                            resultat_corps_html = resultatCorpsHTML();
                                            resultat_pied_html = '';
                                            deliberation_html = '';
                                            
                                            resultat_html = '<p id="resultat_fermeture">'+resultat_fermeture_html+'</p>\n\n';
                                            
                                            resultat_html += '<div id="resultat_du_teste">\n\n';
                                                resultat_html += '<div id="resultat_entete">'+resultat_entete_html+'</div>\n\n';
                                                resultat_html += '<div id="resultat_corps">'+resultat_corps_html+'</div>\n\n';
                                                resultat_html += '<div id="resultat_pied">'+resultat_pied_html+'</div>\n\n';
                                            resultat_html += '</div>\n\n';
                                            
                                            function resultatCorpsHTML(){
                                                rch = '<table id= "resultat_table">\n\n';
                        
                                                    rch += '<tr id="resultat_th">\n';
                                                        rch += '<td>ߝߙߍߕߍ</td>\n';
                                                        rch += '<td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td>\n';
                                                        rch += '<td>ߖߊ߬ߓߌ</td>\n';
                                                        rch += '<td>ߓߙߍ߬ߦߊ </td>\n';
                                                    rch += '</tr>\n\n';
                                                    
                                                    var point = '';
                                                    for(i=0;i<compteur_de_question;i++){
                                                           
                                                        rch += '<tr id="resultat_tbody">\n';
                                                            rch += '<td>'+numeros_memoire[i]+'</td>\n';
                                                            rch += '<td>'+questions_memoire[i]+'</td>\n';
                                                            rch += '<td class="fausse_reponse_td">'+reponses_memoire[i]+'</td>\n';
                                                            rch += '<td>'+points_memoire[i]+'</td>\n';
                                                        rch += '</tr>\n\n';
                                                    }
                        
                                                    rch += '<tr id="resultat_tfoot">\n';
                                                        rch += '<td colspan = "3" id="total_libele">ߊ߬ ߡߎ߬ߡߍ </td>\n';
                                                        rch += '<td id="total_valeur">'+convertirChiffreEnNko(total_point)+'\\'+convertirChiffreEnNko(reponses_memoire.length)+'</td>\n';
                                                    rch += '</tr>\n\n';
                                                    
                                                rch += '</table>\n\n';
                                                
                                                return rch;
                                             }
                                            
                                            return resultat_html;
                                         }
                                        function fermetureDeResultatDiv(){
                                            $('#resultat_fermeture').on('click', function(){
                                                $('#resultat_div').css({'height':0});
                                            });
                                         }
                                     }
                                 }
                                function resultatShow(){
                                    $('#resultat_div').css({ 'display':'block' });
                                    resultatStyle();
                                    
                                    function resultatStyle(){
                                        var teste_container_w = $('#teste_container').width();
                                        var teste_container_h = $('#teste_container').height();
                                        
                                        $('#resultat_div').css({ 'width':teste_container_w+'px', 'height':teste_container_h+'px' });
                                        $('#deliberation_div').css({ 'width':teste_container_w+'px', 'height':teste_container_h+'px' });
                                     }
                                 }
                                function deliberer(){
                                    var deliberation_fermeture_btn = '<div><span id="deliberation_fermeture" class="fermeture">&times;</span></div>';
            	                    deliberation_html = messageDeFinDeTesteHTML();
                	            
                    	            $('#deliberation_div').html( deliberation_fermeture_btn + deliberation_html );
                    	            $('#teste_corps').addClass('centrer_parfait');
                    	            
                    	            $('#resume_note').on('click', function(){
                    	                resultatShow();
                    	            });
                    	            
                    	            function messageDeFinDeTesteHTML(){
                    	                var resume_de_note = resumeDeNote();
                    	                var deliberation = deliberation();

                    	                var mft = '<div id="deliberation_container">';
                    	                    mft += '<div><p>\n'+ matiere_active_nom+' ߥߟߊ߬ߘߊ ߞߘߐߓߐߟߌ ߞߐߝߟߌ ߟߊߘߛߏߣߍ߲ ߝߟߍ߫\n</p></div>\n';
                    	                    mft += resume_de_note;
                    	                    mft += deliberation;
                    	                mft += '</div>';
         
                                        function resumeDeNote(){
                                            var rn = '<div id="resume_note">';
                                                rn += '<p><span class="resume_note_libele">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߡߎ߬ߡߍ</span><span class="resume_note_valeur"> '+convertirChiffreEnNko(compteur_de_question)+'</span></p>';
                                                rn += '<p><span class="resume_note_libele">ߖߊ߬ߓߌ߬ߟߌ߫ ߢߊ߬ߣߍ߲</span><span class="resume_note_valeur"> '+convertirChiffreEnNko(nombre_de_vrai_reponse)+'</span></p>';
                                                rn += '<p><span class="resume_note_libele">ߖߊ߬ߓߌ߬ߟߌ߬ ߝߏߣߍ߲ </span><span class="resume_note_valeur"> '+convertirChiffreEnNko(compteur_de_question-nombre_de_vrai_reponse)+'</span></p>';
                                            rn += '</div>';
                                       
                                            return rn;
                                         }
                                        function deliberation(){
                                            var deliberation_content = '';
                                            var niveau_de_comprehention = Math.floor( (nombre_de_vrai_reponse/nombre_maximal_de_question)*100 );
                                            niveau_de_comprehention = convertirChiffreEnNko(niveau_de_comprehention);
                                            
                                            if(nombre_de_vrai_reponse/nombre_maximal_de_question>0.75){
                                                deliberation_content = deliberation1();
                                            }else{
                                                deliberation_content = deliberation2();
                                            }
                                            
                                            
                                            function deliberation1(){
        
                                                var deliberation1_content = 
                                                '<div><p>ߏ߬ ߞߘߐ ߟߋ߬ ߞߏ߫ ߌ ߟߊ߫ '+matiere_active_nom +' ߥߟߊ߬ߘߊ ߢߊߦߋߟߌ ߓߘߊ߫ ߕߊ߲߬ߓߌ߬ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߇߅ ߟߊ߫. '+
                                                niveau_de_comprehention+' ߟߋ߬. '+
                                                'ߏ߬ߘߐ߬ ߌ ߓߘߊ߫ ߛߎߘߊ߲߫ ߞߊ߬ ߛߋ߫ ߥߟߊ߬ߘߊ ߕߊ߫ ߕߎ߲߰ߠߊ߲ ߡߊ߬߸ ߣߊߟߌ߬ߡߎ߲߫ '+
                                                '<span id="matiere_suivante">'+matiere_suivante_nom+' </span>'+
                                                'ߘߌ߫.</p></div>';
                                                
                                                return deliberation1_content;
                                             }
                                            function deliberation2(){
                                                var deliberation2_content = 
                                                '<div><p>ߏ߬ ߞߘߐ ߟߋ߬ ߞߏ߫ ߌ ߟߊ߫ '+matiere_active_nom +' ߥߟߊ߬ߘߊ ߢߊߦߋߟߌ ߡߊ߫ ߗߡߍ߬ߘߐ߬ߦߊ߫ ߇߅  '+
                                                ' ߓߐ߫. '+niveau_de_comprehention+' ߟߋ߬. '+
                                                ' ߏ߬ߘߐ߬ ߌ ߖߌߖߊ߬ ߞߊ߬ ߛߍ߬ߦߌ߬ ߥߟߊ߬ߘߊ ߣߌ߲߬ ߡߊ߬߸ ߞߊ߬ ߕߊ߲߬ߓߌ߬ ߊ߬ ߢߊߦߋ߫ ߟߊ߫ ߞߎߘߊߞߍ߫߸ ߞߊ߬ ߛߐ߬ߘߐ߲߬ ߞߊ߬ ߞߘߐߓߐߟߌ ߞߍ߫ ߞߏߞߎߘߊ߫. </p></div>';
                                                
                                                return deliberation2_content;
                                             }
                                            
                                            return deliberation_content;
                                         }
                    	                
                    	                return mft;
                    	             }
                                    $('#deliberation_fermeture').on('click', function(){
                                            $('#deliberation_div').css({'height':0});
                                    });
                                 }
                	            
            	             }, 2000);
                            
                            archiverLesNotes();

                            function archiverLesNotes(){
                                
                                var archive_form_container = $('#archive_form_container');
                                    
                                function notesArchiveForm(){
                                    
                                    var testes = [];
                                    
                                    for(var i=0;i<nombre_maximal_de_question;i++){
                                        var teste = [numeros_memoire[i],questions_memoire[i],reponses_tapees_memoire[i],points_memoire[i]];
                                        testes[i] = teste;
                                    }
                                    
                                    var teste_archive_form =  "<form method='POST' action='pages/actions.php' style='display:none'>\n\n";
                                        teste_archive_form += "<input type='hidden' name='post_action' value='archiver_note'>\n\n";
                                        
                                        teste_archive_form += "<input type='text' name='id_client_input' value=''>\n\n";
                                        teste_archive_form += "<input type='text' name='date_input' value=''>\n\n";
                                        teste_archive_form += "<input type='text' name='niveau_input' value='"+niveau_d_apprentissage+rang+"'>\n\n";
                                        teste_archive_form += "<input type='text' name='testes_input' value='"+testes.join(';')+"'>\n\n";
                                        
                                        teste_archive_form += "<button id='notes_archive_btn'>Archiver</button>\n\n";
                                    teste_archive_form += "</form>";

                                    return teste_archive_form;
                                 }

                                var archive=notesArchiveForm(); 
                                archive_form_container.html( archive );       
                                var notes_archive_btn = $('#notes_archive_btn');
                                notes_archive_btn.click();
                             }
            	        }
            	     }
        	     });
    	     }
            
            function fermerTestDiv(){
                fermer_teste.on('click', function(){
                    teste_div.css({ 'height':0 });
                });
             }

         });

        function lireQuestion() {
            $('#audio').attr({
        	    src:"son/mp3/"+question+".mp3",
        	    autoplay:"on"
            });
         }
        function convertirChiffreEnNko(nombre_a_convertir){
            var numberToString = String(nombre_a_convertir);
            var stringToTable = numberToString.split('');
            var nombre_converti = [];
            
            for(i=0;i<stringToTable.length;i++){
                nombre_converti[nombre_converti.length] = chiffres[stringToTable[i]];
            }
            
            return nombre_converti.join('');
         }
	    function melanger(tableau){
	        var total_elements = tableau.length;
	        var elements_melanges = [];
	        
    	    for(i=0;elements_melanges.length<total_elements;i++){
        	    nombre_aleatoire = Math.random()*total_elements;
        	    na = Math.floor( nombre_aleatoire );
        	    var element = tableau_questions[na];
        	    
        	    if($.inArray(element, elements_melanges)===-1 && element!=''){
    	            elements_melanges[elements_melanges.length] = tableau_questions[na];
        	    }
    	    }
    	    
		    return elements_melanges;
	     }
        function mixterTableElements(table){

            var nbr_element = table.length;
            var mixtedElementsTable = [];

            for(var i=0;mixtedElementsTable.length<nbr_element;i++){
                var na = Math.random()*nbr_element;
                var nbr_aleatoir = Math.floor(na);
                var element_aleatoir = table[nbr_aleatoir];

                if($.inArray(element_aleatoir,mixtedElementsTable) === -1 && element_aleatoir != ''){
                    mixtedElementsTable[mixtedElementsTable.length] = element_aleatoir;
                }
             }

            return mixtedElementsTable;
         }
        function mixterT2DElements(table){
            var table2DToTable1D = [];

            for(var i=0;i<table.length;i++){
                for(var j=0;j<table[i].length;j++){
                    table2DToTable1D[table2DToTable1D.length] = table[i][j];
                }
            }

            var nbr_element = table2DToTable1D.length;
            var mixtedElementsTable = [];

            for(var k=0;mixtedElementsTable.length<nbr_element;k++){
                var na = Math.random()*nbr_element;
                var nbr_aleatoir = Math.floor(na);
                var element_aleatoir = table2DToTable1D[nbr_aleatoir];

                if($.inArray(element_aleatoir,mixtedElementsTable) === -1 && element_aleatoir != ''){
                    mixtedElementsTable[mixtedElementsTable.length] = element_aleatoir;
                }
             }

            return mixtedElementsTable;
         }
     });
 });