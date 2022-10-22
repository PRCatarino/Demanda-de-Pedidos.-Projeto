import listProduct from '/assets/product.js'

const button = document.querySelector('.btnAdd');
const alert = document.getElementById('boxAlert');
const btnSave = document.getElementById('saveBtn');
const table = document.querySelector('tbody');
const requestNumbers = [];
let btnCancel = false;
let arrItems = [];
let quantity = document.querySelector('.quantity ').value
let sumTotal = 0
let produto = null;
let contador = 0;
let productName = ''
let codigoProduto = '';
let inputSearch = '';
let valueRadio = null;
let checkInput = false;

function addEvent(){
    document.querySelector('.searchBtn').addEventListener('click', preencherProdutoBusca);
    document.querySelector('.quantity').addEventListener('change', changeQuantity);
    document.querySelector('.btnAdd').addEventListener('click',  addProduct);
    document.querySelector('.newOrder').addEventListener('click',newRequest);
    document.querySelector('.saveBtn').addEventListener('click',saveProductTable);
    document.querySelector('#removeItem').addEventListener('click', excluir);
    document.querySelector('.cancelBtn').addEventListener('click', cancelBtn);
}

function alerta(){
    inputSearch.classList.add('alertActive')
    alert.classList.remove('alertOff');
    alert.classList.add('alertOn') 
}
function checkFilled(){
    codigoProduto = document.querySelector('.searchCod').value;

    if(codigoProduto != ''){
        
        checkInput = true
    }
}
function searchProduct(codigoProduto){
    let produtoEncontrado = listProduct.find(product =>{
        return product.codigo == codigoProduto
    });
    return produtoEncontrado;
}



function preencherProdutoBusca(){
    document.querySelector('.btnAdd').removeAttribute('disabled')
    alert.classList.remove('alertOn')
    alert.classList.add('alertOff');
    inputSearch = document.getElementById('searchCode');
    quantity = document.querySelector('.quantity');
    quantity.value = 1
    checkFilled()
    if(checkInput){
        inputSearch.classList.remove('alertActive')
        button.classList.add('activeButton')
        productName = document.querySelector('.productName');
        let produtoEncontrado = searchProduct(codigoProduto);
        productName.value= produtoEncontrado.product;
        produto = produtoEncontrado
        calc(produtoEncontrado.price)

    }else{
        alerta()
    }
   
}
function calc(price){
    quantity = document.querySelector('.quantity');
    
    let elementPrice = document.querySelector('.price');
    let result = Number(price) * Number(quantity.value);
    
    elementPrice.value = `R$ ${result},00`;
}

function changeQuantity(){
    calc(produto.price)
}
function addProduct(){
    const valor = document.querySelector('.price').value.replace('R$', '');
    btnSave.removeAttribute('disabled')
    document.querySelector('.totalRequest').removeAttribute('hidden');
    btnSave.classList.add('newOrder')
    arrItems.push({ 
        code: document.getElementById('searchCode').value,
        quantity: document.querySelector('.quantity').value,
        product: document.querySelector('.productName').value, 
        price : document.querySelector('.price').value,
        total : parseFloat(valor)
    })
    table.innerHTML += `
    <tr class="itemsTable">
        <td class="codeTabl">${arrItems[contador].code}</td>
        <td class="productTable">${arrItems[contador].product}</td>
        <td class="quantityTable">${arrItems[contador].quantity}</td>
        <td class="valueProductTable priceTable">${arrItems[contador].price}</td>
    </tr>
    `  
    contador++
    
    sumTotal = arrItems.reduce((total,atual)=>{
        return total + atual.total;
    },0);

    document.querySelector('.valueTotal').innerHTML = `R$ ${sumTotal}, 00`
}

function gerarNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function cancelBtn(){
    if(btnCancel){
        document.getElementById('page1').classList.add('ocultSection');
        document.getElementById('page2').classList.remove('ocultSection');
    }
}
function saveProductTable(){
valueRadio = document.querySelector('input[name="tipoConsumo"]:checked');
if(valueRadio != null){
    valueRadio = valueRadio.value
    let product = ''
    let table = document.querySelector('.tBody');
    if(valueRadio != ''){

        for(let i = 0; i < arrItems.length; i++){
            product += `${arrItems[i].quantity} - ${arrItems[i].product}</br>`;
        }
        let requestNumber = gerarNumber(1 , 90000)

        table.innerHTML +=`
            <tr id="request${requestNumber}">
                <td><input type="checkbox" value="${requestNumber}" id="requestItem" class="checkBox">${requestNumber}</td>
                <td>${product}</td>
                <td>${valueRadio}</td>
                <td>R$${sumTotal},00</td>
                <td><button id="changeReceived-${requestNumber}" class="btnStatusReceived">Recebido</button></td>
            </tr>
            `
            requestNumbers.push(requestNumber)
            ativaButtons()
            // document.querySelector(`#changeReceived-${requestNumber}`).addEventListener('click', changeReceived)
            document.getElementById('page1').classList.add('ocultSection')
            document.getElementById('page2').classList.remove('ocultSection')
        }
    }
}
function ativaButtons(){
    requestNumbers.forEach(requestNumber => document.querySelector(`#changeReceived-${requestNumber}`).addEventListener('click', changeReceived))
}
function changeReceived(){
    let classButton = this.classList[0];
    switch (classButton) {
        case 'btnStatusReceived':
            this.classList.remove('btnStatusReceived');
            this.classList.add('btnStatusReady');
            this.innerHTML = 'Pronto'
        break;
        case 'btnStatusReady':
            this.classList.remove('btnStatusReady');
            this.classList.add('btnStatusDelivered');
            this.innerHTML = 'Entregue'
        break;
        case 'btnStatusDelivered':
            this.classList.remove('btnStatusDelivered')
            this.classList.add('btnStatusReceived')
            this.innerHTML = 'Recebido'
        break;
        default:
        
    }
}
function newRequest(){
    document.getElementById('page1').classList.remove('ocultSection');
    document.getElementById('page2').classList.add('ocultSection');
    btnSave.setAttribute('disabled', '')
    btnSave.classList.remove('newOrder')
    button.setAttribute('disabled', '');
    button.classList.remove('activeButton')
    btnCancel = true
    limparCampo()
    
    table.innerHTML = `
    <table>
        <tr>
            <th class="codeTable">Código</th>
            <th class="productTable">Produto</th>
            <th class="quantityTable">Quantidade</th>
            <th class="valueProductTable">Valor</th>
        </tr>
    </table>
    `
    document.querySelector('.valueTotal').innerHTML = `R$ ${sumTotal},00`;
    document.querySelector('.totalRequest').setAttribute('hidden',1);
}
function limparCampo(){
    document.querySelector('#searchCode').value = '';
    document.querySelector('.productName ').value = '';
    document.querySelector('.price ').value = '';
    contador = 0
    sumTotal = 0
    arrItems = []
}

function excluir(){
    const items = [...document.querySelectorAll('#requestItem:checked')]

    const valores =  items.map((check)=>{
        return check.value
    })
    console.log(valores)
    for(let i = 0; i < valores.length; i++){

        document.querySelector(`#request${valores[i]}`).remove()
    }
}

addEvent()