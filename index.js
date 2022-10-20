import listProduct from '/assets/product.js'

const button = document.querySelector('.btnAdd');
const alert = document.getElementById('boxAlert');
const btnSave = document.getElementById('saveBtn');
const arrItems = [];
let produto = null;
let contador = 0;
let productName = '';
let codigoProduto = '';


function addEvent(){
    document.querySelector('.searchBtn').addEventListener('click', preencherProdutoBusca);
    document.querySelector('.quantity').addEventListener('change', changeQuantity);
    document.querySelector('.btnAdd').addEventListener('click',  addProduct);
}


function searchProduct(codigoProduto){
    let produtoEncontrado = listProduct.find(product =>{
        return product.codigo == codigoProduto
    });
    return produtoEncontrado;
}

    
function preencherProdutoBusca(){
    let inputSearch = document.getElementById('searchCode');
    productName = document.querySelector('.productName');
    codigoProduto = document.querySelector('.searchCod').value;
    
    document.querySelector('.btnAdd').removeAttribute('disabled')
    alert.classList.remove('alertOn')
    alert.classList.add('alertOff');
    
    if(codigoProduto != ''){
        let produtoEncontrado = searchProduct(codigoProduto);
        inputSearch.classList.remove('alertActive')
        button.style.backgroundColor = 'var(--cor-secundaria-orange-46)'

        productName.setAttribute("value", produtoEncontrado.product);
        produto = produtoEncontrado
        calc(produtoEncontrado.price)
}   else{
        inputSearch.classList.add('alertActive')

        alert.classList.remove('alertOff');
        alert.classList.add('alertOn')
    }
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
    
    let sumTotal = arrItems.reduce((total,atual)=>{
        return total + atual.total;
    },0);

    document.querySelector('.valueTotal').innerHTML = `R$ ${sumTotal}, 00`
 
}

addEvent()