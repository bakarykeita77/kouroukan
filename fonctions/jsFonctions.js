
(function lecturePersonnalisee() {
    $('.table_parlante').on('click', function(e) {
        var td = $('.table_parlante td');
        var td_actif = e.target;
        var td_actif_value = td_actif.textContent;

        $('#audio').attr({ src: 'http://localhost:8080/kouroukan/son/mp3/'+td_actif_value+'.mp3', autoplay: 'on' });

        /*Animation de td lors de lecture*/
        $(td_actif).addClass('ombrage');
        setTimeout(function() { $(td_actif).removeClass('ombrage'); }, 600);
    });
 })();
function lectureAutomatique() {

    var td = $('.table_parlante td');

    var read_events = [];
    var td_delay = '';
    var td_index = -1;

    for (i = 0; i < td.length; i++) {
        td_delay = 0;
        read_events[read_events.length] = setTimeout((function() {
            td[td_index += 1].click();
        }), td_delay += i*2000)+'\n';
    }

 }

