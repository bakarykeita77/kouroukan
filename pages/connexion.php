
<!DOCTYPE html>
<html>
<head>
	<title>connexion</title>
 	<meta charset="utf-8" name="viewport"/>
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/connexion.css"/>
	<link rel = "stylesheet" href = "http://localhost:8080/kouroukan/css/class.css"/>
</head>
<body>
    
    <div class="cover">
      <!----------------------------------------------------------------------------------------------------->  
        <div id = "connexion_form">
    		<h2>ߜߊ߲߬ߞߎ߲߬ߥߟߊ</h2>
    		
    		<form action="http://localhost:8080/kouroukan/pages/accueil.php" method="POST" id="formulaire_de_connexion">
    			<div class="input_box">
    				<input type="email" autocomplete="off" name="client_email" class="connexion_input" id="client_email">
    				<label>Email</label>
    			</div>
    			<div class="input_box">
    				<input type="password" autocomplete="off" name="client_pass" class="connexion_input" id="client_pass">
    				<label>ߜߎ߲߬ߘߎ߬ߕߐ߮</label>
    			</div>
    			<div id="button_box">
    				<input type="submit" name="submit" id="connexion_btn" value="ߊ߬ߟߎ߬ ߟߥߊ߫"/>
    			</div>
    		</form>
    	</div>
	</div>
	
	<script>
	
	    var input = document.querySelectorAll(".connexion_input");
	    input.innerHRML = "";
	    
	    input.forEach(function(item){
			const list = item.parentElement.classList;
	        
	        item.addEventListener("focus", function(){
	            list.add("box_anime");
	        });
	        item.addEventListener("blur", function(){
	            if(item.innerHTML=='')
	            { list.remove("box_anime"); }
	        });

	    });
	
	</script>
	
</body>
</html> 