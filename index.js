import listProduct from '/assets/data.js'

const arrItems = [];
let produto = null;
let contador = 0;
let productName = '';
let codigoProduto = '';
const alert = document.getElementById('boxAlert');
function addEvent(e){
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
    productName = document.querySelector('.productName');
    codigoProduto = document.querySelector('.searchCod').value;
    alert.classList.remove('alertOn')
    alert.classList.add('alertOff');
    if(codigoProduto != ''){
        let produtoEncontrado = searchProduct(codigoProduto);
        productName.setAttribute("value", produtoEncontrado.product);
        produto = produtoEncontrado
        calc(produtoEncontrado.price)
}   else{
        
        alert.classList.remove('alertOff');
        alert.classList.add('alertOn')
    }
}
 



function calc(price){
    const quantity = document.querySelector('.quantity');
    let elementPrice = document.querySelector('.price');
    let result = Number(price) * Number(quantity.value);
    
    elementPrice.setAttribute('value', `R$ ${result}.00`);
}

function changeQuantity(){
    calc(produto.price)
}
function addProduct(){
    document.querySelector('.totalRequest').removeAttribute('hidden');
    const valor = document.querySelector('.price').value.replace('R$', '');
    const button = document.querySelector('.btnAdd')
    const table = document.querySelector('tbody');
    button.style.backgroundColor = 'var(--cor-secundaria-orange-46)'
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