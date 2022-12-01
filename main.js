/* ---------------------- MODULOS IMPORTADOS ------------------------ */
import app from './src/server.js'

/* ---------------------------- SERVIDOR ---------------------------- */
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening: http://localhost:${PORT}`);
})

server.on('error', err => {
    console.log(`Server error: ${err}`);
})
