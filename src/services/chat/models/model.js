/* =================================== MODULES =================================== */
import { Schema, model } from "mongoose";
/* =================================== MODELS  =================================== */
const MessagesSchema = Schema({
    author:     { type: [],     required: true },
    message:    { type: String, required: true },
    timestamp:  { type: String, required: true },
});

const MessagesModel = model('msgs', MessagesSchema);
/* =============================== EXPORTED MODULES ============================== */
export default MessagesModel;