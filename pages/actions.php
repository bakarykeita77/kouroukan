<?php
    session_start();
    require_once("phpFonctions.php");
    global $connexion;
    $post_action = isset($_POST['post_action'])? $_POST['post_action']:'';
    $get_action = isset($_GET['get_action'])? $_GET['get_action']:'';
 
    switch($post_action){
        case 'add_client':
           
            $prenom    = securiser($_POST['prenom']);
            $nom       = securiser($_POST['nom']);
            $naissance = securiser($_POST['naissance']);
            $sexe      = securiser($_POST['sexe']);
            $adresse   = securiser($_POST['adresse']);
            $email     = securiser($_POST['email']);
            $password  = securiser($_POST['password']);
           
            addClient($prenom,$nom,$naissance,$sexe,$adresse,$email,$password);
            header('location:http://localhost:8080/kouroukan/index.php?message=1');
        break;
        case 'get_client':
            $client_email = securiser($_POST['client_email']);
            getClientByEmail($client_email);      
        break;
        case 'update_client':
            
            $id        = securiser($_POST['post_id']);
            $prenom    = securiser($_POST['prenom_updated']);
            $nom       = securiser($_POST['nom_updated']);
            $naissance = securiser($_POST['naissance_updated']);
            $sexe      = securiser($_POST['sexe_updated']);
            $adresse   = securiser($_POST['adresse_updated']);
            $email     = securiser($_POST['email_updated']);
            $password  = securiser($_POST['password_updated']);
            
            updateClient($id,$prenom,$nom,$naissance,$sexe,$adresse,$email,$password);
        break;
        case 'get_client':
            $client_email = securiser($_POST['client_email']);
            getClientByEmail($client_email);      

        break;
        case 'archiver_teste':
            
            $id_client = securiser($_POST['id_client_input']);
            $niveau    = securiser($_POST['niveau_input']);
            $testes    = securiser($_POST['testes_input']);
            
            archiverTeste($id_client,$niveau,$testes);
            header("location:correction.php");
        break;
    }
    switch($get_action){
        
        case 'archiver_exercice':
            $client_id = securiser($_SESSION['id']);
            $niveau = securiser($_POST['niveau']);
            $course = securiser($_POST['course_input']);
          
            archiverExercice($client_id,$niveau,$course);
            header('location:lesson.php');
        break;
        case 'archiver_lesson' :
            $client_id = securiser($_SESSION['id']);
            $niveau = securiser($_POST['niveau']);
            $course = securiser($_POST['course_input']);
     
            archiverLesson($client_id,$niveau,$course);
            header('location:lesson.php');
        break;
        case 'archiver_teste':
            
            $id_client = $_SESSION['id'];
            $niveau    = securiser($_GET['niveau']);
            $teste     = securiser($_POST['teste']);
            $point     = securiser($_POST['point']);
           
            archiverTeste($id_client,$niveau,$teste,$point);
            header("location:lesson.php");
        break;
        case 'delete_client':
            $id = securiser($_GET['id']);
            deleteClient($id);
            
            header('location:clients.php');
        break;
        case 'get_clients':
            getAllClients();      
        break;
    }
?>