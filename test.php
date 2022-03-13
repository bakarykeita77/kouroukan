<?php
session_start();
    require('http://localhost:8080/kouroukan/pages/connexionToDB.php');
    global $db;
    
    var_dump($_POST['pratique']);
?>


<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>test</title>
</head>
<body>
  
    <form method="POST" id='form_test'>
        <input type="text" name="pratique" id="pratique" autocomplete="off">
        <input type="submit" name="submit_btn" id="submit_btn" value="Envoyer">
    </form>
  
<script src="test.js"></script>
</body>
</html>