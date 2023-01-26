$('.popup_afficheur').on('mouseover', function(){
    $('.popup').css({'display':'block', 'transform':'scale(1)', 'opacity':1});
});
$('.popup').on('mouseleave', function() {
    $(this).css({'transform':'scale(0.7)', 'opacity':0});
    setTimeout(() => { $(this).css('display','none'); }, 300);
});
