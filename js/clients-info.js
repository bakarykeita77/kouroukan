
    let liste_clients = "";
    
    fetch('http://localhost:8080/api/index.php?get=users')
    .then(response => response.json())
    .then(clients => {
        
        liste_clients = "<table border=1 style='direction:rtl'>";
        
        liste_clients += "<thead>";
        liste_clients += "<tr>";
            liste_clients += "<th>ߕߐ߮</th>";
            liste_clients += "<th>ߖߊ߬ߡߎ߲</th>";
            liste_clients += "<th>ߡߐߦߌ߫ ߛߊ߲</th>";
            liste_clients += "<th>ߖߊ߲߭</th>";
            liste_clients += "<th>ߖߌ߬ߦߊ߬ ߦߙߐ</th>";
            liste_clients += "<th>ߛߊ߲߬ߓߊ߬ߕߐ߮</th>";
            liste_clients += "<th>ߜߎ߲߬ߘߎ߬ߕߐ߮</th>";
        liste_clients += "</tr>";
        liste_clients += "</thead>";
        
        liste_clients += "<tbody>";
        for(client of clients) {
        liste_clients += "<tr>";
            liste_clients += `<td>${client.prenom}</td>`;
            liste_clients += `<td>${client.nom}</td>`;
            liste_clients += `<td>${client.naissance}</td>`;
            liste_clients += `<td>${client.sexe}</td>`;
            liste_clients += `<td>${client.adresse}</td>`;
            liste_clients += `<td>${client.mail}</td>`;
            liste_clients += `<td>${client.password}</td>`;
        liste_clients += "</tr>";
        }
        liste_clients += "</tbody>";
        liste_clients += "</table>";
        
        document.getElementById('users').innerHTML = liste_clients;
    })
    .catch(error => alert( error ));
    
    