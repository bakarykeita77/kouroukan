<?php
session_start();

    require("connexionToDB.php");
    global $db;

    if($_SESSION['id']) {

        $sql_alphabet_table = "CREATE TABLE `kouroukan`.`alphabet` ( 
                    `id` INT(255) NOT NULL AUTO_INCREMENT , 
                    `id_client` INT(255) NOT NULL , 
                    `niveau` INT(2) NOT NULL , 
                    `date` TIMESTAMP NOT NULL , 
                    `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                    `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                    `note` INT(3) NOT NULL , 
                    PRIMARY KEY (`id`)
                ) ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_general_ci";


        $sql_syllabes_table = "CREATE TABLE `kouroukan`.`syllabes` ( 
                    `id` INT(255) NOT NULL AUTO_INCREMENT , 
                    `id_client` INT(255) NOT NULL , 
                    `niveau` INT(2) NOT NULL , 
                    `date` TIMESTAMP NOT NULL , 
                    `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                    `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                    `note` INT(3) NOT NULL , 
                    PRIMARY KEY (`id`)
                ) ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_general_ci";


        $sql_tons_table = "CREATE TABLE `kouroukan`.`tons` ( 
                    `id` INT(255) NOT NULL AUTO_INCREMENT , 
                    `id_client` INT(255) NOT NULL , 
                    `niveau` INT(2) NOT NULL , 
                    `date` TIMESTAMP NOT NULL , 
                    `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                    `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                    `note` INT(3) NOT NULL , 
                    PRIMARY KEY (`id`)
                ) ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_general_ci";


        $sql_chiffres_table = "CREATE TABLE `kouroukan`.`chiffres` ( 
                    `id` INT(255) NOT NULL AUTO_INCREMENT , 
                    `id_client` INT(255) NOT NULL , 
                    `niveau` INT(2) NOT NULL , 
                    `date` TIMESTAMP NOT NULL , 
                    `phase` VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                    `lesson` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL , 
                    `note` INT(3) NOT NULL , 
                    PRIMARY KEY (`id`)
                ) ENGINE = MyISAM CHARSET=utf8 COLLATE utf8_general_ci";

    //    $db->exec($sql_chiffres_table);

    }
?>
