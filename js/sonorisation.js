$('document').ready(function() {

    var audio = $('#audio');
    
$('.table_parlante td').on( 'click', function(){
 /* Toutes les données des tableaux sont par defaut sans ombre. */
    $('.table_parlante td').css({ 'box-shadow':'none' });
    
 /* C'est au clique sur une donnée que cette dernière est ombrée. */
    $(this).css({ 'box-shadow':'0em 0em 1em #444' });	    
 
 /* Dès le click sur une donnée, la lecture automatique de cette dernière est activée. */
    var source_sonore = 'son/mp3/'+$(this).text()+'.mp3';
   // var source_sonore = 'son/ogg/'+$(this).text()+'.ogg';
   // var source_sonore = 'son/mp4/'+$(this).text()+'.mp4';	    
    audio.attr({ src:source_sonore, autoplay:'on' });
 
 /* L'ombre et la bordure de la dernière donnée cliquée disparait après 600 ms. */
    var desombre = setTimeout((function() {$('.table_parlante td').css({ 'box-shadow':'none', 'border':'none' });}), 600);
});

 
});