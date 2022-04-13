$(document).ready(function() {
    

    $.each($('.cacher'), function(){
        $(this).css({'transform':'scale(0)'});
        setTimeout(function() {$(this).css('display','none');}, 100);
    });
    
    var fermeture = $('.fermeture');
    fermeture.on('click', function(){
        $(this).parent().css({'display':'none'});
    });
    var menu_icone = "&#9776;";
    $('.menu_icone').html(menu_icone);
    
   
    var liste_icone = "<ul><li id='li1'>&#8896;</li> <li id='li2'>&#8897;</li></ul>";
    $('.liste_icone').html(liste_icone);


    var parametre_icone = "&#x2699;";
    $('.parametre_icone').html(parametre_icone);
    
    var table_parlante = $(".table_parlante");
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
  
    
    
    // function windowResponsive(x){
    //     if(x.matches){
    //         $('.container').css({'width':'100vw'});
    //     }else{
    //         $('.container').css({'width':'70vw'});
    //     }
    // }
    // x = window.matchMedia('(max-width:800px)');
    // windowResponsive(x);
    // x.addListener(windowResponsive);


});