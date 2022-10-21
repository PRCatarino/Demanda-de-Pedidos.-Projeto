import listProduct from '/assets/product.js'

const button = document.querySelector('.btnAdd');
const alert = document.getElementById('boxAlert');
const btnSave = document.getElementById('saveBtn');
const arrItems = [];
let sumTotal = 0
let produto = null;
let contador = 0;
let productName = '';
let codigoProduto = '';

function addEvent(){
    document.querySelector('.searchBtn').addEventListener('click', checkFilled);
    document.querySelector('.quantity').addEventListener('change', changeQuantity);
    document.querySelector('.btnAdd').addEventListener('click',  addProduct);
    document.querySelector('.saveBtn').addEventListener('click', saveProduct );
    document.querySelector('.newOrder').addEventListener('click',newRequest);
    document.querySelector('.saveBtn').addEventListener('click',saveProductTable);
}

function checkFilled(){
    let inputSearch = document.getElementById('searchCode');
    codigoProduto = document.querySelector('.searchCod').value;
    document.querySelector('.btnAdd').removeAttribute('disabled')
    alert.classList.remove('alertOn')
    alert.classList.add('alertOff');

    if(codigoProduto != ''){
        inputSearch.classList.remove('alertActive')
        button.style.backgroundColor = 'var(--cor-secundaria-orange-46)'
        preencherProdutoBusca()
    }else{
        inputSearch.classList.add('alertActive')
        alert.classList.remove('alertOff');
        alert.classList.add('alertOn')
    }
}

function searchProduct(codigoProduto){
    let produtoEncontrado = listProduct.find(product =>{
        return product.codigo == codigoProduto
    });
    return produtoEncontrado;
}

    
function preencherProdutoBusca(){
    
    productName = document.querySelector('.productName');
    
    let produtoEncontrado = searchProduct(codigoProduto);
    productName.setAttribute("value", produtoEncontrado.product);
    produto = produtoEncontrado
    calc(produtoEncontrado.price)

}
 

function calc(price){
    const quantity = document.querySelector('.quantity');
    let elementPrice = document.querySelector('.price');
    let result = Number(price) * Number(quantity.value);
    
    elementPrice.setAttribute('value', `R$ ${result},00`);
}

function changeQuantity(){
    calc(produto.price)
}
function addProduct(){
    const valor = document.querySelector('.price').value.replace('R$', '');
    const table = document.querySelector('tbody');
    btnSave.removeAttribute('disabled')
    document.querySelector('.totalRequest').removeAttribute('hidden');
    btnSave.classList.add('newOrder')
    
    arrItems.push({ 
        code: document.querySelector('.searchCod').value,
        quantity: document.querySelector('.quantity').value,
        product: document.querySelector('.productName').value, 
        price : document.querySelector('.price').value,
        total : parseFloat(valor)
    })
   
 
    table.innerHTML += `
    <tr>
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
function saveProduct(){
    document.getElementById('page1').classList.add('ocultSection')
    document.getElementById('page2').classList.remove('ocultSection')
    
}
function newRequest(){
    document.getElementById('page1').classList.remove('ocultSection')
    document.getElementById('page2').classList.add('ocultSection')
}

function saveProductTable(){
    const valueRadio = document.querySelector('input[name="tipoConsumo"]:checked').value;
    
    let product = ''
    let table = document.querySelector('.tBody');
    if(valueRadio != ''){
        for(let i = 0; i < arrItems.length; i++){
            product += `${arrItems[i].quantity} - ${arrItems[i].product}</br>`;
     }
        table.innerHTML +=`
            <tr>
                <td>${1}</td>
                <td>${product}</td>
                <td>${valueRadio}</td>
                <td>R$${sumTotal},00</td>
                <td>Pendente</td>
            </tr>
        `
    }
}

addEvent()