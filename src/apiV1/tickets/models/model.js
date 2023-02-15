/* =================================== MODULES =================================== */
import { Schema, model } from "mongoose";
/* =================================== MODELS  =================================== */
const TicketSchema = Schema({
    email:      { type: String, required: true },
    status:     { type: String, required: true },
    products:   { type: Array,  required: true },
    timestamp:  { type: String, required: true },
});

const TicketModel = model('tickets', TicketSchema);
/* ====================== MODULOS EXPORTADOS ======================== */
export default TicketModel;