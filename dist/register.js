$("#register-button").on("click", async (event) => {
  console.log("check");

  event.preventDefault()

  let email = $("#email").val()
  let password = $("#password").val()
  let passwordRepeat = $("#password-repeat").val()

  // validatePassword(password) &&
  if ( validateEmail(email) && comparePasswords(password, passwordRepeat)) {
    const user = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
    await createUser(user);
    $("#register-form").submit()
  } else {
    console.log("wrong input");
  }
});

const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ? true
    : false;
};

const validatePassword = (password) => {
  // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    ? true
    : false;
};

const comparePasswords = (p1, p2) => {
  return p1 === p2 ? true : false;
};

const createUser = async (user) => {
  await fetch("http://localhost:8080" + "/register", {
    method: 'POST',
    body: JSON.stringify({ email: user.email, password: user.password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
