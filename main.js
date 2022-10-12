
function setaConsulta() {
    const searchText = document.getElementById('search').value.toLowerCase();
    localStorage.setItem("searchText", searchText);
    return false;
}