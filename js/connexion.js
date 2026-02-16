
afficher($('#connexion_container'));
mettreFocusDansClientEmail();

function mettreFocusDansClientEmail() { 
    setTimeout(() => { document.getElementById("client_email").focus(); }, 1000);
}