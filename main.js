const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const appE = express();
const fs = require("fs");
var jsonParser = bodyParser.json()
var request = require('request');
var cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
var cookieParser = require('cookie-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

if (!fs.existsSync(process.env.APPDATA + "\\Lucy's Player\\Data")){
    fs.mkdirSync(process.env.APPDATA + "\\Lucy's Player\\Data");
	a = {"A":"A"}
	b = JSON.stringify(a)
	fs.writeFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Client.json", b)
	fs.writeFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Code.json", b)
	fs.writeFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Data.json", b)
	fs.writeFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Refresh.json", b)
    console.log('Folder Created Successfully.');
}

Client = fs.readFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Client.json")
RefreshJ = fs.readFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Refresh.json")
Refresh = JSON.parse(RefreshJ)
console.log("Data Imported")

function refreshSpotifyToken() {
	let ClientJ = fs.readFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Client.json");
	let Client = JSON.parse(ClientJ);
	credentials = {
		clientId : Client.CLIENT_ID,
		clientSecret : Client.CLIENT_SECRET,
		redirectUri : 'http://localhost:8888/callback'
	}
	var spotifyApi = new SpotifyWebApi(credentials);
	let rawdataA = fs.readFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Data.json");
	let dataA = JSON.parse(rawdataA);
	spotifyApi.setAccessToken(dataA.auth);
	let rawdataR = fs.readFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Refresh.json");
	let dataR = JSON.parse(rawdataR);
	spotifyApi.setRefreshToken(dataR.refresh);
	
	//console.log("ACC: " + dataA.auth + "\nREF: " + dataR.refresh)
	spotifyApi.refreshAccessToken().then(
		function(data) {
			console.log('The access token has been refreshed!');

			// Save the access token so that it's used in future calls
			spotifyApi.setAccessToken(data.body['access_token']);
			console.log('The access token is ' + data.body['access_token']);
			console.log('The token expires in ' + data.body['expires_in']);
			let accessToken = {
				auth: data.body['access_token'],
				"LastFMAuth": "15c7aeccdfc01e42d2a026283a691c94"
			};
			let DataTW = JSON.stringify(accessToken);
			fs.writeFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Data.json", DataTW);

			var today = new Date();
			var timeM = today.getMinutes() + 30;
			var timeH = today.getHours();
			if (timeM >= 60) {
				timeM = timeM - 60;
				timeH = timeH
			}
			if (timeH == 24) {
				timeH = 0
			}
			timeM = (timeM < 10) ? "0" + timeM : timeM

			console.log("Will refresh next at" + timeH + ":" + timeM);

		},
		function(err) {
			console.log('Could not refresh access token');
			console.log(err)
		});
};
function GetRefreshToken() {
	var spotifyApi = new SpotifyWebApi(credentials);
	console.log(credentials)
	spotifyApi.authorizationCodeGrant(code).then(
		function(data) {
			console.log('The token expires in:');
			console.log(data.body['expires_in']);
			console.log('The access token is:');
			console.log(data.body['access_token']);
			console.log('The refresh token is:');
			console.log(data.body['refresh_token']);

			// Save Access Token to Auth.json

			let accessToken = {
				"auth": data.body['access_token'],
				"LastFMAuth": "15c7aeccdfc01e42d2a026283a691c94"
			}

			let refreshToken = {
				refresh : data.body['refresh_token']
			}

			let DataA = JSON.stringify(accessToken);
			fs.writeFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Data.json", DataA);
			let DataR = JSON.stringify(refreshToken);
			fs.writeFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Refresh.json", DataR),

			// Set the access token on the API object to use it in later calls
				
			spotifyApi.setAccessToken(data.body['access_token']);
			spotifyApi.setRefreshToken(data.body['refresh_token']);			
		},
		function(err) {
			console.log('Something went wrong!', err);
		}
	);
};

credentials = {
	clientId : Client.CLIENT_ID,
	clientSecret : Client.CLIENT_SECRET,
	redirectUri : 'http://localhost:8888/callback'
}
	
var spotifyApi = new SpotifyWebApi(credentials);

function ClientWindow() {
	win = new BrowserWindow({width: 300, height: 550, frame:false, resizable: false, transparent:true, icon:'media/me.ico', webPreferences:{enableRemoteModule: true}}) 
	win.setAlwaysOnTop(true, 'screen');
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))
}

appE.use("/",router);

appE.use(bodyParser.urlencoded({ extended: false }));
appE.use(bodyParser.json());


router.post('/DataListener', urlencodedParser, function (req, res) {
	//console.log(req)
	if (req.body.ClientID !== undefined) {
		var ClientID = req.body.ClientID;
		var ClientSecret = req.body.ClientSecret;
		DataJ = {
			"CLIENT_ID": ClientID,
			"CLIENT_SECRET": ClientSecret
		}
		Data = JSON.stringify(DataJ)
		fs.writeFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Client.json", Data);
		console.log(Data)
		res.send("yes")
	}
	if (req.body.type == "refresh") {
		RefreshJ = fs.readFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Refresh.json")
		Refresh = JSON.parse(RefreshJ)
		res.json(Refresh)
	}
	if (req.body.type == "client") {
		ClientJ = fs.readFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Client.json")
		Client = JSON.parse(ClientJ)
		res.json(Client)
	}
	if (req.body.type == "auth") {
		AuthJ = fs.readFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Data.json")
		Auth = JSON.parse(AuthJ)
		res.json(Auth)
	}
	//res.end("no");
});

	

appE.get('/callback', function(req, res) {
	code = req.query.code
	fs.writeFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Code.json", code)
	ClientJ = fs.readFileSync(process.env.APPDATA + "\\Lucy's Player\\Data\\Client.json")
	Client = JSON.parse(ClientJ)
	ClientId = Client.CLIENT_ID;
	ClientSecret = Client.CLIENT_SECRET;
	console.log(ClientId, ClientSecret)
	credentials = {
		clientId: Client.CLIENT_ID,
		clientSecret: Client.CLIENT_SECRET,
		redirectUri: 'http://localhost:8888/callback'
	};
	res.send('<script>window.close()</script>')
	GetRefreshToken(code)
});

app.on('ready',() => {
	appE.listen(8888, () => {
		refreshSpotifyToken();
		ClientWindow();
		setInterval(refreshSpotifyToken, 1000 * 60 * 30);
	})
})
