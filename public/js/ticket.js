/* ==================================== LOGIC ==================================== */
(() => {
    const email = document.getElementsByTagName('title')[0].innerHTML.split(' - ')[1];
    const queryString = window.location.pathname;
    const ticketId = queryString.split('/')[2];

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

        await renderTicket(ticketId)
    })
    .catch(error => console.error('error =>', error))
})();
/* ================================== FUNCTIONS ================================== */
async function renderTicket(ticketId){
    await fetch(`/apiV1/ticket/${ticketId}`, { method: 'GET' })
    .then(res => res.json())
    .then(async (res) => {
        const ticket = res.ticket;
        const {id, products} = ticket;
        const userID = document.getElementById("usrID").innerHTML;
        await fetch(`/apiV1/user/${userID}`, { method: 'GET' })
        .then(res => res.json())
        .then(async (res) => {
            const user = res.data;
            let userData = `
                <h4>Informacion de comprador</h4>
                <table id="userTable" class="table text-left" style="background-color: gray;color: white;text-align:center;">
                    <tbody id="usrDataInner" >
                        <tr>
                            <td>ID: </td>
                            <td id="userId">${user.id}</td>
                        </tr>
                        <tr>
                            <td>Comprador: </td>
                            <td>${user.name}</td>
                        </tr>
                        <tr>
                            <td>e-mail: </td>
                            <td>${user.username}</td>
                        </tr>
                        <tr>
                            <td>Teléfono: </td>
                            <td>${user.phone}</td>
                        </tr>
                    </tbody>
                </table>

            `;
            let ticketData = `
                <h4>Informacion de compra</h4>
                <table id="ticketTable" class="table table-bordered" style="background-color: gray;color: white;text-align:center;">
                    <thead>
                        <tr>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">PRECIO</th>
                            <th scope="col">SUBTOTAL</th>
                        </tr>
                    </thead>
                    <tbody id="ticketInner" ></tbody>
            `;
            let total = 0;
            for(let i=0; products.length > i; i++){
                const subTotal = products[i].qty * products[i].price
                ticketData += `
                    <tr>
                        <td class="px-4">${products[i].qty}   X   ${products[i].name}</td>
                        <td class="px-4">${products[i].qty}   X   $${products[i].price}</td>
                        <td class="px-4">$ ${subTotal}</td>
                    </tr>
                `;
                total = total + subTotal;
            }
            ticketData += `
                </table>
                <div id="total-confirmBtn" class="jumbotron d-block" style="background-color: #343a40;color: white;text-align:center;">
                    <h3>Total de Compra</h3>
                    <h4>$ ${total}.00</h4>
                    <button onclick="buy()" class="btn btn-warning mt-1" style="text-align:center;">CONFIRMAR COMPRAR</button>
                </div>
                <div id="confirmMsg" class="jumbotron d-none" style="background-color: #343a40;color: white;text-align:center;">
                    <h3>ORDEN GENERADA</h3>
                    <p>Pronto te contactaremos para continuar con el proceso</p>
                    <a href="/" class="btn btn-warning mt-1" style="text-align:center;">Ir a Home</a>
                </div>
            `;
            document.getElementById("user_data").innerHTML = userData;
            document.getElementById("ticket_data").innerHTML = ticketData;
        })
    })
}

async function buy(){
    const ticketId = (document.getElementById("ticketId").innerHTML).replace("No.: ",'');

    await fetch(`/apiV1/ticket/${ticketId}/confirm`, { method: 'post' })
    .then(( ) => {
        document.getElementById("total-confirmBtn").classList.remove("d-block");
        document.getElementById("total-confirmBtn").classList.add("d-none");
        document.getElementById("confirmMsg").classList.remove("d-none");
        document.getElementById("confirmMsg").classList.add("d-block");

        setTimeout(() => {Location.assign('/')},10000)
    })
}