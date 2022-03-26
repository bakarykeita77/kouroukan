<?php
    
header('Content-Type: application/json; charset=utf8');
    
$search = $_GET['search'];
$id_user = $_GET['id_user'];
$lesson = $_GET['lesson'];

    
    
/* Connections à la base de donnees*/
$server = 'localhost';
$dbname = 'kouroukan';
$user = 'root';
$pass = '';

try {
    $db = new PDO("mysql:host=$server;dbname=$dbname;charset=utf8", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    

  /* 
  -------------------------------------------------------------------------------------
   Extraction des données d'identité de l'étudiant à partir de la database
  -------------------------------------------------------------------------------------
  */   
    $sql = "SELECT date,prenom,nom,naissance,sexe,adresse,email FROM users WHERE id = :id ORDER BY prenom";
                  
    $requete = $db -> prepare($sql);
    $requete -> bindValue(':id', $id_user, PDO::PARAM_INT);
    $requete -> execute();
    $user = $requete -> fetch(PDO::FETCH_ASSOC);
        
    echo json_encode($user, JSON_PRETTY_PRINT);


  /* 
  -------------------------------------------------------------------------------------
   Extraction des leçons étudiées par l'étudiant, à partir de la database
  -------------------------------------------------------------------------------------
  */   
    $sql = "SELECT * FROM ".$lesson." WHERE id_client = :id_client ORDER BY phase";
                  
    $requete = $db -> prepare($sql);
    $requete -> bindValue(':id_client',$id_user,PDO::PARAM_INT);
    $requete -> execute();
    $lessons = $requete -> fetch(PDO::FETCH_ASSOC);
        
    echo json_encode($lessons, JSON_PRETTY_PRINT);

     

}    
catch(PDOException $e){
    echo("Echec: ".$e->getMessage());
}
