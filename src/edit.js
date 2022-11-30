// import 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
import $ from "jquery";
import { addUpdate } from "./sockets";
import { serverAddress } from "./constants";

var fileName = "file";


const initEdit = async (key) => {
var textAreaContent = document.getElementById('text-area')

  await fetch(serverAddress + "/doc/fetch", {
    method: "POST",
    body: JSON.stringify({ id: history.state.id }),
    headers: {
      "Content-Type": "application/json",
      token: key.token,
    },
  })
    .then((response) => {
      return response.status == 200 ? response.json() : null;
    })
    .then(async (data) => {
      if (data != null) {
        console.log(data);
        document.getElementById('demo').innerHTML=data.fileName
        textAreaContent.value = data.fileContent;
        console.log(data.fileContent);
      }
    });


  $("#export").on("click", () => {
    console.log("clicked");
    var message = $("textarea#text-area").val();
    console.log(message);
    const blob = new Blob([message]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.txt`;
    link.click();
  });

  $(() => {
    let startPos;
    let endPos;

    var input = $("#text-area");

	

    input.on("keydown", (event) => {
      startPos = input.prop("selectionStart");
      endPos = input.prop("selectionEnd");

      var key = event.keyCode || event.charCode;
      if (key == 8 || key == 46) {
        console.log(
          "deleting: " +
            input
              .val()
              .substring(
                input.prop("selectionStart"),
                input.prop("selectionEnd")
              )
        );
      }
    });
    input.on("input", (event) => {
      let end = input.prop("selectionEnd");
      addUpdate(
        key.token,
        event.originalEvent.data,
        end - 1,
        startPos,
        endPos,
        docId
      );
    });
  });
};

const update = (updateData) => {
  let textArea = $("#content");
  let start = textArea.prop("selectionStart");
  const urlParam = new URLSearchParams(window.location.search);
  const documentId = urlParam.get("id");

  if (
    sessionStorage.getItem("token") != updateData.user &&
    updateData.documentId == documentId
  ) {
    let text = textArea.val();
    if (updateData.content == null && updateData.startPos < updateData.endPos) {
      text =
        text.substring(0, updateData.startPos) +
        text.substring(updateData.endPos, text.length);
    } else if (updateData.content == null) {
      text =
        text.substring(0, updateData.position + 1) +
        text.substring(updateData.position + 2, text.length);
    } else {
      text =
        text.substring(0, updateData.position) +
        updateData.content +
        text.substring(updateData.position, text.length);
    }
    textArea.val(text);
    if (updateData.position < start) {
      start++;
      textArea[0].setSelectionRange(start, start);
    }
  }
};

export { initEdit, update };
