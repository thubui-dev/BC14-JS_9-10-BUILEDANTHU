//Function constructor ListStaff

function ListStaff(
    accountNum, 
    fullName,
    email, 
    passWord,
    dateWork,
    basicSalary,
    positionRank,
    hourWork
) {
    this.accountNum = accountNum;
    this.fullName = fullName;;
    this.email = email;
    this.passWord = passWord;
    this.dateWork = dateWork;
    this.basicSalary = basicSalary;
    this.positionRank = positionRank;
    this.hourWork = hourWork;
    
    this.compareArr = [this.accountNum, this.fullName, this.email, this.passWord, this.dateWork, this.basicSalary, this.positionRank,  this.hourWork];
}
ListStaff.prototype.calSalary = function () {
    switch (this.positionRank) {
        case "Giám Đốc":  return (this.totalSalary = this.basicSalary * 3);
        break;
        case "Trưởng Phòng": return (this.totalSalary = this.basicSalary * 2);
        break;
        case "Nhân viên": return (this.totalSalary = this.basicSalary);
    }
}

ListStaff.prototype.classiFication = function () {
    if (this.hourWork >= 192) {
        return "Xuất sắc";
    }
    if (this.hourWork >= 176) {
        return "Giỏi";
    }
    if (this.hourWork >= 160) {
        return "Khá";
    } 
    return "Trung bình";
}

