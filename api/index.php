<?php
    
header('Content-Type: application/json; charset=utf8');
    
$search = $_GET['search'];
$id_user = $_GET['id_user'];

        
    
/* Connections à la base de donnees*/
$server = 'localhost';
$dbname = 'kouroukan';
$user = 'root';
$pass = '';

try {
    $db = new PDO("mysql:host=$server;dbname=$dbname;charset=utf8", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    switch($search) {
    
     /* ------------------------------------------------------------------------------------
      Extraction des données d'identité de l'étudiant à partir de la database
     -------------------------------------------------------------------------------------*/   
        case 'user':
            $sql = "SELECT date,prenom,nom,naissance,sexe,adresse,email FROM users WHERE id = ".$id_user;
                  
            $requete = $db -> prepare($sql);
            $requete -> execute();
            $user = $requete -> fetchAll(PDO::FETCH_ASSOC);
        
            echo json_encode($user, JSON_PRETTY_PRINT);
            break;
            
 
     /* ------------------------------------------------------------------------------------
      Extraction des leçons étudiées par l'étudiant, à partir de la database
     -------------------------------------------------------------------------------------*/   
        case 'apprentissages':
            $sql = "SELECT * FROM apprentissages WHERE id_client = ".$id_user." ORDER BY niveau";
                  
            $requete = $db -> prepare($sql);
            $requete -> execute();
            $lessons = $requete -> fetchAll(PDO::FETCH_ASSOC);
        
            echo json_encode($lessons, JSON_PRETTY_PRINT);
            break;


     /* ------------------------------------------------------------------------------------
      Extraction des exercices effectuées par l'étudiant, à partir de la database
     -------------------------------------------------------------------------------------*/   
        case 'exercices':
            $sql = "SELECT * FROM exercices WHERE id = ".$id_user." ORDER BY niveau";
                  
            $requete = $db -> prepare($sql);
            $requete -> execute();
            $exercices = $requete -> fetchAll(PDO::FETCH_ASSOC);
        
            echo json_encode($exercices, JSON_PRETTY_PRINT);
            break;


     /* ------------------------------------------------------------------------------------
      Extraction des pratiques effectuées par l'étudiant, à partir de la database
     -------------------------------------------------------------------------------------*/   
        case 'pratiques':
            $sql = "SELECT * FROM pratiques WHERE id = ".$id_user." ORDER BY niveau";
                  
            $requete = $db -> prepare($sql);
            $requete -> execute();
            $pratiques = $requete -> fetchAll(PDO::FETCH_ASSOC);
        
            echo json_encode($pratiques, JSON_PRETTY_PRINT);
            break;


     /* ------------------------------------------------------------------------------------
      Extraction des testes effectués par l'étudiant, à partir de la database
     -------------------------------------------------------------------------------------*/   
        case 'testes':
            $sql = "SELECT * FROM teste WHERE id = ".$id_user." ORDER BY niveau";
                  
            $requete = $db -> prepare($sql);
            $requete -> execute();
            $testes = $requete -> fetchAll(PDO::FETCH_ASSOC);
        
            echo json_encode($testes, JSON_PRETTY_PRINT);
            break; 
        
    }
}    
catch(PDOException $e){
    echo("Echec: ".$e->getMessage());
}
