/* ===================================== DTO ===================================== */
class cartDTO {
    constructor(cart) {
        this.id = cart.id;
        this.username = cart.username;
        this.products = cart.products;
        this.timestamp = cart.timestamp;
    }
}

class productCartDTO {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.prodImg = product.prodImg;
        this.qty = product.qty;
        this.timestamp = product.timestamp;
    }
}

/* =============================== EXPORTED MODULES ============================== */
export {cartDTO, productCartDTO};