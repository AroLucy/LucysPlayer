function msToTime(duration) {
	seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60)
	minutes = minutes
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return minutes + ":" + seconds
}

async function ClientCheck() {
	CData = await $.post("http://localhost:8888/DataListener", { 'type': "client" }, function (data) {
	});
	RData = await $.post("http://localhost:8888/DataListener", { 'type': "refresh" }, function (data) {
	});


	if (CData.CLIENT_ID === undefined) {
		window.open("login.html")
	} else if (RData.refresh === undefined) {
		window.open("login.html")
	}
}

ClientCheck()

async function GetData() {
	NowPlay = await $.post("http://localhost:8888/Spotify", { 'type': 'Data' })
	if (NowPlay.Paused == false) {
		document.getElementById('Playback').src = 'Images/Pause.svg'
		Track = NowPlay.Track
		Artist = NowPlay.Artist
		Album = NowPlay.Album
		Length = NowPlay.Length
		Progress = NowPlay.Progress

		if (NowPlay.Local == false) {
			Art = NowPlay.Art
		} else {
			Response = await fetch("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + LastFMAuth + "&artist=" + Artist + "&album=" + Album + "&format=json", { "Content-Type": "application/json" })
			LastFM = await Response.json()

			Art = LastFM.album.image[5]["#text"]
			Artist = LastFM.album.artist
		}

		TrackBefore = document.getElementById("track").innerHTML

		statsFMGetData()

		document.getElementById("track").innerHTML = Track
		document.getElementById("title").innerHTML = "Lucy's Player | " + Track
		document.getElementById("artist").innerHTML = Artist
		document.getElementById("art").src = Art
		document.getElementById("length").max = Length
		TimeMax = msToTime(Length)
		document.getElementById("timelength").innerHTML = TimeMax
		if (document.getElementById("length").matches(":active") == false) {
			document.getElementById("length").value = Progress
		}

		if (NowPlay.Shuffle == true) {
			document.getElementById("Shuffle").classList.add("Active")
		} else {
			document.getElementById("Shuffle").classList.remove("Active")
		}

		if (NowPlay.Loop !== "off") {
			document.getElementById("Loop").classList.add("Active")
		} else {
			document.getElementById("Loop").classList.remove("Active")
		}

		if (NowPlay.Loop == "track") {
			document.getElementById("Loop").src = "Images/LoopOne.svg"
		} else {
			document.getElementById("Loop").src = "Images/LoopAll.svg"
		}
	} else {
		document.getElementById('Playback').src = 'Images/Play.svg'
	}
}

async function Play() {
	await $.post("http://localhost:8888/Spotify", { 'type': 'Play' })
	document.getElementById("Playback").src = "Images/Pause.svg"
}

async function Pause() {
	await $.post("http://localhost:8888/Spotify", { 'type': 'Pause' })
	document.getElementById("Playback").src = "Images/Play.svg"
}

function Playback() {
	if (NowPlay.Paused === false) {
		Pause()
	} else if (NowPlay.Paused === true) {
		Play()
	}
}

async function Previous() {
	await $.post("http://localhost:8888/Spotify", { 'type': 'Previous' })
}

async function Next() {
	await $.post("http://localhost:8888/Spotify", { 'type': 'Skip' })
}

async function Seek(time) {
	Play()
	await $.post("http://localhost:8888/Spotify", { 'type': 'Seek', 'time': time })
}

function UpdateTime() {
	document.getElementById("progress").innerHTML = msToTime(document.getElementById("length").value)
}

async function Shuffle() {
	if (NowPlay.Shuffle == true) {
		await $.post("http://localhost:8888/Spotify", { 'type': 'Shuffle', 'state': false })
		document.getElementById("Shuffle").classList.remove("Active")
	} else if (NowPlay.Shuffle == false) {
		await $.post("http://localhost:8888/Spotify", { 'type': 'Shuffle', 'state': true })
		document.getElementById("Shuffle").classList.add("Active")
	}
}

async function Loop() {
	if (NowPlay.Loop == "off") {
		await $.post("http://localhost:8888/Spotify", { 'type': 'Loop', 'state': 'Context' })
		document.getElementById("Loop").src = "Images/LoopAll.svg"
		document.getElementById("Loop").classList.add("Active")
	} else if (NowPlay.Loop == "context") {
		await $.post("http://localhost:8888/Spotify", { 'type': 'Loop', 'state': 'Track' })
		document.getElementById("Loop").classList.add("Active")
		document.getElementById("Loop").src = "Images/LoopOne.svg"
	} else if (NowPlay.Loop == "track") {
		await $.post("http://localhost:8888/Spotify", { 'type': 'Loop', 'state': 'Off' })
		document.getElementById("Loop").classList.remove("Active")
		document.getElementById("Loop").src = "Images/LoopAll.svg"
	}
}

window.addEventListener('keydown', function (event) {
	var key = event.which || event.keyCode;
	if (key === 32) {
		Playback()
	}
})
window.addEventListener('keydown', function (event) {
	var key = event.which || event.keyCode;
	if (key === 83) {
		Shuffle()
	}
})
window.addEventListener('keydown', function (event) {
	var key = event.which || event.keyCode;
	if (key === 76) {
		Loop()
	}
})
window.addEventListener('keydown', function (event) {
	var key = event.which || event.keyCode;
	if (key === 37) {
		Seek(Progress - 10000)
		GetData()
	}
})
window.addEventListener('keydown', function (event) {
	var key = event.which || event.keyCode;
	if (key === 39) {
		Seek(Progress + 10000)
		GetData()
	}
})


setInterval(UpdateTime, 1)
setInterval(GetData, 1000)