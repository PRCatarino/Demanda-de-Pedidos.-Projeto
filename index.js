let shoppingCart  = [
    {
        product: "Leite - Barnabé",
        codigo: "1",
        price:7.8,
    },
    {
        product: "Alcatra - Fribov",
        codigo:"2",
        price: 40,
    },
    {
        product: "Refrigerante - Toca Polar",
        codigo:"3",
        price: 8.99,
    },
    {
        product:"Peito de Frango - Hot Chicken",
        codigo:"4",
        price: 16.99,
    },
];
function addEvent(e){
    document.querySelector('.searchbtn').addEventListener('click', buscaProduto);
}
function buscaProduto(){
    let codigoProduto = document.querySelector('.searchcod').value
    let produtoEncontrado = shoppingCart.find(product =>{
        return product.codigo == codigoProduto
    })
    console.log(produtoEncontrado);

}


addEvent();