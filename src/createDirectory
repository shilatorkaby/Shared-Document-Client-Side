import $ from "jquery";

import { serverAddress } from "./constants";

const initCreateDirectory = (key) => {
  $("#create-button").on("click", (event) => {
    let title = $("#title").val();

    if (title.length != 0) {
      fetch(serverAddress + "/user/create-directory", {
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

export { initCreateDirectory };