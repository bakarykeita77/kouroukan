<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>contact</title>
    <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/contact.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
</head>
<body>
    <div class="container" id="body_contact">
        <div class="page_head" id="entete_contact"><?php include("tete-de-page.php"); ?></div>
        <div class="page_body" id="body_contact">
            
            <h1>ߊ߲ ߠߊߛߐ߬ߘߐ߲߬</h1>
            <div id="menu_contact">
                
                <div class="contact_item" id="contact_agence">
                    <div class="contact_icone" id="">&#128205;</div>
                    <div class="contact_description" id="">
                        ߣߌ߫ ߡߐ߭ ߡߍ߲ ߠߎ߬ ߦߋ߫ ߛߙߍߜߘߍ߬߸ ߊ߲ ߡߊߞߍߣߍ߲߫ ߜ߭ߏ߬ߣߌߦߊ߬ ߞߎ߲߬ߘߊ ߟߊ߫. ߔߊ߬ߔߘߊ ߝߟߍ߫߹
                    </div>
                    <p class="contact_btn" id="">ߛߋ߫ ߊ߲ ߝߍ߬</p>
                </div>
                <div class="contact_item" id="contact_phone">
                    <div class="contact_icone" >&#9990;</div>
                    <div class="contact_description" id=""></div>
                    <p class="contact_btn" id="">ߊ߲ ߥߟߋ߫</p>
                </div>
                <div class="contact_item" id="contact_email">
                    <div class="contact_icone" id="">&#9993;</div>
                    <div class="contact_description" id="">
                        ߣߌ߫ ߡߍ߲ ߦߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߊ߬ߞߕߌ߬ߟߌ ߞߍ߫ ߥߟߊ ߞߊ߬ ߡߙߌߦߊ ߛߎ−ߎ−ߛߎ߫ ߦߌ߬ߘߊ߬߸ ߏ߬ ߘߴߏ߬ ߞߍ߫. ߊ߲ ߖߟߌ߫ ߦߴߊߟߎ߫ ߟߊ߫ ߞߎߡߊ߫ ߛߊߣߌߡߊ߲ ߠߎ߬ ߟ߫. ߊ߲ ߘߌ߫ ߞߐߝߟߌ ߘߴߊߟߎ߫ ߡߊ߬ ߕߎ߬ߡߊ߬ ߜߘߍ߫.
                    </div>
                    <p class="contact_btn" id="">ߛߓߍ ߗߋ߫ ߊ߲ ߡߊ߬</p>
                </div>
                
            </div>
            
        </div>
        <div id="contact_cover">
            <div class="contact_formulaire" id="agence_formulaire"></div>
            <div class="contact_formulaire" id="phone_formulaire"></div>
            <div class="contact_formulaire" id="email_formulaire"></div>
        </div>
    </div>
</body>
</html>