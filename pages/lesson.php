<?php header('Content-Type: text/html; charset=utf-8');
session_start();

if(isset($_SESSION["id"])) {
    
    $matiere_id      = $_GET['matiere_id'];
    $matiere_index   = $_GET['matiere_index'];
    $matiere_nom     = $_GET['matiere_nom'];
    $niveau          = $_GET['niveau'];
    $niveau_max      = $_GET['niveau_max'];
    $phases_etudiees = ($matiere_index > 0) ? $_GET['phases_etudiees'] : "";

    $chiffres = ['߀','߁','߂','߃','߄','߅','߆','߇','߈','߉'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>lesson</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <link rel="stylesheet" href="/kouroukan/css/tete-de-page.css"/>
	
	<link rel="stylesheet" href="/kouroukan/css/lesson.css"/>
	<link rel="stylesheet" href="/kouroukan/css/syllabes.css"/>
	<link rel="stylesheet" href="/kouroukan/css/apprentissage.css"/>
	<link rel="stylesheet" href="/kouroukan/css/exercice.css"/>
	<link rel="stylesheet" href="/kouroukan/css/pratiques.css"/>
	<link rel="stylesheet" href="/kouroukan/css/evaluation.css"/>
	<link rel="stylesheet" href="/kouroukan/css/travaux.css"/>

</head>
<body style="direction:rtl">

    <div class="container">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
          <!----------------------------------------------------------------------------------------------------->  
            <div id="donnees_recues_de_prorammes" style="display:none">
                <p id='matiere_id_container'    ><?= $matiere_id; ?></p>
                <p id='matiere_index_container' ><?= $matiere_index; ?></p>
                <p id='matiere_nom_container'   ><?= $matiere_nom; ?></p>
                <p id='niveau_container'        ><?= $niveau; ?></p>
                <p id='niveau_max_container'    ><?= $niveau_max; ?></p>
            </div>
          <!----------------------------------------------------------------------------------------------------->  
            <h4>ߘߋ߰ߟߌ ߞߛߊߞߊ : <span class="niveau_courant"><?= $chiffres[$niveau]; ?></span><span class='rang'></span></h4>
          <!----------------------------------------------------------------------------------------------------->  
            <h1 class="lesson_title" id="<?= $matiere_id ?>"> <?= $matiere_nom; ?> ߥߟߊ߬ߘߊ  </h1>
          <!----------------------------------------------------------------------------------------------------->  
            
            <div class="phases_container">
                <div class="phases liste_affichage_cascade" id="pratique_phases"></div>
            </div>
            <div class="travaux">
                <div class="travaux_cadre">
                    
                    <div class="travail" id="travail_d_apprentissage">
                        <h3 class="travail_titre" ><?= $matiere_nom; ?> ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ</h3>
                        <div id="travail_1">
                            
                                <div class="travail_entete" id="travail_1_entete">
                                    <table border=1 width=70>
                                        <tr><td><?= $matiere_nom; ?></td></tr>
                                        <tr><td>ߘߌ߯ߟߌ</td></tr>
                                        <tr><td>ߓߙߍ߬ߦߊ</td></tr>
                                    </table>
                                </div>

                                <div class="travail_corps" id="travail_1_corps"></div> 

                                <div class="travail_foot" id="travail_1_foot"> 
                                    <table border=1 width=46>
                                        <tr><td> ߓߍ߬ߙߍ</td></tr>
                                        <tr><td> ߡߎ߬ߡߍ</td></tr>
                                        <tr><td id="travail_1_note"></td></tr>
                                    </table>  
                                </div> 
                           
                        </div>
                    </div>

                    <div class="travail" id="travail_d_exercice">
                        <h3 class="travail_titre"><?= $matiere_nom; ?> ߡߊ߬ߞߟߏ߬ߟߌ</h3>
                        <div id="travail_2">
                            
                                <div class="travail_entete" id="travail_2_entete">
                                    <table border=1 width=70>
                                        <tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>
                                        <tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>
                                        <tr><td>ߓߙߍ߬ߦߊ</td></tr>
                                    </table>
                                </div>

                                <div class="travail_corps" id="travail_2_corps"></div> 
                            
                                <div class="travail_foot" id="travail_2_foot">
                                    <table border=1 width=46>
                                        <tr><td> ߓߍ߬ߙߍ</td></tr>
                                        <tr><td> ߡߎ߬ߡߍ</td></tr>
                                        <tr><td id="travail_2_note"></td></tr>
                                    </table> 
                                </div> 
                            
                        </div>
                    </div>

                    <div class="travail" id="travail_de_pratique">
                        <h3 class="travail_titre"><?= $matiere_nom; ?> ߓߟߏߦߊߟߌ</h3>
                        <div id="travail_3">

                            <div class="travail_31">
                                <div class="travail_entete" id="travail_31_entete">
                                    <table border=1 width=70>
                                        <tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>
                                        <tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>
                                        <tr><td>ߓߙߍ߬ߦߊ</td></tr>
                                    </table>
                                </div> 

                                <div class="travail_corps" id="travail_31_corps"></div>

                                <div class="travail_foot" id="travail_31_foot">
                                    <table border=1 width=46>
                                        <tr><td> ߓߍ߬ߙߍ</td></tr>
                                        <tr><td> ߡߎ߬ߡߍ</td></tr>
                                        <tr><td id="travail_31_note"></td></tr>
                                    </table> 
                                </div>
                            </div>
                            
                            <div class="travail_32">
                                <div class="travail_entete" id="travail_32_entete">
                                    <table border=1 width=70>
                                        <tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>
                                        <tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>
                                        <tr><td>ߓߙߍ߬ߦߊ</td></tr>
                                    </table>
                                </div> 

                                <div class="travail_corps" id="travail_32_corps"></div>

                                <div class="travail_foot" id="travail_32_foot">
                                    <table border=1 width=46>
                                        <tr><td> ߓߍ߬ߙߍ</td></tr>
                                        <tr><td> ߡߎ߬ߡߍ</td></tr>
                                        <tr><td id="travail_32_note"></td></tr>
                                    </table> 
                                </div>
                            </div>
                            
                            <div class="travail_33">
                                <div class="travail_entete" id="travail_33_entete">
                                    <table border=1 width=70>
                                        <tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>
                                        <tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>
                                        <tr><td>ߓߙߍ߬ߦߊ</td></tr>
                                    </table>
                                </div> 

                                <div class="travail_corps" id="travail_33_corps"></div>

                                <div class="travail_foot" id="travail_33_foot">
                                    <table border=1 width=46>
                                        <tr><td> ߓߍ߬ߙߍ</td></tr>
                                        <tr><td> ߡߎ߬ߡߍ</td></tr>
                                        <tr><td id="travail_33_note"></td></tr>
                                    </table> 
                                </div>
                            </div>
                            
                            <div class="travail_34">
                                <div class="travail_entete" id="travail_34_entete">
                                    <table border=1 width=70>
                                        <tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>
                                        <tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>
                                        <tr><td>ߓߙߍ߬ߦߊ</td></tr>
                                    </table>
                                </div> 

                                <div class="travail_corps" id="travail_34_corps"></div>

                                <div class="travail_foot" id="travail_34_foot">
                                    <table border=1 width=46>
                                        <tr><td> ߓߍ߬ߙߍ</td></tr>
                                        <tr><td> ߡߎ߬ߡߍ</td></tr>
                                        <tr><td id="travail_34_note"></td></tr>
                                    </table> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="travail" id="travail_d_evaluation">
                        <h3 class="travail_titre"><?= $matiere_nom; ?> ߞߘߐߓߐߟߌ</h3>
                        <div id="travail_4">
                           
                                <div class="travail_entete" id="travail_4_entete">
                                    <table border=1 width=70>
                                        <tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>
                                        <tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>
                                        <tr><td>ߓߙߍ߬ߦߊ</td></tr>
                                    </table>
                                </div> 

                                <div class="travail_corps" id="travail_4_corps"></div>

                                <div class="travail_foot" id="travail_4_foot">
                                    <table border=1 width=46>
                                        <tr><td> ߓߍ߬ߙߍ</td></tr>
                                        <tr><td> ߡߎ߬ߡߍ</td></tr>
                                        <tr><td id="travail_4_note"></td></tr>
                                    </table> 
                                </div> 
                           
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>

    <div class="parametres_container" id="parametre_lesson_container"> <?php include("parametre.php"); ?> </div>
    <div class="course_container">
        
      <!--------------------------------------------------------------------------------------------------------------->
        <span class="fermeture" id="">&times;</span>
      <!--------------------------------------------------------------------------------------------------------------->
	    
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="apprentissage">
            
            <div class="course_head" id="apprentissage_head">
                <div class = 'progress_bar' id = "apprentissage_progress_bar">
                    <div class='progress_bonne_reponse_bar'></div>
                </div>
            </div>
            <div class="course_body" id="apprentissage_body"></div>
            <div class="course_foot" id="apprentissage_foot">
                <div class="dialogue_btn" id="apprentissage_dialogue_btn">

                    <div class="btns media" id="media_apprentissage">
                        <div class="media_btns">
                            <div class='btn'>
                                <span class='play_icon'>&#9664;</span>
                                <span class='play_label'>ߝߐߟߊ߲</span>
                            </div>

                            <div class='btn'>
                                <span class='stop_icon'>&#9632;</span>
                                <span class='stop_label'>ߘߊ߬ߘߋ߬ߟߊ߲ </span> 
                            </div>
                        </div>
                        <div class="btns_label media_label">ߝߊߟߊ߲ߞߏ</div>
                    </div>

                    <div class="btns parametre" id="parametre_lesson">
                        <div class='parametres_btns' id='parametre_lesson_btn'>
                            <span class='parametre_icon'>&#9881;</span>
                            <span class='parametre_label'>ߛߏ߯ߙߏߟߊ߲</span>  
                        </div>
                    </div>
                </div>
            </div>
         </div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="exercice"     >
            
            <div class="course_head" id="exercice_head">
                <div class='progress_bar' id="exercice_progress_bar">
                    <p class='progress_question_bar'></p>
                    <p class='progress_bonne_reponse_bar'></p>
                </div>
            </div>
            <div class="course_body" id="exercice_body"></div>   <!--Cette division est chargé par la fonction chargerExercice() dans lesson.js-->
            <div class="course_foot" id="exercice_foot"></div>
            
         </div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="pratique"     >
         <!--------------------------------------------------------------------
            La partie pratique de lesson est composée de 3 divisions dont:
            
            1)- pratique_head
            2)- pratique_body
            2)- pratique_foot
         ---------------------------------------------------------------------->
            
            <div id="pratique_options">
                <center><h2 id="options_titre">ߓߟߏߦߊߟߌ ߓߏߟߏ߲ ߠߎ߬</h2></center>
                <center>
                <div>
                    <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߁ ߡߊ</span>
                    <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߂ ߡߊ</span>
                    <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߃ ߡߊ</span>
                    <span>ߞߎߡߊߘߋ߲߫ ߜߋ߲߬ ߄ ߡߊ</span>
                </div> 
                </center>
            </div>
         <!--pratique_head---------------------------------------------------->
            <div class="course_head" id="pratique_head">
                <div class='progress_bar' id="pratique_progress_bar">
                    <span class='progress_question_bar'></span>
                    <span class='progress_bonne_reponse_bar'></span>
                </div>
            </div>
          
         <!--pratique_body---------------------------------------------------->
            <div class="course_body" id="pratique_body">

                <div id="pratique_fiche">
                    <div id="pratique_fiche_head">
                        <span class="th">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</span>
                        <span class="th">ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</span>
                        <span class="th">ߓߙߍ߬ߦߊ</span>
                    </div>
                    <div id="pratique_fiche_body"></div>
                    <div id="pratique_travail_foot">
                        <div>
                            <span id="label_total_point">ߓߍ߬ߙߍ ߡߎ߬ߡߍ</span>
                            <span id="total_point"></span>
                        </div>
                        <div>
                            <span id="label_pourcentage_point" colspan="2">ߓߍ߬ߙߍ ߗߡߍ߬ߘߐ߬ߦߊ</span>
                            <span id="pourcentage_point"></span>
                        </div>
                    </div>
                </div>

                <div id="message_de_fin_container">
                    <p id="message_de_fin"></p>
                    <div id="message_btn_container"> <button id="message_btn_1"></button><button id="message_btn_2"></button> </div>
                </div>
                
            </div>
          
         <!--pratique_foot---------------------------------------------------->
            <div class="course_foot" id="pratique_foot">


                <div id="pratique_guide">
                    <div id="bulles_container"></div>
                    <p id="signe_egal">&#123;</p>
                    <p id="reponse_container"><span id="cumule_des_caracteres"></span><span id='correcteur'>ߖߐ߬ߛߌ߬ߙߊ߲</span></p>
                </div>

                <div id="pratiques_images_container">
                    <h1 id="image_name"></h1>
                    <img src="" alt="?">
                </div>

                <div id="image_croix">&#10060;</div>

                <div class="clavier_container" id="pratique_clavier_container"><?php include "clavier.php"; ?></div>

                <div class="dialogue_btn" id="pratique_dialogue_btn">
    
                    <div class="btn question_btn">
                        <span class="question_label">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</span>
                        <span class="question_total"></span> :
                        <span class="question_ordre"></span>
                        <span class="question_action"></span>
                        <span class="question_icon"></span>
                    </div>
    
                    <div class="btn repetition_btn">
                        <span class="repetition_label">ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫</span>
                        <span class="repetition_icon"></span>
                    </div>
    
                    <div class="btn correction_btn">
                        <span class="correction_label">ߏ߬ ߛߊߞߍ߫</span>
                        <span class="correction_icon"></span>
                    </div>
                </div>
            
            </div>
         </div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="evaluation"   >

            <div class="course_head" id="evaluation_head">
                <div class='progress_bar' id="evaluation_progress_bar">
                    <p class='progress_question_bar'></p>
                    <p class='progress_bonne_reponse_bar'></p>
                </div>
            </div>

            <div class="course_body" id="evaluation_body">

                <div id="evaluation_fiche">
                    <div id="evaluation_fiche_head">
                        <span class="th">ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</span>
                        <span class="th">ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</span>
                        <span class="th">ߓߙߍ߬ߦߊ</span>
                    </div>
                    <div id="evaluation_fiche_body"></div>
                    <div id="evaluation_travail_foot">
                        <div>
                            <span id="label_total_point">ߓߍ߬ߙߍ ߡߎ߬ߡߍ</span>
                            <span id="total_point"></span>
                        </div>
                        <div>
                            <span id="label_pourcentage_point" colspan="2">ߓߍ߬ߙߍ ߗߡߍ߬ߘߐ߬ߦߊ</span>
                            <span id="pourcentage_point"></span>
                        </div>
                    </div>
                </div>

                <div id="evaluation_message_de_fin_container">
                    <p id="evaluation_message_de_fin"></p>
                    <div id="evaluation_message_btn_container"> <button id="message_btn_1"></button><button id="message_btn_2"></button> </div>
                </div>

                <div id="message_de_fin_container">
                    <p id="message_de_fin"></p>
                    <div id="message_btn_container"> <button id="message_btn_1"></button><button id="message_btn_2"></button> </div>
                </div>
                
            </div>

            <div class="course_foot" id="evaluation_foot">

                <div id='teste_container'>
                
                    <p id='evaluation_reponse'></p>
                    
                    <div id='check_mark_container'>
                        <p id='check_mark'></p>
                        <p id='check_mark_cover'></p>
                    </div>
                    
                    <div id='teste_annexes_container'>
                        <div id='alerte'></div>
                        <div id='autre'></div>
                    </div>
                </div>

                <div class="clavier_container" id="clavier_evaluation"><?php include "clavier.php"; ?></div>

                <div class="dialogue_btn" id="evaluation_dialogue_btn">
                    <div class="question_btn">
                        <span class="question_label"></span>
                        <span class="question_total"></span> :
                        <span class="question_ordre"></span>
                        <span class="question_action"></span>
                        <span class="question_icon"></span>
                    </div>

                    <div class="repetition_btn">
                        <span class="repetition_label">ߊ߬ ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫</span>
                        <span class="repetition_icon"></span>
                    </div>

                    <div class="correction_btn">
                        <span class="correction_label">ߏ߬ ߛߊߞߍ߫</span>
                        <span class="correction_icon"></span>
                    </div>
                </div>

            </div>
         </div>
      <!--------------------------------------------------------------------------------------------------------------->
        <form method="POST" action="actions.php" id="lesson_form" style="display:none">
                    
            <input type="number" name="id"       id="id_input" value="<?= $_SESSION['id']; ?>">
            <input type="text"   name="matiere"  id="matiere_nom_input">
            <input type="number" name="niveau"   id="niveau_input">
            <input type="text"   name="phase"    id="phase_input">
            <input type="text"   name="lesson"   id="lesson_input">
            <input type="number" name="note"     id="note_input">
            <input type="submit" id="submit_btn" value="Envoyer">
         </form>
      <!--------------------------------------------------------------------------------------------------------------->
        <p class='hand'> &#128070;&#127999; </p>
      <!--------------------------------------------------------------------------------------------------------------->
     </div>

    <audio id="audio"></audio>



	<script src="/kouroukan/fonctions.js"></script>
	<script src="/kouroukan/js/caracteres.js"></script>
    
	<script src="/kouroukan/js/syllabes.js"></script>
	<script src="/kouroukan/js/tons.js"></script>
	<script src="/kouroukan/js/chiffres.js"></script>
	
    <script src="/kouroukan/js/parametres.js"></script>
    <script src="/kouroukan/class-fonctions.js"></script>

    <script src="/kouroukan/js/travaux.js"></script>
    <script src="/kouroukan/js/apprentissage.js"></script>
    <script src="/kouroukan/js/exercices.js"></script>
    <script src="/kouroukan/js/pratiques.js"></script>
    <script src="/kouroukan/js/evaluations.js"></script>
    <script src="/kouroukan/js/lessons.js"></script>
    <script src="/kouroukan/js/alphabet.js"></script>
    
</body>
</html>
<?php
   }else { header("location:programmes.php"); }
?>