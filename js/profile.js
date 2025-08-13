$(document).ready(function(){

    var prenom = sessionStorage.getItem("prenom");
    var nom = sessionStorage.getItem("nom");
    var naissance = sessionStorage.getItem("naissance");
    var sexe = sessionStorage.getItem("sexe");
    var adresse = sessionStorage.getItem("adresse");
    var email = sessionStorage.getItem("email");
    
    var profile_utilisateur_renseignements, profile_menu_container, profile_teste_btn, profile_teste_menu, profile_teste;
    var profile_utilisateur_btn, profile_utilisateur_container, modifier_avatar;
    var profile_teste_content;
    var liste_des_matieres_apprises, liste_des_matieres_a_apprendre;

    let datas = [];
    let matieres_a_apprendre = JSON.parse(sessionStorage.getItem("matieres_a_apprendre"));
    let matieres_apprises = JSON.parse(sessionStorage.getItem("matieres_apprises"));
   
    var nom_de_matiere_a_renseigne = '';
    var matiere_a_renseigne = '';
    var matiere_index = '';
    var niveau_teste = '';
    var testes = [];

     
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
            manipulationDeProfileTesteMenu();
            
            function affichageDeProfileTesteMenu(){
                
                liste_des_matieres_apprises.innerHTML = (matieres_apprises.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresApprisesHtml();
                liste_des_matieres_a_apprendre.innerHTML = (matieres_a_apprendre.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresAApprendreHtml();
                profile_teste_btn.onclick = toggleProfileTesteMenu();
                
                function listeDesMatieresAApprendreHtml() {
                    let html = "<ul>";
                        for (let i = 0; i < matieres_a_apprendre.length; i++) {  
                            html += "<li>"+matieres_a_apprendre[i]+"</li>";
                        }
                        html += "</ul>";
                        return html;
                }
                function listeDesMatieresApprisesHtml() {
                    let html = "<ul>";
                        for (let i = 0; i < matieres_apprises.length; i++) {  
                            html += "<li>"+matieres_apprises[i]+"</li>";
                        }
                        html += "</ul>";
                        return html;
                }
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
                     document.location.href = "http://localhost/kouroukan/php/upload-avatar.php";
                 }
            }
        });
      /*-----------------------------------------------------------------------------*/   
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
