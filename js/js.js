var alphabetisation = document.getElementById('alphabetisation');
var corps_lecon = document.getElementsByClassName('corps_lecon');
var cadre_alphabet = document.querySelector('#cadre_alphabet');
var cadre_alphabet2 = document.querySelector('#cadre_alphabet2');
var cadre_syllabes = document.querySelector('#cadre_syllabes');
var cadre_syllabes2 = document.querySelector('#cadre_syllabes2');
var cadre_nasalisation = document.querySelector('#cadre_nasalisation');
var table = "";
var fermeture = "";

var caracteres =[
    ["ߊ","ߋ","ߌ","ߍ","ߎ","ߏ","ߐ"],
    ["ߓ","ߔ","ߕ","ߖ","ߗ","ߘ","ߙ"],
    ["ߚ","ߛ","ߜ","ߝ","ߞ","ߟ","ߡ"],
    ["ߢ","ߣ","ߤ","ߥ","ߦ","ߒ",""]
];
var slb =[
    ["ߊ","ߋ","ߌ","ߍ","ߎ","ߏ","ߐ"],
    ["ߓ","ߔ","ߕ","ߖ","ߗ","ߘ","ߙ","ߚ","ߛ","ߜ","ߝ","ߞ","ߟ","ߡ","ߢ","ߣ","ߤ","ߥ","ߦ","ߒ"],
    ["߲"],
    ["߫߫","߬","","߭"],
    ["߯","߰","߮","߱"]
];

cadre_alphabet.innerHTML = fermer()+alphabetNko();
cadre_alphabet2.innerHTML = fermer()+alphabetNko2();
cadre_syllabes.innerHTML = fermer()+syllabesNko();
cadre_syllabes2.innerHTML = fermer()+syllabesNko2();
cadre_nasalisation.innerHTML = fermer()+nasalisation();
cadre_tonifications.innerHTML = fermer()+tonifications();


function fermer(){
    fermeture = "<span class='fermer'>&times;</span>";
    return fermeture;
}

function alphabetNko() {
    table = "<table class = 'table_parlante'>\n";
    for(var i=0;i<4;i++) {
        table += "<tr>\n";
        for(var j=0;j<7;j++) {
            table += "<td>";
                table += caracteres[i][j];
            table += "</td>\n";
        }
        table += "</tr>\n";
    }
    table += "</table>";

    return table;
}
function alphabetNko2() {
    table = "<table class = 'table_parlante'>\n";
    for(var i=0;i<4;i++) {
        var ligne_aleatoire = Math.floor(Math.random()*4);
        table += "<tr>\n";
        for(var j=0;j<7;j++) {
            var colonne_aleatoire = Math.floor(Math.random()*7);
            table += "<td>";
                table += caracteres[i][colonne_aleatoire];
            table += "</td>\n";
        }
        table += "</tr>\n";
    }

    table += "</table>";

    return table;
}
function syllabesNko() {
    var syllabes_nko = "<table class = 'table_parlante' id = 'snko'>\n";
        for(var sr=0;sr<19;sr++) {
            syllabes_nko += "<tr>\n";
            for(var sc=0;sc<7;sc++) {
                syllabes_nko += "<td>";
                    syllabes_nko += [slb[1][sr]+slb[0][sc]];
                syllabes_nko += "</td>\n";
            }
            syllabes_nko += "</tr>\n";
        }
    syllabes_nko += "</table>";

    return syllabes_nko;
}
function syllabesNko2() {
    var syllabes_nko2 = "<table class = 'table_parlante' id = 'snko'>\n";
        for(var sr=0;sr<19;sr++) {
            syllabes_nko2 += "<tr>\n";
            for(var sc=0;sc<7;sc++) {
                var consonne_aleatoire = Math.floor(Math.random()*19);
                var voyelle_aleatoire = Math.floor(Math.random()*7);
                syllabes_nko2 += "<td>";
                    syllabes_nko2 += [slb[1][consonne_aleatoire]+slb[0][voyelle_aleatoire]];
                syllabes_nko2 += "</td>\n";
            }
            syllabes_nko2 += "</tr>\n";
        }
    syllabes_nko2 += "</table>";

    return syllabes_nko2;
}
function nasalisation() {
    var syllabes_nasalisees = "<table class = 'table_parlante'>\n";
        for(var sr=0;sr<19;sr++) {
            syllabes_nasalisees += "<tr>\n";
            for(var sc=0;sc<7;sc++) {
                syllabes_nasalisees += "<td>";
                    syllabes_nasalisees += [ slb[1][sr]+slb[0][sc]+slb[2] ];
                syllabes_nasalisees += "</td>\n";
            }
            syllabes_nasalisees += "</tr>\n";
        }
    syllabes_nasalisees += "</table>";

    return syllabes_nasalisees;
}

function tonifications() {
    var syllabes_tonifiees = "<table>\n";

    for(var consonne=0;consonne<19;consonne++) {
        syllabes_tonifiees += "<table class = 'table_parlante' id = 'sous_tableau_ton'>";
        for(var voyelle=0;voyelle<7;voyelle++) {
            syllabes_tonifiees += "<tr>\n";
            for(var ton=0;ton<4;ton++) {
                syllabes_tonifiees += "<td>";
                    syllabes_tonifiees += [ slb[1][consonne]+slb[0][voyelle]+slb[3][ton] ];
                syllabes_tonifiees += "</td>\n";
            }
            syllabes_tonifiees += "</tr>\n";
        }
        syllabes_tonifiees += "</table>";
    }

    for(var consonne=0;consonne<19;consonne++) {
        syllabes_tonifiees += "<table class = 'table_parlante' id = 'sous_tableau_ton'>";
        for(var voyelle=0;voyelle<7;voyelle++) {
            syllabes_tonifiees += "<tr>\n";
            for(var ton=0;ton<4;ton++) {
                syllabes_tonifiees += "<td>";
                    syllabes_tonifiees += [ slb[1][consonne]+slb[0][voyelle]+slb[4][ton] ];
                syllabes_tonifiees += "</td>\n";
            }
            syllabes_tonifiees += "</tr>\n";
        }
        syllabes_tonifiees += "</table>";
    }

    syllabes_tonifiees += "</table>";

    return syllabes_tonifiees;
}

var accordion_btn = document.getElementsByClassName('accordion_btn');
var accordion_content = document.getElementsByClassName('accordion_content');
var i;




for(i=0;i<accordion_btn.length;i++) {
    var accordion_btn_clique = accordion_btn[i];

    accordion_btn_clique.addEventListener( 'click', function() {
        var content = this.nextElementSibling;
        var accordion_btn_height = $(this).height();
        var content_height = content.scrollHeight;

     /* Ouverture et fermeture du contenu Accordion */
        if( content.style.maxHeight ) {
            content.style.maxHeight = 0;
        }else{
            content.style.maxHeight = content_height+'px';
        }

    });
}