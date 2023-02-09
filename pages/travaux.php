<?php header('Content-Type: text/html; charset=utf-8');
session_start();

    if(isset($_SESSION["id"])) {
    }
?>

	<link rel="stylesheet" href="/kouroukan/css/travaux.css"/>

    <div class="travaux">
                
        <div class="travail" id="fiche_d_apprentissage">
            <h3 class="fiche_titre" ><?= $matiere_nom; ?> ߟߊ߬ߓߌ߬ߟߊ߬ߟߌ</h3>
            <div class="fiche" id="fiche_1"></div>
        </div>

        <div class="travail" id="fiche_d_exercice">
            <h3 class="fiche_titre"><?= $matiere_nom; ?> ߡߊ߬ߞߟߏ߬ߟߌ</h3>
            <div class="fiche" id="fiche_2"></div>
        </div>

        <div class="travail" id="fiche_de_pratique">
            <h3 class="fiche_titre"><?= $matiere_nom; ?> ߓߟߏߦߊߟߌ</h3>
            <div class="fiche" id="fiche_3"></div>
        </div>

        <div class="travail" id="fiche_d_evaluation">
            <h3 class="fiche_titre"><?= $matiere_nom; ?> ߞߘߐߓߐߟߌ</h3>
            <div class="fiche" id="fiche_4"></div>
        </div>
        
    </div>
    
    <script src="/kouroukan/js/travaux.js"></script>