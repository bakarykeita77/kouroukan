<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>board</title>
    <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/board.css">
    <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css">
    <link rel="stylesheet" href="http://localhost:8080/kouroukan/css/parametres_tableau.css">
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/assistant.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/memoire.css"/>
    
    
    <script src="http://localhost:8080/kouroukan/js/jquery-3.3.1.js"></script>
    <script src="http://localhost:8080/kouroukan/js/class.js"></script>
    
</head>
<body>
    
    <form action="#" id="tableau_form"> <textarea name="" id="tableau_noir" cols="30" rows="10"></textarea> </form>
    
    <div class="outils">
    	<?php include "http://localhost:8080/kouroukan/pages/parametres_tableau.php"; ?>
    	<?php include "http://localhost:8080/kouroukan/pages/assistant.php"; ?>
    	<?php include "http://localhost:8080/kouroukan/pages/memoire.php"; ?>
    	<?php include "http://localhost:8080/kouroukan/pages/smartboard.php";?>
    </div>
    <?php include "http://localhost:8080/kouroukan/fonctions/fonctions_tableau.php"; ?>
    
    <script src="http://localhost:8080/kouroukan/js/parametres_tableau.js"></script>
    <script src="http://localhost:8080/kouroukan/js/assistant.js"></script>
    <script src="http://localhost:8080/kouroukan/js/board.js"></script>
</body>
</html>