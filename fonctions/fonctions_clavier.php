<script type="text/javascript">

	var td = $('#clavier_nko td');
	var son = $('#audio');
	var source_son = "";
	var caractere = "";
	var lettre = "";
	
	
	// Bouton pour masquer le clavier
		$('#fermer_clavier').on('click', function() { fermer( clavier ); });
		$('#tableau_noir').on('click', function() { afficher( clavier ); });
	
	function activerSonDuClavier() {
		$('#clavier_nko td').on('click',function(){
			lettre = $(this).attr('id');
			source_son = 'son/mp3/'+lettre+'.mp3';
			son.attr({src: source_son, autoplay: "on"});
		});
	}

	function prononcer(){
		id=this.id;
	
		son.src = "son/mp3"+id+".mp3";
		son.src = "son/ogg"+id+".ogg";
		son.src = "son/mp4"+id+".mp4";
		
		son.play();
	}

</script>