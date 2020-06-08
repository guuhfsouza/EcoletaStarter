function populateUfs () {
    const ufSelect = document.querySelector('select[name=uf]') //seleciona o componente que é um select e tem nome uf

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( res => res.json())
    .then( states => {
        for( state of states){
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`;
        }
    })
}
populateUfs();


function populateCities( event ){
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');
    
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    
    //event.target.value => diz em que componente o evento foi executado e posso acessar o valor do elemento () 

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;


    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
    .then(res => res.json())
    .then( cities => {
        
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`;
        }
        citySelect.disabled = false;
    })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', populateCities); //populateCities sem () executa apenas quando mudar. 


//Itens de coleta.

const itemsToCollect = document.querySelectorAll('li');
for(item of itemsToCollect){
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')
let selectedItems = [];


//pegar a li que esta sendo clicada para enviar no form.
function handleSelectedItem(event){ //o event vem do evento que ele é chamado
    const itemLi =  event.target;
    itemLi.classList.toggle('selected')

    const itemId = event.target.dataset.id; // pega o id doatributo data-id setado no componente.

    const areadySelected = selectedItems.findIndex(item => item === itemId) // pego o index
    if(areadySelected >= 0){
        const filterItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        }) //cria um novo array a partir do selectedItem removendo o itemId

        selectedItems = filterItems //seta o array filtrado (sem o itemId) no selectedItems
    }
    else{
        selectedItems.push(itemId) //adiciona o itemId no selectedItems
    }
    collectedItems.value = selectedItems; //seta a lista de li clicadas no campo oculto para envio no form  
}