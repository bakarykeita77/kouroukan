$(document).ready(function(){

    var prenom = sessionStorage.getItem("prenom");
    var nom = sessionStorage.getItem("nom");
    var naissance = sessionStorage.getItem("naissance");
    var sexe = sessionStorage.getItem("sexe");
    var adresse = sessionStorage.getItem("adresse");
    var email = sessionStorage.getItem("email");
    
    var profile_utilisateur_renseignements, profile_menu_container, profile_teste_btn, profile_teste_menu, profile_teste;
    var profile_utilisateur_btn, profile_utilisateur_container, modifier_avatar;
    var client_identification_brute_container;
    var profile_teste_content;
    var titre_des_matieres_apprises, titre_des_matieres_a_apprendre;
    var liste_des_matieres_apprises, liste_des_matieres_a_apprendre;
   
    var nom_de_matiere_a_renseigne = '';
    var matiere_a_renseigne = '';
    var matiere_index = '';
    var niveau_teste = '';
    var data_date = '';
    var data_niveau = '';
    
    var studied_lessons_table = [];
    var nombre_de_teste_par_niveau = [];
    var profile_teste_point = [];
    var profile_testes = '';
    var testes = [];
    var nbr_teste_niveau_1 = 0;
    var nbr_teste_niveau_2 = 0;
    var nbr_teste_niveau_3 = 0;
    var nbr_teste_niveau_4 = 0;
    

    selectionDesElementsDeProfile();
    affichageDeProfileEntete();
    manipulationDeProfileEntete();

    function affichageDeProfileEntete(){
        $('#logo').click(function(){
            $(".profile_menu").toggle(100);
            profile_menu_container.slideToggle(150);
        });
    }
    function manipulationDeProfileEntete(){
      /*-----------------------------------------------------------------------------*/   
        profile_teste_btn.addEventListener('click', function(){

            affichageDeProfileTesteMenu();
            chargementDeProfileTesteMenu();
            manipulationDeProfileTesteMenu();
            
            function affichageDeProfileTesteMenu(){
                
                liste_des_matieres_apprises.innerHTML = '<p class="rien">ߝߏߦߊ߲߫߹</p>';
                liste_des_matieres_a_apprendre.innerHTML = listeDesMatieres();
                profile_teste_btn.onclick = toggleProfileTesteMenu();
                
                function toggleProfileTesteMenu(){
                    if(profile_teste_menu.style.height == 'auto'){
                        profile_teste_menu.style.height = 0;
                        setTimeout(function() { profile_teste_menu.style.display = 'none'; }, (250));
                        setTimeout(function() { profile_teste.style.display = 'none'; }, (200));
                    }else{
                        profile_teste_menu.style.display = 'block';
                        setTimeout(function() { profile_teste_menu.style.height = 'auto'; }, (10));
                    }
                }
            }
            function chargementDeProfileTesteMenu(){
                
                testes = reconstitutionDeTestes();
                var matieres_apprises = matieresApprises();
           
                titre_des_matieres_apprises.innerHTML = titre1();
                titre_des_matieres_a_apprendre.innerHTML = titre2();
           
                liste_des_matieres_apprises.innerHTML = listeDesMatieres1();
                liste_des_matieres_a_apprendre.innerHTML = listeDesMatieres2();
                
                gestionAffichageDesMatieresDansLeMenu();
                

                function reconstitutionDeTestes(){
              
                    var testes_collection = profile_testes.innerHTML;
                    var testes_reconstitues = [];
                     
                    testes_collection = testes_collection.split('%');
                    
                    for(var i=0;i<testes_collection.length;i++){
                   
                        var profile_teste = testes_collection[i].split('/');
                        var teste = [];
                       
                        var phase     = profile_teste[0];
                        var date      = profile_teste[1];
                        var id_client = profile_teste[2];
                        var niveau    = profile_teste[3];
                        var test      = profile_teste[4].split(';');
                        var point     = profile_teste[5];
                        
                        teste = [phase, date, id_client, niveau, test, point];
                        testes_reconstitues[testes_reconstitues.length] = teste;
                    }
                  
                    return testes_reconstitues;
                }
                function titre1(){
                    var titre = '';
                    
                    if(matieres_apprises.length == 1)
                    { titre = 'ߥߟߊ߬ߘߊ߫ ߘߋ߰ߣߍ߲'; }else
                    { titre = 'ߥߟߊ߬ߘߊ߫ ߘߋ߰ߣߍ߲ ߠߎ߬'; }
                    
                    return titre;
                }
                function titre2(){
                    var titre = '';
                    
                    if(liste_de_matieres.length - matieres_apprises.length == 1)
                    { titre = 'ߥߟߊ߬ߘߊ߫ ߘߋ߰ߕߊ'; }else
                    { titre = 'ߥߟߊ߬ߘߊ߫ ߘߋ߰ߕߊ ߟߎ߬'; }
                    
                    return titre;
                }
                function listeDesMatieres1(){
                    var liste = '';
                   
                    if(matieres_apprises.length != 0)
                    { liste = listeDesMatieres(); }else
                    { liste = '<p class="rien">ߝߏߦߊ߲߫߹</p>'; }
                    
                    return liste;
                }
                function listeDesMatieres2(){
                    var liste = '';
                    
                    if(liste_de_matieres.length - matieres_apprises.length != 0)
                    { liste = listeDesMatieres(); }else
                    { liste = '<p class="rien">ߝߏߦߊ߲߫߹</p>'; }
                    
                    return liste;
                }
                function gestionAffichageDesMatieresDansLeMenu(){
                    var li1 = document.querySelectorAll('#liste_des_matieres_apprises ul li');
                    var li2 = document.querySelectorAll('#liste_des_matieres_a_apprendre ul li');
                    
                    li1.forEach(function(matiere){
                        if(matieres_apprises.indexOf(matiere.innerHTML) == -1)
                        { matiere.style.display = 'none'; }else
                        { matiere.style.display = 'block'; }
                    });
                    li2.forEach(function(matiere){
                        if(matieres_apprises.indexOf(matiere.innerHTML) == -1)
                        { matiere.style.display = 'block'; }else
                        { matiere.style.display = 'none'; }
                    });
                }
                function matieresApprises(){
                    var matieres1 = [];
                    for(var i=0;i<testes.length;i++){
                       var point = testes[i][5];
                       point = reverseIntNko(point);
                       if(point>10){
                           var id_matiere_apprise = testes[i][3]-1;
                           
                           if(matieres1.indexOf(liste_de_matieres[id_matiere_apprise][1]) == -1){
                               matieres1[matieres1.length] = liste_de_matieres[id_matiere_apprise][1];
                           }
                       } 
                    }
           
                    return matieres1;
                }
                function matieresAApprendre(){
                    var matieres2 = [];
                    for(var i=0;i<testes.length;i++){
                       var point = testes[i][4];
                       point = reverseIntNko(point);
                       if(point<10){
                           var id_matiere_a_apprendre = testes[i][2]-1;
                           if(matieres2.indexOf(liste_de_matieres[id_matiere_a_apprendre][1]) == -1){
                               matieres2[matieres2.length] = liste_de_matieres[id_matiere_a_apprendre][1];
                           }
                       }  
                    }
           
                    return matieres2;
                }
            }
            function manipulationDeProfileTesteMenu(){
                $('#liste_des_matieres_apprises li').on('click', function(){
                    var testes_de_meme_niveau = [];
                    var n = 0;
                    
                    matiere_a_renseigne = $(this); 
                    nom_de_matiere_a_renseigne = $(this).html(); 
                    matiere_index = $(this).index(); 
                    testes_de_meme_niveau = triDesTestesParNiveau();
          
                    miseEnSurbrillanceDeLaMatiereARenseigne();
                    elementsHTMLDeProfileTeste();
                    affichageDeProfileTeste();
                    chargementDeProfileTeste();
                    
                    document.getElementsByClassName('bouton_afficheur_de_teste')[0].click();
            
            
            
                    function triDesTestesParNiveau(){
                    /* Regroupement des testes de meme niveau dans un tableau. */
                        var groupe_de_teste = [];
                        for(i=0;i<testes.length;i++){
                            niveau_teste = testes[i][3];
                            
                            if(matiere_index+1==niveau_teste){
                                groupe_de_teste[groupe_de_teste.length] = testes[i];
                            }
                        }
                  
                        return groupe_de_teste;
                    }
                    function miseEnSurbrillanceDeLaMatiereARenseigne(){
                        matiere_a_renseigne.addClass('yellow');
                        matiere_a_renseigne.siblings().removeClass('yellow');
                    }
                    function elementsHTMLDeProfileTeste(){
                
                        if(testes_de_meme_niveau!='')
                        { profile_teste.innerHTML = testeEffectueHTML(); }else
                        { profile_teste.innerHTML = testeNonEffectueHTML(); }

                        function testeEffectueHTML(){
                            var testes_btn = '';
                            var nth = '';
                            function testesBoutons(){
                                
                                for(var m=testes_de_meme_niveau.length;m>0;m--){ 
                                    if(m==1) { nth = '߭'; }else{ nth = '߲'; }
                                    testes_btn += '<td class="bouton_afficheur_de_teste">'+parseIntNko(m)+nth+'</td>';
                                }
                                return testes_btn;
                            }
                                    
                            testes_btn = testesBoutons();
                             
                            var affiche_html = '<div id="profile_teste_content">\n';
                                affiche_html += '<span id="fermeture_affiche" onclick="fermerProfileCorps()">&times;</span>\n\n';
                                
                                affiche_html += '<div id="profile_table_container">';
                                affiche_html += '<div id="teste_switcher">\n<span>'+nom_de_matiere_a_renseigne+' ߞߘߐߓߐߟߌ</span><table id="nbr_table"><tr id="nbr_testes">'+testes_btn+'</tr></table>\n</div>\n';
                                affiche_html += '<div>\n<span id="profile_teste_date"></span></div>';
                                
                                affiche_html += '<br/>';
                                
                                affiche_html += '<div>\n<span style="font-weight:bold; font-size:24px">ߓߙߍ߬ߦߊ߬ߥߟߊ</span>\n</div>\n\n';
                                affiche_html += '<table id="affiche_table">\n\n';
                                    
                                    affiche_html += '<thead id="profile_teste_thead">\n';
                                    affiche_html += '<tr>\n';
                                        affiche_html += '<th>ߝߙߍߕߍ</th>\n';
                                        affiche_html += '<th>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</th>\n';
                                        affiche_html += '<th>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</th>\n';
                                        affiche_html += '<th>ߓߙߍ߬ߦߊ</th>\n';
                                    affiche_html += '</tr>\n';
                                    affiche_html += '</thead>\n\n';
                                    
                                    affiche_html += '<tbody id="profile_teste_tbody"></tbody>\n\n';
                                    
                                    affiche_html += '<tfoot id="profile_teste_tfoot">\n';
                                    affiche_html += '<tr>\n';
                                        affiche_html += '<td colspan="3" >ߓߙߍ߬ߦߊ ߡߎ߬ߡߍ</td>\n';
                                        affiche_html += '<td id="profile_total_points"></td>\n';
                                    affiche_html += '</tr>\n';
                                    affiche_html += '</tfoot>\n\n';
                
                                affiche_html += '</table>\n';
                                affiche_html += '</div>';
                            
                            affiche_html += '</div>\n\n';
                             
                            return affiche_html;
                        }
                        function testeNonEffectueHTML(){
                           
                            var affiche_html = '<div id="profile_teste_content">\n';
                                affiche_html += '<span id="fermeture_affiche" onclick="fermerProfileCorps()">&times;</span>\n\n';
                                
                                affiche_html += '<div>\n<span>'+nom_de_matiere_a_renseigne+' ߞߘߐߓߐߟߌ</span>\n</div>\n';
                                affiche_html += '<div>\n<span>ߞߍߕߎߡߊ :  - - - - -  </span></div>';
                                affiche_html += '<div>\n<span>ߓߙߍ߬ߦߊ߬ߥߟߊ</span>\n</div>\n\n';
                                
                                affiche_html += "<p>"+document.getElementById('client_name').innerHTML+"</p><p>ߌ ߡߊ߫ "+nom_de_matiere_a_renseigne+" ߥߟߊ߬ߘߊ ߞߘߐߓߐߟߌ ߞߍ߫ ߝߟߐ߫ ߹</p>";
                            affiche_html += '</div>\n\n';
                             
                            return affiche_html;
                        }
                    }
                    function chargementDeProfileTeste(){
                        $('.bouton_afficheur_de_teste').on('click', function(){
                            
                            $(this).css({'fontWeight':'bold', 'boxShadow':'0 0 6px #666', 'border':'none', 'transform':'scale(1.5)'});
                            $(this).siblings().css({'fontWeight':'normal', 'boxShadow':'none', 'border':'1px solid #ddd', 'transform':'scale(1)'});
                            
                            n = $(this).index();
                            
                            var date_du_teste = testes_de_meme_niveau[n][1];
                            date_du_teste = date_du_teste.split(' ');
                            date_du_teste = date_du_teste[0].split('-');
                            date_du_teste = mois[parseInt(date_du_teste[1])]+' ߕߟߋ߬ '+parseIntNko(date_du_teste[2])+' ߛߊ߲߭ '+parseIntNko(date_du_teste[0]);
                   
                            var teste = testes_de_meme_niveau[n][4]; 
                            var points = testes_de_meme_niveau[n][5];
                           
                            chargerProfileTeste();
                            reAfficherProfileTeste();
                            
                            function chargerProfileTeste(){
                                
                                var profile_teste_date   = document.getElementById('profile_teste_date');
                                var profile_teste_tbody  = document.getElementById('profile_teste_tbody');
                                var profile_total_points = document.getElementById('profile_total_points');
                                var profile_teste_tbody_content = profileTesteTbodyContent();
                                
                                profile_teste_date.innerHTML = 'ߞߍߕߎߡߊ : '+date_du_teste;
                                profile_teste_tbody.innerHTML = profile_teste_tbody_content;
                                profile_total_points.innerHTML = points+'\\'+parseIntNko(20);
                                
                                function profileTesteTbodyContent(){
                                    var profile_teste_body_content = '';
                                    for(var i=0;i<teste.length;i++){
                                        var data = teste[i].split(',');
                                       
                                        profile_teste_body_content += '<tr style="border:1px solid #fff"><td>'+data[0]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[3]+'</td></tr>\n';
                                    }
                                    return profile_teste_body_content;
                                }
                            }
                            function reAfficherProfileTeste(){
                                profile_teste_content.style.opacity = 0;
                                setTimeout(function(){profile_teste_content.style.opacity = 1;}, 1000);
                            }
                        });
                    }
                    function affichageDeProfileTeste(){
                        
                        profile_teste.style.display = 'none';
                        profile_teste.style.transform = 'scale(0.6)';
                      
                        setTimeout(function(){profile_teste.style.display = 'block';}, 50);
                        setTimeout(function(){profile_teste.style.transform = 'scale(1)';}, 100);
                    }
                });
            }
        });
      /*-----------------------------------------------------------------------------*/   
        profile_utilisateur_btn.addEventListener('click', function(){
            
            profileUtilisateurHTML();
            profileUtilisateurAffichage();
            profileUtilisateurModificationAvatar();
            
            function profileUtilisateurHTML(){
                
                var profile_utilisateur_html  = '<div> <span>ߕߐ߮ </span>    <span id="profile_prenom">'+prenom+'</span></div>\n';
                profile_utilisateur_html += '<div> <span>ߖߊ߬ߡߎ߲ </span>   <span id="profile_nom">'+nom+'</span></div>\n';
                profile_utilisateur_html += '<div> <span>ߡߐߦߌߛߊ߲ </span> <span id="profile_naissance">'+naissance+'</span></div>\n';
                profile_utilisateur_html += '<div> <span>ߖߊ߲߭ </span>     <span id="profile_sexe"></span>'+sexe+'</div>\n';
                profile_utilisateur_html += '<div> <span>ߛߊ߲߬ߓߊ߬ߕߐ߮ </span> <span id="profile_adresse">'+adresse+'</span></div>\n';
                profile_utilisateur_html += '<div> <table><tr><td><span>Mail</span></td><td><span id="profile_mail">'+email+'</span></td> </tr></table></div>\n';

                profile_utilisateur_renseignements.innerHTML = profile_utilisateur_html;
            }
            function profileUtilisateurAffichage(){
                    this.onclick = toggleProfileUtilisateur();
                    function toggleProfileUtilisateur(){
                        if(profile_utilisateur_container.style.height == 'auto'){
                            profile_utilisateur_container.style.height = 0;
                            setTimeout(function() { profile_utilisateur_container.style.display = 'none'; }, (150));
                        }else{
                            profile_utilisateur_container.style.display = 'block';
                            setTimeout(function() { profile_utilisateur_container.style.height = 'auto'; }, (10));
                        } 
                    }
            }
            function profileUtilisateurModificationAvatar(){
                
                 var avatar_image = document.getElementById('avatar_image');
                 modifier_avatar.onclick = function(){
                     document.location.href = "http://localhost/kouroukan/pages/upload-avatar.php";
                 }
            }
        });
      /*-----------------------------------------------------------------------------*/   
    }
    function fermerProfileCorps(){
        document.getElementById('profile_teste_content').style.display =  'none';
    }
    function listeDesMatieres(){
        var liste = '<ul style="box-sizing:border-box; margin:8px auto; padding:0; width:98%">\n';
            for(var i=0;i<liste_de_matieres.length;i++){ liste += '<li style="padding:0 28px; border-radius:6px">'+liste_de_matieres[i][1]+'</li>\n'; }
        liste += '</ul>\n';
        return liste;
    }
    function selectionDesElementsDeProfile(){
        
        profile_utilisateur_renseignements = document.getElementById('profile_utilisateur_renseignements');
        profile_menu_container = $('#profile_menu_container');
        client_evaluations_brutes_container = document.getElementById('client_evaluations_brutes_container');
        nbr_teste = document.getElementById('nbr_teste');
        profile_teste_point = document.getElementById('profile_teste_point');
        profile_teste_btn = document.getElementById('profile_teste_btn');
        profile_teste_menu = document.getElementById('profile_teste_menu');
        profile_testes = document.getElementById('profile_testes');
        profile_teste = document.getElementById('profile_teste');
        modifier_avatar = document.getElementById('modifier_avatar');
        
        client_identification_brute_container = document.getElementById('client_identification_brute_container');
        profile_utilisateur_btn = document.getElementById('profile_utilisateur_btn');
        profile_utilisateur_container = document.getElementById('profile_utilisateur_container');
        
        titre_des_matieres_apprises = document.getElementById('titre_des_matieres_apprises');
        titre_des_matieres_a_apprendre = document.getElementById('titre_des_matieres_a_apprendre');
        liste_des_matieres_apprises = document.getElementById('liste_des_matieres_apprises');
        liste_des_matieres_a_apprendre = document.getElementById('liste_des_matieres_a_apprendre');
    }  
});
