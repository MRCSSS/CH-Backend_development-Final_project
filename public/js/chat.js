/* =================================== MODULES =================================== */
const socket = io();

/* ============================ WEBSOCKET =========================== */
socket.on('serv-msgs', dataN => {
    let dataNsize = JSON.stringify(dataN).length;
    let dataD = normalizr.denormalize(dataN.result, msgsSchema, dataN.entities);
    let dataDsize = JSON.stringify(dataD).length;
    let compression = parseInt((dataDsize * 100) / dataNsize);

    renderMessages(dataD, compression).then(html => {
        document.getElementById('messages_formlist').innerHTML = html;
    })
})

/* ============================ WEBSOCKET =========================== */
// fetch('/api/v1/productos')
//     .then(res => res.json())
//     .then(res => { render(res.data); }
// );

/* ============================= RENDER ============================= */
async function renderMessages (data, compression) {
    return fetch('templates/messagesCenter.hbs')
        .then(resp => resp.text())
        .then(temp => {
            const template = Handlebars.compile(temp);
            const html = template( {data, compression} );

            return html
        })
}

// function render(data) {
//     let html = `<tr style="color: yellow;"> <th>Nombre</th> <th>Descripcion</th> <th>Precio</th><th>Imagen</th> </tr>`;

//     data.forEach(element => {
//         html += `<tr>
//                     <td>${element.nombre}</td>
//                     <td>${element.descripcion}</td>
//                     <td>${element.precio}</td>
//                     <td>
//                         <img width="30" src="${element.imagen}" alt="">
//                     </td>
//                 </tr>`;
//     });
    
//     document.getElementById('tabla-productos').innerHTML = html;
// }

/* ------------------ DESNORMALIZACION DE MENSAJES ------------------*/
const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const messageSchema = new normalizr.schema.Entity('post', { author: authorSchema }, { idAttribute: 'id' });
const msgsSchema = new normalizr.schema.Entity('posts', { messages: [messageSchema] }, { idAttribute: 'id' });

/* =========================== FUNCIONES ============================ */
function sendMessage() {
    const nowDate = new Date();
    const inputDate = 
    `${nowDate.getDate() > 9 ? nowDate.getDate() : `0${nowDate.getDate()}`}/`+
    `${nowDate.getMonth() > 9 ? nowDate.getMonth() : `0${nowDate.getMonth()}`}/${nowDate.getFullYear()} `+
    `${nowDate.getHours() > 9 ? nowDate.getHours() : `0${nowDate.getHours()}`}:`+
    `${nowDate.getMinutes() > 9 ? nowDate.getMinutes() : `0${nowDate.getMinutes()}`}:`+
    `${nowDate.getSeconds() > 9 ? nowDate.getSeconds() : `0${nowDate.getSeconds()}`}`;

    const msg = {
        author: {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lName').value,
            age: document.getElementById('age').value,
            nickname: document.getElementById('nickn').value,
            avatar: document.getElementById('avatar').value
        },
        timestamp: inputDate,
        message: document.getElementById('messageContent').value
    }

    socket.emit('client-msg', msg)
}
