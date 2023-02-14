/* ==================================== LOGIC ==================================== */
(() => {
    const email = document.getElementsByTagName('title')[0].innerHTML.split(' - ')[1];

    fetch(`/apiV1/cart/${email}`, { method: 'GET' })
    .then(res => res.json())
    .then(async res => {
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

        await renderCart(res.cart)
    })
    .catch(error => console.error('error =>', error))
})();
/* ================================== FUNCTIONS ================================== */
async function renderCart(cart){
    let html = '';
    let subtotal = 0;
    if(cart.products.length > 0){
        for(let i=0; cart.products.length>i; i++){
            await fetch(`/apiV1/products/${cart.products[i].productId}`, { method: 'GET' })
            .then(res => res.json())
            .then((res) => {
                const prod = res.data
                const subProduct = parseInt(prod.price)*parseInt(cart.products[i].qty);
                html += `
                <div class="cartItem d-flex flex-row justify-content-between align-items-center" >
                    <img class="tableImgTitle" src="/images/product/${prod.prodImg}" alt="${prod.name}" width="35px">
                    <p class="tableNameTitle">${prod.name}</p>
                    <p class="tablePriceTitle">$ ${prod.price}.00</p>
                    <div class="tableCantTitle d-flex flex-row">
                        <span id="delete_${prod.id}" class="fa fa-minus"></span>
                        <p>${cart.products[i].qty}</p>
                        <span id="add_${prod.id}" class="fa fa-plus"></span>
                    </div>
                    <p class="tableSubTitle mr-4">$ ${subProduct}</p>
                </div>
                `;
                subtotal = subtotal + subProduct;
            })
        }
        document.getElementById("cartInner").innerHTML = html;
        document.getElementById("subtotal_inner").innerHTML = `$ ${subtotal}.00`
    } else {
        html = `
        <div class="jumbotron" style="background-color: gray;color: white;text-align:center;">
            <h2 style="color: white;text-align:center;">Carrito vacío!!</h2>
            <p style="color: white;text-align:center;">Aquí parecerá la lista de productos en el carrito cuando se agreguen</p>
            <button href="/products" class="btn btn-warning my-5" style="text-align:center;">IR A COMPRAR</button>
        </div>
        `;
        document.getElementById("footer_cartTable").classList.remove("d-flex");
        document.getElementById("footer_cartTable").classList.add("d-none");

        document.getElementById("cartTable").innerHTML = html;

    }
}
