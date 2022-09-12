function msToTime(duration) {
	seconds = Math.floor((duration / 1000) % 60),
	minutes = Math.floor((duration / (1000 * 60)) % 60)
	minutes = minutes
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return minutes + ":" + seconds
}

async function ClientCheck() {
	CData = await $.post("http://localhost:8888/DataListener",{'type': "client"}, function(data){
	});
	RData = await $.post("http://localhost:8888/DataListener",{'type': "refresh"}, function(data){
	});
	

	if (CData.CLIENT_ID === undefined) {
		window.open("login.html")
	} else if (RData.refresh === undefined) {
		window.open("login.html")
	}
}

ClientCheck()

async function AuthTokens() {
	Data = await $.post("http://localhost:8888/DataListener",{'type': "auth"}, function(data){
	});

	if (Data.auth === undefined) {
		window.location() = "login.html"
	} else {
		Auth = Data.auth
		LastFMAuth = Data.LastFMAuth
	}
}

Paused = false
async function GetData() {
		Response = await fetch("https://api.spotify.com/v1/me/player", {
	        headers: {
    			Accept: "application/json",
            	Authorization: "Bearer " + Auth,
        	    "Content-Type": "application/json"
        	}
   		})
		NowPlay = await Response.json()

    	if (NowPlay.error !== undefined) {
    	    Response = await fetch("https://api.spotify.com/v1/me/currently-playing", {
	        headers: {
        	    Accept: "application/json",
    	        Authorization: "Bearer " + Auth,
	            "Content-Type": "application/json"
            	}
        	})
    	    NowPlay = await Response.json()
  	      if (NowPlay.error !== undefined) { 
            	Paused = true
        	}
		}

	if (Paused !== true) {
		document.getElementById("Playback").src = "Images/Pause.svg"
		Progress = NowPlay.progress_ms
		ProgressBefore = document.getElementById("length").value

        Album = NowPlay.item.album.name
        Artist = NowPlay.item.artists[0].name
		
		Response = await fetch("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + LastFMAuth + "&artist=" + Artist + "&album=" + Album + "&format=json", {"Content-Type": "application/json"})
        LastFM = await Response.json()

        
        Track = NowPlay.item.name
		TrackBefore = document.getElementById("track").innerHTML

        if (NowPlay.item.is_local == true) {
            Art = LastFM.album.image[5]["#text"]
            Artist = LastFM.album.artist
        } else {
            Art = NowPlay.item.album.images[0].url
        }

		if (TrackBefore !== Track) {
			statsFMGetData()
		}

		Length = NowPlay.item.duration_ms
		URI = NowPlay.context.uri
		Time = msToTime(Progress)
		TimeMax = msToTime(Length)
		document.getElementById("timelength").innerHTML = TimeMax
		document.getElementById("track").innerHTML = Track
		document.getElementById("title").innerHTML = "Lucy's Player | " + Track
		document.getElementById("artist").innerHTML = Artist
		document.getElementById("art").src = Art
		document.getElementById("length").max = Length

		if (document.getElementById("length").matches(":active") == false) {
			document.getElementById("length").value = Progress	
		}
		if (NowPlay.repeat_state !== "off") {
			document.getElementById("Loop").classList.add("Active")
		} else {
			document.getElementById("Loop").classList.remove("Active")
		}
		if (NowPlay.repeat_state == "track") {
			document.getElementById("Loop").src = "Images/oopOne.svg"
		} else {
			document.getElementById("Loop").src = "Images/LoopAll.svg"
		}
		if (NowPlay.shuffle_state == true) {
			document.getElementById("Shuffle").classList.add("Active")
		} else {
			document.getElementById("Shuffle").classList.remove("Active")
		}
	}
}

function Play() {
	fetch("https://api.spotify.com/v1/me/player/play", {
		headers: {
			'Authorization': 'Bearer ' + Auth,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
    	json: { "context_uri": URI },
		method: "PUT"
	})
	Paused = false
	document.getElementById("Playback").src = "Images/Pause.svg"
}

function Pause() {
	fetch("https://api.spotify.com/v1/me/player/pause", {
		headers: {
			Accept: "application/json",
			Authorization: "Bearer " + Auth,
			"Content-Type": "application/json"
		},
		method: "PUT"
	})
	Paused = true
	document.getElementById("Playback").src = "Images/Play.svg"
}

function Playback () {
	if (Paused === false) {
		Pause()
	} else {
		Play()
	}
}

function Previous() {
	fetch("https://api.spotify.com/v1/me/player/previous", {
		headers: {
			Accept: "application/json",
			Authorization: "Bearer " + Auth,
			"Content-Type": "application/json"
		},
		method: "POST"
	})
}

function Next() {
	fetch("https://api.spotify.com/v1/me/player/next", {
		headers: {
			Accept: "application/json",
			Authorization: "Bearer " + Auth,
			"Content-Type": "application/json"
		},
		method: "POST"
	})
}

function Seek(time) {
	Play()
	Paused = false
	fetch("https://api.spotify.com/v1/me/player/seek?position_ms=" + time, {
		headers: {
			Accept: "application/json",
			Authorization: "Bearer " + Auth,
			"Content-Type": "application/json"
		},
		method: "PUT"
	})
}

function UpdateTime() {
	document.getElementById("progress").innerHTML = msToTime(document.getElementById("length").value)
}

function Shuffle() {
	if (NowPlay.shuffle_state == true) {
		fetch("https://api.spotify.com/v1/me/player/shuffle?state=false", {
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + Auth,
				"Content-Type": "application/json"
			},
			method: "PUT"
		})
	} else {
		fetch("https://api.spotify.com/v1/me/player/shuffle?state=true", {
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + Auth,
				"Content-Type": "application/json"
			},
			method: "PUT"
		})
	}
}

function Loop() {
	if (NowPlay.repeat_state == "off") {
		fetch("https://api.spotify.com/v1/me/player/repeat?state=context", {
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + Auth,
				"Content-Type": "application/json"
			},
			method: "PUT"
		})
	} else if (NowPlay.repeat_state == "context") {
		fetch("https://api.spotify.com/v1/me/player/repeat?state=track", {
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + Auth,
				"Content-Type": "application/json"
			},
			method: "PUT"
		})
	} else {
		fetch("https://api.spotify.com/v1/me/player/repeat?state=off", {
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + Auth,
				"Content-Type": "application/json"
			},
			method: "PUT"
		})
	}
}

setInterval(UpdateTime, 1)
setInterval(AuthTokens, 1000)
setInterval(GetData, 1000)
setInterval(statsFMGetData, 1000*60)

window.addEventListener('keydown', function (event) {

    var key = event.which || event.keyCode;

    if (key === 32) {
      Playback()
    }
})
