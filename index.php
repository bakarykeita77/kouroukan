<?php
    if(!file_exists("image")) {
        mkdir("image");
    }
?>

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
    <div class="container" id="index_page">
        <div class="page_head"><?php require('pages/tete-de-page.php'); ?></div>
       
        <div class="page_body" id="index_body">
            <div id='fond_de_container'></div>
            
            <center>
            <div id="asides_container0">
                <div class="aside" id="aside01" ">ߒߞߏ ߘߋ߰ߟߌ ߦߙߐ ߓߟߐߟߐ ߞߊ߲߬</div><br/>
                <div class="aside" id="aside02">ߞߙߎ߬ߞߊ߲߬ ߞߣߍ ߦߴߊߟߎ߫ ߟߊߓߌ߬ߟߊ ߘߐ߫߸ ߞߊ߬ ߒߞߏ ߘߋ߰߸ ߞߊߟߌߦߊ ߘߐ߫ ߊ߬ ߣߌ߫ ߣߐ߰ߦߊ ߘߐ߫. ߦߙߐ ߓߍ߯ ߘߐ߫ ߊ߬ ߣߌ߫ ߕߎߡߊ ߓߍ߯ ߟߊ߫.</div><br/>
                <div class="aside" id="aside03">
                    <p id="connexion_btn"><a href="pages/connexion.php">ߌ ߜߊ߲߬ߞߎ߲߬</a></p>
                    <p id="inscription_btn"><a href="pages/inscription.php">ߌ ߕߐ߮ ߛߓߍ߫ </a></p>
                </div>
            </div>
            </center>
        </div>
        <div class="page_foot"></div>
    </div>
    <script src="js/index.js"></script>

</body>
</html>