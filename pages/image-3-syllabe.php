<?php
    include "connexionToDB.php";
    global $db;
    
    $requete = $db -> prepare("select * from image3syllabe");
    $requete -> execute();
    $images_3 = $requete -> fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>image_3</title>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
</head>
<body>
    <center>
        <h1 class="images_titre">ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߞߋ߬ߟߋ߲߬ߡߊ ߟߎ߬ ߖߌ߬ߦߊ</h1>
        <div class="images_container">
            <?php for($i=0; $i<count($images_3); $i++) { 
                $id = $images_3[$i]['id']; 
                $image_nom = explode('.', $images_3[$i]['nom'])[0];
                $image_src = "http://localhost:8080/kouroukan/pages/api-image.php?image_categorie=image3syllabe&id=$id";
                ?>
                
                <div class="image_card" id=<?= $image_nom; ?> style="display:inline-block">
                    <img src=<?= $image_src; ?> width="200" height="200"  alt="">
                </div>
            <?php } ?>
        </div>
    </center>
</body>
</html