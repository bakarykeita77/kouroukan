<?php
    session_start();
    
    $id_client = isset($_SESSION['id']) ? $_SESSION['id']:'';
    $nom_table_image = isset($_POST['nom_table_image'])? $_POST['nom_table_image']:'';
    

   
    if($id_client){
        
        if($_SESSION['id']){
            
            include('connexionToDB.php');
            global $db;
            
            if(!empty($_FILES['image']['tmp_name'])){
                
             /* Extraction des images déja enregistées pour comparaison avec la nouvelle image afin d'éviter les doublons. */
                $requete = $db -> prepare("select * from $nom_table_image");
                $requete -> execute();
                $db_images = $requete -> fetchAll();
                
             /* Tableau devant contenir les noms des images du serveur. */
                $noms_des_images = [];
                for($i=0; $i<count($db_images); $i++) $noms_des_images[] = explode('.',$db_images[$i]['nom'])[0];
                
             /* Control de la présence du nom de la nouvelle image dans le tableau $noms_des_images. */
                $nom_de_nouvelle_image = explode('.',$_FILES['image']['name'])[0];
                if(in_array($nom_de_nouvelle_image, $noms_des_images)) {echo "ߖߌ߬ߦߊ߬ߓߍ ߢߌ߲߬ ߠߊߦߟߍ߬ߣߍ߲߬ ߞߘߐ ߟߋ߬"; return false;}

                
                
                $nom = $_FILES['image']['name'];
                $taille = $_FILES['image']['size'];
                $type = $_FILES['image']['type'];
                $image = file_get_contents($_FILES['image']['tmp_name']);
                
           
                $requette = $db->prepare("INSERT INTO $nom_table_image(id_client,nom,taille,type,image) VALUES(:id_client,:nom,:taille,:type,:image)");
                
                $requette->bindValue(':id_client',$id_client,PDO::PARAM_INT);
                $requette->bindValue(':nom',$nom,PDO::PARAM_STR);
                $requette->bindValue(':taille',$taille,PDO::PARAM_INT);
                $requette->bindValue(':type',$type,PDO::PARAM_STR);
                $requette->bindValue(':image',$image,PDO::PARAM_STR);
                
                $requette->execute();
            }
        }
    }else {
        header("location:connexion.php?error=no_conncted_to_change_avatar");
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>upload-images</title>
        <meta charset="UTF-8">
        <style>
            #image_preview {
                height: 60vh;
                width: auto;
                max-width: 90vw;
            }
        </style>
		<script src="http://localhost:8080/kouroukan/js/jquery-3.3.1.js"></script>
    </head>
    <body>
        <center>
<!--        
 <form method="POST" enctype="multipart/form-data">
     <input type="file" name="image" id="avatar_image"><br><br>
     <input type="submit" name="submit" id="avatar_submit" value="Envoi l'image">
 </form>
  -->       
            <h2>ߖߌ߬ߦߊ߬ߓߍ߬ ߟߊ߬ߦߟߍ߬ ߦߙߐ</h2>
            
            <form method="POST" enctype="multipart/form-data" id="upload_image_form">
                <input type="number" name="id" value="<?=  $id_client; ?>" style="display:none">
                <input type="text" name="nom_table_image" id="nom_table_image" value="" style="display:none">
                    
                <input type="file" name="image" id="image"><br><br>
                <img src="" alt="" width="200" id="image_preview"><br>
                <input type="submit" name="image_submit" id="image_submit" value="ߖߌ߬ߦߊ߬ߓߍ ߣߌ߲߬ ߠߊߦߟߍ߬">
            </form>
    
        </center>
        
        <script src="http://localhost:8080/kouroukan/js/upload-images.js"></script>
    </body>
</html>