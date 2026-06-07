$('document').ready(function() {
    // localStorage.clear();
    // sessionStorage.clear();
    
    /* 
    Initialisation de sessionStorage et de localStorage.
    Lorsequ'un navigateur change d'utilisateur (en changeant de compte), 
    les données stockées (en sessionStorage et en localStorage) sont oubliées.
    */
    let precedent_id = JSON.parse(sessionStorage.getItem('id_client'));
    let present_id = document.getElementById('id_client').innerHTML;
    if(precedent_id != present_id) { sessionStorage.clear(); localStorage.clear(); }

    userIdentityStorage(); /* Storage des Identités récuperées de l'étudiant */
    datasDuServeur();         /* Récuperation et storage des data recuperés de l'étudiant */
    
    function userIdentityStorage() {
        sessionStorage.setItem("id_client", JSON.stringify(document.getElementById("id_client").innerHTML));
        sessionStorage.setItem("prenom",    JSON.stringify(document.getElementById("prenom"   ).innerHTML));
        sessionStorage.setItem("nom",       JSON.stringify(document.getElementById("nom"      ).innerHTML));
        sessionStorage.setItem("naissance", JSON.stringify(document.getElementById("naissance").innerHTML));
        sessionStorage.setItem("sexe",      JSON.stringify(document.getElementById("sexe"     ).innerHTML));
        sessionStorage.setItem("adresse",   JSON.stringify(document.getElementById("adresse"  ).innerHTML));
        sessionStorage.setItem("email",     JSON.stringify(document.getElementById("email"    ).innerHTML));
    }
    function datasDuServeur() {
        
        /* Recuperation de toutes les matières étdiées par l'apprenant par envoi de son id à api de kouroukan. */
        fetch("/kouroukan/api/index.php?id_user="+present_id)
        .then(response => response.json())
        .then(matiere_collection => {
         /*-------------------------------------------------------------------------   
            datas
         -------------------------------------------------------------------------*/   
            let datas = matiere_collection;

            console.log("Les données des leçons étudiées par l'apprenant sont");
            console.log(datas);

         /* Analyse des données réçues de l'étudiant */
            afficherProfile();
            profileUtilisateur();
            profileTeste(datas);
            profileResulat(datas);
        })
        .catch(error => console.log( error ));
    }
});


$(".fermeture").click(() => { $(this).parent().css("display","none"); });
$("#menu_menu").click(() => { $("#menu_deroulant").slideToggle("fast");          });

function pourcentagePoint(memoire) {
    if(memoire != null) {
        let pp = 0;
        let tp = 0;
        for(let i=0; i<memoire.length; i++) { tp += memoire[i][2]; }
        pp = Math.floor(tp*100/memoire.length);
        return pp;
    }
}
function afficherProfile() {
    toggleElement($("#logo"),$("#profile_menu_container"));
}
function profileUtilisateur() {
    toggleElement($("#profile_utilisateur_btn"),$("#profile_utilisateur_container"));
}
function profileResulat(datas) {
    
    resultatGeneral(datas);
    afficherLeResulat();
    fermerLeResulat();

    function afficherLeResulat() {
        $('#afficheur_du_resultat').click(() => {
            $('#profile_resultat').css('display','block');
        });
    }
    function fermerLeResulat() {
        $('#fermer_resultat').click(() => {
            $('#profile_resultat').css('display','none');
        });
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
            if(datas[j].length == 0) 
            { matieres_a_apprendre_du_serveur.push(liste_de_matieres[j][1]); }else
            { matieres_apprises_du_serveur.push(liste_de_matieres[j][1]); }
        }
    }
    function chargementDeProfileTesteMenu() {

        document.getElementById("liste_des_matieres_apprises").innerHTML = (matieres_apprises_du_serveur.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresApprisesHtml();
        document.getElementById("liste_des_matieres_a_apprendre").innerHTML = (matieres_a_apprendre_du_serveur.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresAApprendreHtml();
        
        function listeDesMatieresAApprendreHtml() {
            let html = "<ul>";
            for (let i = 0; i < matieres_a_apprendre_du_serveur.length; i++) html += "<li>"+matieres_a_apprendre_du_serveur[i]+"</li>";
            html += "</ul>";
            return html;
        }
        function listeDesMatieresApprisesHtml() {
            let html = "<ul>";
            for (let i = 0; i < matieres_apprises_du_serveur.length; i++) html += "<li>"+matieres_apprises_du_serveur[i]+"</li>";
            html += "</ul>";
            return html;
        }
    }
    function affichageDeProfileTesteMenu() {
        toggleElement($("#profile_teste_btn"),$("#profile_teste_menu"));
    }
}