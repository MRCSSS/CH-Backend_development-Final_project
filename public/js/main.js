/* ---------------------------- MODULOS -----------------------------*/
const socket = io();

/* ---------------------------- WEBSOCKET ---------------------------*/
socket.on('serv-prods', async (data) => {
    await renderProducts(data).then(html => {
        document.getElementById('prods_table').innerHTML = html;
    });
});

/* --------------------------- HANDLEBARS ---------------------------*/
async function renderProducts (data) {
    return fetch('templates/prod_table.hbs')
        .then(resp => resp.text())
        .then(temp => {
            const template = Handlebars.compile(temp);
            const html = template( {data} );

            return html;
        });
}

/* --------------------------- FUNCIONES ----------------------------*/
function addProduct() {
    const inputTitle = document.getElementById('title');
    const inputPrice = document.getElementById('price');
    const inputThumbnail = document.getElementById('thumbnail');

    const prod = {
        title: inputTitle.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value
    };

    socket.emit('client-prods', prod)
}
