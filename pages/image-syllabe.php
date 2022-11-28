<?php
    include('connexionToDB.php');
    global $db;
    
    extraireLesImagesMonoSyllabe();
 /*   if($image_categorie == 'image2syllabe') extraireLesImagesBiSyllabe();
    if($image_categorie == 'image3syllabe') extraireLesImagesTriSyllabe();
    if($image_categorie == 'image4syllabe') extraireLesImagesQuadriSyllabe();
*/
    function extraireLesImagesMonoSyllabe() {
        global $db;
        
        $requette = $db->prepare("select * from image1syllabe");
        $requette->execute();
        $images1 = $requette->fetchAll();
        
        echo "<pre>";
        print_r($images1[0]); 
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
        $image = $requette->fetchAll(PDO::FETCH_ASSOC);
        /*
        $images = [
            'id' => $image[0]['id'],
            'id_client' => $image[0]['id_client'],
            'nom' => $image[0]['nom'],
            'extension' => $image[0]['extension'],
            'taille' => $image[0]['taille'],
            'type' => $image[0]['type'],
            'image' => base64_encode($image[0]['image'])
        ];
        
        echo(json_encode($images));
        */
        echo $image[0]['image'];
    }