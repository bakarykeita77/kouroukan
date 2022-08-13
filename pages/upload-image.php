<?php
    session_start();
    
    $client_id = isset($_SESSION['id'])? $_SESSION['id']:'';
    if($client_id){
        if($_SESSION['id']){
            
            include('connexionToDB.php');
            global $db;
            
            if(!empty($_FILES['image']['tmp_name'])){
                
                $nom = $_FILES['image']['name'];
                $taille = $_FILES['image']['size'];
                $type = $_FILES['image']['type'];
                $image = file_get_contents($_FILES['image']['tmp_name']);
                

                
               /* $requette = $db->prepare("INSERT INTO avatar(client_id,nom,taille,type,image) VALUES(:client_id,:nom,:taille,:type,:image)");
                
                $requette->bindValue(':client_id',$client_id,PDO::PARAM_INT);
                $requette->bindValue(':nom',$nom,PDO::PARAM_STR);
                $requette->bindValue(':taille',$taille,PDO::PARAM_INT);
                $requette->bindValue(':type',$type,PDO::PARAM_STR);
                $requette->bindValue(':image',$image,PDO::PARAM_STR);
                
                $requette->execute();*/
            }else{
                echo('Selectionner une image');
            }
        }
    }else {
      //  header("location:connexion.php?error=no_conncted_to_change_avatar");
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>avatar</title>
        <meta charset="UTF-8">
		<script src="http://localhost:8080/kouroukan/js/jquery-3.3.1.js"></script>
    </head>
    <body>
        <div style="position:absolute; left:50%; transform:translateX(-50%)">
        <form method="POST" enctype="multipart/form-data">
            <input type="text" id="image_name" value="<?= $_FILES['image']['name']; ?>"><br>
            <input type="file" name="image" id="image"><br><br>
            <input type="submit" name="image_submit" id="image_submit" value="ߖߌ߬ߦߊ߬ߓߍ ߟߊߦߟߍ߬">
        </form>
        </div>
        
        <script src="http://localhost:8080/kouroukan/js/upload-image.js"></script>
    </body>
</html>