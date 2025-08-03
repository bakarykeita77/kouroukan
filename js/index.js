
    var container = $('#container');
    var clavier = $('#clavier_nko');
    var lien = [];
    var alphabet = [];
    var mot = "";
    var questionnaire = [];
    var niveau = "";
    var nombre_aleatoire = "", na = "", n = "";
    var i = 0;
    var audio = $('#audio');
    var tdw = $('.table_parlante td').css('width');
    var reponse = "", reponse_content = [], question_content = [];
    
    
    $('#nav ul li:nth(0)').addClass('surbrillance');
    $('#nav ul li:nth(0)').siblings().removeClass('surbrillance');

   
   var ch = "", syllab = [], tonn = [];

 /* Dimensionnement de container */
    var window_w = window.innerWidth;
    var window_h = window.innerHeight;
    
   var haut_de_page_h = $('#haut_de_page').outerHeight();
   var barre_navigation_h = $('#barre_navigation').outerHeight();
   
   container.css({'height':window_h-(haut_de_page_h+barre_navigation_h+4)+'px'});
   $('#logo').css('display','none');

   $('#fermer_clavier').on('click', function(){ fermer(clavier); });
   
   function fermerPop() {
      $('#pop_content'). animate ({ 'opacity':0, 'top':'-32px' }, 200 );
      $('#pop'). animate ({ 'height':0, 'opacity':0 }, 300 );
   }
   var bnh = $('#barre_navigation').height();
   
   $('.id_parlant td').on( 'click', function(){
      audio.attr({
         src:'son/mp3/'+ $(this).attr( 'id' ) +'.mp3',
         autoplay:'on'
      });
   });
   
   
   function masquerAsides() {
       $("#aside01").css('opacity',0);
       $("#aside02").css('opacity',0);
   }
   function demasquerAsides() {
        $("#aside01").animate({'opacity':1},1000);
        $("#aside02").animate({'opacity':1},1000);
   }
   function afficherAsides() {
       $('#index_alert_fermeture').click(function() { demasquerAsides(); });
   }
   function autoAfficherAsides() {
       setTimeout(function() {
           $("#aside01").animate({'opacity':1},1000);
           $("#aside02").animate({'opacity':1},1000);
       }, 10500);
   }
   function affichageAsides() {
       masquerAsides();
       afficherAsides();
       autoAfficherAsides();
   }