Compact = document.getElementById("Compact")

function ComapctMode(state) {
    if (state == 'true') {
        if (localStorage.getItem("Compact") == 'true') {
            window.resizeTo(300,300)
            document.getElementsByTagName("main")[0].style.height = "14.9em"
            document.getElementsByTagName("main")[0].style.flexDirection = "column"
            document.getElementById("art").style.height = "7em"
            document.getElementById("art").style.width = "7em"
            document.getElementById("text").style.paddingLeft = "0em"
            document.getElementById("text").style.textAlign = "center"
            document.getElementById("progressdiv").style.display = "none"
            document.getElementById("controls").style.display = "none"
            document.getElementsByClassName("switch")[0].style.display = "none"
            document.getElementsByClassName("switch")[1].style.display = "block"
            document.getElementsByClassName("switch")[3].style.display = "none"
            document.getElementById("DarkTit").style.display = "none"
            document.getElementById("AcceTit").style.display = "none"
            document.getElementById("VerTit").style.display = "none"
            document.getElementById("CompSwit").style.display = "block"
            document.getElementById("Display").style.display = "none"
            document.getElementById("Colors").style.display = "none"
            document.getElementById("Custom").style.display = "none"
            document.getElementById("StatsFMTit").style.display = "none"
            document.getElementById("StatsFMDet").style.display = "none"
            document.getElementById("Username").style.display = "none"
            document.getElementById("SettTit").style.display = "block"
            document.getElementById("StatsFMBut").style.display = "none"
            document.getElementById("PlayCount").style.display = "none"
        } else {
            window.resizeTo(300,200)
            document.getElementsByTagName("main")[0].style.height = "8.6em"
            document.getElementsByTagName("main")[0].style.flexDirection = "row"
            document.getElementById("art").style.height = "7em"
            document.getElementById("art").style.width = "7em"
            document.getElementById("text").style.paddingLeft = "1em"
            document.getElementById("progressdiv").style.display = "none"
            document.getElementById("text").style.textAlign = "left"
            document.getElementById("controls").style.display = "none"
            document.getElementsByClassName("switch")[0].style.display = "none"
            document.getElementsByClassName("switch")[1].style.display = "none"
            document.getElementsByClassName("switch")[3].style.display = "none"
            document.getElementById("DarkTit").style.display = "none"
            document.getElementById("AcceTit").style.display = "none"
            document.getElementById("CompSwit").style.display = "none"
            document.getElementById("VerTit").style.display = "none"
            document.getElementById("Display").style.display = "none"
            document.getElementById("Colors").style.display = "none"
            document.getElementById("Custom").style.display = "none"
            document.getElementById("StatsFMTit").style.display = "none"
            document.getElementById("SettTit").style.display = "none"
            document.getElementById("Username").style.display = "none"
            document.getElementById("StatsFMDet").style.display = "none"
            document.getElementById("StatsFMBut").style.display = "none"
            document.getElementById("PlayCount").style.display = "none"
        }
    } else if (state == 'false') {
        window.resizeTo(300,550)
        document.getElementsByTagName("main")[0].style.height = "31em"
        document.getElementsByTagName("main")[0].style.flexDirection = "column"
        document.getElementById("art").style.height = "10em"
        document.getElementById("art").style.width = "10em"
        document.getElementById("text").style.paddingLeft = "0em"
        document.getElementById("text").style.textAlign = "center"
        document.getElementById("progressdiv").style.display = "flex"
        document.getElementById("controls").style.display = "flex"
        document.getElementsByClassName("switch")[0].style.display = "block"
        document.getElementsByClassName("switch")[3].style.display = "block"
        document.getElementById("SettTit").style.display = "block"
        document.getElementsByClassName("switch")[1].style.display = "block"
        document.getElementById("DarkTit").style.display = "block"
        document.getElementById("AcceTit").style.display = "block"
        document.getElementById("VerTit").style.display = "block"
        document.getElementById("Display").style.display = "block"
        document.getElementById("CompSwit").style.display = "block"
        document.getElementById("Colors").style.display = "block"
        document.getElementById("Custom").style.display = "block"
        document.getElementById("StatsFMTit").style.display = "block"
        document.getElementById("StatsFMBut").style.display = "block"
        document.getElementById("Username").style.display = "block"
        document.getElementById("StatsFMDet").style.display = "block"
        document.getElementById("PlayCount").style.display = "block"
    }
}

if (localStorage.getItem("Compact") == 'true') {
    Compact.checked = true
    ComapctMode('true')
} else if (localStorage.getItem("Compact") == 'Smaller') {
    SCompact.checked = true
    ComapctMode('true')
}

Compact.addEventListener('change', (event) => {
    if (Compact.checked == true) {
        localStorage.setItem("Compact", 'true')
        ComapctMode('true')
    } else {
        localStorage.setItem("Compact", 'false')
        ComapctMode('false')
    }
})

SCompact.addEventListener('change', (event) => {
    if (SCompact.checked == true) {
        localStorage.setItem("Compact", 'Smaller')
        ComapctMode('true')
    } else {
        if (Compact.checked == true) {
            localStorage.setItem("Compact", 'true')
            ComapctMode('true')
        } else {
            localStorage.setItem("Compact", 'false')
            ComapctMode('false')
        }
    }
})