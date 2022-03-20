<?php
    
    header('Content-Type: application/json; charset=utf8');
    
    $id_user = $_GET['id_user'];


  /* Connections à la base de donnees*/
    $server = 'localhost';
    $dbname = 'kouroukan';
    $user = 'root';
    $pass = '';
    
    $db = new PDO("mysql:host=$server;dbname=$dbname;charset=utf8", $user, $pass);


/* Récupération des données de la database*/
    $sql = "SELECT * FROM users WHERE id = ".$id_user;
          
    $requete = $db -> prepare($sql);
    $requete -> execute();
    $user = $requete -> fetchAll(PDO::FETCH_ASSOC);
    $user = json_encode($user, JSON_PRETTY_PRINT);
            
    echo($user);


/* Récupération des données de la database*/
    $sql = "SELECT * FROM lessons WHERE id_client = ".$id_user;
          
    $requete = $db -> prepare($sql);
    $requete -> execute();
    $lesson = $requete -> fetchAll(PDO::FETCH_ASSOC);
    $lesson = json_encode($lesson, JSON_PRETTY_PRINT);
            
    echo($lesson);
    

/* Récupération des données de la database*/
    $sql = "SELECT * FROM exercices WHERE id = ".$id_user;
          
    $requete = $db -> prepare($sql);
    $requete -> execute();
    $exercice = $requete -> fetchAll(PDO::FETCH_ASSOC);
    $exercice = json_encode($exercice, JSON_PRETTY_PRINT);
            
    echo($exercice);


/* Récupération des données de la database*/
    $sql = "SELECT * FROM pratiques WHERE id = ".$id_user;
          
    $requete = $db -> prepare($sql);
    $requete -> execute();
    $pratique = $requete -> fetchAll(PDO::FETCH_ASSOC);
    $pratique = json_encode($pratique, JSON_PRETTY_PRINT);
            
    echo($pratique);


/* Récupération des données de la database*/
    $sql = "SELECT * FROM teste WHERE id = ".$id_user;
          
    $requete = $db -> prepare($sql);
    $requete -> execute();
    $teste = $requete -> fetchAll(PDO::FETCH_ASSOC);
    $teste = json_encode($teste, JSON_PRETTY_PRINT);
            
    echo($teste);
?>