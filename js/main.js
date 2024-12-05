let signupNameInput = document.querySelector("#signupName");
let signupemailInput = document.querySelector("#signupemail");
let signuppasswordInput = document.querySelector("#signuppassword");
let loginemailInput = document.querySelector("#signemail");
let loginpasswordInput = document.querySelector("#signpassword");
let successMsg = document.querySelector(".success");
let errorMsg = document.querySelector(".error");
let error2Msg = document.querySelector(".error2");
let error3Msg = document.querySelector(".error3");
let error4Msg = document.querySelector(".error4");
let loginBtn = document.querySelector("#login");
let logoutBtn = document.querySelector("#logout");
var users;
if (localStorage.getItem("users") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}

function signUp() {
  if (
    signupNameInput.value == "" ||
    signupemailInput.value == "" ||
    signuppasswordInput.value == ""
  ) {
    errorMsg.classList.replace("d-none", "d-block");
    successMsg.classList.replace("d-block", "d-none");
    error2Msg.classList.replace("d-block", "d-none");
  } else if (users.length == 0) {
    addUser();
  } else {
    for (let i = 0; i < users.length; ) {
      if (signupemailInput.value == users[i].email) {
        error2Msg.classList.replace("d-none", "d-block");
        successMsg.classList.replace("d-block", "d-none");
        errorMsg.classList.replace("d-block", "d-none");
        signupemailInput.classList.replace("is-valid", "is-invalid");
        break;
      } else {
        i++;
        if (i == users.length) {
          addUser();
        }
      }
    }
  }
}

function addUser() {
  if (
    signupNameInput.classList.contains("is-valid") &&
    signupemailInput.classList.contains("is-valid") &&
    signuppasswordInput.classList.contains("is-valid")
  ) {
    successMsg.classList.replace("d-none", "d-block");
    errorMsg.classList.replace("d-block", "d-none");
    error2Msg.classList.replace("d-block", "d-none");
    let user = {
      name: signupNameInput.value,
      email: signupemailInput.value,
      password: signuppasswordInput.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    clearInputs();
  }
}

function validatinInputs(element) {
  var regex = {
    signupName: /^[A-Za-z]{3,}$/,
    signupemail: /^.{3,}@(gmail|yahoo)\.(com|net)$/,
    signuppassword: /^[A-Z]{1,}[a-z]{1,}[a-zA-Z0-9]{6,}$/,
  };

  if (regex[element.id].test(element.value) == true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }

  if (element.value == "") {
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.add("d-none");
  }
  successMsg.classList.replace("d-block", "d-none");
  errorMsg.classList.replace("d-block", "d-none");
  error2Msg.classList.replace("d-block", "d-none");
}

function clearInputs() {
  signupNameInput.value = "";
  signupemailInput.value = "";
  signuppasswordInput.value = "";
  signupNameInput.classList.remove("is-valid");
  signupemailInput.classList.remove("is-valid");
  signuppasswordInput.classList.remove("is-valid");
}

let logedUser = "";
function checkLogin() {
  if (loginemailInput.value == "" || loginpasswordInput.value == "") {
    error4Msg.classList.replace("d-none", "d-block");
    error3Msg.classList.replace("d-block", "d-none");
  } else {
    if (users.length == 0) {
      error3Msg.classList.replace("d-none", "d-block");
      error4Msg.classList.replace("d-block", "d-none");
    } else {
      for (let i = 0; i < users.length; ) {
        if (users[i].email == loginemailInput.value) {
          if (users[i].password == loginpasswordInput.value) {
            localStorage.setItem("logedUser", `${users[i].name}`);
            window.location.href = "welcome.html";
            document.getElementById(
              "user"
            ).innerText = `Welcome ${users[i].name}`;
          } else {
            error3Msg.classList.replace("d-none", "d-block");
            error4Msg.classList.replace("d-block", "d-none");
            break;
          }
        } else {
          i++;
          if (i == users.length) {
            error3Msg.classList.replace("d-none", "d-block");
            error4Msg.classList.replace("d-block", "d-none");
          }
        }
      }
    }
  }
}

logoutBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

let realUser = localStorage.getItem("logedUser");

document.querySelector("#user").innerHTML = `Welcome ${realUser}`;
