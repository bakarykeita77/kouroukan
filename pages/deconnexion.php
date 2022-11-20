<?php
session_start();
session_destroy();
header("location:/kouroukan/index.php");
?>