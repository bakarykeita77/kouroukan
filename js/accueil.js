
	let niveau = 0, niveau_1 = 0, niveau_2 = 0, niveau_3 = 0, niveau_4 = 0,  niveau_en_cours = 1, niveaux = [], niveaux_distincts = [], niveau_max = '';
	let matiere = [], matiere_1 = [], matiere_2 = [], matiere_3 = [], matiere_4 = [], matieres = [], matieres_etudiees = [], derniere_matiere = '';
	let phases_etudiees = [], dernieres_phases = [], dernieres_phases_distinctes = [], derniere_phase = '';
	let phase = [], phases_1 = [], phases_2 = [], phases_3 = [], phases_4 = [];

    var moyenne = 1;
    
    
    userIdentityStorage();
    dataStorage();
    

    function userIdentityStorage() {
                
        sessionStorage.setItem('id',        JSON.stringify(document.getElementById('id').innerHTML));
        sessionStorage.setItem('prenom',    JSON.stringify(document.getElementById('prenom').innerHTML));
        sessionStorage.setItem('nom',       JSON.stringify(document.getElementById('nom').innerHTML));
        sessionStorage.setItem('naissance', JSON.stringify(document.getElementById('naissance').innerHTML));
        sessionStorage.setItem('sexe',      JSON.stringify(document.getElementById('sexe').innerHTML));
        sessionStorage.setItem('adresse',   JSON.stringify(document.getElementById('adresse').innerHTML));
        sessionStorage.setItem('email',     JSON.stringify(document.getElementById('email').innerHTML));
     }
    function dataStorage() {
        let user_id = parseInt(JSON.parse(sessionStorage.getItem('id'))); 

    	fetch("http://localhost:8080//kouroukan/api/index.php?id_user="+user_id)
    	.then(response => response.json())
    	.then(matiere_collection => {
        /*-------------------------------------------------------------------------   
          matieres
        -------------------------------------------------------------------------*/   
            let matieres = [];

    	    for(var i=0; i<matiere_collection.length; i++) {
    	        if(matiere_collection[i] != 0) matieres[i] = matiere_collection[i]; 
    	    }

    	    sessionStorage.setItem('matieres',JSON.stringify(matieres));
        
            if(matieres.length === 0) {
                sessionStorage.setItem('niveau_en_cours',JSON.stringify(1));
                sessionStorage.setItem('niveau_max',JSON.stringify(0));
            }
            if(matieres.length > 0) {
            /*-------------------------------------------------------------------------   
              Niveaux et matieres
            -------------------------------------------------------------------------*/   
            	for (var i = 0; i < matieres.length; i++) {
            	for (var j = 0; j < matieres[i].length; j++) {
            	    
            	  /*-------------------------------------------------------------------------
            	   A chaque niveau il y a différentes phases.
            	   - Si la note d'une phase est supérieure à 15, elle est enregistrée par niveau; 
            	   - Si la note d'une phase est inférieure à 15, elle n'est pas enregistrée.
            	  -------------------------------------------------------------------------*/
            	    let niveau    = matieres[i][j].niveau;
            	    let date      = matieres[i][j].date;
            	    let phase_nom = matieres[i][j].phase;
            	    let lesson    = matieres[i][j].lesson;
            	    let note      = matieres[i][j].note;
            	    
            	    matiere = [niveau, date, phase_nom, lesson, note];
                 
                	if(matiere[0] == 1 && note >= moyenne) matiere_1[matiere_1.length] = matiere;
                	if(matiere[0] == 2 && note >= moyenne) matiere_2[matiere_2.length] = matiere;
                	if(matiere[0] == 3 && note >= moyenne) matiere_3[matiere_3.length] = matiere;
                	if(matiere[0] == 4 && note >= moyenne) matiere_4[matiere_4.length] = matiere;
            	}}
    
            	sessionStorage.setItem('phases_1', JSON.stringify(phases_1));  
            	sessionStorage.setItem('phases_2', JSON.stringify(phases_2));  
            	sessionStorage.setItem('phases_3', JSON.stringify(phases_3));  
            	sessionStorage.setItem('phases_4', JSON.stringify(phases_4));  
            	
            	
              /* 
               A chaque niveau, toutes les phases doivent être passées au moins une fois 
               pour qu'il soit considéré comme effectué et est enregistré dans la liste des niveaux.
              */
            	var liste_des_phases = [], liste_des_phases_1 = [], liste_des_phases_2 = [], liste_des_phases_3 = [], liste_des_phases_4 = [];
         	
            	for (var i = 0; i < matiere_1.length; i++) liste_des_phases_1.push(matiere_1[i][2]);
            	for (var i = 0; i < matiere_2.length; i++) liste_des_phases_2.push(matiere_2[i][2]);
            	for (var i = 0; i < matiere_3.length; i++) liste_des_phases_3.push(matiere_3[i][2]);
            	for (var i = 0; i < matiere_4.length; i++) liste_des_phases_4.push(matiere_4[i][2]);
            	
            	liste_des_phases = [liste_des_phases_1, liste_des_phases_2, liste_des_phases_3, liste_des_phases_4];
            	sessionStorage.setItem('liste_des_phases', JSON.stringify(liste_des_phases));
    
            	var noms_des_phases = [];
            	
            	for (var i = 0; i < liste_de_phases.length; i++) noms_des_phases.push(liste_de_phases[i][0]);
            	sessionStorage.setItem('noms_des_phases', JSON.stringify(noms_des_phases));
            	
            /*-------------------------------------------------------------------------   
              Niveaux
            -------------------------------------------------------------------------*/                	
            	if(liste_des_phases_1.indexOf(noms_des_phases[0]) != -1 && liste_des_phases_1.indexOf(noms_des_phases[1]) != -1 && liste_des_phases_1.indexOf(noms_des_phases[3]) != -1) niveau_1 = 1;
            	if(liste_des_phases_2.indexOf(noms_des_phases[0]) != -1 && liste_des_phases_2.indexOf(noms_des_phases[1]) != -1 && liste_des_phases_2.indexOf(noms_des_phases[2]) != -1 && liste_des_phases_2.indexOf(noms_des_phases[3]) != -1) niveau_2 = 2;     
            	if(liste_des_phases_3.indexOf(noms_des_phases[0]) != -1 && liste_des_phases_3.indexOf(noms_des_phases[1]) != -1 && liste_des_phases_3.indexOf(noms_des_phases[2]) != -1 && liste_des_phases_3.indexOf(noms_des_phases[3]) != -1) niveau_3 = 3;
            	if(liste_des_phases_4.indexOf(noms_des_phases[0]) != -1 && liste_des_phases_4.indexOf(noms_des_phases[1]) != -1 && liste_des_phases_4.indexOf(noms_des_phases[2]) != -1 && liste_des_phases_4.indexOf(noms_des_phases[3]) != -1) niveau_4 = 4; 
                
                if(niveau_1 != 0) niveaux.push(niveau_1);
                if(niveau_2 != 0) niveaux.push(niveau_2);
                if(niveau_3 != 0) niveaux.push(niveau_3);
                if(niveau_4 != 0) niveaux.push(niveau_4);
           
                sessionStorage.setItem('niveaux', JSON.stringify(niveaux)); 
                
            /*-------------------------------------------------------------------------   
              matieres etudiees
            -------------------------------------------------------------------------*/             
            	matieres_etudiees[niveau_1 - 1] = matiere_1;
            	matieres_etudiees[niveau_2 - 1] = matiere_2;
            	matieres_etudiees[niveau_3 - 1] = matiere_3;
            	matieres_etudiees[niveau_4 - 1] = matiere_4;        	
            
            	sessionStorage.setItem('phases_etudiees',JSON.stringify(matieres_etudiees));
         	    
            /*-------------------------------------------------------------------------   
              Derniere matiere 
            -------------------------------------------------------------------------*/         	    
                derniere_matiere = matieres[matieres.length-1];
            	sessionStorage.setItem('derniere_matiere',JSON.stringify(derniere_matiere));
    
            /*-------------------------------------------------------------------------   
              Dernieres phases 
            -------------------------------------------------------------------------*/              
                if(derniere_matiere.length > 0) {
                    for (var i = 0; i < derniere_matiere.length; i++) {
                        dernieres_phases[dernieres_phases.length] = derniere_matiere[i].phase;
                    }
                	sessionStorage.setItem('dernieres_phases',JSON.stringify(dernieres_phases));
                	sessionStorage.setItem('phases_etudiees',JSON.stringify(dernieres_phases));
                }
            /*-------------------------------------------------------------------------   
              Dernieres phases distinctes
            -------------------------------------------------------------------------*/              
                for (var i = 0; i < dernieres_phases.length; i++) {
                    if(dernieres_phases_distinctes.indexOf(dernieres_phases[i]) === -1) {
                        dernieres_phases_distinctes.push(dernieres_phases[i]);
                    }
                }
                if(dernieres_phases_distinctes.length == 4) {
                    dernieres_phases_distinctes.splice(0,4);
                    dernieres_phases_distinctes[0] = liste_de_phases[0][1];
                    
                }
            	sessionStorage.setItem('dernieres_phases_distinctes',JSON.stringify(dernieres_phases_distinctes));
            	sessionStorage.setItem('dernieres_phases_etudiees',JSON.stringify(dernieres_phases_distinctes));
            
            /*-------------------------------------------------------------------------   
              Derniere phase
            -------------------------------------------------------------------------*/              
            	let n = (liste_de_phases[dernieres_phases_distinctes.length] == undefined) ? 0 : dernieres_phases_distinctes.length;

                derniere_phase = liste_de_phases[n][0];
            	sessionStorage.setItem('derniere_phase',JSON.stringify(derniere_phase));
            	
            
            /*-------------------------------------------------------------------------   
              Niveaux distincts
            -------------------------------------------------------------------------*/         
            	for(var i = 0; i < niveaux.length; i++)  {  
            	    if(niveaux_distincts.indexOf(niveaux[i]) == -1) {
            	        niveaux_distincts.push(niveaux[i]);
            	    }
            	} 
            	sessionStorage.setItem('niveaux_distincts',JSON.stringify(niveaux_distincts)); 
            	    
            /*-------------------------------------------------------------------------   
              Niveau max et niveaux_distincts
            -------------------------------------------------------------------------*/          	
            	if(niveaux.length > 0) {
            	    niveau_max = Math.max(...niveaux);
            	    niveau_en_cours = niveau_max+1;
            	
                	sessionStorage.setItem('niveau_max',JSON.stringify(niveau_max));
                	sessionStorage.setItem('niveau_en_cours',JSON.stringify(niveau_en_cours));
            	}
                
            /*-------------------------------------------------------------------------   
              Les pratiques 
            -------------------------------------------------------------------------*/              
            	let pratiques = [];
            	
            	for (var i = 0; i < matieres.length; i++) {
            	for (var j = 0; j < matieres[i].length; j++) {
            	    if(matieres[i][j]['phase'] == "pratique") {
            	        
            	        let niveau = matieres[i][j]['niveau'];
            	        let lesson = matieres[i][j]['lesson'];
            	        let note   = matieres[i][j]['note']
            	        
            	        pratiques.push([niveau,lesson,note]);
            	    }
            	}}
            	
                sessionStorage.setItem('pratiques', JSON.stringify(pratiques));
            }
    	})
    	.catch(error => alert( error ));
     }