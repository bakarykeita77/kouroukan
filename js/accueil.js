    
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
    	    
        	let niveaux = [];
        	let niveaux_distincts = [];
        	let niveau_max = '';
        	let matieres_etudiees = [];
        	let phases_etudiees = [];
    
        /*-------------------------------------------------------------------------   
          Niveaux 
        -------------------------------------------------------------------------*/   
        	for (var i = 0; i < matieres.length; i++) {
        	for (var j = 0; j < matieres[i].length; j++) {
        	    niveaux[niveaux.length] = parseInt(matieres[i][j].niveau);
        	}}
        	sessionStorage.setItem('niveaux',niveaux);
        	    
        /*-------------------------------------------------------------------------   
          Niveaux distincts
        -------------------------------------------------------------------------*/         
        	for(var i = 0; i < niveaux.length; i++)  {  
        	    if(niveaux_distincts.indexOf(niveaux[i]) == -1) {
        	        niveaux_distincts.push(niveaux[i]);
        	    }
        	} 
        	sessionStorage.setItem('niveaux_distincts',niveaux_distincts); 
        	    
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
        	    matieres_etudiees[i] = liste_de_matieres[i][1];
        	}
        	sessionStorage.setItem('matieres_etudiees',matieres_etudiees);

        /*-------------------------------------------------------------------------   
          Phases étudiées 
        -------------------------------------------------------------------------*/              
            if(niveau_max > 0) {
                for (var i = 0; i < matieres[niveau_max-1].length; i++) {
                    phases_etudiees[i] = matieres[niveau_max-1][i].phase;
                }
        	    sessionStorage.setItem('phases_etudiees',phases_etudiees);
            }
            
            if(niveau_max === 0) {
                phases_etudiees[0] = '';
        	    sessionStorage.setItem('phases_etudiees',phases_etudiees);
            }
    	    
    	})
    	.catch(error => alert( error ));
    }
