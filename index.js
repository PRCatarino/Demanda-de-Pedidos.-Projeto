let listProduct  = [
    {
        codigo:"1001",
        product:"Super SMACH COMBO Programado – Hambúrguer + Fritas",
        price: 55.00,
    },
    {
        codigo:"1002",
        product:"SMACH VariavelBurguer – Hambúrguer com bacon",
        price:45.00,
    },
    {
        codigo:"1003",
        product:"SMACH BUG EM PROD – Hambúrguer meio torto",
        price: 25.00,
    },
    {
        codigo:"1004",
        product:"Combo Econômico SMACH Char 1 – Pão com Carne",
        price: 15.00,
    },
    {
        codigo:"2001",
        product:"Refrigerante 350 ml",
        price:8.00,
    },
    {
        codigo:"2002",
        product:"Água 500 ml",
        price:5.00,
    },
    {
        codigo:"2003",
        product:"Suco 350 ml",
        price: 7.00,
    },
    {
        codigo:"3001",
        product:"Sorvete 300 ml",
        price: 15.00,
    },
    {
        codigo:"1004",
        product:"Combo Econômico SMACH Char 1 – Pão com Carne",
        price:15.00,
    },
    {
        codigo:"3002",
        product:"Sobremesa doce SMACH ARRAY",
        price:50.00,
    },
];



function addEvent(e){
    document.querySelector('.searchBtn').addEventListener('click', buscaProduto);
}
function buscaProduto(){
    let price = document.querySelector('.price');
    let productName = document.querySelector('.productName');
    let codigoProduto = document.querySelector('.searchCod').value;
    let produtoEncontrado = listProduct.find(product =>{
        
        return product.codigo == codigoProduto
    });
    productName.setAttribute("value", produtoEncontrado.product);
    price.setAttribute('value', produtoEncontrado.price);
}

function calcula(){
    let quantity = document.querySelector('.quantity');
    let codigoProduto = document.querySelector('.searchCod').value;
    let produtoEncontrado = listProduct.find(product =>{
        
        return product.codigo == codigoProduto
    });
    let elementTotal = document.querySelector('.price')
   
    let calc = Number(produtoEncontrado.price) * Number(quantity.value);

    elementTotal.setAttribute("value", calc);
    
}

addEvent();