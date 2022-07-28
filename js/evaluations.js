
try {
    /* code */
    let t = {"prenom":"Bakary","nom":"Keita","age":"52 ans"};
    sessionStorage.setItem('t', JSON.stringify(t));
    let s = JSON.parse(sessionStorage.getItem('t'));
} catch (e) {
    alert(e.message);
}