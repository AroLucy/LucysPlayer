Accent = localStorage.getItem('Accent')

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
CustomAfter = rules[67]

function ChangeAccent(Hex, HueRotate) {
    Root.style = "--body: #fff; --text: #000; --shadow: #777; --accent: #efefef; --colorAccent: #"+Hex+";"
    Darkmode.style = "--body: #222; --text: #fff; --shadow: #555; --accent: #2b2b2b; --colorAccent: #"+Hex+";"
    ControlCSS.style = HueRotate
    Active.style = HueRotate
    ActiveHover.style = HueRotate + "brightness(0.75) !important"
    SettingsButton.style = HueRotate
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
    document.getElementById("Custom").value = "#"+Accent
} else if (Accent !== null) {
    Purple.checked = true
    ChangeAccent(PurpleH,PurpleR)
}

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
        CustomAfter.style.background = "transparent"
        CustomAfter.style.color = "var(--colorAccent)"
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
        CustomAfter.style.background = "transparent"
        CustomAfter.style.color = "var(--colorAccent)"
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
        CustomAfter.style.background = "transparent"
        CustomAfter.style.color = "var(--colorAccent)"
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
        CustomAfter.style.background = "transparent"
        CustomAfter.style.color = "var(--colorAccent)"
    }
})

