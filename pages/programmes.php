<?php
session_start();
if(isset($_SESSION['id'])){
?>
<!DOCTYPE html>
<html>
<head>
    <title>programmes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/programmes.css"/>
</head>
<body>
  
    <div class="container">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div id="programmes_container" class="centerH" align="right">
                <h2>ߘߋ߰ߟߌ ߢߍߥߟߊ </h>
                <div id="programme_div"></div>
            </div>
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>
    
    <script src = "http://localhost:8080/kouroukan/js/class.js"     ></script>
    <script src = "http://localhost:8080/kouroukan/js/jquery-3.3.1.js"     ></script>
    <script src = "http://localhost:8080/kouroukan/js/caracteres.js"></script>
    <script src = "http://localhost:8080/kouroukan/js/programmes.js"></script>
    
</body>
</html>
<?php
}else{
    header("location:index.php");
}
?>