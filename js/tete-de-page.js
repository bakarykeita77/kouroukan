    
 /* Affichage du logo */   
   let avatar_name = sessionStorage.getItem('id');
	if(avatar_name != null) $('#logo').css('display', 'block');
	if(avatar_name == null) $('#logo').css('display', 'none');

 /* Affichage du menu deroulant */
    $("#menu_menu").on("click", function(){ $("#menu_deroulant").toggle(); });