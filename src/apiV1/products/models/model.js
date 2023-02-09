/* =================================== MODULES =================================== */
import { Schema, model } from "mongoose";
/* =================================== MODELS  =================================== */
const ProductsSchema = Schema({
    code:           { type: String, required: true },
    name:           { type: String, required: true },
    description:    { type: String, required: true },
    categories:     { type: Array,  required: true },
    price:          { type: Number, required: true },
    stock:          { type: Number, required: true },
    prodImg:        { type: String, required: true },
    timestamp:      { type: String, required: true },
});

const ProductsModel = model('products', ProductsSchema);
/* =============================== EXPORTED MODULES ============================== */
export default ProductsModel;