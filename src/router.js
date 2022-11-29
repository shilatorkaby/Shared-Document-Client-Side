import { initArchive } from "./archive";
import { initLogin } from "./login";
import { initRegister } from "./register";
import { initCreateDocument } from "./createDocument";
import { initEdit } from "./edit";


const initRouter = () => {
  // create document click that watches the nav links only
  document.addEventListener("click", (event) => {
    const { target } = event;
    if (!target.matches("nav a")) {
      return;
    }
    event.preventDefault();
    urlRoute();
  });

  // add an event listener to the window that watches for url changes
  window.onpopstate = urlLocationHandler;
  // call the urlLocationHandler function to handle the initial url
  window.route = urlRoute;
  // call the urlLocationHandler function to handle the initial url
  urlLocationHandler();
};

const urlPageTitle = "Shared Document Application";

let key = { token: "" };

// create an object that maps the url to the template, title, and description
const urlRoutes = {
  404: {
    template: "templates/404.html",
    title: "404 | " + urlPageTitle,
    description: "Page not found",
  },
  "/": {
    template: "templates/registerAndLogin.html",
    title: "Register & Login | " + urlPageTitle,
    description: "This is the register & login page",
    init: () => {
      initRegister();
      initLogin(key);
    },
  },
  "/about": {
    template: "templates/about.html",
    title: "About Us | " + urlPageTitle,
    description: "This is the about page",
  },
  "/contact": {
    template: "templates/contact.html",
    title: "Contact | " + urlPageTitle,
    description: "This is the contact page",
  },
  "/archive": {
    template: "templates/archive.html",
    title: "Archive | " + urlPageTitle,
    description: "This is the contact page",
    init: () => {
      initArchive(key);
    },
  },
  "/edit": {
    template: "templates/edit.html",
    title: "Edit | " + urlPageTitle,
    description: "This is the contact page",
    init: () => {
      initEdit(key,docId);
  },
},
  "/create-document": {
    template: "templates/createDocument.html",
    title: "New Document | " + urlPageTitle,
    description: "This is the contact page",
    init: () => {
      initCreateDocument(key);
    },
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

  const html = await fetch(route.template).then((response) => response.text());
  // set the content of the content div to the html
  document.getElementById("content").innerHTML = html;
  route.init();
  // set the title of the document to the title of the route
  document.title = route.title;
  // set the description of the document to the description of the route
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
};

export { initRouter, urlLocationHandler };
