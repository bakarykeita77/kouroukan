$(document).ready(function(){
    
    var lettres = ['ߊ', 'ߋ', 'ߌ', 'ߍ', 'ߎ', 'ߏ', 'ߐ', 'ߓ', 'ߔ', 'ߕ', 'ߖ', 'ߗ', 'ߘ', 'ߙ', 'ߚ', 'ߛ', 'ߜ', 'ߝ', 'ߞ', 'ߟ', 'ߡ', 'ߢ', 'ߣ', 'ߤ', 'ߥ', 'ߦ', 'ߒ'];
	var voyelles =  ['ߊ', 'ߋ', 'ߌ', 'ߍ', 'ߎ', 'ߏ', 'ߐ'];
	var consonnes = ['ߓ', 'ߔ', 'ߕ', 'ߖ', 'ߗ', 'ߘ', 'ߙ', 'ߚ', 'ߛ', 'ߜ', 'ߝ', 'ߞ', 'ߟ', 'ߡ', 'ߢ', 'ߣ', 'ߤ', 'ߥ', 'ߦ', 'ߧ', 'ߠ']; 
	var tedo = ['ߒ'];
	var espace = ' ';
	var apostrophes = ['ߴ', 'ߵ'];
	var ton = ['߫', '߬', '߭', '߮', '߯', '߰', '߱'];
	var tons_groupes = [['߫','߭','߯','߮'],['߬','߰','߱']];
	var nasalisation = '߲'; 
	var ponctuations = ['.', '߸', '߹', ',', '_', 'ߑ',';', '+', , '?'];
	var autres = ['(', ')', '{', '}', '߳', ':',  '@', '$', '&', '*', '|'];

	var chiffres = ['߀', '߁', '߂', '߃', '߄', '߅', '߆', '߇', '߈', '߉'];
	var erreur_content = [], correcte_content = [];
	var message_erreur = $('#message_erreur');
		
    
    var tableau = $('#tableau_noir');
    var assistant = $('#assistant');
    var erreur_content = [], correcte_content = [];
    var message_erreur = $('#message_erreur');
	
    var ha = $('#assistant').width();
    
    $('#assistant').css({'height':ha});
	$('#titre_assistant').html( 'ߌ߬ߦߐ߬ ߹' );
	
	$('#fermer_assistant').on('click', function(){
	    $('#assistant').css({'transform':'scale(0)'});
	});
	
	tableau.on('keyup', function() {
	
    	let texte = $('#tableau_noir').val().split(' ');
    	let mot = texte[texte.length-1];
    	
    	let c1 = mot[mot.length-1];
    	let c2 = mot[mot.length-2];
    	let c3 = mot[mot.length-3];
    	let c4 = mot[mot.length-4];
    	let c5 = mot[mot.length-5];
    	let c6 = mot[mot.length-6];
    	let c7 = mot[mot.length-7];
    	let c8 = mot[mot.length-8];
    	let c9 = mot[mot.length-9];
    	let c10 = mot[mot.length-10];
    	let c11 = mot[mot.length-11];
    	let c12 = mot[mot.length-12];
    	
    	let partie_correcte = mot.slice(0,mot.length-1);
    	let partie_erronee = c1;
    	let error_text = messageDErreur();
    	
    	if(error_text != '') { afficherAssistant(); afficherErreur(); }
    	if(error_text == '') { masquerAssistant(); viderAssistant(); }
    	    
  	
    	function afficherAssistant() { $('#assistant').css({'transform':'scale(1)'}); }
    	function masquerAssistant() { $('#assistant').css({'transform':'scale(0)'}); }
    	function afficherErreur() {
    	    
    		$('#partie_correcte').text( partie_correcte );
    		$('#partie_erronee').text( partie_erronee );
    		message_erreur.text(error_text);
    		$('#assistant').css({ 'transform':'scale(1)' });
    		die();
    	 }
    	 
    	 
        function messageDErreur() {
        	
        	let message_erreur = '';
        	
        	if($.inArray(c1,voyelles) != -1) {
            	if($.inArray(c2,voyelles) != -1 && $.inArray(c3,voyelles) != -1) { message_erreur = 'ߛߌ߬ߙߊ߬ߟߊ߲߫ ߛߓߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫'; }
            	if($.inArray(c2,voyelles) != -1 && c1 == c2) { message_erreur = 'ߛߌ߬ߙߊ߬ߟߊ߲߬ ߛߎ߰ ߞߋߟߋ߲ ߝߌ߬ߟߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫'; }
            	if(c2 == nasalisation) { message_erreur = 'ߛߌ߬ߙߊ߬ߟߊ߲ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߠߊ߫.'; }
            	if($.inArray(c2,ton) != -1) { message_erreur = 'ߛߌ߬ߙߊ߬ߟߊ߲ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߫.'; }
        	}
        	if($.inArray(c1,consonnes) != -1) {
            	if($.inArray(c2,consonnes) != -1) {
                	if($.inArray(c3,consonnes) != -1) { message_erreur = 'ߛߌ߬ߙߊ߬ߕߊ߫ ߛߓߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫'; }
            	}
            	if($.inArray(c2,apostrophes) != -1) { message_erreur = 'ߛߌ߬ߙߊ߬ߕߊ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߘߜߊߛߌߒߠߊ ߟߊ߫'; }
        	}
        	if($.inArray(c1,ton) != -1) {
            	if($.inArray(c2,ton) != -1)          { message_erreur = 'ߞߊ߲ߡߊߛߙߋ ߫ߝߌ߬ߟߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫.'; }
            	if($.inArray(c2,apostrophes) != -1)  { message_erreur = 'ߞߊ߲ߡߊߛߙߋ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߘߜߊߛߌߒߠߊ ߟߊ߫.'; }
            	if($.inArray(c2,consonnes) != -1)    { message_erreur = 'ߞߊ߲ߡߊߛߙߋ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߛߌ߬ߙߊ߬ߕߊ ߟߊ߫.'; }
        	}
        	if(c1 == nasalisation) {
            	if(c2 == nasalisation)          { message_erreur = 'ߌ ߓߘߊ߫ ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߛߓߍ߫ ߞߏ߫ ߝߌ߬ߟߊ߬.'; }
            	if($.inArray(c2,apostrophes) != -1)  { message_erreur = 'ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߘߜߊߛߌߒߠߊ ߟߊ߫.'; }
            	if($.inArray(c2,consonnes) != -1)    { message_erreur = 'ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߛߌ߬ߙߊ߬ߕߊ ߟߊ߫.'; }
        	}
        	
        	return message_erreur;
        }
    	function viderAssistant() {
    		$('#partie_erronee').html('');
    		$('#partie_correcte').html('');
    	 }
	
    });

});