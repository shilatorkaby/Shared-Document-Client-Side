import $ from "jquery";
import { validateEmail, validatePassword } from "./validations";
import { serverAddress } from "./constants";

const initRegister = () => {
  $(document).on("click", "#register-button", async () => {
    const user = {
      email: $("#register-email").val(),
      password: $("#register-password").val(),
    };

    // validateEmail(user.email) && validatePassword(user.password)
    if (true) {
      fetch(serverAddress + "/auth/register", {
        method: "POST",
        body: JSON.stringify({ email: user.email, password: user.password }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => registerAlert(response));
    }
  });

  
};

function registerAlert(response) {
  console.log(response.status);
  if (response.status == 200) {
    document.getElementById("register-alert").innerHTML =
      "Verification email has sent to your inbox";
  } else {
    document.getElementById("register-alert").innerHTML =
      "User is already registered! please log in";
  }
}

export { initRegister };
