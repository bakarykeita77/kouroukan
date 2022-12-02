 
    function chargerNote() {
        $('#note_inscription_success').html("ߌ ߞߎߟߎ߲ߖߋ߫. ߕߐ߯ߛߓߍߟߌ ߢߊ߬ߣߍ߲߬. ߛߌߛߊ߲߬ ߌ ߘߌ߫ ߛߋ߫ ߞߵߌ ߜߊ߲߲߬ߞߎ߲߬.");
        $("#note_inscription").html("ߜߎ߲߬ߘߎ߬ߕߐ߮ ߢߌ߲߬ ߦߋ߫ ߡߐ߰ ߜߘߍ߫ ߓߟߏ߫ ߦߊ߲߬. ߘߌ߬ߢߍ߬ ߌ ߦߋ߫ ߘߏ߫ ߜߘߍ߫ ߢߌߣߌ߲߫ ߹");
        $('#note_connexion').html("ߌ ߜߎ߲߬ߘߎ߬ߕߐ߮ ߡߊ߫ ߛߓߍ߫ ߞߊ߬ ߢߊ߬߸ ߥߟߊ ߊ߬ ߟߊߞߎ߲߬ߘߎ߬ߣߍ߲߬ ߕߍ߫ ߦߊ߲߬. ߏ߬ߘߐ߬߹ ߌ ߜߎ߲߬ߘߎ߬ߕߐ߮ ߛߓߍ߫ ߞߏ߫ ߞߎߘߊ߫߸ ߥߟߊ ߌ ߦߋ߫ ߛߍ߬ߦߌ߬ ߕߐ߯ߛߓߍߟߌ ߡߊ߬.");
        
    }
    function afficherNote() {
        $('.note_container').css({'display':'block'});
        $('.note_container').animate({'width':'20rem'},500);
    }
    function cacherNote() {
        $('.note_container').animate({'width':0},500);
        setTimeout(function() { $('.note_container').css({'display':'none'}); },500);
    }
    function masquerNote() {
        $('.fermeture_note_btn').click(function() { cacherNote(); });
    }
    function autoMasquerNote() {
        setTimeout(function() { cacherNote(); }, 10000);
    }
    function notifier() {
        chargerNote(); 
        afficherNote();
        masquerNote();
        autoMasquerNote();
    }
