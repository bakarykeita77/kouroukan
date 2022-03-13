

doument.getElementById('form_test').addEventListener('submit', e => {
    
    e.preventDefault();
    let pratique = document.getElementById('pratique').value;
    

    fetch('test.php', {
        method:'POST',
        body:pratique
    })
    .then((response) => response.text())
    .then(donnee => alert(donnee));
    
});
  