import $ from "jquery";

import { serverAddress } from "./constants";

const initCreateDocument = (key) => {
  $("#create-button").on("click", (event) => {
    let title = $("#title").val();

    if (title.length != 0) {
      fetch(serverAddress + "/user/create-document", {
        method: "POST",
        body: JSON.stringify({ fileName: title }),
        headers: {
          "Content-Type": "application/json",
          token: key.token,
        },
      });
    }
  });
};

export { initCreateDocument };
