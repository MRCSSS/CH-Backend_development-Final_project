/* ===================================== DTO ===================================== */
class ticketDTO {
    constructor(ticket) {
        this.id = ticket.id;
        this.email = ticket.email;
        this.products = ticket.products;
        this.timestamp = ticket.timestamp;
    }
}

/* =============================== EXPORTED MODULES ============================== */
export default ticketDTO;