<?php

    require("connexionToDB.php");
    global $db;

 /*------------------------------------------------------------------------------------------------------ */   
    
  //  $sql_database = "CREATE DATABASE IF NOT EXISTS `kouroukan`";
    
    $sql_table_users    = "CREATE TABLE IF NOT EXISTS `kouroukan`.`users`(
        `id` INT(255) NOT NULL AUTO_INCREMENT,
        `date` TIMESTAMP NOT NULL,
        `prenom` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        `nom` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        `naissance` VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        `sexe` VARCHAR(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        `adresse` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        `email` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        `pass` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
        PRIMARY KEY (`id`)
     ) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci";
    $sql_table_avatar   = "CREATE TABLE IF NOT EXISTS `kouroukan`.`avatar`(
        `id` int(255) not null auto_increment,
        `client_id` int(255) not null,
        `nom` varchar(100) character set utf8 collate utf8_general_ci,
        `taille` varchar(100) character set utf8 collate utf8_general_ci,
        `type` varchar(100) character set utf8 collate utf8_general_ci,
        `image` longblob,
        primary key (`id`)
     ) engine = myisam charset = utf8 collate utf8_general_ci";
    $sql_table_alphabet = "CREATE TABLE IF NOT EXISTS `kouroukan`.`alphabet`( 
        `id` INT(255) NOT NULL AUTO_INCREMENT , 
        `id_client` INT(255) NOT NULL , 
        `niveau` INT(2) NOT NULL , 
        `date` TIMESTAMP NOT NULL , 
        `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
        `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
        `note` INT(3) NOT NULL , 
        PRIMARY KEY (`id`)
     ) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci";
    $sql_table_syllabes = "CREATE TABLE IF NOT EXISTS `kouroukan`.`syllabes`( 
        `id` INT(255) NOT NULL AUTO_INCREMENT , 
        `id_client` INT(255) NOT NULL , 
        `niveau` INT(2) NOT NULL , 
        `date` TIMESTAMP NOT NULL , 
        `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
        `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
        `note` INT(3) NOT NULL , 
        PRIMARY KEY (`id`)
     ) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci";
    $sql_table_tons     = "CREATE TABLE IF NOT EXISTS `kouroukan`.`tons`( 
        `id` INT(255) NOT NULL AUTO_INCREMENT , 
        `id_client` INT(255) NOT NULL , 
        `niveau` INT(2) NOT NULL , 
        `date` TIMESTAMP NOT NULL , 
        `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
        `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
        `note` INT(3) NOT NULL , 
        PRIMARY KEY (`id`)
     ) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci";
    $sql_table_chiffres = "CREATE TABLE IF NOT EXISTS `kouroukan`.`chiffres`( 
        `id` INT(255) NOT NULL AUTO_INCREMENT , 
        `id_client` INT(255) NOT NULL , 
        `niveau` INT(2) NOT NULL , 
        `date` TIMESTAMP NOT NULL , 
        `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
        `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
        `note` INT(3) NOT NULL , 
        PRIMARY KEY (`id`)
     ) ENGINE = MyISAM CHARSET = utf8 COLLATE utf8_general_ci";
    $sql_table_image_1_syllabe = "CREATE TABLE IF NOT EXISTS `kouroukan`.`image-1-syllabe`(
        `id` int(255) not null auto_increment,
        `id_client` int(255) not null,
        `nom` varchar(100) character set utf8 collate utf8_general_ci,
        `taille` varchar(100) character set utf8 collate utf8_general_ci,
        `type` varchar(100) character set utf8 collate utf8_general_ci,
        `image` longblob,
        primary key (`id`)
     ) engine = myisam charset = utf8 collate utf8_general_ci";
    $sql_table_image_2_syllabe = "CREATE TABLE IF NOT EXISTS `kouroukan`.`image-2-syllabe`(
        `id` int(255) not null auto_increment,
        `id_client` int(255) not null,
        `nom` varchar(100) character set utf8 collate utf8_general_ci,
        `taille` varchar(100) character set utf8 collate utf8_general_ci,
        `type` varchar(100) character set utf8 collate utf8_general_ci,
        `image` longblob,
        primary key (`id`)
     ) engine = myisam charset = utf8 collate utf8_general_ci";
    $sql_table_image_3_syllabe = "CREATE TABLE IF NOT EXISTS `kouroukan`.`image-3-syllabe`(
        `id` int(255) not null auto_increment,
        `id_client` int(255) not null,
        `nom` varchar(100) character set utf8 collate utf8_general_ci,
        `taille` varchar(100) character set utf8 collate utf8_general_ci,
        `type` varchar(100) character set utf8 collate utf8_general_ci,
        `image` longblob,
        primary key (`id`)
     ) engine = myisam charset = utf8 collate utf8_general_ci";
    $sql_table_image_4_syllabe = "CREATE TABLE IF NOT EXISTS `kouroukan`.`image-4-syllabe`(
        `id` int(255) not null auto_increment,
        `id_client` int(255) not null,
        `nom` varchar(100) character set utf8 collate utf8_general_ci,
        `taille` varchar(100) character set utf8 collate utf8_general_ci,
        `type` varchar(100) character set utf8 collate utf8_general_ci,
        `image` longblob,
        primary key (`id`)
     ) engine = myisam charset = utf8 collate utf8_general_ci";

 /*------------------------------------------------------------------------------------------------------ */   

   // $db->exec($sql_database);
    $db->exec($sql_table_users);
    $db->exec($sql_table_avatar);
    $db->exec($sql_table_alphabet);
    $db->exec($sql_table_syllabes);
    $db->exec($sql_table_tons);
    $db->exec($sql_table_chiffres);
    $db->exec($sql_table_image_1_syllabe);
    $db->exec($sql_table_image_2_syllabe);
    $db->exec($sql_table_image_3_syllabe);
    $db->exec($sql_table_image_4_syllabe);
    
    header("location:http://localhost:8002/?username=root&db=kouroukan"); 