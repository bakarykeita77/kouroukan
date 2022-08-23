<?php
    include "connexionToDB.php";
    global $db;
    
    $requete = $db -> prepare("select * from image4syllabe");
    $requete -> execute();
    $images_4 = $requete -> fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>image_4</title>
</head>
<body>
<center>
    <h1>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߣߊ߰ߣߌߊ߲ߡߊ ߟߎ߬ ߖߌ߬ߦߊ</h1>
    <div id="image_4_container">
        <?php for($i=0; $i<count($images_4); $i++) { 
        $id = $images_4[$i]['id']; ?>
        
        <img src="http://localhost:8080/kouroukan/pages/api-image.php?image_categorie=image4syllabe&id=<?= $id; ?>" width="200" height="200"  alt="">
       
        <?php } ?>
    </div>
</center>
<!--      <script src="http://localhost:8080/kouroukan/js/image-1-syllabe.js"></script>
 --></body>
</html>