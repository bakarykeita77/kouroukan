<?php
    include "connexionToDB.php";
    global $db;
    
    $requete = $db -> prepare("select * from image1syllabe");
    $requete -> execute();
    $images_1 = $requete -> fetchAll();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>image_1</title>
</head>
<body>
<center>
    <h1>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߞߋ߬ߟߋ߲߬ߡߊ ߟߎ߬ ߖߌ߬ߦߊ</h1>
    <div id="image_container">
        <?php for($i=0; $i<count($images_1); $i++) { 
        $id = $images_1[$i]['id']; ?>
        
        <img src="http://localhost:8080/kouroukan/pages/api-image.php?image_categorie=image1syllabe&id=<?= $id; ?>" width="200" height="200"  alt="">
       
        <?php } ?>
    </div>
</center>
<!--      <script src="http://localhost:8080/kouroukan/js/image-1-syllabe.js"></script>
 --></body>
</html>