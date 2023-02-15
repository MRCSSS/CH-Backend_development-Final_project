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
    if(cart.products.length > 0){
        for(let i=0; cart.products.length>i; i++){
            await fetch(`/apiV1/products/${cart.products[i].productId}`, { method: 'GET' })
            .then(res => res.json())
            .then((res) => {
                const prod = res.data
                const subProduct = parseInt(prod.price)*parseInt(cart.products[i].qty);
                html += `
                <tr id="${prod.id}">

                    <th scope="row"><img class="tableImgTitle" src="/images/product/${prod.prodImg}" alt="${prod.name}" width="30px"></th>
                    <td id="name_${prod.id}">${prod.name}</td>
                    <td id="price_${prod.id}">$ ${prod.price}</td>
                    <td class="d-flex justify-content-center">
                        <div class="d-flex flex-row" style="max-width:120px">
                            <button type="button" class="btn btn-secondary px-1" onclick="less1('${prod.id}')" >
                                <span class="fa fa-minus"></span>
                            </button>
                            <input id="qty_${prod.id}" type="text" name="quantity" class="form-control text-center mx-1 px-1" value="${cart.products[i].qty}" min="1" max="100" maxlength="3" >
                            <button type="button" class="btn btn-secondary px-1" onclick="plus1('${prod.id}')" >
                                <span class="fa fa-plus"></span>
                            </button>
                        </div>
                    </td>
                    <td id="sub_${prod.id}">$ ${subProduct}</td>
                </tr>
                `;
            })
        }
        document.getElementById("cartInner").innerHTML = html;
        const div = document.createElement("div");
        div.innerHTML = `<button id="toPay" onclick="goToPay('${cart.id}')" class="btn btn-dark">CONTINUAR CON LA COMPRA</button>`;
        const cartCont = document.getElementById("cart_container");
        cartCont.append(div)
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

function plus1(idProduct){
    const num = parseInt(document.getElementById(`qty_${idProduct}`).value, 10);
    const price = parseInt((document.getElementById(`price_${idProduct}`).innerHTML).replace('$ ',''), 10);

    if (num != 100){ 
        document.getElementById(`qty_${idProduct}`).value = num + 1;
        const newSub =document.getElementById(`qty_${idProduct}`).value * price
        document.getElementById(`sub_${idProduct}`).innerHTML = `$ ${newSub}`
    }
}

function less1(idProduct){
    const num = parseInt(document.getElementById(`qty_${idProduct}`).value, 10);
    const price = parseInt((document.getElementById(`price_${idProduct}`).innerHTML).replace('$ ',''), 10);

    if (num != 1){ 
        document.getElementById(`qty_${idProduct}`).value = num - 1;
        const newSub =document.getElementById(`qty_${idProduct}`).value * price
        document.getElementById(`sub_${idProduct}`).innerHTML = `$ ${newSub}`
    } else {
        const prod = document.getElementById(`${idProduct}`);
        prod.remove();
    }
}

function goToPay(idCart){
    fetch(`/apiV1/cart/${idCart}/products`, { method: 'GET' })
    .then(res => res.json())
    .then(async res => {
        const email = document.getElementsByTagName('title')[0].innerHTML.split(' - ')[1];
        const products = res.cart_products;
        let newCart = [];
        let ticket = {
            email: email,
            products:[]
        };
        for(let i = 0; products.length > i; i++){
            const name = document.getElementById(`name_${products[i].id}`);
            if(name){
                const qty = parseInt(document.getElementById(`qty_${products[i].id}`).value, 10);
                const price = parseInt((document.getElementById(`price_${products[i].id}`).innerHTML).replace('$ ',''), 10);
                const ticketProd = {
                    name: name.innerHTML,
                    price: price,
                    qty: qty,
                }
                const cartProd = {
                    productId: products[i].id,
                    qty: qty,
                }
                ticket.products.push(ticketProd)
                newCart.push(cartProd)
            }
        }
        await fetch(`/apiV1/cart/${idCart}/products`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({products: newCart})
        })
        .then(async () => {
            await fetch(`/apiV1/ticket`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ticket)
            })
            .then(res => res.json())
            .then(res => {location.assign(`/ticket/${res.ticket_id}`)})
        })
    })
}