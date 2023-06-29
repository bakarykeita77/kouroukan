
 fetch('http://localhost:8080/kouroukan/php/api.php')
    .then(response => response.json())
    .then(clients => {
        console.log(clients);
        document.getElementById('users').innerHTML = clients;
    })
    .catch(error => alert( error ));