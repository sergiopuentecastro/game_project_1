function showGame() {
    document.getElementById("canvas").style.display = "initial"
    document.getElementById("second-page").style.display = "flex"
    document.getElementById("story-box").style.display = "initial"
    document.getElementById("first-page").style.display = "none"
}

function startGame() {
    document.getElementById("story-box").style.display = "none"
    document.getElementById("second-page").style.display = "none"
}

window.onload = () => game.init('canvas')
