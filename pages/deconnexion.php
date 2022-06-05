<?php
session_start();
session_destroy();
header("location:http://localhost:80/kouroukan/index.php");
?>