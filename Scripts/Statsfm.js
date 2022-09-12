StatsFMUsername = localStorage.getItem('StatsFMUsername')
if (StatsFMUsername !== undefined) {
    document.getElementById("Username").value = localStorage.getItem('StatsFMUsername')
}

async function statsFMGetData() {
    StatsFMDataJ = await fetch('https://beta-api.stats.fm/api/v1/tracks/' + NowPlay.item.id + '?type=spotify')
    StatsFMData = await StatsFMDataJ.json()
    StatsFMID = StatsFMData.item.id
    StatsFMStatsDataJ = await fetch('https://beta-api.stats.fm/api/v1/users/' + StatsFMUsername + '/streams/tracks/' + StatsFMID + '/stats') 
    StatsFMStatsData = await StatsFMStatsDataJ.json()
    StatsFMStats = StatsFMStatsData.items.count
    document.getElementById("PlayCount").innerHTML = "<img class='Active' style='padding-left:1em;padding-right:0.5em;width:1em;height:1em' src='Images/Statsfm.svg'> Played " + StatsFMStats + " time"
}

function GetStatsFMUsername() {
    localStorage.setItem('StatsFMUsername',document.getElementById("Username").value)
    statsFMGetData()
}
