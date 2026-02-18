$('document').ready(function() {
         
 /* Declaration et initialisation des variables */
    let data_alphabet_du_serveur = [], data_syllabes_du_serveur = [], data_tons_du_serveur = [], data_chiffres_du_serveur = [];
    let niveaux_etudies_du_serveur = [], phases_etudiees_du_serveur = [];
	let niveau_en_cours_du_serveur = 1, niveau_max_du_serveur = 0;
	let derniere_phase_du_serveur = '';

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
    // document.getElementById("lien_du_programme").focus();
    pointerAutomatiquementLeCurseurSur("#lien_du_programme");
    
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
    	    sessionStorage.setItem('datas',JSON.stringify(datas));

            console.log("Les données des leçons étudiées par l'apprenant sont");
            console.log(datas);

         /* Analyse des données réçues de l'étudiant */
            profileTesteMenu();
            profileResulat();

         /*-------------------------------------------------------------------------   
           Matieres
         -------------------------------------------------------------------------*/
            data_alphabet_du_serveur = datas[0];
            data_syllabes_du_serveur = datas[1];
            data_tons_du_serveur = datas[2];
            data_chiffres_du_serveur = datas[3];

            let matiere_nouvellement_apprise_du_serveur = matiereNouvellementAprise();
            sessionStorage.setItem('matiere_nouvellement_apprise_du_serveur',JSON.stringify(matiere_nouvellement_apprise_du_serveur));

            sessionStorage.setItem('data_alphabet_du_serveur',JSON.stringify(data_alphabet_du_serveur));
            sessionStorage.setItem('data_syllabes_du_serveur',JSON.stringify(data_syllabes_du_serveur));
            sessionStorage.setItem('data_tons_du_serveur',JSON.stringify(data_tons_du_serveur));
            sessionStorage.setItem('data_chiffres_du_serveur',JSON.stringify(data_chiffres_du_serveur));
            
         /*-------------------------------------------------------------------------   
           Phases, Notes et Niveaux
         -------------------------------------------------------------------------*/   
            var note_1 = 0, note_2 = 0, note_3 = 0, note_4 = 0;
            var moyenne = 90, moyenne_1 = 0, moyenne_2 = 0, moyenne_3 = 0, moyenne_4 = 0;
                
            /*Calcul de phases étudiées*/ 
            for (var i = 0; i < datas.length ; i++) {
            for (var j = datas[i].length; j > 0; j--) {
                
                if(i === 0) {
                    /*Phases_etudiees de alphabet*/
                    if(JSON.parse(datas[i][j-1].lesson).length === 27) phases_etudiees_du_serveur.push(datas[i][j-1].phase); 
                } 
                if(i === 1) {
                    /*Phases_etudiees de syllabe*/
                    if(JSON.parse(datas[i][j-1].lesson).length === 126) phases_etudiees_du_serveur.push(datas[i][j-1].phase);
                } 
                if(i === 2) {
                    //Phases_etudiees de tons
                    console.log("Phases_etudiees pour les tons sont à calculer");
                } 
                
                let  nivo = parseInt(datas[i][j-1].niveau);
                let  phase_note = parseInt(datas[i][j-1].note);
                
                if(nivo === 1) note_1 += phase_note;
                if(nivo === 2) note_2 += phase_note;
                if(nivo === 3) note_3 += phase_note;
                if(nivo === 4) note_4 += phase_note;
            }}
        
            /*Calcul de niveaux étudiées*/ 
            if(datas[0] != undefined) moyenne_1 = note_1/3; //Moyenne générale pour alphabet
            if(datas[1] != undefined) moyenne_2 = note_2/3; //Moyenne générale pour syllabe
            if(datas[2] != undefined) moyenne_3 = note_3/3; //Moyenne générale pour tons
            if(datas[3] != undefined) moyenne_4 = note_4/3; //Moyenne générale pour chiffres
     
            if(moyenne_1 >= moyenne) niveaux_etudies_du_serveur.push(1);   	    
            if(moyenne_2 >= moyenne) niveaux_etudies_du_serveur.push(2);   	    
            if(moyenne_3 >= moyenne) niveaux_etudies_du_serveur.push(3);   	    
            if(moyenne_4 >= moyenne) niveaux_etudies_du_serveur.push(4);  

         /*Storage des phases et niveaux étudiés*/ 
            sessionStorage.setItem('phases_etudiees_du_serveur', JSON.stringify(phases_etudiees_du_serveur));
            sessionStorage.setItem('niveaux_etudies_du_serveur', JSON.stringify(niveaux_etudies_du_serveur));
            sessionStorage.setItem('derniere_phase_du_serveur' , JSON.stringify(derniere_phase_du_serveur ));
    
            niveau_max_du_serveur = (niveaux_etudies_du_serveur.length === 0) ? 0 : Math.max(...niveaux_etudies_du_serveur);
            niveau_en_cours_du_serveur = niveau_max_du_serveur + 1;
           
            sessionStorage.setItem('niveau_max_du_serveur', JSON.stringify(niveau_max_du_serveur));
            sessionStorage.setItem('niveau_en_cours_du_serveur', JSON.stringify(niveau_en_cours_du_serveur));
                    
         /*-------------------------------------------------------------------------   
           Les pratiques 
         -------------------------------------------------------------------------*/              
            let pratiques = [];
        
            for (var i = 0; i < datas.length; i++) {
            for (var j = 0; j < datas[i].length; j++) {
                if(datas[i][j]['phase'].split('_')[1] == "pratique") {
                    
                    let niveau = datas[i][j]['niveau'];
                    let lesson = datas[i][j]['lesson'];
                    let note   = datas[i][j]['note'];
                    
                    pratiques.push([niveau,lesson,note]);
                }
            }}
            
            localStorage.setItem('pratiques', JSON.stringify(pratiques));
            sessionStorage.setItem('pratiques', JSON.stringify(pratiques));
     

            function matiereNouvellementAprise() {
                let derniere_matiere = "";
                for (let i = 0; i < datas.length; i++) {
                    if(i === 0)if(datas[i].length === 3) derniere_matiere = "ߛߓߍߛߎ߲";
                    if(i === 1)if(datas[i].length === 3) derniere_matiere = "ߜߋ߲߭";
                    if(i === 2)if(datas[i].length === 3) derniere_matiere = "ߞߊ߲ߡߊߛߙߋ";
                    if(i === 3)if(datas[i].length === 3) derniere_matiere = "ߖߊ߰ߕߋ߬ߘߋ߲";
                }
                return derniere_matiere;
            }
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