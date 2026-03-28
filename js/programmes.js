$('document').ready(function() {

    /*Au click sur l'afficheur du programme 
        1)- On obtient le niveau d'étude de l'apprenant par analyse de sa situation.
        2)- On determine le programme en fonction de ce niveau d'étude.

    -------------------------------------------------------------------------------------------------------------------------*/   

 /* Récupération du niveau d'avancement des études déterminé depuis accueil.js */
    let id_client = JSON.parse(sessionStorage.getItem("id_client"));
    fetch("/kouroukan/api/index.php?id_user="+id_client)
    .then(response => response.json())
    .then(matiere_collection => {  

        datas = matiere_collection;
        datas = (datas == undefined) ? [[],[],[],[]] : datas;
        sessionStorage.setItem("datas",JSON.stringify(datas));

        let matieres_etudiees = matieresEtudiees(datas);
        let matiere_index = 0;

        let option_du_serveur = optionDuServeur();  
        let option_retenue = JSON.parse(localStorage.getItem('option_retenue'));
        option_retenue = (option_retenue == null) ? option_du_serveur : option_retenue;
        localStorage.setItem('option_retenue',JSON.stringify(option_retenue));     

        var phases_etudiees = phasesEtudieesDuServeur(datas);
        let phase_index = (phases_etudiees == null) ? 0 : phases_etudiees.length;
    
console.log("datas");
console.log(datas);
console.log("matieres_etudiees");
console.log(matieres_etudiees);
console.log("Les phases étudiées sont : ");
console.log(phases_etudiees);

    /*-------------------------------------------------------------------------------------------------------------*/
        /* Détermination du Programme */
        var programme_matieres = "";

        profileResulat();
        selectionDuProgramme();
        chargementDuProgramme();
        styleDuProgramme();
        alerteDuProgramme();
        afficherProgrammes();
        lessonOptions();
        mmettreLeFocusSur("#lien_actif");


        function matieresEtudiees(datas) {
            let matieres = [];
            for (let i = 0; i < datas.length; i++) {
                if(datas[i].length === 3) matieres.push(datas[i][0].phase.split("_")[0]);
            }
            return matieres;
        }
        function selectionDuProgramme() { 
            programme_matieres = document.getElementById('programme_matieres'); 
        }
        function chargementDuProgramme() {
        
            programme_matieres.innerHTML = programmeHTML();

            function programmeHTML() {
                var programme_html = '<ul id="programme_ul">\n\n';
                var niveau = matieres_etudiees.length+1;   

                for (var i = 0; i < liste_de_matieres.length; i++) {   // Pour liste_de_matieres, voir caracteres.js

                    var matiere_id = liste_de_matieres[i][0];
                    var matiere_nom = liste_de_matieres[i][1];
                    var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i]);
                    var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&phases_etudiees='+phases_etudiees;

                    if (matiere_index+1 < niveau)  programme_html += '<li id="'+matiere_id+'"><p>'+matiere_nom+'</p></li>\n';
                    if (matiere_index+1 == niveau) programme_html += '<li id="'+matiere_id+'"><p><a href="'+phases_lien+'" id="lien_actif">'+matiere_nom+'</a></p></li>\n';
                    if (matiere_index+1 > niveau)  programme_html += '<li id="'+matiere_id+'"><p>'+matiere_nom+'</p></li>\n';
                }
                programme_html += '\n</ul>';
                
                return programme_html;
            } 
        }          
        function styleDuProgramme() {

            let programme_li = $("#programme_ul li");
            $.each(programme_li, function() {
                let li_actif = $(this);
                let li_idnex = li_actif.index();
                let matiere_nom = li_actif.attr("id");
                
                if(matieres_etudiees.length < 3) {   
                    if(matieres_etudiees.indexOf(matiere_nom) != -1) li_actif.removeClass('a_apprendre actif').addClass('apprises');
                    if(matieres_etudiees.indexOf(matiere_nom) == -1) li_actif.removeClass('apprises actif').addClass('a_apprendre');
                    if(matieres_etudiees.length === li_idnex) li_actif.removeClass('a_apprendre apprises').addClass('actif');
                }
                if(matieres_etudiees.length == 0) {
                    $(this).removeClass('a_apprendre apprises').addClass('a_apprendre');
                    if(matieres_etudiees.length === li_idnex) li_actif.removeClass('a_apprendre apprises').addClass('actif');
                }  
                if(matieres_etudiees.length == 3) $(this).removeClass('actif a_apprendre').addClass('apprises');
            });
            indexer($('.actif p'));
        }
        function afficherProgrammes() { 
            afficher($("#programmes_container")); 
            $("#commentaire_btn").click(() => {
                $("#programme_commentaire").css("display","block");
                $("#commentaire_btn").css("display","none");

            });
            $("#fermeture_de_commentaire").click(() => {
                $("#programme_commentaire").css("display","none");
                $("#commentaire_btn").css("display","block");

            });
        }
        function alerteDuProgramme() {
            $('#programme_ul li').on('click', function(e) {
                if($(this).hasClass('a_apprendre')) { 
                    e.stopImmediatePropagation(); 
                    alert("ߘߊߞߎ߲ ߡߊ߫ ߛߋ߫ ߦߊ߲߬ ߡߊ߫ ߝߟߐ߫");
                }
                if($(this).hasClass('apprises')) { 
                    e.stopImmediatePropagation(); 
                    alert("ߕߊ߲߬ߓߌ߬ ߓߘߊ߫ ߞߍ߫ ߦߊ߲߬ ߘߐ߫ ߞߘߐ߬ߡߊ߲߬"); 
                }
            });
        }
        function lessonOptions() {
            
            let matiere_id = liste_de_matieres[0][0];
            let matiere_nom = liste_de_matieres[0][1];
            let niveau = 1;          

            let libele_du_choix_11 = "<span>߁߭</span> - "+matiere_nom+" ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߮";
            let libele_du_choix_12 = "<span>߂߲</span> - "+matiere_nom+" ߜߘߏߓߊ߫ ߘߋ߲߮"; 
            let option_lien = optionLien();

                
            $("#programme_ul li:nth-child(1)").click(function(e) {
                if(matiere_nom == "ߛߓߍߛߎ߲") {
                    let matiere_index = $(this).index();
                    
                    if(datas[matiere_index] != undefined) {
                        if(option_retenue != null) { location.assign(option_lien); }
                        if(option_retenue == null) {
                            if(datas[matiere_index].length === 0) {
                                e.preventDefault();
                                chargerLesOptions();
                                stockerLOption();
                                afficherLessonOptions();
                            }
                            if(datas[matiere_index].length != 0) {
                                if(datas[matiere_index][phase_index] == undefined) { location.assign(option_lien); }
                                if(datas[matiere_index][phase_index] != undefined) {     
                                    let data_lesson = JSON.parse(datas[matiere_index][phase_index].lesson);
                                    if(tableau2DVide(data_lesson)) {
                                        e.preventDefault();
                                        chargerLesOptions();
                                        stockerLOption();
                                        afficherLessonOptions();
                                    }
                                    if(!tableau2DVide(data_lesson)) { location.assign(option_lien); }
                                }
                            }
                        }
                        mmettreLeFocusSur("#lesson_option_1 a");
                    }
                }
            });

            $("#fermer_lesson_option").click(function() { masquer($("#lesson_options")); }); 
            

            function optionLien() {
                let option_lien_1 = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+0+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&phases_etudiees='+phases_etudiees+'&lesson_option='+option_retenue;
                let option_lien_2 = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+1+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&phases_etudiees='+phases_etudiees+'&lesson_option='+option_retenue;
                let pl = "";
                pl = (niveau == 1) ? option_lien_1 : option_lien_2;
                return pl;
            }
            function chargerLesOptions() {
                let option_html = "";
                if(niveau === 1) {

                    $('#lesson_options_titre').text('ߌ ߢߣߊߕߊ߬ ߛߓߍߛߎ߲ ߘߋ߲߰ߠߌ ߞߍߢߊ߫ ߝߌ߬ߟߊ ߢߌ߲߬ ߠߎ߬ ߘߐ߫'); 
                    $('#lesson_option_1').html(lessonOption1HTML());
                    $('#lesson_option_2').html(lessonOption2HTML());

                    function lessonOption1HTML() {
                        if(matiere_index === 0) option_html = '<a href="'+option_lien+'" id="'+matiere_id+'">'+libele_du_choix_11+'</a>\n\n';
                        return option_html;
                    }
                    function lessonOption2HTML() {
                        if(matiere_index === 0) option_html = '<a href="'+option_lien+'" id="'+matiere_id+'">'+libele_du_choix_12+'</a>\n\n';
                        return option_html;
                    }
                }
            }
            function stockerLOption() {
                $('#lesson_option_1').click(function() {
                    localStorage.removeItem("option_retenue");
                    option_retenue = 1;
                    localStorage.setItem('option_retenue', JSON.stringify(option_retenue));
                });
                $('#lesson_option_2').click(function() {
                    localStorage.removeItem("option_retenue");
                    option_retenue = 2;
                    localStorage.setItem('option_retenue', JSON.stringify(option_retenue));
                });
            }
            function afficherLessonOptions() { afficher($('#lesson_options')); }
        }
        function optionDuServeur() {
            let option = null;
            if(datas[0][0] != undefined) {
                if(JSON.parse(datas[0][0].lesson).length < 27) option = 1;
                if(JSON.parse(datas[0][0].lesson).length == 27) option = 2;
            }
            return option;
        }

    });
});