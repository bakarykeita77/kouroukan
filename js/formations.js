
    var liste_de_matieres = [
        ["alphabet", "ߛߓߍߛߎ߲"],
        ["syllabes", "ߜߋ߲߭"],
        ["nasalisation", "ߞߊ߲ߠߊߘߌߦߊߟߊ߲"],
        ["tons", "ߞߊ߲ߡߊߛߙߋ"],
        ["chiffres", "ߖߊ߰ߕߋ߬ߘߋ߲"]
     ];
    var liste_de_phases = [
        ["apprentissage", "ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ"],
        ["exercices", "ߡߊ߬ߞߟߏ߬ߟߌ"],
        ["evaluation", "ߞߘߐߓߐߟߌ"]
     ];
    var caracteres = [
        ["ߊ", "ߋ", "ߌ", "ߍ", "ߎ", "ߏ", "ߐ"],
        ["ߓ", "ߔ", "ߕ", "ߖ", "ߗ", "ߘ", "ߙ", "ߛ", "ߜ", "ߝ", "ߞ", "ߟ", "ߡ", "ߢ", "ߣ", "ߤ", "ߥ", "ߦ", ""],
        ["ߚ"],
        ["ߒ"],
        ["", "߲"],
        ["߫", "߬", "", "߭"],
        ["߯", "߰", "߮", "߱"]
     ];
    var chiffres = ['߀', '߁', '߂', '߃', '߄', '߅', '߆', '߇', '߈', '߉'];
    
    var body = document.body;
    var table_de_matieres_container = document.getElementById('table_de_matieres_container');
    
    var li_nbr = liste_de_matieres.length;
    
    var table_de_matieres_table = '<ul>\n';
        for(i=0;i<li_nbr;i++){
            table_de_matieres_table += '<li><a href="'+liste_de_matieres[i][0]+'.php">'+liste_de_matieres[i][1]+'</a></li>\n';
        }
        table_de_matieres_table += '</ul>';
        table_de_matieres_container.innerHTML = table_de_matieres_table;