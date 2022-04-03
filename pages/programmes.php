<?php
session_start();
if(isset($_SESSION['connected'])){
?>
<!DOCTYPE html>
<html>
<head>
    <title>programmes</title>
 	<meta charset="utf-8" name="viewport" content="width=device-width, initial- scale=1"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/programmes.css"/>
	<link rel="stylesheet" href="http://localhost:8080/kouroukan/css/class.css"/>
</head>
<body>
  
    <div class="container">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div id="programmes_container" class="centerH" align="right">
                <h2>ߘߋ߰ߟߌ ߢߍߥߟߊ </h>
                <div id="programme_ul"></div>
            </div>
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>
    
    <script src="http://localhost:8080/kouroukan/js/class.js"></script>
    <script src="http://localhost:8080/kouroukan/js/caracteres.js"></script>
    <script src="http://localhost:8080/kouroukan/js/programmes.js"></script>
    
</body>
</html>
<?php
}else{
    header("location:index.php");
}
?>