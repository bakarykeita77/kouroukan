
let entete_html_1 = ficheDApprentissageEnteteHTML();
let corps_html_1  = ficheDApprentissageCorpsHTML();
let foot_html   = ficheDApprentissageFootHTML();

let entete_html_2 = ficheDExerciceEnteteHTML();
let corps_html_2  = ficheDExerciceCorpsHTML();
let foot_html_2   = ficheDExerciceFootHTML();

let corps_html_3  = ficheDePratiqueCorpsHTML();
let foot_html_3   = ficheDePratiqueFootHTML();

let corps_html_4  = ficheDEvaluationCorpsHTML();
let foot_html_4   = ficheDEvaluationFootHTML();


$('#fiche_1 .fiche_entete').html(entete_html_1);
$('.fiche_entete:not(#fiche_1 .fiche_entete)').html(entete_html_2);
$('.fiche_corps').html(corps_html_1);
$('.fiche_foot').html(foot_html);


function ficheDApprentissageEnteteHTML() {
    let faeh = "<div>";
    faeh += "<div>ߛߓߍߘߋ߲ ߠߎ߬</div>";
    faeh += "<div>ߘߌ߯ߟߌ ߦߙߌߞߊ</div>";
    faeh += "</div>";

    return faeh;
}
function ficheDExerciceEnteteHTML() {
    let faeh = "<div>";
    faeh += "<div>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</div>";
    faeh += "<div>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</div>";
    faeh += "</div>";

    return faeh;
}
function ficheDApprentissageCorpsHTML() {}
function ficheDExerciceCorpsHTML() {}
function ficheDApprentissageFootHTML() {
    let ffh = "<div>";
    ffh += "<div>ߓߙߍ߬ߦߊ</div>";
    ffh += "<div>߀</div>";
    ffh += "<div>";

    return ffh;
}
function ficheDExerciceFootHTML() {}
function ficheDePratiqueCorpsHTML() {}
function ficheDePratiqueFootHTML() {}
function ficheDEvaluationCorpsHTML() {}
function ficheDEvaluationFootHTML() {}