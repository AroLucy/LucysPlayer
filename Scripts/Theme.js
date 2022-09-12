Toggled = localStorage.getItem('DarkMode')
LightSwitch = document.getElementById('LightSwitch')
body = document.getElementById("html")

function Toggle() {
    body.classList.toggle("darkmode")
    document.getElementById("RW").classList.toggle("DarkIcon")
    document.getElementById("Shuffle").classList.toggle("DarkIcon")
    document.getElementById("Loop").classList.toggle("DarkIcon")
    document.getElementById("Playback").classList.toggle("DarkIcon")
    document.getElementById("FF").classList.toggle("DarkIcon")
    document.getElementById("Close").classList.toggle("DarkIcon")
    document.getElementById("Pin").classList.toggle("DarkIcon")
    document.getElementById("SettingsIconImg").classList.toggle("DarkIcon")
}

if (Toggled == 'yes') {
    LightSwitch.checked = true
    Toggle() 
} 

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (localStorage.getItem('DarkMode') == undefined) {
        Toggle()
        localStorage.setItem('DarkMode', 'yes')
    }
}

LightSwitch.addEventListener('change', (event) => {
    Toggle()
    if (LightSwitch.checked == true) {
        localStorage.setItem('DarkMode', 'yes')
    } else {
        localStorage.setItem('DarkMode', 'no')
    }
})