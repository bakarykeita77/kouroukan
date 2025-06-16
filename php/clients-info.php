<?php
session_start();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>clients-info</title>
</head>
<body>
    
    <center><h2>Users</h2></center>
    <p id="id_user" style="display:none"><?= $_SESSION["id_client"]; ?></p>
    <center><div id="users"></div></center>
    <script src="/kouroukan/js/clients-info.js"></script>
</body>
</html>