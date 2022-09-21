<?php
    include "connexionToDB.php";
    global $db;
    
    $requete = $db -> prepare("select * from image2syllabe");
    $requete -> execute();
    $images_2 = $requete -> fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>image_2</title>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
	<style>
	    .image_card img {object-fit:contain;}
	</style>
</head>
<body>
    <center>
        <h1 class="images_titre">ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߝߌ߬ߟߊ߬ߡߊ ߟߎ߬ ߖߌ߬ߦߊ</h1>
        <div class="images_container">
            <?php for($i=0; $i<count($images_2); $i++) { 
                $id = $images_2[$i]['id']; 
                $image_nom = explode('.', $images_2[$i]['nom'])[0];
                $image_src = "http://localhost:8080/kouroukan/pages/api-image.php?image_categorie=image2syllabe&id=$id";
                ?>
                
                <div class="image_card" id=<?= $image_nom; ?> style="display:inline-block">
                    <img src=<?= $image_src; ?> width="200" height="200"  alt="">
                </div>
            <?php } ?>
        </div>
    </center>
</body>
</html