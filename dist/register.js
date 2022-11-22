$("#register-button").on("click", async (event) => {

  
  let email = $("#email").val()
  let password = $("#password").val()

  // validatePassword(password) &&
  if ( validateEmail(email) && comparePasswords(password)) {
    const user = {
      email: $("#email").val(),
      password: $("#password").val(),
    };

    console.log(user);

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
  return /^\\w{5,10}$/.test(password)
    ? true
    : false;
};

const comparePasswords = (p1, p2) => {
  return p1 === p2 ? true : false;
};

const createUser = async (user) => {
  await fetch("http://localhost:8080" + "/auth/register", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: user.email, password: user.password })
  })
}
