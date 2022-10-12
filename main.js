
function setaConsulta() {
    const searchText = document.getElementById('search').value.toLowerCase();
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("categoria", '');
    return false;
}


function consultaCategoria(categoria) {
    localStorage.setItem("categoria", categoria);
    window.location.href = 'searchResults.html'
    return false;
}