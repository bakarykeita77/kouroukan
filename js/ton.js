function ton() {
    let id_client = parseInt(JSON.parse(sessionStorage.getItem('id_client'))); 
    fetch("/kouroukan/api/index.php?id_user="+id_client)
    .then(response => response.json())
    .then(syllabe_lessons => {
        
        let datas = syllabe_lessons;
        let consonnes_choisies_du_serveur = consonnesChoisiesDuServeur();
        let memoire_consonnes_choisies = JSON.parse(localStorage.getItem("memoire_consonnes_choisies"));
        memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? consonnes_choisies_du_serveur : memoire_consonnes_choisies;
        let panneau_status = "masque";

            
        apprentissageTon();
        exerciceTon();
        revisionTon();
        evaluationTon();


        function apprentissageTon() {

            chargerApprentissageTon();
            afficherApprentissageTon();
            apprendreTon();


            function chargerApprentissageTon() {

                chargerEnteteDApprentissageTon();
                chargerFootDApprentissageTon();
                chargerCorpsDApprentissageTon();

                function chargerEnteteDApprentissageTon() {
                    $('.notification_titre').html('ߞߊ߲ߡߊߛߙߋ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ');
                    viderNotification();
                    setTimeout(() => { ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬."); }, 3000);
                }
                function chargerFootDApprentissageTon() {

                    chargerPanneauDesSyllabes();
                    chargerApprentissageDialoguesBtns();
                    chargerApprentissageRedirectionBtns();

                    function chargerPanneauDesSyllabes() {
                        var pre_apprentissage_panneaux_html = panneauxDesLettresHTML();
                        $('#panneaux').html(pre_apprentissage_panneaux_html);

                        function panneauxDesLettresHTML() {

                            var consonnes = caracteres[1];

                            var html_2 = '<div id="consonnes_cadre">\n';
                                html_2 += '<div id="consonnes_container">\n';
                                for (var i = 0; i < 18; i += 6) {
                                    html_2 += "<div>\n";
                                    for (var j = 0; j < 6; j++) {
                                        html_2 += "<span>" + consonnes[i + j] + "</span>";
                                    }
                                    html_2 += "</div>\n";
                                }
                                html_2 += '</div>\n';
                            html_2 += '</div>\n';

                            return html_2;
                        }
                    }
                    function chargerApprentissageDialoguesBtns() {
                        $('#apprentissage_dialogue_btns').html("<div class='titre_de_parti' id='afficheur_de_panneau'><p>ߛߌ߬ߙߕߊ߬ ߥߟߊ ߦߌ߬ߘߊ߬</p></div>");
                    }
                    function chargerApprentissageRedirectionBtns() {
                        $('#continu_sur_exercice_bouton').html("<p>ߜߋ߲߭ ߡߊ߬ߞߟߏ߬ߟߌ ߞߍ߫</p>");
                    }
                }
                function chargerCorpsDApprentissageTon() {}
            }
            function afficherApprentissageTon() {

                afficherApprentissageTonContainer();
                afficherPreApprentissageTonBtns(); 
                affichageDePanneauDeTon();

                function afficherApprentissageTonContainer() {
                    afficher($("#apprentissage_container"));
                    masquer($('#exercice_container'));
                    masquer($('#revision_container'));
                    masquer($('#evaluation_container'));
                }
                function afficherPreApprentissageTonBtns() {
                    afficher($('#apprentissage_progress_bar'));
                    masquer($('#apprentissage_redirection_btns'));
        
                    $('#afficheur_de_panneau').css({ 'opacity': 1, 'transform': 'scale(1)' });
                    rendreActif($('#afficheur_de_panneau'));
                    indexer($('#afficheur_de_panneau p'));
                }
                function affichageDePanneauDeTon() {

                    togglePanneauDesConsonnes();
                    panneauxStyle();

                    function togglePanneauDesConsonnes() {

                        $('#afficheur_de_panneau').click(function (e) {
                            e.stopImmediatePropagation();
                            $(this).removeClass('indicateur');
                            if (panneau_status == "masque") { afficherPanneau() } else { masquerPanneau(); };
                        }); 
                        
                        function afficherPanneau() {
                            
                            $('#panneaux').css({ 'height':'22rem' });
                            $('#consonnes_cadre').css({ 'height':'11.5rem' });
                            $('#consonnes_container').animate({ 'top':0 }, 200);
                            panneau_status = "affiche";

                            setTimeout(() => {
                                $('#afficheur_de_panneau').html("<p>ߛߌ߬ߙߕߊ߬ ߥߟߊ ߘߏ߲߰</p>");
                                clignoterUneFois($('#afficheur_de_panneau'));
                            }, 400);

                            viderNotification();
                            setTimeout(() => { ecris("apprentissage_notification_corps", "ߛߌ߬ߙߕߊ߬ ߞߋߟߋ߲߫ ߥߟߊ ߛߌߦߊߡߊ߲߫ ߛߎߥߊ߲ߘߌ߫߸ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߍ߲ ߜߋ߲߭ ߠߎ߬ ߘߋ߲߰."); }, 800);
                        }
                        function masquerPanneau() {

                            $('#consonnes_container').animate({ 'top': '100%' }, 200);
                            setTimeout(function () { 
                                $('#panneaux').css({ 'height':0 });
                                $('#consonnes_cadre').css('height', 0); 
                            }, 200);
                            panneau_status = "masque";

                            setTimeout(() => {
                                $('#afficheur_de_panneau').text("ߛߌ߬ߙߕߊ߬ ߥߟߊ ߦߌ߬ߘߊ߬");
                                clignoterUneFois($('#afficheur_de_panneau'));
                            }, 400);

                            viderNotification();
                            if ($('.table_parlante tr').length == 0) setTimeout(() => { ecris("apprentissage_notification_corps", "ߞߏ߰ߙߌ߫ ߣߘߍ߬ߡߊ ߘߌ߲߯ ߘߎ߭ߡߊ߬ ߞߊ߬ ߛߌ߬ߙߕߊ߬ ߥߟߊߟߋ߲ ߦߌ߬ߘߊ߬."); }, 800);
                            if ($('.table_parlante tr').length != 0) {
                                setTimeout(() => { ecris("apprentissage_notification_corps", "ߜߋ߲߭ ߢߌ߲߬ ߠߎ߫ ߞߋ߬ߟߋ߲߬ ߞߋ߬ߟߋ߲߬ ߘߋ߲߯ ߤߊ߲߯ ߊ߬ߟߎ߬ ߦߋ߫ ߕߴߌ ߞߣߐ߫."); }, 800);
                            }
                        }
                    }
                    function panneauxStyle() {

                        memoire_consonnes_choisies = memoireConsonnesChoisies();

                        $.each($('#panneaux span'), function () {

                            let panneaux_span = $(this);
                            let panneaux_consonne = ($(this).text());

                            if (memoire_consonnes_choisies.length > 0) {
                                memoire_consonnes_choisies.forEach(element => {
                                    if (element == panneaux_consonne) { panneaux_span.css({ 'color':'orange', 'font-weight':'bold', 'box-shadow':'none' }); }
                                });
                            }
                        });

                        function memoireConsonnesChoisies() {
                            let memoire_consonnes_choisies = JSON.parse(localStorage.getItem("memoire_consonnes_choisies"));
                            memoire_consonnes_choisies = (memoire_consonnes_choisies == null) ? [] : memoire_consonnes_choisies;
                            
                            if(consonnes_choisies_du_serveur.length != 0) {
                                consonnes_choisies_du_serveur.forEach(element => {
                                    if($.inArray(element,memoire_consonnes_choisies) === -1) memoire_consonnes_choisies.push(element);
                                });
                            }

                            return memoire_consonnes_choisies;
                        }
                    }
                }
            }
            function apprendreTon() {

                rappelDesBoutons();
                initialiserProgressBar();
                apprenezTon();


                function rappelDesBoutons() {
                    $('#apprentissage_body').click(function (e) {

                        if(e.target.id == "apprentissage_body" && $('#consonnes_cadre').css('top') == '192px') {
                            if($('#table_syllabe_apprentissage').text() == "ߜߋ߲߭ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                                secouer($("#afficheur_de_panneau"));
                                return;
                            }
                            if($('#table_syllabe_apprentissage').text() != "ߜߋ߲߭ ߘߋ߲߰ߕߊ ߟߎ߬ ߛߓߍߣߍ߲ ߓߕߐ߫ ߦߊ߲߬ ߠߋ߬") {
                                if($(".progress_bonne_reponse_bar").width() === 0) {
                                    secouer($('#table_syllabe_apprentissage td'));
                                    return;
                                }
                            }
                        }

                        if(e.target.id == "pre_texte") {
                            secouer($("#afficheur_de_panneau"));
                            return;
                        }
                    });
                    $('#panneaux').click(function (e) {
                        if(e.target.id == "panneaux") {
                            secouer($("#afficheur_de_panneau"));
                            return;
                        }
                    });
                }
                function apprenezTon() {}
            }
        }
        function exerciceTon() {}
        function revisionTon() {}
        function evaluationTon() {}
        
        
        function consonnesChoisiesDuServeur() {
       
            datas = JSON.parse(sessionStorage.getItem("datas"));

            let cs = [];
            let lesson = [];
            if (datas != null) lesson = (datas[2][0] == undefined) ? [] : JSON.parse(datas[2][0].lesson);

            lesson.forEach(element => {
                let consonne = element[0].split('')[0];
                if ($.inArray(consonne, cs) === -1) { cs.push(consonne); }
            });
            return cs;
        }
    })
    .catch(error => console.log( error ));
}