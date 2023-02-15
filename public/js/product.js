/* ==================================== LOGIC ==================================== */
(() => {
    const email = document.getElementsByTagName('title')[0].innerHTML.split(' - ')[1];
    const queryString = window.location.pathname;
    const prodId = queryString.split('/')[2];
    const url = `/apiV1/products/${prodId}`;

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
    .then(res => {
        let data;

        if(res.message != 'Product found!!!'){
            console.log('res.message => ',res.message)
            data = null;
        } else {
            data = res.data;
        }
        renderProduct(data);
    })
    .catch(error => console.error('error =>', error))       
})();
/* ================================== FUNCTIONS ================================== */
function renderProduct(product){
    let html = '';
    if(product != null){
        html += `
            <h2 style="color: white;text-align:center;">${product.name}</h2>
            <a href="/images/product/${product.prodImg}"><img src="/images/product/${product.prodImg}" class="card-img-top" alt="${product.name}"></a>
            <br>
            <h3 class="text-secundary" >${product.description}</h3>
            <div id="quantity-price" class="container d-flex flex-wrap justify-content-around" >
                <div class="text-center" >
                    <h4 class="text-dark" >Precio: </h4>
                    <h3>$ ${product.price}</h3>
                    <br>
                </div>
                <div class="text-center d-inline" >
                    <h4 class="text-dark" >Cantidad: </h4>
                    <div class="d-flex flex-row justify-content-around" >
                        <button type="button" class="btn btn-secondary mx-1 mb-1"  data-type="minus" data-field="" onclick="less1()" >
                            <span class="fa fa-minus"></span>
                        </button>
                        <input id="quantity" type="text" name="quantity" class="form-control text-center mx-1 mb-1" value="1" min="1" max="100" maxlength="3" style="width: 53px">
                        <button type="button" class="btn btn-secondary mx-1 mb-1" data-type="plus" data-field="" onclick="plus1()" >
                            <span class="fa fa-plus"></span>
                        </button>
                    </div>
                    <br>
                </div>
            </div>
            <div class="text-center" >
                <button id="addProd_btn" onclick="addProd2Cart('${product.id}')" class="btn btn-dark d-inline">
                    <h4>Agregar al carrito</h4>
                </button>
            </div>
            `;
    } else {
        html = '<h3 style="color: white;text-align:center;">Producto no encontrado</h3>';
    }
    document.getElementById("prod_container").innerHTML = html.replace(',','');
}

function plus1(){
    const num = parseInt(document.getElementById("quantity").value, 10);
    if (num != 100){ document.getElementById("quantity").value = num + 1 }
}

function less1(){
    const num = document.getElementById("quantity").value;
    if (num != 1){ document.getElementById("quantity").value = num - 1 }
}

async function addProd2Cart(prodId){
    const qty = parseInt(document.getElementById("quantity").value,10);
    const cartHtmlId = document.getElementsByClassName('counter')[0].id;
    const cartId = cartHtmlId.replace('counter_','');

    await fetch(`/apiV1/cart/${cartId}/products`, { 
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({products: [{
            productId: prodId,
            qty: qty
        }]})
    })
    .then(() => {
        const container = document.getElementById("prod_container");
        const message = document.createElement('div');

        document.getElementById("quantity-price").classList.remove("d-flex");
        document.getElementById("quantity-price").classList.add("d-none");

        document.getElementById("addProd_btn").classList.add("d-none");
        document.getElementById("addProd_btn").classList.remove("d-inline");

        message.innerHTML = `
        <div id="noMatchPw" class="alert alert-success text-center" role="alert">
            <h5>Producto añadido correctamente!!</h5>
            <a href="/cart" class="btn btn-warning d-inline">
                Ir al carrito
            </a>
        </div>
        `;

        container.appendChild(message)
    })
};