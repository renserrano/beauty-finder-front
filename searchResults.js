let ajax = new XMLHttpRequest();

ajax.open("GET", "https://beauty-finder-api.herokuapp.com/servicos", true);

ajax.send();

ajax.onreadystatechange = function()
{
    let content = document.getElementById("content");

    if (this.readyState == 4 && this.status == 200) 
    {    
        let data_json = JSON.parse(ajax.responseText);

        if (data_json.length == 0)
        {
            content.innerHTML = '<div class="alert alert-warning" role="alert">Desculpe. Ainda não temos serviços cadastrados!</div>';    
        }
        else
        {
        
            let html_content = "";

            for (let i = 0; i<data_json.length; i++)
            {     
                html_content +='<div class="row"><div class="col-12"><h2><span> </span> '+data_json[i].categoria+'</h2></div></div>';

                if (data_json[i].servicos.length == 0)
                {

                    html_content += '<div class="row"><div class="col-12"><div class="alert alert-warning" role="alert">Desculpe. Não temos serviços para esta categoria.</div></div></div>';

                }
                else 
                {
                    const searchText = localStorage.getItem('searchText');                    

                    html_content += '<div class="row">';

                    for(let j = 0; j<data_json[i].servicos.length; j++)
                    {
                        if (data_json[i].categoria.toLowerCase().includes(searchText) || data_json[i].servicos[j].nome.toLowerCase().includes(searchText))
                        {                           
                            html_content += card_resultado(data_json[i].servicos[j].nome, data_json[i].servicos[j].imagem, data_json[i].servicos[j].valor, data_json[i].servicos[j].endereco);
                        }
    
                    }

                    html_content += '</div>';                    
                }

            }

            content.innerHTML = html_content;
            cache_dinamico(data_json);
        }

    }
}

var cache_dinamico = function(data_json){

    if('caches' in window)
    {
        caches.delete("brinquedo-app-dinamico").then(function(){
            if(data_json.length > 0){
                var files = ['dados.json'];
                for(let i = 0; i<data_json.length; i++){
                    for(let j = 0; j<data_json[i].servicos.length; j++){ 
                        if(files.indexOf(data_json[i].servicos[j].imagem) == -1){
                            files.push(data_json[i].servicos[j].imagem);
                        }       
                    }
                }
            }

            caches.open("brinquedo-app-dinamico").then(function (cache) {
                cache.addAll(files).then(function (){
                    console.log("Novo cache dinâmico adicionado!");
                });
            });
        });
    }
}

var card_resultado = function(nome, imagem, valor, endereco)
{
    return '<div class="col-lg-6">'+
                '<div class="card">'+
                    '<img src="'+imagem+'" class="card-img-top" alt="'+nome+'">'+
                    '<div class="card-body">'+
                        '<h5 class="card-title">'+nome+'</h5>'+
                        '<h6 card-subtitle mb-2 text-muted>'+endereco+'</h6>'+
                        '<p class="card-text"><strong>Valor Médio:</strong> '+valor+'</p>'+
                    '</div>'+
                '</div>'+
            '</div>';
}