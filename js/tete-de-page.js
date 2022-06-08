
let user_id = parseInt(sessionStorage.getItem('id'));

//alert(sessionStorage.getItem('prenom'));  
//alert(user_id);

let img_src = "http://localhost:8080/kouroukan/pages/get-avatar.php?client_id=<?= $_SESSION['id'] ?>"