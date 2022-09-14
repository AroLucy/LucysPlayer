VerText = localStorage.getItem('HideVerText')
VerTextB = document.getElementById('VerTextB')

if (VerText == undefined) {
	localStorage.setItem('HideVerText', 'no')
} else if (VerText == 'yes') {
	document.getElementById("VerText").style.display = 'none'
	VerTextB.checked = true
}


function Settings() {
	if (document.getElementById("Settings").style.height == "94vh") {
		document.getElementById("Settings").style.height = "0vh"
		document.getElementById("Settings").style.display = "none"
	} else {
		document.getElementById("Settings").style.height = "94vh"
		document.getElementById("Settings").style.display = "flex"
	}
}

VerTextB.addEventListener('change', (event) => {
	if (VerTextB.checked == true) {
		localStorage.setItem('HideVerText', 'yes')
		document.getElementById("VerText").style.display = 'none'
	} else {
		localStorage.setItem('HideVerText', 'no')
		document.getElementById("VerText").style.display = 'block'
	}
})

async function pin() {
	Pinned = await $.post("http://localhost:8888/DataListener", { 'type': "pin" })
	if (Pinned == 'pinned') {
		document.getElementById("Pin").src = "Images/Unpin.svg"
	} else {
		document.getElementById("Pin").src = "Images/Pin.svg"
	}
}

window.addEventListener('keydown', function (event) {

	var key = event.which || event.keyCode;

	if (key === 27) {
		Settings()
	}
});
window.addEventListener('keydown', function (event) {

	var key = event.which || event.keyCode;

	if (key === 80) {
		pin()
	}
});