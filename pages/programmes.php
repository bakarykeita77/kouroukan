<?php
session_start();


if(isset($_SESSION['id'])){
    if(!file_exists($_SERVER['DOCUMENT_ROOT']."/images_kouroukan")) {

        echo "<script> alert('Un dossier sera crée sur votre disc dur');</script>";
     
     //Creation du dossier et sous-dossiers d'images
        chdir($_SERVER['DOCUMENT_ROOT']);
        mkdir("images_kouroukan");
        chdir("images_kouroukan");
        mkdir("image-1-syllabe");
        mkdir("image-2-syllabe");
        mkdir("image-3-syllabe");
        mkdir("image-4-syllabe"); 

     //Extraction des images du serveur
        include("connexionToDB.php");
        global $db;

        $requette = $db->prepare("SELECT * FROM image1syllabe");
        $requette->execute();
        $images = $requette->fetchAll();

     //Chargement des sous-dossiers d'images
        $dossier = "/image/image-1-syllabe";
        $nom = $images[0]["nom"];

        $dossier = $dossier.$nom;
    }

?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>programmes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
        <link rel="stylesheet" href="/kouroukan/css/class.css"/>
        <link rel="stylesheet" href="/kouroukan/css/tete-de-page.css"/>
    	<link rel="stylesheet" href="/kouroukan/css/programmes.css"/>
    </head>
    <body>
      
        <div class="container">
            <div class="page_head"><?php require('tete-de-page.php'); ?></div>
            <div class="page_body">
                <div id="programmes_container">
                    <h1>ߒߞߏ ߘߋ߰ߟߌ ߢߍߥߟߊ </h1>
                    <div id="programme_div"></div>
                </div>
            </div>
            <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
        </div>
        
        <script src = "/kouroukan/js/programmes.js"></script>
        
    </body>
    </html>
<?php
}else{
    header("location:index.php");
}
?>