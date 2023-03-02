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
                        <div class="travail_titre" ><h3><?= $matiere_nom; ?> ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ</h3> <div class="ordres_de_travail" id="ordre_d_apprentissage"><div class="ordres_glissiere"></div></div></div>
                        <div class="travail_content" id="travail_1">
                            
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
                        <div class="travail_titre" ><h3><?= $matiere_nom; ?> ߡߊ߬ߞߟߏ߬ߟߌ</h3> <div class="ordres_de_travail" id="ordre_d_exercice"><div class="ordres_glissiere"></div></div></div>
                        <div class="travail_content" id="travail_2">
                            
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
                        <div class="travail_titre" ><h3><?= $matiere_nom; ?> ߓߟߏߦߊߟߌ</h3> <div class="ordres_de_travail" id="ordre_de_pratique"><div class="ordres_glissiere"></div></div></div>
                        <div class="travail_content" id="travail_3">
                            
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
                        <div class="travail_titre" ><h3><?= $matiere_nom; ?> ߞߘߐߓߐߟߌ</h3> <div class="ordres_de_travail" id="ordre_d_evaluation"><div class="ordres_glissiere"></div></div></div>
                        <div class="travail_content" id="travail_4">
                           
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
        <div class="course" id="pratique"><?php include("pratiques.php"); ?></div>
      <!--------------------------------------------------------------------------------------------------------------->
        <div class="course" id="evaluation"><?php include("evaluation.php"); ?></div>
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