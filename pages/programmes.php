<?php
session_start();

$racine = $_SERVER['DOCUMENT_ROOT'];

if(isset($_SESSION['id'])) {
    if(!file_exists($_SERVER['DOCUMENT_ROOT']."/local-images-for-kouroukan")) {

        echo "<script> alert('Un dossier sera crée sur votre disc dur');</script>";
        
     //Nous sommes au fichier programmes.
        $programmes = getcwd();

     //Selection du repertoir racine.   
        chdir($_SERVER['DOCUMENT_ROOT']);
        
     //Creation du dossier et sous-dossiers d'images à la racine.
        mkdir("local-images-for-kouroukan");
        chdir("local-images-for-kouroukan");
        mkdir("local-images-1-syllabe");
        mkdir("local-images-2-syllabe");
        mkdir("local-images-3-syllabe");
        mkdir("local-images-4-syllabe");
     
     //Retour au programmes.  
        chdir($programmes);
       
     //Copie des images du serveur au dossier local.
        $racine = $_SERVER['DOCUMENT_ROOT'];
        $server_images_folders = scandir("../server-images");
        $local_images_folders = scandir($racine."/local-images-for-kouroukan");
         
        for($i=2; $i<count($server_images_folders); $i++) {
            $source = "../server-images/".$server_images_folders[$i];
            $destination = $racine."/local-images-for-kouroukan/".$local_images_folders[$i];
             
            $server_images = scandir($source);
            $local_images = scandir($destination);
             
            for($j=2; $j<count($server_images); $j++) {
                 
                $srcfile = $source."/".$server_images[$j];
                $destfile = $destination."/".$local_images[$j].$server_images[$j];
                 
                copy($srcfile,$destfile); 
            }
        } 
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
        
        <script src = "/kouroukan/js/caracteres.js"></script>
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