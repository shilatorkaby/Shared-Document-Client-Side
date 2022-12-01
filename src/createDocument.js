import $ from "jquery";

import {urlLocationHandler} from "./router";
import { serverAddress } from "./constants";

const initCreateDocument = (key) => {
  $("#create-button").on("click", (event) => {
    let title = $("#title").val();

    if (title.length != 0) {
      fetch(serverAddress + "/user/create-document", {
        method: "POST",
        body: JSON.stringify({fatherId:history.state.dirId, fileName: title }),
        headers: {
          "Content-Type": "application/json",
          token: key.token,
        },
      }).then((response) => {
        if (response.status == 200) {
          console.log("hello");
          window.history.pushState({}, "", "/archive");
          urlLocationHandler();
        }
      });
    }
  });
};

export { initCreateDocument };
