function ManageStaff() {
    this.dsnv = JSON.parse(localStorage.getItem("dsnv")) || [];
}

ManageStaff.prototype.createResource = function () {
    if (this.dsnv.length === 0) {
      return;
    }
  
    this.dsnv = this.dsnv.map(function (staff) {
      return new ListStaff(
        staff.accountNum,
        staff.fullName,
        staff.email,
        staff.passWord,
        staff.dateWork,
        staff.basicSalary,
        staff.positionRank,
        staff.hourWork
      );
    });
};

ManageStaff.prototype.saveLocalStorage = function () {
    localStorage.setItem("dsnv", JSON.stringify(this.dsnv));
};

ManageStaff.prototype.addStaff = function (listStaff) {
    this.dsnv.push(listStaff);
    this.saveLocalStorage();
};

ManageStaff.prototype.updateStaff = function(listStaff) {
    this.dsnv = this.dsnv.map(function (staff) {
      if (staff.accountNum === listStaff.accountNum) {
        return listStaff;
      }
      return staff;
    });
  
    this.saveLocalStorage();
}

ManageStaff.prototype.deleteStaff = function (accountNum) {
    this.dsnv = this.dsnv.filter(function (staff) {
      return staff.accountNum !== accountNum;
    });
  
    this.saveLocalStorage()
}

ManageStaff.prototype.selectStaff = function(accountNum) {
    return this.dsnv.find(function (staff) {
      return staff.accountNum === accountNum;
    });
}

ManageStaff.prototype.searchStaff = function(search) {
    return this.dsnv.filter(function (staff) {
        var searchValue = search.trim().toLowerCase()
        var positionValue = staff.classiFication().trim().toLowerCase()
  
      return positionValue.indexOf(searchValue) !== -1;
    });
}
  