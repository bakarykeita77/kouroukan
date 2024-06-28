
	<link rel="stylesheet" href="/kouroukan/css/exercice.css"/>

	<div class="course_container">
		<!--Course head ------------------------------------------------------------------ -->
		<div class="course_head" id="apprentissage_head">
			<div class="notification">
				<h2 class="notification_titre"></h2>
				<div class="notification_corps"></div>
			</div>
		</div>
		<!--Course body ------------------------------------------------------------------ -->
		<div class="course_body" id="exercice_body"></div>   <!--Cette division est chargé par la fonction chargerExercice() dans exeercice.js-->
		<!--Course foot ------------------------------------------------------------------ -->
		<div class="course_foot" id="pre_foot">

			<div class="dialogue_btn" id="exercice_dialogue_btn">
				<div class='play_icon_container' id='exercices_player'>
					<span class='play_label' id='exercice_play_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ </span>
					<span class='qtite_question'></span>
					<span>\</span>
					<span class='ordre_question'></span>
					<span class='ecouter_question'> ߟߊߡߍ߲߫</span>
				</div>
				<div class='oreille_icon_container'>
					<span class='reecoute_label'>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ <span id="question_rang"></span> ߟߊߡߍ߲߫ ߕߎ߯ߣߌ߫  </span> 
					<span class='oreille_icon'>&#128066;</span>
				</div>
			</div>
			

			<div class = 'progress_bar' id = "exercice_progress_bar">
				<div class='progress_bonne_reponse_bar'></div>
				<div class='progress_mauvaise_reponse_bar'></div>
			</div>

		</div>
		<!--Fin course ------------------------------------------------------------------- -->
	</div>

    <script src="/kouroukan/js/exercice.js"></script>