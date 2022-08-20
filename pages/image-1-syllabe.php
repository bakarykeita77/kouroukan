<?php
    include('connexionToDB.php');
    global $db;

    
    /*for($i=0; $i<count($image); $i++) $images_1[] = $image[$i]['image'];

echo $images_1[1];

    function getImageMonoSyllabe() {
        global $db;
        $final_array = [];
        
        $requette = $db->prepare("select * from image1syllabe");
        $requette->execute();
        $image = $requette->fetchAll(PDO::FETCH_ASSOC);
        
        for($i=0; $i<count($image); $i++) {
            $final_array[] = [
                $image[$i]['id'], 
                $image[$i]['id_client'], 
                base64_encode($image[$i]['nom']), 
                $image[$i]['taille'], 
                $image[$i]['type'], 
                base64_encode($image[$i]['image'])
            ];
        }
        
        echo json_encode($final_array);
    }
*/
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>image</title>
</head>
<body>
    
    <div id="image_container">
        <img src="http://localhost:8080/kouroukan/api/image-syllabe.php?image_categorie=image1syllabe&id=10" width="200" height="200"  alt="">
        
        
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=16" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=19" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=26" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=27" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=28" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=29" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=30" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=31" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=32" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=35" width="200" height="200" alt="">
        <img src="http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=36" width="200" height="200" alt="">
    </div>
    
     <script src="http://localhost:8080/kouroukan/js/image-1-syllabe.js"></script>
</body>
</html>