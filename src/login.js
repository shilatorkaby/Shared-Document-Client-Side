import $ from "jquery";
import { serverAddress } from "./constants";

import { urlLocationHandler } from "./router";
import { validateEmail, validatePassword } from "./validations";

const initLogin = (key) => {
  $("#login-button").on("click", async () => {
    const user = {
      email: $("#login-email").val(),
      password: $("#login-password").val(),
    };

    // validateEmail(user.email) && validatePassword(user.password)
    if (true) {
      await fetch(serverAddress + "/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: user.email, password: user.password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.status == 200 ? response.json() : null;
        })
        .then(async (data) => {
          if (data != null) {
            key.token = data.token;
            window.history.pushState({}, "", "/archive");
            await urlLocationHandler();
          }
        });
    }
  });
};

export { initLogin };

// $("#login-button").on("click", (event) => {
//     console.log("check");

//     let email = $("#email").val();
//     let password = $("#password").val();

//     console.log(email + " " + password);

//     console.log(validateEmail(email) + " " + validatePassword(password));

//     if ( validateEmail(email) && validatePassword(password)) {
//       const user = {
//         email: $("#email").val(),
//         password: $("#password").val(),
//       };
//       loginUser(user);
//       $("register-form").trigger("submit")
//       console.log("all good");
//     } else {
//       console.log("something went wrong");
//     }
//   });

//   const validateEmail = (email) => {
//     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
//       ? true
//       : false;
//   };

//   const validatePassword = (password) => {
//     // // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
//     // return /^\\w{5,10}$/.test(password)
//     //   ? true
//     //   : false;
//     return true
//   };

//   const loginUser = (user) => {
//     fetch("http://localhost:8080" + "/auth/login", {
//       method: 'POST',
//       body: JSON.stringify({ email: user.email, password: user.password }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//   }
