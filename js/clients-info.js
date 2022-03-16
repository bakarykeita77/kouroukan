
        fetch('http://localhost:8080/kouroukan/pages/clients.php?cherche=users')
        .then(response => response.json())
        .then(clients => console.log(clients))
        .catch(error => console.log( error ));