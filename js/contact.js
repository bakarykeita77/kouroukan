
var contact_cover = $("#contact_cover");
var contact_formulaire = $(".contact_formulaire");

var contact_agence = $("#contact_agence");
var contact_phone  = $("#contact_phone");
var contact_email  = $("#contact_email");

var agence_formulaire = $("#agence_formulaire");
var phone_formulaire  = $("#phone_formulaire");
var email_formulaire  = $("#email_formulaire");

$('#nav ul li:nth(3)').addClass('surbrillance');
$('#nav ul li:nth(3)').siblings().removeClass('surbrillance');


contact_agence.on("click", function(){
    contact_cover.css("display", "block");
    contact_formulaire.css("display", "none");
    agence_formulaire.css("display", "block");
});

contact_phone.on("click", function(){
    contact_cover.css("display", "block");
    contact_formulaire.css("display", "none");
    phone_formulaire.css("display", "block");
});

contact_email.on("click", function(){
    contact_cover.css("display", "block");
    contact_formulaire.css("display", "none");
    email_formulaire.css("display", "block");
});