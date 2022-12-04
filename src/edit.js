// import 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
import $ from "jquery";
import { addUpdate } from "./sockets";
import { serverAddress } from "./constants";
import { validateEmail } from "./validations";

const initEdit = async (key) => {
  var fileName = "file";

  let textAreaContent = document.getElementById("text-area");

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
        fileName = data.fileName;
        document.getElementById("demo").innerHTML = fileName;
        if (data.fileContent != null) {
          textAreaContent.value = data.fileContent;
        }
        console.log(data.fileContent);
      }
    });

  $("#import").on("click", () => {

      var inputFile = document.createElement('input');
      inputFile.type = 'file';
      inputFile.onchange = e => { 
    
        // getting a hold of the file reference
        var file = e.target.files[0]; 
    
        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
    
        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
           var content = readerEvent.target.result; // this is the content!
           console.log( content );
           textAreaContent.value += '\n';
           textAreaContent.value += content;
        }
    
       }
       inputFile.click();
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

    $("#share").on("click", () => {
      if (validateEmail($("#email").val())) {
        fetch(serverAddress + "/share/via/email", {
          method: "POST",
          body: JSON.stringify({
            docId: history.state.id,
            email: $("#email").val(),
            userRole: $('input[name="user-role"]:checked').val(),
          }),
          headers: {
            "Content-Type": "application/json",
            token: key.token,
          },
        }).then((response) => {
          return response.status == 200 ? response.json() : null;
        })
          .then(async (data) => {
            if (data != null) {
              console.log(data);
              console.log(data.fileContent);
            }
          });

      }
    });

    $("#save").on("click", () => {
      var content = $("textarea#text-area").val();
      if (content != null) {
        fetch(serverAddress + "/doc/save", {
          method: "POST",
          body: JSON.stringify({
            id: history.state.id,
            fileContent: content,
            email: $("#email").val()
          }),
          headers: {
            "Content-Type": "application/json",
            token: key.token,
          },
        }).then((response) => {
          return response.status == 200 ? response.json() : null;
        }).then(async (data) => {
          if (data != null && data.fileContent != null) {
              console.log(data);
              console.log("display updated text back in doc: "+data.fileContent);
              $("#text-area").value = data.fileContent;
          }
        });
      }
    });

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
        history.state.id
      );
    });
  });
};

const update = (updateData) => {
  let textArea = $("#text-area");
  let start = textArea.prop("selectionStart");
  const urlParam = new URLSearchParams(window.location.search);
  const documentId = urlParam.get("id");

  console.log("urlParam: " + urlParam.entries);
  console.log("documentId: " + documentId);
  console.log("updateData.user: " + updateData.user);
  console.log("updateData.documentId: " + updateData.documentId);
  console.log("history.state.token: " + history.state.token);

  // console.log("updateData.user != history.state.token && updateData.documentId == documentId");

  if (updateData.user != history.state.token && updateData.docId == history.state.id) {
    if (updateData.documentId == documentId) {
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
  }
};

export { initEdit, update };
