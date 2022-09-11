toggled = localStorage.getItem('DarkMode')
Accent = localStorage.getItem('Accent')
VerText = localStorage.getItem('HideVerText')
LightSwitch = document.getElementById('LightSwitch')
VerTextB = document.getElementById('VerTextB')
body = document.getElementById("html")
Compact = document.getElementById("Compact")

Purple = document.getElementById("Purple")
Blue = document.getElementById("Blue")
Green = document.getElementById("Green")
Yellow = document.getElementById("Yellow")

PurpleH = "8f8bff"
PurpleR = "filter: invert(70%) sepia(93%) saturate(3651%) hue-rotate(210deg) brightness(99%) contrast(105%)"
BlueH = "06bdff"
BlueR = "filter: invert(67%) sepia(79%) saturate(4391%) hue-rotate(168deg) brightness(109%) contrast(101%)"
GreenH = "00d234"
GreenR = "filter: invert(55%) sepia(73%) saturate(975%) hue-rotate(88deg) brightness(93%) contrast(108%)"
YellowH = "cb9c00"
YellowR = "filter: invert(71%) sepia(100%) saturate(3416%) hue-rotate(16deg) brightness(97%) contrast(101%)"

sheet = document.styleSheets[0];
rules = sheet.cssRules
Root = rules[1]
Darkmode = rules[2]
ControlCSS = rules[35]
Active = rules[36]
ActiveHover = rules[37]
SettingsButton = rules[23]

function Toggle() {
    body.classList.toggle("darkmode")
    document.getElementById("RW").classList.toggle("DarkIcon")
    document.getElementById("Shuffle").classList.toggle("DarkIcon")
    document.getElementById("Loop").classList.toggle("DarkIcon")
    document.getElementById("Playback").classList.toggle("DarkIcon")
    document.getElementById("FF").classList.toggle("DarkIcon")
    document.getElementById("Close").classList.toggle("DarkIcon")
    document.getElementById("SettingsIconImg").classList.toggle("DarkIcon")
}

function ComapctMode(state) {
    if (state == 'true') {
        window.resizeTo(300,300)
        document.getElementsByTagName("main")[0].style.height = "14.9em"
        document.getElementById("art").style.height = "7em"
        document.getElementById("art").style.width = "7em"
        document.getElementById("progressdiv").style.display = "none"
        document.getElementById("controls").style.display = "none"
        document.getElementsByClassName("switch")[0].style.display = "none"
        document.getElementsByClassName("switch")[2].style.display = "none"
        document.getElementById("DarkTit").style.display = "none"
        document.getElementById("AcceTit").style.display = "none"
        document.getElementById("VerTit").style.display = "none"
        document.getElementById("Display").style.display = "none"
        document.getElementById("Colors").style.display = "none"
        document.getElementById("Custom").style.display = "none"
        document.getElementById("CustomB").style.display = "none"
    } else {
        window.resizeTo(300,550)
        document.getElementsByTagName("main")[0].style.height = "31em"
        document.getElementById("art").style.height = "10em"
        document.getElementById("art").style.width = "10em"
        document.getElementById("progressdiv").style.display = "flex"
        document.getElementById("controls").style.display = "flex"
        document.getElementsByClassName("switch")[0].style.display = "block"
        document.getElementsByClassName("switch")[2].style.display = "block"
        document.getElementById("DarkTit").style.display = "block"
        document.getElementById("AcceTit").style.display = "block"
        document.getElementById("VerTit").style.display = "block"
        document.getElementById("Display").style.display = "block"
        document.getElementById("Colors").style.display = "block"
        document.getElementById("Custom").style.display = "block"
        document.getElementById("CustomB").style.display = "block"
    }
}

function ChangeAccent(Hex, HueRotate) {
    Root.style = "--body: #fff; --text: #000; --shadow: #777; --accent: #efefef; --colorAccent: #"+Hex+";"
    Darkmode.style = "--body: #222; --text: #fff; --shadow: #555; --accent: #2b2b2b; --colorAccent: #"+Hex+";"
    ControlCSS.style = HueRotate//"filter: invert(50%) sepia(100%) saturate(1000%) hue-rotate("+HueRotate+"deg);"
    Active.style = HueRotate//"filter: invert(50%) sepia(100%) saturate(1000%) hue-rotate("+HueRotate+"deg);"
    ActiveHover.style = HueRotate + "brightness(0.75) !important"//"filter: invert(50%) sepia(100%) saturate(1000%) hue-rotate("+HueRotate+"deg) brightness(0.75) !important;"
    SettingsButton.style = HueRotate//"filter: invert(50%) sepia(100%) saturate(1000%) hue-rotate("+HueRotate+"deg);"
}

