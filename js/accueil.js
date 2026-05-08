$('document').ready(function() {
// localStorage.clear();
// sessionStorage.clear();

console.log(localStorage);
console.log(sessionStorage);

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
     
     /* Recuperation de toutes les matières étdiées par l'apprenant par envoi de son id à api de kouroukan. */
    	fetch("/api/index.php?id_user="+present_id)
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
    	})
    	.catch(error => console.log( error ));
    }
});