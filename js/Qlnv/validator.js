function Validator() {
    this.errors = {};
}
  
Validator.prototype.isRequired = function (name, value) {
    if (!value) {
      this.errors[name] = "Vui lòng không để trống";
      return false;
    }
  
    return true;
};

Validator.prototype.accountNum = function (name, value) {
    if (!/^[a-zA-Z0-9_-]{4,6}$/.test(value)) {
      this.errors[name] = "Tài khoản không đúng định dạng";
      return false;
    }
    return true;
};

Validator.prototype.fullName = function (name, value) {
    if (!/^[a-zA-Z ]{2,30}$/.test(value)) {
      this.errors[name] = "Họ và tên không đúng định dạng";
      return false;
    }
    return true;
};

Validator.prototype.email = function (name, value) {
    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
      this.errors[name] = "Email không đúng định dạng";
      return false;
    }
    return true;
};
  
Validator.prototype.passWord = function (name, value) {
    if (!/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,10}$/.test(value)) {
        this.errors[name] = "Mật khẩu không đúng định dạng";
        return false;
      }
    return true;
};

Validator.prototype.basicSalary = function (name, value) {
    const n = parseInt(value);
    if ( n >= 1000000 && n <= 20000000) {
        return true;
    } else {
        this.errors[name] = "Lương cơ bản không hợp lệ";
        return false;
    }
};

Validator.prototype.hourWork = function (name, value) {
    const h = parseInt(value);
    if (h >= 80 && h <= 200) {
        return true;  
    } else {
        this.errors[name] = "Giờ làm không hợp lệ";
        return false;
    }
};
  
  