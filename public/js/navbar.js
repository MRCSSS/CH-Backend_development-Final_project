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
    })
    .catch(error => console.error('error =>', error))
})();
/* ================================== FUNCTIONS ================================== */
function collapse(menu){
    if (menu == 'menu'){
        $("#navbarUserContent").collapse('hide');
    } else if (menu == 'user'){
        $("#navbarSupportedContent").collapse('hide');
    }
}