<!DOCTYPE html>
<html>
<head>
	<title>dictionnaire</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="css/dictionnaire.css"/>
</head>
<body>
    <?php
	    $noms = array(
	        "ߡߊ߲ߖߎ߬",  "ߓߊߞߊ߬ߙߌ߬",  "ߣߊߡߎ߬",  "ߛߌߘߌ߬",  "ߞߙߊ߬ߡߐ",  "ߝߊ߲ߕߊ߬",
	        "ߛߏ", "ߥߊ߭", "ߓߏ߲", "ߞߊ߬ߙߊ߲߬ߕߊ", "ߝߏ߬ߘߏ", "ߛߍ߬ߣߍ", "ߘߎ߭", "ߛߊ߲",
	        "ߞߐ߭", "ߓߊ", "ߞߐ߲߬ߞߍ", "ߕߌ߲ߘߌ", "ߕߌ߲ߕߌ", "ߞߎ߬ߙߎ", "ߝߊ߬ߙߊ", "ߟߍ",
	        "ߓߊ߭", "ߛߊ߭", "ߣߌ߬ߛߌ", "ߡߌ߬ߛߌ", "ߛߌ߬ߛߍ", "ߛߏ߭", "ߝߊ߬ߟߌ", "ߖߍ", "ߞߐ߬ߣߐ"
	    );
	    $pronoms = array(
		    "ߒ",  "ߌ",  "ߊ߬",  "ߊ߲",  "ߊߟߎ",  "ߊߟߎ߫", "ߊߟߎ߬", "ߊ߬ߟߎ", "ߊ߬ߟߎ߫", "ߊ߬ߟߎ߬",
		    "ߒߠߋ", "ߌߟߋ", "ߌߟߋ߬", "ߊ߬ߟߋ", "ߊ߬ߟߋ߫", "ߊ߬ߟߋ߬", "ߊ߲ߠߎ", "ߊ߲ߠߎ߬", "ߒ߬"
	    );
	    $verbes = array(
		    "ߞߎߡߊ߫",  "ߓߊ߯ߙߊ߫",  "ߡߊ߬ߟߏ߬ߦߊ߬",  "ߛߌߟߊ߲߫",  "ߡߙߌ߫",  "ߓߌ߬ߟߊ߬", "ߥߎߟߌ߫", 
		    "ߕߊ߯ߡߊ߫", "ߕߊ߰ߛߌ߬", "ߛߎߘߊ߲߫", "ߗߌߙߏ߲߫", "ߛߌ߬","ߜߊ߲߫", "ߛߌ߬ߓߏ߬", "ߕߘߍ߬ߒߘߐ߬ߦߊ߬",
		    "ߓߐ߫", "ߘߏ߲߬", "ߓߏ߬ߙߌ߬", "ߦߟߍ߫", "ߣߊ߬", "ߟߊ߯", "ߘߐߡߙߌ߫", "ߤߌߣߊ߫", "ߕߏߟߏ߲߫"
	    );
	    $prepos = array(
		    "ߓߘߊ߫",  "ߡߊ߫",  "ߘߌ߫",  "ߦߋ߫",  "ߟߋ߬",  "ߕߍ߫", "ߕߍߣߊ߬", "ߘߌߣߊ߬", "ߡߣߊ߫", "ߡߊߣߊ߬", "ߞߊ߬", "ߞߊߣߊ߬"
	    );
	    $preps = array(
		    "ߘߊ߫",  "ߟߊ߫"
	    );
	    
	    
	    
	    
    ?>
    
	<table class="dictionnaire" id="table_noms">
		<tr><th>ߕߐ߮</th></tr>
	    <?php foreach($noms as $nom): ?>
	        <tr> 
		        <td><?= $nom ?></td> 
		      <!--  <td><?= $nom ?></td> -->
	        </tr>
	    <?php endforeach; ?>
	</table>
    
	<table class="dictionnaire" id="table_pronoms">
		<tr><th>ߕߐ߮ ߣߘߐ߬ߓߌߟߊ</th></tr>
	    <?php foreach($pronoms as $pronom): ?>
	        <tr> 
		        <td><?= $pronom ?></td> 
		       <!-- <td><?= $pronom ?></td> -->
	        </tr>
	    <?php endforeach; ?>
	</table>

	<table class="dictionnaire" id="table_verbes">
		<tr><th>ߞߎߡߊߛߓߏ</th></tr>
	    <?php foreach($verbes as $verbe): ?>
	        <tr> 
		        <td><?= $verbe ?></td> 
		       <!-- <td><?= $verbe ?></td> -->
	        </tr>
	    <?php endforeach; ?>
	</table>

	<table class="dictionnaire" id="table_prepos">
		<tr><th>ߓߛߏߟߊ߲</th></tr>
	    <?php foreach($prepos as $prepo): ?>
	        <tr> 
		        <td><?= $prepo ?></td> 
		       <!-- <td><?= $prepo ?></td> -->
	        </tr>
	    <?php endforeach; ?>
	</table>

	<table class="dictionnaire" id="table_preps">
		<tr><th>ߞߎ߲߬ ߞߎߘߎ߲</th></tr>
	    <?php foreach($preps as $prep): ?>
	        <tr> 
		        <td><?= $prep ?></td> 
		       <!-- <td><?= $prep ?></td> -->
	        </tr>
	    <?php endforeach; ?>
	</table>

	<script src="js/dictionnaire.js" type="text/javascript"></script>
</body>
</html>