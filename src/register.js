import $ from "jquery";
import { validateEmail, validatePassword } from "./validations";
import { serverAddress } from "./constants";

const initRegister = () => {
  $(document).on("click", "#register-button", async () => {
    const user = {
      email: $("#register-email").val(),
      password: $("#register-password").val(),
    };

    
    if (validateEmail(user.email)) {
       if(validatePassword(user.password)){
      fetch(serverAddress + "/auth/register", {
        method: "POST",
        body: JSON.stringify({ email: user.email, password: user.password }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => registerAlert(response));
     }
    else{
      document.getElementById("validtion").innerHTML =
      "Password input is not valid!";
    }
  }
    else{
      document.getElementById("validtion").innerHTML =
      "Email input is not valid!";
    }
  });

  
};

function registerAlert(response) {
  console.log("hi:" +response.status);
  if (response.status == 200) {
    document.getElementById("register-alert").innerHTML =
      "Verification email has sent to your inbox";
  } else {
    document.getElementById("register-alert").innerHTML =
      "User is already registered! please log in";
  }
}

export { initRegister };
