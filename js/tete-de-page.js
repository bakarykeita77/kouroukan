$(document).ready(function(){
    
    ajaxGet("/kouroukan/pages/lesson-data.php", function(response){
        var lessons_data = JSON.parse(response);
     //   var client_lessons_bruts_container = document.getElementById('#client_lessons_bruts_container');
        var lessons_brutes = [];
        
        for (var i = 0; i < lessons_data.length; i++) {
            
            var id = lessons_data[i].id;
            var date = lessons_data[i].date;
            var id_client = lessons_data[i].id_client;
            var niveau = lessons_data[i].niveau;
            var lesson = lessons_data[i].lesson;
            
            var lesson_brute = [id, date, id_client, niveau, lesson];
            lesson_brute = lesson_brute.join('/');
            
            lessons_brutes.push(lesson_brute); 
        }
     
        document.getElementById('client_lessons_bruts_container').innerHTML = lessons_brutes.join('%');
    }, function(){});
    
});