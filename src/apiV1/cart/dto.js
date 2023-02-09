/* ===================================== DTO ===================================== */
class cartDTO {
    constructor(cart) {
        this.id = cart.id;
        this.userID = cart.userID;
        this.status = cart.status;
        this.products = cart.products;
        this.timestamp = cart.timestamp;
    }
}

class productCartDTO {
    constructor(product) {
        this.id = product.id;
        this.code = product.code;
        this.name = product.name;
        this.price = product.price;
        this.prodImg = product.prodImg;
        this.qty = product.qty;
    }
}

/* =============================== EXPORTED MODULES ============================== */
export {cartDTO, productCartDTO};