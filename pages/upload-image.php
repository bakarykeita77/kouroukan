<?php
    session_start();
    
    $id_client = isset($_SESSION['id'])? $_SESSION['id']:'';
    if($id_client == '') header("location:connexion.php?error=no_conncted_to_change_avatar");
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
            
            <h2 id="upload_image_guide">ߖߌ߬ߦߊ߬  ߟߊ߬ߦߟߍ ߦߙߐ</h2>
            
            <form method="POST" action="http://localhost:8080/kouroukan/pages/actions.php" enctype="multipart/form-data" id="upload_image_form">
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