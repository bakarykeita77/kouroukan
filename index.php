
<!DOCTYPE html>
<html>

<head>
 	<title>ߞߙߎ߬ߞߊ߲߬</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
  	<link rel="stylesheet" href="css/index.css"/>
</head>

<body>
    <div class="container" id="index_container">
        
        <div class="page_head"><?php require('pages/tete-de-page.php'); ?></div>
     
        <div class="page_body" id="accueil_body">

            <div id="index_haut_de_page">
                <div id="site_name">
                    <h1>ߞߙߎ߬ߞߊ߲߬:</h1>
                    <h3>ߒߞߏ ߛߓߍߛߎ߲߫ ߞߊ߲ߡߊߛߙߋߡߊ ߘߋ߰ߟߌ ߦߙߐ ߓߟߐߟߐ ߞߊ߲߬</h3>
                </div>
                <!-- <div id='image_d_accueil'> <img src="/kouroukan/images/images-de-fond/tablet1.jpg"/> </div> -->
            </div>

            <div id="asides_container">
                <p>
                    ߌ ߣߌ߫ ߖߐ߫߹ ߌ ߣߌ߫ ߣߊ߬ߟߌ߬ <b>ߞߙߎ߬ߞߊ߲߬</b> ߞߣߍ ߞߊ߲߬߸ ߡߍ߲ ߘߊߦߟߍ߬ߣߍ߲߬ ߒߞߏ ߛߓߍߛߎ߲߫ ߞߊ߲ߡߊߛߙߋߡߊ ߘߋ߰ߟߌ ߞߊ߲ߡߊ߬ ߓߟߐߓߟߐ ߛߌߟߊ ߝߍ߬߸ ߞߊ߬ ߒߞߏ ߘߋ߰߸ ߞߊߟߌߦߊ ߘߐ߫ ߊ߬ ߣߌ߫ ߣߐ߰ߦߊ ߘߐ߫߸ ߦߙߐ ߓߍ߯ ߘߐ߫ ߊ߬ ߣߌ߫ ߕߎߡߊ ߓߍ߯ ߟߊ߫.
                </p>
                <p>ߊ߬ ߦߋ߫ ߓߍ߯ ߟߊߘߍ߬ߣߍ߲ ߛߊ߬ߥߏ߬ ߘߐ߫. ߏ߬ ߘߐ߬߸ ߡߐ߰-ߐ߫-ߡߐ߬ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߒߞߏ ߘߋ߰߸ ߦߴߌ ߕߐ߮ ߟߋ߬ ߝߟߐ߫ ߛߓߍ߫ ߟߊ߫. ߕߐ߯ ߛߓߍ߫ ߞߘߎ ߝߟߍ߫ ߘߎ߱ߡߊ߬ ߡߊ߬ߙߊ߲߬ ߓߟߏ ߝߍ߬߸ ߣߴߌ ߕߐ߮ ߛߓߍߣߍ߲߫ ߞߘߐ ߟߋ߬߸ ߌ ߘߌ߫ ߛߋ߫ ߞߵߌ ߜߌ߲߬ߞߎ߲߬. ߜߊ߲߬ߞߎ߲߬ߠߌ߬ ߞߘߎ ߝߟߍ߫ ߘߎ߱ߡߊ߬ ߞߌߣߌ߲߫ ߓߟߏ ߝߍ߬</p>
                <div id="btn_container">
                    <p class="asides_btn" id="connexion_btn"><a href="pages/connexion.php">ߌ ߜߊ߲߬ߞߎ߲߬</a></p>
                    <p class="asides_btn" id="inscription_btn"><a href="pages/inscription.php">ߌ ߕߐ߮ ߛߓߍ߫ </a></p>
                </div>
                <div class="note_container">
                    <p class="note" id="note_inscription_success"></p>
                </div>
            </div>
            
        </div>
        
        <div class="page_foot"></div> 
    </div>
    
    <script src="note-fonctions.js"></script>
    <script src="js/index.js"></script>
    
    
    <!-- <?php
        if($_SERVER['HTTP_REFERER'] == "/kouroukan/pages/inscription.php") {
            echo "<script> affichageAsides(); notifier(); </script>";
        }
    ?> -->
    

</body>
</html>