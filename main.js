/*var xlsx = require('xlsx');
var dataPathExcel = "Portas_Rapidas.xlsx";
var wb = xlsx.readFile(dataPathExcel);
var worksheet = wb.Sheets['Data'];
var arrObjects = xlsx.utils.sheet_to_json(worksheet);
console.log(arrObjects);*/

var table = document.querySelector('#cells');
var predio = "";
var buttons = document.querySelectorAll('.botao');
var portasRapidas = document.querySelectorAll('.sinal');
var portasSeccionais = document.querySelectorAll('.secao');
var goteirasPredios = document.querySelectorAll('.gota');
var fmo_buttons = [];
for(let a = 0; a < portasRapidas.length; a++){
    fmo_buttons.push(portasRapidas[a]);
}
for(let a = 0; a < portasSeccionais.length; a++){
    fmo_buttons.push(portasSeccionais[a]);
}
for(let a = 0; a < goteirasPredios.length; a++){
    fmo_buttons.push(goteirasPredios[a]);
}

for (let i = 0; i < buttons.length; i++) {

    const button = buttons[i];

    button.onclick = function () {
        buttons.forEach(removeClass);
        button.classList.add('botao_ativo');
        if(i === 0) {
            for(let a = 0; a < portasRapidas.length; a++){
                portasRapidas[a].style.backgroundColor = json[a].Color;
            }
            const showing = document.querySelector('.sinaleiras');
            showing.classList.remove('hide');
            const showing2 = document.querySelector('.goteiras');
            showing2.classList.add('hide');
            const showing3 = document.querySelector('.seccionais');
            showing3.classList.add('hide');
        } else if (i === 1){
            for(let a = 0; a < portasSeccionais.length; a++){
                portasSeccionais[a].style.backgroundColor = json[a + portasRapidas.length].Color;
            }
            const showing = document.querySelector('.seccionais');
            showing.classList.remove('hide');
            const showing2 = document.querySelector('.sinaleiras');
            showing2.classList.add('hide');
            const showing3 = document.querySelector('.goteiras');
            showing3.classList.add('hide');
        } else if (i === 2){
            for(let a = 0; a < goteirasPredios.length; a++){
                if(json[a+70].Status == 3){
                    document.querySelector(`.gota${a+1}`).classList.add('hide');
                } else if(json[a+70].Prioridade == 1){
                    goteirasPredios[a].style.backgroundColor = 'red';
                } else {
                    goteirasPredios[a].style.backgroundColor = json[a + portasRapidas.length + portasSeccionais.length].Color;
                }                      
            }
            const showing = document.querySelector('.goteiras');
            showing.classList.remove('hide');
            const showing2 = document.querySelector('.sinaleiras');
            showing2.classList.add('hide');
            const showing3 = document.querySelector('.seccionais');
            showing3.classList.add('hide');
        } else {
            const showing = document.querySelector('.sinaleiras');
            const showing2 = document.querySelector('.goteiras');
            const showing3 = document.querySelector('.seccionais');
            showing.classList.add('hide');
            showing2.classList.add('hide');
            showing3.classList.add('hide');
        }
    }
}

function removeClass (button) {
    button.classList.remove('botao_ativo');
}

function removeColor (button) {
    button.classList.remove('show');
}

function sortIncidents(id) {
    table.innerHTML = "";
    console.log(table);
    var equipamento = "";
    for(let k = 0; k < json.length; k++){
        if(id == json[k].Index){
            equipamento = json[k].Equipamento;
            predio = `P${json[k].TAG.substring(0, 2)}`;
            break;
        }
    }
    incidents.forEach(incident => {
        if(incident.Equipamento == equipamento) {
            table.innerHTML += `
                <tr class="tabela-linha">
                    <td class="tabela-celula">${incident.Ordem}</td>
                    <td class="tabela-celula">${incident.Localizacao}</td>
                    <td class="tabela-celula2">${incident.Descricao}</td>
                    <td class="tabela-celula">${incident.Data_da_nota}</td>
                </tr>
            `;
        }
    })
    if(table.innerHTML == ""){
        table.innerHTML += `
                <tr class="tabela-linha">
                    <td class="tabela-celula"></td>
                    <td class="tabela-celula">${predio}</td>
                    <td class="tabela-celula2">NÃO POSSUI CHAMADOS</td>
                    <td class="tabela-celula"></td>
                </tr>
            `;
    }
}

/* JSON indexes
index 0 to 39 - portas rapidas
index 40 to 69 - portas seccionais
index 70 to 99 - goteiras
*/