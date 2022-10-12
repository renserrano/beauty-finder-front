
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

let swRegistration = null;

if('serviceWorker' in navigator)
{
    window.addEventListener('load', ()=>{

        navigator.serviceWorker.register('service-worker.js').then((reg) => {

            console.log("Service Worker registrado com sucesso!");
            swRegistration = reg;

        });
    });
}