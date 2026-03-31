$('document').ready(function() {
         
 /* Declaration et initialisation des variables */
    let data_alphabet_du_serveur = [], data_syllabes_du_serveur = [], data_tons_du_serveur = [], data_chiffres_du_serveur = [];
    let matieres_a_apprendre_du_serveur = [];
    let matieres_apprises_du_serveur = [];

 /* 
    Initialisation de sessionStorage et de localStorage.
    Lorsequ'un navigateur change d'utilisateur (en changeant de compte), 
    les données stockées (en sessionStorage et en localStorage) sont oubliées.
 */
    let precedent_id = JSON.parse(sessionStorage.getItem('id_client'));
    let present_id = document.getElementById('id_client').innerHTML;
    if(precedent_id != present_id) { sessionStorage.clear(); localStorage.clear(); }

    userIdentityStorage(); /* Storage des Identités récuperées de l'étudiant */
    dataStorage();         /* Récuperation et storage des data recuperés de l'étudiant */
    afficherLogo();
    afficher($('#reception'));
    mmettreLeFocusSur("#lien_du_programme");
    
    function userIdentityStorage() {
        sessionStorage.setItem('id_client', JSON.stringify(document.getElementById('id_client').innerHTML));
        sessionStorage.setItem('prenom',    JSON.stringify(document.getElementById('prenom').innerHTML));
        sessionStorage.setItem('nom',       JSON.stringify(document.getElementById('nom').innerHTML));
        sessionStorage.setItem('naissance', JSON.stringify(document.getElementById('naissance').innerHTML));
        sessionStorage.setItem('sexe',      JSON.stringify(document.getElementById('sexe').innerHTML));
        sessionStorage.setItem('adresse',   JSON.stringify(document.getElementById('adresse').innerHTML));
        sessionStorage.setItem('email',     JSON.stringify(document.getElementById('email').innerHTML));
    }
    function dataStorage() {

     /* Identifiant id de l'apprenant. */
        let user_id = parseInt(JSON.parse(sessionStorage.getItem('id_client'))); 
     
     /* Recuperation de toutes les matières étdiées par l'apprenant par envoi de son id à api de kouroukan. */
    	fetch("/kouroukan/api/index.php?id_user="+user_id)
    	.then(response => response.json())
    	.then(matiere_collection => {
         /*-------------------------------------------------------------------------   
          datas
         -------------------------------------------------------------------------*/   
            let datas = matiere_collection;

            console.log("Les données des leçons étudiées par l'apprenant sont");
            console.log(datas);

         /* Analyse des données réçues de l'étudiant */
            profileTesteMenu(datas);
            profileResulat(datas);

            function profileTesteMenu(){

                calculDesMatieresApprisesEtNonApprises();
                chargementDeProfileTesteMenu();
                affichageDeProfileTesteMenu();
                    
                function calculDesMatieresApprisesEtNonApprises() {
                    for (let j = 0; j < datas.length; j++) {
                        if(datas[j].length == 0) 
                        { matieres_a_apprendre_du_serveur.push(liste_de_matieres[j][1]); }else
                        { matieres_apprises_du_serveur.push(liste_de_matieres[j][1]); }
                    }
                    
                    sessionStorage.setItem('matieres_apprises_du_serveur',JSON.stringify(matieres_apprises_du_serveur));
                    sessionStorage.setItem('matieres_a_apprendre_du_serveur',JSON.stringify(matieres_a_apprendre_du_serveur));
                }
                function chargementDeProfileTesteMenu() {

                    document.getElementById("liste_des_matieres_apprises").innerHTML = (matieres_apprises_du_serveur.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresApprisesHtml();
                    document.getElementById("liste_des_matieres_a_apprendre").innerHTML = (matieres_a_apprendre_du_serveur.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresAApprendreHtml();
    
                    function listeDesMatieresAApprendreHtml() {
                        let html = "<ul>";
                        for (let i = 0; i < matieres_a_apprendre_du_serveur.length; i++) {  
                            html += "<li>"+matieres_a_apprendre_du_serveur[i]+"</li>";
                        }
                        html += "</ul>";
                        return html;
                    }
                    function listeDesMatieresApprisesHtml() {
                        let html = "<ul>";
                        for (let i = 0; i < matieres_apprises_du_serveur.length; i++) {  
                            html += "<li>"+matieres_apprises_du_serveur[i]+"</li>";
                        }
                        html += "</ul>";
                        return html;
                    }
                }
                function affichageDeProfileTesteMenu() {
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
            }
    	})
    	.catch(error => console.log( error ));
    }
    function afficherLogo() { $('#logo').css('display', 'block'); }
});