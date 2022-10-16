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
	<link rel="stylesheet" href="/kouroukan/css/programmes.css"/>
</head>
<body>
  
    <div class="container">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div id="programmes_container">
                <h1>ߒߞߏ ߘߋ߰ߟߌ ߢߍߥߟߊ </h1>
                <div id="programme_div"></div>
            </div>
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>
    
    <script src = "/kouroukan/js/programmes.js"></script>
    
</body>
</html>
<?php
}else{
    header("location:index.php");
}
?>