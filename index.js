import listProduct from '/assets/data.js'
let produto = null

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
    let productName = document.querySelector('.productName');
    let codigoProduto = document.querySelector('.searchCod').value;
    let produtoEncontrado = searchProduct(codigoProduto)
    productName.setAttribute("value", produtoEncontrado.product);
    
    produto = produtoEncontrado
    calc(produtoEncontrado.price)
}

function calc(price){

    const quantity = document.querySelector('.quantity')
    let elementPrice = document.querySelector('.price')
   
    let result = Number(price) * Number(quantity.value);
    
    elementPrice.setAttribute('value', `R$${result}`);
}
function changeQuantity(){
    calc(produto.price)
}

function addProduct(){
    const code = document.querySelector('.searchCod').value;
    const quantity = document.querySelector('.quantity').value;
    const product = document.querySelector('.productName').value;
    const price = document.querySelector('.price').value;
    const table = document.querySelector('tbody');

    table.innerHTML += `
    <tr>
        <td class="codeTable">${code}</td>
        <td class="productTable">${product}</td>
        <td class="quantityTable">${quantity}</td>
        <td class="valueProductTable">${price}</td>
    </tr>
    
    `
    
}
addEvent();