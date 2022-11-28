import $ from "jquery";
import { createUser } from "./rest";
import { openConnection } from "./sockets";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {formatDoc} from "./edit"
// import 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';

// import "../styles/registerAndLogin.css"
// import "../styles/edit.css"
// import "../styles/docHomeScreen.css"
// import "../styles/style.css"
// import "../styles/newDoc.css"

// $(() => {

//   $(document).on('submit', () => {
//     const user = {
//       email: $('#emailInput').val(),
//       name: $('#userInput').val(),
//       password: $('#passwordInput').val()
//     }
//     createUser(user);
//   })

// })
// openConnection();

let token;
let documentId;

//============================== start router ============================

$(document).ready(() => {
  const urlPageTitle = "JS Single Page Application Router";

  // create document click that watches the nav links only
  document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) {
      return;
    }
    e.preventDefault();
    urlRoute();
  });

  // create an object that maps the url to the template, title, and description
  const urlRoutes = {
    404: {
      template: "templates/404.html",
      title: "404 | " + urlPageTitle,
      description: "Page not found",
    },
    "/": {
      template: "templates/registerAndLogin.html",
      title: "Home | " + urlPageTitle,
      description: "This is the home page",
    },
    "/about": {
      template: "templates/about.html",
      title: "About Us | " + urlPageTitle,
      description: "This is the about page",
    },
    "/contact": {
      template: "templates/contact.html",
      title: "Contact Us | " + urlPageTitle,
      description: "This is the contact page",
    },
    "/doc-home-screen": {
      template: "templates/docHomeScreen.html",
      title: "Contact Us | " + urlPageTitle,
      description: "This is the contact page",
    },
    "/edit": {
      template: "templates/edit.html",
      title: "Edit | " + urlPageTitle,
      description: "This is the contact page",
    },
    "/new-document": {
      template: "templates/newDoc.html",
      title: "New Document | " + urlPageTitle,
      description: "This is the contact page",
    },
  };

  // create a function that watches the url and calls the urlLocationHandler
  const urlRoute = async (event) => {
    event = event || window.event; // get window.event if event argument not provided
    event.preventDefault();
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, "", event.target.href);
    await urlLocationHandler();
  };

  // create a function that handles the url location
  const urlLocationHandler = async () => {
    const location = window.location.pathname; // get the url path
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
      location = "/";
    }
    // get the route object from the urlRoutes object
    const route = urlRoutes[location] || urlRoutes["404"];
    // get the html from the template

    console.log(route.template);

    const html = await fetch(route.template).then((response) =>
      response.text()
    );
    // set the content of the content div to the html
    document.getElementById("content").innerHTML = html;

    switch (route.template) {
      //========================== start register ============================
      case "templates/registerAndLogin.html":
      
        $(document).on("click", "#register-button", async () => {
          const user = {
            email: $("#register-email").val(),
            password: $("#register-password").val(),
          };
      
          fetch("http://localhost:8080" + "/auth/register", {
            method: "POST",
            body: JSON.stringify({ email: user.email, password: user.password }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => registerAlert(response));
        });

      //=========================== end register =============================

      //=========================== start login ==============================

        $(document).on("click", "#login-button", async () => {
          const user = {
            email: $("#login-email").val(),
            password: $("#login-password").val(),
          };

          fetch("http://localhost:8080" + "/auth/login", {
            method: "POST",
            body: JSON.stringify({ email: user.email, password: user.password }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.status == 200) {
                return response.json();
              }
              return null;
            })
            .then(async (data) => {
              if (data != null) {
                token = data.token;
                window.history.pushState({}, "", "/doc-home-screen");
                await urlLocationHandler();
              }
            });
        });
      break
      //=========================== end login =================================

      //========================= start documents =============================
      case "templates/docHomeScreen.html":
        
        fetch("http://localhost:8080" + "/user/get/docs", {
          method: "POST",
          body: JSON.stringify({ token: token }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((documents) => {
            for (const document of documents) {
              console.log(document);
              $("#documents").append(
                `<div>
                  <img src="https://www.computerhope.com/jargon/d/doc.png"></br>
                  <b>Title</b>: ${document.fileName} </br>
                  <b>Author</b>: ${document.email} </br>
                  <button id="edit-${document.id}" class="btn btn-success"> Edit </button>
                  <button id="delete-${document.id}" class="btn btn-danger"> Delete </button>
                </div>`
              );

              $(`#edit-${document.id}`).on("click", async () => {
                window.history.pushState({}, "", `/edit`);
                documentId = document.id;
                await urlLocationHandler();
              });

              $(`#delete-${document.id}`).on("click", async () => {
                // delete document
              });
            }
          });
        break
        //========================== end documents ============================

      default:
        console.log(`Sorry, we are out of ${route.template}.`);
    }

    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", route.description);
  };

  // add an event listener to the window that watches for url changes
  window.onpopstate = urlLocationHandler;
  // call the urlLocationHandler function to handle the initial url
  window.route = urlRoute;
  // call the urlLocationHandler function to handle the initial url
  urlLocationHandler();

  //============================ end router ==============================


  const loginUser = (user) => {
    fetch("http://localhost:8080" + "/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: user.email, password: user.password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
});

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

function loginAlert(response) {
  if (response.status == 200) {
    document.getElementById("login-alert").innerHTML =
      "Verification email has sent to your inbox";
  } else {
    document.getElementById("login-alert").innerHTML =
      "User is already registered! please log in";
  }
}
