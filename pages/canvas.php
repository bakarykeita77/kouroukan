<!DOCTYPE html>
<html>
    <head>
        <title>icones</title>
        <meta charset = "utf-8"/>
        <style>#ex0, #ex1, #ex2, #ex3, #ex4, #ex5, #ex6, #ex7, #ex8, #ex9{ background: #eee; height:32px; width:100px; display:block; margin-right:100px; border:1px solid #fff;}</style>
    </head>
    <body>
        
     <!--   <canvas id='cadena_ouvert0' height='24px' width='24px'></canvas>
        <canvas id='cadena_ouvert1' height='24px' width='24px'></canvas>
        <canvas id='cadena_ouvert2' height='24px' width='24px'></canvas>
        <canvas id='cadena_ouvert3' height='24px' width='24px'></canvas>
        <canvas id='cadena_ouvert4' height='24px' width='24px'></canvas>
        <canvas id='cadena_ouvert5' height='24px' width='24px'></canvas>
        <canvas id='cadena_ouvert6' height='24px' width='24px'></canvas>
        <canvas id='cadena_ouvert7' height='24px' width='24px'></canvas>
        <canvas id='cadena_ouvert8' height='24px' width='24px'></canvas>
        <canvas id='cadena_ouvert9' height='24px' width='24px'></canvas>
        
        <canvas id='cadena_ferme0' height='24px' width='24px'></canvas>
        <canvas id='cadena_ferme1' height='24px' width='24px'></canvas>
        <canvas id='cadena_ferme2' height='24px' width='24px'></canvas>
        <canvas id='cadena_ferme3' height='24px' width='24px'></canvas>
        <canvas id='cadena_ferme4' height='24px' width='24px'></canvas>
        <canvas id='cadena_ferme5' height='24px' width='24px'></canvas>
        <canvas id='cadena_ferme6' height='24px' width='24px'></canvas>
        <canvas id='cadena_ferme7' height='24px' width='24px'></canvas>
        <canvas id='cadena_ferme8' height='24px' width='24px'></canvas>
        <canvas id='cadena_ferme9' height='24px' width='24px'></canvas>
        <div id='ex0'></div>
        <div id='ex1'></div>
        <div id='ex2'></div>
        <div id='ex3'></div>
        <div id='ex4'></div>
        <div id='ex5'></div>
        <div id='ex6'></div>
        <div id='ex7'></div>
        <div id='ex8'></div>
        <div id='ex9'></div>
    -->
        
        <script>
            var cadenas_ouverts='';
            (function generationCadenasOuverts(){
                for(i=0;i<16;i++){
                    var cadena_ouvert_id = 'cadena_ouvert_'+i;
                    var cadena_ouvert_fourreau = 'cadena_ouvert_fourreau_'+i;
                    
                    cadenas_ouverts += "<div id='"+cadena_ouvert_fourreau+"'>"+'\n';
                        cadenas_ouverts += "<canvas id='"+cadena_ouvert_id+"' height='24px' width='24px' style='border:1px solid orange;'></canvas>"+'\n';
                    cadenas_ouverts += "</div>"+'\n\n';
                }
            })();
        

        function cadena_ferme(){
            var canvas = document.getElementById('cadena_ferme');
            var ctx = canvas.getContext('2d');
            ctx.fillstyle = 'black';
            
            ctx.fillRect(0, 12, 16, 12);
            ctx.stroke();
            
            ctx.moveTo(3, 12);
            ctx.lineTo(3, 8);
            ctx.stroke();
            
            ctx.moveTo(11, 12);
            ctx.lineTo(11, 8);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(8,8,5,Math.PI,2*Math.PI);
            ctx.stroke();
        }

        (function cadenaOuvert0(){
            var canvas = document.getElementById('cadena_ouvert_0');
            var ctx = canvas.getContext('2d');
            ctx.fillstyle = 'black';
            
            ctx.fillRect(0, 12, 16, 12);
            ctx.stroke();
            
            ctx.moveTo(11, 12);
            ctx.lineTo(11, 6);
            ctx.stroke();
                        
            ctx.moveTo(21, 6);
            ctx.lineTo(21, 10);
            ctx.stroke();
            

            ctx.beginPath();
            ctx.arc(16,6,5,Math.PI,2*Math.PI);
            ctx.stroke();
        })();
        (function cadena_ouvert1(){
            var canvas = document.getElementById('cadena_ouvert1');
            var ctx = canvas.getContext('2d');
            ctx.fillstyle = 'black';
            
            ctx.fillRect(0, 12, 16, 12);
            ctx.stroke();
            
            ctx.moveTo(11, 12);
            ctx.lineTo(11, 6);
            ctx.stroke();
                        
            ctx.moveTo(21, 6);
            ctx.lineTo(21, 10);
            ctx.stroke();
            

            ctx.beginPath();
            ctx.arc(16,6,5,Math.PI,2*Math.PI);
            ctx.stroke();
        })();
        (function cadena_ouvert2(){
            var canvas = document.getElementById('cadena_ouvert2');
            var ctx = canvas.getContext('2d');
            ctx.fillstyle = 'black';
            
            ctx.fillRect(0, 12, 16, 12);
            ctx.stroke();
            
            ctx.moveTo(11, 12);
            ctx.lineTo(11, 6);
            ctx.stroke();
                        
            ctx.moveTo(21, 6);
            ctx.lineTo(21, 10);
            ctx.stroke();
            

            ctx.beginPath();
            ctx.arc(16,6,5,Math.PI,2*Math.PI);
            ctx.stroke();
        })();

        </script>
    </body>
</html>