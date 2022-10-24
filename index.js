import listProduct from '/assets/product.js'

const buttonAdd = document.querySelector('.btnAdd');
const alertWindow = document.getElementById('boxAlert');
const buttonSave = document.getElementById('buttonSave');
const selectedProductsTable= document.getElementById('productsSelected');
const inputSearch = document.getElementById('searchCode');
let quantity = document.querySelector('.quantity ').value
let tableAllOrder = document.getElementById('newRequestTable');
let groupNumberRandom = [];
let codeProduct = '';
let buttonCancel = false;
let arrProduct = [];
let sumTotal = 0
let contador = 0;
let productName = ''
let valueRadio = null;
let checkInput = false;
let productFound = []
let productAllOrder = []
let arrAllProducts = []
let arrOrdenado = []
let newArr = []
let requestNumber = 0
function addEvent(){
    document.querySelector('.searchBtn').addEventListener('click', fillSearch);
    document.querySelector('.quantity').addEventListener('change', calcQuantity);
    document.querySelector('.btnAdd').addEventListener('click',  addProduct);
    document.querySelector('.newOrder').addEventListener('click',newRequest);
    document.querySelector('#buttonSave').addEventListener('click', saveAllOrders);
    document.querySelector('#removeItem').addEventListener('click', deletItem);
    document.querySelector('.cancelBtn').addEventListener('click', cancel);
    // document.getElementById('filterType').addEventListener('change',filterTable );
    // document.getElementById('filterStatus').addEventListener('change',filterTable );
}

function alert(){
    inputSearch.classList.add('alertInput')
    alertWindow.classList.remove('alertOff');
    alertWindow.classList.add('alertOn') 
}

function checkFilled(){
    codeProduct = document.querySelector('.searchCod').value;

    if(codeProduct != ''){
        
        checkInput = true
    }
}

function searchProduct(codeProduct){
    let productFound = listProduct.find(product =>{
        return product.codigo == codeProduct
    });
    return productFound;
}

// function filterTable(){
//     let filterType = document.getElementById('filterType').value
//     let filterStatus = document.getElementById('filterStatus').value
  
//     arrAllProducts.forEach((produto)=>{
//         newArr = produto
//     })
//     if(filterType == '1' ){
//         console.log(newArr)
//         newArr = arrAllProducts.filter(ob => ob.type == newArr.type)
//         newArr.forEach(item =>{
//             console.log(item.product)
//         })
//     }else{

//     }

// }

function fillSearch(){
    document.querySelector('.btnAdd').removeAttribute('disabled');
    alertWindow.classList.remove('alertOn');
    alertWindow.classList.add('alertOff');
    inputSearch.classList.remove('alertInput')
    quantity = document.querySelector('.quantity');
    
    checkFilled()

    if(checkInput){
        let product = null;
        quantity.value = 1
        inputSearch.classList.remove('alertActive') 
        buttonAdd.classList.add('activeButton')

        productName = document.querySelector('.productName');
        productFound = searchProduct(codeProduct);
        
        productName.value= productFound.product;
        product = productFound
        calcQuantity()
       
        
    }else{
        alert()
    }
    
}
function calcQuantity(){
    if(checkInput){
        let calculatedPrice = productFound.price * quantity.value
        document.querySelector('.price').value = `R$ ${calculatedPrice},00`
    }  
}

function addProduct(){
    const valor = document.querySelector('.price').value.replace('R$', '');
    document.querySelector('.totalRequest').removeAttribute('hidden');
    buttonSave.classList.add('saveBtn')
    valueRadio = document.querySelector('input[name="tipoConsumo"]:checked');
    valueRadio = valueRadio.value
    arrProduct.push({ 
        code: document.getElementById('searchCode').value,
        quantity: document.querySelector('.quantity').value,
        product: productName.value, 
        price : document.querySelector('.price').value,
        total : parseFloat(valor),
        type:  valueRadio
    })
    selectedProductsTable.innerHTML += `
    <tr class="itemsTable">
        <td class="codeTabl">${arrProduct[contador].code}</td>
        <td class="productTable">${arrProduct[contador].product}</td>
        <td class="quantityTable">${arrProduct[contador].quantity}</td>
        <td class="valueProductTable priceTable">${arrProduct[contador].price}</td>
    </tr>
    `  
    contador++
    sumTotal = arrProduct.reduce((total,atual)=>{
        return total + atual.total;
    },0);
    

    document.querySelector('.valueTotal').innerHTML = `R$ ${sumTotal}, 00`
    document.querySelector('.totalRequest').classList.remove('ocultSection');
    document.getElementById('buttonSave').removeAttribute("disabled");
    productName.value = ''
    limparInput()
}

function gerarNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function cancel(){
    let allProducts = document.querySelector('.allProducts')
    if(allProducts){
        document.getElementById('page1').classList.add('ocultSection');
        document.getElementById('page2').classList.remove('ocultSection');
    }
}
function saveAllOrders(){
    arrProduct.forEach((item)=>{
        arrAllProducts.push(item)
    })
    requestNumber = gerarNumber(1 , 90000)
    let product = ''
    
    
    for(let i = 0; i < arrProduct.length; i++){
        product += `${arrProduct[i].quantity} - ${arrProduct[i].product}</br>`

        tableAllOrder.innerHTML +=`
    
        <tr id="request${requestNumber}" class="allProducts">
            <td><input type="checkbox" value="${requestNumber}" id="requestItem" class="checkBox">${requestNumber}</td>
            <td>${product}</td>
            <td>${valueRadio}</td>
            <td>R$${sumTotal},00</td>
            <td><button id="changeReceived-${requestNumber}" class="btnStatusReceived">Recebido</button></td>
        </tr>
    `
    }
  

    groupNumberRandom.push(requestNumber)
    groupNumberRandom.forEach(requestNumber => document.querySelector(`#changeReceived-${requestNumber}`).addEventListener('click', changeReceived))
    document.getElementById('page1').classList.add('ocultSection')
    document.getElementById('page2').classList.remove('ocultSection')
    document.querySelector('#requestItem').addEventListener('change',activeButtonDelet)
    limparCampo()
}
function activeButtonDelet(){
    let check = [...document.querySelectorAll('#requestItem:checked')]
    if(check.length >= 1){
        document.querySelector('#removeItem').classList.remove('ocultSection')
    }else{
        document.querySelector('#removeItem').classList.add('ocultSection')

    }
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
    buttonSave.setAttribute('disabled', 1)
    checkInput = false
    buttonCancel = true
    limparCampo()
    
    selectedProductsTable.innerHTML = `
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
function limparInput(){
    document.querySelector('#searchCode').value = '';
    document.querySelector('.price ').value = 'R$ 0,00';
    document.querySelector('.quantity ').value = 0;
}
function limparCampo(){
    
    limparInput()
    buttonSave.classList.remove('saveBtn');
    buttonAdd.setAttribute('disabled', '');
    buttonAdd.classList.remove('activeButton') ;
    document.querySelector('.totalRequest').classList.add('ocultSection');
    productName.value = '';
    contador = 0
    sumTotal = 0
    arrProduct = []
}

function deletItem(){
    groupNumberRandom = []
    const items = [...document.querySelectorAll('#requestItem:checked')]
    
    const valores =  items.map((check)=>{
        return check.value
    })
    for(let i = 0; i < valores.length; i++){
        
        document.querySelector(`#request${valores[i]}`).remove()
    }
    let check = document.querySelector('#removeItem')
    check.classList.add('ocultSection')
}

addEvent()