if (localStorage.getItem("Compact") == 'true') {
    Compact.checked = true
    ComapctMode('true')
}

if (Accent == undefined) {
    localStorage.setItem('Accent', 'Purple')
    Purple.checked = true
} else if (Accent == "Purple") {
    Purple.checked = true
    ChangeAccent(PurpleH,PurpleR)
} else if (Accent == "Blue") {
    Blue.checked = true
    ChangeAccent(BlueH,BlueR)
} else if (Accent == "Green") {
    Green.checked == true
    ChangeAccent(GreenH,GreenR)
} else if (Accent == "Yellow") {
    Yellow.checked = true
} else if (Accent !== null) {
    color(Accent)
    document.getElementById("Custom").value = Accent
} else if (Accent !== null) {
    Purple.checked = true
    ChangeAccent(PurpleH,PurpleR)
}

if (VerText == undefined) {
    localStorage.setItem('HideVerText', 'no')
} else if (VerText == 'yes') {
    document.getElementById("VerText").style.display = 'none'
    VerTextB.checked = true
}

if (toggled == 'yes') {
    LightSwitch.checked = true
    Toggle() 
} 

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (localStorage.getItem('DarkMode') == undefined) {
        Toggle()
        localStorage.setItem('ThemeToggled', 'yes')
    }
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

LightSwitch.addEventListener('change', (event) => {
    Toggle()
    if (LightSwitch.checked == true) {
        localStorage.setItem('DarkMode', 'yes')
    } else {
        localStorage.setItem('DarkMode', 'no')
    }
  })

Purple.addEventListener('change', (event) => {
    if (Green.checked == true) {
        Green.checked = false
    } 
    if (Blue.checked == true) {
        Blue.checked = false
    } 
    if (Yellow.checked == true) {
        Yellow.checked = false
    } 
    if (Purple.checked == true || Purple.checked == false) {
        Purple.checked = true
        localStorage.setItem('Accent', 'Purple')
        ChangeAccent(PurpleH,PurpleR)
    }
 })

Blue.addEventListener('change', (event) => {
    if (Green.checked == true) {
        Green.checked = false
    } 
    if (Purple.checked == true) {
        Purple.checked = false
    } 
    if (Yellow.checked == true) {
        Yellow.checked = false
    } 
    if (Blue.checked == true || Blue.checked == false) {
        Blue.checked = true
        localStorage.setItem('Accent', 'Blue')
        ChangeAccent(BlueH,BlueR)
    }
 })

Green.addEventListener('change', (event) => {
    if (Blue.checked == true) {
        Blue.checked = false
    } 
    if (Purple.checked == true) {
        Purple.checked = false
    } 
    if (Yellow.checked == true) {
        Yellow.checked = false
    } 
    if (Green.checked == true || Green.checked == false) {
        Green.checked = true
        localStorage.setItem('Accent', 'Green')
        ChangeAccent(GreenH,GreenR)
    }
 })
Yellow.addEventListener('change', (event) => {
    if (Green.checked == true) {
        Green.checked = false
    } 
    if (Purple.checked == true) {
        Purple.checked = false
    } 
    if (Blue.checked == true) {
        Blue.checked = false
    } 
    if (Yellow.checked == true || Yellow.checked == false) {
        Yellow.checked = true
        localStorage.setItem('Accent', 'Yellow')
        ChangeAccent(YellowH,YellowR)
    }
 })

 VerTextB.addEventListener('change', (event) => {
    if (VerTextB.checked == true) {
        localStorage.setItem('HideVerText', 'yes')
        document.getElementById("VerText").style.display = 'none'
    } else {
        localStorage.setItem('HideVerText', 'no')
        document.getElementById("VerText").style.display = 'block'
    }
  })

  Compact.addEventListener('change', (event) => {
    if (Compact.checked == true) {
        ComapctMode('true')
        localStorage.setItem("Compact", 'true')
    } else {
        ComapctMode('false')
        localStorage.setItem("Compact", 'false')
    }
})

window.addEventListener('keydown', function (event) {

    var key = event.which || event.keyCode;

    if (key === 27) { // esc
      Settings()
      
    }

});