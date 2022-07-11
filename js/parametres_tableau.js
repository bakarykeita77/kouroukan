
initialiserParametres();


$('#noir').on('click', function(){ $('#tableau_noir').css('background-color','black');});
$('#teal').on('click', function(){ $('#tableau_noir').css('background-color','teal');});
$('#bleue').on('click', function(){ $('#tableau_noir').css('background-color','blue');});

$('#blanc').on('click', function(){ $('#tableau_noir').css('color','white');});
$('#jaune').on('click', function(){ $('#tableau_noir').css('color','yellow');});
$('#orange').on('click', function(){ $('#tableau_noir').css('color','orange');});

$('#plus').on('click', function(){ $('#tableau_noir').css('font-size','+=1rem'); });
$('#moin').on('click', function(){ $('#tableau_noir').css('font-size','-=1rem'); });

$('#bold').on('click', function(){ $('#tableau_noir').css('font-weight','bold'); });
$('#normal').on('click', function(){ $('#tableau_noir').css('font-weight','normal'); });

$('#options_tableau td').on('click', function(){
    $(this).addClass('yellow');
    $(this).siblings().removeClass('yellow');
})

$('#zoum').click(function(){ $('#details_parametres').scrollLeft(0); });
$('#couleur').click(function(){ $('#details_parametres').scrollLeft(-195.2); });
$('#weight').click(function(){ $('#details_parametres').scrollLeft(-390.4); });



$('#parametres_tableau_fermeture').on('click', function(){
    sessionStorage.setItem('font_size', $('#tableau_noir').css('font-size'));
    alert(sessionStorage.getItem('font-size')); 
});


function initialiserParametres() { 
    $('#zoum').addClass('yellow'); 
    $('#details_parametres').scrollLeft(0);
}