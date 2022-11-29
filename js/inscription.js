
    $("#fermer_inscription").click(function() { $("#inscription_alert_container").css('display','none'); });
    
    function alerteEmailDejaUtiliser() {
        $("#inscription_alert").html("ߜߎ߲߬ߘߎ߬ߕߐ߮ ߢߌ߲߬ ߦߋ߫ ߡߐ߰ ߜߘߍ߫ ߓߟߏ߫ ߦߊ߲߬. ߘߌ߬ߢߍ߬ ߌ ߦߋ߫ ߘߏ߫ ߜߘߍ߫ ߢߌߣߌ߲߫ ߹");
        $("#inscription_alert_container").animate({'width':'16rem'},300);
        setTimeout(function() { $("#inscription_alert_container").animate({'width':0},300); }, 10000);
    }
