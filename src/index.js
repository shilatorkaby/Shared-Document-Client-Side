import $ from "jquery";

import { createUser } from "./rest";
import { openConnection } from "./sockets";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

//============================ start router ===========================

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

    console.log(route);

    const html = await fetch(route.template).then((response) =>
      response.text()
    );
    // set the content of the content div to the html
    document.getElementById("content").innerHTML = html;
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

  //============================ end router =============================

  //========================== start register ============================

  $(document).on("click", "#register-button", () => {
    const user = {
      email: $("#register-email").val(),
      password: $("#register-password").val()
    };

    fetch("http://localhost:8080" + "/auth/register", {
      method: "POST",
      body: JSON.stringify({ email: user.email, password: user.password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  $(document).on("click", "#login-button", () => {
    const user = {
          email: $("#login-email").val(),
          password: $("#login-password").val()
        };


    fetch("http://localhost:8080" + "/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: user.email, password: user.password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  // console.log(email + " " + password);

  // console.log(validateEmail(email) + " " + validatePassword(password));

  // if ( validateEmail(email) && validatePassword(password)) {
  //   const user = {
  //     email: $("#email").val(),
  //     password: $("#password").val(),
  //   };
  //   loginUser(user);
  //   $("register-form").trigger("submit")
  //   console.log("all good");
  // } else {
  //   console.log("something went wrong");
  // }

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ? true
      : false;
  };

  const validatePassword = (password) => {
    // // /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    // return /^\\w{5,10}$/.test(password)
    //   ? true
    //   : false;
    return true;
  };

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
