
<html>
<head>
	<title>inscriptions</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/class.css"/>
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/inscription.css"/>
</head>
<body>
    
    <div class="cover">
    	<div id="inscription_form">
    		
    		<h2>ߕߐ߯ߛߓߍ߫ ߥߟߊ</h2>
    		
    		<form action="http://localhost:8080/kouroukan/pages/actions.php" method="POST" id="formulaire_de_connexion">
    			
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="prenom" class="inscription_input" id="prenom" required />
    				<label>ߕߐ߮</label>
    			</div>
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="nom" class="inscription_input" id="nom" required />
    				<label>ߖߊ߬ߡߎ߲</label>
    			</div>
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="naissance" class="inscription_input" id="naissance" required />
    				<label>ߡߐߦߌߕߎߡߊ</label>
    			</div>
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="sexe" class="inscription_input" id="sexe" required />
    				<label>ߖߊ߲߭</label>
    			</div>
    			<div class="input_box">
    				<input type="text" autocomplete="off" name="adresse" class="inscription_input" id="adresse" required />
    				<label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label>
    			</div>
    			<div class="input_box">
    				<input type="email" autocomplete="off" name="email" class="inscription_input" id="email" required />
    				<label>E-mail</label>
    			</div>
    			<div class="input_box">
    				<input type="password" autocomplete="off" name="pass" class="inscription_input" id="client_pass" required />
    				<label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label>
    			</div>
    			<div id="button_box">
    				<input type="submit" name="submit" id="inscription_btn" value="ߕߐ߯ߛߓߍߟߌ ߞߍ߫"/>
    			</div>
    		</form>

    		 <p class="error_message" align="center"><?php if(isset($error)){ echo $error; } ?></p>
    	</div>
	</div>
</body>
</html>