<?php
session_start();
$racine = $_SERVER['DOCUMENT_ROOT'];
if(isset($_SESSION['id'])) {
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
                                <span class="fond_blanc">ߜߍߡߊ߲</span> ߸ ߏ߬ ߦߋ߫ ߥߟߊ߬ߘߊ߫ ߘߋ߲߰ߣߍ߲ ߠߎ߬ ߟߋ߬ ߦߌ߬ߘߊ߬ ߟߊ߫߸ <br/> 
                                <span class="fond_jaune">ߣߘߍ߬ߡߊ</span> ߸ ߏ߬ ߦߋ߫ ߥߟߊ߬ߘߊ ߘߊߞߎ߲ ߠߋ߬ ߦߌ߬ߘߊ߬ ߟߊ߫߸ <br/> 
                                <span class="fond_noir_clair">ߢߟߊߝߌ߲</span> ߸ ߏ߬ ߦߋ߫ ߥߟߊ߬ߘߊ߫ ߘߋ߲߰ߕߊ ߟߎ߬ ߟߋ߬ ߦߌ߬ߘߊ߬ ߟߊ߫.
                            </p>
                        </div>
                        <hr>

                     <!-- Ce programme est chargé dans programmes.js par la fonction chargementDuProgramme(). -->
                        <div id="programme_matieres"></div>
                              
                    </div>
                </div>
            </div>
    
         <!------------------------------------------------------------------------------------------------------------->
        
            <div id="lesson_options">
                <span class="fermeture" id="fermer_lesson_option">&times;</span>
                <div id="lesson_options_content">
                    <div id="option_titre">ߌ ߢߣߊߕߊ߬ ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߞߍߢߊ߫ ߂ ߢߌ߲߬ ߠߎ߬ ߘߐ߫</div>
                    <div>
                        <p id='lesson_option_1'><span>߁߭</span> - ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߮</p>
                        <p id='lesson_option_2'><span>߂߲</span> - ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ ߜߘߏߓߊ߫ ߘߋ߲߮</p>
                    </div>
                </div>
            </div>
        
        </div>
        
        <script src = "/kouroukan/js/programmes.js"></script>
        
    </body>
    </html>
<?php
}else{
    header("location:index.php");
}
?>