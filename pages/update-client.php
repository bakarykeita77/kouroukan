<?php
    
    require_once("phpFonctions.php");
    global $db;
    
    $get_action = $_GET['get_action'];
    $id = $_GET['id'];

    $client = getClient($id);
?>

<html>
    <head>
        <title>update-client</title>
        <meta charset='UTF-8'>
        <link rel="stylesheet" href="/kouroukan/css/update-client.css">
    </head>
    <body>
        <h1>Mise a jour du Client</h1>
        <form method="POST" action="actions.php" id="update_client_form">
            
            <input type="hidden" name="post_action" value="update_client">
            <input type="hidden" name="post_id" value="<?= $id ?>">
            
            <input type="text" name="prenom_updated" value="<?= $client[0]['prenom'] ?>">
            <input type="text" name="nom_updated" value="<?= $client[0]['nom'] ?>">
            <input type="text" name="naissance_updated" value="<?= $client[0]['naissance'] ?>">
            <input type="text" name="sexe_updated" value="<?= $client[0]['sexe'] ?>">
            <input type="text" name="adresse_updated" value="<?= $client[0]['adresse'] ?>">
            <input type="text" name="email_updated" value="<?= $client[0]['email'] ?>">
            <input type="text" name="password_updated" value="<?= $client[0]['password'] ?>">
            
            <button id='update_btn'>Update</button>
        </form>
    </body>
    
</html>