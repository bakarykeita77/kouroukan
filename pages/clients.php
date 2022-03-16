<?php
    
    require_once('actions.php');

    if(isset($_GET['cherche'])) {

        switch($_GET['cherche']) {
            case 'users':
                // code...
                $clients = getAllClients();
                echo("<pre>");
                print_r($clients);
                echo("</pre>");
                break;
            default: echo("Cet expression de recherche n'existe pas" );
        }
    }
    
