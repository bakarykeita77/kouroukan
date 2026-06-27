$('document').ready(function () {
    if (document.getElementById('id_client') != null) {

        /* 
        Initialisation de sessionStorage et de localStorage.
        Lorsequ'un navigateur change d'utilisateur (en changeant de compte), 
        les données stockées (en sessionStorage et en localStorage) sont oubliées.
        */
        let precedent_id = JSON.parse(sessionStorage.getItem('id_client'));
        let present_id = document.getElementById('id_client').innerHTML;
        if (precedent_id != present_id) { sessionStorage.clear(); localStorage.clear(); }

        userIdentityStorage(); /* Storage des Identités récuperées de l'étudiant */
        datasDuServeur();      /* Récuperation et storage des data recuperés de l'étudiant */

        $(".fermeture").click(() => { $(this).parent().css("display", "none"); });
        $("#menu_menu").click(() => { $("#menu_deroulant").slideToggle("fast"); });


        function userIdentityStorage() {
            sessionStorage.setItem("id_client", JSON.stringify(document.getElementById("id_client").innerHTML));
            sessionStorage.setItem("prenom", JSON.stringify(document.getElementById("prenom").innerHTML));
            sessionStorage.setItem("nom", JSON.stringify(document.getElementById("nom").innerHTML));
            sessionStorage.setItem("naissance", JSON.stringify(document.getElementById("naissance").innerHTML));
            sessionStorage.setItem("sexe", JSON.stringify(document.getElementById("sexe").innerHTML));
            sessionStorage.setItem("adresse", JSON.stringify(document.getElementById("adresse").innerHTML));
            sessionStorage.setItem("email", JSON.stringify(document.getElementById("email").innerHTML));
        }
        function datasDuServeur() {

            /* Recuperation de toutes les matières étdiées par l'apprenant par envoi de son id à api de kouroukan. */
            fetch("../api/index.php?id_user=" + present_id)
            .then(response => response.json())
            .then(matiere_collection => {

                let datas = matiere_collection;

                datas = (datas == undefined) ? [[], [], [], []] : datas;
                sessionStorage.setItem("datas", JSON.stringify(datas));

                afficherProfile();
                profileUtilisateur();
                profileTeste(datas);
                profileResulat(datas);

                function afficherProfile() {
                    toggleElement($("#logo"), $("#profile_menu_container"));
                }
                function profileUtilisateur() {

                    afficherProfileUtilisateur();
                    modificationProfileUtilisateurPhoto();

                    function modificationProfileUtilisateurPhoto() {
                        $("#modifier_avatar").click(function () { document.location.href = "../php/upload-avatar.php"; });
                    }
                    function afficherProfileUtilisateur() {
                        toggleElement($("#profile_utilisateur_btn"), $("#profile_utilisateur_container"));
                    }
                }
                function profileTeste(datas) {

                    /* Declaration et initialisation des variables */
                    let matieres_a_apprendre_du_serveur = [];
                    let matieres_apprises_du_serveur = [];

                    calculDesMatieresApprisesEtNonApprises();
                    chargementDeProfileTesteMenu();
                    affichageDeProfileTesteMenu();

                    function calculDesMatieresApprisesEtNonApprises() {
                        for (let j = 0; j < datas.length; j++) {
                            if (datas[j].length == 0) { matieres_a_apprendre_du_serveur.push(liste_de_matieres[j][1]); } else { matieres_apprises_du_serveur.push(liste_de_matieres[j][1]); }
                        }
                    }
                    function chargementDeProfileTesteMenu() {

                        document.getElementById("liste_des_matieres_apprises").innerHTML = (matieres_apprises_du_serveur.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresApprisesHtml();
                        document.getElementById("liste_des_matieres_a_apprendre").innerHTML = (matieres_a_apprendre_du_serveur.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresAApprendreHtml();

                        function listeDesMatieresAApprendreHtml() {
                            let html = "<ul>";
                            for (let i = 0; i < matieres_a_apprendre_du_serveur.length; i++) html += "<li>" + matieres_a_apprendre_du_serveur[i] + "</li>";
                            html += "</ul>";
                            return html;
                        }
                        function listeDesMatieresApprisesHtml() {
                            let html = "<ul>";
                            for (let i = 0; i < matieres_apprises_du_serveur.length; i++) html += "<li>" + matieres_apprises_du_serveur[i] + "</li>";
                            html += "</ul>";
                            return html;
                        }
                    }
                    function affichageDeProfileTesteMenu() {
                        toggleElement($("#profile_teste_btn"), $("#profile_teste_menu"));
                    }
                }
                function profileResulat(datas) {

                    resultatGeneral(datas);
                    afficherLeResulat();
                    fermerLeResulat();

                    function afficherLeResulat() {
                        $('#afficheur_du_resultat').click(() => {
                            $('#profile_resultat').css('display', 'block');
                        });
                    }
                    function fermerLeResulat() {
                        $('#fermer_resultat').click(() => {
                            $('#profile_resultat').css('display', 'none');
                        });
                    }
                }
            })
            .catch(error => console.log(error));
        }
    }
});