$(document).ready(function(){

     
    // affichageDeProfileEntete();
  
    function affichageDeProfileEntete(){
        $('#logo').click(function(){
            $(".profile_menu").toggle(100);
            $('#profile_menu_container').slideToggle(150);
        });
    }
});
