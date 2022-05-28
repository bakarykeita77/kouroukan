
var son = $('#son');
var source = "", lettre="", source_son="";

$('#afficherAlphabet').on('click', function(){
	$('#alphabetNko').css('right', '0em');
	
	$('#alphabetTitre').show('fast','linear',function(){
		$('#voyelles').show('fast','linear',function(){
			$('#consonnes').show('fast','linear',function(){
				$('#tedo').show('fast','linear',function(){
					$('#chiffres').show('fast','linear');
				});
			});
		});
	});
});


$('#fermerAlphabet').on('click', function(){

	$('#alphabetNko').css('right', '-200em');

	$('#alphabetTitre').css('display','none');
	$('#voyelles').css('display','none');
	$('#consonnes').css('display','none');
	$('#tedo').css('display','none');
	$('#chiffres').css('display','none');
});