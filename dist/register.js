$("#register-button").on("click", (event) => {
  console.log("check");

  let email = $("#email").val();
  let password = $("#password").val();
  let passwordRepeat = $("#password-repeat").val();

  if ( validateEmail(email) && validatePassword(password) && comparePasswords(password, passwordRepeat)) {
    const user = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
    createUser(user);
    $("register-form").trigger("submit")
    console.log("all good");
  } else {
    console.log("something went wrong");
  }
});

const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ? true
    : false;
};

const validatePassword = (password) => {
  // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    ? true
    : false;
};

const comparePasswords = (p1, p2) => {
  return p1 === p2 ? true : false;
};

const createUser = (user) => {
  fetch("http://localhost:8080" + "/user", {
    method: 'POST',
    body: JSON.stringify({ email: user.email, password: user.password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
