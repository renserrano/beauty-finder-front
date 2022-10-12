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
                const categoria = localStorage.getItem('categoria');

                console.log('categoria: ', categoria)

                if (categoria === '') 
                {
                    html_content +='<div class="row"><div class="col-12"><h2><span> </span> '+data_json[i].categoria+'</h2></div></div>';
                    console.log('1')
                } else if (categoria == data_json[i].categoria)
                {
                    html_content +='<div class="row"><div class="col-12"><h2><span> </span> '+data_json[i].categoria+'</h2></div></div>';
                    console.log('2')
                }

                if ((data_json[i].servicos.length == 0) && ((categoria === '') || (categoria == data_json[i].categoria)))
                {
                    html_content += '<div class="row"><div class="col-12"><div class="alert alert-warning" role="alert">Desculpe. Não temos serviços para esta categoria.</div></div></div>';
                }
                else 
                {                    

                    if (carregaCard(data_json[i].categoria, data_json[i].servicos))
                    {

                        html_content += '<div class="row">';

                        for(let j = 0; j<data_json[i].servicos.length; j++)
                        {
                            html_content += card_resultado(data_json[i].servicos[j].nome, data_json[i].servicos[j].imagem, data_json[i].servicos[j].valor, data_json[i].servicos[j].endereco);       
                        }

                        html_content += '</div>';                    
                    }
                }

            }

            content.innerHTML = html_content;
        }

    }
}

function carregaCard(categoria, servicos){

    const categoria_pesquisada = localStorage.getItem('categoria');
    const texto_pesquisado = localStorage.getItem('searchText');

    if (categoria_pesquisada === '') 
    {
        if (texto_pesquisado === ''){
            return true
        }
        else if (categoria.toLowerCase().includes(texto_pesquisado)){
            return true
        }
        else 
        {
            for(let j = 0; j<servicos.length; j++)
            {
                if (servicos[j].nome.toLowerCase().includes(texto_pesquisado))
                {                           
                    return true                
                }

            }
            return false;
        }
    } else
    {
        return categoria_pesquisada == categoria
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
                        '<div class="d-grid gap-2">'+
                            '<a href="#" target="_blank" class="btn btn-info" id="button">Contratar</a>'+
                        '</div>'+                        
                    '</div>'+
                '</div>'+
            '</div>';
}