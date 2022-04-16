    
    getUserIdentity();
    dataStorage();
   
  
    var resume_brut_des_etudes = '';

    function getUserIdentity() {
                
        sessionStorage.setItem('id',        document.getElementById('id').innerHTML);
        sessionStorage.setItem('prenom',    document.getElementById('prenom').innerHTML);
        sessionStorage.setItem('nom',       document.getElementById('nom').innerHTML);
        sessionStorage.setItem('naissance', document.getElementById('naissance').innerHTML);
        sessionStorage.setItem('sexe',      document.getElementById('sexe').innerHTML);
        sessionStorage.setItem('adresse',   document.getElementById('adresse').innerHTML);
        sessionStorage.setItem('email',     document.getElementById('email').innerHTML);
                
    }
    function dataStorage() {
        let user_id = parseInt(sessionStorage.getItem('id')); 

    	fetch("http://localhost:8080//kouroukan/api/index.php?id_user="+user_id)
    	.then(response => response.json())
    	.then(matiere => {
    	        
    	    let matieres = matiere;
    	    
        	let niveaux = [], niveaux_distincts = [], niveau_max = '';
        	let matieres_etudiees = [], derniere_matiere = '';
        	let phases_etudiees = [], dernieres_phases = [], derniere_phase = '';
        	let phases_1 = [], phases_2 = [], phases_3 = [], phases_4 = [];
        	
        	
    
        /*-------------------------------------------------------------------------   
          Niveaux et phases
        -------------------------------------------------------------------------*/   
        	for (var i = 0; i < matieres.length; i++) {
        	for (var j = 0; j < matieres[i].length; j++) {
        	    
        	  /*-------------------------------------------------------------------------
        	   A chaque niveau il y a différentes phases.
        	   - Si la note d'une phase est supérieure à 15, elle est enregistrée par niveau; 
        	   - Si la note d'une phase est inférieure à 15, elle n'est pas enregistrée.
        	  -------------------------------------------------------------------------*/
        	    var niveau    = matieres[i][j].niveau;
        	    var date      = matieres[i][j].date;
        	    var phase_nom = matieres[i][j].phase;
        	    var note      = matieres[i][j].note;
        	    
        	    var phase     = [niveau, date, phase_nom, note];
            

            	if(phase[0] == 1 && note >= 15) phases_1[phases_1.length] = phase;
            	if(phase[0] == 2 && note >= 15) phases_2[phases_2.length] = phase;
            	if(phase[0] == 3 && note >= 15) phases_3[phases_3.length] = phase;
            	if(phase[0] == 4 && note >= 15) phases_4[phases_4.length] = phase;
        	}}
        	
        	
        	sessionStorage.setItem('phases_1', JSON.stringify(phases_1));  
        	sessionStorage.setItem('phases_2', JSON.stringify(phases_2));  
        	sessionStorage.setItem('phases_3', JSON.stringify(phases_3));  
        	sessionStorage.setItem('phases_4', JSON.stringify(phases_4));  
        	
        	
          /* A chaque niveau, toutes les phases doivent être passées au moins une fois 
           pour qu'il soit considéré comme effectué et est enregistré dans la liste des niveaux.
          */
        	var liste_des_phases_1 = [], liste_des_phases_2 = [], liste_des_phases_3 = [], liste_des_phases_4 = [];
     	
        	for (var i = 0; i < phases_1.length; i++) liste_des_phases_1.push(phases_1[i][2]);
        	for (var i = 0; i < phases_2.length; i++) liste_des_phases_2.push(phases_2[i][2]);
        	for (var i = 0; i < phases_3.length; i++) liste_des_phases_3.push(phases_3[i][2]);
        	for (var i = 0; i < phases_4.length; i++) liste_des_phases_4.push(phases_4[i][2]);
        	
        	var noms_des_phases = [];
        	
        	for (var i = 0; i < liste_de_phases.length; i++) noms_des_phases.push(liste_de_phases[i][0]);
        	
        	if(liste_des_phases_1.indexOf(noms_des_phases[0]) != -1 && liste_des_phases_1.indexOf(noms_des_phases[1]) != -1 && liste_des_phases_1.indexOf(noms_des_phases[2]) != -1 && liste_des_phases_1.indexOf(noms_des_phases[3]) != -1) niveaux.push(1);
        	if(liste_des_phases_2.indexOf(noms_des_phases[0]) != -1 && liste_des_phases_2.indexOf(noms_des_phases[1]) != -1 && liste_des_phases_2.indexOf(noms_des_phases[2]) != -1 && liste_des_phases_2.indexOf(noms_des_phases[3]) != -1) niveaux.push(2);
        	if(liste_des_phases_3.indexOf(noms_des_phases[0]) != -1 && liste_des_phases_3.indexOf(noms_des_phases[1]) != -1 && liste_des_phases_3.indexOf(noms_des_phases[2]) != -1 && liste_des_phases_3.indexOf(noms_des_phases[3]) != -1) niveaux.push(3);
        	if(liste_des_phases_4.indexOf(noms_des_phases[0]) != -1 && liste_des_phases_4.indexOf(noms_des_phases[1]) != -1 && liste_des_phases_4.indexOf(noms_des_phases[2]) != -1 && liste_des_phases_4.indexOf(noms_des_phases[3]) != -1) niveaux.push(4); 
             
            sessionStorage.setItem('niveaux', JSON.stringify(niveaux)); 
     
        	phases_etudiees[0] = phases_1;
        	phases_etudiees[1] = phases_2;
        	phases_etudiees[2] = phases_3;
        	phases_etudiees[3] = phases_4;        	

        	sessionStorage.setItem('phases_etudiees',JSON.stringify(phases_etudiees));
     	    
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
          Niveau max
        -------------------------------------------------------------------------*/          	
        	if(niveaux != '') niveau_max = Math.max(...niveaux);
        	if(niveaux == '') niveau_max = 0;
        	sessionStorage.setItem('niveau_max',niveau_max);
        	
        /*-------------------------------------------------------------------------   
          Matières étudiées 
        -------------------------------------------------------------------------*/         	    
       	    for (var i = 0; i < niveau_max; i++) {
        	    matieres_etudiees[i] = liste_de_matieres[i][0];
        	}
      	
        	sessionStorage.setItem('matieres_etudiees',JSON.stringify(matieres_etudiees));
        	
        /*-------------------------------------------------------------------------   
          Derniere matiere 
        -------------------------------------------------------------------------*/         	    
            derniere_matiere = liste_de_matieres[matieres_etudiees.length][0];
        	sessionStorage.setItem('derniere_matiere',derniere_matiere);

        /*-------------------------------------------------------------------------   
          Dernieres phases 
        -------------------------------------------------------------------------*/              
            for (var i = 0; i < matieres[niveau_max].length; i++) {
                dernieres_phases[i] = matieres[niveau_max][i].phase;
            }
        	sessionStorage.setItem('dernieres_phases',JSON.stringify(dernieres_phases));
            
        /*-------------------------------------------------------------------------   
          Derniere phase
        -------------------------------------------------------------------------*/              
            derniere_phase = liste_de_phases[dernieres_phases.length][0];
        	sessionStorage.setItem('derniere_phase',derniere_phase);
            
    	})
    	.catch(error => alert( error ));
    }
