
    fetch("http://localhost:8080//kouroukan/api/image-syllabe.php?id=1")
    .then(response => response.text())
    .then(data => {
        
        let image_container_html = "<table>";
            for (var i = 0; i < data.length; i++) {
                
                let id = JSON.parse((data[i][0]));
                let id_client = JSON.parse((data[i][1]));
                let nom = atob(data[i][2]);
                let taille = JSON.parse(data[i][3]);
                let type = data[i][4];
                let image = atob(data[i][5]);
                
                image_container_html += "<tr>";
                    image_container_html += "<td>"+id+"</td>";
                    image_container_html += "<td>"+id_client+"</td>";
                    image_container_html += "<td>"+nom+"</td>";
                    image_container_html += "<td>"+taille+"</td>";
                    image_container_html += "<td>"+type+"</td>";
                    image_container_html += "<td>"+image+"</td>";
                image_container_html += "</tr>";
            }
        image_container_html += "</table>";
        
        document.getElementById("image_container").innerHTML = image_container_html;
       

    })
    .catch(error => alert( error ));
