<?php
    include('connexionToDB.php');
    global $db;
    
    $image_categorie = isset($_GET['image_categorie'])? $_GET['image_categorie']:'';
    $id = isset($_GET['id'])? $_GET['id']:'';
    
    if($image_categorie == 'image1syllabe' && $id !== '') {
    
        $requette = $db->prepare("select * from image1syllabe where id=:id");
        $requette->bindValue(':id',$id,PDO::PARAM_INT);
        $requette->execute();
        $images_1 = $requette->fetchAll();
        
        echo $images_1[0]['image'];
    }
    if($image_categorie == 'image2syllabe' && $id !== '') {
    
        $requette = $db->prepare("select * from image2syllabe where id=:id");
        $requette->bindValue(':id',$id,PDO::PARAM_INT);
        $requette->execute();
        $images_2 = $requette->fetchAll();
        
        echo $images_2[0]['image'];
    }
    if($image_categorie == 'image3syllabe' && $id !== '') {
    
        $requette = $db->prepare("select * from image3syllabe where id=:id");
        $requette->bindValue(':id',$id,PDO::PARAM_INT);
        $requette->execute();
        $images_3 = $requette->fetchAll();
        
        echo $images_3[0]['image'];
    }
    if($image_categorie == 'image4syllabe' && $id !== '') {
    
        $requette = $db->prepare("select * from image4syllabe where id=:id");
        $requette->bindValue(':id',$id,PDO::PARAM_INT);
        $requette->execute();
        $images_4 = $requette->fetchAll();
        
        echo $images_4[0]['image'];
    }