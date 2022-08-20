<?php
    include('DBConnexion.php');
    global $db;
    
    $id = $_GET['id'];
    $image_categorie = $_GET['image_categorie'];
    
    if($image_categorie == 'image1syllabe' && $id == '') extraireLesImagesMonoSyllabe();
    if($image_categorie == 'image2syllabe' && $id == '') extraireLesImagesBiSyllabe();
    if($image_categorie == 'image3syllabe' && $id == '') extraireLesImagesTriSyllabe();
    if($image_categorie == 'image4syllabe' && $id == '') extraireLesImagesQuadriSyllabe();

    if($image_categorie !== '' && $id != '') extraireUneImage($image_categorie,$id);
    

    function extraireLesImagesMonoSyllabe() {
        global $db;
        
        $requette = $db->prepare("select * from image1syllabe");
        $requette->execute();
        $images1 = $requette->fetchAll();
        
        echo "<pre>";
        print_r($images1); 
        echo "</pre>";
    }
    function extraireLesImagesBiSyllabe() {
        global $db;
        
        $requette = $db->prepare("select * from image2syllabe");
        $requette->execute();
        $images2 = $requette->fetchAll();
        
        echo "<pre>";
        print_r($images2); 
        echo "</pre>";
    }
    function extraireLesImagesTriSyllabe() {
        global $db;
        
        $requette = $db->prepare("select * from image3syllabe");
        $requette->execute();
        $images3 = $requette->fetchAll();
        
        echo "<pre>";
        print_r($images3); 
        echo "</pre>";
    }
    function extraireLesImagesQuadriSyllabe() {
        global $db;
        
        $requette = $db->prepare("select * from image4syllabe");
        $requette->execute();
        $images4 = $requette->fetchAll();
        
        echo "<pre>";
        print_r($images4); 
        echo "</pre>";
    }
    function extraireUneImage($image_categorie,$id) {
        global $db;
        
        $requette = $db->prepare("select * from ".$image_categorie." where id = :id");
        $requette->bindValue(':id', $id, PDO::PARAM_INT);
        $requette->execute();
        $image = $requette->fetchAll();
        
        echo $image[0]['image']; 
    }