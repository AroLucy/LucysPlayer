async function Authcode() {
    var generateRandomString = function(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

    Client = await $.post("http://localhost:8888/DataListener",{'type': "client"}, function(data){
	});

    scopes = ['user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-recently-played'],
    clientId = Client.CLIENT_ID;
    clientSecret = Client.CLIENT_SECRET;
    redirectUri = 'http://localhost:8888/callback';
    state = generateRandomString(16);


    AuthURL = 'https://accounts.spotify.com/authorize?response_type=code&client_id=' + clientId + '&scope=user-read-currently-playing+user-read-playback-state+user-modify-playback-state&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fcallback&state=' + state
    window.location.replace(AuthURL)
}