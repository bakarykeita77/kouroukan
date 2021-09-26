<?php
    
    require_once('actions.php');

    $clients = getAllClients();
?>

<html>
    <head>
        <title>clients_list</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/clients.css">
    </head>
    <body>
        <h1>Gestion des Clients</h1>
        <table id='clients_table' cellpadding='5'>
            <tr>
                <th>ߕߐ߮</th>
                <th>ߖߊ߬ߡߎ߲</th>
                <th>ߡߐߦߌߕߎߡߊ</th>
                <th>ߖߊ߲߭</th>
                <th>ߛߌ߰ߦߙߐ</th>
                <th>ߛߊ߲߬ߓߊ߬ߕߐ߮</th>
                <th>ߜߎ߲߬ߘߎ߬ߕߐ߮ </th>
            </tr>
            
            <?php foreach($clients as $client):?>
                <tr>
                    <td><?= $client['prenom'] ?></td>
                    <td><?= $client['nom'] ?></td>
                    <td><?= $client['naissance'] ?></td>
                    <td><?= $client['sexe'] ?></td>
                    <td><?= $client['adresse'] ?></td>
                    <td><?= $client['email'] ?></td>
                    <td><?= $client['password'] ?></td>
                    
                    <td class='crud_btn delete_btn'><a href="actions.php?get_action=delete_client&id=<?= $client['id'] ?>">ߊ߬ ߖߐ߬ߛߌ߬</a></td>
                    <td class='crud_btn update_btn'><a href="update-client.php?get_action=update_client&id=<?= $client['id'] ?>">ߊ߬ ߝߊ߬ߟߋ߲߬ </a></td>
                </tr>
            <?php endforeach ?>
        
        </table> 
    </body>
</html>