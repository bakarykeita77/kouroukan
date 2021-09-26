$(document).ready(function(){
    var ha = $('#assistant').width();
    
    $('#assistant').css({'height':ha});
	$('#titre_assistant').html( 'ߌ߬ߦߐ߬ ߹' );
	
	$('#fermer_assistant').on('click', function(){
	    $('#assistant').css({'transform':'scale(0)'});
	});
		
});