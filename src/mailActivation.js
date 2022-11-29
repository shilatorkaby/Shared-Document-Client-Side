function print() {
  const images = [
    "http://placekitten.com/200/300",
    "http://placekitten.com/100/300",
    "http://placekitten.com/400/300",
  ];

  const outElem = document.querySelector(".images");

  images.forEach(function (path) {
    const img = document.createElement("http://placekitten.com/200/300");
    //img.src = path;
    outElem.appendChild(img);
  });
}

function printI() {
  const images = [
    "http://placekitten.com/200/300",
    "http://placekitten.com/100/300",
    "http://placekitten.com/400/300",
  ];

  const outElem = document.querySelector(".images");

  images.forEach(function () {
    const img = document.createElement("img");
    var div = document.createElement("div");
    img.src = document.getElementById("img").src;
    img.id = "image";

    div.innerHTML = "file title";
    outElem.appendChild(img);
    outElem.appendChild(div);
  });

  document.getElementById("container").appendChild(outElem);
}
