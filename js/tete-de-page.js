
if(sessionStorage.getItem('id') == null) {
    $("#logo").css('display','none');
}

$("#menu_menu").on("click", function(){
    $("#menu_deroulant").toggle();
});