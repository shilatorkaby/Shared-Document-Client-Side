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

export { initRegister };
