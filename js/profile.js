 
    var profile_container, profile_entete, profile_teste_btn, profile_teste_menu, profile_teste;
    var profile_utilisateur_btn, profile_utilisateur_container, profile_utilisateur, modifier_avatar = '';
    var profile_clients_bruts = '';
    var lessons_studied_titles, profile_teste_content = '';
    var titre_des_matieres_apprises, titre_des_matieres_a_apprendre = '';
    var liste_des_matieres_apprises, liste_des_matieres_a_apprendre = '';
   
    var global_testes = [];

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
    var testes = '';
    var nbr_teste_niveau_1 = 0;
    var nbr_teste_niveau_2 = 0;
    var nbr_teste_niveau_3 = 0;
    var nbr_teste_niveau_4 = 0;
    
    
    ajaxGet("/kouroukan/pages/testes-data.php",function(response){
        
        var testes_bruts = JSON.parse(response);

        var testes_traites = traitementDeTestesBruts();
        testes_traites = testes_traites.split('_');
            
        for(var i=0;i<testes_traites.length;i++){
            var teste_traite = testes_traites[i].split('/');
            for(var j=0;j<teste_traite.length;j++){
                var teste = teste_traite[3];
            }
        }
        profile_testes.innerHTML = testes_traites;
        
        nombre_de_teste_par_niveau = triDesTestesParNiveau();
        nombre_de_teste_par_niveau = nombre_de_teste_par_niveau.join(';');
        nbr_teste.innerHTML = nombre_de_teste_par_niveau;
      
        function traitementDeTestesBruts(){
            var resultat_du_traitement = [];
            for(var i=0;i<testes_bruts.length;i++){
                
                var id_client = testes_bruts[i].id_client;
                var date = testes_bruts[i].Date;
                var niveau = reverseIntNko(testes_bruts[i].Niveau);
                var teste = testes_bruts[i].Teste;
                var point = testes_bruts[i].Point;
                point = point.split(',');
                point = point[0];
                var teste_traite = [];
                
                teste_traite[0] = id_client;
                teste_traite[1] = date;
                teste_traite[2] = niveau;
                teste_traite[3] = teste;
                teste_traite[4] = point;
                
                resultat_du_traitement[resultat_du_traitement.length] = teste_traite.join('/');
            }
            resultat_du_traitement = resultat_du_traitement.join('%');
            return resultat_du_traitement;
        }
        function triDesTestesParNiveau(){
            
            var testes_par_niveau = []; 
            var testes_niveau_1 = []; 
            var testes_niveau_2 = [];
            var testes_niveau_3 = [];
            var testes_niveau_4 = [];
            
            var testes_1 = [];
            var testes_2 = [];
            var testes_3 = [];
            var testes_4 = [];
            
            testes_traites = testes_traites.split('_');

   
            for(var j=0;j<5;j++){
                
                if(testes_traites[j].split('/')[2] == 1){ nbr_teste_niveau_1++;   testes_1[testes_1.length] = [testes_traites[j].split('/')[3]+','+testes_traites[j].split('/')[4]]; }
                if(testes_traites[j].split('/')[2] == 2){ nbr_teste_niveau_2++;   testes_2[testes_2.length] = [testes_traites[j].split('/')[3]+','+testes_traites[j].split('/')[4]]; }
                if(testes_traites[j].split('/')[2] == 3){ nbr_teste_niveau_3++;   testes_3[testes_3.length] = [testes_traites[j].split('/')[3]+','+testes_traites[j].split('/')[4]]; }
                if(testes_traites[j].split('/')[2] == 4){ nbr_teste_niveau_4++;   testes_4[testes_4.length] = [testes_traites[j].split('/')[3]+','+testes_traites[j].split('/')[4]]; }
            }
            
            testes_niveau_1[0] = 1;    testes_niveau_1[1] = nbr_teste_niveau_1;    testes_niveau_1[2] = testes_1+'\n\n'; 
            testes_niveau_2[0] = 2;    testes_niveau_2[1] = nbr_teste_niveau_2;    testes_niveau_2[2] = testes_2+'\n\n';
            testes_niveau_3[0] = 3;    testes_niveau_3[1] = nbr_teste_niveau_3;    testes_niveau_3[2] = testes_3+'\n\n';
            testes_niveau_4[0] = 4;    testes_niveau_4[1] = nbr_teste_niveau_4;    testes_niveau_4[2] = testes_4+'\n\n';
            
            testes_par_niveau[0] = testes_niveau_1+'\n\n';
            testes_par_niveau[1] = testes_niveau_2+'\n\n';
            testes_par_niveau[2] = testes_niveau_3+'\n\n';
            testes_par_niveau[3] = testes_niveau_4+'\n\n';
              
            return testes_par_niveau;
        }

    }, function(){});
    ajaxGet("/kouroukan/pages/clients-data.php",function(response){
        var ajax_clients = [];
        const clients = JSON.parse(response);
        for(var i=0;i<clients.length;i++){
            let ajax_client = [clients[i].id, clients[i].prenom, clients[i].nom, clients[i].naissance, clients[i].sexe, clients[i].adresse, clients[i].email];
            ajax_clients.push(ajax_client);
        }
        profile_clients_bruts.innerHTML = ajax_clients.join(';');
    }, function(){});

    selectionDesElementsDeProfile();
    affichageDeProfileEntete();
    manipulationDeProfileEntete();

    function ajaxGet(url,onSuccess,onError){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200)
            { onSuccess(xhr.responseText); }else
            { onError(xhr); }
        };
        xhr.send();
    }
    function affichageDeProfileEntete(){
        $('#logo').click(function(){
            $(".profile_menu").toggle(100);
            profile_container.slideToggle(150);
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
                    if(profile_teste_menu.style.height == '180px'){
                        profile_teste_menu.style.height = 0;
                        setTimeout(function() { profile_teste_menu.style.display = 'none'; }, (250));
                        setTimeout(function() { profile_teste.style.display = 'none'; }, (200));
                    }else{
                        profile_teste_menu.style.display = 'block';
                        setTimeout(function() { profile_teste_menu.style.height = '180px'; }, (10));
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
                        
                        teste[0] = profile_teste[0];
                        teste[1] = profile_teste[1];
                        teste[2] = profile_teste[2];
                        teste[3] = profile_teste[3].split(';');
                        teste[4] = profile_teste[4];
                       
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
                       var point = testes[i][4];
                       point = reverseIntNko(point);
                       if(point>10){
                           var id_matiere_apprise = testes[i][2]-1;
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
 
                    var date_du_teste = testes_de_meme_niveau[n][1];
                    date_du_teste = date_du_teste.split(' ');
                    date_du_teste = date_du_teste[0].split('-');
                    date_du_teste = mois[parseInt(date_du_teste[1])]+' ߕߟߋ߬ '+parseIntNko(date_du_teste[2])+' ߛߊ߲߭ '+parseIntNko(date_du_teste[0]);
                   
                    var teste = testes_de_meme_niveau[n][3];
                    var points = testes_de_meme_niveau[n][4];

                    chargementDeProfileTeste();
                    document.getElementsByClassName('bouton_afficheur_de_teste')[0].click();

                    function triDesTestesParNiveau(){
                    /* Regroupement des testes de meme niveau dans un tableau. */
                        var groupe_de_teste = [];
                        for(i=0;i<testes.length;i++){
                            
                            niveau_teste = testes[i][2];
                            if(matiere_index+1==niveau_teste){
                                groupe_de_teste[groupe_de_teste.length] = testes[i];
                            }
                        }
                
                        return groupe_de_teste;
                    }
                    function miseEnSurbrillanceDeLaMatiereARenseigne(){
                        matiere_a_renseigne.addClass('flowerblue');
                        matiere_a_renseigne.siblings().removeClass('flowerblue');
                    }
                    function elementsHTMLDeProfileTeste(){
                
                        if(testes_de_meme_niveau!='')
                        { profile_teste.innerHTML = testeEffectueHTML(); }else
                        { profile_teste.innerHTML = testeNonEffectueHTML(); }

                        function testeEffectueHTML(){
                            function testesBoutons(){
                                for(var m=testes_de_meme_niveau.length;m>0;m--){ 
                                    testes_btn += '<td class="bouton_afficheur_de_teste">'+parseIntNko(m)+'</td>';
                                }
                                return testes_btn;
                            }
                                    
                            var testes_btn = testesBoutons();
                             
                            var affiche_html = '<div id="profile_teste_content">\n';
                                affiche_html += '<span id="fermeture_affiche" onclick="fermerProfileCorps()">&times;</span>\n\n';
                                affiche_html += '<div id="teste_switcher">\n<span>'+nom_de_matiere_a_renseigne+' ߞߘߐߓߐߟߌ</span><table id="nbr_table"><tr id="nbr_testes"></tr>'+testes_btn+'</table>\n</div>\n';
                                affiche_html += '<div>\n<span id="profile_teste_date"></span></div>';
                                
                                affiche_html += '<br/>';
                                
                                affiche_html += '<div>\n<span>ߓߙߍ߬ߦߊ߬ߥߟߊ</span>\n</div>\n\n';
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
                                        affiche_html += '<td colspan="3" style="width:228px">ߓߙߍ߬ߦߊ ߡߎ߬ߡߍ</td>\n';
                                        affiche_html += '<td id="profile_total_points"></td>\n';
                                    affiche_html += '</tr>\n';
                                    affiche_html += '</tfoot>\n\n';
                
                                affiche_html += '</table>\n';
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
                            
                            $(this).css({'fontWeight':'bold', 'boxShadow':'0 0 16px #666', 'border':'none', 'transform':'scale(1.5)'});
                            $(this).siblings().css({'fontWeight':'normal', 'boxShadow':'none', 'border':'1px solid #ddd', 'transform':'scale(1)'});
                            
                            n = $(this).index();
                            var date_du_teste = testes_de_meme_niveau[n][1];
                            date_du_teste = date_du_teste.split(' ');
                            date_du_teste = date_du_teste[0].split('-');
                            date_du_teste = mois[parseInt(date_du_teste[1])]+' ߕߟߋ߬ '+parseIntNko(date_du_teste[2])+' ߛߊ߲߭ '+parseIntNko(date_du_teste[0]);
                            var teste = testes_de_meme_niveau[n][3];
                            var points = testes_de_meme_niveau[n][4];
                            
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
                                        profile_teste_body_content += '<tr style="border:1px solid #fff; width:302px"><td>'+data[0]+'</td><td>'+data[1]+'</td><td>'+data[2]+'</td><td>'+data[3]+'</td></tr>\n';
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
            
            elementsHTMLDuProfileUtilisateur();
            insertionDesElementsHTMLDeProfileUtilisateur();
            afficherProfileUtilisateur();
            chargementDuProfileUtilisateur();
            modifierProfileUtilisateur();
            
            function elementsHTMLDuProfileUtilisateur(){
                
            var profile_utilisateur_html  = '<div> <span>ߕߐ߮ </span><span id="profile_prenom"></span></div>\n';
                profile_utilisateur_html += '<div> <span>ߖߊ߬ߡߎ߲ </span><span id="profile_nom"></span></div>\n';
                profile_utilisateur_html += '<div> <span>ߡߐߦߌߛߊ߲ </span><span id="profile_naissance"></span></div>\n';
                profile_utilisateur_html += '<div> <span>ߖߊ߲߭ </span><span id="profile_sexe"></span></div>\n';
                profile_utilisateur_html += '<div> <span>ߛߊ߲߬ߓߊ߬ߕߐ߮ </span><span id="profile_adresse"></span></div>\n';
                profile_utilisateur_html += '<div> <table><tr><td><span style="font-weight:normal">Mail</span></td><td style="display:inline-block; overflow:visible; width:180px"><span id="profile_mail"></span></td> </tr></table></div>\n';

                return profile_utilisateur_html;
            }
            function insertionDesElementsHTMLDeProfileUtilisateur(){
                profile_utilisateur_renseignements.innerHTML = elementsHTMLDuProfileUtilisateur();
            }
            function afficherProfileUtilisateur(){
                    this.onclick = toggleProfileUtilisateur();
                    function toggleProfileUtilisateur(){
                        if(profile_utilisateur_container.style.height == '180px'){
                            profile_utilisateur_container.style.height = 0;
                            setTimeout(function() { profile_utilisateur_container.style.display = 'none'; }, (250));
                        }else{
                            profile_utilisateur_container.style.display = 'block';
                            setTimeout(function() { profile_utilisateur_container.style.height = '180px'; }, (10));
                        }
                    }
            }
            function chargementDuProfileUtilisateur(){
                
                var profile_utilisateur_renseignements = document.getElementById('profile_utilisateur_renseignements');
                var profile_prenom    = document.getElementById('profile_prenom');
                var profile_nom       = document.getElementById('profile_nom');
                var profile_naissance = document.getElementById('profile_naissance');
                var profile_sexe      = document.getElementById('profile_sexe');
                var profile_adresse   = document.getElementById('profile_adresse');
                var profile_mail      = document.getElementById('profile_mail');
                
                var profile_client_id = document.getElementById('profile_client_id').innerHTML;
                var id, prenom, nom, naissance, sexe, adresse, email = '';
                
                var clients_bruts = profile_clients_bruts.innerHTML;
                clients_bruts = clients_bruts.split(';');
                
                var clients_collection = [];
                for(var i=0;i<clients_bruts.length;i++){
                    var client = clients_bruts[i].split(',');
                    id = client[0];
                    if(profile_client_id==id){
                        prenom    = client[1];
                        nom       = client[2];
                        naissance = client[3];
                        sexe      = client[4];
                        adresse   = client[5];
                        email     = client[6];
                    }
                }

                profile_prenom.innerHTML    = ': '+prenom;
                profile_nom.innerHTML       = ': '+nom;
                profile_naissance.innerHTML = ': '+naissance;
                profile_sexe.innerHTML      = ': '+sexe;
                profile_adresse.innerHTML   = ': '+adresse;
                profile_mail.innerHTML      = email;
            }
            function modifierProfileUtilisateur(){
                
                 var avatar_image = document.getElementById('avatar_image');
                 var avatar_submit = document.getElementById('avatar_submit');
                 
                 modifier_avatar.onclick = function(){
                     document.location.href = 'http://localhost:8080/kouroukan/pages/upload-avatar.php';
                 }
            }
        });
      /*-----------------------------------------------------------------------------*/   
    }
    function effectuerLaRequeteAjax(){
        
        var xhr = new XMLHttpRequest();
        var methode = "GET";
        var url = "http://localhost:8080/kouroukan/pages/testes-data.php";
        var asynchronous = true;
    
        xhr.open(methode,url,asynchronous);
        xhr.onload = function(){
            var response = JSON.parse(this.responseText);
    
            global_testes = reconstitutionDesTextes();
    
            function reconstitutionDesTextes(){
                
                var id_teste, id_client, niveau_teste, date_teste;
                var recapitulatif_des_testes = [];
                var teste = [];
                var point = [];
                var testes = [];
    
                for(var i=0;i<response.length;i++){
                    
                    id_teste     = response[i]['id'];
                    id_client    = response[i]['id_client'];
                    date_teste   = response[i]['Date'];
                    niveau_teste = response[i]['Niveau'];
                    teste        = response[i]['Teste'].split(';');
                    point        = response[i]['Point'].split('\\');
                    
                    testes = [id_teste, id_client, date_teste, niveau_teste, teste, point];
                    recapitulatif_des_testes[recapitulatif_des_testes.length] = testes;
                }

                return recapitulatif_des_testes;             
            }
        }
        xhr.send(null);
         
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
        
        profile_container = $('#profile_container');
        profile_entete = document.getElementById('profile_entete');
        profile_testes_bruts = document.getElementById('profile_testes_bruts');
        nbr_teste = document.getElementById('nbr_teste');
        profile_teste_point = document.getElementById('profile_teste_point');
        profile_teste_btn = document.getElementById('profile_teste_btn');
        profile_teste_menu = document.getElementById('profile_teste_menu');
        profile_testes = document.getElementById('profile_testes');
        profile_teste = document.getElementById('profile_teste');
        modifier_avatar = document.getElementById('modifier_avatar');
        
        profile_clients_bruts = document.getElementById('profile_clients_bruts');
        profile_utilisateur_btn = document.getElementById('profile_utilisateur_btn');
        profile_utilisateur_container = document.getElementById('profile_utilisateur_container');
        profile_utilisateur = document.getElementById('profile_utilisateur');
        
        titre_des_matieres_apprises = document.getElementById('titre_des_matieres_apprises');
        titre_des_matieres_a_apprendre = document.getElementById('titre_des_matieres_a_apprendre');
        liste_des_matieres_apprises = document.getElementById('liste_des_matieres_apprises');
        liste_des_matieres_a_apprendre = document.getElementById('liste_des_matieres_a_apprendre');
    }  
    
