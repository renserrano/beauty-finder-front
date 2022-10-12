let ajax = new XMLHttpRequest();

ajax.open("GET", "dadosOffline.json", true);

ajax.send();

ajax.onreadystatechange = function()
{
    console.log('onreadystatechange offline')

    let content = document.getElementById("content");

    if (this.readyState == 4 && this.status == 200) 
    {
    
        let data_json = JSON.parse(ajax.responseText);

        if(data_json.length == 0)
        {
            content.innerHTML = '<div class="alert alert-warning" role="alert">Desculpe. Ainda não temos serviços cadastrados!</div>';
        }
        else
        {
            
            let html_content = "";

            for(let i = 0; i<data_json.length; i++)
            {
            
                html_content +='<div class="row"><div class="col-12"><h2><span> </span> '+data_json[i].categoria+'</h2></div></div>';

                if (data_json[i].servicos.length == 0)
                {
                    html_content += '<div class="row"><div class="col-12"><div class="alert alert-warning" role="alert">Desculpe. Não temos serviços para esta categoria.</div></div></div>';
                }
                else
                {
                    html_content += '<div class="row">';

                    for(let j = 0; j<data_json[i].servicos.length; j++)
                    {                        
                        html_content += card_resultado(data_json[i].servicos[j].nome,data_json[i].servicos[j].imagem,data_json[i].servicos[j].valor,data_json[i].servicos[j].whatsapp);
                    }

                    html_content += '</div>';                                    
                }

            }

            content.innerHTML = html_content;        
        }

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