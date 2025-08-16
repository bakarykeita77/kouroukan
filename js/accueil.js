$('document').ready(function() {
         
 /* Declaration et initialisation des variables */
    
    let alphabet = [], syllabe = [], tons = [], chiffres = [];
    let phase_11 = "";

    let niveaux_etudies = [], phases_etudiees = [];
	let niveau_en_cours = 1, niveau_max = 0;
	let derniere_phase = '';

    let matieres_a_apprendre = [];
    let matieres_apprises = [];

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
    displayZoom($('#reception'));
    

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
            let datas = [];

    	    for(var i=0; i<matiere_collection.length; i++) { datas[i] = (matiere_collection[i].length === 0)  ? [] : matiere_collection[i]; }
    	    sessionStorage.setItem('datas',JSON.stringify(datas));

            profileTesteMenu();
            profileResulat();

console.log("Les données des leçons étudiées par l'apprenant sont");
console.log(datas);

            if(datas.length === 0) {
                sessionStorage.setItem('niveaux_etudies',JSON.stringify([]));
                sessionStorage.setItem('niveau_max',JSON.stringify(0));
                sessionStorage.setItem('niveau_en_cours',JSON.stringify(1));
                
                sessionStorage.setItem('phases_etudiees',JSON.stringify([]));
                sessionStorage.setItem('derniere_phase',JSON.stringify(''));
                sessionStorage.setItem('phase_active',JSON.stringify('alphabet_apprentissage'));
            }
            
            if(datas.length > 0) {
             /*-------------------------------------------------------------------------   
              Phases, Notes et Niveaux
             -------------------------------------------------------------------------*/   
                var note_1 = 0, note_2 = 0, note_3 = 0, note_4 = 0;
                var moyenne = 1, moyenne_1 = 0, moyenne_2 = 0, moyenne_3 = 0, moyenne_4 = 0;

                if(datas[1][0] == undefined) {
                    sessionStorage.setItem("id_apprentissage", JSON.stringify("syllabe_apprentissage"));
                    sessionStorage.setItem("id_exercice", JSON.stringify("syllabe_exercice"));
                    sessionStorage.setItem("id_revision", JSON.stringify("syllabe_revision"));
                } 
                if(datas[1][0] != undefined) { sessionStorage.setItem("id_apprentissage", JSON.stringify(datas[1][0].id)); }
                if(datas[1][1] != undefined) { sessionStorage.setItem("id_exercice", JSON.stringify(datas[1][1].id)); }
                if(datas[1][2] != undefined) { sessionStorage.setItem("id_revision", JSON.stringify(datas[1][2].id)); }
                if(datas[1][3] != undefined) { sessionStorage.setItem("id_evaluation", JSON.stringify(datas[1][3].id)); }
                    
            	for (var i = 0; i < datas.length ; i++) {
            	for (var j = datas[i].length; j > 0; j--) {
                 
                    if(i === 0) {
                     //Phases_etudiees de alphabet
                        phases_etudiees.push(datas[i][j-1].phase); 
                    } 
                    if(i === 1) {
                        //Phases_etudiees de syllabe
                        if(JSON.parse(datas[i][j-1].lesson).length === 126) phases_etudiees.push(datas[i][j-1].phase);
                    } 
                    if(i === 2) {
                     //Phases_etudiees de tons
                        console.log("Phases_etudiees pour les tons sont à calculer");
                        // if(JSON.parse(datas[i][j-1].lesson).length === 126) {
                        //     phases_etudiees.push(datas[i][j-1].phase); 
                        // }
                    } 
                    
                    let  nivo = parseInt(datas[i][j-1].niveau);
                    let  phase_note = parseInt(datas[i][j-1].note);
                    
                    if(nivo === 1) note_1 += phase_note;
                    if(nivo === 2) note_2 += phase_note;
                    if(nivo === 3) note_3 += phase_note;
                    if(nivo === 4) note_4 += phase_note;
            	}}

             //Calcul de phases distinctes globale            
                  
                if(datas[0] != undefined) moyenne_1 = note_1/3; //Moyenne générale pour syllabe
                if(datas[1] != undefined) moyenne_2 = note_2/4; //Moyenne générale pour syllabe
                if(datas[2] != undefined) moyenne_3 = note_3/4; //Moyenne générale pour tons
                if(datas[3] != undefined) moyenne_4 = note_4/4; //Moyenne générale pour chiffres
           	
                if(moyenne_1 >= moyenne) niveaux_etudies.push(1);   	    
                if(moyenne_2 >= moyenne) niveaux_etudies.push(2);   	    
                if(moyenne_3 >= moyenne) niveaux_etudies.push(3);   	    
                if(moyenne_4 >= moyenne) niveaux_etudies.push(4);  
   
                sessionStorage.setItem('niveaux_etudies', JSON.stringify(niveaux_etudies));
                sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees));
                sessionStorage.setItem('derniere_phase' , JSON.stringify(derniere_phase ));
                
                sessionStorage.setItem('moyenne_1', JSON.stringify(moyenne_1));
                sessionStorage.setItem('moyenne_2', JSON.stringify(moyenne_2));
                sessionStorage.setItem('moyenne_3', JSON.stringify(moyenne_3));
                sessionStorage.setItem('moyenne_4', JSON.stringify(moyenne_4));
           
                if(niveaux_etudies.length === 0) {
                	sessionStorage.setItem('niveau_max', JSON.stringify(0));
                	sessionStorage.setItem('niveau_en_cours', JSON.stringify(1));
                }
                if(niveaux_etudies.length > 0) {
                    niveau_max = Math.max(...niveaux_etudies);
                    niveau_en_cours = niveau_max + 1;
                   
                	sessionStorage.setItem('niveau_max', JSON.stringify(niveau_max));
                	sessionStorage.setItem('niveau_en_cours', JSON.stringify(niveau_en_cours));
                }
                        
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
            }
            function profileTesteMenu(){

                calculDesMatieresApprisesEtNonApprises();
                chargementDeProfileTesteMenu();
                affichageDeProfileTesteMenu();
                    
                function calculDesMatieresApprisesEtNonApprises() {
                    if(datas.length === 0) {
                        matieres_apprises = [];
                        for (let i = 0; i < liste_de_matieres.length; i++) { matieres_a_apprendre[i] = liste_de_matieres[i][1]; }
                        
                        sessionStorage.setItem('matieres_a_apprendre',JSON.stringify(matieres_a_apprendre));
                        sessionStorage.setItem('matieres_apprises',JSON.stringify(matieres_apprises));
                    }
                    if(datas.length > 0) {
                        for (let j = 0; j < datas.length; j++) {
                            if(datas[j].length == 0) 
                            { matieres_a_apprendre.push(liste_de_matieres[j][1]); }else
                            { matieres_apprises.push(liste_de_matieres[j][1]); }
                        }
                        
                        sessionStorage.setItem('matieres_apprises',JSON.stringify(matieres_apprises));
                        sessionStorage.setItem('matieres_a_apprendre',JSON.stringify(matieres_a_apprendre));
                    }
                }
                function chargementDeProfileTesteMenu() {

                    document.getElementById("liste_des_matieres_apprises").innerHTML = (matieres_apprises.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresApprisesHtml();
                    document.getElementById("liste_des_matieres_a_apprendre").innerHTML = (matieres_a_apprendre.length === 0) ? '<p class="rien">ߝߏߦߊ߲߫߹</p>' : listeDesMatieresAApprendreHtml();
    
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