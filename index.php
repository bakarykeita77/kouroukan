
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
     
        <div class="page_body">
            <div id='image_d_accueil'><img src="/kouroukan/images/images-de-fond/class.jpg" width="100%"/></div>

            <div id="asides_container">
                <h1 id="site_name">ߞߙߎ߬ߞߊ߲߬ </h1>
                <p>ߌ ߣߌ߫ ߖߐ߫߹ ߌ ߣߌ߫ ߣߊ߬ߟߌ߬ ߞߙߎ߬ߞߊ߲߬ ߞߣߍ ߞߊ߲߬߸ ߞߣߍ ߡߍ߲ ߘߊߦߟߍ߬ߣߍ߲߬ ߒߞߏ ߘߋ߰ߟߌ ߞߊ߲ߡߊ߬ ߓߟߐߓߟߐ ߛߌߟߊ ߝߍ߬. ߊ߬ ߦߋ߫ ߓߍ߯ ߟߊߘߍ߬ߣߍ߲ ߛߊ߬ߥߏ ߘߐ߫.</p>
                <p>ߡߐ߰-ߐ߫-ߡߐ߬ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߒߞߏ ߘߋ߰߸ ߞߊߟߌߦߊ ߘߐ߫ ߊ߬ ߣߌ߫ ߣߐ߰ߦߊ ߘߐ߫. ߦߙߐ ߓߍ߯ ߘߐ߫ ߊ߬ ߣߌ߫ ߕߎߡߊ ߓߍ߯ ߟߊ߫߸ ߦߴߌ ߕߐ߮ ߟߋ߬ ߝߟߐ߫ ߛߓߍ߫ ߟߊ߫߸ ߏ߬ߟߋ ߞߐ߫߸ ߦ ߘߌ߫ ߛߋ߫ ߞߵߌ ߜߌ߲߬ߞߎ߲߬.</p>
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
    
    <?php
        if($_SERVER['HTTP_REFERER'] == "http://localhost:8080/kouroukan/pages/inscription.php") {
            echo "<script> affichageAsides(); notifier(); </script>";
        }
    ?>

</body>
</html>