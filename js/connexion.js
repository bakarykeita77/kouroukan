
afficher($('#connexion_container'));
mettreFocusDansClientEmail();

function mettreFocusDansClientEmail() { 
    attendre(1000,() => { document.getElementById("client_email").focus(); });
}