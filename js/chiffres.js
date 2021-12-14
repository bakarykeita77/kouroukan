
    var n_chiffres = chiffres.length;

    function chiffresApprentissageHTML(){
                
        table = "<table class='table_parlante'>\n";
            table += "<tr>\n";
            for(var n=0;n<n_chiffres;n++){    
                table += "<td>"+chiffres[n]+"</td>\n";
            }
            table += "</tr>\n";
        table += "</table>\n";
                
        return table;
    };
    function chiffresExercicesHTML(){
                    
        table = "<table class='table_parlante'>\n";
            table += "<tr>\n";
            for(var n=0;n<n_chiffres;n++){    
                var ligne_aleatoire = Math.floor(Math.random()*10);
                table += "<td>"+chiffres[ligne_aleatoire]+"</td>\n";
            }
            table += "</tr>\n";
        table += "</table>\n";
                    
        return table;
    }
