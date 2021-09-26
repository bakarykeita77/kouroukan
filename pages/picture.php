<?php
session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>avatar</title>
        <meta chrset="UTF-8">
    </head>
    <body>
        <div align="center"><img src="affiche.php?id=<?= $_SESSION['id'] ?>" alt=""></div>
    </body>
</html>