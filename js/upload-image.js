
 /* Selection des éléments html */
    let image = $('#image');
    let image_submit = $('#image_submit');
    let image_upload_guide = $('#image_upload_guide');
    let image_to_upload = $('#upload_image_form img');
    

 /*---------------------------------------------------------------------------------------------------------*/
    //Extraction de noms des images déja téléchargées
    fetch("http://localhost:8080/kouroukan/api/image-syllabe.php?image_categorie=image1syllabe&id=4")
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => alert(error));
    
 
 
 /*---------------------------------------------------------------------------------------------------------*/
 
    image_submit.css('width', image.width()+'px');
    if(image.val() == '') {
        
        image_to_upload.css('display','none');
        image_submit.css('display','none');
    }
    
    image.change(function() {
        let image_nom = image.val().split("\\").pop().split(".")[0];
        let image_extension = image.val().split("\\").pop().split(".")[1];
        
        let syllabe_categorie_html = syllabeCategorieHtml();
        $('#syllabe_categorie').val(syllabe_categorie_html);
        
        image_to_upload.attr('src','http://localhost:8080/kouroukan/image/'+image_nom+'.'+image_extension);
        image_to_upload.css('display','block');
        image_submit.css('display','block');
        
        function syllabeCategorieHtml() {
	        let consonnes = ["ߓ", "ߔ", "ߕ", "ߖ", "ߗ", "ߘ", "ߙ", "ߛ", "ߜ", "ߝ", "ߞ", "ߟ", "ߡ", "ߢ", "ߣ", "ߤ", "ߥ", "ߦ"];
            let voyelles = ["ߊ", "ߋ", "ߌ", "ߍ", "ߎ", "ߏ", "ߐ"];
            
            let consonnes_nbr = [];
            let voyelles_nbr = [];
            
            for (var i = 0; i < image_nom.length; i++) {
                if($.inArray(image_nom[i], consonnes) !== -1) consonnes_nbr.push(image_nom[i]);
                if($.inArray(image_nom[i], voyelles) !== -1) voyelles_nbr.push(image_nom[i]);
            }
            
            let syllabe_nbr = Math.max(...[consonnes_nbr.length, voyelles_nbr.length]);
            let syllabe_categorie = "";
            
            switch (syllabe_nbr) {
                case 1: syllabe_categorie = "image1syllabe"; break;
                case 2: syllabe_categorie = "image2syllabe"; break;
                case 3: syllabe_categorie = "image3syllabe"; break;
                case 4: syllabe_categorie = "image4syllabe"; break;
            }
            
            return syllabe_categorie;
        }
    });