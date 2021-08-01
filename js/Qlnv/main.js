// DOM và gắn event
document.getElementById("btnThemNV").addEventListener("click", addStaff);

document.getElementById("btnCapNhat").addEventListener("click", updateStaff);

document.getElementById("tableDanhSach").addEventListener("click", delegationTable);

document.getElementById("btnTimNV").addEventListener("click", searchStaff);

var manageStaff = new ManageStaff();
manageStaff.createResource();
showInfo(manageStaff.dsnv);

function addStaff() {
    var accountNum = document.getElementById("tknv").value;
    const fullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const passWord = document.getElementById("password").value;
    const dateWork = document.getElementById("datepicker").value;
    const basicSalary = document.getElementById("luongCB").value;
    const positionRank = document.getElementById("chucvu").value;
    const hourWork = document.getElementById("gioLam").value;

    var listStaff = new ListStaff (
        accountNum, 
        fullName,
        email, 
        passWord,
        dateWork,
        basicSalary,
        positionRank,
        hourWork
    );
    var isValid = requiredInfo(listStaff)

    if(!isValid) {
      return
    }
    manageStaff.addStaff(listStaff);
    showInfo(manageStaff.dsnv);
    resetForm();
}

function updateStaff() {
  var accountNum = document.getElementById("tknv").value;
  const fullName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const passWord = document.getElementById("password").value;
  const dateWork = document.getElementById("datepicker").value;
  const basicSalary = document.getElementById("luongCB").value;
  const positionRank = document.getElementById("chucvu").value;
  const hourWork = document.getElementById("gioLam").value;  

  var listStaff = new ListStaff (
    accountNum, 
    fullName,
    email, 
    passWord,
    dateWork,
    basicSalary,
    positionRank,
    hourWork
  );

  var isValid = requiredInfo(listStaff)

    if(!isValid) {
      return
    }
    
  manageStaff.updateStaff(listStaff);
  showInfo(manageStaff.dsnv);
  document.getElementById("tknv").disabled = false;
  resetForm();
}

function searchStaff() {
  var search = document.getElementById("searchName").value;
  var newDsnv = manageStaff.searchStaff(search);
  showInfo(newDsnv);
}

function showInfo(dsnv) {
  const tbody = document.getElementById("tableDanhSach");
  var html = "";
  for (var i = 0; i < dsnv.length; i += 1) {
    var staff = dsnv[i];
    html += `
      <tr>
        <td>${staff.accountNum}</td>
        <td>${staff.fullName}</td>
        <td>${staff.email}</td>
        <td>${staff.dateWork}</td>
        <td>${staff.positionRank}</td>
        <td>${staff.calSalary()}</td>
        <td>${staff.classiFication()}</td>
        <td>
          <button class="btn btn-primary" data-toggle="modal"
          data-target="#myModal" data-action="select" data-account="${
            staff.accountNum
          }">Update</button>
          <button class="btn btn-danger" data-action="delete" data-account="${
            staff.accountNum
          }">Delete</button>
        </td>
      </tr>
    `;
  }

  tbody.innerHTML = html;
}

function resetForm() {
  updateForm({});
  document.getElementById("tknv").disabled = false;
}

function updateForm(listStaff) {
  document.getElementById("tknv").value = listStaff.accountNum || "";
  document.getElementById("name").value = listStaff.fullName || "";
  document.getElementById("email").value = listStaff.email || "";
  document.getElementById("password").value = listStaff.passWord || "";
  document.getElementById("datepicker").value = listStaff.dateWork || "";
  document.getElementById("luongCB").value = listStaff.basicSalary || "";
  document.getElementById("chucvu").value = listStaff.positionRank || "";
  document.getElementById("gioLam").value = listStaff.hourWork || "";
}

function delegationTable(event) {
  console.log(event.target);

  var accountNum = event.target.getAttribute("data-account");
  var action = event.target.getAttribute("data-action");

  if (action === "select") {
    selectStaff(accountNum);
  }

  if (action === "delete") {
    deleteStaff(accountNum);
  }
}

function deleteStaff(accountNum) {
  manageStaff.deleteStaff(accountNum);
  showInfo(manageStaff.dsnv);
}

function selectStaff(accountNum) {
  var listStaff = manageStaff.selectStaff(accountNum);
  document.getElementById("tknv").disabled = true;

  updateForm(listStaff);
}

function requiredInfo(listStaff) {
  var validator = new Validator();
  var isValid = validator.isRequired("tbTKNV", listStaff.accountNum) && 
                validator.accountNum("tbTKNV", listStaff.accountNum);
  isValid &= validator.isRequired("tbTen", listStaff.fullName) &&
             validator.fullName("tbTen", listStaff.fullName);
  isValid &= validator.isRequired("tbEmail", listStaff.email) &&
             validator.email("tbEmail", listStaff.email);
  isValid &= validator.isRequired("tbMatKhau", listStaff.passWord) &&
             validator.passWord("tbMatKhau", listStaff.passWord);
  isValid &= validator.isRequired("tbNgay", listStaff.dateWork);
  isValid &= validator.isRequired("tbLuongCB", listStaff.basicSalary) &&
             validator.basicSalary("tbLuongCB", listStaff.basicSalary);
  isValid &= validator.isRequired("tbChucVu", listStaff.positionRank);
  isValid &= validator.isRequired("tbGiolam", listStaff.hourWork) &&
             validator.hourWork("tbGiolam", listStaff.hourWork);

  if (!isValid) {
    for (var key in validator.errors) {
      if (validator.errors[key]) {
        document.getElementById(key).innerHTML = validator.errors[key];
      }
    }
    return false
  }
  return true
}



