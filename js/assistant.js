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
	
	
	$('#titre_assistant').html( 'ߌ߬ߦߐ߬ ߹' );

	tableau.on('keyup', function() {
	
    	let texte = $('#tableau_noir').val().split(' ');
    	let mot = texte[texte.length-1];
    	
    	let c1 = mot[mot.length-1];
    	let c2 = mot[mot.length-2];
    	let c3 = mot[mot.length-3];

    	let partie_correcte = mot.slice(0,mot.length-1);
    	let partie_erronee = c1;
    	let error_text = messageDErreur();
    	
  	 /*------------------------------------------------------------------------------------------------------*/
    	
    	if(error_text != '') { supprimerLaPartieErronee(); chargerAssistant(); afficherAssistant(); }
    	if(error_text == '') { masquerAssistant(); viderAssistant(); }
    	    
  	 /*------------------------------------------------------------------------------------------------------*/
    	
    	function afficherAssistant() { $('#assistant').css({'transform':'scale(1)'}); }
    	function masquerAssistant() { $('#assistant').css({'transform':'scale(0)'}); }
    	function chargerAssistant() {
    		$('#partie_correcte').text( partie_correcte );
    		$('#partie_erronee').text( partie_erronee );
    		message_erreur.text(error_text);
    	 }
        function messageDErreur() {
        	
        	let message_erreur = '';
        	
        	if($.inArray(c1,voyelles) != -1) {
            	if($.inArray(c2,voyelles) != -1 && $.inArray(c3,voyelles) != -1) { message_erreur = 'ߛߌ߬ߙߊ߬ߟߊ߲߫ ߛߓߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫'; }
            	if($.inArray(c2,voyelles) != -1 && c1 == c2)                     { message_erreur = 'ߛߌ߬ߙߊ߬ߟߊ߲߬ ߛߎ߰ ߞߋߟߋ߲ ߝߌ߬ߟߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫'; }
            	if(c2 == nasalisation)      { message_erreur = 'ߛߌ߬ߙߊ߬ߟߊ߲ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߠߊ߫.'; }
            	if($.inArray(c2,ton) != -1) { message_erreur = 'ߛߌ߬ߙߊ߬ߟߊ߲ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߫.'; }
            	if(c2 == tedo)              { message_erreur = 'ߛߌ߬ߙߊ߬ߟߊ߲ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߕߍߘߐ ߟߊ߫.'; }
        	}
        	if($.inArray(c1,consonnes) != -1) {
            	if($.inArray(c2,consonnes) != -1) {
                	if($.inArray(c3,consonnes) != -1) { message_erreur = 'ߛߌ߬ߙߊ߬ߕߊ߫ ߛߓߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫'; }
            	}
            	if($.inArray(c2,apostrophes) != -1) { message_erreur = 'ߛߌ߬ߙߊ߬ߕߊ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߘߜߊߛߌߒߠߊ ߟߊ߫'; }
        	}
        	if(c1 == tedo) {
            	if(c2 == tedo)                      { message_erreur = 'ߌ ߓߘߊ߫ ߕߍߘߐ ߛߓߍ߫ ߞߏ߫ ߝߌ߬ߟߊ߬.'; }
        	    if($.inArray(c2,consonnes) != -1)   { message_erreur = 'ߕߍߘߐ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߛߌ߬ߙߊ߬ߕߊ ߟߊ߫.'; }
            	if($.inArray(c2,apostrophes) != -1) { message_erreur = 'ߕߍߘߐ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߘߜߊߛߌߒߠߊ ߟߊ߫.'; }
        	}
        	if(c1 == nasalisation) {
            	if(c2 == nasalisation)              { message_erreur = 'ߌ ߓߘߊ߫ ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߛߓߍ߫ ߞߏ߫ ߝߌ߬ߟߊ߬.'; }
            	if($.inArray(c2,apostrophes) != -1) { message_erreur = 'ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߘߜߊߛߌߒߠߊ ߟߊ߫.'; }
            	if($.inArray(c2,consonnes) != -1)   { message_erreur = 'ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߛߌ߬ߙߊ߬ߕߊ ߟߊ߫.'; }
            	if(c2 == tedo)                      { message_erreur = 'ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߕߍߘߐ ߟߊ߫.'; }
            	if(c2 == undefined)                 { message_erreur = 'ߞߎߡߊߘߋ߲ ߕߍ߫ ߘߊߡߌ߬ߘߊ߬ ߟߊ߫ ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߡߊ߬.'; }
        	}
        	if($.inArray(c1,apostrophes) != -1) {
            	if($.inArray(c2,apostrophes) != -1) { message_erreur = 'ߌ ߓߘߊ߫ ߘߜߊߛߌߒߠߊ ߛߓߍ߫ ߞߏ߫ ߝߌ߬ߟߊ߬.'; }
            	if($.inArray(c2,voyelles) != -1)    { message_erreur = 'ߘߜߊߛߌߒߠߊ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߊ߫.'; }
            	if(c2 == tedo)                      { message_erreur = 'ߘߜߊߛߌߒߠߊ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߕߍߘߐ ߟߊ߫.'; }
            	if(c2 == undefined)                 { message_erreur = 'ߞߎߡߊߘߋ߲ ߕߍ߫ ߘߊߡߌ߬ߘߊ߬ ߟߊ߫ ߟߊ߬ߓߋ߰ߟߊ߲ ߡߊ߬.'; }
            	if(c2 == nasalisation)              { message_erreur = 'ߘߜߊߛߌߒߠߊ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߞߊ߲ߠߊߘߌߦߊߟߊ߲ ߠߊ߫.'; }
            	if($.inArray(c2,ton) != -1)         { message_erreur = 'ߟߊ߬ߓߋ߰ߟߊ߲ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߞߊ߲ߡߊߛߙߋ ߟߊ߫.'; }
        	}
        	if($.inArray(c1,ton) != -1) {
            	if($.inArray(c2,ton) != -1)         { message_erreur = 'ߞߊ߲ߡߊߛߙߋ ߫ߝߌ߬ߟߊ߬ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߢߐ߲߮ ߠߊ߫.'; }
            	if($.inArray(c2,apostrophes) != -1) { message_erreur = 'ߞߊ߲ߡߊߛߙߋ ߕߍ߫ ߕߎ߲߰ ߠߊ߫ ߘߜߊߛߌߒߠߊ ߟߊ߫.'; }
            	if($.inArray(c2,consonnes) != -1)   { message_erreur = 'ߞߊ߲ߡߊߛߙߋ ߕߍ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߛߌ߬ߙߊ߬ߕߊ ߟߊ߫.'; }
            	if(c2 == undefined)                 { message_erreur = 'ߞߎߡߊߘߋ߲ ߕߍ߫ ߘߊߡߌ߬ߘߊ߬ ߟߊ߫ ߞߊ߲ߡߊߛߙߋ ߡߊ߬.'; }
        	}
        	if($.inArray(c1,ponctuations) != -1) {
            	if(c2 == undefined)                 { message_erreur = 'ߞߎߡߊߘߋ߲ ߕߍ߫ ߘߊߡߌ߬ߘߊ߬ ߟߊ߫ ߕߏ߲ߓߋ ߡߊ߬.'; }
        	}

        	return message_erreur;
        }
    	function viderAssistant() {
    		$('#partie_erronee').html('');
    		$('#partie_correcte').html('');
    	 }
	    function supprimerLaPartieErronee() {
	        let tableau_content = $('#tableau_noir').val();
	        $('#tableau_noir').val(tableau_content.slice(0,tableau_content.length-1));
	    }
    });
});