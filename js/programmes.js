$('document').ready(function() {
        
    /*Au click sur l'afficheur du programme 
        1)- On obtient le niveau d'étude de l'apprenant par analyse de sa situation.
        2)- On determine le programme en fonction de ce niveau d'étude.

    -------------------------------------------------------------------------------------------------------------------------*/   

 /* Récupération du niveau d'avancement des études déterminé depuis accueil.js */
    let datas = JSON.parse(sessionStorage.getItem('datas'));
    var niveaux_etudies = JSON.parse(sessionStorage.getItem('niveaux_etudies'));
    var niveau_max = JSON.parse(sessionStorage.getItem('niveau_max'));
    var niveau_en_cours = JSON.parse(sessionStorage.getItem('niveau_en_cours'));
    var matiere_index = niveau_en_cours - 1;
    var matiere_nouvellement_apprise_du_serveur = matiereNouvellementAppriseDuServeur();
    matiere_nouvellement_apprise_du_serveur = (matiere_nouvellement_apprise_du_serveur == undefined) ? "" : matiere_nouvellement_apprise_du_serveur;
    var matiere_nouvellement_apprise = JSON.parse(sessionStorage.getItem('matiere_nouvellement_apprise'));
    matiere_nouvellement_apprise = (matiere_nouvellement_apprise == null) ? matiere_nouvellement_apprise_du_serveur : matiere_nouvellement_apprise;
    let data_apprentissage_alphabet = JSON.parse(sessionStorage.getItem('data_apprentissage_alphabet'));
    let option_du_serveur = optionDuServeur();       

    datas[niveau_max] = (datas[niveau_max] == undefined) ? [] : datas[niveau_max];

    var phases_etudiees = (datas[niveau_max].length == 0) ? [] : JSON.parse(sessionStorage.getItem('phases_etudiees'));
    var phases_etudiees_du_serveur = (datas[niveau_max].length == 0) ? [] : phasesEtudieesDuServeur(datas[niveau_max]);
    phases_etudiees = (phases_etudiees == null) ? phases_etudiees_du_serveur : phases_etudiees;
    let phase_index = (phases_etudiees == null) ? 0 : phases_etudiees.length;
    var option_retenue = JSON.parse(localStorage.getItem('option_retenue'));
    option_retenue = (option_retenue == null) ? option_du_serveur : option_retenue;
    localStorage.setItem('option_retenue',JSON.stringify(option_retenue));
    console.log(option_retenue);

    // localStorage.clear();

    /*-------------------------------------------------------------------------------------------------------------*/

    /* Détermination du Programme */
    var programme_matieres = '';

    profileResulat();
    selectionDuProgramme();
    chargementDuProgramme();
    styleDuProgramme();
    alerteDuProgramme();
    afficherProgrammes();
    lessonOptions();
    storagesDuProgramme();

    function matiereNouvellementAppriseDuServeur() {
        let matieres_apprises = [];

        if(datas[0] != undefined) if(datas[0].length === 3) if(datas[0][0] != undefined) if(datas[0][0].phase.split("_")[0] == "alphabet") matieres_apprises.push("ߛߓߍߛߎ߲");
        if(datas[1] != undefined) if(datas[1].length === 4) if(datas[1][0] != undefined) if(datas[1][0].phase.split("_")[0] == "syllabe") matieres_apprises.push("ߜߋ߲߭");
        if(datas[2] != undefined) if(datas[2].length === 4) if(datas[2][0] != undefined) if(datas[2][0].phase.split("_")[0] == "ton") matieres_apprises.push("ߞߊ߲ߡߊߛߙߋ");
        if(datas[3] != undefined) if(datas[3].length === 4) if(datas[3][0] != undefined) if(datas[3][0].phase.split("_")[0] == "chiffre") matieres_apprises.push("ߖߊ߰ߕߋ߬ߘߋ߲");

        return matieres_apprises[matieres_apprises.length - 1];
    }
    function selectionDuProgramme() { 
        programme_matieres = document.getElementById('programme_matieres'); 
    }
    function chargementDuProgramme() {
    
        programme_matieres.innerHTML = programmeHTML();

        function programmeHTML() {
            var programme_html = '<ul id="programme_ul">\n\n';

            for (var i = 0; i < liste_de_matieres.length; i++) {    // Pour liste_de_matieres, voir caracteres.js

                var matiere_id = liste_de_matieres[i][0];
                var matiere_nom = liste_de_matieres[i][1];
                var matiere_index = liste_de_matieres.indexOf(liste_de_matieres[i]);
                var niveau = matiere_index+1;   
           
                if(niveau_max === 0) {
                    var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max;
                    
                    if(matiere_index === 0) programme_html += '<li id="'+matiere_id+'"><p><a href="'+phases_lien+'">'+matiere_nom+'</a></p></li>\n';
                    if(matiere_index  >  0) programme_html += '<li id="'+matiere_id+'"><p>'+matiere_nom+'</p></li>\n';
                }
                
                if(niveau_max > 0) {
                    
                    var phases_lien = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+matiere_index+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&phases_etudiees='+phases_etudiees;

                    if (matiere_index < niveau_max) {
                        programme_html += '<li id="'+matiere_id+'"><p>'+matiere_nom+'</p></li>\n';
                    }
                    if (niveau_max == matiere_index) {
                        programme_html += '<li id="'+matiere_id+'"><p><a href="'+phases_lien+'">'+matiere_nom+'</a></p></li>\n';
                    }
                    if (matiere_index > niveau_max) {
                        programme_html += '<li id="'+matiere_id+'"><p>'+matiere_nom+'</p></li>\n';
                    }
                }
            }
            programme_html += '\n</ul>';
            
            return programme_html;
        } 
    }          
    function styleDuProgramme() {
        
        // if(niveau_max > niveau_en_cours) niveau_max = niveau_en_cours;
        let programme_li = $("#programme_ul li");
        if(matiere_nouvellement_apprise != null) {   
            $.each(programme_li, function() {
                let li_actif = $(this);
            
                if(li_actif.text() == matiere_nouvellement_apprise) {
                    $('#programme_ul li').removeClass('apprises actif').addClass('a_apprendre');
                    li_actif.prev().removeClass('a_apprendre').addClass('apprises');
                    li_actif.removeClass('a_apprendre').addClass('apprises');
                    li_actif.next().removeClass('a_apprendre').addClass('actif');
                }
            });
        } 
        if(matiere_nouvellement_apprise == "") {
            $.each(programme_li, function() {
                let matiere_index = $(this).index();
                if(niveau_max === 0) {
                    if(matiere_index === 0) $(this).addClass("actif");
                    if(matiere_index  >  0) $(this).addClass("a_apprendre");
                }
                if(niveau_max > 0) {
                    if($.inArray(matiere_index+1,niveaux_etudies) != -1) $(this).addClass("apprises");
                    if($.inArray(matiere_index+1,niveaux_etudies) === -1) $(this).addClass("a_apprendre");
                    if(matiere_index+1 === niveau_en_cours) $(this).removeClass("a_apprendre").addClass("actif");
                }
            });
        } 
        indexer($('.actif p'));
    }
    function afficherProgrammes() { afficher($("#programmes_container")); }
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
        
        let matiere_id = (niveau_en_cours == 1) ? liste_de_matieres[0][0] : liste_de_matieres[1][0];
        let matiere_nom = (niveau_en_cours == 1) ? liste_de_matieres[0][1] : liste_de_matieres[1][1];
        let niveau = (niveau_en_cours == 1) ? 1 : 2;          

        let libele_du_choix_11 = "<span>߁߭</span> - "+matiere_nom+" ߘߏߣߍ߲߫ ߘߏߣߍ߲߫ ߘߋ߲߮";
        let libele_du_choix_12 = "<span>߂߲</span> - "+matiere_nom+" ߜߘߏߓߊ߫ ߘߋ߲߮"; 
        let option_lien = optionLien();

            
        $("#programme_ul li:nth-child(1)").click(function(e) {
            if(matiere_nom == "ߛߓߍߛߎ߲") {
                let matiere_index = $(this).index();
                if(datas[matiere_index] != undefined) {
                    if(option_retenue != null) {
                        $(".page_body").css("display","none");
                        location.assign(option_lien);
                    }
                    if(option_retenue == null) {
                        if(datas[matiere_index].length === 0) {
                            e.preventDefault();
                            $('.page_body').css("display","none");
                            chargerLesOptions();
                            stockerLOption();
                            afficherLessonOptions();
                        }
                        if(datas[matiere_index].length != 0) {
                            if(datas[matiere_index][phase_index] == undefined) { 
                                $(".page_body").css("display","none");
                                location.assign(option_lien); 
                            }
                            if(datas[matiere_index][phase_index] != undefined) {     
                                let data_lesson = JSON.parse(datas[matiere_index][phase_index].lesson);
                                if(tableau2DVide(data_lesson)) {
                                    e.preventDefault();
                                    $('.page_body').css('display','none');
                                    chargerLesOptions();
                                    stockerLOption();
                                    afficherLessonOptions();
                                }
                                if(!tableau2DVide(data_lesson)) {
                                    $('.page_body').css('display','none');
                                    location.assign(option_lien);
                                }
                            }
                        }
                    }
                }
            }
        });

        $("#fermer_lesson_option").click(function() { masquer($("#lesson_options")); }); 
        

        function optionLien() {
            let option_lien_1 = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+0+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&lesson_option='+option_retenue;
            let option_lien_2 = 'lesson.php?matiere_id='+matiere_id+'&matiere_index='+1+'&matiere_nom='+matiere_nom+'&niveau='+niveau+'&niveau_max='+niveau_max+'&phases_etudiees='+phases_etudiees+'&lesson_option='+option_retenue;
            let pl = '';
            pl = (niveau_max == 0) ? option_lien_1 : option_lien_2;
            return pl;
        }
        function chargerLesOptions() {
            let option_html = '';
            if(niveau_max === 0) {

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
        /* Si datas[0].length est différent de 0 cela veut dire que la leçon est étudiée par étapes donc option retenue est 2 */
        let option = null;
        if(datas[0] != undefined) {
            if(datas[0].length < 3) {
                if(datas[0].length === 0) { option = null; }
                if(datas[0].length > 0) { option = 2; }
            }
        }
        return option;
    }
    function storagesDuProgramme() {
        $('#programme_ul li').on('click', function(){
            sessionStorage.setItem('matiere_active', JSON.stringify($(this).attr('id'))); 
            sessionStorage.setItem('matiere_nom', JSON.stringify($(this).text())); 
            sessionStorage.setItem('matiere_index', JSON.stringify($(this).index())); 
            sessionStorage.setItem('niveau_actif', JSON.stringify($(this).index()+1)); 
            sessionStorage.setItem('phases_etudiees', JSON.stringify(phases_etudiees)); 
        });
    }
});