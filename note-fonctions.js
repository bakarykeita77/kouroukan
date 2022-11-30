
    function chargerNote() {
        $('#note_inscription_success').html("ߌ ߞߎߟߎ߲ߖߋ߫. ߕߐ߯ߛߓߍߟߌ ߢߊ߬ߣߍ߲߬. ߛߌߛߊ߲߬ ߌ ߘߌ߫ ߛߋ߫ ߞߵߌ ߜߊ߲߲߬ߞߎ߲߬.");
        $("#note_inscription").html("ߜߎ߲߬ߘߎ߬ߕߐ߮ ߢߌ߲߬ ߦߋ߫ ߡߐ߰ ߜߘߍ߫ ߓߟߏ߫ ߦߊ߲߬. ߘߌ߬ߢߍ߬ ߌ ߦߋ߫ ߘߏ߫ ߜߘߍ߫ ߢߌߣߌ߲߫ ߹");
    }
    function afficherNote() {
        $('.note_container').animate({'width':'20rem'},500);
    }
    function masquerNote() {
        $('.fermeture_note_btn').click(function() { $('.note_container').animate({'width':0},500); });
    }
    function autoMasquerNote() {
        setTimeout(function() { $('.fermeture_note_btn').click(); }, 10000);
    }
    function notifier() {
        chargerNote(); 
        afficherNote();
        masquerNote();
        autoMasquerNote();
    }