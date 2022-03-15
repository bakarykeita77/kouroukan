
        fetch('http://localhost:8080/kouroukan/pages/clients.php')
        .then(response => response.json())
        .then(clien => {
            console.log(clien);
           // document.getElementById('ci').innerHTML = clien[0];
            
        })
        .catch(error => alert( error ));