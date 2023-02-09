/* ===================================== DTO ===================================== */
class productDTO {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.categories = product.categories;
        this.price = product.price;
        // this.stock = product.stock;
        this.prodImg = product.prodImg;
        this.timestamp = product.timestamp;
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default productDTO;