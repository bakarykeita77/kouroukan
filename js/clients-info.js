
    let id_user = parseInt(document.getElementById('id_user').innerHTML);
    let url = `http://localhost:8080/kouroukan/api/index.php?get=${id_user}`;

   /* 
    
    fetch(url)
    .then(response => response.json()) 
    .then(client => {
        
        var id,date,prenom,nom,naissance,sexe,adresse,email;
        
        console.log(client);
        
        let user_id        = client[0].id; 
        let user_date      = client[0].date; 
        let user_prenom    = client[0].prenom; 
        let user_nom       = client[0].nom; 
        let user_naissance = client[0].naissance; 
        let user_sexe      = client[0].sexe; 
        let user_adresse   = client[0].adresse; 
        let user_email     = client[0].email; 

        sessionStorage.setItem('id',user_id);
        sessionStorage.setItem('date',user_date);
        sessionStorage.setItem('prenom',user_prenom);
        sessionStorage.setItem('nom',user_nom);
        sessionStorage.setItem('Namespace',user_naissance);
        sessionStorage.setItem('sexe',user_sexe);
        sessionStorage.setItem('adresse',user_adresse);
        sessionStorage.setItem('email',user_email);
        
    })
    .catch(error => alert( error ));