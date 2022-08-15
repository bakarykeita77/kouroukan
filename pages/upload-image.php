<?php
    session_start();
    
    $id_client = isset($_SESSION['id'])? $_SESSION['id']:'';
    if($id_client != ''){
        if(empty($_FILES['image']['tmp_name'])) echo('Selectionner une image');
    }else{
        header("location:connexion.php?error=no_conncted_to_change_avatar");
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
        <form method="POST" action="http://localhost:8080/kouroukan/pages/actions.php" enctype="multipart/form-data">
            <input type="number" name="id" value="<?=  $id_client; ?>" style="display:none"><br>
            <input type="file" name="image" id="image"><br><br>
            <input type="submit" name="image_submit" id="image_submit" value="ߖߌ߬ߦߊ߬ߓߍ ߟߊߦߟߍ߬">
        </form>
        </div>
        
        <script src="http://localhost:8080/kouroukan/js/upload-image.js"></script>
    </body>
</html>