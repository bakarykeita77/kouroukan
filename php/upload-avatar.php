<?php
    session_start();
    
    $client_id = isset($_SESSION["id_client"])? $_SESSION["id_client"]:'';
    if($client_id){
        if($_SESSION["id_client"]){
            
            include('connexionToDB.php');
            global $db;
            
            if(!empty($_FILES['image']['tmp_name'])){
                
                $nom = $_FILES['image']['name'];
                $taille = $_FILES['image']['size'];
                $type = $_FILES['image']['type'];
                $image = file_get_contents($_FILES['image']['tmp_name']);
                
                $requette = $db->prepare("INSERT INTO avatar(client_id,nom,taille,type,image) VALUES(:client_id,:nom,:taille,:type,:image)");
                
                $requette->bindValue(':client_id',$client_id,PDO::PARAM_INT);
                $requette->bindValue(':nom',$nom,PDO::PARAM_STR);
                $requette->bindValue(':taille',$taille,PDO::PARAM_INT);
                $requette->bindValue(':type',$type,PDO::PARAM_STR);
                $requette->bindValue(':image',$image,PDO::PARAM_STR);
                
                $requette->execute();
            }else{
                echo('Selectionner une image');
            }
        }
    }else {
        header("location:connexion.php?error=no_conncted_to_change_avatar");
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>avatar</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <div align='center' style="position:absolute; left:50%; top:50%; transform:translateX(-50%)">
        <form method="POST" enctype="multipart/form-data">
            <input type="file" name="image" id="avatar_image"><br><br>
            <input type="submit" name="submit" id="avatar_submit" value="Envoi l'image">
        </form>
        </div>
    </body>
</html>