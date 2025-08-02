$('document').ready(function() {
      
 // Declaration et initialisation des variables
	let niveau_en_cours = 1, niveau_max = 0;
	let derniere_phase = '';
    let phases_distinctes = [], phases_1_distinctes = [], phases_2_distinctes = [], phases_3_distinctes = [], phases_4_distinctes = [];

    let niveau_1_phases = ["alphabet_apprentissage", "alphabet_exercice", "alphabet_evaluation"];
    let niveau_2_phases = ["syllabes_apprentissage", "syllabes_exercice", "syllabes_pratique", "syllabes_evaluation"];
    let niveau_3_phases = ["tons_apprentissage", "tons_exercice", "tons_pratique", "tons_evaluation"];
    let niveau_4_phases = ["chiffres_apprentissage", "chiffres_exercice", "chiffres_pratique", "chiffres_evaluation"];

 /* 
    Initialisation de sessionStorage et de localStorage.
    Lorsequ'un navigateur change d'utilisateur (en changeant de compte), 
    les données stockées (en sessionStorage et en localStorage) sont oubliées.
 */
    let precedent_id = JSON.parse(sessionStorage.getItem('id_client'));
    let present_id = document.getElementById('id_client').innerHTML;
    if(precedent_id != present_id) { sessionStorage.clear(); localStorage.clear(); }


    userIdentityStorage(); // Storage des Identités récuperées de l'étudiant
    dataStorage();         // Récuperation et storage des data recuperés de l'étudiant
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

     // Identifiant id de l'apprenant.
        let user_id = parseInt(JSON.parse(sessionStorage.getItem('id_client'))); 
     
     // Recuperation de toutes les matières étdiées par l'apprenant par envoi de son id à api de kouroukan.
    	fetch("/kouroukan/api/index.php?id_user="+user_id)
    	.then(response => response.json())
    	.then(matiere_collection => {
         /*-------------------------------------------------------------------------   
          datas
         -------------------------------------------------------------------------*/   
            let datas = [];

    	    for(var i=0; i<matiere_collection.length; i++) { datas[i] = (matiere_collection[i].length === 0)  ? [] : matiere_collection[i]; }
    	    sessionStorage.setItem('datas',JSON.stringify(datas));

console.log("Les données des leçons étudiées par l'apprenant");
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
                var niveaux_etudies = [], phases_etudiees = [];
                var note_1 = 0, note_2 = 0, note_3 = 0, note_4 = 0;
                var moyenne = 1, moyenne_1 = 0, moyenne_2 = 0, moyenne_3 = 0, moyenne_4 = 0;
       
                if(datas[1][0] == undefined) {
                    sessionStorage.setItem("id_apprentissage", JSON.stringify("syllabe_apprentissage"));
                    sessionStorage.setItem("id_exercice", JSON.stringify("syllabe_exercice"));
                } 
                if(datas[1][0] != undefined) {
                    sessionStorage.setItem("id_apprentissage", JSON.stringify(datas[1][0].id));
                    sessionStorage.setItem("id_exercice", JSON.stringify(datas[1][1].id));
                }      
          
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

             //Calcul de phases distinctes
                for(let i=0; i<phases_etudiees.length; i++) {
                    if($.inArray(niveau_1_phases[i],phases_etudiees) != -1 && $.inArray(niveau_1_phases[i],phases_1_distinctes) == -1) phases_1_distinctes.push(niveau_1_phases[i]);
                    if($.inArray(niveau_2_phases[i],phases_etudiees) != -1 && $.inArray(niveau_2_phases[i],phases_2_distinctes) == -1) phases_2_distinctes.push(niveau_2_phases[i]);
                    if($.inArray(niveau_3_phases[i],phases_etudiees) != -1 && $.inArray(niveau_3_phases[i],phases_3_distinctes) == -1) phases_3_distinctes.push(niveau_3_phases[i]);
                    if($.inArray(niveau_4_phases[i],phases_etudiees) != -1 && $.inArray(niveau_4_phases[i],phases_4_distinctes) == -1) phases_4_distinctes.push(niveau_4_phases[i]);               
                }

             //Calcul de phases distinctes globale            
                phases_distinctes = phases_1_distinctes.concat(phases_2_distinctes, phases_3_distinctes, phases_4_distinctes);
                derniere_phase = phases_distinctes[phases_distinctes.length-1];
               
                sessionStorage.setItem('phases_distinctes'  , JSON.stringify(phases_distinctes));
                sessionStorage.setItem('phases_1_distinctes', JSON.stringify(phases_1_distinctes));
                sessionStorage.setItem('phases_2_distinctes', JSON.stringify(phases_2_distinctes));
                sessionStorage.setItem('phases_3_distinctes', JSON.stringify(phases_3_distinctes));
                sessionStorage.setItem('phases_4_distinctes', JSON.stringify(phases_4_distinctes));
    
                if(datas[0] != undefined && phases_1_distinctes.length === 3) moyenne_1 = note_1/3; //Moyenne générale pour apprentissage
                if(datas[1] != undefined && phases_2_distinctes.length === 4) moyenne_2 = note_2/4; //Moyenne générale pour syllabe
                if(datas[2] != undefined && phases_3_distinctes.length === 4) moyenne_3 = note_3/4; //Moyenne générale pour tons
                if(datas[3] != undefined && phases_4_distinctes.length === 4) moyenne_4 = note_4/4; //Moyenne générale pour chiffres
           	
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
    	})
    	.catch(error => console.log( error ));
    }
    function afficherLogo() { $('#logo').css('display', 'block'); }
});