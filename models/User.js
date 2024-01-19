// Tạo một file user.model.js để định nghĩa model User
class User {
    constructor(id, name, pass, email, dob) {
        this.id = id;
        this.name = name;
        this.pass = pass;
        this.email = email;
        this.dob = dob;
    }

    // Phương thức để cập nhật thông tin người dùng
    updateUserInfo(name, pass, email, dob) {
        this.name = name;
        this.pass = pass;
        this.email = email;
        this.dob = dob;
    }
    // Cập nhật pass
    updatePassUser(pass) {
        this.pass = pass;
    }
}

export default User;