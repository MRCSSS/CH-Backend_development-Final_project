/* =================================== MODULES =================================== */
import { Schema, model } from "mongoose";
/* =================================== MODELS  =================================== */
const CartSchema = Schema({
    userID:     { type: String, required: true },
    products:   { type: Array,  required: true },
    timestamp:  { type: String, required: true },
});

const CartModel = model('carts', CartSchema);
/* ====================== MODULOS EXPORTADOS ======================== */
export default CartModel;