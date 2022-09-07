var toggled = localStorage.getItem('ThemeToggled')

body = document.getElementById("html")

function Toggle() {
    body.classList.toggle("darkmode")
    document.getElementById("RW").classList.toggle("DarkIcon")
    document.getElementById("Shuffle").classList.toggle("DarkIcon")
    document.getElementById("Loop").classList.toggle("DarkIcon")
    document.getElementById("Playback").classList.toggle("DarkIcon")
    document.getElementById("FF").classList.toggle("DarkIcon")
    document.getElementById("SettingsIconImg").classList.toggle("DarkIcon")
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";
    Toggle()
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && toggled !== 'true') {
    Toggle()
}

function Theme() {
    Toggle()
    var toggled = localStorage.getItem('ThemeToggled')
    if (toggled != 'true') {
        localStorage.setItem('ThemeToggled', 'true')
    } else if (toggled == 'true') {
        localStorage.removeItem('ThemeToggled')
    }
}

if (toggled == 'true') {
    document.getElementsByTagName("html").toggle("darkmode")
}

function Settings() {
    if (document.getElementById("Settings").style.display == "flex") {
        document.getElementById("Settings").style.display = "none"
    } else {
        document.getElementById("Settings").style.display = "flex"
    }
}


//const form = document.querySelector('form');
//input = document.getElementById("API")
//function handleForm(event) { event.preventDefault(); Auth = document.getElementById("API").value} 
//form.addEventListener('submit', handleForm);


