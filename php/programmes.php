<?php
session_start();

$racine = $_SERVER['DOCUMENT_ROOT'];

if(isset($_SESSION['id'])) {
    // if(!file_exists($_SERVER['DOCUMENT_ROOT']."/local-images-for-kouroukan")) {

    //     echo "<script> alert('Un dossier sera crée sur votre disc dur');</script>";
        
    //  //Nous sommes au fichier programmes.
    //     $programmes = getcwd();

    //  //Selection du repertoir racine.   
    //     chdir($_SERVER['DOCUMENT_ROOT']);
        
    //  //Creation du dossier et sous-dossiers d'images à la racine.
    //     mkdir("local-images-for-kouroukan");
    //     chdir("local-images-for-kouroukan");
    //     mkdir("local-images-1-syllabe");
    //     mkdir("local-images-2-syllabe");
    //     mkdir("local-images-3-syllabe");
    //     mkdir("local-images-4-syllabe");
     
    //  //Retour au programmes.  
    //     chdir($programmes);
       
    //  //Copie des images du serveur au dossier local.
    //     $racine = $_SERVER['DOCUMENT_ROOT'];
    //     $server_images_folders = scandir("../server-images");
    //     $local_images_folders = scandir($racine."/local-images-for-kouroukan");
         
    //     for($i=2; $i<count($server_images_folders); $i++) {
    //         $source = "../server-images/".$server_images_folders[$i];
    //         $destination = $racine."/local-images-for-kouroukan/".$local_images_folders[$i];
             
    //         $server_images = scandir($source);
    //         $local_images = scandir($destination);
             
    //         for($j=2; $j<count($server_images); $j++) {
                 
    //             $srcfile = $source."/".$server_images[$j];
    //             $destfile = $destination."/".$local_images[$j].$server_images[$j];
                 
    //             copy($srcfile,$destfile); 
    //         }
    //     } 
    // }
?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>programmes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    	<link rel="stylesheet" href="/kouroukan/css/programmes.css"/>
        
        <script src = "/kouroukan/js/caracteres.js"></script>
    </head>
    <body>
      
        <div class="container" id="programmes_fond">
            <div class="page_head"><?php require('tete-de-page.php'); ?></div>
            <div class="page_body">
                <div id="programmes_container">
                    <h1>ߒߞߏ ߘߋ߰ߟߌ ߢߍߥߟߊ </h1>
                    <!-- <div id="programme_div"></div> -->

                    <div id="programme_body">
                        <hr>
                        <div id="programme_commentaire">
                            <p>ߊ߲ ߞߊ߬ ߒߞߏ ߛߓߍߛߎ߲߫ ߞߊ߲ߡߊߛߙߋߡߊ ߘߋ߰ߟߌ ߕߟߊ߫ ߦߌߟߡߊ߫ ߛߊ߬ߓߊ߫ ߟߋ߬ ߘߌ߫ ߕߊ߲߬ߘߐ</p>
                            <p>
                                ߁߭) - <b>ߛߓߍߛߎ߲</b> ߏ߬ ߦߋ߫ ߒߞߏ ߛߓߍߛߎ߲߫ ߞߊ߲ߡߊߛߙߋߡߊ ߛߓߍߘߋ߲߫ ߂߇ ߟߋ߬ ߘߌ߫<br/>
                                ߂߲) - <b>ߜߋ߲</b> ߠߎ߬߸ ߏ߬ ߟߎ߬ ߦߋ߫ ߛߌ߬ߙߊ߬ߕߊ߬ ߞߋߟߋ߲ ߣߌ߫ ߛߌ߬ߙߊ߬ߟߊ߲߬ ߞߋߟߋ߲ ߠߌߘߍ߰ߣߍ߲ ߠߋ߬ ߘߌ߫ ߞߵߊ߬ߟߎ߬ ߝߐ߫ ߘߝߊߢߊ߫ ߞߋߟߋ߲߫.<br/>
                                ߃߲) - <b>ߞߊ߲ߡߊߛߙߋ</b>߸ ߏ߬ ߦߋ߫ ߕߐ߰ߡߊ߬ߛߙߋ ߟߎ߬ ߟߋ߬ ߘߌ߫ ߡߍ߲ ߠߎ߬ ߦߋ߫ ߓߌ߬ߟߊ߬ ߟߊ߫ ߛߌ߬ߙߊ߬ߟߊ߲ ߠߎ߬ ߟߊ߫ ߞߵߌ߬ߟߎ߬ ߝߐߢߊ ߓߐ߫ ߢߐ߲߮ ߡߊ߬.<br/>
                                ߄߲) - <b>ߖߊ߰ߕߋ߬ߘߋ߲</b> ߠߎ߬߸ ߏ߬ ߟߎ߬ ߦߋ߫ ߛߓߍߘߋ߲߫ ߠߎ߫ ߟߋ߬ ߘߌ߫ ߡߍ߲ ߠߎ߫ ߦߋ߫ ߦߙߌߞߊ ߟߎ߬ ߦߌ߬ߘߊ߬ ߟߊ߫.
                            </p>
                            <p>
                                ߥߟߊ߬ߘߊ ߘߊߞߎ߲ ߖߊ߰ߕߋ߬ߡߌߘߊ ߦߋ߫ ߞߍ߫ ߟߊ߫ ߞߙߎ߬ߞߊ߲߫ ߠߋ߬ ߓߟߏ߫ ߞߵߊ߬ ߓߍ߲߬ ߘߋ߰ߘߋ߲ ߠߊ߫ ߟߐ߲ߠߌ ߞߛߊߞߊ ߡߊ߬. ߞߐ߬ߟߐ߫ ߛߊ߬ߓߊ߫ ߟߋ߬ ߟߥߊߟߌ߫ ߘߴߊ߲ ߓߟߏ߫ ߞߊ߬ ߥߟߊ߬ߘߊ ߟߎ߬ ߘߋ߰ߟߌ ߗߏ߯ߦߊ ߟߎ߬ ߝߊߘߊ߲ߝߊ߯ߛߌ߫ ߕߊ߲߬.<br/> 
                                <span class="fond_blanc">ߜߍߡߊ߲</span> ߸ ߏ߬ ߦߋ߫ ߥߟߊ߬ߘߊ߫ ߘߋ߲߰ߣߍ߲ ߥߟߊ ߥߟߊ߬ߘߊ߫ ߘߐ߲߰ߣߍ߲ ߠߎ߬ ߟߋ߬ ߦߌ߬ߘߊ߬ ߟߊ߫߸ <br/> 
                                <span class="fond_jaune">ߣߘߍ߬ߡߊ</span> ߸ ߏ߬ ߦߋ߫ ߥߟߊ߬ߘߊ ߘߊߞߎ߲ ߠߋ߬ ߦߌ߬ߘߊ߬ ߟߊ߫߸ <br/> 
                                <span class="fond_noir_clair">ߢߟߊߝߌ߲</span> ߸ ߏ߬ ߦߋ߫ ߥߟߊ߬ߘߊ߫ ߘߋ߲߰ߕߊ ߥߟߊ ߥߟߊ߬ߘߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߟߋ߬ ߦߌ߬ߘߊ߬ ߟߊ߫.
                            </p>
                        </div>
                        <hr>
                        <div id="programme_matieres"></div>
                    </div>

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