<?php

    require("connexionToDB.php");
    global $db;
    
    $sql = "SELECT * FROM teste ORDER BY id DESC LIMIT 5";
    $requette = $db->prepare($sql);
    $requette->execute();
    $testes = $requette->fetchAll();
    
    $enregistrements = [];
    $teste_column = [];

?>

<html>
    <head>
        <title>notes</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="http://localhost:8080/kouroukan/pcss/correction.css">
    </head>
    <body>
        <h2>ߞߘߐߓߐߟߌ  ߓߙߍ߬ߦߊ߬ߥߟߊ</h2>
            
            <?php for($i=0;$i<count($testes);$i++):
                $enregistrements[count($enregistrements)] = $testes[$i];
                $teste_line = explode(';',$testes[$i]['Teste']);
            ?>
            <table class='table_notes'>
                
                <tr>
                    <th>ߝߙߍߕߍ</th>
                    <th>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</th>
                    <th>ߖߊ߬ߓߌ߬ߟߌ</th>
                    <th>ߓߙߍ߬ߦߊ</th>
                </tr>
                
                <?php 
                for($j=0;$j<count($teste_line);$j++):
                $teste_column = explode(',',$teste_line[$j]);
                ?>
                   <tr>
                   <?php for($k=0;$k<count($teste_column);$k++): ?>    
                        <td><?= $teste_column[$k] ?></td>
                   <?php endfor; ?>
                    </tr> 
                <?php endfor; ?>
            </table>
            <?php endfor; ?>
    
    </body>
</html>