<?php
    session_start();
    
    $id_client = isset($_SESSION['id'])? $_SESSION['id']:'';
    if($id_client){
        if($_SESSION['id']){
            
            include('connexionToDB.php');
            global $db;
            
            if(!empty($_FILES['image']['tmp_name'])){
                
                $nom = $_FILES['image']['name'];
                $taille = $_FILES['image']['size'];
                $type = $_FILES['image']['type'];
                $image = file_get_contents($_FILES['image']['tmp_name']);
                
                $requette = $db->prepare("INSERT INTO image1syllabe(id_client,nom,taille,type,image) 
	            VALUES(:id_client,:nom,:taille,:type,:image)");
                
                $requette->bindValue(':id_client',$id_client,PDO::PARAM_INT);
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



<!--<?php
   /* session_start();
    
    $id_client = isset($_SESSION['id'])? $_SESSION['id']:'';
    if($id_client == '') header("location:connexion.php?error=no_conncted_to_change_avatar");*/
?> -->
<!DOCTYPE html>
<html>
    <head>
        <title>avatar</title>
        <meta charset="UTF-8">
		<script src="http://localhost:8080/kouroukan/js/jquery-3.3.1.js"></script>
    </head>
    <body>
        <div style="position:absolute; left:50%; transform:translateX(-50%)">
            
            <h2 id="upload_image_guide">ߖߌ߬ߦߊ߬  ߟߊ߬ߦߟߍ ߦߙߐ</h2>
            
            <form method="POST" action="" enctype="multipart/form-data" id="upload_image_form">
                <input type="number" name="id" value="<?=  $id_client; ?>" style="display:none">
                <input type="text" name="syllabe_categorie" id="syllabe_categorie" value="" style="display:none">
                
                <input type="file" name="image" id="image"><br><br>
                <img src="" alt="" width="200"><br>
                <input type="submit" name="image_submit" id="image_submit" value="ߖߌ߬ߦߊ߬ߓߍ ߣߌ߲߬ ߠߊߦߟߍ߬">
            </form>
        </div>
        
        <script src="http://localhost:8080/kouroukan/js/upload-image.js"></script>
    </body>
</html>