/* ================================ CUSTOM ERROR  ================================ */
class CustomError {
    constructor(error){
        if (error.customCode !== undefined){
            this.code = error.customCode;
        } else if (error.code !== undefined) {
            this.code = error.code;
        } else {
            this.code = 500;
        }

        if (error.customName !== undefined){
            this.name = error.customName;
        } else if (error.name !== undefined) {
            this.name = error.name;
        } else {
            this.name = 'Error';
        }

        if (error.customMsg !== undefined){
            this.message = error.customMsg;
        } else if (error.message !== undefined) {
            this.message = error.message;
        } else {
            this.message = JSON.stringify(error);
        }
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default CustomError;

// switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
