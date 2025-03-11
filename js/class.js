$(document).ready(function() {
    

    $.each($('.cacher'), function(){
        $(this).css({'transform':'scale(0)'});
        setTimeout(function() {$(this).css('display','none');}, 100);
    });
    
    var fermeture = $('.fermeture:not(#fermer_pratique)');
    fermeture.on('click', function(){
        $(this).parent().css({'display':'none'});
    });
    var fermeture_de_parent = $('.fermeture_de_parent:not(#fermer_pratique)');
    fermeture_de_parent.on('click', function(){
        $(this).parent().parent().css({'display':'none'});
    });
    var masqueur = $('.masqueur');
    masqueur.on('click', function(){
        $(this).parent().css({'transform':'scale(0)'});
    });
    var masqueur_de_parent = $('.masqueur_de_parent');
    masqueur_de_parent.on('click', function(){
        $(this).parent().parent().css({'transform':'scale(0)'});
    });
 
    
    var menu_icone = "&#9776;";
    $('.menu_icone').html(menu_icone);
    
   
    var liste_icone = "<ul><li id='li1'>&#8896;</li> <li id='li2'>&#8897;</li></ul>";
    $('.liste_icone').html(liste_icone);


    var parametre_icone = "&#x2699;";
    $('.parametre_icone').html(parametre_icone);
    
    $(".table_parlante td").on('click', function(){
        $(".table_parlante td").removeClass('ombrage');
        $(this).addClass('ombrage');
        setTimeout(function(){ $(".table_parlante td").removeClass('ombrage'); }, 5000);
    });
    $('.hover_scale').css({
        'color':'red',
        'transition':'0.25s'
    });
    $('.hover_scale').on('hover', function(){  
        $(this).addClass('scale');
    });
    $('.scale').css({
        'transform':'scale(1.5)',
    });
    
});