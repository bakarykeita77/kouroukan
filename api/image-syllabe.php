<?php
    include('DBConnexion.php');
    global $db;
    
    $image_categorie = $_GET['image_categorie'];

    switch ($image_categorie) {
        case 'image_1_syllabe': getImageMonoSyllabe();   break;
        case 'image_2_syllabe': getImageBiSyllabe();     break;
        case 'image_3_syllabe': getImageTriSyllabe();    break;
        case 'image_4_syllabe': getImageQuadriSyllabe(); break;
        default: break;
    }
    

    function getImageMonoSyllabe() {
        global $db;
        
        $requette = $db->prepare("select * from image1syllabe");
        $requette->execute();
        $image = $requette->fetchAll();
        
        for($i=0; $i<count($image); $i++) echo $image[$i]['image']."<br>";
    }
    function getImageBiSyllabe() {
        global $db;
        
        $requette = $db->prepare("select * from image2syllabe");
        $requette->execute();
        $image = $requette->fetchAll();
        
        for($i=0; $i<count($image); $i++) echo $image[$i]['image']."<br>";
    }
    function getImageTriSyllabe() {
        global $db;
        
        $requette = $db->prepare("select * from image3syllabe");
        $requette->execute();
        $image = $requette->fetchAll();
        
        for($i=0; $i<count($image); $i++) echo $image[$i]['image']."<br>";
    }
    function getImageQuadriSyllabe() {
        global $db;
        
        $requette = $db->prepare("select * from image4syllabe");
        $requette->execute();
        $image = $requette->fetchAll();
        
        for($i=0; $i<count($image); $i++) echo $image[$i]['image']."<br>";
    }