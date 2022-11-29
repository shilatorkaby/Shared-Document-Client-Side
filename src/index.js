import $ from "jquery";
import { openConnection } from './sockets';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { initRouter } from "./router";

$(() => {
  initRouter();
});

// function registerAlert(response) {
//   console.log(response.status);
//   if (response.status == 200) {
//     document.getElementById("register-alert").innerHTML =
//       "Verification email has sent to your inbox";
//   } else {
//     document.getElementById("register-alert").innerHTML =
//       "User is already registered! please log in";
//   }
// }

// function loginAlert(response) {
//   if (response.status == 200) {
//     document.getElementById("login-alert").innerHTML =
//       "Verification email has sent to your inbox";
//   } else {
//     document.getElementById("login-alert").innerHTML =
//       "User is already registered! please log in";
//   }
// }
openConnection();
