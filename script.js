let start = document.getElementById("start");
let tiles = document.getElementsByClassName("tile");
let genius = document.getElementById("genius");
// red 0 / blue 1/ green 2/ yellow 3
let highscore = 0;
let highscorelegend = document.getElementById("highscore");
let sequencia = [];
let waitinginput = false;
let inputcursor = 0;
let gameover = null;

function geniusblink() {
    let blink = false;
    let blinking = setInterval(() => {
        let color = blink ? "black" : "#330704";
        genius.style.backgroundColor = color;
        genius.style.borderColor = color;
        blink = !blink;
        if (!waitinginput) {
            genius.style.backgroundColor = "black";
            genius.style.borderColor = "black";
            clearInterval(blinking);
        }
    }, 100)
}

function sortear() {
    return Math.round(Math.random() * 3);
};

function increase() {
    sequencia.push(sortear());
};

function reset() {
    gameover = true
    sequencia.length - 1 > highscore ? highscore = sequencia.length - 1 : false;
    highscorelegend.innerHTML = "Highscore: " + highscore;
    start.style.display = "";
    waitinginput = false
    inputcursor = 0;
    sequencia = [];
};

function show() {
    let blink = true;
    let counter = 0;
    let timer = setInterval(() => {
        if (counter < sequencia.length) {
            if (blink) {
                tiles[sequencia[counter]].classList.add("selected");
            } else {
                tiles[sequencia[counter]].classList.remove("selected");
                counter++
            }
            blink = !blink;
        }
        else {
            waitinginput = true;
            geniusblink();
            clearInterval(timer);
        }
    }, 1000);
}

function cycle() {
    waitinginput = false
    inputcursor = 0;
    increase();
    show();
}

function startgame() {
    start.style.display = "none";
    gameover = false;
    cycle();
}

for (let i = 0; i < 4; i++) {
    tiles[i].onclick = () => {
        if (waitinginput) {
            if (sequencia[inputcursor] === i) {
                inputcursor++
            }
            else {
                reset();
            }
            if (inputcursor + 1 > sequencia.length && !gameover) {
                cycle();
            }
        }
    }
}

start.onclick = startgame;