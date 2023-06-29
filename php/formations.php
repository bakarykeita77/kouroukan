<?php
session_start();
if(isset($_SESSION['prenom'])){
?>
<DOCTYPE html>
<html>

	<head>
		<title>formations</title>
		<meta charset="utf-8"/>
		<link rel="stylesheet" href="/kouroukan/css/formations.css"/>
		<link rel="stylesheet" href="/kouroukan/css/class.css"/>
		<link rel="stylesheet" href="/kouroukan/css/teste.css"/>
	</head>

	<body>
	    
		<div class="container" >
            <?php include "tete-de-page.php"; ?>
    
    		<div id="alphabetisation" >
    		    
    			<div id = "table_de_matieres_container"></div>
    			<div id='phase_div'></div>
    			<div id='lesson_div'><div id='lesson_container'></div></div>
    			<div id='teste_div'><div id='teste_container'>
                	<div id = "teste">
                		<span id = "fermer_teste">&times;</span>
                		<div id="teste_entete"> <p id="titre_teste">ߞߘߐߓߐߟߌ</p><p id = "nivo"></p> </div>
                		<table id='teste_corps'>
                			<tr id='epreuves_btns_container'>
                			
                				<td id = "questionneur">
                					<p id = 'question_titre'> ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬</p>
                					<p id = 'question_qtite'><span id = 'tq'></span>\<span id = 'rq'></span> <span id='ecoute_label'></span></p>
                				</td>	
                				<td id = 'repeteur'>ߒ ߡߴߊ߬ ߡߍ߲߫ ߞߊ߬ ߢߊ߰</td>
                				<td id = 'correcteur'>ߏ߬  ߛߊߞߍ߫</td>
                				<td id = 'afficheur_de_resultat' style='display:none'></td>
                			 </tr>
                			<tr id='epreuves_container'>
                				<td colspan = '2'>
                					<div id = 'epreuves'>
                					    
                					    <div id = 'sujet'>
                						    <p id = 'question'></p>
                						    <p id = 'reponse_teste'></p>
                						</div>
                						
                						<div id = 'correction'>
                    						<div id='felicitation'>
                    							<p id='p1'> &#128077;&#127999; </p>
                    							<p id='p2'> ߌ ߞߎߟߎ߲ߖߋ߫ </p>
                    						</div>
                    						<div id = 'ducourrage'>
                    							<div> <p id = 'a_ecrire'>ߛߓߍߕߊ</p>  <p id = 'ex1'></p> </div>
                    							<div> <p id = 'ecris'>ߛߓߍߣߍ߲</p>    <p id = 'ex2'></p> </div>
                    							<div> <p id = 'resultat_faux'>ߞߋߟߋ߲߫</p> <p id = 'ex3'></p> </div>
                    						</div>
                						</div>
                						
                						<div id='indication'>
                						    <p id='doigt'> &#128070;&#127999; </p>
                						    <p id='guide'>  ߞߘߎ ߣߌ߲߬ ߘߌ߲߯ ߝߟߐ߫ </p>
                						</div>
                
                						<div id="archive_form_container"></div>
                						
                					</div>
                				</td>
                			 </tr>
                			<tr>
                				<td>
                					<div id = 'progress_bar'>
                					    <div id='question_progress_bar'></div>
                					    <div id='bonne_reponse_progress_bar'></div>
                					</div>
                				</td>
                			 </tr>
                			<tr>
                				<td>
                					<div id = 'teste_clavier'> <?php include '/kouroukan/body/clavier.php'; ?> </div>
                				</td>
                			 </tr>
                		</table>
                	</div>
                	
                	<div id='resultat_div'>
                	    <div id='resultat_content'></div>
                	</div>
                    <div id='deliberation_div'></div>
                	<p class = "evaluation_btn">ߞߘߐߓߐߟߌ  </p>	
                	
    			</div></div>
    
    		    <audio autoplay id="audio"></audio>  
    		</div>		
		</div>
		
		<script src="/kouroukan/js/lesson_parametres.js"></script>
		<script src="/kouroukan/js/teste.js"></script>
		<script src="/kouroukan/js/class.js"></script>
		<script src="/kouroukan/js/jquery-3.3.1.js"></script>

	</body>
</html>
<?php
    }else{
        header("location:/kouroukan/index.php");
    }
?>


