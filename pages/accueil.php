<html>
<head>
	<title>accueil</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/accueil.css"/>
</head>
<body>


  
    <div class="container">
        <div class="page_head"><?php require('tete-de-page.php'); ?></div>
        <div class="page_body">
            <div id="reception" align="center">
                
                <p>ߖߐ ߦߴߌ ߡߊ߬ ߞߟߊߓߎߡߊ</p>
                
                <p id="id_user" style="display:none"><?= $_SESSION['id']; ?></p>
                <p id="situations_container" style="display:none"></p>
                <h2><?= $_SESSION['prenom']." ".$_SESSION['nom'];  ?></h2>
                        
              <!----------------------------------------------------------------------------------------------------->  
                <div id="user_info" style="display: none">
                    <div id="identification">
                                                
                        <p id="id"       ><?= $_SESSION['id'       ]; ?></p>
                        <p id="prenom"   ><?= $_SESSION['prenom'   ]; ?></p>
                        <p id="nom"      ><?= $_SESSION['nom'      ]; ?></p>
                        <p id="naissance"><?= $_SESSION['naissance']; ?></p>
                        <p id="sexe"     ><?= $_SESSION['sexe'     ]; ?></p>
                        <p id="adresse"  ><?= $_SESSION['adresse'  ]; ?></p>
                        <p id="email"    ><?= $_SESSION['email'    ]; ?></p>
                    
                    </div>
                    <div id="matieres">
                        <div id="matieres_etudiees"></div>
                        <div id="matiere_active"></div>
                        <div id="matieres_a_etudiees"></div>
                    </div>
                </div>
              <!----------------------------------------------------------------------------------------------------->  
                
                <p>ߌ ߣߌ߫ ߛߣߍ߫ ߞߙߎ߬ߞߊ߲߫ ߘߋ߰ߘߊ ߟߊ߫߸ ߒߞߏ ߟߐ߲ߠߌ ߛߌߟߊ߫ ߛߎߘߎ߲߸ ߓߟߐߟߐ ߛߌߟߊ ߝߍ߬.</p>
                <p>ߞߏ߫ ߛߎ ߦߋ߫ ߞߏ߬ ߟߊ߫ ߛߐ߭ ߟߋ߬ ߡߊ߬߸ ߒ߬ߓߊ߬߹ ߌ ߖߌߖߊ߬ ߸ ߌ ߦߋ߫ ߥߟߊ߬ߘߊ ߕߊ߬ ߌߞߘߐ߫߹ ߦߊ߲߬.</p>
                <p id="affiche_programme">ߥߟߊ߬ߘߊ ߟߎ߬</p>
               
            </div>   
            <div id="programmes_container" class="centerH" align="right"></div>
        </div>
        <div class="page_foot"><?php include("pied-de-lesson.php"); ?></div>
    </div>
    
	
	
	
	
    	<div>
    	
    		<p>ߓߊߘߋ߲ ߠߎ߬߸ ߖߐ ߦߴߊߟߎ߫ ߡߊ߬</p> 
    		<h2>ߊߟߎ߫ ߣߌ߫ ߛߣߍ߫ ߊ߲ ߠߊ߫ ߞߊ߬ߙߊ߲߬ߕߊ ߟߊ߫</h2>    
    		<p>ߦߊ߲߬ ߦߋ߫ ߞߊ߬ߙߊ߲߫ߕߊ ߞߎ߬ߙߎ߬ߞߊ߲߫ ߠߋ߬ ߘߌ߫߸ ߞߊ߬ߙߊ߲߬ߞߍ߬ ߦߐߙߐ ߡߍ߲ ߘߊߦߟߍ߬ߣߍ߲߬ ߛߊ߲ ߡߊ߫߸ ߟߐ߲ߠߌ ߟߊߖߘߌ߫_ߖߌߘߌ ߣߴߊ߬ ߟߊߥߊ߲߬ߞߊ ߞߏߛߐ߲߬ ߒߞߏ߫ ߞߊߙߊ߲ߠߊ ߟߎ߬ ߢߍ߫ </p>   
    		<p>ߒߞߏ ߛߓߍߛߎ߲߫ ߞߊ߲ߡߊߛߙߋߡߊ ߦߋ߫ ߝߊ߲߬ߞߊ߫ ߛߐ߬ߘߐ߲ ߠߋ߬ ߞߊ߲߬ ߟߏ߲ ߓߍ߯. ߊ߬ ߞߊ߬ߙߊ߲߬ߓߊ߮ ߕߊ߲߬ߓߌ߬ ߟߊ߫ ߛߌߦߊߦߊ߫ ߟߊ   ߊߟߊ ߣߌ߫ ߒߞߏ ߞߊ߬ߕߌ߲߬ߓߊ߬ ߓߘߍ ߟߎ߬. ߏ߬ߟߎ߬ ߡߍ߲ ߠߎ߬ ߦߋ߫ ߛߍ߰ߘߏ߲ ߞߊ߲߬ ߊ߬ߟߎ߫ ߝߊ߬ߘߌ߬ ߞߏߟߏ ߣߵߊ߬ߟߎ߬ ߤߊ߲ߞߌߟߌ ߣߵߊ߬ߟߎ߬ ߓߟߏߞߏ ߟߎ߬ ߟߊ߫ ߛߎ߮ ߣߌ߫ ߕߋ߬ߟߋ ߞߏߛߊ߫ ߒߞߏ ߘߌ߫ ߥߊ߫ ߢߍ߫. </p>
    		
    		<div>
    			<table>
    				<tr>
    					<td>ߞߊ߬ ߞߊ߬ߝߊ ߟߎ߬ ߜߌ߬ߙߌ߲߬ߘߌ߬</td>
    				</tr>  
    				<tr>
    					<td>ߞߊ߬ ߝߐ߬ߓߍ ߟߎ߬ ߟߊߘߊ߲߫</td>
    				</tr>
    				<tr>
    					<td>ߞߊ߬ ߜߊ߬ߙߊ ߟߎ߬ ߡߊߞߟߌ߫</td>   
    				</tr>  
    				<tr>
    					<td>ߊ߬ ߣߌ߫ ߏ߬ߟߎ߫ ߢߐ߰ ߜߘߍ߫ ߛߌߦߊߡߊ߲߫</td>
    				</tr>
    			</table>   
    
    			<p>ߊ߲ ߧߴߊ߬ߟߎ߫ ߝߏ߬ ߟߊ߫ ߞߵߊ߬ߟߎ߬ ߞߎߟߎ߲ߖߋ߫ ߞߊ߬ ߡߊ߲߬ߛߊ߬ ߊߟߊ ߘߊߟߌ߫ ߊ߬ ߦߴߊ߲ ߣߴߊ߬ߟߎ߬ ߓߍ߯ ߛߙߊ߬ ߞߏ߬ߢߌߡߊ ߞߍ߫</p>
    			<p>ߞߐ߬ߣߌ߲߬ ߊ߬ߟߎ߬ ߟߊ߫ ߛߍ߱ ߢߌ߲߬ ߠߎ߬ ߓߍ߯ ߞߐ߫߸ ߜߟߍ߬ߦߊ߬ ߘߡߊ߫ ߦߋ߫ ߒߞߏ߫ ߞߊߙߊ߲ߘߋ߲ ߠߎ߬ ߛߐ߬ߘߐ߲߬ ߠߊ߫ ߡߍ߲ ߠߎ߬ ߦߴߊ߬ߟߎ߬ ߞߢߊ߬ ߟߊ߫ ߖߊ߲߬ߝߦߊ߬ ߟߊ߫ ߞߊ߬ߙߊ߲ ߘߐ߫</p>   
    
    			<table>
    				<tr>
    					<td>ߞߊ߫ߝߊ ߟߎ߬ ߟߊߛߐ߬ߘߐ߲ ߜߟߍ߬ߦߊ߬ߣߍ߲߬ ߘߏߣߍ߲߫ ߊ߬ ߞߊ߬ߣߌ߲߬ߓߊ ߘߏߟߎ߫ ߡߊ߬ ߞߵߊ߬ ߞߎ߲߭ ߞߍ߫ ߞߊ߬ߝߊ ߟߎ߬ ߞߍ߫ ߓߊߟߌߦߊ ߘߌ߫ ߞߊ߬ ߦߐߙߐ ߟߎ߬ ߓߍ߯ ߘߓߐ߫ (ߕߎ߬ߡߊ߬ߘߏ߫) <br>ߘߎ߰ ߞߎ߲ߓߊ ߟߎ߬ ߓߐ߯ߕߍ߫ ߞߝߊ߬ ߞߏ ߕߴߊ߬ ߘߓߐߣߍ߲߫ ߘߎ߰ ߡߌߛߍ߲ ߠߎ߬ ߣߌ߫ ߘߎ߰ ߜߎߟߊ߲ ߠߎ߬ ߛߌߦߊߡߊ߲߫ ߠߊ߫</td>
    				</tr>   
    				<tr>
    					<td>ߞߊ߲ߡߊߛߋߙߋ ߟߊ߬ߞߊ߬ߙߊ߲߬ߌ ߕߍ߫ ߢߊ߬ ߟߊ߬ߡߍ߲߬ߠߌ ߞߐ߫. ߒ ߧߴߊ߬ ߝߍ߬ ߞߊ߬ ߡߎ߲߬ ߝߐ߬? ߞߊ߲ߡߊߛߋߦߋ ߞߊ߬ߙߊ߲ ߓߍ߬ߣߍ߲߫ ߠߋ߬ ߌ ߢߊ ߟߐ߬ߣߍ߲߬ ߛߍߓߍ ߘߐ߫ ߊ߱ ߞߊ߬ߙߊ߬ ߠߊ߫ ߌ ߕߟߏ߫ ߞߘߐ߫. ߛߓߍߛߎ߲ ߟߊ߬ߞߊ߬ߙߊ߲߬ߠߌ ߘߐ߫߸ ߣߴߌ ߞߊ߬ ߛߓߍߛߎ߲ ߛߓߍߘߋ߲ ߠߎ߬ ߛߓߍ߫ ߞߵߊ߬ߟߎ߫ ߞߊ߬ߙߊ߲߬ߧߊ ߛߓߍ߫ ߊ߬ߟߎ߬ ߞߘߐ߫ ߛߓߍߛߎ߲߫ ߜߘߍ ߡߍ߲ ߠߎ߬ ߘߐ߫ ߏ߬ߟߎ߬ ߟߐ߲ߠߊ߫ ߞߐߘߐ ߟߎ߬ ߘߌ߫ ߛߴߊ߬ߟߎ߫ ߖߍ߬ߘߍ߫ ߞߊ߬ߙߊ߲߬ ߠߊ߫ ߒߞߏ ߛߓߍߛߎ߲ ߠߊ߫ ߛߍߓߍ ߝߟߍߟߌ ߘߐߙߐ߲߫ ߠߊ߫ ߤߊߟߌ߫ ߣߌ߫ ߞߊ߬ߙߊ߬ߡߐ߬ ߕߴߊ߬ߟߎ߬ ߘߊߝߍ߬ (ߣߴߊ߬ߟߎ߬ ߡߍ߲ ߠߎ߬ ߞߍ߫ ߘߊ߫ ߤߊߞߟߌ߫ ߘߌߡߊ߲߫ ߕߌ߯ ߘߌ߫) </td>
    				</tr>
    			</table>
    		</div>
    	</div>

        <p>
            ߊ߲ ߠߊ߫ ߞߊ߬ߙߊ߲ ߢߍߥߟߊ ߟߎ߬ ߝߟߍ߫ 

            <ul>
                <li>ߛߓߍߛߎ߲ </li>
                <li>ߞߊ߲ߡߊߛߙߋ </li>
                <li>ߞߊ߲ߜߍ</li>
            </ul>
        </p>
    

<script src = "js/accueil.js"></script>

</body>
</html>