
var background_color, font_size, font_color, font_weight;

/*----------------------------------------------------------------------*/

rappelerSessionParametres();
afficherLesOptionsDeParametre();

parametrerCouleurDeFond();
parametrerCouleurDeTexte();
parametrerTailleDeTexte();
parametrerGrosseurDeTexte();

memoriserSessionParametres();

/*----------------------------------------------------------------------*/

function rappelerSessionParametres() {
    
    background_color = sessionStorage.getItem('background_color');
    font_size = sessionStorage.getItem('font_size');
    font_color = sessionStorage.getItem('font_color');
    font_weight = sessionStorage.getItem('font_weight');
    
    $('#tableau_noir').css('background-color', background_color);
    $('#tableau_noir').css('font-size', font_size);
    $('#tableau_noir').css('color', font_color);
    $('#tableau_noir').css('font-weight', font_weight);
}
function afficherLesOptionsDeParametre() {
    
    $('#tableau_noir').on('dblclick', function() { $('#parametres_tableau').css('display','block'); });
    
    $('#zoum').addClass('yellow'); 
    $('#details_parametres').scrollLeft(0);

    $('#options_tableau td').on('click', function(){
        $(this).addClass('yellow');
        $(this).siblings().removeClass('yellow');
    });
    
    $('#zoum').click(function(){ $('#details_parametres').scrollLeft(0); });
    $('#couleur').click(function(){ $('#details_parametres').scrollLeft(-195.2); });
    $('#weight').click(function(){ $('#details_parametres').scrollLeft(-390.4); });
    
}
function parametrerCouleurDeFond() {
    $('#noir').on('click', function(){ $('#tableau_noir').css('background-color','black');});
    $('#teal').on('click', function(){ $('#tableau_noir').css('background-color','teal');});
    $('#bleue').on('click', function(){ $('#tableau_noir').css('background-color','blue');});
}
function parametrerCouleurDeTexte() {
    $('#blanc').on('click', function(){ $('#tableau_noir').css('color','white');});
    $('#jaune').on('click', function(){ $('#tableau_noir').css('color','yellow');});
    $('#orange').on('click', function(){ $('#tableau_noir').css('color','orange');});
}
function parametrerTailleDeTexte() {
    $('#plus').on('click', function(){ $('#tableau_noir').animate({'font-size':'+=1rem'},50); });
    $('#moin').on('click', function(){ $('#tableau_noir').animate({'font-size':'-=1rem'},50); });
}
function parametrerGrosseurDeTexte() {
    $('#bold').on('click', function(){ $('#tableau_noir').css('font-weight','bold'); });
    $('#normal').on('click', function(){ $('#tableau_noir').css('font-weight','normal'); });
}
function memoriserSessionParametres() {
    $('#parametres_tableau_fermeture').on('click', function(){
        sessionStorage.setItem('font_size', $('#tableau_noir').css('font-size'));
        sessionStorage.setItem('background_color', $('#tableau_noir').css('background-color'));
        sessionStorage.setItem('font_color', $('#tableau_noir').css('color'));
        sessionStorage.setItem('font_weight', $('#tableau_noir').css('font-weight'));
    });
}