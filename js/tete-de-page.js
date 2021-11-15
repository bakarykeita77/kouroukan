
var client_lessons_bruts = document.getElementById('client_lessons_bruts');

ajaxGet("/kouroukan/pages/lesson-data.php", function(reponse){
    var client_lessons_objet = JSON.parse(reponse);
    var client_lessons = [];
    
    for(var i=0;i<client_lessons_objet.length;i++) {
        
        var client_lesson = [client_lessons_objet[i].id, client_lessons_objet[i].date, client_lessons_objet[i].id_client, client_lessons_objet[i].niveau, client_lessons_objet[i].lesson];
        client_lesson = client_lesson.join('/');
        
        client_lessons.push(client_lesson);
    }
    
    client_lessons_bruts.innerHTML = client_lessons.join('%');
}, function(){});

