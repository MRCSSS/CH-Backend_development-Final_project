/* ===================================== DTO ===================================== */
class userDTO {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.username = user.username;
        this.phone = user.phone;
        this.timestamp = user.timestamp;
    }
}
/* =============================== EXPORTED MODULES ============================== */
export default userDTO;