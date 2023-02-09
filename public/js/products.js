// /* =================================== MODULES =================================== */
// const socket = io();
// /* ================================== WEBSOCKET ================================== */
// socket.on('serv-prods', async (data) => {
//     await renderProducts(data).then(html => {
//         document.getElementById('products_container').innerHTML = html;
//     });
// });
// /* ================================= HANDLEBARS  ================================= */
// async function renderProducts (data) {
//     return fetch('templates/prod_table.hbs')
//         .then(resp => resp.text())
//         .then(temp => {
//             const template = Handlebars.compile(temp);
//             const html = template( {data} );

//             return html;
//         });
// }
// /* ================================== FUNCTIONS ================================== */

// const formData = document.getElementById('products_container');
// formData.addEventListener('submit', (e) => {
//     e.preventDefault();

//     document.getElementById("userExist").classList.remove("d-block");
//     document.getElementById("userExist").classList.add("d-none");

//     const pw1 = document.getElementById('password');
//     const pw2 = document.getElementById('password_verif');

//     if (pw1.value != pw2.value) {
//         document.getElementById("noMatchPw").classList.remove("d-none");
//         document.getElementById("noMatchPw").classList.add("d-block");

//     } else {
//         document.getElementById("noMatchPw").classList.remove("d-block");
//         document.getElementById("noMatchPw").classList.add("d-none");

//         const data = new URLSearchParams();
//         for (const pair of new FormData(formData)) {
//             data.append(pair[0], pair[1]);
//         }
        
//         fetch('apiV1/user/register', {
//             method: 'POST',
//             body: data,
//         })
//         .then(res => res.json())
//         .then(res => {
//             console.log(res)
//             if(res.message === 'User registered successfully!!!'){
//                 window.location.replace("/login");
//             } else if (res.error === 'User exists'){
//                 document.getElementById("userExist").classList.remove("d-none");
//                 document.getElementById("userExist").classList.add("d-block");
//             }
//         })
//         .catch(error => console.error('Error:', error))
//     }
// })

(() => {
    const queryString = window.location.pathname;
    const category = queryString.split('/')[2];
    if (category != undefined) {
        fetch(`apiV1/products/${category}`, {
            method: 'get',
        })
        .then(data => data.json())
        .then(console.log(data))
    } else {
        fetch('apiV1/products/', {
            method: 'get',
        })
        .then(res => res.json())
        .then(res => {
            let html;
            console.log('res.products=> ',res.products)
            if(res.products.length > 0){
                html = `<h3 style="color: white;text-align:center;">PRODUCTOS</h3><br>
                <div class="container d-dlex">`;
                html += res.products.map(product => {
                    return `
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="images/product/${product.prodImg}" alt="${product.name}">
                        <div class="card-body">
                        <h5 class="card-title text-dark">${product.name}</h5>
                        <p class="card-text text-secondary">${product.description}.</p>
                        <a href="product/${product.id}" class="btn btn-dark">Ver producto</a>
                        </div>
                    </div>
                    `;
                })
                html += '</div>'
            } else {
                html = '<h3 style="color: white;text-align:center;">No se encontraron productos</h3>';
            }
            document.getElementById("products_container").innerHTML = html;

            console.log('html => ', html)
        })
    }
})()



// {{#if data}}
// <h3 style="color: white;text-align:center;">PRODUCTOS</h3>
// <div class="container">
//     {{#each data}}
//     <div class="card" style="width: 18rem;">
//         <img class="card-img-top" src="..." alt="Card image cap">
//         <div class="card-body">
//             <h5 class="card-title">Card title</h5>
//             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             <a href="#" class="btn btn-primary">Go somewhere</a>
//         </div>
//     </div>
//     {{/each}}
// </div>
// {{else}}
// {{/if}}
