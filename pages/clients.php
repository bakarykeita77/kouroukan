<?php
    
    require_once('actions.php');

    $clients = json_encode(getAllClients());

    echo "<pre>";
    print_r($clients);
    echo "</pre>"; 