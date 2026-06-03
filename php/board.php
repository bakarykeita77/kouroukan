<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <title>board</title>
    
	<link rel = "stylesheet" href = "../css_fa/all.css"/>
    <link rel = "stylesheet" href = "../css/class.css"/>
    <link rel = "stylesheet" href = "../css/tete-de-page.css"/>
    <link rel = "stylesheet" href = "../css/parametres_tableau.css">
	<link rel = "stylesheet" href = "../css/assistant.css"/>
	<link rel = "stylesheet" href = "../css/board.css"/>
    
	<script src="../jquery-3.3.1.js"></script>
	<script src="../fonctions.js"></script>
</head>
<body>
    <div class="page_head"><?php require('tete-de-page.php'); ?></div>

    <div id="board_div">
        <div id="board_entete">
            <div id="entete_menu">
                <div id="board_menu_icone"><span id="">&#9776;</span></div>
                <div>
                    <span id="play">&#9664;</span>
                    <span id="pause">&#9868;</span>
                </div>
                <div id="board_menu_deroulant">
                    <div><span id="parametre_icone">&#9881;</span></div>
                    <div><span id="effacer_tableau">ߖߐ߬ߛߌ߬ߙߊ߲</span></div>
                </div>
                <div><span id="menu_menu">&#8942;</span></div>
            </div>
        </div>
        <form action="#" id="tableau_form"> <textarea name="" id="tableau_noir" cols="30" rows="10"></textarea> </form>
    </div>
    <div class="outils">
    	<?php include "parametres_tableau.php"; ?>
    	<?php include "assistant.php"; ?>
    	<?php include "memoire.php"; ?>
    	<?php include "smartboard.php";?>
    </div>
    <?php include "../fonctions/fonctions_tableau.php"; ?>
    
    <script src="../js/parametres_tableau.js"></script>
    <script src="../js/assistant.js"></script>
    <script src="../js/board.js"></script>
</body>
</html>