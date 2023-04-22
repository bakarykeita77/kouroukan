<?php
session_start();
if(isset($_SESSION['connected'])){
    $matiere = $_GET['matiere'];
    
?>
<!DOCTYPE html>
<html>
    <head>
        <title>preparation</title>
        <meta charset = "UTF-8">
        <link rel="stylesheet" href="/kouroukan/css/preparation.css">
    </head>
    <body>
        <div id='lesson_container'>
            <h2 class="lesson_title">ߥߟߊ߬ߘߊ ߁߭: ߛߓߍߛߎ߲</h2> 
            <div class="lesson_entete" id="alphabet_entete"></div> 
            <div class="lesson_corps"><table class="table_parlante" id='alphabet_table'></table></div>
            <div class="lesson_pied"></div> 
            
            <audio id="audio"></audio>
        </div>
        
        <script src="/kouroukan/js/preparation.js"></script>
    </body>
</html>
<?php
    }else { header("location:formations.php"); }
?>