// import 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
import $ from "jquery";
$(() => {
	$("#formatID").on("change", () => {formatDoc('formatBlock',$("#formatID").value)})
})  

function formatDoc(cmd, value=null) {
	console.log("hi");
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

// function addLink() {
// 	const url = prompt('Insert url');
// 	formatDoc('createLink', url);
// }


// const content = document.getElementById('content');

// content.addEventListener('mouseenter', function () {
// 	const a = content.querySelectorAll('a');
// 	a.forEach(item=> {
// 		item.addEventListener('mouseenter', function () {
// 			content.setAttribute('contenteditable', false);
// 			item.target = '_blank';
// 		})
// 		item.addEventListener('mouseleave', function () {
// 			content.setAttribute('contenteditable', true);
// 		})
// 	})
// })


// const showCode = document.getElementById('show-code');
// let active = false;

// showCode.addEventListener('click', function () {
// 	showCode.dataset.active = !active;
// 	active = !active
// 	if(active) {
// 		content.textContent = content.innerHTML;
// 		content.setAttribute('contenteditable', false);
// 	} else {
// 		content.innerHTML = content.textContent;
// 		content.setAttribute('contenteditable', true);
// 	}
// })

// var fileName = null;

// function fileHandle(value) {
// 	if(fileName != null)
// 	{
// 	if(value === 'txt') {
// 		const blob = new Blob([content.innerText])
// 		const url = URL.createObjectURL(blob)
// 		const link = document.createElement('a');
// 		link.href = url;
// 		link.download = `${fileName}.txt`;
// 		link.click();
// 	} else if(value === 'pdf') {
// 		html2pdf(content).save(fileName);
// 	}
// }
// }

// function addNewFile() {
// 	fileName = prompt("Please enter the name of your new file", "");
// 	content.innerHTML = '';
// 	document.getElementById("demo").innerHTML = fileName;
//   	 //send the file name to intellij
// }

// function saveChanges() {
// 	const blob = new Blob([content.innerText])
// 	fetch("http://localhost:8080" + "/doc/save", {
//       method: 'POST',
//       body: JSON.stringify({fileName: fileName, fileContent: content.innerText}),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
// }
export{formatDoc}



