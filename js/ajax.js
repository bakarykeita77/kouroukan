$(document).ready(function(){
  
    function ajaxGet(url,onSuccess,onError){
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200)
            { onSuccess(xhr.responseText); }else
            { onError(xhr); }
        };
        xhr.send();
    }
    ajaxGet("/kouroukan/pages/clients-data.php",   function(response){
        var ajax_clients = [];
        const clients = JSON.parse(response);
        for(var i=0;i<clients.length;i++){
            let ajax_client = [clients[i].id, clients[i].prenom, clients[i].nom, clients[i].naissance, clients[i].sexe, clients[i].adresse, clients[i].email];
            ajax_clients.push(ajax_client);
        }
        document.getElementById('client_identification_brute_container').innerHTML = ajax_clients.join(';');
    }, function(){});
    ajaxGet("/kouroukan/pages/lesson-data.php",    function(response){
        var lessons_data = JSON.parse(response);
        var lessons_brutes = [];
        
        for (var i = 0; i < lessons_data.length; i++) {
            
            var phase = liste_de_phases[0][1];
            var id = lessons_data[i].id;
            var date = lessons_data[i].date;
            var id_client = lessons_data[i].id_client;
            var niveau = lessons_data[i].niveau;
            var lesson = lessons_data[i].lesson;

 // alert( lesson );          
            var lesson_brute = [phase, date, id_client, niveau, lesson];
            lesson_brute = lesson_brute.join('/');
            
            lessons_brutes.push(lesson_brute); 
        }
     
        document.getElementById('client_lessons_bruts_container').innerHTML = lessons_brutes.join('%');
    }, function(){});
    ajaxGet("/kouroukan/pages/exercices-data.php", function(response){
        
        var exercices_data = JSON.parse(response);
        var exercices = [];
        var client_exercices_bruts_container = document.getElementById('client_exercices_bruts_container');
        
        for (var i = 0; i < exercices_data.length; i++) {
            var exercice = [];
            
            var phase     = liste_de_phases[1][1];
            var date      = exercices_data[i].date;
            var id_client = exercices_data[i].id_client;
            var niveau    = exercices_data[i].niveau;
            var exercice  = exercices_data[i].exercice;
            
            exercice = [phase, date, id_client, niveau, exercice];
            exercice = exercice.join('/');
            
            exercices.push(exercice);
        }
        
        document.getElementById('client_exercices_bruts_container').innerHTML = exercices.join('%');
    }, function(){});
    ajaxGet("/kouroukan/pages/testes-data.php",    function(response){
        
        var testes_bruts = JSON.parse(response);
        var testes_traites = traitementDeTestesBruts();

        profile_testes.innerHTML = testes_traites.join('%');
        document.getElementById('client_evaluations_brutes_container').innerHTML = testes_traites.join('%');
      
        nombre_de_teste_par_niveau = triDesTestesParNiveau();
        nombre_de_teste_par_niveau = nombre_de_teste_par_niveau.join(';');
        document.getElementById('nbr_teste').innerHTML = nombre_de_teste_par_niveau;
      
        function traitementDeTestesBruts(){
            var resultat_du_traitement = [];
            for(var i=0;i<testes_bruts.length;i++) {
          
                var phase     = liste_de_phases[2][1];
                var date      = testes_bruts[i].Date;
                var id_client = testes_bruts[i].id_client;
                var niveau    = reverseIntNko(testes_bruts[i].Niveau);
                var teste     = testes_bruts[i].Teste;
                var point     = testes_bruts[i].Point;
                
                point = point.split(',');
                point = point[0];
                var teste_traite = [];
                
                teste_traite = [phase, date, id_client, niveau, teste, point];
                resultat_du_traitement[resultat_du_traitement.length] = teste_traite.join('/');
            }
             
            resultat_du_traitement = resultat_du_traitement;
            return resultat_du_traitement;
        }
        function triDesTestesParNiveau(){
            
            var testes_par_niveau = []; 
            var testes_niveau_1 = []; 
            var testes_niveau_2 = [];
            var testes_niveau_3 = [];
            var testes_niveau_4 = [];
            
            var testes_1 = [];
            var testes_2 = [];
            var testes_3 = [];
            var testes_4 = [];
            
            testes_traites = traitementDeTestesBruts(); 
            testes_traites = testes_traites.split('%');

  
            for(var j=0;j<testes_traites.length;j++){
          
                if(testes_traites[j].split('/')[2] == 1){ nbr_teste_niveau_1++;   testes_1[testes_1.length] = [testes_traites[j].split('/')[3]+','+testes_traites[j].split('/')[4]]; }
                if(testes_traites[j].split('/')[2] == 2){ nbr_teste_niveau_2++;   testes_2[testes_2.length] = [testes_traites[j].split('/')[3]+','+testes_traites[j].split('/')[4]]; }
                if(testes_traites[j].split('/')[2] == 3){ nbr_teste_niveau_3++;   testes_3[testes_3.length] = [testes_traites[j].split('/')[3]+','+testes_traites[j].split('/')[4]]; }
                if(testes_traites[j].split('/')[2] == 4){ nbr_teste_niveau_4++;   testes_4[testes_4.length] = [testes_traites[j].split('/')[3]+','+testes_traites[j].split('/')[4]]; }
            }
            
            testes_1 = testes_1.join("/");
            testes_2 = testes_2.join("/");
            testes_3 = testes_3.join("/");
            testes_4 = testes_4.join("/");
            
            testes_niveau_1[0] = 1;    testes_niveau_1[1] = nbr_teste_niveau_1;    testes_niveau_1[2] = testes_1+'\n\n'; 
            testes_niveau_2[0] = 2;    testes_niveau_2[1] = nbr_teste_niveau_2;    testes_niveau_2[2] = testes_2+'\n\n';
            testes_niveau_3[0] = 3;    testes_niveau_3[1] = nbr_teste_niveau_3;    testes_niveau_3[2] = testes_3+'\n\n';
            testes_niveau_4[0] = 4;    testes_niveau_4[1] = nbr_teste_niveau_4;    testes_niveau_4[2] = testes_4+'\n\n';
            
            testes_niveau_1 = testes_niveau_1.join('/');    
            testes_niveau_2 = testes_niveau_2.join('/');    
            testes_niveau_3 = testes_niveau_3.join('/');    
            testes_niveau_4 = testes_niveau_4.join('/');    
            
            testes_par_niveau[0] = testes_niveau_1+'\n\n';
            testes_par_niveau[1] = testes_niveau_2+'\n\n';
            testes_par_niveau[2] = testes_niveau_3+'\n\n';
            testes_par_niveau[3] = testes_niveau_4+'\n\n';
             
            return testes_par_niveau;
        }
    
    }, function(){});



/*
    function effectuerLaRequeteAjax(){
        
        var xhr = new XMLHttpRequest();
        var methode = "GET";
        var url = "http://localhost:8080/kouroukan/pages/testes-data.php";
        var asynchronous = true;
    
        xhr.open(methode,url,asynchronous);
        xhr.onload = function(){
            var response = JSON.parse(this.responseText);
    
            global_testes = reconstitutionDesTextes();
    
            function reconstitutionDesTextes(){
                
                var id_teste, id_client, niveau_teste, date_teste;
                var recapitulatif_des_testes = [];
                var teste = [];
                var point = [];

                for(var i=0;i<response.length;i++){
                    
                    id_teste     = response[i]['id'];
                    id_client    = response[i]['id_client'];
                    date_teste   = response[i]['Date'];
                    niveau_teste = response[i]['Niveau'];
                    teste        = response[i]['Teste'].split(';');
                    point        = response[i]['Point'].split('\\');
                    
                    testes = [id_teste, id_client, date_teste, niveau_teste, teste, point];
                    testes = testes.join('/');
                  
                    recapitulatif_des_testes[recapitulatif_des_testes.length] = testes;
                }

                return recapitulatif_des_testes;             
            }
        }
        xhr.send(null);
         
    }
*/
    
});