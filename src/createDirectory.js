import $ from "jquery";
import { serverAddress } from "./constants";
import {urlLocationHandler} from "./router";


const initCreateDirectory = (key) => {
  $("#create-button").on("click", () => {
    let title = $("#title").val();

    if (title.length != 0) {
      fetch(serverAddress + "/user/create-directory", {
        method: "POST",
        body: JSON.stringify({name: title }),
        headers: {
          "Content-Type": "application/json",
          token: key.token,
        },
      }).then((response) => {
        if (response.status == 200) {
          console.log("directory "+title+" was created");
          window.history.pushState({}, "", "/archive");
          urlLocationHandler();
        }
      });
    }
  });
};

export { initCreateDirectory };







  