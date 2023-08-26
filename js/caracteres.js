    var alphabet_nko = [
        ["ߊ", "ߋ", "ߌ", "ߍ", "ߎ", "ߏ", "ߐ","ߓ", "ߔ", "ߕ", "ߖ", "ߗ", "ߘ", "ߙ","ߚ", "ߛ", "ߜ", "ߝ", "ߞ", "ߟ", "ߡ", "ߢ", "ߣ", "ߤ", "ߥ", "ߦ","ߒ"],
        ["A","E","I","E","OU","O","O","BA","PA","TA","DJA","TYA","DA","RA","RARA","SA","GBA","FA","KA","LA","MA","NYA","NA","HA","WA","YA","N'",""],
        ["a","","i","","ou","","","ba","pa","ta","dja","tya","da","ra","","","","","","","","","","","","","",""]
    ];
    var caracteres = [
        ["ߊ", "ߋ", "ߌ", "ߍ", "ߎ", "ߏ", "ߐ"],
        ["ߓ", "ߔ", "ߕ", "ߖ", "ߗ", "ߘ", "ߙ", "ߛ", "ߜ", "ߝ", "ߞ", "ߟ", "ߡ", "ߢ", "ߣ", "ߤ", "ߥ", "ߦ"],
        ["ߚ"],
        ["ߒ"],
        ["", "߲"],
        ["߫", "߬", "", "߭", "߯", "߰", "߮", "߱"]
     ];
    var chiffres = ['߀', '߁', '߂', '߃', '߄', '߅', '߆', '߇', '߈', '߉'];
    var chiffres_latins = ['0','1','2','3','4','5','6','7','8','9'];
    var liste_de_matieres = [
        ["alphabet",     "ߛߓߍߛߎ߲"],
        ["syllabes",     "ߜߋ߲߭"],
        ["tons",         "ߞߊ߲ߡߊߛߙߋ"],
        ["chiffres",     "ߖߊ߰ߕߋ߬ߘߋ߲"]
     ];
    var liste_de_phases = [
        ["apprentissage", "ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ"],
        ["exercice", "ߡߊ߬ߞߟߏ߬ߟߌ"],
        ["pratique", "ߓߟߏߦߊߟߌ"],
        ["evaluation", "ߞߘߐߓߐߟߌ"]
     ];
    var mois = ['ߓߌ߲ߠߊߥߎߟߋ߲','ߞߏ߲ߞߏߜߍ','ߕߙߊߓߊ','ߞߏ߲ߞߏߘߓߌ','ߘߓߊ߬ߕߊ','ߥߊ߬ߛߌߥߊ߬ߙߊ','ߞߊ߬ߙߌ߬ߝߐ','ߘߓߊ߬ߓߌߟߊ','ߕߎߟߊߝߌ߲','ߞߏ߲ߓߌߕߌ߭','ߣߍߣߍߓߊ','ߞߏߟߌ߲ߞߏߟߌ߲'];
    var jours = ['ߞߐ߬ߓߊ߬ߟߏ߲','ߞߐ߬ߟߏ߲','ߞߎߣߎ߲ߟߏ߲','ߓߌߟߏ߲','ߛߌ߬ߣߌ߲߬ߟߏ߲','ߞߍ߲ߘߍߟߏ߲','ߞߊ߯ߙߌߟߏ߲'];

    
 /* Declaration des variables */   
 var parametres_btn, parametres;
 var voyelles_checker, consonnes_checker, tedo_checker, tons_checker, nasalisation_checker;
 var checkbox_titre, check_btn_container, checkbox_parent, check_btn, checkbox_children;
 var voyelle, consonne, tedo, ton, nasalisation;
 var voyelles, consonnes, tedos, tons, nasalisations;
 var voyelles_cochees = [], consonnes_cochees = [], tedos_coches = [], tons_coches = [], nasalisations_cochees = [], caracteres_coches = [],syllabes_coches = [];
 var lettres = [], syllabes = [], syllabes_tonifies = [];
 var niveau = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
 var phase_id = JSON.parse(sessionStorage.getItem('phase_id'));
 var lesson_courante = [];

 
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/* Les variables tableaux regroupant les caracteres par types */  
 voyelles = lesVoyelles();
 consonnes = lesConsonnes();
 tedoo = leTedo();
 nasalisations = laNasalisation();
 tons = lesTons();
 
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/    

 function lesVoyelles(){
     var v = [];
     for(var i=0;i<caracteres[0].length;i++){ v[i] = caracteres[0][i]; }
     return v;
 }
 function lesConsonnes(){
     var c = [];
     for(var i=0;i<7;i++){
         c[c.length] = caracteres[1][i];
     }
     for(var j=0;j<caracteres[2].length;j++){
         c[c.length] = caracteres[2][j];
     }
     for(var k=7;k<14;k++){
         c[c.length] = caracteres[1][k];
     }
     for(var l=14;l<18;l++){
         c[c.length] = caracteres[1][l];
     }
     
     return c;
 }
 function leTedo(){
     var t = [];
     for(var i=0;i<caracteres[3].length;i++){
         t[i] = caracteres[3][i];
     }
     return t;
 }
 function laNasalisation(){
     var n = [];
     for(var i=0;i<caracteres[4].length;i++){ n[i] = caracteres[4][i]; }
     return n;
 }
 function lesTons() {
     var t = [];
     for(var i=0;i<caracteres[5].length;i++){ t[i] = caracteres[5][i]; }
     return t;
 }