<?php
    
    require "connexionToDB.php";

    function addClient($prenom,$nom,$naissance,$sexe,$adresse,$email,$password){ 
        global $db;
        
        $sql = "INSERT INTO users(prenom,nom,naissance,sexe,adresse,email,password) 
                VALUES(:prenom,:nom,:naissance,:sexe,:adresse,:email,:password)";
        $requette = $db->prepare($sql);
    
        $requette->bindValue(':prenom',   $prenom,   PDO::PARAM_STR);
        $requette->bindValue(':nom',      $nom,      PDO::PARAM_STR);
        $requette->bindValue(':naissance',$naissance,PDO::PARAM_STR);
        $requette->bindValue(':sexe',     $sexe,     PDO::PARAM_STR);
        $requette->bindValue(':adresse',  $adresse,  PDO::PARAM_STR);
        $requette->bindValue(':email',    $email,    PDO::PARAM_STR);
        $requette->bindValue(':password', $password, PDO::PARAM_STR);
        
        $new_client = $requette->execute();
        return $new_client;
    }
    function archiverTeste($id_client,$niveau,$teste,$point){
        global $db;
        
        $sql = "INSERT INTO teste(id_client,Niveau,Teste,Point) VALUES(:id_client,:niveau,:teste,:point)";
        
        $requette = $db->prepare($sql);
        
        $requette->bindValue(':id_client',$id_client,PDO::PARAM_INT);
        $requette->bindValue(':niveau',   $niveau,   PDO::PARAM_STR);
        $requette->bindValue(':teste',    $teste,    PDO::PARAM_STR);
        $requette->bindValue(':point',    $point,    PDO::PARAM_STR);
        
        $testes = $requette->execute();
        return $testes;
    }
    function archiverLesson($id_client,$niveau,$course){
        global $db;
        
        $sql = "INSERT INTO lessons(id_client,niveau,lesson) VALUES(:client_id,:niveau,:lesson)";
        $requette = $db->prepare($sql);
        $requette->bindValue(':client_id',$id_client,PDO::PARAM_INT);
        $requette->bindValue(':niveau',   $niveau,   PDO::PARAM_INT);
        $requette->bindValue(':lesson',   $course,   PDO::PARAM_STR);
        $nouvelle_lesson = $requette->execute();
        
        return $nouvelle_lesson;
    }
    function archiverExercice($id_client,$niveau,$exercice){
        global $db;
        
        $sql = "INSERT INTO exercices(id_client,niveau,exercice) VALUES(:id_client,:niveau,:exercice)";
        
        $requette = $db->prepare($sql);
        $requette->bindValue(':id_client',$id_client,PDO::PARAM_INT);
        $requette->bindValue(':niveau',   $niveau,   PDO::PARAM_INT);
        $requette->bindValue(':exercice', $exercice, PDO::PARAM_STR);
        $requette->execute();
        
        return $nouvelle_exercice;
    }
    
    function deleteClient($id){
        global $db;
        
        $sql = "DELETE FROM users WHERE id=:id";
        $requette = $db->prepare($sql);
        $requette->bindValue(':id',$id,PDO::PARAM_INT);
        $clients = $requette->execute();
        
        return $clients;
    }
    
    function getClient($id){
        global $db;
        
        $sql = "SELECT * FROM users WHERE id=:id";
        $requette = $db->prepare($sql);
        $requette->bindValue(':id',$id,PDO::PARAM_INT);
        $requette->execute();
        $client = $requette->fetchAll();

        return $client;
    }
    function getClientByEmail($email){
        global $db;
        
        $sql = "SELECT * FROM users WHERE email=:email";
        $requette = $db->prepare($sql);
        $requette->bindValue(':email',$email,PDO::PARAM_STR);
        $requette->execute();
        $client = $requette->fetchAll();

        return $client;
    }
    function getAllClients(){
        global $db;
        
        $sql = "SELECT * FROM users ORDER BY id DESC LIMIT 8";
        $requette = $db->prepare($sql);
        $requette->execute();
        $clients = $requette->fetchAll();
        
        return $clients;
    }    
    
    function securiser($donnee){
        $donnee = trim($donnee);
        $donnee = stripslashes($donnee);
        $donnee = strip_tags($donnee);
        
        return $donnee;
    }
    
    function updateClient($id,$prenom,$nom,$naissance,$sexe,$adresse,$email,$password){
        global $db;
        
        $sql = "UPDATE users SET prenom=:prenom, nom=:nom, naissance=:naissance, sexe=:sexe, adresse=:adresse, email=:email, password=:password WHERE id=:id";
        $requette = $db->prepare($sql);
        
        $requette->bindValue(':id',       $id,       PDO::PARAM_INT);
        $requette->bindValue(':prenom',   $prenom,   PDO::PARAM_STR);
        $requette->bindValue(':nom',      $nom,      PDO::PARAM_STR);
        $requette->bindValue(':naissance',$naissance,PDO::PARAM_STR);
        $requette->bindValue(':sexe',     $sexe,     PDO::PARAM_STR);
        $requette->bindValue(':adresse',  $adresse,  PDO::PARAM_STR);
        $requette->bindValue(':email',    $email,    PDO::PARAM_STR);
        $requette->bindValue(':password', $password, PDO::PARAM_STR);
        
        $clients = $requette->execute();
        return $clients;
    }
    