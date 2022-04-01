<?php
        
    header('Content-Type: application/json; charset=utf8');
        
    $id_user = isset($_GET['id_user']) ? $_GET['id_user']:'';
    $matiere = isset($_GET['matiere']) ? $_GET['matiere']:'';
    $niveau  = isset($_GET['niveau'])  ? $_GET['niveau'] :'';
    $phase   = isset($_GET['phase'])   ? $_GET['phase']  :'';
    $lesson  = isset($_GET['lesson'])  ? $_GET['lesson'] :'';
    $note    = isset($_GET['note'])    ? $_GET['note']   :'';
        
        
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
      Extraction des leçons étudiées par l'étudiant, à partir de la database
     -------------------------------------------------------------------------------------
     */   
        $matieres = ["alphabet","syllabes","tons","chiffres"];
     
     
     /*------------------------------------------------------------------------------------- 
     Toutes les matieres 
     -------------------------------------------------------------------------------------*/
        if($id_user == '' && $matiere == '' && $phase == '') {
            
            for($i=0;$i<count($matieres);$i++) { 
                
                $sql = "SELECT * FROM ".$matieres[$i];
                              
                $requete = $db -> prepare($sql);
                $requete -> execute();
                $resultat = $requete -> fetchAll(PDO::FETCH_ASSOC);
    
                $final_array[] = $resultat;
            }
            
            echo json_encode($final_array, JSON_PRETTY_PRINT);
        }
        
     
     /*-------------------------------------------------------------------------------------  
     Toutes les matieres pour un client 
     -------------------------------------------------------------------------------------*/
        if($id_user != '' && $matiere == '' && $phase == '') {

            for($i=0;$i<count($matieres);$i++) {   
                
                $sql = "SELECT * FROM ".$matieres[$i]." WHERE id_client = :id_client ORDER BY id_client";
                              
                $requete = $db -> prepare($sql);
                $requete -> bindValue(':id_client',$id_user,PDO::PARAM_INT);
                $requete -> execute();
                $resultat = $requete -> fetchAll(PDO::FETCH_ASSOC);
                
                $final_array[] = $resultat;
            }
            
            echo json_encode($final_array, JSON_PRETTY_PRINT);
        }
        

     /*-------------------------------------------------------------------------------------  
     Toute une matiere 
     -------------------------------------------------------------------------------------*/
        if($id_user == '' && $matiere != '' && $phase == '') {
        
            $sql = "SELECT * FROM ".$matiere;
                          
            $requete = $db -> prepare($sql);
            $requete -> execute();
            $resultat = $requete -> fetchAll(PDO::FETCH_ASSOC);

            $final_array[] = $resultat;

            echo json_encode($final_array, JSON_PRETTY_PRINT);
        }
        
        
     /*-------------------------------------------------------------------------------------  
     Une matiere pour un client 
     -------------------------------------------------------------------------------------*/
        if($id_user != '' && $matiere != '' && $phase == '') {
            $sql = "SELECT * FROM ".$matiere." WHERE id_client = :id_client ORDER BY phase";
                          
            $requete = $db -> prepare($sql);
            $requete -> bindValue(':id_client',$id_user,PDO::PARAM_INT);
            $requete -> execute();
            $resultat = $requete -> fetchAll(PDO::FETCH_ASSOC);
            
            
            
         /*-------------------------------------------------------------------------------------
          Les donnees sont extraites et placées dans la variable $resultat.
          Maintenant classons les composants de $resultat dans un tableau $final_array pour être envoyé à la demande.
         -------------------------------------------------------------------------------------*/
            
            $final_array[] = $resultat;

            echo json_encode($final_array, JSON_PRETTY_PRINT);
        }
          
                      
     /*-------------------------------------------------------------------------------------  
     Une phase pour toutes les matieres 
     -------------------------------------------------------------------------------------*/
        if($id_user == '' && $matiere == '' && $phase != '') {
            
            for($i=0;$i<count($matieres);$i++) {   
                
                $sql = "SELECT * FROM ".$matieres[$i]." WHERE phase = :phase ORDER BY niveau";
                              
                $requete = $db -> prepare($sql);
                $requete -> bindValue(':phase',$phase,PDO::PARAM_STR);
                $requete -> execute();
                $resultat = $requete -> fetchAll(PDO::FETCH_ASSOC);
    
                $final_array[] = $resultat;
            }
            
            echo json_encode($final_array, JSON_PRETTY_PRINT);
        }
        
             
     /*-------------------------------------------------------------------------------------  
     Une phase de toutes les matieres pour un client 
     -------------------------------------------------------------------------------------*/
        if($id_user != '' && $matiere == '' && $phase != '') {
            
            for($i=0;$i<count($matieres);$i++) {   
                
                $sql = "SELECT * FROM ".$matieres[$i]." WHERE id_client = :id_client AND phase = :phase ORDER BY niveau";
                              
                $requete = $db -> prepare($sql);
                $requete -> bindValue(':id_client',$id_user,PDO::PARAM_INT);
                $requete -> bindValue(':phase',$phase,PDO::PARAM_STR);
                $requete -> execute();
                $resultat = $requete -> fetchAll(PDO::FETCH_ASSOC);
    
                $final_array[] = $resultat;
            }
            
            echo json_encode($final_array, JSON_PRETTY_PRINT);
        }
        
             
     /*-------------------------------------------------------------------------------------  
     Une phase d'une matiere pour un client 
     -------------------------------------------------------------------------------------*/
        if($id_user != '' && $matiere != '' && $phase != '') {

            $sql = "SELECT * FROM ".$matiere." WHERE id_client = :id_client AND phase = :phase ORDER BY niveau";
                          
            $requete = $db -> prepare($sql);
            $requete -> bindValue(':id_client',$id_user,PDO::PARAM_INT);
            $requete -> bindValue(':phase',$phase,PDO::PARAM_STR);
            $requete -> execute();
            $resultat = $requete -> fetchAll(PDO::FETCH_ASSOC);

            $final_array[] = $resultat;

            echo json_encode($final_array, JSON_PRETTY_PRINT);
        }

    }    
    catch(PDOException $e){
        echo("Echec: ".$e->getMessage());
    }
