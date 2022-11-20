var section=document.getElementById('section');

document.onload=aff();

aff(){
	$('#cadreConnexion')  .css('display', 'none');
	$('#cadreHome')       .css('display', 'block');
	$('#cadreAlphabet')   .css('display', 'none');
	$('#cadreSyllabe')    .css('display', 'none');
	$('#cadreTon')        .css('display', 'none');
	$('#cadreExercice')   .css('display', 'none');
	$('#cadreTableau')    .css('display', 'none');
	$('#cadreClavier')    .css('display', 'none');
	$('#cadreInscription').css('display', 'none');
}
