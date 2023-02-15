/* ==================================== LOGIC ==================================== */
(() => {
    const email = document.getElementsByTagName('title')[0].innerHTML.split(' - ')[1];
    const queryString = window.location.pathname;
    const category = queryString.split('/')[2];
    const url = category != undefined ? `/apiV1/products/all/${category}` : `/apiV1/products/all`;

    fetch(`/apiV1/cart/${email}`, { method: 'GET' })
    .then(res => res.json())
    .then(res => {
        let html ;
        let qty = 0;

        for(let i = 0; i < res.cart.products.length; i++){
            qty = qty + parseInt(res.cart.products[i].qty)
        }

        if(qty < 1){
            html = `<span id="counter_${res.cart.id}" class="counter d-none" data-placement="bottom"></span>`;
        } else {
            html = `<span id="counter_${res.cart.id}" class="counter d-block" data-placement="bottom">
            ${qty}
            </span>`;
        }
        document.getElementsByClassName("cart_icon")[0].innerHTML += html;
        document.getElementsByClassName("cart_icon")[1].innerHTML += html;
    })
    .catch(error => console.error('error =>', error))

    fetch(url, { method: 'get' })
    .then(res => res.json())
    .then(res => {renderProducts(res.products)})
    .catch(error => console.error('error =>', error))
})();
/* ================================== FUNCTIONS ================================== */
async function renderProducts(products){
    let html = '';
    if(products.length > 0){
        html += products.map(product => {
            return `<div class="card m-2" style="width: 11rem;background-color: rgb(175, 175, 175);text-align:center;" >
                <a href="/product/${product.id}" >
                    <img class="card-img-top px-3 pt-3" src="/images/product/${product.prodImg}" alt="${product.name}">
                </a>
                <div class="card-body" >
                    <a href="/product/${product.id}" ><h5 class="card-title text-dark">${product.name}</h5></a>
                    <h6 class="card-text text-secondary">$ ${product.price}.00</h6>
                    <a  href="/product/${product.id}" class="btn btn-dark mx-2 my-1">Ver detalles</a>
                </div>
            </div>`;
        })
    } else {
        html = '<h3 style="color: white;text-align:center;">No se encontraron productos</h3>';
    }
    document.getElementById("products_container").innerHTML = html.replace(',','');
}
