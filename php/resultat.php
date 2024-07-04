
<div class="resultat_container">

    <span id='fermer_resultat'>&times;</span>

    <div class="resultat">
     <!--------------------------------------------------------------------------------------------------------------------------------------------->
        <div id="resultat_entete">
           
            <table>
                <tr><td><h2 id="resultat_titre"></h2></td></tr>
                <tr><td><b id="etudiant"></b> ߓߟߏ߫</td></tr>
                <tr><td>ߞߍ߫ ߕߎߡߊ :__📅 <span id="resultat_date"></span> __🕒 <span id="resultat_heure"></span></td></tr>
            </table>
        </div>
     <!--------------------------------------------------------------------------------------------------------------------------------------------->
        <hr>
        <div id="resultat_corps">
            <table id="table_head">
                <tr><td>ߝߙߍߕߍ</td></tr>
                <tr><td>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ</td></tr>
                <tr><td>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ</td></tr>
                <tr><td>ߓߍ߬ߙߍ</td></tr>
            </table>
            <table id="table_body"></table>
            <table id="table_foot">
                <tr><td id="total">ߡߎ߬ߡߍ</td></tr>
                <tr><td id="total_question_1"></td></tr>
                <tr><td id="total_reponse"></td></tr>
                <tr><td id="total_point_1"></td></tr>
            </table>
        </div>
     <!--------------------------------------------------------------------------------------------------------------------------------------------->
        <hr>
        <div id="resultat_pied">
            <div>
                <div><span>ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ ߡߎ߬ߡߍ</span> <span id="total_question_2"></span></div>
                <div><span>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ߫ ߢߊ߬ߣߍ߲</span> <span id="total_bonne_reponse"></span></div>
                <div><span>ߟߊ߬ߡߌ߬ߘߊ߬ߟߌ߬ ߝߏߣߍ߲</span><span id="total_fausse_reponse"></span></div>
                <div><span>ߓߍ߬ߙߍ ߡߎ߬ߡߍ</span>   <span id="total_point_2"></span></div>
                <div><span>ߓߍ߬ߙߍ ߗߡߍ߬ߘߐ߬ߦߊ</span> <span id="pourcentage_point"></span></div>
            </div>
        </div>
     <!--------------------------------------------------------------------------------------------------------------------------------------------->
        <hr>
        <div id="deliberation"></div>
     <!--------------------------------------------------------------------------------------------------------------------------------------------->
     </div>
</div>


<style>
    #fermer_resultat {
        position: absolute;
        top: 0;
        left: 0;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        margin: 0.5rem;
        text-align: center;
        background-color: #ccc;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
        overflow: auto;
    }
    #resultat_titre { 
        margin: 0 0 0.25rem 0; 
    }
    #resultat_entete, #resultat_corps, #resultat_pied, #deliberation {
        height: max-content;
        border: 1px solid transparent;
        max-width: 30rem;
        margin: 0.5rem auto;
    }
    #resultat_entete table { width: 100%; }
    #resultat_entete table h2 { border: 1px solid #aaa; border-bottom-width: 4px; padding: 0.25rem; }
    #resultat_corps table {
        border: 1px solid #aaa;
        height: max-content;
        display: inline-block;
        vertical-align: top;
        margin: 0;
    }
    #table_head td, #table_foot td {
        border: 1px solid transparent;
        height: 1rem;
        background-color: #ddd;
        padding: 0 0.5rem;
        box-sizing: border-box;
    }
    #table_head td { width: 5rem; }
    #table_foot td { width: 3rem; text-align: left; }
    #table_head { width: 5.25rem; }
    #table_foot { width: 3.85rem; }
    #table_body {
        background-color: #eee;
        max-width: calc(100% - 10rem);
        overflow: auto
    }
    #table_body td {
        height: 1.32rem;
        min-width: 1.5rem;
        text-align: center;
        border-color: #fff;
        border-radius: 0.5rem;
        background-color: #fff;
    }
    #resultat_pied{
        width: max-content;
        height: max-content;
    }
    #resultat_pied > div {
        width: 100%;
        max-width: 16rem;
    }
    #resultat_pied > div > div {
        border: 1px solid transparent;
        border-bottom-color: #aaa;
        padding: 2px 2px 2px 8px;
        height: 1.3rem;
    }
    #resultat_pied span { 
        display: inline-block; 
        height: 1rem;
        line-height: 1rem;
    }
    #resultat_pied span:first-child { 
        text-align: right;
        border: none;
        min-width: 8rem;
        padding: 0 0.5rem;
    }
    #resultat_pied span:last-child { 
        border: 2px solid #aaa; 
        min-width: 2.5rem; 
        text-align: left;
        padding: 0 1rem; 
        float: left;
    }
    #deliberation {
        padding: 0.5rem;
        background-color: #ccc;
    }
    #redirige_sur_alphabet_exercice, #redirige_sur_alphabet_revision {
        color: cornflowerblue;
        text-decoration: underline;
        cursor: pointer;
    }

    @media screen and (width < 600px) {
        
        #resultat_entete, #resultat_corps, #resultat_pied { width: 100%; }
    }
    @media screen and (width >= 600px) {

        #resultat_entete, #resultat_corps, #resultat_pied { width: 60%; }
    }

</style>