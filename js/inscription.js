
mettreFocusDansInscriptionPrenom();

function mettreFocusDansInscriptionPrenom() { 
    attendre(1000,() => { document.getElementById("prenom").focus(); });
}