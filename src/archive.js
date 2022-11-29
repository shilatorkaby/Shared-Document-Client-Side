import $ from "jquery";

import { urlLocationHandler } from "./router";

const initArchive = (key) => {
  console.log(key.token);

  fetch("http://localhost:8080" + "/user/get/docs", {
    method: "POST",
    // body: JSON.stringify({ "token": token }),
    headers: {
      "Content-Type": "application/json",
      token: key.token,
    },
  })
    .then((response) => {
      return response.status == 200 ? response.json() : null;
    })
    .then((documents) => {
      if (documents != null) {
        for (const document of documents) {

          $("#create-document").on("click", () => {
            window.history.pushState({}, "", "/create-document");
            urlLocationHandler();
          })

          console.log(document);
          $("#documents").append(
            `<div">
                  <img src="https://www.computerhope.com/jargon/d/doc.png"></br>
                  <b>Title</b>: ${document.fileName} </br>
                  <b>Author</b>: ${document.email} </br>
                  <button id="edit-${document.id}" class="btn btn-success"> Edit </button>
                  <button id="move-${document.id}" class="btn btn-primary"> Move </button>
                  <button id="delete-${document.id}" class="btn btn-danger"> Delete </button>
              </div>`
          );

          $(`#edit-${document.id}`).on("click", async () => {
            window.history.pushState({}, "", `/edit`);
            urlLocationHandler();
          });

          $(`#delete-${document.id}`).on("click", async () => {
            // delete document
          });
        }
      }
    });
};

export { initArchive };
